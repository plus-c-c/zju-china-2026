import trims from "./imageTrimData.json";

/** Original width/height, then the reviewed left/top/width/height crop. */
export type ImageTrim = readonly [
  number,
  number,
  number,
  number,
  number,
  number,
];
type TrimEntry = { bounds: ImageTrim; afterTop?: Record<string, ImageTrim> };
const reviewed = trims as unknown as Record<string, TrimEntry>;

export function imageTrim(src: string, cropTop = 0): ImageTrim | undefined {
  const path = src.split("?")[0].replace(/^https?:\/\/[^/]+/, "");
  const entry = reviewed[path];
  return entry?.afterTop?.[String(cropTop)] ?? entry?.bounds;
}

/** Ignore stale measurements if a hosted asset was replaced in place. */
export function imageSourceRect(
  src: string,
  width: number,
  height: number,
  cropTop = 0,
) {
  const bounds = imageTrim(src, cropTop);
  const minimumY = Math.round(height * cropTop);
  if (!bounds || bounds[0] !== width || bounds[1] !== height)
    return { x: 0, y: minimumY, width, height: height - minimumY };
  const [, , x, top, contentWidth, contentHeight] = bounds;
  const y = Math.max(minimumY, top);
  return { x, y, width: contentWidth, height: top + contentHeight - y };
}

const croppedSources = new Map<string, Promise<string | null>>();

/** Crop the original static-host bitmap once; leave the hosted file intact. */
export function croppedImageSource(src: string): Promise<string | null> {
  const cached = croppedSources.get(src);
  if (cached) return cached;
  const request = new Promise<string | null>((resolve) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.decoding = "async";
    image.onload = () => {
      const bounds = imageTrim(src);
      if (
        !bounds ||
        bounds[0] !== image.naturalWidth ||
        bounds[1] !== image.naturalHeight
      )
        return resolve(null);
      const rect = imageSourceRect(
        src,
        image.naturalWidth,
        image.naturalHeight,
      );
      const canvas = document.createElement("canvas");
      canvas.width = rect.width;
      canvas.height = rect.height;
      const context = canvas.getContext("2d");
      if (!context) return resolve(null);
      context.drawImage(
        image,
        rect.x,
        rect.y,
        rect.width,
        rect.height,
        0,
        0,
        rect.width,
        rect.height,
      );
      try {
        canvas.toBlob((blob) =>
          resolve(blob ? URL.createObjectURL(blob) : null),
        );
      } catch {
        resolve(null);
      }
    };
    image.onerror = () => resolve(null);
    image.src = src;
  });
  croppedSources.set(src, request);
  return request;
}
