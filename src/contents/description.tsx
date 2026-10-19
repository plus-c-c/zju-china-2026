import { useState, type ReactNode } from "react";
import { BirdLanding } from "../components/BirdCursor";
import "./description.css";

const IMAGE_ROOT =
  "https://static.igem.wiki/teams/6102/wiki/images/description";

function Citation({ refs }: { refs: number[] }) {
  return (
    <sup className="description-citation">
      {refs.map((ref, index) => (
        <span key={ref}>
          {index > 0 && ","}
          <a
            href={`#description-reference-${ref}`}
            aria-label={`Reference ${ref}`}
          >
            {ref}
          </a>
        </span>
      ))}
    </sup>
  );
}

function DescriptionFigure({
  number,
  title,
  children,
  alt,
  src,
}: {
  number: number;
  title: string;
  children: ReactNode;
  alt: string;
  /** Optional override of the default description<N>.avif asset. */
  src?: string;
}) {
  return (
    <figure className="figure d-block my-4 text-center article-figure">
      <img
        className="figure-img img-fluid rounded article-figure__image"
        src={src ?? `${IMAGE_ROOT}/description${number}.avif`}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
      <figcaption className="figure-caption article-figure__caption">
        <strong>
          Figure {number} | {title}.
        </strong>{" "}
        {children}
      </figcaption>
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
        <Citation refs={[1, 12]} />
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
        <Citation refs={[2, 11]} />
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
        <Citation refs={[2, 11]} />
      </>
    ),
  },
  {
    title: "Autologous Chondrocyte Implantation",
    body: (
      <>
        Supplies chondrocytes for tissue repair, but generally requires cell
        harvesting, ex vivo expansion, and implantation, with a demanding
        treatment and postoperative rehabilitation process.
        <Citation refs={[2, 11]} />
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
        <Citation refs={[12]} />
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
      severe osteoarthritis.
    </strong>{" "}
    <em>American Journal of Sports Medicine.</em> 2010;38(2):231–237.{" "}
    <a href="https://doi.org/10.1177/0363546509352157">DOI</a>
  </>,
  <>
    Xie X, Zhang K, Li Y, et al.{" "}
    <strong>
      Global, regional, and national burden of osteoarthritis from 1990 to 2021
      and projections to 2035.
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
    Fortune Business Insights.{" "}
    <strong>
      Knee Cartilage Repair Market Size, Share and Analysis; Regional Forecast,
      2026–2034.
    </strong>{" "}
    Industry report, updated 28 September 2026.{" "}
    <a href="https://www.fortunebusinessinsights.com/industry-reports/knee-cartilage-repair-market-100260">
      Report
    </a>{" "}
    (Industry estimate; not a peer-reviewed study of healthcare expenditure.)
  </>,
  <>
    Peters AE, Akhtar R, Comerford EJ, Bates KT.{" "}
    <strong>
      The effect of ageing and osteoarthritis on the mechanical properties of
      cartilage and bone in the human knee joint.
    </strong>{" "}
    <em>Scientific Reports.</em> 2018;8:5931.{" "}
    <a href="https://doi.org/10.1038/s41598-018-24258-6">DOI</a>
  </>,
  <>
    Morouço P, Fernandes C, Lattanzi W.{" "}
    <strong>Challenges and Innovations in Osteochondral Regeneration.</strong>{" "}
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
      Autologous Chondrocyte Implantation.
    </strong>{" "}
    <em>Cartilage.</em> 2026;17(3):347–357.{" "}
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
    <em>Bioactive Materials.</em> 2026;56:368–385.{" "}
    <a href="https://doi.org/10.1016/j.bioactmat.2025.10.009">DOI</a>
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
];

export function Description() {
  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article className="description-article">
          <h2>The Cost of Cartilage Damage</h2>
          <p>
            Getting out of bed in the morning, walking downstairs, catching the
            bus, or enjoying a leisurely stroll with family after dinner—we
            rarely stop to think about how many ordinary yet precious moments in
            life depend on the freedom to move our joints. Once pain sets in,
            however, these familiar activities can become unexpectedly
            difficult. Standing up may require bracing against the edge of a
            table; going downstairs may mean slowing down at every step; and a
            long-awaited short trip may be abandoned out of concern about the
            journey. Little by little, the boundaries of everyday life begin to
            close in.
          </p>

          <DescriptionFigure
            number={1}
            src={`${IMAGE_ROOT}/description-figure-01-v3.avif`}
            title="When Pain Shrinks the Radius of Everyday Life"
            alt="Three-panel illustrative collage showing knee taping for a young adult, an adult holding a knee, and an older adult resting a hand on a knee"
          >
            An illustrative collage of knee support and discomfort across life
            stages: knee taping for a young adult (left), an adult holding a
            knee (center), and an older adult resting a hand on a knee (right).
            The images do not establish a diagnosis of cartilage damage in any
            individual shown. Source photographs and AI-assisted compositing
            credits are provided below.
          </DescriptionFigure>

          <p>
            Such changes may begin with an accidental injury on the sports field
            or develop gradually through years of joint degeneration. Young
            people may have to put aside the sports they love, while older
            adults may begin to wonder whether they can still go out on their
            own. Recurring joint pain does more than restrict movement: it can
            disrupt sleep, interfere with daily work, and cast a lingering
            shadow over time spent with family and friends.
            <Citation refs={[1]} />
          </p>
          <p>
            The joint surfaces that make these movements possible are covered by
            a smooth, water-rich layer of <strong>hyaline cartilage</strong>{" "}
            with specialized mechanical properties. Day after day, this tissue
            distributes loads and reduces friction as the joint undergoes
            compression and sliding, protecting the articulating surfaces. Yet
            its intrinsic capacity for self-repair is extremely limited. Sports
            injuries, prolonged abnormal loading, and age-related degeneration
            can compromise its integrity, sometimes leading to pain, stiffness,
            and restricted mobility.
            <Citation refs={[2]} />
          </p>

          <h3>Cartilage Damage Is Far from Rare</h3>
          <div className="article-figure-grid">
            <DescriptionFigure
              number={2}
              src={`${IMAGE_ROOT}/description2-a.avif`}
              title="Global Burden of Diseases Associated with Cartilage Degeneration"
              alt="Global burden of osteoarthritis by country, age, sex, and affected joint site"
            >
              The upper panel shows age-standardized osteoarthritis prevalence
              across countries in 2021; the lower panel illustrates differences
              by age, sex, and affected joint site. Reproduced from Chen et al.
              (2026), Figure 1.
              <Citation refs={[3]} />
            </DescriptionFigure>
            <DescriptionFigure
              number={3}
              title="Severity and Anatomical Distribution of Cartilage Injuries"
              alt="Severity and anatomical distribution of cartilage injuries in the knee"
            >
              Reproduced from Jiang et al. (2026), Figure 3.
              <Citation refs={[4]} />
            </DescriptionFigure>
          </div>

          <p>
            Cartilage damage is by no means a problem affecting only a small
            group of people. A study published in 2026 examined{" "}
            <strong>25,293 knee arthroscopy procedures</strong> and found that{" "}
            <strong>
              66.2% involved articular cartilage damage, with severe lesions
              identified in 26.6%
            </strong>
            . In another study, patients awaiting surgery for focal knee
            cartilage defects had a preoperative{" "}
            <strong>
              Knee injury and Osteoarthritis Outcome Score quality-of-life score
              of just 27.5/100
            </strong>
            , comparable to 27.2/100 among patients awaiting knee replacement.
            Even when a lesion is confined to one area, its impact on daily life
            can be profound.
            <Citation refs={[4, 5]} />
          </p>
          <p>
            At the global level,{" "}
            <strong>
              osteoarthritis (OA)—a cartilage damage-related disease
              characterized in part by degeneration of articular cartilage—
            </strong>
            affects an enormous population. Approximately{" "}
            <strong>607 million people</strong> worldwide were living with OA in
            2021, and OA accounted for approximately{" "}
            <strong>22.36 million disability-adjusted life years</strong> in
            2023.
            <Citation refs={[6, 7]} /> The global knee cartilage repair market
            was estimated at approximately{" "}
            <strong>US$2.06 billion in 2025</strong>.<Citation refs={[8]} />
          </p>
          <p>
            The causes, anatomical sites, and courses of cartilage damage vary
            widely. A single sports injury may leave a focal defect, whereas
            prolonged abnormal loading or age-related degeneration may cause
            more extensive tissue damage. The knee, hip, and ankle differ in
            their patterns of movement and loading; even within the same joint,
            a lesion&apos;s location, depth, and extent can change the
            requirements for repair.
            <Citation refs={[4, 9]} /> Meanwhile, changes in inflammation,
            cellular function, and the extracellular matrix make the local
            repair microenvironment increasingly complex.{" "}
            <strong>
              Some defects require greater mechanical support; others depend
              more heavily on stable fixation and integration; still others
              require strategies that address ongoing matrix degradation and
              inflammation.
            </strong>
            <Citation refs={[2, 9]} />
          </p>

          <h2>Why Is Cartilage So Difficult to Repair?</h2>
          <DescriptionFigure
            number={4}
            title="Zonal Architecture of Articular Cartilage"
            alt="Cross-section of a knee joint showing the zonal architecture of articular cartilage"
          >
            Cross-section of the knee joint and an enlarged osteochondral
            interface showing the superficial, middle, deep, and calcified
            zones, chondrocytes, and subchondral bone. Reproduced from Morouço
            et al. (2021), Figure 1.
            <Citation refs={[10]} />
          </DescriptionFigure>
          <p>
            Healthy articular cartilage has a highly organized zonal
            architecture. From the superficial zone, which primarily resists
            friction and shear, to deeper zones that transmit compressive loads,
            the arrangement of cells and extracellular matrix enables this thin
            tissue to withstand years of movement.
            <Citation refs={[10]} /> Yet{" "}
            <strong>
              the very tissue that maintains this intricate architecture has
              little ability to rebuild itself after injury.
            </strong>{" "}
            Articular cartilage is avascular, contains relatively few
            chondrocytes, and embeds those cells within a dense matrix.
            <Citation refs={[10, 11]} />
          </p>
          <p>
            The challenge is compounded because an injured joint must continue
            bearing the repeated loads of everyday activities.{" "}
            <strong>
              The tissue must keep working before it has had a chance to
              recover.
            </strong>{" "}
            Continued mechanical stress and an unfavorable local environment
            make the formation, integration, and long-term stability of new
            tissue even more difficult.
            <Citation refs={[9, 10]} /> Cartilage regeneration therefore
            requires more than filling a defect: it must help new tissue
            establish a structure and function approaching those of native
            cartilage under real loading conditions.
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
            The lower-right illustrations are by BruceBlaus, adapted under CC
            BY-SA 4.0. Full credits and adaptation details are provided in the{" "}
            <a href="#description-figure-5-sources">image sources below</a>.
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
            <Citation refs={[2, 11, 12]} />
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
            <Citation refs={[2, 10, 11]} />
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
            <Citation refs={[13, 14]} />
          </p>
          <p>
            <strong>
              Yet filling a defect is only the beginning; the real test starts
              after the material enters the joint.
            </strong>{" "}
            It must remain stable under repeated movement, support regeneration
            in a damaged microenvironment, and be manufactured with clinical
            reliability and consistency.
            <Citation refs={[14]} />
          </p>
          <DescriptionFigure
            number={6}
            title="Risks and Mitigation Strategies in Hydrogel Design and Clinical Translation"
            alt="Risks and strategies in hydrogel design and clinical translation"
          >
            Reproduced from Cavallo et al. (2026), Figure 1.
            <Citation refs={[14]} />
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
              <Citation refs={[9, 14, 15, 16, 17]} />
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
              <Citation refs={[14, 18, 19, 20]} />
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
              <Citation refs={[14, 16, 17]} />
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
            <Citation refs={[18, 19, 20]} />
          </p>
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
          <div className="description-card-grid">
            <ExpandableCard number="01" title="Tunable Scaffold">
              We selected <strong>silk–elastin-like polypeptide (SELP)</strong>{" "}
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

          <h2>References</h2>
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

          <h2>Figure Sources and Credits</h2>
          <div className="description-credits">
            <section>
              <h3>Figure 1 | Knee Support and Discomfort Across Life Stages</h3>
              <p>
                Source photographs: young adult, cottonbro studio / Pexels,
                photo 7339492; adult, Towfiqu barbhuiya / Pexels, photo
                11349880; older adult, Αλεξανδρος Μαμουνης / Pexels, photo
                18851495. The collage was adapted from these photographs using
                AI-assisted compositing (OpenAI imagegen). It is illustrative
                and should not be presented as clinical evidence or confirmation
                of a diagnosis.
              </p>
              <p className="description-credit-links">
                <a href="https://www.pexels.com/photo/7339492/">Young adult</a>
                <a href="https://www.pexels.com/photo/11349880/">Adult</a>
                <a href="https://www.pexels.com/photo/18851495/">Older adult</a>
                <a href="https://www.pexels.com/license/">Pexels License</a>
              </p>
            </section>
            <section>
              <h3>Figures 2–3 | Epidemiology and Injury Distribution</h3>
              <p>
                Figure 2: Chen et al. (2026), Figure 1, licensed CC BY-NC-ND
                4.0. Figure 3: Jiang et al. (2026), Figure 3, licensed CC
                BY-NC-ND 4.0. Retain the original attribution and observe
                restrictions on commercial use and modification.
              </p>
              <p className="description-credit-links">
                <a href="https://doi.org/10.1016/j.jot.2025.11.005">
                  Figure 2 source
                </a>
                <a href="https://doi.org/10.1111/os.70272">Figure 3 source</a>
                <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
                  CC BY-NC-ND 4.0
                </a>
              </p>
            </section>
            <section>
              <h3>Figure 4 | Zonal Architecture</h3>
              <p>
                Morouço, Fernandes &amp; Lattanzi (2021), Figure 1, licensed CC
                BY 4.0. Consult the original legend for third-party artwork
                attribution.
              </p>
              <p className="description-credit-links">
                <a href="https://doi.org/10.3390/jfb12010017">
                  Original article
                </a>
                <a href="https://creativecommons.org/licenses/by/4.0/">
                  CC BY 4.0
                </a>
              </p>
            </section>
            <section id="description-figure-5-sources">
              <h3>Figure 5 | Current Treatment Pathways</h3>
              <p>
                Left: Medvedeva et al. (2018), Figure 3, CC BY 4.0. Upper right:
                Funkcinės Terapijos Centras / Pexels, photo 20860595, under the
                Pexels License. Lower right: “Osteoarthritis” and “Knee
                Replacement” by BruceBlaus (2015), via Wikimedia Commons, CC
                BY-SA 4.0. ZJU-China cropped the illustrations, resized them
                without changing their aspect ratios, and added labels. The
                adapted lower-right panel is licensed under CC BY-SA 4.0; the
                other panels retain their respective licenses. The composite
                layout was arranged by ZJU-China.
              </p>
              <p className="description-credit-links">
                <a href="https://doi.org/10.3390/ijms19082366">
                  Medvedeva article
                </a>
                <a href="https://www.pexels.com/photo/20860595/">
                  Rehabilitation photo
                </a>
                <a href="https://commons.wikimedia.org/wiki/File:Osteoarthritis.png">
                  BruceBlaus: Osteoarthritis
                </a>
                <a href="https://commons.wikimedia.org/wiki/File:Knee_Replacement.png">
                  BruceBlaus: Knee Replacement
                </a>
                <a href="https://creativecommons.org/licenses/by-sa/4.0/">
                  CC BY-SA 4.0 (lower-right panel)
                </a>
                <a href="https://creativecommons.org/licenses/by/4.0/">
                  CC BY 4.0
                </a>
                <a href="https://www.pexels.com/license/">Pexels License</a>
              </p>
            </section>
            <section>
              <h3>Figure 6 | Hydrogel Strategies</h3>
              <p>
                Cavallo et al. (2026), Figure 1, CC BY 4.0. Credit the authors
                and source and indicate modifications. Included third-party
                graphics may require separate permission.
              </p>
              <p className="description-credit-links">
                <a href="https://doi.org/10.3390/gels12050350">
                  Figure 6 source
                </a>
                <a href="https://creativecommons.org/licenses/by/4.0/">
                  CC BY 4.0
                </a>
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
