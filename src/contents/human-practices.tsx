import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { flushSync } from "react-dom";
import { Timeline, type TimelineItem } from "../components/Timeline";
import { StakeholderChain } from "../components/StakeholderChain";
import { TransparentImage } from "../components/TransparentImage";
import { SeedReaderRail } from "./human-practices/SeedReader";
import "./human-practices.css";

/** All figures live on the team static host. */
const SURVEY_FIG =
  "https://static.igem.wiki/teams/6102/wiki/images/engagement/ihp/questionnaire/h";
const ACTIVITY_FIG =
  "https://static.igem.wiki/teams/6102/wiki/images/engagement/ihp/questionnaire/l";
const SYRINGE_FIG =
  "https://static.igem.wiki/teams/6102/wiki/images/engagement/ihp/questionnaire/r";
const LECTURE_FIG =
  "https://static.igem.wiki/teams/6102/wiki/images/engagement/ihp/questionnaire/s";
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
}: {
  src: string;
  alt: string;
  caption: React.ReactNode;
}) {
  return (
    <figure className="ihp-figure">
      <img src={src} alt={alt} loading="lazy" />
      <figcaption>{caption}</figcaption>
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
 * Each entry records the stage of the product path, a card title and summary,
 * and the Rationale / Interview summary / Integration behind "Read more".
 */
function stakeholder(
  date: string,
  title: string,
  summary: string,
  rationale: string,
  interview: string,
  integration: ReactNode,
  imageId?: string,
): TimelineItem {
  return {
    date,
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

const timelineItems: TimelineItem[] = [
  stakeholder(
    "Patient",
    "Xuan Ge — cartilage injury in a competitive tennis player",
    "A varsity tennis player with two severe sprains described clear cartilage damage on CT that was treated with painkillers, followed by two hours of daily rehabilitation with limited relief. His story showed us that focal defects are a major, under-treated form of cartilage injury and that recovery is slow and burdensome.",
    "After our survey showed that focal cartilage defects are a common form of hyaline cartilage injury, we looked for a high-risk group to interview and approached a key member of the Zhejiang University tennis team with ten years of competitive play.",
    "He described two major sprains. After the first, a CT showed obvious cartilage damage, but with no good early treatment he was sent home with painkillers; rehabilitation through a rehabilitation physician and TCM physiotherapy took about two hours a day — “and that was with a team doctor” — yet helped only partially. A teammate who ruptured an ACL received an artificial ligament and recovered quickly, but the hard implant kept wearing the remaining cartilage, and doctors had no solution.",
    "The interview confirmed focal defects as a key target and pushed us to design a material that fits all kinds of hyaline cartilage injury. The pain point of slow, cumbersome rehabilitation led us to the idea of improving the rehabilitation experience, which later became the AI-guided smart mirror developed with the biomedical engineering team.",
    "ihp-01",
  ),
  stakeholder(
    "Patient",
    "Yue Wang, Yu Xu and Fangrui Liang — the invisible pain after surgery",
    "Three young patients with post-operative cartilage damage described persistent pain that doctors called normal and that family and friends could not see. Their anxiety and self-doubt pushed us to treat the psychological and social side of cartilage health as part of the problem.",
    "We met Yu Xu at the iGEM East China meet-up and found Yue Wang and Fangrui Liang through a Xiaohongshu discussion thread; all three had direct experience of post-operative cartilage injury.",
    "Yu Xu had ACL reconstruction; her doctors said the artificial ligament recovers faster but is harder and keeps wearing the cartilage, with no good answer for the resulting damage. Yue Wang developed osteoarthritis after hip surgery; follow-up visits concluded that her discomfort was normal, and rehabilitation could not address the persistent friction caused by a slightly misplaced joint. Fangrui Liang's wrist surgery affected her function even more. They described anxiety, irritability and self-blame because the joint is internal and leaves no visible scar for others to see.",
    "We recognised that doctors' neglect and patients' psychological burden deserve attention, and that the environment around patients has to change. We ran public lectures on cartilage health, reflected on the structural causes of neglect from an anthropological perspective, wrote two survey reports and held a roundtable with medical students on rehabilitation.",
  ),
  stakeholder(
    "Patient",
    "Grandpa Gu — cartilage care in a remote village",
    "In Yantan, a remote village in Zhejiang, an elderly manual worker with years of arthritis could only take local herbal medicine and painkillers; the nearest hospital is an hour away and chronic care is scarce. His case showed us how unequal access to care is and became an example in the report we submitted to the Hangzhou Health Commission.",
    "To understand regional differences in care, we visited Yantan village — a small, seasonal-tourism village with many left-behind elderly people and limited transport.",
    "He has had arthritis for more than five years and still suffers from it. He described repeated trips to hospitals and said the nearest one is an hour's drive; township hospitals can handle acute problems but have little for chronic disease — “let alone a small illness like mine.”",
    "We wrote these observations into our survey report and turned it into a professional report for the Hangzhou Health Commission, which will guide grassroots organisations in screening for and publicising cartilage health in the region.",
  ),
  stakeholder(
    "Treatment",
    "Dr. Huang Jun — sports-medicine advice from a national team doctor",
    "A former doctor for the national gymnastics team and the Asian Games, Dr. Huang saw strong potential in NEST but stressed portability and operability for athletes, and warned that athletes may pursue over-treatment to return to sport. His advice shifted our thinking on acute repair and on what the functional modules should carry.",
    "We wanted authoritative advice on sports injuries caused by cartilage defects, so we consulted Dr. Huang Jun, head of the joint department at the Zhejiang Sports Hospital and a member of the Zhejiang Medical Association's sports-medicine branch.",
    "He believes the project has strong application potential, but for athletes it must be more portable and easier to operate; the surgical-injection route keeps the material in the operating room. He also said that programmability fits athletes' needs well, and described cases in which athletes over-treated in order to restore function quickly.",
    "We adopted the advice and decided to develop later materials better suited to acute repair — usable for athletes and in extreme team or field settings — and to consider carrying immune factors or drugs in the functional modules to speed conservative treatment; this became a key consideration for the module payload.",
    "ihp-02",
  ),
  stakeholder(
    "Treatment",
    "Dr. Qiu Xiaoming — matching material strength to the joint",
    "When we showed our first SELP design — one fixed set of 2KY5, 2KY10 and 2KY16 proteins — to clinicians, Dr. Qiu pointed out that different joints bear different loads and need different strengths. A single strength could not fill all hyaline cartilage defects, which set us on the programmable repeat-number platform.",
    "The first step of NEST was to choose a filler that meets the complex requirements of cartilage repair — filling the defect directly and reducing pain immediately — so we brought our first SELP design to researchers and doctors.",
    "Dr. Qiu Xiaoming of Sir Run Run Shaw Hospital told us that the elbow, knee and other joints bear different loads and need different strengths; a single-strength material could not achieve our goal of treating all hyaline cartilage defects.",
    "We moved from a single fixed construct to a programmable repeat-number series whose strength, toughness and pore size can be tuned for different joints, immune capacities and defect sizes.",
    "ihp-08",
  ),
  stakeholder(
    "Treatment",
    "Dr. Li Zhiguo — an orthopaedic resident reviews the first design",
    "An orthopaedic resident at Beijing Tongren Hospital's Mentougou campus, Dr. Li reviewed the first SELP design with the clinical team and added the perspective of a young clinician working in a large public hospital.",
    "We wanted feedback from clinicians who see cartilage defects in daily practice, not only senior specialists, so we included residents in our round of design reviews.",
    "Dr. Li reviewed the material's intended use and the injection procedure with us and discussed how such a filler would fit the workflow of an orthopaedic department.",
    "His comments joined the clinical feedback that pushed us toward a programmable platform and a simple, operating-room-compatible procedure.",
    "ihp-43",
  ),
  stakeholder(
    "Treatment",
    "Dr. Ren Bo — sports medicine at Xi'an Honghui Hospital",
    "Dr. Ren Bo, director of the sports-medicine centre at Xi'an Honghui Hospital and a member of ICRS and APKASS, discussed cartilage repair with us from a sports-medicine perspective.",
    "Sports-medicine physicians see many focal cartilage injuries in active patients, so we consulted Dr. Ren for a view from that specialty.",
    "He described how cartilage injuries present in athletes and how treatment choices balance a quick return to sport against the long-term health of the joint.",
    "The conversation reinforced our decision to keep the material minimally invasive and to design it for early, focal defects rather than late-stage disease.",
    "ihp-09",
  ),
  stakeholder(
    "Treatment",
    "Dr. Zhang Yumei — the rehabilitation physician's view",
    "Almost everyone we interviewed had been through rehabilitation, so we asked a rehabilitation physician about clinical practice. Dr. Zhang Yumei, who works on post-operative cartilage injury and early-to-mid osteoarthritis, explained why rehabilitation is essential but hard for patients to sustain.",
    "Rehabilitation appeared in nearly every patient story, so we wanted the clinician's view of what it can and cannot do.",
    "Dr. Zhang Yumei of Nanjing Medical University's First Affiliated Hospital described the rehabilitation pathway for post-operative cartilage injury and early-to-mid OA, and the difficulty patients face in keeping up with long, supervised programmes.",
    "Her perspective supported our decision to improve the rehabilitation experience — the thread that led to the AI-guided smart mirror — rather than relying on rehabilitation alone.",
    "ihp-10",
  ),
  stakeholder(
    "Treatment",
    "Nurse Xue Han and 18 nurses — redesigning the hardware around the ward",
    "An experienced nurse at the 254th Hospital and 18 colleagues reviewed our first hardware design. They raised three concerns — an unclear preparation workflow, device usability and the training burden — and worried that an uncommon interface could not be shown on hospital displays. Their feedback reshaped the device.",
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
    "R&D",
    "Prof. Ouyang Hongwei — defining the indication and the degradation window",
    "A leading researcher in joint cartilage tissue engineering, Prof. Ouyang pushed us to say exactly which defect we treat — focal partial-thickness defects and early degeneration, not all osteoarthritis — and to design degradation to match new tissue formation. Both points reshaped our claims and our characterisation plan.",
    "NEST began as an injectable, in-situ hydrogel, but internally “cartilage repair” and “treating osteoarthritis” were used almost interchangeably. We consulted Prof. Ouyang Hongwei to clarify the repair scenario and the boundary of the indication.",
    "He raised three points: repair is not just filling a defect, because the material enters a continuously degenerating microenvironment; degradation must keep pace with new tissue formation and bond reliably to the surrounding cartilage; and we must specify which scenario we target — focal partial-thickness defects, early degeneration, or advanced OA with subchondral bone changes. He was clear that local repair cannot be equated with reversing osteoarthritis at every stage.",
    "We reversed the order of our claims: NEST targets focal, partial-thickness cartilage defects and post-traumatic or early degenerative stages, while advanced OA appears only as the downstream consequence in the background. Degradation became a designed parameter: we added degradation curves in PBS, collagenase/protease solution and simulated synovial fluid at 4, 8 and 12 weeks alongside ITC purification, compression and lap-shear testing. The curves showed that material degradation and cartilage regeneration are largely complementary, so no separate degradation module was needed.",
    "ihp-12",
  ),
  stakeholder(
    "R&D",
    "Songlin Shi — questioning the magnetic and protein routes",
    "A community mentor and former CCiC chair, Songlin Shi challenged two early assumptions: that magnetic particles could orient the network without being anchored, and that SELP could be expressed and purified without structural damage. Both challenges led to concrete design changes.",
    "We met Songlin Shi, a doctoral researcher at Westlake University's School of Medicine and a former CCiC chair, while the three functional modules were taking shape but their compatibility, hardware support and protein feasibility had not been thought through.",
    "His questions focused on two areas: the tension between nanoparticle anisotropy and iron metabolism — enough magnetic loading for orientation versus particles that must eventually be cleared — and protein feasibility, including whether structure survives denaturation and renaturation and whether β-sheet aggregation and inclusion bodies would block the project.",
    "We abandoned the idea of pulling particles with a large coil field and built the current scheme on anchoring and speed: Fe₃O₄-binding peptides anchor particles to the SELP network so a low external field can orient both together, Ru/SPS crosslinking fixes the orientation in about two seconds, and the procedure became injection—observation—magnetic orientation—blue-light crosslinking. For production we chose ITC purification, which relies on SELP's reversible phase behaviour and keeps the protein natively folded rather than denaturing and refolding it.",
    "ihp-22",
  ),
  stakeholder(
    "R&D",
    "Prof. Patrick Butaye — de-risking SELP expression",
    "Facing the risk that SELP might not express normally in E. coli, we asked Prof. Butaye for advice. He recommended starting small and testing expression before scaling, which became our two-step expression and purification route.",
    "The whole NEST route rested on an unverified assumption — that SELP, a large, highly repetitive protein, could be expressed normally in E. coli. Prof. Patrick Butaye, vice-dean of City University of Hong Kong's veterinary school and an expert in the field, was asked whether expression would work and whether abnormal folding or membrane issues should be expected.",
    "He advised a small-scale trial first and gave detailed experimental guidance; he considered the design essentially sound, sent useful reference papers by email, and invited us to visit his laboratory.",
    "We split expression into two steps: confirm at small volume whether the protein is expressed, in what form and with the expected phase behaviour, then scale up in E. coli BL21. ITC purification later confirmed soluble protein with normal phase behaviour, answering both the expression and the structural concerns; the route was further corrected by Weixinkang and Prof. Huang Wenwen.",
    "ihp-15",
  ),
  stakeholder(
    "R&D",
    "Prof. Huang Wenwen — scalability and the salt/crosslinking link",
    "Prof. Huang endorsed the platform's extensibility and identified a practical conflict: raising salt concentration improves ITC purification, but residual salt hinders Ru/SPS photocrosslinking. Adding dialysis after purification let us reach two-second gelation.",
    "NEST makes SELP chain length, domain ratio, functional residues and peptide interfaces designable parameters. We asked Prof. Huang Wenwen, a researcher in the SELP field, about platform scalability and about the process link between purification and rapid photocrosslinking.",
    "She rated the overall design highly: the platform lets the team combine or adjust functions on a shared scaffold to meet different patient needs. She focused on the relation between crosslinking efficiency and the purification conditions, noting that the salt added during ITC can remain and interfere with Ru/SPS crosslinking; she also compared our purification efficiency with her laboratory's process and encouraged further industrial exploration.",
    "We kept the shared-scaffold, standard-interface, replaceable-module architecture and added a dialysis step after ITC to remove residual salt. After the change, SELP reached visible-light gelation in about two seconds, turning her advice into a verifiable process improvement and showing that purification and gelation must be optimised as one continuous flow.",
    "ihp-17",
  ),
  stakeholder(
    "R&D",
    "Dr. Yi Junzhi — proving modularity by assembly efficiency",
    "Dr. Yi accepted sequence-level design and standardised interfaces but demanded evidence that modules do not interfere — assembly efficiency, function retention and reproducibility. That reframed our linker choice around speed and completeness and led us to SnoopLigase 2.",
    "“Modules can be plugged in” was still a claim on a design drawing: the scaffold stays, the functional units change, but we could not say what proved it. We consulted Dr. Yi Junzhi, a researcher at Zhejiang University's Liangzhu Laboratory working on modular protein engineering and bone tissue engineering.",
    "He agreed that sequence-level design and standardised interfaces help tune material properties, but asked whether modules affect one another: fusion peptides may change expression or solubility, tags and ligases may change conformation, and multiple modules may cause site masking, lower ligation efficiency or weaker function. Plug-and-play should be proven by assembly efficiency, function retention and reproducibility, not by a diagram.",
    "We made assembly efficiency the first criterion and chose the SnoopTag/SnoopLigase route, developing the lighter SnoopLigase 2 system (SnoopLigase2, SnoopTag2, DogTag2), which couples efficiently in standard PBS. We kept two insertion options — SnoopTag2 at the SELP terminus for first-round validation, or inside a domain for more flexible assembly — with an optional flexible linker to reduce steric hindrance. The 12- and 23-amino-acid tags keep the structural burden small and can also be inserted internally.",
    "ihp-36",
  ),
  stakeholder(
    "R&D",
    "Prof. Lin Si'en — from particle alignment to a real anisotropic network",
    "Prof. Lin warned that particles lining up does not prove the SELP network is anisotropic, and listed the variables that affect orientation. His challenge led directly to the Fe₃O₄-binding peptide and to the fixed injection–orientation–crosslinking sequence.",
    "Our early magnetic module simply mixed Fe₃O₄ nanoparticles into the SELP precursor, applied a field and crosslinked — with no anchoring mechanism and no plan to prove that anything had aligned. We asked Prof. Lin Si'en at the University of Hong Kong how structural orientation becomes measurable tissue-engineering function.",
    "He focused on evidence: particles aligning does not automatically prove a stable anisotropic SELP network, let alone reproduce native cartilage mechanics — particle orientation, network orientation and direction-dependent gel properties must each be shown. He listed five variables that affect orientation (field strength and gradient, particle concentration, ligation efficiency, precursor rheology, crosslinking timing) and separated “a directional structure formed” from “that structure changed cell behaviour.”",
    "His point that particle orientation is not network orientation directly produced the Fe₃O₄-binding peptide: instead of dragging particles that may spin in the water phase, we anchor them to the SELP scaffold so a low field orients particles and network together. The magnetic module then joined the SnoopTag2/DogTag interface, and the operation became a fixed sequence — injection, confirmation, magnetic orientation, blue-light crosslinking — with an independently controlled light source in the endoscope module.",
    "ihp-13",
  ),
  stakeholder(
    "R&D",
    "Prof. Li Xiaoming — linking field-induced structure to local mechanics",
    "Prof. Li's work on electric-field gradient hydrogels helped us restate the problem: how the field changes internal orientation, how crosslinking preserves it, and how the fixed structure changes local mechanical response. This shaped our four-phase continuum model.",
    "We wanted to connect external-field control, structural change and the local mechanical environment that cells sense, so that modelling could guide experiments. Prof. Li Xiaoming's Advanced Science work on biomimetic gradient hydrogels drew our attention, and we contacted him online.",
    "Because his work uses electric fields while our system responds to magnetic fields through Fe₃O₄ and SELP, the model had to be rebuilt around our mechanism. The discussion divided “the field changes hydrogel properties” into steps that can be analysed: how the field affects orientation, how crosslinking preserves it, and how the fixed structure changes local mechanical response.",
    "Our Model reflects this: alongside molecular dynamics and network analysis, we built a four-phase continuum model describing SELP–Fe₃O₄ fibres, non-fibrous matrix, free particles and water, and included the preparation sequence. The model now predicts local material environments that can guide sampling and later cell-response comparisons, including YAP/TAZ readouts.",
    "ihp-16",
  ),
  stakeholder(
    "R&D",
    "Prof. Wu Congjun — timing the light trigger",
    "Prof. Wu's discussion of the Ru/SPS system clarified two different time requirements: keep an operating window before illumination and fix the structure quickly after it. This led to the explicit injection–confirmation–orientation–crosslinking sequence and the independently controlled blue-light source.",
    "NEST's precursor must stay flowable for injection and shaping, then form a stable network on demand. We discussed with Prof. Wu Congjun, chair of Westlake University's theoretical physics department, how blue light should trigger crosslinking and when it should be switched on.",
    "We described the Ru/SPS visible-light system, which crosslinks tyrosine residues and gels in about two seconds under blue light. The discussion clarified two separate requirements: an operating window before illumination for filling and orientation, and rapid fixation after it. Illuminating too early loses flow; too late risks precursor loss or structural change.",
    "We made injection and photocrosslinking separately controlled steps and fixed the order injection—confirmation—magnetic orientation—blue-light crosslinking, keeping the magnetic field on while the light is applied. The endoscope module has an independently controlled blue-light source so the operator can inspect the defect and fill first, and the software flow presents the illumination and gelation steps explicitly.",
    "ihp-20",
  ),
  stakeholder(
    "R&D",
    "Dr. Hong Yi — what “adhesion” actually means",
    "Dr. Hong split “adhesion” into wet adhesive strength, shape retention and long-term interfacial integration, showing they need different tests. Lap-shear testing entered our characterisation plan because of this conversation, and interfacial bonding became a covalent, not just physical, claim.",
    "We assumed that because SELP gels, fills the defect and looks attached, adhesion was solved. The joint environment is wet and cyclically loaded, so we asked Dr. Hong Yi, a researcher at Zhejiang University's Liangzhu Laboratory working on biomimetic cartilage and medical tissue adhesives, to examine the interface.",
    "He asked what “adhesion” means here: the material's wet adhesive strength, the gel's shape retention, or long-term stable integration with native cartilage — related but different properties. A single tensile or compression test cannot represent cyclic loading, wear, interfacial peeling and post-degradation change, and adhesion, modulus and toughness trade off against each other.",
    "“Adhesion” became three things with three tests: compression for mechanical support and shape retention, lap-shear for interfacial bonding to cartilage, and rheology for precursor flow and gelation — alongside ITC purification. The interface claim also became chemical: the engineered tyrosine residues can couple covalently with endogenous tyrosine, so bonding is not only physical or mechanical interlocking.",
    "ihp-19",
  ),
  stakeholder(
    "R&D",
    "Prof. Ma Guanghui — from a module list to a process",
    "A professor at USTC and an experienced iGEM judge, Prof. Ma asked whether the components can coexist on one timeline — mixing, sensitivity, shelf life, batch consistency and losses. NEST became a pipeline with inputs, windows and release criteria for each step.",
    "The three functional modules had each taken shape, but we were still thinking module by module. We asked Prof. Ma Guanghui about feasibility, because it depends not only on each component working but on their compatibility in order, stability and storage.",
    "He focused on engineering and process integration: whether components must be mixed at the same time, which are sensitive to temperature, salt, light or shear, how long the assembly lasts, whether batches of protein, particles and liposomes are consistent, and where losses or inactivation are most likely. For the mitochondrial carrier, payload integrity and function need separate assessment.",
    "NEST became a pipeline with defined inputs, operating windows, monitoring and release criteria for precursor preparation, module assembly, temporary storage, delivery, injection, magnetic orientation and blue-light crosslinking. We built quality indicators — protein purity, endotoxin and residual impurities, ligation efficiency, storage stability, function retention — and for mitochondria we separated payload integrity, cleavage of the responsive linker and delivery outcomes.",
    "ihp-35",
  ),
  stakeholder(
    "R&D",
    "Prof. Chen Ming — making models verifiable",
    "Across four meetings, Prof. Chen pressed on three things: clearly defined variables, interpretable inputs and outputs, and independent experimental support. We split the model into five single-variable studies and assigned calibration experiments to each scale.",
    "We expected modelling to tell us directly which sequence was best and saw the software mainly as a display. We asked Prof. Chen Ming at Zhejiang University whether that view holds up from a systems-modelling and data-analysis perspective.",
    "He focused on whether variables are clearly defined, whether model inputs and outputs are interpretable, and whether results are supported by independent experiments. A prediction without stated assumptions, parameter ranges and error sources is hard to trust, and building a software interface is not model validation: software should help record parameters, compare options, show the basis of a model and feed results into the next design round.",
    "We separated the simulations so that each of the five variables has a single dependent variable that can be tested on its own, assigned each scale a question (all-atom MD and enhanced sampling for conformations and functional-site states; coarse-grained Martini 3.0 networks for crosslinked mechanics; magnetic–mechanical coupling for field and particle effects), and paired every model with calibration or validation experiments — gelation time, rheology, compression, structural imaging and directional mechanical tests.",
    "ihp-37",
  ),
  stakeholder(
    "R&D",
    "Prof. Zhou Hong and Lin Lei — the AI rehabilitation mirror",
    "With Zhejiang University's School of Biomedical Engineering, we co-developed a smart mirror for home rehabilitation: an AI module checks whether the patient's movements match the tutorial and an on-screen avatar. ZJU-China supplied clinical guidance and survey findings; the engineering team supplied the technology.",
    "Our patient interviews showed that rehabilitation is effective but long, repetitive and hard to sustain, especially when it requires repeated trips to hospital. We approached Prof. Zhou Hong and Lin Lei's team at the School of Biomedical Engineering to explore a home-based alternative.",
    "The mirror lets patients practise at home and compare their movements with an on-screen avatar, while the AI module monitors whether the movement matches the tutorial. ZJU-China provided clinicians' guidance and survey findings on what patients actually need; the biomedical engineering team provided the technical development.",
    "The collaboration produced a working prototype that supports patients emotionally as well as physically, addressing the psychological side of rehabilitation we had heard in the interviews.",
    "ihp-24",
  ),
  stakeholder(
    "Manufacturing",
    "Beijing Weixinkang — planning the first factory samples",
    "A medical-device company experienced in patent filing and Class III applications, Weixinkang advised us to think harder about protein purification, transport and hospital acceptance, and helped estimate equipment, annual output and sample costs.",
    "As we considered factory-scale production, our literature review showed we needed a mature partner to produce the first samples, so we approached Beijing Weixinkang Medical.",
    "They gave constructive advice on device manufacturing: give more thought to protein purification so the first factory samples can be released; consider extraction cost, transport cost and hospital acceptance. They also helped estimate the equipment, annual output and sample-production cost of NEST's first generation and provided a profit analysis.",
    "We adopted ITC for SELP purification and His-tag capture, cleavage and elution for the other proteins, and used their estimates in our cost model.",
  ),
  stakeholder(
    "Manufacturing",
    "Shaanxi Lanyanwei — what a product must define before translation",
    "Lanyanwei's chief scientist helped us see that modularity must become a clear product definition: what is delivered, who makes and assembles each part, how it is stored and in what order it is used.",
    "NEST already linked material, functional modules and a companion device, but how a research plan becomes a product with clear boundaries, production requirements and sales conditions still needed work. We drew on Lanyanwei's experience in translating research and clinical results.",
    "The discussion covered whether the first stage delivers the hydrogel, the functional components or the complete system with light and magnetic operation; who produces, assembles and delivers each part; and which laboratory steps still depend on individual researchers. Modularity has to become a product description: what each component does, how it is combined and stored, and the order in which the user operates it.",
    "We split translation preparation into material, functional components and companion device, each with its use, composition, operating requirements and open questions, and clarified the links in the chain assembly—precursor preparation—injection—magnetic orientation—blue-light crosslinking.",
    "ihp-38",
  ),
  stakeholder(
    "Manufacturing",
    "Yuanyi Biology — scale-up and batch consistency",
    "A mature synthetic-biology raw-material company, Yuanyi Biology helped us assess expression, purification and batch consistency at larger scale and how to think about cost across the whole process.",
    "NEST's SELP scaffold and functional components depend on recombinant expression and assembly. As sample demand grows, we needed to understand what happens when laboratory expression and purification are scaled, so we visited Yuanyi Biology.",
    "The discussion covered expression, purification and batch-to-batch consistency: whether different SELP constructs give stable yields and recovery, whether ITC purification holds up at larger volumes, and how to keep assembly ratios and final formulation consistent when components are produced separately. Cost has to be seen across the whole process, including purification losses, assembly efficiency, testing and storage.",
    "We kept the recombinant expression and ITC purification route and planned cross-batch records of yield, recovery and performance, traceable sample numbering and assembly records, and joint process optimisation with the producer based on small-scale scale-up results.",
    "ihp-30",
  ),
  stakeholder(
    "Manufacturing",
    "Shanghai Lingjiu — scoping a CDMO collaboration",
    "A potential CDMO partner, Lingjiu helped turn “you can produce our material” into a defined technical scope: which materials we supply, which steps they own, the first formulation and scale, and the acceptance criteria.",
    "To move NEST from research samples to repeatable delivery, we assessed external manufacturing partners and identified Shanghai Lingjiu Medical Technology as a potential CDMO.",
    "The discussion defined the technical scope: which raw materials the team provides, which steps the partner owns, the formulation and scale of the first trial, and the indicators for successful technology transfer. Transfer must also cover performance after preparation — module assembly, precursor state, blue-light gelation and the mechanical properties of the gel.",
    "We plan a technology-transfer package covering material requirements, formulation, process steps, test methods and sample traceability, followed by a small trial batch compared with laboratory samples, after which the scope, quality responsibilities and delivery conditions will be fixed.",
    "ihp-28",
  ),
  stakeholder(
    "Market access",
    "Li Zhuoya — keeping a student team going",
    "A partner at Yiru Biology and a former iGEMer, Li Zhuoya discussed how a student team can keep accumulating technology and partnerships after the competition, and how to organise external materials by evidence status.",
    "We wanted to understand how a student team continues to build technology, organise people and attract partners after the competition, so that the project does not stop when members graduate.",
    "The conversation focused on continuity: who is responsible for the material, the device and the software; whether key experiments can be reproduced from records by new members; and how to distinguish completed results, work in progress and future plans when presenting the project. For a platform project, more modules also mean the team must set priorities, owners and stop/go criteria for each route.",
    "We plan a unified handover and version-management system linking protein constructs, module assembly, experimental conditions, device operation and data records, and will organise external materials by evidence status.",
    "ihp-27",
  ),
  stakeholder(
    "Market access",
    "ZJU Innovation & Entrepreneurship College — matching support to stages",
    "Through the college we joined the Young Eagle Program, SRTP, SQTP and the Dandelion innovation competition, and discussed how university support can map onto concrete research and entrepreneurial deliverables.",
    "NEST spans material research, device development and start-up preparation, and needs sustained collaboration and resources. We approached Zhejiang University's Innovation and Entrepreneurship College to understand the support available at different stages.",
    "Through Wang Feifan's introduction we joined the Young Eagle Program, SRTP, SQTP and the Dandelion innovation competition, covering future-technology exploration, research training, project investigation and practice, and entrepreneurship.",
    "We plan a single project task list that maps each support opportunity to a concrete research or entrepreneurial deliverable, shares experimental records, budgets and results, and updates technical evidence, the business plan and responsibilities through regular reviews.",
  ),
  stakeholder(
    "Market access",
    "Zhang Jie — what to prove first",
    "At a ZJU hackathon pitch, Zhang Jie of Huadan Angel Investment discussed market, competitors and cost, and pushed us to define the first product and the evidence investors would want. We reached an initial cooperation intent with 1.5 million yuan to support the first sample batch.",
    "NEST is a platform, but its modules differ in maturity, validation cost and value. We wanted an investor's view of what the project should prove first and which progress limited funding should support.",
    "The discussion focused on how the platform becomes a clear first product: one SELP scaffold carrying different modules supports iteration without restarting from a new system each time, and the market is large with no mature competitor. We discussed which specific value NEST should prove first, whether the cost estimate covers purification, quality testing, storage, functional components and consumables, and what checkable results the team could deliver at the end of early financing.",
    "We split the business plan into a first product and later module expansion, kept the platform design while setting a narrower validation scope for the first stage, and expanded the cost analysis from raw materials to the full cost of a single treatment. We reached an initial cooperation intent with 1.5 million yuan for the first sample batch.",
    "ihp-26",
  ),
  stakeholder(
    "Market access",
    "Erik Forsberg — cost structure and pilot markets",
    "A hardware entrepreneur and ZJU entrepreneurship lecturer, Erik helped us build the cost framework and economic model with non-public data, and suggested piloting in regions with lighter regulation — leading us to consider Hong Kong.",
    "Our cost estimates were limited by a lack of practical knowledge, so we asked Erik Forsberg, an experienced hardware professor who teaches entrepreneurship at Zhejiang University, to act as our business adviser.",
    "He provided many non-public data sources for our business model, guided the cost analysis and built the cost-structure framework and economic model, and suggested piloting in regions with relatively lighter regulatory requirements.",
    "With his help we estimated market size and target markets and assessed commercial feasibility, and are considering a pilot in Hong Kong, where commercial medical insurance is more developed and regulation is lighter.",
    "ihp-44",
  ),
  stakeholder(
    "Market access",
    "Prof. Li Jianqin — a staged commercialisation path",
    "An economics professor at ZJU, Prof. Li helped turn scattered commercialisation tasks into a staged roadmap with deliverables, funding and ownership, and clarified the IP and equity questions to settle first.",
    "As NEST moved from research toward entrepreneurship, the team had to consider technology development order, funding, intellectual property and organisation. We consulted Prof. Li Jianqin at Zhejiang University's School of Economics.",
    "The discussion covered the preparation process before market launch and the equity structure: which technologies and materials involve the university or other partners, how core members' contributions are agreed, and how the team keeps decision continuity when people leave, funding arrives or outside resources join. Technology validation, manufacturing preparation, professional advice and market exploration must share one schedule.",
    "We plan a staged commercialisation roadmap listing deliverables, funding and owners for each stage, and will clarify contributions, IP ownership and existing agreements before discussing equity, with professional help for the detailed arrangements.",
    "ihp-34",
  ),
  stakeholder(
    "Market access",
    "Zhang Binghong — writing a report government can use",
    "A senior entrepreneurship coach with government-relations experience, Zhang Binghong advised on how to structure our survey report for government needs. The report reached the Hangzhou Health Commission, which replied that it would consider adopting it.",
    "We wanted our survey findings to reach the people who can act on them. Zhang Binghong, secretary of the RTC Talent Development Business School and an international senior entrepreneurship coach with experience in government relations and support for vulnerable groups, was a judge at our Dandelion competition and discussed the report with us afterwards.",
    "She set out what a government-facing report needs: a clear structure, alignment with government priorities, a defined scope of investigation, and a time plan that can be replicated and extended. We stayed in contact while writing and produced the final document.",
    "The report includes concrete action recommendations and received a reply from the Hangzhou Health Commission stating that it would consider adopting them. It will guide our participation in government-led community cartilage-health outreach.",
    "ihp-39",
  ),
  stakeholder(
    "Market access",
    "Mavis Wu — the payment perspective",
    "A branch director at Prudential, Mavis Wu explained how insurance reimbursement works and what hospitals and insurers need to see. We added a payment perspective to our commercial analysis and drafted an information pack for payers.",
    "Access also depends on who pays. Mainland resident medical insurance requires mature therapies and long approval cycles, so we looked at commercial insurance and asked Mavis Wu, a branch director at Prudential and a 2026 QAA award winner, about payment arrangements.",
    "She described how insurance works and the profile of high-end commercial-insurance customers: many policies pay hospitals directly, so hospital acceptance of the material is decisive, and some insurers use准入 lists such as the mainland's 2025 commercial health-insurance innovative drug catalogue, while in Hong Kong individual insurers decide. A payer-facing information pack should make reimbursement criteria explicit.",
    "We added a payment perspective to the commercial analysis, included material, consumables, device use and operating costs in the cost framework, and drafted an initial information pack for payers.",
    "ihp-40",
  ),
  stakeholder(
    "Market access",
    "Tung Wah Hospital — hospital adoption in Hong Kong",
    "Tung Wah Hospital's medical services team explained how a new material enters a Hong Kong hospital: department and collaboration, product definition, MDACS listing, evidence and procurement. They pointed us to their new innovation office for submissions.",
    "After speaking with Mavis Wu, we wanted to understand hospital admission standards, so we contacted the medical services team of Tung Wah Hospital and the centre director to explore how NEST could enter a hospital.",
    "The discussion covered confirming the target department and collaboration model, fixing the first product formulation, use and mechanism, checking with the Hong Kong Department of Health whether the product is a medical device and which risk class and MDACS listing apply (assessed separately for the base hydrogel and the version with an active delivery module), preparing product information, specifications, compliance documents and safety and efficacy evidence, and explaining the full-course cost against existing treatments. Hospitals also require clinical and technical evaluation, supplier and procurement procedures, acceptance, training, batch traceability and adverse-event reporting.",
    "Tung Wah's new Office for Innovative Drugs and Medical Devices, established in June 2026, accepts submissions from manufacturers or local agents at imds@ha.org.hk. We plan to approach flexible private hospitals such as Tung Wah after our factory production is stable.",
    "ihp-33",
  ),
  stakeholder(
    "Market access",
    "Legislator Lam Chit-yuen — Hong Kong's device listing",
    "A medical-sector legislator, Lam explained MDACS — a voluntary listing that hospitals may still require — and noted that a composite material like ours cannot be filed under a single standard. He welcomed innovative materials in Hong Kong.",
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

      <h4
        id="ihp-syringe-questionnaire"
        className="mt-5 mb-3"
        data-toc="include"
      >
        Syringe operation questionnaire
      </h4>
      <p>
        The syringe is the part of the hardware the clinician actually holds, so
        before fixing its design we ran an operation-experience questionnaire.
        In the simulated run 24 participants — clinicians, researchers, device
        developers, students and other users — each evaluated three
        configurations (A, B, C) in a balanced repeated-measures design, giving
        72 evaluations. The figures compare the configurations on start-up
        force, resistance, speed and stop control, hand fatigue, operational
        problems and overall satisfaction; configuration B had the most
        balanced profile, which informed the scheme we carried forward. These
        are simulated results for layout and comparison, not clinical
        evidence.
      </p>
      <Figure
        src={`${SYRINGE_FIG}/r1-participant-design-en.avif`}
        alt="Figure R1 — participant profile and evaluation design"
        caption={
          <>
            <strong>
              Figure R1. Participant profile and evaluation design (24
              participants, 72 evaluations).
            </strong>{" "}
            (A) Participant roles. (B) Prior syringe use. (C) Balanced
            repeated-measures design in which each participant evaluated
            configurations A, B and C. The 72 evaluations are not 72 independent
            participants.
          </>
        }
      />
      <Figure
        src={`${SYRINGE_FIG}/r2-performance-profile-en.avif`}
        alt="Figure R2 — favourable response profile across syringe configurations"
        caption={
          <>
            <strong>
              Figure R2. Favourable response profile across syringe
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
        alt="Figure R3 — operational problems and overall evaluation"
        caption={
          <>
            <strong>Figure R3. Operational problems and overall evaluation.</strong>{" "}
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
        alt="Figure R4 — illustrative operator feedback themes"
        caption={
          <>
            <strong>
              Figure R4. Illustrative operator feedback themes for
              configurations A, B, C and general suggestions.
            </strong>{" "}
            The statements are simulated feedback directions, not verbatim
            quotes, and are not frequency-counted.
          </>
        }
      />

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
        <strong>1,654 valid responses</strong>. 23.8% reported personal or
        family experience of cartilage injury. The university sample was
        dominated by focal traumatic defects; community OA concentrated in older
        adults; and the online platforms discussed OA and post-operative
        injuries (ACL reconstruction, patellar surgery, tenosynovitis surgery)
        most actively.
      </p>
      <Figure
        src={`${SURVEY_FIG}/fig1-survey-reach-prevalence-en.avif`}
        alt="Figure 1 — survey reach and experience of cartilage injury"
        caption={
          <>
            <strong>
              Figure 1. Survey reach and experience of cartilage injury.
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
        caption={
          <>
            <strong>Figure 2. Clinical profile across survey channels.</strong>{" "}
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
        caption={
          <>
            <strong>
              Figure 3. Broad injury sites and persistent symptom burden.
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
        caption={
          <>
            <strong>
              Figure 4. Treatment pathways, recovery, and patient preference.
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
        caption={
          <>
            <strong>
              Figure 5. Patient-reported pain scenarios, sensations, and life
              impact (supplementary sample, n = 50).
            </strong>{" "}
            Stairs and sports were the most frequently reported pain-provoking
            scenarios; pain and irritation were the most common sensations;
            two-thirds reported life-impact scores of 4–5 out of 5.
          </>
        }
      />
      <p>
        The literature tells the same story: statistics are relatively complete
        only for OA, while focal traumatic and post-operative defects are barely
        recorded. For design safety we chose OA — the best-documented and most
        widespread condition — as NEST&rsquo;s first application.
      </p>
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
      <h4 className="mt-5 mb-3" data-toc="include">
        Reports behind the neglected pain
      </h4>
      <p>
        Two documents record this work in full: our survey report on the
        neglected pain of cartilage injury, and the report we submitted to the
        Hangzhou Health Commission. Both are embedded below and can be opened in
        a new tab.
      </p>
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

      <h4 className="mt-5 mb-3" data-toc="include">
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
      <Figure
        src={`${ACTIVITY_FIG}/fig1-baseline-awareness-en.avif`}
        alt="Figure 1 — baseline awareness and knowledge of joint cartilage (pre-activity)"
        caption={
          <>
            <strong>
              Figure 1. Baseline awareness and knowledge of joint cartilage
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
        alt="Figure 2 — product use, training, and perceived changes (pre-activity)"
        caption={
          <>
            <strong>
              Figure 2. Product use, training, and perceived changes
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
        alt="Figure 3 — pre-post change in self-rated knowledge and willingness"
        caption={
          <>
            <strong>
              Figure 3. Pre-post change in self-rated knowledge and willingness
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
        alt="Figure 4 — post-activity knowledge and information needs"
        caption={
          <>
            <strong>
              Figure 4. Post-activity knowledge and information needs (n = 24).
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
        alt="Figure 5 — illustrative feedback themes before and after the activity"
        caption={
          <>
            <strong>
              Figure 5. Illustrative feedback themes from the simulated
              open-text responses before and after the activity.
            </strong>{" "}
            The themes are not verbatim quotes and are not frequency-counted.
          </>
        }
      />

      <h4 className="mt-5 mb-3" data-toc="include">
        SynBio lecture — pre/post questionnaire
      </h4>
      <p>
        Our synthetic-biology lectures were evaluated with a pre/post
        questionnaire completed by the same 24 participants: eight questions
        before the lecture (prior exposure, self-rated understanding, attitudes
        and expectations) and twelve after it (knowledge, attitude, willingness
        and technology acceptance). The figures summarise the baseline we
        started from, what changed, and what participants still wanted to know.
        As with the other questionnaire figures on this page, the responses are
        simulated illustrative data, not real submissions.
      </p>
      <Figure
        src={`${LECTURE_FIG}/s1-pre-awareness-en.avif`}
        alt="Figure S1 — pre-lecture awareness and self-rated understanding"
        caption={
          <>
            <strong>
              Figure S1. Pre-lecture awareness and self-rated understanding (n =
              24).
            </strong>{" "}
            (A) Prior exposure to synthetic biology. (B) Self-rated
            understanding (mean 2.17/5; 66.7% rated 1–2). (C) Prior awareness of
            iGEM. All participants answered every item.
          </>
        }
      />
      <Figure
        src={`${LECTURE_FIG}/s2-pre-attitudes-en.avif`}
        alt="Figure S2 — pre-lecture attitudes and expectations"
        caption={
          <>
            <strong>
              Figure S2. Pre-lecture attitudes and expectations (n = 24).
            </strong>{" "}
            (A) Feelings about synthetic biology (multi-select). (B) Overall
            attitude toward synthetic biology. (C) Topics participants most
            wanted to learn about before the lecture (up to three selections).
          </>
        }
      />
      <Figure
        src={`${LECTURE_FIG}/s3-post-knowledge-needs-en.avif`}
        alt="Figure S3 — post-lecture knowledge, attitude, and information needs"
        caption={
          <>
            <strong>
              Figure S3. Post-lecture knowledge, attitude, and information needs
              (n = 24).
            </strong>{" "}
            (A) Correct answer rate by knowledge question; the mean was 76.7%
            (3.83/5). (B) Post-lecture overall attitude. (C) Information
            participants most wanted after the lecture (up to three selections;
            69 selections in total).
          </>
        }
      />
      <Figure
        src={`${LECTURE_FIG}/s4-understanding-acceptance-en.avif`}
        alt="Figure S4 — self-rated understanding and technology acceptance"
        caption={
          <>
            <strong>
              Figure S4. Self-rated understanding and technology acceptance
              (paired, n = 24).
            </strong>{" "}
            (A) Self-rated understanding increased from a mean of 2.17 to 3.63
            (1–5 scale). (B) Willingness to work in a related field and
            acceptance of a product with non-live engineered output versus a
            product containing live engineered bacteria. The product scenario
            was hypothetical and the responses are simulated.
          </>
        }
      />
      <Figure
        src={`${LECTURE_FIG}/s5-feedback-themes-en.avif`}
        alt="Figure S5 — illustrative feedback themes before and after the lecture"
        caption={
          <>
            <strong>
              Figure S5. Illustrative feedback themes before and after the
              lecture.
            </strong>{" "}
            The statements are simulated feedback directions, not verbatim
            quotes, and are not frequency-counted.
          </>
        }
      />
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

function EngagementBlock() {
  return (
    <>
      <h3 className="mt-4 mb-3">Stakeholder Engagement</h3>
      <p>
        We organize stakeholders along the path a medical material takes from
        the bench to the patient: Patient → R&amp;D → Manufacturing → Market
        Authorization &amp; Access → Treatment → Rehabilitation. Hover (or tap) a
        stage to see whom we engaged with at that stage and what we learned. For
        patient privacy, every patient is anonymised unless they consented to
        appear.
      </p>
      <StakeholderChain />

      <h4
        id="ihp-engagement-timeline"
        className="mt-5 mb-3"
        data-toc="include"
      >
        Engagement timeline
      </h4>
      <p>
        What follows is a timeline of our interactions with the stakeholders who
        made our Integrated Human Practice possible. Each entry records whom we
        met and what we discussed; open “Read more” for the rationale behind the
        conversation, the interview summary and how the feedback changed the
        project.
      </p>
      <Timeline items={timelineItems} />
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

/* One continuous body per page: the sub-navigation is a scroll spy over the
   stacked blocks, so the wheel reaches every block and the TOC lists all of
   their headings. */
function useSectionSpy(ids: string[]) {
  const [active, setActive] = useState(0);
  const key = ids.join("|");
  useEffect(() => {
    const list = key.split("|");
    let frame = 0;
    const update = () => {
      frame = 0;
      let index = 0;
      list.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) index = i;
      });
      setActive(index);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [key]);
  return active;
}

function SectionSubnav({
  items,
  className = "eng-subnav",
}: {
  items: { id: string; label: string }[];
  className?: string;
}) {
  const active = useSectionSpy(items.map((item) => item.id));
  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    history.replaceState(null, "", `#${id}`);
    /* Figures above the target load lazily, so re-align once the layout has
       settled instead of stopping short. */
    const align = (attempt = 0) => {
      const target = document.getElementById(id);
      if (!target) return;
      const top = target.getBoundingClientRect().top;
      if (Math.abs(top - 130) > 24) {
        window.scrollTo({
          top: top + window.scrollY - 130,
          behavior: attempt === 0 ? "smooth" : "instant",
        });
      }
      if (attempt < 4) window.setTimeout(() => align(attempt + 1), 600);
    };
    align();
  };
  return (
    <div className={className}>
      {items.map((item, index) => (
        <button
          key={item.id}
          type="button"
          className={`eng-subnav-button ${active === index ? "active" : ""}`}
          aria-pressed={active === index}
          onClick={() => jump(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function ToolboxPage() {
  const sections = [
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
      <SectionSubnav
        className="eng-subnav ihp-subnav-row"
        items={sections.map(({ id, label }) => ({ id, label }))}
      />
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
