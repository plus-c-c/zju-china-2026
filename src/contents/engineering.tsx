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
import { MathFormula } from "../components/MathFormula";
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

const hydrogelModelingModule: DbtlModule = {
  title: "DBTL Cycles for Protein Hydrogel Modeling",
  intro: (
    <p>
      {
        "Through six iterations of the Design–Build–Test–Learn cycle, this study established an approach for comparing protein crosslinked networks with wet-lab results."
      }
    </p>
  ),
  cycles: [
    {
      title: "DBTL Cycle 1: Construction of the Initial Crosslinked System",
      content: {
        Design: (
          <p>
            {
              " Construct a crosslinked system with a protein concentration close to the experimental concentration."
            }
          </p>
        ),
        Build: (
          <p>
            {
              " Coarse-grain the proteins, assemble a solvated system containing 32 chains, adjust the concentration to approximately 100 mg/mL, and form an initial network through guided site approach, sequential crosslinking, and short relaxation runs."
            }
          </p>
        ),
        Test: (
          <p>
            {
              " Examine crosslink distances, intrachain deformation, and connectivity, revealing disconnected chain clusters."
            }
          </p>
        ),
        Learn: (
          <p>
            {
              " Include connectivity among all chains as a network-construction objective in the next cycle."
            }
          </p>
        ),
      },
    },
    {
      title: "DBTL Cycle 2: Optimization of the Percolating Network",
      content: {
        Design: (
          <p>
            {
              " Establish a network connecting all 32 chains and exhibiting periodic wrapping along the Z direction."
            }
          </p>
        ),
        Build: (
          <p>
            {
              " Prioritize connections between distinct chain clusters and guide candidate sites into proximity when necessary, ultimately retaining 34 and 39 permanent crosslinks in 2KY5 and 2KY10, respectively."
            }
          </p>
        ),
        Test: (
          <p>
            {
              " Verify network connectivity, periodic wrapping, and crosslink geometry."
            }
          </p>
        ),
        Learn: (
          <p>
            {
              " The network topology meets the construction requirements, but its mechanical response still requires assessment through molecular dynamics sampling."
            }
          </p>
        ),
      },
    },
    {
      title:
        "DBTL Cycle 3: Molecular Dynamics Sampling and Stability Assessment",
      content: {
        Design: (
          <p>
            {
              " Evaluate the simulation conditions and the stability of the mechanical response following network relaxation."
            }
          </p>
        ),
        Build: (
          <p>
            {
              " Fix the crosslink topology, perform sampling in three branches—A, B, and C—and progressively extend each branch to 4 ns."
            }
          </p>
        ),
        Test: (
          <p>
            {
              " Temperature, concentration, and crosslink distances remain within normal ranges, but the calculated stiffness still exhibits temporal drift and differences between branches."
            }
          </p>
        ),
        Learn: (
          <p>
            {
              " Distinguish simulation stability from mechanical convergence. Stop further extensions after completing the finite sampling runs and proceed to structural and numerical sensitivity analyses."
            }
          </p>
        ),
      },
    },
    {
      title: "DBTL Cycle 4: Static Modeling and Numerical Verification",
      content: {
        Design: (
          <p>
            {
              " Obtain reproducible mechanical responses for fixed configurations."
            }
          </p>
        ),
        Build: (
          <p>
            {
              " Retain the existing networks, the 0.6 nm contact threshold, the 24-point cap, and the total interface weight. Correct the dependence of contact selection on input-list order and perform calculations using coordinates from binary checkpoint files."
            }
          </p>
        ),
        Test: (
          <p>
            {
              " Examine contact distributions, soft modes, and sensitivity to coordinate precision. Stability improves markedly after an equally weighted comparison of the six fixed endpoint configurations."
            }
          </p>
        ),
        Learn: (
          <p>
            {
              " Preserve structural differences and adopt a shared empirical mapping for subsequent calibration."
            }
          </p>
        ),
      },
    },
    {
      title: "DBTL Cycle 5: Shared Empirical Calibration",
      content: {
        Design: (
          <p>
            {
              " Match the experimental mean values of both systems without changing the networks or the rules of the static model."
            }
          </p>
        ),
        Build: (
          <p>
            {" Apply the shared relationship "}
            <MathFormula>{"E_{\\mathrm{emp}}=aE_0+"}</MathFormula>
            {
              ", determining the parameters from the equally weighted means of the three branches for each system."
            }
          </p>
        ),
        Test: (
          <p>
            {" Obtain "}
            <MathFormula>{"a\\approx1.8953"}</MathFormula>
            {" and "}
            <MathFormula>{"b\\approx19.7936\\ \\mathrm{kPa}"}</MathFormula>
            {
              ", matching the mean values to 30.4 and 40.0 kPa, respectively, while retaining the original results and the deviations of individual branches."
            }
          </p>
        ),
        Learn: (
          <p>
            {
              " Establish the final approach: “MD-derived structures—compression response—shared empirical calibration.” Because the current calibration uses only the experimental mean values of 2KY5 and 2KY10, a new system excluded from fitting is still needed to assess predictive performance."
            }
          </p>
        ),
      },
    },
    {
      title: "DBTL Cycle 6: Independent Predictive Validation Using 2KY16",
      content: {
        Design: (
          <p>
            {
              " Use 2KY16 as a new system excluded from parameter fitting to assess the transferability of the existing model."
            }
          </p>
        ),
        Build: (
          <p>
            {
              " Subsequently construct the 2KY16 structure and crosslinked network, apply the same calculation rules, and freeze the existing shared calibration parameters to obtain predictions."
            }
          </p>
        ),
        Test: (
          <p>
            {
              " Obtain wet-state experimental data for 2KY16 under the same conditions, compare the predicted and experimental values, and evaluate the relative error and differences between branches."
            }
          </p>
        ),
        Learn: (
          <p>
            {
              " Agreement between predictions and experiments would support the applicability of the model to a new system."
            }
          </p>
        ),
      },
    },
  ],
};

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
        label: "Protein Hydrogel Modeling",
        parts: [{ label: "DBTL cycles", module: hydrogelModelingModule }],
      },
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
