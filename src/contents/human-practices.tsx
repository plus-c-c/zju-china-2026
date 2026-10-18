import {
  Timeline,
  type TimelineDetail,
  type TimelineItem,
} from "../components/Timeline";
import { StakeholderChain } from "../components/StakeholderChain";

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

const timelineItems: TimelineItem[] = [
  {
    date: "Month DD, 2026",
    title: "Activity title placeholder 1",
    image:
      "https://static.igem.wiki/teams/6102/wiki/images/engagement/ihp/ihp-01.avif",
    imageAlt: "Human practices activity 1",
    summary: placeholderSummary,
    details: placeholderDetails,
  },
  {
    date: "Month DD, 2026",
    title: "Activity title placeholder 2",
    image:
      "https://static.igem.wiki/teams/6102/wiki/images/engagement/ihp/ihp-02.avif",
    imageAlt: "Human practices activity 2",
    summary: placeholderSummary,
    details: placeholderDetails,
  },
  {
    date: "Month DD, 2026",
    title: "Activity title placeholder 3",
    image:
      "https://static.igem.wiki/teams/6102/wiki/images/engagement/ihp/ihp-03.avif",
    imageAlt: "Human practices activity 3",
    summary: placeholderSummary,
    details: placeholderDetails,
  },
  {
    date: "Month DD, 2026",
    title: "Activity title placeholder 4",
    image:
      "https://static.igem.wiki/teams/6102/wiki/images/engagement/ihp/ihp-04.avif",
    imageAlt: "Human practices activity 4",
    summary: placeholderSummary,
    details: placeholderDetails,
  },
  {
    date: "Month DD, 2026",
    title: "Activity title placeholder 5",
    image:
      "https://static.igem.wiki/teams/6102/wiki/images/engagement/ihp/ihp-05.avif",
    imageAlt: "Human practices activity 5",
    summary: placeholderSummary,
    details: placeholderDetails,
  },
  {
    date: "Month DD, 2026",
    title: "Activity title placeholder 6",
    image:
      "https://static.igem.wiki/teams/6102/wiki/images/engagement/ihp/ihp-06.avif",
    imageAlt: "Human practices activity 6",
    summary: placeholderSummary,
    details: placeholderDetails,
  },
];

export function HumanPractices() {
  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article>
          <h2 className="mb-4">Human Practices</h2>
          <p>
            Placeholder text — introduce how the project engaged with the world
            beyond the lab and why that engagement matters. Replace with the
            final introduction.
          </p>
          <h3 className="mt-5 mb-3">Map of stakeholders</h3>
          <p>
            Placeholder text — introduce the stakeholder map: the lifecycle
            stages of the solution, whom we engaged at each stage, and what we
            learned. Hover (or tap) a stage to see its content. Replace with the
            final content.
          </p>
          <StakeholderChain />
          <h3 className="mt-5 mb-3">Engagement timeline</h3>
          <p>
            Placeholder text — one sentence introducing the timeline. The
            entries below are placeholders to be replaced with the real
            activities.
          </p>
          <Timeline items={timelineItems} />
        </article>
      </div>
    </div>
  );
}
