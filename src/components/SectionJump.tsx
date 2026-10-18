import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import {
  navigateWithPageSwipe,
  pageMemoryFor,
  rememberPagePosition,
  type PageSwipeDirection,
} from "./pageSwipe";
import { observeAndWhitenImages } from "./whitenImages";
import { subscribeTocVisible } from "./tocState";
import "./sectionJump.css";
import "./pageSwipe.css";

/**
 * Round side control that jumps to the corresponding section of the paired
 * page (Experiments <-> Results). The current section is resolved from the
 * page headings and translated to the other page's anchor by `resolveTarget`.
 * Either arrow key performs the same jump.
 */
export function SectionJump({
  side,
  target,
  exit,
  resolveTarget,
}: {
  side: "left" | "right";
  /** Name of the paired page, shown on the button's second line. */
  target: string;
  /** Slide direction of the current page when jumping away. */
  exit: PageSwipeDirection;
  /** Maps the active section id to the paired page target and its figures. */
  resolveTarget: (activeId: string | null) => {
    to: string;
    preload: string[];
  };
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeId = useActiveSectionId();
  const [controlsVisible, setControlsVisible] = useState(false);
  const latest = useRef({ activeId, resolveTarget, pathname });
  latest.current = { activeId, resolveTarget, pathname };
  const flightRef = useRef<HTMLSpanElement>(null);

  // The jump control mirrors the TOC's visibility, so both appear once the
  // page header scrolls out of view and disappear again over the footer.
  useEffect(() => subscribeTocVisible(setControlsVisible), []);

  // The arrow artwork ships on a light-blue sheet; the shared whitening pass
  // keys the sheet out. The button is portalled outside the page article, so
  // it needs its own observer (the wet-lab pages only cover their articles).
  useEffect(() => {
    return observeAndWhitenImages(flightRef.current);
  }, []);

  const jump = () => {
    const { to, preload } = latest.current.resolveTarget(
      latest.current.activeId,
    );
    const targetPage = to.split("#")[0];
    const destinationId = to.includes("#") ? to.split("#")[1] : null;
    // Remember the pair heading's viewport offset (layout-independent), not
    // an absolute scroll value; figures above may settle later.
    const anchorElement =
      (destinationId ? document.getElementById(destinationId) : null) ??
      (latest.current.activeId
        ? document.getElementById(latest.current.activeId)
        : null);
    const offset = anchorElement
      ? anchorElement.getBoundingClientRect().top
      : 140;
    // Returning to the same section restores the remembered view; a section
    // change aligns the destination to its section top — the exact coordinate
    // the TOC entry for that section lands on.
    const restoreOffset = pageMemoryFor(targetPage, destinationId);
    rememberPagePosition(latest.current.pathname, destinationId, offset);
    navigateWithPageSwipe(
      (destination) => navigate(destination),
      to,
      exit,
      preload,
      restoreOffset,
    );
  };

  // The pair pages have a single jump control: either arrow key performs the
  // same jump (Carousel-style; the two directions collapse to one action).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)
        return;
      const origin = event.target as HTMLElement | null;
      if (origin?.closest("input, textarea, select, [contenteditable='true']"))
        return;
      event.preventDefault();
      jump();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, exit]);

  // Portalled to <body>: inside the article, the swipe transform would turn
  // the article into the containing block and break `position: fixed`.
  return createPortal(
    <button
      type="button"
      data-page-swipe-stage
      aria-label={`Jump to ${target}`}
      className={`page-jump page-jump--${side}${
        controlsVisible ? " page-jump--visible" : ""
      }`}
      onClick={jump}
    >
      <span className="page-jump__flight" ref={flightRef}>
        <span className="page-jump__bird" aria-hidden="true">
          <img
            src="https://static.igem.wiki/teams/6102/wiki/images/loading-bird.avif"
            alt=""
            draggable={false}
          />
        </span>
        <span className="page-jump__arrow" aria-hidden="true">
          <img
            src="https://static.igem.wiki/teams/6102/wiki/images/home/home/arrow.avif"
            alt=""
            draggable={false}
            crossOrigin="anonymous"
            data-whiten="true"
            data-whiten-white="240"
            data-whiten-opaque="228"
          />
        </span>
        <span className="page-jump__target" aria-hidden="true">
          {`To ${target}`}
        </span>
      </span>
    </button>,
    document.body,
  );
}

function useActiveSectionId() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      // Mirror the TOC: the jump's active section switches when a heading
      // reaches its landing line (its scroll-margin, i.e. the first content
      // line of the page) — the exact rule the TOC uses, with the same
      // one-pixel tolerance for landings.
      const lineOf = (element: HTMLElement) =>
        (Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0) + 1;
      const headings = Array.from(
        document.querySelectorAll<HTMLElement>(
          '.page-article h2[id], .page-article h3[id], .page-article h4[data-toc="include"][id], .page-article h5[data-toc="include"][id]',
        ),
      ).filter(
        (heading) =>
          heading.dataset.toc !== "exclude" &&
          !heading.closest("[hidden], details:not([open])"),
      );
      let current: HTMLElement | null = null;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= lineOf(heading))
          current = heading;
        else break;
      }
      setActiveId(current?.id ?? null);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return activeId;
}
