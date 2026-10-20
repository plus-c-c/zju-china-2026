import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./collaboration.css";

/** Figures live on the team static host; see the upload folder notes. */
const COLLAB_IMG =
  "https://static.igem.wiki/teams/6102/wiki/images/collaboration";

type CollabPhoto = {
  name: string;
  alt: string;
  width: number;
  height: number;
};

const collabImg = (name: string) => `${COLLAB_IMG}/${name}`;

const IRAQ_MEETING: CollabPhoto = {
  name: "fig-1-1-1-iraq-online-meeting.jpg",
  alt: "Online meeting between our team and the Al-Nahrain University iGEM team, with several participants and presentation slides on screen.",
  width: 2265,
  height: 1280,
};

const AL_NAHRAIN_LETTER: CollabPhoto = {
  name: "fig-1-1-2-al-nahrain-letter.jpg",
  alt: "Message from the Al-Nahrain University team thanking us for supporting Iraq's first iGEM team.",
  width: 1458,
  height: 1076,
};

const WESTLAKE_EXCHANGE: CollabPhoto = {
  name: "fig-1-2-1-westlake-exchange.jpg",
  alt: "Group photograph from our in-person exchange with Westlake University iGEM team members and advisers.",
  width: 1933,
  height: 1280,
};

const HKU_EXCHANGE: CollabPhoto = {
  name: "fig-1-3-1-hku-exchange.jpg",
  alt: "Group photograph from our exchange with the University of Hong Kong iGEM team.",
  width: 1280,
  height: 959,
};

const USTC_EXCHANGE: CollabPhoto = {
  name: "fig-1-4-1-ustc-hardware-discussion.jpg",
  alt: "Our discussion with the University of Science and Technology of China team in front of a presentation screen.",
  width: 1706,
  height: 1279,
};

const JILIN_EXCHANGE: CollabPhoto = {
  name: "fig-1-5-1-jilin-exchange.jpg",
  alt: "Meeting room used for our exchange with the Jilin University team, with participants seated around a large table.",
  width: 1280,
  height: 959,
};

const SMART_MIRROR: CollabPhoto = {
  name: "fig-1-6-1-smart-mirror.jpg",
  alt: "Smart mirror prototype displaying joint-angle, heart-rate and exercise-guidance data during a rehabilitation session.",
  width: 722,
  height: 1280,
};

const SHENZHEN_TEAM: CollabPhoto = {
  name: "fig-2-1-1-1-shenzhen-team.jpg",
  alt: "Team photograph in front of the SynBio Challenges 2026 backdrop at the Shenzhen Synthetic Biology Innovation Competition.",
  width: 1923,
  height: 1280,
};

const SHENZHEN_PRESENTATION_1: CollabPhoto = {
  name: "fig-2-1-1-2-shenzhen-presentation-1.jpg",
  alt: "Team member presenting the SnoopLigase-ZJU project on stage at the Shenzhen Synthetic Biology Innovation Competition.",
  width: 1706,
  height: 1279,
};

const SHENZHEN_PRESENTATION_2: CollabPhoto = {
  name: "fig-2-1-1-3-shenzhen-presentation-2.jpg",
  alt: "Team member presenting modelling results on stage at the Shenzhen Synthetic Biology Innovation Competition.",
  width: 1706,
  height: 1279,
};

const EAST_CHINA_MEETUP_1: CollabPhoto = {
  name: "fig-2-1-2-1-east-china-meetup-1.jpg",
  alt: "Participating teams gathered in front of an East China iGEM Meetup banner.",
  width: 1932,
  height: 1279,
};

const EAST_CHINA_MEETUP_2: CollabPhoto = {
  name: "fig-2-1-2-2-east-china-meetup-2.jpg",
  alt: "Participants seated in the auditorium during the East China iGEM Meetup.",
  width: 1280,
  height: 682,
};

function CollabFigure({
  photos,
  caption,
}: {
  photos: CollabPhoto[];
  caption: ReactNode;
}) {
  return (
    <figure
      className={`figure collab-figure d-block my-4 text-center${
        photos.length > 1 ? " collab-figure--pair" : ""
      }`}
    >
      <div
        className={
          photos.length > 1 ? "collab-figure__pair" : "collab-figure__single"
        }
      >
        {photos.map((photo) => (
          <a
            key={photo.name}
            className="article-image-link"
            href={collabImg(photo.name)}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={collabImg(photo.name)}
              alt={photo.alt}
              className="figure-img img-fluid rounded"
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
            />
          </a>
        ))}
      </div>
      <figcaption className="figure-caption">{caption}</figcaption>
    </figure>
  );
}

export function Collaboration() {
  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article className="collaboration-article">
          <p className="collaboration-subtitle">
            Grow through Shared Experience
          </p>
          <blockquote className="collaboration-quote">
            <p>
              &ldquo;Alone we can do so little; together we can do so
              much.&rdquo;
            </p>
            <footer>
              &mdash; Helen Keller, quoted by the American Foundation for the
              Blind
            </footer>
          </blockquote>

          <h2 id="overview">Overview</h2>
          <p>
            A team can carry out experiments, but no team can hold all the
            experience needed to understand a problem. Beyond the laboratory,
            perspectives from new teams, educational partners, academic peers,
            rehabilitation professionals, and industry judges continually
            reshaped our understanding of the work&rsquo;s meaning and limits.
          </p>
          <p>
            We have organized this season&rsquo;s collaborations in two areas:
            collaboration between teams from home and abroad, and our
            participation in a range of activities.
          </p>

          <h2 id="collaboration-and-communication">
            1 Collaboration and Communication
          </h2>

          <h3 id="iraq-team">1.1 Helping to build the first team in Iraq</h3>
          <p>
            Joining iGEM for the first time involves much more than choosing a
            research topic. Registration, responsibilities, resources, and
            presenting results all require attention. For teams still building
            experience, each can become a difficult threshold to cross alone.
          </p>
          <p>
            For two years, we have stayed in contact with the Al-Nahrain
            University team in Iraq, sharing our experience of participating in
            iGEM. We hope to support our partners as they develop the ability to
            advance their project independently, while keeping knowledge in
            circulation within the community.
          </p>
          <p>
            Our exchanges covered iGEM projects and judging requirements, team
            roles and preparation, Wiki writing and presentations, and the
            balance of needs, resources, and feasibility when selecting a topic.
          </p>
          <p>
            This year, we held five online meetings to discuss and advance topic
            selection. We also discussed participation procedures and possible
            arrangements in response to the team&rsquo;s inability to travel to
            Paris.
          </p>
          <CollabFigure
            photos={[IRAQ_MEETING]}
            caption="Figure 1.1.1 | An online meeting with our Iraqi partners about team formation and competition preparation."
          />
          <p>
            Our partners gained reference materials and experience for team
            formation, topic selection, and competition preparation, along with
            an ongoing channel for communication. For us, deeper understanding
            developed through the process of explaining.
          </p>
          <p>
            We have agreed on a long-term partnership to carry on this
            meaningful communication.
          </p>
          <CollabFigure
            photos={[AL_NAHRAIN_LETTER]}
            caption="Figure 1.1.2 | A letter of thanks from the Al-Nahrain University team for the support along the way."
          />

          <h3 id="westlake">1.2 Exchange with Westlake University</h3>
          <p>
            We had a gathering with the Westlake University iGEM team to
            introduce our project to faculty and students and answer questions
            from the advisers. The exchange brought an outside perspective to
            our technical approach and project logic, while introducing our
            thinking on cartilage repair to our hosts.
          </p>
          <p>
            The exchange prompted reflection on our project narrative.
            Suggestions from the two advisers during the early stage of our
            project development were especially useful. See our{" "}
            <Link to="/human-practices#ihp-stakeholders-map">
              stakeholder maps
            </Link>{" "}
            for details.
          </p>
          <CollabFigure
            photos={[WESTLAKE_EXCHANGE]}
            caption="Figure 1.2.1 | Our in-person exchange with Westlake University faculty and students."
          />

          <h3 id="hku">1.3 Exchange with the University of Hong Kong</h3>
          <p>
            We introduced our projects to one another and discussed details of
            plasmid construction with the University of Hong Kong team.
            Comparing approaches gave both teams an opportunity to examine their
            procedures and understand technical differences.
          </p>
          <p>
            Another source of inspiration was their community outreach poster.
            It drew our attention to how the organization of information shapes
            a reader&rsquo;s first encounter with a project and their ability to
            find what they need. We therefore reconsidered how we present our
            educational platform and Wiki, paying closer attention to the
            connections between resource entry points, instructions, and access
            to materials.
          </p>
          <CollabFigure
            photos={[HKU_EXCHANGE]}
            caption="Figure 1.3.1 | Our exchange with the University of Hong Kong team."
          />

          <h3 id="ustc">
            1.4 Exchange with the University of Science and Technology of China
          </h3>
          <p>
            We discussed our project&rsquo;s hardware design with the University
            of Science and Technology of China team. By comparing implementation
            approaches, we hoped to identify ideas worth learning from and
            aspects that needed further examination.
          </p>
          <CollabFigure
            photos={[USTC_EXCHANGE]}
            caption="Figure 1.4.1 | Discussion of hardware approaches with the University of Science and Technology of China team."
          />

          <h3 id="jilin">1.5 Exchange with Jilin University</h3>
          <p>
            We exchanged ideas with the Jilin University team. Both teams
            introduced their projects and shared experience concerning
            leadership transitions, elections, and participation in Paris. This
            discussion focused mainly on team management and community matters,
            offering both teams a reference for understanding different
            approaches to organization.
          </p>
          <CollabFigure
            photos={[JILIN_EXCHANGE]}
            caption="Figure 1.5.1 | An online exchange with the Jilin University team."
          />

          <h3 id="biomedical-engineering">
            1.6 Collaboration with the School of Biomedical Engineering
          </h3>
          <p>
            How to support rehabilitation after cartilage repair is another
            concern of our project. With this need in mind, we approached Prof.
            Zhou Hong and Lin Lei&rsquo;s team at the School of Biomedical
            Engineering to explore how movement monitoring could be combined
            with exercise guidance. Our team contributed access to guidance from
            rehabilitation physicians, seeking to connect rehabilitation needs
            with engineering design.
          </p>
          <CollabFigure
            photos={[SMART_MIRROR]}
            caption="Figure 1.6.1 | A smart mirror exploring movement monitoring and rehabilitation guidance."
          />
          <p>
            This collaboration extended our attention from repair materials to
            rehabilitation support. Bringing technology into everyday use
            requires continued discussion between medicine and engineering.
          </p>

          <h2 id="activities">2 Participating in Various Activities</h2>
          <h3 id="synthetic-biology">2.1 In the field of synthetic biology</h3>
          <h4 id="shenzhen-competition" data-toc="include" data-toc-depth="3">
            2.1.1 The Shenzhen Synthetic Biology Innovation Competition
          </h4>
          <p>
            We were invited to the Shenzhen Synthetic Biology Innovation
            Competition, where we presented our overall design and detailed
            enzyme engineering work related to the SnoopLigase-ZJU system in the
            general track and the industry track of the competition.
          </p>
          <p>
            Our project received a gold medal in the general track and was
            awarded the best project in the industry track. Our rational design
            of the SnoopLigase-ZJU system received positive feedback from
            industry judges.
          </p>
          <p>
            The award recognizes our competition presentation; technical
            performance and readiness for translation still need to be
            demonstrated through experimental and application evidence.
          </p>
          <CollabFigure
            photos={[SHENZHEN_TEAM]}
            caption="Figure 2.1.1.1 | A team photograph at the Shenzhen Synthetic Biology Innovation Competition."
          />
          <CollabFigure
            photos={[SHENZHEN_PRESENTATION_1, SHENZHEN_PRESENTATION_2]}
            caption="Figure 2.1.1.2, 2.1.1.3 | Project presentations in the Moutai corporate track (industry track) and the general track."
          />

          <h4 id="east-china-meetup" data-toc="include" data-toc-depth="3">
            2.1.2 The East China iGEM Meetup
          </h4>
          <p>
            At the East China iGEM Meetup, we introduced our project and
            educational platform and shared experience with other teams. Two
            advisers asked about our motivation, technical approach, and social
            relevance. We also interviewed two students experiencing
            difficulties related to cartilage damage.
          </p>
          <p>
            Questions from peers helped us examine ambiguities in our project
            narrative. The students&rsquo; experiences brought a problem
            previously framed through literature and metrics back into everyday
            life. We began to see more clearly how material performance and
            daily difficulties with movement need to be understood together.
          </p>
          <p>
            Other teams also learned about our hydrogel design and educational
            platform resources through the exchange.
          </p>
          <CollabFigure
            photos={[EAST_CHINA_MEETUP_1, EAST_CHINA_MEETUP_2]}
            caption="Figure 2.1.2.1, 2.1.2.2 | Participating teams at the East China iGEM Meetup."
          />

          <h3 id="context-of-use">
            2.2 Returning Technology to the Context of Use
          </h3>
          <p>
            The business plan for carrying NEST from the laboratory toward
            clinical use is set out on our{" "}
            <Link to="/entrepreneurship">Entrepreneurship page</Link>.
          </p>

          <h2 id="reflection">Reflection</h2>
          <p>
            Looking back, we have gained a lot through communication. Our
            partners helped us notice questions we might have overlooked on our
            own, which supported repeated cycles of improvement. We also believe
            that our active communication gives inspiration to others.
          </p>
          <p>
            We hope to carry both shared resources and these habits into the
            next season, allowing experiences from others to become part of the
            research itself.
          </p>
        </article>
      </div>
    </div>
  );
}
