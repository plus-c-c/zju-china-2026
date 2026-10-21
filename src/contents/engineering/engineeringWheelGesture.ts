/** One deliberate gesture outside the card may advance one step. */
const GESTURE_IDLE_MS = 180;
const ADVANCE_INTENT_PX = 64;

type GestureAction = "hold" | "advance" | "release";

export class EngineeringWheelGesture {
  private lastTime = -Infinity;
  private direction = 0;
  private advanced = false;
  private distance = 0;

  reset() {
    this.lastTime = -Infinity;
  }

  move(
    now: number,
    delta: number,
    canAdvance: boolean,
  ): GestureAction {
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
