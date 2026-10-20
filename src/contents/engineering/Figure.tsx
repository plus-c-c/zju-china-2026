import { FigureCaption } from "../../components/FigureCaption";
import { useLayoutEffect, useRef, type ReactNode } from "react";

const STATIC_BASE = "https://static.igem.wiki/teams/6102/wiki/images";

interface DbtlFigureProps {
  src: string | string[];
  caption?: ReactNode;
  alt?: string;
}

/** Use the card's actual reading height, including the complete caption.
 *  Wide figures fill the reading column; tall ones use all remaining height. */
export function PanelFigure({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const figureRef = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const figure = figureRef.current;
    const body = figure?.closest<HTMLElement>(".dbtl-panel-body");
    if (!figure || !body) return;
    const fit = () => {
      const style = getComputedStyle(body);
      const figureStyle = getComputedStyle(figure);
      const caption = figure.querySelector("figcaption");
      const captionHeight = caption
        ? caption.offsetHeight + parseFloat(getComputedStyle(caption).marginTop)
        : 0;
      const available =
        body.clientHeight -
        parseFloat(style.paddingTop) -
        parseFloat(style.paddingBottom) -
        parseFloat(figureStyle.marginTop) -
        parseFloat(figureStyle.marginBottom) -
        captionHeight;
      figure.style.setProperty(
        "--figure-fit-height",
        `${Math.max(1, Math.floor(available))}px`,
      );
    };
    const observer = new ResizeObserver(fit);
    observer.observe(body);
    const caption = figure.querySelector("figcaption");
    if (caption) observer.observe(caption);
    figure.addEventListener("load", fit, true);
    fit();
    return () => {
      observer.disconnect();
      figure.removeEventListener("load", fit, true);
    };
  }, []);
  return (
    <figure className={className} ref={figureRef}>
      {children}
    </figure>
  );
}

export function DbtlFigure({ src, caption, alt }: DbtlFigureProps) {
  const sources = Array.isArray(src) ? src : [src];
  const label = alt ?? (typeof caption === "string" ? caption : "Figure");
  return (
    <PanelFigure className="dbtl-figure">
      <div
        className={`dbtl-figure-imgs${sources.length > 1 ? " dbtl-figure-imgs--row" : ""}`}
      >
        {sources.map((source) => (
          <img
            key={source}
            loading="lazy"
            src={`${STATIC_BASE}/${source}`}
            alt={label}
          />
        ))}
      </div>
      {caption && <FigureCaption>{caption}</FigureCaption>}
    </PanelFigure>
  );
}
