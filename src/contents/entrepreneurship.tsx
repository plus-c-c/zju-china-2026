import { useId, useState, type ReactNode } from "react";
import "./entrepreneurship.css";

type CardLevel = "primary" | "secondary";

/** Expandable card; secondary cards can be nested inside a primary card. */
function ExtendCard({
  title,
  children,
  level = "primary",
}: {
  title: ReactNode;
  children: ReactNode;
  level?: CardLevel;
}) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <div
      className={`entre-card entre-card--${level}${open ? " entre-card--open" : ""}`}
    >
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

const Placeholder = ({ children }: { children?: ReactNode }) => (
  <p>
    {children ??
      "1"}
  </p>
);

export function Entrepreneurship() {
  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article className="entrepreneurship-article">
          <h2 id="judging-criteria">Judging criteria</h2>
          <p>
            For easy review, the five entrepreneurship criteria are collected in
            the expandable cards below.
          </p>

          <ExtendCard title="Has the team discovered their first potential customers and identified any unmet needs not yet covered by other existing solutions?">
            <Placeholder />
          </ExtendCard>
          <ExtendCard title="Has the team shown that their solution is possible, scalable and inventive?">
            <Placeholder />
          </ExtendCard>
          <ExtendCard title="Has the team presented logical product development plans with realistic milestones, timelines, resources and risks?">
            <Placeholder />
          </ExtendCard>
          <ExtendCard title="Has the team outlined the skills, capabilities, and stakeholders required to be credible in developing their solution further?">
            <Placeholder />
          </ExtendCard>
          <ExtendCard title="Has the team considered the positive and negative long-term impacts of their fully developed solution?">
            <Placeholder />
          </ExtendCard>

          <h2 id="background">Background</h2>
          <Placeholder />

          <h2 id="about-bcoated">About BCoated</h2>
          <Placeholder />

          <h2 id="market-size-analysis">Market size analysis</h2>
          <Placeholder>
            Introduce the total, available, and obtainable markets for the
            project.
          </Placeholder>
          <ExtendCard title="Total addressable market">
            <Placeholder />
          </ExtendCard>
          <ExtendCard title="Serviceable available market">
            <Placeholder />
          </ExtendCard>
          <ExtendCard title="Serviceable obtainable market">
            <Placeholder />
          </ExtendCard>

          <h2 id="competitor-analysis">Competitor analysis</h2>
          <Placeholder />
          <ExtendCard title="Direct competitors">
            <Placeholder />
          </ExtendCard>
          <ExtendCard title="Indirect competitors">
            <Placeholder />
          </ExtendCard>
          <ExtendCard title="Future competitors">
            <Placeholder />
          </ExtendCard>
          <ExtendCard title="Conclusion about competitors">
            <Placeholder />
          </ExtendCard>

          <h2 id="cost-analysis">Cost analysis</h2>
          <Placeholder>
            Introduce the investment, production, and capital costs used in the
            business analysis.
          </Placeholder>

          <ExtendCard title="Investment costs">
            <Placeholder />

            <h3 id="purchase-costs" data-toc="exclude">
              Purchase costs
            </h3>
            <Placeholder />

            <h3 id="direct-costs" data-toc="exclude">
              Direct costs
            </h3>
            <Placeholder />

            <h3 id="indirect-costs" data-toc="exclude">
              Indirect costs
            </h3>
            <Placeholder />

            <h3 id="other-costs" data-toc="exclude">
              Other costs
            </h3>
            <Placeholder />

            <div className="entre-card-nested-group">
              <ExtendCard title="Equipment costs" level="secondary">
                <Placeholder />
              </ExtendCard>
            </div>
          </ExtendCard>

          <ExtendCard title="Production costs">
            <Placeholder />

            <h3 id="variable-costs" data-toc="exclude">
              Variable costs
            </h3>
            <Placeholder />

            <h3 id="fixed-costs" data-toc="exclude">
              Fixed costs
            </h3>
            <Placeholder />

            <div className="entre-card-nested-group">
              <ExtendCard title="Material costs" level="secondary">
                <Placeholder />
              </ExtendCard>
              <ExtendCard title="Labour costs" level="secondary">
                <Placeholder />
              </ExtendCard>
              <ExtendCard title="Consumable costs" level="secondary">
                <Placeholder />
              </ExtendCard>
              <ExtendCard title="Waste costs" level="secondary">
                <Placeholder />
              </ExtendCard>
              <ExtendCard title="Royalties" level="secondary">
                <Placeholder />
              </ExtendCard>
            </div>
          </ExtendCard>

          <ExtendCard title="Capital costs">
            <Placeholder />
          </ExtendCard>

          <h2 id="timeline">Timeline</h2>
          <Placeholder />

          <h2 id="financial-analysis">Financial analysis</h2>
          <Placeholder />

          <h2 id="risk-analysis">Risk analysis</h2>
          <Placeholder />

          <h2 id="obtaining-capital">Obtaining capital</h2>
          <Placeholder />

          <h3 id="entrepreneurial-grants">Entrepreneurial grants</h3>
          <Placeholder />

          <h3 id="long-term-fiscal-security">Long-term fiscal security</h3>
          <Placeholder />

          <h2 id="the-sustainable-business-canvas">
            The sustainable business canvas
          </h2>
          <Placeholder />

          <h2 id="market-entry">Market entry</h2>
          <Placeholder />

          <h3 id="minimum-viable-product">Minimum viable product</h3>
          <Placeholder />

          <h3 id="first-potential-customers">First potential customers</h3>
          <Placeholder />

          <h3 id="patenting">Patenting</h3>
          <Placeholder />

          <h3 id="market-expansion">Market expansion</h3>
          <Placeholder />

          <h2 id="skill-gap-analysis">Skill gap analysis</h2>
          <Placeholder />

          <h2 id="long-term-benefits-disadvantages">
            Long-term benefits &amp; disadvantages
          </h2>
          <Placeholder />

          <h3 id="positive-impacts">Positive impacts</h3>
          <Placeholder />

          <h3 id="negative-impacts">Negative impacts</h3>
          <Placeholder />
        </article>
      </div>
    </div>
  );
}
