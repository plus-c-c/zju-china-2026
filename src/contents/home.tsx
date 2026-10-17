import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";
import { HomeIntro } from "../components/home/HomeIntro";
import {
  GlobalBurdenScene,
  OpeningStatement,
  RehabilitationScene,
  SportsTraumaScene,
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

import { StoryContext } from "../components/home/StoryContext";
import {
  STORY_STOPS,
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
export function Home() {
  const {
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
      content: <GlobalBurdenScene play={openingPerson[2] > 0.96} />,
    },
    {
      name: "Sports trauma",
      content: <SportsTraumaScene play={openingPerson[3] > 0.96} />,
    },
    {
      name: "Post-operative rehabilitation",
      content: <RehabilitationScene play={openingPerson[4] > 0.96} />,
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
      <div
        className="home-scroll-space"
        style={{
          height: STORY_STOPS.length * size.height,
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
                    ...(crossfade?.incoming === index
                      ? {
                          transform: "translateY(-100%)",
                          opacity: crossfade.opacity,
                          zIndex: 2,
                        }
                      : {}),
                    ...(index >= 1 && index <= 4
                      ? {
                          ...(index === 1
                            ? {
                                backgroundColor: "#bdd8fb",
                                backgroundImage: `url("${import.meta.env.BASE_URL}images/home/opening-bubbles-background.png")`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                              }
                            : {}),
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
                                "--burden-stat-y": `${(1 - burdenStatReveal) * 18}px`,
                              }
                            : {}),
                        }
                      : {}),
                    ...(index === 5
                      ? {
                          "--hydrogel-background-image":
                            "radial-gradient(circle at 50% 50%, #eef6ff 0%, #d7eaff 48%, #afd6f8 100%)",
                          "--hydrogel-exit": hydrogelExit,
                        }
                      : {}),
                    ...(index === 6
                      ? {
                          "--hydrogel-background-image":
                            "radial-gradient(circle at 50% 50%, #eef6ff 0%, #d7eaff 48%, #afd6f8 100%)",
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
                    ...(index === 7 ? { "--nest-title": nestTitle } : {}),
                  } as CSSProperties
                }
                active={page === index || crossfade?.incoming === index}
                settled={
                  index === 5 ? scenePosition >= index : settledPage === index
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
        </div>
      </div>
      <SelpPipeline />
      <Footer />
    </>
  );
}
