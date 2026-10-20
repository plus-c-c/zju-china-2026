/** A pause separates gestures; reaching an edge never counts as a new one. */
const GESTURE_IDLE_MS = 180;
const ADVANCE_INTENT_PX = 64;

type GestureAction = "scroll" | "hold" | "advance" | "release";

export class EngineeringWheelGesture {
  private lastTime = -Infinity;
  private direction = 0;
  private startedAtEdge = false;
  private advanced = false;
  private distance = 0;

  reset() {
    this.lastTime = -Infinity;
  }

  move(
    now: number,
    delta: number,
    atEdge: boolean,
    canAdvance: boolean,
  ): GestureAction {
    const direction = Math.sign(delta);
    if (now - this.lastTime > GESTURE_IDLE_MS || direction !== this.direction) {
      this.startedAtEdge = atEdge;
      this.advanced = false;
      this.distance = 0;
    }
    this.lastTime = now;
    this.direction = direction;
    if (this.advanced) return "hold";
    if (!atEdge) return "scroll";
    // A gesture that was reading the current card ends at its boundary.
    // Its remaining momentum cannot become a page-change command.
    if (!this.startedAtEdge) return "hold";
    if (!canAdvance) return "release";
    this.distance += Math.abs(delta);
    if (this.distance < ADVANCE_INTENT_PX) return "hold";
    this.advanced = true;
    return "advance";
  }
}
