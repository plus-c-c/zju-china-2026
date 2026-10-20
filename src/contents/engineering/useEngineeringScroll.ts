import { useEffect, useRef, type RefObject } from "react";
import { STEPPER_WHEEL_GAIN } from "../../components/stepperWheel";
import { EngineeringWheelGesture } from "./engineeringWheelGesture";

interface EngineeringScrollOptions {
  stageRef: RefObject<HTMLElement | null>;
  panelRef: RefObject<HTMLElement | null>;
  getIndex: () => number;
  getCount: () => number;
  onAdvance: (index: number) => void;
}

/** Preserve the card's original wheel speed. Reaching the edge ends the
 * current gesture; a separate gesture can advance once and lands at the top.
 * Listeners belong to this runway, not to the entire browser window. */
export function useEngineeringScroll(options: EngineeringScrollOptions) {
  const live = useRef(options);
  live.current = options;

  useEffect(() => {
    const runway =
      live.current.stageRef.current?.closest<HTMLElement>(".eng-runway");
    if (!runway) return;
    const wheel = new EngineeringWheelGesture();
    const touch = new EngineeringWheelGesture();
    let touchY: number | null = null;

    const move = (
      delta: number,
      event: Event,
      gesture: EngineeringWheelGesture,
      gain: number,
    ) => {
      const bounds = runway.getBoundingClientRect();
      if (bounds.top > 2 || bounds.bottom < window.innerHeight - 2) return;
      const { panelRef, getIndex, getCount, onAdvance } = live.current;
      const panel = panelRef.current;
      if (!panel) return;
      const max = Math.max(0, panel.scrollHeight - panel.clientHeight);
      const direction = delta > 0 ? 1 : -1;
      const atEdge =
        direction > 0 ? panel.scrollTop >= max - 1 : panel.scrollTop <= 1;
      const next = getIndex() + direction;
      const action = gesture.move(
        performance.now(),
        delta,
        atEdge,
        next >= 0 && next < getCount(),
      );
      if (action === "release") return;
      event.preventDefault();
      if (action === "scroll") {
        panel.scrollTop = Math.max(
          0,
          Math.min(max, panel.scrollTop + delta * gain),
        );
      } else if (action === "advance") {
        onAdvance(next);
      }
    };
    const onWheel = (event: WheelEvent) => {
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        !event.deltaY ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      )
        return;
      const unit =
        event.deltaMode === 1
          ? 20
          : event.deltaMode === 2
            ? window.innerHeight
            : 1;
      move(event.deltaY * unit, event, wheel, STEPPER_WHEEL_GAIN);
    };
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches.length === 1 ? event.touches[0].clientY : null;
      touch.reset();
    };
    const onTouchMove = (event: TouchEvent) => {
      if (touchY === null || event.touches.length !== 1) return;
      const y = event.touches[0].clientY;
      const delta = touchY - y;
      if (Math.abs(delta) < 4) return;
      touchY = y;
      move(delta, event, touch, 1);
    };
    const onTouchEnd = () => {
      touchY = null;
    };
    runway.addEventListener("wheel", onWheel, { passive: false });
    runway.addEventListener("touchstart", onTouchStart, { passive: true });
    runway.addEventListener("touchmove", onTouchMove, { passive: false });
    runway.addEventListener("touchend", onTouchEnd, { passive: true });
    runway.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      runway.removeEventListener("wheel", onWheel);
      runway.removeEventListener("touchstart", onTouchStart);
      runway.removeEventListener("touchmove", onTouchMove);
      runway.removeEventListener("touchend", onTouchEnd);
      runway.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);
}
