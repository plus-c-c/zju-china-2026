import { MathFormula } from "../../../components/MathFormula";
import type { DbtlModule } from "../dbtl";
import type { Group } from "../group";

const hydrogelModelingModule: DbtlModule = {
  title: "DBTL Cycles for Protein Hydrogel Modeling",
  intro: (
    <>
      <p>
        {
          "Our engineering objective was to develop a computational workflow that could compare the mechanical responses of SELP hydrogel constructs and connect these predictions to wet-lab measurements. Building a crosslinked network was only the first step: the network also needed appropriate connectivity, interpretable mechanical behavior, and a consistent relationship with experimental data."
        }
      </p>
      <p>
        {
          "We addressed these requirements through six Design–Build–Test–Learn cycles. The first two cycles established the crosslinked networks; the third exposed the difference between stable simulation conditions and converged mechanical properties; the fourth refined the static calculation; and the fifth introduced a shared empirical calibration. Finally, we used 2KY-16, which was excluded from calibration, to test the predictive agreement of the workflow."
        }
      </p>
      <p>
        <strong>
          {
            "The resulting workflow connects MD-derived structures, static compression calculations, shared empirical calibration, and independent wet-lab validation."
          }
        </strong>
      </p>
    </>
  ),
  cycles: [
    {
      title: "Cycle 1 — Construction of the Initial Crosslinked System",
      content: {
        Design: (
          <>
            <p>
              {
                "We first aimed to construct a hydrated protein network at a concentration close to the experimental condition of approximately 100 mg/mL. Because gel formation in our experiments relies on tyrosine crosslinking, we represented these permanent connections explicitly in the network. Our initial question was whether local crosslink formation could produce a suitable multichain structure without introducing excessive distortion."
              }
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              {
                "We coarse-grained the proteins using the Martini 3 framework and assembled solvated systems containing 32 chains. We adjusted the simulation-box volume and relaxed the systems to approach the target concentration. Candidate tyrosine sites were guided into proximity, followed by sequential crosslinking, energy minimization, and short relaxation runs."
              }
            </p>
            <p>{"Permanent crosslinks were represented by harmonic bonds:"}</p>
            <MathFormula display>
              {
                "U_{\\mathrm{cross}}(r)=\\frac{1}{2}k_{\\mathrm{MD}}(r-r_0)^2,\n\\qquad r_0=0.35\\ \\mathrm{nm},\n\\qquad k_{\\mathrm{MD}}=4000\\ \\mathrm{kJ}\\,\\mathrm{mol}^{-1}\\,\\mathrm{nm}^{-2}."
              }
            </MathFormula>
            <p>
              {"Here, "}
              <MathFormula>{"r"}</MathFormula>
              {
                " is the distance between the crosslinked beads. We checked the resulting geometry rather than treating the number of crosslinks alone as evidence of a satisfactory network."
              }
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              {
                "We examined crosslink distances, intrachain deformation, and the connections between chains. Although local chain clusters could be crosslinked, some clusters remained disconnected from the rest of the system. Local crosslink formation therefore did not establish connectivity across all 32 chains."
              }
            </p>
          </>
        ),
        Learn: (
          <>
            <p>
              <strong>
                {
                  "Network construction must consider global connectivity as well as local bond geometry."
                }
              </strong>
              {
                " We carried this observation into the next cycle by making connections between separate chain clusters an explicit construction objective."
              }
            </p>
          </>
        ),
      },
    },
    {
      title: "Cycle 2 — Optimization of the Percolating Network",
      content: {
        Design: (
          <>
            <p>
              {
                "We aimed to connect all 32 chains and obtain periodic wrapping along the Z direction, which was used for the subsequent compression analysis. This required a network-level strategy rather than repeatedly adding connections within already connected clusters."
              }
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              {
                "We prioritized candidate connections between distinct chain clusters. When suitable sites were not sufficiently close, we guided the candidate sites into proximity and repeated the connectivity checks after relaxation. The resulting 2KY-5 and 2KY-10 networks retained 34 and 39 permanent crosslinks, respectively."
              }
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              {
                "We verified connectivity across all chains, periodic wrapping, and crosslink geometry. These checks addressed different requirements: connectivity assessed whether chains belonged to the overall network, periodic wrapping assessed its connection across the simulation boundary, and geometric inspection assessed the resulting crosslinks."
              }
            </p>
          </>
        ),
        Learn: (
          <>
            <p>
              {
                "The networks met the construction requirements, but their topology alone did not establish a stable mechanical response. "
              }
              <strong>
                {
                  "A connected network still required dynamical sampling and mechanical assessment"
                }
              </strong>
              {", which became the focus of Cycle 3."}
            </p>
          </>
        ),
      },
    },
    {
      title: "Cycle 3 — Molecular Dynamics Sampling and Stability Assessment",
      content: {
        Design: (
          <>
            <p>
              {
                "We evaluated whether the crosslinked networks could be sampled under stable simulation conditions and whether their calculated stiffness became stable over time. We treated these as separate questions so that stable temperature or concentration would not be mistaken for convergence of the mechanical response."
              }
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              {
                "We fixed the permanent crosslink topology and sampled three branches, A, B, and C, progressively extending each to 4 ns. The simulations proceeded in 500 ps segments, and trajectory statistics were examined over the 2–4 ns interval."
              }
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              {
                "We checked temperature, concentration, crosslink distances, and checkpoint-based continuation. Mean temperatures over the final 250 ps of each stage ranged from 310.03 to 310.31 K, concentrations ranged from 100.017 to 100.066 mg/mL, and crosslink distances recorded across the logs ranged from 0.295 to 0.470 nm."
              }
            </p>
            <p>
              {
                "Despite these stable simulation conditions, the calculated stiffness still exhibited temporal drift and differences between branches. Extending the simulations did not satisfactorily resolve this behavior within the sampling performed."
              }
            </p>
          </>
        ),
        Learn: (
          <>
            <p>
              <strong>
                {
                  "Stable simulation conditions do not, by themselves, demonstrate mechanical convergence."
                }
              </strong>
              {
                " We stopped extending the finite sampling runs and instead investigated how the endpoint structures and numerical representation affected the stiffness calculation. This led to the static-model refinement in Cycle 4."
              }
            </p>
          </>
        ),
      },
    },
    {
      title: "Cycle 4 — Static Modeling and Numerical Verification",
      content: {
        Design: (
          <>
            <p>
              {
                "We sought a reproducible mechanical response for a fixed network configuration while retaining structural differences between systems and branches. The goal was to reduce dependence on numerical choices without forcing distinct structures to produce identical results."
              }
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              {
                "We built static elastic networks from the MD endpoint configurations, retaining permanent crosslinks and adding effective interchain contacts within 0.6 nm. We preserved the existing 24-point cap and total interface weight, corrected contact selection to remove input-order dependence, and used binary checkpoint coordinates. The uncalibrated modulus "
              }
              <MathFormula>{"E_0"}</MathFormula>
              {
                " was then calculated from the minimized energy response to infinitesimal axial compression, allowing chain motions and the remaining strain components to relax."
              }
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              {
                "We examined the selected contact distributions, soft motion modes, and sensitivity to coordinate precision. Comparing the six fixed endpoint configurations with equal weighting showed improved numerical stability after the refinement. We continued to retain the results of individual configurations so that branch differences remained visible."
              }
            </p>
          </>
        ),
        Learn: (
          <>
            <p>
              {
                "The refined calculation provided the basis for comparing fixed structures, but agreement with experimental modulus values still required assessment. "
              }
              <strong>
                {
                  "We preserved the network-construction and calculation rules and moved to a shared empirical calibration"
                }
              </strong>
              {
                ", rather than changing each network to match its experimental target."
              }
            </p>
          </>
        ),
      },
    },
    {
      title: "Cycle 5 — Shared Empirical Calibration",
      content: {
        Design: (
          <>
            <p>
              {
                "We aimed to connect the static calculation to the measured compressive moduli of 2KY-5 and 2KY-10 using one shared relationship. The calibration used the equally weighted mean of the three branches for each construct, while retaining the individual branch values for comparison."
              }
            </p>
          </>
        ),
        Build: (
          <>
            <p>{"We applied a common affine calibration:"}</p>
            <MathFormula display>{"E_{\\mathrm{emp}}=aE_0+b."}</MathFormula>
            <p>
              {"Here, "}
              <MathFormula>{"E_0"}</MathFormula>
              {" is the uncalibrated static modulus, "}
              <MathFormula>{"a"}</MathFormula>
              {" is a dimensionless scaling factor, and "}
              <MathFormula>{"b"}</MathFormula>
              {
                " is an additive term expressed in kPa. The same parameters were applied to both constructs; the network structures and static-model rules were unchanged during this calibration."
              }
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              {"Calibration against the two experimental mean values yielded:"}
            </p>
            <MathFormula display>
              {"a\\approx1.90,\n\\qquad\nb\\approx19.79\\ \\mathrm{kPa}."}
            </MathFormula>
            <p>
              {
                "The calibrated means matched 30.4 kPa for 2KY-5 and 40.0 kPa for 2KY-10. We retained the original static results and the calibrated values of each branch rather than reporting only the fitted construct means."
              }
            </p>
          </>
        ),
        Learn: (
          <>
            <p>
              <strong>
                {
                  "Agreement with the data used for calibration is not an independent test of predictive performance."
                }
              </strong>
              {
                " Because the parameters were determined from 2KY-5 and 2KY-10, we needed a new construct excluded from fitting. We therefore retained the shared calibration and tested 2KY-16 in Cycle 6."
              }
            </p>
          </>
        ),
      },
    },
    {
      title: "Cycle 6 — Independent Predictive Validation Using 2KY-16",
      content: {
        Design: (
          <>
            <p>
              {
                "We selected 2KY-16 as an independent validation construct to assess whether the calibrated workflow could predict a new hydrogel system. Its wet-lab result was excluded from determining the calibration parameters."
              }
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              {
                "We independently constructed the 2KY-16 structure and crosslinked network in the dry lab, applied the same calculation rules, and used the shared calibration established from 2KY-5 and 2KY-10. "
              }
              <strong>
                {
                  "We did not refit the parameters to the 2KY-16 wet-lab measurement."
                }
              </strong>
              {
                " Wet-lab experiments provided the independent comparison under the corresponding experimental conditions."
              }
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              {
                "The predicted moduli for branches A, B, and C were 52.41, 51.03, and 55.71 kPa, giving a mean of "
              }
              <strong>{"53.05 kPa"}</strong>
              {", compared with the wet-lab measurement of "}
              <strong>{"53.32 kPa"}</strong>
              {". The relative error of the predicted mean was:"}
            </p>
            <MathFormula display>
              {
                "\\mathrm{Relative\\ error}\n=\\frac{|53.05-53.32|}{53.32}\\times100\\%\n\\approx0.51\\%."
              }
            </MathFormula>
            <p>
              <strong>
                {
                  "Independent dry-lab modeling of 2KY-16 agreed with the wet-lab result, with the predicted mean differing by less than 1%."
                }
              </strong>
            </p>
          </>
        ),
        Learn: (
          <>
            <p>
              {
                "The agreement supports the predictive applicability of the calibrated workflow to 2KY-16 under the conditions examined. Because 2KY-16 was excluded from fitting, this comparison provides evidence beyond agreement with the two calibration constructs."
              }
            </p>
            <p>
              {
                "The remaining branch differences also show why the mean and individual results should be considered together. Further constructs and experimental conditions would be needed to evaluate how broadly the same calibration can be applied."
              }
            </p>
          </>
        ),
      },
    },
  ],
  outro: (
    <>
      <h3>Engineering Outcome</h3>
      <>
        <p>
          {
            "Across the six cycles, each observation led to a specific engineering decision: disconnected clusters motivated connectivity-driven construction; stiffness drift motivated static and numerical analysis; and the need to test performance beyond fitted data motivated the independent 2KY-16 comparison."
          }
        </p>
        <p>
          <strong>
            {
              "This process established a workflow in which wet-lab data calibrated the model using 2KY-5 and 2KY-10, while an independently modeled construct, 2KY-16, tested its predictive agreement without refitting."
            }
          </strong>
          {
            " The resulting comparison provides a basis for prioritizing further protein designs for experimental validation."
          }
        </p>
      </>
    </>
  ),
};
export const proteinHydrogelModelingGroup: Group = {
  label: "Model",
  parts: [{ label: "DBTL cycles", module: hydrogelModelingModule }],
};
