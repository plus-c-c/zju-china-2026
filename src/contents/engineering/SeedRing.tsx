import seedRingSvg from "./assets/seed-ring.svg?raw";
import dbtlRingSvg from "./assets/dbtl-ring.svg?raw";
import type { SeedPhase } from "./seed";

interface SeedRingProps {
  /** Currently active SEED phase; null when an info step is shown. */
  active: SeedPhase | null;
  /** Jump to the given SEED phase of the current cycle. */
  onSelect: (phase: SeedPhase) => void;
}

const SEG_TO_PHASE: Record<string, SeedPhase> = {
  spark: "Spark",
  explore: "Explore",
  engineering: "Engineering",
  dialogue: "Dialogue",
};

/**
 * SEED ring — the SEED cycle as the outer ring with the DBTL artwork nested
 * inside it (the Engineering & Implementation phase carries the whole DBTL
 * loop, so the inner ring lights up while that step is shown). The outer
 * segments are clickable like the DBTL ring; clicking the nested artwork
 * opens the Engineering & Implementation step. The wrapper exposes the
 * active phase via `data-active` and the inner-ring state via `data-dbtl`
 * for the CSS rules.
 */
export function SeedRing({ active, onSelect }: SeedRingProps) {
  return (
    <div
      className="seed-ring"
      data-active={active ? active.toLowerCase() : ""}
      data-dbtl={active === "Engineering" ? "on" : ""}
      role="group"
      aria-label="Spark a Question, Explore and Analyze, Engineering and Implementation, Dialogue and Feedback"
      onClick={(event) => {
        const segment = (event.target as Element).closest("[data-seg]");
        // The nested DBTL artwork opens the Engineering & Implementation step.
        if (segment?.closest(".seed-ring-inner")) {
          onSelect("Engineering");
          return;
        }
        const phase = SEG_TO_PHASE[segment?.getAttribute("data-seg") ?? ""];
        if (phase) onSelect(phase);
      }}
    >
      <div
        className="seed-ring-outer"
        dangerouslySetInnerHTML={{ __html: seedRingSvg }}
      />
      <div
        className="seed-ring-inner"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: dbtlRingSvg }}
      />
    </div>
  );
}
