import type { Group } from "../group";
import { ligationModule } from "../engineering-ligation-system";
import { scaffoldModule } from "../engineering-scaffold";

/** Wet Lab group: SELP Hydrogels and Ligation System. */
export const selpHydrogelsGroup: Group = {
  label: "SELP Hydrogels and Ligation System",
  parts: [
    { label: "Hydrogel scaffold", module: scaffoldModule },
    { label: "Ligation system", module: ligationModule },
  ],
};
