import type { ReactNode } from "react";
import type { DbtlModule } from "./dbtl";
import type { SeedModule } from "./seed";

/**
 * Page structure shared by the Engineering groups: a group holds one or more
 * sub-modules ("parts"), and each part maps to a slice of a cycle module's
 * cycles — DBTL for the lab sections, SEED for Human Practices. Group files
 * live in `engineering/groups/`.
 */
export interface Part {
  label: string;
  /** DBTL module for Wet Lab / Dry Lab sub-modules. */
  module?: DbtlModule;
  /** SEED module for Human Practices sub-modules. */
  seedModule?: SeedModule;
  /** Optional sub-module heading shown with its lead (引导段). */
  heading?: string;
  /** Optional lead content for the sub-module (引导段). */
  lead?: ReactNode;
  /** Optional outlook content for the sub-module (展望段). */
  outlook?: ReactNode;
  /** [start, end) slice of the module's cycles that belongs to this part. */
  cycleSlice?: [number, number];
}

export interface Group {
  label: string;
  /** Cycle framework driving the group's stepper (default "dbtl"). */
  flavor?: "dbtl" | "seed";
  /** Optional group-level heading shown in the Introduction tab. */
  heading?: string;
  /** Optional group-level lead content (总引导段). */
  lead?: ReactNode;
  /** Optional group-level outlook content (总展望段). */
  outlook?: ReactNode;
  parts: Part[];
}

/** Pull a block (e.g., a section lead) out of a module's infos. */
export const infoContent = (module: DbtlModule, title: string): ReactNode =>
  module.infos?.find((info) => info.title === title)?.content;
