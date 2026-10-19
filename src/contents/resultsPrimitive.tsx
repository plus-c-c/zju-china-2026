import { References, formatReferenceHtml } from "../components/References";
import { useEffect, useRef, useState } from "react";
import { FunctionResults } from "./results/FunctionResults";
import scaffold from "./results/scaffold-content.json";
import "./results/results.css";

const functionModules = [
  {
    id: "anisotropy",
    number: "4",
    label: "Magnetically responsive anisotropy",
  },
  { id: "gag", number: "5", label: "GAG retention" },
  { id: "delivery", number: "6", label: "Delivery" },
] as const;

type FunctionModuleId = (typeof functionModules)[number]["id"];

function ResultsChevron({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`wetlab-results__chevron ${className}`.trim()}
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ResultsPrimitive() {
  const [activeModule, setActiveModule] = useState<
    "platform" | "function" | null
  >("platform");
  const platformOpen = activeModule === "platform";
  const functionOpen = activeModule === "function";
  const [activeFunction, setActiveFunction] = useState<FunctionModuleId | null>(
    null,
  );
  const scrollTarget = useRef<string | null>(null);
  const lastTrigger = useRef("wetlab-platform-button");

  useEffect(() => {
    const id = scrollTarget.current;
    if (!id) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(id);
      target?.scrollIntoView({ block: "start", behavior: "instant" });
      if (id === "wetlab-modules" || id === "wetlab-function-modules")
        document
          .getElementById(lastTrigger.current)
          ?.focus({ preventScroll: true });
      scrollTarget.current = null;
    });
    return () => cancelAnimationFrame(frame);
  }, [platformOpen, functionOpen, activeFunction]);

  useEffect(() => {
    let frame = 0;
    function openSection(hash: string) {
      if (hash === "#wetlab-platform" || hash.startsWith("#wetlab-scaffold-"))
        setActiveModule("platform");
      else if (
        hash === "#wetlab-function" ||
        hash === "#wetlab-function-modules"
      )
        setActiveModule("function");
      else {
        const module = functionModules.find((item) =>
          hash.startsWith(`#wetlab-${item.id}-`),
        );
        if (!module) return;
        setActiveModule("function");
        setActiveFunction(module.id);
      }
      scrollTarget.current = null;
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

  function toggleFunction(id: FunctionModuleId) {
    lastTrigger.current = `wetlab-${id}-button`;
    scrollTarget.current = "wetlab-function-modules";
    setActiveFunction((previous) => (previous === id ? null : id));
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
              <ResultsChevron />
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
            <div
              id="wetlab-function-modules"
              className="wetlab-results__function-buttons"
            >
              {functionModules.map((module) => (
                <button
                  key={module.id}
                  id={`wetlab-${module.id}-button`}
                  className="wetlab-results__function-entry"
                  type="button"
                  aria-label={`${module.number} ${module.label}`}
                  aria-expanded={activeFunction === module.id}
                  aria-controls={`wetlab-${module.id}-content`}
                  onClick={() => toggleFunction(module.id)}
                >
                  <span className="wetlab-results__function-number">
                    {module.number}
                  </span>
                  <span className="wetlab-results__function-title">
                    {module.label}
                  </span>
                  <ResultsChevron className="wetlab-results__function-arrow" />
                </button>
              ))}
            </div>
            {functionModules.map((module) => (
              <section
                className="wetlab-results__function-module"
                id={`wetlab-${module.id}-content`}
                aria-labelledby={`wetlab-${module.id}-button`}
                key={module.id}
                hidden={activeFunction !== module.id}
              >
                {functionOpen && activeFunction === module.id && (
                  <>
                    <FunctionResults module={module.id} />
                    <a
                      className="wetlab-results__module-return"
                      href="#wetlab-function-modules"
                    >
                      Back to Function modules
                    </a>
                  </>
                )}
              </section>
            ))}
          </div>
        </section>
      </div>
      <References>
        <div className="references-list" dangerouslySetInnerHTML={{ __html: formatReferenceHtml(scaffold.referencesHtml) }} />
      </References>
      <section className="wetlab-results__conclusion">
        <h2 id="wetlab-conclusion">Conclusion</h2>
        <p>{scaffold.conclusion}</p>
      </section>
    </article>
  );
}
