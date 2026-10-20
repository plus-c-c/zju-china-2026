// Both wing frames share this forward axis, from the eyes toward the beak.
export const BIRD_ARTWORK_HEADING = 126;

/** Screen coordinates: positive y points down, and zero degrees points right. */
export function flightHeading(dx: number, dy: number, previous = 0) {
  return Math.hypot(dx, dy) > 0.001
    ? Math.atan2(dy, dx) * 180 / Math.PI
    : previous;
}
