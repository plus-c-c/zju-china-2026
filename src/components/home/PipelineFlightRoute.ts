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

function bezier(a: Point, b: Point, c: Point, d: Point): TangentPoint[] {
  return Array.from({ length: 121 }, (_, index) => {
    const t = index / 120, s = 1 - t;
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
  const firstStage = root.querySelector(".selp-pipeline__stage--magnetic")?.getBoundingClientRect();
  const firstTitle = root.querySelector<HTMLElement>(".selp-pipeline__stage--magnetic h2");
  const third = root.querySelector(".selp-pipeline__stage--mitochondrial")?.getBoundingClientRect();
  if (paths.length !== 2 || !third || !firstStage || !firstTitle) return null;
  const scroll = window.scrollY;
  const scale = canvas.width / 1280;
  const end = Math.max(start + 1, Math.min(
    document.documentElement.scrollHeight - innerHeight - 40 * scale,
    landing.y - innerHeight * 0.36,
  ));
  const bounds = paths.map(path => path.closest("svg")!.getBoundingClientRect());
  // Stable layout coordinates ignore the module's decorative reveal translate.
  // This is the perch above the first module heading, before its drawn curve.
  const arrival = {
    x: firstStage.left + firstTitle.offsetLeft + firstTitle.offsetWidth + 10 * scale,
    y: firstStage.top + scroll + firstTitle.offsetTop - 10 * scale,
  };
  const key = [origin.x, origin.y, arrival.x, arrival.y, landing.x, landing.y, start, end,
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
  // Fly directly from the OA perch to the perch above the first heading.
  // Do not detour to the OA card's right corner or aim past this perch.
  const entryX = arrival.x - origin.x, entryY = arrival.y - origin.y;
  const entryLength = Math.hypot(entryX, entryY);
  const bow = Math.min(24 * scale, entryLength * 0.02);
  const bowX = entryY / entryLength * bow, bowY = -entryX / entryLength * bow;
  append(bezier(origin,
    { x: origin.x + entryX / 3 + bowX, y: origin.y + entryY / 3 + bowY },
    { x: origin.x + entryX * 2 / 3 + bowX, y: origin.y + entryY * 2 / 3 + bowY }, arrival));
  // Continue toward the existing connector without moving any of its dots.
  const approachHeight = first.y - arrival.y;
  append(bezier(arrival,
    { x: arrival.x + entryX / entryLength * approachHeight * 0.24,
      y: arrival.y + entryY / entryLength * approachHeight * 0.24 },
    { x: first.x, y: first.y - approachHeight * 0.24 }, first));
  const firstStop = distance;
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

  const speed = distance / (end - start);
  // On tall screens the first module is farther below the OA panel. Give
  // the page enough scroll to reveal it before the bird reaches its curve.
  // Match the following route's speed at the join instead of pausing there.
  const entryEnd = Math.min(end - 1, Math.max(start + firstStop / speed,
    first.y - innerHeight * 0.82));
  const entrySpan = entryEnd - start;
  const entrySpeed = firstStop / entrySpan;
  const followingSpeed = (distance - firstStop) / (end - entryEnd);
  const initialSpeed = Math.min(entrySpeed, followingSpeed);
  const finalEntrySpeed = Math.min(followingSpeed, entrySpeed * 3);
  const travel = (scrollTop: number) => {
    if (scrollTop >= entryEnd) return {
      distance: firstStop + (scrollTop - entryEnd) * followingSpeed,
      speed: followingSpeed,
    };
    const t = clamp((scrollTop - start) / entrySpan), t2 = t * t, t3 = t2 * t;
    return {
      distance: (t3 - 2 * t2 + t) * entrySpan * initialSpeed
        + (-2 * t3 + 3 * t2) * firstStop
        + (t3 - t2) * entrySpan * finalEntrySpeed,
      speed: (3 * t2 - 4 * t + 1) * initialSpeed
        + (-6 * t2 + 6 * t) * entrySpeed
        + (3 * t2 - 2 * t) * finalEntrySpeed,
    };
  };
  const scrollAtDistance = (target: number) => {
    if (target >= firstStop) return entryEnd + (target - firstStop) / followingSpeed;
    let low = start, high = entryEnd;
    for (let i = 0; i < 24; i++) {
      const middle = (low + high) / 2;
      if (travel(middle).distance < target) low = middle;
      else high = middle;
    }
    return (low + high) / 2;
  };
  const route: PipelineFlightRoute = {
    speed, start, end, exit: scrollAtDistance(exitStart), edge: scrollAtDistance(edgeDistance),
    stops: [firstStop, secondStop, thirdStop].map(scrollAtDistance),
    sample: (scrollTop) => {
      const motion = travel(Math.max(start, Math.min(end, scrollTop)));
      const traveled = Math.max(0, Math.min(distance, motion.distance));
      let low = 1, high = points.length - 1;
      while (low < high) {
        const middle = (low + high) >> 1;
        if (points[middle].distance < traveled) low = middle + 1;
        else high = middle;
      }
      const a = points[low - 1], b = points[low];
      const t = clamp((traveled - a.distance) / (b.distance - a.distance));
      const dx = a.dx + (b.dx - a.dx) * t, dy = a.dy + (b.dy - a.dy) * t;
      const tangent = Math.hypot(dx, dy);
      return {
        x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t,
        dx: dx / tangent, dy: dy / tangent, speed: motion.speed,
      };
    },
  };
  routes.set(root, { key, route });
  return route;
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
