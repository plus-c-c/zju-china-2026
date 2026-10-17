import { useMemo } from "react";
import katex from "katex";
import "./MathFormula.css";

/**
 * Renders a LaTeX formula with KaTeX.
 *
 * Use `display` for standalone equations placed between paragraphs and the
 * default inline form for formulas embedded in running text.
 */
export function MathFormula({
  children,
  display = false,
}: {
  children: string;
  display?: boolean;
}) {
  const html = useMemo(
    () =>
      katex.renderToString(children, {
        displayMode: display,
        throwOnError: false,
        strict: false,
        trust: false,
        output: "html",
      }),
    [children, display],
  );
  return (
    <span
      className={display ? "math-formula math-formula-display" : "math-formula"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
