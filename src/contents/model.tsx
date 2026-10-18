import { useLayoutEffect, useRef, useState } from "react";
import { SelpHydrogelModeling } from "./model/model1";
import { SnoopLigase2Design } from "./model/model2";
import { Model3 } from "./model/model3";

// English manuscript supplied in Model.md. Scientific wording and unfinished
// result placeholders are retained; duplicate bilingual draft is excluded.

const MODEL_MODULES = [
  { key: "selp", label: "SELP Hydrogel Modeling" },
  { key: "snoop", label: "SnoopLigase2 Engineering" },
  { key: "magnetic", label: "Magnetic-Field Modeling" },
];

export function Model() {
  const [activeModule, setActiveModule] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const prevModuleRef = useRef(activeModule);

  // Switching a category jumps back to the module buttons — the new module
  // may be much shorter, so the current scroll position could otherwise end
  // up past the content that is still shown.
  useLayoutEffect(() => {
    if (prevModuleRef.current === activeModule) return;
    prevModuleRef.current = activeModule;
    const nav = navRef.current;
    if (!nav) return;
    window.scrollTo({
      top: nav.getBoundingClientRect().top + window.scrollY - 96,
      behavior: "instant",
    });
  }, [activeModule]);

  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article>
          <h2 className="mt-5 mb-3">{"Overview"}</h2>
          <p>
            {"The modeling work in this project focuses on three areas: "}
            <strong>
              {
                "predicting SELP hydrogel properties, predicting the mechanical response of hydrogels under magnetic-field guidance, and rationally engineering SnoopLigase2"
              }
            </strong>
            {
              ". It aims to support wet-lab experiments by explaining observed phenomena, screening potential approaches, and identifying directions for subsequent validation, thereby reducing the time and cost associated with trial-and-error experimentation."
            }
          </p>
          <p>
            {
              "For SELP hydrogel modeling, we combine molecular dynamics simulations, crosslinked network analysis, and compression calculations, together with empirical calibration against existing experimental data, to support the comparison and screening of different protein constructs. In the magnetic-field simulations, we analyze magnetic-field distributions and predict the mechanical properties of hydrogels under magnetic-field guidance, providing a reference for selecting magnetic-field conditions and designing experiments to modulate hydrogel properties. For the rational engineering of SnoopLigase2, we use structural modeling and mutation screening to evaluate the structural compatibility of candidate mutations and their interactions at the product interface, providing a theoretical approach to improving ligase stability and turnover."
            }
          </p>
          <p>
            {"Together, these three components form an iterative pathway of "}
            <strong>
              {
                "“experiment-driven questions—computational analysis and screening—experimental validation and feedback.” "
              }
            </strong>
            {
              "This pathway enables computational analysis to support material design, ligation-tool optimization, and magnetic-field modulation, providing more clearly defined candidate approaches and validation targets for wet-lab experiments."
            }
          </p>
          <div className="eng-module-nav model-module-nav" ref={navRef}>
            {MODEL_MODULES.map((module, index) => (
              <button
                key={module.key}
                type="button"
                className={`eng-module-button ${activeModule === index ? "active" : ""}`}
                aria-pressed={activeModule === index}
                onClick={() => setActiveModule(index)}
              >
                {module.label}
              </button>
            ))}
          </div>
          {activeModule === 0 && <SelpHydrogelModeling />}
          {activeModule === 1 && <SnoopLigase2Design />}
          {activeModule === 2 && <Model3 />}
        </article>
      </div>
    </div>
  );
}
