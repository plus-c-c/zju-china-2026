import { Fragment, useEffect, useState, type ReactNode } from "react";
import "./StakeholderChain.css";

/**
 * Stakeholder map: the five lifecycle stages form a horizontal chain; hovering
 * (or tapping / focusing) any stage drops down one full-width card holding the
 * stage content areas (text to be filled in later).
 */
export type ChainPerson = {
  name: string;
  /** Optional portrait; falls back to initials. */
  image?: string;
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
  const [active, setActive] = useState<string | null>(null);

  // Touch / keyboard support: tapping outside or pressing Esc closes the drawer.
  useEffect(() => {
    if (!active) return;
    const closeOnOutside = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest(".chain")) setActive(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [active]);

  return (
    <div className="chain" onMouseLeave={() => setActive(null)}>
      <div className="chain__row">
        {stages.map((stage, index) => (
          <Fragment key={stage.id}>
            {index > 0 && <span className="chain__arrow" aria-hidden="true" />}
            <button
              type="button"
              className={`chain__stage${active === stage.id ? " chain__stage--active" : ""}`}
              aria-expanded={active === stage.id}
              aria-controls="chain-drawer"
              onMouseEnter={() => setActive(stage.id)}
              onFocus={() => setActive(stage.id)}
              onClick={() => setActive(stage.id)}
            >
              {stage.label}
            </button>
          </Fragment>
        ))}
      </div>
      <div
        id="chain-drawer"
        className={`chain__drawer${active ? " chain__drawer--open" : ""}`}
        aria-hidden={!active}
      >
        <div className="chain__drawer-inner">
          <div className="chain__long-card">
            <div className="chain__mini-row">
              {stages.map((stage) => (
                <div className="chain__mini-card" key={stage.id}>
                  {stage.people.map((person) =>
                    person.image ? (
                      <img
                        key={person.name}
                        src={person.image}
                        alt={person.name}
                        title={person.name}
                        loading="lazy"
                      />
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
