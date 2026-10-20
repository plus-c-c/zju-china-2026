import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  type ReactNode,
} from "react";

/** Format confirmed numeric citations in prose without touching formulae,
 *  code, existing citations/links, or a module's bibliography. */
export function CitationText({
  children,
  validReferences,
}: {
  children: ReactNode;
  validReferences: readonly number[];
}) {
  const valid = new Set(validReferences);
  const format = (node: ReactNode): ReactNode => {
    if (typeof node === "string") {
      return node.split(/(\[\d+(?:\s*,\s*\d+)*\])/g).map((part, index) => {
        if (!/^\[\d+(?:\s*,\s*\d+)*\]$/.test(part)) return part;
        const refs = part.slice(1, -1).split(",").map(Number);
        if (!refs.every((ref) => valid.has(ref))) return part;
        return (
          <sup key={index} className="article-citation">
            [
            {refs.map((ref, position) => (
              <Fragment key={position}>
                {position > 0 && ", "}
                <a
                  href={`#citation-reference-1-${ref}`}
                  aria-label={`Go to reference ${ref}`}
                >
                  {ref}
                </a>
              </Fragment>
            ))}
            ]
          </sup>
        );
      });
    }
    if (!isValidElement<{ children?: ReactNode }>(node)) return node;
    if (typeof node.type !== "string" && node.type !== Fragment) return node;
    if (
      typeof node.type === "string" &&
      ["a", "code", "pre", "sup", "sub", "math", "script", "style"].includes(
        node.type,
      )
    ) {
      return node;
    }
    return cloneElement(
      node,
      undefined,
      Children.map(node.props.children, format),
    );
  };

  return <>{Children.map(children, format)}</>;
}
