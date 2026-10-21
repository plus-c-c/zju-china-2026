import { infoContent, type Group } from "../group";
import { anisotropyModule } from "../engineering-anisotropy";

/** Wet Lab group: TVN Magnetic Binding Module (three sub-modules). */
export const tvnMagneticBindingGroup: Group = {
  label: "TVN Magnetic Binding Module",
  parts: [
    {
      label: "Alignment strategy selection",
      module: anisotropyModule,
      cycleSlice: [0, 3],
      lead: infoContent(
        anisotropyModule,
        "1 Selection of an alignment strategy",
      ),
    },
    {
      label: "Nanoparticle–SELP coupling",
      module: anisotropyModule,
      cycleSlice: [3, 5],
      lead: infoContent(
        anisotropyModule,
        "2 Coupling magnetic nanoparticles to SELP",
      ),
    },
    {
      label: "Protein expression & testing",
      module: anisotropyModule,
      cycleSlice: [5, 9],
      lead: infoContent(
        anisotropyModule,
        "3 Protein expression and functional testing",
      ),
    },
  ],
};
