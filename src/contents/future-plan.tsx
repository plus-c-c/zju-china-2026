import { TableCaption } from "../components/FigureCaption";
import { FigureCaption } from "../components/FigureCaption";
import {
  FigureSourceCitation,
  FigureSourceEntry,
} from "../components/FigureSourceCitation";
import { References } from "../components/References";
const CIF = "https://static.igem.wiki/teams/6102/wiki/images/cif/";
const BASE = import.meta.env.BASE_URL;

export function FuturePlan() {
  return (
    <div className="row mt-4">
      <div className="col">
        <p>
          We see an opportunity to build a cartilage-repair business around a
          programmable protein platform. Through our proposed company, NexCode
          Biotechnologies, we want to grow NEST into a family of materials for
          different injuries, with production methods and preparation tools
          that make those materials practical to supply and use. We plan to
          start with research partnerships and product co-development with
          orthopedic companies and research hospitals.
        </p>
        <p>
          We already have laboratory proof-of-concept results for scaffold
          fabrication, material properties, standardized interfaces, and
          individual functional modules. The next phase will test the complete
          materials at tissue interfaces under repeated loading, while
          fermentation and downstream development address production
          consistency.
        </p>
        <p>
          The{" "}
          <a href={`${BASE}entrepreneurship#timeline`}>
            Entrepreneurship roadmap
          </a>{" "}
          places lead-candidate selection in 2026&ndash;2027 and product and
          process optimization in 2027&ndash;2029. These are planning windows;
          study results, product classification, and funding will determine the
          pace of development.
        </p>

        <h2 className="mt-5 mb-3">
          1 Integration of the Complete Material and Formulation Screening
        </h2>
        <p>
          The initial phase will focus on the focal knee-cartilage-defect
          application described in the{" "}
          <a href={`${BASE}implementation`}>Implementation section</a>. We will
          start with the SELP&ndash;SnoopTag2 MVP and compare it with a
          GAG-retention formulation. Magnetic and delivery-enabled formulations
          will remain later candidates. In consultation with clinical
          collaborators, we will first define target mechanical ranges, gelation
          criteria, and handling requirements, and then screen formulations
          based on their performance as complete materials.
        </p>
        <p>
          At this stage, we will write a target product profile with prospective
          users and review intellectual-property ownership, prior disclosures,
          and third-party rights before patent filing and development
          agreements. We will also seek early advice on product classification.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}1.avif`}
            alt="Transition from validation of individual components to evaluation of the complete material."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <FigureCaption className="figure-caption">
            Figure 1 | Transition from validation of individual components to
            evaluation of the complete material. Six complementary readouts will
            guide formulation screening and assess scaffold, connector, and
            functional-module performance within a unified system.
            <FigureSourceCitation
              source={1}
              href="#future-plan-figure-sources"
            />
          </FigureCaption>
        </figure>
        <p>
          The base MVP will be assessed for gelation, mechanics, degradation,
          biocompatibility, and reproducibility. Module-containing candidates
          will also be tested after assembly and crosslinking. The magnetic
          alignment and triggered-delivery tests below apply to those later
          formulations.
        </p>
        <TableCaption>
          <strong>
            Table 1 | Tests for selecting the first NEST formulation.
          </strong>{" "}
          Compare the assembled material with the scaffold alone and with each
          module tested separately. Repeat the tests with independently prepared
          batches.
        </TableCaption>
        <div className="table-responsive mb-4">
          <table
            className="table table-bordered align-middle"
            aria-label="Table 1 | Tests for selecting the first NEST formulation"
          >
            <thead className="table-primary">
              <tr>
                <th scope="col">Test</th>
                <th scope="col">What we will compare</th>
                <th scope="col">What we will measure</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gel formation and compression</td>
                <td>
                  SELP concentrations and crosslinking conditions, with and
                  without attached modules.
                </td>
                <td>
                  Gelation time, wet compressive modulus, and changes in modulus
                  after repeated compression. Measure how much of each module
                  remains attached after washing.
                </td>
              </tr>
              <tr>
                <td>Magnetic alignment</td>
                <td>
                  Gels crosslinked with and without an applied magnetic field.
                </td>
                <td>
                  Alignment before and after crosslinking, stiffness parallel
                  and perpendicular to the alignment, and whether alignment
                  persists after repeated compression.
                </td>
              </tr>
              <tr>
                <td>GAG retention</td>
                <td>
                  The GAG-binding formulation and the scaffold alone during
                  repeated buffer replacement.
                </td>
                <td>
                  GAG remaining in the gel and GAG recovered from each buffer
                  change. Repeat after compression to test whether loading
                  increases GAG loss.
                </td>
              </tr>
              <tr>
                <td>Triggered delivery</td>
                <td>
                  The delivery formulation with and without MMP-13, alongside
                  free payload and scaffold-only controls.
                </td>
                <td>
                  Payload release over time and activity after release. For
                  mitochondrial delivery, measure cellular ATP and ROS to check
                  whether uptake changes cell function.
                </td>
              </tr>
              <tr>
                <td>Cell response and degradation</td>
                <td>
                  Cells exposed to the assembled gel, scaffold alone, or
                  material collected as the gel degrades.
                </td>
                <td>
                  Cell viability, inflammatory markers, gel mass loss, and
                  changes in stiffness during degradation.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          For each candidate, we will include controls comprising the baseline
          scaffold, individual modules, and appropriate combinations to
          determine whether assembly and crosslinking alter their respective
          functions. Replicate batches will be used to assess reproducibility
          and identify formulations most suitable for progression to tissue
          models.
        </p>
        <p>
          A stage will be considered complete when a candidate with a defined
          composition and manufacturing conditions is selected: its intended
          functions are retained in the complete material, its mechanical
          properties under wet conditions and handling characteristics meet
          predefined design requirements, and the results are reproducible
          across independent batches. Formulation selection will be based on
          these combined outcomes.
        </p>

        <h2 className="mt-5 mb-3">
          2 Validation at Tissue Interfaces alongside Fermentation Development
        </h2>
        <h3 className="mt-4 mb-2" data-toc="include" data-toc-depth="2">
          2.1 Evaluating Candidate Materials in Models of Actual Defects
        </h3>
        <p>
          We will use <em>ex vivo</em> cartilage-defect models to determine whether the
          precursor can be delivered into irregular spaces, form a continuous
          material, and integrate with wet cartilage interfaces. Cyclic
          compression and fluid exchange will be used to quantify material
          retention, interfacial stability, mechanical-property retention, and
          GAG loss, directly relating material performance to the intended use
          environment. For functional formulations, module retention and
          activity after loading will also be assessed.
        </p>
        <p>
          The preparation and administration workflow will also be evaluated at
          this stage. Based on observations from the current device, we will
          optimize line priming and air removal, compare the effects of valve
          switching and pump start/stop cycles on output, and refine the
          quick-release loading structure. Multipoint temperature measurements
          will be used to assess response lag and temperature uniformity within
          the reservoir. Professional users will participate in reconstitution,
          loading, premixing, and delivery tests; task-completion time,
          component verification, and status recognition will be recorded to
          guide iterative development of the app, device web interface, and
          hardware.
        </p>
        <h3 className="mt-4 mb-2" data-toc="include" data-toc-depth="2">
          2.2 From Shake-Flask Culture to Controlled Fermentation and
          Reproducible Recovery
        </h3>
        <p>
          In parallel with material integration, we will produce SELP in a
          laboratory-scale stirred-tank bioreactor. Aeration, pH, feeding, and
          induction conditions will be optimized, while repeat-sequence
          stability and soluble expression are monitored. Evaluation will track
          culture titer, productivity per unit time, downstream recovery yield,
          and the final quantity of qualified gel-forming material, ensuring
          that increases in culture scale translate into increases in usable
          material output.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}2.avif`}
            alt="Material validation and manufacturing-process development proceed in parallel."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <FigureCaption className="figure-caption">
            Figure 2 | Material validation and manufacturing-process development
            will proceed in parallel. Before moving to <em>in vivo</em> studies, we will
            verify both tissue-interface performance and reproducible production
            of qualified batches. Bioreactor production, ITC scale-up, and
            formulation optimization remain future work.
            <FigureSourceCitation
              source={1}
              href="#future-plan-figure-sources"
            />
          </FigureCaption>
        </figure>
        <p>
          Downstream scale-up will build on the ITC process already adopted. We
          will investigate temperature uniformity, phase-transition completion,
          and separation efficiency at larger volumes, and compare membrane
          concentration with buffer-exchange methods{" "}
          <sup className="article-citation">[1, 2]</sup>. Salt and water
          consumption, energy use during heating/cooling cycles, lyophilization
          losses, and processing time will be tracked to estimate manufacturing
          cost per qualified material unit and prioritize improvements for
          pilot-scale production.
        </p>
        <p>
          Early pilot batches could be produced with a qualified development and
          manufacturing partner. We will use recovery, batch consistency, and
          cost data from these runs to revisit the 500 L production scenario in
          Entrepreneurship. Dedicated capacity would be considered after the
          process is mature and demand has been demonstrated.
        </p>
        <p>
          This stage will be considered complete when candidate materials meet
          predefined requirements for wet-state adhesion and cyclic loading in
          tissue models, while multiple production batches remain consistent in
          identity, purity, reconstitution, gelation, and target functionality.
          Once these criteria have been met, the <em>in vivo</em> study design will be
          determined according to the intended use and risk profile of the
          selected candidate.
        </p>

        <h2 className="mt-5 mb-3">
          3 Assessing Repair Quality through In Vivo Studies
        </h2>
        <p>
          Animal studies will be designed around the selected defect indication,
          including the baseline scaffold, functional formulations, and
          model-appropriate reference groups. Endpoints will include material
          retention and degradation, local inflammation, newly formed cartilage
          matrix, tissue-interface integration, and mechanical properties of the
          repair site, so histological findings can be interpreted alongside
          functional recovery. Follow-up time points will be determined
          according to material degradation and tissue-repair kinetics.
        </p>
        <p>
          This stage will be considered complete when the lead formulation meets
          predefined repair and safety endpoints. For a functional candidate, we
          will also need evidence of benefit over the baseline scaffold that
          justifies its added complexity. These data will guide selection of the
          formulation for product development and inform adjustments to
          components or use conditions that do not provide the expected benefit.
        </p>

        <h2 className="mt-5 mb-3">
          4 Establishing Product Specifications and a Supply Framework for
          Deployment
        </h2>
        <p>
          Once a candidate formulation has been validated in tissue models, we
          will define its critical components, assembly conditions, and
          manufacturing ranges, and translate the parameters associated with
          performance into product specifications. Scaffold identity and
          integrity, purity, endotoxin levels, residual impurities, microbial
          control, and gelation performance will collectively inform
          batch-release criteria. For functional formulations, specifications
          will also include assembly yield, activity, and relevant payload
          attributes.
        </p>
        <p>
          The business roadmap places preparation for clinical studies in
          2029&ndash;2031, clinical evaluation in 2031&ndash;2035, and
          regulatory review and launch preparation in 2035&ndash;2037. Human
          studies would begin after the required quality and safety evidence and
          approvals are in place. These dates will be revised as evidence and
          funding become available.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}3.avif`}
            alt="Four-stage development roadmap and its key completion criteria."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <FigureCaption className="figure-caption">
            Figure 3 | Four-stage development roadmap and its key completion
            criteria. Process optimization will proceed in parallel with
            material integration from the outset and will be assessed together
            with tissue validation. Subsequent decisions will be guided by
            repair and safety endpoints, product specifications, and stability.
            <FigureSourceCitation
              source={1}
              href="#future-plan-figure-sources"
            />
          </FigureCaption>
        </figure>
        <p>
          Storage strategies will be developed for each component separately.
          The lyophilized scaffold will undergo studies of packaging, transport,
          reconstitution, and stability, while storage conditions and allowable
          use periods will be defined separately for protein modules and active
          payloads such as mitochondria. We will compare preassembly at the
          supply stage with point-of-use assembly in terms of quality, time, and
          cost, and select a delivery format that reliably preserves function.
        </p>
        <p>
          The clinician-facing application and material-preparation device will
          be iteratively refined alongside the final formulation to harmonize
          product names, component order, and operating instructions.
          Simulated-use studies with professional users will assess
          task-completion time, critical-step errors, comprehension of prompts,
          and maintenance burden, generating operating documents for training
          and quality traceability. Product classification and subsequent
          regulatory requirements will be determined based on the final
          composition, primary mode of action, and target jurisdiction{" "}
          <sup className="article-citation">[3]</sup>.
        </p>
        <p>
          Preparation for clinical studies will require fixed product
          specifications, batch traceability, storage and use conditions,
          reproducible manufacturing procedures, and the required evaluation
          dossier. Routine hospital supply will additionally depend on clinical
          evidence and the relevant authorizations. Manufacturing cost and the
          time and equipment needed in hospitals will also inform formulation
          selection.
        </p>

        <h2 className="mt-5 mb-3">
          5 Expanding the Platform into a Material Family for Different Injury
          Types
        </h2>
        <p>
          The first product will focus on focal knee-cartilage defects in China.
          Its manufacturing and preparation procedures will be the starting
          point for later formulations: matrix retention and cellular support in
          OA lesions, and layered materials for osteochondral injuries.
          Expansion to other joints and regions will require intended-use
          definitions and testing for each new application. The
          2037&ndash;2042 expansion phase in the business roadmap would build
          on clinical and supply data from the first product.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}4.avif`}
            alt="A shared scaffold and functional interfaces support three proposed application directions."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <FigureCaption className="figure-caption">
            Figure 4 | A shared scaffold and functional interfaces support three
            proposed application directions.
            <FigureSourceCitation
              source={1}
              href="#future-plan-figure-sources"
            />
          </FigureCaption>
        </figure>
        <h3 className="mt-4 mb-2" data-toc="include" data-toc-depth="2">
          5.1 Establishing the First Product for Focal Cartilage Defects
        </h3>
        <p>
          We will start with the SELP&ndash;SnoopTag2 MVP and compare it with
          the GAG-retention formulation in defect filling, fixation under wet
          conditions, and cyclic loading. The lead candidate will be the
          simplest formulation that meets the performance targets. Handling time
          and batch-to-batch reproducibility will also influence the choice. Its
          specifications, manufacturing documentation, and operating
          instructions can then be adapted for later products.
        </p>
        <h3 className="mt-4 mb-2" data-toc="include" data-toc-depth="2">
          5.2 Advancing OA Functional Modules into Fully Integrated Material
          Formulations
        </h3>
        <p>
          The GAG-retention formulation will be evaluated for matrix
          preservation under continuous fluid exchange; the magnetically
          responsive formulation will be assessed for orientation and mechanical
          benefits after crosslinking; and the delivery formulation will be
          evaluated from trigger-induced release through payload activity.
          Comparisons of individual modules and their combinations will help
          identify OA-oriented formulations that retain their functions in the
          complete material. Mitochondrial delivery will remain a parallel
          research direction until its provenance, potency, storage stability,
          and delivery performance are established. Each new combination will
          need its own safety and regulatory assessment.
        </p>
        <h3 className="mt-4 mb-2" data-toc="include" data-toc-depth="2">
          5.3 Co-developing Layered Products with Bone-Repair Materials
        </h3>
        <p>
          We will collaborate with developers of bone-repair materials to
          combine the NEST cartilage layer with a separate bone-support layer in
          a composite structure. Key endpoints will include interlayer adhesion,
          load transfer and stability under cyclic loading, and matrix formation
          on the cartilage side. The overall performance of the composite will
          determine its progression to subsequent tissue studies, extending the
          programmable cartilage layer to applications involving multiple
          tissues.
        </p>
        <p>
          The proposed applications will increase demand for the shared scaffold
          platform. Different products can leverage compatible
          scaffold-production, ITC-recovery, and quality-control procedures,
          while functional components will be manufactured according to their
          individual requirements. We will track the output of qualified
          material and the cost per product so that expansion of the product
          family can proceed in parallel with fermentation and purification
          scale-up.
        </p>
        <p>
          Early B2B work will focus on research partnerships, co-development,
          and technology-development licensing with orthopedic companies and
          research hospitals. After the required testing and authorizations,
          clinical institutions would procure implant materials and associated
          delivery solutions. We also plan to explore SnoopLigase2-ZJU as a
          separate product candidate, with its own specifications and validation
          work.
        </p>
        <p>
          Growing NexCode will mean making clear choices about products,
          partners, and investment. We will base those choices on repair
          performance, production cost, and feedback from clinicians. Our
          ambition is to become a company that hospitals and orthopedic
          partners can turn to when a new cartilage-repair need arises, and to
          use each product we develop to make the next one possible.
        </p>

        <References level={2}>
          <div className="references-list references-list--paragraphs">
            <p>
              [1] Meyer DE, Chilkoti A. <em>Nature Biotechnology</em>.
              1999;17:1112&ndash;1115.{" "}
              <a href="https://doi.org/10.1038/70265">Source</a>
            </p>
            <p>
              [2] Hassouneh W, Christensen T, Chilkoti A.{" "}
              <em>Current Protocols in Protein Science</em>.
              2010;61:6.11.1&ndash;16.{" "}
              <a href="https://doi.org/10.1002/0471140864.ps0611s61">Source</a>
            </p>
            <p>
              [3] National Medical Products Administration (NMPA) Government
              Service Portal. Product Classification of Drug&ndash;Device
              Combination Products.{" "}
              <a href="https://english.nmpa.gov.cn/">Source</a>
            </p>
          </div>
        </References>
        <References
          level={2}
          title="Figure Sources"
          id="figure-sources-and-credits"
        >
          <ul className="references-list figure-sources-list">
            <FigureSourceEntry source={1} id="future-plan-figure-sources">
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
