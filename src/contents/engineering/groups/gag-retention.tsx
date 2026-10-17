import { infoContent, type Group } from "../group";
import { gagRetentionModule } from "../engineering-gag-retention";

/** Wet Lab group: GAG Retention Module (Protein expression / Functional validation). */
export const gagRetentionGroup: Group = {
  label: "GAG Retention Module",
  heading: "Engineering goal",
  lead: infoContent(gagRetentionModule, "Engineering goal"),
  parts: [
    {
      label: "Protein expression",
      module: gagRetentionModule,
      cycleSlice: [0, 2],
    },
    {
      label: "Functional validation",
      module: gagRetentionModule,
      cycleSlice: [2, 4],
      heading: "DogTag ligation-interface validation",
      lead: infoContent(
        gagRetentionModule,
        "DogTag ligation-interface validation",
      ),
    },
  ],
};
