import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { BirdLanding } from "./BirdCursor";
import {
  formatArticleCitations,
  formatReferenceHtml,
} from "./referenceFormatting";

export function References({
  children,
  level = 2,
  title = "References",
  id = "references",
  showBird = true,
}: {
  children: ReactNode;
  level?: 2 | 3;
  title?: string;
  id?: string;
  showBird?: boolean;
}) {
  const panel = useRef<HTMLDetailsElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [logos, setLogos] = useState(1);
  const Heading = level === 3 ? "h3" : "h2";

  useLayoutEffect(() => {
    let frame = 0;
    const alignTarget = (target: HTMLElement) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          if (target.isConnected)
            target.scrollIntoView({ block: "start", behavior: "instant" });
        });
      });
    };
    const expandTarget = (hash: string) => {
      let id: string;
      try {
        id = decodeURIComponent(hash.slice(1));
      } catch {
        return;
      }
      const target = document.getElementById(id);
      if (target && panel.current?.contains(target)) {
        panel.current.open = true;
        alignTarget(target);
      }
    };
    const onHash = () => expandTarget(location.hash);
    const onLink = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href);
      if (url.origin === location.origin && url.pathname === location.pathname)
        expandTarget(url.hash);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onLink, true);
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.height > 0)
        setLogos(
          Math.max(1, 1 + Math.floor((entry.contentRect.height - 390) / 560)),
        );
    });
    if (content.current) observer.observe(content.current);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onLink, true);
    };
  }, []);

  return (
    <section className="references-section">
      {showBird && <BirdLanding className="references-bird" whenPassed />}
      <details className="references-panel" ref={panel}>
        <summary className="references-summary">
          <Heading id={id} className="references-heading" data-toc-track="true">
            {title}
          </Heading>
          <span className="references-chevron" aria-hidden="true" />
        </summary>
        <div className="references-content" ref={content}>
          <div className="references-watermarks" aria-hidden="true">
            {Array.from({ length: logos }, (_, index) => (
              <img
                key={index}
                src="https://static.igem.wiki/teams/6102/wiki/team-logo.avif"
                alt=""
                style={{
                  top:
                    index === 0 ? "min(50%, 280px)" : `${280 + index * 560}px`,
                }}
              />
            ))}
          </div>
          <div className="references-text">{children}</div>
        </div>
      </details>
    </section>
  );
}

/** Keep the exported wet-lab HTML while rendering its bibliography in React. */
export function ReferenceArticleHtml({ html }: { html: string }) {
  const match =
    /<details class="wetlab-results__references references-list"><summary>References<\/summary>([\s\S]*?)<\/details>/.exec(
      html,
    );
  if (!match) return <div dangerouslySetInnerHTML={{ __html: html }} />;
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: formatArticleCitations(html.slice(0, match.index), match[1]),
        }}
      />
      <References>
        <div
          className="references-list"
          dangerouslySetInnerHTML={{
            __html: formatReferenceHtml(match[1]),
          }}
        />
      </References>
      {html.slice(match.index + match[0].length).trim() && (
        <div
          dangerouslySetInnerHTML={{
            __html: formatArticleCitations(
              html.slice(match.index + match[0].length),
              match[1],
            ),
          }}
        />
      )}
    </>
  );
}
