import type { Group } from "../group";
import { mitochondriaModule } from "../engineering-mitochondria";

/** Wet Lab group: Mitochondrial Therapy Module (three sub-modules). */
export const mitochondrialTherapyGroup: Group = {
  label: "Mitochondrial Therapy Module",
  parts: [
    {
      label: "Construction of a mitochondrial delivery carrier",
      module: mitochondriaModule,
      cycleSlice: [0, 2],
    },
    {
      label: "Validation of delivery-related functions",
      module: mitochondriaModule,
      cycleSlice: [2, 5],
    },
    {
      label: "Evaluation of cellular delivery performance",
      module: mitochondriaModule,
      cycleSlice: [5, 7],
    },
  ],
};
