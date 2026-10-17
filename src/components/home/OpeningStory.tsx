import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useReducedMotion } from "motion/react";
import { InteractiveWorldMap } from "./InteractiveWorldMap";
import { useStory } from "./StoryContext";
import "./OpeningStory.css";

const staticRoot = "https://static.igem.wiki/teams/6102/wiki";
const staticHome = `${staticRoot}/images/home`;
const staticGif = `${staticRoot}/gif`;
const localHome = `${import.meta.env.BASE_URL}images/home`;

const statementBubbleNames = [
  "osteoarthritis",
  "hyaline",
  "focal",
  "gout",
  "patellae",
  "acl",
  "decorTop",
  "decorLeft",
  "decorRight",
] as const;

type StatementBubbleName = (typeof statementBubbleNames)[number];

const openingLineStyle = (index: number, side: "left" | "right" = "left") =>
  ({
    "--opening-line-offset": index * 0.055,
    "--opening-line-x": `${(side === "left" ? -1 : 1) * (18 + Math.min(index, 6) * 1.2)}px`,
  }) as CSSProperties;

function PlayOnceGif({
  alt,
  className,
  gif,
  play,
  poster,
}: {
  alt: string;
  className: string;
  gif: string;
  play: boolean;
  poster: string;
}) {
  const reducedMotion = useReducedMotion();
  const wasPlayingRef = useRef(false);
  const [playbackId, setPlaybackId] = useState(0);

  useEffect(() => {
    if (play && !wasPlayingRef.current && !reducedMotion) {
      setPlaybackId((current) => current + 1);
    }
    wasPlayingRef.current = play;
  }, [play, reducedMotion]);

  const isPlaying = play && playbackId > 0 && !reducedMotion;

  return (
    <img
      alt={alt}
      className={className}
      decoding="async"
      src={isPlaying ? `${gif}?run=${playbackId}` : poster}
    />
  );
}

export function OpeningStatement() {
  const { active, settled } = useStory();
  const [bubblesRevealed, setBubblesRevealed] = useState(false);

  useEffect(() => {
    if (settled) {
      setBubblesRevealed(true);
    } else if (!active) {
      setBubblesRevealed(false);
    }
  }, [active, settled]);

  const bubbleOrder = useMemo(() => {
    const shuffled = [...statementBubbleNames];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [
        shuffled[swapIndex],
        shuffled[index],
      ];
    }
    return Object.fromEntries(
      shuffled.map((name, index) => [name, index]),
    ) as Record<StatementBubbleName, number>;
  }, []);
  const bubbleStyle = (name: StatementBubbleName) =>
    ({
      "--bubble-enter-delay": `${100 + bubbleOrder[name] * 105}ms`,
    }) as CSSProperties;

  return (
    <div
      className="opening-scene opening-scene--statement"
      data-node-id="1123:5"
    >
      <div className="opening-statement__design">
        <div className="opening-content">
          <h1 className="opening-statement__title" data-node-id="1134:20">
            <span className="opening-text-line" style={openingLineStyle(0)}>
              Cartilage
            </span>
            <span className="opening-text-line" style={openingLineStyle(1)}>
              damage is
            </span>
            <span className="opening-text-line" style={openingLineStyle(2)}>
              widespread—
            </span>
            <span className="opening-text-line" style={openingLineStyle(3)}>
              yet lasting
            </span>
            <span className="opening-text-line" style={openingLineStyle(4)}>
              repair remains
            </span>
            <span className="opening-text-line" style={openingLineStyle(5)}>
              elusive.
            </span>
          </h1>

          <div
            className={`opening-bubbles${bubblesRevealed ? " opening-bubbles--active" : ""}`}
            aria-label="Types of cartilage damage"
          >
            <div
              className="opening-bubble opening-bubble--osteoarthritis"
              style={bubbleStyle("osteoarthritis")}
            >
              <div className="opening-bubble__float">
                <img
                  src={`${localHome}/opening-bubble-osteoarthritis.svg`}
                  alt=""
                />
                <span>osteoarthritis</span>
              </div>
            </div>
            <div
              className="opening-bubble opening-bubble--hyaline"
              style={bubbleStyle("hyaline")}
            >
              <div className="opening-bubble__float">
                <img src={`${localHome}/opening-bubble-hyaline.svg`} alt="" />
                <span>
                  hyaline
                  <br />
                  cartilage
                  <br />
                  injury
                </span>
              </div>
            </div>
            <div
              className="opening-bubble opening-bubble--focal"
              style={bubbleStyle("focal")}
            >
              <div className="opening-bubble__float">
                <img src={`${localHome}/opening-bubble-focal.svg`} alt="" />
                <span>
                  focal traumatic
                  <br />
                  cartilage defect
                </span>
              </div>
            </div>
            <div
              className="opening-bubble opening-bubble--gout"
              style={bubbleStyle("gout")}
            >
              <div className="opening-bubble__float">
                <img src={`${localHome}/opening-bubble-gout.svg`} alt="" />
                <span>chronic gout</span>
              </div>
            </div>
            <div
              className="opening-bubble opening-bubble--patellae"
              style={bubbleStyle("patellae")}
            >
              <div className="opening-bubble__float">
                <img src={`${localHome}/opening-bubble-patellae.svg`} alt="" />
                <span>
                  chondromalacia
                  <br />
                  patellae
                </span>
              </div>
            </div>
            <div
              className="opening-bubble opening-bubble--acl"
              style={bubbleStyle("acl")}
            >
              <div className="opening-bubble__float">
                <img src={`${localHome}/opening-bubble-acl.svg`} alt="" />
                <span>
                  status post ACL
                  <br />
                  reconstruction
                </span>
              </div>
            </div>
            <div
              className="opening-bubble opening-bubble--decor-top"
              aria-hidden="true"
              style={bubbleStyle("decorTop")}
            >
              <div className="opening-bubble__float">
                <img src={`${localHome}/opening-bubble-decor-top.svg`} alt="" />
              </div>
            </div>
            <div
              className="opening-bubble opening-bubble--decor-left"
              aria-hidden="true"
              style={bubbleStyle("decorLeft")}
            >
              <div className="opening-bubble__float">
                <img
                  src={`${localHome}/opening-bubble-decor-left.svg`}
                  alt=""
                />
              </div>
            </div>
            <div
              className="opening-bubble opening-bubble--decor-right"
              aria-hidden="true"
              style={bubbleStyle("decorRight")}
            >
              <div className="opening-bubble__float">
                <img
                  src={`${localHome}/opening-bubble-decor-right.svg`}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GlobalBurdenScene({ play }: { play: boolean }) {
  return (
    <div className="opening-scene opening-scene--burden" data-node-id="967:10">
      <div className="opening-content">
        <div className="opening-side opening-side--left">
          <h2 className="opening-burden__title" data-node-id="967:11">
            <span className="opening-text-line" style={openingLineStyle(0)}>
              A world in <strong>PAIN</strong>.
            </span>
            <span className="opening-text-line" style={openingLineStyle(1)}>
              A need for repair.
            </span>
          </h2>
          <PlayOnceGif
            alt="A person experiencing knee pain while using stairs"
            className="opening-burden__person"
            gif={`https://static.igem.wiki/teams/6102/wiki/gif/going-up-the-stairs/stairs-pain-compressed.webp`}
            play={play}
            poster={`${staticGif}/knee-pain-first.avif`}
          />
        </div>

        <div className="opening-side opening-side--right">
          <div className="opening-burden__visual">
            <div className="opening-burden__card" aria-hidden="true" />
            <div className="opening-burden__map">
              <InteractiveWorldMap />
              <div className="opening-burden__stat">
                <strong>2 in 3</strong>
                <p>Knees examined had cartilage damage.</p>
              </div>
              <div className="opening-burden__legend" aria-hidden="true">
                <strong>OA PATIENT COUNTS</strong>
                <img src={`${staticHome}/490d7.svg`} alt="" />
                <span>&lt;100k</span>
                <span>50m+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SportsTraumaScene({ play }: { play: boolean }) {
  return (
    <div className="opening-scene opening-scene--sports" data-node-id="1009:23">
      <div className="opening-content">
        <div className="opening-side opening-side--left">
          <h2 className="opening-sports__title" data-node-id="1009:27">
            <span className="opening-text-line" style={openingLineStyle(0)}>
              Pain <strong>takes more</strong>
            </span>
            <span className="opening-text-line" style={openingLineStyle(1)}>
              than movement.
            </span>
          </h2>
          <div className="opening-sports__score" data-node-id="1009:29">
            <strong className="opening-text-line" style={openingLineStyle(2)}>
              27.5
            </strong>
            <span className="opening-text-line" style={openingLineStyle(3)}>
              OUT OF 100
            </span>
            <small className="opening-text-line" style={openingLineStyle(4)}>
              (lower is worse)
            </small>
          </div>
          <p className="opening-sports__body" data-node-id="1009:28">
            <span className="opening-text-line" style={openingLineStyle(5)}>
              Quality of life score
            </span>
            <span className="opening-text-line" style={openingLineStyle(6)}>
              prior to cartilage repair
            </span>
          </p>
        </div>

        <div className="opening-side opening-side--right">
          <div className="opening-sports__decor" aria-hidden="true">
            <div className="opening-sports__disc" />
            <div className="opening-sports__accent" />
            <div className="opening-sports__stage" />
            <div className="opening-sports__spark" />
          </div>
          <PlayOnceGif
            alt="A boy holding his knee after a sports injury"
            className="opening-sports__person"
            gif={`${staticGif}/boy-sports-injury-once.webp`}
            play={play}
            poster={`${staticGif}/boy-sports-injury-first.avif`}
          />
        </div>
      </div>
    </div>
  );
}

export function RehabilitationScene({ play }: { play: boolean }) {
  return (
    <div className="opening-scene opening-scene--rehab" data-node-id="967:876">
      <div className="opening-content">
        <div className="opening-side opening-side--left">
          <div className="opening-rehab__decor" aria-hidden="true">
            <div className="opening-rehab__stage" />
            <div className="opening-rehab__pink" />
            <div className="opening-rehab__yellow" />
            <div className="opening-rehab__dot" />
          </div>
          <PlayOnceGif
            alt="A young patient recovering after knee surgery"
            className="opening-rehab__person"
            gif={`${staticGif}/post-op-rehab-once.webp`}
            play={play}
            poster={`${staticGif}/post-op-rehab-first.avif`}
          />
        </div>

        <div className="opening-side opening-side--right">
          <h2 className="opening-rehab__title" data-node-id="967:881">
            <span
              className="opening-text-line"
              style={openingLineStyle(0, "right")}
            >
              Getting life back
            </span>
            <span
              className="opening-text-line"
              style={openingLineStyle(1, "right")}
            >
              comes at a <strong>COST</strong>.
            </span>
          </h2>
          <div className="opening-rehab__cost" data-node-id="967:882">
            <div
              className="opening-text-line"
              style={openingLineStyle(2, "right")}
            >
              <strong>~£2</strong>
              <b>billion/yr.</b>
            </div>
            <span
              className="opening-text-line opening-rehab__cost-note"
              style={openingLineStyle(3, "right")}
            >
              Treatment-spending scenario.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
