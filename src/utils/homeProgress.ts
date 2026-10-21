import { createContext } from "react";
import { STORY_STOPS, STORY_SCROLL_RATIO } from "../components/home/storyTimeline";

export type HomeReturnTarget = "selp" | "magnetic" | "gag" | "mitochondrial";

const SELP_BEAT = STORY_STOPS.indexOf(7);

export type HomeProgress = {
  scrollY: number;
  storyPosition: number;
  returnTarget?: HomeReturnTarget;
};

// Each browser-history entry owns its position; a new Home link starts fresh.
const homeProgress = new Map<string, HomeProgress>();
const pinnedEntries = new Set<string>();

export const HomeResumeContext = createContext<HomeProgress | null>(null);

export function readHomeProgress(key: string) {
  return homeProgress.get(key) ?? null;
}

export function saveHomeProgress(key: string, progress: HomeProgress) {
  if (pinnedEntries.has(key)) return;
  homeProgress.set(key, progress);
}

export function pinHomeReturnTarget(key: string, returnTarget: HomeReturnTarget) {
  homeProgress.set(key, {
    scrollY: homeProgress.get(key)?.scrollY ?? 0,
    storyPosition: returnTarget === "selp" ? SELP_BEAT : STORY_STOPS.length - 1,
    returnTarget,
  });
  // Preserve the link's destination until the homepage has actually restored it.
  pinnedEntries.add(key);
}

export function finishHomeReturn(key: string) {
  pinnedEntries.delete(key);
}

/** Resolve a named scene against the current layout, rather than old pixels. */
export function resolveHomeProgress(progress: HomeProgress): HomeProgress {
  const target = progress.returnTarget;
  if (!target) return progress;
  const viewport = document.querySelector<HTMLElement>(".story-viewport");
  if (target === "selp") {
    const root = document.querySelector(".home-scroll-space");
    if (viewport && root) return {
      ...progress,
      // Round into the stationary scene, never back into the preceding fade.
      scrollY: Math.ceil(root.getBoundingClientRect().top + window.scrollY
        + SELP_BEAT * viewport.clientHeight * STORY_SCROLL_RATIO),
      storyPosition: SELP_BEAT,
    };
    const section = document.querySelector('.mobile-home section[aria-label="SELP and Ligation system"]');
    if (section) return {
      ...progress,
      scrollY: section.getBoundingClientRect().top + window.scrollY,
      storyPosition: 0,
    };
  } else {
    const stage = document.querySelector(`.selp-pipeline__stage--${target}`);
    if (stage) {
      const bounds = stage.getBoundingClientRect();
      return {
        ...progress,
        scrollY: Math.max(0, bounds.top + window.scrollY
          - Math.max(0, (window.innerHeight - bounds.height) / 2)),
        storyPosition: viewport ? STORY_STOPS.length - 1 : 0,
      };
    }
  }
  return progress;
}

/** Keep native scroll anchoring from following a temporary, unmeasured layout. */
export function restoreHomeProgress(progress: HomeProgress, onComplete: () => void) {
  const rootStyle = document.documentElement.style;
  const previousAnchor = rootStyle.overflowAnchor;
  rootStyle.overflowAnchor = "none";
  const startedAt = performance.now();
  let frame = 0;
  let active = true;
  let previousTarget = NaN;
  let stableFrames = 0;
  const cancel = () => {
    if (!active) return;
    active = false;
    cancelAnimationFrame(frame);
    rootStyle.overflowAnchor = previousAnchor;
  };
  const restore = () => {
    const { scrollY } = resolveHomeProgress(progress);
    stableFrames = Math.abs(previousTarget - scrollY) < 0.5
      && Math.abs(window.scrollY - scrollY) < 0.5 ? stableFrames + 1 : 0;
    previousTarget = scrollY;
    window.scrollTo({ top: scrollY, behavior: "instant" });
    if ((stableFrames >= 2 && document.fonts?.status !== "loading")
      || performance.now() - startedAt >= 2000) {
      cancel();
      onComplete();
    } else frame = requestAnimationFrame(restore);
  };
  restore();
  return cancel;
}
