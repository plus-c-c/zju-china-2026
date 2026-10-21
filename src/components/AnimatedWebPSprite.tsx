import { useEffect, useRef, useState } from "react";

export function AnimatedWebPSprite({
  sprite,
  fallback,
  frames,
  columns,
  rows,
  width,
  height,
  alt,
  className,
  frameMs = 100,
}: {
  sprite: string;
  fallback: string;
  frames: number;
  columns: number;
  rows: number;
  width: number;
  height: number;
  alt: string;
  className?: string;
  frameMs?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (failed) return;
    const image = new Image();
    let timer: number | undefined;
    let frame = 0;

    const draw = () => {
      const context = canvasRef.current?.getContext("2d");
      if (!context) return;
      const column = frame % columns;
      const row = Math.floor(frame / columns);
      context.clearRect(0, 0, width, height);
      context.drawImage(
        image,
        column * width,
        row * height,
        width,
        height,
        0,
        0,
        width,
        height,
      );
      frame = (frame + 1) % frames;
    };

    image.onload = () => {
      draw();
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        timer = window.setInterval(draw, frameMs);
      }
    };
    image.onerror = () => setFailed(true);
    image.src = sprite;

    return () => {
      if (timer) window.clearInterval(timer);
      image.onload = null;
      image.onerror = null;
    };
  }, [sprite, frames, columns, rows, width, height, frameMs, failed]);

  if (failed) {
    return (
      <img
        src={fallback}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        style={{ width: "100%", maxWidth: 520 }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      role="img"
      aria-label={alt}
      className={className}
    />
  );
}

