import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./HomeIntro.css";
const openingAnimationUrl = `${import.meta.env.BASE_URL}home-opening/index.html`;

// Keep this across route changes, while allowing a fresh page load to replay.
let openingVisited = false;

type HomeIntroProps = {
  onEnter: () => void;
};

export function HomeIntro({ onEnter }: HomeIntroProps) {
  const [skipAnimation] = useState(() => openingVisited);
  const [finished, setFinished] = useState(false);
  const openingFrame = useRef<HTMLIFrameElement>(null);

  const finishIntro = useCallback(() => {
    setFinished(true);
    window.dispatchEvent(new Event("home-intro-ready"));
  }, []);

  const skipOpening = () => openingFrame.current?.contentWindow?.postMessage(
    { source: "nest-home", type: "finish" }, location.origin,
  );

  useLayoutEffect(() => {
    openingVisited = true;
    window.scrollTo({ top: 0, behavior: "instant" });
    const start = () => openingFrame.current?.contentWindow?.postMessage(
      { source: "nest-home", type: skipAnimation ? "finish" : "start" }, location.origin,
    );
    const receive = (event: MessageEvent) => {
      if (event.source !== openingFrame.current?.contentWindow || event.origin !== location.origin) return;
      if (event.data?.source !== "nest-opening") return;
      if (event.data.type === "ready") {
        window.dispatchEvent(new Event("home-opening-assets-ready"));
        if (!document.querySelector(".loading-screen--visible")) start();
      }
      if (event.data.type === "complete") finishIntro();
    };
    window.addEventListener("message", receive);
    window.addEventListener("page-loading-complete", start);
    return () => {
      window.removeEventListener("message", receive);
      window.removeEventListener("page-loading-complete", start);
    };
  }, [finishIntro, skipAnimation]);

  useEffect(() => {
    if (finished) return;
    let lastWheelAt = 0;
    let rate = 1;
    let resetTimer = 0;
    let touchY = 0;
    const accelerate = () => {
      const now = performance.now();
      rate = now - lastWheelAt < 260 ? Math.min(2, rate + 0.1) : 1;
      lastWheelAt = now;
      const sendRate = (value: number) => openingFrame.current?.contentWindow?.postMessage(
        { source: "nest-home", type: "speed", rate: value }, location.origin,
      );
      sendRate(rate);
      clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => { rate = 1; sendRate(1); }, 300);
    };
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (event.deltaY > 2) accelerate();
    };
    const touchStart = (event: TouchEvent) => { touchY = event.touches[0]?.clientY ?? 0; };
    const touchMove = (event: TouchEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const nextY = event.touches[0]?.clientY ?? touchY;
      if (nextY < touchY) accelerate();
      touchY = nextY;
    };
    const key = (event: KeyboardEvent) => {
      if (event.key === " " && event.target instanceof Element && event.target.closest("button")) return;
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"].includes(event.key)) {
        event.preventDefault(); event.stopImmediatePropagation();
        if (["ArrowDown", "PageDown", " "].includes(event.key)) accelerate();
      }
    };
    window.addEventListener("wheel", wheel, { capture: true, passive: false });
    window.addEventListener("touchstart", touchStart, { capture: true, passive: true });
    window.addEventListener("touchmove", touchMove, { capture: true, passive: false });
    window.addEventListener("keydown", key, true);
    return () => {
      clearTimeout(resetTimer);
      window.removeEventListener("wheel", wheel, true);
      window.removeEventListener("touchstart", touchStart, true);
      window.removeEventListener("touchmove", touchMove, true);
      window.removeEventListener("keydown", key, true);
    };
  }, [finished]);

  useEffect(() => {
    document.documentElement.classList.toggle("home-intro-open", !finished);
    document.body.classList.toggle("home-intro-open", !finished);

    return () => {
      document.documentElement.classList.remove("home-intro-open");
      document.body.classList.remove("home-intro-open");
    };
  }, [finished]);

  return (
    <div
      className={`home-intro${finished ? " home-intro--ready" : ""}`}
      aria-label={
        finished ? "NEST homepage introduction" : "Homepage animation playing"
      }
    >
      <iframe ref={openingFrame} className="home-intro__animation" src={openingAnimationUrl}
        onLoad={() => openingFrame.current?.contentWindow?.postMessage({ source: "nest-home", type: "status" }, location.origin)}
        title="NEST hydrogel opening animation" tabIndex={-1} aria-hidden="true" />
      {!finished && !skipAnimation && (
        <button className="home-intro__skip" type="button" onClick={skipOpening} aria-label="Skip opening animation">
          Skip
        </button>
      )}
      <div className="home-intro__landing" aria-hidden={!finished}>
        <div className="home-intro__brand" aria-label="NEST">
          <span
            className="home-intro__nest home-intro__nest--cyan"
            data-node-id="644:15"
            aria-hidden="true"
          >
            NEST
          </span>
          <span
            className="home-intro__nest home-intro__nest--yellow"
            data-node-id="644:16"
            aria-hidden="true"
          >
            NEST
          </span>
          <span className="home-intro__nest" data-node-id="644:17">
            NEST
          </span>
        </div>
        <p className="home-intro__tagline" data-node-id="741:5">
          <span className="home-intro__initial">N</span>ative-like programmabl<span className="home-intro__initial">E</span> cartilage <span className="home-intro__initial">S</span>caffold<br />for <span className="home-intro__initial">T</span>issue repair
        </p>
        <button
          className="home-intro__next"
          data-node-id="644:24"
          type="button"
          tabIndex={finished ? 0 : -1}
          onClick={onEnter}
        >
          <span className="home-intro__bird-anchor" aria-hidden="true" />
          <span data-node-id="644:25">NEXT</span>
        </button>
      </div>
    </div>
  );
}
