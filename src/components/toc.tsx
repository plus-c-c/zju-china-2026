import { useEffect, useRef, useState, type ReactNode } from "react";
import { Header } from "./Header";
import "./toc.css";

type Heading = { id: string; text: string; level: number };

export function Toc({
  title,
  children,
  hideToc = false,
}: {
  title: string;
  children: ReactNode;
  hideToc?: boolean;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLElement>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [visible, setVisible] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const content = contentRef.current;
    const header = headerRef.current;
    const footer = document.querySelector("footer.footer");
    if (!content || !header || hideToc) return;

    let elements: HTMLElement[] = [];
    let frame = 0;
    let collectFrame = 0;
    /* Step anchors (data-toc-track) mark each deck step; they are tracked by
       the scroll spy even though they are visually hidden. */
    const isExpanded = (element: HTMLElement) =>
      element.dataset.tocTrack === "true" ||
      (!element.closest("[hidden], details:not([open])") &&
        element.dataset.tocCollapsed !== "true" &&
        !element.classList.contains("visually-hidden"));

    const collectHeadings = () => {
      collectFrame = 0;
      elements = Array.from(
        content.querySelectorAll<HTMLElement>(
          'h2, h3, h4[data-toc="include"], h5[data-toc="include"]',
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
      setFooterInView(footerVisible);
      setVisible(header.getBoundingClientRect().bottom <= 0 && !footerVisible);
      const viewportCenter = window.innerHeight / 2;
      /* Deck step anchors sit one step apart (40dvh) and the deck's scroll
         mapping flips at half a step; using half a step as the anchor
         threshold makes the highlighted heading change exactly when the
         figure switches. */
      const anchorThreshold = window.innerHeight * 0.2;
      const expandedElements = elements.filter(isExpanded);
      let current = expandedElements[0]?.id || "";
      for (const element of expandedElements) {
        const threshold =
          element.dataset.tocTrack === "true"
            ? anchorThreshold
            : viewportCenter;
        if (element.getBoundingClientRect().top <= threshold) current = element.id;
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

    const hashTimers: number[] = [];
    let hashScrollCancelled = false;
    const cancelHashScroll = () => {
      hashScrollCancelled = true;
      hashTimers.forEach((timer) => window.clearTimeout(timer));
    };

    // Re-align deep links after lazy content has settled. The Design page has
    // many images above its module headings, so a single early scroll can drift.

    if (window.location.hash) {
      let id = window.location.hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        /* Ignore malformed URL escapes. */
      }
      const target = elements.find((element) => element.id === id);
      const scrollToTarget = () => {
        if (!hashScrollCancelled) target?.scrollIntoView();
      };
      scrollToTarget();
      [750, 2000].forEach((delay) =>
        hashTimers.push(window.setTimeout(scrollToTarget, delay)),
      );
      void document.fonts?.ready.then(scrollToTarget);
      window.addEventListener("wheel", cancelHashScroll, {
        once: true,
        passive: true,
      });
      window.addEventListener("touchstart", cancelHashScroll, {
        once: true,
        passive: true,
      });
      window.addEventListener("keydown", cancelHashScroll, { once: true });
    }
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("wheel", cancelHashScroll);
      window.removeEventListener("touchstart", cancelHashScroll);
      window.removeEventListener("keydown", cancelHashScroll);
      hashTimers.forEach((timer) => window.clearTimeout(timer));
      observer.disconnect();
      mutations.disconnect();
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(collectFrame);
    };
  }, [hideToc]);

  useEffect(() => {
    const nav = tocRef.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current="location"]');
    const list = nav?.querySelector<HTMLElement>(".page-toc-list");
    if (!active || !list || (!visible && !mobileOpen)) return;
    const itemRect = active.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();
    if (itemRect.top < listRect.top)
      list.scrollTop -= listRect.top - itemRect.top;
    else if (itemRect.bottom > listRect.bottom)
      list.scrollTop += itemRect.bottom - listRect.bottom;
  }, [activeId, visible, mobileOpen]);

  // 页脚出现时收起移动端目录，避免悬浮按钮/面板遮挡页脚
  useEffect(() => {
    if (footerInView) setMobileOpen(false);
  }, [footerInView]);

  // 移动端目录面板：点击外部或按 Esc 关闭
  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnOutside = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest(".page-toc, .page-toc-toggle")) setMobileOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileOpen]);

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

  const showToc = !hideToc && headings.length > 0;

  return (
    <>
      <div ref={headerRef}>
        <Header title={title} />
      </div>
      <div className={`page-layout ${showToc ? "page-layout-with-toc" : ""}`}>
        {showToc && (
          <nav
            ref={tocRef}
            aria-label="On this page"
            className={`page-toc ${visible ? "page-toc-visible" : ""}${mobileOpen ? " page-toc-open" : ""}`}
          >
            <h2 className="page-toc-title">{title || "On this page"}</h2>
            <ul
              id="page-toc-list"
              className="page-toc-list"
              onClick={() => setMobileOpen(false)}
            >
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
        {showToc && (
          <button
            type="button"
            className={`page-toc-toggle${
              footerInView ? "" : " page-toc-toggle-visible"
            }${mobileOpen ? " page-toc-toggle-open" : ""}`}
            aria-expanded={mobileOpen}
            aria-controls="page-toc-list"
            aria-label="Table of contents"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="page-toc-toggle-bar" aria-hidden="true" />
            <span className="page-toc-toggle-bar" aria-hidden="true" />
            <span className="page-toc-toggle-bar" aria-hidden="true" />
          </button>
        )}
        <div ref={contentRef} className="container page-article">
          {children}
        </div>
      </div>
    </>
  );
}
