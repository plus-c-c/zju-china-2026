/**
 * Shared parameters for the Engineering DBTL ring.
 *
 * Both Engineering navigation layouts (stacked rows and split ring rows)
 * read the ring's orientation and stage geometry from here, so switching a
 * level-1 / level-2 button always returns the ring to the same starting
 * orientation.
 */

/** Rotations (degrees) that put each DBTL phase's visible centre exactly on
 *  the 12 o'clock reading point after the artwork mirror. */
export const DBTL_PHASE_TOP_ANGLE = [61.03, 140.62, 235.64, 323.92] as const;

/** Orientation on entering any group: the first phase (Design) is at 12. */
export const DBTL_RING_START_ANGLE = DBTL_PHASE_TOP_ANGLE[0];

/** Scroll nudge (px) used when jumping to a tab/phase step. A level-1 or
 *  level-2 switch uses 0 so the ring lands exactly on its starting angle. */
export const DBTL_TAB_SCROLL_NUDGE = 2;

/** Fraction of a step interval treated as the interval start. Page scroll is
 *  rounded to whole pixels, so a few tenths of a degree past the boundary
 *  would otherwise make the same group start at a slightly different angle;
 *  snapping this tiny fraction to 0 keeps every switch on the same heading. */
export const DBTL_RING_SNAP_EPSILON = 0.002;
