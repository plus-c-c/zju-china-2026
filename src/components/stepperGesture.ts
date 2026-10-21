/** One deliberate gesture outside the card may advance one step. */
const GESTURE_IDLE_MS = 180;
const ADVANCE_INTENT_PX = 64;

type GestureAction = "hold" | "advance" | "release";

/** Stop an incoming page gesture at the nearest end of a deck, even when
 * its delta would otherwise carry the page past the entire sticky region. */
export function getStepperEntryIndex({
  top,
  bottom,
  pinTop,
  viewportHeight,
  delta,
  count,
}: {
  top: number;
  bottom: number;
  pinTop: number;
  viewportHeight: number;
  delta: number;
  count: number;
}): number | null {
  if (count <= 0) return null;
  const before = top - pinTop;
  const after = bottom - viewportHeight;
  if (before > 2 && delta >= before) return 0;
  if (after < -2 && delta <= after) return count - 1;
  return null;
}

export class StepperWheelGesture {
  private lastTime = -Infinity;
  private direction = 0;
  private advanced = false;
  private distance = 0;

  reset() {
    this.lastTime = -Infinity;
  }

  consume(now: number, delta: number) {
    this.lastTime = now;
    this.direction = Math.sign(delta);
    this.advanced = true;
    this.distance = 0;
  }

  move(now: number, delta: number, canAdvance: boolean): GestureAction {
    const direction = Math.sign(delta);
    if (now - this.lastTime > GESTURE_IDLE_MS || direction !== this.direction) {
      this.advanced = false;
      this.distance = 0;
    }
    this.lastTime = now;
    this.direction = direction;
    if (this.advanced) return "hold";
    if (!canAdvance) return "release";
    this.distance += Math.abs(delta);
    if (this.distance < ADVANCE_INTENT_PX) return "hold";
    this.advanced = true;
    return "advance";
  }
}
