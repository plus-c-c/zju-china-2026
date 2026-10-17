import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import "./Timeline.css";

export type TimelineDetail = {
  /** Section heading shown inside the detail dialog. */
  heading: string;
  content: ReactNode;
};

export type TimelineItem = {
  /** Human-readable date label, e.g. "28 January 2025". */
  date: string;
  title: string;
  /** Short summary rendered inside the card. */
  summary?: ReactNode;
  /** Optional photo shown inside the rail dot (falls back to a gradient). */
  image?: string;
  imageAlt?: string;
  /** Optional sections rendered in the "Read more" dialog. */
  details?: TimelineDetail[];
};

/**
 * Vertical engagement timeline with a scroll-driven progress line, reveal
 * animations and an optional "Read more" dialog per entry.
 *
 * Data is passed in through `items`, so the component can be reused on any
 * page (see `src/contents/human-practices.tsx` for usage).
 */
export function Timeline({ items }: { items: TimelineItem[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(() =>
    items.map(() => false),
  );
  const [dotOffsets, setDotOffsets] = useState<number[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Measure each dot centre relative to the top of the track, so the
  // progress line can be drawn up to the latest revealed entry.
  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const dots = Array.from(
      list.querySelectorAll<HTMLElement>(".timeline-dot"),
    );
    const track = list.querySelector<HTMLElement>(".timeline-track");
    if (!track || dots.length === 0) return;
    const trackTop = track.getBoundingClientRect().top;
    const next = dots.map((dot) => {
      const rect = dot.getBoundingClientRect();
      return rect.top + rect.height / 2 - trackTop;
    });
    setDotOffsets((prev) =>
      prev.length === next.length &&
      prev.every((value, index) => Math.abs(value - next[index]) < 0.5)
        ? prev
        : next,
    );
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const rows = Array.from(
      list.querySelectorAll<HTMLElement>(".timeline-row"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.index);
          setVisibleItems((prev) => {
            if (prev[index]) return prev;
            const next = [...prev];
            next[index] = true;
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0.1 },
    );
    rows.forEach((row) => observer.observe(row));
    measure();

    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };
    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items.length, measure]);

  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, close]);

  const lastVisible = visibleItems.lastIndexOf(true);
  const lineHeight =
    lastVisible >= 0 && lastVisible < dotOffsets.length
      ? dotOffsets[lastVisible]
      : 0;
  const openItem = openIndex !== null ? items[openIndex] : null;

  return (
    <div className="timeline-root">
      <div className="timeline-list" ref={listRef}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`timeline-row${visibleItems[index] ? " is-visible" : ""}`}
            data-index={index}
          >
            <div className="timeline-rail">
              <div
                className={`timeline-dot${item.image ? "" : " timeline-dot--fallback"}`}
              >
                {item.image ? (
                  <img
                    className="timeline-dot-img"
                    src={item.image}
                    alt={item.imageAlt || ""}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="timeline-dot-fallback" aria-hidden="true" />
                )}
              </div>
              <div className="timeline-title-desktop">{item.title}</div>
            </div>
            <div className="timeline-card-wrap">
              <div className="timeline-card">
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-title-mobile">{item.title}</div>
                {item.summary ? (
                  <div className="timeline-summary">{item.summary}</div>
                ) : null}
                {item.details && item.details.length > 0 ? (
                  <button
                    type="button"
                    className="timeline-more"
                    onClick={() => setOpenIndex(index)}
                  >
                    Read more
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
        <div className="timeline-track" aria-hidden="true">
          <div className="timeline-track-fade" />
          <div
            className="timeline-track-line"
            style={{ height: `${lineHeight}px` }}
          />
        </div>
      </div>
      {openItem && (
        <div className="timeline-modal-backdrop" onClick={close}>
          <div
            className="timeline-modal"
            role="dialog"
            aria-modal="true"
            aria-label={openItem.title}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="timeline-modal-header">
              <div className="timeline-modal-avatar">
                {openItem.image ? (
                  <img
                    src={openItem.image}
                    alt={openItem.imageAlt || openItem.title}
                  />
                ) : (
                  <div
                    className="timeline-modal-avatar-fallback"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="timeline-modal-titles">
                <div className="timeline-modal-date">{openItem.date}</div>
                <div className="timeline-modal-title">{openItem.title}</div>
              </div>
              <button
                type="button"
                className="timeline-modal-close"
                onClick={close}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="timeline-modal-body">
              {openItem.details?.map((section, index) => (
                <div className="timeline-modal-section" key={index}>
                  <h4>{section.heading}</h4>
                  {section.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
