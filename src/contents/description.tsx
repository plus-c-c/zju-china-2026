import { FigureCaption } from "../components/FigureCaption";
import { References } from "../components/References";
import {
  FigureSourceCitation,
  FigureSourceEntry,
} from "../components/FigureSourceCitation";
import { useState, type ReactNode } from "react";
import { BirdLanding } from "../components/BirdCursor";
import "./description.css";

const IMAGE_ROOT =
  "https://static.igem.wiki/teams/6102/wiki/images/description";

const figureDimensions: Record<string, [number, number]> = {
  "1": [1871, 840],
  "2": [3045, 1870],
  "3": [2085, 1043],
  "4": [3233, 1509],
  "5": [3000, 1770],
  "6": [2570, 1814],
  "7": [3849, 3275],
  "8": [1280, 534],
};

function Citation({ refs }: { refs: number[] }) {
  return (
    <sup className="description-citation">
      [
      {refs.map((ref, index) => (
        <span key={ref}>
          {index > 0 && ", "}
          <a
            href={`#description-reference-${ref}`}
            aria-label={`Reference ${ref}`}
          >
            {ref}
          </a>
        </span>
      ))}
      ]
    </sup>
  );
}

function DescriptionFigure({
  number,
  title,
  children,
  alt,
  src,
  empty = false,
  showSourceCitation = true,
}: {
  number: number | string;
  title: string;
  children: ReactNode;
  alt: string;
  /** Optional override of the default description<N>.avif asset. */
  src?: string;
  empty?: boolean;
  showSourceCitation?: boolean;
}) {
  return (
    <figure className="figure d-block my-4 text-center article-figure">
      {empty ? (
        <div className="description-figure-placeholder" aria-hidden="true" />
      ) : (
        <img
          className="figure-img img-fluid rounded article-figure__image"
          src={src ?? `${IMAGE_ROOT}/description${number}.avif`}
          alt={alt}
          width={figureDimensions[String(number)]?.[0]}
          height={figureDimensions[String(number)]?.[1]}
          loading="lazy"
          decoding="async"
        />
      )}
      <FigureCaption className="figure-caption article-figure__caption">
        <strong>
          Figure {number} | {title}.
        </strong>{" "}
        {children}
        {!empty && showSourceCitation && (
          <FigureSourceCitation
            source={number}
            href={`#description-figure-${String(number).replace(/\./g, "-")}-sources`}
          />
        )}
      </FigureCaption>
    </figure>
  );
}

function ExpandableCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = `description-card-${number}-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
  const displayTitle = title.replace(
    /(micro|bio|manu|environ)(?=environment|manufacturing|facturing|ment)/gi,
    "$1\u00ad",
  );

  return (
    <section
      className={`description-expandable${
        isOpen ? " description-expandable--open" : ""
      }`}
    >
      <button
        type="button"
        className="description-expandable__trigger"
        aria-label={title}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="description-expandable__icon" aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
        <span className="description-expandable__title">{displayTitle}</span>
      </button>
      <div
        id={contentId}
        className="description-expandable__body"
        aria-hidden={!isOpen}
      >
        <div className="description-expandable__body-inner">
          <p>{children}</p>
        </div>
      </div>
    </section>
  );
}

const treatmentCards = [
  {
    title: "Rehabilitation and Pharmacological Treatment",
    body: (
      <>
        Can relieve pain, improve mobility, and help manage joint loading, but
        cannot directly replace cartilage tissue that has already been lost.
        <Citation refs={[1, 11]} />
      </>
    ),
  },
  {
    title: "Osteochondral Transplantation",
    body: (
      <>
        Transfers healthy osteochondral tissue into a defect, but is constrained
        by donor-site morbidity, graft availability, and the need to match graft
        dimensions and geometry.
        <Citation refs={[2, 10]} />
      </>
    ),
  },
  {
    title: "Microfracture",
    body: (
      <>
        Stimulates the subchondral bone to recruit bone marrow-derived cells
        into the repair process. The resulting repair tissue is often
        predominantly fibrocartilage, whose long-term load-bearing performance
        differs from native hyaline cartilage.
        <Citation refs={[2, 10]} />
      </>
    ),
  },
  {
    title: "Autologous Chondrocyte Implantation",
    body: (
      <>
        Supplies chondrocytes for tissue repair, but generally requires cell
        harvesting, <em>ex vivo</em> expansion, and implantation, with a demanding
        treatment and postoperative rehabilitation process.
        <Citation refs={[2, 10]} />
      </>
    ),
  },
  {
    title: "Joint Replacement",
    body: (
      <>
        Provides an important option for some patients with end-stage joint
        destruction, but replaces native articular surfaces with artificial
        components rather than regenerating natural cartilage.
        <Citation refs={[11]} />{" "}
        It involves major surgery, substantial treatment costs, and demanding
        rehabilitation, and is generally considered when symptoms severely
        limit daily life and non-surgical treatments are ineffective or
        unsuitable.
        <Citation refs={[20, 21, 22]} />
      </>
    ),
  },
];

const references = [
  <>
    World Health Organization (WHO). <strong>Osteoarthritis.</strong> Fact
    sheet, 14 July 2023.{" "}
    <a href="https://www.who.int/news-room/fact-sheets/detail/osteoarthritis">
      WHO fact sheet
    </a>
  </>,
  <>
    American Academy of Orthopaedic Surgeons (AAOS), OrthoInfo.{" "}
    <strong>Articular Cartilage Restoration.</strong>{" "}
    <a href="https://orthoinfo.aaos.org/en/treatment/articular-cartilage-restoration/">
      OrthoInfo
    </a>
  </>,
  <>
    Chen M, et al.{" "}
    <strong>
      Global prevalence, incidence, and years lived with disability (YLDs) of
      osteoarthritis: trends from 1990 to 2021 and projections to 2050.
    </strong>{" "}
    <em>Journal of Orthopaedic Translation.</em> 2026;56:101029.{" "}
    <a href="https://doi.org/10.1016/j.jot.2025.11.005">DOI</a>
  </>,
  <>
    Jiang Y, et al.{" "}
    <strong>
      Epidemiology of Knee Articular Cartilage Injuries in Patients Undergoing
      Arthroscopy: Insights From 25,293 Procedures at a High-Volume Center.
    </strong>{" "}
    <em>Orthopaedic Surgery.</em> 2026;18:670–684.{" "}
    <a href="https://doi.org/10.1111/os.70272">DOI</a>
  </>,
  <>
    Heir S, Nerhus TK, Røtterud JH, et al.{" "}
    <strong>
      Focal cartilage defects in the knee impair quality of life as much as
      severe osteoarthritis: a comparison of knee injury and osteoarthritis
      outcome score in 4 patient categories scheduled for knee surgery.
    </strong>{" "}
    <em>American Journal of Sports Medicine.</em> 2010;38(2):231–237.{" "}
    <a href="https://doi.org/10.1177/0363546509352157">DOI</a>
  </>,
  <>
    Xie X, Zhang K, Li Y, et al.{" "}
    <strong>
      Global, regional, and national burden of osteoarthritis from 1990 to 2021
      and projections to 2035: a cross-sectional study for the Global Burden of
      Disease Study 2021.
    </strong>{" "}
    <em>PLOS ONE.</em> 2025;20(5):e0324296.{" "}
    <a href="https://doi.org/10.1371/journal.pone.0324296">DOI</a>
  </>,
  <>
    Mukherjee R, Chang CM.{" "}
    <strong>
      Global burden-integrated analysis of osteoarthritis
      research-to-translation dynamics, 1999–2023.
    </strong>{" "}
    <em>PLOS ONE.</em> 2026;21(5):e0349128.{" "}
    <a href="https://doi.org/10.1371/journal.pone.0349128">DOI</a>
  </>,
  <>
    Peters AE, Akhtar R, Comerford EJ, Bates KT.{" "}
    <strong>
      The effect of aging and osteoarthritis on the mechanical properties of
      cartilage and bone in the human knee joint.
    </strong>{" "}
    <em>Scientific Reports.</em> 2018;8:5931.{" "}
    <a href="https://doi.org/10.1038/s41598-018-24258-6">DOI</a>
  </>,
  <>
    Morouço P, Fernandes C, Lattanzi W.{" "}
    <strong>
      Challenges and Innovations in Osteochondral Regeneration: Insights from
      Biology and Inputs from Bioengineering toward the Optimization of Tissue
      Engineering Strategies.
    </strong>{" "}
    <em>Journal of Functional Biomaterials.</em> 2021;12(1):17.{" "}
    <a href="https://doi.org/10.3390/jfb12010017">DOI</a>
  </>,
  <>
    Medvedeva EV, Grebenik EA, Gornostaeva SN, et al.{" "}
    <strong>
      Repair of Damaged Articular Cartilage: Current Approaches and Future
      Directions.
    </strong>{" "}
    <em>International Journal of Molecular Sciences.</em> 2018;19(8):2366.{" "}
    <a href="https://doi.org/10.3390/ijms19082366">DOI</a>
  </>,
  <>
    AAOS, OrthoInfo. <strong>Arthritis of the Knee.</strong>{" "}
    <a href="https://orthoinfo.aaos.org/en/diseases--conditions/arthritis-of-the-knee/">
      OrthoInfo
    </a>
  </>,
  <>
    Niemeyer P, Hanus M, Belickas J, et al.{" "}
    <strong>
      Treatment of Large Cartilage Defects in the Knee by Hydrogel-Based
      Autologous Chondrocyte Implantation: A 5-Year Follow-Up of a Prospective,
      Multicenter, Single-Arm Phase III Trial.
    </strong>{" "}
    <em>Cartilage.</em> 2026;17(3):347–357; first published online in 2025.{" "}
    <a href="https://doi.org/10.1177/19476035251334737">DOI</a>
  </>,
  <>
    Cavallo C, Amore E, Carpentieri S, Roseti L.{" "}
    <strong>
      Challenges and Strategies in Hydrogel-Based Cartilage Regeneration.
    </strong>{" "}
    <em>Gels.</em> 2026;12(5):350.{" "}
    <a href="https://doi.org/10.3390/gels12050350">DOI</a>
  </>,
  <>
    Fu L, Li L, Bian Q, et al.{" "}
    <strong>
      Cartilage-like protein hydrogels engineered via entanglement.
    </strong>{" "}
    <em>Nature.</em> 2023;618:740–747.{" "}
    <a href="https://doi.org/10.1038/s41586-023-06037-0">DOI</a>
  </>,
  <>
    Karami P, Martin R, Laurent A, et al.{" "}
    <strong>
      Adhesive hydrogel-enabled integrative fixation for cartilage and
      osteochondral repair.
    </strong>{" "}
    <em>Frontiers in Bioengineering and Biotechnology.</em> 2026;14:1797388.{" "}
    <a href="https://doi.org/10.3389/fbioe.2026.1797388">DOI</a>
  </>,
  <>
    Nie K, Fan Z, Sun W, et al.{" "}
    <strong>
      Ultrafast crosslinking, strongly adhesive de novo protein hydrogels
      promote cartilage regeneration.
    </strong>{" "}
    <em>Bioactive Materials.</em> 2026;56:368–385; first published online in
    2025. <a href="https://doi.org/10.1016/j.bioactmat.2025.10.009">DOI</a>
  </>,
  <>
    Gan X, Wang X, Huang Y, Li G, Kang H.{" "}
    <strong>Applications of Hydrogels in Osteoarthritis Treatment.</strong>{" "}
    <em>Biomedicines.</em> 2024;12(4):923.{" "}
    <a href="https://doi.org/10.3390/biomedicines12040923">DOI</a>
  </>,
  <>
    Liu N, Ma Y, Gong W, et al.{" "}
    <strong>
      Osteocyte-derived extracellular vesicles mediate the bone-to-cartilage
      crosstalk and promote osteoarthritis progression.
    </strong>{" "}
    <em>Nature Communications.</em> 2025;16:4746.{" "}
    <a href="https://doi.org/10.1038/s41467-025-59861-5">DOI</a>
  </>,
  <>
    Lee AR, Woo JS, Lee SY, et al.{" "}
    <strong>
      Mitochondrial Transplantation Ameliorates the Development and Progression
      of Osteoarthritis.
    </strong>{" "}
    <em>Immune Network.</em> 2022;22(2):e14.{" "}
    <a href="https://doi.org/10.4110/in.2022.22.e14">DOI</a>
  </>,
  <>
    National Institute for Health and Care Excellence (NICE).{" "}
    <strong>Osteoarthritis in over 16s: diagnosis and management.</strong>{" "}
    NICE guideline NG226, 2022. Section 1.6: Referral for joint replacement.{" "}
    <a href="https://www.nice.org.uk/guidance/ng226/chapter/recommendations#referral-for-joint-replacement">
      NICE recommendations
    </a>
  </>,
  <>
    American Academy of Orthopaedic Surgeons (AAOS), OrthoInfo.{" "}
    <strong>Total Knee Replacement.</strong>{" "}
    <a href="https://www.orthoinfo.org/treatment/total-knee-replacement/">
      OrthoInfo
    </a>
  </>,
  <>
    Li A, Li G, Han D, Fu M, Chang J.{" "}
    <strong>
      A comparative study of hospitalization costs of TKA inpatients before
      and after National Volume-based Procurement in Guangdong, China: an
      interrupted time-series analysis.
    </strong>{" "}
    <em>Frontiers in Public Health.</em> 2025;12:1468606.{" "}
    <a href="https://doi.org/10.3389/fpubh.2024.1468606">DOI</a>
  </>,
];

export function Description() {
  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article className="description-article">
          <h2>When Moving Starts to Hurt</h2>
          <p>
            Most days, we barely notice how freely we move. We get out of bed,
            hurry downstairs to catch a bus, or head out for a walk with family
            after dinner. When moving hurts, those small freedoms become harder
            to hold on to. We reach for the edge of a table before standing up.
            We take the stairs one careful step at a time. A trip we have been
            looking forward to suddenly feels too difficult. Little by little,
            life begins to shrink around the movements we can still manage.
          </p>

          <DescriptionFigure
            number={1}
            src={`${IMAGE_ROOT}/description-figure-01-v3.avif`}
            title="When Pain Changes Everyday Life"
            alt="Three-panel illustrative collage showing knee taping for a young adult, an adult holding a knee, and an older adult resting a hand on a knee"
          >
            An illustrative collage of knee support and discomfort across life
            stages: knee taping for a young adult (left), an adult holding a
            knee (center), and an older adult resting a hand on a knee (right).
            The images do not establish a diagnosis of cartilage damage in any
            individual shown.
          </DescriptionFigure>

          <p>
            The change may come suddenly, after an injury on the sports field,
            or gradually, as a joint wears down over the years. For a young
            person, it may mean watching from the sidelines instead of playing
            the sport they love. For an older adult, it may mean wondering
            whether they can still go shopping on their own. Recurring pain can
            disturb sleep, make work harder, and leave people weighing every
            invitation against how they might feel afterward.
            <Citation refs={[1]} />
          </p>
          <p>
            Much of our freedom to move depends on a thin layer of{" "}
            <strong>hyaline cartilage</strong> covering the joint surfaces. This
            smooth, water-rich tissue helps them glide over one another and
            spreads the load each time we take a step. When injury or
            degeneration damages that layer, pain and stiffness can turn
            movements we once took for granted into daily obstacles.
            <Citation refs={[2]} />
          </p>
          <p>
            A localized defect can carry a heavy personal cost. In one study,
            patients awaiting surgery for focal knee cartilage defects had a{" "}
            <strong>
              <abbr title="Knee injury and Osteoarthritis Outcome Score">
                KOOS
              </abbr>{" "}
              quality-of-life score of just 27.5 out of 100
            </strong>
            —almost the same as the 27.2 reported by patients awaiting knee
            replacement.
            <Citation refs={[5]} />
            {" "}Being able to join in again is what makes repair matter.
          </p>

          <h2>Cartilage Damage Is Far from Rare</h2>
          <div className="description-figure-pair">
            <DescriptionFigure
              number={2}
              src={`${IMAGE_ROOT}/description2-a.avif`}
              title="Global Burden of Diseases Associated with Cartilage Degeneration"
              alt="Global burden of osteoarthritis by country, age, sex, and affected joint site"
            >
              The upper panel shows age-standardized osteoarthritis prevalence
              across countries in 2021; the lower panel illustrates differences
              by age, sex, and affected joint site.
            </DescriptionFigure>
            <DescriptionFigure
              number={3}
              src={`${IMAGE_ROOT}/description-figure-03-original-hires.avif`}
              title="Severity and Anatomical Distribution of Cartilage Injuries"
              alt="Severity and anatomical distribution of cartilage injuries in the knee"
            >
              Stacked bars show the proportions of knees with no cartilage
              injury or Outerbridge Grades I–IV across six anatomical sites in
              25,293 primary knee arthroscopies.
            </DescriptionFigure>
          </div>

          <p>
            For millions of people, these struggles are part of everyday life.
            In 2021, approximately{" "}
            <strong>607 million people worldwide</strong> were living with{" "}
            <strong>osteoarthritis (OA)</strong>, a disease involving
            degeneration of articular cartilage. In 2023, OA accounted for
            approximately{" "}
            <strong>22.36 million disability-adjusted life years</strong>—a
            measure of healthy life lost.
            <Citation refs={[6, 7]} />
          </p>
          <p>
            The need for repair is clear in the clinic, too. A 2026 study of
            25,293 knee arthroscopy procedures found articular cartilage damage
            in <strong>66.2% of cases</strong>, with severe lesions in{" "}
            <strong>26.6%</strong>.
            <Citation refs={[4]} />
            {" "}That need reaches well beyond the clinic, into the ordinary
            activities people hope to get back to.
          </p>

          <h2>Why Is Cartilage So Difficult to Repair?</h2>
          <DescriptionFigure
            number={4}
            title="Zonal Architecture of Articular Cartilage"
            alt="Cross-section of a knee joint showing the zonal architecture of articular cartilage"
          >
            Cross-section of the knee joint and an enlarged osteochondral
            interface showing the superficial, middle, deep, and calcified
            zones, chondrocytes, and subchondral bone.
          </DescriptionFigure>
          <p>
            The tissue that helps us move smoothly has very little ability to
            heal itself. Articular cartilage has no blood vessels and contains
            relatively few chondrocytes—the cells that maintain
            it—held within a dense extracellular matrix.
            <Citation refs={[9, 10]} /> Replacing it also means restoring a
            carefully organized structure: the surface resists friction and
            shear, while deeper layers carry compressive loads.
            <Citation refs={[9]} />{" "}
            <strong>
              A lasting repair needs to restore tissue with the structure and
              function of native cartilage, able to withstand years of repeated
              loading and movement.
            </strong>
          </p>
          <p>
            Healing also has to happen while life goes on. An injured joint
            still bears weight when someone gets out of bed, crosses a room, or
            goes downstairs.{" "}
            <strong>
              The tissue must keep working before it has had a chance to
              recover.
            </strong>{" "}
            Meanwhile, inflammation and changes in cells and the surrounding
            matrix can make it harder for new tissue to form, join with the
            existing cartilage, and stay stable over time.
            <Citation refs={[8, 9]} />
          </p>
          <p>
            The same wish to move freely can arise from very different
            injuries. A sports injury may leave one localized defect, while
            years of abnormal loading or degeneration may affect a much wider
            area. The joint involved, the site of injury, and the depth and
            extent of the defect all change what a repair needs to do.
            <Citation refs={[4, 8]} />{" "}
            <strong>
              An effective repair must combine mechanical support, secure
              fixation, and integration with the surrounding cartilage. It also
              needs to address inflammation and ongoing matrix degradation where
              necessary, with the balance tailored to each injury.
            </strong>
            <Citation refs={[2, 9, 10]} />
          </p>

          <h2>Current Treatments: Benefits and Limitations</h2>
          <DescriptionFigure
            number={5}
            title="Current Treatment Pathways for Cartilage Damage"
            src={`${IMAGE_ROOT}/description5-v3.avif`}
            alt="Cartilage repair procedures on the left, physiotherapy at the upper right, and illustrations of damaged knee cartilage and an artificial knee joint side by side at the lower right"
          >
            Cartilage repair procedures including mosaicplasty, microfracture,
            ACI, and MACI (left); physiotherapy (upper right); and knee
            replacement (lower right). The lower-right pair contrasts damaged
            cartilage in osteoarthritis with an artificial knee joint; these are
            separate illustrations, not matched images of a patient before and
            after surgery. The panels do not show comparative clinical outcomes.
          </DescriptionFigure>
          <p>
            Existing treatments have helped many patients relieve pain and
            improve joint function, and certain surgical techniques can repair
            focal defects. However, each pathway has its own indications and
            limitations.{" "}
            <strong>
              Durably restoring the structure and long-term function of native
              hyaline cartilage remains challenging.
            </strong>
            <Citation refs={[2, 10, 11]} />
          </p>
          <div className="description-card-grid description-card-grid--treatments">
            {treatmentCards.map((card, index) => (
              <article className="description-card" key={card.title}>
                <span className="description-card__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
          <p>
            Together, these approaches reveal a central challenge:{" "}
            <strong>
              filling the defect is only the first step. Repair tissue must
              integrate stably, withstand complex loads over years of movement,
              and maintain an environment conducive to regeneration.
            </strong>{" "}
            An ideal repair approach must also adapt to anatomical location,
            injury severity, and disease progression.
            <Citation refs={[2, 9, 10]} />
          </p>
          <p className="description-question">
            <strong>
              How can we achieve durable, reliable repair that accommodates
              diverse damage conditions while preserving the patient&apos;s own
              joint tissues?
            </strong>
          </p>

          <h2>
            Hydrogels: What Barriers Remain on the Path to Cartilage Repair?
          </h2>
          <p>
            Hydrogels are water-rich, three-dimensional networks that share
            features with the native extracellular matrix, providing space for
            cell survival and tissue formation. Injectable,{" "}
            <strong>in-situ-forming hydrogels</strong> can conform to irregular
            defects, reducing the difficulty of matching prefabricated implants
            to defect geometry. Some hydrogel-assisted approaches have entered
            clinical studies and yielded outcomes from several years of
            follow-up.
            <Citation refs={[12, 13]} />
          </p>
          <p>
            <strong>
              Yet filling a defect is only the beginning; the real test starts
              after the material enters the joint.
            </strong>{" "}
            It must remain stable under repeated movement, support regeneration
            in a damaged microenvironment, and be manufactured with clinical
            reliability and consistency.
            <Citation refs={[13]} />
          </p>
          <DescriptionFigure
            number={6}
            title="Risks and Mitigation Strategies in Hydrogel Design and Clinical Translation"
            alt="Risks and strategies in hydrogel design and clinical translation"
          >
            Overview of potential risks in hydrogel design and clinical
            translation, paired with strategies for addressing them.
          </DescriptionFigure>

          <div className="description-card-grid description-card-grid--barriers">
            <ExpandableCard
              number="01"
              title="Site-Adapted Load Bearing and Stable Fixation"
            >
              Hydrogels inside a joint must withstand compression, shear, and
              friction while remaining integrated with wet tissue. A material
              that is too soft may fail to carry load, whereas one that is too
              stiff may concentrate stress. Achieving{" "}
              <strong>
                appropriate mechanics, sufficient toughness, and reliable tissue
                fixation
              </strong>{" "}
              in one material is a critical challenge.
              <Citation refs={[8, 13, 14, 15, 16]} />
            </ExpandableCard>
            <ExpandableCard
              number="02"
              title="An Evolving Repair Microenvironment"
            >
              Inflammation, chondrocyte dysfunction, and matrix degradation
              continually interfere with regeneration. Hydrogels may need to
              retain bioactive molecules, enable localized delivery, respond to
              environmental change, and degrade in step with new tissue
              formation.
              <Citation refs={[13, 17, 18, 19]} />
            </ExpandableCard>
            <ExpandableCard
              number="03"
              title="Manufacturing and Clinical Translation"
            >
              Multistep modification can make every added function alter
              mechanics, degradation, and release profiles. Scale-up adds
              challenges in sterilization, storage, quality control, and batch
              consistency.{" "}
              <strong>
                A material that performs in the laboratory must also withstand
                reproducible manufacturing and clinical use.
              </strong>
              <Citation refs={[13, 15, 16]} />
            </ExpandableCard>
          </div>
          <p>
            <strong>
              These three barriers do not have one universal solution for every
              form of cartilage damage.
            </strong>{" "}
            Some defects primarily need mechanical support and fixation; others
            call for strategies addressing inflammation, matrix degradation, and
            cellular dysfunction. Osteoarthritis is a clear example of this
            complexity.
            <Citation refs={[17, 18, 19]} />
          </p>
          <DescriptionFigure
            number={7}
            title="Pathological Factors and Corresponding Hydrogel Intervention Strategies"
            alt="Pathological factors in osteoarthritis and corresponding hydrogel intervention strategies: panel A shows the aetiology of osteoarthritis across joint tissues and cell types, panel B shows hydrogel-based interventions in the joint"
          >
            Using osteoarthritis as an example, panel A illustrates the
            pathological processes involving mechanical and inflammatory factors
            and multiple cell types within the joint, while panel B presents
            different forms of hydrogel-based intervention.
          </DescriptionFigure>
          <p>
            If every new form of cartilage damage requires an entirely new
            material formulation, diverse clinical needs will continually become
            new development and manufacturing challenges. We therefore asked:{" "}
            <strong>
              Could we retain a common material foundation while tailoring
              mechanical properties and combining biological functions to meet
              the needs of each defect?
            </strong>
          </p>

          <div className="description-platform-heading">
            <span className="description-platform-watermark" aria-hidden="true">
              <img
                src="https://static.igem.wiki/teams/6102/wiki/team-logo.avif"
                alt=""
                loading="lazy"
              />
            </span>
            <h2 className="description-platform-title">
              <span className="description-platform-title-text">
                NEST:{" "}
                <span className="description-platform-word">
                  <span className="description-platform-initial">N</span>
                  ative-like
                </span>{" "}
                <span className="description-platform-word">
                  programmabl
                  <span className="description-platform-initial">E</span>
                </span>{" "}
                cartilage{" "}
                <span className="description-platform-word">
                  <span className="description-platform-initial">S</span>
                  caffold&nbsp;for
                </span>{" "}
                <span className="description-platform-ending">
                  <span className="description-platform-initial">T</span>issue
                  repair
                  <BirdLanding />
                </span>
              </span>
            </h2>
          </div>
          <p>
            A nest is built to suit its environment, providing a space in which
            life can grow. Inspired by this idea, we designed{" "}
            <strong>NEST</strong>: a platform that uses a common protein
            scaffold to address different repair needs, integrating material
            property design, functional module assembly, and biomanufacturing
            into one extensible system.
          </p>
          <div className="description-card-grid description-card-grid--platform">
            <ExpandableCard number="01" title="Tunable Scaffold">
              We selected <strong>silk-elastin-like protein (SELP)</strong>{" "}
              as the scaffold. Its genetically designable sequence and
              crosslinked network provide a tunable foundation for different
              mechanical requirements, while tissue-interface design supports
              more reliable fixation and integration.
            </ExpandableCard>
            <ExpandableCard number="02" title="Modular Functions">
              The{" "}
              <strong>
                SnoopTag2/DogTag modular peptide–peptide ligation interface
              </strong>{" "}
              allows components for tissue interaction, local retention, and
              microenvironment-responsive regulation to be combined as needed.
            </ExpandableCard>
            <ExpandableCard number="03" title="Biomanufacturing">
              Synthetic biology encodes material architecture and functional
              design in <strong>gene sequences</strong>. Engineered
              microorganisms produce protein components that can be purified,
              crosslinked, and assembled into reproducible, scalable material
              configurations.
            </ExpandableCard>
          </div>
          <DescriptionFigure
            number={8}
            showSourceCitation={false}
            title="Comparison between traditional blending design and sequence-programmed design"
            src="https://static.igem.wiki/teams/6102/wiki/images/design/01/01-01.avif"
            alt="Comparison of conventional polymer blending and grafting with DNA-encoded protein production and photocrosslinking"
          >
            Left: Traditional design relies on the mixing and grafting of
            polymers, initiators, crosslinkers, and modifying groups. Right:
            Sequence-programmed design encodes material information in DNA; the
            DNA is transcribed and translated into proteins, which are then
            photocrosslinked into a gel, aiming to improve batch-to-batch
            reproducibility and programmability.
          </DescriptionFigure>
          <p>
            We chose{" "}
            <strong>osteoarthritis as a representative application</strong>.
            Focusing on mechanical imbalance, matrix loss, and
            inflammation-associated cellular dysfunction, we designed
            combinations of functional modules to show how one material platform
            can address multiple repair needs.
          </p>
          <p>
            In this way,{" "}
            <strong>
              the tunable scaffold addresses mechanical and structural needs,
              functional modules address the local microenvironment, and
              biomanufacturing connects material configurations to a common
              production foundation.
            </strong>
          </p>
          <p className="description-closing">
            From an individual focal defect to different joints, disease stages,
            and repair goals, we hope NEST will become{" "}
            <strong>
              a programmable protein-material platform designed for specific
              needs, assembled from functional modules, and continuously
              expanded
            </strong>
            .
          </p>

          <References level={2} showBird={false}>
            <div className="references-list references-list--paragraphs">
              {references.map((reference, index) => (
                <p
                  id={`description-reference-${index + 1}`}
                  key={index}
                  style={{ scrollMarginTop: "112px" }}
                >
                  [{index + 1}] {reference}
                </p>
              ))}
            </div>
          </References>

          <References
            title="Figure Sources"
            id="figure-sources-and-credits"
            showBird={false}
          >
            <ul className="references-list figure-sources-list">
              <FigureSourceEntry source={1} id="description-figure-1-sources">
                <p>
                  Adapted from photographs by{" "}
                  <a href="https://www.pexels.com/photo/7339492/">
                    cottonbro studio
                  </a>
                  ,{" "}
                  <a href="https://www.pexels.com/photo/11349880/">
                    Towfiqu barbhuiya
                  </a>
                  , and{" "}
                  <a href="https://www.pexels.com/photo/18851495/">
                    Αλεξανδρος Μαμουνης
                  </a>
                  , Pexels. <a href="https://www.pexels.com/license/">Pexels License</a>.
                </p>
              </FigureSourceEntry>
              <FigureSourceEntry source={2} id="description-figure-2-sources">
                <p>
                  Reproduced from Chen et al. (2026), Fig. 1,{" "}
                  <a href="https://doi.org/10.1016/j.jot.2025.11.005">
                    <em>Journal of Orthopaedic Translation</em>
                  </a>
                  .{" "}
                  <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
                    CC BY-NC-ND 4.0
                  </a>
                  .
                </p>
              </FigureSourceEntry>
              <FigureSourceEntry source={3} id="description-figure-3-sources">
                <p>
                  Reproduced from Jiang et al. (2026), Fig. 3,{" "}
                  <a href="https://doi.org/10.1111/os.70272">
                    <em>Orthopaedic Surgery</em>
                  </a>
                  .{" "}
                  <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
                    CC BY-NC-ND 4.0
                  </a>
                  .
                </p>
              </FigureSourceEntry>
              <FigureSourceEntry source={4} id="description-figure-4-sources">
                <p>
                  Reproduced from Morouço et al. (2021), Fig. 1,{" "}
                  <a href="https://doi.org/10.3390/jfb12010017">
                    <em>Journal of Functional Biomaterials</em>
                  </a>
                  .{" "}
                  <a href="https://creativecommons.org/licenses/by/4.0/">
                    CC BY 4.0
                  </a>
                  .
                </p>
              </FigureSourceEntry>
              <FigureSourceEntry source={5} id="description-figure-5-sources">
                <p>
                  Left: reproduced from Medvedeva et al. (2018), Fig. 3,{" "}
                  <a href="https://doi.org/10.3390/ijms19082366">
                    <em>International Journal of Molecular Sciences</em>
                  </a>
                  .{" "}
                  <a href="https://creativecommons.org/licenses/by/4.0/">
                    CC BY 4.0
                  </a>
                  .
                </p>
                <p>
                  Upper right: photograph by{" "}
                  <a href="https://www.pexels.com/photo/20860595/">
                    Funkcinės Terapijos Centras
                  </a>
                  , Pexels. <a href="https://www.pexels.com/license/">Pexels License</a>.
                </p>
                <p>
                  Lower right: adapted from BruceBlaus (2015),{" "}
                  <a href="https://commons.wikimedia.org/wiki/File:Osteoarthritis.png">
                    <em>Osteoarthritis</em>
                  </a>
                  {" and "}
                  <a href="https://commons.wikimedia.org/wiki/File:Knee_Replacement.png">
                    <em>Knee Replacement</em>
                  </a>
                  , Wikimedia Commons.{" "}
                  <a href="https://creativecommons.org/licenses/by-sa/4.0/">
                    CC BY-SA 4.0
                  </a>
                  .
                </p>
              </FigureSourceEntry>
              <FigureSourceEntry source={6} id="description-figure-6-sources">
                <p>
                  Reproduced from Cavallo et al. (2026), Fig. 1,{" "}
                  <a href="https://doi.org/10.3390/gels12050350">
                    <em>Gels</em>
                  </a>
                  .{" "}
                  <a href="https://creativecommons.org/licenses/by/4.0/">
                    CC BY 4.0
                  </a>
                  .
                </p>
              </FigureSourceEntry>
              <FigureSourceEntry source={7} id="description-figure-7-sources">
                <p>
                  Reproduced from Gan et al. (2024), Fig. 1,{" "}
                  <a href="https://doi.org/10.3390/biomedicines12040923">
                    <em>Biomedicines</em>
                  </a>
                  .{" "}
                  <a href="https://creativecommons.org/licenses/by/4.0/">
                    CC BY 4.0
                  </a>
                  .
                </p>
              </FigureSourceEntry>
            </ul>
          </References>
        </article>
      </div>
    </div>
  );
}
