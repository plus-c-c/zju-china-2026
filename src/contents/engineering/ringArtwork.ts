/**
 * The SEED ring exists in two versions, and this switch keeps every part of
 * them in sync:
 *
 *  · artwork — segment paths, cap circle, highlight layers, masks and the
 *    label paths (assets/seed-ring.svg and assets/seed-ring-hp.svg are the
 *    mirrored set; the *-original.svg files are the pre-mirror set);
 *  · label offset — the labels sit 9.33° clockwise of their arc centres in the
 *    original artwork and 9.33° anti-clockwise in the mirrored one (cap radius
 *    63.5 over ring radius 390);
 *  · scroll direction — the Human Practices reader turns one quarter turn per
 *    phase and reverses its direction with the artwork, so the visible centre
 *    always lands on the 3 o'clock line.
 *
 * Set to true for the mirrored artwork, false for the original one.
 */
export const SEED_RING_MIRRORED = false;
