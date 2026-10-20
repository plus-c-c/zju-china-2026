import type { DbtlPhase } from "./dbtl";
import { projectDesignMarkdown } from "./project-design-content";
import type { SeedPhase } from "./seed";

type OuterCopy = Record<Exclude<SeedPhase, "Engineering">, string>;
type EngineeringCopy = Record<DbtlPhase, string>[];

const PHASES: DbtlPhase[] = ["Design", "Build", "Test", "Learn"];

function section(start: string, end?: string) {
  const startIndex = projectDesignMarkdown.indexOf(start);
  if (startIndex < 0)
    throw new Error(`Missing project-design section: ${start}`);
  const endIndex = end ? projectDesignMarkdown.indexOf(end, startIndex) : -1;
  return projectDesignMarkdown
    .slice(startIndex, endIndex < 0 ? undefined : endIndex)
    .trim();
}

function withoutFirstHeading(value: string) {
  return value.replace(/^#{2,4} .+\n+/, "").trim();
}

function parseStandardCycle(value: string): Record<DbtlPhase, string> {
  const result = Object.fromEntries(
    PHASES.map((phase) => [phase, ""]),
  ) as Record<DbtlPhase, string>;
  const matches = Array.from(
    value.matchAll(/^### (Design|Build|Test|Learn)(?:\s+—\s+(.+))?$/gm),
  );

  matches.forEach((match, index) => {
    const phase = match[1] as DbtlPhase;
    const bodyStart = (match.index ?? 0) + match[0].length;
    const bodyEnd = matches[index + 1]?.index ?? value.length;
    const title = match[2] ? `### ${match[2]}\n\n` : "";
    result[phase] = `${title}${value.slice(bodyStart, bodyEnd).trim()}`.trim();
  });
  return result;
}

function parseFourthCycle(value: string): Record<DbtlPhase, string> {
  const result = Object.fromEntries(
    PHASES.map((phase) => [phase, ""]),
  ) as Record<DbtlPhase, string>;
  const firstModule = value.search(/^### 4\.1 /m);
  const intro = withoutFirstHeading(value.slice(0, firstModule));
  const moduleMatches = Array.from(value.matchAll(/^### (4\.\d .+)$/gm));

  moduleMatches.forEach((moduleMatch, moduleIndex) => {
    const moduleStart = (moduleMatch.index ?? 0) + moduleMatch[0].length;
    const moduleEnd = moduleMatches[moduleIndex + 1]?.index ?? value.length;
    const moduleBody = value.slice(moduleStart, moduleEnd);
    const phaseMatches = Array.from(
      moduleBody.matchAll(/^#### (Design|Build|Test|Learn)$/gm),
    );

    phaseMatches.forEach((phaseMatch, phaseIndex) => {
      const phase = phaseMatch[1] as DbtlPhase;
      const bodyStart = (phaseMatch.index ?? 0) + phaseMatch[0].length;
      const bodyEnd = phaseMatches[phaseIndex + 1]?.index ?? moduleBody.length;
      const body = moduleBody.slice(bodyStart, bodyEnd).trim();
      result[phase] = [result[phase], `### ${moduleMatch[1]}`, body]
        .filter(Boolean)
        .join("\n\n");
    });
  });

  result.Design = [intro, result.Design].filter(Boolean).join("\n\n");
  return result;
}

function cycleTitle(value: string, cycleIndex: number) {
  const title = value.match(/^## Cycle \d+\.\s*(.+)$/m)?.[1] ?? "";
  return `Cycle ${cycleIndex + 1}${title ? ` — ${title}` : ""}`;
}

function buildCopy(): {
  outer: OuterCopy;
  engineering: EngineeringCopy;
  cycleTitles: string[];
} {
  const spark = withoutFirstHeading(
    section("## S | Spark a Question:", "## E | Explore & Analyze:"),
  );
  const explore = withoutFirstHeading(
    section(
      "## E | Explore & Analyze:",
      "## E | Engineering & Implementation:",
    ),
  );
  const engineeringIntro = withoutFirstHeading(
    section("## E | Engineering & Implementation:", "## Cycle 1."),
  );
  const cycleSections = [
    section("## Cycle 1.", "## Cycle 2."),
    section("## Cycle 2.", "## Cycle 3."),
    section("## Cycle 3.", "## Cycle 4."),
    section("## Cycle 4.", "## System Integration:"),
  ];
  const cycle1 = parseStandardCycle(cycleSections[0]);
  const cycle2 = parseStandardCycle(cycleSections[1]);
  const cycle3 = parseStandardCycle(cycleSections[2]);
  const cycle4 = parseFourthCycle(cycleSections[3]);
  const integration = section(
    "## System Integration:",
    "## D | Dialogue & Feedback:",
  ).replace(/^## /, "### ");
  const dialogue = withoutFirstHeading(
    section("## D | Dialogue & Feedback:").replace("（使用“流程图”的css）", ""),
  );

  cycle1.Design = [engineeringIntro, cycle1.Design]
    .filter(Boolean)
    .join("\n\n");
  cycle4.Learn = [cycle4.Learn, integration].filter(Boolean).join("\n\n");

  return {
    outer: { Spark: spark, Explore: explore, Dialogue: dialogue },
    engineering: [cycle1, cycle2, cycle3, cycle4],
    cycleTitles: cycleSections.map(cycleTitle),
  };
}

export const projectDesignCopy = buildCopy();
