import { Link } from "react-router-dom";
import { FlappyInjection } from "../components/FlappyInjection";
import { Inspirations, InspirationLink } from "../components/Inspirations";
import "./education.css";

/** Static host for the Education figures. Upload the exported `edu-*.avif`
 *  files to this folder. */
const EDUCATION_IMG =
  "https://static.igem.wiki/teams/6102/wiki/images/engagement/education/new";
const REPORT_PDF = "https://static.igem.wiki/teams/6102/wiki/hp-file/res.pdf";

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
  const links: InspirationLink[] = [
    { year: 2024, teamName: "CityU-HongKong", pageName: "education" },
    { year: 2024, teamName: "CJUH-JLU-China", pageName: "education" },
    { year: 2024, teamName: "Keystone", pageName: "education" },
    { year: 2024, teamName: "Stanford", pageName: "education" },
    { year: 2024, teamName: "GEMS-Taiwan", pageName: "education" },
    { year: 2024, teamName: "Heidelberg", pageName: "education" },
  ];

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
            learning moves both ways. We share knowledge, while allowing others&rsquo;
            experiences to reshape our questions. This season, our work brought
            together public science education, learning within the team, and
            reflection on the responsibilities of our field. An educational
            resource platform supports the preservation and sharing of these
            experiences.
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
            The first was the <strong>distance between scientific language and
            public understanding</strong>. Some participants approached synthetic
            biology through familiar terms such as &ldquo;gene editing&rdquo;
            and &ldquo;genetic modification,&rdquo; bringing concerns shaped by
            science fiction and everyday information without filter. These
            questions were not mistakes to be corrected, but places to begin a
            conversation. We needed to make room for people to ask, examine, and
            make sense of what they heard.
          </p>
          <p>
            The second was the <strong>distance between research metrics and
            lived experience</strong>. In some discussions with industry
            representatives and peers, attention centered on material performance
            and experimental results. Pain, mobility, and the demands of care
            reminded us that technical performance is only part of recovery. We
            began to ask ourselves: when we call a project &ldquo;successful,&rdquo;
            have we also listened to how patients describe their lives?
          </p>
          <p>
            The third concerned <strong>our field&rsquo;s responsibility to
            examine itself</strong>. As technology gains the capacity to
            intervene in living systems, we need to ask who bears the risks, who
            makes the choices, and whose voices have yet to enter the
            discussion. We made these questions part of our education work,
            recognizing that we, too, had much to learn.
          </p>

          <h2>Our Educational Framework</h2>
          <p>
            <strong>Table 1 |</strong> Educational framework: areas,
            participants, guiding questions, and main activities.
          </p>
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
                    and the wider public
                  </td>
                  <td>
                    How can we build on people&rsquo;s existing experiences to
                    make science understandable?
                  </td>
                  <td>
                    Community games, science activities at Wenlan Academy, high
                    school presentations, and a short film on cartilage damage
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
                    Fieldwork, industry research, and exchanges in the philosophy
                    of technology and medical anthropology
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

          <h3>1.1 Ages 3&ndash;6: Biology through Play at Qigudeng Community</h3>
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
            <strong>&ldquo;cell factories&rdquo; and inheritance</strong>. Visual
            teaching aids made microorganisms more tangible, while
            movement-based games connected joint motion with cartilage health.
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

          <h4 className="mt-4 mb-2">Learning from Children&rsquo;s Responses</h4>
          <p>
            Fifteen children participated in the activity. To suit their age, we
            gathered feedback through questions answered by a show of hands and
            observations recorded during the session. According to our activity
            records, each child could independently share one or two relevant
            pieces of information by the end.
          </p>
          <p>
            <strong>Ideas connected to bodily experience elicited more
            responses.</strong> When a question turned to what happens to a knee
            during running or jumping, abstract knowledge found a familiar
            doorway. We learned to begin educational design by asking, &ldquo;What
            have they experienced?&rdquo; before asking, &ldquo;What do we want
            to explain?&rdquo;
          </p>

          <h4 className="mt-4 mb-2">
            What Remains for the Community and Future Activities
          </h4>
          <p>
            Our community partnership provides a foundation for continuing
            science activities for young children. Conversations with parents and
            caregivers also reminded us to consider families&rsquo; needs for
            information about joint health. We have organized the game designs,
            teaching-aid plans, and observation records for future activities and
            for other teams to consult.
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
            within China to deliver educational activities. This support extended
            cooperation beyond sharing content to address the practical costs
            student teams face when organizing events.
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
            The activity reminded us that <strong>expertise is also reflected in
            the ability to explain complexity clearly</strong>. Its content and
            materials have been included in our platform resource collection,
            while the continuing partnership provides opportunities to repeat and
            improve the activities.
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
            &ldquo;Could I find a place in this field?&rdquo; Our school
            presentation combined an introduction to the discipline, our
            team&rsquo;s project, and members&rsquo; experiences of learning
            across subject boundaries. We wanted students to see both the
            research and the different paths that could lead to it.
          </p>
          <p>
            We paired a spoken presentation with leaflets to share the central
            ideas within the time available around schoolwork. One member&rsquo;s
            experience of entering biology competitions from a philosophy
            background offered a concrete example: a possibility to consider,
            with room for each student&rsquo;s circumstances and choices.
          </p>
          <PhotoFigure
            figure={3}
            layout="pair"
            caption="Our small-group high school presentation on campus, combining synthetic biology, our project, and learning pathways."
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
            understanding and interest before and after the session.
          </p>
          <p>
            Questions about learning pathways and whether the field suited them
            were prominent in the discussion. This reminded us that{" "}
            <strong>science education can help people understand their own
            choices</strong> as well as the presenter&rsquo;s work.
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
            audiences and reminded us to reach further toward patients, families,
            and caregivers. We produced a short educational film about cartilage
            damage, focusing on pain, difficulties with movement, and
            quality-of-life concerns that still deserve attention after surgery.
          </p>
          <p>
            Through movement, expression, and everyday scenes, we hoped to make
            these difficulties more tangible. <strong>Images cannot take the
            place of patients speaking for themselves, but they can create an
            opening for listening.</strong>
          </p>
          <p>
            During planning, we came to understand that people need information
            about technology and reassurance that their difficulties deserve to
            be taken seriously. Questions about pain, the course of recovery, and
            daily activities remain after an operation is complete. This
            recognition further shaped learning within our team.
          </p>
          <p>
            We plan to make the film available on the educational platform. The
            Education page focuses on its communication goals and content design;
            the IHP page can draw on interview records to explain how the needs
            it addresses informed our project thinking.
          </p>

          <h3>
            1.5 Exchanges with Education Experts from 12 Asian Countries:
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
            1.6 Exploring Cooperation with Serbian Education Representatives and
            Teams
          </h3>
          <p>
            During activities associated with the World Digital Education
            Conference, representatives of Serbia&rsquo;s education authorities
            expressed interest in exchanges on synthetic biology education and in
            promoting our educational website. We see this as a starting point
            for further communication. Contact remains at an early, exploratory
            stage, and no joint project has begun. Resource sharing and team
            exchanges are possible directions, with specific arrangements still
            to be agreed together.
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
            University planning content for the commercialization module. Our
            team takes responsibility for the overall architecture, functional
            design, and content integration.
          </p>
          <p>
            The platform addresses three needs: bringing usable materials
            together; helping educators find relevant experience by age group,
            topic, and activity format; and supporting continuity across seasons
            through sustained cooperation and resource maintenance.
          </p>
          <p>
            The platform is live and has begun collecting educational projects
            from multiple teams, including materials from our own activities. We
            also plan to survey educators about the difficulties they encounter
            in organizing activities, accessing resources, and reaching
            audiences.
          </p>
          <PhotoFigure
            figure={6}
            layout="single"
            caption="The syneduglobal.top educational platform. Our team designed the architecture and functions, with Westlake University, Xi’an Jiaotong-Liverpool University, and Jiangnan University contributing content. The live platform displays project collections and material download entry points."
            photos={[
              {
                number: 13,
                alt: "Poster introducing the syneduglobal.top educational resource platform.",
              },
            ]}
          />

          <h3>Resources Need Both Reuse and Care</h3>
          <p>
            Uploading resources prompted us to examine our own work. Could an
            educator unfamiliar with the activity understand the materials? Had
            we explained the intended age group, activity steps, and feedback
            methods? What would need to change for another classroom?
          </p>
          <p>
            We gradually began to ask <strong>&ldquo;What will this leave
            behind?&rdquo;</strong> when evaluating an educational activity.
            Attendance records the reach of one encounter; reusable resources
            allow that encounter to have a life beyond the room.
          </p>
          <p>
            To support continued operation, we have pursued a five-year
            cooperation arrangement with our partners. Existing materials include
            photographs of signing activities, while the agreement&rsquo;s
            effective status, participating parties, and maintenance
            responsibilities still require confirmation against the formal
            documents.
          </p>
          <PhotoFigure
            figure={7}
            layout="pair"
            caption="Signing of long-term cooperation documents. Agreement status and responsibilities remain subject to confirmation against the formal documents."
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
            We therefore propose that <strong>tissue repair does not
            automatically amount to full recovery</strong>.
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
              <strong>How can patients&rsquo; pain be heard and documented with
              care?</strong>{" "}
              With appropriate study design and professional guidance,
              patient-reported experiences should help us understand outcomes
              alongside objective measures.
            </li>
            <li>
              <strong>What specific abilities does recovery mean to
              patients?</strong>{" "}
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
            questions still requires participation from patients, clinicians, and
            rehabilitation professionals.
          </p>

          <h3>Learning through Interviews</h3>
          <p>
            Two students with experience of cartilage damage whom we met at the
            East China iGEM Meetup, along with parents and caregivers in
            community activities, gave us ways to understand everyday
            difficulties. Interviews with older adults also helped us explore how
            health concerns affect daily life and how participants understand
            their own situations.
          </p>
          <p>
            These experiences cannot represent every patient. They nevertheless
            remind us to avoid using a single measure to describe everyone&rsquo;s
            recovery. Further information on interview context, informed consent,
            and how needs fed back into the project appears on the IHP page.
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
            , and, according to our team records, submitted the findings and
            recommendations to the Hangzhou Municipal Health Commission. We hoped
            to bring the concerns we observed into a wider public discussion,
            recognizing that submitting recommendations is one step in an
            ongoing conversation.
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
            body, does the patient have sufficient opportunity to understand, ask
            questions, and make a choice?
          </p>
          <p>
            We included these questions in our educational work and turned to
            interdisciplinary exchanges to learn how to ask them better.
            Educators, too, need to learn; <strong>technical familiarity cannot
            stand in for understanding another person&rsquo;s
            circumstances</strong>.
          </p>

          <h3>Research and Exchanges</h3>
          <p>
            <strong>Table 2 |</strong> Research and exchange activities,
            approaches, and focus.
          </p>
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

          <h3>How These Discussions Changed Us</h3>
          <p>
            First, we began to ask about both technical feasibility and the
            relationships surrounding use. Once a material enters the body, its
            performance is inseparable from questions about understanding risk
            and making choices.
          </p>
          <p>
            Second, we paid closer attention to <strong>&ldquo;How have they
            understood us?&rdquo;</strong> alongside <strong>&ldquo;Have we
            explained it?&rdquo;</strong> Questions, clarification, and response
            are needed to bridge the distance between transmitting information
            and reaching understanding.
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
            teams begin listening, examining assumptions, and reflecting early in
            their research.
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
          </div>
          <p>
            We brought knowledge into the community and integrated the
            community&rsquo;s questions back into our research. Through these
            journeys in both directions, the meaning of education became clearer:
            helping more people understand science, and helping those who do
            science understand others with greater care.
          </p>

          <h2>Mini game: inject the cartilage</h2>
          <p>
            Fly the NEST bird between healthy bones and complete the injection
            &mdash; a playful take on our cartilage-repair idea. Passing each bone
            pair advances the syringe; fill the injection to win.
          </p>
          <FlappyInjection />

          <div className="mt-5">
            <Inspirations inspirationLinkList={links} />
          </div>
        </article>
      </div>
    </div>
  );
}
