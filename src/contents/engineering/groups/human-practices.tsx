import type { Group } from "../group";
import type { SeedCycle, SeedModule } from "../seed";

/**
 * Human Practices groups — the SEED framework (Integrated Human Practices
 * toolbox). Each chapter of the IHP manuscript is one group; each cycle of
 * the chapter is one sub-module whose steps follow
 * Spark → Explore → Engineering & Implementation → Dialogue. The
 * Engineering & Implementation step is where the DBTL cycle runs; the
 * nested ring lights up on that step.
 *
 * PROVISIONAL: the phase texts below are condensed from the draft
 * `Integrated Human Practices.md` (still being written — several phases are
 * placeholders).
 */

const todo = (
  <p>
    <em>Details to follow.</em>
  </p>
);

const cycle = (
  title: string,
  Spark: SeedCycle["content"]["Spark"],
  Explore: SeedCycle["content"]["Explore"],
  Engineering: SeedCycle["content"]["Engineering"],
  Dialogue: SeedCycle["content"]["Dialogue"],
): SeedCycle => ({
  title,
  content: { Spark, Explore, Engineering, Dialogue },
});

const module = (title: string, ...cycles: SeedCycle[]): SeedModule => ({
  title,
  cycles,
});

/* ------------------------------------------------------------------ */
/* Chapter 1 — Need-led Discovery                                     */
/* ------------------------------------------------------------------ */

const realWorldNeed = module(
  "Real-world need",
  cycle(
    "Cycle 1 — Real-world cases versus sparse medical records",
    <p>
      An acute cartilage injury experienced by a team member drew our attention
      to hyaline cartilage damage, including osteoarthritis, focal traumatic
      defects, and postoperative adaptive defects. We noticed a substantial gap
      between real-world cases and medical records.
    </p>,
    <p>
      We collected approximately 150 questionnaires in university communities,
      1,200 across Qigudeng and Sandun in Hangzhou and Shuishangxi in Tianjin,
      and 300 through Chinese online platforms, including Xiaohongshu and CDM
      patient groups. Of respondents, 23.8% had relevant experience themselves
      or knew someone affected. Focal traumatic defects predominated among
      university students, community OA cases were concentrated among older
      adults, and online discussions frequently concerned OA and postoperative
      damage.
    </p>,
    <p>
      We compiled the findings into a product requirements document (PRD) and
      passed it to the engineering team to guide design.
    </p>,
    todo,
  ),
);

const clinicalControversy = module(
  "Clinical controversy",
  cycle(
    "Cycle 1 — Disagreement in the clinic",
    <p>
      Clinical views on cartilage damage differ: diagnostic criteria vary, and
      early cartilage injuries are easily overlooked.
    </p>,
    <p>
      Our literature review found no single authoritative threshold defining
      when a cartilage defect constitutes disease. Even for OA, which has
      comparatively well-developed standards, treatment guidelines in the United
      States and China do not use identical diagnostic criteria. Clinicians in
      different regions and roles may assess the same defect differently. Our
      in-depth interview with Yue, who experienced cartilage wear after patellar
      surgery, also suggested that measures of surgical success can overlook the
      effects of implanted materials on cartilage.
    </p>,
    todo,
    todo,
  ),
);

const patientExperience = module(
  "Patient experience",
  cycle(
    "Cycle 1 — Patients themselves overlook cartilage health",
    <p>Patients themselves may also overlook cartilage health.</p>,
    <p>
      After being told that treatment is unnecessary, some patients dismiss
      their pain or rationalize their symptoms. Others, particularly older
      adults, are reluctant to seek care. Access is also difficult in remote
      areas, as illustrated by our conversation with Mr. Gu in Yantan Village,
      Zhejiang.
    </p>,
    todo,
    todo,
  ),
);

export const needLedDiscoveryGroup: Group = {
  label: "Need-led Discovery",
  flavor: "seed",
  lead: (
    <p>
      NEST's Integrated Human Practices began with real experiences of pain.
      Broad surveys, in-depth interviews, and literature research together
      formed our Need-led Discovery stage.
    </p>
  ),
  outlook: (
    <p>
      We believe that synthetic biology-based medical materials should reflect
      four values: <strong>health</strong> (improving joint health and quality
      of life), <strong>empathy</strong> (recognizing easily overlooked
      experiences such as pain and foreign-body sensation),{" "}
      <strong>accessibility</strong> (addressing needs across ages, regions, and
      healthcare settings), and <strong>responsibility</strong> (advancing
      evidence-based research while carefully considering safety and practical
      impact). These values guide our project design.
    </p>
  ),
  parts: [
    { label: "Real-world need", seedModule: realWorldNeed },
    { label: "Clinical controversy", seedModule: clinicalControversy },
    { label: "Patient experience", seedModule: patientExperience },
  ],
};

/* ------------------------------------------------------------------ */
/* Chapter 2 — Evidence-based Co-design                               */
/* ------------------------------------------------------------------ */

const selpCycle = module(
  "SELP scaffold",
  cycle(
    "Cycle 1 — SELP",
    <p>
      Our background research led us to pursue a material for a broad range of
      hyaline cartilage defects. We first sought a filler that could address
      complex repair needs by filling defects and promptly reducing pain. We
      presented our initial SELP designs, limited to fixed 2KY5, 2KY10, and
      2KY16 proteins, to researchers and clinicians. They explained that
      cartilage in the elbow, knee, and other locations experiences different
      loads and requires different strengths; a single-strength material would
      not support broad application.
    </p>,
    <p>
      Our research suggested that changing the repeat number of 2KY proteins
      could tune material strength and toughness. More repeats were associated
      with smaller pores and greater cell adhesion, potentially supporting GAG
      production, native cartilage growth, and anti-inflammatory activity. This
      offered a way to accommodate different immune capacities and defect
      severities. We therefore pursued programmable protein sequences and used
      modeling to guide the final hydrogel properties.
    </p>,
    <p>
      We entered the SELP <strong>DBTL cycle</strong>. Developing SELP into a
      versatile defect-filling material raised many experimental questions,
      which we discussed with stakeholders (see the stakeholder interviews).
    </p>,
    <p>
      We presented the revised design to clinicians and researchers and received
      positive feedback. Subsequent experiments supported the reliability of the
      design.
    </p>,
  ),
);

const linkerCycle = module(
  "Linker system",
  cycle(
    "Cycle 1 — Linker System",
    <p>
      Our literature review showed that filling a defect alone would not be
      enough. We wanted therapeutic modules tailored to different clinical
      microenvironments, but directly inserting large modules could disrupt SELP
      function. We therefore explored protein linkers for modular expansion. We
      initially considered SpyTag and SnoopTag systems; protein modeling
      suggested that bulky linkers could obscure functional peptide domains.
    </p>,
    <p>
      During stakeholder consultations, a researcher suggested SnoopLigase as
      our linker system.
    </p>,
    <p>
      We used modeling to engineer the enzyme and improve ligation efficiency.
      Iteration of the SnoopLigase system produced{" "}
      <strong>SnoopLigase-ZJU</strong>, improving workflow efficiency and
      supporting effective linker operation.
    </p>,
    <p>Clinicians and researchers reviewed and supported our design.</p>,
  ),
);

const functionalCycle = module(
  "Functional modules",
  cycle(
    "Cycle 1 — Functional module",
    <p>
      After designing the programmable platform, we selected OA as the first
      application for NEST and developed OA-focused modules. We consulted
      clinicians to ensure that the material addressed clinical needs.
    </p>,
    <p>
      Clinicians explained how the confined OA microenvironment can sustain a
      vicious cycle of local mechanical imbalance, GAG loss, and worsening
      inflammation. Our literature research suggested that anisotropy could
      mimic native cartilage architecture, bearing shear loads while retaining
      toughness and elasticity, and help interrupt this cycle at its mechanical
      starting point.
    </p>,
    <p>
      With input from clinicians and researchers, we designed peptides that bind
      magnetic nanoparticles so an external magnetic field could align SELP
      anisotropically. We also developed electrostatic GAG-retention peptides
      and a liposomal delivery module for personalized treatment, addressing
      each component of the vicious cycle.
    </p>,
    <p>
      We revisited clinicians and researchers for feedback. Some clinicians
      cautioned that the material's complexity could raise practical concerns
      and complicate market approval, prompting closer attention to safety. We
      also compared the programmable modules with patient needs identified in
      our surveys to assess the breadth of their potential coverage.
    </p>,
  ),
);

export const evidenceBasedCoDesignGroup: Group = {
  label: "Evidence-based Co-design",
  flavor: "seed",
  lead: (
    <p>
      The Co-design stage comprised three SEED cycles covering the SELP
      scaffold, linker system, and functional modules. Stakeholder feedback
      drove iteration in each cycle.
    </p>
  ),
  parts: [
    { label: "SELP scaffold", seedModule: selpCycle },
    { label: "Linker system", seedModule: linkerCycle },
    { label: "Functional modules", seedModule: functionalCycle },
  ],
};

/* ------------------------------------------------------------------ */
/* Chapter 3 — Situated Implementation                                */
/* ------------------------------------------------------------------ */

const hardwareCycle = module(
  "Hardware",
  cycle(
    "Cycle 1 — Hardware design",
    <p>
      To support clinical application, we designed hardware compatible with the
      biological platform. The first version combined an endoscope and
      blue-light source in an intracorporeal device, alongside a syringe.
    </p>,
    <p>
      During clinical-scenario testing, nurses raised three questions: where
      should material preparation take place, how should the system be operated,
      and how could it connect to existing hospital displays? Site visits and
      consultations with medical-device companies led us to add a premixing
      module, electronic instructions, and Bluetooth connectivity.
    </p>,
    <p>
      We iterated the hardware alongside the wet-lab protein-purification
      design, producing an integrated system intended to accommodate different
      operating-room configurations.
    </p>,
    <p>
      Nurses from the emergency ward of Hospital 254 and medical students
      evaluated alternative designs for usability. We selected the
      highest-scoring option, which also received stakeholder support.
    </p>,
  ),
);

const manufacturingCycle = module(
  "Manufacturing",
  cycle(
    "Cycle 1 — Factory production",
    <p>
      We discussed industrial-scale sample production with Beijing Weixinkang.
      The company invited collaboration and advised us to consider protein
      purification, product transport, and storage in our design.
    </p>,
    <p>
      We reviewed protein extraction, purification, and pharmaceutical transport
      methods used for existing hydrogels, and chose a protein-powder
      formulation for hospital supply. A visit to Yuanyi Biotechnology, an
      established synthetic-biology raw-material manufacturer, provided further
      practical insights.
    </p>,
    todo,
    <p>
      A follow-up discussion with Weixinkang secured engineers' support and led
      to a sample-production collaboration agreement.
    </p>,
  ),
);

const entrepreneurshipCycle = module(
  "Entrepreneurship",
  cycle(
    "Cycle 1 — Entrepreneurship and market access",
    <p>
      As a material intended for use inside the body, NEST requires careful
      safety assessment and market-access preparation. We had questions about
      approval pathways, market conditions, and distribution. Initial cost
      estimates also showed substantial unavoidable upfront investment, making
      early financial support necessary.
    </p>,
    <p>
      We consulted stakeholders across manufacturing, sales, government
      regulation, finance, and entrepreneurship support, receiving practical
      advice on these questions.
    </p>,
    <p>
      We gave costs greater weight in design, developed a detailed business
      model, sought a CDMO partner, and participated in entrepreneurship events,
      securing our first expression of investment interest. Further details are
      available on the Entrepreneurship page.
    </p>,
    <p>
      We discussed each business-model revision with the relevant stakeholders
      until both the team and stakeholders reached agreement. Investor
      recognition provided further support for the project's commercial
      feasibility.
    </p>,
  ),
);

export const situatedImplementationGroup: Group = {
  label: "Situated Implementation",
  flavor: "seed",
  lead: (
    <p>
      The Implementation stage brought the design into clinical, manufacturing,
      and market settings. Three cycles covering hardware, industrial
      production, and entrepreneurship addressed the needs of each setting.
    </p>
  ),
  parts: [
    { label: "Hardware", seedModule: hardwareCycle },
    { label: "Manufacturing", seedModule: manufacturingCycle },
    { label: "Entrepreneurship", seedModule: entrepreneurshipCycle },
  ],
};

/* ------------------------------------------------------------------ */
/* Chapter 4 — Trust and Lasting Impact                               */
/* ------------------------------------------------------------------ */

const commercializationCycle = module(
  "Commercialization",
  cycle("Cycle 1 — Continuing commercialization", todo, todo, todo, todo),
);

const neglectedPainCycle = module(
  "Neglected pain",
  cycle("Cycle 1 — Neglected pain", todo, todo, todo, todo),
);

const educationCycle = module(
  "SynBio education",
  cycle(
    "Cycle 1 — Contributions to synthetic biology education",
    todo,
    todo,
    todo,
    todo,
  ),
);

export const trustAndLastingImpactGroup: Group = {
  label: "Trust and Lasting Impact",
  flavor: "seed",
  parts: [
    { label: "Commercialization", seedModule: commercializationCycle },
    { label: "Neglected pain", seedModule: neglectedPainCycle },
    { label: "SynBio education", seedModule: educationCycle },
  ],
};

/** All Human Practices groups, in chapter order. */
export const humanPracticesGroups: Group[] = [
  needLedDiscoveryGroup,
  evidenceBasedCoDesignGroup,
  situatedImplementationGroup,
  trustAndLastingImpactGroup,
];
