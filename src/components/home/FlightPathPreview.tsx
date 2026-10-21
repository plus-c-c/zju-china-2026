import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { getPipelineFlightRoute } from "./PipelineFlightRoute";
import { OA_BIRD_STOP, perch, stops } from "./storyBirdGeometry";
import { BIRD_ARTWORK_HEADING } from "./flightHeading";
import { getStoryHandoffTop, STORY_SCROLL_RATIO } from "./UseStoryNavigation";
import "./FlightPathPreview.css";

type Point = { x: number; y: number };
type Knot = [Point, Point];
type Segment = {
  id: string; label: string; from: number; to: number;
  frame: "scene" | "viewport" | "document"; resting?: boolean;
  sample: (u: number) => Point; size: (u: number) => number;
};
type Geometry = { width: number; height: number; segments: Segment[] };
const clamp = (v: number) => Math.max(0, Math.min(1, v));
const mix = (a: number, b: number, u: number) => a + (b - a) * u;
const emptyKnots = (): Knot => [{ x: 0, y: 0 }, { x: 0, y: 0 }];
const storyStops = [0, 2, 4, 4.8, 6, 8, 10, 13, 14, 18, 19, 20, 21];
const labels = [
  "NEST → Bubbles", "Bubbles → Map", "Map → 2 in 3", "2 in 3 → People",
  "People → Hydrogel", "Hydrogel → Three cards", "Three cards · Hold",
  "Three cards → NEST", "NEST · Hold", "NEST → SELP / Link",
  "SELP / Link · Hold", "SELP / Link → OA",
];
const media = "https://static.igem.wiki/teams/6102/wiki/home-opening/";

/** Read the same anchors and pipeline function as the actual guide bird. */
function readGeometry(): Geometry | null {
  const canvas = document.querySelector(".story-bird-canvas")?.getBoundingClientRect();
  const bird = document.querySelector<HTMLElement>(".story-guide-bird");
  const root = document.querySelector(".selp-pipeline");
  const footer = document.querySelector(".footer")?.getBoundingClientRect();
  const start = getStoryHandoffTop();
  if (!canvas || !bird || !root || !footer || start === null) return null;
  const scale = canvas.width / 1280;
  const height = innerHeight, width = innerWidth;
  const sceneHeight = document.querySelector<HTMLElement>(".story-viewport")?.clientHeight ?? height;
  const storyTop = (document.querySelector(".home-scroll-space")?.getBoundingClientRect().top ?? 0) + scrollY;
  const anchors = storyStops.map(beat => {
    const stop = stops.find(s => s.beat === beat)!;
    const p = perch(stop);
    if (!beat) {
      const intro = document.querySelector("#home-1")?.getBoundingClientRect();
      const next = document.querySelector(".home-intro__bird-anchor")?.getBoundingClientRect();
      if (next && intro) {
        p.x = (next.left + next.width / 2 - intro.left - canvas.left) / scale;
        p.y = (next.bottom - intro.top - canvas.top) / scale;
      }
    }
    return { x: canvas.left + p.x * scale, y: canvas.top + p.y * scale, size: p.size };
  });
  const segments: Segment[] = anchors.slice(0, -1).map((a, i) => {
    const b = anchors[i + 1], dx = b.x - a.x, dy = b.y - a.y;
    const lift = Math.min(60 * scale, Math.abs(dy) * 0.22);
    return {
      id: "story-" + i, label: labels[i], frame: "scene",
      from: storyTop + storyStops[i] * sceneHeight * STORY_SCROLL_RATIO,
      to: storyTop + storyStops[i + 1] * sceneHeight * STORY_SCROLL_RATIO,
      resting: Math.hypot(dx, dy) < 0.5,
      sample: u => ({ x: mix(a.x, b.x, u), y: mix(a.y, b.y, u) - lift * Math.sin(Math.PI * u) }),
      size: u => mix(a.size, b.size, u * u * (3 - 2 * u)) * scale,
    };
  });
  const oa = perch(OA_BIRD_STOP);
  const arch = Math.min(104, Math.max(64, width * 0.07));
  const route = getPipelineFlightRoute(root,
    { x: canvas.left + oa.x * scale, y: start + canvas.top + oa.y * scale },
    { x: footer.left + footer.width * 0.12, y: footer.top + scrollY + arch * 0.35 - 3 },
    start, canvas, bird.offsetHeight * 0.4 * scale / 2);
  if (!route) return null;
  const cuts = [route.start, route.stops[0], route.stops[1], route.exit, route.edge, route.end,
    Math.max(route.end, document.documentElement.scrollHeight - height)];
  const names = ["OA → Magnetic start", "Magnetic → GAG start", "GAG → Mitochondrial module",
    "Mitochondrial → Right edge", "Right edge → Promotion Video", "Video → Footer"];
  names.forEach((label, i) => segments.push({
    id: "pipeline-" + i, label, frame: i === 0 ? "viewport" : "document",
    from: cuts[i], to: cuts[i + 1], resting: i === 5,
    sample: u => {
      const scroll = mix(cuts[i], cuts[i + 1], u);
      const point = route.sample(scroll);
      // Each entry sample was defined at its own scroll position. Subtracting
      // the current scroll from every sample makes its fixed OA origin drift.
      return { x: point.x, y: point.y - (i === 0 ? scroll : 0) };
    },
    size: () => 0.4 * scale,
  }));
  return { width, height, segments };
}

function derivative(sample: (u: number) => Point, u: number) {
  const low = Math.max(0, u - 0.0001), high = Math.min(1, u + 0.0001);
  const a = sample(low), b = sample(high);
  return { x: (b.x - a.x) / (high - low), y: (b.y - a.y) / (high - low) };
}
function pathString(sample: (u: number) => Point) {
  return Array.from({ length: 161 }, (_, i) => {
    const p = sample(i / 160);
    return (i ? "L" : "M") + p.x.toFixed(2) + " " + p.y.toFixed(2);
  }).join(" ");
}

export default function FlightPathPreview() {
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [index, setIndex] = useState(12);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [visible, setVisible] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [preview, setPreview] = useState(true);
  const [offsets, setOffsets] = useState<Record<string, Knot>>({});
  const [viewportScroll, setViewportScroll] = useState(scrollY);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("");
  const svg = useRef<SVGSVGElement>(null);
  const dragging = useRef<{ handle: number; start: Point; offset: Point } | null>(null);

  const measure = useCallback(() => {
    const next = readGeometry();
    if (next) setGeometry(next);
  }, []);
  useEffect(() => {
    let frame = 0, timer = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      // ResizeObserver updates the page's scene scale in React first.
      // Measure after that paint, rather than retaining its previous transform.
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(measure);
        timer = window.setTimeout(measure, 180);
      });
    };
    const begin = () => { setReady(true); schedule(); };
    if (document.querySelector(".home-intro--ready")) begin();
    window.addEventListener("home-intro-ready", begin);
    window.addEventListener("resize", schedule);
    const scroll = () => setViewportScroll(scrollY);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame); clearTimeout(timer);
      window.removeEventListener("home-intro-ready", begin);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", scroll);
    };
  }, [measure]);

  const segment = geometry?.segments[index];
  // This preview uses its own bird, leaving the runtime controllers untouched.
  useEffect(() => {
    document.body.classList.toggle("flight-preview-active", ready && preview && visible);
    return () => document.body.classList.remove("flight-preview-active");
  }, [ready, preview, visible]);
  useEffect(() => {
    if (!segment || !ready || !preview || !visible) return;
    window.dispatchEvent(new Event("home-story-seek"));
    window.scrollTo({ top: mix(segment.from, segment.to, progress), behavior: "instant" });
  }, [segment, progress, ready, preview, visible]);
  useEffect(() => {
    if (!playing || !visible || !ready) return;
    let frame = 0, previous = performance.now();
    const tick = (now: number) => {
      const step = (now - previous) / 4500 * (reverse ? -1 : 1);
      previous = now;
      setProgress(value => {
        const next = value + step;
        if (next >= 1 || next <= 0) setPlaying(false);
        return clamp(next);
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, reverse, visible, ready]);

  // A native wheel gesture leaves scrubbing mode so ordinary scrolling still works.
  useEffect(() => {
    const release = (event: WheelEvent) => {
      if (event.target instanceof Element && event.target.closest(".flight-preview-panel")) return;
      setPlaying(false); setPreview(false);
    };
    window.addEventListener("wheel", release, { passive: true });
    return () => window.removeEventListener("wheel", release);
  }, []);

  useEffect(() => {
    if (preview || !geometry || !ready) return;
    const follow = () => {
      const next = geometry.segments.findIndex(s => scrollY < s.to - 0.5);
      const selected = next < 0 ? geometry.segments.length - 1 : next;
      const current = geometry.segments[selected];
      setIndex(selected);
      setProgress(clamp((scrollY - current.from) / Math.max(1, current.to - current.from)));
    };
    follow();
    window.addEventListener("scroll", follow, { passive: true });
    return () => window.removeEventListener("scroll", follow);
  }, [preview, geometry, ready]);

  const edits = segment ? offsets[segment.id] ?? emptyKnots() : emptyKnots();
  const modified = edits.some(p => Math.hypot(p.x, p.y) > 0.00001);
  const adjust = (u: number): Point => {
    const p = segment!.sample(u), v = 1 - u;
    return {
      x: p.x + geometry!.width * (3 * v * v * u * edits[0].x + 3 * v * u * u * edits[1].x),
      y: p.y + geometry!.height * (3 * v * v * u * edits[0].y + 3 * v * u * u * edits[1].y),
    };
  };
  const toScreen = (p: Point) => ({ x: p.x, y: p.y - (segment?.frame === "document" ? viewportScroll : 0) });
  const original = (u: number) => toScreen(segment!.sample(u));
  const edited = (u: number) => toScreen(adjust(u));
  const point = segment && geometry ? edited(progress) : { x: 0, y: 0 };
  const tangent = segment && geometry ? derivative(adjust, progress) : { x: 0, y: 1 };
  const length = Math.hypot(tangent.x, tangent.y);
  const heading = Math.atan2(tangent.y, tangent.x) * 180 / Math.PI + (reverse ? 180 : 0);
  const endpoints = segment ? [original(0), original(1)] : [];
  const controls = segment && geometry ? [0, 1].map(i => {
    const at = i, direction = derivative(segment.sample, at), p = segment.sample(at);
    return toScreen({
      x: p.x + direction.x * (i ? -1 : 1) / 3 + edits[i].x * geometry.width,
      y: p.y + direction.y * (i ? -1 : 1) / 3 + edits[i].y * geometry.height,
    });
  }) : [];
  const resume = () => { setPreview(true); setVisible(true); };
  const select = (next: number) => {
    setIndex(Math.max(0, Math.min(17, next))); setProgress(0); setPlaying(false); resume();
  };
  const exportEdits = () => {
    const json = JSON.stringify({ version: 1, base: "current-homepage", units: "viewport fraction", offsets }, null, 2);
    const url = URL.createObjectURL(new Blob([json], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url; a.download = "homepage-flight-adjustments.json"; a.click();
    URL.revokeObjectURL(url);
    setStatus("Preview adjustments exported. The homepage is unchanged.");
  };

  return createPortal(<>
    {visible && segment && geometry && <svg ref={svg} className="flight-preview-lines"
      width={geometry.width} height={geometry.height} aria-label="Flight path preview"
      onPointerMove={event => {
        const drag = dragging.current;
        if (!drag) return;
        const next: Knot = [{ ...edits[0] }, { ...edits[1] }];
        next[drag.handle] = {
          x: drag.offset.x + (event.clientX - drag.start.x) / geometry.width,
          y: drag.offset.y + (event.clientY - drag.start.y) / geometry.height,
        };
        setOffsets(current => ({ ...current, [segment.id]: next }));
      }}
      onPointerUp={event => {
        dragging.current = null;
        if (svg.current?.hasPointerCapture(event.pointerId)) svg.current.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={() => { dragging.current = null; }}>
      <defs><marker id="flight-preview-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0 0L7 3.5L0 7Z" fill="#ad3c19" />
      </marker></defs>
      <path d={pathString(original)} className="flight-preview-original" />
      <path d={pathString(edited)} className="flight-preview-edited" />
      {endpoints.map((p, i) => <g key={i}>
        <circle cx={p.x} cy={p.y} r="7" className="flight-preview-stop" />
        <text x={p.x + 12} y={p.y - 12}>{i ? "End" : "Start"}</text>
      </g>)}
      {!segment.resting && controls.map((p, i) => <g key={i}>
        <path d={"M" + endpoints[i].x + " " + endpoints[i].y + "L" + p.x + " " + p.y} className="flight-preview-handle-line" />
        <circle cx={p.x} cy={p.y} r="10" className="flight-preview-handle"
          role="slider" tabIndex={0} aria-label={"Control point C" + (i + 1)}
          aria-valuetext={edits[i].x.toFixed(3) + ", " + edits[i].y.toFixed(3)}
          onKeyDown={event => {
            if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
            event.preventDefault(); event.stopPropagation();
            const next: Knot = [{ ...edits[0] }, { ...edits[1] }];
            const step = event.shiftKey ? 0.02 : 0.004;
            next[i].x += event.key === "ArrowLeft" ? -step : event.key === "ArrowRight" ? step : 0;
            next[i].y += event.key === "ArrowUp" ? -step : event.key === "ArrowDown" ? step : 0;
            setOffsets(current => ({ ...current, [segment.id]: next }));
          }}
          onPointerDown={event => {
            event.preventDefault(); setPlaying(false); resume();
            dragging.current = { handle: i, start: { x: event.clientX, y: event.clientY }, offset: { ...edits[i] } };
            svg.current?.setPointerCapture(event.pointerId);
          }} />
        <text x={p.x + 15} y={p.y + 5}>{"C" + (i + 1)}</text>
      </g>)}
      {preview && !segment.resting && length > 0.01 && <line
        x1={point.x} y1={point.y} x2={point.x + tangent.x / length * 85 * (reverse ? -1 : 1)}
        y2={point.y + tangent.y / length * 85 * (reverse ? -1 : 1)}
        stroke="#ad3c19" strokeWidth="3" markerEnd="url(#flight-preview-arrow)" />}
    </svg>}
    {visible && preview && segment && geometry && <div className="flight-preview-bird"
      aria-hidden="true" style={{
        left: point.x, top: point.y, "--preview-size": segment.size(progress),
        "--preview-angle": heading - BIRD_ARTWORK_HEADING,
      } as CSSProperties}>
      <div className={segment.resting ? "" : "flight-preview-bird__turn"}>
        <img src={media + (segment.resting ? "guide-bird-rest.avif" : "guide-bird-flight-01.avif")} alt="" />
      </div>
    </div>}
    <aside role="dialog" aria-label="Homepage flight path inspector" className="flight-preview-panel"
      onKeyDown={event => event.stopPropagation()}>
      <header><strong>Flight path · Local preview</strong>
        <button type="button" onClick={() => setCollapsed(v => !v)} aria-expanded={!collapsed}>{collapsed ? "Expand" : "Minimize"}</button>
      </header>
      {!collapsed && <>
        {!ready && <p>Wait for loading to finish, then use Skip to open the homepage.</p>}
        <label>Segment<select disabled={!ready} value={index} onChange={e => select(Number(e.target.value))}>
          {labels.concat(["OA → Magnetic start", "Magnetic → GAG start", "GAG → Mitochondrial module",
            "Mitochondrial → Right edge", "Right edge → Promotion Video", "Video → Footer"])
            .map((label, i) => <option value={i} key={label}>{i + 1} · {label}</option>)}
        </select></label>
        <div className="flight-preview-actions">
          <button disabled={!ready || index === 0} onClick={() => select(index - 1)}>← Previous</button>
          <button disabled={!ready || index === 17} onClick={() => select(index + 1)}>Next →</button>
          <button disabled={!ready} onClick={() => { resume(); if ((!reverse && progress >= 1) || (reverse && progress <= 0)) setProgress(reverse ? 1 : 0); setPlaying(v => !v); }}>{playing ? "Pause" : "Play"}</button>
          <button aria-pressed={reverse} onClick={() => setReverse(v => !v)}>{reverse ? "Reverse ↑" : "Forward ↓"}</button>
        </div>
        <label>Progress <output>{Math.round(progress * 100)}%</output>
          <input aria-label="Flight progress" type="range" min="0" max="1" step="0.001" value={progress} disabled={!ready}
            onChange={e => { setPlaying(false); resume(); setProgress(Number(e.target.value)); }} />
        </label>
        <div className="flight-preview-actions">
          <button aria-pressed={visible} onClick={() => setVisible(v => !v)}>{visible ? "Hide guides" : "Show guides"}</button>
          <button aria-pressed={!preview} onClick={() => { setPlaying(false); setPreview(v => !v); }}>{preview ? "Use normal scroll" : "Resume preview"}</button>
        </div>
        <p className="flight-preview-legend"><span>Dashed: current</span><span>Solid: preview{modified ? " · edited" : ""}</span></p>
        <p>Drag C1 / C2 to bend this segment. Stops stay fixed. Arrow = tangent.</p>
        {segment && <p>{segment.frame === "scene" ? "Scene coordinates · simplified transition timing."
          : segment.frame === "viewport" ? "OA viewport coordinates · scroll offset removed."
          : "Document coordinates · shared homepage route."}
          <br />{segment.resting ? "Perch · front-facing pose" : "Tangent " + ((heading % 360 + 360) % 360).toFixed(1) + "°"}</p>}
        <div className="flight-preview-actions">
          <button disabled={!modified} onClick={() => setOffsets(current => ({ ...current, [segment!.id]: emptyKnots() }))}>Reset segment</button>
          <button onClick={exportEdits} disabled={!Object.values(offsets).some(k => k.some(p => Math.hypot(p.x, p.y) > 0))}>Export changes</button>
        </div>
        <small>Preview only. No changes are applied to the live flight.</small>
        {status && <p role="status">{status}</p>}
      </>}
    </aside>
  </>, document.body);
}
