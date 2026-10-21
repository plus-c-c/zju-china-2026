export const JOURNEY_STAGES = [
  "Research & development",
  "Production & delivery",
  "Adoption & access",
  "Use",
  "Impact & follow-up",
] as const;

const oldJourneyDefaults = [
  "Users",
  "Research & development",
  "Production & delivery",
  "Adoption & access",
  "Use",
  "Impact & follow-up",
];

const legacyDefaults = [
  "Patient",
  "R&D",
  "Manufacturing",
  "Market access & entrepreneurship",
  "Treatment",
  "Rehabilitation",
];

const aliases: Record<string, string> = {
  "R&D": JOURNEY_STAGES[0],
  Manufacturing: JOURNEY_STAGES[1],
  "Market access & entrepreneurship": JOURNEY_STAGES[2],
  Treatment: JOURNEY_STAGES[3],
  Rehabilitation: JOURNEY_STAGES[4],
  "Market access": JOURNEY_STAGES[2],
};

export const standardStageName = (name: string): string =>
  aliases[name] || name;

/** Upgrade only unchanged starters. Keep custom maps and every stage ID. */
export function upgradeDefaultStages(stages: { id: string; name: string }[]) {
  if (
    stages.length === oldJourneyDefaults.length &&
    stages.every((stage, index) => stage.name === oldJourneyDefaults[index])
  ) {
    return stages.slice(1);
  }
  if (
    stages.length === legacyDefaults.length &&
    stages.every((stage, index) => stage.name === legacyDefaults[index])
  ) {
    return stages.slice(1).map((stage, index) => ({
      ...stage,
      name: JOURNEY_STAGES[index],
    }));
  }
  return stages;
}
