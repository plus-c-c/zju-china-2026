import { useStory } from "./StoryContext";
import "./HydrogelMaterialsPage.css";

export function HydrogelMaterialsPage() {
  const { next, settled } = useStory();

  return (
    <div
      className="hydrogel-materials-page"
      data-node-id="912:5"
      data-name="Hydrogel materials"
    >
      <img
        alt=""
        aria-hidden="true"
        className="hydrogel-materials-page__bone"
        src={`https://static.igem.wiki/teams/6102/wiki/images/home/home-05-solution-bone.avif`}
      />
      <img
        alt=""
        aria-hidden="true"
        className="hydrogel-materials-page__syringe"
        data-settled={settled}
        src={`https://static.igem.wiki/teams/6102/wiki/images/home/home-05-solution-syringe.avif`}
      />

      <h2 className="hydrogel-materials-page__kicker" data-node-id="912:6">
        <span>No single</span> solution fits all
      </h2>

      <h1 className="hydrogel-materials-page__title" data-node-id="912:7">
        Hydrogel materials
      </h1>

      <h2 className="hydrogel-materials-page__subtitle" data-node-id="912:8">
        Emerging Materials for Tissue Repair
      </h2>

      <div className="hydrogel-materials-page__copy" data-node-id="912:9">
        <p>Biomimetic hydrogels offer excellent</p>
        <p>moldability and mimic the extracellular matrix</p>
        <p>(ECM), making them promising materials for</p>
        <p>filling tissue defects and supporting repair.</p>
      </div>

      <button
        className="hydrogel-materials-page__button"
        data-node-id="912:10"
        onClick={next}
        type="button"
      >
        <span data-node-id="912:11">learn more</span>
      </button>
    </div>
  );
}
