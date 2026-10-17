import { useEffect, useRef, useState, type ReactNode } from "react";
import { Header } from "./Header";
import "./toc.css";

type Heading = { id: string; text: string; level: number };

export function Toc({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLElement>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const content = contentRef.current;
    const header = headerRef.current;
    const footer = document.querySelector("footer.footer");
    if (!content || !header) return;

    let elements: HTMLElement[] = [];
    let frame = 0;
    let collectFrame = 0;
    const isExpanded = (element: HTMLElement) =>
      !element.closest("[hidden], details:not([open])") &&
      element.dataset.tocCollapsed !== "true" &&
      !element.classList.contains("visually-hidden");

    const collectHeadings = () => {
      collectFrame = 0;
      elements = Array.from(
        content.querySelectorAll<HTMLElement>(
          'h2, h3, h4, h5[data-toc="include"]',
        ),
      ).filter(
        (element) =>
          element.dataset.toc !== "exclude" &&
          !element.closest("[hidden], details:not([open])"),
      );
      const usedIds = new Set(
        Array.from(document.querySelectorAll("[id]"), (node) => node.id),
      );
      elements.forEach((element, index) => {
        if (element.id) return;
        const slug =
          (element.textContent || "section")
            .trim()
            .toLowerCase()
            .replace(/[^\p{L}\p{N}]+/gu, "-")
            .replace(/^-|-$/g, "") || "section";
        let id = slug;
        let suffix = index + 1;
        while (usedIds.has(id)) id = `${slug}-${suffix++}`;
        element.id = id;
        usedIds.add(id);
      });
      const next = elements.map((element) => ({
        id: element.id,
        text: element.textContent || "",
        level:
          element.tagName === "H2" ? 1 : Number(element.dataset.tocDepth) || 2,
      }));
      setHeadings((previous) =>
        previous.length === next.length &&
        previous.every(
          (heading, index) =>
            heading.id === next[index].id &&
            heading.text === next[index].text &&
            heading.level === next[index].level,
        )
          ? previous
          : next,
      );
      scheduleUpdate();
    };

    const update = () => {
      frame = 0;
      const footerRect = footer?.getBoundingClientRect();
      const footerVisible =
        !!footerRect &&
        footerRect.top < window.innerHeight &&
        footerRect.bottom > 0;
      setVisible(header.getBoundingClientRect().bottom <= 0 && !footerVisible);
      const viewportCenter = window.innerHeight / 2;
      const expandedElements = elements.filter(isExpanded);
      let current = expandedElements[0]?.id || "";
      for (const element of expandedElements) {
        if (element.getBoundingClientRect().top <= viewportCenter)
          current = element.id;
        else break;
      }
      setActiveId(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    collectHeadings();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(content);
    observer.observe(header);
    if (footer) observer.observe(footer);

    const mutations = new MutationObserver(() => {
      if (!collectFrame)
        collectFrame = window.requestAnimationFrame(collectHeadings);
    });
    mutations.observe(content, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["hidden", "open", "class", "data-toc-collapsed"],
    });

    // Support opening a direct link to a section after its generated ID exists.
    if (window.location.hash) {
      let id = window.location.hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        /* Ignore malformed URL escapes. */
      }
      elements.find((element) => element.id === id)?.scrollIntoView();
    }
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      observer.disconnect();
      mutations.disconnect();
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(collectFrame);
    };
  }, []);

  useEffect(() => {
    const nav = tocRef.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current="location"]');
    const list = nav?.querySelector<HTMLElement>(".page-toc-list");
    if (!active || !list || !visible) return;
    const itemRect = active.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();
    if (itemRect.top < listRect.top)
      list.scrollTop -= listRect.top - itemRect.top;
    else if (itemRect.bottom > listRect.bottom)
      list.scrollTop += itemRect.bottom - listRect.bottom;
  }, [activeId, visible]);

  const activeHeadingIndex = headings.findIndex(
    (heading) => heading.id === activeId,
  );
  const activeTopLevelId =
    activeHeadingIndex >= 0
      ? headings
          .slice(0, activeHeadingIndex + 1)
          .reverse()
          .find((heading) => heading.level === 1)?.id || ""
      : "";
  const visibleHeadings = headings.filter((heading, index) => {
    if (heading.level === 1) return true;
    const parentId = headings
      .slice(0, index)
      .reverse()
      .find((candidate) => candidate.level === 1)?.id;
    return parentId === activeTopLevelId;
  });

  return (
    <>
      <div ref={headerRef}>
        <Header title={title} />
      </div>
      <div
        className={`page-layout ${headings.length > 0 ? "page-layout-with-toc" : ""}`}
      >
        {headings.length > 0 && (
          <nav
            ref={tocRef}
            aria-label="On this page"
            className={`page-toc ${visible ? "page-toc-visible" : ""}`}
          >
            <h2 className="page-toc-title">On this page</h2>
            <ul id="page-toc-list" className="page-toc-list">
              {visibleHeadings.map((heading) => (
                <li
                  key={heading.id}
                  className={`page-toc-level-${heading.level}${
                    heading.level === 1 && heading.id === activeTopLevelId
                      ? " page-toc-section-current"
                      : ""
                  }`}
                >
                  <a
                    href={`#${heading.id}`}
                    aria-current={
                      activeId === heading.id ? "location" : undefined
                    }
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <div ref={contentRef} className="container page-article">
          {children}
        </div>
      </div>
    </>
  );
}
