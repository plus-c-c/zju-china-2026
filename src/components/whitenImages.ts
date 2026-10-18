/**
 * Client-side white/grey background removal for hosted images.
 *
 * The files on static.igem.wiki stay untouched: the image is fetched
 * unchanged (the CDN sends `access-control-allow-origin: *`, so the canvas
 * stays readable), drawn onto a canvas, and near-white pixels are turned
 * transparent. TransparentImage.tsx uses `keyOutWhite` for the React
 * component; `observeAndWhitenImages` applies the same pass to plain images
 * inside raw HTML (`dangerouslySetInnerHTML`) content.
 */

/** Shared near-white → transparent pass over an RGBA pixel buffer. */
export function keyOutWhite(
  data: Uint8ClampedArray,
  whiteThreshold: number,
  opaqueThreshold: number,
): void {
  const span = Math.max(1, whiteThreshold - opaqueThreshold);
  for (let i = 0; i < data.length; i += 4) {
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    if (min >= whiteThreshold) {
      data[i + 3] = 0;
    } else if (min > opaqueThreshold) {
      const alpha = ((whiteThreshold - min) * 255) / span;
      if (alpha < data[i + 3]) data[i + 3] = alpha;
    }
  }
}

/**
 * Applies the white-background removal to plain images inside raw HTML.
 * Mark an image with `data-whiten` (optionally `data-whiten-white` /
 * `data-whiten-opaque` to tune the thresholds, e.g. for a light-grey sheet)
 * and call this once after the content mounts; the hosted file stays
 * untouched and the processed PNG is painted back onto the same element.
 *
 * Processed results are cached per source URL, so remounts (page switches,
 * the portalled jump button) show the keyed-out artwork immediately instead
 * of flashing the original sheet again.
 */
const processedCache = new Map<string, string>();

export function whitenMarkedImages(root: HTMLElement | null): void {
  if (!root) return;
  const images = root.querySelectorAll<HTMLImageElement>("img[data-whiten]");
  images.forEach((img) => {
    if (img.dataset.whitenState === "done") return;
    const originalSrc = img.dataset.whitenSrc ?? img.src;
    const cached = processedCache.get(originalSrc);
    if (cached) {
      img.dataset.whitenSrc = originalSrc;
      img.src = cached;
      img.dataset.whitenState = "done";
      return;
    }
    img.dataset.whitenState = "pending";
    const whiteThreshold = Number(img.dataset.whitenWhite ?? 250);
    const opaqueThreshold = Number(img.dataset.whitenOpaque ?? 240);

    /** Runs the keying pass on a decoded bitmap. Returns false when the
        canvas is tainted (a cached copy served without CORS headers). */
    const keyOut = (bitmap: CanvasImageSource, width: number, height: number) => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return false;
      ctx.drawImage(bitmap, 0, 0);
      try {
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        keyOutWhite(frame.data, whiteThreshold, opaqueThreshold);
        ctx.putImageData(frame, 0, 0);
        const processed = canvas.toDataURL("image/png");
        processedCache.set(originalSrc, processed);
        img.dataset.whitenSrc = originalSrc;
        img.src = processed;
        img.dataset.whitenState = "done";
        return true;
      } catch {
        return false;
      }
    };

    /* A cached non-CORS copy taints the canvas even though the element asks
       for CORS, and a plain retry would hit the same cache entry. Re-fetch
       through fetch() instead: the blob URL is same-origin, so the pass can
       always run and the original sheet never flashes. */
    const retryViaFetch = () => {
      void fetch(originalSrc, { mode: "cors", credentials: "omit" })
        .then((response) =>
          response.ok ? response.blob() : Promise.reject(new Error("fetch")),
        )
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const retry = new Image();
          retry.decoding = "async";
          retry.onload = () => {
            keyOut(retry, retry.naturalWidth, retry.naturalHeight);
            URL.revokeObjectURL(url);
          };
          retry.onerror = () => {
            URL.revokeObjectURL(url);
            img.dataset.whitenState = "failed";
          };
          retry.src = url;
        })
        .catch(() => {
          img.dataset.whitenState = "failed";
        });
    };

    const source = new Image();
    source.crossOrigin = "anonymous";
    source.decoding = "async";
    source.onload = () => {
      if (!keyOut(source, source.naturalWidth, source.naturalHeight))
        retryViaFetch();
    };
    source.onerror = retryViaFetch;
    source.src = originalSrc;
  });
}

/**
 * Keeps marked images whitened while their host content can be rebuilt during
 * the page's loading hand-over (React re-applies `dangerouslySetInnerHTML`,
 * which recreates the elements and drops any processing state). Runs once
 * immediately and then re-runs shortly after any subtree/attribute change in
 * the root; images that are already processed are skipped.
 */
export function observeAndWhitenImages(root: HTMLElement | null): () => void {
  if (!root) return () => {};
  let timer = 0;
  const run = () => {
    timer = 0;
    whitenMarkedImages(root);
  };
  const schedule = () => {
    if (timer) return;
    timer = window.setTimeout(run, 120);
  };
  run();
  if (typeof MutationObserver === "undefined") return () => {};
  const observer = new MutationObserver(schedule);
  observer.observe(root, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src"],
  });
  return () => {
    window.clearTimeout(timer);
    observer.disconnect();
  };
}
