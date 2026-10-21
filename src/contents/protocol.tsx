import { useState } from "react";
import { protocolGroups } from "./protocol-data";
import "./protocol.css";

function ProtocolTitle({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/(E\. coli)/g)
        .map((part, index) =>
          index % 2 === 1 ? <em key={index}>{part}</em> : part,
        )}
    </>
  );
}

export function Protocol() {
  const [selectedUrl, setSelectedUrl] = useState(
    protocolGroups[0].protocols[0].url,
  );
  const selected = protocolGroups
    .flatMap((group) => group.protocols)
    .find((protocol) => protocol.url === selectedUrl)!;
  return (
    <div className="protocol-page mt-4 mb-5">
      <p>
        Welcome to the <strong>Protocols</strong> page of NEST. This section
        provides the experimental protocols used in the development and
        validation of our SELP-based biomimetic cartilage hydrogel platform.
        Each protocol outlines the procedures and key experimental details
        needed to support the implementation of our design.
      </p>
      <p>
        By documenting these protocols, we aim to promote transparency and
        reproducibility, providing a practical reference for researchers seeking
        to understand or build upon our work.
      </p>
      <div className="protocol-layout mt-4">
        <nav className="protocol-sidebar" aria-label="Experimental protocols">
          {protocolGroups.map((group, index) => (
            <details
              key={group.title}
              open={index === 0}
              className="protocol-group"
            >
              <summary>{group.title}</summary>
              <ul>
                {group.protocols.map((protocol) => (
                  <li key={protocol.url}>
                    <button
                      type="button"
                      aria-current={
                        selectedUrl === protocol.url ? "true" : undefined
                      }
                      aria-controls="protocol-document"
                      onClick={() => setSelectedUrl(protocol.url)}
                    >
                      <ProtocolTitle text={protocol.title} />
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </nav>
        <section className="protocol-document" aria-labeledby="protocol-title">
          <div
            id="protocol-title"
            role="heading"
            aria-level={2}
            className="protocol-title mb-3"
            aria-live="polite"
          >
            <ProtocolTitle text={selected.title} />
          </div>
          <a
            className="protocol-pdf-link"
            href={selected.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open PDF: ${selected.title}`}
          >
            Open PDF
          </a>
          <iframe
            key={selected.url}
            id="protocol-document"
            src={selected.url}
            title={selected.title}
            className="protocol-pdf"
          />
        </section>
      </div>
    </div>
  );
}
