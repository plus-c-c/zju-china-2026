type Point = { x: number; y: number };
type TangentPoint = Point & { dx: number; dy: number };
type FlightPoint = TangentPoint & { distance: number };

export type PipelineFlightRoute = {
  speed: number;
  start: number;
  end: number;
  exit: number;
  stops: number[];
  sample: (scroll: number) => Point & { dx: number; dy: number };
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
  // Leave OA in one direct downward-left arc, ending on the first guide dot.
  const entryHeight = first.y - origin.y;
  append(bezier(origin,
    { x: origin.x + (first.x - origin.x) * 0.26, y: origin.y + entryHeight * 0.4 },
    { x: first.x, y: first.y - entryHeight * 0.2 }, first));
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
  const edge = { x: canvas.left + canvas.width * 0.9, y: third.top + scroll + third.height * 0.98 };
  const exitHeight = edge.y - last.y;
  const exitStart = distance;
  append(bezier(last,
    { x: last.x, y: last.y + exitHeight * 0.6 },
    { x: edge.x, y: edge.y - exitHeight * 0.4 }, edge));
  const thirdStop = exitStart + (distance - exitStart) * 0.72;
  const closingHeight = landing.y - edge.y;
  append(bezier(edge,
    { x: edge.x, y: edge.y + closingHeight * 0.22 },
    { x: landing.x, y: landing.y - closingHeight * 0.3 }, landing));

  const speed = distance / (end - start);
  const route: PipelineFlightRoute = {
    speed, start, end, exit: start + exitStart / speed,
    stops: [firstStop, secondStop, thirdStop].map(stop => start + stop / speed),
    sample: (scrollTop) => {
      const traveled = clamp((scrollTop - start) / (end - start)) * distance;
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
        dx: dx / tangent, dy: dy / tangent,
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
  return 1 - proximity * 0.35;
}
