import { createContext } from "react";

export type HomeProgress = {
  scrollY: number;
  storyPosition: number;
};

// Each browser-history entry owns its position; a new Home link starts fresh.
const homeProgress = new Map<string, HomeProgress>();
const returnToStart = new Set<string>();

export const HomeResumeContext = createContext<HomeProgress | null>(null);

export function readHomeProgress(key: string) {
  returnToStart.delete(key);
  return homeProgress.get(key) ?? null;
}

export function saveHomeProgress(key: string, progress: HomeProgress) {
  if (returnToStart.has(key)) return;
  homeProgress.set(key, progress);
}

export function resetHomeProgress(key: string) {
  homeProgress.set(key, { scrollY: 0, storyPosition: 0 });
  // Ignore late scroll events while the module link is leaving the homepage.
  returnToStart.add(key);
}
