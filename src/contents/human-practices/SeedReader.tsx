import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import seedRingSvg from "../engineering/assets/seed-ring-hp.svg?raw";
import "./seed-reader.css";

/**
 * SEED reader — a large half wheel fixed to the left edge of the page, right
 * under the table of contents. Only its right semicircle is shown: the flat
 * edge sits on the TOC's left edge and the arc reaches the TOC's right edge,
 * so the radius is about the TOC width.
 *
 * The wheel is driven by the scroll position of the cycle paragraphs:
 *
 *   · when a paragraph's centre reaches the wheel's rightmost point (3 o'clock),
 *     that phase's segment sits exactly at the right and its label is exactly
 *     at the rightmost point;
 *   · when the blank line between two paragraphs reaches the rightmost point,
 *     the boundary between the two phases' segments sits exactly at the right.
 *
 * Between those keypoints the rotation interpolates linearly, so the wheel
 * speeds up and eases in multiple segments exactly in sync with the wheel —
 * one quarter turn per phase, like a waterwheel.
 */
export function SeedReaderRail() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLElement | null>(null);
  const refreshRef = useRef<() => void>(() => {});

  /* Pin the half wheel under the TOC: flat edge on the TOC's left edge,
     radius as close to the TOC width as the viewport height allows.
     The TOC only renders its nav after collecting the page headings, and it
     slides in with a transform, so keep looking for it and use its layout
     metrics (computed left/top + offset size) rather than the client rect. */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let nav: HTMLElement | null = null;
    let observer: ResizeObserver | null = null;
    let interval = 0;

    const place = () => {
      if (!nav || !nav.offsetWidth) return;
      const cs = getComputedStyle(nav);
      const top = parseFloat(cs.top) || 0;
      const navBottom = top + nav.offsetHeight;
      const radius = Math.max(
        160,
        Math.min(nav.offsetWidth, (window.innerHeight - navBottom - 24) / 2),
      );
      /* The wheel's flat edge sits flush against the page's left edge. */
      wrap.style.left = "0px";
      wrap.style.top = `${navBottom + 12}px`;
      wrap.style.setProperty("--seed-r", `${radius}px`);
      refreshRef.current();
    };

    const attach = () => {
      const found = document.querySelector<HTMLElement>(".page-toc");
      if (!found) return false;
      nav = found;
      place();
      observer = new ResizeObserver(place);
      observer.observe(nav);
      window.addEventListener("resize", place);
      return true;
    };

    if (!attach()) {
      interval = window.setInterval(() => {
        if (attach()) window.clearInterval(interval);
      }, 150);
    }
    return () => {
      window.clearInterval(interval);
      observer?.disconnect();
      window.removeEventListener("resize", place);
    };
  }, []);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const paras = Array.from(
      document.querySelectorAll<HTMLElement>("[data-seed-phase]"),
    );
    if (!paras.length) return;
    const lineHeight =
      parseFloat(getComputedStyle(paras[0]).lineHeight) || 34;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rects = paras.map((p) => p.getBoundingClientRect());
      const ringRect = ring.getBoundingClientRect();
      if (!ringRect.height) return;
      const rightY = ringRect.top + ringRect.height / 2;
      const scrollY = window.scrollY;

      /* Keypoints: paragraph centres (p = index) and the mid-points of the
         blank lines between paragraphs (p = index + 0.5). */
      const keys: { y: number; p: number }[] = [];
      rects.forEach((r, i) => {
        keys.push({ y: r.top + scrollY + r.height / 2, p: i });
        if (i < rects.length - 1) {
          keys.push({
            y: (r.bottom + rects[i + 1].top) / 2 + scrollY,
            p: i + 0.5,
          });
        }
      });

      const docY = scrollY + rightY;
      let phasePos = keys[keys.length - 1].p;
      if (docY <= keys[0].y) {
        phasePos = keys[0].p;
      } else {
        for (let i = 0; i < keys.length - 1; i += 1) {
          const a = keys[i];
          const b = keys[i + 1];
          if (docY <= b.y) {
            phasePos =
              a.p + ((b.p - a.p) * (docY - a.y)) / Math.max(1, b.y - a.y);
            break;
          }
        }
      }

      /* One quarter turn per phase, minus the 9.33° that the segments'
         actual (visible) centres — the same shift the labels use — sit
         clockwise of the arc centres, so the actual centre lands exactly on
         the 3 o'clock line. */
      ring.style.setProperty(
        "--seed-rotation",
        `${(90 - 90 * phasePos - 9.33).toFixed(2)}deg`,
      );

      /* The wheel rolls in from the left when the first line of the first
         paragraph reaches the centre line, and rolls away to the left when
         the last line of the last paragraph reaches it. */
      const firstLine =
        rects[0].top + scrollY + lineHeight / 2;
      const lastLine =
        rects[rects.length - 1].bottom + scrollY - lineHeight / 2;
      const open = docY >= firstLine && docY <= lastLine;
      const wrap = ring.closest(".seed-reader__ring");
      wrap?.classList.toggle("is-open", open);


      /* Emphasis: the paragraph whose centre is nearest the rightmost point. */
      let best = 0;
      let bestD = Infinity;
      rects.forEach((r, i) => {
        const d = Math.abs(r.top + r.height / 2 - rightY);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      const el = paras[best];
      if (!open) {
        activeRef.current?.classList.remove("is-active");
        activeRef.current = null;
      } else if (el !== activeRef.current) {
        activeRef.current?.classList.remove("is-active");
        el.classList.add("is-active");
        activeRef.current = el;
      }
      if (open) ring.dataset.active = el.dataset.seedPhase ?? "spark";
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    refreshRef.current = schedule;

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (typeof document === "undefined") return null;
  return createPortal(
    <div className="seed-reader__ring" ref={wrapRef} data-page-swipe-stage>
      <div
        className="seed-ring"
        ref={ringRef}
        dangerouslySetInnerHTML={{ __html: seedRingSvg }}
      />
    </div>,
    document.body,
  );
}
