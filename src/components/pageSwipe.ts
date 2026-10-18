import { flushSync } from "react-dom";
import {
  PAGE_SWIPE_DURATION,
  setPageSwipeEntry,
  suppressHashScroll,
  type PageSwipeDirection,
} from "./tocState";

export type { PageSwipeDirection } from "./tocState";

// Cross-page swipe used between the Experiments and Results pages.
//
// Primary path: before the View Transitions glide starts, the current
// viewport's images are loaded and decoded and the destination section's
// images are preloaded; the destination is then rendered, positioned and
// captured inside the update callback (waiting for webfonts and nearby
// figures). The pair then glides as one motion. The fallback (older browsers)
// keeps the slide-out / navigate / slide-in sequence.

const EXIT_CLASS_PREFIX = "page-swipe-exit-";
const TRANSITION_ATTRIBUTE = "data-wetlab-swipe";
// Bootstrap sets `scroll-behavior: smooth`; jump arrivals must land instantly.
const INSTANT_SCROLL_CLASS = "wetlab-jump-scroll";
// Waiting budgets (ms) for the background warm-up and the capture phase.
const PREWARM_TIMEOUT = 1200;
const PRELOAD_TIMEOUT = 1400;
const DESTINATION_IMAGES_TIMEOUT = 300;
// How far beyond the viewport (in viewport heights) images are pre-warmed.
const IMAGE_MARGIN = 1.5;

let instantScrollTimer = 0;

// Per page: the position it was last left at, keyed by the section id being
// jumped to and stored as the anchor heading's viewport offset (not an
// absolute scroll value), so it stays valid even if figures above finish
// loading later. Returning to the same section restores that view; a section
// change aligns the section top — exactly where its TOC entry lands.
const pageMemory = new Map<string, { section: string | null; offset: number }>();

export function rememberPagePosition(
  page: string,
  section: string | null,
  offset: number,
) {
  pageMemory.set(page, { section, offset });
}

export function pageMemoryFor(
  page: string,
  section: string | null,
): number | null {
  const memory = pageMemory.get(page);
  if (!memory || !section || memory.section !== section) return null;
  return memory.offset;
}

function placeAt(anchor: HTMLElement | null, restoreOffset: number | null) {
  if (anchor && restoreOffset !== null) {
    const anchorTop = anchor.getBoundingClientRect().top + window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: Math.max(0, Math.min(anchorTop - restoreOffset, max)),
      left: 0,
      behavior: "instant",
    });
    return;
  }
  anchor?.scrollIntoView({ block: "start", behavior: "instant" });
}

// Aligned arrivals are held in place by the TOC's anchor keeper; restored
// arrivals need their own: re-apply the anchor/offset pair while the layout
// settles (on a timer and on any late reflow), and stand down as soon as the
// visitor scrolls.
function startRestoreKeeper(
  anchorId: string,
  offset: number,
  duration = 2600,
) {
  if (!anchorId) return;
  const deadline = performance.now() + duration;
  let cancelled = false;
  let timer = 0;
  const tick = () => {
    if (cancelled) return;
    if (performance.now() > deadline) {
      resign();
      return;
    }
    placeAt(document.getElementById(anchorId), offset);
  };
  const observer = new ResizeObserver(tick);
  const resign = () => {
    if (cancelled) return;
    cancelled = true;
    window.clearInterval(timer);
    observer.disconnect();
    window.removeEventListener("wheel", resign);
    window.removeEventListener("touchstart", resign);
    window.removeEventListener("keydown", resign);
    window.removeEventListener("click", resign);
  };
  observer.observe(document.body);
  timer = window.setInterval(tick, 200);
  window.addEventListener("wheel", resign, { once: true, passive: true });
  window.addEventListener("touchstart", resign, { once: true, passive: true });
  window.addEventListener("keydown", resign, { once: true });
  // A click (TOC entry, in-page anchor) is explicit navigation: stand down
  // before the fragment scroll runs, or the next tick would yank it back.
  window.addEventListener("click", resign, { once: true });
}

const sleep = (ms: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, ms));

function imagesNearViewport(): HTMLImageElement[] {
  const height = window.innerHeight;
  return Array.from(
    document.querySelectorAll<HTMLImageElement>(".page-article img"),
  ).filter((image) => {
    const rect = image.getBoundingClientRect();
    return (
      rect.bottom > -height * IMAGE_MARGIN &&
      rect.top < height * (1 + IMAGE_MARGIN)
    );
  });
}

// The destination can keep reflowing briefly after it mounts (cold webfonts
// such as KaTeX arriving, late layout passes). Sample the document height and
// the target's absolute offset until both stay put, so the captured frame
// equals the final frame and the page never jumps at the hand-over.
async function waitForLayoutSettle(target: HTMLElement | null, budget: number) {
  const startedAt = performance.now();
  let previous = -1;
  let stableRounds = 0;
  while (performance.now() - startedAt < budget) {
    await sleep(70);
    const sample =
      document.documentElement.scrollHeight +
      (target ? target.getBoundingClientRect().top + window.scrollY : 0);
    if (Math.abs(sample - previous) < 2) {
      stableRounds += 1;
      if (stableRounds >= 2) return;
    } else {
      stableRounds = 0;
    }
    previous = sample;
  }
}

// The wet-lab pages use KaTeX for the statistics section; its webfonts
// otherwise finish loading right after the destination mounts and reflow the
// page mid-transition. Kicking the loads off with the jump itself keeps the
// capture frame final, so the settle wait can stay short.
function prewarmFormulaFonts() {
  const load = document.fonts?.load?.bind(document.fonts);
  if (!load) return;
  for (const family of ["KaTeX_Main", "KaTeX_Math", "KaTeX_Size1", "KaTeX_Size2"]) {
    void load(`1em "${family}"`).catch(() => undefined);
  }
}

function waitForImageLoad(image: HTMLImageElement): Promise<void> {
  if (image.complete) return Promise.resolve();
  return new Promise((resolve) => {
    image.addEventListener("load", () => resolve(), { once: true });
    image.addEventListener("error", () => resolve(), { once: true });
  });
}

// The outgoing frame is snapshotted as pixels: decode its visible images
// first (decode() is blocked while a transition is running).
async function prewarmCurrentViewport() {
  await Promise.race([
    Promise.all(
      imagesNearViewport().map(async (image) => {
        await waitForImageLoad(image);
        await image.decode?.().catch(() => undefined);
      }),
    ),
    sleep(PREWARM_TIMEOUT),
  ]);
}

// Warm the HTTP cache for the destination section's figures so they are
// painted as soon as the destination mounts.
async function preloadImages(urls: string[]) {
  if (!urls.length) return;
  await Promise.race([
    Promise.all(
      urls.map(
        (src) =>
          new Promise<void>((resolve) => {
            const image = new Image();
            image.onload = () => resolve();
            image.onerror = () => resolve();
            image.src = src;
          }),
      ),
    ),
    sleep(PRELOAD_TIMEOUT),
  ]);
}

type ViewTransition = {
  finished: Promise<void>;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void | Promise<void>) => ViewTransition;
};

export function navigateWithPageSwipe(
  navigate: (to: string) => void,
  to: string,
  exit: PageSwipeDirection,
  preload: string[] = [],
  restoreOffset: number | null = null,
) {
  const root = document.documentElement;
  const hash = to.includes("#") ? to.slice(to.indexOf("#") + 1) : "";
  const placeDestination = () =>
    placeAt(hash ? document.getElementById(hash) : null, restoreOffset);
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (reducedMotion) {
    if (restoreOffset !== null) {
      suppressHashScroll();
      navigate(to);
      window.setTimeout(placeDestination, 80);
      return;
    }
    navigate(to);
    return;
  }
  // Ignore clicks while a swipe is still running.
  if (root.hasAttribute(TRANSITION_ATTRIBUTE)) return;

  window.clearTimeout(instantScrollTimer);
  root.classList.add(INSTANT_SCROLL_CLASS);
  instantScrollTimer = window.setTimeout(
    () => root.classList.remove(INSTANT_SCROLL_CLASS),
    PAGE_SWIPE_DURATION + 2600,
  );
  prewarmFormulaFonts();

  const startViewTransition = (document as ViewTransitionDocument)
    .startViewTransition;
  if (startViewTransition) {
    // Block repeat clicks right away.
    root.setAttribute(TRANSITION_ATTRIBUTE, exit);
    // Warm the outgoing/viewport images and the destination figures in the
    // background: the layout is size-reserved now, so the transition no longer
    // waits for them.
    void prewarmCurrentViewport();
    void preloadImages(preload);
    const begin = () => {
      if (restoreOffset !== null) suppressHashScroll();
      const transition = startViewTransition.call(document, () => {
        const startedAt = performance.now();
        flushSync(() => navigate(to));
        const targetElement = hash ? document.getElementById(hash) : null;
        const place = () => placeAt(targetElement, restoreOffset);
        // First pass: position roughly so the destination's lazy figures start
        // loading near the viewport. A remembered position wins while the same
        // section is on screen; otherwise the target section top aligns.
        place();
        // The captured frame must equal the final frame, so wait for webfonts
        // and the nearby figures and let the layout settle; then place again
        // with exact geometry before the capture happens.
        const fontsReady = (document.fonts?.ready ??
          Promise.resolve()) as Promise<unknown>;
        const imagesReady = Promise.all(
          imagesNearViewport().map(waitForImageLoad),
        );
        return Promise.race([
          Promise.all([fontsReady, imagesReady]),
          sleep(DESTINATION_IMAGES_TIMEOUT),
        ])
          .then(() =>
            waitForLayoutSettle(
              targetElement,
              Math.max(240, 1200 - (performance.now() - startedAt)),
            ),
          )
          .then(() => {
            place();
            if (restoreOffset !== null && hash)
              startRestoreKeeper(hash, restoreOffset);
          });
      });
      void transition.finished
        .catch(() => undefined)
        .finally(() => {
          root.removeAttribute(TRANSITION_ATTRIBUTE);
        });
    };
    begin();
    return;
  }

  // Fallback: slide the current page out, swap, then slide the next one in.
  void prewarmCurrentViewport();
  void preloadImages(preload);
  if (restoreOffset !== null) suppressHashScroll();
  const enter: PageSwipeDirection = exit === "left" ? "right" : "left";
  setPageSwipeEntry(enter);
  root.classList.add(`${EXIT_CLASS_PREFIX}${exit}`);
  window.setTimeout(() => {
    root.classList.remove(`${EXIT_CLASS_PREFIX}${exit}`);
    navigate(to);
    if (restoreOffset !== null) {
      window.setTimeout(() => {
        placeDestination();
        if (hash) startRestoreKeeper(hash, restoreOffset);
      }, 80);
    }
  }, PAGE_SWIPE_DURATION);
}
