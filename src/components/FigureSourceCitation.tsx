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
        aria-label={`Image source S${source}`}
        title="Image source and license"
      >
        [S{source}]
      </a>
    </sup>
  );
}
