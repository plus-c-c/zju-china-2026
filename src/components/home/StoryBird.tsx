import { useEffect, useRef, useState, type CSSProperties } from "react";

import { createPortal } from "react-dom";
const restBird = "https://static.igem.wiki/teams/6102/wiki/home-opening/guide-bird-rest.avif";
const flightOne = "https://static.igem.wiki/teams/6102/wiki/home-opening/guide-bird-flight-01.avif";
const flightTwo = "https://static.igem.wiki/teams/6102/wiki/home-opening/guide-bird-flight-02.avif";
// Feet positions in the shared 1280 × 720 illustration space.
const stops = [
  { beat: 0, x: 452, y: 575, size: 0.4 },
  { beat: 1, x: 452, y: 575, size: 0.4 },
  { beat: 2, x: 784, y: 233, size: 0.4 },
  { beat: 3, x: 784, y: 233, size: 0.4 },
  { beat: 4, x: 1022, y: 328, size: 0.4 },
  { beat: 4.8, x: 825, y: 250, size: 0.5 },
  { beat: 5, x: 825, y: 250, size: 0.5 },
  { beat: 6, x: 75, y: 685, size: 0.4 },
  { beat: 7, x: 75, y: 685, size: 0.4 },
  { beat: 8, x: 429, y: 578, size: 0.4 },
  { beat: 9, x: 429, y: 578, size: 0.4 },
  { beat: 10, x: 1112, y: 156, size: 0.4 },
  { beat: 13, x: 1112, y: 156, size: 0.4 },
  { beat: 14, x: 640, y: 477, size: 1.5 },
  { beat: 18, x: 640, y: 477, size: 1.5 },
  { beat: 19, x: 210, y: 402, size: 0.4 },
  { beat: 20, x: 210, y: 402, size: 0.4 },
  { beat: 21, x: 1092, y: 590, size: 0.4 },
  { beat: 22, x: 1092, y: 590, size: 0.4 },
];
/** Resolve perches from the illustration they belong to, including its content scale. */
export function perch(stop: typeof stops[number]) {
  const anchors: Record<number, [string, number, number]> = {
    2: [".opening-bubble--hyaline", 0.23, 0.08],
    3: [".opening-bubble--hyaline", 0.23, 0.08],
    4: ["#home-3 .opening-burden__world", 0.756, 0.4],
    4.8: [".opening-burden__stat strong", 0.70, 0.1],
    5: [".opening-burden__stat strong", 0.70, 0.1],
    6: [".opening-impact__stairs", -0.35, 1],
    7: [".opening-impact__stairs", -0.35, 1],
    8: [".hydrogel-materials-page__button", 1.22, 1],
    9: [".hydrogel-materials-page__button", 1.22, 1],
    10: [".limitations-card:last-child", 0.9, 0],
    13: [".limitations-card:last-child", 0.9, 0],
    14: [".home-layer-57", 0.5, 0.25],
    18: [".home-layer-57", 0.5, 0.25],
    19: [".nest-solution-card--ligase", 0.07, 0.02],
    20: [".nest-solution-card--ligase", 0.07, 0.02],
    21: [".oa-panel", 0.955, 0.98],
    22: [".oa-panel", 0.955, 0.98],
  };
  const anchor = anchors[stop.beat];
  const element = anchor && document.querySelector<HTMLElement>(anchor[0]);
  const canvas = element?.closest<HTMLElement>(".home-scene-canvas");
  if (!element || !canvas) {
    return { ...stop, x: 640 + (stop.x - 640) * 0.89, y: 360 + (stop.y - 360) * 0.89 };
  }
  const bounds = element.getBoundingClientRect();
  const scene = canvas.getBoundingClientRect();
  const unit = scene.width / 1280;
  return { ...stop,
    x: 640 + ((bounds.left + bounds.width * anchor[1] - scene.left) / unit - 640) * 0.89,
    y: 360 + ((bounds.top + bounds.height * anchor[2] - scene.top) / unit - 360) * 0.89,
  };
}
export function StoryBird({ position, direction, scale }: { position: number; direction: number; scale: number }) {
  const index = Math.max(0, stops.findIndex((stop) => stop.beat > position) - 1);
  const from = position >= 22 ? stops[stops.length - 1] : stops[index];
  const to = position >= 22 ? from : stops[index + 1];
  const raw = Math.max(0, Math.min(1, (position - from.beat) / Math.max(0.01, to.beat - from.beat)));
  const destination = direction < 0 ? (raw < 0.985 ? from : to) : (raw > 0.015 ? to : from);
  const [pose, setPose] = useState({ ...stops[0], moving: false, angle: 0, facing: 1 });
  const poseRef = useRef(pose);
  const flightRate = useRef(1);
  useEffect(() => {
    const updateRate = (event: Event) => {
      flightRate.current = Math.max(1, Math.min(1.25, (event as CustomEvent<number>).detail || 1));
    };
    window.addEventListener("home-story-speed", updateRate);
    return () => window.removeEventListener("home-story-speed", updateRate);
  }, []);
  const [handoffRevision, setHandoffRevision] = useState(0);
  useEffect(() => {
    const resume = (event: Event) => {
      const anchor = (event as CustomEvent<{ x: number; y: number }>).detail;
      if (anchor) {
        const restored = { ...poseRef.current, ...anchor, size: 0.4, moving: false, angle: 0, facing: 1 };
        poseRef.current = restored;
        setPose(restored);
      }
      setHandoffRevision(current => current + 1);
    };
    window.addEventListener("home-bird-handoff", resume);
    return () => window.removeEventListener("home-bird-handoff", resume);
  }, []);
  const jump = (element: HTMLElement) => {
    element.getAnimations().forEach(animation => animation.cancel());
    element.animate([
      { translate: "0 0" }, { translate: "0 -22px", offset: 0.4 },
      { translate: "0 0", offset: 0.85 }, { translate: "0 -3px", offset: 0.93 }, { translate: "0 0" },
    ], { duration: 520, easing: "ease-out" });
  };
  const destinationStop = destination;
  const targetX = destination.x, targetY = destination.y, targetSize = destination.size;
  const atHome = targetX === stops[0].x && targetY === stops[0].y;
  const [introOpacity, setIntroOpacity] = useState(0);
  // The same persistent bird follows the actual button through its entrance.
  useEffect(() => {
    if (!atHome) return;
    let frame = 0;
    const followButton = () => {
      if (poseRef.current.beat !== 0 || poseRef.current.moving) {
        frame = requestAnimationFrame(followButton);
        return;
      }
      const anchor = document.querySelector(".home-intro__bird-anchor")?.getBoundingClientRect();
      const canvas = document.querySelector(".story-bird-canvas")?.getBoundingClientRect();
      const copy = document.querySelector(".home-intro__next");
      const ready = !!document.querySelector(".home-intro--ready");
      if (anchor && canvas && copy) {
        const scale = canvas.width / 1280;
        const next = { ...stops[0], x: (anchor.left + anchor.width / 2 - canvas.left) / scale,
          y: (anchor.bottom - canvas.top) / scale, moving: false, angle: 0, facing: 1 };
        poseRef.current = next;
        setPose(next);
        setIntroOpacity(ready ? Number(getComputedStyle(copy).opacity) : 0);
      }
      frame = requestAnimationFrame(followButton);
    };
    frame = requestAnimationFrame(followButton);
    return () => cancelAnimationFrame(frame);
  }, [atHome]);
  useEffect(() => {
    if (document.body.classList.contains("pipeline-bird-active") && destinationStop.beat >= 21) return;
    if (atHome && poseRef.current.beat === 0) return;
    const destination = { ...perch({ ...destinationStop, x: targetX, y: targetY, size: targetSize }), beat: atHome ? 0 : 2 };
    if (atHome) {
      const anchor = document.querySelector(".home-intro__bird-anchor")?.getBoundingClientRect();
      const canvas = document.querySelector(".story-bird-canvas")?.getBoundingClientRect();
      if (anchor && canvas) {
        const introScene = document.querySelector("#home-1")?.getBoundingClientRect();
        // The intro may still be translated offscreen during a reverse turn.
        // Its destination belongs to the settled viewport, not that transient rect.
        destination.x = (anchor.left + anchor.width / 2 - (introScene?.left || 0) - canvas.left) / (canvas.width / 1280);
        destination.y = (anchor.bottom - (introScene?.top || 0) - canvas.top) / (canvas.width / 1280);
      }
    }
    let start = poseRef.current;
    const element = document.querySelector<HTMLElement>(".story-guide-bird");
    if (element?.dataset.pipelineControlled === "true") {
      start = { ...start, x: parseFloat(element.style.left), y: parseFloat(element.style.top),
        size: parseFloat(element.style.getPropertyValue("--bird-size")) || 0.4,
        angle: parseFloat(element.style.getPropertyValue("--bird-flight-angle")) || 0 };
      poseRef.current = start;
      delete element.dataset.pipelineControlled;
    }
    const dx = destination.x - start.x;
    const dy = destination.y - start.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 0.1 && Math.abs(destination.size - start.size) < 0.01) {
      const frame = requestAnimationFrame(() => {
        const landed = { ...destination, moving: false, angle: 0, facing: 1 };
        poseRef.current = landed;
        setPose(landed);
        element?.classList.remove("story-guide-bird--flying");
      });
      return () => cancelAnimationFrame(frame);
    }
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const height = Math.min(60, Math.abs(dy) * 0.22);
    // Arc-length sampling gives every flight the same speed, even on curved paths.
    const samples = [0];
    let length = 0;
    let lastX = start.x;
    let lastY = start.y;
    for (let i = 1; i <= 100; i++) {
      const t = i / 100;
      const x = start.x + dx * t;
      const y = start.y + dy * t - Math.sin(Math.PI * t) * height;
      length += Math.hypot(x - lastX, y - lastY);
      samples.push(length);
      lastX = x; lastY = y;
    }
    // Longer routes accelerate smoothly; short hops stay gentle.
    const distanceRatio = Math.max(0, Math.min(1, (length - 120) / 780));
    const speed = 340 + 460 * distanceRatio;
    const duration = reduced ? 1 : Math.min(1350, Math.max(450, length / speed * 1000));
    const began = performance.now();
    let frame = 0;
    let previousTime = began;
    let flightElapsed = 0;
    let rate = 1;
    let heading = Math.atan2(dy - Math.PI * height, dx) * 180 / Math.PI;
    const tick = (time: number) => {
      if (document.body.classList.contains("pipeline-bird-active")) {
        // The document route owns this same bird now, regardless of which
        // earlier scene flight was interrupted by a fast scroll.
        poseRef.current = { ...poseRef.current, moving: false };
        return;
      }
      const dt = Math.max(0, (time - previousTime) / 1000);
      previousTime = time;
      rate += (flightRate.current - rate) * (1 - Math.exp(-dt / 0.13));
      flightElapsed += dt * 1000 * rate;
      const elapsed = Math.min(1, flightElapsed / duration);
      const traveled = length * elapsed;
      let segment = samples.findIndex(value => value >= traveled);
      segment = Math.max(1, segment);
      const t = elapsed === 1 ? 1 : (segment - 1 + (traveled - samples[segment - 1]) / Math.max(0.001, samples[segment] - samples[segment - 1])) / 100;
      const desiredHeading = Math.atan2(dy - Math.PI * height * Math.cos(Math.PI * t), dx) * 180 / Math.PI;
      const headingDifference = ((desiredHeading - heading + 540) % 360 + 360) % 360 - 180;
      heading += headingDifference * (1 - Math.exp(-dt / 0.18));
      const liveTarget = atHome ? destination : perch(destinationStop);
      const next = {
        ...destination,
        x: start.x + (liveTarget.x - start.x) * t,
        y: start.y + (liveTarget.y - start.y) * t - Math.sin(Math.PI * t) * height,
        size: start.size + (destination.size - start.size) * (t * t * (3 - 2 * t)),
        moving: elapsed < 1,
        angle: heading,
        facing: 1,
      };
      poseRef.current = next;
      setPose(next);
      if (elapsed < 1) frame = requestAnimationFrame(tick);
      else {
        element?.classList.remove("story-guide-bird--flying");
        window.dispatchEvent(new Event("home-bird-landed"));
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [targetX, targetY, targetSize, atHome, scale, handoffRevision]);
  useEffect(() => {
    if (atHome) return;
    let frame = 0;
    const follow = () => {
      if (!poseRef.current.moving && !document.body.classList.contains("pipeline-bird-active")) {
        const target = perch(destinationStop);
        const current = poseRef.current;
        if (Math.hypot(current.x - target.x, current.y - target.y) > 0.2) {
          const next = { ...current, x: current.x + (target.x - current.x) * 0.18, y: current.y + (target.y - current.y) * 0.18 };
          poseRef.current = next;
          setPose(next);
        }
      }
      frame = requestAnimationFrame(follow);
    };
    frame = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(frame);
  }, [atHome, destinationStop]);
  useEffect(() => {
    if (destinationStop.beat !== 19 && destinationStop.beat !== 20) return;
    const title = document.querySelector<HTMLElement>(".nest-solution-ligase-title");
    if (!title) return;
    const overlay = title.cloneNode(true) as HTMLElement;
    overlay.setAttribute("aria-hidden", "true");
    overlay.removeAttribute("id");
    document.body.appendChild(overlay);
    let frame = 0;
    const follow = () => {
      const bounds = title.getBoundingClientRect();
      const computed = getComputedStyle(title);
      Object.assign(overlay.style, { position: "fixed", left: `${bounds.left}px`, top: `${bounds.top}px`,
        width: `${bounds.width}px`, height: `${bounds.height}px`, transform: "none", margin: "0",
        fontSize: `${parseFloat(computed.fontSize) * bounds.width / title.offsetWidth}px`,
        lineHeight: `${bounds.height}px`, zIndex: "9", pointerEvents: "none",
        opacity: poseRef.current.moving ? "0" : "1" });
      frame = requestAnimationFrame(follow);
    };
    frame = requestAnimationFrame(follow);
    return () => { cancelAnimationFrame(frame); overlay.remove(); };
  }, [destinationStop]);
  const { x, y, size, moving, angle: flightAngle } = pose;
  return createPortal(<div className="story-bird-canvas" style={{ opacity: atHome && pose.beat === 0 && !pose.moving ? introOpacity : 1, "--scene-scale": scale } as CSSProperties}>
    <div role="button" tabIndex={0} aria-label="Make the NEST bird hop"
      onClick={(event) => { event.stopPropagation(); jump(event.currentTarget); }}
      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); jump(event.currentTarget); } }}
      className={`story-guide-bird${moving ? " story-guide-bird--flying" : ""}`} style={{left: x, top: y, "--bird-size": size, "--bird-bank": "0deg", "--bird-flight-angle": `${flightAngle}deg`, "--bird-facing": pose.facing} as CSSProperties}>
      <img className="story-guide-bird__rest" src={restBird} alt="" />
      <div className="story-guide-bird__flight">
        <img className="home-flying-bird-frame--1" src={flightOne} alt="" />
        <img className="home-flying-bird-frame--2" src={flightTwo} alt="" />
      </div>
    </div>
  </div>, document.body);
}
