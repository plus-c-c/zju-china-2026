import { Fragment, useEffect, useState } from "react";
import "./StakeholderChain.css";

/**
 * Stakeholder map: the five lifecycle stages form a horizontal chain; hovering
 * (or tapping / focusing) any stage drops down one full-width card holding the
 * stage content areas (text to be filled in later).
 */
const stages = [
  { id: "patient", label: "Patient" },
  { id: "rd", label: "R&D" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "market", label: "Market Authorization & Access" },
  { id: "treatment", label: "Treatment" },
  { id: "rehabilitation", label: "Rehabilitation" },
];

export function StakeholderChain() {
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
                <div className="chain__mini-card" key={stage.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
