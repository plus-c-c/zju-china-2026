import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

/**
 * General white-background removal for static images.
 *
 * Figures exported from design tools usually sit on a pure-white sheet. The
 * files on static.igem.wiki stay untouched: the image is fetched unchanged
 * (the CDN sends `access-control-allow-origin: *`, so the canvas stays
 * readable), drawn onto a canvas, and near-white pixels are turned
 * transparent before the result is painted.
 *
 * Drop-in usage — replace `<img …>` with `<TransparentImage …>`; all common
 * `<img>` props are supported:
 *
 * ```tsx
 * <TransparentImage
 *   src="https://static.igem.wiki/teams/6102/wiki/images/…/figure-01.avif"
 *   alt="Figure 1 | …"
 *   className="img-fluid rounded"
 *   style={{ width: "100%" }}
 * />
 * ```
 *
 * Notes
 * · Pixels whose smallest RGB channel is ≥ `whiteThreshold` become fully
 *   transparent; pixels between `opaqueThreshold` and `whiteThreshold` get a
 *   linear alpha ramp so anti-aliased edges keep a clean fringe.
 * · Processing starts only when the image approaches the viewport
 *   (`rootMargin`), so long pages do not pay for off-screen figures.
 * · If the canvas path is unavailable for any reason (blocked pixels, decode
 *   error), the plain `<img>` is rendered instead, so the figure is never
 *   lost.
 */

interface TransparentImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  width?: number;
  height?: number;
  /** Intrinsic size of the processed canvas — keeps the layout stable. */
  decoding?: "async" | "sync" | "auto";
  /** Start processing only near the viewport (default) or immediately. */
  loading?: "lazy" | "eager";
  /** Distance ahead of the viewport at which lazy processing starts. */
  rootMargin?: string;
  /** Pixels whose smallest channel reaches this value become transparent. */
  whiteThreshold?: number;
  /** Pixels at or below this value stay fully opaque (a ramp in between). */
  opaqueThreshold?: number;
}

/** Shared near-white → transparent pass over an RGBA pixel buffer. */
function keyOutWhite(
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

export function TransparentImage({
  src,
  alt,
  className,
  style,
  width,
  height,
  decoding = "async",
  loading = "lazy",
  rootMargin = "600px",
  whiteThreshold = 250,
  opaqueThreshold = 240,
}: TransparentImageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const process = () => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.decoding = decoding;
      image.onload = () => {
        if (cancelled) return;
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) {
          setFailed(true);
          return;
        }
        ctx.drawImage(image, 0, 0);
        try {
          const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
          keyOutWhite(frame.data, whiteThreshold, opaqueThreshold);
          ctx.putImageData(frame, 0, 0);
          setReady(true);
        } catch {
          /* Tainted canvas or decode failure: fall back to the plain image. */
          setFailed(true);
        }
      };
      image.onerror = () => {
        if (!cancelled) setFailed(true);
      };
      image.src = src;
    };

    if (loading === "eager" || typeof IntersectionObserver === "undefined") {
      process();
      return () => {
        cancelled = true;
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        process();
      },
      { rootMargin },
    );
    observer.observe(canvas);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [
    src,
    decoding,
    loading,
    rootMargin,
    whiteThreshold,
    opaqueThreshold,
  ]);

  if (failed) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={alt}
      className={className}
      width={width}
      height={height}
      style={
        ready
          ? style
          : {
              ...style,
              ...(width && height ? { aspectRatio: `${width} / ${height}` } : null),
              visibility: "hidden",
            }
      }
    />
  );
}
