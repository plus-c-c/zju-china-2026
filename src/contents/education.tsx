import { TableCaption } from "../components/FigureCaption";
import { Link } from "react-router-dom";
import { FlappyInjection } from "../components/FlappyInjection";
import "./education.css";

/** Static host for the Education figures. The exported `edu-*.avif`
 *  files are served from this folder. */
const EDUCATION_IMG =
  "https://static.igem.wiki/teams/6102/wiki/images/engagement/education/new";
const REPORT_PDF = "https://static.igem.wiki/teams/6102/wiki/hp-new/res.pdf";

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

export function Education() {
  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article>
          <h2 className="mt-4 mb-2">Education</h2>
          <p className="education-subtitle">
            Bringing Knowledge into Everyday Life, Bringing Human Experience
            into Research
          </p>
          <blockquote className="education-quote">
            <p>
              &ldquo;I believe that education, therefore, is a process of living
              and not a preparation for future living.&rdquo;
            </p>
            <footer>
              &mdash; John Dewey, <cite>My Pedagogic Creed</cite>, Article II
              (1897)
            </footer>
          </blockquote>

          <h2>Overview</h2>
          <p>
            The significance of synthetic biology extends beyond what we achieve
            in the laboratory; it also lies in what we share beyond its walls.
            For a child, it may begin with curiosity sparked by a game. For a
            high school student considering a field of study, it may open a
            window onto the future. For someone living with cartilage damage, it
            must ultimately speak to something more immediate: whether pain can
            ease, and whether everyday life can open up again.
          </p>
          <p>
            We therefore understand education as a relationship in which
            learning moves both ways. We share knowledge, while allowing
            others&rsquo; experiences to reshape our questions. This season, our
            work brought together public science education, learning within the
            team, and reflection on the responsibilities of our field. An
            educational resource platform supports the preservation and sharing
            of these experiences.
          </p>
          <p>
            Nelson Mandela described education as &ldquo;the most powerful
            weapon which you can use to change the world.&rdquo; Our season
            added a quieter lesson to that ambition: education also changes the
            people who teach. Synthetic biology is moving out of the laboratory
            faster than public understanding, industrial practice, and the
            field&rsquo;s ethical awareness are keeping pace, and that distance
            cannot be closed by explanation alone.
          </p>
          <p>
            Our interviews pointed to three linked problems: the importance of
            early intervention in cartilage defects, limited public awareness of
            joint health, and unresolved questions inside medicine itself. We
            addressed the first two through systematic education across age
            groups, and the third through reflection on our own field, treating
            the questions our activities raised as subjects to study rather than
            loose ends to leave behind.
          </p>
          <p>
            We hope to leave more than the result of a single event: we hope to
            create the ground for understanding to grow again.
          </p>

          <h2>Why We Educate</h2>
          <p>
            As our project developed, three recurring concerns reminded us that
            education must go beyond explaining technology.
          </p>
          <p>
            The first was the{" "}
            <strong>
              distance between scientific language and public understanding
            </strong>
            . Some participants approached synthetic biology through familiar
            terms such as &ldquo;gene editing&rdquo; and &ldquo;genetic
            modification,&rdquo; bringing concerns shaped by science fiction and
            everyday information without filter. These questions were not
            mistakes to be corrected, but places to begin a conversation. We
            needed to make room for people to ask, examine, and make sense of
            what they heard.
          </p>
          <p>
            The second was the{" "}
            <strong>
              distance between research metrics and lived experience
            </strong>
            . In some discussions with industry representatives and peers,
            attention centered on material performance and experimental results.
            Pain, mobility, and the demands of care reminded us that technical
            performance is only part of recovery. We began to ask ourselves:
            when we call a project &ldquo;successful,&rdquo; have we also
            listened to how patients describe their lives?
          </p>
          <p>
            The third concerned{" "}
            <strong>our field&rsquo;s responsibility to examine itself</strong>.
            As technology gains the capacity to intervene in living systems, we
            need to ask who bears the risks, who makes the choices, and whose
            voices have yet to enter the discussion. We made these questions
            part of our education work, recognizing that we, too, had much to
            learn.
          </p>

          <h2>Our Educational Framework</h2>
          <TableCaption>
            <strong>Table 1 |</strong> Educational framework: areas,
            participants, guiding questions, and main activities.
          </TableCaption>
          <div className="table-responsive mb-4">
            <table
              className="table table-bordered align-middle"
              aria-label="Table 1: Educational framework"
            >
              <thead className="table-primary">
                <tr>
                  <th scope="col">Area</th>
                  <th scope="col">Participants</th>
                  <th scope="col">Guiding question</th>
                  <th scope="col">Main activities</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Public science education</th>
                  <td>
                    Young children, school-age children, high school students,
                    older adults, and the wider public
                  </td>
                  <td>
                    How can we build on people&rsquo;s existing experiences to
                    make science understandable?
                  </td>
                  <td>
                    Community games, science activities at Wenlan Academy, high
                    school presentations, a short film on cartilage damage,
                    artistic practice, and health promotion for older adults
                  </td>
                </tr>
                <tr>
                  <th scope="row">Learning within the team</th>
                  <td>Team members and related researchers</td>
                  <td>
                    How can patient experience inform the way we assess our
                    project?
                  </td>
                  <td>
                    Interviews with patients and older adults, discussions of
                    rehabilitation, and research-informed recommendations
                  </td>
                </tr>
                <tr>
                  <th scope="row">Reflection on the field and its ethics</th>
                  <td>
                    Academic peers, industry participants, and our own team
                  </td>
                  <td>
                    How can we discuss the boundaries and responsibilities of
                    technological development together?
                  </td>
                  <td>
                    Fieldwork, industry research, and exchanges in the
                    philosophy of technology and medical anthropology
                  </td>
                </tr>
                <tr>
                  <th scope="row">Shared resources and infrastructure</th>
                  <td>
                    iGEM teams, teachers, and science education organizations
                  </td>
                  <td>
                    How can one educator&rsquo;s experience remain useful to the
                    next?
                  </td>
                  <td>
                    The{" "}
                    <a
                      href="https://syneduglobal.top"
                      target="_blank"
                      rel="noreferrer"
                    >
                      syneduglobal.top
                    </a>{" "}
                    educational resource platform and collaboration across
                    universities
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            This framework emerged through practice. Public questions changed
            the way we communicated; patients&rsquo; experiences led us to
            reconsider our goals; and interdisciplinary discussions helped us
            understand the ethical responsibilities behind those goals.
          </p>

          <h2>
            1 Science Education for Different Ages: Beginning with Lived
            Experience
          </h2>
          <p>
            People of different ages hold different vocabularies, interests, and
            ways of expressing themselves. We adjusted the depth of our content,
            the forms of interaction, and the ways we gathered feedback, seeking
            a meaningful starting point tailored for each audience.
          </p>
          <p>
            The pathway runs from children aged 3&ndash;6, to children aged
            6&ndash;12, to high school students facing decisions about what to
            study, and finally to the general public in its many forms:
            patients, families, older adults, and international visitors. All
            materials from the activities described below &mdash; slides,
            posters, handouts, and activity guides &mdash; are publicly
            available on{" "}
            <a href="https://syneduglobal.top" target="_blank" rel="noreferrer">
              syneduglobal.top
            </a>
            .
          </p>

          <h3>
            1.1 Ages 3&ndash;6: Biology through Play at Qigudeng Community
          </h3>
          <h4 className="mt-4 mb-2">Beginning with Curiosity</h4>
          <p>
            For young children, our aim was to encourage a{" "}
            <strong>willingness to explore an unfamiliar world</strong>: to
            discover that invisible microorganisms live around us, describe
            something noticed during a game, and remain curious about their
            bodies and living things. Making explanations simpler also required
            us to preserve their scientific accuracy.
          </p>
          <p>
            We partnered with Qigudeng Community in Gongshu District, Hangzhou,
            to offer biology games and introduce cartilage health. Activities
            resembling bracelet weaving introduced early ideas about{" "}
            <strong>&ldquo;cell factories&rdquo; and inheritance</strong>.
            Visual teaching aids made microorganisms more tangible, while
            movement-based games connected joint motion with cartilage health.
          </p>
          <p>
            The whole session was designed as one continuous game. Matching and
            &ldquo;spot the difference&rdquo; cards made bacteria and
            inheritance visible on the table, and movement games asked children
            to imitate a joint in motion and imagine what happens to cartilage
            under load. Nothing depended on reading, and every idea could be
            touched or performed.
          </p>
          <PhotoFigure
            figure={1}
            layout="feature"
            caption="Biology games at Qigudeng Community. Play-based interactions introduced children aged 3–6 to microorganisms and cartilage health through games and teaching aids."
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

          <h4 className="mt-4 mb-2">
            Learning from Children&rsquo;s Responses
          </h4>
          <p>
            Fifteen children participated in the activity. To suit their age, we
            gathered feedback through questions answered by a show of hands and
            observations recorded during the session. Before the session, the
            children did not yet know what bacteria, genetics, or synthetic
            biology were; afterwards, about half could name one or two relevant
            points on their own. Two comments stayed with us: &ldquo;I learned
            that some microbes are good and some are bad,&rdquo; and &ldquo;I
            know DNA can become the cells in my body.&rdquo;
          </p>
          <p>
            We also recorded a less comfortable observation. Many of the
            youngest children could not follow the explanations we had prepared.
            During the session we changed course, reduced the amount of
            technical vocabulary, and shifted toward hands-on craft. The
            experience taught us that a successful activity is not the one that
            covers the most content, but the one that leaves something a child
            can hold onto.
          </p>
          <p>
            <strong>
              Ideas connected to bodily experience elicited more responses.
            </strong>{" "}
            When a question turned to what happens to a knee during running or
            jumping, abstract knowledge found a familiar doorway. We learned to
            begin educational design by asking, &ldquo;What have they
            experienced?&rdquo; before asking, &ldquo;What do we want to
            explain?&rdquo;
          </p>

          <h4 className="mt-4 mb-2">
            What Remains for the Community and Future Activities
          </h4>
          <p>
            Our community partnership provides a foundation for continuing
            science activities for young children. Conversations with parents
            and caregivers also reminded us to consider families&rsquo; needs
            for information about joint health. We have organized the game
            designs, teaching-aid plans, and observation records for future
            activities and for other teams to consult.
          </p>

          <h3>
            1.2 Ages 6&ndash;12: Community Science Education at Wenlan Academy
          </h3>
          <h4 className="mt-4 mb-2">
            Giving Abstract Ideas a Familiar Starting Point
          </h4>
          <p>
            For school-age children, we hoped to nurture curiosity alongside
            observation, questioning, and early attempts at explanation. We
            established a long-term partnership with Wenlan Academy, held
            public-interest science activities, and helped it become the first
            educational institution to join our platform.
          </p>
          <p>
            Under the partnership arrangements, the academy offered travel
            reimbursement and one night of accommodation to iGEM teams traveling
            within China to deliver educational activities. This support
            extended cooperation beyond sharing content to address the practical
            costs student teams face when organizing events.
          </p>
          <p>
            The session itself offered a more systematic introduction to
            synthetic biology than our work with younger children, and, for
            children who were still growing, knowledge about cartilage health
            and bone growth. The aim was not to simplify the field beyond
            recognition but to give a first map that later lessons could extend.
          </p>
          <PhotoFigure
            figure={2}
            layout="pair"
            caption="Science activities for children at Wenlan Academy. We established a long-term partnership and shared activity materials on the platform for other teams to reuse."
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

          <h4 className="mt-4 mb-2">
            Asking Questions Children Can Engage With
          </h4>
          <p>
            We designed an age-appropriate questionnaire to explore
            children&rsquo;s understanding. Its questions used concrete
            situations and everyday language wherever possible, reducing the
            burden of unfamiliar terminology.
          </p>
          <p>
            Interaction also changed the way we asked questions. When broad
            questions drew few responses, a clear situation or a set of options,
            followed by an invitation to explain the answer, helped open the
            discussion. We wanted this guidance to give children a foothold for
            expression, while leaving room for their own thinking.
          </p>
          <p>
            The activity reminded us that{" "}
            <strong>
              expertise is also reflected in the ability to explain complexity
              clearly
            </strong>
            . Its content and materials have been included in our platform
            resource collection, while the continuing partnership provides
            opportunities to repeat and improve the activities.
          </p>
          <p>
            The change was measurable in simple terms. Before the session, no
            child raised a hand when asked about synthetic biology, and answers
            about what cartilage does were vague. Afterwards, almost every child
            could name one or two key terms, and each could give at least one
            everyday situation in which cartilage health matters.
          </p>

          <h3>
            1.3 High School Students: Synthetic Biology and Paths into Learning
          </h3>
          <h4 className="mt-4 mb-2">
            Introducing a Field while Acknowledging the Uncertainty of Choice
          </h4>
          <p>
            For high school students considering their studies, &ldquo;What is
            synthetic biology?&rdquo; often comes with another question:
            &ldquo;Could I find a place in this field?&rdquo; We spoke with 140
            high school students in a presentation that combined an introduction
            to the discipline, our team&rsquo;s project, and members&rsquo;
            experiences of learning across subject boundaries. We wanted
            students to see both the research and the different paths that could
            lead to it.
          </p>
          <p>
            Because this audience was already making decisions about health and
            study, the session also included advice on healthy exercise and
            cartilage care. In the question-and-answer period we answered
            questions about university subject selection, a topic students
            raised themselves and returned to throughout the discussion.
          </p>
          <p>
            We paired a spoken presentation with leaflets to share the central
            ideas within the time available around schoolwork. One
            member&rsquo;s experience of entering biology competitions from a
            philosophy background offered a concrete example: a possibility to
            consider, with room for each student&rsquo;s circumstances and
            choices.
          </p>
          <PhotoFigure
            figure={3}
            layout="pair"
            caption="Our high school presentation on campus, combining synthetic biology, our project, healthy exercise, and learning pathways."
            photos={[
              {
                number: 6,
                alt: "Team members distributing leaflets during a high school presentation.",
              },
              {
                number: 7,
                alt: "Group photograph of high school students and the team after the presentation.",
              },
            ]}
          />

          <h4 className="mt-4 mb-2">From Our Project to Their Futures</h4>
          <p>
            The activity questionnaire explored changes in participants&rsquo;
            understanding and interest before and after the session. We also
            distributed a short cognitive measurement scale at the event;
            responses showed an increase in students&rsquo; awareness after the
            lecture. This is a descriptive observation and does not establish
            causality.
          </p>
          <p>
            Questions about learning pathways and whether the field suited them
            were prominent in the discussion. This reminded us that{" "}
            <strong>
              science education can help people understand their own choices
            </strong>{" "}
            as well as the presenter&rsquo;s work.
          </p>
          <p>
            Before-and-after questionnaires can offer an indication of immediate
            change. We have preserved the full video materials and leaflet
            designs and included them among the platform&rsquo;s resources for
            other teams to consult.
          </p>

          <h4 className="mt-4 mb-2">
            Participant feedback: synthetic-biology lecture
          </h4>
          <p>
            The pre/post questionnaire for our high-school synthetic-biology
            lecture, including its figures and analysis, is presented in full on
            the Integrated Human Practices page.{" "}
            <Link to="/human-practices#ihp-nest-synbio-lecture">
              Read the synthetic-biology lecture questionnaire on the IHP page
            </Link>
            .
          </p>

          <h3>
            1.4 The Wider Public: A Film on Cartilage Damage and Life after
            Surgery
          </h3>
          <p>
            Our earlier activities gave us experience working with younger
            audiences and reminded us to reach further toward patients,
            families, and caregivers. We produced a short educational film about
            cartilage damage, focusing on pain, difficulties with movement, and
            quality-of-life concerns that still deserve attention after surgery.
          </p>
          <p>
            Through movement, expression, and everyday scenes, we hoped to make
            these difficulties more tangible.{" "}
            <strong>
              Images cannot take the place of patients speaking for themselves,
              but they can create an opening for listening.
            </strong>
          </p>
          <p>
            During planning, we came to understand that people need information
            about technology and reassurance that their difficulties deserve to
            be taken seriously. Questions about pain, the course of recovery,
            and daily activities remain after an operation is complete. This
            recognition further shaped learning within our team.
          </p>
          <p>
            We plan to make the film available on the educational platform. The
            Education page focuses on its communication goals and content
            design; the IHP page can draw on interview records to explain how
            the needs it addresses informed our project thinking.
          </p>

          <h3>
            1.5 Artistic Practice: Turning Movement and Gaze into Evidence
          </h3>
          <p>
            Art offered a different route into the same questions. Inspired by{" "}
            <em>The Larva of Time</em>, we worked with artist Chen Xi on two
            interactive public works that turn movement and gaze into images.
            Where a slide can explain a joint, a traced movement can let someone
            sense the effort inside it. Both works were invited to the
            Technology + Art exhibition organized by the Future Learning Center.
          </p>
          <h4 className="mt-4 mb-2">Rehabilitation Trajectories</h4>
          <p>
            A performer wore motion sensors and repeated knee rehabilitation
            exercises on site: squats, split squats, standing knee flexion, and
            double-leg floor exercises. Repeating each movement produced layered
            trajectories, which we then treated in the visual language Chen Xi
            proposed. The result is a set of four images that record a
            rehabilitation session as a drawing rather than a chart.
          </p>
          <p>
            The repetition carries the message. Rehabilitation is usually
            described through pain and restriction; seen as a trace, it also
            shows discipline, strength, and a body training itself back toward
            everyday life. We hope the blue of the images and the warmth around
            them can make the hidden effort of people with cartilage defects
            easier for the public to imagine.
          </p>
          <h4 className="mt-4 mb-2">Drawing Engineered Bacteria with Gaze</h4>
          <p>
            In the second work, visitors&rsquo; eye movements were recorded
            while they looked at images of engineered bacteria, and the gaze
            paths were rendered as drawings. The piece invited people who might
            never enter a laboratory to take part in synthetic biology through
            attention alone, and to leave with an image of engineered bacteria
            that is aesthetic as well as scientific. For us, it was a reminder
            that public education can begin with attention and feeling before it
            turns to facts.
          </p>

          <h3>
            1.6 Exchanges with Education Experts from 12 Asian Countries:
            Opening Our Approach to Other Perspectives
          </h3>
          <p>
            During a visit associated with the Future Learning Center, we
            discussed educational approaches and needs with experts from 12
            Asian countries. For our student team, this was an opportunity to
            consider our practice in a wider context. Would the ways we usually
            explain things suit different learners? Did our resources address
            what educators actually needed?
          </p>
          <PhotoFigure
            figure={4}
            layout="pair"
            caption="Future Learning Center visit by education experts from 12 Asian countries, discussing educational approaches and needs."
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

          <h3>
            1.7 Exploring Cooperation with Serbian Education Representatives and
            Teams
          </h3>
          <p>
            During activities associated with the World Digital Education
            Conference, representatives of Serbia&rsquo;s education authorities
            expressed interest in exchanges on synthetic biology education and
            in promoting our educational website. We see this as a starting
            point for further communication. Contact remains at an early,
            exploratory stage, and no joint project has begun. Resource sharing
            and team exchanges are possible directions, with specific
            arrangements still to be agreed together.
          </p>
          <PhotoFigure
            figure={5}
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

          <h3>1.8 Older Adults: Cartilage Health in Yantan Village</h3>
          <p>
            Our audience pathway extends beyond school years. In Yantan Village
            we carried out a small survey and walked through the community with
            residents, talking about knee pain, stiffness, and the movements
            that become difficult with age. The visit combined basic
            rehabilitation exercises that can be practiced at home, an
            explanation of how joint health changes over a lifetime, and a
            conversation about misleading claims made for health supplements.
          </p>
          <p>
            The last point mattered as much as the exercises. Supplements
            marketed with unsupported promises about joint repair can cost
            families money and, worse, delay a conversation with a clinician.
            Rather than dismissing these products outright, we tried to explain
            what current evidence can and cannot support, and to leave people
            with questions they could bring to a doctor. The same conversations
            informed the interviews discussed in Section 3.
          </p>

          <h3>1.9 Public Visitors at the Future Learning Center</h3>
          <p>
            This season ZJU-China joined Zhejiang University&rsquo;s Future
            Learning Center, where our team received more than 300 visits from
            domestic and international guests. They came from many walks of
            life, including participants in the World Digital Education
            Conference, the Serbian delegation, officials from the West Asian
            Ministry of Education, an international media delegation, and
            education experts from Shaanxi Province.
          </p>
          <p>
            Many visitors heard about synthetic biology for the first time at
            our display. Their questions &mdash; what engineered bacteria
            actually are, whether damaged cartilage can heal, why a student team
            would build an education platform &mdash; were often the same
            questions our younger audiences asked in different words. Answering
            them in a few minutes, without a classroom or a worksheet, was good
            practice for explaining our work plainly.
          </p>

          <h2>
            2 A Shared Platform: Carrying Educational Experience beyond One
            Season
          </h2>
          <h3>Why We Built syneduglobal.top</h3>
          <p>
            While preparing activities, we experienced the repeated work that
            scattered resources can create. Handouts, videos, questionnaires,
            and teaching-aid plans were stored in different places, making it
            difficult for the next team to learn whom they suited, how to use
            them, and where their limitations lay.
          </p>
          <p>
            Talking with other teams made the problem sharper. Almost every team
            we met described the same difficulty: educational activities were
            hard to find, and ideas for organizing them were scarce. Almost
            every school and community center we visited described the opposite
            need &mdash; a strong wish for someone to come and run a session.
            The missing link was not enthusiasm but connection.
          </p>
          <p>
            We therefore initiated{" "}
            <a href="https://syneduglobal.top" target="_blank" rel="noreferrer">
              <strong>syneduglobal.top</strong>
            </a>
            , hoping that what one activity leaves behind can become a starting
            point for the next.
          </p>

          <h3>Shared Responsibilities and Platform Design</h3>
          <p>
            ZJU-China initiated the platform, with Westlake University
            contributing to its development, Xi&rsquo;an Jiaotong-Liverpool
            University connecting with international iGEM teams, and Jiangnan
            University&rsquo;s School of Food Science and Technology adding an
            industrialization education module. Our team takes responsibility
            for the overall architecture, functional design, and content
            integration. The <Link to="/collaboration">Collaboration page</Link>{" "}
            describes the partnership in more detail.
          </p>
          <p>
            The platform addresses three needs: bringing usable materials
            together; helping educators find relevant experience by age group,
            topic, and activity format; and supporting continuity across seasons
            through sustained cooperation and resource maintenance.
          </p>
          <p>
            Anyone can download the materials freely, and members can contribute
            their own activity materials and exchange ideas in the discussion
            area. Educational institutions can join the platform and post
            recruitment for their programs. This season, 37 Chinese universities
            were invited to share their educational activity cases.
          </p>
          <p>
            The platform is live and has begun collecting educational projects
            from multiple teams, including materials from our own activities. We
            also plan to survey educators about the difficulties they encounter
            in organizing activities, accessing resources, and reaching
            audiences. During the Jamboree we will continue to introduce the
            platform, and we hope to welcome teams from outside China as
            contributors.
          </p>
          <PhotoFigure
            figure={6}
            layout="single"
            caption="The syneduglobal.top educational platform. Our team designed the architecture and functions, with Westlake University, Xi’an Jiaotong-Liverpool University, and Jiangnan University contributing content. The live platform displays project collections, recruitment postings, and material download entry points."
            photos={[
              {
                number: 13,
                alt: "Poster introducing the syneduglobal.top educational resource platform.",
              },
            ]}
          />

          <h3>Resources Need Both Reuse and Care</h3>
          <p>
            Preparing resources for the platform prompted us to examine our own
            work. Could an educator unfamiliar with the activity understand the
            materials? Had we explained the intended age group, activity steps,
            and feedback methods? What would need to change for another
            classroom?
          </p>
          <p>
            We gradually began to ask{" "}
            <strong>&ldquo;What will this leave behind?&rdquo;</strong> when
            evaluating an educational activity. Attendance records the reach of
            one encounter; reusable resources allow that encounter to have a
            life beyond the room.
          </p>
          <p>
            To support continued operation, the four founding schools signed a
            five-year cooperation agreement and prepared a joint development
            plan. The agreement records the participating parties, their
            responsibilities for maintenance, and the intended direction of the
            platform; the photographs below record the signing.
          </p>
          <PhotoFigure
            figure={7}
            layout="pair"
            caption="Signing of the five-year cooperation agreement among the four founding schools, with pages showing the parties and their planned responsibilities."
            photos={[
              {
                number: 14,
                alt: "Chinese-language page of the long-term cooperation memorandum.",
              },
              {
                number: 15,
                alt: "English-language page of the long-term cooperation memorandum.",
              },
            ]}
          />

          <h2>
            3 Learning within the Team: Seeing the Person beyond Tissue Repair
          </h2>
          <h3>Reconsidering Where Our Project Ends</h3>
          <p>
            Material performance and experimental results are essential to
            research, but they cannot, on their own, tell us whether someone has
            regained their everyday life. In cartilage repair, tissue-level
            improvements need to be understood alongside pain, mobility, and the
            demands of care.
          </p>
          <p>
            We therefore propose that{" "}
            <strong>
              tissue repair does not automatically amount to full recovery
            </strong>
            .
          </p>
          <p>
            This is first a reminder to ourselves. Limited conversations do not
            justify a judgment that medicine as a whole neglects patient
            experience. They do invite us to examine our own work more closely:
            which experiences have entered our design, communication, and
            evaluation, and which have yet to be considered?
          </p>

          <h3>Three Questions We Want to Bring into Research</h3>
          <ol>
            <li>
              <strong>
                How can patients&rsquo; pain be heard and documented with care?
              </strong>{" "}
              With appropriate study design and professional guidance,
              patient-reported experiences should help us understand outcomes
              alongside objective measures.
            </li>
            <li>
              <strong>
                What specific abilities does recovery mean to patients?
              </strong>{" "}
              Walking, climbing stairs, sitting for extended periods, and
              returning to everyday activities offer important starting points
              for understanding their needs.
            </li>
            <li>
              <strong>How can patient needs enter design discussions?</strong>{" "}
              Comfort, the demands of use, and rehabilitation support should be
              considered as a proposed solution takes shape.
            </li>
          </ol>
          <p>
            These questions clarify what we hope our research will ultimately
            address; they do not claim that our material has already improved
            these outcomes. Translating experience into appropriate research
            questions still requires participation from patients, clinicians,
            and rehabilitation professionals.
          </p>

          <h3>Learning through Interviews</h3>
          <p>
            Two students with experience of cartilage damage whom we met at the
            East China iGEM Meetup, along with parents and caregivers in
            community activities, gave us ways to understand everyday
            difficulties. Interviews with older adults also helped us explore
            how health concerns affect daily life and how participants
            understand their own situations.
          </p>
          <p>
            These experiences cannot represent every patient. They nevertheless
            remind us to avoid using a single measure to describe
            everyone&rsquo;s recovery. Further information on interview context,
            informed consent, and how needs fed back into the project appears on
            the IHP page.
          </p>
          <PhotoFigure
            figure={8}
            layout="pair"
            caption="Interviews with older adults about the effects of health concerns on daily life and their understanding of the issues."
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

          <h3>From Team Discussions to Public Recommendations</h3>
          <p>
            We prepared a research report,{" "}
            <a href={REPORT_PDF} target="_blank" rel="noreferrer">
              <strong>
                Articular Cartilage Injury: Current Status, Problems and
                Countermeasures
              </strong>
            </a>
            , which combined our survey of hyaline cartilage injury with the
            educational practices described on this page, turning them into
            reusable guidance for community-level health education. According to
            our team records, we submitted the findings and recommendations to
            the Hangzhou Municipal Health Commission and received a written
            reply. We hoped to bring the concerns we observed into a wider
            public discussion, recognizing that submitting recommendations is
            one step in an ongoing conversation.
          </p>
          <p>
            Within the project, patient experience has entered our Human
            Practices discussions and our review of material design objectives.
          </p>
          <PhotoFigure
            figure={9}
            layout="single"
            caption="Cover of the research report “Articular Cartilage Injury: Current Status, Problems and Countermeasures”, submitted to the Hangzhou Municipal Health Commission."
            photos={[
              {
                number: 18,
                alt: "Cover page of the research report submitted to the Hangzhou Municipal Health Commission.",
              },
            ]}
          />

          <h2>
            4 Reflecting on Our Field: Learning to Ask Responsible Questions
          </h2>
          <h3>Returning to Ethics and Social Relationships</h3>
          <p>
            Explaining synthetic biology to the public brought us to deeper
            questions. Who decides how a technology is used? Are those who
            benefit also those who bear its risks? When a material enters the
            body, does the patient have sufficient opportunity to understand,
            ask questions, and make a choice?
          </p>
          <p>
            We included these questions in our educational work and turned to
            interdisciplinary exchanges to learn how to ask them better.
            Educators, too, need to learn;{" "}
            <strong>
              technical familiarity cannot stand in for understanding another
              person&rsquo;s circumstances
            </strong>
            .
          </p>

          <h3>Medical Anthropology: Listening beyond Diagnosis</h3>
          <p>
            Our interviews kept returning to a discrepancy. People described
            pain, stiffness, and limits on movement frequently, yet those
            experiences appeared rarely in formal records. At the Overseas
            Ethnography Workshop in Chiang Mai, we presented a paper that began
            from this observation,{" "}
            <em>
              Pain beyond the Diagnostic Threshold: The Medical Invisibility of
              Early Joint Symptoms
            </em>
            . Combining our survey with conversations with hospital
            stakeholders, it examines how pain is under-recognized while a
            diagnosis is still uncertain.
          </p>
          <p>
            The paper draws on Kleinman&rsquo;s distinction between disease and
            illness, and on Carel and Kidd&rsquo;s account of epistemic
            injustice, to trace how statements about pain, restricted movement,
            and disruption to daily life are translated into information a
            clinic can recognize &mdash; and which parts of that experience may
            be lost in translation. Its argument is modest: even before a
            diagnosis is clear, a patient&rsquo;s need for care can be
            identified and answered, and assessment should include reported
            pain, its effect on daily life, and the need for follow-up.
          </p>
          <p>
            We brought the paper back to the Institute of Social Medicine and
            Health Services Management at Zhejiang University, and then to
            medical students in a lecture and roundtable on medical power from
            an anthropological perspective. The aim was not to add another topic
            to their curriculum but to strengthen a habit: noticing that illness
            arrives with a social situation, and that a patient&rsquo;s account
            deserves to be heard even when the diagnostic criteria are
            ambiguous.
          </p>

          <h3>Research and Exchanges</h3>
          <TableCaption>
            <strong>Table 2 |</strong> Research and exchange activities,
            approaches, and focus.
          </TableCaption>
          <div className="table-responsive mb-4">
            <table
              className="table table-bordered align-middle"
              aria-label="Table 2: Research and exchange activities"
            >
              <thead className="table-primary">
                <tr>
                  <th scope="col">Activity</th>
                  <th scope="col">Approach and focus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Anthropological research in Chiang Mai</th>
                  <td>
                    Fieldwork in Chiang Mai, Thailand, engaging with specific
                    social contexts
                  </td>
                </tr>
                <tr>
                  <th scope="row">Synthetic biology industry research</th>
                  <td>
                    Industry visits exploring technological applications and the
                    organizational conditions that support them
                  </td>
                </tr>
                <tr>
                  <th scope="row">Overseas ethnography workshop</th>
                  <td>
                    An exchange on relevant methods and experiences, July 31,
                    2026
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    Discussions on the philosophy of technology and ethics
                  </th>
                  <td>
                    Exploring the ethical boundaries and responsibilities of
                    synthetic biology
                  </td>
                </tr>
                <tr>
                  <th scope="row">Medical anthropology exchanges</th>
                  <td>
                    Examining implantable medical materials, informed consent,
                    and power relations in healthcare
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <PhotoFigure
            figure={10}
            layout="single"
            caption="STS and Bodily Power session, Third Annual Social Research Conference, Department of Sociology, Zhejiang University."
            photos={[
              {
                number: 19,
                alt: "Speakers and participants at the STS and Bodily Power session.",
              },
            ]}
          />
          <PhotoFigure
            figure={11}
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
          <PhotoFigure
            figure={12}
            layout="single"
            caption="Overseas ethnographic work involving interdisciplinary research and exchange."
            photos={[
              {
                number: 22,
                alt: "Participants at an overseas ethnography workshop.",
              },
            ]}
          />

          <h3>Synthetic Biology through the Philosophy of Technology</h3>
          <p>
            One strand of synthetic biology makes biology easier to design and
            build by standardizing parts, modularizing functions, and
            abstracting away detail. Drew Endy set out this engineering program
            in{" "}
            <a
              href="https://www.nature.com/articles/nature04342"
              target="_blank"
              rel="noreferrer"
            >
              &ldquo;Foundations for engineering biology&rdquo;
            </a>{" "}
            (<em>Nature</em>, 2005). It is a powerful research strategy, and it
            also raises a philosophical question: when we describe life as a
            system of functional modules, what does that description explain,
            and what relationships does it leave out?
          </p>
          <p>
            We found it useful to treat &ldquo;life as a machine&rdquo; as a
            model with a domain of validity rather than a complete account.
            Synthetic biology is not a single intellectual position; its
            research programs disagree about these questions, and the field
            should not be reduced to one mechanical view.
          </p>
          <p>
            Building a system is also a way of testing an explanation. Design,
            assembly, and measurement let researchers ask whether their
            understanding of a mechanism is sufficient to reproduce its
            function. That success still leaves an epistemological question
            open: if an engineered system performs a task, have we understood
            how the natural system performs it? Holding the question open,
            rather than answering it too quickly, became part of how we present
            the field to others.
          </p>

          <h3>How These Discussions Changed Us</h3>
          <p>
            First, we began to ask about both technical feasibility and the
            relationships surrounding use. Once a material enters the body, its
            performance is inseparable from questions about understanding risk
            and making choices.
          </p>
          <p>
            Second, we paid closer attention to{" "}
            <strong>&ldquo;How have they understood us?&rdquo;</strong>{" "}
            alongside <strong>&ldquo;Have we explained it?&rdquo;</strong>{" "}
            Questions, clarification, and response are needed to bridge the
            distance between transmitting information and reaching
            understanding.
          </p>
          <p>
            Finally, we want ethical discussion to begin with design. For a
            student project, this means considering people&rsquo;s rights and
            circumstances while proposing a solution, and being open about
            questions we have not yet answered.
          </p>
          <p>
            These insights offered ways of thinking for IHP and learning within
            the team. Specific records are still needed to show which project
            decisions actually changed; reflective writing alone cannot provide
            that evidence.
          </p>
          <p>
            Related materials have been included in our platform&rsquo;s
            resource organization and sharing work. Their value for others lies
            especially in the questions and methods they offer: helping future
            teams begin listening, examining assumptions, and reflecting early
            in their research.
          </p>

          <h2>Closing Reflection</h2>
          <div className="education-video-note">
            <strong>
              Video | ZJU-China: education summary (2026) [English]
            </strong>
            <p>
              A review of this season&rsquo;s educational practice, connecting
              activities for different ages, shared resources, and reflection
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
          <p>
            We brought knowledge into the community and integrated the
            community&rsquo;s questions back into our research. Through these
            journeys in both directions, the meaning of education became
            clearer: helping more people understand science, and helping those
            who do science understand others with greater care.
          </p>
          <h3>What We Would Do Differently</h3>
          <p>
            Two limitations belong in this account. We approached organizers of
            synthetic biology exhibitions and study-abroad agencies for
            sponsorship, and both declined. We also missed the timeline for
            joining the iGEM community&rsquo;s educational initiatives this
            season. Neither setback undoes what the activities achieved, but
            both point to work we would begin earlier next time: fundraising
            before the activity calendar fills, and entering community programs
            at the moment they open rather than after our own events are
            complete.
          </p>
          <p>
            Next year we hope to strengthen the team&rsquo;s fundraising
            capacity, to take part in Education 101, and to invite more teams
            outside China to contribute to the platform. The resources gathered
            here are only the beginning of that work.
          </p>

          <h2>Mini game: inject the cartilage</h2>
          <p>
            Fly the NEST bird between healthy bones and complete the injection
            &mdash; a playful take on our cartilage-repair idea. Passing each
            bone pair advances the syringe; fill the injection to win.
          </p>
          <FlappyInjection />

        </article>
      </div>
    </div>
  );
}
