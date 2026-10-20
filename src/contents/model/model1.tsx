import { FigureCaptionText } from "../../components/FigureCaption";
import { References } from "../../components/References";
import { CitationText } from "../../components/CitationText";
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
import {
  useCardWheel,
  useStepperProgress,
} from "../../components/stepperWheel";
import { MathFormula } from "../../components/MathFormula";
import { DataTable } from "../../components/table";
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
];

function Parts({
  parts,
  citationize = true,
}: {
  parts: M1Part[];
  citationize?: boolean;
}) {
  const content = parts.map((part, index) => {
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
    return (
      <span key={index}>
        {citationize ? (
          <CitationText validReferences={[1, 2, 3, 4, 5, 6]}>
            {part.v}
          </CitationText>
        ) : (
          part.v
        )}
      </span>
    );
  });
  return /^\s*Figure\s+\S+\s*\|/.test(parts.map((part) => part.v).join("")) ? (
    <FigureCaptionText>{content}</FigureCaptionText>
  ) : (
    <>{content}</>
  );
}

function ValidationHighlight() {
  return (
    <section
      className="m1-validation"
      aria-label="Independent validation with 2KY16"
    >
      <h4 className="m1-validation__heading">
        2KY16: independent dry-lab prediction validated by wet-lab data
      </h4>
      <dl className="m1-validation__metrics">
        <div>
          <dt>Dry-lab prediction (mean)</dt>
          <dd>
            53.05 <span>kPa</span>
          </dd>
        </div>
        <div>
          <dt>Wet-lab measurement</dt>
          <dd>
            53.32 <span>kPa</span>
          </dd>
        </div>
        <div className="m1-validation__error">
          <dt>Relative error of the mean</dt>
          <dd>0.51%</dd>
          <span className="m1-validation__badge">Within 1%</span>
        </div>
      </dl>
      <p className="m1-validation__note">
        <strong>
          Independent dry-lab modeling of 2KY16 matched the wet-lab result
        </strong>
        , with the predicted mean differing by only{" "}
        <strong>0.51% (within 1%).</strong>
      </p>
    </section>
  );
}

function Blocks({
  blocks,
  citationize = true,
}: {
  blocks: M1Block[];
  citationize?: boolean;
}) {
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
                style={block.width ? { maxWidth: `min(100%, ${block.width}px)` } : undefined}
              />
            </figure>
          );
        }
        if (block.t === "video") {
          return (
            <div
              key={index}
              className="my-4"
              style={{ maxWidth: 840, marginInline: "auto" }}
            >
              <div className="ratio ratio-16x9">
                <iframe
                  src={block.src}
                  title={block.alt ?? "2KY5 100 ns FAMD"}
                  allow="fullscreen"
                  allowFullScreen
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  style={{ border: 0 }}
                />
              </div>
              <p className="small mt-2 mb-0">
                <a
                  href={block.src?.replace("/videos/embed/", "/w/")}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open video on iGEM Video Universe
                </a>
              </p>
            </div>
          );
        }
        if (block.t === "table") {
          return (
            <DataTable
              key={index}
              head={block.head ?? []}
              rows={block.rows ?? []}
            />
          );
        }
        const followsFigure = index > 0 && blocks[index - 1].t === "figure";
        return (
          <p
            key={index}
            className={followsFigure ? "m1-figure-caption" : undefined}
          >
            <Parts parts={block.parts ?? []} citationize={citationize} />
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
  const innerRef = useRef<HTMLDivElement>(null);

  /* Keep a tall figure and its caption inside the visible content area: the
     caption keeps its height and the image takes whatever room is left. */
  useLayoutEffect(() => {
    const content =
      innerRef.current?.querySelector<HTMLElement>(".m1-slide__content");
    if (!content || step.num === 2 || step.num === 3) return;
    const fit = () => {
      const figures = Array.from(
        content.querySelectorAll<HTMLElement>(".m1-figure"),
      );
      figures.forEach((figure) => {
        const img = figure.querySelector<HTMLImageElement>("img");
        if (!img) return;
        img.style.maxHeight = "";
        const next = figure.nextElementSibling;
        const caption =
          next instanceof HTMLElement &&
          next.classList.contains("m1-figure-caption")
            ? next
            : null;
        const figureStyle = getComputedStyle(figure);
        const figureMargins =
          parseFloat(figureStyle.marginTop) +
          parseFloat(figureStyle.marginBottom);
        let captionHeight = 0;
        if (caption) {
          const captionStyle = getComputedStyle(caption);
          captionHeight =
            caption.offsetHeight +
            parseFloat(captionStyle.marginTop) +
            parseFloat(captionStyle.marginBottom);
        }
        const available =
          content.clientHeight - figureMargins - captionHeight - 16;
        img.style.maxHeight = `${Math.max(140, Math.floor(available))}px`;
      });
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(content);
    window.addEventListener("resize", fit);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [step.num]);

  return (
    <div
      ref={innerRef}
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
        }${step.num === 2 || step.num === 3 ? " m1-slide__content--readable-figures" : ""}`}
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
  const cardRef = useRef<HTMLDivElement | null>(null);
  /* 滑出层保留切换前的滚动位置 */
  const outScrollRef = useRef(0);
  /* 滚动映射：记录当前步以判断切换方向 */
  const lastStepRef = useRef(1);
  /* 当前步（供边界步进读取） */
  const stepRef = useRef(1);
  // Keep validation outside the pipeline, like the final section in Model 3.
  const deckSteps = m1Steps.slice(0, -1);
  const finalStep = m1Steps[m1Steps.length - 1];
  const total = deckSteps.length;

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

  /* Wheel: shared behaviour — the slide's text scrolls first (1.5x gain,
     one indivisible notch); once it is at either end the notch drives the
     page, which advances the hidden step progress below. */
  useCardWheel(contentRef, cardRef);

  /* Hidden step progress shared with the other steppers: one interval per
     step; the slide switches when its interval completes. */
  useStepperProgress({
    getRunway: () => deckRef.current,
    count: total,
    onIndex: (index) => {
      const target = index + 1;
      if (target === lastStepRef.current) return;
      outScrollRef.current = contentRef.current?.scrollTop ?? 0;
      setEntry(
        target > lastStepRef.current || !STEP_ADVANCE_ENABLED
          ? "top"
          : "bottom",
      );
      lastStepRef.current = target;
      setActiveStep(target);
    },
    suppressUntilRef,
  });

  const step = deckSteps.find((s) => s.num === view.current) ?? deckSteps[0];
  const prevStep =
    view.prev !== null
      ? (deckSteps.find((s) => s.num === view.prev) ?? null)
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
              {deckSteps.map((s) => (
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
          <div className="m1-slide" ref={cardRef}>
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
        {deckSteps.map((s) => (
          <h3
            key={s.num}
            className="visually-hidden m1-anchor"
            data-toc-track="true"
            style={{ "--m1-seg": s.num - 1 } as CSSProperties}
          >
            {s.num} {s.title}
          </h3>
        ))}
      </div>

      <h3 className="mt-5 mb-3">{finalStep.title}</h3>
      <ValidationHighlight />
      <Blocks blocks={finalStep.blocks} />

      <References level={3}>
        <div className="references-list references-list--paragraphs">
          <Blocks
            citationize={false}
            blocks={m1References.filter(
              (block) => block.t !== "h3" || block.v !== "References",
            )}
          />
        </div>
      </References>
    </>
  );
}
