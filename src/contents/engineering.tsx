import { useState, type ReactNode } from "react";
import type { DbtlModule } from "./engineering/dbtl";
import { DbtlStepper } from "./engineering/DbtlStepper";
import { EngineeringReferences } from "./engineering/EngineeringReferences";
import { anisotropyModule } from "./engineering/engineering-anisotropy";
import { gagRetentionModule } from "./engineering/engineering-gag-retention";
import { ligationModule } from "./engineering/engineering-ligation-system";
import { mitochondriaModule } from "./engineering/engineering-mitochondria";
import { scaffoldModule } from "./engineering/engineering-scaffold";
import {
  softwareIModule,
  softwareIIModule,
} from "./engineering/engineering-software";
import "./engineering.css";

/**
 * Engineering page — four sections following the 2025 ZJU-China engineering
 * page: Project Design / Wet Lab / Dry Lab / Human Practices.
 *
 *   - Wet Lab is split into four groups following the Notebook page, with
 *     SELP hydrogels and the ligation system merged into one group;
 *   - each group lists its sub-modules ("parts") above the DBTL stepper:
 *     e.g. GAG retention → Protein expression / Functional validation, and
 *     SELP Hydrogels and Ligation System → Hydrogel scaffold / Ligation
 *     system;
 *   - switching a part shows only that part's cycles, numbered from 1
 *     again within the part;
 *   - Project Design and Human Practices stay blank until their content is
 *     added.
 */
interface Part {
  label: string;
  module: DbtlModule;
  /** Optional sub-module heading shown above the stepper. */
  heading?: string;
  /** Optional lead content for the sub-module (its section intro). */
  lead?: ReactNode;
  /** [start, end) slice of the module's cycles that belongs to this part. */
  cycleSlice?: [number, number];
  /** Render the module outro below this part (defaults to whole-module parts). */
  showOutro?: boolean;
}

interface Group {
  label: string;
  parts: Part[];
}

interface Section {
  key: string;
  label: string;
  groups: Group[];
}

const infoContent = (module: DbtlModule, title: string): ReactNode =>
  module.infos?.find((info) => info.title === title)?.content;

const SECTIONS: Section[] = [
  { key: "project-design", label: "Project Design", groups: [] },
  {
    key: "wet-lab",
    label: "Wet Lab",
    groups: [
      {
        label: "SELP Hydrogels and Ligation System",
        parts: [
          { label: "Hydrogel scaffold", module: scaffoldModule },
          { label: "Ligation system", module: ligationModule },
        ],
      },
      {
        label: "GAG Retention Module",
        parts: [
          {
            label: "Protein expression",
            module: gagRetentionModule,
            cycleSlice: [0, 2],
            heading: "Engineering goal",
            lead: infoContent(gagRetentionModule, "Engineering goal"),
          },
          {
            label: "Functional validation",
            module: gagRetentionModule,
            cycleSlice: [2, 4],
            heading: "DogTag ligation-interface validation",
            lead: infoContent(
              gagRetentionModule,
              "DogTag ligation-interface validation",
            ),
            showOutro: true,
          },
        ],
      },
      {
        label: "TVN Magnetic Binding Module",
        parts: [
          {
            label: "Selection of an alignment strategy",
            module: anisotropyModule,
            cycleSlice: [0, 3],
            lead: infoContent(
              anisotropyModule,
              "1. Selection of an alignment strategy",
            ),
          },
          {
            label: "Coupling magnetic nanoparticles to SELP",
            module: anisotropyModule,
            cycleSlice: [3, 5],
            lead: infoContent(
              anisotropyModule,
              "2. Coupling magnetic nanoparticles to SELP",
            ),
          },
          {
            label: "Protein expression and functional testing",
            module: anisotropyModule,
            cycleSlice: [5, 9],
            lead: infoContent(
              anisotropyModule,
              "3. Protein expression and functional testing",
            ),
            showOutro: true,
          },
        ],
      },
      {
        label: "Mitochondrial Therapy Module",
        parts: [
          {
            label: "Construction of a mitochondrial delivery carrier",
            module: mitochondriaModule,
            cycleSlice: [0, 2],
          },
          {
            label: "Validation of delivery-related functions",
            module: mitochondriaModule,
            cycleSlice: [2, 5],
          },
          {
            label: "Evaluation of cellular delivery performance",
            module: mitochondriaModule,
            cycleSlice: [5, 7],
            showOutro: true,
          },
        ],
      },
    ],
  },
  {
    key: "dry-lab",
    label: "Dry Lab",
    groups: [
      {
        label: "SELP MD platform",
        parts: [{ label: "Simulation platform", module: softwareIModule }],
      },
      {
        label: "NEST Software",
        parts: [{ label: "NEST Software", module: softwareIIModule }],
      },
    ],
  },
  { key: "human-practices", label: "Human Practices", groups: [] },
];

export function Engineering() {
  const [activeKey, setActiveKey] = useState("wet-lab");
  const [groupIndex, setGroupIndex] = useState(0);
  const [partIndex, setPartIndex] = useState(0);
  const activeSection =
    SECTIONS.find((section) => section.key === activeKey) ?? SECTIONS[0];
  const activeGroup =
    activeSection.groups[groupIndex] ?? activeSection.groups[0];
  const activePart = activeGroup?.parts[partIndex] ?? activeGroup?.parts[0];

  const selectSection = (key: string) => {
    setActiveKey(key);
    setGroupIndex(0);
    setPartIndex(0);
  };

  const selectGroup = (index: number) => {
    setGroupIndex(index);
    setPartIndex(0);
  };

  // A part shows only its own cycles; the stepper numbers them from 1 again.
  const stepperModule = activePart
    ? activePart.cycleSlice
      ? {
          ...activePart.module,
          cycles: activePart.module.cycles.slice(
            activePart.cycleSlice[0],
            activePart.cycleSlice[1],
          ),
          infos: [],
        }
      : activePart.module
    : undefined;
  const showOutro =
    activePart &&
    (activePart.showOutro ?? activePart.cycleSlice === undefined) &&
    activePart.module.outro;

  return (
    <div className="row mt-4 mb-5">
      <div className="col-12">
        <article>
          <div className="eng-module-nav">
            {SECTIONS.map((section) => (
              <button
                key={section.key}
                type="button"
                className={`eng-module-button ${activeKey === section.key ? "active" : ""}`}
                aria-pressed={activeKey === section.key}
                onClick={() => selectSection(section.key)}
              >
                {section.label}
              </button>
            ))}
          </div>
          {activeSection.groups.length > 1 && (
            <div className="eng-subnav">
              {activeSection.groups.map((group, index) => (
                <button
                  key={group.label}
                  type="button"
                  className={`eng-subnav-button ${groupIndex === index ? "active" : ""}`}
                  aria-pressed={groupIndex === index}
                  onClick={() => selectGroup(index)}
                >
                  {group.label}
                </button>
              ))}
            </div>
          )}
          {activeGroup && (
            <>
              <div className="eng-partnav">
                {activeGroup.parts.map((part, index) => (
                  <button
                    key={part.label}
                    type="button"
                    className={`eng-partnav-button ${partIndex === index ? "active" : ""}`}
                    aria-pressed={partIndex === index}
                    onClick={() => setPartIndex(index)}
                  >
                    {part.label}
                  </button>
                ))}
              </div>
              {activePart && stepperModule && (
                <>
                  <h2 className="mt-4 mb-3">{activePart.module.title}</h2>
                  {activePart.module.introTitle && (
                    <h3 className="mt-5 mb-3">
                      {activePart.module.introTitle}
                    </h3>
                  )}
                  {activePart.module.intro}
                  {activePart.heading && (
                    <h3 className="mt-5 mb-3">{activePart.heading}</h3>
                  )}
                  {activePart.lead}
                  {stepperModule.cycles.length > 0 && (
                    <DbtlStepper
                      key={`${activePart.module.title}-${activePart.label}`}
                      module={stepperModule}
                    />
                  )}
                  {showOutro && activePart.module.outro}
                </>
              )}
            </>
          )}
          {/* The shared references list accompanies sections that have
              content; Project Design and Human Practices stay blank until
              their modules are added. */}
          {activeSection.groups.length > 0 && <EngineeringReferences />}
        </article>
      </div>
    </div>
  );
}
