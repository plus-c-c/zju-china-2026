import "./notebook.css";

const notebooks = [
  {
    id: "overview",
    title: "Overview",
    pdf: "https://static.igem.wiki/teams/6102/wiki/final-notebook/01-notebook-overview.pdf",
  },
  {
    id: "scaffold-ligation",
    title: "SELP Hydrogels and Ligation System",
    pdf: "https://static.igem.wiki/teams/6102/wiki/final-notebook/02-notebook-scaffold-ligation-system.pdf",
  },
  {
    id: "gag-retention",
    title: "GAG Retention Module",
    pdf: "https://static.igem.wiki/teams/6102/wiki/final-notebook/03-notebook-gag-retention-module.pdf",
  },
  {
    id: "tvn-magnetic-binding",
    title: "Magnetically Responsive Anisotropy Module",
    pdf: "https://static.igem.wiki/teams/6102/wiki/final-notebook/04-notebook-tvn-adsorption.pdf",
  },
  {
    id: "mitochondrial-therapy",
    title: "Mitochondrial Therapeutic Module",
    pdf: "https://static.igem.wiki/teams/6102/wiki/final-notebook/05-notebook-mitochondrial-therapeutic-module.pdf",
  },
];

export function Notebook() {
  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto notebook-page">
        <p>
          These are the <strong>Notebooks</strong> of our project which provides
          a detailed record of all our activities throughout the season,
          including wet-lab experiments, team meetings, and brainstorming
          sessions.
        </p>
        <p>Each entry in this Notebook includes:</p>
        <ul>
          <li>
            <strong>Date</strong> – Clearly marking when the activity took
            place.
          </li>
          <li>
            <strong>Purpose</strong> – The motivation or goal behind the
            activity.
          </li>
          <li>
            <strong>Procedures</strong> – Experimental steps, design strategies,
            or protocols followed.
          </li>
          <li>
            <strong>Notes</strong> – Data collected, outcomes of the activity,
            or experimental findings.
          </li>
        </ul>
        <p>
          Where possible, we have also included{" "}
          <strong>photos and diagrams</strong> to visually illustrate our
          workflow and progress.
        </p>
        {notebooks.map((notebook) => (
          <section
            key={notebook.id}
            aria-labeledby={notebook.id}
            className="mt-5"
          >
            <h2 id={notebook.id} className="mb-4">
              {notebook.title}
            </h2>
            <iframe
              className="notebook-pdf"
              src={notebook.pdf}
              title={`${notebook.title} — 2026 laboratory notebook`}
              loading="lazy"
            />
          </section>
        ))}
      </div>
    </div>
  );
}
