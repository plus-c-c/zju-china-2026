import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Header } from "./Header";
import {
  clearPageSwipeEntry,
  isHashScrollSuppressed,
  PAGE_SWIPE_DURATION,
  readPageSwipeEntry,
} from "./tocState";
import "./toc.css";

type Heading = { id: string; text: string; level: number };

export function Toc({
  title,
  children,
  hideToc = false,
  tocSide = "left",
}: {
  title: string;
  children: ReactNode;
  hideToc?: boolean;
  tocSide?: "left" | "right";
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLElement>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [visible, setVisible] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  // Replay the cross-page swipe when arriving from the paired page.
  useLayoutEffect(() => {
    const entry = readPageSwipeEntry();
    if (!entry) return;
    const root = document.documentElement;
    const enterClass = `page-swipe-enter-${entry}`;
    root.classList.add(enterClass);
    let inner = 0;
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() =>
        root.classList.add("page-swipe-run"),
      );
    });
    const finish = window.setTimeout(() => {
      root.classList.remove(enterClass, "page-swipe-run");
      clearPageSwipeEntry();
    }, PAGE_SWIPE_DURATION + 220);
    return () => {
      window.cancelAnimationFrame(outer);
      window.cancelAnimationFrame(inner);
      window.clearTimeout(finish);
      root.classList.remove(enterClass, "page-swipe-run");
    };
  }, []);

  useLayoutEffect(() => {
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
      /* Deck step anchors (data-toc-track) sit one step apart (40dvh) and the
         deck's scroll mapping flips at half a step; half a step as the anchor
         threshold makes the highlighted heading change exactly when the
         figure switches. Regular headings switch once they reach their
         landing line (scroll-margin + a 1px tolerance), matching the jump. */
      const anchorThreshold = window.innerHeight * 0.2;
      const lineOf = (element: HTMLElement) =>
        (Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0) + 1;
      const expandedElements = elements.filter(isExpanded);
      let current = expandedElements[0]?.id || "";
      for (const element of expandedElements) {
        const threshold =
          element.dataset.tocTrack === "true"
            ? anchorThreshold
            : lineOf(element);
        if (element.getBoundingClientRect().top <= threshold)
          current = element.id;
        else break;
      }
      setActiveId(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    collectHeadings();
    // Resolve the initial visibility right away so the TOC is part of the
    // first committed frame (keeps view-transition captures complete).
    update();
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
    let anchorKeeper = 0;
    const stopAnchorKeeper = () => {
      if (anchorKeeper) {
        window.clearInterval(anchorKeeper);
        anchorKeeper = 0;
      }
    };
    const cancelHashScroll = () => {
      hashScrollCancelled = true;
      stopAnchorKeeper();
      hashTimers.forEach((timer) => window.clearTimeout(timer));
    };

    // Re-align deep links after lazy content has settled. The Design page has
    // many images above its module headings, so a single early scroll can drift.

    // Jump navigations that restore a remembered position handle scrolling
    // themselves; the hash alignment below must stand down.
    const suppressedHashScroll = isHashScrollSuppressed();

    if (window.location.hash && !suppressedHashScroll) {
      let id = window.location.hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        /* Ignore malformed URL escapes. */
      }
      // Any element can be an anchor target (jump pairs use label ids as well),
      // so resolve by document id instead of the collected headings.
      const target = document.getElementById(id);
      // Arriving through the cross-page swipe positions instantly, so the
      // sliding page is already aligned with the target section.
      const swipeArrival = !!readPageSwipeEntry();
      const scrollToTarget = () => {
        if (!hashScrollCancelled)
          target?.scrollIntoView(
            swipeArrival ? { behavior: "instant" } : undefined,
          );
      };
      scrollToTarget();
      [750, 2000].forEach((delay) =>
        hashTimers.push(window.setTimeout(scrollToTarget, delay)),
      );
      void document.fonts?.ready.then(scrollToTarget);

      // Remote figures above the anchor are size-reserved, so this only mops
      // up the rare late reflow. The keeper re-checks its deadline (and the
      // user-cancel flag) every tick and clears itself, so a stale instance
      // can never keep fighting later wheel scrolls.
      const keeperDeadline = performance.now() + 1600;
      const keepAnchor = () => {
        if (hashScrollCancelled || performance.now() > keeperDeadline) {
          if (anchorKeeper) {
            window.clearInterval(anchorKeeper);
            anchorKeeper = 0;
          }
          return;
        }
        scrollToTarget();
      };
      anchorKeeper = window.setInterval(keepAnchor, 250);
      hashTimers.push(window.setTimeout(stopAnchorKeeper, 1700));
      window.addEventListener("wheel", cancelHashScroll, {
        once: true,
        passive: true,
      });
      window.addEventListener("touchstart", cancelHashScroll, {
        once: true,
        passive: true,
      });
      window.addEventListener("keydown", cancelHashScroll, { once: true });
      // A click (TOC entry, in-page anchor) is explicit navigation: stand down
      // before the fragment scroll runs, or the keeper would re-align to the
      // arrival target and cancel it.
      window.addEventListener("click", cancelHashScroll, { once: true });
    }
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("wheel", cancelHashScroll);
      window.removeEventListener("touchstart", cancelHashScroll);
      window.removeEventListener("keydown", cancelHashScroll);
      window.removeEventListener("click", cancelHashScroll);
      stopAnchorKeeper();
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
      <div
        className={`page-layout ${showToc ? "page-layout-with-toc" : ""}${
          tocSide === "right" ? " page-layout-toc-right" : ""
        }`}
      >
        {showToc && (
          <nav
            ref={tocRef}
            data-page-swipe-stage
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
            data-page-swipe-stage
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
        <div
          ref={contentRef}
          data-page-swipe-stage
          className="container page-article"
        >
          {children}
        </div>
      </div>
    </>
  );
}
