import { createContext, useContext } from "react";
export const StoryContext = createContext({
  active: false,
  settled: false,
  next: () => {},
});
export const useStory = () => useContext(StoryContext);
