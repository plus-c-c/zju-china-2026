import { useEffect, useRef, type RefObject } from "react";

/**
 * Boundary step advance — the interaction rule shared by the scroll-driven
 * steppers (the Model 2 protein steps, the Model 3 deck and the Engineering
 * DBTL cluster).
 *
 * · The text panel scrolls natively while it still has room to scroll.
 * · Once the panel reaches its bottom (scrolling down) or its top (scrolling
 *   up), the first wheel / touch gesture advances exactly one step: the
 *   caller moves the page to the target step's runway position (smooth) and
 *   the caller's scroll mapping is paused while that scroll runs.
 * · A lock period (700 ms, the same as fullPage.js `scrollDelay`) absorbs the
 *   rest of the gesture, so a single gesture never skips steps.
 * · At the first / last step the event is left to the page: scrolling
 *   continues into the page normally (no capture, no bounce).
 */

/**
 * Master switch for all of the rules above (Model 2 · Model 3 · Engineering).
 *
 * `false` disables every rule in the three steppers at once: the wheel / touch
 * handlers are not attached, the text panels release their overscroll
 * containment and the backward entry reset, so the steppers fall back to
 * plain native scrolling (the panel scrolls to its end and the page chains
 * on naturally).
 *
 * Flip to `true` to bring all of them back.
 */
export const STEP_ADVANCE_ENABLED = false;

/** Lock period between two boundary advances, in ms. */
const STEP_LOCK_MS = 700;

/** How long the caller's scroll mapping should stand still after an advance. */
const MAPPING_SUPPRESS_MS = 800;

interface BoundaryStepAdvanceOptions {
  /** Pinned view that captures the gestures (the whole stepper cluster). */
  stageRef: RefObject<HTMLElement | null>;
  /** Scrollable text panel inside the pinned view. */
  panelRef: RefObject<HTMLElement | null>;
  /** Current step index (read live). */
  getIndex: () => number;
  /** Number of steps (read live). */
  getCount: () => number;
  /** Move to the target step: set the index and smooth-scroll the page. */
  onAdvance: (target: number) => void;
}

/**
 * Returns a ref holding the timestamp until which the caller's scroll
 * mapping (progress → step) should be paused.
 */
export function useBoundaryStepAdvance({
  stageRef,
  panelRef,
  getIndex,
  getCount,
  onAdvance,
}: BoundaryStepAdvanceOptions): RefObject<number> {
  const suppressUntilRef = useRef(0);
  const lastAdvanceRef = useRef(0);
  const getIndexRef = useRef(getIndex);
  const getCountRef = useRef(getCount);
  const onAdvanceRef = useRef(onAdvance);
  getIndexRef.current = getIndex;
  getCountRef.current = getCount;
  onAdvanceRef.current = onAdvance;

  useEffect(() => {
    if (!STEP_ADVANCE_ENABLED) return;
    const stage = stageRef.current;
    if (!stage) return;
    const atEdge = (dir: 1 | -1) => {
      const panel = panelRef.current;
      if (!panel) return true;
      return dir > 0
        ? panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 1
        : panel.scrollTop <= 0;
    };
    const advance = (dir: 1 | -1, event: Event) => {
      const now = performance.now();
      const next = getIndexRef.current() + dir;
      if (next < 0 || next >= getCountRef.current()) return; /* 首/末步：交给页面 */
      event.preventDefault(); /* 锁定期与步进时都吸收滚轮 */
      if (now - lastAdvanceRef.current < STEP_LOCK_MS) return;
      lastAdvanceRef.current = now;
      suppressUntilRef.current = now + MAPPING_SUPPRESS_MS;
      onAdvanceRef.current(next);
    };
    const onWheel = (event: WheelEvent) => {
      if (!event.deltaY) return;
      const dir: 1 | -1 = event.deltaY > 0 ? 1 : -1;
      const panel = panelRef.current;
      const insidePanel =
        panel && event.target instanceof Node && panel.contains(event.target);
      if (insidePanel && !atEdge(dir)) return; /* 面板仍可滚 → 原生滚动 */
      advance(dir, event);
    };
    let touchY = 0;
    let touchAdvanced = false;
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? 0;
      touchAdvanced = false;
    };
    const onTouchMove = (event: TouchEvent) => {
      const y = event.touches[0]?.clientY ?? touchY;
      const dy = touchY - y; /* > 0 = 向上滑动（内容前进） */
      if (Math.abs(dy) < 8) return;
      const dir: 1 | -1 = dy > 0 ? 1 : -1;
      if (!atEdge(dir)) return; /* 面板仍可滚 → 原生滚动 */
      if (touchAdvanced) return; /* 一次拖拽只步进一次 */
      touchAdvanced = true;
      advance(dir, event);
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
    };
  }, [stageRef, panelRef]);

  return suppressUntilRef;
}
