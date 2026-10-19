import {
  useEffect,
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

const openingLineStyle = (index: number, side: "left" | "right" = "left") =>
  ({
    "--opening-line-offset": index * 0.055,
    "--opening-line-x": `${(side === "left" ? -1 : 1) * (18 + Math.min(index, 6) * 1.2)}px`,
  }) as CSSProperties;

function LoopingIllustration({
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
  const [loopSource, setLoopSource] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let objectUrl = "";
    // The uploaded WebPs have a finite loop count. Reuse their frames and
    // change only the ANIM loop count (zero means repeat indefinitely).
    fetch(gif, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error("Illustration unavailable");
        return response.arrayBuffer();
      })
      .then(buffer => {
        if (controller.signal.aborted) return;
        const view = new DataView(buffer);
        for (let offset = 12; offset + 8 <= buffer.byteLength;) {
          const size = view.getUint32(offset + 4, true);
          if (offset + 8 + size > buffer.byteLength) break;
          if (view.getUint32(offset) === 0x414e494d && size >= 6) {
            view.setUint16(offset + 12, 0, true);
            break;
          }
          offset += 8 + size + size % 2;
        }
        objectUrl = URL.createObjectURL(new Blob([buffer], { type: "image/webp" }));
        setLoopSource(objectUrl);
      })
      .catch(() => { if (!controller.signal.aborted) setLoopSource(gif); });
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [gif]);

  return (
    <img
      alt={alt}
      className={className}
      data-home-preload-src={gif}
      decoding="async"
      src={play && !reducedMotion && loopSource ? loopSource : poster}
    />
  );
}

export function OpeningStatement() {
  const { active } = useStory();
  const [selected, setSelected] = useState<string | null>(null);
  const descriptions: Record<string, string> = {
    osteoarthritis: "Osteoarthritis gradually wears down joint cartilage, causing pain and stiffness.",
    hyaline: "Damage to smooth hyaline cartilage reduces cushioning and makes joint movement painful.",
    focal: "A localized cartilage defect can follow an injury and may struggle to heal on its own.",
    gout: "Urate crystals trigger joint inflammation. Repeated attacks can damage cartilage.",
    patellae: "Softening of cartilage beneath the kneecap can cause pain when climbing stairs or bending.",
    acl: "Even after ACL reconstruction, changes in joint mechanics can increase the risk of cartilage damage.",
  };
  const bubbleProps = (name: string) => ({
    role: "button",
    tabIndex: 0,
    "aria-pressed": selected === name,
    "data-selected": selected === name,
    onClick: () => setSelected(name),
    onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setSelected(name);
      }
    },
  });

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

          <div className="opening-bubble-hint" aria-hidden="true">
            <span>Click here</span>
            <svg className="opening-bubble-hint__arrow" viewBox="0 0 220 130" preserveAspectRatio="none" fill="none" aria-hidden="true">
              <path d="M25 15C25 90 145 20 198 100" stroke="currentColor" strokeWidth="2.5" strokeDasharray="7 7" strokeLinecap="round" />
              <path d="m184 94 14 6 1-15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div
            className={`opening-bubbles${active ? " opening-bubbles--active" : ""}`}
            aria-label="Types of cartilage damage"
          >
            <div
              className="opening-bubble opening-bubble--osteoarthritis"
              {...bubbleProps("osteoarthritis")}
            >
              <div className="opening-bubble__float">
                <span>osteoarthritis</span>
              <span className="opening-bubble__description">{descriptions.osteoarthritis}</span>
              </div>
            </div>
            <div
              className="opening-bubble opening-bubble--hyaline"
              {...bubbleProps("hyaline")}
            >
              <div className="opening-bubble__float">
                <span>
                  hyaline
                  <br />
                  cartilage
                  <br />
                  injury
                </span>
              <span className="opening-bubble__description">{descriptions.hyaline}</span>
              </div>
            </div>
            <div
              className="opening-bubble opening-bubble--focal"
              {...bubbleProps("focal")}
            >
              <div className="opening-bubble__float">
                <span>
                  focal traumatic
                  <br />
                  cartilage defect
                </span>
              <span className="opening-bubble__description">{descriptions.focal}</span>
              </div>
            </div>
            <div
              className="opening-bubble opening-bubble--gout"
              {...bubbleProps("gout")}
            >
              <div className="opening-bubble__float">
                <span>chronic gout</span>
              <span className="opening-bubble__description">{descriptions.gout}</span>
              </div>
            </div>
            <div
              className="opening-bubble opening-bubble--patellae"
              {...bubbleProps("patellae")}
            >
              <div className="opening-bubble__float">
                <span>
                  chondromalacia
                  <br />
                  patellae
                </span>
              <span className="opening-bubble__description">{descriptions.patellae}</span>
              </div>
            </div>
            <div
              className="opening-bubble opening-bubble--acl"
              {...bubbleProps("acl")}
            >
              <div className="opening-bubble__float">
                <span>
                  status post ACL
                  <br />
                  reconstruction
                </span>
              <span className="opening-bubble__description">{descriptions.acl}</span>
              </div>
            </div>
            <div
              className="opening-bubble opening-bubble--decor-top"
              aria-hidden="true"
            >
              <div className="opening-bubble__float">
              </div>
            </div>
            <div
              className="opening-bubble opening-bubble--decor-left"
              aria-hidden="true"
            >
              <div className="opening-bubble__float">
              </div>
            </div>
            <div
              className="opening-bubble opening-bubble--decor-right"
              aria-hidden="true"
            >
              <div className="opening-bubble__float">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GlobalBurdenScene() {
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

        </div>

        <div className="opening-side opening-side--right">
          <div className="opening-burden__visual">
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
          <LoopingIllustration
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
          <LoopingIllustration
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

export function ImpactScene({ play }: { play: boolean }) {
  return (
    <div className="opening-scene opening-scene--impact">
      <div className="opening-impact__map-background opening-scene--burden" aria-hidden="true">
        <div className="opening-burden__map">
          <InteractiveWorldMap interactive={false} />
        </div>
      </div>
      <SportsTraumaScene play={play} />
      <RehabilitationScene play={play} />
      <LoopingIllustration
        alt="A person experiencing knee pain while using stairs"
        className="opening-impact__stairs"
        gif={`${staticGif}/going-up-the-stairs/stairs-pain-compressed.webp`}
        play={play}
        poster={`${staticGif}/knee-pain-first.avif`}
      />
    </div>
  );
}
