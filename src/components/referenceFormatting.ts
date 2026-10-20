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

/** Compact bibliography destinations while keeping citation text and link targets. */
export function compactReferenceLinks(root: HTMLElement) {
  for (const list of root.querySelectorAll<HTMLElement>(
    ".references-list:not(.figure-sources-list)",
  )) {
    const walker = document.createTreeWalker(list, NodeFilter.SHOW_TEXT);
    const texts: Text[] = [];
    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      if (!node.parentElement?.closest("a, script, style")) texts.push(node);
    }
    for (const node of texts) {
      const fragment = document.createDocumentFragment();
      let end = 0;
      for (const match of node.data.matchAll(
        /https?:\/\/[^\s<>]+|(?:doi\s*:\s*)10\.\d{4,9}\/[^\s<>]+|PMID\s*:\s*\d+/gi,
      )) {
        const identifier = match[0].replace(/[.,;]+$/, "");
        const url = /^doi/i.test(identifier)
          ? `https://doi.org/${identifier.replace(/^doi\s*:\s*/i, "")}`
          : /^PMID/i.test(identifier)
            ? `https://pubmed.ncbi.nlm.nih.gov/${identifier.replace(/^PMID\s*:\s*/i, "")}/`
            : identifier;
        fragment.append(node.data.slice(end, match.index));
        const link = document.createElement("a");
        link.href = url;
        link.textContent = url;
        fragment.append(link);
        end = match.index! + match[0].length;
      }
      if (end) {
        fragment.append(node.data.slice(end));
        node.replaceWith(fragment);
      }
    }
    for (const link of list.querySelectorAll<HTMLAnchorElement>(
      'a[href^="http"]',
    )) {
      if (link.classList.contains("reference-source-link")) continue;
      const label = link.textContent?.trim() ?? "";
      const next = link.nextSibling;
      // Preserve linked titles within the citation; compact destination labels.
      const destination =
        /^(?:https?:|doi\b|pubmed\b|pmc\b|arxiv\b|link$|website$|source$|article$)/i.test(
          label,
        );
      const terminal =
        !next ||
        !next.textContent?.trim() ||
        /^[.\s]+$/.test(next.textContent ?? "");
      if (!destination && !terminal) continue;
      let previous = link.previousSibling;
      while (previous) {
        const tail = previous.textContent ?? "";
        if (previous.nodeType !== Node.TEXT_NODE) {
          const nested = document.createTreeWalker(
            previous,
            NodeFilter.SHOW_TEXT,
          );
          let last: Text | null = null;
          while (nested.nextNode()) last = nested.currentNode as Text;
          if (last) last.data = last.data.replace(/\.\s*$/, "");
          break;
        }
        previous.textContent = tail.replace(
          /(?:\s*(?:doi\s*:|available (?:at|from)\s*:|url\s*:))?\s*[.,;]?\s*$/i,
          "",
        );
        if (previous.textContent) break;
        previous = previous.previousSibling;
      }
      if (next?.nodeType === Node.TEXT_NODE)
        next.textContent = next.textContent?.replace(/^\s*\./, "") ?? "";
      link.before(document.createTextNode("."));
      const host = new URL(link.href).hostname;
      const source = /(^|\.)doi\.org$/.test(host)
        ? "Crossref"
        : host === "pubmed.ncbi.nlm.nih.gov"
          ? "PubMed"
          : host === "pmc.ncbi.nlm.nih.gov"
            ? "PubMed Central"
            : /(^|\.)arxiv\.org$/.test(host)
              ? "arXiv"
              : "Source";
      link.textContent = source;
      link.classList.add("reference-source-link");
      link.title = `Open reference on ${source}`;
      link.setAttribute("aria-label", `Open reference on ${source}`);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  }
}
