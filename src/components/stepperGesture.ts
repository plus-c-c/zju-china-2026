/** One deliberate gesture outside the card may advance one step. */
const GESTURE_IDLE_MS = 180;
const ADVANCE_INTENT_PX = 64;
const GUTTER_IDLE_MS = 80;

type GestureAction = "hold" | "advance" | "release";

export class StepperWheelGesture {
  private lastTime = -Infinity;
  private direction = 0;
  private advanced = false;
  private distance = 0;

  reset() {
    this.lastTime = -Infinity;
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

/** Keep native-sized page movement in the gutter, capped at one card per
 * gesture. A renewed push can start the next gesture even while the previous
 * trackpad momentum is still producing small wheel events. */
export class StepperGutterGesture {
  private lastTime = -Infinity;
  private direction = 0;
  private startIndex = 0;
  private consumedAt = -Infinity;
  private peak = 0;
  private tail: number[] = [];
  private renewed = 0;
  private reverseDistance = 0;

  reset() {
    this.lastTime = -Infinity;
  }

  start(now: number, delta: number, index: number): number | null {
    const direction = Math.sign(delta);
    const magnitude = Math.abs(delta);
    const consumed = this.consumedAt !== -Infinity;
    const idle = now - this.lastTime > GUTTER_IDLE_MS;
    if (consumed && !idle && direction !== this.direction) {
      this.reverseDistance += magnitude;
      this.lastTime = now;
      if (this.reverseDistance < 12) return null;
    } else {
      this.reverseDistance = 0;
    }
    const settled =
      this.tail.length === 3 &&
      this.tail.every((value) => value <= this.peak * 0.35);
    const renewedPush =
      consumed &&
      now - this.consumedAt >= 120 &&
      settled &&
      magnitude >= Math.max(8, this.tail[2] * 2.5);
    // Require a second sustained input so one irregular momentum sample
    // cannot release the one-card guard.
    const sustainedPush = this.renewed > 0 && magnitude >= this.renewed * 0.65;
    const fresh = idle || direction !== this.direction || sustainedPush;
    if (fresh) {
      this.startIndex = index;
      this.consumedAt = -Infinity;
      this.peak = magnitude;
      this.tail = [];
      this.reverseDistance = 0;
    }
    this.renewed = !fresh && renewedPush ? magnitude : 0;
    this.lastTime = now;
    this.direction = direction;
    this.peak = Math.max(this.peak, magnitude);
    this.tail = [...this.tail.slice(-2), magnitude];
    return this.consumedAt === -Infinity ? this.startIndex : null;
  }

  consume(now: number) {
    this.consumedAt = now;
  }
}
