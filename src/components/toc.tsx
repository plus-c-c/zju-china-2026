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
  /** Render without the "On this page" sidebar (content gets the full width). */
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
    const collect = () => {
      elements = Array.from(content.querySelectorAll<HTMLElement>("h2, h3"));
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
      setHeadings(
        elements.map((element) => ({
          id: element.id,
          text: element.textContent || "",
          level: element.tagName === "H2" ? 1 : 2,
        })),
      );
    };
    collect();

    let frame = 0;
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
      let current = elements[0]?.id || "";
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= viewportCenter)
          current = element.id;
        else break;
      }
      setActiveId(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(content);
    observer.observe(header);
    if (footer) observer.observe(footer);

    // Rebuild the heading list when the page content changes in place
    // (for example, when switching between module tabs on a page).
    const contentObserver = new MutationObserver(() => {
      collect();
      scheduleUpdate();
    });
    contentObserver.observe(content, { childList: true, subtree: true });

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
      contentObserver.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [hideToc]);

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
            className={`page-toc ${visible ? "page-toc-visible" : ""}${
              mobileOpen ? " page-toc-open" : ""
            }`}
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
