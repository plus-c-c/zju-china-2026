import { useEffect, useRef, type RefObject } from "react";

/**
 * Shared gain for the stepper cards' wheel scrolling. One wheel notch scrolls
 * the panel twice as far as the raw delta.
 */
export const STEPPER_WHEEL_GAIN = 2;

/**
 * Scroll distance for one hidden-progress step, shared by Engineering DBTL and
 * the three Model decks. Two standard wheel notches (~100 px each) therefore
 * advance exactly one step / 90° of ring rotation.
 */
export const STEPPER_STEP_PX = 200;

/**
 * Wheel handling shared by the scroll steppers (Engineering DBTL and the
 * Model 1–3 decks).
 *
 * · The card responds as soon as the pointer is inside it, with a small
 *   gain (the panel scrolls 1.5× the wheel delta).
 * · One notch is never split: if the text panel can still move, the whole
 *   notch belongs to it and any remainder past the end is dropped.
 * · A notch that finds the panel already at its boundary scrolls the page.
 *   The page scroll drives the stepper's hidden progress — and, in
 *   Engineering, the ring's rotation — so the effect is immediate rather
 *   than waiting for the browser to release its wheel gesture.
 *
 * `cardRef` is optional: pass it when the wheel should also work over a card
 * header that sits outside the scroll container (Engineering); without it
 * the listener sits on the panel itself.
 */
export function useCardWheel(
  panelRef: RefObject<HTMLElement | null>,
  cardRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const card = cardRef?.current ?? panelRef.current;
    if (!card) return;
    const onWheel = (event: WheelEvent) => {
      /* The scroll container may be replaced between steps (the Model slides
         remount), so always read the current one from the ref. */
      const body = panelRef.current;
      if (!body || !event.deltaY) return;
      event.preventDefault();
      const raw = event.deltaY;
      const max = Math.max(0, body.scrollHeight - body.clientHeight);
      const atStart = body.scrollTop <= 0;
      const atEnd =
        body.scrollTop + body.clientHeight >= body.scrollHeight - 1;
      if (raw > 0 ? atEnd : atStart) {
        window.scrollBy(0, raw);
        return;
      }
      body.scrollTop = Math.max(
        0,
        Math.min(max, body.scrollTop + raw * STEPPER_WHEEL_GAIN),
      );
    };
    card.addEventListener("wheel", onWheel, { passive: false });
    return () => card.removeEventListener("wheel", onWheel);
  }, [panelRef, cardRef]);
}

interface StepperProgressOptions {
  /** The tall runway the page scrolls through (looked up live). */
  getRunway: () => HTMLElement | null;
  /** Number of steps; the runway is divided into this many intervals. */
  count: number;
  /** Called every frame with the step whose interval is current. */
  onIndex: (index: number) => void;
  /** Called every frame with the fractional position (0 … count). */
  onProgress?: (position: number, progress: number) => void;
  /** Window during which the mapping is paused (programmatic advances). */
  suppressUntilRef?: RefObject<number>;
}

/**
 * Hidden step progress shared by the scroll steppers.
 *
 * The page scroll through the runway maps to a fractional position with one
 * interval per step; a step switches exactly when its interval completes.
 * The same position is published as `--stepper-progress` on the runway:
 * Engineering reads it to turn the DBTL ring, while the Model decks keep it
 * hidden (no styles consume it).
 */
export function useStepperProgress({
  getRunway,
  count,
  onIndex,
  onProgress,
  suppressUntilRef,
}: StepperProgressOptions) {
  const indexRef = useRef(onIndex);
  const progressRef = useRef(onProgress);
  const runwayRef = useRef(getRunway);
  const suppressRef = useRef(suppressUntilRef);
  indexRef.current = onIndex;
  progressRef.current = onProgress;
  runwayRef.current = getRunway;
  suppressRef.current = suppressUntilRef;

  useEffect(() => {
    if (count <= 0) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (performance.now() < (suppressRef.current?.current ?? 0)) return;
      const runway = runwayRef.current();
      if (!runway) return;
      const rect = runway.getBoundingClientRect();
      const total = runway.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const position = progress * count;
      const next = Math.min(
        count - 1,
        Math.max(0, Math.floor(position + 1e-4)),
      );
      runway.style.setProperty("--stepper-progress", progress.toFixed(4));
      indexRef.current(next);
      progressRef.current?.(position, progress);
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
  }, [count]);
}
