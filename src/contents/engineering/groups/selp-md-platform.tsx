import type { Group } from "../group";
import { softwareIModule } from "../engineering-software";

/** Dry Lab group: SELP MD platform. */
export const selpMdPlatformGroup: Group = {
  label: "SELP MD platform",
  parts: [{ label: "Simulation platform", module: softwareIModule }],
};
