import { useReducedMotion } from "motion/react";
import { useStory } from "./StoryContext";
const staticHome = "https://static.igem.wiki/teams/6102/wiki/images/home";
const imgFlyingBirdFrame1 = `${staticHome}/home-08-bird-flight-01.avif`;
const imgFlyingBirdFrame2 = `${staticHome}/home-08-bird-flight-02.avif`;
const imgBoneNest = `https://static.igem.wiki/teams/6102/wiki/images/home/bird-return-bone-2.avif`;
const imgBirdRestingOnBone = `${staticHome}/home-08-bird-landed-2.avif`;
const imgAccentBlushGlow = `https://static.igem.wiki/teams/6102/wiki/images/home/c207d.svg`;
const imgAccentYellowOrbit = `https://static.igem.wiki/teams/6102/wiki/images/home/55f95.svg`;

export default function BirdReturnsToNest() {
  const { birdProgress, birdStage, birdLandingProgress } = useStory();
  const reduced = useReducedMotion();
  const landing = reduced ? Number(birdStage >= 2) : birdLandingProgress;
  const landingEase = landing * landing * (3 - 2 * landing);
  const rawFlight = Math.max(0, Math.min(1, birdProgress));
  const flight = reduced ? Number(rawFlight > 0) : rawFlight;
  const flightEase = flight * flight * (3 - 2 * flight);
  const remainingFlight = 1 - flightEase;
  const flightStartX = 768;
  const flightEndX = 118;
  const flightStartY = 18;
  const flightControlY = 70;
  const flightEndY = 174;
  // A quadratic curve from the right edge to the resting bird's position.
  // The flying assets and resting asset share the same source-canvas size, so
  // matching their rendered boxes also keeps the visible birds similarly sized.
  const flightX = flightStartX * remainingFlight + flightEndX * flightEase;
  const flightY =
    flightStartY * remainingFlight * remainingFlight +
    2 * remainingFlight * flightEase * flightControlY +
    flightEndY * flightEase * flightEase;
  // Enter level and facing left, then smoothly pitch the head downward as the
  // bird approaches the bone.
  const flightRotation = 20 - 40 * flightEase;
  const flightEntryOpacity = Math.max(0, Math.min(1, flight * 8));

  return (
    <div
      className="home-layer-46"
      data-node-id="186:313"
      data-name="Page 05 / Bird Returns to NEST"
    >
      <div
        className="home-layer-47"
        data-node-id="227:10"
        data-name="Accent / Blush glow"
      >
        <div className="home-layer-48">
          <img
            alt=""
            loading="lazy"
            decoding="async"
            className="home-layer-49"
            src={imgAccentBlushGlow}
          />
        </div>
      </div>
      <div
        className="home-layer-50"
        data-node-id="227:11"
        data-name="Accent / Yellow orbit"
      >
        <div className="home-layer-51">
          <img
            alt=""
            loading="lazy"
            decoding="async"
            className="home-layer-49"
            src={imgAccentYellowOrbit}
          />
        </div>
      </div>
      <p className="home-layer-52" data-node-id="227:12">
        NEST
      </p>
      <div
        className="home-layer-57"
        data-node-id="650:1444"
        data-name="Bone nest"
      >
        <img
          alt=""
          loading="lazy"
          decoding="async"
          className="home-layer-58"
          src={imgBoneNest}
        />
      </div>
      <div
        className="home-layer-59"
        data-node-id="510:8"
        data-name="Bird resting on bone"
        style={{
          opacity: birdStage >= 2 ? Math.min(1, landing * 5) : 0,
          transform: `translateY(${24 * (1 - landingEase)}px) scale(${0.94 + 0.22 * landingEase})`,
        }}
      >
        <img
          alt=""
          loading="lazy"
          decoding="async"
          className="home-resting-bird-image"
          src={imgBirdRestingOnBone}
          onError={(event) => {
            const fallback = `https://static.igem.wiki/teams/6102/wiki/images/home/bird-return-bone-2.avif`;
            if (
              event.currentTarget.src !==
              new URL(fallback, window.location.href).href
            ) {
              event.currentTarget.src = fallback;
            }
          }}
        />
      </div>
      <div
        className="home-layer-60"
        data-name="Alternating flying bird frames"
        style={{
          opacity:
            birdStage >= 2 ? 1 - Math.min(1, landing * 5) : flightEntryOpacity,
          transform: `translate3d(calc(-50% + ${flightX}px), ${flightY}px, 0)`,
        }}
      >
        <div
          className="home-flying-bird-rotation"
          style={{ transform: `rotate(${flightRotation}deg)` }}
        >
          <img
            alt=""
            loading="lazy"
            decoding="async"
            className="home-flying-bird-frame home-flying-bird-frame--1"
            data-node-id="510:6"
            src={imgFlyingBirdFrame1}
          />
          <img
            alt=""
            loading="lazy"
            decoding="async"
            className="home-flying-bird-frame home-flying-bird-frame--2"
            data-node-id="510:5"
            src={imgFlyingBirdFrame2}
          />
        </div>
      </div>

    </div>
  );
}
