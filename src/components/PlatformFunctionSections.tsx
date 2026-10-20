import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { isHashScrollSuppressed } from "./tocState";
import { TransparentImage } from "./TransparentImage";
import "./PlatformFunctionSections.css";

type Track = "platform" | "function" | "whole-process";

const proteinSource =
  "https://static.igem.wiki/teams/6102/wiki/images/design/01/00001.avif";

export function PlatformFunctionSections({
  id,
  platform,
  functionContent,
  wholeProcess,
}: {
  id: string;
  platform: ReactNode;
  functionContent: ReactNode;
  wholeProcess?: ReactNode;
}) {
  const [active, setActive] = useState<Track>("platform");
  const root = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const pendingAlignment = useRef(false);
  const animateNext = useRef(false);
  const tracks: Track[] = wholeProcess
    ? ["platform", "function", "whole-process"]
    : ["platform", "function"];

  useLayoutEffect(() => {
    const container = root.current;
    const navigation = container?.querySelector<HTMLElement>(
      ".project-tracks__navigation",
    );
    if (!container || !navigation) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const top = Number.parseFloat(getComputedStyle(navigation).top);
      const stuck = navigation.getBoundingClientRect().top <= top + 1;
      navigation.dataset.stuck = String(stuck);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      container.style.setProperty(
        "--project-track-nav-height",
        `${navigation.offsetHeight}px`,
      );
      schedule();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(navigation);
    resize.observe(container);
    measure();
    const siteNavigation = document.querySelector(".nest-navbar");
    const visibility = new MutationObserver(schedule);
    if (siteNavigation)
      visibility.observe(siteNavigation, {
        attributes: true,
        attributeFilter: ["class"],
      });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      resize.disconnect();
      visibility.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useLayoutEffect(() => {
    const container = root.current;
    if (!container) return;

    // Give hidden headings the same stable ids as the Wiki TOC. A link to a
    // function heading must be resolvable before that panel has been opened.
    const usedIds = new Set(
      Array.from(document.querySelectorAll("[id]"), (element) => element.id),
    );
    container
      .querySelectorAll<HTMLElement>("h2, h3, h4, h5")
      .forEach((heading, index) => {
        if (heading.id) return;
        const slug =
          (heading.textContent || "section")
            .trim()
            .toLowerCase()
            .replace(/[^\p{L}\p{N}]+/gu, "-")
            .replace(/^-|-$/g, "") || "section";
        let headingId = slug;
        let suffix = index + 1;
        while (usedIds.has(headingId)) headingId = `${slug}-${suffix++}`;
        heading.id = headingId;
        usedIds.add(headingId);
      });

    let alignmentFrame = 0;
    let alignmentTimer = 0;
    const cancelAlignment = () => {
      cancelAnimationFrame(alignmentFrame);
      window.clearTimeout(alignmentTimer);
    };
    const revealHash = (hash: string) => {
      let targetId: string;
      try {
        targetId = decodeURIComponent(hash.slice(1));
      } catch {
        return;
      }
      const target = document.getElementById(targetId);
      const panel = target?.closest<HTMLElement>("[data-project-track]");
      if (!target || !panel || !container.contains(panel)) return;
      const track = panel.dataset.projectTrack as Track;
      setActive(track);
      cancelAlignment();
      // The Experiments / Results page swipe owns its remembered landing.
      if (isHashScrollSuppressed()) return;
      alignmentFrame = requestAnimationFrame(() => {
        target.scrollIntoView({ block: "start", behavior: "instant" });
      });
      // The main navigation can hide shortly after an initial hash landing.
      // Align once more with its settled offset, unless the reader intervenes.
      alignmentTimer = window.setTimeout(() => {
        target.scrollIntoView({ block: "start", behavior: "instant" });
      }, 600);
    };
    const onHash = () => revealHash(window.location.hash);
    const onLink = (event: MouseEvent) => {
      if (
        event.button ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (
        link.origin === location.origin &&
        link.pathname === location.pathname
      )
        revealHash(link.hash);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    window.addEventListener("page-loading-complete", onHash);
    document.addEventListener("click", onLink, true);
    window.addEventListener("wheel", cancelAlignment, { passive: true });
    window.addEventListener("touchstart", cancelAlignment, { passive: true });
    window.addEventListener("pointerdown", cancelAlignment, { passive: true });
    window.addEventListener("keydown", cancelAlignment);
    return () => {
      cancelAlignment();
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("page-loading-complete", onHash);
      document.removeEventListener("click", onLink, true);
      window.removeEventListener("wheel", cancelAlignment);
      window.removeEventListener("touchstart", cancelAlignment);
      window.removeEventListener("pointerdown", cancelAlignment);
      window.removeEventListener("keydown", cancelAlignment);
    };
  }, []);

  useLayoutEffect(() => {
    const content = body.current;
    if (!content) return;
    if (pendingAlignment.current) {
      window.scrollBy({
        top:
          content.getBoundingClientRect().top -
          Number.parseFloat(getComputedStyle(content).scrollMarginTop),
        behavior: "instant",
      });
      pendingAlignment.current = false;
    }
    if (!animateNext.current) return;
    animateNext.current = false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const panel = content.querySelector<HTMLElement>(
      "[data-project-track]:not([hidden])",
    );
    const animation = panel?.animate(
      [
        { opacity: 0.35, transform: "translateY(4px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 180, easing: "ease-out" },
    );
    return () => animation?.cancel();
  }, [active]);

  function select(track: Track) {
    if (track === active) return;
    // A click on the sticky control returns to the start of the new track.
    // Near the introduction, the control and the viewport both stay put.
    pendingAlignment.current =
      !!body.current &&
      body.current.getBoundingClientRect().top <
        Number.parseFloat(getComputedStyle(body.current).scrollMarginTop);
    animateNext.current = true;
    setActive(track);
  }

  return (
    <div
      className="project-tracks"
      data-track-count={tracks.length}
      style={
        {
          "--project-track-count": tracks.length,
          "--project-track-index": tracks.indexOf(active),
        } as CSSProperties
      }
      ref={root}
    >
      <nav className="project-tracks__navigation" aria-label="Project sections">
        <div className="project-tracks__choices" data-active={active}>
          {tracks.map((track) => (
            <button
              type="button"
              key={track}
              id={`${id}-${track}-button`}
              className="project-tracks__button"
              aria-pressed={active === track}
              aria-controls={`${id}-${track}`}
              onClick={() => select(track)}
            >
              <span
                className={`project-tracks__art project-tracks__art--${track}`}
                aria-hidden="true"
              >
                <TransparentImage
                  src={proteinSource}
                  alt=""
                  width={4000}
                  height={2263}
                  loading="eager"
                  trim={false}
                  ariaHidden
                />
              </span>
              <span className="project-tracks__label">
                {track === "platform" ? (
                  <>
                    Programmable
                    <br />
                    Biomimetic Platform
                  </>
                ) : track === "function" ? (
                  <>
                    Repair Function
                    <br />
                    Modules
                  </>
                ) : (
                  <>
                    <span className="project-tracks__whole-label">
                      Whole-Process
                    </span>
                    <br />
                    System
                  </>
                )}
              </span>
            </button>
          ))}
        </div>
      </nav>
      <div className="project-tracks__body" ref={body}>
        <section
          id={`${id}-platform`}
          data-project-track="platform"
          aria-labelledby={`${id}-platform-button`}
          hidden={active !== "platform"}
        >
          {platform}
        </section>
        <section
          id={`${id}-function`}
          data-project-track="function"
          aria-labelledby={`${id}-function-button`}
          hidden={active !== "function"}
        >
          {functionContent}
        </section>
        {wholeProcess && (
          <section
            id={`${id}-whole-process`}
            data-project-track="whole-process"
            aria-labelledby={`${id}-whole-process-button`}
            hidden={active !== "whole-process"}
          >
            {wholeProcess}
          </section>
        )}
      </div>
    </div>
  );
}

export function SharedProjectSections({ children }: { children: ReactNode }) {
  return <div className="project-shared">{children}</div>;
}
