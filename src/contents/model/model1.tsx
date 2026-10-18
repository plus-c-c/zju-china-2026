import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  STEP_ADVANCE_ENABLED,
  useBoundaryStepAdvance,
} from "../../components/useBoundaryStepAdvance";
import { MathFormula } from "../../components/MathFormula";
import {
  m1Overview,
  m1References,
  m1Steps,
  m1Title,
  type M1Block,
  type M1Part,
  type M1Step,
} from "./model1-data";
import "./model1.css";

/**
 * Model 1 — SELP hydrogel modeling as a stage-by-stage deck.
 *
 * · The modeling pipeline serves as the progress strip: each step lights
 *   up its stage of the workflow.
 * · The step texts rotate inside one fixed card: only the text slides
 *   (clipped by the card frame), left/right slide-in / slide-out.
 * · Scrolling the text to its bottom advances to the next step (at the
 *   last step the page continues to the references); scrolling back at
 *   the top returns to the previous step. Figures scroll inline.
 */

/* Pipeline stages — step N lights stage N. */
const M1_STAGES = [
  { id: "conf", label: "Conformations", step: 1 },
  { id: "network", label: "Network", step: 2 },
  { id: "sampling", label: "Sampling", step: 3 },
  { id: "stability", label: "Stability", step: 4 },
  { id: "compression", label: "Compression", step: 5 },
  { id: "calibration", label: "Calibration", step: 6 },
  { id: "validation", label: "Validation", step: 7 },
];

function Parts({ parts }: { parts: M1Part[] }) {
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

function Blocks({ blocks }: { blocks: M1Block[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.t === "h3") {
          return (
            <h3 key={index} className="mt-5 mb-3">
              {block.v}
            </h3>
          );
        }
        if (block.t === "h4") {
          return (
            <h4 key={index} className="mt-4 mb-2">
              {block.v}
            </h4>
          );
        }
        if (block.t === "display") {
          return (
            <MathFormula key={index} display>
              {block.v ?? ""}
            </MathFormula>
          );
        }
        if (block.t === "figure") {
          return (
            <figure key={index} className="m1-figure">
              <img
                src={block.src}
                alt={block.alt ?? ""}
                loading="lazy"
                decoding="async"
                style={block.width ? { maxWidth: block.width } : undefined}
              />
            </figure>
          );
        }
        return (
          <p key={index}>
            <Parts parts={block.parts ?? []} />
          </p>
        );
      })}
    </>
  );
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
  step: M1Step;
  variant: "in" | "out";
  dir: 1 | -1;
  animate: boolean;
  chain?: boolean;
  initialScroll?: number;
  contentRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      className={`m1-slide__inner m1-slide__inner--${variant}${
        animate
          ? dir === 1
            ? " m1-slide__inner--fwd"
            : " m1-slide__inner--back"
          : ""
      }`}
      aria-hidden={variant === "out"}
    >
      <div className="m1-slide__head">
        <span className="m1-slide__num">Step {step.num}</span>
        <span className="m1-slide__title">{step.title}</span>
      </div>
      <div
        className={`m1-slide__content${
          chain ? " m1-slide__content--chain" : ""
        }`}
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

export function SelpHydrogelModeling() {
  const [activeStep, setActiveStep] = useState(1);
  /* 幻灯片视图：current = 当前步，prev = 正在滑出的上一步，dir = 切换方向 */
  const [view, setView] = useState<{
    current: number;
    prev: number | null;
    dir: 1 | -1;
  }>({ current: 1, prev: null, dir: 1 });
  /* 切换后新内容的初始滚动位置（上滑返回时停在底部） */
  const [entry, setEntry] = useState<"top" | "bottom">("top");
  const deckRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  /* 滑出层保留切换前的滚动位置 */
  const outScrollRef = useRef(0);
  /* 滚动映射：记录当前步以判断切换方向 */
  const lastStepRef = useRef(1);
  /* 当前步（供边界步进读取） */
  const stepRef = useRef(1);
  const total = m1Steps.length;

  useEffect(() => {
    stepRef.current = activeStep;
  }, [activeStep]);

  /* 步骤变化 → 触发滑出/滑入（560ms 后移除滑出层） */
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
    const timer = setTimeout(() => setView((v) => ({ ...v, prev: null })), 560);
    return () => clearTimeout(timer);
  }, [view]);

  const currentNum = view.current;

  /* 新幻灯片挂载后设置初始滚动位置 */
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.scrollTop = entry === "bottom" ? el.scrollHeight : 0;
  }, [currentNum, entry]);

  /* 跳转到某一步：把页面滚到跑道中对应的进度位置（同 engineering） */
  const scrollToStep = useCallback(
    (target: number, behavior: ScrollBehavior = "instant") => {
      const deck = deckRef.current;
      if (!deck) return;
      const range = deck.offsetHeight - window.innerHeight;
      const top = deck.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: top + (range * target) / Math.max(1, total - 1),
        behavior,
      });
    },
    [total],
  );

  /* 内容滚到边界后的滚轮/触摸：一次手势步进一格（首/末步交给页面） */
  const suppressUntilRef = useBoundaryStepAdvance({
    stageRef,
    panelRef: contentRef,
    getIndex: () => stepRef.current,
    getCount: () => total,
    onAdvance: (target) => {
      outScrollRef.current = contentRef.current?.scrollTop ?? 0;
      setEntry(
        target > stepRef.current || !STEP_ADVANCE_ENABLED ? "top" : "bottom",
      );
      lastStepRef.current = target;
      setActiveStep(target);
      scrollToStep(target - 1, "smooth");
    },
  });

  /* 外层滚轮驱动：跑道内的滚动进度 → 步骤（与 homepage / engineering 相同的粘滞机制） */
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (performance.now() < suppressUntilRef.current) return;
      const rect = deck.getBoundingClientRect();
      const range = deck.offsetHeight - window.innerHeight;
      if (range <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / range));
      const target = Math.round(progress * (total - 1)) + 1;
      if (target === lastStepRef.current) return;
      outScrollRef.current = contentRef.current?.scrollTop ?? 0;
      setEntry(
        target > lastStepRef.current || !STEP_ADVANCE_ENABLED
          ? "top"
          : "bottom",
      );
      lastStepRef.current = target;
      setActiveStep(target);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [total, suppressUntilRef]);

  const step = m1Steps.find((s) => s.num === view.current) ?? m1Steps[0];
  const prevStep =
    view.prev !== null
      ? (m1Steps.find((s) => s.num === view.prev) ?? null)
      : null;

  return (
    <>
      <h2 className="mt-5 mb-3">{m1Title}</h2>
      <Blocks blocks={m1Overview} />

      <div
        className="m1-deck"
        ref={deckRef}
        style={{ "--m1-count": total } as CSSProperties}
      >
        <div className="m1-deck__stage" ref={stageRef}>
          {/* 流水线阶段条：随步骤逐步点亮 */}
          <div className="m1-master">
            <p className="m1-master__label">
              Modeling pipeline — built stage by stage
            </p>
            <div className="m1-master__eq">
              {M1_STAGES.map((stage, index) => {
                const on = activeStep >= stage.step;
                const fresh = activeStep === stage.step;
                return (
                  <span
                    key={stage.id}
                    className={`m1-term${on ? " m1-term--on" : ""}${
                      fresh ? " m1-term--new" : ""
                    }`}
                  >
                    {index > 0 && <span className="m1-term__op">→</span>}
                    {stage.label}
                  </span>
                );
              })}
            </div>
            <div className="m1-dots" role="navigation" aria-label="Model steps">
              {m1Steps.map((s) => (
                <button
                  key={s.num}
                  type="button"
                  className={`m1-dot${
                    s.num === activeStep ? " m1-dot--active" : ""
                  }${s.num < activeStep ? " m1-dot--done" : ""}`}
                  aria-label={`Step ${s.num}: ${s.title}`}
                  onClick={() => scrollToStep(s.num - 1)}
                >
                  {s.num}
                </button>
              ))}
            </div>
          </div>

          {/* 固定文本框：仅文本滑入滑出（裁剪在框内） */}
          <div className="m1-slide">
            <div className="m1-slides">
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
                chain={
                  !STEP_ADVANCE_ENABLED ||
                  currentNum === 1 ||
                  currentNum === total
                }
                contentRef={(el) => {
                  contentRef.current = el;
                }}
              />
            </div>
          </div>
        </div>

        {/* 目录锚点：每步滚动进度位置处的隐藏标题 */}
        {m1Steps.map((s) => (
          <h3
            key={s.num}
            className="visually-hidden m1-anchor"
            style={{ "--m1-seg": s.num - 1 } as CSSProperties}
          >
            {s.num}. {s.title}
          </h3>
        ))}
      </div>

      <h3 className="mt-5 mb-3">References</h3>
      <Blocks blocks={m1References} />
    </>
  );
}
