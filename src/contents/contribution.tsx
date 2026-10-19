import { References } from "../components/References";
const CIF = "https://static.igem.wiki/teams/6102/wiki/images/cif/";

export function Contribution() {
  return (
    <div className="row mt-4">
      <div className="col">
        <h2>Contribution</h2>
        <hr />
        <p>
          NEST&rsquo;s primary contribution to the iGEM community is a
          protein-material platform designed for further development. We have
          integrated SELP length design, connector placement, module ligation,
          and material validation, and made our constructs, experimental
          protocols, and clinician-facing application source code publicly
          available. Future teams can build on these existing components,
          replace functional sequences, reproduce key experiments, and further
          develop materials tailored to their own research questions.
        </p>

        <h3 className="mt-5 mb-3">1. Overview of Available Resources</h3>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}8.avif`}
            alt="Community resources organized around a shared materials platform."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="figure-caption">
            Figure 1. Community resources organized around a shared materials
            platform. Parts, protocols, computational examples, and
            software/hardware documentation are interconnected, enabling future
            teams to progress from material construction to preparation and
            application support.
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
                <th scope="col">Reusable Content</th>
                <th scope="col">Access</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Protein Components</td>
                <td>
                  Multiple SELP scaffolds, connectors, and functional constructs
                </td>
                <td>
                  <a href="https://registry.igem.org/organisations/904df5d3-aa3d-4428-bc63-61958f3df06a">
                    Registry Parts
                  </a>
                </td>
              </tr>
              <tr>
                <td>Preparation and Ligation Protocols</td>
                <td>
                  ITC, ultrafiltration-based buffer exchange, lyophilization,
                  and enzymatic ligation
                </td>
                <td>
                  <a href="https://static.igem.wiki/teams/6102/wiki/protocol/purification-by-inverse-transition-cycling-itc.pdf">
                    ITC
                  </a>{" "}
                  ·{" "}
                  <a href="https://static.igem.wiki/teams/6102/wiki/protocol/ligation-reaction-snoopligase2-mediated-peptide-peptide-ligation.pdf">
                    Ligation
                  </a>{" "}
                  ·{" "}
                  <a href="https://static.igem.wiki/teams/6102/wiki/protocol/protein-ultrafiltration-concentration-and-buffer-exchange.pdf">
                    Buffer Exchange
                  </a>{" "}
                  ·{" "}
                  <a href="https://static.igem.wiki/teams/6102/wiki/protocol/protein-lyophilisation-freeze-drying.pdf">
                    Lyophilization
                  </a>
                </td>
              </tr>
              <tr>
                <td>Models and Computational Workflows</td>
                <td>
                  Modeling assumptions, parameters, case studies, and task
                  workflows
                </td>
                <td>
                  <a href="https://rcny9dy1085s.feishu.cn/docx/OYHqdzwwbopzMMxph0OctdWYnkh">
                    Model
                  </a>{" "}
                  ·{" "}
                  <a href="https://rcny9dy1085s.feishu.cn/docx/SvTSdzlfvoAOZMxMhoWcL3GhnCd">
                    Software
                  </a>
                </td>
              </tr>
              <tr>
                <td>Application and Hardware</td>
                <td>
                  Source code for clinician-facing guidance, device design, and
                  electronics/control documentation
                </td>
                <td>
                  <a href="https://github.com/plus-c-c/igem-2026-app">
                    App Source Code
                  </a>{" "}
                  ·{" "}
                  <a href="https://2026.igem.wiki/zju-china/hardware">
                    Hardware
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-5 mb-3">
          2. Designing Scaffold Length and Connector Placement Together
        </h3>
        <p>
          We used the PRe-RDL repeat-sequence amplification method to generate
          SELP scaffolds of different lengths while planning connector
          positions in parallel. The number of repeats determines the
          chain-length series, whereas placing connectors within the repeat
          region or at either terminus determines how the ligation sites change
          during amplification. This provides future teams with a basis for
          planning module-connection strategies when selecting a material
          scaffold.
        </p>
        <p>
          We have successfully produced multiple SELP scaffold constructs,
          translating programmable sequence design into materials that can be
          prepared and characterized. By combining construct records with
          material data, future teams can investigate relationships among
          scaffold length, connector placement, and material performance, and
          select configurations for their own applications based on actual
          assembly yields and functional readouts.
        </p>

        <h3 className="mt-5 mb-3">
          3. Providing Ligation Tools and Controls for New Modules
        </h3>
        <p>
          We used the established SnoopLigase2 catalytic system to assemble
          NEST modules: the scaffold carries SnoopTag2, whereas the functional
          construct carries DogTag. Future teams can introduce their own
          functional sequences through this shared interface, first verifying
          ligation activity and then evaluating the function of the ligated
          modules.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}9.avif`}
            alt="Assembly and validation logic for integrating new functions into the platform."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="figure-caption">
            Figure 2. Assembly and validation logic for integrating new
            functions into the platform. A shared interface allows functional
            sequences to be replaced, while ligation assays and functional
            assays address two distinct questions.
          </figcaption>
        </figure>
        <p>
          The ligation tools are available through{" "}
          <a href="https://registry.igem.org/parts/bba-26o4aa95">
            SnoopLigase2
          </a>{" "}
          and{" "}
          <a href="https://registry.igem.org/parts/bba-26pvprq2">
            SUMO-DogTag
          </a>{" "}
          entries. Functional constructs include{" "}
          <a href="https://registry.igem.org/parts/bba-26r5qazm">
            DogTag-TVN
          </a>
          ,{" "}
          <a href="https://registry.igem.org/parts/bba-26oz27mh">
            a matched irrelevant-peptide control
          </a>
          ,{" "}
          <a href="https://registry.igem.org/parts/bba-267xbqoy">
            DogTag-CPC
          </a>{" "}
          and{" "}
          <a href="https://registry.igem.org/parts/bba-26zpd683">
            DogTag-CPC-Link-N
          </a>
          .
        </p>
        <p>
          In our sfGFP reporter ligation assay, product was detectable after
          10 min, and the band corresponding to the less abundant reactant
          disappeared by 60 min. Future modules can use this reporter reaction
          as a reference for ligation activity and include controls lacking the
          enzyme or ligation tag. TVN and the irrelevant peptide can be used to
          assess the specificity of particle binding. Experimental details and
          interpretation criteria are provided in the{" "}
          <a href="https://static.igem.wiki/teams/6102/wiki/protocol/ligation-reaction-snoopligase2-mediated-peptide-peptide-ligation.pdf">
            Ligation Protocol
          </a>{" "}
          and{" "}
          <a href="https://rcny9dy1085s.feishu.cn/docx/AmIPdlRDho8pqaxszM0c16nInHh">
            Results Record
          </a>
          .
        </p>

        <h3 className="mt-5 mb-3">
          4. Sharing Optimization Insights for SELP Phase-Transition
          Purification
        </h3>
        <p>
          We adapted the established principles of inverse transition cycling
          (ITC) to optimize recovery of our own scaffolds.[1,2] After comparing
          65&nbsp;&deg;C and 80&nbsp;&deg;C and NaCl concentrations of 0.5, 1,
          and 2&nbsp;M, salt concentration had the more pronounced effect in
          our current screening. We therefore selected 65&nbsp;&deg;C and
          2&nbsp;M NaCl for subsequent scaffold variants.
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
            Figure 3. SELP recovery and preparation workflow. Target-protein
            bands in the supernatants collected after heating (H-Sup) and
            cooling (C-Sup) help identify protein loss during phase transition
            and resolubilization, respectively.
          </figcaption>
        </figure>
        <p>
          Future teams can use{" "}
          <a href="https://static.igem.wiki/teams/6102/wiki/protocol/purification-by-inverse-transition-cycling-itc.pdf">
            ITC
          </a>
          ,{" "}
          <a href="https://static.igem.wiki/teams/6102/wiki/protocol/protein-ultrafiltration-concentration-and-buffer-exchange.pdf">
            ultrafiltration-based buffer exchange
          </a>{" "}
          and{" "}
          <a href="https://static.igem.wiki/teams/6102/wiki/protocol/protein-lyophilisation-freeze-drying.pdf">
            lyophilization
          </a>{" "}
          protocols to link protein recovery with preparation of gel-forming
          materials. This non-chromatographic workflow also provides a basis
          for further optimizing scaffold recovery following fermentation
          scale-up.[1,2]
        </p>

        <h3 className="mt-5 mb-3">
          5. Demonstrating Computational Design with a Worked Example
        </h3>
        <p>
          We connect sequence-level design, single-chain conformations,
          multichain networks, and mechanical analysis.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}contribution-figure-4-new.avif`}
            alt="Schematic of a representative SELP modeling and computational workflow."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="figure-caption">
            Figure 4. Schematic of a representative SELP modeling and
            computational workflow.
          </figcaption>
        </figure>
        <p>
          Using wet-lab results as a reference, we calibrated the dry-lab
          modeling data with a correction function, E<sub>emp</sub> = aE
          <sub>0</sub> + b where a = 1.895, b = 19.793&nbsp;kPa, achieving an
          error of less than 5%.{" "}
          <a href="https://rcny9dy1085s.feishu.cn/docx/OYHqdzwwbopzMMxph0OctdWYnkh">
            Model
          </a>{" "}
          provides the assumptions, parameters, and results;{" "}
          <a href="https://rcny9dy1085s.feishu.cn/docx/SvTSdzlfvoAOZMxMhoWcL3GhnCd">
            Software
          </a>{" "}
          documentation describes the workflow, and the resource package
          includes the parameters used in the example.
        </p>

        <h3 className="mt-5 mb-3">
          6. Making Material-Use Support Available as a Software Resource
        </h3>
        <p>
          We have made the{" "}
          <a href="https://github.com/plus-c-c/igem-2026-app">
            clinician-facing Android app source code
          </a>{" "}
          publicly available. It includes material configuration, QR-code
          scanning, dynamic instructions, and sequential reagent dispensing.
          Future teams can modify the material catalog and component
          descriptions and adapt the four-step guidance workflow for their own
          modular products.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}12.avif`}
            alt="The reagent-preparation prototype and the application interface."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="figure-caption">
            Figure 5. Photograph of our reagent-preparation prototype and
            screenshots of the application interface, illustrating material
            configuration, step-by-step guidance, and material handling.
          </figcaption>
        </figure>
        <p>
          <a href="https://2026.igem.wiki/zju-china/hardware">Hardware</a>{" "}
          documentation provides the device design, bill of materials, and
          records of interactions among the STM32, ESP32, and web interface.
          The app organizes formulation guidance, while independent channels
          and replaceable consumables support adaptation to new materials.
        </p>
        <p>
          Teams can start with a single component, protocol, or tool and
          continue expanding the material capabilities of NEST.
        </p>

        <References level={3}>
          <div className="references-list references-list--paragraphs">
            <p>
              [1] Meyer DE, Chilkoti A. <em>Nature Biotechnology</em>.
              1999;17:1112&ndash;1115.{" "}
              <a href="https://doi.org/10.1038/15100">Article</a>
            </p>
            <p>
              [2] Hassouneh W, Christensen T, Chilkoti A.{" "}
              <em>Current Protocols in Protein Science</em>.
              2010;61:6.11.1&ndash;16.{" "}
              <a href="https://doi.org/10.1002/0471140864.ps0611s61">Article</a>
            </p>
            <p>
              [3] Icons and illustrations from Bioicons. Marcel Tisch, Simon
              D&uuml;rr, jaiganesh, and Daniel-Marcos (CC0); DBCLS (CC BY 4.0);
              Servier (CC BY 3.0). <a href="https://bioicons.com/">Source</a>
            </p>
            <p>
              [4] Illustrations from Google Noto Emoji (Apache 2.0). Photographs
              and application screenshots are from our team&rsquo;s materials.{" "}
              <a href="https://github.com/googlefonts/noto-emoji">Source</a>
            </p>
          </div>
        </References>
      </div>
    </div>
  );
}
