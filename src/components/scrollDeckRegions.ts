export interface ScrollDeckRegion {
  runway: HTMLElement;
  getPin: () => HTMLElement | null;
  getCard: () => HTMLElement | null;
}

const regions = new Set<ScrollDeckRegion>();
const listeners = new Set<() => void>();

export function registerScrollDeckRegion(region: ScrollDeckRegion) {
  regions.add(region);
  listeners.forEach((listener) => listener());
  return () => {
    regions.delete(region);
    listeners.forEach((listener) => listener());
  };
}

export function getScrollDeckRegions() {
  return [...regions];
}

export function subscribeScrollDeckRegions(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function isScrollDeckPinned(region: ScrollDeckRegion) {
  const pin = region.getPin();
  const card = region.getCard();
  if (!pin?.isConnected || !card?.isConnected) return false;
  const style = getComputedStyle(pin);
  // Some decks become ordinary flowing content on narrow screens.
  if (style.position !== "sticky") return false;
  const top = parseFloat(style.top) || 0;
  const runway = region.runway.getBoundingClientRect();
  const bounds = card.getBoundingClientRect();
  const visibleHeight =
    Math.min(bounds.bottom, innerHeight) - Math.max(bounds.top, top);
  return (
    bounds.width > 0 &&
    visibleHeight >= Math.min(200, bounds.height * 0.5) &&
    runway.top <= top + 2 &&
    runway.bottom >= innerHeight - 2
  );
}
