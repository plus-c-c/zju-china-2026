import { useEffect, useRef, useState, type CSSProperties } from "react";
import { GlobalBurdenScene, ImpactScene } from "../components/home/OpeningStory";
import "../components/home/OpeningStory.css";

type CssVars = CSSProperties & Record<`--${string}`, string | number>;

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));
const easeOut = (value: number) => 1 - Math.pow(1 - value, 3);
const cosineEase = (value: number) => (1 - Math.cos(Math.PI * value)) / 2;
const smoothstep = (value: number) => {
  const x = clamp(value);
  return x * x * (3 - 2 * x);
};
const wait = (duration: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, duration));

function useSceneScale() {
  const [scale, setScale] = useState(() =>
    Math.min(window.innerWidth / 1280, window.innerHeight / 720),
  );
  useEffect(() => {
    const update = () =>
      setScale(Math.min(window.innerWidth / 1280, window.innerHeight / 720));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return scale;
}

/**
 * The original homepage does not scroll the two opening scenes through a
 * viewport. It holds one sticky stage and crossfades the incoming scene over
 * the outgoing one while the outgoing title, map and character exit.
 *
 * These two scene states mirror that timeline exactly, driven by time instead
 * of a wheel gesture.
 */
const globalVars = (
  reveal: number,
  stat: number,
  transition: number,
): CssVars => {
  const background = smoothstep((transition - 0.02) / 0.9);
  const textExit = smoothstep(transition / 0.38);
  const personExit = smoothstep(transition / 0.38);
  return {
    "--opening-content": reveal,
    "--opening-y": `${(1 - reveal) * 24}px`,
    "--opening-decor": reveal * (1 - background),
    "--opening-text": reveal * (1 - textExit),
    "--opening-person": reveal * (1 - personExit),
    "--opening-text-exit-left": `${textExit * -110}px`,
    "--opening-text-exit-right": `${textExit * 110}px`,
    "--global-exit": background,
    "--burden-stat-reveal": stat,
    "--burden-map-opacity": 1 - stat * 0.72,
    "--burden-legend-opacity": 1 - stat * 0.66,
  };
};

const impactVars = (transition: number): CssVars => {
  const background = smoothstep((transition - 0.02) / 0.9);
  const decor = smoothstep((transition - 0.38) / 0.6);
  const text = smoothstep((transition - 0.42) / 0.56);
  const person = smoothstep((transition - 0.46) / 0.52);
  return {
    "--opening-content": 1,
    "--opening-y": "0px",
    "--opening-decor": decor,
    "--opening-text": text,
    "--opening-person": person,
    "--opening-enter-left": "0px",
    "--opening-enter-right": "0px",
    "--impact-scene-opacity": background,
  };
};

const FIRST_STAT_HOLD = 500;
const SECOND_STAT_HOLD = 1900;
const TRANSITION_DURATION = 2100;
const IMPACT_TAIL_HOLD = 2000;
const RESET_FADE = 480;

export function StandaloneHome() {
  const scale = useSceneScale();
  const [globalReveal, setGlobalReveal] = useState(0);
  const [statReveal, setStatReveal] = useState(0);
  const [transition, setTransition] = useState(0);
  const [studyPhase, setStudyPhase] = useState(0);
  const [impactStep, setImpactStep] = useState(0);
  const fadeRef = useRef<HTMLDivElement>(null);
  const statLive = statReveal > 0.62;

  useEffect(() => {
    let cancelled = false;
    let frame = 0;

    const tween = (
      duration: number,
      setter: (value: number) => void,
      delay = 0,
      easing: (value: number) => number = easeOut,
    ) =>
      new Promise<void>((resolve) => {
        const startedAt = performance.now() + delay;
        const tick = (now: number) => {
          if (cancelled) {
            resolve();
            return;
          }
          const progress = clamp((now - startedAt) / duration);
          setter(easing(progress));
          if (progress < 1) frame = requestAnimationFrame(tick);
          else resolve();
        };
        frame = requestAnimationFrame(tick);
      });

    const run = async () => {
      let first = true;
      while (!cancelled) {
        if (first) {
          setGlobalReveal(0);
          setStatReveal(0);
          setTransition(0);
          setStudyPhase(0);
          setImpactStep(0);
          await wait(250);
        }

        if (cancelled) break;

        // The first chapter's title/map entrance and the study statistic
        // share the same reveal; the count and the 2-in-3 result then occupy
        // the same position in sequence.
        const reveal = tween(1800, setGlobalReveal);
        const stat = tween(1100, setStatReveal, 850);

        if (!first) {
          // The previous cycle faded to the page background. Bring the new
          // first frame through that curtain instead of showing a blank page.
          await wait(180);
          fadeRef.current?.classList.remove("is-visible");
        }

        await Promise.all([reveal, stat]);
        if (cancelled) break;

        await wait(FIRST_STAT_HOLD);
        if (cancelled) break;
        setStudyPhase(1);
        await wait(SECOND_STAT_HOLD);
        if (cancelled) break;

        // Sticky crossfade: the stage itself does not move. The global scene
        // exits in place while the impact scene fades over it.
        await tween(TRANSITION_DURATION, setTransition, 0, cosineEase);
        if (cancelled) break;

        // Two staggered columns: lower-right enters first, its number settles,
        // then upper-left enters and its number settles.
        setImpactStep(1);
        await wait(700);
        if (cancelled) break;
        setImpactStep(2);
        await wait(1200);
        if (cancelled) break;
        setImpactStep(3);
        await wait(700);
        if (cancelled) break;
        setImpactStep(4);
        await wait(IMPACT_TAIL_HOLD);
        if (cancelled) break;

        fadeRef.current?.classList.add("is-visible");
        await wait(RESET_FADE);
        if (cancelled) break;

        setGlobalReveal(0);
        setStatReveal(0);
        setTransition(0);
        setStudyPhase(0);
        setImpactStep(0);
        first = false;
      }
    };

    void run();
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="sa-page">
      <div className="sa-background" aria-hidden="true" />
      <div ref={fadeRef} className="sa-fade" aria-hidden="true" />

      <main className="sa-stage-wrap">
        <div
          className="story-viewport sa-viewport"
          style={
            {
              "--scene-scale": scale,
              "--scene-content-scale": 1,
              "--screen-height": "100dvh",
              "--screen-width": "100vw",
            } as CssVars
          }
        >
          <div className="sa-stage">
            <div
              className={`home-scene sa-scene sa-scene--global${statLive ? " is-stat-live" : ""}`}
              id="home-3"
              aria-label="A world in pain, and a need for repair"
              style={
                {
                  "--screen-height": "100dvh",
                  ...globalVars(globalReveal, statReveal, transition),
                } as CssVars
              }
            >
              <div className="home-scene-canvas">
                <GlobalBurdenScene />
                <div
                  className={`sa-study-stats${studyPhase === 1 ? " is-second" : ""}`}
                  role="group"
                  aria-label="A study of more than 25,000 knee arthroscopies found cartilage lesions in roughly two-thirds of the examined knees."
                >
                  <div
                    className="sa-study-stat sa-study-stat--count"
                    aria-hidden={studyPhase === 1}
                  >
                    <span className="sa-study-kicker">A study of more than</span>
                    <strong className="sa-study-number">25,000</strong>
                    <span className="sa-study-label">knee arthroscopies</span>
                  </div>
                  <div
                    className="sa-study-stat sa-study-stat--result"
                    aria-hidden={studyPhase === 0}
                  >
                    <span className="sa-study-kicker">
                      found cartilage lesions in roughly
                    </span>
                    <strong className="sa-study-number">2 in 3</strong>
                    <span className="sa-study-label">examined knees</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`home-scene sa-scene sa-scene--impact${impactStep >= 1 ? " is-right-in" : ""}${impactStep >= 2 ? " is-right-number" : ""}${impactStep >= 3 ? " is-left-in" : ""}${impactStep >= 4 ? " is-left-number" : ""}`}
              id="home-4"
              aria-label="Pain, recovery and the cost of care"
              style={
                {
                  "--screen-height": "100dvh",
                  ...impactVars(transition),
                } as CssVars
              }
            >
              <div className="home-scene-canvas">
                <ImpactScene play />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
