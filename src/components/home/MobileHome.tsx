import { HomeIntro } from "./HomeIntro";
import {
  OpeningStatement,
  GlobalBurdenScene,
  ImpactScene,
} from "./OpeningStory";
import { HydrogelMaterialsPage } from "./HydrogelMaterialsPage";
import { MaterialLimitations } from "./LimitationsCards";
import {
  SelpAndSnoopLigaseScene,
  OsteoarthritisTargetScene,
  SelpPipeline,
} from "./SELP";
import { StoryContext } from "./StoryContext";
import { Footer } from "../Footer";
import bird from "../../assets/home/guide-bird-rest.avif";
import "./MobileHome.css";

// Mobile uses the same content and controls in a readable, native scroll layout.
export function MobileHome() {
  const next = () =>
    document
      .getElementById("mobile-cartilage")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  return (
    <StoryContext.Provider
      value={{
        active: true,
        settled: true,
        birdProgress: 1,
        birdStage: 2,
        birdLandingProgress: 1,
        next,
      }}
    >
      <div className="mobile-home nest-home">
        <section className="mobile-home__intro" aria-label="NEST introduction">
          <HomeIntro onEnter={next} />
        </section>
        <section id="mobile-cartilage" aria-label="Cartilage damage">
          <OpeningStatement />
        </section>
        <section aria-label="Global burden">
          <GlobalBurdenScene />
        </section>
        <section aria-label="Pain and recovery">
          <ImpactScene play={false} />
        </section>
        <section aria-label="Hydrogel materials">
          <StoryContext.Provider
            value={{
              active: true,
              settled: true,
              birdProgress: 1,
              birdStage: 2,
              birdLandingProgress: 1,
              next: () =>
                document
                  .getElementById("mobile-limitations")
                  ?.scrollIntoView({ behavior: "smooth" }),
            }}
          >
            <HydrogelMaterialsPage />
          </StoryContext.Provider>
        </section>
        <section id="mobile-limitations" aria-label="Material limitations">
          <MaterialLimitations yellowRemoved={false} />
        </section>
        <section aria-label="Our solution">
          <MaterialLimitations yellowRemoved />
        </section>
        <section className="mobile-home__nest" aria-label="NEST scaffold">
          <h2>NEST</h2>
          <img
            src="https://static.igem.wiki/teams/6102/wiki/images/home/bird-return-bone-2.avif"
            alt="NEST bird resting on a cartilage scaffold"
          />
        </section>
        <section aria-label="SELP and Link system">
          <SelpAndSnoopLigaseScene />
        </section>
        <section aria-label="Osteoarthritis target">
          <OsteoarthritisTargetScene />
        </section>
        <SelpPipeline />
        <img className="mobile-home__footer-bird" src={bird} alt="NEST bird" />
        <Footer />
      </div>
    </StoryContext.Provider>
  );
}
