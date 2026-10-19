// Keep the supplied filenames unchanged; encode spaces only for the URL.
const uploadedIconBase = (
  import.meta.env.VITE_NAV_ICON_BASE_URL ||
  "https://static.igem.wiki/teams/6102/wiki/header/title"
).replace(/\/$/, "");

export function navigationIcon(filename: string) {
  // iGEM converts uploaded PNGs to AVIF and normalizes underscores/spaces.
  const hostedFilename = filename
    .replace(/_/g, "-")
    .replace(/ /g, "-")
    .replace(/\.png$/, ".avif");
  return `${uploadedIconBase}/${encodeURIComponent(hostedFilename)}`;
}

export const pageDetails: Record<
  string,
  { icon: string; description: string }
> = {
  "/description": {
    icon: "03_description.png",
    description: "Why cartilage needs a new repair strategy",
  },
  "/design": {
    icon: "04-design.png",
    description: "How NEST combines scaffold and repair modules",
  },
  "/proof-of-concept": {
    icon: "05_proof_of_concept.png",
    description: "Testing NEST’s cartilage repair concept",
  },
  "/implementation": {
    icon: "06_implementation.png",
    description: "Bringing NEST into clinical use",
  },
  "/future-plan": {
    icon: "07-future plan.png",
    description: "What NEST needs before clinical translation",
  },
  "/contribution": {
    icon: "08_contribution.png",
    description: "Parts, methods and tools others can reuse",
  },
  "/experiments": {
    icon: "11_experiment_result.png",
    description: "How we build and test NEST",
  },
  "/results": {
    icon: "11_experiment_result.png",
    description: "What our material and module tests show",
  },
  "/protocol": {
    icon: "12_protocol.png",
    description: "Repeat our experiments step by step",
  },
  "/parts": {
    icon: "13_parts.png",
    description: "Genetic building blocks for modular repair",
  },
  "/notebook": {
    icon: "25_notebook.png",
    description: "Our laboratory work, recorded over time",
  },
  "/safety-and-security": {
    icon: "14_safety.png",
    description: "Managing biological and laboratory risks",
  },
  "/hardware": {
    icon: "16_hardware.png",
    description: "Preparing and delivering the hydrogel",
  },
  "/software": {
    icon: "17_software.png",
    description: "From molecular simulations to formulation workflows",
  },
  "/model": {
    icon: "18_model.png",
    description: "Predicting material behavior to guide design",
  },
  "/human-practices": {
    icon: "20_integrated_human_practices.png",
    description: "How stakeholder feedback shapes NEST",
  },
  "/entrepreneurship": {
    icon: "21_entrepreneurship.png",
    description: "Building a business around cartilage repair",
  },
  "/education": {
    icon: "22_education.png",
    description: "Making synthetic biology accessible",
  },
  "/members": {
    icon: "26_members.png",
    description: "Meet the team building NEST",
  },
  "/attributions": {
    icon: "27_attributions.png",
    description: "Who contributed to each part of NEST",
  },
  "/sponsors": {
    icon: "28_sponsors.png",
    description: "The organizations making NEST possible",
  },
};
