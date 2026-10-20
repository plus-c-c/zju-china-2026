import { useLayoutEffect } from "react";
import "./LoadingScreen.css";

type LoadingScreenProps = {
  visible: boolean;
  failed?: boolean;
};

export function LoadingScreen({ visible, failed = false }: LoadingScreenProps) {
  useLayoutEffect(() => {
    if (!visible) return;
    // The page underneath may not be mounted yet. Consume input here rather
    // than letting native scrolling race the homepage's initial positioning.
    const blockScroll = (event: Event) => { event.preventDefault(); event.stopImmediatePropagation(); };
    const blockKey = (event: KeyboardEvent) => {
      if (event.key === " " && event.target instanceof Element && event.target.closest("button")) return;
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
        event.preventDefault();
        event.stopImmediatePropagation();
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
      aria-label={failed ? "Unable to load page resources" : "Loading page"}
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
        {failed ? (
          <div className="loading-screen__error">
            <p>Some resources could not load.</p>
            <button className="loading-screen__reload" type="button" onClick={() => window.location.reload()}>
              Reload
            </button>
          </div>
        ) : (
          <div className="loading-screen__label" aria-hidden="true">
            <span>Loading</span>
            <span className="loading-screen__dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
