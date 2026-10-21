import {
  useEffect,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  lazy,
  Suspense,
  type ReactNode,
  type CSSProperties,
} from "react";
import { useLocation } from "react-router-dom";
import {
  HomeResumeContext, saveHomeProgress, finishHomeReturn, restoreHomeProgress,
} from "../utils/homeProgress";
import { PipelineBird } from "../components/home/PipelineBird";
import { StoryBird } from "../components/home/StoryBird";
import { HomeIntro } from "../components/home/HomeIntro";
import { HomeScrollCue } from "../components/home/HomeScrollCue";
import {
  GlobalBurdenScene,
  OpeningStatement,
  ImpactScene,
} from "../components/home/OpeningStory";
import BirdReturnsToNest from "../components/home/BirdReturnsToNest";
import {
  OsteoarthritisTargetScene,
  SelpAndSnoopLigaseScene,
  SelpPipeline,
} from "../components/home/SELP";
import { HydrogelMaterialsPage } from "../components/home/HydrogelMaterialsPage";
import { MaterialLimitations } from "../components/home/LimitationsCards";
import { Footer } from "../components/Footer";
import "../components/home/Layers.css";
import "./home.css";
import { MobileHome } from "../components/home/MobileHome";

import { StoryContext } from "../components/home/StoryContext";
import {
  STORY_STOPS,
  STORY_SCROLL_RATIO,
  useStoryNavigation,
} from "../components/home/UseStoryNavigation";

// Local route inspection is opt-in and excluded from the production build.
const FlightPathPreview = import.meta.env.DEV
  ? lazy(() => import("../components/home/FlightPathPreview"))
  : null;

function Scene({
  children,
  name,
  index,
  active,
  settled,
  birdProgress,
  birdStage,
  birdLandingProgress,
  next,
  footer = false,
  style,
}: {
  children: ReactNode;
  name: string;
  index: number;
  active: boolean;
  settled: boolean;
  birdProgress: number;
  birdStage: number;
  birdLandingProgress: number;
  next: () => void;
  footer?: boolean;
  style?: CSSProperties;
}) {
  return (
    <section
      id={`home-${index + 1}`}
      className={`home-scene${footer ? " home-footer-scene" : ""}`}
      aria-label={name}
      style={style}
      aria-hidden={!active}
      inert={!active}
    >
      <StoryContext.Provider
        value={{
          active,
          settled,
          birdProgress,
          birdStage,
          birdLandingProgress,
          next,
        }}
      >
        <div className="home-scene-canvas">{children}</div>
      </StoryContext.Provider>
    </section>
  );
}
function DesktopHome() {
  const resume = useContext(HomeResumeContext);
  const {
    position,
    direction,
    stop,
    page,
    settledPage,
    birdProgress,
    birdStage,
    birdLandingProgress,
    next,
    nextScene,
    advance,
    scenePosition,
    crossfade,
    openingContent,
    openingDecor,
    openingText,
    openingPerson,
    openingDecorExit,
    openingTextExit,
    openingPersonExit,
    burdenStatReveal,
    hydrogelEntry,
    hydrogelExit,
    limitationsEntry,
    cardTransition,
    nestTitle,
  } = useStoryNavigation();
  const viewport = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }));
  useLayoutEffect(() => {
    document.body.classList.add("home-story-open");
    document.documentElement.classList.add("home-story-open");
    if (!resume) window.scrollTo(0, 0);
    const element = viewport.current;
    if (element) setSize({ width: element.clientWidth, height: element.clientHeight });
    const observer = new ResizeObserver(([entry]) =>
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      }),
    );
    if (element) observer.observe(element);
    return () => {
      observer.disconnect();
      document.body.classList.remove("home-story-open");
      document.documentElement.classList.remove("home-story-open");
    };
  }, [resume]);
  const scenes = [
    {
      name: "NEST introduction",
      content: <HomeIntro onEnter={nextScene} />,
    },
    {
      name: "Cartilage damage",
      content: <OpeningStatement />,
    },
    {
      name: "Global burden",
      content: <GlobalBurdenScene />,
    },
    {
      name: "Pain and recovery",
      content: <ImpactScene play={openingPerson[3] > 0.96} />,
    },
    { name: "Hydrogel materials", content: <HydrogelMaterialsPage /> },
    {
      name: "Material limitations",
      content: (
        <MaterialLimitations drawProgress={Math.max(0, Math.min(1, (position - 10) / 2.8))} />
      ),
    },
    { name: "Return to NEST", content: <BirdReturnsToNest direction={direction} /> },
    {
      name: "SELP and SnoopLigase2-ZJU",
      content: <SelpAndSnoopLigaseScene />,
    },
    {
      name: "Osteoarthritis target",
      content: <OsteoarthritisTargetScene />,
    },
  ];
  const style = {
    "--scene-scale": Math.min(size.width / 1280, size.height / 720),
    "--screen-height": `${size.height}px`,
    "--screen-width": `${size.width}px`,
  } as CSSProperties;
  return (
    <>
      <div className="home-shared-background" aria-hidden="true" />
      <div
        className="home-scroll-space"
        style={{
          height: ((STORY_STOPS.length - 1) * STORY_SCROLL_RATIO + 1) * size.height,
        }}
      >
        <div
          ref={viewport}
          className="nest-home story-viewport"
          style={style}
          data-story-stop={stop}
          data-story-page={page + 1}
          data-bird-progress={birdProgress}
        >
          <div
            className="story-track"
            style={{
              transform: `translateY(${-scenePosition * size.height}px)`,
            }}
          >
            {scenes.map((scene, index) => (
              <Scene
                key={scene.name}
                name={scene.name}
                index={index}
                style={
                  {
                    "--scene-content-scale": 0.89,
                    ...(crossfade?.incoming === index
                      ? {
                          transform: "translateY(-100%)",
                          opacity: index === 4 ? 1 : crossfade.opacity,
                          zIndex: 2,
                        }
                      : {}),
                    ...(crossfade && page === index && index !== 0 && index !== 2 && index !== 4
                      ? { opacity: crossfade.incoming === 8
                          ? 1 - crossfade.opacity
                          : 1 - Math.min(1, crossfade.opacity * 2) }
                      : {}),
                    ...(index === 0 ? {
                      opacity: page === 0 ? (crossfade?.incoming === 1 ? 1 - Math.min(1, crossfade.opacity * 2) : 1) : 0,
                    } : {}),
                    ...(index >= 1 && index <= 3
                      ? {
                          "--opening-content": openingContent[index],
                          "--opening-enter-left": `${(1 - openingText[index]) * -110}px`,
                          "--opening-enter-right": `${(1 - openingText[index]) * 110}px`,
                          "--opening-text-exit-left": `${openingTextExit[index] * -110}px`,
                          "--opening-text-exit-right": `${openingTextExit[index] * 110}px`,
                          "--opening-y": "0px",
                          "--opening-decor":
                            openingDecor[index] * (1 - openingDecorExit[index]),
                          "--opening-text":
                            openingText[index] * (1 - openingTextExit[index]),
                          "--opening-person":
                            openingPerson[index] *
                            (1 - openingPersonExit[index]),
                          ...(index === 2
                            ? {
                                "--burden-stat-reveal": burdenStatReveal,
                                "--burden-map-opacity":
                                  1 - burdenStatReveal * 0.72,
                                "--burden-legend-opacity":
                                  1 - burdenStatReveal * 0.66,
                              }
                            : {}),
                        }
                      : {}),
                    ...(index === 4
                      ? {
                          "--hydrogel-background-image":
                            "var(--homepage-background)",
                          "--hydrogel-exit": hydrogelExit,
                          "--hydrogel-entry": hydrogelEntry,
                          "--hydrogel-background-entry": crossfade?.incoming === index ? crossfade.opacity : 1,
                          backgroundColor: "transparent",
                          backgroundImage: "none",
                        }
                      : {}),
                    ...(index === 5
                      ? {
                          "--hydrogel-background-image":
                            "var(--homepage-background)",
                          ...(crossfade?.incoming === index
                            ? {
                                backgroundColor: "transparent",
                                backgroundImage: "none",
                              }
                            : {}),
                          "--cards-yellow-y": `${cardTransition.yellowExit * -760}px`,
                          "--limitations-cards-entry": limitationsEntry.cards,
                          "--limitations-cards-y": `${(1 - limitationsEntry.cards) * 32}px`,
                          "--limitations-title-entry": limitationsEntry.title,
                          "--limitations-title-opacity":
                            1 - cardTransition.yellowExit,
                          "--limitations-title-y": `${(1 - limitationsEntry.title) * 18}px`,
                          "--solution-title-opacity":
                            cardTransition.resultTextEntry,
                        }
                      : {}),
                    ...(index === 6 ? { "--nest-title": nestTitle } : {}),
                  } as CSSProperties
                }
                active={page === index || crossfade?.incoming === index}
                settled={
                  index === 4 ? scenePosition >= index : settledPage === index
                }
                birdProgress={birdProgress}
                birdStage={birdStage}
                birdLandingProgress={birdLandingProgress}
                next={next}
              >
                {scene.content}
              </Scene>
            ))}
          </div>
          <StoryBird position={position} direction={direction} scale={Math.min(size.width / 1280, size.height / 720)} />
          <HomeScrollCue onClick={advance} />
        </div>
      </div>
      <SelpPipeline readingWidth={Math.min(size.width / 1280, size.height / 720) * 0.89 * 0.9375 * 1080} />
      <Footer />
      <PipelineBird />
      {FlightPathPreview && new URLSearchParams(location.search).has("flight-path") && (
        <Suspense fallback={null}><FlightPathPreview /></Suspense>
      )}
    </>
  );
}

export function Home() {
  const { key } = useLocation();
  const resume = useContext(HomeResumeContext);
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 991.98px)").matches);
  useLayoutEffect(() => {
    let restoring = !!resume;
    const remember = () => {
      if (restoring) return;
      const viewport = document.querySelector<HTMLElement>(".story-viewport");
      const root = document.querySelector(".home-scroll-space");
      const top = root ? root.getBoundingClientRect().top + window.scrollY : 0;
      saveHomeProgress(key, {
        scrollY: window.scrollY,
        storyPosition: viewport
          ? Math.max(0, Math.min(STORY_STOPS.length - 1,
              (window.scrollY - top) / (viewport.clientHeight * STORY_SCROLL_RATIO)))
          : 0,
      });
    };
    const complete = () => {
      restoring = false;
      finishHomeReturn(key);
      remember();
    };
    const cancelRestore = resume ? restoreHomeProgress(resume, complete) : () => {};
    if (!resume) complete();
    const userInput = () => {
      if (!restoring) return;
      cancelRestore();
      complete();
    };
    window.addEventListener("scroll", remember, { passive: true });
    window.addEventListener("wheel", userInput, { passive: true });
    window.addEventListener("touchstart", userInput, { passive: true });
    window.addEventListener("pointerdown", userInput);
    window.addEventListener("keydown", userInput);
    // Capture the final position before a Link changes the active route.
    document.addEventListener("click", remember, true);
    return () => {
      cancelRestore();
      window.removeEventListener("scroll", remember);
      window.removeEventListener("wheel", userInput);
      window.removeEventListener("touchstart", userInput);
      window.removeEventListener("pointerdown", userInput);
      window.removeEventListener("keydown", userInput);
      document.removeEventListener("click", remember, true);
    };
  }, [key, resume]);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 991.98px)");
    const update = () => setMobile(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return mobile ? <MobileHome /> : <DesktopHome />;
}
