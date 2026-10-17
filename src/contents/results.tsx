import { useEffect, useRef, useState } from "react";
import { MitochondrialResults } from "./results/MitochondrialResults";
import scaffold from "./results/scaffold-content.json";
import "./results/results.css";

const functionModules = [
  { id: "anisotropy", label: "Magnetically responsive anisotropy" },
  { id: "gag", label: "GAG retention" },
  { id: "delivery", label: "Delivery" },
];

export function Results() {
  const [activeModule, setActiveModule] = useState<
    "platform" | "function" | null
  >(null);
  const platformOpen = activeModule === "platform";
  const functionOpen = activeModule === "function";
  const [openFunctions, setOpenFunctions] = useState<string[]>([]);
  const scrollTarget = useRef<string | null>(null);
  const lastTrigger = useRef("wetlab-platform-button");

  useEffect(() => {
    const id = scrollTarget.current;
    if (!id) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(id);
      target?.scrollIntoView({ block: "start", behavior: "instant" });
      if (id === "wetlab-modules")
        document
          .getElementById(lastTrigger.current)
          ?.focus({ preventScroll: true });
      scrollTarget.current = null;
    });
    return () => cancelAnimationFrame(frame);
  }, [platformOpen, functionOpen]);

  useEffect(() => {
    let frame = 0;
    function openSection(hash: string) {
      if (hash === "#wetlab-platform" || hash.startsWith("#wetlab-scaffold-"))
        setActiveModule("platform");
      else if (hash === "#wetlab-function") setActiveModule("function");
      else if (hash.startsWith("#wetlab-delivery-")) {
        setActiveModule("function");
        setOpenFunctions((current) =>
          current.includes("delivery") ? current : [...current, "delivery"],
        );
      } else return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView();
      });
    }
    function onHashChange() {
      openSection(window.location.hash);
    }
    function onNavigationClick(event: MouseEvent) {
      if (
        event.button ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (anchor) openSection(anchor.getAttribute("href") || "");
    }
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onNavigationClick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onNavigationClick);
    };
  }, []);

  function toggleFunction(id: string) {
    setOpenFunctions((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  }

  return (
    <article className="wetlab-results">
      <p className="wetlab-results__eyebrow">Wet Lab Work Summary</p>
      <section className="wetlab-results__introduction">
        <h2 id="wetlab-introduction">Introduction</h2>
        <p>{scaffold.intro}</p>
      </section>
      <div id="wetlab-modules" className="wetlab-results__modules">
        <nav
          className="wetlab-results__navigation"
          aria-label="Wet lab modules"
        >
          {(["platform", "function"] as const).map((module) => (
            <button
              key={module}
              id={`wetlab-${module}-button`}
              type="button"
              aria-expanded={activeModule === module}
              aria-controls={`wetlab-${module}-content`}
              onClick={() => {
                lastTrigger.current = `wetlab-${module}-button`;
                scrollTarget.current = "wetlab-modules";
                setActiveModule((current) =>
                  current === module ? null : module,
                );
              }}
            >
              {module === "platform" ? "Platform" : "Function"}
              <span className="wetlab-results__chevron" aria-hidden="true" />
            </button>
          ))}
        </nav>
        <section
          className="wetlab-results__module"
          aria-labelledby="wetlab-platform"
        >
          <h2
            id="wetlab-platform"
            data-toc-collapsed={!platformOpen || undefined}
            className={platformOpen ? undefined : "visually-hidden"}
          >
            Platform
          </h2>
          <div id="wetlab-platform-content" hidden={!platformOpen}>
            {platformOpen && (
              <div
                className="wetlab-results__original"
                // Generated from the manuscript with HTML escaping; wording is preserved.
                dangerouslySetInnerHTML={{ __html: scaffold.platformHtml }}
              />
            )}
          </div>
        </section>
        <section
          className="wetlab-results__module"
          aria-labelledby="wetlab-function"
        >
          <h2
            id="wetlab-function"
            data-toc-collapsed={!functionOpen || undefined}
            className={functionOpen ? undefined : "visually-hidden"}
          >
            Function
          </h2>
          <div id="wetlab-function-content" hidden={!functionOpen}>
            <div className="wetlab-results__function-buttons">
              {functionModules.map((module) => (
                <button
                  key={module.id}
                  id={`wetlab-${module.id}-button`}
                  type="button"
                  aria-expanded={openFunctions.includes(module.id)}
                  aria-controls={`wetlab-${module.id}-content`}
                  onClick={() => toggleFunction(module.id)}
                >
                  {module.label}
                  <span aria-hidden="true">
                    {openFunctions.includes(module.id) ? "−" : "+"}
                  </span>
                </button>
              ))}
            </div>
            {functionModules.map((module) => (
              <section
                className="wetlab-results__function-module"
                id={`wetlab-${module.id}-content`}
                aria-labelledby={`wetlab-${module.id}-button`}
                key={module.id}
                hidden={!openFunctions.includes(module.id)}
              >
                {module.id === "delivery" ? (
                  <MitochondrialResults />
                ) : (
                  <p className="wetlab-results__pending">
                    Content for this module is being prepared.
                  </p>
                )}
              </section>
            ))}
          </div>
        </section>
      </div>
      <details className="wetlab-results__references">
        <summary>References</summary>
        <div dangerouslySetInnerHTML={{ __html: scaffold.referencesHtml }} />
      </details>
      <section className="wetlab-results__conclusion">
        <h2 id="wetlab-conclusion">Conclusion</h2>
        <p>{scaffold.conclusion}</p>
      </section>
    </article>
  );
}
