import { softwareIModule, softwareIIModule } from "../engineering-software";
import type { Group } from "../group";

/** Dry Lab group: Software — the SELP MD platform and NEST Software. */
export const softwareGroup: Group = {
  label: "Software",
  parts: [
    {
      label: "SELP MD platform",
      module: softwareIModule,
      heading: softwareIModule.introTitle,
      lead: softwareIModule.intro,
      outlook: softwareIModule.outro,
    },
    {
      label: "NEST Software",
      module: softwareIIModule,
      heading: softwareIIModule.introTitle,
      lead: softwareIIModule.intro,
    },
  ],
};
