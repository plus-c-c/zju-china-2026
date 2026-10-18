import { useCallback, useEffect, useRef, useState } from "react";

export const STORY_STOPS = [
  0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 8, 8,
];

// One timeline beat takes less than a screen of scrolling.
export const STORY_SCROLL_RATIO = 0.6;

/** Scroll position drives the timeline; one wheel/touch gesture advances a scene. */
export function useStoryNavigation() {
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);
  const [continuousMotion, setContinuousMotion] = useState(false);
  const scrollAnimation = useRef(0);
  const animationActive = useRef(false);
  const animationRate = useRef(1);
  const chaining = useRef(false);
  useEffect(() => {
    let frame = 0;
    let previousUnits = 0;
    const update = () => {
      frame = 0;
      const root = document.querySelector<HTMLElement>(".home-scroll-space");
      const viewport = document.querySelector<HTMLElement>(".story-viewport");
      if (!root || !viewport) return;
      const start = root.getBoundingClientRect().top + window.scrollY;
      const units = (window.scrollY - start) / (viewport.clientHeight * STORY_SCROLL_RATIO);
      if (Math.abs(units - previousUnits) > 0.00001) setDirection(units > previousUnits ? 1 : -1);
      previousUnits = units;
      setPosition(Math.max(0, Math.min(STORY_STOPS.length - 1, units)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  const seek = useCallback(
    (target: number, duration = 0, transitionStart?: number) => {
      const root = document.querySelector<HTMLElement>(".home-scroll-space");
      const viewport = document.querySelector<HTMLElement>(".story-viewport");
      if (!root || !viewport) return;
      window.dispatchEvent(new Event("home-story-seek"));
      const rootTop = root.getBoundingClientRect().top + window.scrollY;
      const targetTop =
        rootTop +
        Math.max(0, Math.min(STORY_STOPS.length - 1, target)) *
          viewport.clientHeight * STORY_SCROLL_RATIO;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      cancelAnimationFrame(scrollAnimation.current);
      animationActive.current = false;
      if (!chaining.current) animationRate.current = 1;
      window.dispatchEvent(new CustomEvent("home-story-speed", { detail: animationRate.current }));
      if (!duration || reducedMotion) {
        window.scrollTo({
          top: targetTop,
          behavior: reducedMotion ? "instant" : "smooth",
        });
        return;
      }

      const startTop =
        transitionStart === undefined
          ? window.scrollY
          : rootTop +
            Math.max(0, Math.min(STORY_STOPS.length - 1, transitionStart)) *
              viewport.clientHeight * STORY_SCROLL_RATIO;
      if (transitionStart !== undefined) {
        window.scrollTo({ top: startTop, behavior: "instant" });
      }
      const distance = targetTop - startTop;
      const continuousTurn = chaining.current;
      let previousTime = performance.now();
      let elapsed = 0;
      let rate = animationRate.current;
      let continuation: { progress: number; eased: number } | null = null;
      animationActive.current = true;
      const animate = (time: number) => {
        const delta = Math.max(0, time - previousTime);
        previousTime = time;
        rate += (animationRate.current - rate) * (1 - Math.exp(-delta / 130));
        elapsed += delta * rate;
        const progress = Math.min(1, elapsed / duration);
        const ordinaryEased = (1 - Math.cos(Math.PI * progress)) / 2;
        if (!continuousTurn && chaining.current && !continuation) {
          continuation = { progress, eased: ordinaryEased };
        }
        // Continue from the current pose without a positional jump or the
        // end-of-page braking used for a single deliberate gesture.
        const eased = continuousTurn ? progress : continuation
          ? continuation.eased + (1 - continuation.eased) *
            (progress - continuation.progress) / Math.max(0.0001, 1 - continuation.progress)
          : ordinaryEased;
        window.scrollTo(0, startTop + distance * eased);
        if (progress < 1) scrollAnimation.current = requestAnimationFrame(animate);
        else {
          animationActive.current = false;
          window.dispatchEvent(new Event("home-story-arrived"));
        }
      };
      scrollAnimation.current = requestAnimationFrame(animate);
    },
    [],
  );
  useEffect(() => {
    let lastWheelAt = 0;
    let gestureStartedAt = 0;
    let sustained = false;
    let inputEndTimer = 0;
    let gestureDirection = 0;
    let settledAt = 0;
    let wheelDistance = 0;
    let continuationDistance = 0;
    let lastIntentAt = 0;
    let touchY: number | null = null;
    let touchX = 0;
    let touchConsumed = false;
    // The map reveal and card draw each need their own deliberate gesture.
    const targets = [0, 2, 4, 4.8, 6, 8, 10, 12.8, 14, 19, 21];
    const readPosition = () => {
      const root = document.querySelector<HTMLElement>(".home-scroll-space");
      const viewport = document.querySelector<HTMLElement>(".story-viewport");
      if (!root || !viewport) return null;
      const top = root.getBoundingClientRect().top + window.scrollY;
      const end = top + root.offsetHeight - viewport.clientHeight;
      return {
        top, end,
        value: (window.scrollY - top) / (viewport.clientHeight * STORY_SCROLL_RATIO),
      };
    };
    const isControl = (target: EventTarget | null) =>
      target instanceof Element && !!target.closest("nav, input, textarea, select, [role=dialog]");
    const turn = (direction: number, value: number) => {
      const presentScene = STORY_STOPS[Math.min(STORY_STOPS.length - 1, Math.max(0, Math.floor(value + 0.001)))];
      const target = direction > 0
        ? targets.find((beat) => beat > value + 0.08)
        : [...targets].reverse().find((beat) => beat < value - 0.08 &&
            (STORY_STOPS[Math.floor(beat)] < presentScene ||
              (presentScene === 2 && value > 4.1 && beat === 4) ||
              (presentScene === 5 && value > 11 && beat === 10)));
      if (target === undefined) return false;
      const drawingCards = presentScene === 5 && (target === 12.8 || (direction < 0 && value > 11));
      const duration = drawingCards ? 2000 : 1500;
      const nextScene = STORY_STOPS[Math.floor(target)];
      const currentScene = STORY_STOPS[Math.max(0, Math.min(STORY_STOPS.length - 1, Math.floor(value)))];
      const transitionStart = nextScene !== currentScene
        ? direction > 0
          ? Math.max(value, STORY_STOPS.indexOf(nextScene) - 1)
          : Math.min(value, STORY_STOPS.indexOf(currentScene))
        : undefined;
      const arrival = direction < 0 && nextScene !== currentScene
        ? STORY_STOPS.lastIndexOf(nextScene)
        : target;
      continuationDistance = 0;
      seek(arrival, duration, transitionStart);
      return true;
    };
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || (event.target instanceof Element && !!event.target.closest("nav, input, textarea, select, [role=dialog]"))) return;
      const current = readPosition();
      if (!current || window.scrollY < current.top - 1 || window.scrollY > current.end + 1) return;
      // The lower document route owns scrolling after the OA arrival.
      if (current.value >= 21 && event.deltaY > 0 && !animationActive.current) return;
      const now = performance.now();
      const quiet = now - lastWheelAt > 260;
      lastWheelAt = now;
      const inputDirection = Math.sign(event.deltaY);
      const reversed = gestureDirection !== 0 && inputDirection !== gestureDirection;
      if (quiet || reversed) {
        gestureStartedAt = now;
        sustained = false;
        chaining.current = false;
        setContinuousMotion(false);
        wheelDistance = 0;
        continuationDistance = 0;
      }
      const wheelDelta = event.deltaY * (event.deltaMode === 0 ? 1 : 16);
      // Small trackpad momentum tails must not request another scene.
      const deliberateInput = Math.abs(wheelDelta) >= 4;
      if (deliberateInput) lastIntentAt = now;
      sustained = !quiet && now - gestureStartedAt > 240;
      if (sustained) {
        chaining.current = true;
        setContinuousMotion(true);
      }
      clearTimeout(inputEndTimer);
      inputEndTimer = window.setTimeout(() => {
        if (!animationActive.current) setContinuousMotion(false);
      }, 280);
      gestureDirection = inputDirection;
      const birdFlying = !!document.querySelector(".story-guide-bird--flying");
      if (animationActive.current || birdFlying) {
        wheelDistance = 0;
        settledAt = now;
        event.preventDefault();
        if (deliberateInput) continuationDistance += Math.min(32, Math.abs(wheelDelta));
        if (deliberateInput && !quiet && !reversed) {
          animationRate.current = Math.min(1.25, animationRate.current + 0.05);
          window.dispatchEvent(new CustomEvent("home-story-speed", { detail: animationRate.current }));
        }
        return;
      }
      if (!reversed && quiet && now - settledAt < 100) { event.preventDefault(); return; }
      if (!deliberateInput) { event.preventDefault(); return; }
      wheelDistance += Math.sign(wheelDelta) * Math.min(80, Math.abs(wheelDelta));
      if (Math.abs(wheelDistance) < 64) { event.preventDefault(); return; }
      chaining.current = sustained;
      if (turn(wheelDistance > 0 ? 1 : -1, current.value)) {
        event.preventDefault();
      }
    };
    const continueStory = () => {
      if (!sustained || continuationDistance < 160 || performance.now() - lastIntentAt > 90 || animationActive.current) return;
      if (document.querySelector(".story-guide-bird--flying")) return;
      const current = readPosition();
      if (!current || (current.value >= 21 && gestureDirection > 0)) return;
      chaining.current = true;
      turn(gestureDirection, current.value);
    };
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1 || isControl(event.target)) return;
      touchConsumed = false;
      touchY = event.touches[0].clientY;
      touchX = event.touches[0].clientX;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (touchConsumed) { event.preventDefault(); return; }
      if (touchY === null || event.touches.length !== 1) return;
      const current = readPosition();
      if (!current || window.scrollY < current.top - 1 || window.scrollY > current.end + 1) return;
      const delta = touchY - event.touches[0].clientY;
      if (Math.abs(delta) <= Math.abs(touchX - event.touches[0].clientX)) return;
      if ((current.value <= 0 && delta < 0) || (current.value >= targets[targets.length - 1] && delta > 0)) return;
      event.preventDefault();
      if (animationActive.current) {
        animationRate.current = Math.min(1.45, animationRate.current + 0.08);
        return;
      }
      if (Math.abs(delta) > 35 && !animationActive.current) {
        turn(delta > 0 ? 1 : -1, current.value);
        touchConsumed = true;
      }
    };
    const onTouchEnd = () => { touchY = null; touchConsumed = false; };
    window.addEventListener("home-story-arrived", continueStory);
    window.addEventListener("home-bird-landed", continueStory);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("home-story-arrived", continueStory);
      window.removeEventListener("home-bird-landed", continueStory);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(scrollAnimation.current);
      clearTimeout(inputEndTimer);
    };
  }, [seek]);
  const stop = Math.floor(position);
  const fraction = position - stop;
  const from = STORY_STOPS[stop];
  const to = STORY_STOPS[Math.min(stop + 1, STORY_STOPS.length - 1)];
  const settledPage = from === to ? from : -1;
  // Overlap the background, text and character entrances during each turn.
  const openingCut = from !== to && from >= 0 && to <= 3;
  const hydrogelCut = from === 3 && to === 4;
  const limitationsCut = from === 4 && to === 5;
  const solutionCut = from === 7 && to === 8;
  const chapterCut = (from === 5 && to === 6) || (from === 6 && to === 7);
  const cut = openingCut || hydrogelCut || limitationsCut || solutionCut || chapterCut;
  const smoothstep = (value: number) => value * value * (3 - 2 * value);
  const clamp = (value: number) => Math.max(0, Math.min(1, value));
  const scenePosition = cut ? from : from + (to - from) * smoothstep(fraction);
  const backgroundProgress = continuousMotion ? clamp(fraction / 0.9) : smoothstep(clamp((fraction - 0.02) / 0.9));
  const statementBackgroundProgress = backgroundProgress;
  const decorProgress = continuousMotion ? clamp(fraction / 0.9) : smoothstep(clamp((fraction - 0.38) / 0.6));
  const textProgress = continuousMotion ? clamp(fraction / 0.95) : smoothstep(clamp((fraction - 0.42) / 0.56));
  const statementTextProgress = textProgress;
  const personProgress = continuousMotion ? clamp(fraction / 0.95) : smoothstep(clamp((fraction - 0.46) / 0.52));
  const hydrogelCrossfade = smoothstep(clamp((fraction - 0.04) / 0.92));
  const hydrogelExit = limitationsCut
    ? smoothstep(clamp((fraction - 0.04) / 0.4))
    : 0;
  const limitationsCardsEntry = limitationsCut
    ? smoothstep(clamp((fraction - 0.26) / 0.6))
    : 1;
  const limitationsTitleEntry = limitationsCut
    ? smoothstep(clamp((fraction - 0.4) / 0.56))
    : 1;
  const solutionCrossfade = solutionCut
    ? smoothstep(clamp((fraction - 0.08) / 0.72))
    : 1;
  const openingContent: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
  const openingDecor: Record<number, number> = { 1: 1, 2: 0, 3: 0, 4: 0 };
  const openingText: Record<number, number> = { 1: 1, 2: 0, 3: 0, 4: 0 };
  const openingPerson: Record<number, number> = { 1: 1, 2: 0, 3: 0, 4: 0 };
  const openingDecorExit: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  };
  const openingTextExit: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  };
  const openingPersonExit: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  };
  if (openingCut) {
    if (from >= 1 && from <= 3) {
      openingContent[from] = 1;
      openingDecor[from] = 1;
      openingText[from] = 1;
      openingPerson[from] = 1;
      // Crossfade the two maps together so their opacity never accumulates.
      openingDecorExit[from] = backgroundProgress;
      openingTextExit[from] = smoothstep(clamp(fraction / 0.38));
      openingPersonExit[from] = smoothstep(clamp(fraction / 0.38));
    }
    openingContent[to] = 1;
    openingDecor[to] = decorProgress;
    openingText[to] = to === 1 ? statementTextProgress : textProgress;
    openingPerson[to] = personProgress;
  } else if (hydrogelCut) {
    openingContent[from] = 1;
    openingDecor[from] = 1;
    openingText[from] = 1;
    openingPerson[from] = 1;
  } else if (from === to && from >= 1 && from <= 3) {
    openingContent[from] = 1;
    openingDecor[from] = 1;
    openingText[from] = 1;
    openingPerson[from] = 1;
  } else if (from >= 1 && from <= 3) {
    openingContent[from] = 0;
  }
  const burdenStatReveal = smoothstep(clamp((position - 4.08) / 0.54));
  const cardProgress = clamp((position - 11) / 1.55);
  const yellowExitProgress = Math.max(0, Math.min(1, cardProgress * 2));
  const resultTextProgress = Math.max(
    0,
    Math.min(1, (cardProgress - 0.5) / 0.25),
  );
  const resultEntryProgress = Math.max(
    0,
    Math.min(1, (cardProgress - 0.65) / 0.35),
  );
  const reveal = (start: number) => clamp((position - start) / 0.35);
  const nextSceneStop = STORY_STOPS.findIndex(
    (value, index) => index > position && value > scenePosition,
  );
  return {
    position,
    direction,
    stop,
    page: Math.round(scenePosition),
    settledPage,
    scenePosition,
    crossfade: cut
      ? {
          incoming: to,
          opacity: hydrogelCut
            ? hydrogelCrossfade
            : limitationsCut
            ? 1
            : solutionCut
              ? solutionCrossfade
              : to === 1
                ? statementBackgroundProgress
                : backgroundProgress,
        }
      : null,
    hydrogelEntry: hydrogelCut ? smoothstep(clamp((fraction - 0.28) / 0.72)) : 1,
    hydrogelExit,
    limitationsEntry: {
      cards: limitationsCardsEntry,
      title: limitationsTitleEntry,
    },
    openingContent,
    openingDecor,
    openingText,
    openingPerson,
    openingDecorExit,
    openingTextExit,
    openingPersonExit,
    burdenStatReveal,
    cardTransition: {
      yellowExit: smoothstep(yellowExitProgress),
      resultTextEntry: smoothstep(resultTextProgress),
      resultEntry: smoothstep(resultEntryProgress),
    },
    nestTitle: reveal(13.25),
    // Spread the flight across both stationary bird-scene intervals.
    birdProgress: clamp((position - 15) / 2),
    birdStage: position < 16 ? 0 : position < 17 ? 1 : 2,
    birdLandingProgress: clamp((position - 17) / 0.85),
    nextScene: () => {
      const target = nextSceneStop >= 0 ? nextSceneStop : position + 1;
      seek(target, 1500, Math.max(position, target - 1));
    },
    next: () => seek(Math.floor(position + 0.001) + 1),
    previous: () => seek(Math.ceil(position - 0.001) - 1),
  };
}
