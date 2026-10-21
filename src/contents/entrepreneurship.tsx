import { useId, useState, type ReactNode } from "react";
import { FigureCaption, TableCaption } from "../components/FigureCaption";
import { MathFormula } from "../components/MathFormula";
import { References } from "../components/References";
import "./entrepreneurship.css";

const ENTRE_FIG =
  "https://static.igem.wiki/teams/6102/wiki/images/hp/entrepreneurship";

type ParagraphBlock = { type: "paragraph"; source_index: number; text: string };
type HeadingBlock = {
  type: "heading";
  source_index: number;
  level: 2 | 3 | 4;
  id: string;
  text: string;
};
type ListBlock = {
  type: "list";
  source_index: number;
  items: Array<string | { formula: string; text: string }>;
};
type FormulaBlock = { type: "formula"; source_index: number; text: string };
type FigureBlock = {
  type: "figure";
  source_index: number;
  number: number;
  files: string[];
  caption: string;
  special: boolean;
  cropTopLeft?: boolean;
};
type TableBlock = {
  type: "table";
  source_index: number;
  caption: string;
  rows: string[][];
  highlightRows?: string[];
};
type CardBlock = {
  type: "card";
  source_index: number;
  title: string;
  variant?: "secondary";
  blocks: ContentBlock[];
};
type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | FormulaBlock
  | FigureBlock
  | TableBlock
  | CardBlock;

export function ExtendCard({
  title,
  children,
  headingLevel,
  headingId,
  variant = "primary",
}: {
  title: ReactNode;
  children: ReactNode;
  headingLevel?: 2 | 3;
  headingId?: string;
  variant?: "primary" | "secondary";
}) {
  const [open, setOpen] = useState(false);
  const contentId = useId();
  const cardButton = (
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
  );

  return (
    <div
      className={`entre-card${
        variant === "secondary" ? " entre-card--secondary" : ""
      }${open ? " entre-card--open" : ""}`}
    >
      {headingLevel === 2 ? (
        <h2 className="entre-card-heading" id={headingId}>
          {cardButton}
        </h2>
      ) : headingLevel === 3 ? (
        <h3 className="entre-card-heading" id={headingId}>
          {cardButton}
        </h3>
      ) : (
        cardButton
      )}
      <div className="entre-card-content" id={contentId}>
        <div className="entre-card-content-inner">
          <div className="entre-card-pad">{children}</div>
        </div>
      </div>
    </div>
  );
}

const JUDGING_CRITERIA = [
  {
    title:
      "Has the team discovered their first potential customers and identified any unmet needs not yet covered by other existing solutions?",
    paragraphs: [
      "Our business model is B2B. Our first potential customers are medical device companies, research hospitals, and regenerative medicine translational institutions in China. Our initial end users are at least 240,000 new patients with knee cartilage injuries each year in China. Hospitals and companies are the primary purchasers and partners, while patients are the ultimate beneficiaries. We have established preliminary contacts with Weixinkang, Lanyiwei, Yuanyi Bio, Shanghai Lingjiu, and other companies.",
      "Existing cartilage hydrogels generally use fixed formulations, making it difficult to adjust mechanical properties, degradation rates, and biological functions for different defects. Complex formulations may also complicate quality control and scalable manufacturing. Through a programmable SELP scaffold and standardized functional interfaces, NEST aims to provide a cartilage-repair platform that can be customized, manufactured consistently, and continuously expanded.",
    ],
  },
  {
    title:
      "Has the team shown that their solution is possible, scalable and inventive?",
    paragraphs: [
      "Our current results demonstrate the feasibility of our approach. NEST's minimum viable product is the SELP–SnoopTag2 hydrogel. We have completed preliminary SELP production and lyophilization in the laboratory and evaluated its mechanical properties. SnoopTag2 serves as a standardized interface for attaching functional peptides, enabling different modules to be assembled onto the same platform. Experiments also demonstrated the introduction of different functional peptides through this interface. In addition, our CCK-8 assay indicated that the product was harmless to cells.",
      "NEST's innovation lies in combining sequence-programmable SELP, whose composition can be tuned to match different tissues, with a modular protein-conjugation interface. This offers potential applications across tissues, including ocular surface repair and breast reconstruction, as well as across injury sites and etiologies within the same tissue, providing substantial extensibility and innovation.",
    ],
  },
  {
    title:
      "Has the team presented logical product development plans with realistic milestones, timelines, resources and risks?",
    paragraphs: [
      "We have developed a staged product-development plan with milestones from 2026 to 2042. We will first select a lead candidate, optimize the material and manufacturing process, complete nonclinical and aseptic-production validation, and then proceed to clinical studies, regulatory review, and market expansion. Each stage has defined decision criteria and resource requirements. The project will advance only when safety, performance, manufacturing, and funding meet the predetermined requirements.",
      "We have also prepared a timeline, preliminary cost budget, ten-year cash-flow analysis, and phased fundraising plan. Major risks relating to technical safety, manufacturing scale-up, sterile storage, regulatory registration, clinical adoption, intellectual property, and funding have been systematically assessed. Required resources are detailed in the cost-analysis tables.",
    ],
  },
  {
    title:
      "Has the team outlined the skills, capabilities, and stakeholders required to be credible in developing their solution further?",
    paragraphs: [
      "We have identified the skills, capabilities, and stakeholders needed for the next development stage. NEST consists of 16 members from different disciplines and has early-stage capabilities in experimental validation and commercial research. We recognize gaps in intellectual property, medical-device registration, financing, and marketing, and plan to address them through training and collaboration with patent agencies, investment advisors, and industry partners.",
      "We have also identified and contacted external stakeholders to support the further development of NEST. A detailed list is available on our Stakeholder Engagement page.",
    ],
  },
  {
    title:
      "Has the team considered the positive and negative long-term impacts of their fully developed solution?",
    paragraphs: [
      "We have considered both positive and negative long-term impacts. NEST's long-term goal is to facilitate cartilage repair, alleviate pain and restricted mobility, and reduce the medical, economic, and quality-of-life burdens of cartilage disorders. Its modular design could also help researchers connect new functional peptides, investigate repair mechanisms, and develop additional indications, supporting continued innovation in cartilage regeneration and potentially creating wider value in regenerative medicine.",
      "At the same time, NEST has not yet completed clinical trials, and additional studies and long-term safety assessments are required. Public understanding of synthetic biology, engineered-microbe production, and protein hydrogels may also affect trust and access. We plan to narrow the gap between technical principles and public understanding by sharing research data, communicating science accessibly, and strengthening physician–patient communication.",
    ],
  },
];

const CONTENT: ContentBlock[] = [
  {
    "type": "heading",
    "source_index": 25,
    "level": 2,
    "id": "background",
    "text": "Background"
  },
  {
    "type": "paragraph",
    "source_index": 26,
    "text": "Articular cartilage supports everyday activities such as walking, running, and climbing stairs, yet it is almost avascular and has very limited self-repair capacity. Sports injuries, persistent abnormal loading, and age-related degeneration may damage cartilage and eventually cause pain, stiffness, and restricted mobility. Approximately 635.4 million people worldwide had osteoarthritis in 2023. For many patients, cartilage damage means not only physical pain but also a gradual loss of the ability to exercise, work, and live independently."
  },
  {
    "type": "paragraph",
    "source_index": 27,
    "text": "Conventional treatments can relieve symptoms, repair some defects, or restore joint function, but they still struggle to regenerate durable native hyaline cartilage. Hydrogels offer promise because of their high water content, injectability, and ability to conform to irregular defects. However, once inside the joint, they must withstand repeated loading, adhere to wet tissue, counter ongoing matrix degradation, and address cellular dysfunction. Increasing functional complexity also raises challenges in manufacturing consistency, quality control, and clinical translation. Cartilage repair therefore needs more than another hydrogel with a fixed formulation: it needs a material platform capable of tuning properties, combining functions, and being manufactured reproducibly for different injuries."
  },
  {
    "type": "paragraph",
    "source_index": 28,
    "text": "NEST, developed by our proposed company NexCode Biotechnologies, is a programmable, modular protein-hydrogel platform intended to provide customizable, scalable, and readily standardized repair solutions for different cartilage injuries."
  },
  {
    "type": "heading",
    "source_index": 29,
    "level": 2,
    "id": "about-nexcode-and-nest",
    "text": "About NexCode & NEST"
  },
  {
    "type": "paragraph",
    "source_index": 31,
    "text": "We envision NexCode Biotechnologies as a biotechnology company specializing in programmable hydrogel platforms. Our flagship project is NEST. Just as a bird's nest provides support and protection adapted to its environment, NEST aims to create a supportive niche for damaged cartilage to regenerate using programmable protein materials."
  },
  {
    "type": "paragraph",
    "source_index": 32,
    "text": "At the heart of NEST is a modular hydrogel platform based on silk-elastin-like proteins (SELPs). By designing the gene sequence, we can tune mechanical properties, elasticity, tissue interactions, and degradation characteristics. After injection into the defect, visible-light-induced in situ crosslinking allows the material to conform to cartilage defects of different shapes, potentially supporting repair before gradually degrading. Standardized protein-conjugation interfaces allow functional modules to be assembled on demand, enabling one scaffold to address different needs."
  },
  {
    "type": "paragraph",
    "source_index": 33,
    "text": "For commercialization, NexCode Bio plans a B2B partnership model targeting medical-device companies, research hospitals, and regenerative medicine translational institutions, providing customizable protein-hydrogel formulations, functional modules, and associated preparation and delivery solutions. We will initially focus on osteoarthritis-associated cartilage damage, gradually advancing material validation, standardized production, and preclinical development before expanding to other joints, disease stages, and repair objectives. Compared with developing a new material for each indication, NEST's platform approach may shorten development cycles, improve manufacturing consistency, and support an expanding product pipeline."
  },
  {
    "type": "heading",
    "source_index": 34,
    "level": 2,
    "id": "market-size-analysis",
    "text": "Market Size Analysis"
  },
  {
    "type": "paragraph",
    "source_index": 35,
    "text": "The purpose of this market analysis is to demonstrate that NEST addresses a substantial, growing, and underserved medical market. We apply the total addressable market (TAM), serviceable available market (SAM), and serviceable obtainable market (SOM) framework to narrow our focus from the global cartilage-repair industry to the Chinese knee-cartilage-repair market targeted for NEST's initial entry."
  },
  {
    "type": "card",
    "source_index": 36,
    "title": "Total Addressable Market (TAM)",
    "blocks": [
      {
        "type": "paragraph",
        "source_index": 37,
        "text": "The total addressable market (TAM) is the total market size for a particular product or service [1]."
      },
      {
        "type": "paragraph",
        "source_index": 38,
        "text": "For NEST, TAM is not limited to the knee or sports injuries. It encompasses the global repair market for cartilage defects of different causes and in different joints, including:"
      },
      {
        "type": "list",
        "source_index": 39,
        "items": [
          "Cartilage defects in the knee, ankle, hip, shoulder, elbow, and other joints;",
          "Focal cartilage defects caused by sports injuries and trauma;",
          "Degenerative cartilage damage associated with osteoarthritis;",
          "Osteochondral injuries and other conditions requiring cartilage regeneration;",
          "Different treatment technologies, including cell transplantation, tissue scaffolds, growth factors, and cell-free repair materials."
        ]
      },
      {
        "type": "paragraph",
        "source_index": 44,
        "text": "A commercial market report estimated the global cartilage repair and regeneration market at approximately USD 1.18907 billion in 2025, rising to USD 3.22206 billion by 2033, with a compound annual growth rate (CAGR) of approximately 13.27% for 2025–2033 [3]. CAGR measures market performance over a specified period and provides an indication of future prospects. This CAGR exceeds the approximately 10% long-run average annual return of the S&P 500, suggesting strong market growth potential [2]. Increasing osteoarthritis burden, wider use of arthroscopic techniques, and advances in regenerative medicine are major growth drivers."
      }
    ]
  },
  {
    "type": "card",
    "source_index": 47,
    "title": "Serviceable Available Market (SAM)",
    "blocks": [
      {
        "type": "paragraph",
        "source_index": 48,
        "text": "The serviceable available market (SAM) is the share of a market that a company can address through its business model [1]. The target market is a key factor in defining SAM. We use an SPA canvas below to identify which market the company should initially prioritize. We assess segments by their current size, future potential, and accessibility, and weight these factors by relative importance. Accessibility receives the highest weighting because our business must be able to enter the market. Market size ranks second because it indicates the number of potential customers, while market potential receives the lowest weighting."
      },
      {
        "type": "table",
        "source_index": 49,
        "caption": "Table 1 | Weighted comparison of cartilage-repair market size, potential, and accessibility across East Asia, Europe, high-income Asia-Pacific, and other regions.",
        "highlightRows": ["East Asia"],
        "rows": [
          [
            "Market region",
            "2023 market size (iii)",
            "Market size score (×2)",
            "2033 market potential (iv)",
            "Market potential score (×1)",
            "Accessibility score (×4) (v)",
            "Weighted score"
          ],
          [
            "East Asia",
            "167.31αP",
            "10",
            "581.68αP",
            "10",
            "7",
            "8.29"
          ],
          [
            "Europe",
            "103.83αP",
            "6",
            "360.96αP",
            "6",
            "3",
            "4.29"
          ],
          [
            "High-income Asia-Pacific (ii)",
            "35.08αP",
            "2",
            "121.97αP",
            "2",
            "5",
            "3.71"
          ],
          [
            "High-income North America (i)",
            "51.63αP",
            "3",
            "179.50αP",
            "3",
            "2",
            "2.43"
          ],
          [
            "Latin America and Caribbean",
            "56.57αP",
            "3",
            "196.66αP",
            "3",
            "1",
            "1.86"
          ],
          [
            "Middle East and Africa",
            "66.85αP",
            "4",
            "232.40αP",
            "4",
            "2",
            "2.86"
          ],
          [
            "South Asia",
            "100.92αP",
            "6",
            "350.87αP",
            "6",
            "4",
            "4.86"
          ],
          [
            "Southeast Asia",
            "42.02αP",
            "3",
            "146.08αP",
            "3",
            "6",
            "4.71"
          ]
        ]
      },
      {
        "type": "paragraph",
        "source_index": 52,
        "text": "i. United States, Canada, and Greenland (GBD high-income North America region)."
      },
      {
        "type": "paragraph",
        "source_index": 53,
        "text": "ii. Japan, South Korea, Singapore, and Brunei (GBD high-income Asia-Pacific region)."
      },
      {
        "type": "paragraph",
        "source_index": 54,
        "text": "iii. Estimated from GBD 2023 regional osteoarthritis prevalence; α denotes the conversion coefficient from osteoarthritis patient counts to the cartilage-repair market, and P denotes average treatment price. Patient counts are expressed in millions."
      },
      {
        "type": "paragraph",
        "source_index": 55,
        "text": "iv. Market potential in 2033 assuming a CAGR of 13.27%."
      },
      {
        "type": "paragraph",
        "source_index": 56,
        "text": "v. Preliminary assessment based on team location, existing clinical and research networks, geographic distance, familiarity with regulation, and difficulty establishing business partnerships."
      },
      {
        "type": "paragraph",
        "source_index": 58,
        "text": "The SPA results place East Asia first in current patient population, future market potential, and accessibility, making it NEST's initial serviceable market. South Asia appears suitable as a secondary target, although we will remain focused on East Asia for the foreseeable future."
      },
      {
        "type": "paragraph",
        "source_index": 59,
        "text": "According to GBD 2023, approximately 635.4 million people worldwide had osteoarthritis in 2023. East Asia had the largest regional patient population, approximately 167 million, representing 26.33% of the global total. MRI studies indicate that approximately 98.5%–99.6% of MRI-defined knee osteoarthritis cases involve partial- or full-thickness cartilage damage. The cartilage-repair field is therefore far from a niche market. We project capturing 15% of this market by 2033, producing a SAM of USD 483.31 million (approximately EUR 430 million) [4]."
      }
    ]
  },
  {
    "type": "card",
    "source_index": 62,
    "title": "Serviceable Obtainable Market (SOM)",
    "blocks": [
      {
        "type": "paragraph",
        "source_index": 63,
        "text": "The serviceable obtainable market (SOM) is the portion of the SAM that a company can realistically capture [1]. Our location in China is advantageous because its large population represents a substantial share of East Asia. As knee procedures account for more than 60% of arthroscopic surgery, NEST's first-generation product will initially target focal knee-cartilage defects [6]. Studies indicate that approximately 19% of knee arthroscopy patients have focal cartilage or osteochondral defects [5]. Therefore, our projected 2033 SOM is USD 483.31 million × 60% × 19% = USD 55.10 million (approximately EUR 48.96 million)."
      },
      {
        "type": "paragraph",
        "source_index": 64,
        "text": "This initial revenue could support extending the hydrogel to additional cartilage-defect sites and causes. We also intend to expand programmable hydrogels across other East Asian markets, supporting our annual objectives."
      },
      {
        "type": "figure",
        "source_index": 65,
        "number": 1,
        "files": [
          "001.avif"
        ],
        "caption": "Figure 1 | Projected sizes of NEST's serviceable available market (SAM) and serviceable obtainable market (SOM).",
        "special": true,
        "cropTopLeft": true
      }
    ]
  },
  {
    "type": "heading",
    "source_index": 67,
    "level": 2,
    "id": "competitor-analysis",
    "text": "Competitor Analysis"
  },
  {
    "type": "paragraph",
    "source_index": 68,
    "text": "NEST faces three categories of competitors in cartilage repair: direct competitors using alternative materials or technologies to meet similar clinical needs; substitute treatments competing for patients, clinical resources, and healthcare budgets within the same care pathway; and platform companies with relevant capabilities that could enter the cartilage-repair market. The representative organizations below are compared by product positioning, technical approach, and commercialization progress. Regulatory clearance and commercial availability are assessed separately by target region; overseas approval does not imply market authorization in China."
  },
  {
    "type": "card",
    "source_index": 69,
    "title": "Domestic Organizations",
    "blocks": [
      {
        "type": "table",
        "source_index": 70,
        "caption": "Table 2 | Chinese cartilage-repair companies, technology platforms, publicly reported progress, and implications for NEST.",
        "rows": [
          [
            "Organization and product",
            "Technology and publicly reported progress",
            "Implications for NEST"
          ],
          [
            "Sichuan Baiamon Bioactive Materials Co., Ltd.ChinaCartilage-inductive collagen hydrogel/collagen-based cartilage repair matrixDirect product under development",
            "Develops tissue-inductive biomaterials, including collagen hydrogels for cartilage repair.Its website described progress relating to the special review procedure for innovative medical devices in 2021; the product has not yet received marketing approval.",
            "A closely relevant domestic biomaterials comparator. NEST must demonstrate the value of programmable scaffolds and controllable interfaces."
          ],
          [
            "Shanghai Ruanxin Biotechnology Co., Ltd.ChinaTissue-engineered living cartilageAlternative regenerative treatment",
            "Develops living cartilage and bone tissue through an autologous tissue-engineering platform associated with the National Engineering Research Center for Tissue Engineering. Public information describes the platform and cartilage projects but does not indicate marketing approval.",
            "Competes through biological tissue reconstruction. NEST proposes a standardized materials approach for its first candidate; its clinical value remains to be established."
          ],
          [
            "Haohai Biological TechnologyChinaIntra-articular sodium hyaluronate and medical chitosan productsIndirect treatment competitor",
            "Has an established orthopedic business offering intra-articular viscosupplementation, a familiar injectable option for osteoarthritis symptom management. Company reports list marketed orthopedic products.",
            "Competes for treatment budgets and clinical attention. Symptom management and focal-defect repair have different treatment objectives and patient populations."
          ],
          [
            "Shanghai Funing Technology Co., Ltd.ChinaThermogel injectable hydrogel platformPotential platform entrant",
            "Founded through Fudan University technology transfer; develops thermoresponsive PLGA–PEG materials for delivery and tissue-related applications. Fudan information describes its injectable platform but does not establish an approved cartilage-repair product.",
            "Formulation expertise in an adjacent field could support future market entry or collaboration. Specific indications should be monitored without treating the company as an existing direct competitor."
          ]
        ]
      }
    ]
  },
  {
    "type": "card",
    "source_index": 72,
    "title": "International Organizations",
    "blocks": [
      {
        "type": "table",
        "source_index": 73,
        "caption": "Table 3 | Representative international cartilage-repair products, technological approaches, market status, and competitive positioning.",
        "rows": [
          [
            "Organization and product",
            "Technology and publicly reported progress",
            "Implications for NEST"
          ],
          [
            "Regentis BiomaterialsIsraelGelrinCDirect hydrogel competitor",
            "A cell-free PEG-DA/denatured fibrinogen implant delivered as a liquid and crosslinked in situ under UVA for focal cartilage defects. The company reports a European CE mark and commercialization preparations; US information indicates investigational use.",
            "The most closely comparable in situ photocuring approach. NEST must demonstrate whether sequence programming and modular assembly yield clinically meaningful performance improvements."
          ],
          [
            "meidrix biomedicalsGermanyChondroFiller liquidDirect hydrogel competitor",
            "A cell-free type I collagen matrix supplied in a dual-chamber syringe and designed to gel inside cartilage defects. The manufacturer reports CE certification and commercialization since 2013.",
            "Provides a practical benchmark for convenience, defect conformity, and ready-to-use delivery. NEST must justify any additional hardware within the clinical workflow."
          ],
          [
            "Smith+Nephew / CartiHealUnited Kingdom / technology originating in IsraelCARTIHEAL AGILI-CDirect repair implant competitor",
            "A porous, resorbable aragonite-based scaffold for knee cartilage and osteochondral defects, implanted in one surgical procedure. FDA-approved and commercially supplied in the United States for the indicated population, including patients without severe osteoarthritis.",
            "An established implant benchmark. Beyond material innovation, NEST must demonstrate tissue integration, durability, and patient benefit."
          ],
          [
            "VericelUnited StatesMACIAlternative regenerative treatment",
            "Autologous expanded chondrocytes are seeded onto a porcine collagen membrane to repair symptomatic full-thickness knee cartilage defects in adults. FDA-approved for its indicated knee applications; severe knee osteoarthritis is a contraindication.",
            "An established cellular therapy comparator with different production and clinical procedures. Without comparative evidence, NEST cannot claim equivalent regeneration."
          ],
          [
            "Geistlich PharmaSwitzerlandChondro-Gide / AMICDirect scaffold competitor",
            "A bilayer collagen membrane for cartilage repair that can be used with matrix-assisted bone-marrow stimulation. Manufacturer product and intended-use information describe this commercialized membrane.",
            "A scaffold-based comparator. NEST must demonstrate added clinical benefit and acceptable surgical costs for its injectable format and functional modules."
          ]
        ]
      }
    ]
  },
  {
    "type": "card",
    "source_index": 75,
    "title": "Competitive Positioning",
    "blocks": [
      {
        "type": "paragraph",
        "source_index": 76,
        "text": "Our intended differentiation lies in the sequence-defined SELP scaffold and standardized functional interfaces that can be validated independently. Existing products already share some features, so injectability, biodegradability, or a single-procedure workflow alone are insufficient to establish an advantage. More meaningful metrics include scaffold retention and tissue integration, batch reproducibility, repair durability, surgical burden, and total treatment cost. NEST has identified promising directions, but any competitive advantage still requires further technical evidence."
      }
    ]
  },
  {
    "type": "heading",
    "source_index": 77,
    "level": 2,
    "id": "cost-analysis",
    "text": "Cost Analysis"
  },
  {
    "type": "paragraph",
    "source_index": 79,
    "text": "We have outlined how our innovative solution addresses unmet needs and a potential market despite direct and indirect competitors. We now turn to the financial aspects of the business. We divide costs into initial capital investment, annual operating expenses, and annual capital expenditure. Capital costs are classified and estimated using the NREL techno-economic assessment framework for biorefinery processes [7]. We also reviewed relevant literature and drew on Professor Erik Forsberg's technology entrepreneurship course to refine our estimates. Consistent with common financial-analysis practice, many costs are estimated as percentages of other costs."
  },
  {
    "type": "figure",
    "source_index": 80,
    "number": 2,
    "files": [
      "002-01.avif",
      "002-2.avif",
      "002-3.avif"
    ],
    "caption": "Figure 2 | Classification, estimation basis, and budget summary for NEST's initial capital investment, annual operating expenses, and annual capital expenditure.",
    "special": true,
    "cropTopLeft": true
  },
  {
    "type": "card",
    "source_index": 84,
    "title": "1 Initial Capital Investment",
    "blocks": [
      {
        "type": "paragraph",
        "source_index": 85,
        "text": "Investment costs comprise all spending needed to obtain an operational manufacturing facility, including R&D expenditure. They therefore represent the amount of funding to be raised. Investment costs are divided into purchase costs (PC), direct costs (DC), indirect costs (IC), and other costs (OC), along with start-up and validation costs and working capital for the first months of operation. PC, DC, IC, and OC together constitute fixed capital costs (FC)."
      },
      {
        "type": "paragraph",
        "source_index": 86,
        "text": "Because investment costs are calculated as percentages of major equipment costs, we must first determine how much SELP must be produced to serve the initial target market and reach our SOM revenue target."
      },
      {
        "type": "heading",
        "source_index": 87,
        "level": 4,
        "id": "1-1-fixed-capital-investment",
        "text": "1.1 Fixed Capital Investment"
      },
      {
        "type": "heading",
        "source_index": 88,
        "level": 4,
        "id": "purchase-costs",
        "text": "Purchase Costs"
      },
      {
        "type": "list",
        "source_index": 89,
        "items": [
          "Major Equipment Cost (MEC): Cost of purchasing primary equipment, such as bioreactors, mixing systems, and lyophilizers.",
          "Unlisted Equipment Cost: Cost of necessary equipment not individually listed in the main equipment inventory."
        ]
      },
      {
        "type": "heading",
        "source_index": 91,
        "level": 4,
        "id": "direct-costs",
        "text": "Direct Costs"
      },
      {
        "type": "list",
        "source_index": 92,
        "items": [
          "Installation Cost: Cost of positioning, installing, securing, and commissioning equipment.",
          "Piping and Insulation Costs: Cost of pipes connecting equipment into a complete production system and insulation required to maintain appropriate process conditions.",
          "Electrical Cost: Cost of power distribution networks for manufacturing facilities.",
          "Control System Cost: Cost of automated process control, monitoring, and instrumentation systems.",
          "Building Cost: Cost of factory buildings and their foundations.",
          "Land Improvement Cost: Cost of grading, preparing, and improving the site for construction.",
          "Auxiliary Facilities Cost: Cost of supporting facilities such as warehouses and cooling towers."
        ]
      },
      {
        "type": "heading",
        "source_index": 99,
        "level": 4,
        "id": "indirect-costs",
        "text": "Indirect Costs"
      },
      {
        "type": "list",
        "source_index": 100,
        "items": [
          "Engineering Cost: Cost of design, planning, and technical preparation for manufacturing facilities.",
          "Construction Management Cost: Cost of coordinating and managing facility construction.",
          "Contingency Cost: Funds reserved for unexpected and unforeseen construction expenses.",
          "Contractor's Fee: Payment for construction services supplied by external contractors."
        ]
      },
      {
        "type": "heading",
        "source_index": 104,
        "level": 4,
        "id": "other-costs",
        "text": "Other Costs"
      },
      {
        "type": "list",
        "source_index": 105,
        "items": [
          "Start-up and Validation: Costs of facility start-up, process commissioning, product development, validation, and initial promotion."
        ]
      },
      {
        "type": "heading",
        "source_index": 106,
        "level": 4,
        "id": "1-2-land-acquisition-cost",
        "text": "1.2 Land Acquisition Cost"
      },
      {
        "type": "paragraph",
        "source_index": 107,
        "text": "Land cost is a one-time capital expense incurred to secure the site for manufacturing facilities, including land purchase, leasehold acquisition, and related transaction costs. Under the NREL classification, land cost is accounted for separately from fixed capital investment (FCI) and included in total capital investment (TCI) together with fixed capital and working capital. Land itself is generally not depreciated; grading, roads, and drainage are direct construction costs rather than land acquisition costs."
      },
      {
        "type": "heading",
        "source_index": 108,
        "level": 4,
        "id": "1-3-working-capital",
        "text": "1.3 Working Capital"
      },
      {
        "type": "paragraph",
        "source_index": 109,
        "text": "Working capital (WC) is the amount of circulating funding continuously required for routine operations after a facility begins production. It differs from annual operating expenses (OPEX), which represent costs actually incurred during a year, such as raw materials, labor, utilities, and transport. WC primarily supports inventories, operating cash, and outstanding receivables."
      },
      {
        "type": "card",
        "source_index": 110,
        "title": "Major Equipment Costs",
        "variant": "secondary",
        "blocks": [
          {
            "type": "paragraph",
            "source_index": 111,
            "text": "To estimate equipment requirements for the first-generation NEST product, we calculate annual output from the target patient population. Approximately 2.183 million sports-medicine arthroscopic procedures are projected in China for 2026 [9], of which around 60% involve the knee [6]. Approximately 19% of knee arthroscopy patients have focal cartilage or osteochondral defects [5], yielding an initial target population of approximately 248,900 patients per year. The mean defect area is about 2.1 cm² [5], and human knee cartilage thickness is around 2.2–2.5 mm [8]. At 2.5 mm, each patient would require approximately 0.525 mL of hydrogel. At 10% (w/v) SELP, this corresponds to 52.5 mg SELP per treatment or approximately 13,070 g annually. Allowing a further 20% for process losses and safety margin gives an annual production target of approximately 15,680 g. Based on our experimental yield of approximately 0.5 g SELP per liter of culture, annual culture volume would be approximately 31,360 L. At 100 batches per year, each batch would require about 314 L. We therefore envisage a 500 L-scale bioreactor supported by a media preparation tank, centrifuge, high-pressure homogenizer, temperature-controlled purification tank, filtration and endotoxin-removal systems, lyophilizer, aseptic filling equipment, and quality-control instruments."
          },
          {
            "type": "paragraph",
            "source_index": 112,
            "text": "With input from Beijing Weixinkang Medical Co., Ltd., we estimate major equipment costs for first-generation NEST at CNY 7.45 million (approximately USD 1.115 million or EUR 991,600)."
          }
        ]
      }
    ]
  },
  {
    "type": "card",
    "source_index": 115,
    "title": "2 Annual Operating Expenses (OPEX)",
    "blocks": [
      {
        "type": "paragraph",
        "source_index": 116,
        "text": "These are costs incurred to sustain manufacturing after the facility begins operation. On an annual basis, OPEX normally includes raw materials, media and reagents, utilities, labor, equipment maintenance, quality testing, and waste treatment."
      },
      {
        "type": "paragraph",
        "source_index": 117,
        "text": "Production costs are divided into variable and fixed costs. Variable costs increase with output, whereas fixed costs do not directly depend on production volume."
      },
      {
        "type": "paragraph",
        "source_index": 118,
        "text": "The following section briefly introduces all production cost categories before discussing selected expenses in greater detail."
      },
      {
        "type": "heading",
        "source_index": 119,
        "level": 4,
        "id": "2-1-variable-operating-costs-voc",
        "text": "2.1 Variable Operating Costs (VOC)"
      },
      {
        "type": "list",
        "source_index": 120,
        "items": [
          "Raw Material Cost: Cost of raw materials, culture media, reagents, and other consumable inputs.",
          "Utilities Cost: Cost of water, electricity, steam, compressed air, cooling, and other utilities needed for production.",
          "Direct Labor Cost: Wages and associated employment costs of staff directly involved in manufacturing, monitoring, and on-site operations.",
          "Consumables Cost: Cost of disposable or regularly replaced filters, single-use tubing, gloves, and laboratory supplies.",
          "Waste Treatment and Disposal Cost: Cost of collecting, deactivating, transporting, and compliantly disposing of production wastewater, waste materials, and other waste.",
          "Transportation and Logistics Cost: Cost of inbound materials transport, product storage and distribution, packaging, and logistics management.",
          "Quality Control Cost: Cost of testing raw materials, intermediates, and finished products against quality specifications.",
          "Royalties: Payments for the licensed use of third-party patents, technologies, or other intellectual property."
        ]
      },
      {
        "type": "heading",
        "source_index": 129,
        "level": 4,
        "id": "2-2-fixed-operating-costs-foc",
        "text": "2.2 Fixed Operating Costs (FOC)"
      },
      {
        "type": "list",
        "source_index": 130,
        "items": [
          "Research and Development Cost (R&D): Cost of improving products, formulations, and manufacturing processes, as well as conducting associated research.",
          "Marketing Cost: Cost of product promotion, customer relationship management, and sales activities.",
          "Maintenance Cost: Cost of regular inspection, servicing, repair, and replacement of equipment and facility components.",
          "Insurance Cost: Cost of insurance, including product liability policies covering risks after market launch."
        ]
      },
      {
        "type": "card",
        "source_index": 134,
        "title": "Material Costs",
        "variant": "secondary",
        "blocks": [
          {
            "type": "paragraph",
            "source_index": 135,
            "text": "NEST produces SELP using <em>E. coli</em> BL21(DE3) carrying an SELP expression plasmid, with standard LB broth used at laboratory scale. Because the resulting SELP will be formulated into a hydrogel for implantation in humans, we currently favor consistent, traceable culture-media ingredients rather than waste-stream feedstocks. This also aligns with medical-device requirements for supplier qualification and raw-material traceability [10]."
          },
          {
            "type": "paragraph",
            "source_index": 136,
            "text": "LB Miller medium contains 10 g tryptone, 5 g yeast extract, and 10 g sodium chloride per liter [11]. At an annual culture volume of 31,360 L, NEST would require approximately 313.6 kg tryptone, 156.8 kg yeast extract, and 313.6 kg sodium chloride each year."
          },
          {
            "type": "paragraph",
            "source_index": 137,
            "text": "Based on publicly available catalogue prices from suppliers in China, the annual purchasing cost of these three main LB components is approximately CNY 290,700 [12, 13]."
          },
          {
            "type": "paragraph",
            "source_index": 138,
            "text": "In addition to the base medium, approximately 7.47 kg IPTG and 1.57 kg kanamycin are required annually. SELP purification also requires PBS and sodium chloride for inverse transition cycling (ITC); final hydrogel formulation requires Ru/SPS crosslinking components. Including CNY 291,500 per year for syringe hardware consumables (500 units), estimated annual raw material costs are CNY 810,500 (approximately USD 130,100 or EUR 115,900)."
          }
        ]
      },
      {
        "type": "card",
        "source_index": 142,
        "title": "Direct Labor Cost",
        "variant": "secondary",
        "blocks": [
          {
            "type": "paragraph",
            "source_index": 143,
            "text": "The annual direct labor cost of company operations can be expressed as:"
          },
      {
        "type": "formula",
        "source_index": 144,
        "text": "C_{\\mathrm{labor}} = \\sum_k F_{\\mathrm{labor},k} \\, c_{\\mathrm{labor},k} \\, h_{\\mathrm{operation},k}"
      },
      {
        "type": "paragraph",
        "source_index": 145,
        "text": "where:"
      },
      {
        "type": "list",
        "source_index": 146,
        "items": [
          {
            "formula": "k",
            "text": "a specific manufacturing operation;"
          },
          {
            "formula": "F_{\\mathrm{labor},k}",
            "text": "labor-hours required per hour of operation k;"
          },
          {
            "formula": "c_{\\mathrm{labor},k}",
            "text": "the fully loaded hourly labor cost for operation k;"
          },
          {
            "formula": "h_{\\mathrm{operation},k}",
            "text": "annual operating hours for operation k;"
          },
          {
            "formula": "C_{\\mathrm{labor}}",
            "text": "annual direct labor cost."
          }
        ]
      },
      {
        "type": "paragraph",
        "source_index": 152,
        "text": "The following table lists the operations required in our production process and the corresponding labor input per operating hour:"
      },
      {
        "type": "table",
        "source_index": 153,
        "caption": "Table 4 | Estimated labor input coefficients and ranges for each operation in the NEST manufacturing process.",
        "rows": [
          [
            "Operation / process",
            "F_labor"
          ],
          [
            "Batch fermentation",
            "0.3–2.0"
          ],
          [
            "Cell harvesting and clarification",
            "0.1–0.2"
          ],
          [
            "ITC purification and TFF concentration",
            "0.2–0.5"
          ],
          [
            "SELP formulation, aseptic filling, and lyophilization",
            "0.3–0.6"
          ],
          [
            "Cleaning and decontamination",
            "0.1–0.2"
          ],
          [
            "Total",
            "1.0–3.5"
          ]
        ]
      },
      {
        "type": "paragraph",
        "source_index": 155,
        "text": "Accounting for night-shift wages, the equation becomes:"
      },
      {
        "type": "formula",
        "source_index": 156,
        "text": "C_{\\mathrm{production}} = \\sum_k F_k \\, c_k \\, h_{k,d} + \\sum_k F_k \\, c_k (1+r_n) h_{k,n}"
      },
      {
        "type": "paragraph",
        "source_index": 157,
        "text": "where h_k,d and h_k,n denote daytime and nighttime operating hours, respectively, and r_n denotes the night-shift wage premium."
      },
      {
        "type": "paragraph",
        "source_index": 158,
        "text": "Recruitment advertisements for biomanufacturing operators in Zhejiang indicate monthly salaries of approximately CNY 6,000–8,000. We conservatively use the upper bound of CNY 8,000 per month. To account for employer contributions to pension, healthcare, maternity, unemployment, work injury insurance, and the housing provident fund, we provisionally add 35% to base wages. Assuming 174 standard working hours per month, the hourly labor cost is:"
      },
      {
        "type": "formula",
        "source_index": 159,
        "text": "c_{\\mathrm{labor}} = \\frac{8{,}000 \\times 1.35}{174} = 62.07 \\; \\mathrm{CNY/hour}"
      },
      {
        "type": "paragraph",
        "source_index": 160,
        "text": "For the preliminary calculation, we use the upper bound of labor intensity for each manufacturing operation, giving:"
      },
      {
        "type": "formula",
        "source_index": 161,
        "text": "\\sum_k F_{\\mathrm{labor},k} = 2.0 + 0.2 + 0.1 + 0.2 + 1.0 = 3.5"
      },
      {
        "type": "paragraph",
        "source_index": 162,
        "text": "Thus, each hour of plant operation requires an average of 3.5 labor-hours. To establish a conservative preliminary budget, we assume the manufacturing system operates continuously year-round, with 4,380 daytime hours and 4,380 nighttime hours. China has no uniform nationwide night-shift premium, so we assume a 20% premium in this model."
      },
      {
        "type": "paragraph",
        "source_index": 163,
        "text": "Day-shift labor cost:"
      },
      {
        "type": "formula",
        "source_index": 164,
        "text": "3.5 \\times 62.07 \\times 4{,}380 = 951{,}517 \\; \\mathrm{CNY/year}"
      },
      {
        "type": "paragraph",
        "source_index": 165,
        "text": "Night-shift labor cost:"
      },
      {
        "type": "formula",
        "source_index": 166,
        "text": "3.5 \\times 62.07 \\times 1.2 \\times 4{,}380 = 1{,}141{,}821 \\; \\mathrm{CNY/year}"
      },
      {
        "type": "paragraph",
        "source_index": 167,
        "text": "Accordingly, the estimated annual production labor cost is:"
      },
      {
        "type": "formula",
        "source_index": 168,
        "text": "C_{\\mathrm{production}} = 951{,}517 + 1{,}141{,}821 = 2{,}093{,}338 \\; \\mathrm{CNY/year}"
      },
      {
        "type": "paragraph",
        "source_index": 169,
        "text": "approximately CNY 2.0933 million per year."
      },
      {
        "type": "paragraph",
        "source_index": 170,
        "text": "In addition to production staff, the company requires cleaning and sales personnel. Cleaner salaries in Hangzhou are approximately CNY 4,000–5,000 per month, while medical-device sales positions pay around CNY 8,000–12,000 per month. Assuming three cleaners, two sales employees, and a 35% employer on-cost:"
      },
      {
        "type": "formula",
        "source_index": 171,
        "text": "C_{\\mathrm{cleaning}} = 5{,}000 \\times 1.35 \\times 3 \\times 12 = 243{,}000 \\; \\mathrm{CNY/year}"
      },
      {
        "type": "formula",
        "source_index": 172,
        "text": "C_{\\mathrm{sales}} = 10{,}000 \\times 1.35 \\times 2 \\times 12 = 324{,}000 \\; \\mathrm{CNY/year}"
      },
      {
        "type": "paragraph",
        "source_index": 173,
        "text": "Total annual labor cost for the company is:"
      },
      {
        "type": "formula",
        "source_index": 174,
        "text": "C_{\\mathrm{total}} = 2{,}093{,}338 + 243{,}000 + 324{,}000 = 2{,}660{,}338 \\; \\mathrm{CNY/year}"
      },
      {
        "type": "paragraph",
        "source_index": 175,
        "text": "NEST's current estimate of total annual labor costs is therefore approximately CNY 2.6603 million."
      }
        ]
      },
      {
        "type": "card",
        "source_index": 176,
        "title": "R&D",
        "variant": "secondary",
        "blocks": [
          {
            "type": "paragraph",
            "source_index": 177,
            "text": "NEST's current cost calculations cover only the first-generation SELP hydrogel. In the future, we plan to express functional peptides with repair-related activity and incorporate them into the product. Reusing the existing fermentation platform would add His-tag affinity chromatography, protease cleavage, and secondary purification to an otherwise similar SELP manufacturing process. We provisionally estimate incremental R&D operating costs of CNY 1.84 million per year, primarily for process optimization, excluding capital investment in new buildings or a complete GMP production line. If a separate line must be replicated, its equipment must be budgeted as additional capital expenditure [14]."
          },
          {
            "type": "paragraph",
            "source_index": 178,
            "text": "Alternatively, process development and pilot production of functional peptides could be outsourced to a CDMO. Chinese CDMOs offer microbial fermentation services up to around 2,000 L, protein purification, and quality testing, but pricing depends on the strain, yield, and purity requirements [15, 16]. In-house development requires existing equipment, specialist personnel, and a quality system. Outsourcing may entail higher service fees but reduce early equipment investment and scale-up risk. Given our current uncertainty over product demand, we favor CDMO collaboration initially. Once manufacturing is stable and demand increases, internal production may become more economical."
          }
        ]
      },
      {
        "type": "card",
        "source_index": 179,
        "title": "Waste Management Costs",
        "variant": "secondary",
        "blocks": [
          {
            "type": "paragraph",
            "source_index": 180,
            "text": "Waste from NEST production mainly comprises approximately 31,360 L of spent culture medium annually, along with cleaning liquids, used filters, disposable tubing, gloves, and other consumables. To accommodate this aqueous waste and production variability, we provisionally estimate 50,000 kg of waste per year. Because engineered <em>E. coli</em> is used, spent medium and contaminated consumables must be deactivated before sorting and disposal by qualified contractors. China's General Requirements for Biosafety in Laboratories also requires reliable disinfection, segregation, and safe disposal [18]. Using an initial treatment price of CNY 7.3 per kg [17], annual waste-disposal costs are estimated at 50,000 kg × CNY 7.3/kg = CNY 365,000."
          }
        ]
      },
      {
        "type": "card",
        "source_index": 181,
        "title": "Royalties",
        "variant": "secondary",
        "blocks": [
          {
            "type": "paragraph",
            "source_index": 182,
            "text": "A company licensing its patents to third parties receives royalty payments, typically a small percentage, often around 5%. In our case, this could allow other medical-device companies to manufacture SELP using our strains. However, we do not plan to license our patents to other manufacturers. Instead, we prefer to produce and sell SELP ourselves. We therefore do not anticipate royalty income."
          }
        ]
      }
    ]
  },
  {
    "type": "card",
    "source_index": 184,
    "title": "3 Annual Capital Expenditure (CAPEX)",
    "blocks": [
      {
        "type": "paragraph",
        "source_index": 185,
        "text": "Annual capital expenditure refers to yearly spending to improve the factory, such as facility expansion, equipment replacement, or staff training. In our business plan, we define capital costs as a percentage of revenue."
      },
      {
        "type": "list",
        "source_index": 186,
        "items": [
          "Maintenance Capital Expenditure: Capital spending required to preserve existing production capacity and keep facilities operational.",
          "Replacement Capital Expenditure: Capital spending to replace equipment, components, or facilities at the end of their useful lives.",
          "Expansion Capital Expenditure: Investment to expand capacity or increase production throughput."
        ]
      }
    ]
  },
  {
    "type": "heading",
    "source_index": 191,
    "level": 2,
    "id": "timeline",
    "text": "Timeline"
  },
  {
    "type": "figure",
    "source_index": 192,
    "number": 3,
    "files": [
      "003.avif"
    ],
    "caption": "Figure 3 | NEST development roadmap and milestones for R&D, manufacturing, regulatory affairs, fundraising, and commercialization, 2026–2042.",
    "special": false
  },
  {
    "type": "heading",
    "source_index": 194,
    "level": 3,
    "id": "development-milestones-2026-2031",
    "text": "Development Milestones, 2026–2031"
  },
  {
    "type": "paragraph",
    "source_index": 195,
    "text": "Our roadmap follows a progression from proof of concept and technical validation to market entry and business expansion, while acknowledging the lengthy development cycles and evidence requirements of implantable cartilage-repair products. It covers 2026–2042 and illustrates parallel technical, regulatory, and commercial activities. This is a proposed baseline scenario; product classification, study results, and funding may alter the sequence or extend the schedule."
  },
  {
    "type": "heading",
    "source_index": 196,
    "level": 4,
    "id": "2026-2027-select-the-first-product",
    "text": "2026–2027: Select the First Product"
  },
  {
    "type": "paragraph",
    "source_index": 197,
    "text": "Integrate evidence from the iGEM stage, clearly distinguishing demonstrated outcomes from design objectives. Work with prospective users to define the focal-defect indication, candidate formulation, and delivery process. Review intellectual-property ownership and prior disclosures, and initiate regulatory discussions."
  },
  {
    "type": "paragraph",
    "source_index": 198,
    "text": "Stage-gate criterion: A written target product profile, reproducible proof-of-concept results, and an evidence-based decision on the lead candidate."
  },
  {
    "type": "paragraph",
    "source_index": 199,
    "text": "Required resources: Core technical team, clinical advisors, technology-transfer support, and early development funding."
  },
  {
    "type": "heading",
    "source_index": 200,
    "level": 4,
    "id": "2027-2029-optimize-the-product-and-reduce-risk",
    "text": "2027–2029: Optimize the Product and Reduce Risk"
  },
  {
    "type": "paragraph",
    "source_index": 201,
    "text": "Compare the base scaffold with selected modules, optimize manufacturing, and establish analytical specifications. Assess relevant biological and mechanical properties, user workflows, and preliminary unit economics."
  },
  {
    "type": "paragraph",
    "source_index": 202,
    "text": "Stage-gate criterion: A fixed candidate product meeting predefined performance targets, with a credible safety evaluation plan and feasible manufacturing route."
  },
  {
    "type": "paragraph",
    "source_index": 203,
    "text": "Required resources: Materials and analytical expertise, development and manufacturing partners, testing partners, and seed financing."
  },
  {
    "type": "heading",
    "source_index": 204,
    "level": 4,
    "id": "2029-2031-prepare-for-clinical-studies",
    "text": "2029–2031: Prepare for Clinical Studies"
  },
  {
    "type": "paragraph",
    "source_index": 205,
    "text": "Complete the required nonclinical studies, stability testing, aseptic manufacturing evidence, and related device evidence according to the chosen regulatory path. Establish a quality management system and prepare clinical-study documentation with suitable centers."
  },
  {
    "type": "paragraph",
    "source_index": 206,
    "text": "Stage-gate criterion: Sufficient quality and safety evidence, funding, and all required approvals before human studies begin."
  },
  {
    "type": "paragraph",
    "source_index": 207,
    "text": "Required resources: Quality and regulatory leads, qualified manufacturers, nonclinical research organizations, and clinical partners."
  },
  {
    "type": "heading",
    "source_index": 208,
    "level": 3,
    "id": "development-milestones-2031-2042",
    "text": "Development Milestones, 2031–2042"
  },
  {
    "type": "heading",
    "source_index": 209,
    "level": 4,
    "id": "2031-2035-evaluate-clinical-value",
    "text": "2031–2035: Evaluate Clinical Value"
  },
  {
    "type": "paragraph",
    "source_index": 210,
    "text": "Pursue feasibility studies and appropriately designed confirmatory studies as required. Evaluate function, pain, structural repair, safety, and durability alongside usability and health economics."
  },
  {
    "type": "paragraph",
    "source_index": 211,
    "text": "Stage-gate criterion: Clinical evidence meets predefined objectives, and the manufacturing process satisfies registration and supply requirements."
  },
  {
    "type": "paragraph",
    "source_index": 212,
    "text": "Required resources: Study sponsors, investigators, monitoring and data teams, manufacturing capacity, and clinical-stage funding."
  },
  {
    "type": "heading",
    "source_index": 213,
    "level": 4,
    "id": "2035-2037-regulatory-review-and-launch-preparation",
    "text": "2035–2037: Regulatory Review and Launch Preparation"
  },
  {
    "type": "paragraph",
    "source_index": 214,
    "text": "Submit the applicable registration dossier, respond to regulatory questions, and prepare controlled supply, training, procurement, and post-market follow-up. Begin commercial use in patients only after securing the relevant authorizations."
  },
  {
    "type": "paragraph",
    "source_index": 215,
    "text": "Stage-gate criterion: Required approvals obtained, supported by reliable release testing, supply capacity, trained users, and a feasible procurement pathway."
  },
  {
    "type": "paragraph",
    "source_index": 216,
    "text": "Required resources: Regulatory and quality teams, commercial partners, initial specialist centers, and launch financing."
  },
  {
    "type": "heading",
    "source_index": 217,
    "level": 4,
    "id": "2037-2042-expand-based-on-evidence",
    "text": "2037–2042: Expand Based on Evidence"
  },
  {
    "type": "paragraph",
    "source_index": 218,
    "text": "If authorized, expand capacity and the network of partner centers while monitoring long-term outcomes. Evaluate new indications, regions, and advanced formulations as separate development decisions."
  },
  {
    "type": "paragraph",
    "source_index": 219,
    "text": "Stage-gate criterion: Continued safety, clinical performance, reliable supply, and unit economics sufficient to support expansion."
  },
  {
    "type": "paragraph",
    "source_index": 220,
    "text": "Required resources: Operations and clinical follow-up teams, qualified supply partners, and reinvestment or growth capital."
  },
  {
    "type": "paragraph",
    "source_index": 221,
    "text": "Intellectual-property review, fundraising, and partnership development will continue throughout the project. Mitochondrial delivery and other advanced modules will proceed as parallel research directions and cannot automatically rely on evidence or approvals for the initial formulation. Facility investment should reflect validated demand and process maturity. We will not assign a break-even year or market-share forecast without a defensible financial model."
  },
  {
    "type": "heading",
    "source_index": 222,
    "level": 2,
    "id": "financial-analysis",
    "text": "Financial Analysis"
  },
  {
    "type": "paragraph",
    "source_index": 223,
    "text": "Drawing on our cost analysis and timeline, and under Professor Erik Forsberg's guidance, we conducted cash-flow and net-present-value (NPV) analyses for NEST. Cash flow tracks annual inflows and outflows, while NPV discounts future cash flows to present value to assess whether project benefits cover the initial investment. This preliminary model evaluates the business model's financial feasibility under favorable assumptions."
  },
  {
    "type": "paragraph",
    "source_index": 224,
    "text": "We use a ten-year horizon. NEST's market capture is modeled at 10%, 25%, 50%, 75%, and 100% of SOM during the first five years, remaining at 100% from Year 6 through Year 10. Revenue increases at the projected cartilage repair and regeneration CAGR of 13.27% [3], while operating expenses are assumed to rise by 2% annually for inflation. Cash outflows are expressed as negative values. Annual cash flow is calculated as follows:"
  },
  {
    "type": "paragraph",
    "source_index": 225,
    "text": "Cash flowₜ = Cash inflowₜ + Cash outflowₜ"
  },
  {
    "type": "paragraph",
    "source_index": 226,
    "text": "To reflect the time value of money, we use a real cost of capital (RCC) of 10% as the discount rate, within the commonly estimated range for biotechnology and medical-device companies [19]:"
  },
  {
    "type": "paragraph",
    "source_index": 227,
    "text": "DCFₜ = Cash flowₜ ÷ (1 + RCC%)ᵗ"
  },
  {
    "type": "paragraph",
    "source_index": 228,
    "text": "NPV = −Initial investment Cost+ DCF₁ + … + DCF₁₀"
  },
  {
    "type": "figure",
    "source_index": 229,
    "number": 4,
    "files": [
      "004.avif"
    ],
    "caption": "Figure 4 | Ten-year cash flow analysis for NEST. Cash inflows are shown in green, cash outflows in red, net cash flows in light green, and discounted cash flows in black. All monetary values are expressed in USD thousands and converted using a fixed exchange rate of USD 1 = CNY 6.72. The model assumes that NEST gradually expands from 10% to 100% of its SOM during the first five years and maintains 100% SOM from Year 6 to Year 10.",
    "special": true,
    "cropTopLeft": true
  },
  {
    "type": "paragraph",
    "source_index": 231,
    "text": "As shown in Figure 4, under the present assumptions the ten-year present value of NEST cash flows is approximately USD 436 million. Subtracting the initial investment of approximately USD 8.69 million produces a ten-year NPV of approximately USD 427 million. A positive NPV indicates that, given these assumptions for market size, sales growth, and costs, discounted returns exceed initial investment, warranting further development and financing consideration."
  },
  {
    "type": "heading",
    "source_index": 236,
    "level": 2,
    "id": "risk-analysis",
    "text": "Risk Analysis"
  },
  {
    "type": "paragraph",
    "source_index": 237,
    "text": "NEST has established a tiered risk-management framework with mitigation strategies and contingency plans. Risk assessment is incorporated into staged development decisions. “Critical” risks could affect overall feasibility or prevent progress, while “High” risks could delay development, increase costs, or obstruct commercialization. Ratings are qualitative assessments of potential impact, not measured probabilities. Before each stage, measurable acceptance criteria will guide decisions to proceed, revise, or pause development."
  },
  {
    "type": "table",
    "source_index": 238,
    "caption": "Table 5 | Principal NEST project risks, priorities, mitigation strategies, and contingency plans.",
    "rows": [
      [
        "Risk area and priority",
        "Main risks and potential impacts",
        "Mitigation strategies and contingency plans"
      ],
      [
        "R1 Repair performance validationCritical",
        "Gelation properties alone do not establish long-term repair value. Structural failure under repeated loading, inadequate integration with host cartilage, or mismatch between degradation and tissue regeneration may compromise repair and clinical translation.",
        "Use appropriate controlled models to evaluate material retention, wet-interface integration, fatigue resistance, degradation, and repair quality. Set predefined performance and safety criteria for each stage. If unmet, optimize the scaffold or adjust the target indication."
      ],
      [
        "R2 Functional module integrationHigh",
        "Magnetic components and modules such as CPC/Link-N may affect crosslinking, cellular responses, and matrix interactions. Combining modules without demonstrable incremental benefits increases complexity, manufacturing costs, and validation burden.",
        "Compare the base scaffold, individual modules, and selected combinations, measuring incremental benefit alongside safety, process, and operating costs. Prioritize the simplest formulation that meets performance targets."
      ],
      [
        "R3 Material safetyCritical",
        "Endotoxin, host-cell impurities, residual ligase and Ru/SPS reagents, magnetic nanoparticles, and lipid components may create local safety risks. Recombinant proteins and peptide-conjugation interfaces may also provoke immune responses.",
        "Implement product-specific biological evaluation and impurity controls covering local tissue reactions, immune risks, and degradation products. Reformulate, substitute, or remove components that fail justified safety specifications; pause development where necessary."
      ],
      [
        "R4 Mitochondrial deliveryCritical",
        "Mitochondrial provenance, functional potency, storage stability, and reproducibility of enzyme-responsive delivery remain uncertain. The module may substantially increase quality-control, manufacturing, and regulatory complexity and requires independent validation.",
        "Establish separate provenance, quality-control, and potency criteria for mitochondria and independently verify delivery. Consider inclusion in the candidate product only after incremental benefits and manufacturing and regulatory evidence are demonstrated; otherwise maintain it as an independent research direction."
      ],
      [
        "R5 Scale-up manufacturing and costsHigh",
        "Variability in repetitive SELP constructs, purification recovery, and module occupancy may affect batch consistency, compliant output, and unit costs. Laboratory yields do not necessarily reflect commercial costs.",
        "Verify identity, purity, assembly consistency, recovery, and costs across independent batches. Build a full cost model including failures, testing, packaging, and shipping. Initially favor qualified CDMOs; reassess dedicated capacity after process maturity and demand are demonstrated."
      ],
      [
        "R6 Sterility assurance and shelf lifeCritical",
        "Sterilization, storage, and transport could affect the protein network, active modules, and gelation, reducing shelf life, distribution range, or clinical convenience. Stability of the base scaffold does not establish stability of the final combination.",
        "Validate compatible aseptic manufacturing, packaging, storage, and shipping conditions. Evaluate each final formulation and its delivery interface separately. Adjust composition or supply format if requirements are not met, and set shelf life from evidence."
      ],
      [
        "R7 Regulatory pathwayCritical",
        "Combining a scaffold, bioactive modules, mitochondria, and delivery devices may create different product classifications and evidence requirements. Regulatory uncertainty could change study scope, timelines, and funding needs.",
        "Define intended use, composition, and principal mode of action; engage NMPA early on classification and filing. Map evidence requirements by product configuration and revise scope, budget, and timelines before major R&D and capacity investments [26]."
      ],
      [
        "R8 Hardware integration and clinical usabilityHigh",
        "Poor coordination of mixing, temperature control, delivery, magnetic alignment, and illumination—or inconsistent operating settings—could compromise implant performance, increase surgical burden, and discourage adoption.",
        "Validate the end-to-end workflow with intended users, focusing on delivery accuracy, curing consistency, software control, and reproducibility. Use only validated formulations and parameters clinically; simplify or remove features lacking demonstrable benefit."
      ],
      [
        "R9 Intellectual property and licensingHigh",
        "Third-party IP may cover conjugation systems, biomaterials, modules, and delivery devices. Prior disclosures, university ownership agreements, and material-use terms may constrain protection and commercial implementation.",
        "Review disclosures, inventorship, ownership, and material transfer terms systematically; perform freedom-to-operate analyses in priority markets. Obtain licenses or redesign as needed, clearly separating research and commercial-use permissions."
      ],
      [
        "R10 Clinical adoption and reimbursementHigh",
        "Established procedures, added equipment investment, and treatment costs may deter clinicians and hospitals. The indicated population for focal cartilage defects is relatively specific and should not be equated with all osteoarthritis patients.",
        "Define the first indication with clinicians; validate procurement, reimbursement, and willingness to pay; compare total treatment costs, outcomes, and rehabilitation burden. If uptake is limited, adapt the population, configuration, or market approach, potentially relying on an industry partner for commercialization."
      ],
      [
        "R11 Funding and organizational executionHigh",
        "Long development cycles, clinical uncertainty, and turnover within a university team could create funding gaps, loss of critical capabilities, or interruptions.",
        "Stage fundraising around key evidence milestones, establish stable operations and documentation and handover systems, and regularly assess funding through the next decision gate. Prioritize the lead candidate if funding is limited, postponing expansion and advanced modules."
      ],
      [
        "R12 Partner dependence and social/environmental impactsHigh",
        "Reliance on a single manufacturer or commercial partner may reduce supply stability, bargaining power, and data autonomy. Unverified affordability or environmental benefits may undermine market expansion and credibility.",
        "Set clear contractual responsibilities for data, IP, quality, supply, and exit; develop qualified alternative partners where feasible. Assess waste, energy, cold-chain requirements, and affordability; use exclusivity cautiously and substantiate environmental and social claims with evidence."
      ]
    ]
  },
  {
    "type": "heading",
    "source_index": 240,
    "level": 2,
    "id": "obtaining-capital",
    "text": "Obtaining Capital"
  },
  {
    "type": "heading",
    "source_index": 241,
    "level": 3,
    "id": "entrepreneurial-grants",
    "text": "Entrepreneurial Grants"
  },
  {
    "type": "paragraph",
    "source_index": 242,
    "text": "After extensive investigation, we concluded that raising all the initial capital for a complete manufacturing line at once is unrealistic [20, 21]. Innovative companies often raise funding in stages—angel, Pre-A, Series A, and Series B—and we plan to follow this approach:"
  },
  {
    "type": "paragraph",
    "source_index": 243,
    "text": "Angel round: Develop initial samples, build the minimum viable product, and validate the central concept."
  },
  {
    "type": "paragraph",
    "source_index": 244,
    "text": "Pre-A round: Obtain preliminary customer or market data."
  },
  {
    "type": "paragraph",
    "source_index": 245,
    "text": "Series A: Validate a repeatable business model."
  },
  {
    "type": "paragraph",
    "source_index": 246,
    "text": "Series B and beyond: Expand capacity, market the product, develop next-generation products, and ultimately pursue a public listing."
  },
  {
    "type": "paragraph",
    "source_index": 248,
    "text": "Our seed-financing strategy includes applying for funding programs offered in China, such as:"
  },
  {
    "type": "paragraph",
    "source_index": 249,
    "text": "If Hangzhou Medical Port becomes our future industrial base, eligible innovative medical devices receiving their first Class III registration certificate and manufactured in Hangzhou may qualify for support of up to CNY 6 million."
  },
  {
    "type": "paragraph",
    "source_index": 250,
    "text": "The GenScript Life Science Research Fund offers up to USD 500,000 in support that may offset R&D expenditure."
  },
  {
    "type": "paragraph",
    "source_index": 251,
    "text": "Hangzhou's 5050 Plan offers CNY 1 million in start-up funding, with eligible companies that operate in compliance and pass subsequent assessments able to apply for up to CNY 10 million in R&D grants."
  },
  {
    "type": "paragraph",
    "source_index": 252,
    "text": "In addition, according to a stakeholder interview, Ms. Zhang Jie of Huadan Angel expressed willingness to discuss an early investment of approximately CNY 1.5 million after first-round samples meet expectations."
  },
  {
    "type": "paragraph",
    "source_index": 253,
    "text": "We also intend to contact venture capital firms such as 5Y Capital, whose portfolios include life-sciences businesses and which could potentially support future institutional financing."
  },
  {
    "type": "heading",
    "source_index": 255,
    "level": 3,
    "id": "long-term-financial-security",
    "text": "Long-Term Financial Security"
  },
  {
    "type": "paragraph",
    "source_index": 256,
    "text": "In the long term, we will reduce R&D and market-entry risks through industrial partnerships. Several companies have shown interest and offered assistance. Weixinkang and Lanyiwei advised us on Class III medical-device manufacturing, sales qualifications, and market access. Yuanyi Bio provided guidance on synthetic-biology production, fermentation, and purification. Partners at Yiru Bio shared entrepreneurship and scale-up experience. Shanghai Lingjiu Medical has capabilities in biomedical materials, contract development, and manufacturing, making it a possible future partner for product translation and production [22]."
  },
  {
    "type": "paragraph",
    "source_index": 257,
    "text": "As NEST accumulates experimental and clinical evidence, we plan to approach WuXi AppTec's medical-device testing center for registration-related testing, including biocompatibility, chemical characterization, toxicology, and animal studies [25]. Internationally, we may seek contact with Evonik, which offers bioresorbable medical-device development and manufacturing services, and with Arthrex and Smith+Nephew, which have cartilage-repair portfolios and clinical distribution channels [23, 24]."
  },
  {
    "type": "paragraph",
    "source_index": 258,
    "text": "These partnerships could help NEST build industry recognition, connect with additional hospitals and clinicians, and expand its prospective customer base. Joint development and contract manufacturing could distribute R&D investment and commercialization risks among partners, easing funding pressure before sales become stable."
  },
  {
    "type": "heading",
    "source_index": 259,
    "level": 2,
    "id": "the-sustainable-business-model-canvas",
    "text": "The Sustainable Business Model Canvas"
  },
  {
    "type": "figure",
    "source_index": 260,
    "number": 5,
    "files": [
      "005.avif"
    ],
    "caption": "Figure 5 | NEST sustainable business model canvas.",
    "special": false
  },
  {
    "type": "paragraph",
    "source_index": 262,
    "text": "NEST plans a phased B2B model. Early market entry will focus on research partnerships and technology-development licensing to build industry relationships and validate commercial demand. After necessary testing and approvals, we plan to supply clinical institutions with cartilage-repair implant materials and associated delivery solutions. Target customers primarily include orthopedic companies and hospitals, corresponding to co-development, technology licensing, and clinical procurement. Patients are the ultimate users and beneficiaries and may bear part of treatment costs, but they are not the initial direct sales targets. Research grants and equity financing will support R&D and commercialization and will be accounted for separately from operating income generated by research services, technology licenses, and product sales."
  },
  {
    "type": "heading",
    "source_index": 264,
    "level": 2,
    "id": "market-entry",
    "text": "Market Entry"
  },
  {
    "type": "heading",
    "source_index": 265,
    "level": 3,
    "id": "minimum-viable-product-mvp",
    "text": "Minimum Viable Product (MVP)"
  },
  {
    "type": "paragraph",
    "source_index": 267,
    "text": "A minimum viable product (MVP) includes only the core functions necessary to satisfy early users and obtain validation feedback. NEST's MVP is the SELP–SnoopTag2 hydrogel: SELP forms the hydrogel, while SnoopTag2 serves as an interface for attaching different functional peptides. At this stage, we first need to demonstrate reliable production, lyophilized storage, hydrogel re-formation, and suitable degradation and biocompatibility."
  },
  {
    "type": "paragraph",
    "source_index": 268,
    "text": "We have already demonstrated production and storage stability in the laboratory. The product must also undergo classification confirmation, product testing, animal studies, clinical trials, and NMPA registration, while the manufacturer must obtain a medical-device manufacturing license [26, 27, 28]. We expect to complete these processes within ten years and therefore designate SELP–SnoopTag2 hydrogel as our MVP."
  },
  {
    "type": "heading",
    "source_index": 269,
    "level": 3,
    "id": "first-potential-users",
    "text": "First Potential Users"
  },
  {
    "type": "paragraph",
    "source_index": 270,
    "text": "NEST's first-generation product will initially serve patients with focal knee-cartilage defects in China. The knee is our starting point because of its relatively large surgical volume and clinical evidence base, which makes it easier to define patient populations, surgical techniques, and outcomes."
  },
  {
    "type": "paragraph",
    "source_index": 271,
    "text": "Patients are end users, but hospitals typically procure the product and physicians apply it during arthroscopic surgery. NEST will therefore adopt a B2B model, selling directly to companies rather than individual patients. Interviews revealed that several stakeholders expressed interest in investing in our solution, including Huadan Angel, Weixinkang, Yuanyi Bio, Lanyiwei, Yiru Bio, and Shanghai Lingjiu Medical Technology, as discussed in our fundraising section."
  },
  {
    "type": "heading",
    "source_index": 272,
    "level": 3,
    "id": "patenting",
    "text": "Patenting"
  },
  {
    "type": "paragraph",
    "source_index": 273,
    "text": "We plan to file a Chinese invention patent for NEST in November 2026, focusing on the engineered SELP–SnoopTag2 structure, manufacturing and purification methods, hydrogel formulation, crosslinking system, and attachment of functional peptides. Before publicly releasing core experimental data, we also need to conduct patent searches to determine whether SnoopTag2, SELP, and Ru/SPS crosslinking technologies are subject to third-party patent restrictions."
  },
  {
    "type": "paragraph",
    "source_index": 274,
    "text": "Under China's Patent Law, invention patents must meet novelty, inventiveness, and practical applicability requirements and generally last 20 years from the filing date. Methods for treating diseases are not directly patentable in China, but therapeutic materials, products, medical devices, and their manufacturing methods can be protected. NEST will therefore prioritize product and manufacturing technology claims [29]."
  },
  {
    "type": "heading",
    "source_index": 275,
    "level": 3,
    "id": "market-expansion",
    "text": "Market Expansion"
  },
  {
    "type": "paragraph",
    "source_index": 276,
    "text": "We intend to introduce additional functional peptides so that NEST can select different repair modules for different cartilage injuries. Some peptides may be produced internally on new production lines; others may be manufactured by CDMOs to reduce initial equipment investment and enable cost comparisons. Since new functional peptides can change the product's mode of action, every new combination will require a separate safety and regulatory assessment. Our engineered SnoopLigase2-ZJU enzyme system is also expected to enter the product portfolio and broaden the market."
  },
  {
    "type": "paragraph",
    "source_index": 277,
    "text": "In clinical applications, NEST will expand gradually from the knee to the ankle, hip, shoulder, and other joints, with different repair approaches for osteoarthritis, localized trauma, and postoperative injuries. Our long-term aim is to evolve from a single knee product into a cartilage-repair platform configurable by defect location and cause."
  },
  {
    "type": "paragraph",
    "source_index": 278,
    "text": "Hydrogels may also have cross-tissue potential in ocular surface repair, breast reconstruction, and neural repair. By matching tissue-specific requirements and combining delivery, adhesion, and regenerative functions, the platform could eventually address a broad range of clinical needs."
  },
  {
    "type": "heading",
    "source_index": 279,
    "level": 2,
    "id": "skill-gap-analysis",
    "text": "Skill Gap Analysis"
  },
  {
    "type": "paragraph",
    "source_index": 280,
    "text": "ZJU-China is an interdisciplinary team of 16 members with backgrounds in medicine, life sciences, agriculture, philosophy, physics, and computer science. We have developed a relatively comprehensive set of early-stage R&D capabilities around NEST. These complementary skills enable us to consider challenges from a broader range of perspectives."
  },
  {
    "type": "paragraph",
    "source_index": 281,
    "text": "We recognize the importance of a well-rounded, highly skilled team and have grouped our capabilities into eight key areas."
  },
  {
    "type": "figure",
    "source_index": 283,
    "number": 6,
    "files": [
      "006.svg"
    ],
    "caption": "Figure 6 | Analysis of the NEST team's skills and capability structure.",
    "special": false
  },
  {
    "type": "paragraph",
    "source_index": 285,
    "text": "We still have gaps in intellectual property, patent filing, financing, and marketing. These weaknesses could lead to inadequate protection of core technologies, limited access to capital, and slow commercialization, weakening competitiveness and long-term growth. We intend to close them gradually through training and collaboration with patent agents, investment advisors, and industry partners."
  },
  {
    "type": "paragraph",
    "source_index": 286,
    "text": "Our team is based in Hangzhou, China, providing direct access to the clinical needs of the large population affected by osteoarthritis in China and East Asia. Hangzhou's active entrepreneurial environment and innovation programs offer opportunities for incubation, funding, and industrial cooperation. Zhejiang University's research strengths and reputation also help us connect with hospitals, experts, and investors, strengthening credibility and translation potential."
  },
  {
    "type": "heading",
    "source_index": 288,
    "level": 2,
    "id": "long-term-benefits-and-disadvantages",
    "text": "Long-Term Benefits and Disadvantages"
  },
  {
    "type": "paragraph",
    "source_index": 289,
    "text": "Making a positive impact on the world is an essential aspect of business success."
  },
  {
    "type": "heading",
    "source_index": 290,
    "level": 3,
    "id": "positive-impacts",
    "text": "Positive Impacts"
  },
  {
    "type": "heading",
    "source_index": 291,
    "level": 4,
    "id": "improving-human-health",
    "text": "Improving Human Health"
  },
  {
    "type": "paragraph",
    "source_index": 292,
    "text": "Articular cartilage has limited self-repair capacity, and injuries may cause pain, restricted mobility, and long-term impairment of daily life and work [30]. NEST aims to use biodegradable SELP hydrogel to fill cartilage defects and provide a supportive environment for tissue repair, potentially relieving suffering and restoring function. If safety and efficacy are validated, the product may also reduce medical, economic, and social burdens associated with repeated treatment and contribute to long-term human health."
  },
  {
    "type": "heading",
    "source_index": 293,
    "level": 4,
    "id": "advancing-medical-innovation",
    "text": "Advancing Medical Innovation"
  },
  {
    "type": "paragraph",
    "source_index": 294,
    "text": "NEST's modular SELP–SnoopTag system can attach functional peptides with different activities. Future researchers may explore new therapeutic mechanisms and indications by replacing modules rather than redesigning the entire material. Data on manufacturing, crosslinking, degradation, and safety could also underpin further studies and translation, with possible future use in other joints and tissues."
  },
  {
    "type": "heading",
    "source_index": 295,
    "level": 3,
    "id": "negative-impacts",
    "text": "Negative Impacts"
  },
  {
    "type": "heading",
    "source_index": 296,
    "level": 4,
    "id": "animal-studies-not-yet-completed",
    "text": "Animal Studies Not Yet Completed"
  },
  {
    "type": "paragraph",
    "source_index": 297,
    "text": "NEST remains at the laboratory research stage and has not yet completed animal studies. Current results therefore cannot establish its safety or repair efficacy in humans. Potential risks include inflammation or immune responses, mismatch between degradation and tissue repair rates, and insufficient mechanical strength [31]. We believe these issues can be investigated and addressed through animal studies, parameter optimization, and long-term safety monitoring."
  },
  {
    "type": "heading",
    "source_index": 298,
    "level": 4,
    "id": "limited-public-understanding",
    "text": "Limited Public Understanding"
  },
  {
    "type": "paragraph",
    "source_index": 299,
    "text": "Synthetic biology and hydrogel therapies involve complex principles. The public may struggle to understand engineered microorganisms, protein materials, and degradation within the body. This knowledge gap may reduce patient confidence, acceptance, and practical access. We intend to address it through accessible science communication, transparent publication of experimental results, and stronger physician–patient dialogue."
  },
  {
    "type": "heading",
    "source_index": 301,
    "level": 2,
    "id": "esg-of-nest-environmental-social-and-governance",
    "text": "ESG of NEST (Environmental, Social, and Governance)"
  },
  {
    "type": "paragraph",
    "source_index": 302,
    "text": "NEST considers environmental, social, and governance factors throughout product design and business decisions rather than treating them as promotional metrics added after development. Our assessment covers raw-material procurement, recombinant expression, purification, storage, transport, clinical use, and waste disposal, considering both the project's impact on society and the environment and how these issues affect safety, compliance, costs, and long-term development. The framework draws on the four elements of governance, strategy, risk and opportunity management, and metrics and targets in China's Corporate Sustainability Disclosure Standards—Basic Standard (Trial), with specific requirements reflecting NEST's medical and synthetic-biology characteristics."
  },
  {
    "type": "heading",
    "source_index": 303,
    "level": 3,
    "id": "environment",
    "text": "Environment"
  },
  {
    "type": "paragraph",
    "source_index": 304,
    "text": "NEST plans a traceable waste-management process covering segregation, deactivation, documentation, and compliant disposal of engineered microorganisms, fermentation effluents, high-salt purification liquids, and disposable consumables. SELP hydrogels are designed as temporary scaffolds that degrade progressively. Previous research has investigated silk fibroin scaffolds for bone regeneration [32] and engineered protein hydrogels for cartilage regeneration [33]. We will use Day 28 as a key assessment point to examine whether NEST degradation rates can be coordinated with cartilage regeneration."
  },
  {
    "type": "heading",
    "source_index": 305,
    "level": 3,
    "id": "society",
    "text": "Society"
  },
  {
    "type": "paragraph",
    "source_index": 306,
    "text": "NexCode Biotechnologies recognizes that a large gap between product technology and public understanding is neither socially responsible nor conducive to long-term growth. During R&D, we plan to invest at least CNY 50,000 annually in patient education, public lectures, and open science materials. We intend to support SynEduGlobal to advance synthetic-biology education; establish a charitable fund for rural medical outreach and cartilage-health awareness; and continue working with Non-place Studio to use art to foster understanding of synthetic biology and empathy for people with cartilage injuries. We also commit to social safety."
  },
  {
    "type": "heading",
    "source_index": 307,
    "level": 3,
    "id": "governance",
    "text": "Governance"
  },
  {
    "type": "paragraph",
    "source_index": 308,
    "text": "We seek sound internal corporate governance. NEST will implement mechanisms covering research, production, and clinical translation, including quality management, batch traceability, biosafety, supplier audits, intellectual-property protection, and declarations of conflicts of interest. Patient and clinical-research data will follow informed consent, data minimization, and secure storage principles. The team will appoint an ESG lead, review environmental and social objectives annually, and promptly disclose major safety incidents, data discrepancies, and product risks to ensure that scientific results and business communications remain accurate, truthful, and verifiable."
  },
  {
    "type": "heading",
    "source_index": 311,
    "level": 2,
    "id": "entrepreneurship-activities",
    "text": "Entrepreneurship Activities"
  },
  {
    "type": "heading",
    "source_index": 312,
    "level": 3,
    "id": "1-dandelion-innovation-competition",
    "text": "1 Dandelion Innovation Competition"
  },
  {
    "type": "figure",
    "source_index": 313,
    "number": 7,
    "files": [
      "007.avif"
    ],
    "caption": "Figure 7 | NEST team participation and Gold Award at Zhejiang University's Dandelion Student Innovation Competition.",
    "special": false
  },
  {
    "type": "paragraph",
    "source_index": 315,
    "text": "We received a Gold Award and prize money at the Dandelion Student Innovation Competition organized by Zhejiang University's School of Innovation and Entrepreneurship. We gained insights into industry experience, equity structures, company registration, and public listings, and improved how we present our project compellingly."
  },
  {
    "type": "heading",
    "source_index": 316,
    "level": 3,
    "id": "2-synbio-challenges-2026",
    "text": "2 SynBio Challenges 2026"
  },
  {
    "type": "figure",
    "source_index": 317,
    "number": 8,
    "files": [
      "008.avif"
    ],
    "caption": "Figure 8 | NEST team participation and Gold Award in the main track of SynBio Challenges 2026.",
    "special": false
  },
  {
    "type": "paragraph",
    "source_index": 319,
    "text": "Our presentation of the NEST project won a Gold Award in the main track and strengthened the team's pitching skills."
  },
  {
    "type": "figure",
    "source_index": 320,
    "number": 9,
    "files": [
      "009.avif"
    ],
    "caption": "Figure 9 | Gold Award for the NEST team's SnoopLigase2-ZJU project in the industry track of SynBio Challenges 2026.",
    "special": false
  },
  {
    "type": "paragraph",
    "source_index": 322,
    "text": "Our work developing the SnoopLigase2-ZJU enzyme system was recognized by the judges and received a Gold Award in the industry track."
  },
  {
    "type": "heading",
    "source_index": 326,
    "level": 2,
    "id": "references",
    "text": "References"
  },
  {
    "type": "paragraph",
    "source_index": 327,
    "text": "[1] Suwelack T, Stegemann M, Ang FX. Starting a Start-up. In: Creating a Customer Experience-Centric Startup. Business Guides on the Go. Springer, Cham; 2022. p. 33–51. https://doi.org/10.1007/978-3-030-92458-4_3.",
  },
  {
    "type": "paragraph",
    "source_index": 328,
    "text": "[2] moneychimp. CAGR (Compound Annual Growth Rate) Explained, 2025. http://www.moneychimp.com/features/market_cagr.htm."
  },
  {
    "type": "paragraph",
    "source_index": 329,
    "text": "[3] Maia Research. Global Cartilage Repair/Cartilage Regeneration Industry Trends Analysis Report 2025, Forecast to 2033. MarketResearch.com, 2026. Available from: https://www.marketresearch.com/Maia-Research-v4212/Global-Cartilage-Repair-Regeneration-Trends-44046528/ (Accessed: 19 October 2026)."
  },
  {
    "type": "paragraph",
    "source_index": 330,
    "text": "[4] Chang, A. H., Sharma, L., Roemer, F. W., Almagor, O., Lee, J., & Guermazi, A. (2026). Magnetic resonance imaging-defined knee osteoarthritis rarely occurs without cartilage damage. Osteoarthritis and Cartilage Open, 8(1), 100733. https://doi.org/10.1016/j.ocarto.2025.100733"
  },
  {
    "type": "paragraph",
    "source_index": 331,
    "text": "[5] Hjelle, K., Solheim, E., Strand, T., Muri, R., & Brittberg, M. (2002). Articular cartilage defects in 1,000 knee arthroscopies. Arthroscopy, 18(7), 730–734. https://doi.org/10.1053/jars.2002.32839"
  },
  {
    "type": "paragraph",
    "source_index": 332,
    "text": "[6] Li, K., Liu, J., Wang, D., Sun, Y., Yang, P., Tian, H., Zhang, X., Li, J., Kayaalp, M. E., Hirschmann, M. T., Wang, J., Huang, W., & Wang, K. (2026). Towards global integration: China's evolving role in joint replacement and sports medicine. Knee Surgery, Sports Traumatology, Arthroscopy, 34(5), 1567–1571. https://doi.org/10.1002/ksa.70217"
  },
  {
    "type": "paragraph",
    "source_index": 333,
    "text": "[7] Klein B, McNamara I, Davis R, Mittal A, Johnson D. Techno-Economic Assessment for the Production of Hydrocarbon Fuels via Catalytic Upgrading of Furans. NREL/TP-5100-80652. National Renewable Energy Laboratory; 2021. https://doi.org/10.2172/1819430."
  },
  {
    "type": "paragraph",
    "source_index": 334,
    "text": "[8] Frisbie, D. D., Cross, M. W., & McIlwraith, C. W. (2006). A comparative study of articular cartilage thickness in the stifle of animal species used in human pre-clinical studies compared to articular cartilage thickness in the human knee. Veterinary and Comparative Orthopaedics and Traumatology, 19(3), 142–146. https://doi.org/10.1055/s-0038-1632990"
  },
  {
    "type": "paragraph",
    "source_index": 335,
    "text": "[9] Beijing Tianxing Medical Co., Ltd. Prospectus (Application Draft) for the Initial Public Offering and Listing on the STAR Market. Shanghai Stock Exchange, 2024, p. 1-1-155. PDF."
  },
  {
    "type": "paragraph",
    "source_index": 336,
    "text": "[10] China Food and Drug Administration (CFDA). Guidelines for the Audit of Suppliers by Medical Device Manufacturers. Announcement No. 1 of 2015. Official document."
  },
  {
    "type": "paragraph",
    "source_index": 337,
    "text": "[11] Thermo Fisher Scientific. LB Broth and LB Agar: Miller’s Formulation. Product and formulation information."
  },
  {
    "type": "paragraph",
    "source_index": 338,
    "text": "[12] Beyotime Biotechnology. Tryptone and Yeast Extract Product Catalogue. Products ST800-25kg and ST968-25kg. Accessed October 20, 2026. Official catalogue."
  },
  {
    "type": "paragraph",
    "source_index": 339,
    "text": "[13] Aladdin Scientific Corporation. Sodium Chloride, ACS, ≥99%. Product No. S433736, including the 10 kg package. Accessed October 20, 2026. Official product page."
  },
  {
    "type": "paragraph",
    "source_index": 340,
    "text": "[14] Tsinghua University. Microbial Fermentation Platform Procurement Project: Bid Award Announcement. China Government Procurement Network, 2026."
  },
  {
    "type": "paragraph",
    "source_index": 341,
    "text": "[15] GenScript Biotech Corporation. Bacterial Fermentation Services: Process Development, Scale-up and Recombinant Protein Production. GenScript, 2026."
  },
  {
    "type": "paragraph",
    "source_index": 342,
    "text": "[16] Bovax Biotechnology Co., Ltd. Biologics CDMO Platform for Recombinant Proteins and Vaccines. 2026."
  },
  {
    "type": "paragraph",
    "source_index": 343,
    "text": "[17] Hangzhou Yuhang Laboratory Hazardous Waste Recycling and Disposal Service Procurement Notice. Laboratory Hazardous Waste Recycling and Disposal Service Project, 2026."
  },
  {
    "type": "paragraph",
    "source_index": 344,
    "text": "[18] Standardization Administration of China. GB 19489-2008: Laboratories—General Requirements for Biosafety. 2008. Official standard"
  },
  {
    "type": "paragraph",
    "source_index": 345,
    "text": "[19] Harrington SE. Cost of Capital for Pharmaceutical, Biotechnology, and Medical Device Firms. In: The Oxford Handbook of the Economics of the Biopharmaceutical Industry. Oxford University Press; 2012. p. 75–99. https://doi.org/10.1093/oxfordhb/9780199742998.013.0004."
  },
  {
    "type": "paragraph",
    "source_index": 346,
    "text": "[20] Sahlman, W. A. (1990). The structure and governance of venture-capital organizations. Journal of Financial Economics, 27(2), 473–521. https://doi.org/10.1016/0304-405X(90)90065-8"
  },
  {
    "type": "paragraph",
    "source_index": 347,
    "text": "[21] Gompers, P. A. (1995). Optimal investment, monitoring, and the staging of venture capital. The Journal of Finance, 50(5), 1461–1489. https://doi.org/10.1111/j.1540-6261.1995.tb05185.x"
  },
  {
    "type": "paragraph",
    "source_index": 348,
    "text": "[22] Lingel Medical Technology. Commissioned R&D and Manufacturing Services. Official website."
  },
  {
    "type": "paragraph",
    "source_index": 349,
    "text": "[23] Arthrex. Cartilage Repair Portfolio. Official website; Smith+Nephew. Sports Medicine Products. Official website."
  },
  {
    "type": "paragraph",
    "source_index": 350,
    "text": "[24] Evonik. CMO Services for Bioresorbable Medical Devices. Official website."
  },
  {
    "type": "paragraph",
    "source_index": 351,
    "text": "[25] WuXi AppTec. Medical Device Testing Center. Official website."
  },
  {
    "type": "paragraph",
    "source_index": 352,
    "text": "[26] State Administration for Market Regulation. Provisions for Medical Device Registration and Filing (Order No. 47). 2021."
  },
  {
    "type": "paragraph",
    "source_index": 353,
    "text": "[27] National Medical Products Administration and National Health Commission. Good Clinical Practice for Medical Device Trials. 2022."
  },
  {
    "type": "paragraph",
    "source_index": 354,
    "text": "[28] State Administration for Market Regulation. Provisions for Medical Device Manufacturing (Order No. 53). 2022."
  },
  {
    "type": "paragraph",
    "source_index": 355,
    "text": "[29] China National Intellectual Property Administration. Patent Law of the People’s Republic of China. 2020."
  },
  {
    "type": "paragraph",
    "source_index": 356,
    "text": "[30] World Health Organization. Osteoarthritis. 2023. WHO"
  },
  {
    "type": "paragraph",
    "source_index": 357,
    "text": "[31] Spiller, K. L., Maher, S. A., & Lowman, A. M. (2011). Hydrogels for the repair of articular cartilage defects. Tissue Engineering Part B: Reviews, 17(4), 281–299. https://doi.org/10.1089/ten.teb.2011.0077"
  },
  {
    "type": "paragraph",
    "source_index": 358,
    "text": "[32] Liang, R., Li, R., Mo, W., Zhang, X., Ye, J., Xie, C., Li, W., Peng, Z., Gu, Y., Huang, Y., Zhang, S., Wang, X., & Ouyang, H. (2024). Engineering biomimetic silk fibroin hydrogel scaffolds with “organic-inorganic assembly” strategy for rapid bone regeneration. Bioactive Materials, 40, 541–556. https://doi.org/10.1016/j.bioactmat.2024.06.024"
  },
  {
    "type": "paragraph",
    "source_index": 359,
    "text": "[33] Nie, K., Fan, Z., Sun, W., Wu, B., Zhou, S., Zhao, H., Ou, J., Ji, T., Tian, J., Wei, W., Ouyang, H., Hay, D. C., & Huang, W. (2026). Ultrafast crosslinking, strongly adhesive de novo protein hydrogels promote cartilage regeneration. Bioactive Materials, 56, 368–385. https://doi.org/10.1016/j.bioactmat.2025.10.009"
  }
];



const GLOBAL_BOLD_PHRASES = [
  "Shanghai Lingjiu Medical Technology",
  "Shanghai Lingjiu",
  "Huadan Angel",
  "Weixinkang",
  "Yuanyi Bio",
  "Lanyiwei",
  "Yiru Bio",
] as const;

const BOLD_PHRASES_BY_SOURCE_INDEX: Partial<
  Record<number, readonly string[]>
> = {
  37: ["The total addressable market (TAM)"],
  44: [
    "3.22206 billion by 2033",
    "a compound annual growth rate (CAGR) of approximately 13.27%",
  ],
  48: ["The serviceable available market (SAM)"],
  59: ["a SAM of USD 483.31 million"],
  63: ["SOM is USD 483.31 million × 60% × 19% = USD 55.10 million"],
  79: [
    "initial capital investment, annual operating expenses, and annual capital expenditure",
  ],
  85: [
    "Investment costs",
    "purchase costs (PC), direct costs (DC), indirect costs (IC), and other costs (OC)",
    "fixed capital costs (FC)",
  ],
  89: ["Major Equipment Cost (MEC)", "Unlisted Equipment Cost:"],
  92: [
    "Installation Cost",
    "Piping and Insulation Costs",
    "Electrical Cost",
    "Control System Cost",
    "Building Cost",
    "Land Improvement Cost",
    "Auxiliary Facilities Cost",
  ],
  100: [
    "Engineering Cost",
    "Construction Management Cost",
    "Contingency Cost",
    "Contractor's Fee",
  ],
  105: ["Start-up and Validation"],
  107: ["fixed capital investment (FCI)", "total capital investment (TCI)"],
  109: ["Working capital (WC)"],
  111: [
    "Approximately 19% of knee arthroscopy patients",
    "248,900 patients per year",
    "2.1 cm²",
  ],
  112: ["major equipment costs", "USD 1.115 million"],
  120: [
    "Raw Material Cost",
    "Utilities Cost",
    "Direct Labor Cost",
    "Consumables Cost",
    "Waste Treatment and Disposal Cost",
    "Transportation and Logistics Cost",
    "Quality Control Cost",
    "Royalties",
  ],
  130: [
    "Research and Development Cost (R&D)",
    "Marketing Cost",
    "Maintenance Cost",
    "Insurance Cost",
  ],
  136: [
    "313.6 kg tryptone, 156.8 kg yeast extract, and 313.6 kg sodium chloride",
  ],
  138: ["USD 130,100"],
  175: ["CNY 2.6603 million"],
  177: ["CNY 1.84 million per year"],
  180: ["CNY 365,000"],
  223: ["cash-flow", "net-present-value (NPV)"],
  226: ["real cost of capital (RCC)"],
  231: ["warranting further development and financing consideration"],
  243: ["Angel round"],
  244: ["Pre-A round"],
  245: ["Series A"],
  246: ["Series B and beyond"],
  267: ["minimum viable product (MVP)"],
};

const LATIN_PHRASES = [
  "Escherichia coli",
  "E. coli",
  "in vitro",
  "in vivo",
  "in situ",
  "ex vivo",
] as const;

function boldPhrasesFor(sourceIndex: number) {
  return [
    ...GLOBAL_BOLD_PHRASES,
    ...(BOLD_PHRASES_BY_SOURCE_INDEX[sourceIndex] ?? []),
  ];
}

/** Preserve the legacy <em> wrapper in imported copy while also emphasizing
 *  Latin phrases that were stored as plain text. */
function InlineText({
  text,
  boldPhrases = GLOBAL_BOLD_PHRASES,
}: {
  text: string;
  boldPhrases?: readonly string[];
}) {
  const boldPhraseSet = new Set(boldPhrases);
  const inlinePhrases = [...boldPhrases, ...LATIN_PHRASES].sort(
    (left, right) => right.length - left.length,
  );
  const inlinePhrasePattern = new RegExp(
    `(${inlinePhrases.map((phrase) =>
      phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    ).join("|")})`,
    "g",
  );
  return (
    <>
      {text
        .replace(/<\/?em>/g, "")
        .split(inlinePhrasePattern)
        .map((part, index) => {
          if (boldPhraseSet.has(part)) {
            return <strong key={index}>{part}</strong>;
          }
          if (LATIN_PHRASES.includes(part as (typeof LATIN_PHRASES)[number])) {
            return <em key={index}>{part}</em>;
          }
          return part;
        })}
    </>
  );
}

function renderBlock(block: ContentBlock, key: string): ReactNode {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={key}>
          <InlineText
            text={block.text}
            boldPhrases={boldPhrasesFor(block.source_index)}
          />
        </p>
      );
    case "heading": {
      if (block.level === 2) {
        return (
          <h2 id={block.id} key={key}>
            {block.text}
          </h2>
        );
      }
      if (block.level === 3) {
        return (
          <h3 id={block.id} key={key}>
            {block.text}
          </h3>
        );
      }
      return (
        <h4 id={block.id} data-toc="exclude" key={key}>
          {block.text}
        </h4>
      );
    }
    case "list":
      return (
        <ul key={key}>
          {block.items.map((item, index) => (
            <li key={`${key}-${index}`}>
              {typeof item === "string" ? (
                <InlineText
                  text={item}
                  boldPhrases={boldPhrasesFor(block.source_index)}
                />
              ) : (
                <>
                  <MathFormula>{item.formula}</MathFormula>:{" "}
                  <InlineText
                    text={item.text}
                    boldPhrases={boldPhrasesFor(block.source_index)}
                  />
                </>
              )}
            </li>
          ))}
        </ul>
      );
    case "formula":
      return (
        <div className="entre-formula" key={key}>
          <MathFormula display>{block.text}</MathFormula>
        </div>
      );
    case "figure":
      return (
        <figure
          className={`entre-figure${
            block.number === 1 ? " entre-figure--half-size" : ""
          }`}
          key={key}
        >
          <div
            className={`entre-figure__media${
              block.special && block.files.length === 1
                ? " entre-figure__media--blue"
                : ""
            }${block.files.length > 1 ? " entre-figure__media--stack" : ""}`}
          >
            {block.files.map((file, index) => (
              <span
                className={`entre-figure__image-panel${
                  block.special && block.files.length > 1
                    ? " entre-figure__image-panel--blue"
                    : ""
                }`}
                key={file}
              >
                <span
                  className={`entre-figure__image-frame${
                    block.cropTopLeft
                      ? " entre-figure__image-frame--crop-top-left"
                      : ""
                  }`}
                >
                  <img
                    src={`${ENTRE_FIG}/${file}`}
                    alt={index === 0 ? block.caption : ""}
                    className="entre-figure__image"
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              </span>
            ))}
          </div>
          <FigureCaption>{block.caption}</FigureCaption>
        </figure>
      );
    case "table":
      return (
        <div className="table-responsive mb-4" key={key}>
          <table className="table table-bordered align-middle">
            <TableCaption as="caption">{block.caption}</TableCaption>
            <thead className="table-primary">
              <tr>
                {block.rows[0].map((cell, index) => (
                  <th scope="col" key={`${key}-head-${index}`}>
                    <InlineText text={cell} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.slice(1).map((row, rowIndex) => (
                <tr
                  className={
                    block.highlightRows?.includes(row[0])
                      ? "entre-table-row--highlight"
                      : undefined
                  }
                  key={`${key}-row-${rowIndex}`}
                >
                  {row.map((cell, cellIndex) => (
                    <td key={`${key}-cell-${rowIndex}-${cellIndex}`}>
                      {row[0] === "East Asia" ? (
                        <strong>
                          <InlineText text={cell} />
                        </strong>
                      ) : (
                        <InlineText text={cell} />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "card": {
      const card = (
        <ExtendCard title={block.title} variant={block.variant} key={key}>
          {block.blocks.map((child, index) =>
            renderBlock(child, `${key}-${index}`),
          )}
        </ExtendCard>
      );
      if (block.variant === "secondary") {
        return (
          <div className="entre-card-nested-group" key={`${key}-nested`}>
            {card}
          </div>
        );
      }
      if (block.title !== "Total Addressable Market (TAM)") {
        return card;
      }
      return [
        <div className="entre-card entre-download-card" key={`${key}-download`}>
          <a
            className="entre-card-header"
            href="https://static.igem.wiki/teams/6102/wiki/hp-file/nest-cost-sheet.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <span className="entre-card-title">Download Our Cost Sheet</span>
          </a>
        </div>,
        card,
      ];
    }
  }
}

export function Entrepreneurship() {
  const referencesIndex = CONTENT.findIndex(
    (block) => block.type === "heading" && block.id === "references",
  );
  const articleBlocks =
    referencesIndex === -1 ? CONTENT : CONTENT.slice(0, referencesIndex);
  const referenceBlocks =
    referencesIndex === -1 ? [] : CONTENT.slice(referencesIndex + 1);

  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article className="entrepreneurship-article">
          <blockquote className="entrepreneurship-quote">
            <p>
              &ldquo;Hydrogels must be redesigned to respond to biological
              signals, not just swell in water. Only then can we realize their
              promise for controlled delivery and tissue repair.&rdquo;
            </p>
            <footer>
              &mdash; Nicholas A. Peppas, Chief Scientist of Appian Labs
            </footer>
          </blockquote>
          <ExtendCard
            title="Judging Criteria"
          >
            <p>
              For your convenience, the following section summarizes how we have
              addressed the iGEM entrepreneurship judging criteria.
            </p>
            <div className="entre-card-nested-group">
              {JUDGING_CRITERIA.map((criterion) => (
                <ExtendCard
                  title={criterion.title}
                  key={criterion.title}
                  variant="secondary"
                >
                  {criterion.paragraphs.map((paragraph) => (
                    <p key={paragraph}>
                      <InlineText text={paragraph} />
                    </p>
                  ))}
                </ExtendCard>
              ))}
            </div>
          </ExtendCard>
          {articleBlocks.map((block, index) =>
            renderBlock(block, `block-${index}`),
          )}
          {referenceBlocks.length > 0 && (
            <References>
              <div className="references-list references-list--paragraphs">
                {referenceBlocks.map((block, index) =>
                  renderBlock(block, `reference-${index}`),
                )}
              </div>
            </References>
          )}
        </article>
      </div>
    </div>
  );
}
