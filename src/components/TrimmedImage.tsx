import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import { croppedImageSource, imageTrim } from "./imageTrim";

type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

/** Same image element and styling; only reviewed empty outer pixels change. */
export function TrimmedImage(props: ImageProps) {
  return props.src && imageTrim(props.src) ? (
    <ReviewedImage key={props.src} {...props} src={props.src} />
  ) : (
    <img {...props} />
  );
}

function ReviewedImage({
  src,
  style,
  loading = "lazy",
  width,
  height,
  ...props
}: ImageProps & { src: string }) {
  const element = useRef<HTMLImageElement>(null);
  const [result, setResult] = useState<{ src: string | null } | null>(null);
  const bounds = imageTrim(src)!;
  useEffect(() => {
    let cancelled = false;
    const process = () =>
      void croppedImageSource(src).then((cropped) => {
        if (!cancelled) setResult({ src: cropped });
      });
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
      { rootMargin: "600px" },
    );
    if (element.current) observer.observe(element.current);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [src, loading]);
  return (
    <img
      {...props}
      ref={element}
      src={result?.src ?? (result ? src : undefined)}
      data-original-src={src}
      data-image-trim={result?.src ? "done" : result ? "fallback" : "pending"}
      width={result && !result.src ? width : bounds[4]}
      height={result && !result.src ? height : bounds[5]}
      loading={loading}
      style={result ? style : { ...style, visibility: "hidden" }}
    />
  );
}
