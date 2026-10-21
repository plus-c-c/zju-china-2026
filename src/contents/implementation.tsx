import { TableCaption } from "../components/FigureCaption";
import { FigureCaption } from "../components/FigureCaption";
import { References } from "../components/References";
const CIF = "https://static.igem.wiki/teams/6102/wiki/images/cif/";
const BASE = import.meta.env.BASE_URL;

export function Implementation() {
  return (
    <div className="row mt-4">
      <div className="col">
        <h2>Implementation</h2>
        <hr />
        <p>
          Building on the Design and proof-of-concept results, NEST aims to
          provide material formulations tailored to the repair requirements of
          different cartilage injuries. We have defined three application
          directions: focal defects following sports-related or traumatic
          injury, local lesions associated with osteoarthritis (OA), and
          osteochondral injuries. Programmable SELP and shared functional
          interfaces will support the different formulations, while
          biomanufacturing, a clinician-facing application, and a
          material-preparation device will connect material supply with
          professional use.
        </p>

        <h3 className="mt-5 mb-3">
          1 Developing Material Formulations for Three Cartilage-Injury Settings
        </h3>
        <h4 className="mt-4 mb-2">
          1.1 Focal Cartilage Defects Following Sports-Related or Traumatic
          Injury
        </h4>
        <p>
          This application will be the primary focus for the first product. For
          well-demarcated defects, we propose an acellular SELP material that
          can be delivered as a precursor, conform to the defect, and gel in
          situ to provide defect filling and local structural support. Scaffold
          specifications and crosslinking conditions will be selected according
          to load-bearing requirements. A CPC-containing GAG-retention
          formulation will be prioritized as a functional upgrade and evaluated
          alongside the baseline formulation. Orthopedic and sports-medicine
          professionals will contribute to defining the intended use and
          handling requirements.
        </p>
        <h4 className="mt-4 mb-2">
          1.2 Local Degenerative Lesions Associated with Osteoarthritis (OA)
        </h4>
        <p>
          Lesions characterized by matrix loss and altered cellular states may
          require the material to further modulate the local microenvironment.
          Our OA proof-of-concept work provides an experimental starting point
          for magnetic responsiveness, GAG retention, and stimuli-responsive
          delivery. Proposed products will combine functions according to the
          needs of the lesion: a CPC-containing formulation will address GAG
          retention, magnetic actuation will be developed for structural
          regulation, and MMP-13-responsive delivery will be integrated with
          local cellular support.
        </p>
        <h4 className="mt-4 mb-2">
          1.3 Osteochondral Injuries Involving the Subchondral Bone
        </h4>
        <p>
          For defects involving both cartilage and subchondral bone, we propose
          developing NEST as the cartilage layer of a stratified repair material
          in collaboration with a bone-repair materials team. SELP
          specifications and functional modules will address mechanical and
          matrix-related requirements on the cartilage side, while a separate
          bone-support layer will provide deeper structural support. Interlayer
          bonding and load transfer will jointly determine the performance of
          the composite. Existing approaches to osteochondral repair will inform
          the definition and evaluation of this application{" "}
          <sup className="article-citation">[1]</sup>.
        </p>
        <p>
          All three application directions share a common foundation for
          scaffold manufacturing and assembly, while each will have a
          standardized formulation with clearly defined composition, intended
          use, and evaluation criteria. The development team will generate
          material variants, and professional users will select products for
          intended uses supported by completed validation.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}5.avif`}
            alt="Proposed NEST implementation workflow."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <FigureCaption className="figure-caption">
            Figure 1 | Proposed NEST implementation workflow. Different
            application-specific formulations share manufacturing and
            use-support systems and will each undergo validation for their
            intended applications.
          </FigureCaption>
        </figure>

        <h3 className="mt-5 mb-3">
          2 Ensuring a Stable Material Supply through Biomanufacturing
        </h3>
        <p>
          NEST has employed <em>Escherichia coli</em> expression and inverse
          transition cycling (ITC) purification to produce SELP. ITC exploits
          the temperature- and salt-responsive behavior of the protein, enabling
          scaffold recovery through reversible aggregation, separation, and
          resolubilization. This non-chromatographic route reduces reliance on
          affinity resins for bulk scaffold recovery and provides a foundation
          for scale-up focused on heat transfer, mixing, and solid&ndash;liquid
          separation, making it an important component of the project&rsquo;s
          strategy for scalable biomanufacturing{" "}
          <sup className="article-citation">[2, 3]</sup>.
        </p>
        <p>
          The proposed supply system centers on centralized scaffold production,
          followed by concentration, desalting, lyophilization, and quantitative
          aliquoting. Ligases, functional proteins, and active payloads will be
          produced and quality-controlled separately according to their specific
          requirements. Materials delivered to hospitals will be accompanied by
          a defined formulation, batch information, and operating instructions.
          Reconstitution and storage conditions for the lyophilized scaffold, as
          well as the use period for each module, will be established through
          component-specific stability studies.
        </p>

        <h3 className="mt-5 mb-3">
          3 Connecting the Material to Clinician Workflows
        </h3>
        <p>
          We have developed an Android application for clinicians that organizes
          formulation selection and preparation guidance in an actionable
          interface. The app provides selection screens for the scaffold and
          functional modules and loads the corresponding instructions via QR
          code. It guides the user through scanning, reviewing instructions,
          verifying components, and premixing. On the dispensing interface, PBS,
          SELP, Ru/SPS, and functional components are confirmed step by step;
          the next step is enabled only after all components have been verified,
          helping operators confirm the current formulation.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src="https://static.igem.wiki/teams/6102/wiki/images/software/005.avif"
            alt="Four-step workflow in the publicly available app interface."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <FigureCaption className="figure-caption">
            Figure 2 | Four-step workflow in the publicly available app
            interface. Formulation information is loaded after QR-code scanning,
            and users proceed to premixing instructions after verifying each
            reagent.
          </FigureCaption>
        </figure>
        <p>
          The app provides a standardized verification workflow for different
          material formulations, the accompanying device handles material
          processing, and the device web interface displays operating status.
          Together, these three elements support clinician-led preparation by
          translating formulation information into component loading and
          practical operating steps.
        </p>
        <p>
          The application source code and engineering documentation are
          available in the{" "}
          <a href="https://gitlab.igem.org/2026/zju-china">GitLab repository</a>
          .
        </p>

        <h3 className="mt-5 mb-3">
          4 Translating Formulation Requirements into a Monitored Preparation
          Device
        </h3>
        <p>
          We have built a modular, tiered material-preparation unit that
          integrates metering, mixing, storage, and delivery. Three independent
          motors in the lower module drive PBS solutions containing Ru/SPS,
          SELP, and functional components through separate channels before they
          converge in a serpentine microfluidic channel. The upper reservoir
          module integrates heating and cooling, liquid-level sensing, status
          indicators, and a delivery pump. Independent channels allow component
          ratios to be adjusted, while replaceable tubing and a transparent
          enclosure facilitate loading, monitoring, and maintenance{" "}
          <sup className="article-citation">[4]</sup>.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}6.avif`}
            alt="The material-preparation unit."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <img
            src={`${CIF}7.avif`}
            alt="The microfluidic mixing-chip structure."
            className="figure-img img-fluid rounded mt-3"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <FigureCaption className="figure-caption">
            Figure 3 | The upper image shows the material-preparation unit, and
            the lower image shows the microfluidic mixing-chip structure. The
            three component streams converge in the microchannels before
            proceeding to storage and delivery.
          </FigureCaption>
        </figure>
        <p>
          The device is also connected to a web interface. The STM32 controls
          the pumps, temperature regulation, liquid-level sensing, and panel
          interactions, and communicates with the ESP32 via UART. The ESP32
          transmits device status to the web interface and relays user commands.
          Users can monitor temperature, liquid level, and pump status,
          configure relevant parameters, and issue delivery commands. The web
          interface consolidates these readouts into a shared reservoir view,
          enabling the material-handling process to be monitored and controlled{" "}
          <sup className="article-citation">[4]</sup>.
        </p>
        <p>
          The clinician-facing app and device web interface serve distinct
          purposes: the app supports material selection, component verification,
          and adherence to preparation steps, whereas the web interface supports
          monitoring and operation of the device. On the administration side, a
          three-way valve switches between replenishment and injection pathways
          and interfaces with a separate injection assembly. From formulation
          selection and loading through premixing, temporary storage, and
          output, we have established an integrated operational prototype that
          can be demonstrated and subjected to further testing.
        </p>
        <p>
          Details of the device structure, electronics, and bill of materials
          are available on the <a href={`${BASE}hardware`}>Hardware page</a>.
          Further iterations will address line priming and air removal, ease of
          loading, temperature feedback, and delivery stability, as well as
          operational integration of the optical and external-field components.
        </p>

        <h3 className="mt-5 mb-3">
          5 Defining Product Requirements under Intended Use Conditions
        </h3>
        <p>
          In the proposed localized application workflow, after assessing and
          preparing the defect, the clinician delivers the precursor to the
          target site, controls its distribution, and induces in situ gelation
          under specified illumination conditions. The material will then be
          evaluated for fixation at the hydrated interface, retention under
          motion-related loading, and tissue responses in the repair region. The
          material, device, and instructions will be validated together around
          this workflow.
        </p>
        <TableCaption>
          <strong>
            Table 1 | Product Requirements and Validation Criteria for NEST
          </strong>
        </TableCaption>
        <div className="table-responsive mb-4">
          <table
            className="table table-bordered align-middle"
            aria-label="Use requirements, product-development focus, and validation criteria"
          >
            <thead className="table-primary">
              <tr>
                <th scope="col">Use requirement</th>
                <th scope="col">Product-development focus for NEST</th>
                <th scope="col">Validation and delivery criteria</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fixation and loading under wet conditions</td>
                <td>
                  Conformity to the cartilage interface and resistance to
                  repeated joint loading
                </td>
                <td>
                  Interfacial bonding, retention after cyclic loading, and
                  mechanical-property retention
                </td>
              </tr>
              <tr>
                <td>In situ photocrosslinking</td>
                <td>
                  Compatibility with the light source, irradiation conditions,
                  and Ru/SPS formulation; suitability for professional use
                </td>
                <td>
                  Gelation uniformity, accessibility of the target site to
                  light, and local tissue response
                </td>
              </tr>
              <tr>
                <td>Protein and formulation quality</td>
                <td>
                  Control of identity, purity, endotoxin, residual impurities,
                  and microbial risk
                </td>
                <td>
                  Batch-release criteria, stability, and consistency of gelation
                  performance
                </td>
              </tr>
              <tr>
                <td>Module storage and assembly</td>
                <td>
                  Storage conditions appropriate to the activity of functional
                  proteins and mitochondrial payloads
                </td>
                <td>
                  Storage and transport, reconstitution, post-assembly activity,
                  and allowable use period
                </td>
              </tr>
              <tr>
                <td>Practical use in hospitals</td>
                <td>
                  Clear requirements for equipment, consumables, operating time,
                  and training
                </td>
                <td>
                  Simulated use by professional users, step errors, and analysis
                  of cost components
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Existing in vitro cell-viability results support further development
          of the material. Subsequent biological evaluation will be designed
          according to the final material composition, mode of tissue contact,
          and contact duration, and will systematically investigate local
          responses, degradation products, and relevant systemic effects{" "}
          <sup className="article-citation">[5]</sup>. Product classification
          and the regulatory pathway will likewise be determined based on the
          final components, primary mode of action, and intended markets, with
          regulatory consultation initiated early in development{" "}
          <sup className="article-citation">[6]</sup>.
        </p>

        <h3 className="mt-5 mb-3">
          6 Sharing a Common Manufacturing and Delivery Foundation across
          Applications
        </h3>
        <p>
          The focal-defect product will establish the first set of material
          specifications and use procedures; OA-oriented functional formulations
          will further develop matrix retention and local delivery; and
          collaboration on osteochondral repair will advance stratified
          materials. These product directions can build on established scaffold
          production, interface testing, and material-preparation support, with
          additional evaluations tailored to each tissue-repair task. This
          allows each development cycle to generate reusable knowledge for the
          next version.
        </p>
        <p>
          This implementation roadmap provides an actionable starting point for
          the envisioned applications of NEST. Scalable scaffold manufacturing
          supports material supply, standardized formulations address clearly
          defined repair needs, and the app and preparation device help
          clinicians prepare the material. As tissue validation and
          manufacturing procedures for the first formulation are established,
          the platform&rsquo;s programmability can be translated into material
          products that can be developed and delivered on a continuing basis.
        </p>

        <References level={2}>
          <div className="references-list references-list--paragraphs">
            <p>
              [1] American Academy of Orthopaedic Surgeons (AAOS). Articular
              Cartilage Restoration. OrthoInfo.{" "}
              <a href="https://orthoinfo.aaos.org/en/treatment/articular-cartilage-restoration/">
                Source
              </a>
            </p>
            <p>
              [2] Meyer DE, Chilkoti A. Purification of recombinant proteins by
              fusion with thermally-responsive polypeptides.{" "}
              <em>Nature Biotechnology</em>. 1999;17:1112&ndash;1115.{" "}
              <a href="https://doi.org/10.1038/70265">Source</a>
            </p>
            <p>
              [3] Hassouneh W, Christensen T, Chilkoti A. Elastin-like
              polypeptides as a purification tag for recombinant proteins.{" "}
              <em>Current Protocols in Protein Science</em>.
              2010;61:6.11.1&ndash;16.{" "}
              <a href="https://doi.org/10.1002/0471140864.ps0611s61">Source</a>
            </p>
            <p>
              [4] ZJU-China. NEST Hardware project records and accompanying
              clinician-facing application.{" "}
              <a href={`${BASE}hardware`}>Source</a>
            </p>
            <p>
              [5] U.S. Food and Drug Administration (FDA). Biocompatibility
              Evaluation Endpoints by Contact Duration Periods.{" "}
              <a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/use-international-standard-iso-10993-1-biological-evaluation-medical-devices-part-1-evaluation-and">
                Source
              </a>
            </p>
            <p>
              [6] National Medical Products Administration (NMPA) Government
              Service Portal. Product Classification of Drug&ndash;Device
              Combination Products.{" "}
              <a href="https://english.nmpa.gov.cn/">Source</a>
            </p>
          </div>
        </References>
      </div>
    </div>
  );
}
