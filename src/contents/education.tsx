import { ExtendCard } from "./entrepreneurship";
import "./education.css";

/** Static host for the Education figures. The exported `edu-*.avif`
 *  files are served from this folder. */
const EDUCATION_IMG =
  "https://static.igem.wiki/teams/6102/wiki/images/engagement/education/new";
const REPORT_PDF = "https://static.igem.wiki/teams/6102/wiki/hp-new/res.pdf";
const IHP_FIG = "https://static.igem.wiki/teams/6102/wiki/hp-new";

const eduImg = (number: number) =>
  `${EDUCATION_IMG}/edu-${String(number).padStart(2, "0")}.avif`;

type EduPhoto = { number: number; alt: string };

function PhotoFigure({
  photos,
  figure,
  caption,
  layout = "pair",
}: {
  photos: EduPhoto[];
  figure: number;
  caption: string;
  layout?: "single" | "pair" | "trio" | "feature";
}) {
  return (
    <figure className="figure d-block my-4 text-center">
      <div className={`edu-photo-grid edu-photo-grid--${layout}`}>
        {photos.map((photo) => (
          <a
            key={photo.number}
            className="article-image-link"
            href={eduImg(photo.number)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open full-size image: ${photo.alt}`}
            title="Open full-size image"
          >
            <img
              src={eduImg(photo.number)}
              alt={photo.alt}
              className="figure-img img-fluid rounded"
              loading="lazy"
              decoding="async"
            />
          </a>
        ))}
      </div>
      <figcaption className="figure-caption">
        <strong>Figure {figure} |</strong> {caption}
      </figcaption>
    </figure>
  );
}

type QuestionnaireFigureProps = {
  figure: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

function QuestionnaireFigure({
  figure,
  src,
  alt,
  width,
  height,
  caption,
}: QuestionnaireFigureProps) {
  return (
    <figure className="figure d-block my-4 text-center">
      <img
        src={src}
        alt={alt}
        className="figure-img img-fluid rounded"
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
      <figcaption className="figure-caption">
        <strong>Figure {figure} |</strong> {caption}
      </figcaption>
    </figure>
  );
}

export function Education() {
  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article>
          <h2 className="mt-4 mb-2">Education</h2>
          <p className="education-subtitle">
            Bringing knowledge into everyday life, bringing human experience
            into research
          </p>
          <blockquote className="education-quote">
            <p>
              &ldquo;Education is the most powerful weapon which you can use to
              change the world.&rdquo;
            </p>
            <footer>&mdash; Nelson Mandela</footer>
          </blockquote>

          <h2>Overview</h2>
          <p>
            Synthetic biology is moving out of the laboratory, but public
            awareness, industrial perspectives and ethical awareness are not
            keeping pace. We built SynEduGlobal, an education platform for
            public-interest and industry-oriented education in synthetic
            biology, to help close that distance.
          </p>
          <p>
            Our preliminary research and interviews identified three linked
            concerns: the importance of early intervention in cartilage defects,
            weak public awareness of joint health, and unresolved questions
            inside medicine itself. We addressed the first two through
            systematic education across age groups, and the third by treating
            the questions raised by our work as subjects for reflection rather
            than loose ends.
          </p>
          <p>
            The activities described here aim to raise public attention to
            cartilage health and reduce fear of synthetic biology. They also
            changed us: they showed that explaining a technology is not the same
            as understanding the people who will live with it.
          </p>

          <h2>SynEduGlobal Education Platform</h2>
          <p>
            Talking with other teams, we found that the main obstacle to
            synthetic-biology education was not a lack of interest but a missing
            connection between the two sides of demand. Almost every team we
            spoke with struggled to access educational activities or lacked
            ideas for running them, while the institutions we visited needed
            support to bring synthetic biology to their audiences.
          </p>
          <p>
            SynEduGlobal connects iGEM teams with educational institutions and
            public-interest organisations. Anyone can download materials freely;
            members can upload activity materials, exchange ideas in the
            discussion area, and reuse what others have tested. We also worked
            with the School of Food Science and Technology at Jiangnan
            University to add an industrialisation education module.
          </p>
          <p>
            ZJU-China initiated the platform with Westlake University,
            Xi&rsquo;an Jiaotong-Liverpool University and Jiangnan University.
            We invited educational institutions to publish recruitment
            information and invited 37 Chinese universities to share their
            educational cases. During the jamboree we will continue to invite
            teams worldwide. The four founding schools have signed a five-year
            cooperation agreement and prepared a development plan so that the
            platform can keep running beyond one season.
          </p>
          <PhotoFigure
            figure={1}
            layout="single"
            caption="The syneduglobal.top education platform, showing project collections, recruitment postings and material download entry points."
            photos={[
              {
                number: 13,
                alt: "The syneduglobal.top education platform homepage.",
              },
            ]}
          />
          <PhotoFigure
            figure={2}
            layout="pair"
            caption="Signing of the five-year cooperation agreement among the four founding schools."
            photos={[
              {
                number: 14,
                alt: "Representatives signing the five-year platform cooperation agreement.",
              },
              {
                number: 15,
                alt: "Pages of the cooperation agreement showing the parties and planned responsibilities.",
              },
            ]}
          />

          <h2>Education covering all age groups</h2>
          <p>
            Our public education follows a pathway designed around the age of
            the audience: children aged 3&ndash;6, children aged 6&ndash;12,
            high-school students making subject choices, and the general public.
            We redesigned the depth, interactive format and evaluation method
            for each tier. All activity materials, including presentations,
            posters, handouts and activity guides, are available on
            syneduglobal.top.
          </p>

          <h3>1. Ages 3&ndash;6: Biology through Play at Qigudeng Community</h3>
          <p>
            We established a long-term partnership with Qigudeng Community in
            Gongshu District, Hangzhou, to run biology games and cartilage
            health activities for children aged 3&ndash;6. The session was
            designed as one continuous game: bracelet weaving introduced
            &ldquo;cell factories&rdquo; and inheritance, while movement games
            asked children to imitate joint motion and imagine what happens to
            cartilage under load.
          </p>
          <p>
            Visual teaching aids made microorganisms tangible, and no activity
            depended on reading. Every idea could be touched or performed.
          </p>
          <PhotoFigure
            figure={3}
            layout="feature"
            caption="Biology games at Qigudeng Community, introducing children aged 3–6 to microorganisms and cartilage health through games and teaching aids."
            photos={[
              {
                number: 1,
                alt: "Children weaving bracelets during a biology game at Qigudeng Community.",
              },
              {
                number: 2,
                alt: "A team member guiding young children through a hands-on biology activity.",
              },
              {
                number: 3,
                alt: "Children examining teaching aids during the Qigudeng Community session.",
              },
            ]}
          />
          <h4 className="mt-4 mb-2">Participant feedback</h4>
          <p>
            Fifteen children participated. Before the activity, they had no idea
            what bacteria, genetics or synthetic biology were; afterwards, about
            half could name one or two relevant points on their own. Two
            comments stayed with us: &ldquo;I learned that some microbes are
            good and some are bad,&rdquo; and &ldquo;I know DNA can become the
            cells in my body.&rdquo;
          </p>
          <p>
            Many of the youngest children struggled with our prepared
            explanations. We reduced technical vocabulary and shifted toward
            hands-on craft. A successful activity, we learned, is not the one
            that delivers the most content but the one that leaves a usable
            opening for curiosity.
          </p>

          <h3>2. Ages 6&ndash;12: Science Education at Wenlan Academy</h3>
          <p>
            We established a long-term partnership with Wenlan Academy and held
            public-interest science activities there. The Academy became the
            first educational institution to join syneduglobal.top, and proposed
            to support iGEM teams in China with travel reimbursement and
            one-night accommodation.
          </p>
          <p>
            Our lectures for children aged 6&ndash;12 gave a more systematic
            introduction to synthetic biology and connected it to cartilage
            health and bone growth during development. The materials were
            designed so that teachers could reuse them without our team present.
          </p>
          <PhotoFigure
            figure={4}
            layout="pair"
            caption="Science activities for children at Wenlan Academy, developed for reuse through the education platform."
            photos={[
              {
                number: 4,
                alt: "A team member presenting a science activity at Wenlan Academy.",
              },
              {
                number: 5,
                alt: "Group photograph of children and team members at Wenlan Academy.",
              },
            ]}
          />
          <h4 className="mt-4 mb-2">Participant feedback</h4>
          <p>
            Before the course, no child raised a hand when asked about synthetic
            biology, and answers about what cartilage does were vague. Afterwards,
            almost every child could name one or two key terms, and each could
            give at least one everyday situation in which cartilage health
            matters.
          </p>

          <h3>3. High School Students: Synthetic Biology and Paths into Learning</h3>
          <p>
            We spoke with 140 high-school students in a presentation that
            combined an introduction to synthetic biology, our project, and
            team members&rsquo; experiences of learning across subject
            boundaries. Because the audience was already making decisions about
            health and study, the session also included advice on healthy
            exercise and cartilage care. In the Q&amp;A, students repeatedly
            raised questions about university subject selection.
          </p>
          <p>
            We paired the presentation with leaflets so that the central ideas
            could travel beyond the time available in the hall. One
            member&rsquo;s route from philosophy into biology competitions gave
            students a concrete example of a path they might not have
            considered.
          </p>
          <PhotoFigure
            figure={5}
            layout="pair"
            caption="High-school presentation combining synthetic biology, our project, healthy exercise and learning pathways."
            photos={[
              {
                number: 6,
                alt: "Team members distributing leaflets during a high-school presentation.",
              },
              {
                number: 7,
                alt: "Group photograph of high-school students and the team after the presentation.",
              },
            ]}
          />
          <h4 className="mt-4 mb-2">Participant feedback: high-school questionnaires</h4>
          <p>
            The session used two pre/post instruments: a cartilage-health
            activity questionnaire and a synthetic-biology lecture
            questionnaire, both completed by the same 24 students. They are not
            independent events, and the two knowledge tests used different item
            sets (8 vs 5), so their means are not directly comparable. The
            results are descriptive and do not establish causality.
          </p>
          <h5 className="mt-4 mb-2">Cartilage-health activity questionnaire</h5>
          <p>
            Before the activity, 70.8% rated their understanding as 1&ndash;2;
            afterwards, mean self-rated understanding was 3.50, and 152/192
            knowledge items were correct (79.2%). Participants most wanted
            reliable human evidence and information on long-term risk.
          </p>
          <ExtendCard title="Questionnaire figures: baseline, change and information needs">
          <QuestionnaireFigure
            figure={6}
            src={`${IHP_FIG}/fig8.avif`}
            alt="Baseline awareness and knowledge of joint cartilage before the activity"
            width={4000}
            height={1198}
            caption="Baseline awareness and knowledge of joint cartilage (pre-activity, n = 24). (A) Prior attention to cartilage health. (B) Self-rated understanding (mean 2.08/5; 70.8% rated 1–2). (C) Knowledge of cartilage components: 79.2% could name at most a few components or functions."
          />
          <QuestionnaireFigure
            figure={7}
            src={`${IHP_FIG}/fig9.avif`}
            alt="Pre-post change in self-rated understanding and willingness"
            width={4000}
            height={918}
            caption="Pre-post change in self-rated understanding and willingness (n = 24). (A) Self-rated understanding was higher after the activity (mean 2.08 → 3.50; 1–5 scale). (B) Willingness to use an injectable, sterile cartilage-repair material was 33.3% before and 54.2% after (somewhat or very willing)."
          />
          <QuestionnaireFigure
            figure={8}
            src={`${IHP_FIG}/fig10.avif`}
            alt="Post-activity knowledge and information needs"
            width={4000}
            height={1341}
            caption="Post-activity knowledge and information needs (n = 24). (A) Correct answer rate by knowledge question; mean 79.2% (152/192). (B) Information participants most wanted before using an injectable material; reliable human evidence and long-term risks were the most common topics (68 selections)."
          />
          <QuestionnaireFigure
            figure={9}
            src={`${IHP_FIG}/fig11.avif`}
            alt="Feedback themes before and after the activity"
            width={4000}
            height={1785}
            caption="Feedback themes from open-text responses before and after the activity. The themes are not verbatim quotes and are not frequency-counted."
          />
          </ExtendCard>

          <h5 className="mt-4 mb-2">Synthetic-biology lecture questionnaire</h5>
          <p>
            The lecture questionnaire recorded prior exposure, self-rated
            understanding, post-lecture knowledge, attitudes and technology
            acceptance. Mean self-rated understanding was 2.17 before and 3.75
            after; 92/120 knowledge items were correct (76.7%).
          </p>
          <ExtendCard title="Questionnaire figures: knowledge, acceptance and feedback">
          <QuestionnaireFigure
            figure={10}
            src={`${IHP_FIG}/fig12.avif`}
            alt="Pre-lecture awareness and self-rated understanding"
            width={4000}
            height={1265}
            caption="Pre-lecture awareness and self-rated understanding (n = 24). (A) Prior exposure to synthetic biology. (B) Self-rated understanding (mean 2.17/5; 66.7% rated 1–2). (C) Prior awareness of iGEM."
          />
          <QuestionnaireFigure
            figure={11}
            src={`${IHP_FIG}/fig13.avif`}
            alt="Post-lecture knowledge, attitude, and information needs"
            width={4000}
            height={1235}
            caption="Post-lecture knowledge, attitude and information needs (n = 24). (A) Correct answer rate by knowledge question; mean 76.7% (92/120). (B) Post-lecture overall attitude. (C) Information participants most wanted after the lecture (up to three selections; 69 selections)."
          />
          <QuestionnaireFigure
            figure={12}
            src={`${IHP_FIG}/fig14.avif`}
            alt="Self-rated understanding and technology acceptance"
            width={4000}
            height={926}
            caption="Self-rated understanding and technology acceptance (n = 24). (A) Self-rated understanding was higher after the lecture (mean 2.17 → 3.75; 1–5 scale). (B) Willingness to work in a related field and acceptance of a product with non-live engineered output versus a product containing live engineered bacteria."
          />
          <QuestionnaireFigure
            figure={13}
            src={`${IHP_FIG}/fig15.avif`}
            alt="Feedback themes before and after the lecture"
            width={4000}
            height={1762}
            caption="Feedback themes before and after the lecture. The statements summarize feedback directions, not verbatim quotes, and are not frequency-counted."
          />

          </ExtendCard>

          <h3>4. Artistic Practice: Turning Movement and Gaze into Images</h3>
          <p>
            Inspired by <em>The Larva of Time</em>, we collaborated with artist
            Chen Xi on two interactive public works that turn movement and gaze
            into images. Both were invited to the &ldquo;Technology + Art&rdquo;
            exhibition organised by the Future Learning Center.
          </p>
          <p>
            In the first work, a performer wore motion sensors and repeated knee
            rehabilitation movements: squats, split squats, standing knee flexion
            and double-leg floor exercises. The recorded trajectories were
            treated in Chen Xi&rsquo;s visual language, producing four images
            that present rehabilitation as a drawing rather than a chart. The
            repetition carries a message: rehabilitation is usually described
            through pain and restriction, but a trace can also show discipline,
            strength and a body training itself back toward everyday life.
          </p>
          <p>
            In the second work, visitors&rsquo; eye movements were recorded while
            they looked at images of engineered bacteria, and the gaze paths were
            rendered as drawings. The piece invited people who might never enter
            a laboratory to take part through attention alone.
          </p>

          <h3>5. Public Visitors at the Future Learning Center</h3>
          <p>
            ZJU-China joined Zhejiang University&rsquo;s Future Learning Center
            and received more than 300 visits from domestic and international
            guests, including participants in the World Digital Education
            Conference, the Serbian delegation, officials from the West Asian
            Ministry of Education, an international media delegation and
            education experts from Shaanxi Province. Many visitors heard about
            synthetic biology for the first time.
          </p>
          <p>
            Their questions &mdash; what engineered bacteria are, whether
            damaged cartilage can heal, why a student team would build an
            education platform &mdash; were often the same questions our younger
            audiences asked in different words.
          </p>
          <PhotoFigure
            figure={14}
            layout="pair"
            caption="Future Learning Center visit by education experts from 12 Asian countries."
            photos={[
              {
                number: 8,
                alt: "Team member showing educational materials to a visiting expert at the Future Learning Center.",
              },
              {
                number: 9,
                alt: "Team member discussing educational materials with visiting experts.",
              },
            ]}
          />
          <PhotoFigure
            figure={15}
            layout="trio"
            caption="Activities associated with the World Digital Education Conference."
            photos={[
              {
                number: 10,
                alt: "Team members speaking with participants at the World Digital Education Conference.",
              },
              {
                number: 11,
                alt: "Conference venue during the World Digital Education Conference.",
              },
              {
                number: 12,
                alt: "Team members at an exhibition stand during the World Digital Education Conference.",
              },
            ]}
          />

          <h3>6. Older Adults: Cartilage Health in Yantan Village</h3>
          <p>
            In Yantan Village we carried out a small survey and walked through
            the community with residents, talking about knee pain, stiffness and
            movements that become difficult with age. The visit combined basic
            rehabilitation exercises that can be practised at home, an
            explanation of how joint health changes over a lifetime, and a
            conversation about misleading claims made for health supplements.
          </p>
          <p>
            Supplements marketed with unsupported promises about joint repair can
            cost families money and delay a conversation with a clinician. We
            explained what current evidence can and cannot support, and left
            people with questions they could bring to a doctor.
          </p>
          <PhotoFigure
            figure={16}
            layout="pair"
            caption="Interviews with older adults about health concerns, daily life and rehabilitation."
            photos={[
              {
                number: 16,
                alt: "An older adult standing at the entrance of a traditional building during an interview.",
              },
              {
                number: 17,
                alt: "An older adult walking on a stone path in a village during an interview.",
              },
            ]}
          />

          <h3>7. Proposal to the Health Commission</h3>
          <p>
            We prepared a research report,{" "}
            <a href={REPORT_PDF} target="_blank" rel="noreferrer">
              <strong>
                Articular Cartilage Injury: Current Status, Problems and
                Countermeasures
              </strong>
            </a>
            , combining our survey of hyaline cartilage injury with the
            educational practices described here and turning them into reusable
            guidance for community-level health education. We submitted it to the
            Hangzhou Municipal Health Commission and received a reply; under
            policy requirements, the response cannot be made public.
          </p>
          <p>
            Submitting recommendations is one step in an ongoing conversation.
            Within the project, patient experience has entered our Human
            Practices discussions and our review of material-design objectives.
          </p>
          <PhotoFigure
            figure={17}
            layout="single"
            caption="Cover of the research report submitted to the Hangzhou Municipal Health Commission."
            photos={[
              {
                number: 18,
                alt: "Cover page of the research report submitted to the Hangzhou Municipal Health Commission.",
              },
            ]}
          />

          <h2>Reflectivity from a Humanities Perspective</h2>
          <p>
            All the activities above address the question of how to pass on
            knowledge. The harder question arises afterwards: what exactly should
            we teach? In our interactions with the public and peers, we were
            repeatedly pressed with questions that existing answers could not
            settle: where the boundaries of synthetic biology lie, whose consent
            is necessary, and who should decide when benefits and harms fall on
            different groups.
          </p>
          <p>
            We decided to treat these questions as educational subjects rather
            than unfinished loose ends. This is also what distinguishes this
            section from conventional science communication: our audience is not
            only the general public but also the synthetic-biology field itself.
          </p>

          <h3>Reflections on Medical Anthropology</h3>
          <h4 className="mt-4 mb-2">Overseas Ethnography Workshop: Chiang Mai</h4>
          <p>
            Drawing on our stakeholder interviews and data analysis, we presented
            our findings at the Overseas Ethnography Workshop in Chiang Mai.
            The paper,{" "}
            <em>
              Pain beyond the Diagnostic Threshold: The Medical Invisibility of
              Early Joint Symptoms
            </em>
            , begins with a discrepancy identified in our background research:
            symptoms were frequently reported, yet rarely documented in formal
            medical records.
          </p>
          <p>
            Drawing on Arthur Kleinman&rsquo;s distinction between disease and
            illness, and on Havi Carel and Ian James Kidd&rsquo;s framework of
            epistemic injustice, the paper examines how patients&rsquo; accounts
            of pain, restricted mobility and disruption to everyday life are
            translated into clinically recognisable information &mdash; and which
            experiences may be lost in that process.
          </p>
          <p>
            The paper argues that patients&rsquo; care needs can still be
            recognised and addressed when a definitive diagnosis has not yet been
            established. Its primary contribution is to shift attention beyond
            the number of confirmed diagnoses toward the burden of symptoms that
            remains inadequately documented. It proposes incorporating
            patient-reported pain, its impact on everyday life and the need for
            follow-up care into clinical assessment.
          </p>
          <PhotoFigure
            figure={18}
            layout="single"
            caption="Overseas ethnographic work involving interdisciplinary research and exchange."
            photos={[
              {
                number: 22,
                alt: "Participants at an overseas ethnography workshop.",
              },
            ]}
          />

          <h4 className="mt-4 mb-2">
            Anthropological Perspectives on Medical Power Sharing
          </h4>
          <p>
            After sharing our findings with the Institute of Social Medicine and
            Health Management at Zhejiang University, we organised a medical
            anthropology lecture for medical students on campus. Through research
            presentations and roundtable discussions, we encouraged future
            physicians to become more attentive to patients&rsquo; lived
            experiences, and to understand that illness is not merely
            physiological harm but is shaped by social conditions and compounded
            by structural violence embedded in systems of power.
          </p>
          <p>
            We emphasised that patients&rsquo; care needs can and should still be
            recognised when diagnostic criteria remain ambiguous. By reflecting
            critically on the deeper structures of healthcare, we hope to address
            patients&rsquo; needs in a more fundamental and meaningful way.
          </p>
          <PhotoFigure
            figure={19}
            layout="pair"
            caption="Lecture for medical students on medical power from an anthropological perspective."
            photos={[
              {
                number: 20,
                alt: "Medical students listening to a lecture on medical anthropology.",
              },
              {
                number: 21,
                alt: "Lecturer presenting medical power from an anthropological perspective.",
              },
            ]}
          />

          <h3>
            Discussion on Synthetic Biology from the Philosophy of Science and
            Technology
          </h3>
          <p>
            One strand of synthetic biology makes biology easier to design and
            build by standardising parts, modularising functions and abstracting
            away detail. Drew Endy set out this engineering programme in{" "}
            <a
              href="https://www.nature.com/articles/nature04342"
              target="_blank"
              rel="noreferrer"
            >
              &ldquo;Foundations for engineering biology&rdquo;
            </a>{" "}
            (<em>Nature</em>, 2005). It is a powerful research strategy, and it
            also raises a philosophical question: when we describe life as a
            system of functional modules, what does that description explain, and
            what relationships does it leave out?
          </p>
          <p>
            We found it useful to treat &ldquo;life as a machine&rdquo; as a
            model with a domain of validity rather than a complete account.
            Synthetic biology is not a single intellectual position; its research
            programmes disagree about these questions, and the field should not
            be reduced to one mechanical view.
          </p>
          <p>
            Building a system is also a way of testing an explanation. Design,
            assembly and measurement let researchers ask whether their
            understanding of a mechanism is sufficient to reproduce its function.
            That success still leaves an epistemological question open: if an
            engineered system performs a task, have we understood how the natural
            system performs it? Holding that question open became part of how we
            present the field to others.
          </p>

          <h2>Summary and Reflection</h2>
          <h3>Summary</h3>
          <div className="education-video-note">
            <strong>
              Video | ZJU-China: education summary (2026) [English]
            </strong>
            <p>
              A review of this season&rsquo;s educational practice, connecting
              activities for different ages, shared resources and reflection
              within the team.
            </p>
            <div className="education-video-frame">
              <iframe
                title="ZJU-China: Education summary (2026) [English]"
                src="https://video.igem.org/videos/embed/rv8h4bZFFbLsKBnVbxyv5i"
                allow="fullscreen"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                loading="lazy"
              />
            </div>
          </div>
          <h3>Reflection</h3>
          <p>
            We brought knowledge into the community and integrated the
            community&rsquo;s questions back into our research. Through these
            journeys in both directions, the meaning of education became clearer:
            helping more people understand science, and helping those who do
            science understand others with greater care.
          </p>
          <p>
            We attempted to secure sponsors for our project, approaching
            synthetic-biology exhibition organisers and study-abroad agencies;
            both declined. We also missed the timeline for joining the iGEM
            community&rsquo;s educational initiatives this season. These setbacks
            point to work we would begin earlier next time: fundraising before
            the activity calendar fills, and entering community programmes when
            they open rather than after our own events are complete.
          </p>
          <p>
            Next year we hope to strengthen fundraising, take part in Education
            101, and invite more teams outside China to contribute to the
            platform. The resources gathered here are only the beginning.
          </p>
        </article>
      </div>
    </div>
  );
}
