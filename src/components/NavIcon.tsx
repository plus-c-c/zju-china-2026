import { useEffect, useState } from "react";

/**
 * Navbar icon normalisation.
 *
 * The uploaded icon files are not cropped consistently: some fill their
 * canvas edge to edge, while others (e.g. Design, Future Plan) carry a wide
 * transparent margin, so `object-fit: contain` made those look much smaller
 * than their siblings. Each icon is therefore trimmed to its visible
 * bounding box and redrawn to fill a square canvas of its own, so every
 * icon renders at the same visual size from the single CSS size parameter
 * (`--nest-icon-size`) — no per-file rules.
 *
 * The files on static.igem.wiki stay untouched; the result is cached per
 * source, so the second placement (mobile panel / desktop panel) reuses it.
 */

const ICON_CANVAS = 128;
/** Keeps the anti-aliased edge of the trimmed artwork inside the canvas. */
const ICON_MARGIN = 2;

const processedIcons = new Map<string, string>();
const pendingIcons = new Map<string, Promise<string>>();

function trimIcon(src: string): Promise<string> {
  const cached = processedIcons.get(src);
  if (cached) return Promise.resolve(cached);
  const pending = pendingIcons.get(src);
  if (pending) return pending;
  const request = new Promise<string>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.decoding = "async";
    image.onload = () => {
      try {
        const w = image.naturalWidth;
        const h = image.naturalHeight;
        const source = document.createElement("canvas");
        source.width = w;
        source.height = h;
        const sourceCtx = source.getContext("2d", {
          willReadFrequently: true,
        });
        if (!sourceCtx) throw new Error("no 2d context");
        sourceCtx.drawImage(image, 0, 0);
        const data = sourceCtx.getImageData(0, 0, w, h).data;
        let minX = w;
        let minY = h;
        let maxX = -1;
        let maxY = -1;
        for (let y = 0; y < h; y += 1) {
          const row = y * w;
          for (let x = 0; x < w; x += 1) {
            if (data[(row + x) * 4 + 3] > 8) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }
        if (maxX < 0) throw new Error("empty icon");
        const boxW = maxX - minX + 1;
        const boxH = maxY - minY + 1;
        const scale = Math.min(
          (ICON_CANVAS - ICON_MARGIN * 2) / boxW,
          (ICON_CANVAS - ICON_MARGIN * 2) / boxH,
        );
        const drawW = boxW * scale;
        const drawH = boxH * scale;
        const canvas = document.createElement("canvas");
        canvas.width = ICON_CANVAS;
        canvas.height = ICON_CANVAS;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("no 2d context");
        ctx.drawImage(
          source,
          minX,
          minY,
          boxW,
          boxH,
          (ICON_CANVAS - drawW) / 2,
          (ICON_CANVAS - drawH) / 2,
          drawW,
          drawH,
        );
        const url = canvas.toDataURL("image/png");
        processedIcons.set(src, url);
        resolve(url);
      } catch (error) {
        reject(error);
      }
    };
    image.onerror = () => reject(new Error("icon load failed"));
    image.src = src;
  });
  pendingIcons.set(src, request);
  return request;
}

export function NavIcon({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const [processed, setProcessed] = useState<string | null>(
    () => processedIcons.get(src) ?? null,
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const cached = processedIcons.get(src);
    if (cached) {
      setProcessed(cached);
      return;
    }
    trimIcon(src).then(
      (url) => {
        if (!cancelled) setProcessed(url);
      },
      () => {
        if (!cancelled) setFailed(true);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (failed) {
    return (
      <img
        className={className}
        src={src}
        alt=""
        width={72}
        height={72}
      />
    );
  }

  return (
    <img
      className={className}
      src={processed ?? undefined}
      alt=""
      width={72}
      height={72}
      style={processed ? undefined : { visibility: "hidden" }}
    />
  );
}
