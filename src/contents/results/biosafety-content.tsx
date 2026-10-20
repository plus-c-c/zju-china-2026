import { FigureCaption } from "../../components/FigureCaption";

export const BIOSAFETY_FIGURE_URL =
  "https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/19-2.avif";

export function BiosafetyIntroduction() {
  return (
    <p>
      Beyond material properties and module-specific functions, we also examined
      how NEST components performed in the presence of cells. We used the{" "}
      <strong>CCK-8 assay</strong> to assess the relative cell viability of
      hydrogel-related preparations, magnetic nanoparticles (MNP), and functional
      peptides as a preliminary evaluation of <em>in vitro</em> cytocompatibility.
    </p>
  );
}

export function BiosafetyMethods() {
  return (
    <>
      <p>
        Relative cell viability was measured after 24, 48, and 72 h of treatment.
        The assessment covered hydrogel-related preparations (Dressing-solution,
        G-S low, and G-S high) and MNP at 0.0864, 0.216, 0.432, and 0.648 mM.
      </p>
      <p>
        TVN, CPC, and LinkN peptides were each assessed at 2.5, 5, and 10 μM.
        Combined CPC and LinkN treatment (CPC+LinkN) was assessed at the indicated
        concentrations of 2.5 and 5 μM, and the functional peptide from the
        mitochondrial delivery module (Mito) was assessed at 5 and 10 μM.
      </p>
      <p>
        Individual measurements were retained as overlaid dots in the plots.
        A photograph of the assay plate documents the control, blank, and
        peptide-treated wells, marked with yellow, blue, and red boxes,
        respectively.
      </p>
    </>
  );
}

export function BiosafetyResultsText({
  figureNumber = "7.1",
}: {
  figureNumber?: string;
}) {
  return (
    <>
      <p>
        Hydrogel-related preparations and MNP generally maintained relative cell
        viability near or above the control level across the tested time points
        (Figure {figureNumber}). The peptide groups showed more varied responses
        across concentrations and exposure periods.
      </p>
      <p>
        The Mito groups showed lower relative cell viability at 24 h and higher
        values at 48 and 72 h. Lower viability was also observed for 2.5 μM TVN
        at 72 h, 10 μM LinkN at 72 h, and the CPC+LinkN groups at 24 and 72 h.
        These observations identify treatment conditions that require further
        evaluation and optimization.
      </p>
      <p>
        We interpret this assessment as preliminary evidence for evaluating
        component cytocompatibility within the tested conditions. The CCK-8
        readouts alone do not establish the overall biosafety of the assembled
        NEST system; longer-term cellular responses and the complete formulation
        require further evaluation.
      </p>
    </>
  );
}

export function BiosafetyFigureCaption({
  figureNumber = "7.1",
}: {
  figureNumber?: string;
}) {
  return (
    <FigureCaption className="figure-caption mt-2">
      <strong>
        Figure {figureNumber} | Preliminary cytocompatibility assessment of NEST
        components using the CCK-8 assay.
      </strong>{" "}
      Relative cell viability was measured after 24, 48, and 72 h of treatment.
      (A) Hydrogel-related preparations, including Dressing-solution, G-S low,
      and G-S high. (B) Magnetic nanoparticles (MNP) at 0.0864, 0.216, 0.432, and
      0.648 mM. (C–E) TVN, CPC, and LinkN peptides, respectively, at 2.5, 5, and
      10 μM. (F) Combined CPC and LinkN treatment (CPC+LinkN) at the indicated
      concentrations of 2.5 and 5 μM. (G) Functional peptide from the
      mitochondrial delivery module (Mito) at 5 and 10 μM. Overlaid dots represent
      individual measurements. (H) Photograph of the assay plate. Yellow, blue,
      and red boxes indicate control, blank, and peptide-treated wells,
      respectively.
    </FigureCaption>
  );
}

export function BiosafetyContent() {
  return (
    <>
      <div className="section-heading wetlab-page-section">
        <h3 id="wetlab-biosafety" data-toc="include" data-toc-depth="2">
          Biocompatibility
        </h3>
        <div className="source-block">
          <BiosafetyIntroduction />
        </div>
      </div>
      <section className="pair">
        <h4 className="pair-label" id="wetlab-biosafety-assay">
          CCK-8 cytocompatibility assessment
        </h4>
        <div className="columns">
          <div className="column experiment">
            <div className="column-label">Experiment</div>
            <div className="source-block">
              <BiosafetyMethods />
            </div>
          </div>
          <div className="column results">
            <div className="column-label">Results</div>
            <div className="source-block">
              <BiosafetyResultsText />
            </div>
            <figure className="figure-block">
              <a
                className="figure-link"
                href={BIOSAFETY_FIGURE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open full-size image: Figure 7.1"
              >
                <img
                  src={BIOSAFETY_FIGURE_URL}
                  alt="Figure 7.1 | Preliminary cytocompatibility assessment of NEST components using the CCK-8 assay"
                  width={3080}
                  height={2434}
                  style={{ width: "100%" }}
                  loading="lazy"
                />
              </a>
              <BiosafetyFigureCaption />
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
