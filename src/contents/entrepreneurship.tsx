import { useId, useState, type ReactNode } from "react";
import { MathFormula } from "../components/MathFormula";
import { References } from "../components/References";
import "./entrepreneurship.css";

type CardLevel = "primary" | "secondary";

/** Expandable card; secondary cards can be nested inside a primary card. */
export function ExtendCard({
  title,
  children,
  level = "primary",
}: {
  title: ReactNode;
  children: ReactNode;
  level?: CardLevel;
}) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <div
      className={`entre-card entre-card--${level}${open ? " entre-card--open" : ""}`}
    >
      <button
        type="button"
        className="entre-card-header"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="entre-card-title">{title}</span>
        <span className="entre-card-chevron" aria-hidden="true" />
      </button>
      <div className="entre-card-content" id={contentId}>
        <div className="entre-card-content-inner">
          <div className="entre-card-pad">{children}</div>
        </div>
      </div>
    </div>
  );
}

/** Figures live on the team static host (see static/README.md). */
const ENTRE_FIG =
  "https://static.igem.wiki/teams/6102/wiki/images/entrepreneurship";

/* Market screening: size × 2, potential × 1, accessibility × 4. */
const SPA_ROWS = [
  {
    region: "East Asia",
    size: "167.31",
    sizeScore: 10,
    potential: "581.68",
    potentialScore: 10,
    access: 7,
    weighted: "8.29",
  },
  {
    region: "Europe",
    size: "103.83",
    sizeScore: 6,
    potential: "360.96",
    potentialScore: 6,
    access: 3,
    weighted: "4.29",
  },
  {
    region: "High-income Asia Pacific",
    size: "35.08",
    sizeScore: 2,
    potential: "121.97",
    potentialScore: 2,
    access: 5,
    weighted: "3.71",
  },
  {
    region: "High-income North America",
    size: "51.63",
    sizeScore: 3,
    potential: "179.50",
    potentialScore: 3,
    access: 2,
    weighted: "2.43",
  },
  {
    region: "Latin America and the Caribbean",
    size: "56.57",
    sizeScore: 3,
    potential: "196.66",
    potentialScore: 3,
    access: 1,
    weighted: "1.86",
  },
  {
    region: "Middle East and North Africa",
    size: "66.85",
    sizeScore: 4,
    potential: "232.40",
    potentialScore: 4,
    access: 2,
    weighted: "2.86",
  },
  {
    region: "South Asia",
    size: "100.92",
    sizeScore: 6,
    potential: "350.87",
    potentialScore: 6,
    access: 4,
    weighted: "4.86",
  },
  {
    region: "Southeast Asia",
    size: "42.02",
    sizeScore: 3,
    potential: "146.08",
    potentialScore: 3,
    access: 6,
    weighted: "4.71",
  },
];

const INVESTMENT_ROWS: {
  item: string;
  basis: string;
  cny: string;
  usd: string;
  eur: string;
  total?: boolean;
}[] = [
  { item: "Major equipment (MEC)", basis: "Purchased equipment", cny: "7,450.00", usd: "1,114.94", eur: "991.60" },
  { item: "Unlisted equipment", basis: "10% of MEC", cny: "745.00", usd: "111.49", eur: "99.16" },
  { item: "Purchase costs (PC) total", basis: "", cny: "8,195.00", usd: "1,226.43", eur: "1,090.76", total: true },
  { item: "Installation", basis: "39% of PC", cny: "3,196.05", usd: "478.31", eur: "425.40" },
  { item: "Piping and insulation", basis: "31% of PC", cny: "2,540.45", usd: "380.19", eur: "338.14" },
  { item: "Electrical", basis: "10% of PC", cny: "819.50", usd: "122.64", eur: "109.08" },
  { item: "Control system", basis: "26% of PC", cny: "2,130.70", usd: "318.87", eur: "283.60" },
  { item: "Building", basis: "29% of PC", cny: "2,376.55", usd: "355.66", eur: "316.32" },
  { item: "Land improvement", basis: "12% of PC", cny: "983.40", usd: "147.17", eur: "130.89" },
  { item: "Auxiliary facilities", basis: "10% of PC", cny: "819.50", usd: "122.64", eur: "109.08" },
  { item: "Direct costs (DC) total", basis: "", cny: "12,866.15", usd: "1,925.49", eur: "1,712.49", total: true },
  { item: "Subtotal (PC + DC)", basis: "", cny: "21,061.15", usd: "3,151.92", eur: "2,803.26", total: true },
  { item: "Engineering", basis: "13% of PC + DC", cny: "2,737.95", usd: "409.75", eur: "364.42" },
  { item: "Construction management", basis: "10% of PC + DC", cny: "2,106.12", usd: "315.19", eur: "280.33" },
  { item: "Contingency", basis: "40% of PC + DC", cny: "8,424.46", usd: "1,260.77", eur: "1,121.30" },
  { item: "Contractor's fee", basis: "70% of PC + DC", cny: "14,742.81", usd: "2,206.35", eur: "1,962.28" },
  { item: "Indirect costs (IC) total", basis: "", cny: "28,011.33", usd: "4,192.06", eur: "3,728.33", total: true },
  { item: "Start-up and validation", basis: "10% of DC", cny: "1,286.62", usd: "192.55", eur: "171.25" },
  { item: "Other costs (OC) total", basis: "", cny: "1,286.62", usd: "192.55", eur: "171.25", total: true },
  { item: "Fixed capital investment (FCI)", basis: "PC + DC + IC + OC", cny: "50,359.09", usd: "7,536.53", eur: "6,702.84", total: true },
  { item: "Land", basis: "6% of PC", cny: "491.70", usd: "73.59", eur: "65.45" },
  { item: "Working capital", basis: "1.5 × VOC", cny: "7,197.74", usd: "1,071.09", eur: "959.70" },
  { item: "Total capital investment (TCI)", basis: "FCI + land + working capital", cny: "58,048.53", usd: "8,681.21", eur: "7,727.98", total: true },
];

const OPEX_ROWS: {
  item: string;
  basis: string;
  cny: string;
  usd: string;
  eur: string;
  total?: boolean;
}[] = [
  { item: "Raw materials", basis: "Media, reagents, syringe hardware", cny: "869.20", usd: "129.35", eur: "115.89" },
  { item: "Electricity", basis: "500,000 kWh × ¥0.8", cny: "400.00", usd: "59.52", eur: "53.33" },
  { item: "Water", basis: "1,500 m³ × ¥4.7", cny: "7.05", usd: "1.05", eur: "0.94" },
  { item: "Compressed air", basis: "60,000 m³ × ¥0.2", cny: "12.00", usd: "1.79", eur: "1.60" },
  { item: "Steam", basis: "32 t × ¥366", cny: "11.71", usd: "1.74", eur: "1.56" },
  { item: "Direct labour", basis: "Production, cleaning and sales staff", cny: "2,660.30", usd: "395.88", eur: "354.71" },
  { item: "Consumables", basis: "Filters, single-use lines, gloves", cny: "339.20", usd: "50.48", eur: "45.23" },
  { item: "Waste treatment and disposal", basis: "50,000 kg × ¥2.4", cny: "120.00", usd: "17.86", eur: "16.00" },
  { item: "Transportation and logistics", basis: "2,489,000 carton·km × ¥0.088", cny: "219.03", usd: "32.59", eur: "29.20" },
  { item: "Quality control", basis: "32 batches × ¥5,000", cny: "160.00", usd: "23.81", eur: "21.33" },
  { item: "Royalties", basis: "No out-licensing planned", cny: "0.00", usd: "0.00", eur: "0.00" },
  { item: "Variable operating costs (VOC) total", basis: "", cny: "4,798.49", usd: "714.06", eur: "639.80", total: true },
  { item: "Research and development", basis: "0.5% of SOM", cny: "1,840.00", usd: "273.81", eur: "245.33" },
  { item: "Marketing", basis: "0.5% of SOM", cny: "1,840.00", usd: "273.81", eur: "245.33" },
  { item: "Maintenance", basis: "5% of VOC", cny: "224.71", usd: "33.44", eur: "29.96" },
  { item: "Insurance", basis: "0.5% of SOM", cny: "1,840.00", usd: "273.81", eur: "245.33" },
  { item: "Fixed operating costs (FOC) total", basis: "", cny: "5,744.71", usd: "854.87", eur: "765.96", total: true },
  { item: "Annual OPEX total", basis: "VOC + FOC", cny: "10,543.20", usd: "1,568.93", eur: "1,405.76", total: true },
];

const CAPEX_ROWS = [
  { item: "Maintenance capital expenditure", basis: "0.2% of SOM", cny: "736.00", usd: "109.52", eur: "98.13" },
  { item: "Replacement capital expenditure", basis: "0.2% of SOM", cny: "736.00", usd: "109.52", eur: "98.13" },
  { item: "Expansion capital expenditure", basis: "0.2% of SOM", cny: "736.00", usd: "109.52", eur: "98.13" },
];

const PROFIT_ROWS = [
  { item: "Gross profit", basis: "SOM − VOC − FOC", cny: "357,456.80", usd: "53,531.07", eur: "47,554.24" },
  { item: "Interest", basis: "Assumed zero", cny: "—", usd: "—", eur: "—" },
  { item: "Depreciation", basis: "FCI and CAPEX over 10 years", cny: "5,256.71", usd: "786.51", eur: "699.72" },
  { item: "Taxes", basis: "15% × (gross profit − depreciation)", cny: "52,830.01", usd: "7,911.68", eur: "7,028.18" },
  { item: "Net profit", basis: "Gross profit − interest − depreciation − taxes", cny: "299,370.08", usd: "44,832.88", eur: "39,826.34" },
];

const COMPETITORS_DOMESTIC = [
  {
    company: "Sichuan Baiameng Bioactive Materials Co., Ltd. (China)",
    product: "Cartilage-inducing collagen hydrogel / collagen-based cartilage repair matrix",
    route: "Direct biomaterial competitor",
    progress:
      "Develops tissue-inducing biomaterials, including collagen hydrogels for cartilage repair. Public information reports progress under the 2021 special review pathway for innovative medical devices, but the product is not yet approved and remains in the special approval process.",
    meaning:
      "The closest domestic biomaterial comparator. NEST must demonstrate the value of a programmable scaffold and a controllable interface.",
  },
  {
    company: "Shanghai Ruanxin Biotechnology Co., Ltd. (China)",
    product: "Tissue-engineered living cartilage",
    route: "Alternative regenerative route",
    progress:
      "Through an autologous tissue-engineering platform linked to the National Engineering Research Center for Tissue Engineering, develops living cartilage and bone tissue. Public materials describe the platform and cartilage projects, but no marketing approval has been granted.",
    meaning:
      "Competes through biological tissue reconstruction. NEST's first candidate follows a standardized material route, and its clinical value still has to be established.",
  },
  {
    company: "Haohai Biotechnology (China)",
    product: "Intra-articular sodium hyaluronate and medical chitosan products",
    route: "Indirect therapeutic competitor",
    progress:
      "Has an established orthopaedic business and provides intra-articular viscosupplementation products familiar in osteoarthritis care. The company reports a marketed orthopaedic portfolio.",
    meaning:
      "Competes for the treatment budget and clinical attention. Symptom management and focal defect repair serve different goals and patient populations.",
  },
  {
    company: "Shanghai Funing Technology Co., Ltd. (China)",
    product: "Thermogel injectable hydrogel platform",
    route: "Potential platform entrant",
    progress:
      "Spun out of Fudan University and develops thermosensitive PLGA-PEG materials for delivery and tissue applications. Fudan materials describe the injectable platform, but no approved cartilage repair product has been demonstrated.",
    meaning:
      "Adjacent formulation capability could support a future market entry or a partnership. Track indication-specific progress rather than treating it as a current direct competitor.",
  },
];

const COMPETITORS_INTERNATIONAL = [
  {
    company: "Regentis Biomaterials (Israel)",
    product: "GelrinC",
    route: "Direct hydrogel competitor",
    progress:
      "An acellular PEG-DA / denatured fibrinogen implant delivered as a liquid and crosslinked in situ with UVA light for focal cartilage defects. The company reports a European CE mark and preparations for commercialization; materials indicate it remains investigational in the United States.",
    meaning:
      "The closest in-situ photocuring comparator. NEST must show whether sequence programming and modular assembly improve clinically meaningful performance.",
  },
  {
    company: "meidrix biomedicals (Germany)",
    product: "ChondroFiller liquid",
    route: "Direct hydrogel competitor",
    progress:
      "An acellular type I collagen matrix supplied in a dual-chamber syringe and designed to gel inside the cartilage defect. The manufacturer reports CE certification and marketing since 2013.",
    meaning:
      "A practical benchmark for handling, defect conformity and ready-to-use supply. NEST's additional hardware must prove its necessity in the clinical workflow.",
  },
  {
    company: "Smith+Nephew / CartiHeal (United Kingdom; technology from Israel)",
    product: "AGILI-C",
    route: "Direct repair implant competitor",
    progress:
      "A porous, resorbable aragonite-based scaffold for knee chondral and osteochondral defects, implanted in a single surgery. It is FDA-approved and commercially available in the United States; the indicated population excludes patients with severe osteoarthritis.",
    meaning:
      "An established repair implant benchmark. Beyond material novelty, NEST must provide evidence of tissue integration, durability and patient benefit.",
  },
  {
    company: "Vericel (United States)",
    product: "MACI",
    route: "Alternative regenerative route",
    progress:
      "Autologous expanded chondrocytes seeded on a porcine collagen membrane for symptomatic full-thickness knee cartilage defects in adults. It is FDA-approved for its indication, and severe knee osteoarthritis is a contraindication.",
    meaning:
      "A mature cell-therapy comparator with a different manufacturing and clinical workflow. Without comparative evidence, NEST cannot claim equivalent regeneration.",
  },
  {
    company: "Geistlich Pharma (Switzerland)",
    product: "Chondro-Gide / AMIC",
    route: "Direct scaffold competitor",
    progress:
      "A bilayer collagen membrane for cartilage repair that can be combined with marrow-stimulation techniques. Manufacturer and intended-use materials describe this marketed membrane.",
    meaning:
      "Competes as a scaffold repair option. NEST's injectable form and functional modules must demonstrate additional clinical benefit and acceptable surgical cost.",
  },
];

const TIMELINE_ROWS = [
  {
    phase: "Define (2026–2027)",
    work: "Consolidate the evidence gathered during iGEM and separate validated results from design goals. Define the focal-defect application, candidate formulation and delivery workflow together with potential users. Check IP ownership and prior disclosures, and start regulatory communication.",
    gate: "A written target product profile, reproducible proof-of-concept results and a justified lead-candidate decision.",
    resources: "Core technical team, clinical advisors, technology-transfer support and early development funding.",
  },
  {
    phase: "De-risk (2027–2029)",
    work: "Compare the base scaffold with selected modules; optimize the manufacturing process and establish analytical specifications. Evaluate biological and mechanical performance, the user workflow and preliminary unit economics.",
    gate: "A fixed candidate with predefined performance targets, a credible safety-evaluation plan and a feasible manufacturing route.",
    resources: "Materials and assay expertise, a development manufacturing partner, testing partners and seed funding.",
  },
  {
    phase: "Prepare (2029–2031)",
    work: "Complete the required non-clinical studies, stability work, sterile production and device evidence for the chosen pathway. Establish the quality system and prepare clinical study documents with the appropriate clinical centres.",
    gate: "Sufficient quality and safety evidence, funding and all necessary approvals before human studies begin.",
    resources: "Quality and regulatory lead, qualified manufacturer, non-clinical study organisation and clinical partners.",
  },
  {
    phase: "Evaluate (2031–2035)",
    work: "Run feasibility and, where appropriate, confirmatory studies along the defined pathway. Assess function, pain, structural repair, safety and durability together with usability and health economics.",
    gate: "Clinical evidence meets the predefined targets and manufacturing meets registration and supply requirements.",
    resources: "Study sponsor, investigators, monitoring and data teams, manufacturing capacity and clinical-stage funding.",
  },
  {
    phase: "Review (2035–2037)",
    work: "Submit the relevant registration dossier, respond to review questions and prepare controlled supply, training, procurement and post-market follow-up. Patient-facing commercial use begins only after the applicable approval.",
    gate: "The necessary approvals, together with reliable release testing, supply capacity, trained users and a viable procurement path.",
    resources: "Regulatory and quality team, commercial partners, first specialty centres and launch funding.",
  },
  {
    phase: "Expand (2037–2042)",
    work: "If approved, expand capacity and the network of partner centres while tracking long-term outcomes. Evaluate new indications, regions and advanced formulations as separate development decisions.",
    gate: "Sustained safety, clinical performance, supply reliability and unit economics sufficient to support expansion.",
    resources: "Operations and clinical follow-up teams, qualified supply partners and reinvestment or growth capital.",
  },
];

const RISK_ROWS = [
  {
    id: "R1",
    stage: "Experimental validation",
    level: "Critical",
    risk: "Even if the hydrogel gels successfully, it may not withstand repeated loading, may detach from the cartilage surface, or may degrade before functional tissue forms. Short-term material performance cannot prove durable cartilage regeneration.",
    action: "In relevant models, compare material retention, wet-interface integration, fatigue performance, degradation and repair quality against explicit controls. Proceed only after predefined performance and safety criteria are met; otherwise adjust the scaffold or the intended indication.",
  },
  {
    id: "R2",
    stage: "Module integration",
    level: "High",
    risk: "Magnetic components and CPC/Link-N may interfere with crosslinking, cell responses or matrix interactions. Adding modules may increase complexity without a meaningful gain.",
    action: "Compare the base scaffold, individual modules and selected combinations. Retain a module only when its incremental benefit justifies the added safety, process and handling burden, and define the minimal first formulation that meets the target.",
  },
  {
    id: "R3",
    stage: "Material safety",
    level: "Critical",
    risk: "Residual endotoxin, host-cell impurities, ligase, Ru/SPS reagents, magnetic particles or lipid components may affect local safety. Recombinant proteins and peptide interfaces may also trigger immune responses.",
    action: "Build a product-specific biological evaluation and impurity-control strategy covering local tissue reactions and degradation products. If a component cannot meet a justified safety specification, pause development, change the formulation or remove the component.",
  },
  {
    id: "R4",
    stage: "Mitochondrial delivery",
    level: "Critical",
    risk: "Source traceability, functional potency, storage stability and the reproducibility of enzyme-responsive delivery remain highly uncertain. A validated scaffold does not validate a complete mitochondrial product.",
    action: "Define source, quality and potency requirements, and evaluate delivery separately from the scaffold. Do not include the module in the first candidate unless its benefit is demonstrated and complete manufacturing and regulatory documentation exists.",
  },
  {
    id: "R5",
    stage: "Scale-up and cost",
    level: "High",
    risk: "Repetitive SELP constructs, purification yield and module occupancy may cause batch inconsistency. Laboratory yield does not prove that every released clinical unit is cost-competitive.",
    action: "Track identity, purity, assembly consistency, yield and cost across independent batches. Include failed batches, testing, packaging and distribution in the cost model, and prefer qualified development manufacturing partners before investing in a dedicated plant.",
  },
  {
    id: "R6",
    stage: "Sterility and shelf life",
    level: "Critical",
    risk: "Sterilization, transport or storage may damage the protein network, active modules or gelation performance. A stable base scaffold does not mean the final combination is equally stable.",
    action: "Validate a product-compatible sterile process, packaging and storage conditions. Evaluate each final formulation and its device interface separately; if stability is insufficient, shorten the intended shelf life or simplify the supply format.",
  },
  {
    id: "R7",
    stage: "Regulatory pathway",
    level: "Critical",
    risk: "The scaffold, bioactive modules, mitochondria and delivery device may fall under different regulatory requirements. Calling the product a hydrogel, or removing cells, does not by itself determine its classification.",
    action: "Clarify the intended use, composition and primary mode of action, and communicate early with NMPA on classification and the submission pathway. Map the evidence required for each configuration and revise scope and timelines before major investment.",
  },
  {
    id: "R8",
    stage: "Hardware and usability",
    level: "High",
    risk: "Mixing, temperature control, delivery, magnetic orientation and illumination must work together. Workflow errors or inconsistent parameters may change the implanted material and increase the surgical burden.",
    action: "Validate the complete workflow with intended users, including delivery accuracy, curing consistency and software control. Limit the clinical version to validated formulations and parameters; simplify the device if complexity outweighs the benefit.",
  },
  {
    id: "R9",
    stage: "Intellectual property and licensing",
    level: "High",
    risk: "Third-party rights may cover the ligation system, biomaterials, modules or delivery device. Public disclosures and university ownership arrangements affect what NEST can protect or license.",
    action: "Review prior disclosures, inventorship, ownership and material-transfer terms, and commission freedom-to-operate analyses in target jurisdictions. Obtain necessary licences or design around the claims; research-use permission is not commercial rights.",
  },
  {
    id: "R10",
    stage: "Clinical adoption and payment",
    level: "High",
    risk: "Surgeons may prefer established procedures, and hospitals may not accept additional equipment or costs. A product for focal defects does not apply to every patient with osteoarthritis.",
    action: "Define the first indication with clinicians and test procurement and willingness-to-pay assumptions. Compare total surgical cost, outcomes and rehabilitation burden. If adoption is insufficient, narrow the indication or let a partner lead commercialization.",
  },
  {
    id: "R11",
    stage: "Financing and execution",
    level: "High",
    risk: "Long development timelines, clinical setbacks and turnover in a university team may exhaust funding or interrupt continuity before sales begin.",
    action: "Raise against consecutive evidence milestones, keep complete handover records and build a sustainable operating team. Track cash runway to the next decision point; if funding is short, protect the first product and defer facility expansion or advanced modules.",
  },
  {
    id: "R12",
    stage: "Partnerships and impact",
    level: "High",
    risk: "Dependence on a single manufacturer or commercial partner may limit access, data use or supply. Biodegradability alone does not prove a lower environmental footprint.",
    action: "Define data, IP, quality, supply and exit responsibilities in agreements, and qualify alternative partners where feasible. Assess waste, energy and cold-chain needs, and evaluate affordability with potential clinical centres; avoid unsupported exclusivity or sustainability claims.",
  },
];

const CANVAS_ROWS = [
  {
    module: "Key partners",
    model:
      "Orthopaedic clinical centres and patient advisors; CDMO manufacturers and testing laboratories; university technology-transfer and IP teams; device and distribution partners; commercial insurers and government partners.",
  },
  {
    module: "Key activities",
    model:
      "Freeze the lead formulation; scale production and quality control; generate clinical evidence.",
  },
  {
    module: "Key resources",
    model:
      "SELP and ligation know-how; assays, data and quality systems; clinical and manufacturing expertise.",
  },
  {
    module: "Value propositions",
    model:
      "A sequence-defined material foundation; controlled assembly of selected functions; conformal filling and on-demand gelation; a coordinated material-delivery workflow. Target benefits still require validation.",
  },
  {
    module: "Customer relationships",
    model:
      "Joint development milestones; surgeon training and support; quality and safety follow-up.",
  },
  {
    module: "Channels",
    model:
      "Development partnerships; specialist centres and procurement channels; orthopaedic distributors.",
  },
  {
    module: "Customer segments",
    model:
      "Near term: biomaterial and orthopaedic R&D partners. After approval: hospitals and surgical centres. Beneficiaries: selected patients with focal cartilage defects. Initial geographic focus: China.",
  },
  {
    module: "Cost structure",
    model:
      "R&D, preclinical and clinical studies and regulatory work; manufacturing, batch release, sterile packaging and distribution; IP, quality systems, device support and team operations.",
  },
  {
    module: "Revenue streams",
    model:
      "Early: research services and negotiated development licences. After approval: formulation kits and disposable delivery sets. Potential: equipment or service contracts and licensing royalties.",
  },
];

export function Entrepreneurship() {
  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article className="entrepreneurship-article">
          <h2 id="judging-criteria">Judging criteria</h2>
          <p>
            The five iGEM Entrepreneurship criteria are summarised in the cards
            below. Each card links to the section that develops the argument in
            full.
          </p>

          <ExtendCard title="Has the team discovered their first potential customers and identified any unmet needs not yet covered by other existing solutions?">
            <p>
              Our first users are patients in China with focal, partial-thickness
              knee cartilage defects who are assessed by orthopaedic and
              sports-medicine surgeons. The unmet need is not symptom relief
              alone: current treatments can reduce pain or repair part of a
              defect, but rarely restore durable, load-bearing hyaline cartilage.
              Injectable hydrogels are promising yet still struggle with wet-tissue
              fixation, cyclic loading, controlled degradation and batch
              consistency. NEST addresses that gap with a sequence-defined,
              modular protein platform rather than another fixed-formula gel.
            </p>
            <p>
              <a href="#market-entry">Market entry</a> describes the first
              customers, the minimum viable product and the China-first route;{" "}
              <a href="#competitor-analysis">Competitor analysis</a> shows where
              existing solutions stop short.
            </p>
          </ExtendCard>

          <ExtendCard title="Has the team shown that their solution is possible, scalable and inventive?">
            <p>
              The platform is built on SELP, a silk–elastin-like protein whose
              sequence, domain ratio, functional residues and peptide interfaces
              are design parameters. Standardized SnoopTag/DogTag interfaces let
              one scaffold carry different functions, and visible-light
              crosslinking turns the injected liquid into a defect-filling gel.
              Our experimental work covers expression, purification, formulation
              and material characterization; the <a href="#cost-analysis">cost
              analysis</a> translates those results into an annual output of
              about 15.7 kg of SELP from a 500 L line, serving roughly 249,000
              patients per year.
            </p>
            <p>
              Inventiveness lies in the combination of a sequence-programmable
              backbone, independently verifiable functional interfaces and a
              manufacturing route designed for consistency — see{" "}
              <a href="#about-bcoated">About NexCode</a>.
            </p>
          </ExtendCard>

          <ExtendCard title="Has the team presented logical product development plans with realistic milestones, timelines, resources and risks?">
            <p>
              Development follows an evidence-gated roadmap from 2026 to 2042:
              define the lead product (2026–2027), de-risk formulation and
              manufacturing (2027–2029), prepare quality and safety evidence
              (2029–2031), evaluate clinical value (2031–2035), complete
              regulatory review (2035–2037) and expand only after approval
              (2037–2042). Each phase has a decision gate and a resource list.
            </p>
            <p>
              A twelve-item risk register covers material performance, module
              integration, safety, mitochondrial delivery, scale-up, sterility,
              regulation, hardware, IP, adoption, financing and partnerships,
              with explicit fallback decisions. See{" "}
              <a href="#timeline">Timeline</a> and{" "}
              <a href="#risk-analysis">Risk analysis</a>.
            </p>
          </ExtendCard>

          <ExtendCard title="Has the team outlined the skills, capabilities, and stakeholders required to be credible in developing their solution further?">
            <p>
              Our 16-member team combines clinical medicine, life sciences,
              pharmacy, engineering, modelling, software, design, human
              practices and finance. The strongest capabilities are in research
              and prototyping; the clearest gaps are IP strategy, bioprocess
              scale-up and quality management, regulatory and clinical
              translation, and commercial operations.
            </p>
            <p>
              We address these gaps through university technology transfer,
              patent attorneys, CDMOs, quality and regulatory advisors,
              orthopaedic clinicians and entrepreneurship mentors. The{" "}
              <a href="#the-sustainable-business-canvas">business canvas</a>{" "}
              lists the stakeholders and the{" "}
              <a href="#skill-gap-analysis">skill gap analysis</a> explains how
              each capability will be built.
            </p>
          </ExtendCard>

          <ExtendCard title="Has the team considered the positive and negative long-term impacts of their fully developed solution?">
            <p>
              A durable off-the-shelf repair option could delay or reduce the
              need for more invasive surgery, and a reusable platform could
              shorten development for further indications. At the same time, the
              added hardware and workflow may increase surgical burden, payment
              and access are uncertain, the regulatory path is long and
              capital-intensive, and the environmental footprint of recombinant
              protein production, cold chain and packaging has not yet been
              quantified. We therefore keep claims proportionate to the evidence
              and treat expansion as a sequence of separate decisions.
            </p>
            <p>
              See{" "}
              <a href="#long-term-benefits-disadvantages">
                Long-term benefits and disadvantages
              </a>
              .
            </p>
          </ExtendCard>

          <h2 id="background">Background</h2>
          <p>
            Articular cartilage supports everyday activities such as walking,
            running and climbing stairs, yet it has almost no blood supply and a
            very limited capacity for self-repair. Sports trauma, prolonged
            abnormal loading and age-related degeneration can all damage
            cartilage, making pain, stiffness and restricted movement more
            likely in later years. In 2023, about 635.4 million people worldwide
            were living with osteoarthritis. For many patients, cartilage damage
            means not only physical pain but also a gradual loss of mobility,
            work capacity and independence.
          </p>
          <p>
            Conventional treatments can relieve symptoms, repair part of a defect
            or rebuild joint function, but they still struggle to restore native
            hyaline cartilage durably. Hydrogels are attractive because they are
            water-rich, injectable and able to conform to irregular defects.
            Once inside the joint, however, the material must simultaneously
            withstand repeated loading, attach to wet tissue, degrade in a
            controlled way and support cells whose function is already impaired.
            As more functions are added, complex material assembly also creates
            challenges for manufacturing consistency, quality control and
            clinical translation.
          </p>
          <p>
            Cartilage repair therefore needs more than another fixed-formula
            hydrogel. It needs a material platform that can adjust performance to
            different defects, combine functions on demand and be manufactured
            reproducibly. NEST, developed by NexCode Biotechnologies, is our
            answer: a programmable, modular protein hydrogel platform that aims
            to make cartilage repair customizable, scalable and
            standardization-ready.
          </p>

          <h2 id="about-bcoated">About NexCode</h2>
          <p>
            NexCode Biotechnologies is a biotechnology company focused on
            advancing hyaline cartilage repair. Its core project, NEST, takes its
            name from the way a bird&rsquo;s nest supports and protects life
            according to its environment: NEST aims to build a fitting
            &ldquo;nest&rdquo; for regrowing tissue through programmable protein
            materials.
          </p>
          <p>
            At the core of NEST is a modular hydrogel platform based on SELP, a
            silk–elastin-like protein. Genetic sequence design allows us to tune
            mechanical properties, elasticity, tissue interactions and
            degradation behaviour. After injection into a defect, the material
            can be crosslinked in situ with visible light, conforming to
            different cartilage defect shapes, supporting repair and eventually
            degrading. Standardized protein ligation interfaces allow functional
            modules to be assembled as needed, so one material backbone can serve
            different requirements.
          </p>
          <p>
            For commercial translation, NexCode plans a B2B model serving medical
            device companies, research hospitals and regenerative-medicine
            translation organizations with customizable protein hydrogel
            formulations, functional modules and accompanying preparation and
            delivery solutions. We will start with osteoarthritis-related
            cartilage defects as the representative application, complete
            material validation, manufacturing standardization and preclinical
            development, and then extend to other joints, disease stages and
            repair goals. Compared with developing a new material for every
            need, the platform model is expected to shorten development cycles,
            improve manufacturing consistency and support a growing product
            pipeline.
          </p>

          <h2 id="market-size-analysis">Market size analysis</h2>
          <p>
            The market analysis shows that NEST addresses a large, growing and
            insufficiently served medical market. We use the total addressable
            market (TAM), serviceable available market (SAM) and serviceable
            obtainable market (SOM) framework to move from the global cartilage
            repair industry to the Chinese knee cartilage repair market that
            NEST initially plans to enter.
          </p>

          <ExtendCard title="Total addressable market">
            <p>
              TAM is the total market size of a product or service. For NEST it
              is not limited to the knee or sports injuries; it includes
              cartilage defect repair across joints and causes:
            </p>
            <ul>
              <li>
                cartilage defects of the knee, ankle, hip, shoulder and elbow;
              </li>
              <li>
                focal cartilage defects caused by sports injuries and trauma;
              </li>
              <li>
                degenerative cartilage damage associated with osteoarthritis;
              </li>
              <li>
                osteochondral injuries and other conditions requiring cartilage
                regeneration;
              </li>
              <li>
                cell transplantation, tissue scaffolds, growth factors and
                acellular repair materials.
              </li>
            </ul>
            <p>
              A commercial market study estimates the global cartilage repair
              and regeneration market at about US$1.18907 billion in 2025,
              growing to about US$3.22206 billion by 2033 — a compound annual
              growth rate (CAGR) of about 13.27% over 2025–2033 [2]. CAGR
              reflects market prospects; a rate above the S&amp;P 500&rsquo;s
              long-term average annual return of about 10% indicates strong
              growth potential [3]. The growing osteoarthritis burden, wider
              adoption of arthroscopy and advances in regenerative medicine are
              the main drivers.
            </p>
          </ExtendCard>

          <ExtendCard title="Serviceable available market">
            <p>
              SAM is the share of the market a company can reach with its
              business model [1]. The target market is a key determinant, so we
              use a segment prioritization approach (SPA) to decide where to
              focus first. Each region is scored on current size, future
              potential and accessibility, weighted by importance.
              Accessibility receives the highest weight because the business must
              be able to enter the market; market size is second because it
              indicates the number of potential customers; market potential is
              weighted least.
            </p>
            <p>
              Weighted score = (2 × size score + 1 × potential score + 4 ×
              accessibility score) / 7.
            </p>
            <div className="table-responsive mb-4">
              <table
                className="table table-bordered align-middle"
                aria-label="Regional market screening for NEST"
              >
                <thead className="table-primary">
                  <tr>
                    <th scope="col">Region</th>
                    <th scope="col">2023 market size (αP)</th>
                    <th scope="col">Size score (×2)</th>
                    <th scope="col">2033 potential (αP)</th>
                    <th scope="col">Potential score (×1)</th>
                    <th scope="col">Accessibility (×4)</th>
                    <th scope="col">Weighted score</th>
                  </tr>
                </thead>
                <tbody>
                  {SPA_ROWS.map((row) => (
                    <tr key={row.region}>
                      <td>{row.region}</td>
                      <td>{row.size}</td>
                      <td>{row.sizeScore}</td>
                      <td>{row.potential}</td>
                      <td>{row.potentialScore}</td>
                      <td>{row.access}</td>
                      <td>
                        <strong>{row.weighted}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              <small>
                αP is a market-size index: α converts osteoarthritis patient
                numbers into the cartilage repair market and P is the average
                treatment price; patient bases are in millions. The 2033 values
                assume a 13.27% CAGR. Accessibility reflects the team&rsquo;s
                location, existing clinical and research network, geographic
                distance, regulatory familiarity and the difficulty of
                establishing commercial partnerships.
              </small>
            </p>
            <p>
              East Asia scores highest on current patient size, future potential
              and accessibility, so it is NEST&rsquo;s first serviceable market.
              South Asia appears to be a suitable second market, but we will
              focus on East Asia for the foreseeable future.
            </p>
            <p>
              GBD 2023 data report about 635.4 million people with osteoarthritis
              worldwide, with East Asia carrying the largest regional burden:
              about 167 million patients, or 26.33% of the global total. MRI
              studies show that about 98.5–99.6% of MRI-defined knee
              osteoarthritis involves partial- or full-thickness cartilage
              damage [4]. Assuming a 15% share of this market by 2033, our SAM
              reaches about US$483.31 million (about €430 million) [2].
            </p>
          </ExtendCard>

          <ExtendCard title="Serviceable obtainable market">
            <p>
              SOM is the part of the SAM a company can realistically capture
              [1]. NexCode is located in China, an ideal base because of its
              very large population and its central position in East Asia. As
              the knee accounts for more than 60% of arthroscopic procedures,
              NEST&rsquo;s first generation will target focal knee cartilage
              defects [5]. Studies report focal chondral or osteochondral defects
              in about 19% of knee arthroscopy patients [6]. The 2033 SOM for
              the first product is therefore:
            </p>
            <p>
              <MathFormula display>
                {String.raw`\mathrm{SOM}_{2033} = 483.31 \times 60\% \times 19\% \approx \mathrm{US\$55.1\ million} \approx €48.96\ \mathrm{million}`}
              </MathFormula>
            </p>
            <p>
              This initial revenue would support applying the hydrogel to more
              cartilage sites and more causes of damage. We will also promote
              the programmable hydrogel in other parts of East Asia. Together
              these steps support our annual targets.
            </p>
          </ExtendCard>

          <h2 id="competitor-analysis">Competitor analysis</h2>
          <p>
            Around the clinical need for cartilage repair, NEST faces three
            groups of competitors: direct competitors that use a different
            material or technology route to meet the same clinical need;
            alternative treatments that compete for patients, medical resources
            and payment within the same care pathway; and platform companies
            with adjacent capabilities that could enter cartilage repair. The
            tables below select representative domestic and international
            organizations and compare their positioning, technology and
            commercial progress. Market access and commercial supply are
            assessed by target region: an overseas approval does not confer
            access to the Chinese market.
          </p>

          <ExtendCard title="Domestic companies">
            <div className="table-responsive mb-0">
              <table
                className="table table-bordered align-middle"
                aria-label="Domestic competitors in cartilage repair"
              >
                <colgroup>
                  <col style={{ width: "27%" }} />
                  <col style={{ width: "41%" }} />
                  <col style={{ width: "32%" }} />
                </colgroup>
                <thead className="table-primary">
                  <tr>
                    <th scope="col">Company and product</th>
                    <th scope="col">Technology and public progress</th>
                    <th scope="col">Implication for NEST</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPETITORS_DOMESTIC.map((row) => (
                    <tr key={row.company}>
                      <td>
                        <strong>{row.company}</strong>
                        <br />
                        {row.product}
                        <br />
                        <em>{row.route}</em>
                      </td>
                      <td>{row.progress}</td>
                      <td>{row.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ExtendCard>

          <ExtendCard title="International companies">
            <div className="table-responsive mb-0">
              <table
                className="table table-bordered align-middle"
                aria-label="International competitors in cartilage repair"
              >
                <colgroup>
                  <col style={{ width: "27%" }} />
                  <col style={{ width: "41%" }} />
                  <col style={{ width: "32%" }} />
                </colgroup>
                <thead className="table-primary">
                  <tr>
                    <th scope="col">Company and product</th>
                    <th scope="col">Technology and public progress</th>
                    <th scope="col">Implication for NEST</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPETITORS_INTERNATIONAL.map((row) => (
                    <tr key={row.company}>
                      <td>
                        <strong>{row.company}</strong>
                        <br />
                        {row.product}
                        <br />
                        <em>{row.route}</em>
                      </td>
                      <td>{row.progress}</td>
                      <td>{row.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ExtendCard>

          <ExtendCard title="Competitive positioning">
            <p>
              Our intended differentiation is a sequence-defined SELP backbone
              together with standardized, independently verifiable functional
              interfaces. Because existing products already share some of these
              features, injectability, biodegradability or a single-surgery
              workflow alone are not sufficient differentiation. More meaningful
              comparison points are scaffold retention and tissue integration,
              batch reproducibility, repair durability, surgical burden and
              total treatment cost.
            </p>
            <p>
              NEST has proposed development directions that merit validation,
              but a competitive advantage still requires further technical
              support. We therefore present the platform as a hypothesis to be
              tested against these benchmarks rather than as an established
              clinical advantage.
            </p>
          </ExtendCard>

          <h2 id="cost-analysis">Cost analysis</h2>
          <p>
            The sections above show that our solution is inventive, addresses an
            unmet need and has a potential market despite direct and indirect
            competitors. We now focus on the financial side of the business,
            dividing financial costs into initial capital investment, annual
            operating costs and annual capital expenditure. Capital cost
            classification and estimation follow the techno-economic assessment
            framework for biorefineries proposed by NREL [7]. We also conducted
            an extensive literature search and drew on Professor Erik
            Forsberg&rsquo;s technology-entrepreneurship course to obtain
            accurate cost estimates. As is conventional in financial analysis,
            most costs are estimated as proportions of other costs.
          </p>

          <ExtendCard title="Investment costs">
            <p>
              Investment costs include everything needed to obtain an operable
              production facility, including R&amp;D. They therefore represent
              the funding that must be raised. Investment costs are divided into
              purchase costs (PC), direct costs (DC), indirect costs (IC) and
              other costs (OC), and also include start-up and validation costs
              plus working capital for the first months of operation. PC, DC, IC
              and OC together form the fixed capital investment (FCI).
            </p>
            <p>
              All investment costs are calculated as proportions of the major
              equipment cost. To estimate that cost, we first determined how much
              SELP must be produced to meet initial market demand and reach our
              target sales (SOM).
            </p>
            <p>
              About 2.183 million sports-medicine arthroscopic procedures are
              expected in China in 2026 [8]. About 60% involve the knee [5], and
              about 19% of knee arthroscopy patients have focal chondral or
              osteochondral defects [6], giving an initial target of about
              248,900 patients per year. Reported defects average about 2.1 cm²
              [6], and human knee cartilage is about 2.2–2.5 mm thick [16];
              assuming 2.5 mm, each patient needs about 0.525 mL of hydrogel. At a SELP
              concentration of 10% w/v, this is about 52.5 mg of SELP per
              treatment, or about 13,070 g per year. With a 20% allowance for
              production losses and safety margin, the annual production target
              is about 15,680 g. Our experiments yield about 0.5 g of SELP per
              litre of medium, so about 31,360 L of medium must be processed per
              year. At 100 batches per year, each batch requires about 314 L of
              medium, so the line is planned around one 500 L bioreactor with
              medium preparation tanks, a centrifuge, a high-pressure
              homogenizer, temperature-controlled purification tanks, filtration
              and endotoxin-removal equipment, a freeze dryer, aseptic filling
              equipment and quality-control instruments.
            </p>
            <p>
              With support from Beijing Weixinkang Medical Co., Ltd., the major
              equipment cost of the first-generation NEST line is estimated at
              ¥7.45 million, about US$1.115 million or €0.9916 million.
            </p>

            <h3 id="purchase-costs" data-toc="exclude">
              Purchase costs
            </h3>
            <p>
              Major equipment cost (MEC) covers bioreactors, stirring equipment
              and freeze dryers needed for production. Unlisted equipment cost
              covers other required equipment that is not separately itemized
              in the quotation.
            </p>

            <h3 id="direct-costs" data-toc="exclude">
              Direct costs
            </h3>
            <p>
              Installation puts the equipment in place and connects it;
              piping and insulation connect the equipment into a working system
              and maintain process temperatures; electrical work establishes the
              power network; the control system provides automation, monitoring
              and instrumentation; the building provides the facility shell and
              foundations; land improvement prepares the site for construction;
              and auxiliary facilities include warehouses and cooling towers.
            </p>

            <h3 id="indirect-costs" data-toc="exclude">
              Indirect costs
            </h3>
            <p>
              Engineering covers design, planning and technical preparation;
              construction management coordinates and supervises construction;
              contingency reserves funds for unexpected costs during the
              project; and the contractor&rsquo;s fee pays external construction
              services.
            </p>

            <h3 id="other-costs" data-toc="exclude">
              Other costs
            </h3>
            <p>
              Start-up and validation cover commissioning, process tuning,
              product development, validation and early promotion before
              commercial operation.
            </p>

            <p>
              Land is a one-off capital cost for acquiring the production site,
              including purchase, lease rights and transaction costs. Following
              the NREL classification, land sits outside FCI and, together with
              working capital, is included in total capital investment (TCI).
              Land itself is normally not depreciated; site levelling, roads and
              drainage are land-improvement costs within direct construction
              costs.
            </p>
            <p>
              Working capital is the revolving capital needed to keep daily
              operations running, supporting raw-material inventory, operating
              cash and receivables. It is distinct from annual OPEX, which
              records costs actually consumed during a year of production.
            </p>

            <div className="entre-card-nested-group">
              <ExtendCard title="Equipment costs" level="secondary">
                <p>
                  The first-generation line is sized for 31,360 L of medium per
                  year in 100 batches of about 314 L. Planned major equipment
                  includes a 500 L bioreactor, medium preparation tanks, a
                  centrifuge, a high-pressure homogenizer, temperature-controlled
                  purification tanks, filtration and endotoxin-removal units, a
                  freeze dryer, aseptic filling equipment and quality-control
                  instruments.
                </p>
                <p>
                  The estimated major equipment cost is ¥7.45 million (about
                  US$1.115 million or €0.9916 million), excluding unlisted
                  equipment, installation and utilities.
                </p>
              </ExtendCard>
            </div>

            <div className="table-responsive mb-0">
              <table
                className="table table-bordered align-middle"
                aria-label="Initial capital investment for the first-generation NEST line"
              >
                <thead className="table-primary">
                  <tr>
                    <th scope="col">Cost item</th>
                    <th scope="col">Basis</th>
                    <th scope="col">CNY thousand</th>
                    <th scope="col">USD thousand</th>
                    <th scope="col">EUR thousand</th>
                  </tr>
                </thead>
                <tbody>
                  {INVESTMENT_ROWS.map((row) => (
                    <tr key={row.item}>
                      <td>{row.total ? <strong>{row.item}</strong> : row.item}</td>
                      <td>{row.basis}</td>
                      <td>{row.total ? <strong>{row.cny}</strong> : row.cny}</td>
                      <td>{row.total ? <strong>{row.usd}</strong> : row.usd}</td>
                      <td>{row.total ? <strong>{row.eur}</strong> : row.eur}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ExtendCard>

          <ExtendCard title="Production costs">
            <p>
              Operating expenditure (OPEX) is incurred to keep producing after
              the plant starts running. For a one-year period it typically
              includes raw materials, media and reagents, utilities, labour,
              maintenance, quality testing and waste treatment. Production costs
              are divided into variable costs, which rise with output, and fixed
              costs, which do not.
            </p>

            <h3 id="variable-costs" data-toc="exclude">
              Variable costs
            </h3>
            <p>
              Variable operating costs (VOC) include raw materials, utilities,
              direct labour, consumables, waste treatment and disposal,
              transportation and logistics, quality control and royalties.
            </p>

            <h3 id="fixed-costs" data-toc="exclude">
              Fixed costs
            </h3>
            <p>
              Fixed operating costs (FOC) include research and development,
              marketing, maintenance and insurance.
            </p>

            <div className="entre-card-nested-group">
              <ExtendCard title="Material costs" level="secondary">
                <p>
                  NEST is produced in <em>E. coli</em> BL21(DE3) carrying the
                  SELP expression plasmid. In the laboratory we use standard LB
                  broth; because the SELP becomes a hydrogel that enters the
                  human body, we do not use waste-derived media and instead
                  select raw materials with stable quality, which also matches
                  supplier-audit and traceability requirements for medical-device
                  manufacturing.
                </p>
                <p>
                  LB Miller medium contains 10 g tryptone, 5 g yeast extract and
                  10 g sodium chloride per litre. For 31,360 L per year,
                  NEST needs about 313.6 kg tryptone, 156.8 kg yeast extract and
                  313.6 kg sodium chloride. At publicly listed prices available
                  through Chinese channels, the annual purchase cost of these
                  three main LB ingredients is about ¥290.7 thousand per year.
                </p>
                <p>
                  In addition, about 7.47 kg of IPTG and about 1.57 kg of
                  kanamycin are needed each year, together with PBS and sodium
                  chloride for ITC phase separation and the Ru/SPS crosslinking
                  components for the final hydrogel. Including the syringe
                  hardware consumables of about ¥291.5 thousand per year
                  (500 units), the raw-material line in the model totals ¥869.2
                  thousand per year, about US$129,300 or €115,900.
                </p>
              </ExtendCard>

              <ExtendCard title="Labour costs" level="secondary">
                <p>
                  Annual labour cost for company operations is modelled as:
                </p>
                <MathFormula display>
                  {String.raw`C_{\mathrm{labour}} = \sum_k F_{\mathrm{labour},k} \times c_{\mathrm{labour},k} \times h_{\mathrm{operation},k}`}
                </MathFormula>
                <p>
                  where <em>k</em> is a specific production operation,{" "}
                  <em>F</em> is the labour hours required per operating hour,{" "}
                  <em>c</em> is the fully loaded hourly labour cost, and{" "}
                  <em>h</em> is the annual operating time of that operation.
                </p>
                <div className="table-responsive mb-3">
                  <table
                    className="table table-bordered align-middle"
                    aria-label="Labour intensity of NEST production operations"
                  >
                    <thead className="table-primary">
                      <tr>
                        <th scope="col">Operation</th>
                        <th scope="col">Labour hours per operating hour</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Batch fermentation</td>
                        <td>0.3–2.0</td>
                      </tr>
                      <tr>
                        <td>Cell harvesting and clarification</td>
                        <td>0.1–0.2</td>
                      </tr>
                      <tr>
                        <td>ITC purification and TFF concentration</td>
                        <td>0.2–0.5</td>
                      </tr>
                      <tr>
                        <td>SELP formulation, aseptic filling and lyophilization</td>
                        <td>0.3–0.6</td>
                      </tr>
                      <tr>
                        <td>Cleaning and decontamination</td>
                        <td>0.1–0.2</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Total</strong>
                        </td>
                        <td>
                          <strong>1.0–3.5</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  With night-shift wages, the formula becomes:
                </p>
                <MathFormula display>
                  {String.raw`C_{\mathrm{production}} = \sum_k F_k c_k h_{k,d} + \sum_k F_k c_k (1+r_n) h_{k,n}`}
                </MathFormula>
                <p>
                  where <em>h</em><sub>d</sub> and <em>h</em><sub>n</sub> are
                  day- and night-shift operating hours and <em>r</em>
                  <sub>n</sub> is the night-shift wage premium.
                </p>
                <p>
                  Recruitment salaries for bioproduction operators in Zhejiang
                  are about ¥6,000–8,000 per month, so we use the upper bound of
                  ¥8,000 for a conservative estimate [1]. Including employer
                  contributions for pension, medical and maternity insurance,
                  unemployment insurance, work-injury insurance and the housing
                  fund, we add 35% to the base wage for the time being [2–4].
                  With 174 standard working hours per month, the hourly
                  production labour cost is:
                </p>
                <MathFormula display>
                  {String.raw`c_{\mathrm{labour}} = \frac{8{,}000 \times 1.35}{174} = 62.07\ \mathrm{CNY/h}`}
                </MathFormula>
                <p>
                  For the initial calculation we use the upper end of the labour
                  intensity of each operation, giving a total of 3.5 labour
                  hours per operating hour. To obtain a conservative initial
                  budget, we assume the system runs continuously through the
                  year, with 4,380 hours on the day shift and 4,380 hours on the
                  night shift. China has no unified national night-shift premium,
                  so the model uses 20%.
                </p>
                <p>
                  Day-shift labour cost: 3.5 × 62.07 × 4,380 = ¥951,517 per year.
                  Night-shift labour cost: 3.5 × 62.07 × 1.2 × 4,380 =
                  ¥1,141,821 per year. Annual production labour cost is therefore
                  about ¥2,093,338, or ¥2.09 million per year.
                </p>
                <p>
                  The company also needs cleaning and sales staff. Cleaning
                  positions in Hangzhou pay about ¥4,000–5,000 per month and
                  medical-device sales positions about ¥8,000–12,000 per month
                  [5–6]. With three cleaners, two sales staff and the same 35%
                  employer contribution:
                </p>
                <p>
                  Cleaning: 5,000 × 1.35 × 3 × 12 = ¥243,000 per year. Sales:
                  10,000 × 1.35 × 2 × 12 = ¥324,000 per year.
                </p>
                <p>
                  Total annual labour cost is therefore 2,093,338 + 243,000 +
                  324,000 = ¥2,660,338 per year, about ¥2.66 million.
                </p>
              </ExtendCard>

              <ExtendCard title="Consumable costs" level="secondary">
                <p>
                  Consumables include filters, single-use tubing, gloves and
                  other laboratory and production items that are replaced or
                  discarded after use. The model estimates about ¥339.2 thousand
                  per year (US$50.5 thousand; €45.2 thousand).
                </p>
              </ExtendCard>

              <ExtendCard title="Waste costs" level="secondary">
                <p>
                  Waste from NEST production mainly consists of about 31,360 L
                  of spent medium per year plus cleaning liquids, discarded
                  filters, single-use tubing and gloves. To allow for water-rich
                  waste and production variability, the model estimates 50,000 kg
                  of waste per year. Because the culture uses engineered{" "}
                  <em>E. coli</em>, spent medium and bacteria-contacted
                  consumables must first be inactivated and then sorted and
                  handed to licensed disposal companies; China&rsquo;s general
                  biosafety requirements for laboratories also require reliable
                  disinfection, classification and safe disposal [9]. For the
                  initial cost model we use a low-end treatment price of ¥2.4 per
                  kg [10], giving 50,000 kg × ¥2.4 = ¥120,000 per year.
                </p>
              </ExtendCard>

              <ExtendCard title="Royalties" level="secondary">
                <p>
                  Licensing a patent to another company normally generates a
                  royalty of about 5% [15]. For NEST this would mean other
                  medical-device companies could license our strain to produce
                  their own SELP. We do not intend to license the patent to other
                  companies; we prefer to manufacture ourselves and sell the
                  product, so the model assumes no royalty income.
                </p>
              </ExtendCard>
            </div>

            <p>
              Research and development is budgeted at 0.5% of SOM, or ¥1.84
              million per year. At present the cost calculation covers only the
              first-generation SELP hydrogel. In future we plan to express
              functional peptides with repair activity and add them to the
              product. If the existing fermentation platform is reused and
              His-tag affinity chromatography, protease cleavage and secondary
              purification are added, the rest of the process remains broadly
              similar to SELP production; we therefore provisionally set the
              additional development operating cost at ¥1.84 million per year,
              mainly for process optimization, excluding new buildings and a
              complete GMP line. If the line has to be fully duplicated, the
              equipment would be an additional capital cost [7].
            </p>
            <p>
              An alternative is to contract process development and pilot
              production of the functional peptides to a CDMO. Domestic CDMOs
              can provide microbial fermentation up to about 2,000 L, protein
              purification and quality testing, but usually quote separately
              depending on strain, yield and purity requirements.
              Building an in-house line requires existing equipment, technical
              staff and a quality system; a CDMO may cost more but reduces early
              equipment investment and scale-up risk. Because product demand is
              still uncertain, we prefer CDMO collaboration first and expect to
              move to in-house production once the process is stable and demand
              grows.
            </p>

            <div className="table-responsive mb-0">
              <table
                className="table table-bordered align-middle"
                aria-label="Annual operating expenditure for NEST"
              >
                <thead className="table-primary">
                  <tr>
                    <th scope="col">Cost item</th>
                    <th scope="col">Basis</th>
                    <th scope="col">CNY thousand</th>
                    <th scope="col">USD thousand</th>
                    <th scope="col">EUR thousand</th>
                  </tr>
                </thead>
                <tbody>
                  {OPEX_ROWS.map((row) => (
                    <tr key={row.item}>
                      <td>{row.total ? <strong>{row.item}</strong> : row.item}</td>
                      <td>{row.basis}</td>
                      <td>{row.total ? <strong>{row.cny}</strong> : row.cny}</td>
                      <td>{row.total ? <strong>{row.usd}</strong> : row.usd}</td>
                      <td>{row.total ? <strong>{row.eur}</strong> : row.eur}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ExtendCard>

          <ExtendCard title="Capital costs">
            <p>
              Annual capital expenditure (CAPEX) covers spending to improve the
              plant further, such as expanding production facilities, replacing
              equipment or training staff. In our business plan, capital costs
              are defined as a proportion of revenue.
            </p>
            <p>
              Maintenance capital expenditure keeps existing capacity and
              facilities running; replacement capital expenditure replaces
              equipment, components or facilities that reach the end of their
              service life; expansion capital expenditure increases production
              scale or capacity.
            </p>
            <div className="table-responsive mb-0">
              <table
                className="table table-bordered align-middle"
                aria-label="Annual capital expenditure for NEST"
              >
                <thead className="table-primary">
                  <tr>
                    <th scope="col">Cost item</th>
                    <th scope="col">Basis</th>
                    <th scope="col">CNY thousand</th>
                    <th scope="col">USD thousand</th>
                    <th scope="col">EUR thousand</th>
                  </tr>
                </thead>
                <tbody>
                  {CAPEX_ROWS.map((row) => (
                    <tr key={row.item}>
                      <td>{row.item}</td>
                      <td>{row.basis}</td>
                      <td>{row.cny}</td>
                      <td>{row.usd}</td>
                      <td>{row.eur}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <strong>CAPEX total</strong>
                    </td>
                    <td>0.6% of SOM</td>
                    <td>
                      <strong>2,208.00</strong>
                    </td>
                    <td>
                      <strong>328.57</strong>
                    </td>
                    <td>
                      <strong>294.40</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ExtendCard>

          <h2 id="timeline">Timeline</h2>
          <p>
            Our milestones move from proof of concept and technical validation
            to market entry and business expansion, adjusted for the long cycle
            of implantable cartilage repair products and their dependence on
            accumulating evidence. The roadmap covers 2026–2042 and shows
            technical, regulatory and commercial work running in parallel. It is
            a proposed baseline scenario; product classification, study results
            and financing may change the order or extend the timeline.
          </p>
          <figure className="figure d-block my-4 text-center">
            <img
              src={`${ENTRE_FIG}/roadmap-2026-2042.png`}
              alt="Proposed NEST development roadmap from 2026 to 2042, showing six phases and parallel technical, regulatory, IP, funding and commercial workstreams."
              className="figure-img img-fluid rounded"
              style={{ width: "100%" }}
              width={3840}
              height={2367}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="figure-caption">
              Figure 1 | Proposed development roadmap, 2026–2042. The six phases
              define the lead product, de-risk formulation and manufacturing,
              prepare quality and safety evidence, evaluate clinical value,
              complete regulatory review and expand only after authorization.
              Delays or failed gates shift downstream dates.
            </figcaption>
          </figure>
          <div className="table-responsive mb-4">
            <table
              className="table table-bordered align-middle"
              aria-label="NEST development phases, decision gates and resources"
            >
              <thead className="table-primary">
                <tr>
                  <th scope="col">Phase and window</th>
                  <th scope="col">Work</th>
                  <th scope="col">Stage decision condition</th>
                  <th scope="col">Required resources</th>
                </tr>
              </thead>
              <tbody>
                {TIMELINE_ROWS.map((row) => (
                  <tr key={row.phase}>
                    <td>
                      <strong>{row.phase}</strong>
                    </td>
                    <td>{row.work}</td>
                    <td>{row.gate}</td>
                    <td>{row.resources}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            IP review, financing and partner development continue throughout the
            programme. Mitochondrial delivery and other advanced modules are
            pursued as parallel research streams and cannot inherit the evidence
            or approvals of the first formulation. Facility investment follows
            validated demand and process maturity. Without a defensible financial
            model, we do not assert a break-even year or a market-share forecast.
          </p>

          <h2 id="financial-analysis">Financial analysis</h2>
          <p>
            The financial model uses the 2033 SOM as its revenue scenario and the
            cost structure above as its expenditure basis. It assumes zero
            interest, a ten-year depreciation period for fixed capital and CAPEX,
            and a 15% tax rate on gross profit after depreciation. Figures are in
            CNY thousand with the USD and EUR conversions used in the working
            sheet (about ¥6.68 per US$ and ¥7.51 per €).
          </p>
          <div className="table-responsive mb-4">
            <table
              className="table table-bordered align-middle"
              aria-label="Profit scenario for NEST at the 2033 SOM"
            >
              <thead className="table-primary">
                <tr>
                  <th scope="col">Profit item</th>
                  <th scope="col">Calculation</th>
                  <th scope="col">CNY thousand</th>
                  <th scope="col">USD thousand</th>
                  <th scope="col">EUR thousand</th>
                </tr>
              </thead>
              <tbody>
                {PROFIT_ROWS.map((row) => (
                  <tr key={row.item}>
                    <td>
                      <strong>{row.item}</strong>
                    </td>
                    <td>{row.basis}</td>
                    <td>{row.cny}</td>
                    <td>{row.usd}</td>
                    <td>{row.eur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            At the 2033 SOM of ¥368.0 million, variable and fixed operating costs
            of ¥4.80 million and ¥5.74 million give a gross profit of
            ¥357.46 million. After depreciation of ¥5.26 million and taxes of
            ¥52.83 million, net profit is ¥299.37 million. These figures
            illustrate the economics of the target scenario rather than a
            committed forecast: they depend on reaching the assumed price,
            volume and market share, and on the product obtaining the necessary
            approvals.
          </p>

          <h2 id="risk-analysis">Risk analysis</h2>
          <p>
            NEST uses a tiered risk-management approach: each risk has a
            mitigation strategy and a fallback decision, and risk assessment is
            built into stage decisions. A &ldquo;critical&rdquo; risk may affect
            project feasibility or block progress; a &ldquo;high&rdquo; risk may
            delay development, increase costs or obstruct commercialization.
            Levels are qualitative assessments of potential impact, not measured
            probabilities. Before each stage begins, quantified acceptance
            criteria define whether to continue, adjust or pause development.
          </p>
          <div className="table-responsive mb-4">
            <table
              className="table table-bordered align-middle"
              aria-label="NEST risk register"
            >
              <thead className="table-primary">
                <tr>
                  <th scope="col">Stage and priority</th>
                  <th scope="col">Risk</th>
                  <th scope="col">Mitigation and fallback decision</th>
                </tr>
              </thead>
              <tbody>
                {RISK_ROWS.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <strong>
                        {row.id} · {row.stage}
                      </strong>
                      <br />
                      {row.level}
                    </td>
                    <td>{row.risk}</td>
                    <td>{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 id="obtaining-capital">Obtaining capital</h2>
          <p>
            Capital is raised against evidence milestones rather than in a
            single financing event. The roadmap pairs each development phase
            with the funding needed to reach its next decision gate: early
            funding and development partners during definition and de-risking
            (2026–2029), clinical capital and launch partners during
            preparation, evaluation and review (2029–2037), and growth or
            reinvestment capital only after approval (2037–2042).
          </p>
          <p>
            This staged approach protects the first product when funding is
            short: facility expansion and advanced modules are deferred before
            the lead candidate is put at risk (R11). Grant applications, equity
            rounds and partner agreements will be developed milestone by
            milestone as the lead product matures; no specific grant or
            investment is assumed in this plan.
          </p>

          <h2 id="the-sustainable-business-canvas">
            The sustainable business canvas
          </h2>
          <p>
            NEST plans a staged B2B business model. In the early stage it enters
            through research collaboration and technology-development licences,
            building industry resources and validating commercial demand. After
            the necessary validation and approvals, it will supply cartilage
            repair implant materials and accompanying delivery solutions to
            clinical institutions. Target customers are mainly orthopaedic
            companies and hospitals, corresponding to co-development, technology
            licensing and clinical procurement. Patients, as end users and
            beneficiaries, may bear part of the treatment cost but are not
            direct sales targets initially. Research grants and equity financing
            support R&amp;D and commercialization and are accounted for
            separately from operating revenue from research services, licences
            and product sales.
          </p>
          <figure className="figure d-block my-4 text-center">
            <img
              src={`${ENTRE_FIG}/sustainable-business-canvas.png`}
              alt="NEST sustainable business model canvas with key partners, activities, resources, value propositions, customer relationships, channels, segments, cost structure and revenue streams."
              className="figure-img img-fluid rounded"
              style={{ width: "100%" }}
              width={3840}
              height={2015}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="figure-caption">
              Figure 2 | Proposed sustainable business model canvas. The canvas
              describes prospective roles and revenue streams; no agreements are
              assumed, and the target benefits still require validation.
            </figcaption>
          </figure>
          <div className="table-responsive mb-4">
            <table
              className="table table-bordered align-middle"
              aria-label="Sustainable business model canvas for NEST"
            >
              <thead className="table-primary">
                <tr>
                  <th scope="col">Canvas module</th>
                  <th scope="col">Proposed business model</th>
                </tr>
              </thead>
              <tbody>
                {CANVAS_ROWS.map((row) => (
                  <tr key={row.module}>
                    <td>
                      <strong>{row.module}</strong>
                    </td>
                    <td>{row.model}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Sustainability remains to be verified: we will assess production
            waste, energy, packaging and cold-chain requirements and evaluate
            affordability and accessibility with potential clinical centres.
            Biodegradability alone does not prove a lower environmental
            footprint.
          </p>

          <h2 id="market-entry">Market entry</h2>
          <p>
            NEST&rsquo;s market entry follows the sequence: validate the core
            platform, confirm the regulatory pathway, validate clinical value,
            enter lead centres, then expand indications and the product line. We
            will not combine every functional module into a complex product at
            the start. Instead, SELP-SnoopTag is the minimum viable product that
            validates the most central and reusable value of the programmable
            hydrogel platform. Early development will accumulate evidence on
            material preparation, quality control, in vitro performance,
            biocompatibility, animal studies and manufacturing scalability, and
            will keep adjusting the product definition through feedback from
            orthopaedic surgeons, hospitals and industry partners.
          </p>
          <p>
            In China, NEST must first determine its regulatory attributes and
            submission pathway before entering the clinical market. The base
            SELP-SnoopTag hydrogel and later versions with bioactive peptides,
            liposomes or mitochondrial delivery modules may differ in primary
            mode of action and risk profile, so we cannot assume that all
            versions follow the same registration route. We will first conduct a
            product-attribute, classification and risk self-assessment under the
            Medical Device Supervision and Administration Regulation and the
            Measures for the Registration and Filing Administration of Medical
            Devices [12, 13]. If the product category or the drug-device
            combination status cannot be determined, we will apply to the
            relevant NMPA body for a classification or combination-product
            attribute definition before submission. Registration preparation will
            cover product technical requirements, risk analysis, testing,
            non-clinical studies, clinical evaluation and the quality management
            system. Innovative products whose existing evidence is insufficient
            to demonstrate safety and effectiveness must also conduct clinical
            trials in accordance with the law.
          </p>
          <p>
            After the technical and clinical validation required for
            registration, we plan to work first with orthopaedic and
            sports-medicine centres experienced in cartilage repair and with
            compliant medical-product companies. A limited number of clinical
            centres will establish standardized workflows and real-world
            feedback before hospital coverage is expanded. Here we distinguish
            users from customers: patients with focal knee cartilage defects in
            China are the first target users and ultimate beneficiaries, while
            hospitals, orthopaedic surgeons, medical-device companies and
            compliant distribution channels are important participants in early
            clinical introduction, procurement and delivery. Our initial
            commercial path is therefore closer to B2B2C than direct-to-patient
            sales.
          </p>

          <h3 id="minimum-viable-product">Minimum viable product</h3>
          <p>
            A minimum viable product is the version that validates key customer
            needs and core technical assumptions with the lowest development
            complexity. For NEST, the MVP is not the final therapy carrying all
            osteoarthritis modules at once; it is the SELP-SnoopTag programmable
            hydrogel base. It consists of a recombinantly produced SELP backbone
            and predefined SnoopTag interfaces. While retaining injectability,
            in-situ gelation and basic support, it provides a standardized entry
            point for attaching different DogTag functional modules later.
          </p>
          <p>The MVP must answer five critical questions:</p>
          <ol>
            <li>
              Can SELP-SnoopTag be expressed and purified with stable yield,
              purity and batch-to-batch consistency?
            </li>
            <li>
              Can the material remain injectable under the intended conditions
              and form a structurally stable hydrogel through visible-light
              crosslinking?
            </li>
            <li>
              Can SnoopTag remain accessible after expression, purification and
              crosslinking and couple reproducibly and quantitatively to a model
              DogTag module?
            </li>
            <li>
              Do the mechanical properties, degradation behaviour,
              biocompatibility and storage stability meet the requirements for
              the next animal and preclinical studies?
            </li>
            <li>
              Can the production process be standardized and does it have the
              potential for further scale-up and unit-cost reduction?
            </li>
          </ol>
          <p>
            The value of the SELP-SnoopTag MVP is therefore not to solve every
            mechanism of cartilage degeneration at once, but to prove that the
            NEST base can be manufactured reliably, gel reliably and load
            functional modules on demand. Only after these core assumptions are
            validated will we include functional peptides or delivery components
            targeting specific pathological mechanisms in later candidates. Until
            the relevant registration approval is obtained, the MVP is used only
            for research, validation and collaborative development, not as a
            marketed product for clinical treatment.
          </p>

          <h3 id="first-potential-customers">First potential customers</h3>
          <p>
            Our first potential users are patients in China with focal knee
            cartilage defects. The location and extent of the lesion are
            relatively well defined, and the clinical need centres on restoring
            the structural integrity and load-bearing function of the defect.
            This makes the group suitable for validating in-situ filling, rapid
            gelation, wet-tissue conformity and programmable functional assembly.
            The initial target is not all patients with knee osteoarthritis, but
            the group with clear focal defects suitable for cartilage repair
            intervention, as assessed by orthopaedic or sports-medicine
            surgeons.
          </p>
          <p>
            Whether patients accept a new implant material depends not only on
            laboratory metrics but also on surgical safety, durability of
            benefit, rehabilitation time, total treatment cost and clinicians&rsquo;
            trust in handling the material. We therefore plan to continue
            interviews with patients, orthopaedic surgeons and relevant hospital
            departments during product development, incorporating clinical
            endpoints, workflow and payment acceptability into the design. The
            first market partners will be hospital departments with cartilage
            repair, sports-injury care and clinical research capabilities, along
            with medical-product companies able to support registration, quality
            and channels. In this model, patients provide real needs and user
            feedback, clinical experts help design indications and evaluation
            systems, and industry partners support compliant manufacturing and
            market access.
          </p>

          <h3 id="patenting">Patenting</h3>
          <p>
            We plan to file Chinese invention patents around the SELP-SnoopTag
            platform with the China National Intellectual Property
            Administration. Protection will focus first on technically
            implementable products and methods, such as specific SELP-SnoopTag
            molecular configurations and sequence arrangements, the loading
            method of the standardized interface, hydrogel compositions and
            preparation processes, module coupling methods and key
            performance-related parameter combinations. As the product line
            develops, we plan a layered patent portfolio around ligase
            optimization, different functional peptide modules, composite
            formulations and the accompanying operating system. Because China&rsquo;s
            Patent Law does not grant patents for diagnostic and therapeutic
            methods, claims will focus on materials, products, compositions,
            preparation methods and ligation processes rather than clinical
            treatment methods [14].
          </p>
          <p>
            Under the Patent Law, an invention must be novel, inventive and
            industrially applicable. After preliminary examination, an invention
            application is usually published 18 months from the filing date; the
            applicant must request substantive examination within three years of
            filing; and, once granted, the patent right takes effect from the
            grant announcement and lasts for 20 years from filing [14]. Before
            filing, we will conduct prior-art searches, patentability and
            freedom-to-operate analyses, confirm ownership, and design the claims
            with a professional patent agency.
          </p>
          <p>
            Disclosure timing will be built into the filing plan. China&rsquo;s
            Patent Law provides a novelty grace period of six months only for
            specific circumstances; there is no general grace period for all
            disclosures. We therefore plan to complete Chinese patent filings
            before publishing key sequences and technical details on the wiki,
            in papers, at conferences or in commercial pitches, so that public
            material does not become prior art. If we later expand overseas, we
            will evaluate the PCT or other national routes according to target
            markets and partnerships, but the first priority is to establish a
            clear, enforceable core IP boundary in China [14].
          </p>

          <h3 id="market-expansion">Market expansion</h3>
          <p>
            NEST&rsquo;s market expansion will follow two paths: expanding the
            functional product line and expanding indications.
          </p>
          <p>
            The first path is to add synthesis and production lines for more
            functional peptides as add-ons to the SELP-SnoopTag base. We will
            develop DogTag modules with different mechanisms according to
            clinical needs and establish modular quality standards, coupling
            validation and combination rules. In addition to in-house R&amp;D and
            small-scale production, we plan to work with qualified CDMOs on some
            functional peptides. This helps us compare in-house and outsourced
            cost structures, explore lower raw-material, purification and
            quality-control costs, and bring CDMO process-development and
            scale-up experience into the platform. For peptides intended for
            registered products, quality agreements, supplier audits, raw-material
            standards and traceability systems will ensure compliance with final
            product requirements. Whether the final hydrogel can be outsourced
            depends on its regulatory classification and China&rsquo;s
            restrictions on contract manufacturing of high-risk implantable
            devices; in all cases the registration holder remains legally
            responsible for product quality [12].
          </p>
          <p>
            The second path extends the hydrogel from focal knee defects to
            broader cartilage defects, including other joints and defects with
            different causes and mechanical environments. Cartilage thickness,
            loading, range of motion and repair environment differ between
            sites, so expansion is not a matter of copying the same formulation
            everywhere. Instead, SELP sequence programmability, interface
            loading density and module combination allow targeted adjustment of
            strength, degradation rate, adhesion, matrix regulation and
            delivery. In the long term, we hope to build stratified or
            personalized repair options for trauma, degeneration, inflammation,
            metabolic disorders or post-operative repair, rather than remaining
            limited to the three modules designed for osteoarthritis.
          </p>
          <p>
            Every new functional module, formulation change or expansion of
            intended use may change the product&rsquo;s risk, primary mode of
            action and registration requirements. Current Chinese regulations
            require a change registration when design, raw materials, production
            process, scope of application or method of use change in a way that
            may affect safety or effectiveness. We will therefore manage the
            platform technology and candidate products separately: share the
            underlying manufacturing and interface standards, but define clear
            product boundaries, evidence packages and registration strategies for
            each indication and functional combination, so that
            &ldquo;programmable modules&rdquo; are not mistaken for a way to
            bypass product-change requirements and clinical validation [12, 13].
          </p>

          <h2 id="skill-gap-analysis">Skill gap analysis</h2>
          <p>
            ZJU-China is a 16-member interdisciplinary team with backgrounds in
            clinical medicine, basic medicine, life sciences, bio-breeding,
            pharmacy, food science, ecology, biophysics, physics, computer
            science and philosophy. Around NEST we have built a relatively
            complete early-stage R&amp;D capability: wet-lab members cover the
            SELP scaffold and ligation system, the GAG-retention module,
            mitochondrial delivery and functional peptides; dry-lab members
            handle protein modelling, mathematical modelling, data analysis and
            software development. The team also has hardware design, product
            design, project management, human practices, financial procurement
            and visual communication capabilities. This complementary structure
            lets us move from molecular design, material construction and
            functional validation to system integration questions such as
            injection, magnetic orientation, light crosslinking and
            software-assisted operation.
          </p>
          <p>
            To judge whether the team can turn laboratory results into a
            translatable product, we reviewed existing capabilities across eight
            areas: synthetic biology and wet lab, biomaterials and delivery,
            modelling and software, hardware and system integration, medicine
            and clinical understanding, project management and external
            communication, business and financing, and intellectual property and
            industrial translation. The analysis shows that our strengths are
            concentrated in R&amp;D and prototyping, while the clearest gaps lie
            in the transition from a working prototype to a manufacturable,
            registrable and sellable product.
          </p>
          <p>
            First, we still lack systematic IP and patent-layout experience. NEST
            spans SELP sequence design, ligase optimization, modular coupling,
            magnetic nanoparticles, light crosslinking, liposomes and
            mitochondrial delivery. We need to identify original results capable
            of forming patent barriers, and to conduct prior-art searches,
            freedom-to-operate analyses, ownership confirmation and licensing
            strategy design. Second, the team needs stronger bioprocess scale-up
            and quality-management capability. <em>E. coli</em> expression, ITC
            purification, multi-module coupling, aseptic preparation and
            composite assembly all raise questions of batch consistency,
            endotoxin control, stability, storage, sterilization and release
            standards at larger scale. Third, because NEST combines a biomaterial,
            a delivery system and accompanying hardware, its product
            classification, preclinical evaluation path, long-term biosafety and
            registration requirements still need input from professionals
            experienced in medical-product translation. Finally, although the
            team has a foundation in financial procurement and project
            management, it still lacks practical experience in market
            segmentation, competitive analysis, pricing and payment, financing
            planning, business negotiation and supply-chain management.
          </p>
          <p>
            To close these gaps, we plan to combine internal development with
            external collaboration. For IP, we will seek support from the
            university technology-transfer office and patent attorneys, build a
            patent map and conduct freedom-to-operate analysis early. For
            industrialization, we will invite mentors with experience in
            recombinant protein production, sterile formulation, medical-device
            quality systems and CMC to contribute to process and quality
            standards. For clinical and regulatory work, we will build on our
            existing medical background and clinical exchanges and bring in
            orthopaedic surgeons, toxicology and regulatory experts to assess
            indication selection, animal-study endpoints, risk control and the
            regulatory pathway. For commercial work, entrepreneurship mentors,
            incubation platforms and potential industry partners will help us
            add customer discovery, market access, financing and business-model
            capabilities. Internally, targeted training, cross-group rotations
            and milestone reviews will turn external knowledge into sustainable
            organizational capability.
          </p>
          <p>
            Overall, our interdisciplinary structure is sufficient to support
            NEST&rsquo;s technical validation and prototype development, but
            productization still depends on further building IP,
            scale-manufacturing, quality-compliance, clinical-registration and
            commercial-operation capabilities. Clarifying these gaps helps us
            plan the next stage realistically: complete key technical and safety
            validation first, then gradually build a reproducible production and
            quality system, and finally form a clinically and commercially
            viable cartilage repair platform.
          </p>

          <h2 id="long-term-benefits-disadvantages">
            Long-term benefits &amp; disadvantages
          </h2>
          <h3 id="positive-impacts">Positive impacts</h3>
          <ul>
            <li>
              A durable, off-the-shelf repair option for focal cartilage defects
              could delay or reduce the need for more invasive surgery and help
              patients retain mobility and independence.
            </li>
            <li>
              One sequence-defined SELP backbone with standardized interfaces
              can carry different functions, reducing the need to develop a new
              material for every indication and supporting more consistent
              manufacturing.
            </li>
            <li>
              China-first development addresses a large East Asian patient
              population, and modular manufacturing can localize supply and
              support regional access.
            </li>
            <li>
              Evidence-gated development, with explicit safety and performance
              criteria at each stage, reduces the risk of premature clinical
              adoption and of claims outrunning the data.
            </li>
          </ul>
          <h3 id="negative-impacts">Negative impacts</h3>
          <ul>
            <li>
              Additional hardware and workflow steps increase surgical burden
              and training needs; adoption may be limited if the incremental
              benefit is not demonstrated.
            </li>
            <li>
              Payment and access are uncertain: hospitals may not accept extra
              equipment or costs, and patients may bear part of the treatment
              cost, creating a risk of inequitable access.
            </li>
            <li>
              The regulatory path is long and capital-intensive. Delays or
              clinical setbacks could exhaust funding or interrupt team
              continuity.
            </li>
            <li>
              The environmental footprint of recombinant protein production,
              cold chain, packaging and waste has not been established.
              Biodegradability does not by itself prove a lower impact.
            </li>
            <li>
              Communication risk: terms such as &ldquo;regeneration&rdquo; must
              not be used beyond what comparative evidence supports.
            </li>
          </ul>
          <h3 id="esg">ESG of NEST</h3>
          <p>
            We treat environmental, social and governance questions as part of
            development rather than as marketing claims. Planned work includes
            quantifying production waste, energy use, packaging and cold-chain
            requirements; designing for reliable supply and affordability with
            clinical partners; and maintaining quality and safety follow-up after
            approval. Where data are not yet available, we state the open
            question instead of asserting a benefit.
          </p>

          <h2 id="entrepreneurial-activities">Entrepreneurial activities</h2>
          <p>
            Beyond the business plan, the team has tested its ideas in
            entrepreneurship settings:
          </p>
          <ul>
            <li>
              A hackathon pitch and roundtable discussion, where the NEST concept
              was presented and discussed with mentors and other participants.
            </li>
            <li>
              The &ldquo;Dandelion&rdquo; Undergraduate Innovation Competition
              at Zhejiang University.
            </li>
            <li>
              The industry track of the China Synthetic Biology Innovation
              Competition.
            </li>
          </ul>
          <figure className="figure d-block my-4 text-center">
            <img
              src={`${ENTRE_FIG}/dandelion-competition-2026.jpg`}
              alt="Three team members holding a certificate at the Zhejiang University Dandelion Undergraduate Innovation Competition."
              className="figure-img img-fluid rounded"
              style={{ width: "100%" }}
              width={1706}
              height={1279}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="figure-caption">
              Figure 3 | Team members at the 18th Zhejiang University
              &ldquo;Dandelion&rdquo; Undergraduate Innovation Competition.
            </figcaption>
          </figure>

          <References level={2}>
            <div className="references-list references-list--paragraphs">
              <p>
                [1] Suwelack T, Stegemann M, Ang FX. Starting a start-up. In:{" "}
                <em>Creating a Customer Experience-Centric Startup</em>. Springer;
                2022:33–51.{" "}
                <a href="https://doi.org/10.1007/978-3-030-92458-4_3">
                  doi:10.1007/978-3-030-92458-4_3
                </a>
              </p>
              <p>
                [2] Maia Research.{" "}
                <em>
                  Global Cartilage Repair/Cartilage Regeneration Industry Trends
                  Analysis Report 2025, Forecast to 2033
                </em>
                . MarketResearch.com; 2026.{" "}
                <a href="https://www.marketresearch.com/Maia-Research-v4212/Global-Cartilage-Repair-Regeneration-Trends-44046528/">
                  Report
                </a>
              </p>
              <p>
                [3] moneychimp. <em>CAGR (Compound Annual Growth Rate) Explained</em>;
                2025.{" "}
                <a href="http://www.moneychimp.com/features/market_cagr.htm">
                  Article
                </a>
              </p>
              <p>
                [4] Chang AH, Sharma L, Roemer FW, et al. Magnetic resonance
                imaging-defined knee osteoarthritis rarely occurs without
                cartilage damage. <em>Osteoarthritis and Cartilage Open</em>.
                2026;8(1):100733.{" "}
                <a href="https://doi.org/10.1016/j.ocarto.2025.100733">
                  doi:10.1016/j.ocarto.2025.100733
                </a>
              </p>
              <p>
                [5] Li K, Liu J, Wang D, et al. Towards global integration:
                China&rsquo;s evolving role in joint replacement and sports
                medicine.{" "}
                <em>Knee Surgery, Sports Traumatology, Arthroscopy</em>.
                2026;34(5):1567–1571.{" "}
                <a href="https://doi.org/10.1002/ksa.70217">doi:10.1002/ksa.70217</a>
              </p>
              <p>
                [6] Hjelle K, Solheim E, Strand T, Muri R, Brittberg M.
                Articular cartilage defects in 1,000 knee arthroscopies.{" "}
                <em>Arthroscopy</em>. 2002;18(7):730–734.{" "}
                <a href="https://doi.org/10.1053/jars.2002.32839">
                  doi:10.1053/jars.2002.32839
                </a>
              </p>
              <p>
                [7] Klein B, McNamara I, Davis R, Mittal A, Johnson D.{" "}
                <em>
                  Techno-Economic Assessment for the Production of Hydrocarbon
                  Fuels via Catalytic Upgrading of Furans
                </em>
                . NREL/TP-5100-80652. National Renewable Energy Laboratory;
                2021.{" "}
                <a href="https://doi.org/10.2172/1819430">doi:10.2172/1819430</a>
              </p>
              <p>
                [8] Beijing Tianxing Medical Co., Ltd. Prospectus (application
                draft) for the initial public offering and listing on the STAR
                Market. Shanghai Stock Exchange; 2024.
              </p>
              <p>
                [9] Standardization Administration of China. GB 19489-2008:
                Laboratories — General requirements for biosafety. 2008.
              </p>
              <p>
                [10] Youxi County People&rsquo;s Government. Government-priced
                service fee schedule. 2022. Direct landfill disposal fee: CNY
                2.4/kg.
              </p>
              <p>
                [11] Linyi Municipal Development and Reform Commission. Catalog
                of government-priced business service charges. 2026. Medical
                waste disposal fee: CNY 3.8/kg.
              </p>
              <p>
                [12] State Council of the People&rsquo;s Republic of China.
                Regulation on the Supervision and Administration of Medical
                Devices.
              </p>
              <p>
                [13] National Medical Products Administration. Measures for the
                Registration and Filing Administration of Medical Devices.
              </p>
              <p>
                [14] Standing Committee of the National People&rsquo;s Congress.
                Patent Law of the People&rsquo;s Republic of China.
              </p>
              <p>
                [15] UpCounsel Technologies. Average royalty rates by industry:
                patent licensing and key factors; 2025.
              </p>
              <p>
                [16] Frisbie DD, Cross MW, McIlwraith CW. A comparative study of
                articular cartilage thickness in the stifle of animal species
                used in human pre-clinical studies compared to articular
                cartilage thickness in the human knee.{" "}
                <em>Veterinary and Comparative Orthopaedics and Traumatology</em>.
                2006;19(3):142–146.{" "}
                <a href="https://doi.org/10.1055/s-0038-1632990">
                  doi:10.1055/s-0038-1632990
                </a>
              </p>
              <p>
                <strong>Figure sources.</strong> Figures 1 and 2 were prepared
                by the team for this business plan. Figure 3 is a team photograph
                taken at the Zhejiang University &ldquo;Dandelion&rdquo;
                Undergraduate Innovation Competition.
              </p>
            </div>
          </References>
        </article>
      </div>
    </div>
  );
}
