import { Link } from "react-router-dom";
import { TableCaption, FigureCaption } from "../components/FigureCaption";
import {
  FigureSourceCitation,
  FigureSourceEntry,
} from "../components/FigureSourceCitation";
import { References } from "../components/References";
import collection from "./parts-data.json";

const CIF = "https://static.igem.wiki/teams/6102/wiki/images/cif/";
const PROTOCOL = "https://static.igem.wiki/teams/6102/wiki/protocol/";
const APP_SOURCE = "https://github.com/plus-c-c/igem-2026-app";
const HARDWARE_SOURCE = "https://github.com/ccc8701/ZJU-China-2026-hardware";
const basicCount = collection.parts.filter(
  (part) => part.kind === "basic",
).length;
const compositeCount = collection.parts.filter(
  (part) => part.kind === "composite",
).length;

function RegistryParts({ ids }: { ids: string[] }) {
  return ids.map((id, index) => (
    <span key={id}>
      {index > 0 && ", "}
      <a
        href={
          "https://registry.igem.org/parts/" +
          id.toLowerCase().replace("_", "-")
        }
      >
        {id}
      </a>
    </span>
  ));
}

export function Contribution() {
  return (
    <div className="row mt-4">
      <div className="col">
        <h2 data-toc="exclude">Contribution</h2>
        <hr />
        <p>
          NEST contributes a modular foundation for protein-based hydrogel
          development: future teams can vary scaffold architecture and introduce
          new functional modules through a shared ligation interface. We make
          this approach reusable through biological parts, preparation
          protocols, modeling methods, software and hardware resources, and an
          Integrated Human Practices toolbox.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}01-nest-contributions-equal.avif`}
            alt="NEST contributions: reusable resources for the iGEM community."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <FigureCaption className="figure-caption">
            Figure 1 | NEST contributions — reusable resources for the iGEM
            community. The iHP toolkit (NEST + SEED, methods and documented
            cases), the experimental platform (parts, interfaces and protocols),
            the modelling workflow, and the app and hardware are interconnected,
            so future teams can progress from material construction to
            preparation and application support.
            <FigureSourceCitation
              source={1}
              href="#contribution-figure-sources"
            />
          </FigureCaption>
        </figure>
        <TableCaption>
          Table 1 | Reusable contributions for future iGEM teams. Resources are
          grouped by what they provide, how they can be used, and where they can
          be accessed.
        </TableCaption>
        <div className="table-responsive mb-4">
          <table
            className="table table-bordered align-middle"
            aria-label="Community resources, reuse opportunities, and access"
          >
            <thead className="table-primary">
              <tr>
                <th scope="col">Contribution</th>
                <th scope="col">Resources We Share</th>
                <th scope="col">How Future Teams Can Build On Them</th>
                <th scope="col">Access</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Parts</th>
                <td>
                  Scaffolds, ligation components, functional modules, reporters,
                  and controls
                </td>
                <td>
                  Select a scaffold, introduce a functional sequence, and
                  evaluate its assembly and activity
                </td>
                <td>
                  <Link to="/parts">Parts and Sequences</Link> ·{" "}
                  <a href={collection.registryOrganisation}>Registry</a>
                </td>
              </tr>
              <tr>
                <th scope="row">Protocols</th>
                <td>
                  Protein recovery, buffer exchange, lyophilization, ligation,
                  and photocrosslinking procedures
                </td>
                <td>
                  Plan a preparation workflow and use the optimization records
                  to identify where adjustments are needed
                </td>
                <td>
                  <Link to="/protocol">Protocol Library</Link> ·{" "}
                  <Link to="/experiments#wetlab-scaffold-04">
                    Preparation Methods
                  </Link>
                </td>
              </tr>
              <tr>
                <th scope="row">Modeling</th>
                <td>
                  Conformational sampling, network construction, mechanical
                  analysis, parameters, and calibration methods
                </td>
                <td>
                  Compare candidate designs and plan targeted mechanical
                  experiments
                </td>
                <td>
                  <Link to="/model">Model</Link> ·{" "}
                  <Link to="/software">Simulation Workflow</Link>
                </td>
              </tr>
              <tr>
                <th scope="row">Software and Hardware</th>
                <td>
                  Android app source code, mechanical drawings, PCB projects,
                  and bills of materials
                </td>
                <td>
                  Adapt formulation guidance, dispensing channels, and device
                  components to a new material workflow
                </td>
                <td>
                  <a href={APP_SOURCE}>App Code</a> ·{" "}
                  <a href={HARDWARE_SOURCE}>Hardware Files</a> ·{" "}
                  <Link to="/hardware">Hardware Guide</Link>
                </td>
              </tr>
              <tr>
                <th scope="row">Human Practices</th>
                <td>
                  NEST framework, SEED cycle, mixed-methods guidance, and
                  stakeholder-integration cases
                </td>
                <td>
                  Turn stakeholder needs into design requirements and carry
                  feedback through project iterations
                </td>
                <td>
                  <Link to="/human-practices#ihp-toolbox-nest">
                    iHP Toolbox
                  </Link>{" "}
                  ·{" "}
                  <Link to="/human-practices#ihp-nest-codesign">
                    Worked Examples
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 id="contribution-parts" className="mt-5 mb-3" data-toc-depth="1">
          1 Parts for Modular Protein Hydrogel Design
        </h3>
        <p>
          We contribute{" "}
          <strong>
            {basicCount} Basic Parts and {compositeCount} Composite Parts
          </strong>{" "}
          covering SELP scaffolds, ligation interfaces, functional modules,
          reporters, and controls. The toolkit connects tunable scaffold length
          with interchangeable functions, giving future teams a foundation for
          building materials around their own biological objectives. TVN-based
          particle-binding modules and CPC/Link-N matrix-retention modules
          provide concrete examples of functions that teams can adapt or
          replace.
        </p>
        <p>
          We demonstrated scaffold expansion from 2KY-5 to 2KY-10 and documented
          how connector placement shapes the available ligation sites. Through
          the SnoopLigase2 interface, teams can introduce new DogTag-bearing
          sequences while retaining the scaffold and assembly strategy. Our
          reporter assay produced a detectable ligation product within{" "}
          <strong>10 minutes</strong>, with the SUMO-DogTag substrate band
          disappearing by <strong>60 minutes</strong>, providing an experimental
          reference for establishing the system in another laboratory.
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
          <FigureCaption className="figure-caption">
            Figure 2 | Assembly and validation logic for integrating new
            functions into the platform. A shared interface allows functional
            sequences to be replaced, while ligation assays and functional
            assays address two distinct questions.
            <FigureSourceCitation
              source={1}
              href="#contribution-figure-sources"
            />
          </FigureCaption>
        </figure>
        <p>
          The <Link to="/parts">Parts page</Link> provides sequences, component
          annotations, FASTA downloads, and Registry links. Teams can follow the{" "}
          <Link to="/experiments#wetlab-scaffold-17">construction method</Link>,{" "}
          <Link to="/results#wetlab-scaffold-17">supporting results</Link>, and{" "}
          <Link to="/results#wetlab-scaffold-35">time-course results</Link> to
          select parts and plan validation of new modules.
        </p>
        <details className="mb-4">
          <summary>Selected Parts and Registry Entries</summary>
          <TableCaption>
            Table 2 | Biological parts for modular material engineering.
            Selected Registry entries are grouped by task; the Parts page
            provides complete sequences, component annotations, and FASTA
            downloads.
          </TableCaption>
          <div className="table-responsive mb-4">
            <table
              className="table table-bordered align-middle"
              aria-label="Selected biological parts and their reuse opportunities"
            >
              <thead className="table-primary">
                <tr>
                  <th scope="col">Part Group</th>
                  <th scope="col">Registry Entries</th>
                  <th scope="col">Reuse Opportunity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    SELP scaffolds: 2KY-5, 2KY-10, and terminally tagged
                    constructs
                  </th>
                  <td>
                    <RegistryParts
                      ids={[
                        "BBa_26HEMGR4",
                        "BBa_267QOE6D",
                        "BBa_26IPYN3G",
                        "BBa_26HWVIKX",
                      ]}
                    />
                  </td>
                  <td>
                    Compare scaffold lengths and select terminal ligation sites
                    for functional modules.
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    SnoopLigase2, SnoopTag2-sfGFP, and SUMO-DogTag
                  </th>
                  <td>
                    <RegistryParts
                      ids={["BBa_26O4AA95", "BBa_26RVHX1R", "BBa_26PVPRQ2"]}
                    />
                  </td>
                  <td>
                    Reproduce the reporter reaction as a reference before
                    evaluating a new module.
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    DogTag-TVN and the matched DogTag-GTWSLLL control
                  </th>
                  <td>
                    <RegistryParts ids={["BBa_26R5QAZM", "BBa_26OZ27MH"]} />
                  </td>
                  <td>
                    Assess the contribution of the TVN sequence to particle
                    association within the same fusion architecture.
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    DogTag-CPC, DogTag-Link-N, and DogTag-CPC-Link-N
                  </th>
                  <td>
                    <RegistryParts
                      ids={["BBa_267XBQOY", "BBa_266WDNPZ", "BBa_26ZPD683"]}
                    />
                  </td>
                  <td>
                    Compare individual and combined matrix-retention components
                    through a common ligation handle.
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    MMP13sp and scrambled-sequence fusion designs
                  </th>
                  <td>
                    <RegistryParts ids={["BBa_26NBBOY6", "BBa_26ZF9WQJ"]} />
                  </td>
                  <td>
                    Investigate sequence-dependent protease cleavage using
                    paired constructs with the same surrounding architecture.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
        <h3
          id="contribution-protocols"
          className="mt-5 mb-3"
          data-toc-depth="1"
        >
          2 Protocols for Protein Hydrogel Preparation
        </h3>
        <p>
          We share a preparation workflow connecting protein recovery, buffer
          exchange, lyophilization, and blue-light photocrosslinking. Building
          on established inverse transition cycling (ITC) methods,
          <sup className="article-citation">[1, 2]</sup> we established a
          working preparation route for our SELP scaffolds and documented the
          optimization decisions behind it. Our temperature–salt screen
          identified salt concentration as the more influential factor in
          scaffold recovery, giving future teams a practical direction for
          prioritizing optimization.
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
          <FigureCaption className="figure-caption">
            Figure 3 | SELP recovery and preparation workflow. Target-protein
            bands in H-Sup (the supernatant after heating) track protein
            remaining outside the precipitated phase; bands in C-Sup (the
            supernatant after cooling) track soluble protein recovered after
            resolubilization.
            <FigureSourceCitation
              source={1}
              href="#contribution-figure-sources"
            />
          </FigureCaption>
        </figure>
        <p>
          The contribution combines practical procedures with optimization
          records and checks for tracking protein recovery. Future teams can use
          these resources to plan preparation, troubleshoot individual steps,
          and adapt the workflow to their own protein hydrogel materials. The{" "}
          <Link to="/protocol">Protocol Library</Link> provides{" "}
          <a
            href={
              PROTOCOL + "purification-by-inverse-transition-cycling-itc.pdf"
            }
          >
            ITC
          </a>
          ,{" "}
          <a
            href={
              PROTOCOL +
              "protein-ultrafiltration-concentration-and-buffer-exchange.pdf"
            }
          >
            buffer exchange
          </a>
          ,{" "}
          <a href={PROTOCOL + "protein-lyophilisation-freeze-drying.pdf"}>
            lyophilization
          </a>
          ,{" "}
          <a
            href={
              PROTOCOL +
              "ligation-reaction-snoopligase2-mediated-peptide-peptide-ligation.pdf"
            }
          >
            ligation
          </a>
          , and{" "}
          <a
            href={
              PROTOCOL + "blue-light-photo-crosslinking-of-selp-hydrogels.pdf"
            }
          >
            photocrosslinking
          </a>{" "}
          protocols alongside the corresponding{" "}
          <Link to="/results#wetlab-scaffold-04">preparation results</Link>.
        </p>
        <h3 id="contribution-modeling" className="mt-5 mb-3" data-toc-depth="1">
          3 Modeling for Protein Hydrogel Design
        </h3>
        <p>
          We contribute a computational workflow that connects protein sequence,
          conformational sampling, network construction, and mechanical
          analysis. Using SELP hydrogels as a worked example, we combine
          simulation with experimental calibration to help teams compare
          candidate designs and prioritize wet-lab testing.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}contribution-figure-4-new.avif`}
            alt="Overview of the modeling workflow from protein conformation sampling to network mechanical analysis."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <FigureCaption className="figure-caption">
            Figure 4 | Overview of the modeling workflow from protein
            conformation sampling to network mechanical analysis.
          </FigureCaption>
        </figure>
        <p>
          We share the assumptions, parameters, network checks, and calibration
          approach needed to build on the workflow. The{" "}
          <Link to="/model">Model page</Link> presents the methods and results,
          while the <Link to="/software">Software page</Link> explains task
          configuration and output inspection. Together, they give future teams
          a documented starting point for investigating their own material
          designs and connecting computational comparisons with targeted
          experiments. The Model page also documents computational approaches to
          SnoopLigase2 engineering and magnetic-field analysis, extending the
          shared methods to ligation-tool design and magnetic-response studies.
        </p>
        <h3
          id="contribution-software-hardware"
          className="mt-5 mb-3"
          data-toc-depth="1"
        >
          4 Software and Hardware for Material Preparation
        </h3>
        <p>
          We share <a href={APP_SOURCE}>Android application source code</a> and{" "}
          <a href={HARDWARE_SOURCE}>
            mechanical drawings and PCB project files
          </a>{" "}
          that extend our contribution into practical material preparation. The
          app brings together formulation selection, QR-code scanning, and
          step-by-step guidance; the hardware provides independently driven
          dispensing channels and a mixing architecture.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}12.avif`}
            alt="The reagent-preparation prototype and the application interface."
            className="figure-img img-fluid rounded"
            style={{ width: "100%", clipPath: "inset(1% round 6px)" }}
            loading="lazy"
            decoding="async"
          />
          <FigureCaption className="figure-caption">
            Figure 5 | Photograph of our reagent-preparation prototype and
            screenshots of the application interface, illustrating material
            configuration, step-by-step guidance, and material handling.
            <FigureSourceCitation
              source={1}
              href="#contribution-figure-sources"
            />
          </FigureCaption>
        </figure>
        <p>
          Future teams can adapt the material catalog and instructions to new
          scaffold and module combinations, or build on the device architecture
          for their own preparation tasks. The{" "}
          <Link to="/software">Software documentation</Link> and{" "}
          <Link to="/hardware">Hardware guide</Link> provide the operating
          workflows, device descriptions, and bills of materials that support
          this reuse.
        </p>
        <h3
          id="contribution-human-practices"
          className="mt-5 mb-3"
          data-toc-depth="1"
        >
          5 Human Practices: NEST and SEED
        </h3>
        <p>
          We contribute an{" "}
          <Link to="/human-practices#ihp-toolbox-nest">
            Integrated Human Practices toolbox
          </Link>{" "}
          that connects stakeholder needs with engineering decisions. The NEST
          framework organizes project development. SEED translates stakeholder
          findings into a Product Requirements Document (PRD), carries those
          requirements into the DBTL cycle, and returns results to stakeholders
          for feedback.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}02-seed-prd-harmonized.avif`}
            alt="The SEED cycle with the PRD document and the DBTL loop harmonised inside it."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <FigureCaption className="figure-caption">
            Figure 6 | The SEED cycle with the PRD document and the DBTL loop
            harmonised inside it. Future teams can reuse this method: a question
            is explored with stakeholders and the literature, the needs are
            written into a PRD, the engineering team runs the DBTL loop, and the
            results return to the stakeholders for dialogue.
            <FigureSourceCitation
              source={1}
              href="#contribution-figure-sources"
            />
          </FigureCaption>
        </figure>
        <p>
          Our{" "}
          <Link to="/human-practices#ihp-nest-codesign">
            documented design cycles
          </Link>{" "}
          show the method in practice: clinical feedback about different joint
          loads informed the work on SELP repeat number and mechanical modeling.
          Future teams can reuse the framework and cases to plan stakeholder
          engagement, translate findings into actionable requirements, and
          demonstrate how Human Practices shapes their own project.
        </p>
        <References level={2}>
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
          </div>
        </References>
        <References
          level={2}
          title="Figure Sources and Credits"
          id="figure-sources-and-credits"
        >
          <ul className="references-list figure-sources-list">
            <FigureSourceEntry source={1} id="contribution-figure-sources">
              <p>
                Icons and illustrations from Bioicons. Marcel Tisch, Simon
                D&uuml;rr, jaiganesh, and Daniel-Marcos (CC0); DBCLS (CC BY
                4.0); Servier (CC BY 3.0).{" "}
                <a href="https://bioicons.com/">Source</a>
              </p>
              <p>
                Illustrations from Google Noto Emoji (Apache 2.0). Photographs
                and application screenshots are from our team&rsquo;s materials.{" "}
                <a href="https://github.com/googlefonts/noto-emoji">Source</a>
              </p>
            </FigureSourceEntry>
          </ul>
        </References>
      </div>
    </div>
  );
}
