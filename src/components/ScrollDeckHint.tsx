import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getScrollDeckRegions,
  isScrollDeckPinned,
  subscribeScrollDeckRegions,
  type ScrollDeckRegion,
} from "./scrollDeckRegions";
import "./ScrollDeckHint.css";

export function ScrollDeckHint({ enabled }: { enabled: boolean }) {
  const { pathname } = useLocation();
  // Memory only: route changes and remounted decks retain this; refresh resets it.
  const seenPages = useRef(new Set<string>());
  const tipRef = useRef<HTMLElement>(null);
  const [hint, setHint] = useState<{
    page: string;
    region: ScrollDeckRegion;
  } | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      if (document.hidden) return;
      setHint((current) =>
        current && !isScrollDeckPinned(current.region) ? null : current,
      );
      if (seenPages.current.has(pathname)) return;
      const region = getScrollDeckRegions().find(isScrollDeckPinned);
      if (!region) return;
      seenPages.current.add(pathname);
      setHint({ page: pathname, region });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    const unsubscribe = subscribeScrollDeckRegions(schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      unsubscribe();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [enabled, pathname]);

  useEffect(() => {
    const tip = tipRef.current;
    if (!enabled || hint?.page !== pathname || !tip) return;
    // Reading or dismissing the tip must not advance the deck behind it.
    const containGesture = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    tip.addEventListener("wheel", containGesture, { passive: false });
    tip.addEventListener("touchmove", containGesture, { passive: false });
    return () => {
      tip.removeEventListener("wheel", containGesture);
      tip.removeEventListener("touchmove", containGesture);
    };
  }, [enabled, hint, pathname]);

  if (!enabled || hint?.page !== pathname) return null;

  return (
    <aside
      ref={tipRef}
      className="scroll-deck-hint"
      aria-label="Scrolling tip"
      onKeyDown={(event) => event.stopPropagation()}
    >
      <button
        className="scroll-deck-hint__close"
        type="button"
        aria-label="Dismiss scrolling tip"
        onClick={() => setHint(null)}
      >
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="m5 5 10 10M15 5 5 15" />
        </svg>
      </button>
      <div role="status">
        <p className="scroll-deck-hint__title">Two ways to scroll</p>
        <div className="scroll-deck-hint__row">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <rect x="4" y="4" width="24" height="24" rx="5" />
            <path d="M9 11h6M9 16h6M9 21h6m7-11v12m-3-9 3-3 3 3m-6 6 3 3 3-3" />
          </svg>
          <p>
            <strong>Inside the card</strong>
            Scroll to read the current card.
          </p>
        </div>
        <div className="scroll-deck-hint__row">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <rect x="3" y="4" width="16" height="24" rx="4" />
            <path d="M26 8v16m-3-13 3-3 3 3m-6 10 3 3 3-3M8 11h6M8 16h6M8 21h6" />
          </svg>
          <p>
            <strong>In the blank space on the right</strong>
            Scroll to switch between cards.
          </p>
        </div>
      </div>
      <button
        className="scroll-deck-hint__confirm"
        type="button"
        onClick={() => setHint(null)}
      >
        Got it
      </button>
    </aside>
  );
}
