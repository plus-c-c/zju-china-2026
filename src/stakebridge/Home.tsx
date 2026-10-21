import { JOURNEY_STAGES } from "./journey";

export function Home({ recordCount }: { recordCount?: number }) {
  return (
    <div className="home-page">
      <header className="home-hero">
        <div>
          <span className="library-collection">
            Community library
            {recordCount !== undefined ? ` · ${recordCount} records` : ""}
          </span>
          <h1>
            Stakeholder
            <br />
            <span>engagement.</span>
          </h1>
          <p>
            Find people. Organise interviews. Bring insights into your project.
          </p>
          <div className="button-row">
            <a className="app-button" href="#registry">
              Explore library →
            </a>
            <a className="app-button secondary" href="#workspace">
              Open workspace
            </a>
          </div>
          <a className="home-handbook" href="#handbook">
            Read the handbook →
          </a>
        </div>
        <div className="home-journey" aria-label="Project journey">
          <span>From research to practice</span>
          <div>
            {JOURNEY_STAGES.map((name, index) => (
              <a
                key={name}
                href={`#registry?stage=${encodeURIComponent(name)}`}
              >
                <span className="journey-dot">{index + 1}</span>
                <b>{name}</b>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}
