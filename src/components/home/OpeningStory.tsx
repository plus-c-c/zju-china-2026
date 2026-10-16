import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { InteractiveWorldMap } from "./InteractiveWorldMap";
import "./OpeningStory.css";

const staticRoot = "https://static.igem.wiki/teams/6102/wiki";
const staticHome = `${staticRoot}/images/home`;
const staticGif = `${staticRoot}/gif`;

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
  return (
    <div
      className="opening-scene opening-scene--statement"
      data-node-id="967:867"
    >
      <div className="opening-content">
        <h1 className="opening-statement__title" data-node-id="967:871">
          Cartilage damage is widespread—
          <br />
          yet lasting repair remains elusive.
        </h1>
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
            A world in <strong>PAIN</strong>.
            <br />A need for repair.
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
          <p className="opening-burden__source">
            25,293 knee arthroscopies · China
          </p>
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
            Pain <strong>takes more</strong>
            <br />
            than movement.
          </h2>
          <div className="opening-sports__score" data-node-id="1009:29">
            <strong>27.5</strong>
            <span>OUT OF 100</span>
            <small>(higher is better)</small>
          </div>
          <p className="opening-sports__body" data-node-id="1009:28">
            Quality of life score
            <br />
            prior to cartilage repair
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
            Getting life back
            <br />
            comes at a <strong>COST</strong>.
          </h2>
          <div className="opening-rehab__cost" data-node-id="967:882">
            <strong>~£2</strong>
            <b>billion/yr.</b>
            <span>Treatment-spending scenario.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
