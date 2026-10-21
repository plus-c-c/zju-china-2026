import { FigureCaption } from "../../components/FigureCaption";
import { References } from "../../components/References";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useContainedStepperScroll } from "../../components/useContainedStepperScroll";
import { useStepperProgress } from "../../components/stepperWheel";
import { MathFormula } from "../../components/MathFormula";
import { TransparentImage } from "../../components/TransparentImage";
import {
  m3Overview,
  m3Question,
  m3References,
  m3Steps,
  m3Title,
  type M3Block,
  type M3Part,
  type M3Step,
} from "./model3-data";
import "./model3.css";

/**
 * Model 3 — formula-driven presentation.
 *
 * · The total free energy accumulates its terms step by step.
 * · The step texts rotate inside one fixed card: only the text slides
 *   (clipped by the card frame), with a left/right slide-in / slide-out.
 * · Card gestures only scroll the current text. Gestures outside the card
 *   advance one step at a time.
 * · The core equation is always fully visible: it scales down to fit.
 */

/* Terms light up when introduced. The dipolar term is removed only when
   the reader reaches the explicit approximation in the final derivation. */
const MASTER_TERMS: { id: string; latex: string; steps: number[] }[] = [
  { id: "fiber", latex: "\\psi_{\\mathrm{fiber}}", steps: [2] },
  { id: "orient", latex: "\\psi_{\\mathrm{orient}}", steps: [3, 4] },
  { id: "selp", latex: "\\psi_{\\mathrm{SELP-Fe_3O_4}}", steps: [5] },
  { id: "particle", latex: "\\psi_{\\mathrm{particle}}", steps: [6] },
  { id: "fluid", latex: "\\psi_{\\mathrm{fluid}}", steps: [7] },
  { id: "coupling", latex: "\\psi_{\\mathrm{coupling}}", steps: [7] },
  { id: "crosslink", latex: "\\psi_{\\mathrm{crosslink}}", steps: [8] },
  { id: "dip", latex: "\\psi_{\\mathrm{dip}}", steps: [3] },
];

function Parts({ parts }: { parts: M3Part[] }) {
  return (
    <>
      {parts.map((part, index) => {
        if (part.t === "math") {
          return <MathFormula key={index}>{part.v}</MathFormula>;
        }
        if (part.t === "em") {
          return <em key={index}>{part.v}</em>;
        }
        if (part.t === "strong") {
          return <strong key={index}>{part.v}</strong>;
        }
        if (part.t === "link") {
          return (
            <a key={index} href={part.href} target="_blank" rel="noreferrer">
              {part.v}
            </a>
          );
        }
        return <span key={index}>{part.v}</span>;
      })}
    </>
  );
}

function FigureBlock({ block }: { block: M3Block }) {
  return (
    <figure className="m3-figure">
      <TransparentImage
        src={block.src ?? ""}
        alt={block.alt ?? ""}
        style={block.width ? { maxWidth: block.width } : undefined}
      />
      {block.caption ? (
        <FigureCaption className="figure-caption">
          {block.caption}
        </FigureCaption>
      ) : null}
    </figure>
  );
}

function Blocks({ blocks }: { blocks: M3Block[] }) {
  const nodes: ReactNode[] = [];
  let index = 0;
  while (index < blocks.length) {
    const block = blocks[index];
    if (block.t === "figure") {
      // Consecutive figures share one row: the six simulation maps form two
      // rows of three.
      let end = index;
      while (end < blocks.length && blocks[end].t === "figure") end += 1;
      const run = blocks.slice(index, end);
      if (run.length >= 2) {
        nodes.push(
          <div className="m3-figure-row" key={`figrow-${index}`}>
            {run.map((figure, offset) => (
              <FigureBlock key={`${index}-${offset}`} block={figure} />
            ))}
          </div>,
        );
        index = end;
        continue;
      }
    }
    if (block.t === "h4") {
      nodes.push(
        <h4 key={index} className="mt-4 mb-2">
          {block.v}
        </h4>,
      );
    } else if (block.t === "display") {
      nodes.push(
        <MathFormula key={index} display>
          {block.v ?? ""}
        </MathFormula>,
      );
    } else if (block.t === "figure") {
      nodes.push(<FigureBlock key={index} block={block} />);
    } else {
      nodes.push(
        <p key={index} data-model-milestone={block.milestone}>
          <Parts parts={block.parts ?? []} />
        </p>,
      );
    }
    index += 1;
  }
  return <>{nodes}</>;
}

/* 单张幻灯片内容（variant: in = 滑入, out = 滑出；dir: 1 向前, -1 向后） */
function SlideInner({
  step,
  variant,
  dir,
  animate,
  chain,
  initialScroll,
  contentRef,
}: {
  step: M3Step;
  variant: "in" | "out";
  dir: 1 | -1;
  animate: boolean;
  chain?: boolean;
  initialScroll?: number;
  contentRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      className={`m3-slide__inner m3-slide__inner--${variant}${
        animate
          ? dir === 1
            ? " m3-slide__inner--fwd"
            : " m3-slide__inner--back"
          : ""
      }`}
      aria-hidden={variant === "out"}
    >
      <div className="m3-slide__head">
        <span className="m3-slide__num">Step {step.num}</span>
        <span className="m3-slide__title">{step.title}</span>
      </div>
      <p className="m3-slide__goal">{step.goal}</p>
      <div
        className={`m3-slide__content${
          chain ? " m3-slide__content--chain" : ""
        }`}
        tabIndex={variant === "in" ? 0 : -1}
        role="region"
        aria-label={step.title}
        ref={(el) => {
          if (el && initialScroll) el.scrollTop = initialScroll;
          contentRef?.(el);
        }}
      >
        <Blocks blocks={step.blocks} />
      </div>
    </div>
  );
}

export function Model3() {
  const [activeStep, setActiveStep] = useState(1);
  const [dipOmitted, setDipOmitted] = useState(false);
  /* 幻灯片视图：current = 当前步，prev = 正在滑出的上一步，dir = 切换方向 */
  const [view, setView] = useState<{
    current: number;
    prev: number | null;
    dir: 1 | -1;
  }>({ current: 1, prev: null, dir: 1 });
  /* 新步骤从顶部开始阅读。 */
  const [entry, setEntry] = useState<"top" | "bottom">("top");
  const deckRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  /* 滑出层保留切换前的滚动位置 */
  const outScrollRef = useRef(0);
  /* 滚动映射：记录当前步以判断切换方向 */
  const lastStepRef = useRef(1);
  /* 当前步（供边界步进读取） */
  const stepRef = useRef(1);
  /* The deck holds all but the last step; the final step is rendered as a
     regular section between the deck and the references. */
  const deckSteps = m3Steps.slice(0, -1);
  const finalStep = m3Steps[m3Steps.length - 1];
  const total = deckSteps.length;

  useEffect(() => {
    stepRef.current = activeStep;
  }, [activeStep]);

  /* Remove the outgoing layer just after the Engineering-length transition. */
  useEffect(() => {
    setView((v) =>
      v.current === activeStep
        ? v
        : {
            current: activeStep,
            prev: v.current,
            dir: activeStep > v.current ? 1 : -1,
          },
    );
  }, [activeStep]);

  useEffect(() => {
    if (view.prev === null) return;
    const timer = setTimeout(() => setView((v) => ({ ...v, prev: null })), 420);
    return () => clearTimeout(timer);
  }, [view]);

  const currentNum = view.current;

  /* 新幻灯片挂载后设置初始滚动位置 */
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.scrollTop = entry === "bottom" ? el.scrollHeight : 0;
  }, [currentNum, entry]);

  useLayoutEffect(() => {
    const panel = contentRef.current;
    if (!panel || currentNum !== 9) {
      setDipOmitted(false);
      return;
    }
    const marker = panel.querySelector<HTMLElement>(
      '[data-model-milestone="neglect-dipolar"]',
    );
    if (!marker) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      setDipOmitted(
        marker.getBoundingClientRect().top <=
          panel.getBoundingClientRect().top + panel.clientHeight * 0.7,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(panel);
    panel.addEventListener("scroll", schedule, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      panel.removeEventListener("scroll", schedule);
    };
  }, [currentNum]);

  /* 跳转到某一步：把页面滚到跑道中对应的进度位置（同 engineering） */
  const scrollToStep = useCallback(
    (target: number, behavior: ScrollBehavior = "instant") => {
      const deck = deckRef.current;
      if (!deck) return;
      const range = deck.offsetHeight - window.innerHeight;
      const top = deck.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: top + (range * target) / Math.max(1, total) + 2,
        behavior,
      });
    },
    [total],
  );

  /* 左右方向键与滚轮等效：切换上一步 / 下一步 */
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
      const target = forward ? currentNum : currentNum - 2;
      if (target < 0 || target > total - 1) return;
      event.preventDefault();
      scrollToStep(target, "smooth");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentNum, total, scrollToStep]);

  useContainedStepperScroll({
    stageRef,
    runwayRef: deckRef,
    panelRef: contentRef,
    cardRef,
    getIndex: () => stepRef.current - 1,
    getCount: () => total,
    onAdvance: (index) => {
      const target = index + 1;
      outScrollRef.current = contentRef.current?.scrollTop ?? 0;
      setEntry("top");
      stepRef.current = target;
      lastStepRef.current = target;
      setActiveStep(target);
      scrollToStep(index);
    },
  });

  /* Hidden step progress shared with the other steppers: one interval per
     step; the slide switches when its interval completes. */
  useStepperProgress({
    getRunway: () => deckRef.current,
    count: total,
    onIndex: (index) => {
      const target = index + 1;
      if (target === lastStepRef.current) return;
      outScrollRef.current = contentRef.current?.scrollTop ?? 0;
      setEntry("top");
      lastStepRef.current = target;
      setActiveStep(target);
    },
  });

  const step = deckSteps.find((s) => s.num === view.current) ?? deckSteps[0];
  const prevStep =
    view.prev !== null
      ? (m3Steps.find((s) => s.num === view.prev) ?? null)
      : null;

  return (
    <>
      <h2 className="mt-5 mb-3">{m3Title}</h2>
      <Blocks blocks={m3Overview} />
      <Blocks blocks={m3Question} />

      <div
        className="m3-deck"
        ref={deckRef}
        style={{ "--m3-count": total } as CSSProperties}
      >
        <div className="m3-deck__stage" ref={stageRef}>
          {/* 主方程：随步骤逐步积累各项 */}
          <div className="m3-master">
            <p className="m3-master__label">
              Total free energy — accumulated step by step
            </p>
            <div className="m3-master__eq">
              <span className="m3-master__prefix">
                <MathFormula>{"\\psi ="}</MathFormula>
              </span>
              {MASTER_TERMS.map((term, index) => {
                const on =
                  term.steps.length > 0 &&
                  activeStep >= Math.min(...term.steps);
                const fresh = term.steps.includes(activeStep);
                const omitted =
                  term.id === "dip" && activeStep === 9 && dipOmitted;
                return (
                  <span
                    key={term.id}
                    data-term={term.id}
                    aria-hidden={omitted || undefined}
                    className={`m3-term${on ? " m3-term--on" : ""}${
                      fresh ? " m3-term--new" : ""
                    }${omitted ? " m3-term--omitted" : ""}`}
                  >
                    {index > 0 && <span className="m3-term__op">+</span>}
                    <MathFormula>{term.latex}</MathFormula>
                  </span>
                );
              })}
            </div>
            <div className="m3-dots" role="navigation" aria-label="Model steps">
              {deckSteps.map((s) => (
                <button
                  key={s.num}
                  type="button"
                  className={`m3-dot${
                    s.num === activeStep ? " m3-dot--active" : ""
                  }${s.num < activeStep ? " m3-dot--done" : ""}`}
                  aria-label={`Step ${s.num}: ${s.title}`}
                  onClick={() => scrollToStep(s.num - 1)}
                >
                  {s.num}
                </button>
              ))}
            </div>
          </div>

          {/* 固定文本框：仅文本滑入滑出（裁剪在框内） */}
          <div className="m3-slide" ref={cardRef}>
            <div className="m3-slides">
              {prevStep && (
                <SlideInner
                  key={`out-${prevStep.num}`}
                  step={prevStep}
                  variant="out"
                  dir={view.dir}
                  animate
                  initialScroll={outScrollRef.current}
                />
              )}
              <SlideInner
                key={`in-${step.num}`}
                step={step}
                variant="in"
                dir={view.dir}
                animate={view.prev !== null}
                chain={false}
                contentRef={(el) => {
                  contentRef.current = el;
                }}
              />
            </div>
          </div>
        </div>

        {/* 目录锚点：每步滚动进度位置处的隐藏标题 */}
        {deckSteps.map((s) => (
          <h3
            key={s.num}
            className="visually-hidden m3-anchor"
            data-toc-track="true"
            style={{ "--m3-seg": s.num - 1 } as CSSProperties}
          >
            {s.num} {s.title}
          </h3>
        ))}
      </div>

      {/* 第 10 步移到卡片之外：卡片与 references 之间 */}
      <h3 className="mt-5 mb-3">{finalStep.title}</h3>
      <p className="m3-final-goal">
        <em>{finalStep.goal}</em>
      </p>
      <Blocks blocks={finalStep.blocks} />

      <References level={3}>
        <div className="references-list references-list--paragraphs">
          <Blocks blocks={m3References} />
        </div>
      </References>
    </>
  );
}
