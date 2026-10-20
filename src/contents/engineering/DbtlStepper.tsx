import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useEngineeringScroll } from "./useEngineeringScroll";
import type { DbtlModule, DbtlPhase } from "./dbtl";
import type { EngineeringLayout } from "./layout";
import { useStepperProgress } from "../../components/stepperWheel";
import { buildSteps, sequenceSpan, type Step } from "./steps";
import { DbtlRing } from "./DbtlRing";
import {
  DBTL_PHASE_TOP_ANGLE,
  DBTL_RING_SNAP_EPSILON,
  DBTL_RING_START_ANGLE,
} from "./ringStage";

interface DbtlStepperProps {
  /** Sub-module view: the DBTL module whose cycles drive the sequence. */
  module?: DbtlModule;
  /** Pre-built sequence spanning several parts; takes precedence over
   *  `module` (used when one runway covers a whole group). */
  steps?: Step[];
  /** Module that owns a given step — drives the cycle buttons, ring badge
   *  and captions in multi-part sequences. */
  moduleForStep?: (step: Step) => DbtlModule | undefined;
  /** Reports the step shown while the page scrolls, so the parent can keep
   *  the level-3 tabs in sync with the runway. */
  onStepChange?: (step: Step, index: number) => void;
  /** Part-level lead (引导段) — first step and "Introduction" button. */
  lead?: ReactNode;
  /** Part-level outlook (展望段) — last step and "Conclusion" button. */
  outlook?: ReactNode;
  /** Group-level lead / outlook view: static panel, ring unlit, no cycles. */
  content?: ReactNode;
  /** Layout variant: left TOC or the previous tabs-above/cycles-below layout. */
  layout?: EngineeringLayout;
  /** Level-3 tab row rendered above the panel. */
  topNav?: ReactNode;
  /** Nested level-3 / level-4 TOC rendered in the left column. */
  sideNav?: ReactNode;
  /** Level-1 navigation rendered above the ring in the split layout. */
  ringTop?: ReactNode;
  /** Level-2 navigation rendered below the ring in the split layout. */
  ringBottom?: ReactNode;
}

/**
 * DBTL stepper — embedded in the page scroll the same way as the home page
 * story sections: the page-level runway wraps the whole pinned cluster
 * (nav rows, tabs, ring, panel, cycle buttons), and the scroll progress
 * through the runway turns the ring and, when a quarter turn completes,
 * switches the Design–Build–Test–Learn step. Text scrolls first; a
 * boundary gesture advances once and absorbs its remaining momentum.
 * Ring, tab and cycle clicks use the same runway positions.
 */
export function DbtlStepper({
  module,
  steps: stepsProp,
  moduleForStep,
  onStepChange,
  lead,
  outlook,
  content,
  layout = "toc",
  topNav,
  sideNav,
  ringTop,
  ringBottom,
}: DbtlStepperProps) {
  const legacy = layout === "legacy";
  const builtSteps = useMemo(
    () => (module ? buildSteps(module, lead, outlook) : []),
    [module, lead, outlook],
  );
  const steps = stepsProp && stepsProp.length ? stepsProp : builtSteps;
  const [index, setIndex] = useState(0);

  /** Ring rotation timeline — one alignment per step. Phase steps bring
   *  their segment to the 12 o'clock reading point (Design starts at −315°
   *  after the artwork mirror, then a quarter turn clockwise per phase).
   *  Non-phase steps
   *  borrow the next step's alignment and use their own interval for a full
   *  revolution, so an Introduction / Conclusion view always turns a whole
   *  circle before the next view is allowed in. */
  const timeline = useMemo(() => {
    const count = steps.length;
    if (!count) return { cum: [] as number[], span: 0 };
    const align: number[] = new Array<number>(count).fill(NaN);
    let phaseIndex = 0;
    steps.forEach((entry, i) => {
      if (entry.kind === "phase") {
        /* The mirrored labels' own centres (design, build, test, learn), so
           each phase's visible centre lands exactly on 12 o'clock. */
        align[i] =
          DBTL_PHASE_TOP_ANGLE[phaseIndex % 4] + 360 * Math.floor(phaseIndex / 4);
        phaseIndex += 1;
      }
    });
    for (let i = count - 1; i >= 0; i -= 1) {
      if (Number.isNaN(align[i])) {
        align[i] =
          i + 1 < count ? align[i + 1] : i > 0 ? align[i - 1] : 45;
      }
    }
    /* Every step owns one interval. Phase steps turn a quarter clockwise to
       bring the next segment to the reading point; non-phase steps turn a
       whole revolution and land on the next step's alignment. */
    const cum: number[] = new Array<number>(count + 1);
    cum[0] = align[0];
    for (let i = 0; i < count; i += 1) {
      const delta =
        i === count - 1
          ? steps[i].kind === "phase"
            ? 90
            : 360
          : align[i + 1] - align[i] + (steps[i].kind === "phase" ? 0 : 360);
      cum[i + 1] = cum[i] + delta;
    }
    return { cum, span: sequenceSpan(steps) };
  }, [steps]);
  const timelineRef = useRef(timeline);
  timelineRef.current = timeline;

  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const stepsRef = useRef<Step[]>(steps);
  indexRef.current = index;
  stepsRef.current = steps;

  /** Scroll the page to the progress position of a step, so the scroll
   *  mapping and the sequence state stay in sync (the pinned view does not
   *  move; only the scrollbar does). */
  const scrollToStep = useCallback(
    (target: number, behavior: ScrollBehavior = "instant") => {
      const runway = rootRef.current?.closest(
        ".eng-runway",
      ) as HTMLElement | null;
      if (!runway) return;
      const total = runway.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const runwayTop = runway.getBoundingClientRect().top + window.scrollY;
      const span =
        timelineRef.current.span || Math.max(1, stepsRef.current.length - 1);
      const y = runwayTop + (total * target) / span + 2;
      window.scrollTo({ top: y, behavior });
    },
    [],
  );

  const goToStep = useCallback(
    (target: number) => {
      if (target < 0 || target >= stepsRef.current.length) return;
      setIndex(target);
      scrollToStep(target);
    },
    [scrollToStep],
  );

  /* Left/right arrow keys drive the same step switching as the wheel. */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey)
        return;
      const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
      const backward = event.key === "ArrowLeft" || event.key === "ArrowUp";
      if (!forward && !backward) return;
      const target = forward ? indexRef.current + 1 : indexRef.current - 1;
      if (target < 0 || target >= stepsRef.current.length) return;
      event.preventDefault();
      goToStep(target);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToStep]);

  /** Boundary stepping: the wheel / touch advances one step per gesture once
   *  the text panel reaches its bottom (or its top, scrolling up). */
  useEngineeringScroll({
    stageRef: rootRef,
    panelRef,
    getIndex: () => indexRef.current,
    getCount: () => stepsRef.current.length,
    onAdvance: (target) => {
      indexRef.current = target;
      setIndex(target);
      scrollToStep(target);
    },
  });

  // The text panel resets whenever a new step is shown: forward lands at the
  // top, ready for the next reading gesture. The outgoing
  // card stays mounted for one pan so it can slide off with the incoming one.
  const prevIndexRef = useRef(0);
  const outgoingTimerRef = useRef(0);
  const [outgoing, setOutgoing] = useState<ReactNode | null>(null);
  useEffect(() => {
    const panel = panelRef.current;
    const previous = prevIndexRef.current;
    prevIndexRef.current = index;
    if (panel) {
      panel.scrollTo({
        top: 0,
      });
    }
    if (previous === index) return;
    setOutgoing(stepsRef.current[previous]?.content ?? null);
    window.clearTimeout(outgoingTimerRef.current);
    outgoingTimerRef.current = window.setTimeout(() => setOutgoing(null), 380);
  }, [index]);

  /* Hidden step progress shared with the Model decks: one interval per
     step, the step switches when its interval completes, and the position
     turns the ring through the rotation timeline. */
  useStepperProgress({
    getRunway: () =>
      rootRef.current?.closest(".eng-runway") as HTMLElement | null,
    count: timeline.span,
    onIndex: (next) => {
      if (next !== indexRef.current) setIndex(next);
    },
    onProgress: (position) => {
      const { cum } = timelineRef.current;
      if (cum.length < 2) return;
      const slot = Math.min(Math.floor(position + 1e-4), cum.length - 2);
      const rawFraction = Math.min(1, Math.max(0, position - slot));
      const fraction = rawFraction < DBTL_RING_SNAP_EPSILON ? 0 : rawFraction;
      const rotation = cum[slot] + (cum[slot + 1] - cum[slot]) * fraction;
      rootRef.current?.style.setProperty(
        "--dbtl-rotation",
        `${rotation.toFixed(2)}deg`,
      );
    },
  });

  const step = steps[index];
  /** Module owning the shown step (multi-part sequences switch parts). */
  const stepModule = step
    ? (moduleForStep ? moduleForStep(step) : module)
    : module;
  const currentCycleIndex = useMemo(() => {
    if (!stepModule || !step || step.kind === "lead" || step.kind === "outlook") {
      return -1;
    }
    if (step.kind === "phase") return step.cycleIndex ?? 0;
    const next = steps.slice(index).find((entry) => entry.kind === "phase");
    return next?.cycleIndex ?? Math.max(stepModule.cycles.length - 1, 0);
  }, [stepModule, step, steps, index]);

  /** Keeps cycle jumps inside the current part. */
  const belongsToCurrentPart = (entry: Step) =>
    (moduleForStep ? moduleForStep(entry) : module) === stepModule;

  /** Introduction / Conclusion buttons follow the current part's own lead
   *  and outlook steps (multi-part sequences never pass the props). */
  const leadIndex = steps.findIndex(
    (entry) => entry.kind === "lead" && belongsToCurrentPart(entry),
  );
  const outlookIndex = steps.findIndex(
    (entry) => entry.kind === "outlook" && belongsToCurrentPart(entry),
  );

  const goToPhase = (phase: DbtlPhase) => {
    if (currentCycleIndex < 0) return;
    goToStep(
      steps.findIndex(
        (entry) =>
          belongsToCurrentPart(entry) &&
          entry.kind === "phase" &&
          entry.cycleIndex === currentCycleIndex &&
          entry.phase === phase,
      ),
    );
  };

  const goToCycle = (cycleIndex: number) => {
    goToStep(
      steps.findIndex(
        (entry) =>
          belongsToCurrentPart(entry) &&
          entry.kind === "phase" &&
          entry.cycleIndex === cycleIndex,
      ),
    );
  };

  /* Report the shown step so the parent can sync the level-3 tabs. Depend on
     the stable step key rather than the object: the parent rebuilds the
     sequence on every render, and reporting the old object after a tab click
     would switch the tabs back before the programmatic scroll lands. */
  const stepKey = step?.key;
  const onStepChangeRef = useRef(onStepChange);
  onStepChangeRef.current = onStepChange;
  useEffect(() => {
    if (stepKey) onStepChangeRef.current?.(stepsRef.current[index], index);
  }, [stepKey, index]);

  const phaseBadge =
    stepModule && step?.kind === "phase" && step.phase ? step.phase : null;
  /** Horizontal pan direction for the incoming card. */
  const direction = index < prevIndexRef.current ? "prev" : "next";
  const caption =
    stepModule && step?.kind === "phase" && step.cycleIndex !== undefined
      ? stepModule.cycles[step.cycleIndex]?.title
      : step?.kind === "info"
        ? (step.title ?? "")
        : "";

  const splitRing = Boolean(ringTop || ringBottom);
  const ring = splitRing ? (
    <div className="dbtl-ring-wrap dbtl-ring-wrap--split">
      {ringTop}
      <div className="dbtl-ring-center">
        <DbtlRing active={phaseBadge} onSelect={goToPhase} />
      </div>
      {ringBottom}
    </div>
  ) : (
    <div className="dbtl-ring-wrap">
      <DbtlRing active={phaseBadge} onSelect={goToPhase} />
    </div>
  );
  const cycles = stepModule ? (
    <div className="dbtl-cycles" role="group" aria-label="Steps">
      {leadIndex >= 0 && (
        <button
          type="button"
          className={`dbtl-cycle-button${
            step?.kind === "lead" ? " active" : ""
          }`}
          aria-pressed={step?.kind === "lead"}
          onClick={() => goToStep(leadIndex)}
        >
          Introduction
        </button>
      )}
      {stepModule.cycles.map((cycle, cycleIndex) => (
        <button
          key={cycle.title}
          type="button"
          className={`dbtl-cycle-button${
            cycleIndex === currentCycleIndex ? " active" : ""
          }`}
          aria-pressed={cycleIndex === currentCycleIndex}
          onClick={() => goToCycle(cycleIndex)}
        >
          Cycle {cycleIndex + 1}
        </button>
      ))}
      {outlookIndex >= 0 && (
        <button
          type="button"
          className={`dbtl-cycle-button${
            step?.kind === "outlook" ? " active" : ""
          }`}
          aria-pressed={step?.kind === "outlook"}
          onClick={() => goToStep(outlookIndex)}
        >
          Conclusion
        </button>
      )}
    </div>
  ) : null;

  return (
    <>
      {legacy && topNav && (
        <div className="dbtl-subnav dbtl-subnav--legacy">{topNav}</div>
      )}
      <div
        className={`dbtl${legacy ? " dbtl--legacy" : ""}${
          splitRing ? " dbtl--ring-nav" : ""
        }`}
        ref={rootRef}
        /* First paint of every group uses the shared starting heading; the
           scroll progress takes over on the next frame. */
        style={
          {
            "--dbtl-rotation": `${DBTL_RING_START_ANGLE}deg`,
          } as CSSProperties
        }
      >
        {!legacy && topNav && (
          <div className="dbtl-subnav">{topNav}</div>
        )}
        {legacy ? (
          <div className="dbtl-left dbtl-left--legacy">
            {ring}
            {cycles}
          </div>
        ) : (
          <div className="dbtl-left">
            {ring}
            {sideNav}
            {!sideNav && cycles}
          </div>
        )}
        <div className="dbtl-main">
          <div className="dbtl-panel" ref={cardRef}>
          {(phaseBadge || caption) && (
            <div className="dbtl-panel-head">
              {phaseBadge && (
                <span className={`dbtl-phase dbtl-phase-${phaseBadge}`}>
                  {phaseBadge}
                </span>
              )}
              {caption && <span className="dbtl-caption">{caption}</span>}
            </div>
          )}
          <div
            className="dbtl-panel-body"
            ref={panelRef}
            tabIndex={0}
            role="region"
            aria-label={caption || stepModule?.title || "Lead or outlook"}
            onKeyDown={(event) => {
              if (!stepsRef.current.length) return;
              if (
                event.key === "ArrowDown" ||
                event.key === "PageDown" ||
                event.key === "ArrowRight"
              ) {
                event.preventDefault();
                goToStep(
                  Math.min(indexRef.current + 1, stepsRef.current.length - 1),
                );
              } else if (
                event.key === "ArrowUp" ||
                event.key === "PageUp" ||
                event.key === "ArrowLeft"
              ) {
                event.preventDefault();
                goToStep(Math.max(indexRef.current - 1, 0));
              }
            }}
          >
            <div
              className="dbtl-panel-inner"
              data-dir={direction}
              key={step?.key ?? "static"}
            >
              {step?.content ?? content}
            </div>
            {outgoing && (
              <div
                className="dbtl-panel-inner dbtl-panel-inner--out"
                data-dir={direction}
                aria-hidden="true"
              >
                {outgoing}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
