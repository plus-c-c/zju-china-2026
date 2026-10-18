// State shared between the TOC and the cross-page jump.
//
// The TOC owns this hand-off: the jump writes it, and the TOC consumes it the
// next time it mounts (or reads it while aligning the arrival).

export type PageSwipeDirection = "left" | "right";

// Duration of the cross-page glide. The TOC uses it to schedule the replay of
// the swipe entry on the destination page.
export const PAGE_SWIPE_DURATION = 500;

const ENTRY_ATTRIBUTE = "data-page-swipe-entry";

let hashScrollSuppressedUntil = 0;

export function setPageSwipeEntry(direction: PageSwipeDirection) {
  document.documentElement.setAttribute(ENTRY_ATTRIBUTE, direction);
}

export function readPageSwipeEntry(): PageSwipeDirection | null {
  const value = document.documentElement.getAttribute(ENTRY_ATTRIBUTE);
  return value === "left" || value === "right" ? value : null;
}

export function clearPageSwipeEntry() {
  document.documentElement.removeAttribute(ENTRY_ATTRIBUTE);
}

// Jump navigations that restore a remembered position scroll themselves, so
// the TOC's hash alignment must stand down for that arrival. Time-windowed and
// read-only: the StrictMode double mount must not consume it early.
export function suppressHashScroll(ms = 1800) {
  hashScrollSuppressedUntil = performance.now() + ms;
}

export function isHashScrollSuppressed() {
  return performance.now() < hashScrollSuppressedUntil;
}
