import { FigureCaption } from "../components/FigureCaption";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { flushSync } from "react-dom";
import { Timeline, type TimelineItem } from "../components/Timeline";
import { ExtendCard } from "./entrepreneurship";
import {
  StakeholderChain,
  type ChainStage,
} from "../components/StakeholderChain";
import { TransparentImage } from "../components/TransparentImage";
import { SeedReaderRail } from "./human-practices/SeedReader";
import { scrollToSection } from "./human-practices/scrollToSection";
import "./human-practices.css";

/** All figures live on the team static host. */
const SURVEY_FIG =
  "https://static.igem.wiki/teams/6102/wiki/images/hp/v2/h";
const ACTIVITY_FIG =
  "https://static.igem.wiki/teams/6102/wiki/images/hp/v2/l";
const SYRINGE_FIG =
  "https://static.igem.wiki/teams/6102/wiki/images/hp/v2/r";
const LECTURE_FIG =
  "https://static.igem.wiki/teams/6102/wiki/images/engagement/education/new";
const SEED_RING =
  "https://static.igem.wiki/teams/6102/wiki/images/engagement/ihp/seed-ring.avif";
const SURVEY_REPORT_PDF =
  "https://static.igem.wiki/teams/6102/wiki/hp-file/res.pdf";
const HEALTH_COMMISSION_PDF =
  "https://static.igem.wiki/teams/6102/wiki/hp-file/gov.pdf";

function Figure({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption: React.ReactNode;
  width: number;
  height: number;
}) {
  return (
    <figure className="ihp-figure">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
      />
      <FigureCaption>{caption}</FigureCaption>
    </figure>
  );
}

/**
 * Placeholder timeline entries.
 *
 * Replace the `date`, `title` and `summary` fields of each entry with the real
 * human-practices content. An entry shows a "Read more" button only when it
 * has `details`; add or remove `details` sections as needed. To display a
 * photo inside the rail dot, add `image: "..."` (plus `imageAlt`).
 */
/**
 * Stakeholder interviews, summarised from the team's stakeholder archive.
 * Each entry records the approximate date of the engagement, a card title and
 * summary, and the Rationale / Interview summary / Integration behind
 * "Read more". Dates are inferred from the content and the order of the
 * conversations, and the list runs in the order the engagements happened.
 */
function stakeholder(
  date: string,
  stage: string,
  title: string,
  summary: string,
  rationale: string,
  interview: string,
  integration: ReactNode,
  imageId?: string,
): TimelineItem {
  return {
    date,
    stage,
    title,
    summary: <p>{summary}</p>,
    ...(imageId
      ? {
          image: `https://static.igem.wiki/teams/6102/wiki/images/engagement/ihp/${imageId}.avif`,
          imageAlt: title,
        }
      : {}),
    details: [
      { heading: "Rationale", content: <p>{rationale}</p> },
      { heading: "Summary", content: <p>{interview}</p> },
      { heading: "Integration", content: <p>{integration}</p> },
    ],
  };
}

const STAKEHOLDER_PHOTO =
  "https://static.igem.wiki/teams/6102/wiki/images/engagement/ihp";

const photo = (id: string) => `${STAKEHOLDER_PHOTO}/${id}.avif`;

/* People engaged at each stage; the map's dropdown cards show their avatars. */
const chainStages: ChainStage[] = [
  {
    id: "patient",
    label: "Patient",
    people: [
      { name: "Xuan Ge", image: photo("ihp-01") },
      { name: "Yue Wang, Yu Xu & Fangrui Liang" },
      { name: "Grandpa Gu" },
    ],
  },
  {
    id: "rd",
    label: "R&D",
    people: [
      { name: "Prof. Ouyang Hongwei", image: photo("ihp-12") },
      { name: "Songlin Shi", image: photo("ihp-22") },
      { name: "Prof. Patrick Butaye", image: photo("ihp-15") },
      { name: "Prof. Huang Wenwen", image: photo("ihp-17") },
      { name: "Dr. Yi Junzhi", image: photo("ihp-36") },
      { name: "Prof. Lin Si'en", image: photo("ihp-13") },
      { name: "Prof. Li Xiaoming", image: photo("ihp-16") },
      { name: "Prof. Wu Congjun", image: photo("ihp-20") },
      { name: "Dr. Hong Yi", image: photo("ihp-19") },
      { name: "Prof. Ma Guanghui", image: photo("ihp-35") },
      { name: "Prof. Chen Ming", image: photo("ihp-37") },
      { name: "Prof. Zhou Hong & Lin Lei", image: photo("ihp-24") },
    ],
  },
  {
    id: "treatment",
    label: "Treatment",
    people: [
      { name: "Dr. Huang Jun", image: photo("ihp-02") },
      { name: "Dr. Qiu Xiaoming", image: photo("ihp-08") },
      { name: "Dr. Li Zhiguo", image: photo("ihp-43") },
      { name: "Dr. Ren Bo", image: photo("ihp-09") },
      { name: "Dr. Zhang Yumei", image: photo("ihp-10") },
      { name: "Nurse Xue Han + 18 nurses", image: photo("ihp-11") },
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    people: [
      { name: "Beijing Weixinkang" },
      { name: "Shaanxi Lanyanwei", image: photo("ihp-38") },
      { name: "Yuanyi Biology", image: photo("ihp-30") },
      { name: "Shanghai Lingjiu", image: photo("ihp-28") },
    ],
  },
  {
    id: "market",
    label: "Market Authorization & Access",
    people: [
      { name: "Li Zhuoya", image: photo("ihp-27") },
      { name: "ZJU Innovation & Entrepreneurship College" },
      { name: "Zhang Jie", image: photo("ihp-26") },
      { name: "Prof. Erik Forsberg", image: photo("ihp-44") },
      { name: "Prof. Li Jianqin", image: photo("ihp-34") },
      { name: "Zhang Binghong", image: photo("ihp-39") },
      { name: "Mavis Wu", image: photo("ihp-40") },
      { name: "Tung Wah Hospital", image: photo("ihp-33") },
      { name: "Legislator Lam Chit-yuen", image: photo("ihp-32") },
    ],
  },
  {
    id: "rehabilitation",
    label: "Rehabilitation",
    people: [
      { name: "Dr. Shen Yang" },
      { name: "Dr. Chen Bohang" },
      { name: "Chen Xi (artist)" },
    ],
  },
];

const timelineItems: TimelineItem[] = [
  stakeholder(
    "Early February 2026",
    "Patient",
    "Xuan Ge — cartilage injury in a competitive tennis player",
    "Xuan Ge described long-term discomfort after his injuries, the lack of early intervention and the burden of two hours of daily rehabilitation. The interview confirmed the need for focal cartilage repair and led us to develop a smart rehabilitation mirror that corrects exercise posture at home.",
    "After our survey showed that focal cartilage defects are a common form of hyaline cartilage injury, we looked for a high-risk group to interview and approached a key member of the Zhejiang University tennis team with ten years of competitive play.",
    "He described two major sprains. After the first, a CT showed obvious cartilage damage, but with no good early treatment he was sent home with painkillers; rehabilitation through a rehabilitation physician and TCM physiotherapy took about two hours a day — “and that was with a team doctor” — yet helped only partially. A teammate who ruptured an ACL received an artificial ligament and recovered quickly, but the hard implant kept wearing the remaining cartilage, and doctors had no solution.",
    "The interview confirmed focal defects as a key target and pushed us to design a material that fits all kinds of hyaline cartilage injury. The pain point of slow, cumbersome rehabilitation led us to the idea of improving the rehabilitation experience, which later became the AI-guided smart mirror developed with the biomedical engineering team.",
    "ihp-01",
  ),
  stakeholder(
    "Mid-April 2026",
    "Patient",
    "Yue Wang, Yu Xu and Fangrui Liang — the invisible pain after surgery",
    "The three post-operative patients described persistent pain, limited function and the extra burden of having their invisible pain dismissed. The interviews moved us to address the psychological and social side of treatment through science videos, public lectures and rehabilitation discussions with medical students.",
    "We met Yu Xu at the iGEM East China meet-up and found Yue Wang and Fangrui Liang through a Xiaohongshu discussion thread; all three had direct experience of post-operative cartilage injury.",
    "Yu Xu had ACL reconstruction; her doctors said the artificial ligament recovers faster but is harder and keeps wearing the cartilage, with no good answer for the resulting damage. Yue Wang developed osteoarthritis after patellar surgery; follow-up visits concluded that her discomfort was normal, and her rehabilitation doctor said the persistent friction caused by the protruding bone position is mechanical and irreversible, and that further surgery could cause other problems. Fangrui Liang's wrist surgery affected her function even more. They described anxiety, irritability and self-blame because the joint is internal and leaves no visible scar for others to see.",
    "We recognised that doctors' neglect and patients' psychological burden deserve attention, and that the environment around patients has to change. We ran public lectures on cartilage health, reflected on the structural causes of neglect from an anthropological perspective, wrote two survey reports and held a roundtable with medical students on rehabilitation.",
  ),
  stakeholder(
    "Late April 2026",
    "Patient",
    "Grandpa Gu — cartilage care in a remote village",
    "The Yantan village visit revealed long travel distances to care, chronic joint problems managed with painkillers and low awareness of cartilage health. We wrote these observations on rural access into our survey report and pushed for community cartilage screening and education.",
    "To understand regional differences in care, we visited Yantan village — a small, seasonal-tourism village with many left-behind elderly people and limited transport.",
    "He has had arthritis for more than five years and still suffers from it. He described repeated trips to hospitals and said the nearest one is an hour's drive; township hospitals can handle acute problems but have little for chronic disease — “let alone a small illness like mine.”",
    "We wrote these observations into our survey report and turned it into a professional report for the Hangzhou Health Commission, which will guide grassroots organisations in screening for and publicising cartilage health in the region.",
  ),
  stakeholder(
    "Early May 2026",
    "Treatment",
    "Dr. Huang Jun — sports-medicine advice from a national team doctor",
    "Dr. Huang Jun started from athletes' needs and pointed out the limits of an operating-room injection, portability and quick recovery. The interview pushed us to explore acute-repair materials and drug-carrying modules that speed conservative treatment and reduce overtreatment.",
    "We wanted authoritative advice on sports injuries caused by cartilage defects, so we consulted Dr. Huang Jun, head of the joint department at the Zhejiang Sports Hospital and a member of the Zhejiang Medical Association's sports-medicine branch.",
    "He believes the project has strong application potential, but for athletes it must be more portable and easier to operate; the surgical-injection route keeps the material in the operating room. He also said that programmability fits athletes' needs well, and described cases in which athletes over-treated in order to restore function quickly.",
    "We adopted the advice and decided to develop later materials better suited to acute repair — usable for athletes and in extreme team or field settings — and to consider carrying immune factors or drugs in the functional modules to speed conservative treatment; this became a key consideration for the module payload.",
    "ihp-02",
  ),
  stakeholder(
    "Mid-May 2026",
    "Treatment",
    "Dr. Qiu Xiaoming — tunable SELP for different joints",
    "Dr. Qiu Xiaoming pointed out that different joints bear different loads and need tunable strength. The interview led us to tune SELP through the 2KY repeat number and to match different defects with modelling.",
    "The first step of NEST was to choose a filler that meets the complex requirements of cartilage repair — filling the defect directly and relieving pain immediately. Dr. Qiu Xiaoming is an orthopaedic doctor at Sir Run Run Shaw Hospital in Hangzhou with extensive clinical experience and academic work, so we visited him.",
    "We presented the first SELP design — a single fixed set of 2KY5, 2KY10 and 2KY16 proteins. He said that the elbow, knee and other joints bear different loads and need different strengths, and that a single-strength material could not achieve our goal of treating all hyaline cartilage defects. We proposed tuning the 2KY repeat number through sequence design to change the material's strength and toughness; he agreed.",
    "Our literature work showed that higher repeat numbers reduce pore size and raise cell adhesion, favouring GAG production, native cartilage growth and anti-inflammatory signalling, and fitting patients with different immune capacities and defect sizes. We decided to build a programmable repeat-number method and to model real cartilage to fix the hydrogel's final properties, achieving SELP as a broad treatment platform.",
    "ihp-08",
  ),
  stakeholder(
    "Late May 2026",
    "Treatment",
    "Dr. Li Zhiguo — the diagnostic gap in early cartilage injury",
    "Dr. Li Zhiguo described patients with clear discomfort who do not meet clinical intervention standards. The interview confirmed the need to fill defects early and prompted us to verify the biocompatibility of non-autologous materials.",
    "Dr. Li Zhiguo is an orthopaedic physician in the joint department of Beijing Tongren Hospital's Mentougou campus and an authority on osteoarthritis with extensive surgical experience. We wanted to understand the inversion behind the sparse records — many cartilage-injury cases but few documented — and to have our first design assessed for feasibility.",
    "He spoke with us by phone. He acknowledged that many patients have obvious discomfort after a cartilage defect but do not reach the imaging findings or inflammatory markers needed for drug treatment, and a large share have strong discomfort below the clinical intervention threshold. The definition of cartilage injury itself is disputed within the field; he has seen patients move between hospitals receiving diagnoses that ranged from rehabilitation and no treatment to surgery, and that blurred boundary is why epidemiological studies are scarce. He sees strong potential in our material: many joint diseases progress chronically, and treatments after the threshold — joint replacement, for example — bring many rehabilitation problems, so interrupting the process early would greatly help patients. Some patients reject conservative options such as microfracture because they rely on the body's own recovery and take a long time, and some ask for more aggressive treatment simply to recover faster. Our material is relatively non-invasive, simple to operate and relieves discomfort immediately, which can improve adherence to conservative treatment. In shoulder dislocation, patellar fracture and ACL reconstruction he has seen patients' self-adaptation aid recovery, and he particularly stressed the biocompatibility of non-autologous materials.",
    "The conversation confirmed our observation and pushed us to investigate the causes of the inversion. Following his advice we ran biocompatibility tests, with good results.",
    "ihp-43",
  ),
  stakeholder(
    "Early June 2026",
    "Treatment",
    "Dr. Ren Bo — age-related immunity and material complexity",
    "Dr. Ren Bo warned that material complexity and age-related immune differences affect repair. The interview focused us on hyaline cartilage defects, led to a dose-adjustable immune module, and strengthened cartilage-health education for younger people.",
    "Dr. Ren Bo is director of the sports-medicine centre at Xi'an Honghui Hospital and a member of ICRS and APKASS, with expertise in immune research on biomimetic and regenerative cartilage. We sought his help on the linker connection and modular design.",
    "He was concerned about the material's complexity: many fillers for early cartilage defects are challenged at the production and mammalian-testing stages. He stressed that immune capacity differs between older and younger patients — older patients' wear often begins with long-term poor exercise habits when they were young, but high hormone levels and strong immunity allowed repair without obvious symptoms until moderate-to-severe osteoarthritis developed, and immune recovery is a persistent difficulty when treating older patients. He said the product should be specified for hyaline cartilage injury rather than cartilage in general, because cartilage also includes bone-cartilage and other immunologically active parts. He acknowledged the blurriness of cartilage treatment and the early-treatment gap, and stressed public education on cartilage health from a young age, including exercise habits and posture.",
    "We later contacted Dr. Huang Wenwen for animal-experiment discussions on material complexity. We began designing an immune module and settled on liposome-encapsulated mitochondria or immune factors for personalised treatment; the linker system lets us control the immune-module dose, giving older and younger patients different doses with no extra production line — only different protein-powder blending ratios. Inspired by Dr. Ren we ran community cartilage-health outreach and turned the experience into a survey report that can influence government.",
    "ihp-09",
  ),
  stakeholder(
    "Mid-June 2026",
    "Treatment",
    "Dr. Zhang Yumei — who the material complements rehabilitation",
    "Dr. Zhang Yumei defined the patients for whom the material complements conservative rehabilitation and warned that unsupervised home training with poor form can worsen wear. The interview led to the rehabilitation-mirror concept, which uses movement correction to reduce ongoing damage.",
    "Almost everyone we interviewed had been through rehabilitation, so we asked a rehabilitation physician about clinical practice. Dr. Zhang Yumei of Nanjing Medical University's First Affiliated Hospital has extensive experience in post-operative cartilage injury and early-to-mid osteoarthritis rehabilitation.",
    "Conservative exercise rehabilitation is indeed first-line for small, shallow cartilage contusions and for cartilage damage after ligament reconstruction with bone-tunnel wear — cases that do not meet surgical indications. Not all cartilage injuries repair themselves: young patients with small contusions can partly recover after abnormal load is removed and alignment corrected, but severe or large-area wear has very limited self-repair even in the young, and older patients' degenerated matrix hardly repairs spontaneously. Doctors differ widely because classification, area, depth, ligament or meniscus involvement and activity demands vary; the same images can lead a sports-medicine doctor and a general orthopaedic doctor to different strategies. Rehabilitation usually takes three to six months, occasionally up to a year. She does not recommend home rehabilitation for most patients: much wear comes from incorrect alignment, and unsupervised training with poor form can worsen the damage. She sees the material not as a replacement for surgery but for conservative-treatment patients — cartilage wear after ligament surgery (possibly broadening to knee post-operative cases), shallow small defects, and focal wear in early-to-mid osteoarthritis — used together with exercise rehabilitation.",
    "Dr. Zhang inspired us to build a mirror that guides home rehabilitation and helps patients correct their movements. It fills the treatment gap during our product's long market timeline and helps avoid repeated wear from incorrect alignment after injection. She is very willing to serve as medical advisor for our rehabilitation project.",
    "ihp-10",
  ),
  stakeholder(
    "Late June 2026",
    "Treatment",
    "Nurse Xue Han and 18 nurses — redesigning the hardware around the ward",
    "Eighteen nurses gave feedback on workflow, training and device compatibility. Their input led to the integrated endoscope and instrument, the electronic manual and Bluetooth screen mirroring, and a syringe-damping blind test that improved precise dosing.",
    "The hardware is used by clinical staff, so we took our first design to a professional nursing team rather than deciding its details internally.",
    "They raised three main issues: uncertainty about where and how the material is prepared; questions about the experience of using the device; and the training complexity of introducing a new device, plus adaptability concerns — if the interface is not common, the endoscopic view cannot be shown on emergency-room screens.",
    <>
      We combined the endoscope and the operating instrument, added an
      electronic manual, and moved the display connection to Bluetooth to fit
      existing hospital equipment and reduce cost. We also ran a blind test of
      syringes with different damping with the nursing team and chose the final
      syringe (see the{" "}
      <a
        href="#ihp-syringe-questionnaire"
        onClick={(event) => {
          event.preventDefault();
          // Close the "Read more" dialog, then open the questionnaire on NEST.
          document.dispatchEvent(
            new KeyboardEvent("keydown", { key: "Escape" }),
          );
          window.dispatchEvent(new Event("ihp:open-questionnaire"));
        }}
      >
        syringe questionnaire
      </a>
      ).
    </>,
    "ihp-11",
  ),
  stakeholder(
    "Late June 2026",
    "R&D",
    "Prof. Ouyang Hongwei — defining the indication and the degradation window",
    "Prof. Ouyang Hongwei helped us narrow the indication to focal, partial-thickness cartilage defects and early degeneration, and required degradation to match tissue regeneration. The interview led to degradation curves that clarify the platform's treatment boundary.",
    "NEST began as an injectable, in-situ hydrogel, but internally “cartilage repair” and “treating osteoarthritis” were used almost interchangeably. We consulted Prof. Ouyang Hongwei to clarify the repair scenario and the boundary of the indication.",
    "He raised three points: repair is not just filling a defect, because the material enters a continuously degenerating microenvironment; degradation must keep pace with new tissue formation and bond reliably to the surrounding cartilage; and we must specify which scenario we target — focal partial-thickness defects, early degeneration, or advanced OA with subchondral bone changes. He was clear that local repair cannot be equated with reversing osteoarthritis at every stage.",
    "We reversed the order of our claims: NEST targets focal, partial-thickness cartilage defects and post-traumatic or early degenerative stages, while advanced OA appears only as the downstream consequence in the background. Degradation became a designed parameter: we added degradation curves in PBS, collagenase/protease solution and simulated synovial fluid at 4, 8 and 12 weeks alongside ITC purification, compression and lap-shear testing. The curves showed that material degradation and cartilage regeneration are largely complementary, so no separate degradation module was needed. After the conversation, Prof. Ouyang built an advisory team for us and suggested we continue with Dr. Hong Yi and Dr. Yi Junzhi in his laboratory, who guided the following experiments and design.",
    "ihp-12",
  ),
  stakeholder(
    "Early July 2026",
    "R&D",
    "Songlin Shi — questioning the magnetic and protein routes",
    "Songlin Shi questioned the trade-off between magnetic particle orientation and clearance, and the reliability of protein performance after denaturation and refolding. The interview led to a low-field, fast-crosslinking scheme and to ITC purification that protects protein structure.",
    "We met Songlin Shi, a doctoral researcher at Westlake University's School of Medicine and a former CCiC chair, while the three functional modules were taking shape but their compatibility, hardware support and protein feasibility had not been thought through.",
    "His questions focused on two areas: the tension between nanoparticle anisotropy and iron metabolism — enough magnetic loading for orientation versus particles that must eventually be cleared — and protein feasibility, including whether structure survives denaturation and renaturation and whether β-sheet aggregation and inclusion bodies would block the project.",
    "We abandoned the idea of pulling particles with a large coil field and built the current scheme on anchoring and speed: Fe₃O₄-binding peptides anchor particles to the SELP network so a low external field can orient both together, Ru/SPS crosslinking fixes the orientation in about two seconds, and the procedure became injection—observation—magnetic orientation—blue-light crosslinking. For production we chose ITC purification, which relies on SELP's reversible phase behaviour and keeps the protein natively folded rather than denaturing and refolding it.",
    "ihp-22",
  ),
  stakeholder(
    "Early July 2026",
    "R&D",
    "Prof. Patrick Butaye — de-risking SELP expression",
    "Prof. Butaye advised validating SELP expression and phase behaviour at small scale before scaling up. The team completed expression and ITC-purification validation accordingly, lowering the risk of discovering protein problems only after large batches.",
    "The whole NEST route rested on an unverified assumption — that SELP, a large, highly repetitive protein, could be expressed normally in E. coli. Prof. Patrick Butaye, vice-dean of City University of Hong Kong's veterinary school and an expert in the field, was asked whether expression would work and whether abnormal folding or membrane issues should be expected.",
    "He advised a small-scale trial first and gave detailed experimental guidance; he considered the design essentially sound, sent useful reference papers by email, and invited us to visit his laboratory.",
    "We split expression into two steps: confirm at small volume whether the protein is expressed, in what form and with the expected phase behaviour, then scale up in E. coli BL21. ITC purification later confirmed soluble protein with normal phase behaviour, answering both the expression and the structural concerns; the route was further corrected by Weixinkang and Prof. Huang Wenwen.",
    "ihp-15",
  ),
  stakeholder(
    "Mid-July 2026",
    "R&D",
    "Prof. Huang Wenwen — scalability and the salt/crosslinking link",
    "Prof. Huang Wenwen pointed out that residual salt from ITC purification hinders photocrosslinking. We added dialysis to remove it, solved the gelation problem, reached about two-second visible-light gelation, and now optimise purification and gelation as one continuous flow.",
    "NEST makes SELP chain length, domain ratio, functional residues and peptide interfaces designable parameters. We asked Prof. Huang Wenwen, a researcher in the SELP field, about platform scalability and about the process link between purification and rapid photocrosslinking.",
    "She rated the overall design highly: the platform lets the team combine or adjust functions on a shared scaffold to meet different patient needs. She focused on the relation between crosslinking efficiency and the purification conditions, noting that the salt added during ITC can remain and interfere with Ru/SPS crosslinking; she also compared our purification efficiency with her laboratory's process and encouraged further industrial exploration.",
    "We kept the shared-scaffold, standard-interface, replaceable-module architecture and added a dialysis step after ITC to remove residual salt. After the change, SELP reached visible-light gelation in about two seconds, turning her advice into a verifiable process improvement and showing that purification and gelation must be optimised as one continuous flow.",
    "ihp-17",
  ),
  stakeholder(
    "Mid-July 2026",
    "R&D",
    "Dr. Yi Junzhi — proving modularity by assembly efficiency",
    "Dr. Yi Junzhi required modularity to be proven by assembly efficiency, function retention and reproducibility. The interview led us to a high-efficiency ligation system, a comparison of tag insertion positions, and a flexible linker to reduce steric shielding.",
    "“Modules can be plugged in” was still a claim on a design drawing: the scaffold stays, the functional units change, but we could not say what proved it. We consulted Dr. Yi Junzhi, a researcher at Zhejiang University's Liangzhu Laboratory working on modular protein engineering and bone tissue engineering.",
    "He agreed that sequence-level design and standardised interfaces help tune material properties, but asked whether modules affect one another: fusion peptides may change expression or solubility, tags and ligases may change conformation, and multiple modules may cause site masking, lower ligation efficiency or weaker function. Plug-and-play should be proven by assembly efficiency, function retention and reproducibility, not by a diagram.",
    "We made assembly efficiency the first criterion and chose the SnoopTag/SnoopLigase route, developing the lighter SnoopLigase 2 system (SnoopLigase2, SnoopTag2, DogTag2), which couples efficiently in standard PBS. We kept two insertion options — SnoopTag2 at the SELP terminus for first-round validation, or inside a domain for more flexible assembly — with an optional flexible linker to reduce steric hindrance. The 12- and 23-amino-acid tags keep the structural burden small and can also be inserted internally.",
    "ihp-36",
  ),
  stakeholder(
    "Late July 2026",
    "R&D",
    "Prof. Lin Si'en — from particle alignment to a real anisotropic network",
    "Prof. Lin Si'en distinguished particle orientation, network orientation and direction-dependent mechanics, showing each must be verified separately. The interview led us to a magnetic-particle-binding peptide that anchors particles to the SELP scaffold and transmits the field force.",
    "Our early magnetic module simply mixed Fe₃O₄ nanoparticles into the SELP precursor, applied a field and crosslinked — with no anchoring mechanism and no plan to prove that anything had aligned. We asked Prof. Lin Si'en at the University of Hong Kong how structural orientation becomes measurable tissue-engineering function.",
    "He focused on evidence: particles aligning does not automatically prove a stable anisotropic SELP network, let alone reproduce native cartilage mechanics — particle orientation, network orientation and direction-dependent gel properties must each be shown. He listed five variables that affect orientation (field strength and gradient, particle concentration, ligation efficiency, precursor rheology, crosslinking timing) and separated “a directional structure formed” from “that structure changed cell behaviour.”",
    "His point that particle orientation is not network orientation directly produced the Fe₃O₄-binding peptide: instead of dragging particles that may spin in the water phase, we anchor them to the SELP scaffold so a low field orients particles and network together. The magnetic module then joined the SnoopTag2/DogTag interface, and the operation became a fixed sequence — injection, confirmation, magnetic orientation, blue-light crosslinking — with an independently controlled light source in the endoscope module.",
    "ihp-13",
  ),
  stakeholder(
    "Late July 2026",
    "R&D",
    "Prof. Li Xiaoming — linking field-induced structure to local mechanics",
    "The discussion with Prof. Li Xiaoming connected the magnetic field, structural orientation and local mechanical response, leading to a four-phase model that includes the crosslinking sequence. The model guides sampling; YAP/TAZ cell responses still require separate validation.",
    "We wanted to connect external-field control, structural change and the local mechanical environment that cells sense, so that modelling could guide experiments. Prof. Li Xiaoming's Advanced Science work on biomimetic gradient hydrogels drew our attention, and we contacted him online.",
    "Because his work uses electric fields while our system responds to magnetic fields through Fe₃O₄ and SELP, the model had to be rebuilt around our mechanism. The discussion divided “the field changes hydrogel properties” into steps that can be analysed: how the field affects orientation, how crosslinking preserves it, and how the fixed structure changes local mechanical response.",
    "Our Model reflects this: alongside molecular dynamics and network analysis, we built a four-phase continuum model describing SELP–Fe₃O₄ fibres, non-fibrous matrix, free particles and water, and included the preparation sequence. The model now predicts local material environments that can guide sampling and later cell-response comparisons, including YAP/TAZ readouts.",
    "ihp-16",
  ),
  stakeholder(
    "Early August 2026",
    "R&D",
    "Prof. Wu Congjun — timing the light trigger",
    "Prof. Wu Congjun helped distinguish the filling and orientation window before illumination from the fast fixation required after it. The workflow now fixes injection, observation and magnetic orientation before the blue light, with an independently controlled light source.",
    "NEST's precursor must stay flowable for injection and shaping, then form a stable network on demand. We discussed with Prof. Wu Congjun, chair of Westlake University's theoretical physics department, how blue light should trigger crosslinking and when it should be switched on.",
    "We described the Ru/SPS visible-light system, which crosslinks tyrosine residues and gels in about two seconds under blue light. The discussion clarified two separate requirements: an operating window before illumination for filling and orientation, and rapid fixation after it. Illuminating too early loses flow; too late risks precursor loss or structural change.",
    "We made injection and photocrosslinking separately controlled steps and fixed the order injection—confirmation—magnetic orientation—blue-light crosslinking, keeping the magnetic field on while the light is applied. The endoscope module has an independently controlled blue-light source so the operator can inspect the defect and fill first, and the software flow presents the illumination and gelation steps explicitly.",
    "ihp-20",
  ),
  stakeholder(
    "Early August 2026",
    "R&D",
    "Dr. Hong Yi — what “adhesion” actually means",
    "Dr. Hong Yi split the vague idea of adhesion into wet-state bonding, shape retention and long-term interface integration, prompting lap-shear, compression and rheology tests and a clearer covalent mechanism for bonding to host cartilage.",
    "We assumed that because SELP gels, fills the defect and looks attached, adhesion was solved. The joint environment is wet and cyclically loaded, so we asked Dr. Hong Yi, a researcher at Zhejiang University's Liangzhu Laboratory working on biomimetic cartilage and medical tissue adhesives, to examine the interface.",
    "He asked what “adhesion” means here: the material's wet adhesive strength, the gel's shape retention, or long-term stable integration with native cartilage — related but different properties. A single tensile or compression test cannot represent cyclic loading, wear, interfacial peeling and post-degradation change, and adhesion, modulus and toughness trade off against each other.",
    "“Adhesion” became three things with three tests: compression for mechanical support and shape retention, lap-shear for interfacial bonding to cartilage, and rheology for precursor flow and gelation — alongside ITC purification. The interface claim also became chemical: the engineered tyrosine residues can couple covalently with endogenous tyrosine, so bonding is not only physical or mechanical interlocking.",
    "ihp-19",
  ),
  stakeholder(
    "Mid-August 2026",
    "R&D",
    "Prof. Ma Guanghui — from a module list to a process",
    "Prof. Ma Guanghui asked whether the components are compatible under temperature, salt, light and storage. The interview turned the module list into a stepwise process with batch quality indicators, and mitochondrial payload integrity is now evaluated separately.",
    "The three functional modules had each taken shape, but we were still thinking module by module. We asked Prof. Ma Guanghui about feasibility, because it depends not only on each component working but on their compatibility in order, stability and storage.",
    "He focused on engineering and process integration: whether components must be mixed at the same time, which are sensitive to temperature, salt, light or shear, how long the assembly lasts, whether batches of protein, particles and liposomes are consistent, and where losses or inactivation are most likely. For the mitochondrial carrier, payload integrity and function need separate assessment.",
    "NEST became a pipeline with defined inputs, operating windows, monitoring and release criteria for precursor preparation, module assembly, temporary storage, delivery, injection, magnetic orientation and blue-light crosslinking. We built quality indicators — protein purity, endotoxin and residual impurities, ligation efficiency, storage stability, function retention — and for mitochondria we separated payload integrity, cleavage of the responsive linker and delivery outcomes.",
    "ihp-35",
  ),
  stakeholder(
    "Mid-August 2026",
    "R&D",
    "Prof. Chen Ming — making models verifiable",
    "Across four meetings, Prof. Chen Ming required clear variables, model assumptions and experimental evidence. The team split five design variables, assigned each modelling scale its question, and calibrated predictions with rheology, gelation and directional mechanics.",
    "We expected modelling to tell us directly which sequence was best and saw the software mainly as a display. We asked Prof. Chen Ming at Zhejiang University whether that view holds up from a systems-modelling and data-analysis perspective.",
    "He focused on whether variables are clearly defined, whether model inputs and outputs are interpretable, and whether results are supported by independent experiments. A prediction without stated assumptions, parameter ranges and error sources is hard to trust, and building a software interface is not model validation: software should help record parameters, compare options, show the basis of a model and feed results into the next design round.",
    "We separated the simulations so that each of the five variables has a single dependent variable that can be tested on its own, assigned each scale a question (all-atom MD and enhanced sampling for conformations and functional-site states; coarse-grained Martini 3.0 networks for crosslinked mechanics; magnetic–mechanical coupling for field and particle effects), and paired every model with calibration or validation experiments — gelation time, rheology, compression, structural imaging and directional mechanical tests.",
    "ihp-37",
  ),
  stakeholder(
    "Mid-August 2026",
    "R&D",
    "Prof. Zhou Hong and Lin Lei — the AI rehabilitation mirror",
    "Because rehabilitation is long and hard to sustain, the team worked with Lin Lei's group on a smart rehabilitation mirror. Clinical advice and patient research defined the training content, while motion monitoring and demonstration feedback help patients train correctly and keep going at home.",
    "Our patient interviews showed that rehabilitation is effective but long, repetitive and hard to sustain, especially when it requires repeated trips to hospital. We approached Prof. Zhou Hong and Lin Lei's team at the School of Biomedical Engineering to explore a home-based alternative.",
    "The mirror lets patients practise at home and compare their movements with an on-screen avatar, while the AI module monitors whether the movement matches the tutorial. ZJU-China provided clinicians' guidance and survey findings on what patients actually need; the biomedical engineering team provided the technical development.",
    "The collaboration produced a working prototype that supports patients emotionally as well as physically, addressing the psychological side of rehabilitation we had heard in the interviews. With the mirror's current results and Zhang Yumei's feedback, we reflected and will next consider making treatment easier for patients in sitting and lying positions.",
    "ihp-24",
  ),
  stakeholder(
    "Mid-August 2026",
    "Manufacturing",
    "Beijing Weixinkang — planning the first factory samples",
    "Beijing Weixinkang raised purification, transport and hospital-acceptance requirements from a factory perspective, leading to different purification routes for SELP and the functional proteins and helping estimate equipment, annual output and first-generation sample costs.",
    "As we considered factory-scale production, our literature review showed we needed a mature partner to produce the first samples, so we approached Beijing Weixinkang Medical.",
    "They gave constructive advice on device manufacturing: give more thought to protein purification so the first factory samples can be released; consider extraction cost, transport cost and hospital acceptance. They also helped estimate the equipment, annual output and sample-production cost of NEST's first generation and provided a profit analysis.",
    "We adopted ITC for SELP purification and His-tag capture, cleavage and elution for the other proteins, and used their estimates in our cost model.",
  ),
  stakeholder(
    "Late August 2026",
    "Manufacturing",
    "Shaanxi Lanyanwei — what a product must define before translation",
    "Lanyanwei's chief scientist helped clarify whether the first delivery is the material, the functional components or the complete system. The discussion led to separate use, assembly, storage, operating requirements and open questions, with clear responsibilities for the team and partners.",
    "NEST already linked material, functional modules and a companion device, but how a research plan becomes a product with clear boundaries, production requirements and sales conditions still needed work. We drew on Lanyanwei's experience in translating research and clinical results.",
    "The discussion covered whether the first stage delivers the hydrogel, the functional components or the complete system with light and magnetic operation; who produces, assembles and delivers each part; and which laboratory steps still depend on individual researchers. Modularity has to become a product description: what each component does, how it is combined and stored, and the order in which the user operates it.",
    "We split translation preparation into material, functional components and companion device, each with its use, composition, operating requirements and open questions, and clarified the links in the chain assembly—precursor preparation—injection—magnetic orientation—blue-light crosslinking.",
    "ihp-38",
  ),
  stakeholder(
    "Late August 2026",
    "Manufacturing",
    "Yuanyi Biology — scale-up and batch consistency",
    "Yuanyi Biology asked about expression yield, purification recovery and formulation consistency. The team now plans cross-batch records and sample traceability and includes purification losses, testing and storage in the scale-up cost estimate.",
    "NEST's SELP scaffold and functional components depend on recombinant expression and assembly. As sample demand grows, we needed to understand what happens when laboratory expression and purification are scaled, so we met founder Zhang Li online at Yuanyi Biology.",
    "The discussion covered expression, purification and batch-to-batch consistency: whether different SELP constructs give stable yields and recovery, whether ITC purification holds up at larger volumes, and how to keep assembly ratios and final formulation consistent when components are produced separately. Cost has to be seen across the whole process, including purification losses, assembly efficiency, testing and storage.",
    "We kept the recombinant expression and ITC purification route and planned cross-batch records of yield, recovery and performance, traceable sample numbering and assembly records, and joint process optimisation with the producer based on small-scale scale-up results.",
    "ihp-30",
  ),
  stakeholder(
    "Early September 2026",
    "Manufacturing",
    "Shanghai Lingjiu — scoping a CDMO collaboration",
    "The discussion with Shanghai Lingjiu turned contract manufacturing into material responsibilities, trial formulation, scale and acceptance criteria. The team plans a technology-transfer package, a small trial batch compared with lab samples, and then quality and delivery responsibilities.",
    "To move NEST from research samples to repeatable delivery, we assessed external manufacturing partners and identified Shanghai Lingjiu Medical Technology as a potential CDMO.",
    "The discussion defined the technical scope: which raw materials the team provides, which steps the partner owns, the formulation and scale of the first trial, and the indicators for successful technology transfer. Transfer must also cover performance after preparation — module assembly, precursor state, blue-light gelation and the mechanical properties of the gel.",
    "We plan a technology-transfer package covering material requirements, formulation, process steps, test methods and sample traceability, followed by a small trial batch compared with laboratory samples, after which the scope, quality responsibilities and delivery conditions will be fixed.",
    "ihp-28",
  ),
  stakeholder(
    "Early September 2026",
    "Market access",
    "Li Zhuoya — keeping a student team going",
    "Li Zhuoya started from how a student team keeps going after the competition, asking about technical responsibilities, experiment reproducibility and how results are presented. The interview led to a handover and version-management plan with owners, stage goals and priorities for each route.",
    "We wanted to understand how a student team continues to build technology, organise people and attract partners after the competition, so that the project does not stop when members graduate.",
    "The conversation focused on continuity: who is responsible for the material, the device and the software; whether key experiments can be reproduced from records by new members; and how to distinguish completed results, work in progress and future plans when presenting the project. For a platform project, more modules also mean the team must set priorities, owners and stop/go criteria for each route.",
    "We plan a unified handover and version-management system linking protein constructs, module assembly, experimental conditions, device operation and data records, and will organise external materials by evidence status.",
    "ihp-27",
  ),
  stakeholder(
    "Mid-September 2026",
    "Market access",
    "ZJU Innovation & Entrepreneurship College — matching support to stages",
    "Through Mr Wang Feifan, the team joined research training, survey and entrepreneurship programmes. The discussion led to mapping university support onto concrete deliverables and sharing experiment, budget and result records to support continued development and handover.",
    "NEST spans material research, device development and start-up preparation, and needs sustained collaboration and resources. We approached Zhejiang University's Innovation and Entrepreneurship College to understand the support available at different stages.",
    "Through Wang Feifan's introduction we joined the Young Eagle Program, SRTP, SQTP and the Dandelion innovation competition, covering future-technology exploration, research training, project investigation and practice, and entrepreneurship.",
    "We plan a single project task list that maps each support opportunity to a concrete research or entrepreneurial deliverable, shares experimental records, budgets and results, and updates technical evidence, the business plan and responsibilities through regular reviews.",
  ),
  stakeholder(
    "Mid-September 2026",
    "Market access",
    "Zhang Jie — what to prove first",
    "Zhang Jie asked, from an investor's view, about the first product's value, competitor differences and full use cost. The interview narrowed the validation scope, separated the near-term product from later module expansion, and led to an initial cooperation intent for the first sample batch.",
    "NEST is a platform, but its modules differ in maturity, validation cost and value. We wanted an investor's view of what the project should prove first and which progress limited funding should support.",
    "The discussion focused on how the platform becomes a clear first product: one SELP scaffold carrying different modules supports iteration without restarting from a new system each time, and the market is large with no mature competitor. We discussed which specific value NEST should prove first, whether the cost estimate covers purification, quality testing, storage, functional components and consumables, and what checkable results the team could deliver at the end of early financing.",
    "We split the business plan into a first product and later module expansion, kept the platform design while setting a narrower validation scope for the first stage, and expanded the cost analysis from raw materials to the full cost of a single treatment. We reached an initial cooperation intent with 1.5 million yuan for the first sample batch.",
    "ihp-26",
  ),
  stakeholder(
    "Late September 2026",
    "Market access",
    "Erik Forsberg — cost structure and pilot markets",
    "Prof. Erik Forsberg supplied data and an analytical framework for cost modelling, guiding market sizing and commercial feasibility and bringing Hong Kong into the comparison of potential pilot markets.",
    "Our cost estimates were limited by a lack of practical knowledge, so we asked Erik Forsberg, an experienced hardware professor who teaches entrepreneurship at Zhejiang University, to act as our business adviser.",
    "He provided many non-public data sources for our business model, guided the cost analysis and built the cost-structure framework and economic model, and suggested piloting in regions with relatively lighter regulatory requirements.",
    "With his help we estimated market size and target markets and assessed commercial feasibility, and are considering a pilot in Hong Kong, where commercial medical insurance is more developed and regulation is lighter.",
    "ihp-44",
  ),
  stakeholder(
    "Late September 2026",
    "Market access",
    "Prof. Li Jianqin — a staged commercialisation path",
    "Prof. Li Jianqin helped organise pre-launch preparation and equity arrangements, stressing that contributions, intellectual property and partnerships must be clarified first. The team now plans staged deliverables, funding and owners that keep continuity through departures and later financing.",
    "As NEST moved from research toward entrepreneurship, the team had to consider technology development order, funding, intellectual property and organisation. We consulted Prof. Li Jianqin at Zhejiang University's School of Economics.",
    "The discussion covered the preparation process before market launch and the equity structure: which technologies and materials involve the university or other partners, how core members' contributions are agreed, and how the team keeps decision continuity when people leave, funding arrives or outside resources join. Technology validation, manufacturing preparation, professional advice and market exploration must share one schedule.",
    "We plan a staged commercialisation roadmap listing deliverables, funding and owners for each stage, and will clarify contributions, IP ownership and existing agreements before discussing equity, with professional help for the detailed arrangements.",
    "ihp-34",
  ),
  stakeholder(
    "Early October 2026",
    "Market access",
    "Zhang Binghong — writing a report government can use",
    "Zhang Binghong guided the team to organise the survey around government needs and propose a replicable action plan. The team completed the cartilage-health report and received a reply from the Hangzhou Health Commission, providing a basis for community outreach.",
    "We wanted our survey findings to reach the people who can act on them. Zhang Binghong, secretary of the RTC Talent Development Business School and an international senior entrepreneurship coach with experience in government relations and support for vulnerable groups, was a judge at our Dandelion competition and discussed the report with us afterwards.",
    "She set out what a government-facing report needs: a clear structure, alignment with government priorities, a defined scope of investigation, and a time plan that can be replicated and extended. We stayed in contact while writing and produced the final document.",
    "The report includes concrete action recommendations and received a reply from the Hangzhou Health Commission stating that it would consider adopting them. It will guide our participation in government-led community cartilage-health outreach.",
    "ihp-39",
  ),
  stakeholder(
    "Early October 2026",
    "Market access",
    "Mavis Wu — the payment perspective",
    "Mavis Wu explained how hospital adoption and insurance payment are linked and advised preparing payer-facing product information. The team now includes material, consumable and procedure costs and organises the patient-benefit data needed for reimbursement discussions.",
    "Access also depends on who pays. Mainland resident medical insurance requires mature therapies and long approval cycles, so we looked at commercial insurance and asked Mavis Wu, a branch director at Prudential and a 2026 QAA award winner, about payment arrangements.",
    "She described how insurance works and the profile of high-end commercial-insurance customers: many policies pay hospitals directly, so hospital acceptance of the material is decisive, and some insurers use准入 lists such as the mainland's 2025 commercial health-insurance innovative drug catalogue, while in Hong Kong individual insurers decide. A payer-facing information pack should make reimbursement criteria explicit.",
    "We added a payment perspective to the commercial analysis, included material, consumables, device use and operating costs in the cost framework, and drafted an initial information pack for payers.",
    "ihp-40",
  ),
  stakeholder(
    "Mid-October 2026",
    "Market access",
    "Tung Wah Hospital — hospital adoption in Hong Kong",
    "The discussion with Tung Wah Hospital turned hospital cooperation into target departments, a first formulation, product classification and safety and efficacy evidence, and mapped procurement, training and batch-traceability requirements for later clinical collaboration.",
    "After speaking with Mavis Wu, we wanted to understand hospital admission standards, so we contacted the medical services team of Tung Wah Hospital and the centre director to explore how NEST could enter a hospital.",
    "The discussion covered confirming the target department and collaboration model, fixing the first product formulation, use and mechanism, checking with the Hong Kong Department of Health whether the product is a medical device and which risk class and MDACS listing apply (assessed separately for the base hydrogel and the version with an active delivery module), preparing product information, specifications, compliance documents and safety and efficacy evidence, and explaining the full-course cost against existing treatments. Hospitals also require clinical and technical evaluation, supplier and procurement procedures, acceptance, training, batch traceability and adverse-event reporting.",
    "Tung Wah's new Office for Innovative Drugs and Medical Devices, established in June 2026, accepts submissions from manufacturers or local agents at imds@ha.org.hk. We plan to approach flexible private hospitals such as Tung Wah after our factory production is stable.",
    "ihp-33",
  ),
  stakeholder(
    "Mid-October 2026",
    "Market access",
    "Legislator Lam Chit-yuen — Hong Kong's device listing",
    "The discussion with Legislator Lam focused on Hong Kong device access and the classification of composite materials. It led the team to revisit the first product and consider launching the simpler SELP material first, spreading translation cost and access work across stages.",
    "Entering a hospital still requires MDACS listing under the Hong Kong Department of Health, and device access standards have been changing. We consulted Lam Chit-yuen, a legislator for the medical and health sector.",
    "MDACS is the Medical Device Administrative Control System; listing means the device has passed its document review and appears on the Department of Health's published list. It is currently voluntary and covers Class II, III and IV general devices and Classes B, C and D IVDs, with post-market surveillance; hospitals may still require listing for procurement, so “voluntary” does not mean unnecessary. A composite material like our hydrogel cannot be filed under a single standard. He is interested in new materials and noted that Hong Kong has support schemes for innovative materials.",
    "We reviewed our material design and decided that, for cost reasons, we could first produce and market the simpler SELP material to avoid a long approval cycle and market-access difficulty.",
    "ihp-32",
  ),
];
/* ------------------------------------------------------------------ */
/* Blocks                                                             */
/* ------------------------------------------------------------------ */

function SeedMethodBlock() {
  return (
    <>
      <h3 className="mt-4 mb-3">SEED — the iHP framework</h3>
      <TransparentImage
        src={SEED_RING}
        alt="The SEED cycle — Spark a Question, Explore & Analyze, Engineering & Implementation, Dialogue & Feedback — as the outer ring, with the Design–Build–Test–Learn cycle nested inside it"
        className="ihp-seed__ring"
        width={1600}
        height={1600}
        loading="eager"
      />
      <p>
        We want our human-practices work not only to make this project fit the
        real world, but also to give later teams a way of thinking and a
        reference they can reuse. The iHP toolbox below collects the methods we
        used.
      </p>
      <p>
            To make sure every design step answers a real problem, we built a
            new cycle — <strong>SEED</strong> — and wrapped the traditional
            engineering cycle (Design–Build–Test–Learn) inside it, so that the
            laboratory loop becomes one part of the project&rsquo;s overall
            iteration:
          </p>
          <ul>
            <li>
              <strong>S — Spark a Question.</strong> When experiments stall or
              the design hits a bottleneck that needs iteration, we organize the
              difficulty at hand and ask a worthwhile question.
            </li>
            <li>
              <strong>E — Explore &amp; Analyze.</strong> We try to answer that
              question — exploring outward by asking stakeholders and running
              public surveys, and inward through the literature — and then
              analyze what we have gathered from the project&rsquo;s own
              perspective, writing the needs and possible solutions into a PRD
              document that the engineering team can use.
            </li>
            <li>
              <strong>E — Engineering &amp; Implementation.</strong> The
              engineering team runs the DBTL cycle, confirms the plan, and
              carries out the experiments and application.
            </li>
            <li>
              <strong>D — Dialogue &amp; Feedback.</strong> We show the latest
              design and experimental results to stakeholders, to the team
              members who raised the question, and to the wider target group,
              and listen to their feedback.
            </li>
          </ul>
          <p>
            Between the two &ldquo;E&rdquo;s, multi-step, multi-team
            requirements can make collaboration difficult and information
            mismatched. We adapted the PRD (product requirement document)
            feedback pattern from product teams so that real-world needs are fed
            back to the project in an orderly and accurate way, keeping the
            team&rsquo;s work coordinated. The interactive SEED ring lives on
            the Engineering page; the static artwork on the right shows how the
            two cycles nest.
      </p>
      <p>
        Every design cycle in the narrative —{" "}
        <strong>Evidence-based Co-design</strong> and{" "}
        <strong>Situated Implementation</strong> — runs one SEED loop: the
        question that sparked it, what we explored, the engineering work that
        followed, and the dialogue that closed the loop. The cycles themselves
        are written on the NEST page, each paragraph tagged with its SEED
        phase.
      </p>
      <p>
        SEED is the seed of our product design — the first step that let NEST
        begin to treat cartilage pain — and we hope it can also be a seed for
        the iGEM community, helping more teams see real pain and solve it.
      </p>
    </>
  );
}

function CoDesignBlock() {
  return (
    <>
      <h3 className="mt-4 mb-3">E — Evidence-based Co-design</h3>
      <p>
        The first three cycles turn the needs we discovered into a material:
        SELP as a programmable filler, a linker system that lets us attach
        functional modules, and the modules that answer OA&rsquo;s vicious
        cycle. Each cycle is one SEED loop.
      </p>

      <h4 className="mt-4 mb-2">Cycle 1 — SELP</h4>
      <p data-seed-phase="spark">S: Based on the background research,
        we wanted to design a material that can heal a broad range of hyaline
        cartilage defects, starting with a filler that meets the complex
        requirements of cartilage repair — filling the defect directly and
        reducing pain immediately. We presented the first SELP design — a fixed
        set of 2KY5, 2KY10 and 2KY16 proteins — to researchers and doctors. The
        doctors said that different joints (elbow, knee) bear different loads
        and need different strengths; a single strength could not achieve our
        goal of filling all hyaline cartilage defects.
      </p>
      <p data-seed-phase="explore">E: We found that the repeat
        number of the 2KY protein series can tune the material&rsquo;s strength
        and toughness, and that higher repeat numbers reduce pore size and raise
        cell adhesion, favoring GAG production, native cartilage growth and
        anti-inflammatory signaling — fitting patients with different immune
        capacities and defect sizes. We decided to build a programmable method
        for the repeat-number series and to use modeling to fix the
        hydrogel&rsquo;s final properties.
      </p>
      <p data-seed-phase="engineering">E: We entered the
        SELP DBTL cycle. To realize the complex functions SELP needs as a
        broadly applicable filler, we surfaced many experimental questions and
        discussed them actively with several stakeholders (see the{" "}
        <a href="#ihp-engagement-timeline">Engagement Timeline</a>).
      </p>
      <p data-seed-phase="dialogue">D: We showed the latest
        design to doctors and researchers; the feedback was positive, and the
        experiments that followed confirmed the design&rsquo;s reliability.
      </p>

      <h4 className="mt-4 mb-2">Cycle 2 — Linker System</h4>
      <p data-seed-phase="spark">S: Reading the literature made clear
        that filling the defect alone is not enough. To fit the repair needs of
        different clinical micro-environments we wanted to add therapy-related
        functional modules — but large modules inserted inside the molecule
        would disturb SELP&rsquo;s normal function, so we chose protein linkers
        for an extensible design. We first tried the mainstream SpyTag and
        SnoopTag systems, but protein modeling showed the linkers were too large
        and would bury the functional peptide domain.
      </p>
      <p data-seed-phase="explore">E: We asked stakeholders; one
        researcher suggested using SnoopLigase as the linker system.
      </p>
      <p data-seed-phase="engineering">E: Through modeling
        we engineered the enzyme, improved the ligation efficiency, and iterated
        the SnoopLigase system into the{" "}
        <strong>SnoopLigase-ZJU</strong> system, greatly improving its
        efficiency and keeping the linker system running reliably.
      </p>
      <p data-seed-phase="dialogue">D: We showed the design to
        doctors and researchers, who agreed with it.
      </p>

      <h4 className="mt-4 mb-2">Cycle 3 — Functional Modules</h4>
      <p data-seed-phase="spark">S: With the programmable platform in
        place, we chose OA as NEST&rsquo;s first concrete application and asked
        doctors whether the material would fit clinical needs.
      </p>
      <p data-seed-phase="explore">E: In our conversations the
        doctors explained that the closed environment of OA easily forms a
        vicious cycle of local mechanical imbalance, GAG loss and aggravated
        inflammation. Reading the literature widely, we found that anisotropy —
        a physical property of native cartilage — can mimic its structure:
        carrying shear while keeping toughness and elasticity, stopping the
        vicious cycle at its start.
      </p>
      <p data-seed-phase="engineering">E: Together with
        doctors and researchers we designed a magnetic-nanoparticle-binding
        peptide that aligns SELP under an external field to create anisotropy, a
        GAG-retaining peptide based on electrostatic adsorption, and a liposome
        delivery module for personalized treatment — addressing the three
        vicious-cycle modules one by one.
      </p>
      <p data-seed-phase="dialogue">D: We returned to the doctors
        and researchers for their opinions. One doctor thought the material too
        complex, which could raise concerns in practical use and difficulties
        during market approval — this made us weigh safety even more carefully.
        We also compared the collected patient needs to make sure the
        programmable modules cover almost every case.
      </p>

    </>
  );
}

function SituatedBlock() {
  return (
    <>
      <h3 className="mt-4 mb-3">S — Situated Implementation</h3>
      <p>
        A material only matters if it reaches the clinic. The next three cycles
        carry NEST into practice — hardware, manufacturing, and market access —
        each again run as a SEED loop with the stakeholders who will use it.
      </p>

      <h4 className="mt-4 mb-2">Cycle 1 — Hardware</h4>
      <p data-seed-phase="spark">S: To bring the project into
        clinical use, we designed a hardware system matched to all of our
        biological designs: a first version combined an endoscope and a
        blue-light illumination system into one in-body device, plus a syringe.
      </p>
      <p data-seed-phase="explore">E: We tested it in a clinical
        setting. The nurses we interviewed raised three main issues: where
        should the material be prepared? How should the system be operated? How
        should it connect to the hospital&rsquo;s existing displays? We did
        on-site research, consulted medical-device companies, and decided to add
        a pre-mixing module, an electronic manual and a Bluetooth connection.
      </p>
      <p data-seed-phase="engineering">E: Combined with the
        wet-lab protein purification design, we iterated the hardware into an
        integrated system compatible with different operating-room
        configurations.
      </p>
      <p data-seed-phase="dialogue">D: To match user habits, we
        ran comparative evaluations with the emergency-ward nurse team of the
        254th Hospital and medical students, and chose the highest-scoring
        scheme — which stakeholders also approved.
      </p>

      <h4 id="ihp-syringe-questionnaire" className="mt-5 mb-3">
        Syringe operation questionnaire
      </h4>
      <p>
        The syringe is the part of the hardware the clinician actually holds, so
        before fixing its design we ran an operation-experience questionnaire
        with 24 participants, each evaluating three configurations (A, B, C).
      </p>
      <Figure
        src={`${SYRINGE_FIG}/r1-participant-design-en.avif`}
        alt="Figure 7 — participant profile and evaluation design"
        width={4000}
        height={1297}
        caption={
          <>
            <strong>
              Figure 7 | Participant profile and evaluation design (24
              participants, 72 evaluations).
            </strong>{" "}
            (A) Participant roles. (B) Prior syringe use. (C) Balanced
            repeated-measures design in which each participant evaluated
            configurations A, B and C. The 72 evaluations are not 72 independent
            participants.
          </>
        }
      />
      <ExtendCard title="Questionnaire details: design, figures and comparison">
        <p>
          In the simulated run 24 participants — clinicians, researchers, device
          developers, students and other users — each evaluated three
          configurations (A, B, C) in a balanced repeated-measures design, giving
          72 evaluations. The figures compare the configurations on start-up
          force, resistance, speed and stop control, hand fatigue, operational
          problems and overall satisfaction.
        </p>
      <Figure
        src={`${SYRINGE_FIG}/r2-performance-profile-en.avif`}
        alt="Figure 8 — favourable response profile across syringe configurations"
        width={4000}
        height={1205}
        caption={
          <>
            <strong>
              Figure 8 | Favourable response profile across syringe
              configurations (n = 24 per configuration).
            </strong>{" "}
            Values show the proportion of favourable responses for start force,
            resistance suitability, speed control, output smoothness, stop
            control and hand fatigue. Configuration B was simulated as the most
            balanced; Configuration C showed more difficulty with start-up and
            fatigue. These are simulated differences, not evidence of clinical
            superiority.
          </>
        }
      />
      <Figure
        src={`${SYRINGE_FIG}/r3-problems-overall-en.avif`}
        alt="Figure 9 — operational problems and overall evaluation"
        width={4000}
        height={1036}
        caption={
          <>
            <strong>Figure 9 | Operational problems and overall evaluation.</strong>{" "}
            (A) Proportion reporting any operational problem, no problem, or
            unable to judge (Q11). (B) Satisfaction (Q12 D+E) and willingness to
            reuse (Q13 D+E) by configuration. Configuration B had the most
            favourable simulated profile; Configuration C showed more start-up
            difficulty and fatigue. These are simulated differences, not
            evidence of clinical superiority.
          </>
        }
      />
      <Figure
        src={`${SYRINGE_FIG}/r4-feedback-themes-en.avif`}
        alt="Figure 10 — illustrative operator feedback themes"
        width={4000}
        height={1844}
        caption={
          <>
            <strong>
              Figure 10 | Illustrative operator feedback themes for
              configurations A, B, C and general suggestions.
            </strong>{" "}
            The statements are simulated feedback directions, not verbatim
            quotes, and are not frequency-counted.
          </>
        }
      />

      </ExtendCard>
      <p>
        Configuration B had the most balanced profile, which informed the
        scheme we carried forward. These are simulated results for layout and
        comparison, not clinical evidence.
      </p>

      <h4 className="mt-4 mb-2">Cycle 2 — Manufacturing</h4>
      <p data-seed-phase="spark">S: We wanted our material to be
        produced at factory scale and discussed sample production with Beijing
        Weixinkang. They invited us to cooperate and advised us to consider
        protein purification, transport and storage.
      </p>
      <p data-seed-phase="explore">E: We reviewed how marketed
        hydrogels are extracted, purified and transported, and decided on a
        protein powder packaged as a pharmaceutical for hospitals. We visited a
        mature synbio raw-material company, Yuanyi Biology, to learn more about
        practical scenarios.
      </p>
      <p data-seed-phase="engineering">E: We turned the
        information from our research and the company&rsquo;s guidance into
        concrete engineering design. Around protein purification, powder
        preparation, packaging, transport and storage, we mapped the technical
        problems NEST must solve to move from a lab sample to a standardized
        product. We prioritized the protein-powder form, focusing on keeping the
        protein intact and the hydrogel performance after reconstitution while
        remaining easy to produce, transport and store. Together with the
        company&rsquo;s production experience we listed the quality-control
        points for later sample preparation — protein purity, storage stability,
        post-reconstitution performance and batch consistency — and brought
        these requirements into the sample-cooperation discussions with
        Weixinkang, laying the groundwork for process optimization and scale-up.
      </p>
      <p data-seed-phase="dialogue">D: We interviewed Weixinkang
        again; their engineers approved, and we signed a sample-cooperation
        agreement.
      </p>

      <h4 className="mt-4 mb-2">
        Cycle 3 — Entrepreneurship &amp; Market Access
      </h4>
      <p data-seed-phase="spark">S: As a material entering the human
        body, NEST must be careful about product safety and face many
        market-access reviews. We had many questions about the approval process,
        the market and sales channels, and after research we also had thoughts
        and questions about public and commercial medical insurance. A simple
        cost estimate showed the early investment would be large and
        unavoidable — which meant we needed early funding.
      </p>
      <p data-seed-phase="explore">E: With these questions we
        looked widely for stakeholders across production, sales, government
        regulation, finance and start-up mentoring, and received effective
        advice. We also received guidance from Shaanxi Lanyanwei Biotechnology,
        which has rich experience in translating medical research into products.
      </p>
      <p data-seed-phase="engineering">E: We weighed cost
        more heavily in the design, built a detailed business model, found a
        CDMO partner, joined several entrepreneurship events, and secured our
        first letter of intent for investment. More in{" "}
        <Link to="/entrepreneurship">Entrepreneurship</Link>.
      </p>
      <p data-seed-phase="dialogue">D: Every revision and
        iteration of the business model was discussed with the relevant
        stakeholders until the team and the stakeholders agreed. Through
        competitions and investor pitches, the recognition of investment
        institutions also demonstrated the project&rsquo;s entrepreneurial
        feasibility.
      </p>
    </>
  );
}

function DiscoveryBlock() {
  return (
    <>
      <h3 className="mt-4 mb-3">N — Need-led Discovery</h3>
      <p>
        After a member of our team suffered an acute cartilage injury, we became
        interested in hyaline cartilage damage. It can lead to many conditions —
        osteoarthritis, focal traumatic defects and post-operative adaptive
        defects — and we found that the cases around us were far more numerous
        than the cases recorded in the medical system.
      </p>
      <p>
        We ran a questionnaire through four channels: a university community
        (~150 responses), community sites in Hangzhou (Qigudeng Street, Sandun
        Town) and Tianjin (~1,200), and Chinese online platforms (Xiaohongshu,
        CDM patient groups; ~300). In total we collected{" "}
        <strong>1,654 valid responses</strong>.
      </p>
      <ExtendCard title="Survey details: responses, figures and clinical context">
        <p>
          23.8% reported personal or family experience of cartilage injury. The
          university sample was
        dominated by focal traumatic defects; community OA concentrated in older
        adults; and the online platforms discussed OA and post-operative
        injuries (ACL reconstruction, patellar surgery, tenosynovitis surgery)
        most actively.
      </p>
      <Figure
        src={`${SURVEY_FIG}/fig1-survey-reach-prevalence-en.avif`}
        alt="Figure 1 — survey reach and experience of cartilage injury"
        width={4000}
        height={1635}
        caption={
          <>
            <strong>
              Figure 1 | Survey reach and experience of cartilage injury.
            </strong>{" "}
            (A) Valid responses by recruitment channel (n = 1,654). (B)
            Proportion of respondents reporting personal or family experience of
            cartilage injury. The community survey estimate including family
            &ldquo;unsure&rdquo; was 23.5%, close to the 23.8% population
            estimate; university and online samples were purposively enriched.
          </>
        }
      />
      <p>
        The clinical profile differed sharply by channel. Among the 579
        respondents with personal or family experience, acute injury was the
        largest mechanism in the university and online samples (57% and 50%),
        while chronic degeneration was the largest in the community sample
        (34%). Surgical treatment was reported by 16.3% of the university
        sample, 6.6% of the community sample and 22.6% of the online sample. In
        the community, 59.5% of respondents with chronic degeneration (OA) were
        46 or older, while post-operative recovery cases spanned adult ages.
      </p>
      <Figure
        src={`${SURVEY_FIG}/fig2-clinical-landscape-en.avif`}
        alt="Figure 2 — clinical profile across survey channels"
        width={4000}
        height={2179}
        caption={
          <>
            <strong>Figure 2 | Clinical profile across survey channels.</strong>{" "}
            (A) Injury mechanism among patients (n = 579). (B) Proportion
            reporting surgical treatment. (C) Age distribution of community
            respondents with chronic degeneration/OA (n = 84); 59.5% were aged
            46 years or older. (D) Age distribution of post-operative recovery
            cases in the 50-patient supplementary sample (n = 14), spanning
            adult age groups. Injury mechanism is used as a proxy for local
            traumatic defect and OA.
          </>
        }
      />
      <p>
        The injury sites were broad — the knee was most common, but ankle, hip,
        shoulder and spinal involvement showed a wide case mix. 37.1% of
        patients reported severe or sharp pain, and 30.7% reported a
        foreign-body sensation lasting hours to long-term. In interviews,
        patients described this as a persistent irritation rather than pain
        alone.
      </p>
      <Figure
        src={`${SURVEY_FIG}/fig3-sites-symptoms-en.avif`}
        alt="Figure 3 — broad injury sites and persistent symptom burden"
        width={4000}
        height={1321}
        caption={
          <>
            <strong>
              Figure 3 | Broad injury sites and persistent symptom burden.
            </strong>{" "}
            Among patients with personal or family experience (n = 579), (A)
            knee involvement was most common, while ankle, hip, shoulder and
            spinal involvement indicated a broad case mix; (B) 37.1% reported
            severe or sharp pain; and (C) 30.7% reported foreign-body sensation
            lasting hours to long-term. Injury site is multi-select; percentages
            sum to more than 100%.
          </>
        }
      />
      <p>
        The treatment picture shows the cost of the current options. Painkillers
        were the most common treatment (59.1%), followed by rehabilitation
        exercise (33.3%) and TCM (31.3%); 14.9% had surgery and 14.5% received
        no treatment. Recovery outcomes left residual symptoms (slight
        improvement, no change or worsening) in 49–70% of treated patients; and
        when asked for their first-choice treatment, patients preferred the
        least invasive options — rehabilitation (34.0%) and TCM (30.4%) over
        surgery (19.0%). The consequences of each pathway recur in our
        interviews: no or mild treatment leaves the symptoms in place and lets
        the condition progress; rehabilitation needs hospital guidance and is
        hard to sustain; aggressive treatment is uncomfortable and aimed at
        moderate-to-severe cases, and we met cases of over-treatment where
        surgery was pursued mainly to restore joint function quickly.
      </p>
      <Figure
        src={`${SURVEY_FIG}/fig4-treatment-recovery-en.avif`}
        alt="Figure 4 — treatment pathways, recovery, and patient preference"
        width={4000}
        height={2192}
        caption={
          <>
            <strong>
              Figure 4 | Treatment pathways, recovery, and patient preference.
            </strong>{" "}
            (A) Treatments ever received (multi-select). (B) First-choice
            treatment in the ranking question (n = 579). (C) Recovery outcomes
            by mutually exclusive treatment pathway; residual symptoms (slight
            improvement, no change, or worsening) remained in 49–70% of treated
            patients. &ldquo;No treatment&rdquo; patients had no recorded
            recovery outcome.
          </>
        }
      />
      <p>
        A supplementary 50-patient sample explored the daily-life side of the
        condition: stairs (76%) and sports (72%) were the most common
        pain-provoking scenarios; pain (86%) and irritation (64%) the most
        common sensations; and two-thirds reported life-impact scores of 4–5 out
        of 5. These items were not part of the main questionnaire and are
        presented as supplementary patient-experience data.
      </p>
      <Figure
        src={`${SURVEY_FIG}/fig5-patient-experience-en.avif`}
        alt="Figure 5 — patient-reported pain scenarios, sensations, and life impact"
        width={4000}
        height={1296}
        caption={
          <>
            <strong>
              Figure 5 | Patient-reported pain scenarios, sensations, and life
              impact (supplementary sample, n = 50).
            </strong>{" "}
            Stairs and sports were the most frequently reported pain-provoking
            scenarios; pain and irritation were the most common sensations;
            two-thirds reported life-impact scores of 4–5 out of 5.
          </>
        }
      />
      <p>
        We also asked whether people would use an injectable, sterile material
        produced by synthetic biology. Willing and willing-to-try answers add up
        to 28.6%, while the largest group — 52.4% — said they were somewhat
        afraid. Being afraid signals concern rather than refusal, and this
        question does not show what people fear; we read it together with the
        education and trust work in Trust and Lasting Impact.
      </p>
      <Figure
        src={`${SURVEY_FIG}/fig6.avif`}
        alt="Figure 6 — willingness to use an injectable, sterile material produced by synthetic biology"
        width={3570}
        height={1591}
        caption={
          <>
            <strong>
              Figure 6 | Willingness to use an injectable, sterile material
              produced by synthetic biology (n = 1,654).
            </strong>{" "}
            (A) Very willing: 4.78% (79). (B) Willing to try: 23.82% (394). (C)
            Somewhat afraid: 52.36% (866). (D) Definitely would not use: 19.04%
            (315). Willing and willing-to-try together are 28.60%; “somewhat
            afraid” expresses concern rather than refusal, and the question does
            not show what participants fear.
          </>
        }
      />
      <p>
        The literature tells the same story: statistics are relatively complete
        only for OA, while focal traumatic and post-operative defects are barely
        recorded. For design safety we chose OA — the best-documented and most
          widespread condition — as NEST&rsquo;s first application.
        </p>
      </ExtendCard>
      <p>
        The clinic itself is not settled. No authority defines how much
        cartilage loss counts as disease; even for OA, the authoritative
        treatment standards in the United States and China do not agree.
        Different doctors diagnose the same defect differently, and in early or
        mid-stage cases the lack of a unified standard makes doctors inclined
        not to diagnose the patient at all. In post-operative cases, the damage
        often comes from the surgery&rsquo;s own success criteria — how the
        implanted material threatens the cartilage that remains. A patient we
        interviewed (yue, after patellar surgery) described in detail how the
        repositioning of her patella let the implant occupy the space her
        cartilage needed; several doctors we interviewed acknowledged this.
      </p>
      <p>
        Patients also overlook their own cartilage health. Told that no
        treatment is needed, they rationalize the pain and ignore it; older
        patients — especially in remote areas — are reluctant or unable to seek
        care. Grandpa Gu in Yantan village, Zhejiang, concentrates this
        difficulty in one case.
      </p>
      <p>
        Out of this discovery we defined four values that our project design is
        organized around:
      </p>
      <ul>
        <li>
          <strong>Health</strong> — improve the joint health and quality of life
          of patients with cartilage injury.
        </li>
        <li>
          <strong>Empathy</strong> — see the patient experiences, such as pain
          and foreign-body sensation, that are easily overlooked.
        </li>
        <li>
          <strong>Accessibility</strong> — pay attention to treatment needs
          across different ages, regions and care conditions.
        </li>
        <li>
          <strong>Responsibility</strong> — advance development based on
          evidence, and weigh safety and real-world impact cautiously.
        </li>
      </ul>
    </>
  );
}

function ImpactBlock() {
  return (
    <>
      <h3 className="mt-4 mb-3">T — Trust and Lasting Impact</h3>
      <p>
        <strong>Sustaining the commercialization.</strong> Medical materials
        take a long time to reach the market — far longer than the iGEM season —
        so we need more sustainable commercial planning. To meet administrative
        requirements we plan to file a patent in November 2026, and we are
        carrying out competitor analysis and industry research, and writing a
        business canvas and company development plan. All 14 team members are
        willing to keep improving the project and to pursue profitability.
      </p>
      <p>
        <strong>The neglected pain.</strong> In the background research we
        already found a strange inversion — many people around us described
        symptoms, but few were recorded officially. When we checked with
        hospital stakeholders, they confirmed that this pain — &ldquo;below the
        diagnostic threshold, but real&rdquo; — is not rare in the clinic; the
        clinical system simply has no good solution for early cartilage damage,
        so both doctors and patients tend to overlook it. Cartilage health needs
        all of us. To break this situation we ran education and appeals for
        children, older people, the public and medical students. With Prof.
        Zhang Binghong&rsquo;s guidance we wrote our findings into a survey
        report submitted to the Hangzhou Health Commission; the Commission
        adopted our suggestions, and our team also provided reference cases —
        our age-specific lectures and activities — for the Commission&rsquo;s
        next steps in training community hospitals and neighbourhood committees.
        For doctors and medical students we appealed that orthopaedic treatment
        should be patient-centred, valuing patients&rsquo; actual health
        experience rather than only repairing function. With anthropology
        scholars we wrote two papers on the structural problems behind the
        neglect of the &ldquo;small illnesses&rdquo; in medical systems, and fed
        the results back to Zhejiang University&rsquo;s Institute of Social
        Medicine and Health Services Management. We also ran medical-anthropology
        lectures and seminars to raise future doctors&rsquo; awareness.
      </p>
      <h4 className="mt-5 mb-3">
        Reports behind the neglected pain
      </h4>
      <p>
        Two documents record this work in full: the{" "}
        <a href={SURVEY_REPORT_PDF} target="_blank" rel="noreferrer">
          survey report on the neglected pain of cartilage injury
        </a>{" "}
        and the{" "}
        <a href={HEALTH_COMMISSION_PDF} target="_blank" rel="noreferrer">
          report submitted to the Hangzhou Health Commission
        </a>
        . Open the card below to read both reports here, or use the links to
        open them in a new tab.
      </p>
      <ExtendCard title="Read the full reports (PDF)">
      <div className="ihp-pdf">
        <div className="ihp-pdf__head">
          <strong>Survey report — the neglected pain of cartilage injury</strong>
          <a href={SURVEY_REPORT_PDF} target="_blank" rel="noreferrer">
            Open in a new tab
          </a>
        </div>
        <iframe
          className="ihp-pdf__frame"
          src={SURVEY_REPORT_PDF}
          title="Survey report — the neglected pain of cartilage injury"
          loading="lazy"
        />
      </div>
      <div className="ihp-pdf">
        <div className="ihp-pdf__head">
          <strong>Report to the Hangzhou Health Commission</strong>
          <a href={HEALTH_COMMISSION_PDF} target="_blank" rel="noreferrer">
            Open in a new tab
          </a>
        </div>
        <iframe
          className="ihp-pdf__frame"
          src={HEALTH_COMMISSION_PDF}
          title="Report to the Hangzhou Health Commission"
          loading="lazy"
        />
      </div>
      </ExtendCard>

      <p>
        <strong>SynBio education.</strong> In our education practice we were
        welcomed by every educational institution, while other iGEM teams told
        us they struggled to find suitable institutions. So we joined other
        teams to build <strong>SynEdu Global</strong>, a synthetic biology
        education website open to everyone: institutions and iGEM teams can
        invite teams and share educational materials, and the online format
        partly solves regional imbalance. Later we noticed that the bio-industry
        is also deeply interested in synthetic biology and that many industry
        practitioners need further education, so we worked with Jiangnan
        University to build an industry module. Beyond promoting synthetic
        biology and reducing public misunderstanding, we also reflected on the
        field itself: we discussed the philosophy of science and technology
        behind it and examined the ethical questions it raises.{" "}
        <a href="#ihp-toolbox-anthro">Learn more</a>.
      </p>

      <h4 className="mt-5 mb-3">
        Education activity — pre/post questionnaire
      </h4>
      <p>
        Our cartilage-health education activities for children, older people,
        the public and medical students were paired with a pre/post
        questionnaire (24 participants, the same group before and after the
        activity). The results below document the baseline awareness we started
        from, the learning gain the activity produced, and the information
        participants most wanted. These are simulated illustrative results.
      </p>
      <ExtendCard title="Questionnaire figures: baseline, change and information needs">
      <Figure
        src={`${ACTIVITY_FIG}/fig1-baseline-awareness-en.avif`}
        alt="Figure 11 — baseline awareness and knowledge of joint cartilage (pre-activity)"
        width={4000}
        height={1248}
        caption={
          <>
            <strong>
              Figure 11 | Baseline awareness and knowledge of joint cartilage
              (pre-activity, n = 24).
            </strong>{" "}
            (A) Prior attention to cartilage health. (B) Self-rated
            understanding (mean 2.08/5; 70.8% rated 1–2). (C) Knowledge of
            cartilage components: 79.2% could name at most a few components or
            functions. All respondents answered every item.
          </>
        }
      />
      <Figure
        src={`${ACTIVITY_FIG}/fig2-product-training-en.avif`}
        alt="Figure 12 — product use, training, and perceived changes (pre-activity)"
        width={4000}
        height={2165}
        caption={
          <>
            <strong>
              Figure 12 | Product use, training, and perceived changes
              (pre-activity, n = 24).
            </strong>{" "}
            (A) Products ever used (multi-select; 16/24 had used at least one
            product). (B) Perceived change during product use; 7/24 reported
            improvement. (C) Targeted exercise or rehabilitation training; 13/24
            had trained. (D) Perceived change after training; 7/24 reported
            improvement. Subjective improvement is not clinical evidence of
            cartilage repair and cannot be attributed to a product or training
            alone.
          </>
        }
      />
      <Figure
        src={`${ACTIVITY_FIG}/fig3-pre-post-change-en.avif`}
        alt="Figure 13 — pre-post change in self-rated knowledge and willingness"
        width={4000}
        height={859}
        caption={
          <>
            <strong>
              Figure 13 | Pre-post change in self-rated knowledge and willingness
              (paired, n = 24).
            </strong>{" "}
            (A) Self-rated understanding increased from a mean of 2.08 to 3.63
            (1–5 scale). (B) Willingness to use a hypothetical cartilage-repair
            product increased from 33.3% to 54.2% (fairly/very willing). (C)
            Individual paired changes. These simulated changes are illustrative
            and not causal.
          </>
        }
      />
      <Figure
        src={`${ACTIVITY_FIG}/fig4-post-knowledge-needs-en.avif`}
        alt="Figure 14 — post-activity knowledge and information needs"
        width={4000}
        height={1321}
        caption={
          <>
            <strong>
              Figure 14 | Post-activity knowledge and information needs (n = 24).
            </strong>{" "}
            (A) Correct answer rate by knowledge question; the mean was 79.2%
            (6.33/8). (B) Distribution of individual total scores. (C)
            Information participants most wanted before using a hypothetical
            product; reliable human evidence and long-term risks were the most
            common topics (68 selections in total).
          </>
        }
      />
      <Figure
        src={`${ACTIVITY_FIG}/fig5-feedback-themes-en.avif`}
        alt="Figure 15 — illustrative feedback themes before and after the activity"
        width={4000}
        height={1869}
        caption={
          <>
            <strong>
              Figure 15 | Illustrative feedback themes from the simulated
              open-text responses before and after the activity.
            </strong>{" "}
            The themes are not verbatim quotes and are not frequency-counted.
          </>
        }
      />
      </ExtendCard>

      <h4
        id="ihp-nest-synbio-lecture"
        className="mt-5 mb-3"
        data-toc="include"
      >
        SynBio lecture — pre/post questionnaire
      </h4>
      <p>
        Our synthetic-biology lectures were evaluated with a pre/post
        questionnaire completed by the same 76 participants: eight questions
        before the lecture (prior exposure, self-rated understanding, attitudes
        and expectations) and twelve after it (knowledge, attitude, willingness
        and technology acceptance). The figures summarise the baseline we
        started from, what changed, and what participants still wanted to know.
        The figures show an illustrative response distribution for the 76
        participants; individual submissions are not reproduced.
      </p>
      <ExtendCard title="Questionnaire figures: knowledge, acceptance and feedback">
      <Figure
        src={`${LECTURE_FIG}/edu-s1.avif`}
        alt="Figure 16 — pre-lecture awareness and self-rated understanding"
        width={4000}
        height={1297}
        caption={
          <>
            <strong>
              Figure 16 | Pre-lecture awareness and self-rated understanding (n =
              76).
            </strong>{" "}
            (A) Prior exposure to synthetic biology. (B) Self-rated
            understanding (mean 2.16/5; 67.1% rated 1–2). (C) Prior awareness of
            iGEM. All participants answered every item.
          </>
        }
      />
      <Figure
        src={`${LECTURE_FIG}/edu-s2.avif`}
        alt="Figure 17 — pre-lecture attitudes and expectations"
        width={4000}
        height={1300}
        caption={
          <>
            <strong>
              Figure 17 | Pre-lecture attitudes and expectations (n = 76).
            </strong>{" "}
            (A) Feelings about synthetic biology (multi-select). (B) Overall
            attitude toward synthetic biology. (C) Topics participants most
            wanted to learn about before the lecture (up to three selections).
          </>
        }
      />
      <Figure
        src={`${LECTURE_FIG}/edu-s3.avif`}
        alt="Figure 18 — post-lecture knowledge, attitude, and information needs"
        width={4000}
        height={1300}
        caption={
          <>
            <strong>
              Figure 18 | Post-lecture knowledge, attitude, and information needs
              (n = 76).
            </strong>{" "}
            (A) Correct answer rate by knowledge question; the mean was 76.8%
            (3.84/5). (B) Post-lecture overall attitude. (C) Information
            participants most wanted after the lecture (up to three selections;
            219 selections in total).
          </>
        }
      />
      <Figure
        src={`${LECTURE_FIG}/edu-s4.avif`}
        alt="Figure 19 — self-rated understanding and technology acceptance"
        width={4000}
        height={992}
        caption={
          <>
            <strong>
              Figure 19 | Self-rated understanding and technology acceptance
              (paired, n = 76).
            </strong>{" "}
            (A) Self-rated understanding increased from a mean of 2.16 to 3.64
            (1–5 scale). (B) Willingness to work in a related field and
            acceptance of a product with non-live engineered output versus a
            product containing live engineered bacteria. The product scenario
            was hypothetical and the responses are simulated.
          </>
        }
      />
      <Figure
        src={`${LECTURE_FIG}/edu-s5.avif`}
        alt="Figure 20 — illustrative feedback themes before and after the lecture"
        width={4000}
        height={1844}
        caption={
          <>
            <strong>
              Figure 20 | Illustrative feedback themes before and after the
              lecture (n = 76).
            </strong>{" "}
            The statements are simulated feedback directions, not verbatim
            quotes, and are not frequency-counted.
          </>
        }
      />
      </ExtendCard>
    </>
  );
}

function MixedMethodsBlock() {
  return (
    <>
      <h3 className="mt-4 mb-3">Mixed methods research</h3>
      <p>
        Our work follows <strong>mixed-methods research</strong> (Creswell &amp;
        Plano Clark, 2018): understanding a complex social phenomenon cannot
        rely on a single type of data. We deliberately collect, analyze and
        integrate quantitative data (surveys and statistics — how many, how
        distributed, what relationships exist) and qualitative data
        (one-to-one interviews — why things happen, how people understand them,
        which contexts and mechanisms lie behind them). The NIH&rsquo;s
        mixed-methods guidance makes the same point: integrated quantitative and
        qualitative evidence explains a problem better than either type alone.
      </p>
      <p>
        In practice the survey gave us breadth — how common cartilage pain is,
        who it affects and which treatments fail — while the interviews gave us
        depth — why patients wait, why doctors under-diagnose, and how a device
        fits an operating room. We integrated the two in the PRD documents that
        opened each engineering cycle, so every design change can be traced back
        to a need that both kinds of evidence support.
      </p>
    </>
  );
}

function AnthroBlock() {
  return (
    <>
      <h3 className="mt-4 mb-3">Anthropology &amp; philosophy</h3>
      <p>
        We also fold humanities discussion and reflection into the project — not
        only about how cartilage health is diagnosed and healed, but also about
        the iGEM community and the ethics of synthetic biology. This lens keeps
        asking who is heard and who is missed when a technology enters the
        clinic: it shaped how we read the &ldquo;invisible&rdquo; pain in our
        survey and led us to work with anthropology scholars on the structural
        reasons small illnesses go unnoticed.
      </p>
      <p>
        The outcomes of that work — two papers written with anthropology
        scholars and the medical-anthropology lectures and seminars we ran for
        future doctors — are described under{" "}
        <a href="#ihp-nest-trust">
          <strong>T — Trust and Lasting Impact</strong>
        </a>
        .
      </p>
    </>
  );
}

/* The stakeholder interviews are grouped along the product path, matching
   the stakeholder map above the timeline. */
const TIMELINE_STAGES = [
  "Patient",
  "R&D",
  "Treatment",
  "Manufacturing",
  "Market access",
];

/* Deep links for the stage headings under "Stakeholder Interviews". */
const TIMELINE_STAGE_IDS: Record<string, string> = {
  Patient: "ihp-engagement-patient",
  "R&D": "ihp-engagement-rd",
  Treatment: "ihp-engagement-treatment",
  Manufacturing: "ihp-engagement-manufacturing",
  "Market access": "ihp-engagement-market-access",
};

function EngagementBlock() {
  return (
    <>
      <h3 className="mt-4 mb-3">Stakeholder Engagement</h3>

      <h4 id="ihp-stakeholders-map" className="mt-4 mb-3" data-toc="include">
        Stakeholders MAP
      </h4>
      <p>
        We wanted the stakeholders we interview to be comprehensive and the
        process to be orderly. We therefore arranged the interviews for each
        module according to the progress of the project design. In the end,{" "}
        <strong>56 stakeholders</strong> took part in our interviews and
        technical tests — patients, doctors, nurses, researchers, government
        officials and administrative bodies, manufacturers, business advisers,
        humanities scholars and artists.
      </p>
      <StakeholderChain
        stages={chainStages}
        note="Out of respect for patient privacy, every patient is anonymised unless they consented to appear on camera."
      />
      <p className="mt-4">
        In the Stakeholder Interviews we found it very hard to keep the
        interviews comprehensive and orderly in our work plan, so we developed a
        tool — <strong>StakeBridge</strong> — to help later teams organise their
        stakeholder-interview material. Talking with stakeholders showed us how
        willing many scholars are to communicate with student teams, while teams
        we met at other iGEM events told us that reaching stakeholders is
        difficult. Inspired by BioBricks and the parts registry, we want to
        build a stakeholder-engagement library that keeps accumulating
        experience and shows the stakeholders in a field who are willing to talk
        to teams. Organised along the product's path from R&amp;D to
        implementation, it collects roles, interview questions and integration
        cases, so a team that does not yet know whom to ask, what to ask or how
        to act can find a participation path that fits its own project.
      </p>
      {/* StakeBridge app: the interactive program is being implemented and
          will be embedded below this paragraph. */}

      <h4
        id="ihp-engagement-timeline"
        className="mt-5 mb-3"
        data-toc="include"
      >
        Stakeholder Interviews
      </h4>
      <p>
        What follows is a timeline of our interactions with the stakeholders who
        made our <a href="#nest">NEST-based</a> Integrated Human Practice
        possible. Each entry records whom we met and what we discussed; open
        “Read more” for the rationale behind the conversation, the interview
        summary and how the feedback changed the project.
      </p>
      {TIMELINE_STAGES.map((stage) => {
        const items = timelineItems.filter((item) => item.stage === stage);
        if (!items.length) return null;
        return (
          <section key={stage} className="ihp-timeline-stage">
            <h4
              id={TIMELINE_STAGE_IDS[stage]}
              className="ihp-timeline-stage__title"
              data-toc="include"
              data-toc-depth="3"
            >
              {stage}
            </h4>
            <Timeline items={items.map((item) => ({ ...item, date: "" }))} />
          </section>
        );
      })}

      <h4 className="mt-5 mb-3" data-toc="include">
        Further reading
      </h4>
      <ul>
        <li>
          Interested in the design details?{" "}
          <Link to="/design">Go to Design</Link>.
        </li>
        <li>
          Interested in the business plan?{" "}
          <Link to="/entrepreneurship">Go to Entrepreneurship</Link>.
        </li>
        <li>
          Interested in our anthropological and philosophical reflection?{" "}
          <Link to="/education">Go to Education</Link>.
        </li>
      </ul>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

const HP_PAGES = [
  { key: "toolbox", label: "Toolbox" },
  { key: "nest", label: "NEST" },
  { key: "engagement", label: "Stakeholder Engagement" },
];

function SectionSubnav({
  items,
  className = "eng-subnav",
}: {
  items: { id: string; label: string }[];
  className?: string;
}) {
  const jump = (id: string) => {
    if (!document.getElementById(id)) return;
    history.replaceState(null, "", `#${id}`);
    /* One easing curve that keeps tracking the heading, so late layout
       changes above the target never turn into an instant correction. */
    scrollToSection(id);
  };
  /* The second-level buttons are pure jump links: the page TOC already marks
     the section being read, so they carry no selected state of their own. */
  return (
    <nav className={className} aria-label="Page sections">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="eng-subnav-button"
          onClick={() => jump(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

function NestFrameworkBlock() {
  const rows = [
    {
      letter: "N",
      module: "Need-led Discovery",
      what: "Research the background of the problem and uncover the real pain points that still need solving.",
    },
    {
      letter: "E",
      module: "Evidence-based Co-design",
      what: "Study the literature and the real world, bring product-design questions back to the engineering team, and find solutions together.",
    },
    {
      letter: "S",
      module: "Situated Implementation",
      what: "Consider the concrete situations in which the product is implemented — production, market access and user experience — and adapt it so that access improves in practice.",
    },
    {
      letter: "T",
      module: "Trust and Lasting Impact",
      what: "Consider the lasting contribution the product can make to the target group, the industry and the iGEM community — earning the trust of users and partners and carrying social responsibility.",
    },
  ];
  return (
    <>
      <h3 className="mt-4 mb-3">NEST — the iHP framework</h3>
      <p>
        The four NEST modules organise the human-practices narrative: each one
        asks a different question about the product, from the first real need to
        the impact that outlasts the competition.
      </p>
      <div className="table-responsive mb-4">
        <table
          className="table table-bordered align-middle"
          aria-label="The NEST human-practices framework"
        >
          <thead className="table-primary">
            <tr>
              <th scope="col" style={{ width: "4.5rem" }}>
                Letter
              </th>
              <th scope="col">Module</th>
              <th scope="col">What we do</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.letter}>
                <th scope="row">{row.letter}</th>
                <td>
                  <strong>{row.module}</strong>
                </td>
                <td>{row.what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ToolboxPage() {
  const sections = [
    {
      id: "ihp-toolbox-nest",
      label: "NEST framework",
      node: <NestFrameworkBlock />,
    },
    { id: "ihp-toolbox-seed", label: "SEED", node: <SeedMethodBlock /> },
    {
      id: "ihp-toolbox-mixed",
      label: "Mixed Methods",
      node: <MixedMethodsBlock />,
    },
    {
      id: "ihp-toolbox-anthro",
      label: "Anthropology & Philosophy",
      node: <AnthroBlock />,
    },
  ];
  return (
    <>
      <SectionSubnav items={sections.map(({ id, label }) => ({ id, label }))} />
      {sections.map((entry) => (
        <section className="ihp-subpage" id={entry.id} key={entry.id}>
          {entry.node}
        </section>
      ))}
    </>
  );
}

const NEST_GLYPHS: Record<string, { w: number; h: number; d: string }> = {
  N: {
    w: 340,
    h: 400,
    d: "M409 3636 c-2 -3 -23 -7 -47 -10 -23 -3 -53 -13 -66 -23 -41 -30 -44 -45 -52 -298 -1 -49 -3 -103 -3 -118 0 -16 -4 -33 -7 -39 -4 -6 -6 -108 -6 -227 1 -119 1 -234 1 -256 -1 -22 -1 -48 0 -57 1 -21 1 -71 0 -95 -1 -10 0 -82 2 -161 1 -78 -1 -145 -4 -148 -3 -4 -1 -16 4 -27 8 -14 8 -22 -1 -27 -8 -5 -9 -10 -2 -14 7 -4 9 -140 6 -399 -5 -425 -7 -508 -18 -525 -3 -6 -2 -13 3 -16 5 -4 9 -93 9 -209 -1 -235 0 -463 1 -527 3 -207 0 -383 -9 -404 -22 -58 -37 -56 432 -56 l429 0 -6 82 c-3 45 -9 86 -13 92 -3 6 -7 117 -8 246 -1 129 -3 242 -4 250 0 8 2 71 6 140 7 117 8 279 5 730 -2 304 2 390 17 378 6 -6 12 -17 12 -24 0 -8 5 -14 10 -14 6 0 16 -12 22 -27 7 -16 20 -40 31 -55 10 -16 16 -28 13 -28 -3 0 4 -11 16 -25 12 -14 31 -40 42 -59 12 -19 37 -58 56 -87 19 -30 41 -67 49 -84 7 -16 17 -37 22 -45 5 -8 12 -22 16 -30 4 -8 12 -21 19 -30 52 -63 74 -95 74 -110 0 -10 9 -20 20 -23 11 -3 25 -19 31 -36 6 -17 15 -31 20 -31 5 0 9 -7 9 -15 0 -7 6 -18 13 -22 6 -4 21 -24 31 -43 10 -19 29 -46 41 -60 13 -14 26 -34 29 -45 3 -11 22 -37 41 -57 19 -20 35 -41 35 -46 0 -4 11 -19 25 -32 14 -13 25 -27 25 -32 0 -10 16 -31 43 -56 9 -9 17 -22 17 -29 0 -7 4 -13 10 -13 5 0 21 -23 35 -50 14 -28 33 -59 43 -69 9 -10 28 -37 40 -61 13 -23 45 -69 70 -102 26 -33 55 -75 64 -93 10 -18 26 -39 36 -47 10 -7 28 -30 41 -50 12 -21 27 -38 32 -38 5 0 9 -7 9 -15 0 -9 6 -18 14 -21 8 -3 18 -18 21 -34 3 -16 13 -34 21 -41 8 -6 14 -20 14 -30 0 -11 9 -27 20 -36 11 -10 20 -25 20 -34 0 -35 41 -39 429 -39 l379 0 14 23 c24 36 37 143 34 282 -2 72 -5 130 -6 130 -9 0 -27 1027 -19 1105 1 14 -1 37 -4 52 -3 16 -1 43 4 60 8 27 11 306 7 626 0 28 -6 70 -14 91 -8 23 -13 79 -13 133 1 51 0 192 0 313 -2 254 5 423 19 480 13 56 12 168 -2 202 -18 43 -74 93 -104 93 -14 0 -33 4 -42 9 -10 5 -46 5 -87 -1 -45 -6 -96 -6 -144 1 -50 6 -80 6 -87 0 -8 -7 -14 -6 -19 0 -3 6 -16 11 -28 11 -12 0 -53 3 -91 6 -96 9 -173 -9 -209 -48 -15 -17 -27 -37 -27 -44 0 -8 -4 -14 -8 -14 -9 0 -7 -251 3 -455 4 -66 8 -187 10 -270 1 -82 6 -202 9 -265 8 -127 9 -143 7 -180 -2 -64 -4 -117 -3 -135 0 -11 1 -54 1 -95 0 -41 0 -79 1 -85 5 -49 5 -265 0 -320 -4 -38 -8 -63 -8 -54 -1 8 -15 28 -32 44 -16 16 -30 34 -30 41 0 6 -20 32 -45 56 -25 25 -45 53 -45 63 0 10 -3 16 -6 12 -4 -3 -12 -1 -18 6 -23 24 -76 95 -76 102 0 3 -12 20 -27 36 -16 15 -41 47 -58 69 -16 22 -40 54 -52 69 -13 16 -23 36 -23 44 0 8 -18 34 -40 58 -22 24 -40 50 -40 56 0 7 -4 13 -9 13 -6 0 -16 11 -23 25 -23 43 -150 229 -169 248 -11 10 -19 26 -19 37 0 10 -3 20 -7 22 -10 4 -80 110 -106 158 -10 19 -24 40 -31 45 -6 6 -22 31 -36 58 -14 26 -37 62 -52 80 -16 17 -28 37 -28 43 0 5 -13 23 -28 40 -16 16 -44 58 -63 94 -18 36 -39 71 -46 78 -7 7 -13 20 -13 28 0 8 -4 14 -10 14 -5 0 -10 7 -10 15 0 9 -7 18 -15 21 -8 4 -15 15 -15 26 0 11 -13 39 -29 63 -16 24 -32 53 -36 64 -3 12 -11 21 -16 21 -5 0 -9 5 -9 12 0 7 -9 21 -20 33 -11 11 -28 31 -39 44 -24 32 -120 41 -180 18 -21 -9 -40 -14 -42 -12 -10 9 -183 27 -264 27 -49 0 -95 4 -101 9 -6 5 -13 7 -15 5z",
  },
  E: {
    w: 335,
    h: 400,
    d: "M2915 3619 c-22 -5 -96 -9 -165 -8 -69 0 -129 0 -135 0 -5 0 -68 -3 -140 -6 -152 -6 -230 -6 -540 -1 -126 2 -306 4 -400 5 -93 0 -179 0 -190 1 -433 10 -486 10 -491 -5 -4 -8 -24 -18 -46 -21 -32 -6 -42 -13 -59 -45 -18 -36 -19 -59 -18 -336 1 -164 1 -381 1 -483 0 -102 2 -309 4 -460 6 -401 6 -443 -1 -1035 -7 -634 -8 -753 -6 -978 1 -92 0 -171 -4 -176 -3 -5 7 -23 21 -40 l26 -31 1157 0 c887 0 1160 3 1169 12 7 7 12 22 12 35 0 12 5 34 12 48 9 19 9 31 1 44 -7 11 -8 23 -1 34 5 10 5 17 0 17 -10 0 -8 185 3 288 6 57 4 67 -21 110 -15 26 -35 52 -43 59 -25 19 -80 15 -120 -9 -26 -17 -52 -23 -96 -23 -33 -1 -65 -4 -71 -7 -8 -5 -83 -3 -104 2 -9 3 -316 -1 -570 -7 -229 -5 -307 -8 -420 -16 -25 -2 -49 0 -55 4 -5 3 -35 3 -65 -2 -30 -4 -74 -8 -98 -8 l-43 -1 6 77 c12 164 17 327 18 555 0 131 1 238 1 238 1 0 33 3 71 6 39 3 84 9 100 13 17 4 145 9 285 10 298 3 248 3 390 -5 63 -3 149 -7 192 -8 42 0 80 -4 83 -8 4 -4 15 -3 24 1 9 5 52 12 96 16 102 9 140 31 156 88 14 50 18 338 5 422 -10 68 -26 89 -90 125 -43 23 -49 23 -93 11 -45 -12 -190 -20 -378 -20 -44 -1 -129 -1 -190 -2 -60 0 -159 0 -220 0 -60 0 -144 0 -185 -1 -41 0 -84 0 -95 1 -11 0 -40 1 -64 1 -24 0 -49 4 -55 9 -6 5 -22 11 -36 13 -23 3 -25 8 -28 58 -7 150 -4 605 5 647 5 20 12 22 111 27 59 3 123 7 142 10 19 3 118 8 220 11 102 3 212 8 245 10 33 3 65 5 70 6 6 0 23 -2 38 -6 16 -3 44 0 63 7 25 9 37 9 45 1 8 -8 19 -9 37 -2 15 6 60 9 102 8 41 -1 134 -2 205 -1 72 0 150 -1 175 -4 25 -3 70 -8 100 -11 l55 -4 28 42 c26 42 27 46 29 209 4 401 -2 440 -65 479 -37 23 -42 23 -102 10z",
  },
  S: {
    w: 320,
    h: 400,
    d: "M1680 3736 c-3 -2 -50 -6 -105 -9 -55 -3 -116 -10 -135 -16 -19 -6 -49 -11 -66 -11 -30 0 -67 -12 -141 -46 -17 -8 -40 -14 -52 -14 -12 0 -21 -5 -21 -11 0 -5 -17 -17 -37 -25 -20 -9 -61 -31 -90 -50 -29 -19 -60 -34 -67 -34 -8 0 -16 -6 -19 -14 -3 -7 -19 -16 -35 -19 -16 -3 -36 -12 -44 -20 -8 -8 -28 -18 -45 -21 -18 -4 -51 -28 -81 -59 -167 -171 -202 -210 -202 -221 0 -8 -9 -25 -20 -39 -11 -14 -20 -30 -20 -37 0 -6 -11 -26 -25 -44 -14 -18 -25 -43 -25 -54 0 -12 -8 -31 -17 -41 -39 -46 -54 -112 -59 -257 -2 -82 1 -162 7 -190 6 -27 12 -60 14 -74 1 -14 5 -32 8 -40 3 -8 8 -43 12 -77 3 -35 12 -75 20 -90 8 -16 15 -34 15 -40 0 -27 70 -160 104 -198 20 -22 36 -43 36 -47 0 -5 7 -8 15 -8 8 0 15 -6 15 -13 0 -14 68 -80 94 -90 9 -4 16 -11 16 -17 0 -5 16 -16 35 -24 19 -8 35 -20 35 -25 0 -6 4 -11 9 -11 6 0 22 -11 37 -25 25 -24 38 -32 117 -72 17 -9 36 -22 40 -30 4 -7 21 -13 36 -13 16 0 50 -8 77 -19 79 -30 116 -40 174 -46 30 -4 66 -11 80 -15 14 -5 39 -12 55 -14 48 -9 146 -32 195 -47 25 -7 55 -14 68 -15 39 -5 126 -23 251 -53 46 -11 93 -28 105 -38 38 -32 115 -118 121 -135 4 -10 11 -18 16 -18 5 0 9 -9 9 -19 0 -10 7 -21 15 -25 8 -3 15 -13 15 -22 0 -10 7 -25 15 -34 23 -26 23 -128 -1 -171 -10 -18 -25 -38 -31 -42 -7 -4 -13 -19 -13 -32 0 -18 -6 -25 -19 -25 -10 0 -21 -6 -24 -14 -10 -26 -100 -136 -111 -136 -6 0 -38 -14 -70 -30 -32 -17 -67 -30 -77 -30 -10 0 -20 -4 -23 -9 -12 -18 -291 -37 -302 -20 -3 5 -9 7 -14 4 -14 -8 -195 31 -275 60 -38 14 -76 25 -82 25 -7 0 -36 11 -65 24 -85 39 -202 86 -214 86 -6 0 -42 29 -80 65 -39 37 -78 65 -89 65 -12 0 -29 6 -39 13 -15 11 -24 11 -52 -2 -18 -9 -33 -20 -34 -24 0 -14 -64 -97 -103 -134 -20 -20 -37 -40 -37 -44 0 -5 -17 -26 -38 -47 -112 -116 -124 -132 -127 -160 -1 -16 -4 -33 -7 -38 -3 -5 -8 -22 -12 -37 -8 -35 5 -53 52 -72 18 -8 46 -27 61 -42 46 -47 105 -93 119 -93 6 0 12 -4 12 -8 0 -5 18 -14 40 -21 22 -6 40 -16 40 -21 0 -6 11 -10 25 -10 15 0 47 -17 76 -40 28 -22 57 -40 65 -40 12 0 62 -22 126 -56 14 -8 33 -14 42 -14 9 0 41 -9 71 -19 52 -18 90 -20 659 -21 479 0 607 2 617 12 8 7 47 28 87 47 39 19 72 40 72 47 0 7 14 22 30 34 17 12 30 27 30 33 1 7 12 21 26 32 14 11 31 26 37 33 7 7 22 23 35 34 12 12 22 27 22 34 0 7 11 26 25 42 13 16 29 40 35 53 13 31 33 62 44 70 4 4 21 35 36 69 15 34 34 70 43 80 8 10 18 28 22 41 4 13 11 29 16 34 9 13 49 156 56 205 15 106 14 239 -2 286 -9 27 -20 53 -24 59 -4 5 -23 56 -41 112 -22 65 -44 113 -62 132 -15 16 -28 34 -28 38 -1 4 -24 29 -53 55 -29 26 -70 64 -92 84 -22 20 -53 42 -70 49 -16 7 -47 27 -69 44 -21 17 -42 31 -45 31 -3 0 -19 12 -34 26 -38 35 -198 116 -274 139 -35 10 -63 22 -63 27 0 4 -11 8 -25 8 -14 0 -25 4 -25 8 0 4 -8 8 -17 9 -37 4 -129 22 -163 32 -19 6 -56 11 -82 11 -26 0 -50 5 -53 10 -4 6 -18 10 -33 10 -29 -1 -42 1 -147 26 -38 9 -71 21 -73 25 -2 5 -12 9 -23 9 -22 0 -192 79 -197 91 -2 5 -10 9 -18 9 -8 0 -14 7 -14 15 0 8 -6 15 -14 15 -8 0 -16 7 -20 15 -3 8 -11 15 -18 15 -20 0 -47 69 -54 140 -9 101 -7 129 15 176 12 24 21 51 21 59 0 8 5 15 10 15 6 0 10 4 10 10 0 20 35 90 46 90 11 0 54 45 54 58 0 11 94 91 152 128 29 19 64 35 78 35 14 1 30 2 35 3 96 16 178 15 265 -4 52 -12 115 -25 139 -30 24 -6 50 -15 57 -21 8 -6 21 -9 29 -5 8 3 15 1 15 -5 0 -6 5 -7 10 -4 6 3 17 -1 26 -9 8 -9 25 -16 38 -16 12 0 31 -7 42 -15 10 -8 29 -15 40 -15 12 0 27 -7 34 -15 7 -8 20 -15 30 -15 10 0 23 -7 30 -15 7 -8 18 -15 25 -15 7 0 27 -13 45 -30 18 -16 40 -30 50 -30 10 0 20 -5 22 -11 6 -17 107 -13 127 5 10 9 22 16 27 16 22 0 109 111 140 180 19 41 39 82 44 90 6 8 14 25 20 37 5 12 23 29 39 38 19 9 33 26 37 43 3 15 10 40 15 56 5 16 9 33 9 38 0 15 -68 78 -85 78 -8 0 -15 4 -15 8 0 14 -136 142 -151 142 -4 0 -41 16 -82 35 -42 19 -87 37 -101 41 -14 3 -30 12 -37 20 -6 8 -16 14 -21 14 -5 0 -16 7 -24 15 -9 8 -29 15 -45 15 -16 0 -29 4 -29 9 0 5 -26 15 -57 21 -58 11 -150 38 -168 48 -5 3 -16 7 -25 7 -8 1 -40 7 -70 13 -61 12 -263 26 -270 18z",
  },
  T: {
    w: 303,
    h: 400,
    d: "M274 3566 c-61 -28 -76 -58 -74 -142 1 -33 3 -117 5 -189 1 -71 5 -141 8 -155 3 -14 6 -44 6 -67 1 -29 8 -50 21 -63 11 -11 20 -22 20 -25 0 -3 8 -14 17 -25 14 -16 30 -20 74 -20 30 0 59 3 63 8 11 11 78 11 98 1 10 -6 162 -11 339 -12 231 -2 322 -6 327 -14 4 -7 7 -38 5 -70 -1 -32 2 -71 7 -88 10 -34 22 -241 22 -357 -1 -43 3 -80 9 -83 5 -4 7 -11 4 -16 -6 -8 -10 -167 -5 -179 6 -17 5 -139 -2 -159 -5 -14 -5 -28 1 -35 12 -14 12 -123 0 -154 -9 -25 -16 -203 -24 -652 -3 -146 -8 -292 -13 -325 -4 -33 -7 -157 -7 -275 0 -166 3 -221 14 -240 10 -18 14 -54 12 -127 l-2 -103 310 0 309 0 17 27 c21 31 23 75 30 748 3 248 5 459 6 470 2 45 -11 204 -22 265 -12 68 -20 1100 -9 1100 6 0 11 65 14 183 0 44 6 71 14 76 8 4 84 7 170 5 146 -2 196 -5 312 -18 49 -6 282 -8 314 -2 11 1 22 8 24 14 2 7 8 12 14 12 29 0 62 68 53 110 -15 70 -12 228 7 320 22 109 21 101 14 158 -5 48 -32 81 -81 100 -40 16 -184 25 -199 13 -6 -5 -34 -13 -61 -16 -28 -3 -59 -8 -71 -10 -58 -12 -587 -2 -864 17 -8 0 -20 5 -27 10 -7 5 -14 5 -18 -2 -4 -6 -13 -7 -23 -2 -9 5 -262 9 -562 10 l-545 2 -51 -24z",
  },
};

const NEST_GLYPH_COLORS: Record<string, string> = {
  N: "#004898",
  E: "#3090d8",
  S: "#0088f0",
  T: "#0068d0",
};

/* Hand-drawn NEST letters taken from the Figma wordmark, embedded as vectors
   so they stay crisp and need no extra assets. */
function NestGlyph({ letter }: { letter: string }) {
  const glyph = NEST_GLYPHS[letter];
  if (!glyph) return null;
  return (
    <svg
      className="ihp-nest-tab__letter"
      viewBox={`0 0 ${glyph.w} ${glyph.h}`}
      style={{ color: NEST_GLYPH_COLORS[letter] }}
      aria-hidden="true"
      focusable="false"
    >
      <g transform={`translate(0 ${glyph.h}) scale(0.1 -0.1)`}>
        <path d={glyph.d} fill="currentColor" />
      </g>
    </svg>
  );
}

const NEST_TABS = [
  { id: "ihp-nest-need", letter: "N", label: "Need-led Discovery" },
  { id: "ihp-nest-codesign", letter: "E", label: "Evidence-based Co-design" },
  { id: "ihp-nest-situated", letter: "S", label: "Situated Implementation" },
  { id: "ihp-nest-trust", letter: "T", label: "Trust and Lasting Impact" },
];

/* NEST module switcher: one card per module, letter badge + label. The tabs
   are pure jump links — the page TOC already marks the module being read, so
   no tab carries a selected state. */
function NestSubnav() {
  const jump = (id: string) => {
    if (!document.getElementById(id)) return;
    history.replaceState(null, "", `#${id}`);
    scrollToSection(id);
  };
  return (
    <nav className="ihp-nest-tabs" aria-label="NEST modules">
      {NEST_TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className="ihp-nest-tab"
          onClick={() => jump(tab.id)}
        >
          <NestGlyph letter={tab.letter} />
          <span className="ihp-nest-tab__label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

function NestPage() {
  const sections = [
    {
      id: "ihp-nest-need",
      label: "N · Need-led Discovery",
      node: <DiscoveryBlock />,
    },
    {
      id: "ihp-nest-codesign",
      label: "E · Evidence-based Co-design",
      node: <CoDesignBlock />,
    },
    {
      id: "ihp-nest-situated",
      label: "S · Situated Implementation",
      node: <SituatedBlock />,
    },
    {
      id: "ihp-nest-trust",
      label: "T · Trust and Lasting Impact",
      node: <ImpactBlock />,
    },
  ];
  return (
    <>
      <NestSubnav />
      {sections.map((entry) => (
        <section className="ihp-subpage" id={entry.id} key={entry.id}>
          {entry.node}
        </section>
      ))}
    </>
  );
}

/** Whole-page swipe between the pages, reusing the cross-page transition from
 *  the Experiments ↔ Results pair. Set to false for instant switching. */
const HP_PAGE_SWIPE = true;
/** Matches the cross-page swipe transition in toc.css. */
const HP_PAGE_SWIPE_MS = 640;
/** Keeps the incoming section heading just below the fixed site header. */
const HP_SECTION_OFFSET = 96;

export function HumanPractices() {
  /* Toolbox is preselected on mount: the page never starts in the bare
     overview state, which avoids the layout/scroll edge cases around it. */
  const [page, setPage] = useState<number | null>(0);
  const navRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const busyRef = useRef(false);
  const timerRef = useRef(0);
  const pageRef = useRef<number | null>(0);
  const openScrollRef = useRef<number | null>(null);
  const actionsRef = useRef<{
    open: (index: number) => void;
    collapse: () => void;
    reset: () => void;
  }>({
    open: () => {},
    collapse: () => {},
    reset: () => {},
  });

  const setPageSync = (value: number | null) => {
    pageRef.current = value;
    /* The overview block sits directly above NEST, so it has no footer: its
       last element is the three buttons. */
    document.documentElement.classList.toggle("ihp-overview", value === null);
    flushSync(() => setPage(value));
  };

  /* Keep the level-1 buttons just under the site header when a page opens,
     so they stay in place while its sub-panels switch; the section starts
     right below them. */
  const alignSectionTop = () => {
    const nav = navRef.current;
    if (!nav) return;
    const top = Math.max(
      0,
      nav.getBoundingClientRect().top + window.scrollY - HP_SECTION_OFFSET,
    );
    window.scrollTo({ top, behavior: "instant" });
    openScrollRef.current = window.scrollY;
  };

  /* Overview state: the page ends just after the three buttons. */
  const alignOverviewBottom = () => {
    const article = articleRef.current;
    if (!article) return;
    const bottom = article.getBoundingClientRect().bottom + window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: Math.min(max, Math.max(0, bottom - window.innerHeight + 8)),
      behavior: "instant",
    });
    openScrollRef.current = null;
  };

  const openSection = (index: number) => {
    setPageSync(index);
    alignSectionTop();
  };

  const collapseSection = () => {
    setPageSync(null);
    alignOverviewBottom();
  };

  const reduceMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Entering from the overview: "down" (open) / "up" (back to the overview).
     Switching sub-panels: "next" / "prev" pan the section only. */
  const runSwipe = (
    direction: "down" | "up" | "next" | "prev",
    swap: () => void,
  ) => {
    const root = document.documentElement;
    busyRef.current = true;
    window.clearTimeout(timerRef.current);

    type ViewTransitionDocument = Document & {
      startViewTransition?: (
        update: () => void,
      ) => { finished: Promise<void> };
    };
    const startViewTransition = (document as ViewTransitionDocument)
      .startViewTransition;
    if (startViewTransition) {
      root.setAttribute("data-ihp-swipe", direction);
      const transition = startViewTransition.call(document, swap);
      void transition.finished
        .catch(() => undefined)
        .finally(() => {
          root.removeAttribute("data-ihp-swipe");
          busyRef.current = false;
        });
      return;
    }

    /* Fallback for browsers without View Transitions: the horizontal stage
       slide used by the cross-page swipe. */
    const exit = direction === "next" || direction === "down" ? "left" : "right";
    const enter = exit === "left" ? "right" : "left";
    root.classList.add(`page-swipe-exit-${exit}`);
    timerRef.current = window.setTimeout(() => {
      root.classList.remove(`page-swipe-exit-${exit}`);
      swap();
      root.classList.add(`page-swipe-enter-${enter}`, "page-swipe-instant");
      void document.body.offsetHeight;
      requestAnimationFrame(() => {
        root.classList.remove("page-swipe-instant");
        root.classList.add("page-swipe-run");
        timerRef.current = window.setTimeout(() => {
          root.classList.remove(`page-swipe-enter-${enter}`, "page-swipe-run");
          busyRef.current = false;
        }, HP_PAGE_SWIPE_MS);
      });
    }, HP_PAGE_SWIPE_MS);
  };

  /* Switching between two open pages: the buttons and the overview above
     stay exactly where they are. The outgoing page is cloned into a ghost
     layer so both pages pan at the same time, inside the section's column:
     the old one leaves through one edge while the new one enters from the
     other. */
  const switchPage = (index: number) => {
    const viewport = document.querySelector<HTMLElement>(
      ".ihp-section-viewport",
    );
    const current = viewport?.querySelector<HTMLElement>(".ihp-section");
    const direction = index > (pageRef.current as number) ? "next" : "prev";
    busyRef.current = true;
    window.clearTimeout(timerRef.current);
    if (!viewport || !current || reduceMotion()) {
      setPageSync(index);
      busyRef.current = false;
      return;
    }
    const ghost = current.cloneNode(true) as HTMLElement;
    ghost.classList.add("ihp-section-ghost", `ihp-section-ghost-${direction}`);
    ghost.setAttribute("aria-hidden", "true");
    viewport.appendChild(ghost);
    setPageSync(index);
    const incoming = viewport.querySelector<HTMLElement>(
      ".ihp-section:not(.ihp-section-ghost)",
    );
    incoming?.classList.add(`ihp-section-enter-${direction}`);
    timerRef.current = window.setTimeout(() => {
      ghost.remove();
      incoming?.classList.remove(`ihp-section-enter-${direction}`);
      busyRef.current = false;
    }, 320);
  };

  /* The deck's pages have stable URL hashes so links can target them:
     #toolbox, #nest, #stakeholder-engagement (plus the sub-section ids). */
  const syncHash = (index: number | null) => {
    const id =
      index === null
        ? ""
        : ["toolbox", "nest", "stakeholder-engagement"][index] ?? "";
    const url = id
      ? `#${id}`
      : `${window.location.pathname}${window.location.search}`;
    history.replaceState(null, "", url);
  };

  const selectPage = (index: number) => {
    if (busyRef.current || index === pageRef.current) return;
    syncHash(index);
    const wasOpen = pageRef.current !== null;
    if (wasOpen) {
      switchPage(index);
      return;
    }
    if (!HP_PAGE_SWIPE || reduceMotion()) {
      openSection(index);
      return;
    }
    runSwipe("down", () => openSection(index));
  };

  const collapseWithSwipe = () => {
    if (busyRef.current || pageRef.current === null) return;
    if (!HP_PAGE_SWIPE || reduceMotion()) {
      collapseSection();
      return;
    }
    runSwipe("up", collapseSection);
  };

  /* Overview: once the page has scrolled down to the buttons, a further
     wheel-down opens the Toolbox page instead of dead-ending. A page that is
     already open is left to normal scrolling (no wheel lock). */
  useEffect(() => {
    if (page !== null) return;
    const onWheel = (event: WheelEvent) => {
      if (event.deltaY <= 0 || busyRef.current) return;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY < max - 24) return; /* scroll to the buttons first */
      event.preventDefault();
      actionsRef.current.open(0);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [page]);

  /* Back at the very top the page returns to the overview-only state, so a
     further scroll down locks at the three buttons again. */
  const resetToOverview = () => {
    if (busyRef.current || pageRef.current === null) return;
    setPageSync(null);
    syncHash(null);
    openScrollRef.current = null;
  };

  actionsRef.current = {
    open: selectPage,
    collapse: collapseWithSwipe,
    reset: resetToOverview,
  };

  /* Links from the stakeholder timeline jump to the syringe questionnaire on
     the NEST page: open that page if needed, then align the questionnaire.
     Figures above it load lazily, so the alignment is repeated until the
     heading settles just below the sticky header. */
  useEffect(() => {
    const scrollToQuestionnaire = (attempt = 0) => {
      const el = document.getElementById("ihp-syringe-questionnaire");
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (Math.abs(top - 130) > 24) {
        window.scrollTo({
          top: top + window.scrollY - 130,
          behavior: "instant",
        });
      }
      if (attempt < 4) {
        window.setTimeout(() => scrollToQuestionnaire(attempt + 1), 500);
      }
    };
    const openQuestionnaire = () => {
      if (document.getElementById("ihp-syringe-questionnaire")) {
        history.replaceState(null, "", "#ihp-syringe-questionnaire");
        scrollToQuestionnaire();
        return;
      }
      actionsRef.current.open(1);
      window.setTimeout(() => {
        history.replaceState(null, "", "#ihp-syringe-questionnaire");
        scrollToQuestionnaire();
      }, 750);
    };
    window.addEventListener("ihp:open-questionnaire", openQuestionnaire);
    return () =>
      window.removeEventListener("ihp:open-questionnaire", openQuestionnaire);
  }, []);

  /* Incoming links: #toolbox / #nest / #stakeholder-engagement open that page,
     and any #ihp-… anchor (also from the other pages) aligns the section.
     Figures above some targets load lazily, so the alignment is repeated
     until the heading settles below the sticky header. */
  useEffect(() => {
    const pageOf = (id: string): number | null => {
      if (id === "toolbox" || id.startsWith("ihp-toolbox")) return 0;
      if (
        id === "nest" ||
        id.startsWith("ihp-nest") ||
        id === "ihp-syringe-questionnaire"
      )
        return 1;
      if (id === "stakeholder-engagement" || id.startsWith("ihp-engagement"))
        return 2;
      return null;
    };
    let timer = 0;
    const jump = () => {
      const raw = window.location.hash.replace(/^#/, "");
      if (!raw) return;
      let id: string;
      try {
        id = decodeURIComponent(raw);
      } catch {
        return;
      }
      const target = pageOf(id);
      if (target === null) return;
      const align = (attempt = 0) => {
        const el = document.getElementById(id);
        const anchor = el ?? navRef.current;
        if (!anchor) return;
        const top = anchor.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
        if (el && attempt < 4) {
          window.clearTimeout(timer);
          timer = window.setTimeout(() => align(attempt + 1), 450);
        }
      };
      if (pageRef.current !== target) {
        setPageSync(target);
        requestAnimationFrame(() => align());
      } else {
        align();
      }
    };
    jump();
    window.addEventListener("hashchange", jump);
    return () => {
      window.removeEventListener("hashchange", jump);
      window.clearTimeout(timer);
    };
  }, []);

  /* Touch / keyboard can still return to the overview; the wheel is left to
     the page so the reader keeps a normal scroll. */
  useEffect(() => {
    let touchY = 0;
    const atSectionTop = () =>
      pageRef.current !== null &&
      openScrollRef.current !== null &&
      window.scrollY <= openScrollRef.current + 2;

    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (event: TouchEvent) => {
      const y = event.touches[0]?.clientY ?? 0;
      if (y > touchY + 6 && atSectionTop() && !busyRef.current) {
        actionsRef.current.collapse();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === "ArrowUp" || event.key === "PageUp") &&
        atSectionTop() &&
        !busyRef.current
      ) {
        event.preventDefault();
        actionsRef.current.collapse();
      }
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("ihp-overview", page === null);
  }, [page]);

  // Leave no swipe classes behind if the page unmounts mid-transition.
  useEffect(
    () => () => {
      window.clearTimeout(timerRef.current);
      const root = document.documentElement;
      root.classList.remove(
        "ihp-overview",
        "page-swipe-exit-left",
        "page-swipe-exit-right",
        "page-swipe-enter-left",
        "page-swipe-enter-right",
        "page-swipe-run",
        "page-swipe-instant",
      );
      root.removeAttribute("data-ihp-swipe");
    },
    [],
  );

  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article ref={articleRef}>
          <h2 className="mb-4">Integrated Human Practices</h2>
          <p>
            Integrated Human Practices is how our project meets the world
            outside the laboratory. Because NEST is a material intended to enter
            the human body, we kept the design deliberately cautious: every step
            should answer a real problem. Early in our field work we noticed an
            odd inversion — the people around us who described cartilage pain
            were many, while the cases recorded in the medical system were few.
            Below this overview the page is split into three pages: the{" "}
            <a href="#toolbox">
              <strong>Toolbox</strong>
            </a>{" "}
            explains the methods we used,{" "}
            <a href="#nest">
              <strong>NEST</strong>
            </a>{" "}
            tells the story of its four narrative modules — Need-led Discovery,
            Evidence-based Co-design, Situated Implementation and Trust and
            Lasting Impact — and{" "}
            <a href="#stakeholder-engagement">
              <strong>Stakeholder Engagement</strong>
            </a>{" "}
            collects the stakeholder map and the interviews behind every step.
            Use the three buttons to open a page.
          </p>
          <div
            className={`eng-module-nav ihp-page-nav${
              page !== null ? " ihp-page-nav--selected" : ""
            }`}
            ref={navRef}
          >
            {HP_PAGES.map((entry, index) => (
              <button
                key={entry.key}
                type="button"
                className={`eng-module-button ${
                  page === index ? "active" : ""
                }`}
                aria-pressed={page === index}
                onClick={() => selectPage(index)}
              >
                {entry.label}
              </button>
            ))}
          </div>
          {page !== null && (
            <div className="ihp-section-viewport">
              <div className="ihp-section">
                {page === 0 && <ToolboxPage />}
                {page === 1 && <NestPage />}
                {page === 2 && <EngagementBlock />}
              </div>
            </div>
          )}
          {/* The scrolling SEED wheel follows the [data-seed-phase] cycle
              paragraphs; it collapses on its own where they are not shown. */}
          <SeedReaderRail />
        </article>
      </div>
    </div>
  );
}
