import { useEffect, useRef, type RefObject } from "react";

/** A trackpad gesture includes its momentum tail, however long that lasts. */
const GESTURE_IDLE_MS = 240;

interface EngineeringScrollOptions {
  stageRef: RefObject<HTMLElement | null>;
  panelRef: RefObject<HTMLElement | null>;
  getIndex: () => number;
  getCount: () => number;
  onAdvance: (index: number) => void;
}

/** Read the card first; one gesture can cross at most one card boundary.
 *  After a change, consume the entire momentum tail, including wheel events
 *  over the new card. A quiet interval or a new touch starts a new gesture.
 *  This is local to Engineering; the Model decks keep their own behaviour. */
export function useEngineeringScroll(options: EngineeringScrollOptions) {
  const live = useRef(options);
  live.current = options;

  useEffect(() => {
    let lastWheel = -Infinity;
    let advanced = false;
    let touchY: number | null = null;

    const active = () => {
      const runway = live.current.stageRef.current?.closest(".eng-runway");
      if (!runway) return false;
      const rect = runway.getBoundingClientRect();
      return rect.top <= 2 && rect.bottom >= window.innerHeight - 2;
    };

    const move = (delta: number, event: Event) => {
      if (!active()) return;
      if (advanced) {
        event.preventDefault();
        return;
      }
      const { panelRef, getIndex, getCount, onAdvance } = live.current;
      const panel = panelRef.current;
      if (!panel) return;
      const max = Math.max(0, panel.scrollHeight - panel.clientHeight);
      const direction = delta > 0 ? 1 : -1;
      const atEdge =
        direction > 0 ? panel.scrollTop >= max - 1 : panel.scrollTop <= 1;
      if (!atEdge) {
        event.preventDefault();
        // Drop any remainder at the edge instead of passing it to the page.
        panel.scrollTop = Math.max(0, Math.min(max, panel.scrollTop + delta));
        return;
      }
      const next = getIndex() + direction;
      if (next < 0 || next >= getCount()) return;
      event.preventDefault();
      advanced = true;
      onAdvance(next);
    };

    const onWheel = (event: WheelEvent) => {
      // Preserve pinch zoom and horizontal gestures, including wide tables.
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        !event.deltaY ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      )
        return;
      const now = performance.now();
      if (now - lastWheel > GESTURE_IDLE_MS) advanced = false;
      lastWheel = now;
      const unit =
        event.deltaMode === 1
          ? 20
          : event.deltaMode === 2
            ? window.innerHeight
            : 1;
      move(event.deltaY * unit, event);
    };
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches.length === 1 ? event.touches[0].clientY : null;
      advanced = false;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (touchY === null || event.touches.length !== 1) return;
      const y = event.touches[0].clientY;
      const delta = touchY - y;
      if (Math.abs(delta) < 4) return;
      touchY = y;
      move(delta, event);
    };
    const onTouchEnd = () => {
      touchY = null;
    };

    // Capture before the card listener so momentum cannot scroll a new card.
    window.addEventListener("wheel", onWheel, {
      capture: true,
      passive: false,
    });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, {
      capture: true,
      passive: false,
    });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove, true);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);
}
