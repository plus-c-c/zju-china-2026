import { useId } from "react";
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
const STAKEBRIDGE = `${import.meta.env.BASE_URL}stakebridge/index.html`;
const STAKEBRIDGE_SOURCE =
  "https://gitlab.igem.org/2026/software/zju-china/nest/-/tree/main/stakebridge";
const HP_REPORT = "https://static.igem.wiki/teams/6102/wiki/hp-new/res.pdf";
const SYNEDU = "https://syneduglobal.top";
const basicCount = collection.parts.filter(
  (part) => part.kind === "basic",
).length;
const compositeCount = collection.parts.filter(
  (part) => part.kind === "composite",
).length;

function ContributionOverview() {
  const id = useId();
  const source = `${CIF}01-nest-contributions-equal.avif`;

  return (
    <svg
      className="figure-img img-fluid rounded"
      style={{ width: "100%", height: "auto" }}
      viewBox="0 0 4000 1778"
      role="img"
      aria-label="NEST contributions: reusable resources for the iGEM community."
    >
      <defs>
        <clipPath id={`${id}-model`}>
          <rect x="576" y="1218" width="304" height="349" />
        </clipPath>
        <filter
          id={`${id}-white`}
          filterUnits="userSpaceOnUse"
          x="576"
          y="1218"
          width="304"
          height="349"
          colorInterpolationFilters="sRGB"
        >
          {/* Key the white sheet only within the modeling illustration. */}
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    -16 -16 -16 0 47.8"
          />
        </filter>
      </defs>
      <image href={source} width="4000" height="1778" />
      <g clipPath={`url(#${id}-model)`}>
        {/* The cleared pixels reveal the existing blue modeling panel. */}
        <rect x="576" y="1218" width="304" height="349" fill="#e8f0fb" />
        <image
          href={source}
          width="4000"
          height="1778"
          filter={`url(#${id}-white)`}
        />
      </g>
    </svg>
  );
}

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
        <p>
          Through NEST, we share the biological components, experimental
          methods, design tools, and Human Practices resources developed across
          our project. Future iGEM teams can build on these contributions to
          develop protein biomaterials, investigate real needs, involve
          stakeholders in engineering decisions, and share knowledge with wider
          communities.
        </p>
        <p>
          Our experimental contributions include SELP scaffolds, interchangeable
          functional modules, a common SnoopLigase2 ligation interface, and
          protocols for protein recovery and hydrogel preparation. We also share
          modeling workflows that connect protein sequence to network mechanics,
          alongside an open-source application for clinicians and hardware
          designs for material preparation and administration. These resources
          give teams documented starting points for building, testing, and
          adapting their own material systems.
        </p>
        <p>
          Our Human Practices contributions include the NEST framework and SEED
          cycle, mixed-methods research and engagement guidance, the StakeBridge
          stakeholder library, implementation and sustainability case studies,
          medical-anthropology and cartilage-health research, and the
          collaboratively developed SynEdu Global education platform. Together,
          they offer approaches and resources for understanding patient
          experience, connecting evidence to design, considering barriers to
          use, and supporting education beyond a single project. The sections
          below explain what each contribution offers and how to access and
          adapt it.
        </p>
        <figure className="figure d-block my-4 text-center">
          <ContributionOverview />
          <FigureCaption className="figure-caption">
            Figure 1 | Resources shared with the iGEM community. The diagram
            links our biological parts and protocols, modeling workflow, app and
            hardware, and Human Practices toolkit, including the stakeholder
            library and NEST/SEED methods.
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
                  Application source code, preparation and administration
                  hardware drawings, PCB projects, and bills of materials
                </td>
                <td>
                  Adapt clinician guidance, material preparation, and
                  administration modules to new material systems
                </td>
                <td>
                  <a href={APP_SOURCE}>Application Code</a> ·{" "}
                  <a href={HARDWARE_SOURCE}>Hardware Files</a> ·{" "}
                  <Link to="/hardware">Hardware Guide</Link>
                </td>
              </tr>
              <tr>
                <th scope="row">Human Practices Methods</th>
                <td>
                  NEST framework, SEED cycle, mixed-methods research guidance,
                  and design and implementation case studies
                </td>
                <td>
                  Investigate needs, translate findings into requirements, and
                  plan stakeholder-informed design and implementation
                </td>
                <td>
                  <Link to="/human-practices#toolbox">iHP Toolkit</Link> ·{" "}
                  <Link to="/human-practices#nest">Worked Examples</Link>
                </td>
              </tr>
              <tr>
                <th scope="row">Stakeholder Engagement</th>
                <td>
                  Stakeholder map and interview records, StakeBridge library,
                  interview workspace, handbook, and contribution workflow
                </td>
                <td>
                  Find relevant stakeholders, reuse interview approaches, trace
                  feedback to design decisions, and contribute new records
                </td>
                <td>
                  <a href={`${STAKEBRIDGE}#registry`}>Stakeholder Library</a> ·{" "}
                  <Link to="/human-practices#ihp-toolbox-stakebridge">
                    StakeBridge Guide
                  </Link>
                </td>
              </tr>
              <tr>
                <th scope="row">Research, Education and Lasting Impact</th>
                <td>
                  Cartilage-health report, medical-anthropology reflections,
                  SynEdu Global, education activities, and sustainability
                  planning
                </td>
                <td>
                  Learn from patient experiences, adapt public education,
                  connect with educational partners, and plan lasting impact
                </td>
                <td>
                  <a href={HP_REPORT}>Research Report</a> ·{" "}
                  <a href={SYNEDU}>SynEdu Global</a> ·{" "}
                  <Link to="/human-practices#ihp-nest-trust">
                    Lasting Impact
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 id="contribution-parts" className="mt-5 mb-3" data-toc-depth="1">
          1 Parts for Modular Protein Hydrogel Design
        </h2>
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
          <strong>10 min</strong>, and the SUMO-DogTag substrate band had
          disappeared by <strong>60 min</strong>. Teams can reproduce this
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
        <h2
          id="contribution-protocols"
          className="mt-5 mb-3"
          data-toc-depth="1"
        >
          2 Protocols for Protein Hydrogel Preparation
        </h2>
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
        <h2 id="contribution-modeling" className="mt-5 mb-3" data-toc-depth="1">
          3 Modeling for Protein Hydrogel Design
        </h2>
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
        <h2
          id="contribution-software-hardware"
          className="mt-5 mb-3"
          data-toc-depth="1"
        >
          4 Software and Hardware for Material Preparation and Clinician Use
        </h2>
        <p>
          We share <a href={APP_SOURCE}>application source code</a> and{" "}
          <a href={HARDWARE_SOURCE}>
            mechanical drawings and PCB project files
          </a>{" "}
          for material preparation and clinician workflows. The application
          supports physicians, nurses, and clinical operators in formulation
          selection and ordering, QR-code scanning, and viewing
          formulation-specific operating instructions. Its step-by-step workflow
          guides reagent loading and preparation through premixing.
        </p>
        <p>
          The hardware includes both preparation and administration modules. The
          preparation unit provides independently driven dispensing channels,
          mixing, and temperature control. Administration components include an
          injection assembly, arthroscopic imaging and blue-light
          photocrosslinking, and a magnetic leg band for applying an external
          field. These designs give future teams references for material
          handling, delivery, visualization, and photocrosslinking in workflows
          designed for clinician use.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}12.avif`}
            alt="The preparation hardware prototype and the clinician application interface."
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
          Teams can customize the application&rsquo;s material catalog and
          clinician guidance for new scaffold and module combinations, adapt the
          preparation hardware to their formulations, and modify administration
          components for their own delivery and handling studies. The{" "}
          <Link to="/software">Software documentation</Link> and{" "}
          <Link to="/hardware">Hardware guide</Link> provide the operating
          workflows, device descriptions, and bills of materials.
        </p>
        <h2
          id="contribution-human-practices"
          className="mt-5 mb-3"
          data-toc-depth="1"
        >
          5 Human Practices: Methods, Shared Tools and Community Resources
        </h2>
        <p>
          Our Human Practices contributions cover how teams investigate needs,
          involve stakeholders, refine designs, prepare for implementation, and
          share their findings. We bring together methodological tools, a
          stakeholder library, practical case studies, research, and education
          resources that teams can adapt to their own questions and communities.
        </p>
        <h3
          id="contribution-nest-seed"
          className="mt-4 mb-3"
          data-toc-depth="2"
        >
          5.1 NEST and SEED: Connecting Needs to Engineering
        </h3>
        <p>
          The <Link to="/human-practices#ihp-toolbox-nest">NEST framework</Link>{" "}
          organizes Human Practices around Need-led Discovery, Evidence-based
          Co-design, Situated Implementation, and Trust and Lasting Impact.
          Within it, the{" "}
          <Link to="/human-practices#ihp-toolbox-seed">SEED cycle</Link>{" "}
          connects a question to exploration, engineering, and renewed dialogue.
          Stakeholder findings and literature inform a Product Requirements
          Document (PRD), which guides the Design–Build–Test–Learn (DBTL) cycle;
          the results then return to stakeholders for feedback.
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
          Our <Link to="/human-practices#ihp-nest-codesign">design cycles</Link>{" "}
          document this process for SELP scaffolds, the ligation system, and
          functional modules. For example, clinicians&rsquo; concerns about
          different joint loads guided scaffold-length choices and mechanical
          modeling. Teams can use these cases to formulate requirements,
          document the reasoning behind a change, and plan the next stakeholder
          discussion.
        </p>
        <h3
          id="contribution-hp-research-methods"
          className="mt-4 mb-3"
          data-toc-depth="2"
        >
          5.2 Mixed Methods and Stakeholder Engagement
        </h3>
        <p>
          We document a{" "}
          <Link to="/human-practices#ihp-toolbox-mixed">
            mixed-methods approach
          </Link>{" "}
          that combines questionnaires, interviews, and literature research.
          Surveys help identify patterns in reported experiences; interviews
          explain the circumstances behind them. Our{" "}
          <Link to="/human-practices#ihp-nest-field-research">
            field-research analysis
          </Link>{" "}
          shows how we brought these findings into design requirements and
          records the limits of the survey sample. Teams can adapt this process
          when deciding what evidence to collect and how to interpret it.
        </p>
        <p>
          The{" "}
          <Link to="/human-practices#ihp-stakeholders-map">
            stakeholder map
          </Link>{" "}
          follows the project from patients and research through treatment,
          manufacturing, market access, and rehabilitation. The corresponding{" "}
          <Link to="/human-practices#ihp-engagement-timeline">
            interview records
          </Link>{" "}
          connect the reason for each conversation to findings and their
          influence on the project. Together, they give teams examples for
          identifying relevant perspectives, scheduling engagement, and
          integrating evidence across a project&rsquo;s development.
        </p>
        <h3
          id="contribution-stakebridge"
          className="mt-4 mb-3"
          data-toc-depth="2"
        >
          5.3 StakeBridge: A Shared Stakeholder Library
        </h3>
        <p>
          Inspired by BioBricks and the iGEM parts registry, we developed{" "}
          <Link to="/human-practices#ihp-toolbox-stakebridge">
            <strong>StakeBridge</strong>
          </Link>{" "}
          as a shared library of stakeholders and engagement experiences.
          Records bring together roles, project stages, the reason for
          engagement, interview findings, design decisions, limitations, and
          supporting sources. Teams can search by stage, role, or field, learn
          from previous conversations, and contribute their own experiences so
          that knowledge can accumulate across teams and years.
        </p>
        <p>
          The <a href={`${STAKEBRIDGE}#workspace`}>interview workspace</a> lets
          teams organize their own stages and interviews, link feedback to
          decisions, and export Word reports or full backups. The{" "}
          <a href={`${STAKEBRIDGE}#handbook`}>handbook</a> provides guidance and
          an interview template, while the{" "}
          <a href={`${STAKEBRIDGE}#contribute`}>contribution form</a> prepares
          records for maintainer review. Public contact information and
          confirmed interview availability are recorded separately. Explore the{" "}
          <a href={`${STAKEBRIDGE}#registry`}>library</a> or adapt the{" "}
          <a href={STAKEBRIDGE_SOURCE}>MIT-licensed source code</a>; library
          records are shared under CC BY 4.0.
        </p>
        <h3
          id="contribution-hp-implementation"
          className="mt-4 mb-3"
          data-toc-depth="2"
        >
          5.4 Implementation and Sustainable Development
        </h3>
        <p>
          Our{" "}
          <Link to="/human-practices#ihp-nest-situated">
            implementation cycles
          </Link>{" "}
          document how nurses, manufacturers, and business and access advisers
          shaped hardware operation, material preparation, storage, costs, and
          routes to use. The{" "}
          <Link to="/human-practices#ihp-syringe-questionnaire">
            syringe evaluation
          </Link>{" "}
          provides a concrete example: 24 participants each assessed three
          configurations, with comparisons of handling, fatigue, operational
          problems, and satisfaction. Teams can adapt this evaluation structure
          to compare prototypes with intended users.
        </p>
        <p>
          The <Link to="/entrepreneurship">business plan</Link> extends these
          considerations to development milestones, financing, market access,
          and environmental, social, and governance (ESG) responsibilities.
          Together, the cases and planning documents offer a reference for
          bringing manufacturing, affordability, and long-term responsibility
          into project discussions. Teams should adapt the questions and
          planning process to their own product and setting.
        </p>
        <h3
          id="contribution-hp-social-research"
          className="mt-4 mb-3"
          data-toc-depth="2"
        >
          5.5 Patient Experience, Anthropology and Health Research
        </h3>
        <p>
          Our{" "}
          <Link to="/human-practices#ihp-toolbox-anthro">
            anthropology and philosophy work
          </Link>{" "}
          examines how patients&rsquo; experiences, diagnostic thresholds, and
          social conditions shape the problems that biomedical projects seek to
          address. We worked with medical anthropologists on a paper about
          overlooked suffering and organized medical-anthropology lectures and
          seminars for future doctors. These documented activities offer a case
          for teams considering the social and ethical dimensions of their
          projects.
        </p>
        <p>
          We also share a{" "}
          <a href={HP_REPORT}>cartilage-health research report</a> that brings
          together findings about neglected pain and proposals for community
          health education. Its development and the associated outreach are
          described under{" "}
          <Link to="/human-practices#ihp-nest-trust">
            Trust and Lasting Impact
          </Link>
          . Teams can use this work as a case study in turning field research
          into public-facing recommendations and keeping lived experience
          visible alongside technical measures of success.
        </p>
        <h3
          id="contribution-hp-education"
          className="mt-4 mb-3"
          data-toc-depth="2"
        >
          5.6 SynEdu Global and Shared Education Resources
        </h3>
        <p>
          Together with Westlake, XJTLU-China, and Jiangnan University, we
          developed <a href={SYNEDU}>SynEdu Global</a> to connect iGEM teams,
          educational institutions, and organizations seeking synthetic biology
          education. Users can share and download activity materials, exchange
          ideas, and find educational partners. An industry-focused module
          extends the platform&rsquo;s scope, and the four founding universities
          signed a five-year cooperation agreement to support continued
          operation. Future teams can reuse materials, contribute activities,
          and develop new collaborations through the platform.
        </p>
        <p>
          Our <Link to="/education">Education page</Link> also documents
          activities for children, older adults, the public, and medical
          students, including practical activities, cartilage-health education,
          and{" "}
          <Link to="/education#gallery">artwork developed with Chen Xi</Link>.
          These examples give teams ideas for adapting content and formats to
          different audiences, while the platform provides a place to share the
          resulting resources and sustain cooperation.
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
                Icons from <a href="https://bioicons.com/">Bioicons</a>: Marcel
                Tisch, Simon D&uuml;rr, jaiganesh, and Daniel-Marcos (
                <a href="https://creativecommons.org/publicdomain/zero/1.0/">
                  CC0
                </a>
                ); DBCLS (
                <a href="https://creativecommons.org/licenses/by/4.0/">
                  CC BY 4.0
                </a>
                ); Servier (
                <a href="https://creativecommons.org/licenses/by/3.0/">
                  CC BY 3.0
                </a>
                ).
              </p>
              <p>
                Google.{" "}
                <a href="https://github.com/googlefonts/noto-emoji">
                  Noto Emoji
                </a>
                .{" "}
                <a href="https://www.apache.org/licenses/LICENSE-2.0">
                  Apache 2.0
                </a>
                .
              </p>
            </FigureSourceEntry>
          </ul>
        </References>
      </div>
    </div>
  );
}
