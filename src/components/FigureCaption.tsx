import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ReactNode,
} from "react";

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return isValidElement<{ children?: ReactNode }>(node)
    ? textOf(node.props.children)
    : "";
}

/** Existing emphasis must not make the explanatory sentences bold as well. */
function withoutBold(children: ReactNode): ReactNode {
  return Children.map(children, (node) => {
    if (!isValidElement<{ children?: ReactNode }>(node)) return node;
    const content = withoutBold(node.props.children);
    if (node.type === "strong" || node.type === "b")
      return <Fragment key={node.key}>{content}</Fragment>;
    return node.props.children === undefined
      ? node
      : cloneElement(node, undefined, content);
  });
}

/** Figure numbers and common abbreviations are not sentence boundaries. */
function leadEnd(text: string, afterLabel: number): number {
  const abbreviations = new Set([
    "e.g",
    "i.e",
    "etc",
    "fig",
    "eq",
    "dr",
    "prof",
    "vs",
    "al",
    "approx",
    "ca",
  ]);
  const stops = /[.!?](?=\s|$)/g;
  stops.lastIndex = afterLabel;
  for (let match = stops.exec(text); match; match = stops.exec(text)) {
    if (match[0] === ".") {
      const word = /([A-Za-z.]+)\.$/.exec(text.slice(0, match.index + 1))?.[1];
      if (
        word &&
        (abbreviations.has(word.toLowerCase()) || /^[A-Z]$/.test(word))
      )
        continue;
    }
    return match.index + 1;
  }
  return text.length;
}

/** Split the text while preserving links, chemical scripts and inline maths. */
function splitAt(children: ReactNode, end: number): [ReactNode[], ReactNode[]] {
  const lead: ReactNode[] = [];
  const rest: ReactNode[] = [];
  let remaining = end;
  Children.toArray(children).forEach((node) => {
    const length = textOf(node).length;
    if (remaining <= 0) rest.push(node);
    else if (remaining >= length) lead.push(node);
    else if (typeof node === "string" || typeof node === "number") {
      lead.push(String(node).slice(0, remaining));
      rest.push(String(node).slice(remaining));
    } else if (isValidElement<{ children?: ReactNode }>(node)) {
      const [before, after] = splitAt(node.props.children, remaining);
      lead.push(cloneElement(node, undefined, before));
      rest.push(cloneElement(node, undefined, after));
    }
    remaining -= length;
  });
  return [lead, rest];
}

export function FigureCaptionText({ children }: { children: ReactNode }) {
  const nodes = Children.toArray(children);
  const only = nodes.length === 1 ? nodes[0] : null;
  if (
    isValidElement<{ children?: ReactNode }>(only) &&
    (only.type === "p" || only.type === "div")
  ) {
    return cloneElement(
      only,
      undefined,
      <FigureCaptionText>{only.props.children}</FigureCaptionText>,
    );
  }
  const text = textOf(children);
  const label = /^\s*(?:Figures?|Video)\s+[^|]+\|\s*/.exec(text);
  if (!label) return <>{children}</>;
  const [lead, rest] = splitAt(
    withoutBold(children),
    leadEnd(text, label[0].length),
  );
  return (
    <>
      <strong className="figure-caption__lead">{lead}</strong>
      {rest}
    </>
  );
}

/** All numbered captions share one emphasis rule, including exported HTML. */
export function FigureCaption({
  as: Tag = "figcaption",
  children,
  className = "figure-caption",
  ...props
}: HTMLAttributes<HTMLElement> & {
  as?: "figcaption" | "p";
  children: ReactNode;
}) {
  return (
    <Tag {...props} className={className}>
      <FigureCaptionText>{children}</FigureCaptionText>
    </Tag>
  );
}

/** Tables share figure-caption typography and preserve their existing wording. */
export function TableCaption({
  as: Tag = "p",
  children,
}: {
  as?: "p" | "caption";
  children: ReactNode;
}) {
  const content = withoutBold(children);
  const text = textOf(content);
  const label = /^\s*Table\s+([\d]+(?:\.[\d]+)*)\s*[.|:]?\s*/.exec(text);
  if (!label) return <Tag className="table-caption">{children}</Tag>;
  const [, body] = splitAt(content, label[0].length);
  const [lead, rest] = splitAt(
    body,
    leadEnd(text, label[0].length) - label[0].length,
  );
  return (
    <Tag className="table-caption">
      <strong className="figure-caption__lead">
        Table {label[1]} | {lead}
      </strong>
      {rest}
    </Tag>
  );
}
