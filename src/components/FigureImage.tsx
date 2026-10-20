import type { ComponentProps } from "react";
import { TransparentImage } from "./TransparentImage";
import "./figureImage.css";

type FigureImageProps = ComponentProps<typeof TransparentImage> & {
  maxWidth?: number;
};

/** An intact, proportionate article image with access to the original. */
export function FigureImage({
  maxWidth = 800,
  style,
  ...image
}: FigureImageProps) {
  return (
    <a
      className="article-image-link"
      href={image.src}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open full-size image: ${image.alt}`}
      title="Open full-size image"
      style={{ width: style?.width ?? "100%", maxWidth }}
    >
      <span className="article-image-viewport">
        <TransparentImage
          {...image}
          style={{
            ...style,
            width: "100%",
            margin: 0,
          }}
        />
      </span>
    </a>
  );
}
