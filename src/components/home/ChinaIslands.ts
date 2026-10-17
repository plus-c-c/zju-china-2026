type ChinaIslandFeature = {
  latitude: number;
  longitude: number;
  name: string;
  radius?: number;
};

// Representative islands, cays, banks, and reefs across China's four South
// China Sea archipelagos. Coordinates are WGS84 decimal degrees and are
// projected into the Natural Earth view used by world-map-new.svg.
const chinaIslandFeatures: ChinaIslandFeature[] = [
  // Dongsha Islands
  { name: "Pratas Island", latitude: 20.7, longitude: 116.73, radius: 1 },
  { name: "Pratas Reef", latitude: 20.667, longitude: 116.833 },
  { name: "North Vereker Bank", latitude: 21.02, longitude: 116.45 },
  { name: "South Vereker Bank", latitude: 20.57, longitude: 116.25 },

  // Xisha Islands
  { name: "Triton Island", latitude: 15.783, longitude: 111.2 },
  { name: "Money Island", latitude: 16.45, longitude: 111.5 },
  { name: "Robert Island", latitude: 16.533, longitude: 111.583 },
  { name: "Pattle Island", latitude: 16.533, longitude: 111.6 },
  { name: "Discovery Reef", latitude: 16.25, longitude: 111.7 },
  { name: "Observation Bank", latitude: 16.583, longitude: 111.7 },
  { name: "Duncan Islands", latitude: 16.45, longitude: 111.717 },
  { name: "Drummond Island", latitude: 16.467, longitude: 111.733 },
  { name: "Passu Keah", latitude: 16.05, longitude: 111.75 },
  { name: "Vuladdore Reef", latitude: 16.3, longitude: 112 },
  { name: "Woody Island", latitude: 16.833, longitude: 112.333, radius: 1 },
  { name: "Rocky Island", latitude: 16.85, longitude: 112.35 },
  { name: "Bombay Reef", latitude: 16, longitude: 112.5 },
  { name: "Lincoln Island", latitude: 16.667, longitude: 112.733 },

  // Zhongsha Islands
  {
    name: "Macclesfield Bank",
    latitude: 15.833,
    longitude: 114.033,
    radius: 1,
  },
  { name: "Truro Shoal", latitude: 16.333, longitude: 116.25 },
  { name: "Scarborough Shoal", latitude: 15.15, longitude: 117.75, radius: 1 },

  // Nansha Islands
  { name: "James Shoal", latitude: 3.967, longitude: 112.35, radius: 1 },
  { name: "Luconia Shoals", latitude: 5.6, longitude: 112.6 },
  { name: "Louisa Reef", latitude: 6.333, longitude: 113.233 },
  { name: "Royal Charlotte Reef", latitude: 6.95, longitude: 113.583 },
  { name: "Vanguard Bank", latitude: 7.5, longitude: 109.75 },
  { name: "Ladd Reef", latitude: 8.667, longitude: 111.667 },
  { name: "Spratly Island", latitude: 8.644, longitude: 111.92, radius: 0.95 },
  { name: "West London Reef", latitude: 8.867, longitude: 112.25 },
  { name: "Cuarteron Reef", latitude: 8.867, longitude: 112.833 },
  { name: "Amboyna Cay", latitude: 7.9, longitude: 112.92 },
  { name: "Fiery Cross Reef", latitude: 9.617, longitude: 112.967, radius: 1 },
  { name: "Barque Canada Reef", latitude: 8.167, longitude: 113.3 },
  { name: "Pearson Reef", latitude: 8.967, longitude: 113.683 },
  { name: "Swallow Reef", latitude: 7.383, longitude: 113.833 },
  { name: "Discovery Great Reef", latitude: 10, longitude: 113.85 },
  { name: "Subi Reef", latitude: 10.917, longitude: 114.067, radius: 1 },
  { name: "Gaven Reef", latitude: 10.2, longitude: 114.217 },
  { name: "Thitu Island", latitude: 11.05, longitude: 114.283, radius: 0.95 },
  { name: "Southwest Cay", latitude: 11.433, longitude: 114.333 },
  { name: "Northeast Cay", latitude: 11.45, longitude: 114.35 },
  { name: "Itu Aba Island", latitude: 10.375, longitude: 114.367, radius: 1 },
  { name: "Namyit Island", latitude: 10.183, longitude: 114.367 },
  { name: "Sin Cowe Island", latitude: 9.883, longitude: 114.333 },
  { name: "West York Island", latitude: 11.083, longitude: 115 },
  { name: "Investigator Shoal", latitude: 8.1, longitude: 114.65 },
  { name: "Commodore Reef", latitude: 8.367, longitude: 115.217 },
  { name: "Mischief Reef", latitude: 9.917, longitude: 115.533, radius: 1 },
  { name: "Nanshan Island", latitude: 10.733, longitude: 115.817 },
  { name: "Flat Island", latitude: 10.817, longitude: 115.817 },
  { name: "Second Thomas Shoal", latitude: 9.783, longitude: 115.867 },
];

const projectionScale = 162.5;
const projectionTranslateX = 450;
const projectionTranslateY = 247.3;

function projectNaturalEarth(longitude: number, latitude: number) {
  const lambda = (longitude * Math.PI) / 180;
  const phi = (latitude * Math.PI) / 180;
  const phi2 = phi * phi;
  const phi4 = phi2 * phi2;
  const rawX =
    lambda *
    (0.8707 -
      0.131979 * phi2 +
      phi4 * (-0.013791 + phi4 * (0.003971 * phi2 - 0.001529 * phi4)));
  const rawY =
    phi *
    (1.007226 +
      phi2 *
        (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4)));

  return [
    projectionTranslateX + projectionScale * rawX,
    projectionTranslateY - projectionScale * rawY,
  ] as const;
}

function circlePath(x: number, y: number, radius: number) {
  const left = (x - radius).toFixed(2);
  const diameter = (radius * 2).toFixed(2);
  const centerY = y.toFixed(2);

  return `M${left},${centerY}a${radius},${radius} 0 1,0 ${diameter},0a${radius},${radius} 0 1,0 -${diameter},0`;
}

export const CHINA_ISLANDS_PATH = chinaIslandFeatures
  .map((feature) => {
    const [x, y] = projectNaturalEarth(feature.longitude, feature.latitude);
    return circlePath(x, y, feature.radius ?? 0.72);
  })
  .join("");
