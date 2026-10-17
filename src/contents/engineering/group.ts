import type { ReactNode } from "react";
import type { DbtlModule } from "./dbtl";

/**
 * Page structure shared by the Engineering groups: a group holds one or more
 * sub-modules ("parts"), and each part maps to a slice of a DBTL module's
 * cycles. Group files live in `engineering/groups/`.
 */
export interface Part {
  label: string;
  module: DbtlModule;
  /** Optional sub-module heading shown above the stepper. */
  heading?: string;
  /** Optional lead content for the sub-module (its section intro). */
  lead?: ReactNode;
  /** [start, end) slice of the module's cycles that belongs to this part. */
  cycleSlice?: [number, number];
}

export interface Group {
  label: string;
  /** Optional group-level heading shown for every sub-module (总引导). */
  heading?: string;
  /** Optional group-level lead content (总引导段). */
  lead?: ReactNode;
  parts: Part[];
}

/** Pull a block (e.g. a section lead) out of a module's infos. */
export const infoContent = (module: DbtlModule, title: string): ReactNode =>
  module.infos?.find((info) => info.title === title)?.content;
