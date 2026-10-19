import { useLayoutEffect, useRef, useState } from "react";
import {
  Timeline,
  type TimelineDetail,
  type TimelineItem,
} from "../components/Timeline";
import { StakeholderChain } from "../components/StakeholderChain";
import { TransparentImage } from "../components/TransparentImage";
import { SeedReaderRail } from "./human-practices/SeedReader";
import "./human-practices.css";

/** All figures live on the team static host. */
const SURVEY_FIG =
  "https://static.igem.wiki/teams/6102/wiki/images/engagement/ihp/questionnaire/h";
const ACTIVITY_FIG =
  "https://static.igem.wiki/teams/6102/wiki/images/engagement/ihp/questionnaire/l";
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

function SeedBlock() {
  return (
    <>
      <h3 className="mt-4 mb-3">SEED — our iHP framework</h3>
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
        Each design iteration follows one SEED cycle: the question that sparked
        it, what we explored, the engineering work that followed, and the
        dialogue that closed the loop.
      </p>
      <SeedReaderRail />

      <h4 className="mt-4 mb-2" data-toc="include">
        Evidence-based Co-design
      </h4>

      <h5 className="mt-4 mb-2">Cycle 1 — SELP</h5>
      <p data-seed-phase="spark">Based on the background research,
        we wanted to design a material that can heal a broad range of hyaline
        cartilage defects, starting with a filler that meets the complex
        requirements of cartilage repair — filling the defect directly and
        reducing pain immediately. We presented the first SELP design — a fixed
        set of 2KY5, 2KY10 and 2KY16 proteins — to researchers and doctors. The
        doctors said that different joints (elbow, knee) bear different loads
        and need different strengths; a single strength could not achieve our
        goal of filling all hyaline cartilage defects.
      </p>
      <p data-seed-phase="explore">We found that the repeat
        number of the 2KY protein series can tune the material&rsquo;s strength
        and toughness, and that higher repeat numbers reduce pore size and raise
        cell adhesion, favoring GAG production, native cartilage growth and
        anti-inflammatory signaling — fitting patients with different immune
        capacities and defect sizes. We decided to build a programmable method
        for the repeat-number series and to use modeling to fix the
        hydrogel&rsquo;s final properties.
      </p>
      <p data-seed-phase="engineering">We entered the
        SELP DBTL cycle. To realize the complex functions SELP needs as a
        broadly applicable filler, we surfaced many experimental questions and
        discussed them actively with several stakeholders (see the Engagement
        Timeline).
      </p>
      <p data-seed-phase="dialogue">We showed the latest
        design to doctors and researchers; the feedback was positive, and the
        experiments that followed confirmed the design&rsquo;s reliability.
      </p>

      <h5 className="mt-4 mb-2">Cycle 2 — Linker System</h5>
      <p data-seed-phase="spark">Reading the literature made clear
        that filling the defect alone is not enough. To fit the repair needs of
        different clinical micro-environments we wanted to add therapy-related
        functional modules — but large modules inserted inside the molecule
        would disturb SELP&rsquo;s normal function, so we chose protein linkers
        for an extensible design. We first tried the mainstream SpyTag and
        SnoopTag systems, but protein modeling showed the linkers were too large
        and would bury the functional peptide domain.
      </p>
      <p data-seed-phase="explore">We asked stakeholders; one
        researcher suggested using SnoopLigase as the linker system.
      </p>
      <p data-seed-phase="engineering">Through modeling
        we engineered the enzyme, improved the ligation efficiency, and iterated
        the SnoopLigase system into the{" "}
        <strong>SnoopLigase-ZJU</strong> system, greatly improving its
        efficiency and keeping the linker system running reliably.
      </p>
      <p data-seed-phase="dialogue">We showed the design to
        doctors and researchers, who agreed with it.
      </p>

      <h5 className="mt-4 mb-2">Cycle 3 — Functional Modules</h5>
      <p data-seed-phase="spark">With the programmable platform in
        place, we chose OA as NEST&rsquo;s first concrete application and asked
        doctors whether the material would fit clinical needs.
      </p>
      <p data-seed-phase="explore">In our conversations the
        doctors explained that the closed environment of OA easily forms a
        vicious cycle of local mechanical imbalance, GAG loss and aggravated
        inflammation. Reading the literature widely, we found that anisotropy —
        a physical property of native cartilage — can mimic its structure:
        carrying shear while keeping toughness and elasticity, stopping the
        vicious cycle at its start.
      </p>
      <p data-seed-phase="engineering">Together with
        doctors and researchers we designed a magnetic-nanoparticle-binding
        peptide that aligns SELP under an external field to create anisotropy, a
        GAG-retaining peptide based on electrostatic adsorption, and a liposome
        delivery module for personalized treatment — addressing the three
        vicious-cycle modules one by one.
      </p>
      <p data-seed-phase="dialogue">We returned to the doctors
        and researchers for their opinions. One doctor thought the material too
        complex, which could raise concerns in practical use and difficulties
        during market approval — this made us weigh safety even more carefully.
        We also compared the collected patient needs to make sure the
        programmable modules cover almost every case.
      </p>

      <h4 className="mt-5 mb-2" data-toc="include">
        Situated Implementation
      </h4>

      <h5 className="mt-4 mb-2">Cycle 1 — Hardware</h5>
      <p data-seed-phase="spark">To bring the project into
        clinical use, we designed a hardware system matched to all of our
        biological designs: a first version combined an endoscope and a
        blue-light illumination system into one in-body device, plus a syringe.
      </p>
      <p data-seed-phase="explore">We tested it in a clinical
        setting. The nurses we interviewed raised three main issues: where
        should the material be prepared? How should the system be operated? How
        should it connect to the hospital&rsquo;s existing displays? We did
        on-site research, consulted medical-device companies, and decided to add
        a pre-mixing module, an electronic manual and a Bluetooth connection.
      </p>
      <p data-seed-phase="engineering">Combined with the
        wet-lab protein purification design, we iterated the hardware into an
        integrated system compatible with different operating-room
        configurations.
      </p>
      <p data-seed-phase="dialogue">To match user habits, we
        ran comparative evaluations with the emergency-ward nurse team of the
        254th Hospital and medical students, and chose the highest-scoring
        scheme — which stakeholders also approved.
      </p>

      <h5 className="mt-4 mb-2">Cycle 2 — Manufacturing</h5>
      <p data-seed-phase="spark">We wanted our material to be
        produced at factory scale and discussed sample production with Beijing
        Weixinkang. They invited us to cooperate and advised us to consider
        protein purification, transport and storage.
      </p>
      <p data-seed-phase="explore">We reviewed how marketed
        hydrogels are extracted, purified and transported, and decided on a
        protein powder packaged as a pharmaceutical for hospitals. We visited a
        mature synbio raw-material company, Yuanyi Biology, to learn more about
        practical scenarios.
      </p>
      <p data-seed-phase="engineering">We turned the
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
      <p data-seed-phase="dialogue">We interviewed Weixinkang
        again; their engineers approved, and we signed a sample-cooperation
        agreement.
      </p>

      <h5 className="mt-4 mb-2">
        Cycle 3 — Entrepreneurship &amp; Market Access
      </h5>
      <p data-seed-phase="spark">As a material entering the human
        body, NEST must be careful about product safety and face many
        market-access reviews. We had many questions about the approval process,
        the market and sales channels, and after research we also had thoughts
        and questions about public and commercial medical insurance. A simple
        cost estimate showed the early investment would be large and
        unavoidable — which meant we needed early funding.
      </p>
      <p data-seed-phase="explore">With these questions we
        looked widely for stakeholders across production, sales, government
        regulation, finance and start-up mentoring, and received effective
        advice. We also received guidance from Shaanxi Lanyanwei Biotechnology,
        which has rich experience in translating medical research into products.
      </p>
      <p data-seed-phase="engineering">We weighed cost
        more heavily in the design, built a detailed business model, found a
        CDMO partner, joined several entrepreneurship events, and secured our
        first letter of intent for investment. More in Entrepreneurship.
      </p>
      <p data-seed-phase="dialogue">Every revision and
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
      <h3 className="mt-4 mb-3">Need-led Discovery</h3>
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
      <h3 className="mt-4 mb-3">Trust &amp; Impact</h3>
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

const HP_MODULES = [
  { key: "seed", label: "SEED" },
  { key: "discovery", label: "Need-led Discovery" },
  { key: "impact", label: "Trust & Impact" },
  { key: "engagement", label: "Stakeholder Engagement" },
];

export function HumanPractices() {
  const [activeModule, setActiveModule] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const prevModuleRef = useRef(0);

  // Switching a block jumps back to the block buttons — the new block may be
  // much shorter, so the current scroll position could otherwise end up past
  // the content that is still shown (same pattern as the Model page).
  useLayoutEffect(() => {
    if (prevModuleRef.current === activeModule) return;
    prevModuleRef.current = activeModule;
    const nav = navRef.current;
    if (!nav) return;
    window.scrollTo({
      top: nav.getBoundingClientRect().top + window.scrollY - 96,
      behavior: "instant",
    });
  }, [activeModule]);

  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article>
          <h2 className="mb-4">Integrated Human Practices</h2>
          <p>
            Integrated Human Practices is how our project meets the world
            outside the laboratory. Because NEST is a material intended to enter
            the human body, we kept the design deliberately cautious: every step
            should answer a real problem. Early in our field work we noticed an
            odd inversion — the people around us who described cartilage pain
            were many, while the cases recorded in the medical system were few.
            This page documents the framework we used to work with that gap, the
            stakeholders we engaged, and how their input changed the project.
            Use the buttons below to move between its blocks.
          </p>
          <div className="eng-module-nav" ref={navRef}>
            {HP_MODULES.map((module, index) => (
              <button
                key={module.key}
                type="button"
                className={`eng-module-button ${
                  activeModule === index ? "active" : ""
                }`}
                aria-pressed={activeModule === index}
                onClick={() => setActiveModule(index)}
              >
                {module.label}
              </button>
            ))}
          </div>
          {activeModule === 0 && <SeedBlock />}
          {activeModule === 1 && <DiscoveryBlock />}
          {activeModule === 2 && <ImpactBlock />}
          {activeModule === 3 && <EngagementBlock />}
        </article>
      </div>
    </div>
  );
}
