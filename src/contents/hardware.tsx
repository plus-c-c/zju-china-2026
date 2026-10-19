import "./hardware.css";
/**
 * Hardware page — composed from per-module components in `./hardware/`:
 *
 *   BackgroundAndPrinciples  Background and core design principles
 *   FormulationUnit          Preparation unit (architecture, dispensing, mixing, electronics)
 *   AdministrationUnit       Administration unit (injection assembly, arthroscopy, magnetic band)
 *   WorkflowAndOutlook       Complete workflow and future outlook
 */
import { BackgroundAndPrinciples } from "./hardware/BackgroundAndPrinciples";
import { FormulationUnit } from "./hardware/FormulationUnit";
import { AdministrationUnit } from "./hardware/AdministrationUnit";
import { WorkflowAndOutlook } from "./hardware/WorkflowAndOutlook";

export function Hardware() {
  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article className="hardware-article">
          <BackgroundAndPrinciples />
          <FormulationUnit />
          <AdministrationUnit />
          <WorkflowAndOutlook />
        </article>
      </div>
    </div>
  );
}
