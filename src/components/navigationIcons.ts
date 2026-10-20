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
    description: "The need for cartilage repair",
  },
  "/design": {
    icon: "04-design.png",
    description: "Inside the NEST repair system",
  },
  "/proof-of-concept": {
    icon: "05_proof_of_concept.png",
    description: "Testing our repair concept",
  },
  "/implementation": {
    icon: "06_implementation.png",
    description: "From laboratory to clinic",
  },
  "/future-plan": {
    icon: "07-future plan.png",
    description: "Next steps toward clinical use",
  },
  "/contribution": {
    icon: "08_contribution.png",
    description: "Resources others can build on",
  },
  "/experiments": {
    icon: "11_experiment_result.png",
    description: "Building and testing NEST",
  },
  "/results": {
    icon: "11_experiment_result.png",
    description: "What our experiments reveal",
  },
  "/protocol": {
    icon: "12_protocol.png",
    description: "Our step-by-step lab methods",
  },
  "/parts": {
    icon: "13_parts.png",
    description: "Building blocks for repair",
  },
  "/notebook": {
    icon: "25_notebook.png",
    description: "Our progress in the laboratory",
  },
  "/safety-and-security": {
    icon: "14_safety.png",
    description: "Managing risks in the lab",
  },
  "/hardware": {
    icon: "16_hardware.png",
    description: "Hydrogel preparation and delivery",
  },
  "/software": {
    icon: "17_software.png",
    description: "Simulation and formulation tools",
  },
  "/model": {
    icon: "18_model.png",
    description: "Models that guide our design",
  },
  "/human-practices": {
    icon: "20_integrated_human_practices.png",
    description: "Stakeholder insights into NEST",
  },
  "/entrepreneurship": {
    icon: "21_entrepreneurship.png",
    description: "A path to the healthcare market",
  },
  "/education": {
    icon: "22_education.png",
    description: "Making SynBio accessible",
  },
  "/members": {
    icon: "26_members.png",
    description: "The people behind NEST",
  },
  "/sponsors": {
    icon: "28_sponsors.png",
    description: "The support behind our work",
  },
};
