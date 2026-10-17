import { useLayoutEffect, useRef, useState } from "react";
import type { Group, Part } from "./engineering/group";
import { DbtlStepper, STEP_DVH } from "./engineering/DbtlStepper";
import { EngineeringReferences } from "./engineering/EngineeringReferences";
import { gagRetentionGroup } from "./engineering/groups/gag-retention";
import { mitochondrialTherapyGroup } from "./engineering/groups/mitochondrial-therapy";
import { nestSoftwareGroup } from "./engineering/groups/nest-software";
import { proteinHydrogelModelingGroup } from "./engineering/groups/protein-hydrogel-modeling";
import { selpHydrogelsGroup } from "./engineering/groups/selp-hydrogels-and-ligation";
import { selpMdPlatformGroup } from "./engineering/groups/selp-md-platform";
import { tvnMagneticBindingGroup } from "./engineering/groups/tvn-magnetic-binding";
import "./engineering.css";

/**
 * Engineering page — layout and arrangement rules only. Each group's content
 * lives in its own file under `engineering/groups/` and is referenced here.
 *
 *   - four sections following the 2025 ZJU-China engineering page: Project
 *     Design / Wet Lab / Dry Lab / Human Practices;
 *   - Wet Lab is split into four groups following the Notebook page, with
 *     SELP hydrogels and the ligation system merged into one group;
 *   - each group's level-3 tab row is "Introduction | sub-modules |
 *     Conclusion": the Introduction tab hosts the group-level lead (总引导段)
 *     and the Conclusion tab the group-level outlook (总展望段), while each
 *     sub-module tab shows only its own cycles, numbered from 1 again;
 *   - Project Design and Human Practices stay blank until their content is
 *     added.
 */
interface Section {
  key: string;
  label: string;
  groups: Group[];
}

/**
 * Focus view — a code-level switch (no visible control on the page).
 *
 * When true: every lead / outlook block and every heading except the shared
 * References heading are hidden, and the level-3 tabs move above the DBTL
 * panel, centred like the Cycle buttons below — so the tab row, the panel
 * and the cycle buttons together are exactly as tall as the DBTL ring.
 * Flip this constant and rebuild to switch the view.
 */
const FOCUS_MODE = true;

const SECTIONS: Section[] = [
  { key: "project-design", label: "Project Design", groups: [] },
  {
    key: "wet-lab",
    label: "Wet Lab",
    groups: [
      selpHydrogelsGroup,
      gagRetentionGroup,
      tvnMagneticBindingGroup,
      mitochondrialTherapyGroup,
    ],
  },
  {
    key: "dry-lab",
    label: "Dry Lab",
    groups: [
      proteinHydrogelModelingGroup,
      selpMdPlatformGroup,
      nestSoftwareGroup,
    ],
  },
  { key: "human-practices", label: "Human Practices", groups: [] },
];

export function Engineering() {
  const [activeKey, setActiveKey] = useState("wet-lab");
  const [groupIndex, setGroupIndex] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const focusMode = FOCUS_MODE;
  const prevNavRef = useRef({ activeKey, groupIndex, tabIndex });

  // Any level switch (section / group / tab) returns to the very start of
  // the sequence — Cycle 1 Design: the page scrolls back to the top of the
  // new runway before paint, so the stepper mounts with progress 0 and the
  // scroll mapping cannot jump to a stale step. (Comparing against the
  // previous values keeps the very first render — and dev double-invocation —
  // from scrolling the page on load.)
  useLayoutEffect(() => {
    const prev = prevNavRef.current;
    const changed =
      prev.activeKey !== activeKey ||
      prev.groupIndex !== groupIndex ||
      prev.tabIndex !== tabIndex;
    prevNavRef.current = { activeKey, groupIndex, tabIndex };
    if (!changed) return;
    const runway = document.querySelector(".eng-runway, .dbtl-runway");
    if (!runway) return;
    const top = runway.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: "instant" });
  }, [activeKey, groupIndex, tabIndex]);
  const activeSection =
    SECTIONS.find((section) => section.key === activeKey) ?? SECTIONS[0];
  const activeGroup =
    activeSection.groups[groupIndex] ?? activeSection.groups[0];

  const selectSection = (key: string) => {
    setActiveKey(key);
    setGroupIndex(0);
    setTabIndex(0);
  };

  const selectGroup = (index: number) => {
    setGroupIndex(index);
    setTabIndex(0);
  };

  // Level-3 tabs: Introduction (group lead) → sub-modules → Conclusion
  // (group outlook). They exist when the whole group is one module
  // (single-module group, possibly split into several sub-modules).
  const introModule =
    activeGroup &&
    new Set(activeGroup.parts.map((part) => part.module)).size === 1
      ? activeGroup.parts[0].module
      : undefined;
  const hasIntro = Boolean(
    activeGroup &&
    (activeGroup.heading ||
      activeGroup.lead ||
      (introModule && (introModule.introTitle || introModule.intro))),
  );
  const hasConclusion = Boolean(introModule?.outro);

  type Tab =
    | { kind: "intro" }
    | { kind: "part"; part: Part }
    | { kind: "conclusion" };
  const allTabs: Tab[] = activeGroup
    ? [
        ...(hasIntro ? [{ kind: "intro" } as Tab] : []),
        ...activeGroup.parts.map((part) => ({ kind: "part", part }) as Tab),
        ...(hasConclusion ? [{ kind: "conclusion" } as Tab] : []),
      ]
    : [];
  // Focus view keeps only the sub-module tabs (leads and outlooks are hidden).
  const tabs = focusMode
    ? allTabs.filter((tab) => tab.kind === "part")
    : allTabs;
  const activeTab = tabs[tabIndex] ?? tabs[0];
  const activePart = activeTab?.kind === "part" ? activeTab.part : undefined;

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
  const partHasStepper = Boolean(
    stepperModule && stepperModule.cycles.length > 0,
  );
  const stepCount = stepperModule
    ? stepperModule.cycles.length * 4 + (stepperModule.infos?.length ?? 0)
    : 0;
  // In focus view the tab row moves into the stepper card (above the panel);
  // it stays inline only when there is no stepper to host it.
  const navInline = !focusMode || !partHasStepper;

  const tabNav = tabs.map((tab, index) => (
    <button
      key={tab.kind === "part" ? tab.part.label : tab.kind}
      type="button"
      className={`${focusMode ? "dbtl-subnav-button" : "eng-partnav-button"} ${
        tabIndex === index ? "active" : ""
      }`}
      aria-pressed={tabIndex === index}
      onClick={() => setTabIndex(index)}
    >
      {tab.kind === "intro"
        ? "Introduction"
        : tab.kind === "conclusion"
          ? "Conclusion"
          : tab.part.label}
    </button>
  ));

  const content = (
    <>
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
          {navInline && <div className="eng-partnav">{tabNav}</div>}
          {activeTab?.kind === "intro" && (
            <>
              {introModule && (
                <h2 className="mt-4 mb-3">{introModule.title}</h2>
              )}
              {introModule?.introTitle && (
                <h3 className="mt-5 mb-3">{introModule.introTitle}</h3>
              )}
              {introModule?.intro}
              {activeGroup.heading && (
                <h3 className="mt-5 mb-3">{activeGroup.heading}</h3>
              )}
              {activeGroup.lead}
            </>
          )}
          {activeTab?.kind === "part" && activePart && stepperModule && (
            <>
              {!focusMode && (
                <>
                  <h2 className="mt-4 mb-3">{activePart.module.title}</h2>
                  {/* Fallback for groups without a dedicated Introduction
                          tab: the module-level lead stays on the part view. */}
                  {!hasIntro && (
                    <>
                      {activePart.module.introTitle && (
                        <h3 className="mt-5 mb-3">
                          {activePart.module.introTitle}
                        </h3>
                      )}
                      {activePart.module.intro}
                      {activeGroup.heading && (
                        <h3 className="mt-5 mb-3">{activeGroup.heading}</h3>
                      )}
                      {activeGroup.lead}
                    </>
                  )}
                  {activePart.heading && (
                    <h3 className="mt-5 mb-3">{activePart.heading}</h3>
                  )}
                  {activePart.lead}
                </>
              )}
              {stepperModule.cycles.length > 0 && (
                <DbtlStepper
                  key={`${activePart.module.title}-${activePart.label}`}
                  module={stepperModule}
                  focus={focusMode}
                  topNav={navInline ? undefined : <>{tabNav}</>}
                />
              )}
            </>
          )}
          {activeTab?.kind === "conclusion" && introModule && (
            <>
              <h2 className="mt-4 mb-3">{introModule.title}</h2>
              {introModule.outro}
            </>
          )}
        </>
      )}
    </>
  );

  return (
    <div className="row mt-4 mb-5">
      <div className="col-12">
        <article>
          {focusMode && stepCount > 0 ? (
            <div
              className="eng-runway"
              style={{
                height: `calc(${100 + Math.max(0, stepCount - 1) * STEP_DVH}dvh)`,
              }}
            >
              <div className="eng-pin">
                <div className="eng-aggregate">{content}</div>
              </div>
            </div>
          ) : focusMode ? (
            <div className="eng-aggregate">{content}</div>
          ) : (
            content
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
