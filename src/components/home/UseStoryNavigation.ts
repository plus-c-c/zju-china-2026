import { useCallback, useEffect, useRef, useState } from "react";

export const STORY_STOPS = [
  0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 6, 6, 7, 7, 8, 8,
];

/** Native scrolling controls the timeline without wheel or touch interception. */
export function useStoryNavigation() {
  const [position, setPosition] = useState(0);
  const scrollAnimation = useRef(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const root = document.querySelector<HTMLElement>(".home-scroll-space");
      const viewport = document.querySelector<HTMLElement>(".story-viewport");
      if (!root || !viewport) return;
      const start = root.getBoundingClientRect().top + window.scrollY;
      const units = (window.scrollY - start) / viewport.clientHeight;
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
      const rootTop = root.getBoundingClientRect().top + window.scrollY;
      const targetTop =
        rootTop +
        Math.max(0, Math.min(STORY_STOPS.length - 1, target)) *
          viewport.clientHeight;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      cancelAnimationFrame(scrollAnimation.current);
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
              viewport.clientHeight;
      if (transitionStart !== undefined) {
        window.scrollTo({ top: startTop, behavior: "instant" });
      }
      const distance = targetTop - startTop;
      const startTime = performance.now();
      const animate = (time: number) => {
        const progress = Math.min(1, (time - startTime) / duration);
        const eased =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        window.scrollTo(0, startTop + distance * eased);
        if (progress < 1)
          scrollAnimation.current = requestAnimationFrame(animate);
      };
      scrollAnimation.current = requestAnimationFrame(animate);
    },
    [],
  );
  const stop = Math.floor(position);
  const fraction = position - stop;
  const from = STORY_STOPS[stop];
  const to = STORY_STOPS[Math.min(stop + 1, STORY_STOPS.length - 1)];
  const settledPage = from === to ? from : -1;
  // Character scenes enter in four beats: background, decor/card, text, then
  // the stationary character animation. The outgoing scene clears first.
  const openingCut = from !== to && from >= 0 && to <= 4;
  const hydrogelCut = from === 4 && to === 5;
  const limitationsCut = from === 5 && to === 6;
  const ourSolutionCut = from === 6 && to === 7;
  const selpToOaCut = from === 7 && to === 8;
  const cut =
    openingCut ||
    hydrogelCut ||
    limitationsCut ||
    ourSolutionCut ||
    selpToOaCut;
  const scenePosition = cut ? from : from + (to - from) * fraction;
  const smoothstep = (value: number) => value * value * (3 - 2 * value);
  const clamp = (value: number) => Math.max(0, Math.min(1, value));
  const backgroundProgress = smoothstep(clamp((fraction - 0.18) / 0.2));
  const statementBackgroundProgress = smoothstep(
    clamp((fraction - 0.08) / 0.36),
  );
  const decorProgress = smoothstep(clamp((fraction - 0.38) / 0.18));
  const textProgress = smoothstep(clamp((fraction - 0.56) / 0.22));
  const statementTextProgress = smoothstep(clamp((fraction - 0.46) / 0.5));
  const personProgress = smoothstep(clamp((fraction - 0.78) / 0.22));
  const hydrogelExit = limitationsCut
    ? smoothstep(clamp((fraction - 0.04) / 0.4))
    : 0;
  const hydrogelEntry = hydrogelCut
    ? smoothstep(clamp((fraction - 0.38) / 0.5))
    : 1;
  const limitationsCardsEntry = limitationsCut
    ? smoothstep(clamp((fraction - 0.52) / 0.25))
    : 1;
  const limitationsTitleEntry = limitationsCut
    ? smoothstep(clamp((fraction - 0.76) / 0.22))
    : 1;
  const solutionCrossfade = ourSolutionCut
    ? smoothstep(clamp((fraction - 0.18) / 0.64))
    : selpToOaCut
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
  if (openingCut || hydrogelCut) {
    if (from >= 1 && from <= 4) {
      openingContent[from] = 1;
      openingDecor[from] = 1;
      openingText[from] = 1;
      openingPerson[from] = 1;
      openingDecorExit[from] = backgroundProgress;
      openingTextExit[from] = backgroundProgress;
      openingPersonExit[from] = backgroundProgress;
    }
    if (openingCut) {
      openingContent[to] = 1;
      openingDecor[to] = decorProgress;
      openingText[to] = to === 1 ? statementTextProgress : textProgress;
      openingPerson[to] = personProgress;
    }
  } else if (from === to && from >= 1 && from <= 4) {
    openingContent[from] = 1;
    openingDecor[from] = 1;
    openingText[from] = 1;
    openingPerson[from] = 1;
  } else if (from >= 1 && from <= 4) {
    openingContent[from] = 0;
  }
  const burdenStatReveal = smoothstep(clamp((position - 4.08) / 0.54));
  const cardProgress = clamp((position - 13) / 1.55);
  const yellowExitProgress = Math.max(0, Math.min(1, cardProgress * 2));
  const resultTextProgress = Math.max(
    0,
    Math.min(1, (cardProgress - 0.5) / 0.25),
  );
  const resultEntryProgress = Math.max(
    0,
    Math.min(1, (cardProgress - 0.65) / 0.35),
  );
  const nextSceneStop = STORY_STOPS.findIndex(
    (value, index) => index > position && value > scenePosition,
  );
  return {
    stop,
    page: Math.round(scenePosition),
    settledPage,
    scenePosition,
    crossfade: cut
      ? {
          incoming: to,
          opacity: limitationsCut
            ? 1
            : hydrogelCut
              ? backgroundProgress
              : ourSolutionCut || selpToOaCut
                ? solutionCrossfade
                : to === 1
                  ? statementBackgroundProgress
                  : backgroundProgress,
        }
      : null,
    hydrogelExit,
    hydrogelEntry,
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
    ourSolutionExit: ourSolutionCut
      ? smoothstep(clamp((fraction - 0.04) / 0.52))
      : 0,
    nextScene: () => {
      const target = nextSceneStop >= 0 ? nextSceneStop : position + 1;
      seek(target, 1250, Math.max(0, target - 1));
    },
    next: () => seek(Math.floor(position + 0.001) + 1),
    previous: () => seek(Math.ceil(position - 0.001) - 1),
  };
}
