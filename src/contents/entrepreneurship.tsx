import { useId, useState, type ReactNode } from "react";
import "./entrepreneurship.css";

/**
 * Expandable card ("extend box"): a coloured header bar that expands the text
 * box below when clicked. Replace the titles / placeholder paragraphs of each
 * card in `Entrepreneurship` with the final content, and add or remove cards
 * as needed.
 */
function ExtendCard({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const contentId = useId();
  return (
    <div className={`entre-card${open ? " entre-card--open" : ""}`}>
      <button
        type="button"
        className="entre-card-header"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="entre-card-title">{title}</span>
        <span className="entre-card-chevron" aria-hidden="true" />
      </button>
      <div className="entre-card-content" id={contentId}>
        <div className="entre-card-content-inner">
          <div className="entre-card-pad">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Entrepreneurship() {
  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article>
          <h2 className="mb-4">Entrepreneurship</h2>
          <p>
            Placeholder text — introduce how the project is developed toward
            real-world application: the problem, the intended users, and the
            commercialization pathway. Replace with the final introduction.
          </p>

          {/* ============ Judging criteria ============ */}
          <h3 className="mt-5 mb-3">Judging criteria</h3>
          <p>
            Placeholder text — one sentence introducing this section. Each card
            expands when its header is clicked. Replace with the final content.
          </p>
          <ExtendCard title="Criterion 1 — customers and unmet needs (placeholder question)">
            <p>
              Placeholder text — answer this criterion here: which potential
              customers were discovered, which unmet needs they described, and
              how this shaped the solution. Replace with the final content.
            </p>
          </ExtendCard>
          <ExtendCard title="Criterion 2 — feasibility and scalability (placeholder question)">
            <p>
              Placeholder text — show how the solution is possible, scalable,
              and inventive, and describe the evidence that supports it. Replace
              with the final content.
            </p>
          </ExtendCard>
          <ExtendCard title="Criterion 3 — product development plan (placeholder question)">
            <p>
              Placeholder text — lay out realistic milestones, timelines, and
              resources for product development. Replace with the final content.
            </p>
          </ExtendCard>
          <ExtendCard title="Criterion 4 — team, skills, and stakeholders (placeholder question)">
            <p>
              Placeholder text — outline the skills, capabilities, and
              stakeholders required to develop the solution credibly. Replace
              with the final content.
            </p>
          </ExtendCard>
          <ExtendCard title="Criterion 5 — long-term impact (placeholder question)">
            <p>
              Placeholder text — discuss the positive and negative long-term
              impacts of the fully developed solution. Replace with the final
              content.
            </p>
          </ExtendCard>

          {/* ============ Business analysis ============ */}
          <h3 className="mt-5 mb-3">Business analysis</h3>
          <p>
            Placeholder text — one sentence introducing this section. Replace
            with the final content.
          </p>
          <ExtendCard title="Market analysis — placeholder">
            <p>
              Placeholder text — describe the market for the solution (for
              example the total, serviceable, and obtainable market) and the
              sources of the estimates. Replace with the final content.
            </p>
          </ExtendCard>
          <ExtendCard title="Competitors — placeholder">
            <p>
              Placeholder text — compare direct, indirect, and potential future
              competitors, and explain the advantage of the solution. Replace
              with the final content.
            </p>
          </ExtendCard>
          <ExtendCard title="Cost structure — placeholder">
            <p>
              Placeholder text — summarise the expected costs (investment,
              equipment, production, materials, labour, consumables, waste, and
              capital) and how they were estimated. Replace with the final
              content.
            </p>
          </ExtendCard>
        </article>
      </div>
    </div>
  );
}
