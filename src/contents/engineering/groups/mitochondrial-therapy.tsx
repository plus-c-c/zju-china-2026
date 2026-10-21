import type { Group } from "../group";
import { mitochondriaModule } from "../engineering-mitochondria";

/** Wet Lab group: Mitochondrial Therapeutic Module (three sub-modules). */
export const mitochondrialTherapyGroup: Group = {
  label: "Mitochondrial Therapeutic Module",
  parts: [
    {
      label: "Construction",
      module: mitochondriaModule,
      cycleSlice: [0, 2],
    },
    {
      label: "Validation",
      module: mitochondriaModule,
      cycleSlice: [2, 5],
    },
    {
      label: "Evaluation",
      module: mitochondriaModule,
      cycleSlice: [5, 7],
    },
  ],
};
