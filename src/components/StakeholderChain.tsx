import { Fragment, useId, useState, type ReactNode } from "react";
import "./StakeholderChain.css";

/**
 * The stage labels stay visible in one disclosure bar. All portraits and the
 * privacy note expand and collapse together, as in ProjectExperimentNotes.
 */
export type ChainPerson = {
  name: string;
  /** Optional portrait; falls back to initials. */
  image?: string;
  /** Optional focal point and zoom for cropping this portrait only. */
  imagePosition?: string;
  imageScale?: number;
};

export type ChainStage = {
  id: string;
  label: string;
  people: ChainPerson[];
};

const defaultStages: ChainStage[] = [
  { id: "patient", label: "Patient", people: [] },
  { id: "rd", label: "R&D", people: [] },
  { id: "treatment", label: "Treatment", people: [] },
  { id: "manufacturing", label: "Manufacturing", people: [] },
  {
    id: "market",
    label: "Market Authorization & Access",
    people: [],
  },
  { id: "rehabilitation", label: "Rehabilitation", people: [] },
];

const initials = (name: string) =>
  name
    .replace(/^(Dr\.|Prof\.)\s+/, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

export function StakeholderChain({
  stages = defaultStages,
  note,
}: {
  stages?: ChainStage[];
  note?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const drawerId = useId();

  return (
    <div
      className="chain"
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        className="chain__disclosure"
        aria-expanded={open}
        aria-controls={drawerId}
        aria-label={open ? "Collapse Stakeholder Map" : "Expand Stakeholder Map"}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="chain__row">
          {stages.map((stage, index) => (
            <Fragment key={stage.id}>
              {index > 0 && <span className="chain__arrow" aria-hidden="true" />}
              <span className="chain__stage">{stage.label}</span>
            </Fragment>
          ))}
        </span>
        <span className="chain__toggle" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        id={drawerId}
        className={`chain__drawer${open ? " chain__drawer--open" : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="chain__drawer-inner">
          <div className="chain__long-card">
            <div className="chain__mini-row">
              {stages.map((stage) => (
                <div className="chain__mini-card" key={stage.id}>
                  {stage.people.map((person) =>
                    person.image ? (
                      <span
                        key={person.name}
                        className="chain__mini-avatar"
                        title={person.name}
                      >
                        <img
                          src={person.image}
                          alt={person.name}
                          loading="lazy"
                          style={{
                            objectPosition: person.imagePosition,
                            transform: person.imageScale
                              ? `scale(${person.imageScale})`
                              : undefined,
                            transformOrigin: person.imagePosition,
                          }}
                        />
                      </span>
                    ) : (
                      <span
                        key={person.name}
                        className="chain__mini-initials"
                        title={person.name}
                      >
                        {initials(person.name)}
                      </span>
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
          {note && <p className="chain__privacy-note">{note}</p>}
        </div>
      </div>
    </div>
  );
}
