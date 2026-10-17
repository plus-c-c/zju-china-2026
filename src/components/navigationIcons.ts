// Keep the supplied filenames unchanged; encode spaces only for the URL.
const uploadedIconBase = (
  import.meta.env.VITE_NAV_ICON_BASE_URL ||
  "https://static.igem.wiki/teams/6102/wiki/title"
).replace(/\/$/, "");

export function navigationIcon(filename: string) {
  return `${uploadedIconBase}/${encodeURIComponent(filename)}`;
}

export const pageDetails: Record<
  string,
  { icon: string; description: string }
> = {
  "/description": {
    icon: "03_description.png",
    description: "The story behind our project",
  },
  "/design": {
    icon: "04-design.png",
    description: "How our system is designed",
  },
  "/proof-of-concept": {
    icon: "05_proof_of_concept.png",
    description: "Explore our proof of concept",
  },
  "/implementation": {
    icon: "06_implementation.png",
    description: "From the lab to application",
  },
  "/future-plan": {
    icon: "07-future plan.png",
    description: "Where we go next",
  },
  "/contribution": {
    icon: "08_contribution.png",
    description: "What we share with the community",
  },
  "/experiments": {
    icon: "11_experiment_result.png",
    description: "Our experimental work",
  },
  "/results": {
    icon: "11_experiment_result.png",
    description: "Explore our findings",
  },
  "/protocol": {
    icon: "12_protocol.png",
    description: "Methods, step by step",
  },
  "/parts": {
    icon: "13_parts.png",
    description: "Our biological building blocks",
  },
  "/notebook": {
    icon: "25_notebook.png",
    description: "Follow our lab journey",
  },
  "/safety": {
    icon: "14_safety.png",
    description: "Safety throughout our work",
  },
  "/hardware": { icon: "16_hardware.png", description: "Explore our hardware" },
  "/software": { icon: "17_software.png", description: "Explore our software" },
  "/model": {
    icon: "18_model.png",
    description: "A closer look at our models",
  },
  "/human-practices": {
    icon: "20_integrated_human_practices.png",
    description: "Connecting our project with people",
  },
  "/entrepreneurship": {
    icon: "21_entrepreneurship.png",
    description: "Explore the business perspective",
  },
  "/education": {
    icon: "22_education.png",
    description: "Sharing science and ideas",
  },
  "/members": {
    icon: "26_members.png",
    description: "Meet the people behind the project",
  },
  "/attributions": {
    icon: "27_attributions.png",
    description: "Recognising every contribution",
  },
  "/sponsors": {
    icon: "28_sponsors.png",
    description: "The support behind our team",
  },
};
