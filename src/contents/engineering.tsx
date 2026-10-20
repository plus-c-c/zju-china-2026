import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Group, Part } from "./engineering/group";
import { DbtlStepper } from "./engineering/DbtlStepper";
import {
  buildSteps,
  sequenceSpan,
  STEP_DVH,
  type Step,
} from "./engineering/steps";
import { STEPPER_STEP_PX } from "../components/stepperWheel";
import { DBTL_TAB_SCROLL_NUDGE } from "./engineering/ringStage";
import type { DbtlModule } from "./engineering/dbtl";
import { SeedStepper } from "./engineering/SeedStepper";
import {
  buildSeedSteps,
  type SeedModule,
  type SeedStep,
} from "./engineering/seed";
import { EngineeringReferences } from "./engineering/EngineeringReferences";
import { resolveEngineeringLayout } from "./engineering/layout";
import { TocPanel, type TocEntry } from "../components/toc";
import {
  PROJECT_DESIGN_STEP_COUNT,
  ProjectDesignStepper,
} from "./engineering/ProjectDesignStepper";
import { gagRetentionGroup } from "./engineering/groups/gag-retention";
import { hardwareGroup } from "./engineering/groups/hardware";
import { humanPracticesGroups } from "./engineering/groups/human-practices";
import { mitochondrialTherapyGroup } from "./engineering/groups/mitochondrial-therapy";
import { proteinHydrogelModelingGroup } from "./engineering/groups/protein-hydrogel-modeling";
import { selpHydrogelsGroup } from "./engineering/groups/selp-hydrogels-and-ligation";
import { softwareGroup } from "./engineering/groups/software";
import { tvnMagneticBindingGroup } from "./engineering/groups/tvn-magnetic-binding";
import "./engineering.css";

/**
 * Engineering page — layout and arrangement rules only. Each group's content
 * lives in its own file under `engineering/groups/` and is referenced here.
 *
 *   - sections following the 2025 ZJU-China engineering page: Project
 *     Design / Wet Lab / Dry Lab / Human Practices; Human Practices is
 *     controlled by the SHOW_HUMAN_PRACTICES switch below;
 *   - Wet Lab is split into four groups following the Notebook page, with
 *     SELP hydrogels and the ligation system merged into one group; Dry Lab
 *     holds Protein Hydrogel Modeling, Hardware, and Software (the SELP MD
 *     platform and NEST Software as its two sub-modules);
 *   - one shared one-screen layout for every view: the nav rows, the
 *     level-3 tab row, the DBTL ring and the text panel form a cluster that
 *     pins to the middle of the viewport while the page scroll drives the
 *     steps;
 *   - level-3 tabs are "Introduction | sub-modules | Conclusion": the
 *     Introduction tab hosts the group-level lead (总引导段) and the
 *     Conclusion tab the group-level outlook (总展望段);
 *   - each sub-module's own lead / outlook (引导段 / 展望段) sit at the
 *     cycle-button row: they are the first / last steps of the sequence, so
 *     the DBTL ring stays unlit and the panel shows no phase badge on them;
 *   - Project Design uses the nested SEED / DBTL cycle: the outer SEED ring
 *     advances first, then the inner DBTL ring runs four cycles during
 *     Engineering & Implementation.
 */
interface Section {
  key: string;
  label: string;
  groups: Group[];
  /** Hide the level-1 button while keeping the section's content wired up. */
  hidden?: boolean;
}

/**
 * Feature switch for the Engineering Human Practices module. The content
 * stays in the code so it can be restored at any time; while the switch is
 * off the tab is removed from the navigation (locally and on the deployed
 * site alike).
 */
const SHOW_HUMAN_PRACTICES = false;

/** Desktop breakpoint shared with the CSS grid: the split ring navigation is
 *  only used when the ring and card sit side by side. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined"
      ? true
      : window.matchMedia("(min-width: 992px)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(min-width: 992px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

/**
 * Engineering layout switch.
 *
 * true  — level-1 buttons sit above the DBTL/SEED ring and level-2 buttons
 *         below it, inside the ring column. The two navigation rows no
 *         longer take vertical space above the stepper, so the text card
 *         can use a taller stack.
 * false — the original layout: both navigation rows stacked above the ring
 *         and text card.
 */
const RING_NAV_LAYOUT = false;

const ALL_SECTIONS: Section[] = [
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
    groups: [proteinHydrogelModelingGroup, hardwareGroup, softwareGroup],
  },
  {
    key: "human-practices",
    label: "Human Practices",
    groups: humanPracticesGroups,
  },
];

const SECTIONS = ALL_SECTIONS.filter(
  (section) => SHOW_HUMAN_PRACTICES || section.key !== "human-practices",
);

export function Engineering() {
  const layout = resolveEngineeringLayout();
  const legacyLayout = layout === "legacy";
  const [activeKey, setActiveKey] = useState("project-design");
  const [groupIndex, setGroupIndex] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [activeCycle, setActiveCycle] = useState(0);
  const prevNavRef = useRef({ activeKey, groupIndex, tabIndex });

  const activeSection =
    SECTIONS.find((section) => section.key === activeKey) ?? SECTIONS[0];
  const projectDesignActive = activeSection.key === "project-design";
  const activeGroup =
    activeSection.groups[groupIndex] ?? activeSection.groups[0];

  /* Scroll-driven step changes switch the level-3 tab without scrolling the
     page back to the part's start (that jump is only for tab clicks). */
  const autoTabRef = useRef(false);
  const tabIndexRef = useRef(tabIndex);
  tabIndexRef.current = tabIndex;

  const selectSection = (key: string) => {
    setActiveKey(key);
    setGroupIndex(0);
    setTabIndex(0);
    setActiveCycle(0);
  };

  const selectGroup = (index: number) => {
    setGroupIndex(index);
    setTabIndex(0);
    setActiveCycle(0);
  };

  // Level-3 tabs: Introduction (group lead) → sub-modules → Conclusion
  // (group outlook). The Introduction tab exists when the group or its
  // shared module carries lead content; the Conclusion tab when the group
  // carries an outlook or its single shared module carries an outro.
  const seedFlavor = activeGroup?.flavor === "seed";
  const introModule =
    activeGroup &&
    new Set(activeGroup.parts.map((part) => part.seedModule ?? part.module))
      .size === 1
      ? (activeGroup.parts[0].seedModule ?? activeGroup.parts[0].module)
      : undefined;
  const hasIntro = Boolean(
    activeGroup &&
    (activeGroup.heading ||
      activeGroup.lead ||
      (introModule && (introModule.introTitle || introModule.intro))),
  );
  const conclusionContent = activeGroup?.outlook ?? introModule?.outro;
  const hasConclusion = Boolean(conclusionContent);

  type Tab =
    | { kind: "intro" }
    | { kind: "part"; part: Part }
    | { kind: "conclusion" };
  const tabs: Tab[] = activeGroup
    ? [
        ...(hasIntro ? [{ kind: "intro" } as Tab] : []),
        ...activeGroup.parts.map((part) => ({ kind: "part", part }) as Tab),
        ...(hasConclusion ? [{ kind: "conclusion" } as Tab] : []),
      ]
    : [];
  const introContent = (
    <>
      {introModule?.introTitle && (
        <h3 className="dbtl-section-title">{introModule.introTitle}</h3>
      )}
      {introModule?.intro}
      {activeGroup?.heading && (
        <h3 className="dbtl-section-title">{activeGroup.heading}</h3>
      )}
      {activeGroup?.lead}
    </>
  );

  // The whole group is one runway: the Introduction tab, every part (with or
  // without its own cycle steps) and the Conclusion tab form a single
  // sequence, so the page scroll drives both the level-3 tabs and the
  // level-4 cycle steps.
  const partSequences = (activeGroup?.parts ?? []).map((part) => {
    const baseModule = part.seedModule ?? part.module;
    const module: DbtlModule | SeedModule | undefined =
      part.cycleSlice && part.seedModule
        ? {
            ...part.seedModule,
            cycles: part.seedModule.cycles.slice(
              part.cycleSlice[0],
              part.cycleSlice[1],
            ),
            infos: [],
          }
        : part.cycleSlice && part.module
          ? {
              ...part.module,
              cycles: part.module.cycles.slice(
                part.cycleSlice[0],
                part.cycleSlice[1],
              ),
              infos: [],
            }
          : baseModule;
    const lead =
      part.heading || part.lead ? (
        <>
          {part.heading && (
            <h3 className="dbtl-section-title">{part.heading}</h3>
          )}
          {part.lead}
        </>
      ) : undefined;
    const built = part.seedModule
      ? buildSeedSteps(module as SeedModule, lead, part.outlook)
      : buildSteps(module as DbtlModule, lead, part.outlook);
    const steps: Array<Step | SeedStep> = built.length
      ? built
      : [{ key: "part", kind: "info", title: part.label, content: lead }];
    return { part, module, steps };
  });

  interface SeqEntry {
    step: Step | SeedStep;
    module?: DbtlModule | SeedModule;
    tab: number;
  }
  const sequence: SeqEntry[] = [];
  if (hasIntro) {
    sequence.push({
      step: {
        key: "intro",
        kind: "info",
        title: "Introduction",
        content: introContent,
      },
      tab: 0,
    });
  }
  partSequences.forEach((entry, partIndex) => {
    const tab = (hasIntro ? 1 : 0) + partIndex;
    entry.steps.forEach((step) =>
      sequence.push({
        step: { ...step, key: `p${partIndex}-${step.key}` },
        module: entry.module,
        tab,
      }),
    );
  });
  if (hasConclusion) {
    sequence.push({
      step: {
        key: "conclusion",
        kind: "info",
        title: "Conclusion",
        content: conclusionContent,
      },
      tab: (hasIntro ? 1 : 0) + partSequences.length,
    });
  }
  const steps = sequence.map((entry) => entry.step);
  const stepCount = steps.length;
  const scrollSpan = sequenceSpan(steps);
  const metaByKey = new Map(sequence.map((entry) => [entry.step.key, entry]));
  const moduleForStep = (step: Step | SeedStep) =>
    metaByKey.get(step.key)?.module;
  const handleStepChange = (step: Step | SeedStep) => {
    if (step.kind === "phase" && step.cycleIndex !== undefined) {
      setActiveCycle(step.cycleIndex);
    }
    const tab = metaByKey.get(step.key)?.tab;
    if (tab === undefined || tab === tabIndexRef.current) return;
    autoTabRef.current = true;
    setTabIndex(tab);
  };
  /* Where a tab starts in the sequence — the first phase step of the tab
     (Cycle 1 Design for DBTL groups, Cycle 1 Spark for SEED groups; a
     part-level lead step before it is skipped). */
  const startIndexForTab = (tab: number) => {
    const first = sequence.findIndex((entry) => entry.tab === tab);
    if (first < 0) return -1;
    const design = sequence.findIndex(
      (entry, index) =>
        index >= first && entry.tab === tab && entry.step.kind === "phase",
    );
    return design >= 0 ? design : first;
  };
  const startIndex = startIndexForTab(tabIndex);

  // Any level switch returns to the top of the sequence — Cycle 1 Design for
  // sub-module views (skipping the lead step when there is one), the top of
  // the static cluster for the Introduction / Conclusion views. The scroll
  // happens before paint, so the stepper mounts with the right progress and
  // the scroll mapping cannot jump to a stale step. (Comparing against the
  // previous values keeps the very first render — and dev double-invocation —
  // from scrolling the page on load.)
  useLayoutEffect(() => {
    const prev = prevNavRef.current;
    const navChanged =
      prev.activeKey !== activeKey || prev.groupIndex !== groupIndex;
    const changed = navChanged || prev.tabIndex !== tabIndex;
    prevNavRef.current = { activeKey, groupIndex, tabIndex };
    if (!changed) return;
    if (autoTabRef.current) {
      autoTabRef.current = false;
      return;
    }
    const runway = document.querySelector(".eng-runway") as HTMLElement | null;
    if (runway && projectDesignActive) {
      window.scrollTo({
        top: runway.getBoundingClientRect().top + window.scrollY,
        behavior: "instant",
      });
      return;
    }
    if (runway && startIndex >= 0 && stepCount > 1) {
      const total = runway.offsetHeight - window.innerHeight;
      const top = runway.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top:
          top +
          (total * startIndex) / Math.max(1, scrollSpan) +
          (navChanged ? 0 : DBTL_TAB_SCROLL_NUDGE),
        behavior: "instant",
      });
      return;
    }
    const anchor = document.querySelector(".eng-static");
    if (anchor) {
      window.scrollTo({
        top: anchor.getBoundingClientRect().top + window.scrollY,
        behavior: "instant",
      });
    }
  }, [
    activeKey,
    groupIndex,
    tabIndex,
    startIndex,
    stepCount,
    scrollSpan,
    projectDesignActive,
  ]);

  const scrollToSequenceIndex = (index: number) => {
    if (index < 0) return;
    const runway = document.querySelector(".eng-runway") as HTMLElement | null;
    if (!runway || stepCount <= 1) return;
    const total = runway.offsetHeight - window.innerHeight;
    const top = runway.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + (total * index) / Math.max(1, scrollSpan) + 2,
      behavior: "instant",
    });
  };

  const selectTab = (index: number) => {
    const target = startIndexForTab(index);
    if (target < 0) return;
    autoTabRef.current = true;
    setTabIndex(index);
    setActiveCycle(0);
    requestAnimationFrame(() => {
      autoTabRef.current = false;
      scrollToSequenceIndex(target);
    });
  };

  const selectCycle = (tab: number, cycleIndex: number) => {
    const target = sequence.findIndex(
      (entry) =>
        entry.tab === tab &&
        entry.step.kind === "phase" &&
        entry.step.cycleIndex === cycleIndex,
    );
    if (target < 0) return;
    autoTabRef.current = true;
    setTabIndex(tab);
    setActiveCycle(cycleIndex);
    requestAnimationFrame(() => {
      autoTabRef.current = false;
      scrollToSequenceIndex(target);
    });
  };

  const moduleNav = (
    <div className="eng-module-nav">
      {SECTIONS.filter((section) => !section.hidden).map((section) => (
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
  );
  const groupNav =
    activeSection.groups.length > 1 ? (
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
    ) : null;
  const tabNav = tabs.map((tab, index) => (
    <button
      key={tab.kind === "part" ? tab.part.label : tab.kind}
      type="button"
      className={`dbtl-subnav-button ${tabIndex === index ? "active" : ""}`}
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
  /* Reuse the page TOC's markup and styles; only the active level-3 entry
     expands its level-4 cycles. */
  const sideTocItems: TocEntry[] = [];
  tabs.forEach((tab, index) => {
    const label =
      tab.kind === "intro"
        ? "Introduction"
        : tab.kind === "conclusion"
          ? "Conclusion"
          : tab.part.label;
    const partEntry =
      tab.kind === "part"
        ? partSequences.find((entry) => entry.part === tab.part)
        : undefined;
    const cycleCount = partEntry?.module?.cycles.length ?? 0;
    const active = tabIndex === index;
    sideTocItems.push({
      id: `engineering-step-${index}`,
      text: label,
      level: 1,
      current: active,
      onSelect: (event) => {
        event.preventDefault();
        selectTab(index);
      },
    });
    if (active && cycleCount > 0) {
      Array.from({ length: cycleCount }, (_, cycleIndex) => {
        sideTocItems.push({
          id: `engineering-step-${index}-${cycleIndex}`,
          text: `Cycle ${cycleIndex + 1}`,
          level: 2,
          current: activeCycle === cycleIndex,
          onSelect: (event) => {
            event.preventDefault();
            selectCycle(index, cycleIndex);
          },
        });
      });
    }
  });
  const sideToc = (
    <div className="eng-toc-slot">
      <TocPanel
        title={activeGroup?.label ?? "Steps"}
        ariaLabel="Steps"
        className="page-toc--embedded"
        items={sideTocItems}
      />
    </div>
  );

  const isDesktop = useIsDesktop();
  const ringNav =
    RING_NAV_LAYOUT && isDesktop && stepCount > 0 && Boolean(activeGroup);

  const content = (
    <>
      {!ringNav && moduleNav}
      {!ringNav && groupNav}
      {projectDesignActive ? (
        <ProjectDesignStepper layout={layout} />
      ) : (
        activeGroup &&
        (stepCount > 0 ? (
          seedFlavor ? (
            <SeedStepper
              key={activeGroup.label}
              steps={steps as SeedStep[]}
              moduleForStep={
                moduleForStep as (step: SeedStep) => SeedModule | undefined
              }
              onStepChange={handleStepChange}
              layout={layout}
              topNav={legacyLayout ? <>{tabNav}</> : undefined}
              sideNav={legacyLayout ? undefined : sideToc}
              ringTop={ringNav ? moduleNav : undefined}
              ringBottom={ringNav ? groupNav : undefined}
            />
          ) : (
            <DbtlStepper
              key={activeGroup.label}
              steps={steps as Step[]}
              moduleForStep={
                moduleForStep as (step: Step) => DbtlModule | undefined
              }
              onStepChange={handleStepChange}
              layout={layout}
              topNav={legacyLayout ? <>{tabNav}</> : undefined}
              sideNav={legacyLayout ? undefined : sideToc}
              ringTop={ringNav ? moduleNav : undefined}
              ringBottom={ringNav ? groupNav : undefined}
            />
          )
        ) : (
          <div className="eng-partnav">
            {legacyLayout ? tabNav : sideToc}
          </div>
        ))
      )}
    </>
  );
  const aggregateClass = `eng-aggregate${
    legacyLayout ? " eng-aggregate--legacy" : ""
  }${ringNav ? " eng-aggregate--ring-nav" : ""}`;
  const runwaySpan = projectDesignActive
    ? PROJECT_DESIGN_STEP_COUNT
    : sequenceSpan(steps);
  const runwayHeight = legacyLayout
    ? `calc(${100 + runwaySpan * STEP_DVH}dvh)`
    : `calc(100dvh + ${runwaySpan * STEPPER_STEP_PX}px)`;

  return (
    <div className="row mt-4 mb-5">
      <div className="col-12">
        <article>
          <section
            className="eng-overview"
            aria-labelledby="engineering-overview-title"
          >
            <h2 id="engineering-overview-title">
              From Real-World Needs to Engineering Solutions
            </h2>
            <p>
              For NEST, engineering is not simply about designing a
              protein-based material. It is a process of translating real-world
              challenges in cartilage repair into engineering problems that can
              be designed, constructed, and tested, while continuously refining
              solutions through experimental evidence and feedback.
            </p>
            <p>
              To ensure that our engineering work remains responsive to real
              needs, we integrated the SEED framework throughout our project.
              SEED consists of four interconnected stages:{" "}
              <strong>
                Spark a Question, Explore &amp; Analyze, Engineering &amp;
                Implementation, and Dialogue &amp; Feedback.
              </strong>{" "}
              The framework connects problem identification, engineering
              practice, and external feedback, creating a continuous cycle of
              improvement.
            </p>
            <p>
              Within the Engineering &amp; Implementation stage, we further
              adopted the Design–Build–Test–Learn (DBTL) cycle to translate
              engineering requirements into concrete experimental tasks.
            </p>
            <p>
              NEST therefore operates through two interconnected cycles:{" "}
              <strong>
                SEED connects real-world needs with engineering practice and
                external feedback, while DBTL drives the construction, testing,
                and optimization of specific designs.
              </strong>{" "}
              Together, they establish an iterative pathway from identifying
              unmet needs to developing a programmable biomaterial platform.
            </p>
          </section>
          {activeGroup || projectDesignActive ? (
            stepCount > 0 || projectDesignActive ? (
              <div className="eng-runway" style={{ height: runwayHeight }}>
                <div
                  className={`eng-pin${legacyLayout ? " eng-pin--legacy" : ""}`}
                >
                  <div className={aggregateClass}>{content}</div>
                </div>
              </div>
            ) : (
              <div className="eng-static">
                <div className={aggregateClass}>{content}</div>
              </div>
            )
          ) : (
            content
          )}
          {/* The shared references list accompanies sections backed by the
              group data; Project Design owns its separate nested cycle, and
              Human Practices is controlled by SHOW_HUMAN_PRACTICES. */}
          {activeSection.groups.length > 0 && <EngineeringReferences />}
        </article>
      </div>
    </div>
  );
}
