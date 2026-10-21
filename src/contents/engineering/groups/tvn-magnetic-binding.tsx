import { infoContent, type Group } from "../group";
import { anisotropyModule } from "../engineering-anisotropy";

/** Wet Lab group: Magnetically Responsive Anisotropy Module (three sub-modules). */
export const tvnMagneticBindingGroup: Group = {
  label: "Magnetically Responsive Anisotropy Module",
  parts: [
    {
      label: "Selection of an alignment strategy",
      module: anisotropyModule,
      cycleSlice: [0, 3],
      lead: infoContent(
        anisotropyModule,
        "1 Selection of an alignment strategy",
      ),
    },
    {
      label: "Coupling magnetic nanoparticles to SELP",
      module: anisotropyModule,
      cycleSlice: [3, 5],
      lead: infoContent(
        anisotropyModule,
        "2 Coupling magnetic nanoparticles to SELP",
      ),
    },
    {
      label: "Protein expression and functional testing",
      module: anisotropyModule,
      cycleSlice: [5, 9],
      lead: infoContent(
        anisotropyModule,
        "3 Protein expression and functional testing",
      ),
    },
  ],
};
