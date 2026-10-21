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
          NEST gives future iGEM teams a connected toolkit for developing
          protein-based hydrogels: biological parts for building scaffolds and
          adding functions, protocols for preparing materials, a computational
          workflow for comparing designs, and software and hardware resources
          for organizing preparation. We also share our NEST and SEED human
          practices methods to connect stakeholder needs with engineering
          decisions.
        </p>
        <p>
          Our contribution brings together{" "}
          <strong>
            reusable components, experimental evidence, and instructions for
            building on them
          </strong>
          . The SELP scaffolds and functional modules provide concrete starting
          constructs; the reporter assay provides a reference for checking
          ligation; and the preparation and modeling records explain how we
          selected and evaluated working conditions. Teams can begin with one
          resource or combine them into a workflow for their own
          material-development questions.
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

        <div className="table-responsive mb-4">
          <table
            className="table table-bordered align-middle"
            aria-label="Community resources, reuse opportunities, and access"
          >
            <TableCaption as="caption">
              Table 1 | Reusable contributions for future iGEM teams. Resources
              are grouped by what they provide, how they can be used, and where
              they can be accessed.
            </TableCaption>
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
          Our <Link to="/parts">Parts page</Link> brings together{" "}
          <strong>
            {basicCount} Basic Parts and {compositeCount} Composite Parts
          </strong>
          , with sequences, component annotations, Registry links, and FASTA
          downloads. The toolkit covers scaffold construction, protein ligation,
          functional modules, and experimental controls, so a team can select
          components according to the task it wants to perform.
        </p>
        <h4 className="mt-4 mb-3">Scaffold length and connector placement</h4>
        <p>
          We used the established PRe-RDL method to extend the highly repetitive
          SELP coding sequence from 2KY-5 to 2KY-10. Colony PCR and sequencing
          confirmed repeat doubling, and the longer construct was expressed and
          purified, yielding approximately{" "}
          <strong>480 mg per liter of bacterial culture</strong>. The{" "}
          <Link to="/experiments#wetlab-scaffold-17">construction method</Link>{" "}
          and <Link to="/results#wetlab-scaffold-17">supporting results</Link>{" "}
          give future teams a demonstrated route for extending the scaffold.
        </p>
        <p>
          Connector placement supplies a second design choice. Our construction
          records explain how a tag within the amplified cassette is copied
          during repeat doubling, while a tag outside that region remains at the
          terminus. The Registry-linked toolkit also includes 2KY-5 and 2KY-10
          constructs flanked by SnoopTag2 at both termini. Future teams can use
          these sequence records and the documented placement logic to plan
          scaffold length and the arrangement of functional attachment sites
          together.
        </p>
        <h4 className="mt-4 mb-3">A shared interface for functional modules</h4>
        <p>
          We use the established SnoopLigase2 system to connect
          SnoopTag2-bearing partners with DogTag-bearing modules. Through this
          interface, teams can retain the assembly strategy while introducing
          their own functional sequences. Our toolkit includes magnetic-binding
          and matrix-retention constructs, together with reporters and matched
          controls that support their evaluation.
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

        <div className="table-responsive mb-4">
          <table
            className="table table-bordered align-middle"
            aria-label="Selected biological parts and their reuse opportunities"
          >
            <TableCaption as="caption">
              Table 2 | Biological parts for modular material engineering.
              Selected Registry entries are grouped by task; the Parts page
              provides complete sequences, component annotations, and FASTA
              downloads.
            </TableCaption>
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
                  Investigate sequence-dependent protease cleavage using paired
                  constructs with the same surrounding architecture.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 className="mt-4 mb-3">
          A reference reaction for checking assembly
        </h4>
        <p>
          In our sfGFP reporter assay, a ligation-product band was detectable
          after <strong>10 minutes</strong>, and the SUMO-DogTag substrate band
          disappeared by <strong>60 minutes</strong>. The{" "}
          <Link to="/results#wetlab-scaffold-35">time-course results</Link> and{" "}
          <a
            href={
              PROTOCOL +
              "ligation-reaction-snoopligase2-mediated-peptide-peptide-ligation.pdf"
            }
          >
            Ligation Protocol
          </a>{" "}
          provide a reference that other teams can reproduce when establishing
          the system in their own laboratory.
        </p>
        <p>
          A practical route for extending NEST is to reproduce this reporter
          reaction, introduce the new DogTag-bearing module, and then evaluate
          the function of the assembled product. Enzyme-omission and
          tag-omission controls help assess ligation dependence, while matched
          functional controls address activity or binding specificity. This
          separates the evidence for successful attachment from the evidence for
          the intended material function.
        </p>

        <h3
          id="contribution-protocols"
          className="mt-5 mb-3"
          data-toc-depth="1"
        >
          2 Protocols for Protein Hydrogel Preparation
        </h3>
        <p>
          Our contribution to protein hydrogel preparation combines
          <strong>
            {" "}
            accessible procedures, a tested preparation sequence, and practical
            checks for protein recovery
          </strong>
          . The workflow connects inverse transition cycling (ITC),
          ultrafiltration-based buffer exchange, and lyophilization, with a
          separate protocol for blue-light photocrosslinking. Teams can use the
          individual procedures or follow the sequence from recovered scaffold
          protein to hydrogel preparation.
        </p>
        <p>
          Using SELP as the experimental system, we adapted established ITC
          principles<sup className="article-citation">[1, 2]</sup> and compared
          65&nbsp;&deg;C and 80&nbsp;&deg;C across NaCl concentrations of 0.5,
          1, and 2&nbsp;M. Salt concentration had the more pronounced effect in
          this screen. We selected{" "}
          <strong>65&nbsp;&deg;C in PBS containing 2&nbsp;M NaCl</strong> for
          subsequent scaffold variants. The{" "}
          <Link to="/results#wetlab-scaffold-04">purification results</Link>{" "}
          show the comparison and the resulting preparation workflow.
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
            bands in the supernatants collected after heating (H-Sup) and
            cooling (C-Sup) help identify protein loss during phase transition
            and resolubilization, respectively.
            <FigureSourceCitation
              source={1}
              href="#contribution-figure-sources"
            />
          </FigureCaption>
        </figure>

        <p>
          The optimization records also explain where to look when recovery
          changes: target-protein bands in the supernatant after heating (H-Sup)
          identify material remaining outside the recovered phase, while the
          supernatant after cooling (C-Sup) helps assess resolubilization.
          Tracking these fractions lets teams connect a change in yield to a
          particular preparation step and choose the next condition to
          investigate.
        </p>
        <p>
          Future teams can adopt the screening strategy for thermoresponsive
          proteins and adapt the buffer-exchange, lyophilization, and
          crosslinking steps to their own protein hydrogel systems. The value
          lies in sharing both the procedures and the reasoning used to connect
          protein recovery with material preparation.
        </p>
        <p>
          <strong>Use these resources:</strong>{" "}
          <a
            href={
              PROTOCOL + "purification-by-inverse-transition-cycling-itc.pdf"
            }
          >
            ITC
          </a>{" "}
          ·{" "}
          <a
            href={
              PROTOCOL +
              "protein-ultrafiltration-concentration-and-buffer-exchange.pdf"
            }
          >
            Buffer Exchange
          </a>{" "}
          ·{" "}
          <a href={PROTOCOL + "protein-lyophilisation-freeze-drying.pdf"}>
            Lyophilization
          </a>{" "}
          ·{" "}
          <a
            href={
              PROTOCOL + "blue-light-photo-crosslinking-of-selp-hydrogels.pdf"
            }
          >
            Photocrosslinking
          </a>{" "}
          · <Link to="/protocol">Full Protocol Library</Link>
        </p>

        <h3 id="contribution-modeling" className="mt-5 mb-3" data-toc-depth="1">
          3 Modeling for Protein Hydrogel Design
        </h3>
        <p>
          We share a computational workflow for comparing protein hydrogel
          designs before selecting candidates for wet-lab testing. It connects
          protein sequence, single-chain conformational sampling, coarse-grained
          network construction, and mechanical analysis, using SELP hydrogels as
          a worked example.
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
          The reusable contribution includes the choices that make these stages
          work together: how chains are sampled, how crosslinks and interchain
          contacts are represented, how network connectivity is checked, and how
          calculated stiffness is related to experimental modulus. Our records
          document numerical sensitivity analyses and experimental calibration,
          giving other teams a basis for interpreting the calculated results and
          choosing their own comparison conditions.
        </p>
        <p>
          The <Link to="/model">Model page</Link> explains these methods and
          their application to our constructs. The{" "}
          <Link to="/software">Software page</Link> translates the computational
          stages into task types, parameter settings, input files, and output
          inspection. Future teams can follow the workflow, calibrate its
          parameters against their own material measurements, and use the
          resulting comparisons to plan targeted experiments. The Model page
          also documents complementary approaches to SnoopLigase2 engineering
          and magnetic-field analysis that can inform further platform
          development.
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
          to help future teams develop the practical preparation workflow around
          a modular material. These resources address formulation information,
          operating guidance, component dispensing, and device construction.
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
          The app organizes material selection, component descriptions, QR-code
          scanning, and a four-step preparation guide. Future teams can adapt
          the material catalog and instructions for their own scaffold and
          functional-module combinations, using the existing application as a
          starting point for formulation-specific guidance.
        </p>
        <p>
          The hardware preparation unit provides three independently driven
          syringe channels and a mixing architecture, supported by device
          descriptions and bills of materials. The{" "}
          <Link to="/hardware">Hardware page</Link> documents the STM32
          controller, ESP32 communication layer, and web interface, together
          with the mechanical design. Teams can reference these files when
          building dispensing systems, adapting ingredient channels, or
          selecting replaceable fluid-contact consumables for a new material
          workflow.
        </p>
        <p>
          This gives the community resources at both levels: software for
          organizing preparation information and hardware designs for handling
          material components. Each can be adopted and developed independently
          according to the needs of the next project.
        </p>

        <h3
          id="contribution-human-practices"
          className="mt-5 mb-3"
          data-toc-depth="1"
        >
          5 Human Practices: NEST and SEED
        </h3>
        <p>
          We share an{" "}
          <Link to="/human-practices#ihp-toolbox-nest">
            Integrated Human Practices toolbox
          </Link>{" "}
          that connects stakeholder engagement with decisions about what to
          build and how to develop it. NEST organizes the work into Need-led
          Discovery, Evidence-based Co-design, Situated Implementation, and
          Trust and Lasting Impact. Within this framework, SEED gives teams a
          cycle they can apply to an individual design question.
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

        <ol>
          <li>
            <strong>Spark a Question:</strong> identify a need or engineering
            problem that requires investigation.
          </li>
          <li>
            <strong>Explore &amp; Analyze:</strong> combine stakeholder dialogue
            and literature research, then translate the findings into a Product
            Requirements Document (PRD).
          </li>
          <li>
            <strong>Engineering &amp; Implementation:</strong> use those
            requirements to guide the Design–Build–Test–Learn (DBTL) cycle.
          </li>
          <li>
            <strong>Dialogue &amp; Feedback:</strong> return the design and
            results to stakeholders and use their feedback to guide the next
            iteration.
          </li>
        </ol>
        <p>
          Our{" "}
          <Link to="/human-practices#ihp-nest-codesign">
            documented design cycles
          </Link>{" "}
          show how this process influenced NEST. For example, clinical feedback
          about the different loads borne by different joints helped turn
          material strength into a design requirement, informing the work on
          SELP repeat number and mechanical modeling. The stakeholder records
          connect the reason for each conversation, the findings, and their
          integration into the project.
        </p>
        <p>
          Future teams can reuse this structure to plan stakeholder questions,
          write requirements the engineering team can act on, and document how
          feedback changes a design. The toolbox and worked examples make the
          method available alongside the biological parts and technical
          resources, so teams can build both their material system and the
          process used to develop it.
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
