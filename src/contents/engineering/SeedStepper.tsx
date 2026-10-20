import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  STEP_ADVANCE_ENABLED,
  useBoundaryStepAdvance,
} from "../../components/useBoundaryStepAdvance";
import type { SeedModule, SeedPhase, SeedStep } from "./seed";
import { buildSeedSteps } from "./seed";
import { SeedRing } from "./SeedRing";

interface SeedStepperProps {
  /** Sub-module view: the SEED module whose cycles drive the sequence. */
  module?: SeedModule;
  /** Pre-built sequence spanning several parts; takes precedence over
   *  `module` (used when one runway covers a whole group). */
  steps?: SeedStep[];
  /** Module that owns a given step — drives the cycle buttons, ring badge
   *  and captions in multi-part sequences. */
  moduleForStep?: (step: SeedStep) => SeedModule | undefined;
  /** Reports the step shown while the page scrolls, so the parent can keep
   *  the level-3 tabs in sync with the runway. */
  onStepChange?: (step: SeedStep, index: number) => void;
  /** Part-level lead (引导段) — first step and "Introduction" button. */
  lead?: ReactNode;
  /** Part-level outlook (展望段) — last step and "Conclusion" button. */
  outlook?: ReactNode;
  /** Group-level lead / outlook view: static panel, ring unlit, no cycles. */
  content?: ReactNode;
  /** Level-3 tab row rendered above the panel. */
  topNav?: ReactNode;
  /** Level-1 navigation rendered above the ring in the split layout. */
  ringTop?: ReactNode;
  /** Level-2 navigation rendered below the ring in the split layout. */
  ringBottom?: ReactNode;
}

/**
 * SEED stepper — the Human Practices counterpart of the DBTL stepper: the
 * same pinned cluster (nav rows, tabs, ring, panel, cycle buttons) and the
 * same scroll mapping, but the sequence follows the SEED cycle
 * (Spark → Explore → Engineering & Implementation → Dialogue). The ring
 * shows the SEED artwork with the DBTL cycle nested inside; the inner ring
 * lights while the Engineering & Implementation step is shown.
 */
export function SeedStepper({
  module,
  steps: stepsProp,
  moduleForStep,
  onStepChange,
  lead,
  outlook,
  content,
  topNav,
  ringTop,
  ringBottom,
}: SeedStepperProps) {
  const builtSteps = useMemo(
    () => (module ? buildSeedSteps(module, lead, outlook) : []),
    [module, lead, outlook],
  );
  const steps = stepsProp && stepsProp.length ? stepsProp : builtSteps;
  const [index, setIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const stepsRef = useRef<SeedStep[]>(steps);
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
      const y =
        runwayTop + (total * target) / Math.max(1, stepsRef.current.length - 1);
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
  const suppressUntilRef = useBoundaryStepAdvance({
    stageRef: rootRef,
    panelRef,
    getIndex: () => indexRef.current,
    getCount: () => stepsRef.current.length,
    onAdvance: (target) => {
      setIndex(target);
      scrollToStep(target, "smooth");
    },
  });

  // The text panel resets whenever a new step is shown: forward lands at the
  // top, backward at the bottom (continuing an upward read).
  const prevIndexRef = useRef(0);
  useEffect(() => {
    const panel = panelRef.current;
    const backward = index < prevIndexRef.current;
    prevIndexRef.current = index;
    if (!panel) return;
    panel.scrollTo({ top: STEP_ADVANCE_ENABLED && backward ? panel.scrollHeight : 0 });
  }, [index]);

  // Map the scroll progress through the page-level runway to the step index.
  useEffect(() => {
    const runway = rootRef.current?.closest(
      ".eng-runway",
    ) as HTMLElement | null;
    if (!runway) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (performance.now() < suppressUntilRef.current) return;
      const rect = runway.getBoundingClientRect();
      const total = runway.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const target = Math.round(progress * (stepsRef.current.length - 1));
      if (target !== indexRef.current) setIndex(target);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, [suppressUntilRef]);

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
  const belongsToCurrentPart = (entry: SeedStep) =>
    (moduleForStep ? moduleForStep(entry) : module) === stepModule;

  /** Introduction / Conclusion buttons follow the current part's own lead
   *  and outlook steps (multi-part sequences never pass the props). */
  const leadIndex = steps.findIndex(
    (entry) => entry.kind === "lead" && belongsToCurrentPart(entry),
  );
  const outlookIndex = steps.findIndex(
    (entry) => entry.kind === "outlook" && belongsToCurrentPart(entry),
  );

  /** Jump to a SEED phase of the current cycle; before/after a cycle (lead
   *  or outlook steps) the first cycle is used, so the ring stays clickable
   *  like the DBTL ring. */
  const goToPhase = (phase: SeedPhase) => {
    const cycleIndex = currentCycleIndex < 0 ? 0 : currentCycleIndex;
    goToStep(
      steps.findIndex(
        (entry) =>
          belongsToCurrentPart(entry) &&
          entry.kind === "phase" &&
          entry.cycleIndex === cycleIndex &&
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

  /* Report the shown step so the parent can sync the level-3 tabs. */
  const onStepChangeRef = useRef(onStepChange);
  onStepChangeRef.current = onStepChange;
  useEffect(() => {
    if (step) onStepChangeRef.current?.(step, index);
  }, [step, index]);

  const phaseBadge =
    stepModule && step?.kind === "phase" && step.phase ? step.phase : null;
  const caption =
    stepModule && step?.kind === "phase" && step.cycleIndex !== undefined
      ? stepModule.cycles[step.cycleIndex]?.title
      : step?.kind === "info"
        ? (step.title ?? "")
        : "";

  const splitRing = Boolean(ringTop || ringBottom);

  return (
    <div className={`dbtl${splitRing ? " dbtl--ring-nav" : ""}`} ref={rootRef}>
      {splitRing ? (
        <div className="dbtl-ring-wrap dbtl-ring-wrap--split">
          {ringTop}
          <div className="dbtl-ring-center">
            <SeedRing active={phaseBadge} onSelect={goToPhase} />
          </div>
          {ringBottom}
        </div>
      ) : (
        <div className="dbtl-ring-wrap">
          <SeedRing active={phaseBadge} onSelect={goToPhase} />
        </div>
      )}
      <div className="dbtl-main">
        {topNav && <div className="dbtl-subnav">{topNav}</div>}
        <div className="dbtl-panel">
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
            <div className="dbtl-panel-inner" key={step?.key ?? "static"}>
              {step?.content ?? content}
            </div>
          </div>
        </div>
        {stepModule && (
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
        )}
      </div>
    </div>
  );
}
