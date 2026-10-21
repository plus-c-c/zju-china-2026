import {
  Design,
  ProofOfConcept,
  Implementation,
  FuturePlan,
  Protocol,
  Parts,
  Sponsors,
  Contribution,
  Description,
  Engineering,
  Experiments,
  Home,
  HumanPractices,
  Notebook,
  Results,
  SafetyAndSecurity,
  Members,
  Collaboration,
  Education,
  Entrepreneurship,
  Hardware,
  Inclusivity,
  Measurement,
  Model,
  Plant,
  Software,
  Sustainability,
} from "./contents";

interface Base {
  name: string | undefined;
}

class Folder implements Base {
  name: string | undefined;
  folder: Page[] | undefined;
}

class Page implements Base {
  name: string | undefined;
  title: string | undefined;
  path: string | undefined;
  component: React.FC | undefined;
}

const Pages: (Page | Folder)[] = [
  {
    name: "Home",
    title: "",
    path: "/",
    component: Home,
  },
  {
    name: "Project",
    folder: [
      {
        name: "Description",
        title: "Description",
        path: "/description",
        component: Description,
      },
      {
        name: "Design",
        title: "Design",
        path: "/design",
        component: Design,
      },
      {
        name: "Proof of Concept",
        title: "Proof of Concept",
        path: "/proof-of-concept",
        component: ProofOfConcept,
      },
      {
        name: "Implementation",
        title: "Implementation",
        path: "/implementation",
        component: Implementation,
      },
      {
        name: "Future Plan",
        title: "Future Plan",
        path: "/future-plan",
        component: FuturePlan,
      },
      {
        name: "Contribution",
        title: "Contribution",
        path: "/contribution",
        component: Contribution,
      },
    ],
  },
  {
    name: "Engineering",
    title: "Engineering",
    path: "/engineering",
    component: Engineering,
  },
  {
    name: "Wet Lab",
    folder: [
      {
        name: "Experiments",
        title: "Experiments",
        path: "/experiments",
        component: Experiments,
      },
      {
        name: "Results",
        title: "Results",
        path: "/results",
        component: Results,
      },
      {
        name: "Protocol",
        title: "Protocol",
        path: "/protocol",
        component: Protocol,
      },
      {
        name: "Parts",
        title: "Parts",
        path: "/parts",
        component: Parts,
      },
      {
        name: "Notebook",
        title: "Notebook",
        path: "/notebook",
        component: Notebook,
      },
      {
        name: "Safety and Security",
        title: "Safety and Security",
        path: "/safety-and-security",
        component: SafetyAndSecurity,
      },
    ],
  },
  {
    name: "Dry Lab",
    folder: [
      {
        name: "Hardware",
        title: "Hardware",
        path: "/hardware",
        component: Hardware,
      },
      {
        name: "Software",
        title: "Software",
        path: "/software",
        component: Software,
      },
      {
        name: "Model",
        title: "Model",
        path: "/model",
        component: Model,
      },
    ],
  },
  {
    name: "Engagement",
    folder: [
      {
        name: "Integrated Human Practices",
        title: "Integrated Human Practices",
        path: "/human-practices",
        component: HumanPractices,
      },
      {
        name: "Entrepreneurship",
        title: "Entrepreneurship",
        path: "/entrepreneurship",
        component: Entrepreneurship,
      },
      {
        name: "Education",
        title: "Education",
        path: "/education",
        component: Education,
      },
      {
        name: "Collaboration",
        title: "Collaboration",
        path: "/collaboration",
        component: Collaboration,
      },
    ],
  },
  {
    name: "Team",
    folder: [
      {
        name: "Members",
        title: "Members",
        path: "/members",
        component: Members,
      },
      {
        name: "Sponsors",
        title: "Sponsors",
        path: "/sponsors",
        component: Sponsors,
      },
    ],
  },
];

// Keep existing pages accessible without listing them in the navigation.
export const unlistedPages: Page[] = [
  {
    name: "Measurement",
    title: "Measurement",
    path: "/measurement",
    component: Measurement,
  },
  {
    name: "Plant",
    title: "Plant",
    path: "/plant",
    component: Plant,
  },
  {
    name: "Inclusivity",
    title: "Inclusivity",
    path: "/inclusivity",
    component: Inclusivity,
  },
  {
    name: "Sustainability",
    title: "Sustainability",
    path: "/sustainability",
    component: Sustainability,
  },
];

export default Pages;
