/** Shared perch geometry for the homepage guide bird. */

export const OA_BIRD_STOP = { beat: 21, x: 800, y: 670, size: 0.4 };

// Feet positions in the shared 1280 × 720 illustration space.
export const stops = [
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
  { beat: 14, x: 640, y: 493, size: 1.5 },
  { beat: 18, x: 640, y: 493, size: 1.5 },
  { beat: 19, x: 210, y: 402, size: 0.4 },
  { beat: 20, x: 210, y: 402, size: 0.4 },
  OA_BIRD_STOP,
  { ...OA_BIRD_STOP, beat: 22 },
];
/** Resolve perches from the illustration they belong to, including its content scale. */
export type BirdStop = (typeof stops)[number];

export function perch(stop: BirdStop) {
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
    14: [".home-layer-57", 0.5, 0.29],
    18: [".home-layer-57", 0.5, 0.29],
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
