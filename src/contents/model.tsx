import { MathFormula } from "../components/MathFormula";
import { useLayoutEffect, useRef, useState } from "react";

// English manuscript supplied in Model.md. Scientific wording and unfinished
// result placeholders are retained; duplicate bilingual draft is excluded.

type ModelFigureProps = {
  src: string;
  alt: string;
  width?: number;
  // Bounds include every visible pixel and a small transparent margin.
  bounds?: readonly [number, number, number, number];
};

function ModelFigure({ src, alt, width = 680, bounds }: ModelFigureProps) {
  if (bounds) {
    const [left, top, right, bottom] = bounds;
    const contentWidth = right - left;
    const contentHeight = bottom - top;
    return (
      <figure className="my-4 text-center">
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            width: `min(100%, ${width}px)`,
            aspectRatio: `${contentWidth} / ${contentHeight}`,
            marginInline: "auto",
          }}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            style={{
              position: "absolute",
              display: "block",
              width: `${(3000 / contentWidth) * 100}%`,
              maxWidth: "none",
              height: "auto",
              left: `${(-left / contentWidth) * 100}%`,
              top: `${(-top / contentHeight) * 100}%`,
            }}
          />
        </div>
      </figure>
    );
  }
  return (
    <figure className="my-4 text-center">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="rounded"
        style={{
          display: "block",
          width: `min(100%, ${width}px)`,
          height: "auto",
          marginInline: "auto",
        }}
      />
    </figure>
  );
}

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
          {activeModule === 0 && (
            <>
              <h2 className="mt-5 mb-3">
                <strong>{"SELP Hydrogel Modeling"}</strong>
              </h2>
              <h3 className="mt-5 mb-3">{"Overview"}</h3>
              <p>
                {
                  "Our wet-lab work has completed the production and mechanical characterization of the 2KY5 protein. However, limitations in production conditions, experimental timelines, and cost make it difficult to produce and mechanically characterize proteins with different numbers of repeat units within the project timeframe. We therefore introduced computational modeling, using existing experimental data as a reference and combining molecular dynamics simulations with network analysis to predict the crosslinked networks and mechanical responses of different constructs. This approach provides a basis for subsequent protein design, candidate screening, and experimental validation."
                }
              </p>
              <p>
                {
                  "Starting from the protein sequence, we first performed conformational simulations of individual protein chains, followed by coarse-grained simulations. We then constructed hydrated multichain networks, used molecular dynamics (MD) to observe their structural evolution, and calculated the strain response of fixed configurations."
                }
              </p>
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/selp/1.avif"
                alt="Workflow for SELP hydrogel modeling"
                width={840}
              />
              <p>
                <em>
                  {"Figure 1 | Schematic overview of the complete workflow. "}
                </em>
              </p>
              <h3 className="mt-5 mb-3">{"Model development"}</h3>
              <h4 className="mt-5 mb-3">
                {"1 Generating Protein Conformations from Primary Sequences"}
              </h4>
              <p>
                <strong>
                  {
                    "We first required protein structures suitable for placement in a simulation box."
                  }
                </strong>
                {
                  " The initial single-chain simulations started from extended structures constructed in UCSF ChimeraX. Simulations were performed in NAMD using the CHARMM36m force field, generalized Born implicit solvent (GBIS), and TIGER2 enhanced sampling. Four replicas covered a temperature range of 280–400 K, with each replica simulated for 100 ns.[1, 2]"
                }
              </p>
              <p>
                <em>{"Video: | 2KY16 100 ns FAMD"}</em>
              </p>
              <div className="ratio ratio-16x9 my-4">
                <iframe
                  title="ZJU-China: 100ns FAMD (2026) [English]"
                  src="https://video.igem.org/videos/embed/4DDTAPWsa9bm3ZLk1KQ3yB?start=0s"
                  allow="fullscreen"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
              <p>
                {
                  "Taking 2KY5 as an example, we extracted 100 frames from the final portion of the 280 K trajectory and clustered them according to the root-mean-square deviation (RMSD) of their Cα atoms. A cutoff of 6 Å was used to select representative conformations."
                }
              </p>
              <p>
                <strong>
                  {
                    "We subsequently used martinize2 to generate Martini 3 coarse-grained models, enabling network simulations containing several protein chains, explicit solvent, and ions."
                  }
                </strong>
                {
                  "[3] Each 2KY5 and 2KY10 chain comprised 579 and 964 coarse-grained beads, respectively. By adjusting the simulation-box volume and performing subsequent relaxation, we brought the mass concentrations of both systems close to 100 mg/mL."
                }
              </p>
              <h4 className="mt-5 mb-3">
                {"2 From Single-Chain Conformations to a Complete Network"}
              </h4>
              <p>
                {
                  "Because hydrogel solidification in our experiments primarily relies on crosslinking between tyrosine residues, "
                }
                <strong>
                  {
                    "we used covalent bonds between tyrosine residues as the basis for network connectivity"
                  }
                </strong>
                {
                  ". Initially, candidate tyrosine crosslinking sites were guided into proximity based on their spatial separation and steric hindrance, and covalent connections were established, followed by energy minimization and relaxation. We then examined crosslink distances and intrachain deformation to avoid pursuing increased connectivity while overlooking the associated structural cost.[4] Covalent connections were represented using GROMACS type 6 harmonic bonds:"
                }
              </p>
              <MathFormula display>
                {
                  "U_{\\mathrm{cross}}(r) =\\frac{1}{2}k_{\\mathrm{MD}}(r-r_0)^2"
                }
              </MathFormula>
              <p>
                {"Here, "}
                <MathFormula>{"r"}</MathFormula>
                {
                  " is the distance between the crosslinked beads, the equilibrium distance is "
                }
                <MathFormula>{"r_0=0.35\\ \\mathrm{nm}"}</MathFormula>
                {", and the force constant is "}
                <MathFormula>
                  {"k_{\\mathrm{MD}}=4000\\ \\mathrm{kJ,mol^{-1},nm^{-2}}"}
                </MathFormula>
                {"."}
              </p>
              <p>
                {
                  "The guiding procedure used a flat-bottom distance potential in GROMACS to bring the selected sites closer together."
                }
              </p>
              <MathFormula display>
                {
                  "U_{\\mathrm{guide}}(r)= \\begin{cases} 0,&r\\leq r_g\\\\ \\frac12k_g(r-r_g)^2,&r>r_g \\end{cases} \\qquad r_g=0.45\\ \\mathrm{nm}"
                }
              </MathFormula>
              <p>{"."}</p>
              <p>
                {
                  "Inspection of the connectivity revealed an issue requiring improvement: local chain clusters could become connected, and the network could exhibit periodic wrapping, while some chains remained outside the overall crosslinked network. We therefore prioritized connections between different chain clusters in subsequent steps. When suitable candidate sites were unavailable, the clusters were guided closer together and the connectivity checks were repeated."
                }
              </p>
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/selp/2.avif"
                alt="Initial configurations of the two SELP systems"
                width={840}
              />
              <p>
                <em>{"Figure 2 | Initial states of the two systems."}</em>
              </p>
              <h4 className="mt-5 mb-3">
                {
                  "3 Assessing Network Stability through Molecular Dynamics Sampling"
                }
              </h4>
              <p>
                <strong>
                  {
                    "After constructing the complete crosslinked networks, we fixed the crosslink topology and performed sampling"
                  }
                </strong>
                {
                  ", progressively extending the simulations from short relaxation runs to 4 ns each. Sampling statistics were collected from the trajectories between 2 and 4 ns, with the simulations performed in 500 ps segments."
                }
              </p>
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/selp/3.avif"
                alt="Final configurations of the SELP sampling runs"
                width={840}
              />
              <p>
                <em>
                  {
                    "Figure 3 | Final configurations at 4 ns for the three sampling runs of each system."
                  }
                </em>
              </p>
              <p>
                {
                  "We also checked the temperature, concentration, crosslink distances, and checkpoint-based continuation. Mean temperatures over the final 250 ps of each stage ranged from 310.03 to 310.31 K, and mean concentrations ranged from 100.017 to 100.066 mg/mL. Tyrosine crosslink distances recorded across all logs ranged from 0.295 to 0.470 nm."
                }
              </p>
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/selp/4.avif"
                alt="Temperature, concentration and crosslink statistics"
                width={840}
              />
              <p>
                <em>
                  {
                    "Figure 4 | Statistics over the 2–4 ns simulation interval. Faint traces show data at 1 ps resolution, while darker traces show data at 20 ps resolution."
                  }
                </em>
              </p>
              <p>
                {
                  "However, we found that the hydrogel stiffness still exhibited substantial temporal drift. To address the incomplete convergence of stiffness, we extended the sampling duration, but the improvement remained unsatisfactory. We therefore turned to computational analyses of the sources of structural instability and the key factors affecting stability."
                }
              </p>
              <h4 className="mt-5 mb-3">
                {"4 Correction of Network Stability"}
              </h4>
              <p>
                {
                  "In addition to permanent crosslinks, noncovalent interactions exist between protein chains. "
                }
                <strong>
                  {
                    "To compare the crosslinked networks formed by proteins with different repeat lengths, we constructed simplified static elastic networks based on existing molecular dynamics endpoint configurations."
                  }
                </strong>
                {
                  " This approach draws on elastic network models that describe the small-deformation response of proteins using harmonic interactions, retaining permanent crosslinks and introducing additional effective connections based on interchain spatial contacts[5]. By allowing protein-chain translations, rotations, and the remaining strain components to relax, we calculated the effective axial stiffness of the network. The underlying energy-minimization approach is consistent with nonaffine elasticity theory."
                }
              </p>
              <p>
                {
                  "For each prespecified MD endpoint configuration, intrachain coordinates were first unwrapped across periodic boundaries. Interchain protein-bead pairs separated by no more than 0.6 nm were then identified using the minimum-image distance. Bead pairs already included as permanent crosslinks were not added again. Each bead pair constituted a candidate contact, but these contacts were not necessarily associated with tyrosine residues and did not represent newly formed chemical bonds."
                }
              </p>
              <p>
                {
                  "We defined all candidate contacts between the same pair of protein chains as a single interface. Each interface contained multiple tyrosine contact regions. A maximum distance constraint of 0.6 nm was applied, and contact selection was determined by the spatial dispersion of the candidate-contact midpoints. Ties were resolved using canonical bead indices, and quantitative endpoint calculations were performed using coordinates from binary checkpoint (CPT) files."
                }
              </p>
              <p>
                <strong>
                  {
                    "By refining this network-construction method, we corrected the network stability."
                  }
                </strong>
              </p>
              <h4 className="mt-5 mb-3">
                {"5 Network Compression and Modulus Calculation"}
              </h4>
              <p>
                {
                  "Initially, we directly applied axial tension and compression to the periodic simulation box and then held the box shape fixed to record stress relaxation. The original system used Hencky strain with a deformation range of ±0.20, followed by 0.5 ns of relaxation after each strain increment of ±0.05:"
                }
              </p>
              <MathFormula display>
                {
                  "\\varepsilon_H=\\ln\\frac{L_z'}{L_{z,0}},\\qquad L_z'=L_{z,0}e^{\\varepsilon_H},\\qquad L_x'=L_{x,0}e^{-\\varepsilon_H/2},\\qquad L_y'=L_{y,0}e^{-\\varepsilon_H/2}"
                }
              </MathFormula>
              <p>{"The symbols are defined as follows:"}</p>
              <p>
                {
                  "ith negative Hencky strain indicating compression. In the initial MD analysis, directional stress differences were calculated from the pressure tensor, with tension defined as positive:"
                }
              </p>
              <MathFormula display>
                {
                  "s_i=-100\\left(P_{ii}-\\frac{P_{jj}+P_{kk}}{2}\\right) \\quad[\\mathrm{kPa}]"
                }
              </MathFormula>
              <p>
                {
                  "These calculations were used to examine stress and relaxation after deformation. However, they did not correspond to our actual conditions, "
                }
                <strong>
                  {
                    "so we defined compression as a virtual small-strain test of a fixed network."
                  }
                </strong>
              </p>
              <MathFormula display>
                {
                  "\\eta=\\frac{L_{z,0}-L_z}{L_{z,0}}=-\\varepsilon_{zz}>0, \\qquad \\eta\\rightarrow0"
                }
              </MathFormula>
              <p>
                {
                  "An infinitesimal compression was applied along the Z direction. Rigid-body translations and small rotations of individual chains were allowed, and the remaining five strain components were released, enabling the network to reach the minimum energy within the model at the prescribed axial strain.[6] Transverse deformation was determined by the solution, without imposing volume conservation. After converting to consistent units and expressing the energy density in kPa, the model yielded:"
                }
              </p>
              <MathFormula display>
                {
                  "\\mathcal W(\\eta)=\\frac12 E_0\\eta^2,\\qquad \\sigma_c=\\frac{\\partial\\mathcal W}{\\partial\\eta},\\qquad E_0=\\left.\\frac{\\partial\\sigma_c}{\\partial\\eta}\\right|_{\\eta=0}"
                }
              </MathFormula>
              <p>
                {"Here, "}
                <MathFormula>{"\\mathcal W"}</MathFormula>
                {
                  " is the energy density after eliminating the chain-motion degrees of freedom and the freely relaxing strain components, and "
                }
                <MathFormula>{"\\sigma_c"}</MathFormula>
                {
                  " is the incremental stress defined as positive in compression. This energy curvature was calculated directly using singular value decomposition (SVD) and Schur-complement reduction. In the present linear model without prestress, positive and negative infinitesimal strains have the same tangent stiffness."
                }
              </p>
              <h4 className="mt-5 mb-3">{"6 Correction of Results"}</h4>
              <p>
                {
                  "We found discrepancies between the simulation results and the wet-lab results and therefore introduced correction parameters for empirical calibration. After correction, a single shared scaling factor brought the mean values of both systems within 5% of the experimental values. We therefore used a shared scaling factor and an additive term for empirical calibration:"
                }
              </p>
              <MathFormula display>{"E_{\\mathrm{emp}}=aE_0+b"}</MathFormula>
              <p>
                {"Here, "}
                <MathFormula>{"E_0"}</MathFormula>
                {" is the original static calculation result, "}
                <MathFormula>{"a"}</MathFormula>
                {" is a dimensionless scaling factor, and "}
                <MathFormula>{"b"}</MathFormula>
                {
                  " is expressed in kPa. Calibration using the equally weighted means of the three branches for each system yielded:"
                }
              </p>
              <MathFormula display>
                {"a=1.895,\\qquad b=19.793\\ \\mathrm{kPa}"}
              </MathFormula>
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/selp/5.avif"
                alt="Calculated compressive moduli"
                width={680}
              />
              <p>
                <em>
                  {
                    "Figure 5 | Compressive modulus data after correction. A, B, and C represent three replicates."
                  }
                </em>
              </p>
              <p>
                {
                  "Ultimately, through simulation, we developed a computational modeling method that agreed with the wet-lab results. We also used 2KY16 to validate the computational modeling, "
                }
                <strong>
                  {
                    "and the final validation results were consistent with the wet-lab measurements."
                  }
                </strong>
              </p>
              <h3 className="mt-5 mb-3">
                {"How modeling connects to the wet lab"}
              </h3>
              <p>
                {
                  "During model development, the wet-lab experiments provided measured mechanical modulus data for the calibration of 2KY5 and 2KY10. By fitting these data, we adjusted the parameters used in the calculations and successfully implemented the simulations."
                }
              </p>
              <p>
                {
                  "We applied the modeling method to 2KY16 to predict the mechanical properties of its hydrogel. Wet-lab experiments were conducted in parallel to validate the predictions. The results showed that the relative error between the predicted mechanical modulus and the wet-lab measurement was [percentage to be specified]%, demonstrating the reliability of our modeling method."
                }
              </p>
              <p>
                <strong>
                  {
                    "Meanwhile, we established links between the modeling and wet-lab experiments through concentration, crosslinking fraction, and related parameters."
                  }
                </strong>
              </p>
              <p>
                <em>
                  {"Table 1 | Comparison of wet-lab and modeling conditions."}
                </em>
              </p>
              <p>
                {
                  "The experimental reference values were obtained from compression tests on hydrated samples at a concentration of approximately 100 mg/mL. The specimens were approximately 10 mm in height and were compressed to 30% strain at a crosshead speed of 1 mm/min. Fitting was performed over the 5–15% strain interval."
                }
                <strong>{" The wet-lab results are presented below:"}</strong>
              </p>
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/selp/6.avif"
                alt="Experimental stress–strain curves"
                width={680}
              />
              <p>
                <em>
                  {"Figure 6 | Experimentally measured stress–strain curves. "}
                </em>
              </p>
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/selp/7.avif"
                alt="Experimental Young’s moduli"
                width={680}
              />
              <p>
                <em>
                  {"Figure 7 | Experimentally measured compressive moduli.  "}
                </em>
              </p>
              <p>
                {
                  "Our modeling approach integrates these parameters to predict the crosslinked networks and mechanical responses of different constructs, providing a basis for subsequent protein design, candidate screening, and experimental validation."
                }
              </p>
              <h3 className="mt-5 mb-3">{"References"}</h3>
              <p>
                {
                  "[1] Huang J, Rauscher S, Nawrocki G, et al. CHARMM36m: an improved force field for folded and intrinsically disordered proteins. "
                }
                <em>{"Nature Methods"}</em>
                {". 2017;14:71–73. "}
                <a href="https://doi.org/10.1038/nmeth.4067">
                  {"https://doi.org/10.1038/nmeth.4067"}
                </a>
              </p>
              <p>
                {
                  "[2] Li X, Latour RA, Stuart SJ. TIGER2: An improved algorithm for temperature intervals with global exchange of replicas. "
                }
                <em>{"The Journal of Chemical Physics"}</em>
                {". 2009;130:174106. "}
                <a href="https://doi.org/10.1063/1.3129342">
                  {"https://doi.org/10.1063/1.3129342"}
                </a>
              </p>
              <p>
                {
                  "[3] Souza PCT, Alessandri R, Barnoud J, et al. Martini 3: a general purpose force field for coarse-grained molecular dynamics. "
                }
                <em>{"Nature Methods"}</em>
                {". 2021;18:382–388. "}
                <a href="https://doi.org/10.1038/s41592-021-01098-3">
                  {"https://doi.org/10.1038/s41592-021-01098-3"}
                </a>
              </p>
              <p>
                {
                  "[4] Newman MEJ, Ziff RM. Fast Monte Carlo algorithm for site or bond percolation. "
                }
                <em>{"Physical Review E"}</em>
                {". 2001;64:016706. "}
                <a href="https://doi.org/10.1103/PhysRevE.64.016706">
                  {"https://doi.org/10.1103/PhysRevE.64.016706"}
                </a>
              </p>
              <p>
                {
                  "[5] Tirion MM. Large Amplitude Elastic Motions in Proteins from a Single-Parameter, Atomic Analysis. "
                }
                <em>{"Physical Review Letters"}</em>
                {". 1996;77:1905–1908. "}
                <a href="https://doi.org/10.1103/PhysRevLett.77.1905">
                  {"https://doi.org/10.1103/PhysRevLett.77.1905"}
                </a>
              </p>
              <p>
                {
                  "[6] Lemaître A, Maloney C. Sum Rules for the Quasi-Static and Visco-Elastic Response of Disordered Solids at Zero Temperature. "
                }
                <em>{"Journal of Statistical Physics"}</em>
                {". 2006;123:415–453. "}
                <a href="https://doi.org/10.1007/s10955-005-9015-5">
                  {"https://doi.org/10.1007/s10955-005-9015-5"}
                </a>
              </p>
            </>
          )}
          {activeModule === 1 && (
            <>
              <h2 className="mt-5 mb-3">
                {"Rational Engineering of SnoopLigase2"}
              </h2>
              <h3 className="mt-5 mb-3">{"Overview"}</h3>
              <p>
                {
                  "Modular protein assembly requires efficient and reliable ligation tools. We use the SnoopTag2–DogTag ligation system in our protein ligation module, with SnoopLigase2 catalyzing the reaction. However, during our experiments, we found that the stability and turnover of SnoopLigase2 were suboptimal. "
                }
                <strong>
                  {
                    "To make our ligation module more efficient and enable faster, broader, and lower-cost ligation, we rationally engineered SnoopLigase2."
                  }
                </strong>
              </p>
              <p>
                {
                  "Our engineering efforts focused on two objectives: first, maintaining the structural stability of SnoopLigase2 in the working solution; and second, improving its turnover."
                }
              </p>
              <h3 className="mt-5 mb-3">{"1 Research Background"}</h3>
              <p>
                {
                  "SnoopLigase2 catalyzes the formation of a covalent isopeptide bond between SnoopTag2 and DogTag, providing a short peptide-based ligation interface for different protein modules. Previous research has also shown that SnoopLigase2 binds strongly and noncovalently to the ligated product, limiting product release and catalyst recycling. "
                }
                <strong>
                  {
                    "This led us to recognize that completion of the ligation reaction and release of the ligase are two processes that must be evaluated separately."
                  }
                </strong>
                {"[1]"}
              </p>
              <p>
                {"We therefore proposed a stepwise design hypothesis: "}
                <strong>
                  {
                    "first, identify stabilization candidates with favorable structural compatibility"
                  }
                </strong>
                {
                  " to establish a foundation for subsequent engineering; then, on this background, "
                }
                <strong>
                  {
                    "screen for mutations that have a substantial effect on product-interface interactions while minimally affecting the unbound-state structure."
                  }
                </strong>
                {
                  " The purpose of the modeling was to identify candidates worth experimental validation, rather than to infer turnover directly from structural scores alone."
                }
              </p>
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/snoopligase/1.avif"
                alt="Ligase template structure and catalytic residues"
                width={334}
                bounds={[731, 280, 1926, 1569]}
              />
              <p>
                <em>
                  {
                    "Figure 1 | Local structure of residues 734–860 in chain A of 2WW8"
                  }
                </em>
              </p>
              <h3 className="mt-5 mb-3">{"2 Model Construction"}</h3>
              <p>
                {
                  "We used the crystal structure of RrgA, 2WW8, as a template to construct a ligase core model containing 104 amino acids.[2]"
                }
              </p>
              <p>
                <strong>
                  {
                    "Based on previous engineering work, we introduced nine mutations to construct the initial model."
                  }
                </strong>
                {
                  " Using coordinate-constrained FastRelax in PyRosetta, we generated 20 parental models and selected several representative conformations. These models have identical sequences but represent different optimized conformations, reducing the dependence of subsequent screening on a single starting structure.[1, 3]"
                }
              </p>
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/snoopligase/2.avif"
                alt="Representative parental ligase structure"
                width={235}
                bounds={[1097, 287, 1945, 1585]}
              />
              <p>
                <em>
                  {
                    "Figure 2 | Representative conformation of the parental model"
                  }
                </em>
              </p>
              <h3 className="mt-5 mb-3">{"3 Stability Screening"}</h3>
              <p>
                <strong>
                  {
                    "Based on the literature, we adopted a strategy of introducing proline substitutions  in loop regions."
                  }
                </strong>
                {
                  " Proline restricts the conformational freedom of the backbone and may therefore provide a favorable stabilizing effect when the original local geometry is compatible with the substitution.[4]"
                }
              </p>
              <p>
                {
                  "By jointly analyzing backbone dihedral angles, secondary structure, solvent exposure, and distance from key functional regions, we selected five candidates: A771P, N775P, E785P, S795P, and D796P. We then constructed mutants and matched controls for the representative conformations and performed repeated calculations using the same ref2015 scoring function, side-chain optimization scope, and FastRelax workflow.[5, 6]"
                }
              </p>
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/snoopligase/3.avif"
                alt="Five candidate stabilizing substitution sites"
                width={339}
                bounds={[884, 312, 2073, 1573]}
              />
              <p>
                <em>
                  {
                    "Figure 3 | Distribution of the five initial screening sites in the original representative conformation"
                  }
                </em>
              </p>
              <p>
                {"The primary evaluation metric for the unbound state was:"}
              </p>
              <MathFormula display>{"S_{mutant}-S_{control}"}</MathFormula>
              <p>
                {
                  "A negative value indicates that the mutant has a lower Rosetta score under the current computational protocol. Screening also considered consistency across calculations, backbone displacement, steric clashes, and changes in local interactions."
                }
              </p>
              <p>
                {
                  "Following single-mutation screening, A771P and E785P proceeded to combination assessment. Across three starting conformations, we performed 30 quartets of comparisons comprising the original structure, A771P, E785P, and the double mutant. The double mutant outperformed the corresponding original-structure control in all 30 calculations, with a median score difference across all quartets of approximately −9.24 REU. In 25 quartets, "
                }
                <strong>
                  {
                    "adding E785P to the A771P background provided a further benefit"
                  }
                </strong>
                {
                  ". Together with inspection of representative structures, these results led us to define the original structure carrying A771P and E785P as Construct1."
                }
              </p>
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/snoopligase/4.avif"
                alt="Double mutant superimposed on its control"
                width={325}
                bounds={[852, 352, 1905, 1518]}
              />
              <p>
                <em>
                  {
                    "Figure 4 | Superposition of the double mutant and its matched control. The double mutant is shown in blue, and the control in gray."
                  }
                </em>
              </p>
              <h3 className="mt-5 mb-3">
                {"4 Effects of Stabilization on the Catalytic Region。"}
              </h3>
              <p>
                {
                  "An improved unbound-state score does not directly demonstrate that ligation function is retained. "
                }
                <strong>
                  {
                    "We therefore constructed a single-chain product model containing the K742–N854 isopeptide bond and introduced SnoopTag2 mutations in the corresponding regions to examine the behavior of Construct1 in this structural context."
                  }
                </strong>
              </p>
              <p>
                {
                  "The evaluation included retention of the isopeptide linkage, changes in key distances around E803, overall conformational displacement, and an interaction proxy between the ligase core and the Tag/tail regions. However, the core–tail interactions of Construct1 were slightly more favorable in eight calculations, suggesting that the stabilization design may also have an enhancing effect."
                }
              </p>
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/snoopligase/5.avif"
                alt="Construct1 product-like structure"
                width={396}
                bounds={[620, 261, 2033, 1546]}
              />
              <p>
                <em>
                  {
                    "Figure 5 | Example of a C1 product-like structure containing the non-overlapping Tag2 background mutations"
                  }
                </em>
              </p>
              <h3 className="mt-5 mb-3">{"5 Turnover Optimization"}</h3>
              <p>
                {
                  "We performed a per-residue analysis of the 104 ligase core residues in 20 single-chain product models. Based on interface distances, contact extent, and structural protection criteria, we selected six sites—K792, N793, S795, E827, V828, and V831—and designed 12 substitutions comprising alanine-scanning mutations or more conservative replacements."
                }
              </p>
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/snoopligase/6.avif"
                alt="Six candidate product-interface sites"
                width={386}
                bounds={[851, 339, 2039, 1448]}
              />
              <p>
                <em>{"Figure 6 | The six sites selected through screening"}</em>
              </p>
              <p>
                {
                  "Each candidate was compared with its control in both the unbound and product-like states. In addition to the unbound-state score penalty, we calculated:"
                }
              </p>
              <MathFormula display>
                {"I_{\\mathrm{mutant}}-I_{\\mathrm{control}}"}
              </MathFormula>
              <p>
                {"Here, "}
                <MathFormula>{"I"}</MathFormula>
                {
                  " is the Rosetta-calculated core–Tag/tail interaction value. A positive value indicates weakening of this interface interaction and serves as a metric for screening potential product-release candidates. Candidates must also satisfy checks of the overall structure and key functional geometry.[7]"
                }
              </p>
              <p>
                <strong>
                  {"Based on the combined analysis, we prioritized E827Q."}
                </strong>
                {
                  " Its median unbound-state score difference was −0.138 REU, and its median product-interface interaction difference was +1.386 REU."
                }
              </p>
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/snoopligase/7.avif"
                alt="E827 control and local interface detail"
                width={720}
                bounds={[72, 39, 2913, 1713]}
              />
              <p></p>
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/snoopligase/8.avif"
                alt="Q827 mutant and local interface detail"
                width={720}
                bounds={[72, 39, 2913, 1713]}
              />
              <p>
                <em>
                  {
                    "Figure 7 | Local comparison of representative product-like structures. The E827 control is shown on the left, and the Q827 mutant on the right."
                  }
                </em>{" "}
                <em>
                  {
                    "The dashed lines indicate the measured distances between K734 NZ and E827 OE2 (2.80 Å) and between K734 NZ and Q827 OE1 (5.87 Å), respectively."
                  }
                </em>
              </p>
              <h3 className="mt-5 mb-3">{"6 Conclusion"}</h3>
              <p>
                <strong>
                  {
                    "Through rational engineering of SnoopLigase2, we introduced three cumulative mutations—A771P, E785P, and E827Q—improving its stability and turnover at the theoretical level."
                  }
                </strong>
                {
                  " We have now completed the modeling work, and wet-lab validation is proceeding in parallel."
                }
              </p>
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/snoopligase/9.avif"
                alt="SnoopLigase2-ZJU mutation overview"
                width={444}
                bounds={[552, 344, 2025, 1537]}
              />
              <p>
                <em>{"Figure 8 | The overview of SnoopLigase2-ZJU."}</em>
                {" **"}
              </p>
              <h3 className="mt-5 mb-3">{"References"}</h3>
              <p>
                {
                  "[1] Keeble, A. H., Wood, D. P., & Howarth, M. (2023). Design and Evolution of Enhanced Peptide–Peptide Ligation for Modular Transglutaminase Assembly. "
                }
                <em>{"Bioconjugate Chemistry"}</em>
                {", "}
                <strong>{"34"}</strong>
                {"(6), 1019–1036. "}
                <a href="https://doi.org/10.1021/acs.bioconjchem.3c00122">
                  {"https://doi.org/10.1021/acs.bioconjchem.3c00122"}
                </a>
              </p>
              <p>
                {
                  "[2] Izoré, T., Contreras-Martel, C., El Mortaji, L., Manzano, C., Terrasse, R., Vernet, T., Di Guilmi, A. M., & Dessen, A. (2010). Structural Basis of Host Cell Recognition by the Pilus Adhesin from "
                }
                <em>{"Streptococcus pneumoniae"}</em>
                {". "}
                <em>{"Structure"}</em>
                {", "}
                <strong>{"18"}</strong>
                {"(1), 106–115. "}
                <a href="https://doi.org/10.1016/j.str.2009.10.019">
                  {"https://doi.org/10.1016/j.str.2009.10.019"}
                </a>
              </p>
              <p>
                {
                  "[3] Buldun, C. M., Jean, J. X., Bedford, M. R., & Howarth, M. (2018). SnoopLigase Catalyzes Peptide–Peptide Locking and Enables Solid-Phase Conjugate Isolation. "
                }
                <em>{"Journal of the American Chemical Society"}</em>
                {", "}
                <strong>{"140"}</strong>
                {"(8), 3008–3018."}
                <a href="https://doi.org/10.1021/jacs.7b13237">
                  {"https://doi.org/10.1021/jacs.7b13237"}
                </a>
              </p>
              <p>
                {
                  "[4] Matthews, B. W., Nicholson, H., & Becktel, W. J. (1987). Enhanced protein thermostability from site-directed mutations that decrease the entropy of unfolding. "
                }
                <em>
                  {
                    "Proceedings of the National Academy of Sciences of the United States of America"
                  }
                </em>
                {", "}
                <strong>{"84"}</strong>
                {"(19), 6663–6667. "}
                <a href="https://doi.org/10.1073/pnas.84.19.6663">
                  {"https://doi.org/10.1073/pnas.84.19.6663"}
                </a>
              </p>
              <p>
                {
                  "[5] Chaudhury, S., Lyskov, S., & Gray, J. J. (2010). PyRosetta: A script-based interface for implementing molecular modeling algorithms using Rosetta. "
                }
                <em>{"Bioinformatics"}</em>
                {", "}
                <strong>{"26"}</strong>
                {"(5), 689–691. "}
                <a href="https://doi.org/10.1093/bioinformatics/btq007">
                  {"https://doi.org/10.1093/bioinformatics/btq007"}
                </a>
              </p>
              <p>
                {
                  "[6] Park, H., Bradley, P., Greisen, P., Jr., Liu, Y., Mulligan, V. K., Kim, D. E., Baker, D., & DiMaio, F. (2016). Simultaneous Optimization of Biomolecular Energy Functions on Features from Small Molecules and Macromolecules. "
                }
                <em>{"Journal of Chemical Theory and Computation"}</em>
                {", "}
                <strong>{"12"}</strong>
                {"(12), 6201–6212. "}
                <a href="https://doi.org/10.1021/acs.jctc.6b00819">
                  {"https://doi.org/10.1021/acs.jctc.6b00819"}
                </a>
              </p>
              <p>
                {
                  "[7] Alford, R. F., Leaver-Fay, A., Jeliazkov, J. R., et al. (2017). The Rosetta All-Atom Energy Function for Macromolecular Modeling and Design. "
                }
                <em>{"Journal of Chemical Theory and Computation"}</em>
                {", "}
                <strong>{"13"}</strong>
                {"(6), 3031–3048. "}
                <a href="https://doi.org/10.1021/acs.jctc.7b00125">
                  {"https://doi.org/10.1021/acs.jctc.7b00125"}
                </a>
              </p>
            </>
          )}
          {activeModule === 2 && (
            <>
              <h2 className="mt-5 mb-3">
                {
                  "Modeling of Magnetic-Field-Induced SELP–Fe₃O₄ Multiphase Poroelasticity"
                }
              </h2>
              <p>
                {
                  "In our previous modeling, we mainly simulated the mechanical properties of the hydrogel platform we fabricated. In our project, after the incorporation of magnetic nanoparticles, the mechanical properties of the hydrogel also change, and anisotropy is induced. Therefore, we simulated the mechanical properties of the hydrogel that became anisotropic after the introduction of magnetic nanoparticles."
                }
              </p>
              <h3 className="mt-5 mb-3">
                {"Research Question and Modeling Framework"}
              </h3>
              <p>
                {
                  "In the preceding modeling of 2KY10-SELP single-chain conformations, Martini coarse-grained multichain systems, and tyrosine crosslink networks, the system was treated primarily as a protein network in water. When Fe₃O₄ nanoparticles are introduced and magnetic-field-driven orientation and dipolar interactions are considered, the system can no longer be described by a single protein network alone. It must instead be extended to a multiphase composite description."
                }
              </p>
              <p>
                {
                  "In addition to the need to distinguish paired Fe₃O₄ from free Fe₃O₄ after nanoparticle incorporation, three further reasons require lifting the description from fully atomistic/Martini molecular simulations to a four-phase macroscopic level:"
                }
              </p>
              <p>
                {
                  "1. The computational cost of the hydrogel is too high. Fully atomistic and Martini simulations are suitable for single-chain conformations, local crosslink topology, and short-time stress relaxation. However, an experimental-scale hydrogel contains a large number of protein chains, water, ions, and nanoparticles. Tracking every atom or coarse-grained bead while covering macroscopic sample dimensions, long-time network rearrangements, and external-field responses would be computationally prohibitive. The system therefore needs to be coarse-grained into macroscopic phases described by volume fractions and mean-field quantities."
                }
              </p>
              <p>
                {
                  "2. The magnetic field introduces macroscopic anisotropy. An external magnetic field induces dipolar interactions among Fe₃O₄ particles and orientational alignment of fibers and particles. The material is then no longer isotropic; mechanical moduli, magnetic response, and load-bearing capacity of the crosslinked network may all become direction-dependent. The four-phase system can describe the paired fiber phase, free particle phase, non-fibrous matrix, and water phase separately, with orientational and dipolar terms explicitly representing macroscopic anisotropy."
                }
              </p>
              <p>
                {
                  "3. Statistical nature. The modulus, crosslinking fraction, and magnetic response of a hydrogel are inherently statistical averages over many chains, crosslink points, particles, and water molecules, rather than properties of a single chain or a single particle. The four-phase model describes the system using statistical quantities such as volume fractions, making it better suited for comparison with the bulk material properties measured in wet-lab experiments."
                }
              </p>
              <p>
                {
                  "Therefore, the four-phase system does not replace the preceding FAMD and Martini simulations. Instead, it takes their outputs—single-chain conformations, crosslink endpoints, and local mechanical parameters—and coarse-grains them upward into a macroscopic statistical description."
                }
              </p>
              <p>
                {
                  "We aim to establish a continuum model that connects magnetic-field-induced fiber orientation, photochemical crosslinking locking, and poroelastic mechanical response. The model treats the SELP–Fe₃O₄ system as a four-phase mixture. Its goal is to incorporate magnetic fiber orientation under a nonuniform field, Langevin magnetization of free Fe₃O₄ particles, pore water pressure, and the reference orientation structure after photocrosslinking into a single volume-averaged free energy, and then to derive stress–strain–pore-pressure governing equations suitable for finite element analysis."
                }
              </p>
              <h3 className="mt-5 mb-3">{"1. Basic Assumptions"}</h3>
              <MathFormula display>
                {"a_i b_i=\\sum_{i=1}^{3}a_i b_i"}
              </MathFormula>
              <h4 className="mt-5 mb-3">
                {"1.1 Einstein Summation Convention"}
              </h4>
              <p>
                {
                  "We adopt the Einstein summation convention. Repeated indices are summed automatically, namely"
                }
              </p>
              <p>
                {
                  "Here, a repeated index denotes a summation index, and a free index cannot appear more than once in the same term."
                }
              </p>
              <h4 className="mt-5 mb-3">{"1.2 Four-Phase System"}</h4>
              <p>{"We define four macroscopic phases:"}</p>
              <MathFormula display>
                {
                  "\\mathcal{B}=\\mathcal{F}+\\mathcal{M}+\\mathcal{P}+\\mathcal{W}"
                }
              </MathFormula>
              <p>{"where:"}</p>
              <MathFormula display>{"\\mathcal{F}"}</MathFormula>
              <p>{"：SELP–Fe₃O₄ paired fiber phase"}</p>
              <MathFormula display>{"\\mathcal{M}"}</MathFormula>
              <p>
                {
                  "：unpaired SELP, short peptides, and other non-fibrous matrix"
                }
              </p>
              <MathFormula display>{"\\mathcal{P}"}</MathFormula>
              <p>{"：unpaired Fe3O4 nanoparticle phase"}</p>
              <MathFormula display>{"\\mathcal{W}"}</MathFormula>
              <p>{"：H₂O liquid phase"}</p>
              <p>{"The volume fractions satisfy:"}</p>
              <MathFormula display>
                {"\\phi_f+\\phi_m+\\phi_p+\\phi_w=1"}
              </MathFormula>
              <p>{"The solid volume fraction is:"}</p>
              <MathFormula display>
                {"\\phi_s=\\phi_f+\\phi_m+\\phi_p"}
              </MathFormula>
              <p>{"In particular, it is necessary to distinguish:"}</p>
              <MathFormula display>
                {"\\mathrm{Fe_3O_4}^{\\,\\mathrm{paired}}\\subset\\mathcal{F}"}
              </MathFormula>
              <p>{"and"}</p>
              <MathFormula display>
                {"\\mathrm{Fe_3O_4}^{\\,\\mathrm{free}}\\subset\\mathcal{P}"}
              </MathFormula>
              <p>
                {"Therefore, "}
                <MathFormula>{"\\mathcal{P}"}</MathFormula>
                {" is the free magnetic particle phase."}
              </p>
              <p>
                {
                  "Based on the above assumptions, the total free energy per unit volume is written as:"
                }
              </p>
              <MathFormula display>
                {
                  "\\begin{aligned} \\psi={}& \\psi_{\\mathrm{SELP-Fe_3O_4}} +\\psi_{\\mathrm{fiber}} +\\psi_{\\mathrm{particle}}+\\psi_{\\mathrm{orient}} +\\psi_{\\mathrm{dip}} +\\psi_{\\mathrm{crosslink}} +\\psi_{\\mathrm{fluid}} +\\psi_{\\mathrm{coupling}}. \\end{aligned}"
                }
              </MathFormula>
              <h4 className="mt-5 mb-3">{"1.3 Basic Kinematics"}</h4>
              <p>
                {"The solid displacement is denoted by "}
                <MathFormula>{"u_i"}</MathFormula>
                {
                  ". Under the small-deformation assumption, the linear strain tensor is defined as:"
                }
              </p>
              <MathFormula display>
                {"\\varepsilon_{ij}=\\frac{1}{2}\\left(u_{i,j}+u_{j,i}\\right)"}
              </MathFormula>
              <p>{"where:"}</p>
              <MathFormula display>
                {"u_{i,j}=\\frac{\\partial u_i}{\\partial x_j}"}
              </MathFormula>
              <p>{"The volumetric strain is:"}</p>
              <MathFormula display>
                {"\\varepsilon_{kk}=\\nabla\\cdot\\mathbf{u}"}
              </MathFormula>
              <h3 className="mt-5 mb-3">{"2. SELP Non-Fibrous Matrix"}</h3>
              <p>
                {
                  "An isotropic linear elastic model is adopted. The matrix free energy density per unit volume is:"
                }
              </p>
              <MathFormula display>
                {
                  "\\psi_m=\\frac{1}{2}\\lambda_m\\varepsilon_{kk}\\varepsilon_{ll}+\\mu_m\\varepsilon_{ij}\\varepsilon_{ij}"
                }
              </MathFormula>
              <p>
                {
                  "The matrix stress is obtained by differentiating the free energy with respect to strain:"
                }
              </p>
              <MathFormula display>
                {
                  "\\sigma_{ij}^{m}=\\frac{\\partial\\psi_m}{\\partial\\varepsilon_{ij}}"
                }
              </MathFormula>
              <p>{"Thus:"}</p>
              <MathFormula display>
                {
                  "\\sigma_{ij}^{m}=\\lambda_m\\varepsilon_{kk}\\delta_{ij}+2\\mu_m\\varepsilon_{ij}"
                }
              </MathFormula>
              <p>
                {"Here, "}
                <MathFormula>{"\\lambda_m"}</MathFormula>
                {" and "}
                <MathFormula>{"\\mu_m"}</MathFormula>
                {" are the Lamé constants of the SELP non-fibrous matrix, and "}
                <MathFormula>{"\\delta_{ij}"}</MathFormula>
                {" is the Kronecker delta."}
              </p>
              <p>{"The macroscopic matrix stress contribution is:"}</p>
              <MathFormula display>
                {
                  "\\sigma_{ij}^{m,\\mathrm{eff}} = \\phi_m\\left(\\lambda_m\\varepsilon_{kk}\\delta_{ij}+2\\mu_m\\varepsilon_{ij}\\right)"
                }
              </MathFormula>
              <h3 className="mt-5 mb-3">{"3. Magnetic Field Terms"}</h3>
              <p>{"The applied magnetic field is:"}</p>
              <MathFormula display>
                {"\\mathbf{H}=\\mathbf{H}(\\mathbf{x},t)"}
              </MathFormula>
              <p>{"Its components are:"}</p>
              <MathFormula display>{"H_i=H_i(\\mathbf{x},t)"}</MathFormula>
              <p>{"where:"}</p>
              <MathFormula display>
                {"H_i\\neq \\mathrm{constant},\\qquad H_{i,j}\\neq0"}
              </MathFormula>
              <p>{"The magnitude of the magnetic field is:"}</p>
              <MathFormula display>
                {"H(\\mathbf{x},t)=\\sqrt{H_iH_i}"}
              </MathFormula>
              <p>{"The local unit magnetic field direction is:"}</p>
              <MathFormula display>
                {
                  "h_i(\\mathbf{x},t)=\\frac{H_i(\\mathbf{x},t)}{H(\\mathbf{x},t)}"
                }
              </MathFormula>
              <p>{"and satisfies the normalization condition:"}</p>
              <MathFormula display>{"h_ih_i=1"}</MathFormula>
              <p>{"Therefore, the magnetic field can be written as:"}</p>
              <MathFormula display>
                {"H_i(\\mathbf{x},t)=H(\\mathbf{x},t)h_i(\\mathbf{x},t)"}
              </MathFormula>
              <MathFormula display>
                {
                  "\\begin{aligned} \\psi_{\\mathrm{orient}}^f &= N_f(\\mathbf{x})\\left[ k_BT\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})\\ln\\rho_f(\\mathbf{x},\\mathbf{n})\\,d\\Omega \\right.\\\\ &\\quad\\left. -\\mu_0m_fH(\\mathbf{x})\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})h_i(\\mathbf{x})n_i\\,d\\Omega \\right]. \\end{aligned}"
                }
              </MathFormula>
              <MathFormula display>
                {
                  "\\rho_f(\\mathbf{x},\\mathbf{n}) = \\frac{\\alpha_f(\\mathbf{x})}{4\\pi\\sinh\\alpha_f(\\mathbf{x})} \\exp\\left[\\alpha_f(\\mathbf{x})h_i(\\mathbf{x})n_i\\right]"
                }
              </MathFormula>
              <h3 className="mt-5 mb-3">
                {
                  "4. Orientation Free Energy of Magnetic Fibers under a Nonuniform Field"
                }
              </h3>
              <p>
                {"The orientation free energy per unit volume of fibers is:"}
              </p>
              <MathFormula display>
                {
                  "\\begin{aligned} \\psi_{\\mathrm{orient}}^f &= N_f(\\mathbf{x})\\left[ k_BT\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})\\ln\\rho_f(\\mathbf{x},\\mathbf{n})\\,d\\Omega  -\\mu_0m_fH(\\mathbf{x})\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})h_i(\\mathbf{x})n_i\\,d\\Omega \\right]. \\end{aligned}"
                }
              </MathFormula>
              <p>
                {
                  "The first term describes the thermal fluctuation entropy of fiber orientation, and the second term describes the coupling between the effective magnetic moment of fibers and the external magnetic field.The second term in the orientation free energy per unit volume is precisely the origin of the magnetic response observed in our wet-lab experiments."
                }
              </p>
              <p>
                <a href="https://video.igem.org/w/aKNRpgAnSstH3okfNiHitR">
                  {"**ZJU-China: MNPs in magnetic field (2026)**"}
                </a>
              </p>
              <p>
                <a href="https://video.igem.org/w/jTZZfgsycPBGhN78bz2S9g">
                  {"**ZJU-China: TVNFKLY-MNPs in magnetic field (2026)**"}
                </a>
              </p>
              <h4 className="mt-5 mb-3">
                {"4.1 Single-Fiber Magnetic Interaction Energy"}
              </h4>
              <p>{"The external-field energy of a magnetic fiber is:"}</p>
              <MathFormula display>
                {
                  "U_H^f(\\mathbf{x},\\mathbf{n}) = -\\mu_0m_fH(\\mathbf{x})h_i(\\mathbf{x})n_i"
                }
              </MathFormula>
              <p>{"The dimensionless form of the external-field energy is:"}</p>
              <MathFormula display>
                {"\\alpha_f(\\mathbf{x})=\\frac{\\mu_0m_fH(\\mathbf{x})}{k_BT}"}
              </MathFormula>
              <p>{"Thus:"}</p>
              <MathFormula display>
                {"U_H^f=-k_BT\\alpha_f(\\mathbf{x})h_i(\\mathbf{x})n_i"}
              </MathFormula>
              <p>
                {
                  "The spatially dependent fiber orientation probability distribution is:"
                }
              </p>
              <MathFormula display>
                {"\\rho_f(\\mathbf{x},\\mathbf{n})"}
              </MathFormula>
              <p>{"and satisfies the normalization constraint:"}</p>
              <MathFormula display>
                {"\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})\\,d\\Omega=1"}
              </MathFormula>
              <h4 className="mt-5 mb-3">
                {"4.2 Fiber Orientation Free Energy"}
              </h4>
              <p>
                {"The orientation free energy per unit volume of fibers is:"}
              </p>
              <MathFormula display>
                {
                  "\\begin{aligned} \\psi_{\\mathrm{orient}}^f &= N_f(\\mathbf{x})\\left[ k_BT\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})\\ln\\rho_f(\\mathbf{x},\\mathbf{n})\\,d\\Omega \\right.\\\\ &\\quad\\left. -\\mu_0m_fH(\\mathbf{x})\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})h_i(\\mathbf{x})n_i\\,d\\Omega \\right]. \\end{aligned}"
                }
              </MathFormula>
              <p>
                {
                  "The first term describes the thermal fluctuation entropy of fiber orientation, and the second term describes the coupling between the effective magnetic moment of fibers and the external magnetic field."
                }
              </p>
              <h4 className="mt-5 mb-3">
                {"4.3 Variational Problem with Normalization Constraint"}
              </h4>
              <p>{"We construct the functional with a Lagrange multiplier:"}</p>
              <MathFormula display>
                {
                  "\\begin{aligned} \\mathcal{L}[\\rho_f,\\lambda] ={}& N_f\\left[ k_BT\\int_{S^2}\\rho_f\\ln\\rho_f\\,d\\Omega -\\mu_0m_fH\\int_{S^2}\\rho_fh_in_i\\,d\\Omega \\right]\\\\ &+\\lambda(\\mathbf{x})\\left[\\int_{S^2}\\rho_f\\,d\\Omega-1\\right]. \\end{aligned}"
                }
              </MathFormula>
              <p>{"The extremum condition is:"}</p>
              <MathFormula display>
                {"\\frac{\\delta\\mathcal{L}}{\\delta\\rho_f}=0"}
              </MathFormula>
              <p>{"This gives the Euler–Lagrange equation:"}</p>
              <MathFormula display>
                {
                  "N_fk_BT(1+\\ln\\rho_f) -N_f\\mu_0m_fHh_in_i +\\lambda(\\mathbf{x})=0"
                }
              </MathFormula>
              <p>{"We define the renormalized Lagrange multiplier:"}</p>
              <MathFormula display>
                {
                  "\\widetilde{\\lambda}(\\mathbf{x})=\\frac{\\lambda(\\mathbf{x})}{N_f(\\mathbf{x})}"
                }
              </MathFormula>
              <p>{"Then:"}</p>
              <MathFormula display>
                {
                  "k_BT(1+\\ln\\rho_f) -\\mu_0m_fHh_in_i +\\widetilde{\\lambda}(\\mathbf{x})=0"
                }
              </MathFormula>
              <p>{"Solving gives:"}</p>
              <MathFormula display>
                {
                  "\\rho_f(\\mathbf{x},\\mathbf{n}) = C(\\mathbf{x})\\exp\\left[\\alpha_f(\\mathbf{x})h_i(\\mathbf{x})n_i\\right]"
                }
              </MathFormula>
              <p>
                {"The normalization condition determines "}
                <MathFormula>{"C(\\mathbf{x}"}</MathFormula>
                {":"}
              </p>
              <MathFormula display>
                {
                  "C(\\mathbf{x})=\\frac{\\alpha_f(\\mathbf{x})}{4\\pi\\sinh\\alpha_f(\\mathbf{x})}"
                }
              </MathFormula>
              <p>
                {"The final local equilibrium orientation distribution is:"}
              </p>
              <MathFormula display>
                {
                  "\\rho_f(\\mathbf{x},\\mathbf{n}) = \\frac{\\alpha_f(\\mathbf{x})}{4\\pi\\sinh\\alpha_f(\\mathbf{x})} \\exp\\left[\\alpha_f(\\mathbf{x})h_i(\\mathbf{x})n_i\\right]"
                }
              </MathFormula>
              <p>{"where:"}</p>
              <MathFormula display>
                {"\\alpha_f(\\mathbf{x})=\\frac{\\mu_0m_fH(\\mathbf{x})}{k_BT}"}
              </MathFormula>
              <h4 className="mt-5 mb-3">{"4.4 Mean Fiber Orientation"}</h4>
              <p>
                {
                  "From the local equilibrium distribution, the mean fiber direction can be calculated as:"
                }
              </p>
              <MathFormula display>
                {"\\langle n_i\\rangle=\\int_{S^2}\\rho_f n_i\\,d\\Omega"}
              </MathFormula>
              <p>
                {
                  "Because the problem is axisymmetric about the magnetic field direction "
                }
                <MathFormula>{"\\mathbf{h}"}</MathFormula>
                {", we have:"}
              </p>
              <MathFormula display>
                {"\\langle n_i\\rangle=L(\\alpha_f)h_i"}
              </MathFormula>
              <p>
                {"where "}
                <MathFormula>{"L(\\alpha_f"}</MathFormula>
                {" is the Langevin function:"}
              </p>
              <MathFormula display>
                {"L(\\alpha_f)=\\coth\\alpha_f-\\frac{1}{\\alpha_f}"}
              </MathFormula>
              <p>{"Therefore:"}</p>
              <MathFormula display>
                {"\\langle\\mathbf{n}\\rangle=L(\\alpha_f)\\mathbf{h}"}
              </MathFormula>
              <h4 className="mt-5 mb-3">
                {"4.5 Relation to Second- and Fourth-Order Orientation Tensors"}
              </h4>
              <p>
                {"The second-order fiber orientation tensor is defined as:"}
              </p>
              <MathFormula display>
                {
                  "A_{ij}^{(2)}=\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})n_in_j\\,d\\Omega"
                }
              </MathFormula>
              <p>{"The fourth-order orientation tensor is defined as:"}</p>
              <MathFormula display>
                {
                  "A_{ijkl}^{(4)}=\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})n_in_jn_kn_l\\,d\\Omega"
                }
              </MathFormula>
              <p>{"where:"}</p>
              <MathFormula display>{"A_{ii}^{(2)}=1"}</MathFormula>
              <p>{"Since:"}</p>
              <MathFormula display>
                {"\\rho_f=\\rho_f(\\mathbf{x},\\mathbf{n})"}
              </MathFormula>
              <p>{"under a nonuniform magnetic field:"}</p>
              <MathFormula display>
                {
                  "A_{ij}^{(2)}=A_{ij}^{(2)}(\\mathbf{x}),\\qquad A_{ijkl}^{(4)}=A_{ijkl}^{(4)}(\\mathbf{x})"
                }
              </MathFormula>
              <p>
                {
                  "Thus, the macroscopic mechanical response of the fiber network also becomes spatially dependent."
                }
              </p>
              <h3 className="mt-5 mb-3">
                {
                  "5. Wilson Fiber Free Energy per Unit Volume and Stress Tensor"
                }
              </h3>
              <p>
                {"Let the unit fiber direction be "}
                <MathFormula>{"n_i"}</MathFormula>
                {". The axial strain along the fiber direction is:"}
              </p>
              <MathFormula display>
                {"\\varepsilon_f=n_in_j\\varepsilon_{ij}"}
              </MathFormula>
              <MathFormula display>{"E_f"}</MathFormula>
              <p>
                {
                  " is defined as the effective Young’s modulus along the fiber axis of the SELP–Fe₃O₄ paired fiber network, namely:"
                }
              </p>
              <MathFormula display>
                {"E_f=\\frac{\\partial\\sigma_f}{\\partial\\varepsilon_f}"}
              </MathFormula>
              <p>
                {"For a linear elastic fiber aligned along "}
                <MathFormula>{"n_i"}</MathFormula>
                {", the axial elastic energy per unit volume is:"}
              </p>
              <MathFormula display>
                {
                  "\\psi_f(\\mathbf{n})=\\int_0^{\\varepsilon_f}\\sigma_f(\\varepsilon_f')\\,d\\varepsilon_f'"
                }
              </MathFormula>
              <p>{"Under linear elasticity and small deformation:"}</p>
              <MathFormula display>{"\\sigma_f=E_f\\varepsilon_f"}</MathFormula>
              <p>
                {
                  "Using the Einstein summation convention, this can be written as:"
                }
              </p>
              <MathFormula display>
                {
                  "\\psi_f(\\mathbf{n}) = \\frac{1}{2}E_fn_in_jn_kn_l\\varepsilon_{ij}\\varepsilon_{kl}"
                }
              </MathFormula>
              <p>
                {
                  "Averaging over all fiber directions gives the Wilson-type fiber network free energy per unit volume:"
                }
              </p>
              <MathFormula display>
                {
                  "\\psi_f^{\\mathrm{W}} = \\phi_f\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n}) \\frac{1}{2}E_fn_in_jn_kn_l\\varepsilon_{ij}\\varepsilon_{kl}\\,d\\Omega"
                }
              </MathFormula>
              <p>{"or equivalently:"}</p>
              <MathFormula display>
                {
                  "\\psi_f^{\\mathrm{W}}(\\mathbf{x}) = \\frac{1}{2}\\phi_f(\\mathbf{x})E_f A_{ijkl}^{(4)}(\\mathbf{x}) \\varepsilon_{ij}(\\mathbf{x})\\varepsilon_{kl}(\\mathbf{x})"
                }
              </MathFormula>
              <p>{"where:"}</p>
              <MathFormula display>
                {"\\varepsilon_{ij}=\\frac{1}{2}\\left(u_{i,j}+u_{j,i}\\right)"}
              </MathFormula>
              <p>{"The fiber stress tensor is:"}</p>
              <MathFormula display>
                {
                  "\\sigma_{ij}^{f}=\\frac{\\partial\\psi_f^{\\mathrm{W}}}{\\partial\\varepsilon_{ij}}"
                }
              </MathFormula>
              <MathFormula display>
                {
                  "\\sigma_{ij}^f(\\mathbf{x}) = \\phi_f(\\mathbf{x})E_f A_{ijkl}^{(4)}(\\mathbf{x}) \\varepsilon_{kl}(\\mathbf{x})"
                }
              </MathFormula>
              <p>
                {"Its derivative with respect to "}
                <MathFormula>{"x_{j}"}</MathFormula>
                {" is:"}
              </p>
              <MathFormula display>
                {
                  "\\sigma_{ij,j}^f = \\left[\\phi_fE_fA_{ijkl}^{(4)}\\varepsilon_{kl}\\right]_{,j}"
                }
              </MathFormula>
              <p>{"Expanding:"}</p>
              <MathFormula display>
                {
                  "\\begin{aligned} \\sigma_{ij,j}^f ={}& \\phi_{f,j}E_fA_{ijkl}^{(4)}\\varepsilon_{kl} +\\phi_fE_fA_{ijkl,j}^{(4)}\\varepsilon_{kl} +\\phi_fE_fA_{ijkl}^{(4)}\\varepsilon_{kl,j}. \\end{aligned}"
                }
              </MathFormula>
              <h3 className="mt-5 mb-3">{"6. Free Fe₃O₄ Particle Model"}</h3>
              <p>
                {
                  "This section separately considers free Fe₃O₄ nanoparticles that are not paired with SELP. Their magnetic response is described by the classical Langevin model."
                }
              </p>
              <p>
                {
                  "Assume the free Fe₃O₄ nanoparticle is spherical with diameter "
                }
                <MathFormula>{"d_p"}</MathFormula>
                {". Its single-particle volume is:"}
              </p>
              <MathFormula display>{"V_p=\\frac{\\pi}{6}d_p^3"}</MathFormula>
              <p>
                {"For a Fe₃O₄ nanoparticle with diameter "}
                <MathFormula>{"20\\,\\mathrm{nm}"}</MathFormula>
                {":"}
              </p>
              <MathFormula display>
                {"d_p=20\\times10^{-9}\\,\\mathrm{m}"}
              </MathFormula>
              <p>{"Thus:"}</p>
              <MathFormula display>
                {
                  "V_p = \\frac{\\pi}{6}\\left(20\\times10^{-9}\\right)^3 \\approx4.19\\times10^{-24}\\,\\mathrm{m}^3"
                }
              </MathFormula>
              <p>
                {"Using the saturation magnetization "}
                <MathFormula>{"M_s"}</MathFormula>
                {
                  " to characterize the magnetic moment density of Fe₃O₄ particles, the maximum magnetic moment of a single particle is:"
                }
              </p>
              <MathFormula display>{"m_p=M_sV_p"}</MathFormula>
              <p>
                {"Introducing the unit vector "}
                <MathFormula>{"s_i"}</MathFormula>
                {
                  " describing the magnetic moment direction, the particle magnetic moment can be written as:"
                }
              </p>
              <MathFormula display>{"m_i=m_ps_i,\\qquad s_is_i=1"}</MathFormula>
              <p>
                {"For a single free Fe₃O₄ nanoparticle located at "}
                <MathFormula>{"\\mathbf{x}"}</MathFormula>
                {
                  ", the interaction energy between its magnetic moment and the external field is:"
                }
              </p>
              <MathFormula display>{"U_p=-\\mu_0m_iH_i"}</MathFormula>
              <p>{"Substituting gives:"}</p>
              <MathFormula display>{"U_p=-\\mu_0m_ps_iH_i"}</MathFormula>
              <p>
                {"Using "}
                <MathFormula>{"H_i=Hh_i"}</MathFormula>
                {
                  " and defining the angle between the particle magnetic moment and the local field direction as "
                }
                <MathFormula>{"\\theta"}</MathFormula>
                {", we have:"}
              </p>
              <MathFormula display>{"s_ih_i=\\cos\\theta"}</MathFormula>
              <p>{"Thus:"}</p>
              <MathFormula display>{"U_p=-\\mu_0m_pH\\cos\\theta"}</MathFormula>
              <p>{"The dimensionless Langevin parameter is defined as:"}</p>
              <MathFormula display>
                {
                  "\\xi_p(\\mathbf{x},t)=\\frac{\\mu_0m_pH(\\mathbf{x},t)}{k_BT}"
                }
              </MathFormula>
              <p>
                {
                  "Using the above definition, the single-particle magnetic interaction energy can be written as:"
                }
              </p>
              <MathFormula display>{"U_p=-k_BT\\xi_p\\cos\\theta"}</MathFormula>
              <p>
                {
                  "The single-particle orientation partition function is defined as:"
                }
              </p>
              <MathFormula display>
                {"Z_p=\\int_{S^2}\\exp\\left(\\xi_ps_ih_i\\right)\\,d\\Omega"}
              </MathFormula>
              <p>{"Integrating gives:"}</p>
              <MathFormula display>
                {"Z_p=4\\pi\\frac{\\sinh\\xi_p}{\\xi_p}"}
              </MathFormula>
              <p>{"The single-particle free energy is:"}</p>
              <MathFormula display>
                {
                  "F_p=-k_BT\\ln Z_p = -k_BT\\ln\\left(4\\pi\\frac{\\sinh\\xi_p}{\\xi_p}\\right)"
                }
              </MathFormula>
              <p>
                {
                  "Differentiating the single-particle magnetic free energy with respect to "
                }
                <MathFormula>{"\\xi_p"}</MathFormula>
                {" gives:"}
              </p>
              <MathFormula display>
                {
                  "\\frac{\\partial F_p^{\\mathrm{mag}}}{\\partial\\xi_p} = -k_BT\\left(\\coth\\xi_p-\\frac{1}{\\xi_p}\\right) = -k_BTL(\\xi_p)"
                }
              </MathFormula>
              <p>
                {
                  "The average magnetic moment along the local field direction is obtained by differentiating the free energy with respect to the magnetic field:"
                }
              </p>
              <MathFormula display>
                {
                  "\\langle m_{\\parallel}^p\\rangle = -\\frac{1}{\\mu_0}\\frac{\\partial F_p^{\\mathrm{mag}}}{\\partial H} = m_pL(\\xi_p)"
                }
              </MathFormula>
              <p>
                {
                  "Because the system is axisymmetric about the local magnetic field direction, the average magnetic moment is aligned with the local field:"
                }
              </p>
              <MathFormula display>
                {"\\langle m_i^p\\rangle=m_pL(\\xi_p)h_i"}
              </MathFormula>
              <p>
                {"Let "}
                <MathFormula>{"N_p"}</MathFormula>
                {
                  " be the number density of free Fe₃O₄ nanoparticles per unit total volume:"
                }
              </p>
              <MathFormula display>{"N_p=\\frac{N}{V}"}</MathFormula>
              <p>
                {
                  "Thus, the average magnetic moment of all particles per unit volume is:"
                }
              </p>
              <MathFormula display>
                {"\\mathbf{M}^p=N_pm_pL(\\xi_p)\\mathbf{h}"}
              </MathFormula>
              <p>{"In a nonuniform magnetic field:"}</p>
              <MathFormula display>
                {
                  "N_p=N_p(\\mathbf{x}),\\qquad \\xi_p=\\xi_p(\\mathbf{x}),\\qquad h_i=h_i(\\mathbf{x})"
                }
              </MathFormula>
              <p>{"The local magnetization of free particles is:"}</p>
              <MathFormula display>
                {
                  "M_i^p(\\mathbf{x},t) = N_p(\\mathbf{x})m_pL[\\xi_p(\\mathbf{x})]h_i(\\mathbf{x})"
                }
              </MathFormula>
              <p>
                {
                  "The free energy density of free magnetic particles interacting with the external field is:"
                }
              </p>
              <MathFormula display>
                {
                  "\\psi_p^{\\mathrm{mag}}(\\mathbf{x}) = -N_p(\\mathbf{x})k_BT \\ln\\left[ \\frac{\\sinh\\xi_p(\\mathbf{x})}{\\xi_p(\\mathbf{x})} \\right]"
                }
              </MathFormula>
              <h3 className="mt-5 mb-3">
                {"7. Water Phase and Poroelastic Coupling"}
              </h3>
              <p>
                {
                  "In the SELP–Fe₃O₄ four-phase system, the water phase exists as a pore fluid within the porous structure formed by SELP fibers and Fe₃O₄ nanoparticles. The water phase itself does not carry the shear deformation of the solid phase; its main mechanical role is coupled to the solid phase through pore water pressure and relative flow."
                }
              </p>
              <h4 className="mt-5 mb-3">
                {"7.1 Basic Assumptions for the Water Phase"}
              </h4>
              <p>
                {
                  "The water phase is treated as a continuous liquid with approximate incompressibility. The pore water pressure is defined as:"
                }
              </p>
              <MathFormula display>{"p_w=p_w(x_i,t)"}</MathFormula>
              <p>
                {
                  "Neglecting viscous shear stress and inertia of the water phase, its stress tensor is mainly isotropic pressure:"
                }
              </p>
              <p>
                {"Here, "}
                <MathFormula>{"\\delta_{ij}"}</MathFormula>
                {
                  " is the identity tensor. Isotropic water pressure does not imply isotropic seepage. Because the magnetic fiber network is directional, the pore structure can exhibit pronounced anisotropic permeability."
                }
              </p>
              <h4 className="mt-5 mb-3">
                {"7.2 Mass Conservation of Solid and Water Phases"}
              </h4>
              <p>{"The solid displacement is:"}</p>
              <MathFormula display>{"u_i=u_i(\\mathbf{x},t)"}</MathFormula>
              <p>{"The solid velocity is:"}</p>
              <MathFormula display>{"v_i^s=\\dot{u}_i"}</MathFormula>
              <p>{"The water velocity is:"}</p>
              <MathFormula display>{"v_i^w"}</MathFormula>
              <p>
                {
                  "The relative flow of water with respect to the solid is defined as:"
                }
              </p>
              <MathFormula display>
                {"q_i=\\phi_w\\left(v_i^w-v_i^s\\right)"}
              </MathFormula>
              <p>
                {"where "}
                <MathFormula>{"\\phi_w"}</MathFormula>
                {" is the water volume fraction."}
              </p>
              <p>
                {
                  "Thus, the total volumetric flux of water can be expressed as:"
                }
              </p>
              <MathFormula display>
                {"\\phi_wv_i^w=\\phi_wv_i^s+q_i"}
              </MathFormula>
              <p>
                {
                  "Since the solid is approximately incompressible with constant intrinsic density "
                }
                <MathFormula>{"\\rho_s"}</MathFormula>
                {", its mass conservation equation is:"}
              </p>
              <MathFormula display>
                {
                  "\\frac{\\partial(\\phi_s\\rho_s)}{\\partial t} +\\left(\\phi_s\\rho_sv_i^s\\right)_{,i}=0"
                }
              </MathFormula>
              <p>
                {
                  "Similarly, the water phase is approximately incompressible with constant intrinsic density "
                }
                <MathFormula>{"\\rho_w"}</MathFormula>
                {", and its mass conservation equation is:"}
              </p>
              <MathFormula display>
                {
                  "\\frac{\\partial(\\phi_w\\rho_w)}{\\partial t} +\\left(\\phi_w\\rho_wv_i^w\\right)_{,i}=0"
                }
              </MathFormula>
              <p>{"Thus:"}</p>
              <MathFormula display>
                {"\\dot{\\phi}_w+\\left(\\phi_wv_i^w\\right)_{,i}=0"}
              </MathFormula>
              <p>{"Expanding:"}</p>
              <MathFormula display>
                {"\\dot{\\phi}_w+\\phi_{w,i}v_i^s+\\phi_wv_{i,i}^s+q_{i,i}=0"}
              </MathFormula>
              <p>
                {
                  "Since the solid and water phases together fill the mixture space:"
                }
              </p>
              <MathFormula display>{"\\phi_s+\\phi_w=1"}</MathFormula>
              <p>{"Therefore:"}</p>
              <MathFormula display>{"\\phi_w=1-\\phi_s"}</MathFormula>
              <p>{"The water mass conservation equation reduces to:"}</p>
              <MathFormula display>{"v_{i,i}^s+q_{i,i}=0"}</MathFormula>
              <p>{"Under small deformation:"}</p>
              <MathFormula display>{"v_i^s=\\dot{u}_i"}</MathFormula>
              <p>
                {
                  "Thus, the mixture mass conservation equation under approximately incompressible solid and water phases is:"
                }
              </p>
              <MathFormula display>{"\\dot{u}_{i,i}+q_{i,i}=0"}</MathFormula>
              <p>{"Substituting Darcy’s law:"}</p>
              <MathFormula display>{"q_i=-K_{ij}p_{w,j}"}</MathFormula>
              <p>{"into the mass conservation equation gives:"}</p>
              <MathFormula display>
                {"\\dot{u}_{i,i}-\\left(K_{ij}p_{w,j}\\right)_{,i}=0"}
              </MathFormula>
              <h4 className="mt-5 mb-3">
                {"7.3 Spatially Nonuniform Anisotropic Permeability"}
              </h4>
              <p>
                {
                  "Because the nonuniform magnetic field makes the fiber orientation distribution spatially dependent, the permeability also becomes a spatially dependent tensor field:"
                }
              </p>
              <MathFormula display>{"K_{ij}=K_{ij}(\\mathbf{x})"}</MathFormula>
              <p>
                {
                  "Considering the influence of fiber orientation on pore structure, the permeability tensor is defined as:"
                }
              </p>
              <MathFormula display>
                {
                  "K_{ij} = k_{\\perp}\\delta_{ij} +\\left(k_{\\parallel}-k_{\\perp}\\right)A_{ij}^{(2)}(\\mathbf{x})"
                }
              </MathFormula>
              <p>
                {"Here, "}
                <MathFormula>{"k_{\\parallel}"}</MathFormula>
                {" and "}
                <MathFormula>{"k_{\\perp}"}</MathFormula>
                {
                  " denote the permeabilities along and perpendicular to the dominant fiber orientation, respectively."
                }
              </p>
              <p>{"Using the product rule:"}</p>
              <MathFormula display>
                {
                  "\\left(K_{ij}p_{w,j}\\right)_{,i} = K_{ij,i}p_{w,j}+K_{ij}p_{w,ji}"
                }
              </MathFormula>
              <p>{"Therefore, the exact mass conservation equation is:"}</p>
              <MathFormula display>
                {"\\dot{u}_{i,i} -K_{ij,i}p_{w,j} -K_{ij}p_{w,ji}=0"}
              </MathFormula>
              <p>
                {"If "}
                <MathFormula>{"k_{\\parallel}"}</MathFormula>
                {" and "}
                <MathFormula>{"k_{\\perp}"}</MathFormula>
                {" are constants, then:"}
              </p>
              <MathFormula display>
                {
                  "K_{ij,i} = \\left(k_{\\parallel}-k_{\\perp}\\right)A_{ij,i}^{(2)}"
                }
              </MathFormula>
              <p>{"Thus:"}</p>
              <MathFormula display>
                {
                  "\\dot{u}_{i,i} -\\left(k_{\\parallel}-k_{\\perp}\\right)A_{ij,i}^{(2)}p_{w,j} -K_{ij}p_{w,ji}=0"
                }
              </MathFormula>
              <h4 className="mt-5 mb-3">
                {"7.4 Poroelastic Coupling between Water and Solid Phases"}
              </h4>
              <p>
                {
                  "The water phase acts on the solid through pore pressure. Using the Mow–Biot effective stress decomposition, the total stress can be written as:"
                }
              </p>
              <MathFormula display>
                {
                  "\\sigma_{ij}=\\sigma_{ij}^{\\mathrm{eff}}-\\alpha_Bp_w\\delta_{ij}"
                }
              </MathFormula>
              <p>
                {"Here, "}
                <MathFormula>{"\\sigma_{ij}^{\\mathrm{eff}}"}</MathFormula>
                {" is the effective solid stress and "}
                <MathFormula>{"\\alpha_B"}</MathFormula>
                {" is the Biot coefficient."}
              </p>
              <p>
                {
                  "For approximately incompressible, highly hydrated soft tissues, one may take:"
                }
              </p>
              <MathFormula display>{"\\alpha_B\\approx1"}</MathFormula>
              <p>{"Therefore:"}</p>
              <MathFormula display>
                {"\\sigma_{ij}=\\sigma_{ij}^{\\mathrm{eff}}-p_w\\delta_{ij}"}
              </MathFormula>
              <p>{"Since:"}</p>
              <MathFormula display>
                {"\\left(-p_w\\delta_{ij}\\right)_{,j}=-p_{w,i}"}
              </MathFormula>
              <p>
                {
                  "The pore water pressure eventually enters the force balance equation in the form of a pressure gradient."
                }
              </p>
              <h3 className="mt-5 mb-3">
                {"8. Photocrosslinking Free Energy"}
              </h3>
              <h4 className="mt-5 mb-3">
                {"8.1 Basic Idea of Photocrosslinking"}
              </h4>
              <p>
                {
                  "The fiber orientation probability distribution before photocrosslinking is:"
                }
              </p>
              <MathFormula display>
                {"\\rho_f^*(\\mathbf{x},\\mathbf{n})"}
              </MathFormula>
              <p>
                {
                  "The fiber orientation probability distribution after photocrosslinking is:"
                }
              </p>
              <MathFormula display>
                {"\\rho_f(\\mathbf{x},\\mathbf{n})"}
              </MathFormula>
              <p>{"The experimental process is:"}</p>
              <p>
                {
                  "Non-uniform magnetic field → Fe₃O₄–SELP fiber alignment → photocrosslinking → removal of the magnetic field"
                }
              </p>
              <p>
                {
                  "Therefore, before photocrosslinking, the nonuniform magnetic field first induces a spatially varying orientation distribution of Fe₃O₄–SELP magnetic fibers:"
                }
              </p>
              <MathFormula display>
                {
                  "\\rho_f^*(\\mathbf{x},\\mathbf{n}) = \\frac{\\alpha_f(\\mathbf{x})}{4\\pi\\sinh\\left(\\alpha_f(\\mathbf{x})\\right)} \\exp\\left[\\alpha_f(\\mathbf{x})h_i(\\mathbf{x})n_i\\right]"
                }
              </MathFormula>
              <p>
                {
                  "Photocrosslinking fixes this spatially nonuniform orientation structure, so that the magnetic-field-induced fiber orientation is retained after the field is removed."
                }
              </p>
              <h4 className="mt-5 mb-3">
                {"8.2 Photocrosslinking Free Energy"}
              </h4>
              <p>
                {
                  "To describe the locking effect of photocrosslinking on fiber orientation, we introduce the structural memory free energy per unit volume:"
                }
              </p>
              <MathFormula display>
                {
                  "\\psi_{\\mathrm{lock}} = \\frac12 N_f(\\mathbf{x})k_c\\eta_c \\int_{S^2} \\left[ \\rho_f(\\mathbf{x},\\mathbf{n})-\\rho_f^*(\\mathbf{x},\\mathbf{n}) \\right]^2 \\,d\\Omega"
                }
              </MathFormula>
              <p>{"where:"}</p>
              <MathFormula display>{"0\\leq\\eta_c\\leq1"}</MathFormula>
              <p>
                {
                  "is the dimensionless photocrosslinking degree parameter, and "
                }
                <MathFormula>{"k_c"}</MathFormula>
                {" is the orientation locking stiffness:"}
              </p>
              <p>
                {"The larger "}
                <MathFormula>{"k_c"}</MathFormula>
                {
                  " is, the more difficult it is for the fiber orientation to change."
                }
              </p>
              <h3 className="mt-5 mb-3">
                {"9. Total Free Energy per Unit Volume"}
              </h3>
              <h4 className="mt-5 mb-3">
                {"9.1 Before Photocrosslinking, with Magnetic Field"}
              </h4>
              <p>
                {
                  "Considering the non-fibrous SELP matrix, magnetic fibers, unpaired Fe₃O₄ particles, dipolar interactions, and pore fluid, before photocrosslinking, the total free energy per unit volume can be written as:"
                }
              </p>
              <MathFormula display>
                {
                  "\\begin{aligned} \\psi={}& \\phi_m\\left[ \\frac{1}{2}\\lambda_m\\varepsilon_{kk}\\varepsilon_{ll} +\\mu_m\\varepsilon_{ij}\\varepsilon_{ij} \\right]\\\\ &+\\frac{1}{2}\\phi_fE_fA_{ijkl}^{(4)}\\varepsilon_{ij}\\varepsilon_{kl}\\\\ &+\\psi_{\\mathrm{dip}}\\\\ &+N_f\\left[ k_BT\\int_{S^2}\\rho_f\\ln\\rho_f\\,d\\Omega -\\mu_0m_fH\\int_{S^2}\\rho_fh_in_i\\,d\\Omega \\right]\\\\ &-N_pk_BT\\ln\\left(\\frac{\\sinh\\xi_p}{\\xi_p}\\right)\\\\ &-p_w\\varepsilon_{kk}. \\end{aligned}"
                }
              </MathFormula>
              <MathFormula display>
                {
                  "\\begin{aligned} \\sigma_{ij}={}& \\phi_m\\left( \\lambda_m\\varepsilon_{kk}\\delta_{ij} +2\\mu_m\\varepsilon_{ij} \\right)+\\phi_fE_fA_{ijkl}^{\\mathrm{ref}}(\\mathbf{x})\\varepsilon_{kl} -p_w\\delta_{ij}. \\end{aligned}"
                }
              </MathFormula>
              <p>
                {
                  "Here, the dimensionless magnetic field parameter for unpaired Fe₃O₄ nanoparticles is:"
                }
              </p>
              <MathFormula display>
                {"\\xi_p(\\mathbf{x})=\\frac{\\mu_0m_pH(\\mathbf{x})}{k_BT}"}
              </MathFormula>
              <p>
                {
                  "The magnetic-field-induced reference fiber orientation distribution is:"
                }
              </p>
              <MathFormula display>
                {
                  "\\rho_f^*(\\mathbf{x},\\mathbf{n}) = \\frac{ \\exp\\left[\\alpha_f(\\mathbf{x})h_i(\\mathbf{x})n_i\\right] }{ 4\\pi\\sinh\\left(\\alpha_f(\\mathbf{x})\\right)/\\alpha_f(\\mathbf{x}) }"
                }
              </MathFormula>
              <p>{"where:"}</p>
              <MathFormula display>
                {"\\alpha_f(\\mathbf{x})=\\frac{\\mu_0m_fH(\\mathbf{x})}{k_BT}"}
              </MathFormula>
              <p>
                {
                  "denotes the dimensionless magnetic field strength of magnetic fibers in the local field."
                }
              </p>
              <h4 className="mt-5 mb-3">
                {"9.2 Reference Orientation Structure after Photocrosslinking"}
              </h4>
              <p>
                {
                  "After photocrosslinking, the fiber orientation is fixed. Therefore, in the subsequent mechanical loading stage under the small-deformation approximation, the fiber orientation distribution can be treated as a known spatial field in the reference configuration:"
                }
              </p>
              <MathFormula display>
                {
                  "\\rho_f^{\\mathrm{ref}}(\\mathbf{x},\\mathbf{n}) = \\rho_f^*(\\mathbf{x},\\mathbf{n})"
                }
              </MathFormula>
              <p>
                {
                  "This represents the magnetic-field-induced orientation structure frozen by photocrosslinking."
                }
              </p>
              <p>
                {"The reference fourth-order orientation tensor is defined as:"}
              </p>
              <MathFormula display>
                {
                  "A_{ijkl}^{\\mathrm{ref}}(\\mathbf{x}) = \\int_{S^2} \\rho_f^{\\mathrm{ref}}(\\mathbf{x},\\mathbf{n}) n_in_jn_kn_l\\,d\\Omega"
                }
              </MathFormula>
              <p>
                {"Thus, in subsequent finite element mechanical analysis, "}
                <MathFormula>{"\\rho_f^{\\mathrm{ref}}"}</MathFormula>
                {
                  " no longer needs to be solved as an additional unknown field; "
                }
                <MathFormula>
                  {"A_{ijkl}^{\\mathrm{ref}}(\\mathbf{x})"}
                </MathFormula>
                {
                  " can be directly used as a spatially nonuniform material parameter."
                }
              </p>
              <h4 className="mt-5 mb-3">
                {
                  "9.3 After Photocrosslinking and Removal of the Magnetic Field"
                }
              </h4>
              <p>
                {
                  "After photocrosslinking and removal of the magnetic field, the free energy per unit volume is:"
                }
              </p>
              <MathFormula display>
                {
                  "\\begin{aligned} \\psi={}& \\phi_m\\left[ \\frac{1}{2}\\lambda_m\\varepsilon_{kk}\\varepsilon_{ll} +\\mu_m\\varepsilon_{ij}\\varepsilon_{ij} \\right]\\\\ &+\\frac{1}{2}\\phi_fE_fA_{ijkl}^{(4)}\\varepsilon_{ij}\\varepsilon_{kl}\\\\ &+\\psi_{\\mathrm{dip}}\\\\ &+N_f\\left[ k_BT\\int_{S^2}\\rho_f\\ln\\rho_f\\,d\\Omega \\right]\\\\ &-p_w\\varepsilon_{kk}. \\end{aligned}"
                }
              </MathFormula>
              <p>{"The total stress can be written as:"}</p>
              <MathFormula display>
                {
                  "\\begin{aligned} \\sigma_{ij}={}& \\phi_m\\left( \\lambda_m\\varepsilon_{kk}\\delta_{ij} +2\\mu_m\\varepsilon_{ij} \\right)\\\\ &+\\phi_fE_fA_{ijkl}^{\\mathrm{ref}}(\\mathbf{x})\\varepsilon_{kl}\\\\ &+\\sigma_{ij}^{\\mathrm{dip}} -p_w\\delta_{ij}. \\end{aligned}"
                }
              </MathFormula>
              <p>
                {
                  "Here, the stress corresponding to dipolar interactions is defined as:"
                }
              </p>
              <MathFormula display>
                {
                  "\\sigma_{ij}^{\\mathrm{dip}} = \\frac{\\partial\\psi_{\\mathrm{dip}}}{\\partial\\varepsilon_{ij}}"
                }
              </MathFormula>
              <p>
                {
                  "If magnetic nanoparticle interactions are neglected after removing the field, one may take:"
                }
              </p>
              <MathFormula display>
                {"\\sigma_{ij}^{\\mathrm{dip}}=0"}
              </MathFormula>
              <p>{"Then the total stress simplifies to:"}</p>
              <MathFormula display>
                {
                  "\\begin{aligned} \\sigma_{ij}={}& \\phi_m\\left( \\lambda_m\\varepsilon_{kk}\\delta_{ij} +2\\mu_m\\varepsilon_{ij} \\right)+\\phi_fE_fA_{ijkl}^{\\mathrm{ref}}(\\mathbf{x})\\varepsilon_{kl} -p_w\\delta_{ij}. \\end{aligned}"
                }
              </MathFormula>
              <h3 className="mt-5 mb-3">
                {
                  "10. Mechanical Equilibrium , Finite Element Governing Equations and Simulation"
                }
              </h3>
              <p>
                {
                  "Under quasi-static conditions with inertia neglected, the material satisfies:"
                }
              </p>
              <MathFormula display>{"\\sigma_{ij,j}+b_i=0"}</MathFormula>
              <p>
                {"where "}
                <MathFormula>{"b_i"}</MathFormula>
                {" is the body force per unit volume."}
              </p>
              <p>
                {
                  "After removing the magnetic field, completing photocrosslinking, and applying mechanical loading, the model satisfies:"
                }
              </p>
              <MathFormula display>
                {
                  "\\begin{aligned} \\sigma_{ij,j}+b_i&=0,\\\\ \\sigma_{ij}&= \\phi_m\\left( \\lambda_m\\varepsilon_{kk}\\delta_{ij} +2\\mu_m\\varepsilon_{ij} \\right) +\\phi_fE_fA_{ijkl}^{\\mathrm{ref}}(\\mathbf{x})\\varepsilon_{kl} -p_w\\delta_{ij},\\\\ \\varepsilon_{ij}&=\\frac{1}{2}\\left(u_{i,j}+u_{j,i}\\right),\\\\ \\dot{u}_{i,i}+q_{i,i}&=0, \\\\ q_i&=-K_{ij}p_{w,j}. \\end{aligned}"
                }
              </MathFormula>
              <p>
                {
                  "Here, the reference orientation tensor is determined by the fiber orientation induced by the nonuniform magnetic field:"
                }
              </p>
              <MathFormula display>
                {
                  "A_{ijkl}^{\\mathrm{ref}}(\\mathbf{x}) = \\int_{S^2} \\rho_f^*(\\mathbf{x},\\mathbf{n}) n_in_jn_kn_l\\,d\\Omega"
                }
              </MathFormula>
              <p>
                {
                  "The magnetic-field-induced reference fiber orientation distribution is:"
                }
              </p>
              <MathFormula display>
                {
                  "\\rho_f^*(\\mathbf{x},\\mathbf{n}) = \\frac{ \\exp\\left[\\alpha_f(\\mathbf{x})h_i(\\mathbf{x})n_i\\right] }{ 4\\pi\\sinh\\left(\\alpha_f(\\mathbf{x})\\right)/\\alpha_f(\\mathbf{x}) }"
                }
              </MathFormula>
              <p>{"where:"}</p>
              <MathFormula display>
                {"\\alpha_f(\\mathbf{x})=\\frac{\\mu_0m_fH(\\mathbf{x})}{k_BT}"}
              </MathFormula>
              <p>
                {
                  "For steady state, no external body force, and stress loading on the boundary, the equations and boundary conditions are:"
                }
              </p>
              <MathFormula display>
                {
                  "\\begin{aligned} \\sigma_{ij,j}&=0,\\\\ \\sigma_{ij}&= \\phi_m\\left( \\lambda_m\\varepsilon_{kk}\\delta_{ij} +2\\mu_m\\varepsilon_{ij} \\right) +\\phi_fE_fA_{ijkl}^{\\mathrm{ref}}(\\mathbf{x})\\varepsilon_{kl} -p_w\\delta_{ij},\\\\ \\varepsilon_{ij}&=\\frac{1}{2}\\left(u_{i,j}+u_{j,i}\\right),\\\\ q_{i,i}&=0,\\\\ q_i&=-K_{ij}p_{w,j}. \\end{aligned}"
                }
              </MathFormula>
              <p>
                {
                  "We completed the magnetic field simulation using COMSOL and MATLAB."
                }
              </p>
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/model/b-field.avif"
                alt="Magnetic field simulation"
                width={680}
              />
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/model/b-xz-y-0-000mm.avif"
                alt="Magnetic field simulation"
                width={680}
              />
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/model/b-yz-x-0-000mm.avif"
                alt="Magnetic field simulation"
                width={680}
              />
              <p>
                {
                  "After this, we imported the magnetic field results and compressive modulus data into the MATLAB code we wrote to complete the computational simulation of the hydrogel in an anisotropic magnetic field."
                }
              </p>
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/model/fiber-axial-strain-epsf.avif"
                alt="Magnetic field simulation"
                width={680}
              />
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/model/magnetic-field-h-x.avif"
                alt="Magnetic field simulation"
                width={680}
              />
              <ModelFigure
                src="https://static.igem.wiki/teams/6102/wiki/images/model/model/e-z-local-young-modulus.avif"
                alt="Magnetic field simulation"
                width={680}
              />
              <h3 className="mt-5 mb-3">{"Code"}</h3>
              <h4 className="mt-5 mb-3">{"References"}</h4>
              <p>
                {
                  "[1] Mow, V. C., Kuei, S. C., Lai, W. M., Armstrong, C. G. (1980). Biphasic Creep and Stress Relaxation of Articular Cartilage in Compression: Theory and Experiments. "
                }
                <em>{"Journal of Biomechanical Engineering"}</em>
                {", 102, 73–84. DOI: 10.1115/1.3138202"}
              </p>
              <p>
                {
                  "[2] Wilson, W., van Donkelaar, C. C., van Rietbergen, B., Ito, K., Huiskes, R. (2004). Stresses in the local collagen network of articular cartilage: a poroviscoelastic fibril-reinforced finite element study. "
                }
                <em>{"Journal of Biomechanics"}</em>
                {", 37(3), 357–366. DOI: 10.1016/S0021-9290(03)00267-7"}
              </p>
              <p>
                {
                  "[3] Wilson, W., van Donkelaar, C. C., van Rietbergen, B., Huiskes, R. (2005). A fibril-reinforced poroviscoelastic swelling model for articular cartilage. "
                }
                <em>{"Journal of Biomechanics"}</em>
                {", 38(6), 1195–1204. DOI: 10.1016/j.jbiomech.2004.07.003"}
              </p>
              <p>
                {
                  "[4] Doi, M., Edwards, S. F. (1978). Dynamics of Rod-Like Macromolecules in Concentrated Solution. Part 1. "
                }
                <em>
                  {"Journal of the Chemical Society, Faraday Transactions 2"}
                </em>
                {", 74, 560–570. DOI: 10.1039/F29787400560"}
              </p>
              <p>
                {
                  "[5] Doi, M., Edwards, S. F. (1978). Dynamics of Rod-Like Macromolecules in Concentrated Solution. Part 2. "
                }
                <em>
                  {"Journal of the Chemical Society, Faraday Transactions 2"}
                </em>
                {", 74, 918–932. DOI: 10.1039/F29787400918"}
              </p>
              <p>
                {
                  "[6] Langevin, P. (1905). Magnétisme et théorie des électrons. "
                }
                <em>{"Annales de Chimie et de Physique"}</em>
                {"."}
              </p>
              <p>
                {
                  "[7] Ivanov, A. O., Kuznetsova, O. B. (2001). Magnetic properties of dense ferrofluids: An influence of interparticle correlations. "
                }
                <em>{"Physical Review E"}</em>
                {", 64, 041405. DOI: 10.1103/PhysRevE.64.041405"}
              </p>
              <p>
                {
                  "[8] Ferrofluids and bio-ferrofluids: looking back and stepping forward. "
                }
                <em>{"Nanoscale"}</em>
                {" (2022). DOI: 10.1039/D1NR05841J"}
              </p>
              <p>
                {
                  "[9] Zhang, Y.-N., Avery, R. K., Vallmajo-Martin, Q., et al. (2015). A Highly Elastic and Rapidly Crosslinkable Elastin-Like Polypeptide-Based Hydrogel for Biomedical Applications. "
                }
                <em>{"Advanced Functional Materials"}</em>
                {", 25, 4814–4826. DOI: 10.1002/adfm.201501489"}
              </p>
              <p>
                {
                  "[10] Mow, V. C., Holmes, M. H., & Lai, W. M. (1984). Fluid transport and mechanical properties of articular cartilage: A review. "
                }
                <em>{"Journal of Biomechanics"}</em>
                {", 17(5), 377–394."}
              </p>
              <p>
                {
                  "[11] Spilker, R. L., Suh, J. K., & Mow, V. C. (1992). A finite element analysis of the indentation stress-relaxation response of linear biphasic articular cartilage. "
                }
                <em>{"Journal of Biomechanical Engineering"}</em>
                {", 114(2), 191–201."}
              </p>
            </>
          )}
        </article>
      </div>
    </div>
  );
}
