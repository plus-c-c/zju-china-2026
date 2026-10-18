import { MathFormula } from "../../../components/MathFormula";
import type { DbtlModule } from "../dbtl";
import type { Group } from "../group";

/** Dry Lab group: protein hydrogel modeling (moved over from the Model
 *  page by the modeling team). */
const hydrogelModelingModule: DbtlModule = {
  title: "DBTL Cycles for Protein Hydrogel Modeling",
  intro: (
    <p>
      {
        "Through six iterations of the Design–Build–Test–Learn cycle, this study established an approach for comparing protein crosslinked networks with wet-lab results."
      }
    </p>
  ),
  cycles: [
    {
      title: "DBTL Cycle 1: Construction of the Initial Crosslinked System",
      content: {
        Design: (
          <p>
            {
              " Construct a crosslinked system with a protein concentration close to the experimental concentration."
            }
          </p>
        ),
        Build: (
          <p>
            {
              " Coarse-grain the proteins, assemble a solvated system containing 32 chains, adjust the concentration to approximately 100 mg/mL, and form an initial network through guided site approach, sequential crosslinking, and short relaxation runs."
            }
          </p>
        ),
        Test: (
          <p>
            {
              " Examine crosslink distances, intrachain deformation, and connectivity, revealing disconnected chain clusters."
            }
          </p>
        ),
        Learn: (
          <p>
            {
              " Include connectivity among all chains as a network-construction objective in the next cycle."
            }
          </p>
        ),
      },
    },
    {
      title: "DBTL Cycle 2: Optimization of the Percolating Network",
      content: {
        Design: (
          <p>
            {
              " Establish a network connecting all 32 chains and exhibiting periodic wrapping along the Z direction."
            }
          </p>
        ),
        Build: (
          <p>
            {
              " Prioritize connections between distinct chain clusters and guide candidate sites into proximity when necessary, ultimately retaining 34 and 39 permanent crosslinks in 2KY5 and 2KY10, respectively."
            }
          </p>
        ),
        Test: (
          <p>
            {
              " Verify network connectivity, periodic wrapping, and crosslink geometry."
            }
          </p>
        ),
        Learn: (
          <p>
            {
              " The network topology meets the construction requirements, but its mechanical response still requires assessment through molecular dynamics sampling."
            }
          </p>
        ),
      },
    },
    {
      title:
        "DBTL Cycle 3: Molecular Dynamics Sampling and Stability Assessment",
      content: {
        Design: (
          <p>
            {
              " Evaluate the simulation conditions and the stability of the mechanical response following network relaxation."
            }
          </p>
        ),
        Build: (
          <p>
            {
              " Fix the crosslink topology, perform sampling in three branches—A, B, and C—and progressively extend each branch to 4 ns."
            }
          </p>
        ),
        Test: (
          <p>
            {
              " Temperature, concentration, and crosslink distances remain within normal ranges, but the calculated stiffness still exhibits temporal drift and differences between branches."
            }
          </p>
        ),
        Learn: (
          <p>
            {
              " Distinguish simulation stability from mechanical convergence. Stop further extensions after completing the finite sampling runs and proceed to structural and numerical sensitivity analyses."
            }
          </p>
        ),
      },
    },
    {
      title: "DBTL Cycle 4: Static Modeling and Numerical Verification",
      content: {
        Design: (
          <p>
            {
              " Obtain reproducible mechanical responses for fixed configurations."
            }
          </p>
        ),
        Build: (
          <p>
            {
              " Retain the existing networks, the 0.6 nm contact threshold, the 24-point cap, and the total interface weight. Correct the dependence of contact selection on input-list order and perform calculations using coordinates from binary checkpoint files."
            }
          </p>
        ),
        Test: (
          <p>
            {
              " Examine contact distributions, soft modes, and sensitivity to coordinate precision. Stability improves markedly after an equally weighted comparison of the six fixed endpoint configurations."
            }
          </p>
        ),
        Learn: (
          <p>
            {
              " Preserve structural differences and adopt a shared empirical mapping for subsequent calibration."
            }
          </p>
        ),
      },
    },
    {
      title: "DBTL Cycle 5: Shared Empirical Calibration",
      content: {
        Design: (
          <p>
            {
              " Match the experimental mean values of both systems without changing the networks or the rules of the static model."
            }
          </p>
        ),
        Build: (
          <p>
            {" Apply the shared relationship "}
            <MathFormula>{"E_{\\mathrm{emp}}=aE_0+"}</MathFormula>
            {
              ", determining the parameters from the equally weighted means of the three branches for each system."
            }
          </p>
        ),
        Test: (
          <p>
            {" Obtain "}
            <MathFormula>{"a\\approx1.8953"}</MathFormula>
            {" and "}
            <MathFormula>{"b\\approx19.7936\\ \\mathrm{kPa}"}</MathFormula>
            {
              ", matching the mean values to 30.4 and 40.0 kPa, respectively, while retaining the original results and the deviations of individual branches."
            }
          </p>
        ),
        Learn: (
          <p>
            {
              " Establish the final approach: “MD-derived structures—compression response—shared empirical calibration.” Because the current calibration uses only the experimental mean values of 2KY5 and 2KY10, a new system excluded from fitting is still needed to assess predictive performance."
            }
          </p>
        ),
      },
    },
    {
      title: "DBTL Cycle 6: Independent Predictive Validation Using 2KY16",
      content: {
        Design: (
          <p>
            {
              " Use 2KY16 as a new system excluded from parameter fitting to assess the transferability of the existing model."
            }
          </p>
        ),
        Build: (
          <p>
            {
              " Subsequently construct the 2KY16 structure and crosslinked network, apply the same calculation rules, and freeze the existing shared calibration parameters to obtain predictions."
            }
          </p>
        ),
        Test: (
          <p>
            {
              " Obtain wet-state experimental data for 2KY16 under the same conditions, compare the predicted and experimental values, and evaluate the relative error and differences between branches."
            }
          </p>
        ),
        Learn: (
          <p>
            {
              " Agreement between predictions and experiments would support the applicability of the model to a new system."
            }
          </p>
        ),
      },
    },
  ],
};
export const proteinHydrogelModelingGroup: Group = {
  label: "Model",
  parts: [{ label: "DBTL cycles", module: hydrogelModelingModule }],
};
