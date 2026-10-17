/**
 * Hardware page — composed from per-module components in `./hardware/`:
 *
 *   BackgroundAndPrinciples  Background and core design principles
 *   FormulationUnit          Formulation unit (architecture, propulsion, mixing, electronics)
 *   AdministrationUnit       Administration unit (injection assembly, arthroscopy, magnetic band)
 *   WorkflowAndOutlook       Complete workflow, future outlook, BOM, engineering draft
 */
import { BackgroundAndPrinciples } from "./hardware/BackgroundAndPrinciples";
import { FormulationUnit } from "./hardware/FormulationUnit";
import { AdministrationUnit } from "./hardware/AdministrationUnit";
import { WorkflowAndOutlook } from "./hardware/WorkflowAndOutlook";

export function Hardware() {
  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article>
          <BackgroundAndPrinciples />
          <FormulationUnit />
          <AdministrationUnit />
          <WorkflowAndOutlook />
        </article>
      </div>
    </div>
  );
}
