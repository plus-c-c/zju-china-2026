import { useEffect, useRef, useState, type CSSProperties } from "react";
import { keyOutWhite } from "./whitenImages";

/**
 * General white-background removal for static images.
 *
 * Figures exported from design tools usually sit on a pure-white sheet. The
 * files on static.igem.wiki stay untouched: the image is fetched unchanged
 * (the CDN sends `access-control-allow-origin: *`, so the canvas stays
 * readable), drawn onto a canvas, and near-white pixels are turned
 * transparent before the result is painted. The shared pixel pass and the
 * raw-HTML variant live in `whitenImages.ts`.
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
  /** Fraction (0–1) of the source height cut from the top before
   *  processing — removes baked-in titles and their gradient bands. */
  cropTop?: number;
  /** Mark the image as decorative: no role/label is exposed to assistive
   *  technology (the adjacent text already names it). */
  ariaHidden?: boolean;
  /** Pixels whose smallest channel reaches this value become transparent. */
  whiteThreshold?: number;
  /** Pixels at or below this value stay fully opaque (a ramp in between). */
  opaqueThreshold?: number;
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
  cropTop = 0,
  ariaHidden = false,
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
        const sourceY = Math.round(image.naturalHeight * cropTop);
        canvas.width = image.naturalWidth;
        canvas.height = Math.max(1, image.naturalHeight - sourceY);
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) {
          setFailed(true);
          return;
        }
        ctx.drawImage(
          image,
          0,
          sourceY,
          canvas.width,
          canvas.height,
          0,
          0,
          canvas.width,
          canvas.height,
        );
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
    cropTop,
    whiteThreshold,
    opaqueThreshold,
  ]);

  if (failed) {
    return (
      <img
        src={src}
        alt={ariaHidden ? "" : alt}
        aria-hidden={ariaHidden || undefined}
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
      role={ariaHidden ? "presentation" : "img"}
      aria-hidden={ariaHidden || undefined}
      aria-label={ariaHidden ? undefined : alt}
      className={className}
      width={width}
      height={height}
      style={
        ready
          ? style
          : {
              ...style,
              ...(width && height
                ? { aspectRatio: `${width} / ${height}` }
                : null),
              visibility: "hidden",
            }
      }
    />
  );
}
