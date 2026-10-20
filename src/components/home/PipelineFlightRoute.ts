type Point = { x: number; y: number };
type TangentPoint = Point & { dx: number; dy: number };
type FlightPoint = TangentPoint & { distance: number };

export type PipelineFlightRoute = {
  speed: number;
  start: number;
  end: number;
  exit: number;
  edge: number;
  stops: number[];
  sample: (scroll: number) => Point & { dx: number; dy: number; speed: number };
};

const routes = new WeakMap<Element, { key: string; route: PipelineFlightRoute }>();
const clamp = (value: number) => Math.max(0, Math.min(1, value));

function bezier(a: Point, b: Point, c: Point, d: Point, segments = 120): TangentPoint[] {
  return Array.from({ length: segments + 1 }, (_, index) => {
    const t = index / segments, s = 1 - t;
    return {
      x: s**3*a.x + 3*s*s*t*b.x + 3*s*t*t*c.x + t**3*d.x,
      y: s**3*a.y + 3*s*s*t*b.y + 3*s*t*t*c.y + t**3*d.y,
      dx: 3*s*s*(b.x - a.x) + 6*s*t*(c.x - b.x) + 3*t*t*(d.x - c.x),
      dy: 3*s*s*(b.y - a.y) + 6*s*t*(c.y - b.y) + 3*t*t*(d.y - c.y),
    };
  });
}

/** One distance-based route, including the existing, unmodified SVG curves. */
export function getPipelineFlightRoute(
  root: Element,
  origin: Point,
  landing: Point,
  start: number,
  canvas: DOMRect,
  centerOffset: number,
): PipelineFlightRoute | null {
  const paths = [...root.querySelectorAll<SVGPathElement>(".selp-pipeline__connector path")];
  const third = root.querySelector(".selp-pipeline__stage--mitochondrial")?.getBoundingClientRect();
  if (paths.length !== 2 || !third) return null;
  const scroll = window.scrollY;
  const scale = canvas.width / 1280;
  const end = Math.max(start + 1, Math.min(
    document.documentElement.scrollHeight - innerHeight - 40 * scale,
    landing.y - innerHeight * 0.36,
  ));
  const bounds = paths.map(path => path.closest("svg")!.getBoundingClientRect());
  const key = [origin.x, origin.y, landing.x, landing.y, start, end,
    canvas.left, canvas.width, centerOffset, third.top + scroll, third.height,
    ...bounds.flatMap(rect => [rect.left, rect.top + scroll, rect.width, rect.height]),
  ].map(value => Math.round(value * 4)).join(",");
  const cached = routes.get(root);
  if (cached?.key === key) return cached.route;

  const curves = paths.map(path => {
    const matrix = path.getScreenCTM();
    if (!matrix) return [];
    const length = path.getTotalLength();
    return Array.from({ length: 101 }, (_, index) => {
      const distance = length * index / 100;
      const point = path.getPointAtLength(distance);
      const before = path.getPointAtLength(Math.max(0, distance - 0.5));
      const after = path.getPointAtLength(Math.min(length, distance + 0.5));
      return {
        x: matrix.a * point.x + matrix.c * point.y + matrix.e,
        y: matrix.b * point.x + matrix.d * point.y + matrix.f + scroll + centerOffset,
        dx: matrix.a * (after.x - before.x) + matrix.c * (after.y - before.y),
        dy: matrix.b * (after.x - before.x) + matrix.d * (after.y - before.y),
      };
    });
  });
  if (curves.some(curve => !curve.length)) return null;

  const points: FlightPoint[] = [];
  let distance = 0;
  const append = (section: TangentPoint[]) => {
    for (const point of section) {
      const previous = points[points.length - 1];
      const step = previous ? Math.hypot(point.x - previous.x, point.y - previous.y) : 0;
      if (previous && step < 0.001) continue;
      distance += step;
      const tangent = Math.hypot(point.dx, point.dy);
      points.push({ ...point, distance, dx: point.dx / tangent, dy: point.dy / tangent });
    }
  };
  const first = curves[0][0];
  append(curves[0]);

  const firstEnd = curves[0][curves[0].length - 1];
  const second = curves[1][0];
  const gap = second.y - firstEnd.y;
  append(bezier(firstEnd,
    { x: firstEnd.x, y: firstEnd.y + gap * 0.35 },
    { x: second.x, y: second.y - gap * 0.35 }, second));
  const secondStop = distance;
  append(curves[1]);

  const last = curves[1][curves[1].length - 1];
  const edge = { x: canvas.left + canvas.width * 0.9, y: third.top + scroll + third.height * 1.22 };
  const exitHeight = edge.y - last.y;
  const exitStart = distance;
  append(bezier(last,
    { x: last.x, y: last.y + exitHeight * 0.6 },
    { x: edge.x, y: edge.y - exitHeight * 0.4 }, edge));
  const thirdStop = exitStart + (distance - exitStart) * 0.72;
  const edgeDistance = distance;
  const closingHeight = landing.y - edge.y;
  append(bezier(edge,
    { x: edge.x, y: edge.y + closingHeight * 0.22 },
    { x: landing.x, y: landing.y - closingHeight * 0.3 }, landing));

  const entryEnd = Math.min(end - 1, Math.max(start + 1, first.y - innerHeight * 0.94));
  // Keep moving through the first dot. A near-1:1 document/scroll speed
  // cancels most of the bird's visible motion on this nearly vertical part.
  const turnDistance = Math.min(150 * scale, distance * 0.08);
  const turnPace = Math.min(0.5, (end - entryEnd) / distance);
  const followingPace = (end - entryEnd - turnPace * turnDistance / 2) / (distance - turnDistance / 2);
  const followingScroll = (traveled: number) => {
    const t = clamp(traveled / turnDistance);
    return entryEnd + followingPace * traveled
      + (turnPace - followingPace) * turnDistance * (t - t**3 + t**4 / 2);
  };
  const followingTravel = (scrollTop: number) => {
    let low = 0, high = distance;
    for (let i = 0; i < 24; i++) {
      const middle = (low + high) / 2;
      if (followingScroll(middle) < scrollTop) low = middle;
      else high = middle;
    }
    const traveled = (low + high) / 2;
    const t = clamp(traveled / turnDistance);
    return { distance: traveled, speed: 1 / (followingPace + (turnPace - followingPace) * (1 - 3 * t * t + 2 * t**3)) };
  };
  // Design the entire takeoff in the viewport, where it is actually seen.
  // Its long final handle spreads the turn over real travel distance; page
  // movement can no longer squeeze a large rotation into the last pixel.
  const entryOrigin = { x: origin.x, y: origin.y - start };
  const entryTarget = { x: first.x, y: first.y - entryEnd };
  const drop = entryTarget.y - entryOrigin.y;
  const turnRadius = Math.min(innerHeight * 0.14, drop * 0.45);
  let entryLength = 0;
  const entry: FlightPoint[] = bezier(entryOrigin,
    { x: entryOrigin.x + (first.x - entryOrigin.x) * 0.32,
      y: entryOrigin.y + drop * 0.6 },
    { x: first.x, y: entryTarget.y - turnRadius }, entryTarget, 600)
    .map((point, index, samples) => {
      if (index) entryLength += Math.hypot(point.x - samples[index - 1].x, point.y - samples[index - 1].y);
      const tangent = Math.hypot(point.dx, point.dy);
      return { ...point, distance: entryLength, dx: point.dx / tangent, dy: point.dy / tangent };
    });
  const entrySpan = entryEnd - start;
  // A short, smooth approach matches the speed on the drawn curve. Most
  // of the flight stays at a constant speed, with no stop at the join.
  const finalPace = 1 / Math.max(0.1, 1 / turnPace - 1);
  const approachLength = Math.min(turnRadius, entryLength * 0.16, entrySpan / finalPace);
  const initialPace = (entrySpan - finalPace * approachLength / 2) / (entryLength - approachLength / 2);
  const paceChange = finalPace - initialPace;
  const entryScroll = (traveled: number) => {
    const t = clamp((traveled - (entryLength - approachLength)) / approachLength);
    return start + traveled * initialPace + paceChange * approachLength * (t**3 - t**4 / 2);
  };
  const entryTravel = (scrollTop: number) => {
    let low = 0, high = entryLength;
    for (let i = 0; i < 24; i++) {
      const middle = (low + high) / 2;
      if (entryScroll(middle) < scrollTop) low = middle;
      else high = middle;
    }
    const traveled = (low + high) / 2;
    const t = clamp((traveled - (entryLength - approachLength)) / approachLength);
    return { distance: traveled, speed: 1 / (initialPace + paceChange * t * t * (3 - 2 * t)) };
  };
  const route: PipelineFlightRoute = {
    speed: (entryLength + distance) / (end - start), start, end,
    exit: followingScroll(exitStart), edge: followingScroll(edgeDistance),
    stops: [entryEnd, followingScroll(secondStop), followingScroll(thirdStop)],
    sample: (scrollTop) => {
      const scroll = Math.max(start, Math.min(end, scrollTop));
      const entering = scroll < entryEnd;
      const motion = entering ? entryTravel(scroll) : followingTravel(scroll);
      const samples = entering ? entry : points;
      const traveled = motion.distance;
      let low = 1, high = samples.length - 1;
      while (low < high) {
        const middle = (low + high) >> 1;
        if (samples[middle].distance < traveled) low = middle + 1;
        else high = middle;
      }
      const a = samples[low - 1], b = samples[low];
      const t = clamp((traveled - a.distance) / (b.distance - a.distance));
      const dx = a.dx + (b.dx - a.dx) * t, dy = a.dy + (b.dy - a.dy) * t;
      const tangent = Math.hypot(dx, dy);
      // The entry is designed on screen, but its returned y is in the document.
      // Differentiate that same position: d(screenY + scroll)/d(scroll) adds 1.
      // Otherwise the head follows a much flatter, unrelated screen tangent.
      const velocityX = dx / tangent * motion.speed;
      const velocityY = dy / tangent * motion.speed + (entering ? 1 : 0);
      const velocity = Math.hypot(velocityX, velocityY);
      return {
        x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t + (entering ? scroll : 0),
        dx: velocityX / velocity, dy: velocityY / velocity, speed: velocity,
      };
    },
  };
  routes.set(root, { key, route });
  return route;
}

/** Respond promptly at takeoff, then restore the usual pace before the first dot. */
export function getPipelineEntryAssist(root: Element, scroll: number) {
  const route = routes.get(root)?.route;
  if (!route) return 0;
  const span = Math.max(1, Math.min(innerHeight * 0.5, (route.stops[0] - route.start) * 0.55));
  const progress = clamp((scroll - route.start) / span);
  return 1 - progress * progress * (3 - 2 * progress);
}

/** A short reading pause, without locking the gesture or requiring another swipe. */
export function getPipelineFlightDamping(root: Element, scroll: number) {
  const route = routes.get(root)?.route;
  if (!route) return 1;
  const width = Math.max(50, Math.min(80, innerHeight * 0.075));
  const proximity = Math.max(...route.stops.map(stop => Math.exp(-(((scroll - stop) / width)**2))));
  const exitProgress = clamp((scroll - route.exit) / (route.edge - route.exit));
  const exitEase = Math.sin(Math.PI * exitProgress)**2;
  return (1 - proximity * 0.35) * (1 - exitEase * 0.1);
}
