import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import {
  Timeline,
  type TimelineDetail,
  type TimelineItem,
} from "../components/Timeline";
import { StakeholderChain } from "../components/StakeholderChain";
import { TransparentImage } from "../components/TransparentImage";
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
const placeholderSummary = (
  <p>
    Placeholder text — summarise this engagement activity in two or three
    sentences: whom we met, what we discussed, and what we learned. Replace with
    the final content.
  </p>
);

const placeholderDetails: TimelineDetail[] = [
  {
    heading: "Rationale",
    content: (
      <p>
        Placeholder text — explain why this stakeholder or activity was chosen.
      </p>
    ),
  },
  {
    heading: "Summary",
    content: (
      <p>Placeholder text — describe what happened during the activity.</p>
    ),
  },
  {
    heading: "Integration",
    content: (
      <p>Placeholder text — describe how the feedback changed the project.</p>
    ),
  },
];

const timelineImageIds: Array<string | null> = [
  "01",
  "02",
  null,
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "15",
  "16",
  "35",
  "17",
  "36",
  "19",
  "20",
  "22",
  "37",
  "24",
  "38",
  "26",
  "27",
  "29",
  "39",
  "34",
  "30",
  "32",
  "40",
  "41",
  "42",
];

const timelineItems: TimelineItem[] = timelineImageIds.map(
  (imageId, index) => ({
    date: "Month DD, 2026",
    title: `Activity title placeholder ${index + 1}`,
    ...(imageId
      ? {
          image: `https://static.igem.wiki/teams/6102/wiki/images/engagement/ihp/ihp-${imageId}.avif`,
          imageAlt: `Human practices activity ${index + 1}`,
          imagePosition:
            imageId === "15"
              ? "90% 28%"
              : imageId === "37"
                ? "65% 50%"
                : undefined,
          imageScale: imageId === "15" ? 2 : undefined,
        }
      : {}),
    summary: placeholderSummary,
    details: placeholderDetails,
  }),
);

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
        discussed them actively with several stakeholders (see the Engagement
        Timeline).
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

      <h4 className="mt-5 mb-3" data-toc="include">
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
        first letter of intent for investment. More in Entrepreneurship.
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
        behind it and examined the ethical questions it raises.
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
        <strong>T — Trust and Lasting Impact</strong>.
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

      <h4 className="mt-5 mb-3" data-toc="include">
        Engagement timeline
      </h4>
      <p>
        What follows is a timeline of our interactions with the stakeholders who
        made our Integrated Human Practice possible. The entries below are being
        filled in with the final activities.
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
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 130,
      behavior: "smooth",
    });
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

  const selectPage = (index: number) => {
    if (busyRef.current || index === pageRef.current) return;
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
    openScrollRef.current = null;
  };

  actionsRef.current = {
    open: selectPage,
    collapse: collapseWithSwipe,
    reset: resetToOverview,
  };

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
            <strong>Toolbox</strong> explains the methods we used,{" "}
            <strong>NEST</strong> tells the story of its four narrative modules
            — Need-led Discovery, Evidence-based Co-design, Situated
            Implementation and Trust and Lasting Impact — and{" "}
            <strong>Stakeholder Engagement</strong> collects the stakeholder map
            and the interviews behind every step. Use the three buttons to open
            a page.
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
        </article>
      </div>
    </div>
  );
}
