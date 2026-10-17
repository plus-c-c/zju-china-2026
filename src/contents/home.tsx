import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";
import { PipelineBird } from "../components/home/PipelineBird";
import { StoryBird } from "../components/home/StoryBird";
import { HomeIntro } from "../components/home/HomeIntro";
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
  const [size, setSize] = useState({ width: 1280, height: 720 });
  useEffect(() => {
    document.body.classList.add("home-story-open");
    document.documentElement.classList.add("home-story-open");
    window.scrollTo(0, 0);
    const element = viewport.current;
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
  }, []);
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
        <MaterialLimitations yellowRemoved={cardTransition.yellowExit > 0.98} />
      ),
    },
    { name: "Return to NEST", content: <BirdReturnsToNest /> },
    {
      name: "SELP and SnoopLigase-ZJU",
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
                    "--scene-content-scale": index === 2 || index === 3 ? 1 : 0.89,
                    ...(crossfade?.incoming === index
                      ? {
                          transform: "translateY(-100%)",
                          opacity: index === 4 ? 1 : index === 8 ? Math.max(0, (crossfade.opacity - 0.5) * 2) : crossfade.opacity,
                          zIndex: 2,
                        }
                      : {}),
                    ...(crossfade && page === index && index !== 0 && index !== 2 && index !== 4
                      ? { opacity: 1 - Math.min(1, crossfade.opacity * 2) }
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
        </div>
      </div>
      <SelpPipeline />
      <Footer />
      <PipelineBird />
    </>
  );
}

export function Home() {
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 991.98px)").matches);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 991.98px)");
    const update = () => setMobile(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return mobile ? <MobileHome /> : <DesktopHome />;
}
