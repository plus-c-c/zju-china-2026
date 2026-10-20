const excludedContent =
  "a, code, pre, sub, math, script, style, button, .katex, .MathJax, .references-section, .references-list";

/** Index the actual endnotes, preserving IDs used by hand-written citations. */
function referenceTargets(article: HTMLElement) {
  const targets = new Map<number, HTMLElement>();
  const ambiguous = new Set<number>();
  article
    .querySelectorAll<HTMLElement>(".references-list:not(.figure-sources-list)")
    .forEach((list, listIndex) => {
      const entries = list.matches("ol")
        ? Array.from(list.children).filter((entry) => entry.matches("li"))
        : Array.from(list.querySelectorAll("p")).filter(
            (entry) => !entry.closest("li"),
          );
      let ordinal = Number(list.getAttribute("start") ?? 1);
      for (const entry of entries) {
        const explicit = /^\s*(?:\[(\d+)\]|(\d+)\.)\s+/.exec(
          entry.textContent ?? "",
        );
        const number = list.matches("ol")
          ? Number(entry.getAttribute("value") ?? ordinal)
          : Number(explicit?.[1] ?? explicit?.[2]);
        ordinal = number + 1;
        if (!Number.isInteger(number) || number < 1) continue;
        const target = entry as HTMLElement;
        if (!target.id)
          target.id = `citation-reference-${listIndex + 1}-${number}`;
        target.classList.add("reference-entry");
        if (targets.has(number)) ambiguous.add(number);
        else targets.set(number, target);
      }
    });
  // Never guess when separate bibliographies reuse the same number.
  ambiguous.forEach((number) => targets.delete(number));
  return targets;
}

/** Link confirmed prose citations only; equations, code and endnotes stay intact. */
export function linkArticleCitations(article: HTMLElement) {
  const targets = referenceTargets(article);
  if (!targets.size) return;
  const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (
      node.parentElement?.closest(
        "p, li, figcaption, td, th, .article-citation",
      ) &&
      !node.parentElement.closest(excludedContent)
    )
      nodes.push(node);
  }
  for (const node of nodes) {
    const fragment = document.createDocumentFragment();
    let end = 0;
    for (const match of node.data.matchAll(
      /\[\d+(?:\s*(?:,|[-–—])\s*\d+)*\]/g,
    )) {
      const numbers = [...match[0].matchAll(/\d+/g)].map((part) =>
        Number(part[0]),
      );
      if (!numbers.every((number) => targets.has(number))) continue;
      // A range is a citation only if its intermediate entries also exist.
      if (
        [...match[0].matchAll(/(\d+)\s*[-–—]\s*(\d+)/g)].some(
          (range) =>
            Number(range[2]) < Number(range[1]) ||
            Number(range[2]) - Number(range[1]) > targets.size ||
            Array.from(
              { length: Number(range[2]) - Number(range[1]) + 1 },
              (_, index) => Number(range[1]) + index,
            ).some((number) => !targets.has(number)),
        )
      )
        continue;
      fragment.append(node.data.slice(end, match.index));
      const citation = document.createElement(
        node.parentElement?.closest("sup") ? "span" : "sup",
      );
      if (citation.tagName === "SUP") citation.className = "article-citation";
      let numberEnd = 0;
      for (const part of match[0].matchAll(/\d+/g)) {
        citation.append(match[0].slice(numberEnd, part.index));
        const link = document.createElement("a");
        link.href = `#${targets.get(Number(part[0]))!.id}`;
        link.textContent = part[0];
        link.setAttribute("aria-label", `Go to reference ${part[0]}`);
        citation.append(link);
        numberEnd = part.index! + part[0].length;
      }
      citation.append(match[0].slice(numberEnd));
      fragment.append(citation);
      end = match.index! + match[0].length;
    }
    if (end) {
      fragment.append(node.data.slice(end));
      node.replaceWith(fragment);
    }
  }
}
