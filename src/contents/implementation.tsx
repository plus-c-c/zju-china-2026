import { TableCaption } from "../components/FigureCaption";
import { FigureCaption } from "../components/FigureCaption";
import { References } from "../components/References";
const CIF = "https://static.igem.wiki/teams/6102/wiki/images/cif/";
const BASE = import.meta.env.BASE_URL;

export function Implementation() {
  return (
    <div className="row mt-4">
      <div className="col">
        <p>
          We want NEST to take shape at a cartilage defect, filling the damaged
          area and forming a scaffold that stays in place as the joint moves.
          The practical work starts before delivery, with consistent protein
          production, controlled mixing, and clear instructions for clinicians.
          We are developing formulations for focal cartilage defects, local
          lesions associated with osteoarthritis (OA), and osteochondral
          injuries. These applications can use the same SELP scaffold and
          assembly method, while each needs its own formulation and tests.
          Alongside the material work, we have built an app for clinicians and a
          device for preparing the material.
        </p>

        <h2 className="mt-5 mb-3">
          1 Developing Material Formulations for Three Cartilage-Injury Settings
        </h2>
        <h3 className="mt-4 mb-2">
          1.1 Focal Cartilage Defects Following Sports-Related or Traumatic
          Injury
        </h3>
        <p>
          We plan to begin with well-demarcated knee-cartilage defects following
          sports injuries or trauma. Our proposed minimum viable product (MVP)
          is the acellular SELP&ndash;SnoopTag2 hydrogel. SELP forms the
          scaffold, while SnoopTag2 provides an interface for attaching
          functional peptides. The precursor is designed to fill the defect, gel
          in place, and provide local structural support. We will select
          scaffold specifications and crosslinking conditions for the expected
          loads, and compare this baseline with a CPC-containing formulation for
          GAG retention. A functional module would enter the lead formulation
          only if its benefit justifies the added manufacturing and testing
          work. Orthopedic and sports-medicine professionals will help define
          which defects the product is intended for and how it should be
          handled.
        </p>
        <h3 className="mt-4 mb-2">
          1.2 Local Degenerative Lesions Associated with Osteoarthritis (OA)
        </h3>
        <p>
          Local OA lesions may also require us to address matrix loss and
          altered cellular states. For this application, we plan to develop the
          modules explored in our OA proof of concept: CPC for GAG retention,
          magnetic actuation to regulate material structure, and
          MMP-13-responsive delivery of therapeutic cargo. We will choose and
          test combinations according to the needs of the lesion.
        </p>
        <h3 className="mt-4 mb-2">
          1.3 Osteochondral Injuries Involving the Subchondral Bone
        </h3>
        <p>
          Injuries that extend into subchondral bone require attention to both
          the cartilage and bone portions of the defect{" "}
          <sup className="article-citation">[1]</sup>. We propose working with a
          bone-repair materials team to use NEST as the cartilage layer of a
          layered repair material. We would adjust the SELP scaffold and
          functional modules for the cartilage side and pair them with a
          separate bone-support layer. Testing would need to establish how the
          two layers bond and transfer load.
        </p>
        <p>
          All three applications will use the same scaffold production and
          assembly methods. For each formulation, we will specify the
          composition, preparation steps, intended use, and validation
          requirements. Following validation and the necessary authorizations,
          clinicians would select a product based on its intended use and test
          results.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src={`${CIF}5.avif`}
            alt="Planned NEST production and preparation workflow."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <FigureCaption className="figure-caption">
            Figure 1 | Planned NEST production and preparation workflow. The
            three applications share scaffold production and preparation
            systems. Each formulation will be tested for its intended use.
          </FigureCaption>
        </figure>

        <h2 className="mt-5 mb-3">
          2 Ensuring a Stable Material Supply through Biomanufacturing
        </h2>
        <p>
          We have produced SELP in <em>Escherichia coli</em> and purified it by
          inverse transition cycling (ITC). Changes in temperature and salt
          conditions cause the protein to aggregate reversibly, allowing us to
          separate it and dissolve it again. For bulk scaffold recovery, this
          reduces our reliance on affinity resins{" "}
          <sup className="article-citation">[2, 3]</sup>. For larger batches, we
          will need to establish suitable heat transfer, mixing, and
          solid&ndash;liquid separation conditions.
        </p>
        <p>
          We plan to produce the scaffold centrally, then concentrate, desalt,
          freeze-dry, and dispense it in measured amounts. Ligases, functional
          proteins, and active payloads will be produced and checked separately.
          Early pilot batches could be made with a qualified development and
          manufacturing partner. Investment in dedicated production capacity
          would follow process validation and evidence of demand. Materials
          supplied to hospitals will include formulation details, batch
          information, and preparation instructions. Stability testing will
          determine storage and reconstitution conditions for the freeze-dried
          scaffold and how long each module can be used.
        </p>

        <h2 className="mt-5 mb-3">
          3 Connecting the Material to Clinician Workflows
        </h2>
        <p>
          The supplied components still need to be checked and combined before
          use. We built an app for clinicians to select the scaffold and
          functional modules and follow the preparation instructions. Its
          four-step guide covers scanning a QR code, reading the
          formulation-specific instructions, adding the reagents, and premixing.
          Users confirm PBS, SELP, Ru/SPS, and the functional components in
          sequence. The app only allows them to continue once every component
          has been checked.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src="https://static.igem.wiki/teams/6102/wiki/images/software/005.avif"
            alt="The four-step preparation guide in the app."
            className="figure-img img-fluid rounded"
            style={{ width: "100%" }}
            loading="lazy"
            decoding="async"
          />
          <FigureCaption className="figure-caption">
            Figure 2 | The app&rsquo;s preparation guide: scan the QR code, read
            the instructions, add and confirm each reagent, and proceed to the
            premixing instructions.
          </FigureCaption>
        </figure>
        <p>
          At the last step, the app tells the operator to wait for the
          premixer&rsquo;s green light. The app does not read device status;
          monitoring and control are handled through the separate device web
          interface.
        </p>
        <p>
          The application source code and documentation are available in the{" "}
          <a href="https://gitlab.igem.org/2026/software/zju-china/nest/-/tree/main/NEST-Software">
            NEST Software repository
          </a>
          .
        </p>

        <h2 className="mt-5 mb-3">
          4 Translating Formulation Requirements into a Monitored Preparation
          Device
        </h2>
        <p>
          We built the accompanying preparation unit to meter, mix, store, and
          deliver the material. In its lower module, three motors drive separate
          PBS-based solutions containing Ru/SPS, SELP, and functional
          components. The three streams meet in a serpentine microfluidic
          channel. The upper module stores the mixture and includes heating and
          cooling, liquid-level sensing, status indicators, and a delivery pump.
          Separate channels let us adjust the component ratios. Replaceable
          tubing and a transparent enclosure make the unit easier to load,
          inspect, and maintain <sup className="article-citation">[4]</sup>.
        </p>
        <figure className="figure d-block my-4 text-center">
          <div className="row g-3 align-items-center">
            <div className="col-6">
              <img
                src={`${CIF}6.avif`}
                alt="The material-preparation unit."
                className="figure-img img-fluid rounded"
                style={{ width: "100%" }}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="col-6">
              <img
                src={`${CIF}7.avif`}
                alt="The microfluidic mixing-chip structure."
                className="figure-img img-fluid rounded"
                style={{ width: "100%" }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <FigureCaption className="figure-caption">
            Figure 3 | Material-preparation unit (left) and microfluidic mixing
            chip (right). The three component streams meet in the microchannels,
            and the mixture then enters the reservoir for storage and delivery.
          </FigureCaption>
        </figure>
        <p>
          An STM32 controls the pumps, temperature regulation, liquid-level
          sensing, and panel controls. It communicates with an ESP32 over UART.
          The ESP32 sends device readings to the web interface and passes
          commands back to the STM32. On the web interface, operators can check
          temperature, liquid level, and pump status, adjust parameters, and
          issue delivery commands <sup className="article-citation">[4]</sup>.
        </p>
        <p>
          A three-way valve switches between replenishing the reservoir and
          delivering material through a separate injection assembly. The current
          prototype brings together component loading, premixing, temporary
          storage, and delivery. Further testing will cover line priming, air
          removal, ease of loading, temperature feedback, and delivery
          stability. We also plan to integrate the optical and external-field
          components into the operating workflow.
        </p>
        <p>
          The device structure, electronics, and bill of materials are described
          on our <a href={`${BASE}hardware`}>Hardware page</a>.
        </p>

        <h2 className="mt-5 mb-3">
          5 Defining Product Requirements under Intended Use Conditions
        </h2>
        <p>
          In the proposed procedure, the clinician assesses and prepares the
          defect, delivers the precursor, controls its distribution, and induces
          gelation under defined illumination conditions. We need to test how
          well the material adheres to a wet cartilage surface, whether it
          remains in place under repeated loading, and how the surrounding
          tissue responds. Testing will also need to cover the device and
          instructions used in this procedure. Table 1 lists the main
          requirements and planned checks.
        </p>
        <TableCaption>
          <strong>Table 1 | Product Requirements and Planned Tests</strong>
        </TableCaption>
        <div className="table-responsive mb-4">
          <table
            className="table table-bordered align-middle"
            aria-label="Use requirements, design considerations, and planned tests"
          >
            <thead className="table-primary">
              <tr>
                <th scope="col">Use requirement</th>
                <th scope="col">Design considerations</th>
                <th scope="col">What we will test</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fixation and loading under wet conditions</td>
                <td>
                  Contact with the cartilage surface and retention during
                  repeated joint loading
                </td>
                <td>
                  Interfacial bonding, material retention after cyclic loading,
                  and retention of mechanical properties
                </td>
              </tr>
              <tr>
                <td>In situ photocrosslinking</td>
                <td>
                  Light source, exposure conditions, Ru/SPS formulation, and
                  suitability for use by clinical staff
                </td>
                <td>
                  Gelation uniformity, whether light can reach the target site,
                  and local tissue response
                </td>
              </tr>
              <tr>
                <td>Protein and formulation quality</td>
                <td>
                  Protein identity and purity; endotoxin, residual impurities,
                  and microbial contamination
                </td>
                <td>
                  Batch-release checks, storage stability, and consistency of
                  gelation across batches
                </td>
              </tr>
              <tr>
                <td>Module storage and assembly</td>
                <td>
                  Storage conditions that preserve functional proteins and
                  mitochondrial payloads
                </td>
                <td>
                  Activity after storage, transport, reconstitution, and
                  assembly; time available for use
                </td>
              </tr>
              <tr>
                <td>Use in hospitals</td>
                <td>
                  Equipment, consumables, preparation time, and staff training
                </td>
                <td>
                  Simulated use by professional users, errors at each step, and
                  a breakdown of costs
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          We have completed <em>in vitro</em> cell-viability tests. Further biological
          evaluation will depend on the final formulation and the type and
          duration of tissue contact. It will need to examine local tissue
          responses, degradation products, and relevant systemic effects{" "}
          <sup className="article-citation">[5]</sup>.
        </p>
        <p>
          Product classification and the regulatory pathway will depend on the
          final components, primary mode of action, and intended market. We plan
          to seek regulatory advice early in development{" "}
          <sup className="article-citation">[6]</sup>.
        </p>

        <h2 className="mt-5 mb-3">
          6 Sharing a Common Manufacturing and Delivery Foundation across
          Applications
        </h2>
        <p>
          We will use the same scaffold-production and assembly methods where
          possible, and test tissue response and retention for each formulation.
          OA formulations will require additional tests of their functional
          modules. Osteochondral repair will also require a collaborator for the
          bone-support layer and separate testing of the layered material.
        </p>
        <p>
          The phased B2B model on our{" "}
          <a
            href={`${BASE}entrepreneurship#the-sustainable-business-model-canvas`}
          >
            Entrepreneurship page
          </a>{" "}
          starts with research partnerships, co-development, and
          technology-development licensing. We would work with orthopedic
          companies and research hospitals during development. Clinical supply
          of the implant material and associated preparation and delivery
          solutions would follow the required studies and authorizations,
          through procurement by hospitals and industry partners.
        </p>
        <p>
          For each application, we will test the material alongside the process
          used to prepare and deliver it. The app and device will be refined
          with clinicians, while production partners help us establish
          consistent batches. These results will determine which formulations
          move forward and which components or steps still need work.
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
