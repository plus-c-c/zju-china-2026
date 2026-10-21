import type { ReactNode } from "react";

/** Image credits use a separate sequence from scientific references. */
export function FigureSourceCitation({
  source,
  href,
}: {
  source: number | string;
  href: string;
}) {
  return (
    <sup className="figure-source-citation">
      <a
        href={href}
        aria-label={`Figure source S${source}`}
        title="Figure source"
      >
        [S{source}]
      </a>
    </sup>
  );
}
/** Endnotes use the same compact, hanging layout as literature references. */
export function FigureSourceEntry({
  source,
  id,
  children,
}: {
  source: number | string;
  id: string;
  children: ReactNode;
}) {
  return (
    <li id={id} className="figure-source-entry">
      <span className="figure-source-entry__label">[S{source}]</span>
      <div className="figure-source-entry__body">{children}</div>
    </li>
  );
}
