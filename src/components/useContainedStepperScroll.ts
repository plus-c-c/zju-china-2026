import { useEffect, useRef, type RefObject } from "react";
import { STEPPER_WHEEL_GAIN } from "./stepperWheel";
import { StepperWheelGesture } from "./stepperGesture";

interface StepperScrollOptions {
  stageRef: RefObject<HTMLElement | null>;
  panelRef: RefObject<HTMLElement | null>;
  cardRef?: RefObject<HTMLElement | null>;
  runwayRef?: RefObject<HTMLElement | null>;
  getIndex: () => number;
  getCount: () => number;
  onAdvance: (index: number) => void;
}

/** Card gestures only read the current content. A fresh gesture outside the
 * card may advance once, including the blank gutter beside a pinned deck. */
export function useContainedStepperScroll(options: StepperScrollOptions) {
  const live = useRef(options);
  live.current = options;

  useEffect(() => {
    const runway =
      live.current.runwayRef?.current ??
      live.current.stageRef.current?.closest<HTMLElement>(".eng-runway");
    if (!runway) return;
    const global = Boolean(live.current.runwayRef);
    const root = global ? window : runway;
    const wheel = new StepperWheelGesture();
    const touch = new StepperWheelGesture();
    let touchY: number | null = null;

    const move = (
      delta: number,
      event: Event,
      gesture: StepperWheelGesture,
      gain: number,
    ) => {
      const { stageRef, panelRef, cardRef, getIndex, getCount, onAdvance } =
        live.current;
      const panel = panelRef.current;
      const stage = stageRef.current;
      if (!panel || !stage) return;
      // The protein deck becomes ordinary flowing content on small screens.
      if (global && getComputedStyle(stage).position !== "sticky") return;
      const card = cardRef?.current ?? panel.closest(".dbtl-panel") ?? panel;
      if (event.target instanceof Node && card.contains(event.target)) {
        event.preventDefault();
        gesture.reset();
        panel.scrollTop = Math.max(
          0,
          Math.min(
            panel.scrollHeight - panel.clientHeight,
            panel.scrollTop + delta * gain,
          ),
        );
        return;
      }
      if (global) {
        if (
          event.target instanceof Element &&
          event.target.closest(".nest-navbar, .page-toc")
        )
          return;
        const x =
          event instanceof WheelEvent
            ? event.clientX
            : event instanceof TouchEvent
              ? event.touches[0]?.clientX
              : undefined;
        const insideStage =
          event.target instanceof Node && stage.contains(event.target);
        if (
          !insideStage &&
          (x === undefined || x < stage.getBoundingClientRect().right)
        )
          return;
      }
      const bounds = runway.getBoundingClientRect();
      const top = global ? parseFloat(getComputedStyle(stage).top) || 0 : 0;
      if (bounds.top > top + 2 || bounds.bottom < window.innerHeight - 2)
        return;
      const next = getIndex() + (delta > 0 ? 1 : -1);
      const action = gesture.move(
        performance.now(),
        delta,
        next >= 0 && next < getCount(),
      );
      if (action === "release") return;
      event.preventDefault();
      if (action === "advance") onAdvance(next);
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
    const onKeyDown = (event: KeyboardEvent) => {
      const { panelRef, cardRef, stageRef } = live.current;
      const panel = panelRef.current;
      if (!panel || !(event.target instanceof Node)) return;
      const card = cardRef?.current ?? panel;
      if (!card.contains(event.target)) return;
      if (
        global &&
        stageRef.current &&
        getComputedStyle(stageRef.current).position !== "sticky"
      )
        return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (
        event.target instanceof Element &&
        event.target.closest(
          "input, textarea, select, button, [contenteditable='true']",
        )
      )
        return;
      const page = panel.clientHeight * 0.85;
      const offsets: Record<string, number> = {
        ArrowDown: 40,
        ArrowUp: -40,
        PageDown: page,
        PageUp: -page,
        " ": event.shiftKey ? -page : page,
        Home: -Infinity,
        End: Infinity,
        ArrowLeft: 0,
        ArrowRight: 0,
      };
      const delta = offsets[event.key];
      if (delta === undefined) return;
      event.preventDefault();
      event.stopPropagation();
      panel.scrollTop = Math.max(
        0,
        Math.min(
          panel.scrollHeight - panel.clientHeight,
          panel.scrollTop + delta,
        ),
      );
    };
    // Capture scroll keys before the decks' window-level arrow shortcuts.
    root.addEventListener("wheel", onWheel as EventListener, {
      passive: false,
    });
    root.addEventListener("keydown", onKeyDown as EventListener, global);
    root.addEventListener("touchstart", onTouchStart as EventListener, {
      passive: true,
    });
    root.addEventListener("touchmove", onTouchMove as EventListener, {
      passive: false,
    });
    root.addEventListener("touchend", onTouchEnd, { passive: true });
    root.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      root.removeEventListener("wheel", onWheel as EventListener);
      root.removeEventListener("keydown", onKeyDown as EventListener, global);
      root.removeEventListener("touchstart", onTouchStart as EventListener);
      root.removeEventListener("touchmove", onTouchMove as EventListener);
      root.removeEventListener("touchend", onTouchEnd);
      root.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);
}
