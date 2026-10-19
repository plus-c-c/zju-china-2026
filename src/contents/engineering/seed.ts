import type { ReactNode } from "react";

/**
 * SEED cycle — the Human Practices framework (Integrated Human Practices
 * toolbox, "SEED 的分析方法"). SEED wraps the engineering cycle: the lab's
 * DBTL loop runs inside the "Engineering & Implementation" phase, so the
 * whole project iterates as S → E → E → D:
 *
 *   S  Spark a Question          — surface the difficulty and ask a
 *                                  worthwhile question when the project
 *                                  needs an iteration;
 *   E  Explore & Analyze         — explore outward (stakeholders, surveys,
 *                                  literature) and distil the findings into
 *                                  a PRD that the engineering team can use;
 *   E  Engineering & Implementation — the engineering team runs the DBTL
 *                                  cycle, confirms the plan and implements
 *                                  it (this phase carries the whole DBTL
 *                                  loop);
 *   D  Dialogue & Feedback       — show the latest design and results to
 *                                  stakeholders and the wider target group
 *                                  and collect their feedback.
 */
export type SeedPhase = "Spark" | "Explore" | "Engineering" | "Dialogue";

export const SEED_PHASES: SeedPhase[] = [
  "Spark",
  "Explore",
  "Engineering",
  "Dialogue",
];

/** Full phase names shown on the ring and in the step badge. */
export const SEED_LABELS: Record<SeedPhase, string> = {
  Spark: "Spark a Question",
  Explore: "Explore & Analyze",
  Engineering: "Engineering & Implementation",
  Dialogue: "Dialogue & Feedback",
};

export interface SeedCycle {
  /** Cycle heading, e.g. "Cycle 1 — SELP". */
  title: string;
  /** One entry per Spark–Explore–Engineering–Dialogue phase. */
  content: Record<SeedPhase, ReactNode>;
}

export interface SeedInfo {
  /** Number of cycles that precede this block (0 = before the first cycle). */
  afterCycle: number;
  /** Optional section heading. */
  title?: string;
  content?: ReactNode;
}

export interface SeedModule {
  /** Module title (sub-module name, shown as the panel's accessible name). */
  title: string;
  /** Optional heading for the intro block. */
  introTitle?: string;
  /** Intro blocks shown above the stepper. */
  intro?: ReactNode;
  cycles: SeedCycle[];
  /** Blocks that sit between cycles (section headings, transitions). */
  infos?: SeedInfo[];
  /** Closing blocks shown below the stepper. */
  outro?: ReactNode;
}

/** A step of a SEED sequence (mirrors the DBTL `Step` shape). */
export interface SeedStep {
  key: string;
  kind: "phase" | "info" | "lead" | "outlook";
  phase?: SeedPhase;
  cycleIndex?: number;
  title?: string;
  content?: ReactNode;
}

/**
 * Steps of a SEED sub-module view: the part-level lead (引导段) is the first
 * step, the module blocks and cycles follow in order, and the part-level
 * outlook (展望段) is the last step. Lead / outlook steps carry no phase, so
 * the ring stays unlit and the panel shows no phase badge on them.
 */
export function buildSeedSteps(
  module: SeedModule,
  lead?: ReactNode,
  outlook?: ReactNode,
): SeedStep[] {
  const steps: SeedStep[] = [];
  if (lead) {
    steps.push({ key: "lead", kind: "lead", content: lead });
  }
  const infos = module.infos ?? [];
  for (let i = 0; i <= module.cycles.length; i += 1) {
    for (const info of infos.filter((entry) => entry.afterCycle === i)) {
      steps.push({
        key: `info-${steps.length}`,
        kind: "info",
        title: info.title,
        content: info.content,
      });
    }
    if (i === module.cycles.length) break;
    const cycle = module.cycles[i];
    for (const phase of SEED_PHASES) {
      steps.push({
        key: `cycle-${i}-${phase}`,
        kind: "phase",
        phase,
        cycleIndex: i,
        content: cycle.content[phase],
      });
    }
  }
  if (outlook) {
    steps.push({ key: "outlook", kind: "outlook", content: outlook });
  }
  return steps;
}
