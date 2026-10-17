import type { ReactNode } from "react";

export type DbtlPhase = "Design" | "Build" | "Test" | "Learn";

export const DBTL_PHASES: DbtlPhase[] = ["Design", "Build", "Test", "Learn"];

export interface DbtlCycle {
  /** Cycle heading, e.g. "Cycle 1｜Electric-field versus magnetic-field alignment". */
  title: string;
  /** One entry per Design–Build–Test–Learn phase. */
  content: Record<DbtlPhase, ReactNode>;
}

export interface DbtlInfo {
  /** Number of cycles that precede this block (0 = before the first cycle). */
  afterCycle: number;
  /** Optional section heading, e.g. "2. Coupling magnetic nanoparticles to SELP". */
  title?: string;
  content?: ReactNode;
}

export interface DbtlModule {
  /** Module title shown as the section heading. */
  title: string;
  /** Optional heading for the intro block (rendered above the stepper). */
  introTitle?: string;
  /** Intro blocks shown above the stepper. */
  intro?: ReactNode;
  cycles: DbtlCycle[];
  /** Blocks that sit between cycles (section headings, transitions). */
  infos?: DbtlInfo[];
  /** Closing blocks shown below the stepper. */
  outro?: ReactNode;
}
