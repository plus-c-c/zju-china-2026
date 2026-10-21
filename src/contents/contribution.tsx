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
          NEST provides biological parts and methods for building protein
          hydrogels with different scaffold lengths and interchangeable
          functional modules. Future iGEM teams can reuse the constructs and
          ligation interface, follow our preparation protocols, and adapt the
          modeling, software, hardware, and Human Practices resources to their
          own projects.
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
            Figure 1 | Resources shared with the iGEM community. The diagram
            links our biological parts and protocols, modeling workflow, app and
            hardware, and NEST/SEED Human Practices toolbox.
            <FigureSourceCitation
              source={1}
              href="#contribution-figure-sources"
            />
          </FigureCaption>
        </figure>
        <TableCaption>
          Table 1 | Shared resources, suggested uses, and access links.
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
                <th scope="col">How to Use Them</th>
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
                  Prepare proteins and hydrogels using the protocols and
                  optimization records
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
                  Adapt formulation guidance and dispensing hardware to new
                  material combinations
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
                  examples of stakeholder feedback applied to project design
                </td>
                <td>
                  Set design requirements from stakeholder findings and document
                  the resulting changes
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
          reporters, and controls. The scaffold parts offer different chain
          lengths and ligation-site arrangements. Functional parts include
          TVN-based particle-binding modules and CPC/Link-N matrix-retention
          modules, which teams can adapt or replace through the same ligation
          interface.
        </p>
        <p>
          We built 2KY-10 from 2KY-5 and documented how connector placement
          determines the ligation sites. The SnoopLigase2 interface lets teams
          attach new DogTag-bearing sequences to compatible scaffold constructs.
          In our reporter assay, a ligation-product band was visible at{" "}
          <strong>10 minutes</strong>, and the SUMO-DogTag substrate band had
          disappeared by <strong>60 minutes</strong>. Teams can reproduce this
          reaction as a reference when testing new modules.
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
            Figure 2 | Assembly and testing of new functional modules. New
            functional sequences use the same ligation interface. Ligation
            assays check attachment; functional assays assess the activity of
            the assembled modules.
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
            Table 2 | Selected NEST parts and their uses. The Parts page
            provides sequence annotations and FASTA downloads for the full
            collection.
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
                    Choose a scaffold length with terminal tags for module
                    attachment.
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
                    Test how peptide sequence affects protease cleavage in the
                    same fusion context.
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
          We share protocols for protein recovery, buffer exchange,
          lyophilization, and blue-light photocrosslinking. We adapted inverse
          transition cycling (ITC)<sup className="article-citation">[1, 2]</sup>{" "}
          for our SELP scaffolds and recorded the optimization experiments.
          Comparing temperature and salt concentration showed that salt
          concentration had the stronger effect on scaffold recovery. These
          results help teams choose which preparation conditions to investigate
          first.
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
          Teams can follow the protocols, use the recovery checks to
          troubleshoot individual steps, and adapt the preparation sequence to
          their own protein hydrogel materials. The{" "}
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
          Our computational workflow takes protein sequences through
          conformational sampling, network construction, and mechanical
          analysis. We applied it to SELP hydrogels and calibrated the
          calculations against experimental measurements. Teams can use this
          workflow to compare candidate designs and select constructs for
          wet-lab testing.
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
          The <Link to="/model">Model page</Link> records the assumptions,
          parameter values, network checks, and calibration method. It also
          describes computational approaches to SnoopLigase2 engineering and
          magnetic-field analysis. The <Link to="/software">Software page</Link>{" "}
          explains how to configure tasks and inspect their outputs. These
          records help teams set up simulations, calibrate the model with their
          own measurements, and plan experiments around the resulting design
          comparisons.
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
          for material selection and preparation. The app supports formulation
          selection, QR-code scanning, and step-by-step guidance. The hardware
          provides independently driven dispensing channels and a mixing system.
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
          Teams can change the app's material catalog and instructions for new
          scaffold and module combinations, or adapt the device design to their
          own preparation tasks. The{" "}
          <Link to="/software">Software documentation</Link> and{" "}
          <Link to="/hardware">Hardware guide</Link> provide the operating
          workflows, device descriptions, and bills of materials.
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
          for turning stakeholder findings into engineering decisions. NEST
          organizes the work around needs, co-design, implementation, and
          long-term impact. SEED uses a Product Requirements Document (PRD) to
          translate stakeholder findings into requirements for the DBTL cycle.
          Teams then discuss the design and results with stakeholders to guide
          the next iteration.
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
            inside it. Stakeholder dialogue and literature research inform the
            PRD. Its requirements guide the DBTL cycle, and the results feed
            into the next stakeholder discussion.
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
          show how advice from clinicians about joint loads guided our choices
          of SELP repeat number and mechanical modeling. Teams can use these
          cases to plan stakeholder engagement, write design requirements, and
          record how feedback changes their project.
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
          title="Figure Sources"
          id="figure-sources-and-credits"
        >
          <ul className="references-list figure-sources-list">
            <FigureSourceEntry source={1} id="contribution-figure-sources">
              <p>
                Icons from <a href="https://bioicons.com/">Bioicons</a>:
                Marcel Tisch, Simon D&uuml;rr, jaiganesh, and Daniel-Marcos
                (<a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0</a>);
                DBCLS (<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>);
                Servier (<a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>).
              </p>
              <p>
                Google. <a href="https://github.com/googlefonts/noto-emoji">Noto Emoji</a>.{" "}
                <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache 2.0</a>.
              </p>
            </FigureSourceEntry>
          </ul>
        </References>
      </div>
    </div>
  );
}
