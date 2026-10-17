import ringSvg from "./assets/dbtl-ring.svg?raw";
import type { DbtlPhase } from "./dbtl";

interface DbtlRingProps {
  /** Currently active phase; null when an info step is shown. */
  active: DbtlPhase | null;
  /** Jump to the given phase of the current cycle. */
  onSelect: (phase: DbtlPhase) => void;
}

const SEG_TO_PHASE: Record<string, DbtlPhase> = {
  design: "Design",
  build: "Build",
  test: "Test",
  learn: "Learn",
};

/**
 * DBTL ring — the team's Figma artwork (Learn · Design · Build · Test),
 * inlined so the four segments can be highlighted individually. Every
 * segment group carries a `data-seg` attribute; the wrapper exposes the
 * active one via `data-active` for the CSS dimming rules.
 */
export function DbtlRing({ active, onSelect }: DbtlRingProps) {
  return (
    <div
      className="dbtl-ring"
      data-active={active ? active.toLowerCase() : ""}
      role="group"
      aria-label="Design, Build, Test, Learn"
      onClick={(event) => {
        const segment = (event.target as Element).closest("[data-seg]");
        const key = segment?.getAttribute("data-seg") ?? "";
        const phase = SEG_TO_PHASE[key];
        if (phase) onSelect(phase);
      }}
      dangerouslySetInnerHTML={{ __html: ringSvg }}
    />
  );
}
