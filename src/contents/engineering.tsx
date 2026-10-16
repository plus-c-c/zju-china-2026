/**
 * Engineering page — composed from per-module components in `./engineering/`,
 * with a Wet Lab / Dry Lab module navigation (card style referenced from the
 * 2025 ZJU-China engineering page):
 *
 *   Wet Lab   AnisotropyModule            Anisotropy module: cartilage mechanics background,
 *                                         three DBTL phases and summary
 *             ExtraModules                Stub modules (Magnetically Responsive Anisotropy, GAG retention)
 *             MitochondrialModule         Mitochondrial therapeutic module (carrier construction,
 *                                         delivery validation, cellular evaluation)
 *             ScaffoldAndLinkers          Scaffold & linkers — hydrogel scaffold cycles 1–4
 *             LigationSystemEngineering   Ligation system cycles 1–2 and SnoopLigase2 rational design
 *   Dry Lab   EngineeringSoftware         Design–Build–Test–Learn cycles of the two software tools
 *                                         (simulation platform and NEST Software app)
 *   (both)    EngineeringReferences       References (cartilage anisotropy, nanoparticle-binding peptides)
 */
import { useState } from "react";
import { AnisotropyModule } from "./engineering/AnisotropyModule";
import { ExtraModules } from "./engineering/ExtraModules";
import { MitochondrialModule } from "./engineering/MitochondrialModule";
import { ScaffoldAndLinkers } from "./engineering/ScaffoldAndLinkers";
import { LigationSystemEngineering } from "./engineering/LigationSystemEngineering";
import { EngineeringSoftware } from "./engineering-software";
import { EngineeringReferences } from "./engineering/EngineeringReferences";
import "./engineering.css";

export function Engineering() {
  const [tab, setTab] = useState<"wet" | "dry">("wet");

  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article>
          <div className="eng-module-nav">
            <button
              type="button"
              className={`eng-module-button ${tab === "wet" ? "active" : ""}`}
              onClick={() => setTab("wet")}
            >
              Wet Lab
            </button>
            <button
              type="button"
              className={`eng-module-button ${tab === "dry" ? "active" : ""}`}
              onClick={() => setTab("dry")}
            >
              Dry Lab
            </button>
          </div>
          {tab === "wet" ? (
            <>
              <AnisotropyModule />
              <ExtraModules />
              <MitochondrialModule />
              <ScaffoldAndLinkers />
              <LigationSystemEngineering />
            </>
          ) : (
            <EngineeringSoftware />
          )}
          <EngineeringReferences />
        </article>
      </div>
    </div>
  );
}
