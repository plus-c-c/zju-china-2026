import { useState, type CSSProperties, type ReactNode } from "react";
import "./LimitationsCards.css";

const LOCAL = `https://static.igem.wiki/teams/6102/wiki/images/home`;

type CardArtwork = {
  name: string;
  className: string;
};

type CardCopy = {
  title: ReactNode;
  body: ReactNode;
  frontArt: CardArtwork[];
  backArt: CardArtwork[];
};

const yellowCards: CardCopy[] = [
  {
    title: "Scalability",
    body: (
      <>
        Complex
        <br />
        fabrication limits
        <br />
        batch
        <br />
        consistency and
        <br />
        large-scale
        <br />
        production.
      </>
    ),
    frontArt: [
      {
        name: "home-06-card-art-01.avif",
        className: "limitations-art--yellow-scalability",
      },
    ],
    backArt: [
      {
        name: "home-limit-back-cell-a.avif",
        className: "limitations-art--cell-a",
      },
      {
        name: "home-limit-back-cell-b.avif",
        className: "limitations-art--cell-b",
      },
      {
        name: "home-limit-back-cell-c.avif",
        className: "limitations-art--cell-c",
      },
    ],
  },
  {
    title: (
      <>
        Mechanical
        <br />
        Stability
      </>
    ),
    body: (
      <>
        Cartilage in different
        <br />
        locations requires distinct
        <br />
        mechanical properties, while
        <br />
        repetitive loading pose
        <br />
        challenges for the fixation
        <br />
        and durability of the
        <br />
        material.
      </>
    ),
    frontArt: [
      {
        name: "home-06-card-art-02.avif",
        className: "limitations-art--yellow-mechanical",
      },
    ],
    backArt: [
      {
        name: "home-limit-back-patient.avif",
        className: "limitations-art--patient",
      },
    ],
  },
  {
    title: (
      <>
        Dynamic
        <br />
        Microenvironment
      </>
    ),
    body: (
      <>
        Matrix loss,
        <br />
        degradation, and
        <br />
        inflammation
        <br />
        demand adaptable
        <br />
        repair strategies.
      </>
    ),
    frontArt: [
      {
        name: "blue-card-3.avif",
        className: "limitations-art--yellow-dynamic",
      },
    ],
    backArt: [
      {
        name: "home-limit-back-dna.avif",
        className: "limitations-art--dna",
      },
      {
        name: "home-limit-back-cell-outline.avif",
        className: "limitations-art--cell-outline",
      },
      {
        name: "home-limit-back-nucleus.avif",
        className: "limitations-art--nucleus",
      },
    ],
  },
];

const blueCards: CardCopy[] = [
  {
    title: (
      <>
        Synthetic
        <br />
        Biology
      </>
    ),
    body: (
      <>
        Complex fabrication
        <br />
        limits batch
        <br />
        consistency and
        <br />
        large-scale
        <br />
        production.
      </>
    ),
    frontArt: [
      {
        name: "home-07-card-art-01.avif",
        className: "limitations-art--blue-organism",
      },
    ],
    backArt: [
      {
        name: "home-07-card-art-01.avif",
        className: "limitations-art--blue-back-organism",
      },
    ],
  },
  {
    title: (
      <span className="limitations-selp-title">
        <strong>SELP</strong>
        <small>(Silk-elastin-like protein)</small>
      </span>
    ),
    body: (
      <>
        SELP offers tunable stiffness
        <br />
        and toughness, while RGD
        <br />
        motifs within its chains
        <br />
        promote
        <br />
        adhesion
        <br />
        and tissue
        <br />
        integration.
      </>
    ),
    frontArt: [
      {
        name: "home-07-card-art-02.avif",
        className: "limitations-art--blue-selp",
      },
    ],
    backArt: [
      {
        name: "home-07-card-art-02.avif",
        className: "limitations-art--blue-back-selp",
      },
    ],
  },
  {
    title: (
      <>
        Modular
        <br />
        Design
      </>
    ),
    body: (
      <>
        Matrix loss, degradation,
        <br />
        and inflammation
        <br />
        demand adaptable
        <br />
        repair strategies.
      </>
    ),
    frontArt: [
      {
        name: "home-07-card-art-03b.avif",
        className: "limitations-art--blue-gag",
      },
      {
        name: "home-07-card-art-03c.avif",
        className: "limitations-art--blue-liposome",
      },
      {
        name: "home-07-card-art-03a.avif",
        className: "limitations-art--blue-magnetic",
      },
    ],
    backArt: [
      {
        name: "home-07-card-art-03b.avif",
        className: "limitations-art--blue-back-gag",
      },
      {
        name: "home-07-card-art-03c.avif",
        className: "limitations-art--blue-back-liposome",
      },
      {
        name: "home-07-card-art-03a.avif",
        className: "limitations-art--blue-back-magnetic",
      },
    ],
  },
];

function Artwork({ art }: { art: CardArtwork }) {
  return (
    <span aria-hidden="true" className={`limitations-art ${art.className}`}>
      <img alt="" decoding="async" src={`${LOCAL}/${art.name}`} />
    </span>
  );
}

function CardLayer({
  active,
  card,
  flipped,
  index,
  layer,
  setFlipped,
  style,
}: {
  active: boolean;
  card: CardCopy;
  flipped: boolean;
  index: number;
  layer: "yellow" | "blue";
  setFlipped: (value: boolean) => void;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`limitations-layer limitations-layer--${layer}`}
      data-flipped={flipped}
      aria-hidden={!active}
      style={style}
    >
      <span className="limitations-layer__shadow" aria-hidden="true" />
      <span className="limitations-layer__flip">
        <button
          aria-label={`Show details for card ${index + 1}`}
          className="limitations-layer__face limitations-layer__face--front"
          onClick={() => setFlipped(true)}
          tabIndex={active && !flipped ? 0 : -1}
          type="button"
        >
          <span className="limitations-card-title">{card.title}</span>
          {card.frontArt.map((art) => (
            <Artwork art={art} key={art.name} />
          ))}
          <span className="limitations-card-click" aria-hidden="true">
            Click
          </span>
        </button>
        <button
          aria-label={`Return card ${index + 1} to its front`}
          className="limitations-layer__face limitations-layer__face--back"
          onClick={() => setFlipped(false)}
          tabIndex={active && flipped ? 0 : -1}
          type="button"
        >
          <span className="limitations-card-title">{card.title}</span>
          <span className="limitations-card-body">{card.body}</span>
          {card.backArt.map((art) => (
            <Artwork art={art} key={art.name} />
          ))}
        </button>
      </span>
    </div>
  );
}

export function MaterialLimitations({
  drawProgress,
}: {
  drawProgress: number;
}) {
  const [yellowFlipped, setYellowFlipped] = useState([false, false, false]);
  const [blueFlipped, setBlueFlipped] = useState([false, false, false]);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const progress = reducedMotion ? 1 : drawProgress;
  const yellowRemoved = progress >= 0.72;
  const clamp = (value: number) => Math.min(1, Math.max(0, value));
  const drawEase = (value: number) => value * value;
  const pageStyle = {
    "--limitations-title-opacity": 1 - clamp((progress - 0.5) / 0.08),
    "--solution-title-opacity": clamp((progress - 0.62) / 0.08),
  } as CSSProperties;

  const cardMotion = (index: number) => {
    const start = 0.22 + index * 0.12;
    const amount = drawEase(clamp((progress - start) / 0.24));
    const direction = index - 1;
    return {
      "--card-draw-x": `${direction * 84 * amount}px`,
      "--card-draw-y": `${-820 * amount}px`,
      "--card-draw-rotate": `${direction * 8 * amount}deg`,
      "--card-draw-opacity": 1 - clamp((amount - 0.72) / 0.28),
      "--solution-card-reveal": amount,
    } as CSSProperties;
  };

  return (
    <div
      className="limitations-page"
      data-node-id="1294:2"
      data-yellow-removed={yellowRemoved}
      style={pageStyle}
    >
      <h2 className="limitations-page__heading limitations-page__heading--yellow">
        limitations of the materials
      </h2>
      <h2 className="limitations-page__heading limitations-page__heading--blue">
        our solution
      </h2>

      <div className="limitations-card-row">
        {yellowCards.map((yellowCard, index) => (
          <article className="limitations-card" key={index} style={cardMotion(index)}>
            <CardLayer
              active={yellowRemoved}
              card={blueCards[index]}
              flipped={blueFlipped[index]}
              index={index}
              layer="blue"
              style={{
                opacity: "var(--solution-card-reveal)",
                transform:
                  "translateY(calc((1 - var(--solution-card-reveal)) * 24px)) scale(calc(var(--card-scale) * (0.96 + var(--solution-card-reveal) * 0.04)))",
              }}
              setFlipped={(value) =>
                setBlueFlipped((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index ? value : item,
                  ),
                )
              }
            />
            <CardLayer
              active={!yellowRemoved}
              card={yellowCard}
              flipped={yellowFlipped[index]}
              index={index}
              layer="yellow"
              setFlipped={(value) =>
                setYellowFlipped((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index ? value : item,
                  ),
                )
              }
            />
          </article>
        ))}
      </div>
    </div>
  );
}
