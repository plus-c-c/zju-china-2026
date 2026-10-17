const CIF = "https://static.igem.wiki/teams/6102/wiki/images/cif/";
const BASE = import.meta.env.BASE_URL;

export function Contribution() {
  return (
    <div className="row mt-4">
      <div className="col">
        <h2>Contribution</h2>
        <hr />
        <p>
          NEST&rsquo;s primary contribution to the iGEM community is a
          protein-material platform that future teams can continue to build on.
          We have organized SELP length design, linker layout, module ligation,
          and material validation, and we have released our constructs,
          operating protocols, and the source code of the clinician-facing
          application. Future teams can start from the existing parts, replace
          the functional sequences, repeat key experiments, and continue
          developing materials suited to their own problems.
        </p>

        <h3 className="mt-5 mb-3">1. Overview of the Available Resources</h3>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}8.avif`}
            alt="Community resources organized around a shared material platform."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="figure-caption">
            Figure 1. Community resources organized around a shared material
            platform. Parts, protocols, computational examples, and software
            and hardware records connect with one another, supporting future
            teams from material construction through to preparation and use
            support.
          </figcaption>
        </figure>
        <div className="table-responsive mb-4">
          <table
            className="table table-bordered align-middle"
            aria-label="Reusable resources and where to access them"
          >
            <thead className="table-primary">
              <tr>
                <th scope="col">Resource</th>
                <th scope="col">Reusable content</th>
                <th scope="col">Access</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Protein parts</td>
                <td>
                  Multiple SELP scaffolds, linkers, and functional constructs
                </td>
                <td>
                  <a href={`${BASE}parts`}>Registry part collection</a>
                </td>
              </tr>
              <tr>
                <td>Preparation and ligation protocols</td>
                <td>
                  ITC, ultrafiltration buffer exchange, lyophilization, and
                  enzymatic ligation
                </td>
                <td>
                  <a href={`${BASE}protocol`}>ITC · Ligation · Buffer exchange
                  · Lyophilization</a>
                </td>
              </tr>
              <tr>
                <td>Modeling and computational workflows</td>
                <td>
                  Computational assumptions, parameters, worked examples, and
                  task pipelines
                </td>
                <td>
                  <a href={`${BASE}model`}>Model</a> ·{" "}
                  <a href={`${BASE}software`}>Software</a>
                </td>
              </tr>
              <tr>
                <td>Application and hardware</td>
                <td>
                  Source code of the clinician-facing guidance app, device
                  structure, and electronics records
                </td>
                <td>
                  <a href={`${BASE}software`}>App source</a> ·{" "}
                  <a href={`${BASE}hardware`}>Hardware</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-5 mb-3">
          2. Designing Scaffold Length Together with Linker Layout
        </h3>
        <p>
          We used PRe-RDL concatemer amplification to build SELPs of different
          lengths and planned linker positions at the same time. The repeat
          number determines the chain-length series, while the placement of
          linkers inside the repeat region or at the protein termini determines
          how the ligation sites shift during amplification. New teams can use
          this to arrange how modules connect when selecting a material
          scaffold.
        </p>
        <p>
          We have successfully produced several SELP scaffold constructs,
          translating programmable sequence design into materials that can be
          prepared and characterized. Together with the construction records
          and material data, future teams can examine the relationship between
          scaffold length, linker layout, and material performance, and then
          choose a configuration suited to their own task based on actual
          assembly yield and functional readouts.
        </p>

        <h3 className="mt-5 mb-3">
          3. Providing Ligation Tools and Controls for New Modules
        </h3>
        <p>
          We applied the established SnoopLigase2 catalytic system to NEST
          module assembly: the scaffold carries SnoopTag2 and functional
          constructs carry DogTag. Future teams can add their own functional
          sequences on the shared interface, first confirming ligation activity
          and then evaluating the module&rsquo;s function after ligation.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}9.avif`}
            alt="Assembly and validation logic for introducing new functions onto the platform."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="figure-caption">
            Figure 2. Assembly and validation logic for introducing new
            functions onto the platform. The shared interface allows functional
            sequences to be replaced, while ligation assays and functional
            assays answer two distinct questions.
          </figcaption>
        </figure>
        <p>
          The ligation tools are available from the SnoopLigase2 and SUMO-DogTag
          entries. Functional constructs include DogTag-TVN, a matched
          irrelevant-peptide control, DogTag-CPC, and DogTag-CPC-Link-N.
        </p>
        <p>
          In our sfGFP reporter ligation, product was visible at 10 min, and by
          60 min the band of the limiting reactant had disappeared. New modules
          can use the reporter reaction as an activity reference and include
          no-enzyme or no-tag controls; TVN and the irrelevant peptide are used
          to evaluate the specificity of particle binding. See the{" "}
          <a href={`${BASE}protocol`}>ligation protocol</a> and the{" "}
          <a href={`${BASE}results`}>Results records</a> for the formulation
          and readout.
        </p>

        <h3 className="mt-5 mb-3">
          4. Sharing an Optimized SELP Phase-Transition Purification Workflow
        </h3>
        <p>
          We applied the established ITC principle and optimized practical
          recovery for our scaffolds [1,2]. After comparing 65&nbsp;&deg;C and
          80&nbsp;&deg;C with 0.5, 1, and 2&nbsp;M NaCl, salt concentration had
          the more pronounced effect in our current screening; we selected
          65&nbsp;&deg;C with 2&nbsp;M NaCl and used this route for subsequent
          scaffold versions.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}10.avif`}
            alt="SELP recovery and preparation workflow."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="figure-caption">
            Figure 3. SELP recovery and preparation workflow. The target bands
            in the heated supernatant (H-Sup) and the cooled supernatant
            (C-Sup) help locate protein loss during the phase-transition and
            resolubilization stages, respectively.
          </figcaption>
        </figure>
        <p>
          Future teams can use the{" "}
          <a href={`${BASE}protocol`}>ITC, ultrafiltration buffer-exchange, and
          lyophilization protocols</a>{" "}
          to link protein recovery with the preparation of gel-forming
          material. The non-chromatographic route also provides a process
          foundation that can be further optimized for scaffold recovery after
          fermentation scale-up [1,2].
        </p>

        <h3 className="mt-5 mb-3">
          5. Demonstrating the Computational Design Workflow with a Worked
          Example
        </h3>
        <p>
          We connected sequence, single-chain conformation, multichain network,
          and mechanical analysis. For a representative SELP computational
          case, the maximum internal distance of the conformation was
          10.30&nbsp;nm; the remaining structural outputs and computational
          parameters are shown in Figure 4.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}11.avif`}
            alt="Computational workflow and experimental calibration for a representative SELP case."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="figure-caption">
            Figure 4. Computational workflow and experimental calibration for a
            representative SELP case. The schematic parameters come from that
            case record.
          </figcaption>
        </figure>
        <p>
          The empirical relation E<sub>emp</sub> = 1.895E<sub>0</sub> + 19.793
          kPa maps model predictions to measured moduli. Teams can replace the
          sequence and test and calibrate the relation with their own
          experiments. The <a href={`${BASE}model`}>Model</a> pages provide the
          assumptions, parameters, and results; the{" "}
          <a href={`${BASE}software`}>software records</a> describe the task
          pipeline; and the resource package includes the case parameters.
        </p>

        <h3 className="mt-5 mb-3">
          6. Packaging Material-Use Support as Accessible Software Resources
        </h3>
        <p>
          We released the source code of the clinician-facing Android
          application, covering material configuration, QR-code recognition,
          dynamic instructions, and in-order reagent dispensing. Future teams
          can modify the material catalog and component descriptions and reuse
          the four-step operating guidance for their own modular products.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}12.avif`}
            alt="The team's material-preparation unit and the application interface."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="figure-caption">
            Figure 5. The team&rsquo;s material-preparation unit and the
            application interface, showing material configuration, step
            guidance, and material handling.
          </figcaption>
        </figure>
        <p>
          The <a href={`${BASE}hardware`}>Hardware</a> pages provide the device
          structure, bill of materials, and the STM32&ndash;ESP32&ndash;web
          interaction records. The app organizes formulation guidance, while
          independent channels and replaceable consumables support adaptation
          to new materials.
        </p>
        <p>
          Teams can start from a single part, a single protocol, or a single
          tool and continue extending the material capabilities of NEST.
        </p>

        <h3 className="mt-5 mb-3">References</h3>
        <p>
          [1] Meyer DE, Chilkoti A. <em>Nature Biotechnology</em>.
          1999;17:1112&ndash;1115.{" "}
          <a href="https://doi.org/10.1038/70265">Source</a>
        </p>
        <p>
          [2] Hassouneh W, Christensen T, Chilkoti A.{" "}
          <em>Current Protocols in Protein Science</em>. 2010;61:6.11.1&ndash;16.{" "}
          <a href="https://doi.org/10.1002/0471140864.ps0611s61">Source</a>
        </p>
        <p>
          [3] Figure assets from Bioicons. Marcel Tisch, Simon D&uuml;rr,
          jaiganesh, Daniel-Marcos (CC0); DBCLS (CC BY 4.0); Servier (CC BY
          3.0). <a href="https://bioicons.com/">Source</a>
        </p>
        <p>
          [4] Figure assets from Google Noto Emoji (Apache 2.0). Photographs
          and application interfaces are from project materials.{" "}
          <a href="https://github.com/googlefonts/noto-emoji">Source</a>
        </p>
      </div>
    </div>
  );
}
