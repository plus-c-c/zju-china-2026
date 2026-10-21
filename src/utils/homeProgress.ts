import { createContext } from "react";

export type HomeProgress = {
  scrollY: number;
  storyPosition: number;
};

// Each browser-history entry owns its position; a new Home link starts fresh.
const homeProgress = new Map<string, HomeProgress>();

export const HomeResumeContext = createContext<HomeProgress | null>(null);

export function readHomeProgress(key: string) {
  return homeProgress.get(key) ?? null;
}

export function saveHomeProgress(key: string, progress: HomeProgress) {
  homeProgress.set(key, progress);
}
