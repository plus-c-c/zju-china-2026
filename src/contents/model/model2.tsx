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
import { MathFormula } from "../../components/MathFormula";
import {
  STEP_ADVANCE_ENABLED,
  useBoundaryStepAdvance,
} from "../../components/useBoundaryStepAdvance";
import "./model.css";

/** Scroll distance per protein step, in vh. */
const STEP_DVH = 40;

/** Section headings of the module and the protein step each belongs to.
 *  Rendered as hidden anchors so the left TOC lists every heading and a
 *  click scrolls to the matching step (the figure switches with it). */
const STEP_HEADINGS = [
  { step: 0, title: "1 Research Background" },
  { step: 1, title: "2 Model Construction" },
  { step: 2, title: "3 Stability Screening" },
  { step: 4, title: "4 Effects of Stabilization on the Catalytic Region" },
  { step: 5, title: "5 Turnover Optimization" },
  { step: 8, title: "6 Conclusion" },
];

/** On-screen width of the main protein, in px — kept identical across all
 *  figures so switching steps does not resize the subject. */
const PROTEIN_PX = 170;

interface ProteinStep {
  key: string;
  /** Left column: the structure rendering of this protein. */
  figure: ReactNode;
  /** Height (px) of the rendered figure for wide steps; the text card's top
   *  edge starts just below the image. */
  figureHeight?: number;
  /** Figure caption, under the structure. */
  caption: ReactNode;
  /** Right column: the design text shown for this protein. */
  body: ReactNode;
}

interface StructureFigureProps {
  src: string;
  alt: string;
  /** Crop rectangle of the wide source sheet (see ModelFigure in model.tsx). */
  bounds: readonly [number, number, number, number];
  /** Width of the main protein as a fraction of the crop width (measured on
   *  the asset); the frame is sized so the protein always renders at
   *  PROTEIN_PX regardless of the crop. */
  structureFraction: number;
  /** x-position (fraction of the crop width) of the protein's geometric
   *  centre; the frame is shifted so that point stays at the stage centre. */
  focusX: number;
  /** Wide figures (structure + zoom inset): the zoom panel spills into the
   *  text area and the text card starts below the image. */
  wide?: boolean;
  /** Position of this figure in the step sequence; the sign of the change
   *  picks the slide direction (forward = out left / in from right). */
  order: number;
}

/** Structure crop — the source images are wide multi-panel sheets; the
 *  bounds pick the visible region (same arrangement as ModelFigure). */
interface CropSnapshot {
  src: string;
  bounds: readonly [number, number, number, number];
  structureFraction: number;
  order: number;
}

/** Crop geometry of one sheet, as inline styles (the sheet is 3000 px wide;
 *  the crop is addressed with percentages of the containing box). */
function cropStyle(
  bounds: readonly [number, number, number, number],
): CSSProperties {
  const [left, top, right, bottom] = bounds;
  const contentWidth = right - left;
  const contentHeight = bottom - top;
  return {
    width: `${(3000 / contentWidth) * 100}%`,
    left: `${(-left / contentWidth) * 100}%`,
    top: `${(-top / contentHeight) * 100}%`,
  };
}

function frameSize(snapshot: CropSnapshot) {
  const [left, top, right, bottom] = snapshot.bounds;
  const width = Math.round(PROTEIN_PX / snapshot.structureFraction);
  const height = Math.round(width / ((right - left) / (bottom - top)));
  return { width, height };
}

function StructureFigure({
  src,
  alt,
  bounds,
  structureFraction,
  focusX,
  wide,
  order,
}: StructureFigureProps) {
  const [left, top, right, bottom] = bounds;
  const contentWidth = right - left;
  const contentHeight = bottom - top;

  // Slide transition: the outgoing crop slides out to one side while the
  // incoming one slides in from the other (direction follows the step
  // order, so Next and Previous mirror each other).
  const latestRef = useRef<CropSnapshot | null>(null);
  const timerRef = useRef(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [outgoing, setOutgoing] = useState<
    (CropSnapshot & { width: number; height: number }) | null
  >(null);

  useLayoutEffect(() => {
    const previous = latestRef.current;
    latestRef.current = { src, bounds, structureFraction, order };
    if (!previous || previous.src === src) return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setDirection(order >= previous.order ? "forward" : "backward");
    setOutgoing({ ...previous, ...frameSize(previous) });
    timerRef.current = window.setTimeout(() => setOutgoing(null), 420);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  return (
    <div
      className={`protein-structure${
        wide ? " protein-structure--wide" : ""
      } protein-slide-${direction}`}
    >
      <div
        className="protein-structure-frame"
        style={
          {
            "--protein-ratio": contentWidth / contentHeight,
            "--protein-frame-w": `${Math.round(PROTEIN_PX / structureFraction)}px`,
            "--protein-focus-x": focusX,
          } as CSSProperties
        }
      >
        <span className="protein-structure-in" key={src}>
          <img src={src} alt={alt} loading="lazy" style={cropStyle(bounds)} />
        </span>
        {outgoing && (
          <span className="protein-structure-out" aria-hidden="true">
            <span
              className="protein-structure-out-box"
              style={{ width: outgoing.width, height: outgoing.height }}
            >
              <img
                src={outgoing.src}
                alt=""
                style={cropStyle(outgoing.bounds)}
              />
            </span>
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Protein stepper — the same scroll pattern as the home-page story sections
 * and the Engineering DBTL cluster: the two-column cluster (structure +
 * caption + Previous/Next on the left, design text on the right) pins to the
 * middle of the viewport, and the page scroll advances one protein per step.
 * The wheel over the right-hand text scrolls that text first; the page — and
 * therefore the protein — only moves once the text reaches its end.
 */
function ProteinStepper({ steps }: { steps: ProteinStep[] }) {
  const [index, setIndex] = useState(0);
  const runwayRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const stepsRef = useRef(steps);
  indexRef.current = index;
  stepsRef.current = steps;

  /** Jump to a protein and keep the page scroll in sync (the pinned view
   *  does not move; only the scrollbar does). */
  const goTo = useCallback(
    (target: number, behavior: ScrollBehavior = "instant") => {
      if (target < 0 || target > stepsRef.current.length - 1) return;
      setIndex(target);
      const runway = runwayRef.current;
      if (!runway) return;
      const total = runway.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const top = runway.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: top + (total * target) / Math.max(1, stepsRef.current.length - 1),
        behavior,
      });
    },
    [],
  );

  /* 左右方向键与滚轮等效：切换上一步 / 下一步 */
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
      goTo(target);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo]);

  /** Boundary stepping: the wheel / touch advances one protein per gesture
   *  once the text panel reaches its bottom (or its top, scrolling up). */
  const suppressUntilRef = useBoundaryStepAdvance({
    stageRef: pinRef,
    panelRef,
    getIndex: () => indexRef.current,
    getCount: () => stepsRef.current.length,
    onAdvance: (target) => goTo(target, "smooth"),
  });

  // Bottom-anchored text card: regular steps stretch until the top gap
  // equals the bottom gap (CSS default height); wide steps fit their
  // content (measured height, set inline). Either way the bottom stays
  // fixed and only the top edge moves, animated by the CSS transition.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const apply = () => {
      const pin = pinRef.current;
      const wide = Boolean(stepsRef.current[indexRef.current]?.figureHeight);
      if (!wide) {
        panel.style.height = "";
        pin?.style.removeProperty("--protein-card-h");
        return;
      }
      const inner = panel.querySelector<HTMLElement>(".protein-text-inner");
      if (!inner) return;
      const styles = window.getComputedStyle(panel);
      const padding =
        parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
      const height = inner.offsetHeight + padding;
      panel.style.height = `${height}px`;
      // Publish the card's height so the wide figure can keep its bottom
      // clear of the card on short viewports (see .protein-pin--wide).
      pin?.style.setProperty("--protein-card-h", `${height}px`);
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [index]);

  // The right-hand text resets whenever the protein switches: forward lands
  // at the top, backward at the bottom (continuing an upward read).
  const entryDirectionRef = useRef<"forward" | "backward">("forward");
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.scrollTo({
      top:
        STEP_ADVANCE_ENABLED && entryDirectionRef.current === "backward"
          ? panel.scrollHeight
          : 0,
    });
  }, [index]);

  // Map the scroll progress through the runway to the protein index.
  useEffect(() => {
    const runway = runwayRef.current;
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

  // Direction of the caption / text slide; the outgoing step stays
  // rendered until its slide-out finishes. When the design text is
  // identical between the two steps (e.g. 7a / 7b), textChanged is false:
  // the text card stays static (no slide-out / slide-in) while the figure
  // and caption still switch.
  const transitionTimerRef = useRef(0);
  const [transition, setTransition] = useState<{
    direction: "forward" | "backward";
    outgoing: ProteinStep | null;
    textChanged: boolean;
  }>({ direction: "forward", outgoing: null, textChanged: true });
  const previousIndexRef = useRef(0);
  const textContentRef = useRef("");

  useLayoutEffect(() => {
    const previousIndex = previousIndexRef.current;
    previousIndexRef.current = index;
    const inner = panelRef.current?.querySelector(".protein-text-inner");
    const text = (inner?.textContent ?? "").replace(/\s+/g, " ").trim();
    if (previousIndex === index) {
      textContentRef.current = text;
      return;
    }
    const textChanged = text !== textContentRef.current;
    textContentRef.current = text;
    entryDirectionRef.current = index > previousIndex ? "forward" : "backward";
    if (transitionTimerRef.current)
      window.clearTimeout(transitionTimerRef.current);
    setTransition({
      direction: index > previousIndex ? "forward" : "backward",
      outgoing: stepsRef.current[previousIndex] ?? null,
      textChanged,
    });
    transitionTimerRef.current = window.setTimeout(
      () => setTransition((current) => ({ ...current, outgoing: null })),
      420,
    );
  }, [index]);

  useEffect(
    () => () => {
      if (transitionTimerRef.current)
        window.clearTimeout(transitionTimerRef.current);
    },
    [],
  );

  const step = steps[index] ?? steps[0];

  return (
    <div
      className="protein-runway"
      ref={runwayRef}
      style={{
        height: `calc(${100 + Math.max(0, steps.length - 1) * STEP_DVH}dvh)`,
      }}
    >
      <div
        className={`protein-pin protein-slide-${transition.direction}${
          step?.figureHeight ? " protein-pin--wide" : ""
        }`}
        ref={pinRef}
        style={
          step?.figureHeight
            ? ({
                "--protein-figure-h": `${step.figureHeight}px`,
              } as CSSProperties)
            : undefined
        }
      >
        <div className="protein-cluster">
          <figure className="protein-figure">
            {step?.figure}
            <figcaption className="protein-caption">
              <div className="protein-caption-stack">
                {transition.outgoing && (
                  <div className="protein-caption-out" aria-hidden="true">
                    {transition.outgoing.caption}
                  </div>
                )}
                <div className="protein-caption-in" key={step?.key}>
                  {step?.caption}
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
        <div
          className={`protein-text${
            !STEP_ADVANCE_ENABLED ||
            index === 0 ||
            index === steps.length - 1
              ? " protein-text--chain"
              : ""
          }`}
          ref={panelRef}
          tabIndex={0}
          role="region"
          aria-label="Rational design of SnoopLigase2"
        >
          <div className="protein-text-stack">
            {transition.outgoing && transition.textChanged && (
              <div className="protein-text-out" aria-hidden="true">
                {transition.outgoing.body}
              </div>
            )}
            <div
              className={`protein-text-inner${
                transition.textChanged ? "" : " protein-text-inner--static"
              }`}
              key={step?.key}
            >
              {step?.body}
            </div>
          </div>
        </div>
        <div className="protein-nav" aria-label="Protein navigation">
          <button
            type="button"
            className="protein-nav-button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
          >
            Previous
          </button>
          <button
            type="button"
            className="protein-nav-button"
            onClick={() => goTo(index + 1)}
            disabled={index === steps.length - 1}
          >
            Next
          </button>
        </div>
      </div>
      {/* Hidden TOC anchors: every section heading, at its protein's scroll
          position. The first anchor sits half a step in (0.2 viewport), so the
          TOC highlights it exactly when the pin engages and the deck takes
          over the screen; later anchors stay aligned with their figure
          switches via the same 0.2-viewport threshold. */}
      {STEP_HEADINGS.map(({ step, title }) => (
        <h3
          key={title}
          className="visually-hidden protein-anchor"
            data-toc-track="true"
          style={{ "--protein-step": step === 0 ? 0.5 : step } as CSSProperties}
        >
          {title}
        </h3>
      ))}
    </div>
  );
}

const SNOOP_STEPS: ProteinStep[] = [
  {
    key: "template",
    figure: (
      <StructureFigure
        src="https://static.igem.wiki/teams/6102/wiki/images/model/snoopligase/1.avif"
        alt="Ligase template structure and catalytic residues"
        bounds={[731, 280, 1926, 1569]}
        structureFraction={0.68}
        focusX={0.562}
        order={0}
      />
    ),
    caption: (
      <p>
        <em>
          {"Figure 1 | Local structure of residues 734–860 in chain A of 2WW8"}
        </em>
      </p>
    ),
    body: (
      <>
        <h3 className="mt-5 mb-3" data-toc="exclude">{"1 Research Background"}</h3>
        <p>
          {
            "SnoopLigase2 catalyzes the formation of a covalent isopeptide bond between SnoopTag2 and DogTag, providing a short peptide-based ligation interface for different protein modules. Previous research has also shown that SnoopLigase2 binds strongly and noncovalently to the ligated product, limiting product release and catalyst recycling. "
          }
          <strong>
            {
              "This led us to recognize that completion of the ligation reaction and release of the ligase are two processes that must be evaluated separately."
            }
          </strong>
          {"[1]"}
        </p>
        <p>
          {"We therefore proposed a stepwise design hypothesis: "}
          <strong>
            {
              "first, identify stabilization candidates with favorable structural compatibility"
            }
          </strong>
          {
            " to establish a foundation for subsequent engineering; then, on this background, "
          }
          <strong>
            {
              "screen for mutations that have a substantial effect on product-interface interactions while minimally affecting the unbound-state structure."
            }
          </strong>
          {
            " The purpose of the modeling was to identify candidates worth experimental validation, rather than to infer turnover directly from structural scores alone."
          }
        </p>
      </>
    ),
  },
  {
    key: "parental",
    figure: (
      <StructureFigure
        src="https://static.igem.wiki/teams/6102/wiki/images/model/snoopligase/2.avif"
        alt="Representative parental ligase structure"
        bounds={[1097, 287, 1945, 1585]}
        structureFraction={0.874}
        focusX={0.495}
        order={1}
      />
    ),
    caption: (
      <p>
        <em>
          {"Figure 2 | Representative conformation of the parental model"}
        </em>
      </p>
    ),
    body: (
      <>
        <h3 className="mt-5 mb-3" data-toc="exclude">{"2 Model Construction"}</h3>
        <p>
          {
            "We used the crystal structure of RrgA, 2WW8, as a template to construct a ligase core model containing 104 amino acids.[2]"
          }
        </p>
        <p>
          <strong>
            {
              "Based on previous engineering work, we introduced nine mutations to construct the initial model."
            }
          </strong>
          {
            " Using coordinate-constrained FastRelax in PyRosetta, we generated 20 parental models and selected several representative conformations. These models have identical sequences but represent different optimized conformations, reducing the dependence of subsequent screening on a single starting structure.[1, 3]"
          }
        </p>
      </>
    ),
  },
  {
    key: "sites",
    figure: (
      <StructureFigure
        src="https://static.igem.wiki/teams/6102/wiki/images/model/snoopligase/3.avif"
        alt="Five candidate stabilizing substitution sites"
        bounds={[884, 312, 2073, 1573]}
        structureFraction={0.635}
        focusX={0.532}
        order={2}
      />
    ),
    caption: (
      <p>
        <em>
          {
            "Figure 3 | Distribution of the five initial screening sites in the original representative conformation"
          }
        </em>
      </p>
    ),
    body: (
      <>
        <h3 className="mt-5 mb-3" data-toc="exclude">{"3 Stability Screening"}</h3>
        <p>
          <strong>
            {
              "Based on the literature, we adopted a strategy of introducing proline substitutions  in loop regions."
            }
          </strong>
          {
            " Proline restricts the conformational freedom of the backbone and may therefore provide a favorable stabilizing effect when the original local geometry is compatible with the substitution.[4]"
          }
        </p>
        <p>
          {
            "By jointly analyzing backbone dihedral angles, secondary structure, solvent exposure, and distance from key functional regions, we selected five candidates: A771P, N775P, E785P, S795P, and D796P. We then constructed mutants and matched controls for the representative conformations and performed repeated calculations using the same ref2015 scoring function, side-chain optimization scope, and FastRelax workflow.[5, 6]"
          }
        </p>
        <p>{"The primary evaluation metric for the unbound state was:"}</p>
        <MathFormula display>{"S_{mutant}-S_{control}"}</MathFormula>
        <p>
          {
            "A negative value indicates that the mutant has a lower Rosetta score under the current computational protocol. Screening also considered consistency across calculations, backbone displacement, steric clashes, and changes in local interactions."
          }
        </p>
      </>
    ),
  },
  {
    key: "construct1",
    figure: (
      <StructureFigure
        src="https://static.igem.wiki/teams/6102/wiki/images/model/snoopligase/4.avif"
        alt="Double mutant superimposed on its control"
        bounds={[852, 352, 1905, 1518]}
        structureFraction={0.652}
        focusX={0.608}
        order={3}
      />
    ),
    caption: (
      <p>
        <em>
          {
            "Figure 4 | Superposition of the double mutant and its matched control. The double mutant is shown in blue, and the control in gray."
          }
        </em>
      </p>
    ),
    body: (
      <>
        <p>
          {
            "Following single-mutation screening, A771P and E785P proceeded to combination assessment. Across three starting conformations, we performed 30 quartets of comparisons comprising the original structure, A771P, E785P, and the double mutant. The double mutant outperformed the corresponding original-structure control in all 30 calculations, with a median score difference across all quartets of approximately −9.24 REU. In 25 quartets, "
          }
          <strong>
            {"adding E785P to the A771P background provided a further benefit"}
          </strong>
          {
            ". Together with inspection of representative structures, these results led us to define the original structure carrying A771P and E785P as Construct1."
          }
        </p>
      </>
    ),
  },
  {
    key: "c1-product",
    figure: (
      <StructureFigure
        src="https://static.igem.wiki/teams/6102/wiki/images/model/snoopligase/5.avif"
        alt="Construct1 product-like structure"
        bounds={[620, 261, 2033, 1546]}
        structureFraction={0.619}
        focusX={0.586}
        order={4}
      />
    ),
    caption: (
      <p>
        <em>
          {
            "Figure 5 | Example of a C1 product-like structure containing the non-overlapping Tag2 background mutations"
          }
        </em>
      </p>
    ),
    body: (
      <>
        <h3 className="mt-5 mb-3" data-toc="exclude">
          {"4 Effects of Stabilization on the Catalytic Region."}
        </h3>
        <p>
          {
            "An improved unbound-state score does not directly demonstrate that ligation function is retained. "
          }
          <strong>
            {
              "We therefore constructed a single-chain product model containing the K742–N854 isopeptide bond and introduced SnoopTag2 mutations in the corresponding regions to examine the behavior of Construct1 in this structural context."
            }
          </strong>
        </p>
        <p>
          {
            "The evaluation included retention of the isopeptide linkage, changes in key distances around E803, overall conformational displacement, and an interaction proxy between the ligase core and the Tag/tail regions. However, the core–tail interactions of Construct1 were slightly more favorable in eight calculations, suggesting that the stabilization design may also have an enhancing effect."
          }
        </p>
      </>
    ),
  },
  {
    key: "turnover",
    figure: (
      <StructureFigure
        src="https://static.igem.wiki/teams/6102/wiki/images/model/snoopligase/6.avif"
        alt="Six candidate product-interface sites"
        bounds={[851, 339, 2039, 1448]}
        structureFraction={0.631}
        focusX={0.491}
        order={5}
      />
    ),
    caption: (
      <p>
        <em>{"Figure 6 | The six sites selected through screening"}</em>
      </p>
    ),
    body: (
      <>
        <h3 className="mt-5 mb-3" data-toc="exclude">{"5 Turnover Optimization"}</h3>
        <p>
          {
            "We performed a per-residue analysis of the 104 ligase core residues in 20 single-chain product models. Based on interface distances, contact extent, and structural protection criteria, we selected six sites—K792, N793, S795, E827, V828, and V831—and designed 12 substitutions comprising alanine-scanning mutations or more conservative replacements."
          }
        </p>
        <p>
          {
            "Each candidate was compared with its control in both the unbound and product-like states. In addition to the unbound-state score penalty, we calculated:"
          }
        </p>
        <MathFormula display>
          {"I_{\\mathrm{mutant}}-I_{\\mathrm{control}}"}
        </MathFormula>
        <p>
          {"Here, "}
          <MathFormula>{"I"}</MathFormula>
          {
            " is the Rosetta-calculated core–Tag/tail interaction value. A positive value indicates weakening of this interface interaction and serves as a metric for screening potential product-release candidates. Candidates must also satisfy checks of the overall structure and key functional geometry.[7]"
          }
        </p>
      </>
    ),
  },
  {
    key: "e827",
    figureHeight: 466,
    figure: (
      <StructureFigure
        src="https://static.igem.wiki/teams/6102/wiki/images/model/snoopligase/7.avif"
        alt="E827 control and local interface detail"
        bounds={[72, 39, 2913, 1713]}
        structureFraction={0.215}
        focusX={0.208}
        wide
        order={6}
      />
    ),
    caption: (
      <p>
        <em>
          {
            "Figure 7a | Representative product-like structure of the E827 control. The dashed line indicates the measured distance between K734 NZ and E827 OE2 (2.80 Å)."
          }
        </em>
      </p>
    ),
    body: (
      <>
        <p>
          <strong>
            {"Based on the combined analysis, we prioritized E827Q."}
          </strong>
          {
            " Its median unbound-state score difference was −0.138 REU, and its median product-interface interaction difference was +1.386 REU."
          }
        </p>
      </>
    ),
  },
  {
    key: "q827",
    figureHeight: 455,
    figure: (
      <StructureFigure
        src="https://static.igem.wiki/teams/6102/wiki/images/model/snoopligase/8.avif"
        alt="Q827 mutant and local interface detail"
        bounds={[72, 39, 2913, 1713]}
        structureFraction={0.22}
        focusX={0.206}
        wide
        order={7}
      />
    ),
    caption: (
      <p>
        <em>
          {
            "Figure 7b | The Q827 mutant in the same representation. The dashed line indicates the measured distance between K734 NZ and Q827 OE1 (5.87 Å)."
          }
        </em>
      </p>
    ),
    body: (
      <>
        <p>
          <strong>
            {"Based on the combined analysis, we prioritized E827Q."}
          </strong>
          {
            " Its median unbound-state score difference was −0.138 REU, and its median product-interface interaction difference was +1.386 REU."
          }
        </p>
      </>
    ),
  },
  {
    key: "zju",
    figure: (
      <StructureFigure
        src="https://static.igem.wiki/teams/6102/wiki/images/model/snoopligase/9.avif"
        alt="SnoopLigase2-ZJU mutation overview"
        bounds={[552, 344, 2025, 1537]}
        structureFraction={0.558}
        focusX={0.623}
        order={8}
      />
    ),
    caption: (
      <p>
        <em>{"Figure 8 | The overview of SnoopLigase2-ZJU."}</em>
      </p>
    ),
    body: (
      <>
        <h3 className="mt-5 mb-3" data-toc="exclude">{"6 Conclusion"}</h3>
        <p>
          <strong>
            {
              "Through rational engineering of SnoopLigase2, we introduced three cumulative mutations—A771P, E785P, and E827Q—improving its stability and turnover at the theoretical level."
            }
          </strong>
          {
            " We have now completed the modeling work, and wet-lab validation is proceeding in parallel."
          }
        </p>
      </>
    ),
  },
];

/** Model module 2 — rational design of SnoopLigase2 (design content). */
export function SnoopLigase2Design() {
  return (
    <>
      <h2 className="mt-5 mb-3">{"Rational Engineering of SnoopLigase2"}</h2>
      <h3 className="mt-5 mb-3">{"Overview"}</h3>
      <p>
        {
          "Modular protein assembly requires efficient and reliable ligation tools. We use the SnoopTag2–DogTag ligation system in our protein ligation module, with SnoopLigase2 catalyzing the reaction. However, during our experiments, we found that the stability and turnover of SnoopLigase2 were suboptimal. "
        }
        <strong>
          {
            "To make our ligation module more efficient and enable faster, broader, and lower-cost ligation, we rationally engineered SnoopLigase2."
          }
        </strong>
      </p>
      <p>
        {
          "Our engineering efforts focused on two objectives: first, maintaining the structural stability of SnoopLigase2 in the working solution; and second, improving its turnover."
        }
      </p>
      <ProteinStepper steps={SNOOP_STEPS} />
      <References level={3}>
        <div className="references-list references-list--paragraphs">
          <p>
            {
              "[1] Keeble, A. H., Wood, D. P., & Howarth, M. (2023). Design and Evolution of Enhanced Peptide–Peptide Ligation for Modular Transglutaminase Assembly. "
            }
            <em>{"Bioconjugate Chemistry"}</em>
            {", "}
            <strong>{"34"}</strong>
            {"(6), 1019–1036. "}
            <a href="https://doi.org/10.1021/acs.bioconjchem.3c00122">
              {"https://doi.org/10.1021/acs.bioconjchem.3c00122"}
            </a>
          </p>
          <p>
            {
              "[2] Izoré, T., Contreras-Martel, C., El Mortaji, L., Manzano, C., Terrasse, R., Vernet, T., Di Guilmi, A. M., & Dessen, A. (2010). Structural Basis of Host Cell Recognition by the Pilus Adhesin from "
            }
            <em>{"Streptococcus pneumoniae"}</em>
            {". "}
            <em>{"Structure"}</em>
            {", "}
            <strong>{"18"}</strong>
            {"(1), 106–115. "}
            <a href="https://doi.org/10.1016/j.str.2009.10.019">
              {"https://doi.org/10.1016/j.str.2009.10.019"}
            </a>
          </p>
          <p>
            {
              "[3] Buldun, C. M., Jean, J. X., Bedford, M. R., & Howarth, M. (2018). SnoopLigase Catalyzes Peptide–Peptide Locking and Enables Solid-Phase Conjugate Isolation. "
            }
            <em>{"Journal of the American Chemical Society"}</em>
            {", "}
            <strong>{"140"}</strong>
            {"(8), 3008–3018."}
            <a href="https://doi.org/10.1021/jacs.7b13237">
              {"https://doi.org/10.1021/jacs.7b13237"}
            </a>
          </p>
          <p>
            {
              "[4] Matthews, B. W., Nicholson, H., & Becktel, W. J. (1987). Enhanced protein thermostability from site-directed mutations that decrease the entropy of unfolding. "
            }
            <em>
              {
                "Proceedings of the National Academy of Sciences of the United States of America"
              }
            </em>
            {", "}
            <strong>{"84"}</strong>
            {"(19), 6663–6667. "}
            <a href="https://doi.org/10.1073/pnas.84.19.6663">
              {"https://doi.org/10.1073/pnas.84.19.6663"}
            </a>
          </p>
          <p>
            {
              "[5] Chaudhury, S., Lyskov, S., & Gray, J. J. (2010). PyRosetta: A script-based interface for implementing molecular modeling algorithms using Rosetta. "
            }
            <em>{"Bioinformatics"}</em>
            {", "}
            <strong>{"26"}</strong>
            {"(5), 689–691. "}
            <a href="https://doi.org/10.1093/bioinformatics/btq007">
              {"https://doi.org/10.1093/bioinformatics/btq007"}
            </a>
          </p>
          <p>
            {
              "[6] Park, H., Bradley, P., Greisen, P., Jr., Liu, Y., Mulligan, V. K., Kim, D. E., Baker, D., & DiMaio, F. (2016). Simultaneous Optimization of Biomolecular Energy Functions on Features from Small Molecules and Macromolecules. "
            }
            <em>{"Journal of Chemical Theory and Computation"}</em>
            {", "}
            <strong>{"12"}</strong>
            {"(12), 6201–6212. "}
            <a href="https://doi.org/10.1021/acs.jctc.6b00819">
              {"https://doi.org/10.1021/acs.jctc.6b00819"}
            </a>
          </p>
          <p>
            {
              "[7] Alford, R. F., Leaver-Fay, A., Jeliazkov, J. R., et al. (2017). The Rosetta All-Atom Energy Function for Macromolecular Modeling and Design. "
            }
            <em>{"Journal of Chemical Theory and Computation"}</em>
            {", "}
            <strong>{"13"}</strong>
            {"(6), 3031–3048. "}
            <a href="https://doi.org/10.1021/acs.jctc.7b00125">
              {"https://doi.org/10.1021/acs.jctc.7b00125"}
            </a>
          </p>
        </div>
      </References>
    </>
  );
}
