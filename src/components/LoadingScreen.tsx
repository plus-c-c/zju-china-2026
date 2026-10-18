import { useLayoutEffect } from "react";
import "./LoadingScreen.css";

type LoadingScreenProps = {
  visible: boolean;
};

export function LoadingScreen({ visible }: LoadingScreenProps) {
  useLayoutEffect(() => {
    if (!visible) return;
    // The page underneath may not be mounted yet. Consume input here rather
    // than letting native scrolling race the homepage's initial positioning.
    const blockScroll = (event: Event) => event.preventDefault();
    const blockKey = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
        event.preventDefault();
      }
    };
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    window.addEventListener("wheel", blockScroll, { capture: true, passive: false });
    window.addEventListener("touchmove", blockScroll, { capture: true, passive: false });
    window.addEventListener("keydown", blockKey, true);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("wheel", blockScroll, true);
      window.removeEventListener("touchmove", blockScroll, true);
      window.removeEventListener("keydown", blockKey, true);
    };
  }, [visible]);

  return (
    <div
      className={`loading-screen${visible ? " loading-screen--visible" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      aria-hidden={!visible}
    >
      <div className="loading-screen__content">
        <div className="loading-screen__bird" aria-hidden="true">
          <img
            src={`https://static.igem.wiki/teams/6102/wiki/images/loading-bird.avif`}
            alt=""
            width="2360"
            height="1640"
          />
        </div>
        <div className="loading-screen__label" aria-hidden="true">
          <span>Loading</span>
          <span className="loading-screen__dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>
      </div>
    </div>
  );
}
