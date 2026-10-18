import { useEffect, useRef, useState, type CSSProperties } from "react";
import { InteractiveWorldMap } from "./InteractiveWorldMap";
import bubbleAcl from "../../assets/home/bubble-awareness/bubble-acl.svg";
import bubbleDecorLeft from "../../assets/home/bubble-awareness/bubble-decor-left.svg";
import bubbleDecorRight from "../../assets/home/bubble-awareness/bubble-decor-right.svg";
import bubbleDecorTop from "../../assets/home/bubble-awareness/bubble-decor-top.svg";
import bubbleFocal from "../../assets/home/bubble-awareness/bubble-focal.svg";
import bubbleGout from "../../assets/home/bubble-awareness/bubble-gout.svg";
import bubbleHyaline from "../../assets/home/bubble-awareness/bubble-hyaline.svg";
import bubbleOsteoarthritis from "../../assets/home/bubble-awareness/bubble-osteoarthritis.svg";
import bubblePatellae from "../../assets/home/bubble-awareness/bubble-patellae.svg";
import postOpRehabilitation from "../../assets/home/bubble-awareness/post-op-rehabilitation.png";
import sportsKneeTrauma from "../../assets/home/bubble-awareness/sports-knee-trauma.png";
import stairKneePain from "../../assets/home/bubble-awareness/stair-knee-pain.png";
import "./OpeningStory.css";

const bubbles = [
  {
    className: "osteoarthritis",
    image: bubbleOsteoarthritis,
    label: "osteoarthritis",
  },
  {
    className: "hyaline",
    image: bubbleHyaline,
    label: (
      <>
        hyaline
        <br />
        cartilage
        <br />
        injury
      </>
    ),
  },
  {
    className: "focal",
    image: bubbleFocal,
    label: (
      <>
        focal traumatic
        <br />
        cartilage defect
      </>
    ),
  },
  { className: "gout", image: bubbleGout, label: "chronic gout" },
  {
    className: "patellae",
    image: bubblePatellae,
    label: (
      <>
        chondromalacia
        <br />
        patellae
      </>
    ),
  },
  {
    className: "acl",
    image: bubbleAcl,
    label: (
      <>
        status post ACL
        <br />
        reconstruction
      </>
    ),
  },
] as const;

const decorativeBubbles = [
  ["top", bubbleDecorTop],
  ["left", bubbleDecorLeft],
  ["right", bubbleDecorRight],
] as const;

const statementLines = [
  "Cartilage",
  "damage is",
  "widespread—",
  "yet lasting",
  "repair remains",
  "elusive.",
] as const;

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(value: number) {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
}

function useStoryProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  const [holdProgress, setHoldProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let animationFrame = 0;

    const update = () => {
      animationFrame = 0;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      setProgress(
        clamp((viewportHeight - rect.top) / (viewportHeight + rect.height)),
      );
      setHoldProgress(
        clamp(-rect.top / Math.max(1, rect.height - viewportHeight)),
      );
    };

    const requestUpdate = () => {
      if (!animationFrame)
        animationFrame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return { ref, progress, holdProgress };
}

function revealStyle(
  progress: number,
  order: number,
  count: number,
  side: "left" | "right" | "center",
  pace: "default" | "slow" | "bubble" | "figure" = "default",
): CSSProperties {
  const slow = pace === "slow";
  const bubble = pace === "bubble";
  const figure = pace === "figure";
  const entryStart =
    0.04 + order * (bubble ? 0.05 : figure ? 0.045 : slow ? 0.04 : 0.032);
  const entryAmount = smoothstep(
    (progress - entryStart) /
      (bubble ? 0.12 : figure ? 0.28 : slow ? 0.3 : 0.2),
  );
  const reverseOrder = count - order - 1;
  const exitStart =
    (bubble ? 0.7 : figure ? 0.67 : slow ? 0.56 : 0.62) +
    reverseOrder * 0.025;
  const exitAmount =
    1 -
    smoothstep(
      (progress - exitStart) /
        (bubble ? 0.14 : figure ? 0.22 : slow ? 0.24 : 0.18),
    );
  const visibility = Math.min(entryAmount, exitAmount);
  const direction = side === "left" ? -1 : side === "right" ? 1 : 0;
  const hiddenScale = side === "center" ? (bubble ? 0.55 : 0.72) : 0.9;

  return {
    "--story-opacity": visibility,
    "--story-shift": `${direction * 72 * (1 - visibility)}px`,
    "--story-scale": hiddenScale + visibility * (1 - hiddenScale),
  } as CSSProperties;
}

export function BubbleAwareness() {
  const intro = useStoryProgress<HTMLDivElement>();
  const burden = useStoryProgress<HTMLDivElement>();
  const sports = useStoryProgress<HTMLDivElement>();
  const rehab = useStoryProgress<HTMLDivElement>();
  const burdenStatReveal = smoothstep((burden.holdProgress - 0.08) / 0.7);
  const burdenStatStyle = {
    "--burden-stat-opacity": burdenStatReveal,
    "--burden-stat-shift": `${(1 - burdenStatReveal) * 110}px`,
  } as CSSProperties;

  return (
    <section
      id="bubble-awareness"
      className="bubble-awareness"
      aria-label="The global burden of cartilage damage"
      data-node-id="1226:1877"
    >
      <div className="bubble-awareness__inner">
        <div
          ref={intro.ref}
          className="story-runway story-runway--intro"
        >
          <div className="bubble-awareness__intro story-scene">
            <h1 className="bubble-awareness__statement">
              {statementLines.map((line, index) => (
                <span
                  key={line}
                  className="story-reveal story-line"
                  style={revealStyle(
                    intro.progress,
                    index,
                    statementLines.length,
                    "left",
                    "slow",
                  )}
                >
                  {line}
                </span>
              ))}
            </h1>

            <div
              className="bubble-cluster"
              aria-label="Types of cartilage damage"
            >
              {bubbles.map((bubble, index) => (
                <div
                  className={`bubble-cluster__item bubble-cluster__item--${bubble.className} story-reveal`}
                  key={bubble.className}
                  style={revealStyle(
                    intro.progress,
                    index,
                    bubbles.length + decorativeBubbles.length,
                    "center",
                    "bubble",
                  )}
                >
                  <img src={bubble.image} alt="" />
                  <span>{bubble.label}</span>
                </div>
              ))}
              {decorativeBubbles.map(([name, image], index) => (
                <img
                  className={`bubble-cluster__decor bubble-cluster__decor--${name} story-reveal`}
                  src={image}
                  alt=""
                  aria-hidden="true"
                  key={name}
                  style={revealStyle(
                    intro.progress,
                    bubbles.length + index,
                    bubbles.length + decorativeBubbles.length,
                    "center",
                    "bubble",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          ref={burden.ref}
          className="story-runway story-runway--burden"
        >
          <div className="bubble-awareness__burden story-scene">
            <div className="bubble-awareness__burden-copy">
              <h2>
                <span
                  className="story-reveal story-line"
                  style={revealStyle(burden.progress, 0, 3, "left")}
                >
                  A world in <strong>PAIN</strong>.
                </span>
                <span
                  className="story-reveal story-line"
                  style={revealStyle(burden.progress, 1, 3, "left")}
                >
                  A need for repair.
                </span>
              </h2>
              <div
                className="bubble-awareness__stair-person story-reveal"
                data-node-id="1226:1722"
                style={revealStyle(burden.progress, 2, 3, "left")}
              >
                <img
                  src={stairKneePain}
                  alt="A person experiencing knee pain while using stairs"
                />
              </div>
            </div>

            <div
              className="bubble-awareness__map-card"
              style={burdenStatStyle}
            >
              <div
                className="bubble-awareness__stat burden-stat-reveal"
              >
                <strong>2 in 3</strong>
                <span>Knees examined had cartilage damage.</span>
              </div>
              <div className="opening-burden__map">
                <InteractiveWorldMap />
                <div className="opening-burden__legend" aria-hidden="true">
                  <strong>OA PATIENT COUNTS</strong>
                  <img
                    src={`${import.meta.env.BASE_URL}images/home/490d7.svg`}
                    alt=""
                  />
                  <div className="opening-burden__legend-labels">
                    <span>&lt;100k</span>
                    <span>50m+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={sports.ref}
          className="story-runway story-runway--sports"
        >
          <div className="bubble-awareness__sports story-scene">
            <div className="bubble-awareness__sports-copy">
              <h2>
                <span
                  className="story-reveal story-line"
                  style={revealStyle(sports.progress, 0, 7, "left")}
                >
                  Pain <strong>takes more</strong>
                </span>
                <span
                  className="story-reveal story-line"
                  style={revealStyle(sports.progress, 1, 7, "left")}
                >
                  than movement.
                </span>
              </h2>
              <div className="bubble-awareness__score">
                <strong
                  className="story-reveal story-line"
                  style={revealStyle(sports.progress, 2, 7, "left")}
                >
                  27.5
                </strong>
                <span
                  className="story-reveal story-line"
                  style={revealStyle(sports.progress, 3, 7, "left")}
                >
                  OUT OF 100
                </span>
                <small
                  className="story-reveal story-line"
                  style={revealStyle(sports.progress, 4, 7, "left")}
                >
                  (higher is better)
                </small>
              </div>
              <p>
                <span
                  className="story-reveal story-line"
                  style={revealStyle(sports.progress, 5, 7, "left")}
                >
                  Quality of life score
                </span>
                <span
                  className="story-reveal story-line"
                  style={revealStyle(sports.progress, 6, 7, "left")}
                >
                  prior to cartilage repair
                </span>
              </p>
            </div>
            <img
              className="bubble-awareness__sports-person story-reveal"
              src={sportsKneeTrauma}
              alt="A boy holding his knee after a sports injury"
              style={revealStyle(sports.progress, 0, 1, "right")}
            />
          </div>
        </div>

        <div
          ref={rehab.ref}
          className="story-runway story-runway--rehab"
        >
          <div className="bubble-awareness__rehab story-scene">
            <img
              className="bubble-awareness__rehab-person story-reveal"
              src={postOpRehabilitation}
              alt="A young patient recovering after knee surgery"
              style={revealStyle(rehab.progress, 0, 1, "left", "figure")}
            />
            <div className="bubble-awareness__rehab-copy">
              <h2>
                <span
                  className="story-reveal story-line"
                  style={revealStyle(rehab.progress, 0, 4, "right", "figure")}
                >
                  Getting life back
                </span>
                <span
                  className="story-reveal story-line"
                  style={revealStyle(rehab.progress, 1, 4, "right", "figure")}
                >
                  comes at a <strong>COST</strong>.
                </span>
              </h2>
              <div className="bubble-awareness__cost">
                <div
                  className="story-reveal story-line"
                  style={revealStyle(rehab.progress, 2, 4, "right", "figure")}
                >
                  <strong>~£2</strong>
                  <b>billion/yr.</b>
                </div>
                <span
                  className="story-reveal story-line"
                  style={revealStyle(rehab.progress, 3, 4, "right", "figure")}
                >
                  Treatment-spending scenario.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
