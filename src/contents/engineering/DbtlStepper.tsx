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

const WHEEL_THRESHOLD = 80;
const WHEEL_COOLDOWN_MS = 320;
const WHEEL_IDLE_MS = 400;

interface DbtlStepperProps {
  module: DbtlModule;
}

export function DbtlStepper({ module }: DbtlStepperProps) {
  const steps = useMemo(() => buildSteps(module), [module]);
  const [index, setIndex] = useState(0);

  const areaRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const stepsRef = useRef<Step[]>(steps);
  indexRef.current = index;
  stepsRef.current = steps;

  // Reset the text panel once a new step is shown.
  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [index]);

  useEffect(() => {
    const area = areaRef.current;
    const panel = panelRef.current;
    if (!area || !panel) return;

    const hold = { delta: 0, lastEvent: 0, lastNav: 0 };

    // Switch steps in sequence; the wheel events over the stepper are always
    // intercepted so the page never moves while stepping (both directions).
    const navigate = (direction: 1 | -1, event: WheelEvent) => {
      event.preventDefault();
      const target = indexRef.current + direction;
      if (target < 0 || target >= stepsRef.current.length) {
        hold.delta = 0;
        return; // no further step: keep the page still
      }
      const now = performance.now();
      if (now - hold.lastEvent > WHEEL_IDLE_MS) hold.delta = 0;
      hold.lastEvent = now;
      hold.delta += event.deltaY;
      if (
        Math.abs(hold.delta) >= WHEEL_THRESHOLD &&
        now - hold.lastNav > WHEEL_COOLDOWN_MS
      ) {
        hold.delta = 0;
        hold.lastNav = now;
        setIndex(target);
      }
    };

    const onWheel = (event: WheelEvent) => {
      const direction = event.deltaY > 0 ? 1 : -1;
      const inPanel = panel.contains(event.target as Node);
      if (inPanel) {
        // Inside the text box: native scrolling first, chain at the edges.
        const atBottom =
          panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 1;
        const atTop = panel.scrollTop <= 0;
        const chaining =
          (direction > 0 && atBottom) || (direction < 0 && atTop);
        if (!chaining) {
          hold.delta = 0;
          return;
        }
      }
      navigate(direction as 1 | -1, event);
    };

    let touchStartY: number | null = null;
    let touchConsumed = false;
    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? null;
      touchConsumed = false;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (touchStartY === null || touchConsumed) return;
      if (panel.contains(event.target as Node)) return;
      const y = event.touches[0]?.clientY ?? touchStartY;
      const dy = touchStartY - y;
      if (Math.abs(dy) < 36) return;
      const direction = dy > 0 ? 1 : -1;
      const target = indexRef.current + direction;
      if (target < 0 || target >= stepsRef.current.length) return;
      event.preventDefault();
      touchConsumed = true;
      setIndex(target);
    };
    const onTouchEnd = () => {
      touchStartY = null;
      touchConsumed = false;
    };

    area.addEventListener("wheel", onWheel, { passive: false });
    area.addEventListener("touchstart", onTouchStart, { passive: true });
    area.addEventListener("touchmove", onTouchMove, { passive: false });
    area.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      area.removeEventListener("wheel", onWheel);
      area.removeEventListener("touchstart", onTouchStart);
      area.removeEventListener("touchmove", onTouchMove);
      area.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const step = steps[index] ?? steps[0];

  const currentCycleIndex = useMemo(() => {
    if (!step) return 0;
    if (step.kind === "phase") return step.cycleIndex ?? 0;
    const next = steps.slice(index).find((entry) => entry.kind === "phase");
    return next?.cycleIndex ?? Math.max(module.cycles.length - 1, 0);
  }, [step, steps, index, module.cycles.length]);

  const goToPhase = (phase: DbtlPhase) => {
    const target = steps.findIndex(
      (entry) =>
        entry.kind === "phase" &&
        entry.cycleIndex === currentCycleIndex &&
        entry.phase === phase,
    );
    if (target >= 0) setIndex(target);
  };

  const goToCycle = (cycleIndex: number) => {
    const target = steps.findIndex(
      (entry) => entry.kind === "phase" && entry.cycleIndex === cycleIndex,
    );
    if (target >= 0) setIndex(target);
  };

  const phaseBadge = step?.kind === "phase" && step.phase ? step.phase : null;
  const caption =
    step?.kind === "phase" && step.cycleIndex !== undefined
      ? module.cycles[step.cycleIndex].title
      : (step?.title ?? "");

  return (
    <div className="dbtl" ref={areaRef}>
      <div className="dbtl-ring-wrap">
        <DbtlRing active={phaseBadge} onSelect={goToPhase} />
      </div>
      <div className="dbtl-main">
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
}
