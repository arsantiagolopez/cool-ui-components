import type { COBEOptions } from "cobe";

export const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  /* X-axis starting position – 0 to 6.28 */
  phi: 0,
  /* Y-axis starting position – -1.5 to 1.57 */
  theta: 0.3,
  /* 0 to 1 */
  dark: 1,
  /* 0 to 5 */
  diffuse: 4,
  /* Dot quantity – 500 to 10,000 */
  mapSamples: 10000,
  /* Brightness of land dots – 0 to 12 */
  mapBrightness: 1.2,
  /* Brightness of ocean dots – 0 to 1 */
  mapBaseBrightness: 0,
  /* Primary color of the globe – RGB */
  baseColor: [1, 1, 1],
  /* Market color – RGB */
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  /* Bounding glow – RGB */
  glowColor: [1, 1, 1],
  /* Coordinates of places in the world */
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
  /* See through-ness – 0 to 1 */
  opacity: 0.5,
  /* Scale – 0 to 4 */
  scale: 1,
};
