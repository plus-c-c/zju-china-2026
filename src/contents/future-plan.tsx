import { FigureCaption } from "../components/FigureCaption";
import {
  FigureSourceCitation,
  FigureSourceEntry,
} from "../components/FigureSourceCitation";
import { References } from "../components/References";
const CIF = "https://static.igem.wiki/teams/6102/wiki/images/cif/";

export function FuturePlan() {
  return (
    <div className="row mt-4">
      <div className="col">
        <h2>Future Plan</h2>
        <hr />
        <p>
          NEST has completed proof-of-concept validation of scaffold
          fabrication, material properties, standardized interfaces, and
          functional modules. The next step is to integrate these validated
          components into a unified material system and assess its performance
          at tissue interfaces under repeated loading. In parallel, we will
          optimize fermentation and downstream processing so that functional
          validation and reproducible manufacturing jointly inform the selection
          of the first product.
        </p>

        <h3 className="mt-5 mb-3">
          1. Integration of the Complete Material and Formulation Screening
        </h3>
        <p>
          The initial phase will focus on the focal cartilage-defect application
          described in the Implementation section. We will compare the baseline
          SELP formulation with the prioritized GAG-retention formulation, while
          retaining magnetically responsive and delivery-enabled formulations as
          subsequent platform candidates. In consultation with clinical
          collaborators, we will first define target mechanical ranges, gelation
          criteria, and handling requirements, and then screen formulations
          based on their performance as complete materials.
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
          Formulation screening will link material architecture and assembly
          efficiency to functional performance. All readouts will be measured in
          the fully assembled material to determine whether the intended design
          objectives are achieved after assembly and crosslinking.
        </p>
        <div className="table-responsive mb-4">
          <table
            className="table table-bordered align-middle"
            aria-label="Formulation screening: assessment focus, conditions, and key readouts"
          >
            <thead className="table-primary">
              <tr>
                <th scope="col">Assessment focus</th>
                <th scope="col">Conditions or processes to compare</th>
                <th scope="col">Key readouts</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mechanical properties and assembly</td>
                <td>
                  Scaffold specification, concentration, crosslinking, and
                  module assembly
                </td>
                <td>
                  Modulus under wet conditions, cyclic stability, assembly
                  yield, and component retention
                </td>
              </tr>
              <tr>
                <td>Orientation and GAG retention</td>
                <td>
                  Crosslinking after orientation; sustained fluid exchange
                </td>
                <td>
                  Retention of orientation, anisotropic mechanical properties,
                  GAG retention, and GAG release
                </td>
              </tr>
              <tr>
                <td>Stimuli-responsive delivery</td>
                <td>
                  Anchoring, MMP-13-triggered release, and intracellular
                  delivery
                </td>
                <td>Release fraction, payload activity, ATP, and ROS</td>
              </tr>
              <tr>
                <td>Compatibility of the complete formulation</td>
                <td>The complete material and its degradation products</td>
                <td>
                  Tissue compatibility, inflammatory responses, and degradation
                  behavior
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

        <h3 className="mt-5 mb-3">
          2. Validation at Tissue Interfaces alongside Fermentation Development
        </h3>
        <h4 className="mt-4 mb-2">
          2.1 Evaluating Candidate Materials in Models of Actual Defects
        </h4>
        <p>
          We will use ex vivo cartilage-defect models to determine whether the
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
        <h4 className="mt-4 mb-2">
          2.2 From Shake-Flask Culture to Controlled Fermentation and
          Reproducible Recovery
        </h4>
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
            will proceed in parallel. Before moving to in vivo studies, we will
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
          pilot-scale scale-up.
        </p>
        <p>
          This stage will be considered complete when candidate materials meet
          predefined requirements for wet-state adhesion and cyclic loading in
          tissue models, while multiple production batches remain consistent in
          identity, purity, reconstitution, gelation, and target functionality.
          Once these criteria have been met, the in vivo study design will be
          determined according to the intended use and risk profile of the
          selected candidate.
        </p>

        <h3 className="mt-5 mb-3">
          3. Assessing Repair Quality through In Vivo Studies
        </h3>
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
          This stage will be considered complete when predefined repair and
          safety endpoints are met and the added benefit of a functional
          formulation over the baseline scaffold can be clearly determined.
          These data will guide selection of the formulation for product
          development and inform adjustments to components or use conditions
          that do not provide the expected benefit.
        </p>

        <h3 className="mt-5 mb-3">
          4. Establishing Product Specifications and a Supply Framework for
          Deployment
        </h3>
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
          This stage will be complete when a candidate product has well-defined
          specifications, batch traceability, and clear storage and use
          conditions, supported by reproducible manufacturing procedures, a
          complete evaluation dossier, and a defined translational pathway.
          Manufacturing cost and workflow burden in clinical settings will also
          inform formulation selection.
        </p>

        <h3 className="mt-5 mb-3">
          5. Expanding the Platform into a Material Family for Different Injury
          Types
        </h3>
        <p>
          The first product will establish a reproducible basis for
          manufacturing, assembly, and use within NEST. Building on this
          foundation, we will extend the platform to three repair settings:
          filling and supporting focal defects, retaining matrix and supporting
          cells in OA lesions, and enabling stratified repair of osteochondral
          injuries. For each direction, material configuration and subsequent
          validation will be determined by the specific clinical need.
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
        <h4 className="mt-4 mb-2">
          5.1 Establishing the First Product for Focal Cartilage Defects
        </h4>
        <p>
          We will prioritize the baseline scaffold and GAG-retention
          formulation, comparing their performance in defect filling, fixation
          under wet conditions, and cyclic loading. Formulation selection will
          also take handling time and batch-to-batch reproducibility into
          account. The specifications, manufacturing documentation, and
          operating instructions established for this application will provide a
          common starting point for subsequent product development.
        </p>
        <h4 className="mt-4 mb-2">
          5.2 Advancing OA Functional Modules into Fully Integrated Material
          Formulations
        </h4>
        <p>
          The GAG-retention formulation will be evaluated for matrix
          preservation under continuous fluid exchange; the magnetically
          responsive formulation will be assessed for orientation and mechanical
          benefits after crosslinking; and the delivery formulation will be
          evaluated from trigger-induced release through payload activity.
          Comparisons of individual modules and their combinations will help
          identify OA-oriented formulations that retain their functions in the
          complete material.
        </p>
        <h4 className="mt-4 mb-2">
          5.3 Co-developing Layered Products with Bone-Repair Materials
        </h4>
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
          NEST ultimately aims to provide purpose-specific material options for
          different cartilage injuries. Tissue data, manufacturing
          specifications, and use-related experience from each application will
          inform the next design cycle, enabling the platform&rsquo;s
          established programmability to be translated into products that can be
          supplied reproducibly.
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
          title="Figure Sources and Credits"
          id="figure-sources-and-credits"
        >
          <ul className="references-list figure-sources-list">
            <FigureSourceEntry source={1} id="future-plan-figure-sources">
              <p>
                Figure assets from Bioicons: Marcel Tisch, Simon D&uuml;rr,
                jaiganesh, and Daniel-Marcos (CC0); DBCLS (CC BY 4.0); and
                Servier (CC BY 3.0). <a href="https://bioicons.com/">Source</a>
              </p>
              <p>
                Figure assets from Google Noto Emoji (Apache 2.0). Photographs
                and application interfaces are from project materials.{" "}
                <a href="https://github.com/googlefonts/noto-emoji">Source</a>
              </p>
            </FigureSourceEntry>
          </ul>
        </References>
      </div>
    </div>
  );
}
