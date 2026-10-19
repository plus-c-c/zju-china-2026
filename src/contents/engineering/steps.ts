import type { ReactNode } from "react";
import { DBTL_PHASES, type DbtlModule, type DbtlPhase } from "./dbtl";

export interface Step {
  key: string;
  kind: "phase" | "info" | "lead" | "outlook";
  phase?: DbtlPhase;
  cycleIndex?: number;
  title?: string;
  content?: ReactNode;
}

/**
 * Steps of a sub-module view: the part-level lead (引导段) is the first step,
 * the module blocks and cycles follow in order, and the part-level outlook
 * (展望段) is the last step. Lead / outlook steps carry no phase, so the
 * ring stays unlit and the panel shows no phase badge on them.
 */
export function buildSteps(
  module: DbtlModule,
  lead?: ReactNode,
  outlook?: ReactNode,
): Step[] {
  const steps: Step[] = [];
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
    for (const phase of DBTL_PHASES) {
      steps.push({
        key: `cycle-${i}-${phase}`,
        kind: "phase",
        phase,
        cycleIndex: i,
        content: module.cycles[i].content[phase],
      });
    }
  }
  if (outlook) {
    steps.push({ key: "outlook", kind: "outlook", content: outlook });
  }
  return steps;
}

/** Scroll distance per step, as a fraction of the viewport height. */
export const STEP_DVH = 30;

/**
 * Number of scroll intervals covered by a sequence. Every step — including
 * the closing Introduction / Conclusion views — owns one full interval, so
 * the ring always has room to turn before the content switches. A non-phase
 * step uses its interval for a complete revolution, which keeps the wheel
 * usable on views that have no DBTL phase to show.
 */
export function sequenceSpan(steps: { kind: string }[]): number {
  return steps.length;
}
