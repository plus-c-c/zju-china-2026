import type { ReactNode } from "react";

/** Team static host; all page figures live under `wiki/images/`. */
const STATIC_BASE = "https://static.igem.wiki/teams/6102/wiki/images";

interface DbtlFigureProps {
  /** Path on the static host, e.g. "result/01/05.avif" (or a list of paths
   *  for multi-image figures, stacked in reading order). */
  src: string | string[];
  /** Caption shown below the image(s). */
  caption?: ReactNode;
  /** Alt text; defaults to the caption when it is a plain string. */
  alt?: string;
  /** Optional display width for the image(s), e.g. "50%". */
  width?: string;
}

/** Figure inside a DBTL panel: image(s) on top, caption below. */
export function DbtlFigure({ src, caption, alt, width }: DbtlFigureProps) {
  const sources = Array.isArray(src) ? src : [src];
  const label = alt ?? (typeof caption === "string" ? caption : "Figure");
  return (
    <figure className="dbtl-figure">
      {sources.map((source) => (
        <img
          key={source}
          loading="lazy"
          src={`${STATIC_BASE}/${source}`}
          alt={label}
          style={width ? { width } : undefined}
        />
      ))}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
