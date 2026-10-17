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
    description: "The context behind our project",
  },
  "/design": {
    icon: "04-design.png",
    description: "How our system is designed",
  },
  "/proof-of-concept": {
    icon: "05_proof_of_concept.png",
    description: "Putting the concept to the test",
  },
  "/implementation": {
    icon: "06_implementation.png",
    description: "From the lab to application",
  },
  "/future-plan": {
    icon: "07-future plan.png",
    description: "The next steps for our project",
  },
  "/contribution": {
    icon: "08_contribution.png",
    description: "Resources for the iGEM community",
  },
  "/experiments": {
    icon: "11_experiment_result.png",
    description: "Explore our experimental work",
  },
  "/results": {
    icon: "11_experiment_result.png",
    description: "Platform and function in focus",
  },
  "/protocol": {
    icon: "12_protocol.png",
    description: "Methods and step-by-step procedures",
  },
  "/parts": {
    icon: "13_parts.png",
    description: "The biological parts in our system",
  },
  "/notebook": {
    icon: "25_notebook.png",
    description: "Follow our work in the lab",
  },
  "/safety": {
    icon: "14_safety.png",
    description: "Responsible work in the laboratory",
  },
  "/hardware": {
    icon: "16_hardware.png",
    description: "Tools built for our project",
  },
  "/software": {
    icon: "17_software.png",
    description: "Our computational tools",
  },
  "/model": {
    icon: "18_model.png",
    description: "Understanding our system through models",
  },
  "/human-practices": {
    icon: "20_integrated_human_practices.png",
    description: "Listening, learning and responding",
  },
  "/entrepreneurship": {
    icon: "21_entrepreneurship.png",
    description: "Exploring a path to market",
  },
  "/education": {
    icon: "22_education.png",
    description: "Sharing science with our communities",
  },
  "/members": {
    icon: "26_members.png",
    description: "Meet the people behind ZJU-China",
  },
  "/attributions": {
    icon: "27_attributions.png",
    description: "The people and support behind the work",
  },
  "/sponsors": {
    icon: "28_sponsors.png",
    description: "The partners supporting our team",
  },
};
