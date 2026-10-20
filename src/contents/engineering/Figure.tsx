import { FigureCaption } from "../../components/FigureCaption";
import { useLayoutEffect, useRef, type ReactNode } from "react";

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
  const figureRef = useRef<HTMLElement>(null);

  /* Keep the figure inside the card: whatever height the caption needs, the
     images take the rest, so a tall figure and its caption stay visible
     together without scrolling the panel. */
  useLayoutEffect(() => {
    const figure = figureRef.current;
    const body = figure?.closest<HTMLElement>(".dbtl-panel-body");
    if (!figure || !body) return;
    const fit = () => {
      const images = Array.from(figure.querySelectorAll("img"));
      if (!images.length) return;
      images.forEach((img) => {
        img.style.maxHeight = "";
      });
      const bodyStyle = getComputedStyle(body);
      const padY =
        parseFloat(bodyStyle.paddingTop) + parseFloat(bodyStyle.paddingBottom);
      const figureStyle = getComputedStyle(figure);
      const marginY =
        parseFloat(figureStyle.marginTop) + parseFloat(figureStyle.marginBottom);
      const captionEl = figure.querySelector("figcaption");
      const captionH = captionEl
        ? captionEl.offsetHeight +
          parseFloat(getComputedStyle(captionEl).marginTop)
        : 0;
      const gaps =
        Math.max(0, images.length - 1) *
        (parseFloat(getComputedStyle(images[0]).marginBottom) || 0);
      const available =
        body.clientHeight - padY - marginY - captionH - gaps - 20;
      const per = Math.max(70, Math.floor(available));
      images.forEach((img) => {
        img.style.maxHeight = `${per}px`;
      });
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(body);
    window.addEventListener("resize", fit);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [src]);

  return (
    <figure className="dbtl-figure" ref={figureRef}>
      <div className={`dbtl-figure-imgs${sources.length > 1 ? " dbtl-figure-imgs--row" : ""}`}>
        {sources.map((source) => (
          <img
            key={source}
            loading="lazy"
            src={`${STATIC_BASE}/${source}`}
            alt={label}
            style={width ? { width } : undefined}
          />
        ))}
      </div>
      {caption && <FigureCaption>{caption}</FigureCaption>}
    </figure>
  );
}
