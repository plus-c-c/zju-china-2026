import { useState } from "react";
import collection from "./parts-data.json";
import "./parts.css";

type Part = (typeof collection.parts)[number];
const categories = [...new Set(collection.parts.map((part) => part.category))];
const colors: Record<string, string> = {
  scaffold: "#5689d9",
  tag: "#9070b9",
  matrix: "#359591",
  magnet: "#d58b30",
  expression: "#71849c",
  enzyme: "#6d9d56",
  reporter: "#6d9d56",
  protease: "#cd7289",
  control: "#998c7b",
};

function registryUrl(id: string) {
  return `https://registry.igem.org/parts/${id.toLowerCase().replace("_", "-")}`;
}

function RegistryLink({ id }: { id: string }) {
  return (
    <a href={registryUrl(id)} target="_blank" rel="noreferrer">
      {id}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}

function SourceText({ text }: { text: string }) {
  return text
    .split(/(\*[^*]+\*)/g)
    .map((piece, index) =>
      piece.startsWith("*") && piece.endsWith("*") ? (
        <em key={index}>{piece.slice(1, -1)}</em>
      ) : (
        piece
      ),
    );
}

function SequenceMap({
  part,
  featured = false,
}: {
  part: Part;
  featured?: boolean;
}) {
  const length = part.sequence.length;
  const left = 12;
  const width = 496;
  const lanes = Math.max(...part.features.map((feature) => feature.lane)) + 1;
  const extraHeight = (lanes - 1) * 52;
  return (
    <figure className={`parts-map${featured ? " parts-map-featured" : ""}`}>
      <svg
        viewBox={`0 0 520 ${94 + extraHeight}`}
        role="img"
        aria-label={`${part.shortName}, ${length} base pairs. ${part.features.map((f) => `${f.label}: bases ${f.start} to ${f.end}`).join("; ")}.`}
      >
        <title>{part.shortName} — linear DNA map</title>
        <line
          x1={left}
          y1="43"
          x2={left + width}
          y2="43"
          stroke="#b6c6d9"
          strokeWidth="2"
        />
        {Array.from({ length: lanes }, (_, lane) => (
          <rect
            key={lane}
            x={left}
            y={31 + lane * 52}
            width={width}
            height="24"
            rx="3"
            fill="#dce4ed"
          />
        ))}
        {part.features.map((feature, index) => {
          const x = left + ((feature.start - 1) / length) * width;
          const w = ((feature.end - feature.start + 1) / length) * width;
          const tip = Math.min(9, w * 0.3);
          return (
            <g
              key={`${feature.sourceId}-${feature.start}`}
              transform={`translate(0 ${feature.lane * 52})`}
            >
              <path
                d={`M${x},31 H${x + w - tip} L${x + w},43 L${x + w - tip},55 H${x} Z`}
                fill={colors[feature.color]}
                stroke="#fff"
                strokeWidth="1"
              />
              <line
                x1={x + w / 2}
                y1="28"
                x2={x + w / 2}
                y2="20"
                stroke={colors[feature.color]}
              />
              <text
                x={x + w / 2}
                y="15"
                textAnchor="middle"
                fill="#31476a"
                fontSize="12"
                fontWeight="600"
              >
                {index + 1}
              </text>
            </g>
          );
        })}
        {[0, 0.5, 1].map((ratio) => (
          <g key={ratio} transform={`translate(0 ${extraHeight})`}>
            <line
              x1={left + width * ratio}
              y1="61"
              x2={left + width * ratio}
              y2="66"
              stroke="#9aaec5"
            />
            <text
              x={left + width * ratio}
              y="83"
              textAnchor={
                ratio === 0 ? "start" : ratio === 1 ? "end" : "middle"
              }
              fill="#62748b"
              fontSize="12"
            >
              {ratio === 0 ? "1" : Math.round(length * ratio).toLocaleString()}
              {ratio === 1 ? " bp" : ""}
            </text>
          </g>
        ))}
      </svg>
      <figcaption>
        {part.features.map((feature, index) => (
          <span key={`${feature.sourceId}-${feature.start}`}>
            <b style={{ backgroundColor: colors[feature.color] }}>
              {index + 1}
            </b>
            {feature.label}
          </span>
        ))}
        {part.kind === "composite" && (
          <span>
            <i className="parts-map-unmapped" />
            Other sequence
          </span>
        )}
      </figcaption>
    </figure>
  );
}

function fasta(part: Part) {
  return `>${part.id} ${part.title}\n${part.sequence.match(/.{1,70}/g)?.join("\n")}\n`;
}

function downloadFasta(parts: Part[], name: string) {
  const url = URL.createObjectURL(
    new Blob([parts.map(fasta).join("\n")], {
      type: "text/plain;charset=utf-8",
    }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function PartCard({ part }: { part: Part }) {
  const [copyState, setCopyState] = useState("");
  const gc =
    ((part.sequence.match(/[GC]/g)?.length || 0) / part.sequence.length) * 100;

  async function copySequence() {
    try {
      await navigator.clipboard.writeText(part.sequence);
      setCopyState("Sequence copied");
    } catch {
      setCopyState("Select and copy the sequence below");
    }
  }

  return (
    <article
      className="parts-card"
      id={part.id}
      style={{ borderTopColor: colors[part.color] }}
    >
      <div className="parts-card-meta">
        <RegistryLink id={part.id} />
        <span>{part.sequence.length.toLocaleString()} bp</span>
      </div>
      <h4>{part.title}</h4>
      <span className="parts-category">{part.category}</span>
      <p className="parts-card-summary">
        <SourceText text={part.summary} />
      </p>
      <SequenceMap part={part} />
      <details className="parts-details">
        <summary>
          Full description &amp; sequence<span aria-hidden="true">＋</span>
        </summary>
        <div className="parts-details-body">
          <p className="parts-original-title">{part.title}</p>
          <p>
            <SourceText text={part.description} />
          </p>
          {part.components.length > 0 && (
            <div className="parts-components">
              <strong>Registry components</strong>
              <div>
                {part.components.map((id, index) => (
                  <RegistryLink key={`${id}-${index}`} id={id} />
                ))}
              </div>
            </div>
          )}
          {part.kind === "composite" && (
            <div className="parts-feature-list">
              <strong>Mapped regions · 1-based, inclusive</strong>
              <ol>
                {part.features.map((feature) => (
                  <li key={`${feature.sourceId}-${feature.start}`}>
                    <span>
                      {feature.label} · {feature.start}–{feature.end} bp
                    </span>
                    <RegistryLink id={feature.sourceId} />
                  </li>
                ))}
              </ol>
              <p>
                Gray regions are outside the mapped components. The map does not
                imply that every expression or processing element has been
                annotated.
              </p>
            </div>
          )}
          <div className="parts-sequence-heading">
            <strong>DNA sequence · {gc.toFixed(1)}% GC</strong>
            <div className="parts-sequence-actions">
              <button type="button" onClick={copySequence}>
                Copy DNA
              </button>
              <button
                type="button"
                onClick={() => downloadFasta([part], `${part.id}.fasta`)}
              >
                FASTA ↓
              </button>
            </div>
          </div>
          <span className="parts-copy-status" role="status">
            {copyState}
          </span>
          <pre
            className="parts-sequence"
            tabIndex={0}
            aria-label={`${part.id} DNA sequence`}
          >
            {part.sequence.match(/.{1,60}/g)?.join("\n")}
          </pre>
          <a
            className="parts-registry-cta"
            href={registryUrl(part.id)}
            target="_blank"
            rel="noreferrer"
          >
            View full Registry record ↗
          </a>
        </div>
      </details>
    </article>
  );
}

export function Parts() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const filtered = collection.parts.filter((part) => {
    const text =
      `${part.id} ${part.title} ${part.description} ${part.category} ${part.components.join(" ")}`.toLowerCase();
    return (
      (!category || part.category === category) &&
      text.includes(query.trim().toLowerCase())
    );
  });
  const featured = collection.parts.find((part) => part.id === "BBa_26R5QAZM")!;
  return (
    <div className="parts-page">
      <section className="parts-intro" aria-labelledby="parts-overview">
        <span className="parts-eyebrow">ZJU-China 2026 · Part collection</span>
        <h2 id="parts-overview">
          A modular toolkit, from sequence to scaffold
        </h2>
        <p>
          Explore the building blocks behind our protein-based cartilage-repair
          scaffold: silk-elastin-like proteins, ligation handles,
          matrix-retention modules, magnetic-response peptides and
          protease-responsive constructs.
        </p>
        <div className="parts-overview-links">
          <a href="#basic-parts">
            <strong>18</strong>
            <span>
              Basic Parts <i aria-hidden="true">↗</i>
            </span>
          </a>
          <a href="#composite-parts">
            <strong>12</strong>
            <span>
              Composite Parts <i aria-hidden="true">↗</i>
            </span>
          </a>
          <a
            href={collection.registryOrganisation}
            target="_blank"
            rel="noreferrer"
          >
            <strong>↗</strong>
            <span>Team Registry</span>
          </a>
        </div>
      </section>

      <section
        className="parts-spotlight"
        aria-label="Example composite sequence map"
      >
        <div className="parts-spotlight-heading">
          <div>
            <span className="parts-eyebrow">Inside a composite part</span>
            <h3 data-toc="exclude">Anatomy of a magnetic-response module</h3>
          </div>
          <RegistryLink id={featured.id} />
        </div>
        <SequenceMap part={featured} featured />
        <p>
          {featured.summary} The map follows the registered{" "}
          {featured.sequence.length.toLocaleString()}-bp DNA sequence and its
          Registry component annotations.
        </p>
      </section>

      <section className="parts-catalogue" aria-labelledby="parts-browse">
        <h2 id="parts-browse">Browse the collection</h2>
        <p className="parts-catalogue-lead">
          Find a part by name, Registry ID or function. Open any entry for its
          complete English description and downloadable DNA sequence.
        </p>
        <div className="parts-toolbar">
          <label>
            <span>Search parts</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. DogTag, SELP or BBa_…"
            />
          </label>
          <label>
            <span>Function</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">All functions</option>
              {categories.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() =>
              downloadFasta(filtered, "ZJU-China-2026-parts.fasta")
            }
            disabled={filtered.length === 0}
          >
            Download{" "}
            {filtered.length === collection.parts.length ? "all" : "selected"}{" "}
            FASTA ↓
          </button>
        </div>
        <div className="parts-results-line">
          <span role="status">
            Showing {filtered.length} of {collection.parts.length} parts
          </span>
          {(query || category) && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("");
              }}
            >
              Clear filters ×
            </button>
          )}
        </div>
        {(["basic", "composite"] as const).map((kind) => {
          const parts = filtered.filter((part) => part.kind === kind);
          return (
            <section
              className="parts-group"
              key={kind}
              aria-labelledby={`${kind}-parts`}
            >
              <div className="parts-group-heading">
                <h3 id={`${kind}-parts`}>
                  {kind === "basic" ? "Basic Parts" : "Composite Parts"}
                </h3>
                <span>
                  {parts.length} / {kind === "basic" ? 18 : 12}
                </span>
              </div>
              <p>
                {kind === "basic"
                  ? "Individual coding regions, peptide motifs and protein modules for modular assembly."
                  : "Combined modules that connect scaffold architecture with ligation, retention, magnetic response or protease-responsive disconnection."}
              </p>
              <div className="parts-grid">
                {parts.map((part) => (
                  <PartCard key={part.id} part={part} />
                ))}
              </div>
              {parts.length === 0 && (
                <p className="parts-empty">
                  No {kind} parts match these filters.
                </p>
              )}
            </section>
          );
        })}
      </section>

      <section
        className="parts-reading-guide"
        aria-labelledby="parts-map-guide"
      >
        <h2 id="parts-map-guide">Reading the sequence maps</h2>
        <p>
          Each thumbnail is a linear DNA map scaled independently to that part’s
          sequence length. Numbered colors identify mapped modules; gray shows
          other sequence. Coordinates are 1-based and inclusive. Maps show
          sequence organization, rather than plasmid topology or restriction
          sites.
        </p>
        <p>
          Composite-part diagrams follow the component coordinates recorded in
          the iGEM Registry. Overlapping annotations appear on separate tracks.
          The details panel lists the component IDs and their registered
          coordinates. Basic-part diagrams show the complete registered
          sequence.
        </p>
        <p>
          Part names, English descriptions, component lists and DNA sequences
          follow the public iGEM Registry, retrieved on {collection.retrieved}.
          Follow the Registry links for current records.
        </p>
        <a
          href={collection.registryOrganisation}
          target="_blank"
          rel="noreferrer"
        >
          Explore ZJU-China’s Registry collection ↗
        </a>
      </section>
    </div>
  );
}
