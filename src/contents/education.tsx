import "./education.css";

/** Static host for the Education figures. The exported `edu-*.avif`
 *  files are served from this folder. */
const EDUCATION_IMG =
  "https://static.igem.wiki/teams/6102/wiki/images/hp/education";
const EDU_REPORT_PDF =
  "https://static.igem.wiki/teams/6102/wiki/hp-new/res.pdf";

const eduImg = (file: string) => `${EDUCATION_IMG}/${file}.avif?v=20261021c`;

/* The uploaded filenames do not all match their contents. The mappings below
 * follow the deployed files and the image order in the Feishu source:
 * synedu-poster <-> synedu-mou-01 are swapped.
 * report-cover = image 13;
 * medical-lecture-02 = image 14; medical-lecture-03 = Lecture 11;
 * medical-lecture-04 = image 08.
 * public-01 = art05; public-02 = image 15; public-03 = promotional display;
 * public-04 = image 16; elderly-01 = visiting delegation. */

type EduImageProps = {
  file: string;
  alt: string;
  caption?: string;
  maxWidth?: string;
  className?: string;
};

function EduImage({ file, alt, caption, maxWidth, className }: EduImageProps) {
  return (
    <figure
      className={`edu-image${className ? ` ${className}` : ""}`}
      style={maxWidth ? { maxWidth, marginInline: "auto" } : undefined}
    >
      <a
        className="article-image-link"
        href={eduImg(file)}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open full-size image: ${alt}`}
        title="Open full-size image"
      >
        <img
          src={eduImg(file)}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
      </a>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function Education() {
  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article className="education-article">
          <blockquote className="education-quote">
            <p>
              &ldquo;Education is the most powerful weapon which you can use to
              change the world.&rdquo;
            </p>
            <footer>&mdash; Nelson Mandela</footer>
          </blockquote>
          <h2>Overview</h2>
          <p>
            Synthetic biology is moving beyond the laboratory, but public
            understanding, industry perspectives, and ethical awareness have not
            kept pace with its rapid development. In response, we established{" "}
            <strong>SynEdu Global</strong>, an educational platform dedicated to advancing both
            public-interest and industry-oriented education in synthetic
            biology.
          </p>
          <p>
            Through preliminary research and stakeholder interviews, we
            recognized the importance of early intervention in treating
            cartilage defects, the public&rsquo;s limited awareness of cartilage
            health, and several underlying problems within the medical
            community. We believe that the first two concerns can be addressed
            through a systematic educational program designed for people of
            different age groups, while the challenges within the medical system
            require a reflexive approach.
          </p>
          <p>
            We therefore organized a wide range of educational activities to
            raise public awareness of cartilage health, improve both the physical
            and social well-being of people with cartilage defects, and reduce
            public fear and misunderstanding of synthetic biology.
          </p>

          <h2>SynEduGlobal Education Platform</h2>
          <p>
            During our communication with other teams, we found that the
            difficulty in the popularization and promotion of synthetic biology
            education lies in the fact that the two parties with educational
            demands have not been connected. Almost every team we have
            communicated with has mentioned the difficulty in accessing
            educational activities and the lack of ideas for carrying out such
            activities, while every educational institution we have visited is
            in urgent need of our involvement. Accordingly, we have launched a
            synthetic biology education platform, which aims to connect and
            facilitate exchanges between more iGEM teams and educational
            institutions and public welfare organizations that need science
            popularization in synthetic biology. Anyone can download the
            materials on the webpage freely, and each member can also upload
            educational activity materials with ease, inspire each other in the
            discussion area, and achieve mutual benefit. We have also cooperated
            with the School of Food Science and Technology of Jiangnan
            University to add an industrialization education module. This has
            not only prospered the iGEM community, but also promoted the
            learning and popularization of synthetic biology across the society.
          </p>
          <div className="edu-synedu-layout">
            <div className="edu-synedu-copy">
              <p>
                As the initiator, ZJU-China, together with Westlake,
                XJTLU-China and Jiangnan-China, has built{" "}
                <strong>SynEduGlobal</strong> (
                <a
                  href="https://syneduglobal.top"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://syneduglobal.top
                </a>
                ). We have invited educational institutions to settle in and
                release recruitment information for educational programs, and
                invited 37 domestic universities to participate in the sharing
                of our educational activity cases. During the jamboree, we will
                continue to promote this website to strive for attracting teams
                worldwide to settle in.
              </p>
              <p>
                We are fully aware that a website requires continuous operation
                to gradually build up its user base and achieve long-lasting
                influence. To this end, the four of our schools have signed a
                5-year cooperation agreement and formulated a future development
                plan to ensure the sustained operation of the website.
              </p>
              <EduImage
                file="synedu-poster"
                alt="First page of the five-year cooperation agreement among the four founding schools."
              />
              <EduImage
                file="synedu-mou-02"
                alt="Signature page of the five-year cooperation agreement."
              />
            </div>
            <div className="edu-synedu-media">
              <EduImage
                file="synedu-mou-01"
                alt="SynEduGlobal project poster."
              />
              <EduImage
                file="synedu-home"
                caption="synedu1"
                alt="SynEduGlobal education platform homepage."
              />
              <EduImage
                file="synedu-activities"
                caption="synedu2"
                alt="SynEduGlobal education activity materials page."
              />
            </div>
          </div>

          <h2>Education covering all age groups</h2>
          <p>
            Our public science popularization activities follow{" "}
            <strong>
              a complete coverage pathway designed in progress with the age of
              the target audience
            </strong>
            : starting from preschoolers aged 3&ndash;6, to children
            aged 6&ndash;12, to high school students facing specialized academic
            decisions, and extending to science popularization content for the
            general public. We have redesigned the content depth, interactive
            formats and evaluation methods for each tier.
          </p>
          <p>
            All materials for the following activities (including PPTs, posters,
            handouts and activity guidelines) have been made publicly available
            at{" "}
            <a href="https://syneduglobal.top" target="_blank" rel="noreferrer">
              https://syneduglobal.top
            </a>
            .
          </p>

          <h3>
            1. For children aged 3&ndash;6: Biological Game Interaction in
            Qigudeng Community
          </h3>
          <p>
            We have established long-term cooperation with{" "}
            <strong>Qigudeng Community, Gongshu District, Hangzhou</strong> to
            launch programs integrating{" "}
            <strong>
              biological game interactions and cartilage health knowledge sharing
            </strong>{" "}
            for children aged 3 to 6.
          </p>
          <p>The entire event is designed as a game:</p>
          <ul>
            <li>
              Activities resembling bracelet weaving introduced early ideas
              about &ldquo;cell factories&rdquo; and inheritance.
            </li>
            <li>
              Integrate cartilage health knowledge into physical games (such as
              imitating joint movements and simulating changes in cartilage
              during exercise).
            </li>
          </ul>
          <div className="edu-image-grid edu-image-grid--3">
            <EduImage
              file="qigudeng-01"
              caption="06"
              alt="Children taking part in a table-top biology game at Qigudeng Community."
            />
            <EduImage
              file="qigudeng-02"
              caption="07"
              alt="A team member guiding a young child through a hands-on activity at Qigudeng Community."
            />
            <EduImage
              file="qigudeng-03"
              caption="09"
              alt="Children examining teaching aids during the Qigudeng Community session."
            />
          </div>
          <h4>Participant Feedback</h4>
          <p>
            Number of participating children: <strong>15</strong>. Before the
            activity, the children had no idea what bacteria, genetics and synthetic biology
            are; after the activity, about half of the kids could voluntarily
            mention 1 or 2 relevant pieces of information.
          </p>
          <p>
            &ldquo;I&rsquo;ve realized that there are both good and bad
            microbes!&rdquo;
          </p>
          <p>
            &ldquo;I know that DNA can turn into the cells in my body.&rdquo;
          </p>
          <p>
            However, we had to reflect on the fact that a large number of young
            children really struggled to understand the content we were
            explaining, so in the actual activity, we adjusted our explanation
            plan, further reduced the proportion of professional knowledge, and
            focused mainly on hands-on crafts.
          </p>

          <h3>
            2. For children aged 6&ndash;12: Public Welfare Science
            Popularization of Wenlan Academy
          </h3>
          <p>
            We established a long-term partnership with Wenlan Academy, held
            public-interest science activities, and helped it become{" "}
            <strong>
              the first educational institution to settle in syneduglobal.top
            </strong>
            . As the settled party, the Academy proposed to provide all iGEM
            project teams within China with support covering{" "}
            <strong>travel expense reimbursement plus one-night accommodation</strong>
            .
          </p>
          <p>
            We have developed public welfare popular science lecture content for
            children aged 6&ndash;12 at Wenlan Academy, which provides more
            systematic explanations of synthetic biology knowledge, and offers
            scientific knowledge related to cartilage health and bone growth for
            children in the developmental stage.
          </p>
          <div className="edu-image-grid edu-image-grid--2">
            <EduImage
              file="wenlan-01"
              caption="04"
              alt="A team member presenting a science activity at Wenlan Academy."
            />
            <EduImage
              file="wenlan-02"
              caption="05"
              alt="Group photograph of children and team members at Wenlan Academy."
            />
          </div>
          <h4>Participant Feedback</h4>
          <p>
            Before the course started, we asked if anyone knew what synthetic
            biology was, and no one raised their hand. When we asked what the
            function of cartilage was, all the answers were vague. After the
            course, when we asked what they had learned about synthetic biology,
            almost every child could name one or two key words. When it came to
            scenarios in daily life where people need to pay attention to
            cartilage health, every child could list at least one example.
          </p>

          <h3>
            3. For high school students: Synthetic biology promotion and subject
            selection sharing
          </h3>
          <p>
            We provided 140 high school students with systematic presentations on
            synthetic biology, project introductions, and cartilage health
            promotion, as well as advice on healthy exercise, and answered
            questions about university subject selection during the Q&amp;A
            session.
          </p>
          <div className="edu-image-grid edu-image-grid--2">
            <EduImage
              file="high-school-01"
              caption="02"
              alt="Team members distributing leaflets during a high-school presentation."
            />
            <EduImage
              file="high-school-02"
              caption="03"
              alt="Group photograph of high-school students and the team after the presentation."
            />
          </div>
          <h3>4. Artistic Practice</h3>
          <p>
            Inspired by <em>The Larva of Time</em>, we collaborated with artist
            Chen Xi to present two interactive public art works. These movement
            trajectories can deepen people&rsquo;s understanding of rehabilitation
            exercises and engineered bacteria, call for attention to cartilage
            health and synthetic biology, and have been invited to participate
            in the &ldquo;Technology + Art&rdquo; exhibition hosted by the Future
            Learning Center.
          </p>
          <h4>
            Trajectory Tracking of Knee Joint Rehabilitation Movements
          </h4>
          <div className="edu-art-text-split">
            <div>
              <p>
                We had the motion performer wear sensors and imitate knee
                rehabilitation movements on the spot, including squats, split
                squats, standing knee flexion, and double leg floor exercises.
                We captured multiple motion trajectories by repeating these
                movements, then conducted artistic processing based on the
                artistic creation concepts and visual style provided by Teacher
                Chen Xi, and finally obtained the following 4 visual design
                images that record the performer&rsquo;s rehabilitation motion
                trajectories.
              </p>
              <p>
                Through the repetition and designed presentation of trajectories,
                we aim to convey that the rehabilitation exercises of all
                patients with cartilage defects embody inherent beauty and
                strength, and we hope that the blue hue of life and the warmth
                it carries can also foster public understanding of the hidden
                distress experienced by people with cartilage defects.
              </p>
            </div>
            <EduImage
              file="art-trajectory-01"
              caption="Action Illustration"
              alt="Action illustration from the rehabilitation trajectory project."
            />
          </div>

          <h4 className="edu-heading-small">Gallery</h4>
          <div className="edu-image-grid edu-image-grid--2">
            <EduImage
              file="art-trajectory-02"
              caption="art01"
              alt="Rehabilitation trajectory artwork art01."
            />
            <EduImage
              file="art-trajectory-03"
              caption="art02"
              alt="Rehabilitation trajectory artwork art02."
            />
            <EduImage
              file="art-trajectory-04"
              caption="art03"
              alt="Rehabilitation trajectory artwork art03."
            />
            <EduImage
              file="art-trajectory-05"
              caption="art04"
              alt="Rehabilitation trajectory artwork art04."
            />
          </div>

          <h4>
            Eye-tracking Trajectory Drawing Engineered Bacteria
          </h4>
          <p>
            We aim to present these trajectories to engage the public in
            synthetic biology through an artistic form, deepen people&rsquo;s
            impression of engineered bacteria, and help them appreciate the
            scientific beauty of synthetic biology.
          </p>
          <EduImage
            file="public-01"
            caption="art05｜A visual trajectory drawing of a high school student participating in the interaction"
            className="edu-image--half"
            alt="A green and purple visual trajectory drawing produced through eye-tracking."
          />

          <h3>5. For the Public</h3>
          <p>
            The ZJU-CHINA team has successfully settled in the Future Learning
            Center of Zhejiang University, and participated in the reception of
            over 300 person-times of domestic and foreign experts from all walks
            of life, including the World Digital Education Conference, the
            Serbia delegation, the government official delegation of the West
            Asian Ministry of Education, the media delegation of 12 countries,
            and the Shaanxi Provincial Education Expert Delegation. Many of the
            visitors heard about synthetic biology for the first time, and our
            introduction aroused their extensive interest in synthetic biology.
          </p>
          <div className="edu-image-grid edu-image-grid--2">
            <EduImage
              file="public-02"
              caption="15"
              alt="Team member presenting educational materials to visiting experts at the Future Learning Center."
            />
            <EduImage
              file="public-04"
              caption="16"
              alt="Visitors examining educational materials at the Future Learning Center."
            />
            <EduImage
              file="public-03"
              caption="Promotional Page Display"
              alt="Promotional materials on display at the Future Learning Center."
            />
            <EduImage
              file="elderly-01"
              caption="One of the visiting delegations"
              alt="A visiting delegation touring the Future Learning Center."
            />
          </div>
          <h3>6. Cartilage Health Promotion for the Elderly</h3>
          <p>
            We conducted an investigation and field research in Yantan Village,
            and carried out publicity on basic rehabilitation exercises as well as
            education to dispel false propaganda about health supplements.
          </p>
          <EduImage
            file="report-cover"
            caption="13"
            alt="An older adult walking on a stone path in Yantan Village during field research."
          />
          <h3>7. Proposal to the Health Commission</h3>
          <p>
            We have conducted a research report on the current status of hyaline
            cartilage injuries, compiled our extensive educational practices into
            reusable community-level education and promotion experience,
            submitted it to the Hangzhou Municipal Health Commission, and received
            a reply from the government.
          </p>
          <div className="edu-pdf">
            <div className="edu-pdf__head">
              <strong>
                Research report: Articular Cartilage Injury — Current Status,
                Problems and Countermeasures
              </strong>
              <a
                href={EDU_REPORT_PDF}
                target="_blank"
                rel="noreferrer"
              >
                Open in a new tab
              </a>
            </div>
            <iframe
              className="edu-pdf__frame"
              src={EDU_REPORT_PDF}
              title="Research report: Articular Cartilage Injury — Current Status, Problems and Countermeasures"
              loading="lazy"
            />
          </div>
          <h2>Reflectivity from a Humanities Perspective</h2>
          <p>
            All the educational activities mentioned earlier are addressing the
            question of &ldquo;how to pass on knowledge&rdquo;. Yet the real
            problem that plagues us arises after the transmission process:{" "}
            <strong>what exactly should we teach?</strong>
          </p>
          <p>
            In our interactions with the public and peers, we have been repeatedly
            pressed with questions that no existing answers can address: Where do
            the boundaries of synthetic biology lie? Whose consent is necessary?
            When the potential benefits and possible harms of a technology fall
            on different groups of people, who should get to decide whether to
            pursue it? When our work relies heavily on community members making
            voluntary decisions after understanding the risks, is that
            &ldquo;voluntariness&rdquo; itself truly genuine?
          </p>
          <p>
            <strong>
              We have decided to address these issues as educational subjects
              rather than leaving them as unfinished loose ends.
            </strong>
          </p>
          <p>
            This is also the biggest difference between this section and
            conventional popular science: our educational targets are not only
            the general public, but also the synthetic biology industry itself.
          </p>

          <h3>Reflections on Medical Anthropology</h3>
          <h4>
            Overseas Ethnography Workshop: Chiang Mai Exchange and Study Program
          </h4>
          <p>
            Drawing on our stakeholder interviews and data analysis, we presented
            our findings at the conference.
          </p>
          <p>
            <strong>
              &ldquo;Pain Beyond the Diagnostic Threshold: The Medical
              Invisibility of Early Joint Symptoms&rdquo;
            </strong>
          </p>
          <p>
            This paper begins with a discrepancy identified during our background
            research on cartilage damage: symptoms were frequently reported, yet
            rarely documented in formal medical records. Combining this
            observation with insights from our discussions with hospital
            stakeholders, the paper examines how genuine experiences of pain can
            be underestimated during clinical diagnosis and documentation.
          </p>
          <p>
            Drawing on Arthur Kleinman&rsquo;s distinction between disease and
            illness, as well as Havi Carel and Ian James Kidd&rsquo;s framework
            of epistemic injustice, the paper explores how patients&rsquo;
            accounts of pain, restricted mobility, and disruptions to everyday
            life are translated into clinically recognizable information &mdash;
            and which experiences may be lost in that process.
          </p>
          <p>
            The paper argues that patients&rsquo; care needs can still be
            recognized and addressed even when a definitive diagnosis has not yet
            been established. Understanding this issue requires simultaneous
            consideration of uncertainty in identifying pathology, the
            circumstances that shape how patients describe their experiences, and
            the organizational structure of healthcare delivery.
          </p>
          <p>
            The paper&rsquo;s primary contribution is to shift attention beyond
            the number of confirmed diagnoses toward the burden of symptoms that
            remains inadequately documented. It also proposes incorporating
            patient-reported pain, its impact on everyday life, and the need for
            follow-up care into clinical assessment.
          </p>
          <EduImage
            file="medical-lecture-02"
            caption="14"
            alt="Group photograph of participants in the overseas ethnography workshop in Chiang Mai."
          />

          <h4>
            Anthropological Perspectives on Medical Power Sharing for Medical
            Students
          </h4>
          <p>
            After sharing our research findings with the Institute of Social
            Medicine and Health Management at Zhejiang University, we organized a
            medical anthropology lecture for medical students on campus. Through
            research presentations and roundtable discussions, we encouraged
            future physicians to become more attentive to patients&rsquo; lived
            experiences. We sought to help them understand that illness is not
            merely a form of physiological harm; it is often shaped by social
            conditions and compounded by structural violence embedded in systems
            of power.
          </p>
          <p>
            We also emphasized that patients&rsquo; care needs can&mdash;and
            should&mdash;still be recognized and addressed when diagnostic
            criteria remain ambiguous. By critically reflecting on the deeper
            structures of healthcare, we hope to address patients&rsquo; needs in
            a more fundamental and meaningful way.
          </p>
          <EduImage
            file="medical-lecture-03"
            caption="Lecture 11"
            maxWidth="512px"
            alt="Medical anthropology lecture for medical students."
          />

          <h3>
            Discussion on Synthetic Biology from the Perspective of Philosophy of
            Science and Technology
          </h3>
          <EduImage
            file="medical-lecture-04"
            caption="08"
            alt="Chen Bohang speaking during the discussion on synthetic biology and the philosophy of science and technology."
          />

          <p>
            We held a discussion with Chen Bohang, a doctoral supervisor at the
            Institute for Science, Technology and Society of Zhejiang
            University. The following is a summary of the discussion.
          </p>
          <p>
            One important approach to synthetic biology is to make biological
            systems easier to design and construct through standardization,
            modularization, and abstraction. In &ldquo;Foundations for Engineering
            Biology&rdquo; (Endy, 2005, <em>Nature</em>), Drew Endy systematically
            sets out this engineering-oriented approach. While it provides an
            effective methodology for research, it also raises a philosophical
            question: What phenomena can be explained by understanding life as a
            system composed of functional modules, and what relationships might
            such an understanding overlook?
          </p>
          <p>
            In this regard, the idea of &ldquo;life as a machine&rdquo; can be
            treated as a model whose scope of applicability needs to be examined.
            It is important to recognize that different research programs within
            synthetic biology understand these issues differently; the field as a
            whole should not be characterized as adhering to a single mechanistic
            position.
          </p>
          <p>
            Synthetic biology has made &ldquo;building systems&rdquo; a way of
            studying life: through design, assembly, and testing, researchers
            evaluate their explanations of biological mechanisms. This closely
            connects scientific knowledge with technological practice while also
            raising a new epistemological question: If an artificial system can
            perform a particular function, is that sufficient to demonstrate that
            we fully understand all the mechanisms through which the natural
            system performs that function?
          </p>

          <h2>Summary and Reflection:</h2>
          <h3>Summary</h3>
          <div className="education-video-frame">
            <iframe
              title="ZJU-China: Education summary (2026) [English]"
              src="https://video.igem.org/videos/embed/rv8h4bZFFbLsKBnVbxyv5i"
              allow="fullscreen"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              loading="lazy"
            />
          </div>
          <h3>Reflection</h3>
          <p>
            We have attempted to secure sponsors for our project, reaching out to
            synthetic biology exhibition organizers and study-abroad agencies,
            but received rejections from both. We hope next year&rsquo;s
            committee can expand its influence and achieve successful sponsorship
            recruitment.
          </p>
          <p>
            This year, we missed the timeline to connect with educational
            initiatives within the iGEM Community. We aim to make a greater
            impact in the iGEM Community next year, and we are particularly
            interested in the Education 101 program.
          </p>
        </article>
      </div>
    </div>
  );
}
