import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useBoundaryStepAdvance } from "../../components/useBoundaryStepAdvance";
import {
  useCardWheel,
  useStepperProgress,
} from "../../components/stepperWheel";
import dbtlRingSvg from "./assets/dbtl-ring.svg?raw";
import seedRingSvg from "./assets/seed-ring-hp.svg?raw";
import { DBTL_PHASES, type DbtlPhase } from "./dbtl";
import { ProjectDesignCard } from "./ProjectDesignContent";
import { projectDesignCopy } from "./projectDesignCopy";
import { DBTL_PHASE_TOP_ANGLE } from "./ringStage";
import { SEED_LABELS, type SeedPhase } from "./seed";

type ProjectDesignStep =
  | {
      key: string;
      outer: Exclude<SeedPhase, "Engineering">;
      content: ReactNode;
    }
  | {
      key: string;
      outer: "Engineering";
      inner: DbtlPhase;
      cycleIndex: number;
      content: ReactNode;
    };

const OUTER_PHASES: SeedPhase[] = [
  "Spark",
  "Explore",
  "Engineering",
  "Dialogue",
];

const OUTER_START_INDEX: Record<SeedPhase, number> = {
  Spark: 0,
  Explore: 1,
  Engineering: 2,
  Dialogue: 18,
};

const OUTER_ROTATION: Record<SeedPhase, number> = {
  Spark: 0,
  Explore: 90,
  Engineering: 180,
  Dialogue: 270,
};

/** Half of each outer-quarter turn follows reading inside the card; the
 *  remaining half follows the page's transition to the next card. */
const OUTER_CARD_READING_TURN = 45;

function outerRotationAt(position: number, panelProgress: number) {
  if (position < 1) {
    return (
      OUTER_ROTATION.Spark +
      position * OUTER_CARD_READING_TURN +
      panelProgress * OUTER_CARD_READING_TURN
    );
  }
  if (position < 2) {
    return (
      OUTER_ROTATION.Explore +
      (position - 1) * OUTER_CARD_READING_TURN +
      panelProgress * OUTER_CARD_READING_TURN
    );
  }
  if (position < 17) return OUTER_ROTATION.Engineering;
  if (position < 18) {
    return OUTER_ROTATION.Engineering + (position - 17) * 90;
  }
  return (
    OUTER_ROTATION.Dialogue +
    (position - 18) * OUTER_CARD_READING_TURN +
    panelProgress * OUTER_CARD_READING_TURN
  );
}

const PROJECT_DESIGN_STEPS: ProjectDesignStep[] = [
  {
    key: "spark",
    outer: "Spark",
    content: <ProjectDesignCard source={projectDesignCopy.outer.Spark} />,
  },
  {
    key: "explore",
    outer: "Explore",
    content: <ProjectDesignCard source={projectDesignCopy.outer.Explore} />,
  },
  ...Array.from({ length: 4 }, (_, cycleIndex) =>
    DBTL_PHASES.map((inner) => ({
      key: `engineering-${cycleIndex}-${inner.toLowerCase()}`,
      outer: "Engineering" as const,
      inner,
      cycleIndex,
      content: (
        <ProjectDesignCard
          source={projectDesignCopy.engineering[cycleIndex][inner]}
        />
      ),
    })),
  ).flat(),
  {
    key: "dialogue",
    outer: "Dialogue",
    content: <ProjectDesignCard source={projectDesignCopy.outer.Dialogue} />,
  },
];

export const PROJECT_DESIGN_STEP_COUNT = PROJECT_DESIGN_STEPS.length;

interface ProjectDesignRingProps {
  outer: SeedPhase;
  inner: DbtlPhase | null;
  onOuterSelect: (phase: SeedPhase) => void;
  onInnerSelect: (phase: DbtlPhase) => void;
}

const INNER_PHASE_BY_SEGMENT: Record<string, DbtlPhase> = {
  design: "Design",
  build: "Build",
  test: "Test",
  learn: "Learn",
};

const OUTER_PHASE_BY_SEGMENT: Record<string, SeedPhase> = {
  spark: "Spark",
  explore: "Explore",
  engineering: "Engineering",
  dialogue: "Dialogue",
};

function ProjectDesignRing({
  outer,
  inner,
  onOuterSelect,
  onInnerSelect,
}: ProjectDesignRingProps) {
  return (
    <div
      className="project-design-ring"
      data-outer={outer.toLowerCase()}
      data-inner={inner?.toLowerCase() ?? ""}
      role="group"
      aria-label="SEED cycle containing the Design, Build, Test, Learn cycle"
    >
      <div
        className="project-design-ring__outer"
        data-active={outer.toLowerCase()}
        onClick={(event) => {
          const segment = (event.target as Element).closest("[data-seg]");
          const phase =
            OUTER_PHASE_BY_SEGMENT[segment?.getAttribute("data-seg") ?? ""];
          if (phase) onOuterSelect(phase);
        }}
        dangerouslySetInnerHTML={{ __html: seedRingSvg }}
      />
      <div
        className="project-design-ring__inner"
        aria-label="Design, Build, Test, Learn"
        onClick={(event) => {
          const segment = (event.target as Element).closest("[data-seg]");
          const phase =
            INNER_PHASE_BY_SEGMENT[segment?.getAttribute("data-seg") ?? ""];
          if (phase) onInnerSelect(phase);
        }}
        dangerouslySetInnerHTML={{ __html: dbtlRingSvg }}
      />
    </div>
  );
}

export function ProjectDesignStepper() {
  const [index, setIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const runwayPositionRef = useRef(0);
  const panelProgressRef = useRef(0);
  indexRef.current = index;

  const updateOuterRotation = useCallback(() => {
    const rotation = outerRotationAt(
      runwayPositionRef.current,
      panelProgressRef.current,
    );
    rootRef.current?.style.setProperty(
      "--project-outer-rotation",
      `${rotation.toFixed(2)}deg`,
    );
  }, []);

  const scrollToStep = useCallback(
    (target: number, behavior: ScrollBehavior = "instant") => {
      const runway = rootRef.current?.closest(
        ".eng-runway",
      ) as HTMLElement | null;
      if (!runway) return;
      const total = runway.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const top = runway.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: top + (total * target) / PROJECT_DESIGN_STEP_COUNT + 2,
        behavior,
      });
    },
    [],
  );

  const goToStep = useCallback(
    (target: number) => {
      if (target < 0 || target >= PROJECT_DESIGN_STEP_COUNT) return;
      indexRef.current = target;
      panelProgressRef.current = 0;
      setIndex(target);
      scrollToStep(target);
    },
    [scrollToStep],
  );

  const suppressUntilRef = useBoundaryStepAdvance({
    stageRef: rootRef,
    panelRef,
    getIndex: () => indexRef.current,
    getCount: () => PROJECT_DESIGN_STEP_COUNT,
    onAdvance: (target) => {
      setIndex(target);
      scrollToStep(target, "smooth");
    },
  });

  useCardWheel(panelRef, cardRef);

  useStepperProgress({
    getRunway: () =>
      rootRef.current?.closest(".eng-runway") as HTMLElement | null,
    count: PROJECT_DESIGN_STEP_COUNT,
    onIndex: (next) => {
      if (next !== indexRef.current) {
        indexRef.current = next;
        panelProgressRef.current = 0;
        setIndex(next);
      }
    },
    onProgress: (position) => {
      runwayPositionRef.current = position;
      updateOuterRotation();

      const innerPosition = Math.min(15, Math.max(0, position - 2));
      const innerSlot = Math.min(Math.floor(innerPosition), 15);
      const innerFraction = innerPosition - innerSlot;
      const start =
        DBTL_PHASE_TOP_ANGLE[innerSlot % 4] + 360 * Math.floor(innerSlot / 4);
      const nextSlot = Math.min(innerSlot + 1, 15);
      const end =
        DBTL_PHASE_TOP_ANGLE[nextSlot % 4] + 360 * Math.floor(nextSlot / 4);
      const innerRotation = start + (end - start) * innerFraction;

      rootRef.current?.style.setProperty(
        "--project-inner-rotation",
        `${innerRotation.toFixed(2)}deg`,
      );
    },
    suppressUntilRef,
  });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      )
        return;
      const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
      const backward = event.key === "ArrowLeft" || event.key === "ArrowUp";
      if (!forward && !backward) return;
      const target = forward ? indexRef.current + 1 : indexRef.current - 1;
      if (target < 0 || target >= PROJECT_DESIGN_STEP_COUNT) return;
      event.preventDefault();
      goToStep(target);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToStep]);

  const previousIndexRef = useRef(0);
  useEffect(() => {
    previousIndexRef.current = index;
    const panel = panelRef.current;
    if (panel) {
      panelProgressRef.current = 0;
      panel.scrollTo({ top: 0, behavior: "instant" });
      updateOuterRotation();
    }
  }, [index, updateOuterRotation]);

  const step = PROJECT_DESIGN_STEPS[index];
  const engineeringStep = step.outer === "Engineering" ? step : null;
  const currentCycle = engineeringStep?.cycleIndex ?? 0;
  const direction = index < previousIndexRef.current ? "prev" : "next";

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const update = () => {
      if (step.outer === "Engineering") {
        panelProgressRef.current = 0;
      } else {
        const max = Math.max(0, panel.scrollHeight - panel.clientHeight);
        panelProgressRef.current = max > 0 ? panel.scrollTop / max : 0;
      }
      updateOuterRotation();
    };
    update();
    panel.addEventListener("scroll", update, { passive: true });
    return () => panel.removeEventListener("scroll", update);
  }, [step, updateOuterRotation]);

  const goToOuter = (phase: SeedPhase) => goToStep(OUTER_START_INDEX[phase]);
  const goToInner = (phase: DbtlPhase) => {
    const phaseIndex = DBTL_PHASES.indexOf(phase);
    goToStep(2 + currentCycle * DBTL_PHASES.length + phaseIndex);
  };

  return (
    <div
      className="dbtl project-design-stepper"
      ref={rootRef}
      style={
        {
          "--project-outer-rotation": "0deg",
          "--project-inner-rotation": `${DBTL_PHASE_TOP_ANGLE[0]}deg`,
        } as CSSProperties
      }
    >
      <div className="dbtl-ring-wrap">
        <ProjectDesignRing
          outer={step.outer}
          inner={engineeringStep?.inner ?? null}
          onOuterSelect={goToOuter}
          onInnerSelect={goToInner}
        />
      </div>
      <div className="dbtl-main">
        <div className="dbtl-subnav" aria-label="Project Design stages">
          {OUTER_PHASES.map((phase) => (
            <button
              key={phase}
              type="button"
              className={`dbtl-subnav-button${step.outer === phase ? " active" : ""}`}
              aria-pressed={step.outer === phase}
              onClick={() => goToOuter(phase)}
            >
              {SEED_LABELS[phase]}
            </button>
          ))}
        </div>
        <div className="dbtl-panel" ref={cardRef}>
          <div className="dbtl-panel-head">
            {engineeringStep ? (
              <>
                <span
                  className={`dbtl-phase dbtl-phase-${engineeringStep.inner}`}
                >
                  {engineeringStep.inner}
                </span>
                <span className="dbtl-caption">
                  {projectDesignCopy.cycleTitles[engineeringStep.cycleIndex]}
                </span>
              </>
            ) : (
              <span className="dbtl-caption">{SEED_LABELS[step.outer]}</span>
            )}
          </div>
          <div
            className="dbtl-panel-body"
            ref={panelRef}
            tabIndex={0}
            role="region"
            aria-label={
              engineeringStep
                ? `Cycle ${engineeringStep.cycleIndex + 1} ${engineeringStep.inner}`
                : SEED_LABELS[step.outer]
            }
          >
            <div
              className="dbtl-panel-inner"
              data-dir={direction}
              key={step.key}
            >
              {step.content}
            </div>
          </div>
        </div>
        {engineeringStep && (
          <div className="dbtl-cycles" role="group" aria-label="DBTL cycles">
            {Array.from({ length: 4 }, (_, cycleIndex) => (
              <button
                key={cycleIndex}
                type="button"
                className={`dbtl-cycle-button${currentCycle === cycleIndex ? " active" : ""}`}
                aria-pressed={currentCycle === cycleIndex}
                onClick={() => goToStep(2 + cycleIndex * DBTL_PHASES.length)}
              >
                Cycle {cycleIndex + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
