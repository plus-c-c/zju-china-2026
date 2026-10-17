import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { DBTL_PHASES, type DbtlModule, type DbtlPhase } from "./dbtl";
import { DbtlRing } from "./DbtlRing";

interface Step {
  key: string;
  kind: "phase" | "info";
  phase?: DbtlPhase;
  cycleIndex?: number;
  title?: string;
  content?: ReactNode;
}

function buildSteps(module: DbtlModule): Step[] {
  const steps: Step[] = [];
  const infos = module.infos ?? [];
  for (let i = 0; i <= module.cycles.length; i += 1) {
    for (const info of infos.filter((entry) => entry.afterCycle === i)) {
      steps.push({
        key: `info-${steps.length}`,
        kind: "info",
        title: info.title,
        content: info.content,
      });
    }
    if (i === module.cycles.length) break;
    for (const phase of DBTL_PHASES) {
      steps.push({
        key: `cycle-${i}-${phase}`,
        kind: "phase",
        phase,
        cycleIndex: i,
        content: module.cycles[i].content[phase],
      });
    }
  }
  return steps;
}

/** Scroll distance per step, as a fraction of the viewport height. */
export const STEP_DVH = 30;

interface DbtlStepperProps {
  module: DbtlModule;
  /** Focus view (code-level switch): shorter, stepper-only card layout. */
  focus?: boolean;
  /** Level-3 tab buttons rendered above the panel (focus view). */
  topNav?: ReactNode;
}

/**
 * DBTL stepper — embedded in the page scroll the same way as the home page
 * story sections: the stepper sits in a taller "runway", pins itself to the
 * middle of the viewport (sticky), and the scroll progress through the
 * runway drives the Design–Build–Test–Learn sequence. No wheel is captured:
 * scrolling is native from beginning to end, and the page only continues
 * past the stepper once the last step (or, scrolling up, the first step) has
 * been passed.
 */
export function DbtlStepper({
  module,
  focus = false,
  topNav,
}: DbtlStepperProps) {
  const steps = useMemo(() => buildSteps(module), [module]);
  const [index, setIndex] = useState(0);

  const runwayRef = useRef<HTMLDivElement>(null);
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

  // Map the scroll progress through the runway to the step index. In focus
  // view the runway lives on the page level (it wraps the whole cluster,
  // nav rows included); otherwise the stepper renders its own.
  useEffect(() => {
    const runway =
      runwayRef.current ??
      (rootRef.current?.closest(".eng-runway") as HTMLElement | null);
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

  const step = steps[index] ?? steps[0];

  const currentCycleIndex = useMemo(() => {
    if (!step) return 0;
    if (step.kind === "phase") return step.cycleIndex ?? 0;
    const next = steps.slice(index).find((entry) => entry.kind === "phase");
    return next?.cycleIndex ?? Math.max(module.cycles.length - 1, 0);
  }, [step, steps, index, module.cycles.length]);

  /** Scroll the page to the progress position of a step, so the scroll
   *  mapping and the sequence state stay in sync (the pinned view does not
   *  move; only the scrollbar does). */
  const scrollToStep = (target: number) => {
    const runway =
      runwayRef.current ??
      (rootRef.current?.closest(".eng-runway") as HTMLElement | null);
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

  const phaseBadge = step?.kind === "phase" && step.phase ? step.phase : null;
  const caption =
    step?.kind === "phase" && step.cycleIndex !== undefined
      ? module.cycles[step.cycleIndex].title
      : (step?.title ?? "");

  const stepper = (
    <div className={`dbtl${focus ? " dbtl-focus" : ""}`} ref={rootRef}>
      <div className="dbtl-ring-wrap">
        <DbtlRing active={phaseBadge} onSelect={goToPhase} />
      </div>
      <div className="dbtl-main">
        {topNav && <div className="dbtl-subnav">{topNav}</div>}
        <div className="dbtl-panel">
          <div className="dbtl-panel-head">
            {phaseBadge && (
              <span className={`dbtl-phase dbtl-phase-${phaseBadge}`}>
                {phaseBadge}
              </span>
            )}
            {caption && <span className="dbtl-caption">{caption}</span>}
          </div>
          <div
            className="dbtl-panel-body"
            ref={panelRef}
            tabIndex={0}
            role="region"
            aria-label={caption || module.title}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "PageDown") {
                event.preventDefault();
                setIndex((value) =>
                  Math.min(value + 1, stepsRef.current.length - 1),
                );
              } else if (event.key === "ArrowUp" || event.key === "PageUp") {
                event.preventDefault();
                setIndex((value) => Math.max(value - 1, 0));
              }
            }}
          >
            <div className="dbtl-panel-inner" key={step?.key}>
              {step?.content}
            </div>
          </div>
        </div>
        <div className="dbtl-cycles" role="group" aria-label="Cycles">
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
        </div>
      </div>
    </div>
  );

  if (focus) return stepper;

  return (
    <div
      className="dbtl-runway"
      ref={runwayRef}
      style={{
        height: `calc(${100 + Math.max(0, steps.length - 1) * STEP_DVH}dvh)`,
      }}
    >
      <div className="dbtl-pin">{stepper}</div>
    </div>
  );
}
