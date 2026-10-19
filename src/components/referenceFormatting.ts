/** Exported bibliographies use "1." and bare URLs; match the shared endnotes. */
export function formatReferenceHtml(html: string) {
  const numbered = html.replace(/(<p[^>]*>)\s*(\d+)\.\s+/g, "$1[$2] ");
  if (numbered.includes("<a ")) return numbered;
  return numbered.replace(/(https?:\/\/[^\s<]+)/g, (match) => {
    const trailing = /[.,;)]+$/.exec(match)?.[0] ?? "";
    const url = match.slice(0, match.length - trailing.length);
    return `<a href="${url}" target="_blank" rel="noreferrer">${url}</a>${trailing}`;
  });
}

/** Format only prose citations whose numbers occur in this bibliography. */
export function formatArticleCitations(html: string, bibliography: string) {
  const validReferences = new Set(
    Array.from(
      bibliography.matchAll(/<p[^>]*>\s*(?:\[(\d+)\]|(\d+)\.)\s+/g),
      (match) => Number(match[1] ?? match[2]),
    ),
  );
  if (!validReferences.size) return html;

  const doc = new DOMParser().parseFromString(html, "text/html");
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (
      !node.parentElement?.closest(
        "a, code, pre, sup, sub, math, script, style, .katex, .MathJax",
      )
    ) {
      nodes.push(node);
    }
  }

  for (const node of nodes) {
    const text = node.data;
    const fragment = doc.createDocumentFragment();
    let end = 0;
    for (const match of text.matchAll(
      /\(\[(\d+(?:\s*,\s*\d+)*)\]\)|\[(\d+(?:\s*,\s*\d+)*)\]/g,
    )) {
      const references = (match[1] ?? match[2]).split(",").map(Number);
      if (!references.every((ref) => validReferences.has(ref))) continue;
      fragment.append(text.slice(end, match.index));
      const citation = doc.createElement("sup");
      citation.className = "article-citation";
      citation.textContent = `[${references.join(", ")}]`;
      fragment.append(citation);
      end = match.index + match[0].length;
    }
    if (end) {
      fragment.append(text.slice(end));
      node.replaceWith(fragment);
    }
  }
  return doc.body.innerHTML;
}
