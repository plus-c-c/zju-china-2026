import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { DbtlModule, DbtlPhase } from "./dbtl";
import { buildSteps, type Step } from "./steps";
import { DbtlRing } from "./DbtlRing";

interface DbtlStepperProps {
  /** Sub-module view: the DBTL module whose cycles drive the sequence. */
  module?: DbtlModule;
  /** Part-level lead (引导段) — first step and "Introduction" button. */
  lead?: ReactNode;
  /** Part-level outlook (展望段) — last step and "Conclusion" button. */
  outlook?: ReactNode;
  /** Group-level lead / outlook view: static panel, ring unlit, no cycles. */
  content?: ReactNode;
  /** Level-3 tab row rendered above the panel. */
  topNav?: ReactNode;
}

/**
 * DBTL stepper — embedded in the page scroll the same way as the home page
 * story sections: the page-level runway wraps the whole pinned cluster
 * (nav rows, tabs, ring, panel, cycle buttons), and the scroll progress
 * through the runway drives the Design–Build–Test–Learn sequence while the
 * cluster stays pinned to the middle of the viewport. No wheel is captured:
 * scrolling is native from beginning to end, and the page only continues
 * past the stepper once the last step (or, scrolling up, the first step) has
 * been passed.
 */
export function DbtlStepper({
  module,
  lead,
  outlook,
  content,
  topNav,
}: DbtlStepperProps) {
  const steps = useMemo(
    () => (module ? buildSteps(module, lead, outlook) : []),
    [module, lead, outlook],
  );
  const [index, setIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const stepsRef = useRef<Step[]>(steps);
  indexRef.current = index;
  stepsRef.current = steps;

  // Reset the text panel once a new step is shown.
  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
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
  }, []);

  const step = steps[index];
  const currentCycleIndex = useMemo(() => {
    if (!module || !step || step.kind === "lead" || step.kind === "outlook") {
      return -1;
    }
    if (step.kind === "phase") return step.cycleIndex ?? 0;
    const next = steps.slice(index).find((entry) => entry.kind === "phase");
    return next?.cycleIndex ?? Math.max(module.cycles.length - 1, 0);
  }, [module, step, steps, index]);

  /** Scroll the page to the progress position of a step, so the scroll
   *  mapping and the sequence state stay in sync (the pinned view does not
   *  move; only the scrollbar does). */
  const scrollToStep = (target: number) => {
    const runway = rootRef.current?.closest(
      ".eng-runway",
    ) as HTMLElement | null;
    if (!runway) return;
    const total = runway.offsetHeight - window.innerHeight;
    if (total <= 0) return;
    const runwayTop = runway.getBoundingClientRect().top + window.scrollY;
    const y =
      runwayTop + (total * target) / Math.max(1, stepsRef.current.length - 1);
    window.scrollTo({ top: y, behavior: "instant" });
  };

  const goToStep = (target: number) => {
    if (target < 0) return;
    setIndex(target);
    scrollToStep(target);
  };

  const goToPhase = (phase: DbtlPhase) => {
    if (currentCycleIndex < 0) return;
    goToStep(
      steps.findIndex(
        (entry) =>
          entry.kind === "phase" &&
          entry.cycleIndex === currentCycleIndex &&
          entry.phase === phase,
      ),
    );
  };

  const goToCycle = (cycleIndex: number) => {
    goToStep(
      steps.findIndex(
        (entry) => entry.kind === "phase" && entry.cycleIndex === cycleIndex,
      ),
    );
  };

  const phaseBadge =
    module && step?.kind === "phase" && step.phase ? step.phase : null;
  const caption =
    module && step?.kind === "phase" && step.cycleIndex !== undefined
      ? module.cycles[step.cycleIndex].title
      : step?.kind === "info"
        ? (step.title ?? "")
        : "";

  return (
    <div className="dbtl" ref={rootRef}>
      <div className="dbtl-ring-wrap">
        <DbtlRing active={phaseBadge} onSelect={goToPhase} />
      </div>
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
            aria-label={caption || module?.title || "Lead or outlook"}
            onKeyDown={(event) => {
              if (!stepsRef.current.length) return;
              if (event.key === "ArrowDown" || event.key === "PageDown") {
                event.preventDefault();
                goToStep(
                  Math.min(indexRef.current + 1, stepsRef.current.length - 1),
                );
              } else if (event.key === "ArrowUp" || event.key === "PageUp") {
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
        {module && (
          <div className="dbtl-cycles" role="group" aria-label="Steps">
            {lead && (
              <button
                type="button"
                className={`dbtl-cycle-button${
                  step?.kind === "lead" ? " active" : ""
                }`}
                aria-pressed={step?.kind === "lead"}
                onClick={() => goToStep(0)}
              >
                Introduction
              </button>
            )}
            {module.cycles.map((cycle, cycleIndex) => (
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
            {outlook && (
              <button
                type="button"
                className={`dbtl-cycle-button${
                  step?.kind === "outlook" ? " active" : ""
                }`}
                aria-pressed={step?.kind === "outlook"}
                onClick={() => goToStep(stepsRef.current.length - 1)}
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
