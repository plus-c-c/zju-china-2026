/* AUTO-GENERATED from model.tsx (Model 1 — SELP Hydrogel Modeling). */

export interface M1Part {
  t: "text" | "math" | "em" | "strong" | "link";
  v: string;
  href?: string;
}

export interface M1Block {
  t: "h3" | "h4" | "p" | "display" | "figure";
  v?: string;
  parts?: M1Part[];
  src?: string;
  alt?: string;
  width?: number;
}

export interface M1Step {
  num: number;
  title: string;
  blocks: M1Block[];
}

export const m1Title = "SELP Hydrogel Modeling";

export const m1Overview: M1Block[] = [
  {
    t: "h3",
    v: "Overview",
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "Our wet-lab work has completed the production and mechanical characterization of the 2KY5 protein. However, limitations in production conditions, experimental timelines, and cost make it difficult to produce and mechanically characterize proteins with different numbers of repeat units within the project timeframe. We therefore introduced computational modeling, using existing experimental data as a reference and combining molecular dynamics simulations with network analysis to predict the crosslinked networks and mechanical responses of different constructs. This approach provides a basis for subsequent protein design, candidate screening, and experimental validation.",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "Starting from the protein sequence, we first performed conformational simulations of individual protein chains, followed by coarse-grained simulations. We then constructed hydrated multichain networks, used molecular dynamics (MD) to observe their structural evolution, and calculated the strain response of fixed configurations.",
      },
    ],
  },
  {
    t: "figure",
    src: "https://static.igem.wiki/teams/6102/wiki/images/model/selp/1.avif",
    alt: "Workflow for SELP hydrogel modeling",
    width: 840,
  },
  {
    t: "p",
    parts: [
      {
        t: "em",
        v: "Figure 1 | Schematic overview of the complete workflow. ",
      },
    ],
  },
  {
    t: "h3",
    v: "Model development",
  },
];

export const m1Steps: M1Step[] = [
  {
    num: 1,
    title: "Generating Protein Conformations from Primary Sequences",
    blocks: [
      {
        t: "p",
        parts: [
          {
            t: "strong",
            v: "We first required protein structures suitable for placement in a simulation box.",
          },
          {
            t: "text",
            v: " The initial single-chain simulations started from extended structures constructed in UCSF ChimeraX. Simulations were performed in NAMD using the CHARMM36m force field, generalized Born implicit solvent (GBIS), and TIGER2 enhanced sampling. Four replicas covered a temperature range of 280–400 K, with each replica simulated for 100 ns.[1, 2]",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "em",
            v: "Video: | 2KY16 100 ns FAMD",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Taking 2KY5 as an example, we extracted 100 frames from the final portion of the 280 K trajectory and clustered them according to the root-mean-square deviation (RMSD) of their Cα atoms. A cutoff of 6 Å was used to select representative conformations.",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "strong",
            v: "We subsequently used martinize2 to generate Martini 3 coarse-grained models, enabling network simulations containing several protein chains, explicit solvent, and ions.",
          },
          {
            t: "text",
            v: "[3] Each 2KY5 and 2KY10 chain comprised 579 and 964 coarse-grained beads, respectively. By adjusting the simulation-box volume and performing subsequent relaxation, we brought the mass concentrations of both systems close to 100 mg/mL.",
          },
        ],
      },
    ],
  },
  {
    num: 2,
    title: "From Single-Chain Conformations to a Complete Network",
    blocks: [
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Because hydrogel solidification in our experiments primarily relies on crosslinking between tyrosine residues, ",
          },
          {
            t: "strong",
            v: "we used covalent bonds between tyrosine residues as the basis for network connectivity",
          },
          {
            t: "text",
            v: ". Initially, candidate tyrosine crosslinking sites were guided into proximity based on their spatial separation and steric hindrance, and covalent connections were established, followed by energy minimization and relaxation. We then examined crosslink distances and intrachain deformation to avoid pursuing increased connectivity while overlooking the associated structural cost.[4] Covalent connections were represented using GROMACS type 6 harmonic bonds:",
          },
        ],
      },
      {
        t: "display",
        v: "U_{\\mathrm{cross}}(r) =\\frac{1}{2}k_{\\mathrm{MD}}(r-r_0)^2",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Here, ",
          },
          {
            t: "math",
            v: "r",
          },
          {
            t: "text",
            v: " is the distance between the crosslinked beads, the equilibrium distance is ",
          },
          {
            t: "math",
            v: "r_0=0.35\\ \\mathrm{nm}",
          },
          {
            t: "text",
            v: ", and the force constant is ",
          },
          {
            t: "math",
            v: "k_{\\mathrm{MD}}=4000\\ \\mathrm{kJ,mol^{-1},nm^{-2}}",
          },
          {
            t: "text",
            v: ".",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The guiding procedure used a flat-bottom distance potential in GROMACS to bring the selected sites closer together.",
          },
        ],
      },
      {
        t: "display",
        v: "U_{\\mathrm{guide}}(r)= \\begin{cases} 0,&r\\leq r_g\\\\ \\frac12k_g(r-r_g)^2,&r>r_g \\end{cases} \\qquad r_g=0.45\\ \\mathrm{nm}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: ".",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Inspection of the connectivity revealed an issue requiring improvement: local chain clusters could become connected, and the network could exhibit periodic wrapping, while some chains remained outside the overall crosslinked network. We therefore prioritized connections between different chain clusters in subsequent steps. When suitable candidate sites were unavailable, the clusters were guided closer together and the connectivity checks were repeated.",
          },
        ],
      },
      {
        t: "figure",
        src: "https://static.igem.wiki/teams/6102/wiki/images/model/selp/2.avif",
        alt: "Initial configurations of the two SELP systems",
        width: 840,
      },
      {
        t: "p",
        parts: [
          {
            t: "em",
            v: "Figure 2 | Initial states of the two systems.",
          },
        ],
      },
    ],
  },
  {
    num: 3,
    title: "Assessing Network Stability through Molecular Dynamics Sampling",
    blocks: [
      {
        t: "p",
        parts: [
          {
            t: "strong",
            v: "After constructing the complete crosslinked networks, we fixed the crosslink topology and performed sampling",
          },
          {
            t: "text",
            v: ", progressively extending the simulations from short relaxation runs to 4 ns each. Sampling statistics were collected from the trajectories between 2 and 4 ns, with the simulations performed in 500 ps segments.",
          },
        ],
      },
      {
        t: "figure",
        src: "https://static.igem.wiki/teams/6102/wiki/images/model/selp/3.avif",
        alt: "Final configurations of the SELP sampling runs",
        width: 840,
      },
      {
        t: "p",
        parts: [
          {
            t: "em",
            v: "Figure 3 | Final configurations at 4 ns for the three sampling runs of each system.",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "We also checked the temperature, concentration, crosslink distances, and checkpoint-based continuation. Mean temperatures over the final 250 ps of each stage ranged from 310.03 to 310.31 K, and mean concentrations ranged from 100.017 to 100.066 mg/mL. Tyrosine crosslink distances recorded across all logs ranged from 0.295 to 0.470 nm.",
          },
        ],
      },
      {
        t: "figure",
        src: "https://static.igem.wiki/teams/6102/wiki/images/model/selp/4.avif",
        alt: "Temperature, concentration and crosslink statistics",
        width: 840,
      },
      {
        t: "p",
        parts: [
          {
            t: "em",
            v: "Figure 4 | Statistics over the 2–4 ns simulation interval. Faint traces show data at 1 ps resolution, while darker traces show data at 20 ps resolution.",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "However, we found that the hydrogel stiffness still exhibited substantial temporal drift. To address the incomplete convergence of stiffness, we extended the sampling duration, but the improvement remained unsatisfactory. We therefore turned to computational analyses of the sources of structural instability and the key factors affecting stability.",
          },
        ],
      },
    ],
  },
  {
    num: 4,
    title: "Correction of Network Stability",
    blocks: [
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "In addition to permanent crosslinks, noncovalent interactions exist between protein chains. ",
          },
          {
            t: "strong",
            v: "To compare the crosslinked networks formed by proteins with different repeat lengths, we constructed simplified static elastic networks based on existing molecular dynamics endpoint configurations.",
          },
          {
            t: "text",
            v: " This approach draws on elastic network models that describe the small-deformation response of proteins using harmonic interactions, retaining permanent crosslinks and introducing additional effective connections based on interchain spatial contacts[5]. By allowing protein-chain translations, rotations, and the remaining strain components to relax, we calculated the effective axial stiffness of the network. The underlying energy-minimization approach is consistent with nonaffine elasticity theory.",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "For each prespecified MD endpoint configuration, intrachain coordinates were first unwrapped across periodic boundaries. Interchain protein-bead pairs separated by no more than 0.6 nm were then identified using the minimum-image distance. Bead pairs already included as permanent crosslinks were not added again. Each bead pair constituted a candidate contact, but these contacts were not necessarily associated with tyrosine residues and did not represent newly formed chemical bonds.",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "We defined all candidate contacts between the same pair of protein chains as a single interface. Each interface contained multiple tyrosine contact regions. A maximum distance constraint of 0.6 nm was applied, and contact selection was determined by the spatial dispersion of the candidate-contact midpoints. Ties were resolved using canonical bead indices, and quantitative endpoint calculations were performed using coordinates from binary checkpoint (CPT) files.",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "strong",
            v: "By refining this network-construction method, we corrected the network stability.",
          },
        ],
      },
    ],
  },
  {
    num: 5,
    title: "Network Compression and Modulus Calculation",
    blocks: [
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Initially, we directly applied axial tension and compression to the periodic simulation box and then held the box shape fixed to record stress relaxation. The original system used Hencky strain with a deformation range of ±0.20, followed by 0.5 ns of relaxation after each strain increment of ±0.05:",
          },
        ],
      },
      {
        t: "display",
        v: "\\varepsilon_H=\\ln\\frac{L_z'}{L_{z,0}},\\qquad L_z'=L_{z,0}e^{\\varepsilon_H},\\qquad L_x'=L_{x,0}e^{-\\varepsilon_H/2},\\qquad L_y'=L_{y,0}e^{-\\varepsilon_H/2}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The symbols are defined as follows:",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "ith negative Hencky strain indicating compression. In the initial MD analysis, directional stress differences were calculated from the pressure tensor, with tension defined as positive:",
          },
        ],
      },
      {
        t: "display",
        v: "s_i=-100\\left(P_{ii}-\\frac{P_{jj}+P_{kk}}{2}\\right) \\quad[\\mathrm{kPa}]",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "These calculations were used to examine stress and relaxation after deformation. However, they did not correspond to our actual conditions, ",
          },
          {
            t: "strong",
            v: "so we defined compression as a virtual small-strain test of a fixed network.",
          },
        ],
      },
      {
        t: "display",
        v: "\\eta=\\frac{L_{z,0}-L_z}{L_{z,0}}=-\\varepsilon_{zz}>0, \\qquad \\eta\\rightarrow0",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "An infinitesimal compression was applied along the Z direction. Rigid-body translations and small rotations of individual chains were allowed, and the remaining five strain components were released, enabling the network to reach the minimum energy within the model at the prescribed axial strain.[6] Transverse deformation was determined by the solution, without imposing volume conservation. After converting to consistent units and expressing the energy density in kPa, the model yielded:",
          },
        ],
      },
      {
        t: "display",
        v: "\\mathcal W(\\eta)=\\frac12 E_0\\eta^2,\\qquad \\sigma_c=\\frac{\\partial\\mathcal W}{\\partial\\eta},\\qquad E_0=\\left.\\frac{\\partial\\sigma_c}{\\partial\\eta}\\right|_{\\eta=0}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Here, ",
          },
          {
            t: "math",
            v: "\\mathcal W",
          },
          {
            t: "text",
            v: " is the energy density after eliminating the chain-motion degrees of freedom and the freely relaxing strain components, and ",
          },
          {
            t: "math",
            v: "\\sigma_c",
          },
          {
            t: "text",
            v: " is the incremental stress defined as positive in compression. This energy curvature was calculated directly using singular value decomposition (SVD) and Schur-complement reduction. In the present linear model without prestress, positive and negative infinitesimal strains have the same tangent stiffness.",
          },
        ],
      },
    ],
  },
  {
    num: 6,
    title: "Correction of Results",
    blocks: [
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "We found discrepancies between the simulation results and the wet-lab results and therefore introduced correction parameters for empirical calibration. After correction, a single shared scaling factor brought the mean values of both systems within 5% of the experimental values. We therefore used a shared scaling factor and an additive term for empirical calibration:",
          },
        ],
      },
      {
        t: "display",
        v: "E_{\\mathrm{emp}}=aE_0+b",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Here, ",
          },
          {
            t: "math",
            v: "E_0",
          },
          {
            t: "text",
            v: " is the original static calculation result, ",
          },
          {
            t: "math",
            v: "a",
          },
          {
            t: "text",
            v: " is a dimensionless scaling factor, and ",
          },
          {
            t: "math",
            v: "b",
          },
          {
            t: "text",
            v: " is expressed in kPa. Calibration using the equally weighted means of the three branches for each system yielded:",
          },
        ],
      },
      {
        t: "display",
        v: "a=1.895,\\qquad b=19.793\\ \\mathrm{kPa}",
      },
      {
        t: "figure",
        src: "https://static.igem.wiki/teams/6102/wiki/images/model/selp/5.avif",
        alt: "Calculated compressive moduli",
        width: 680,
      },
      {
        t: "p",
        parts: [
          {
            t: "em",
            v: "Figure 5 | Compressive modulus data after correction. A, B, and C represent three replicates.",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Ultimately, through simulation, we developed a computational modeling method that agreed with the wet-lab results. We also used 2KY16 to validate the computational modeling, ",
          },
          {
            t: "strong",
            v: "and the final validation results were consistent with the wet-lab measurements.",
          },
        ],
      },
    ],
  },
  {
    num: 7,
    title: "How modeling connects to the wet lab",
    blocks: [
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "During model development, the wet-lab experiments provided measured mechanical modulus data for the calibration of 2KY5 and 2KY10. By fitting these data, we adjusted the parameters used in the calculations and successfully implemented the simulations.",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "We applied the modeling method to 2KY16 to predict the mechanical properties of its hydrogel. Wet-lab experiments were conducted in parallel to validate the predictions. The results showed that the relative error between the predicted mechanical modulus and the wet-lab measurement was [percentage to be specified]%, demonstrating the reliability of our modeling method.",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "strong",
            v: "Meanwhile, we established links between the modeling and wet-lab experiments through concentration, crosslinking fraction, and related parameters.",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "em",
            v: "Table 1 | Comparison of wet-lab and modeling conditions.",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The experimental reference values were obtained from compression tests on hydrated samples at a concentration of approximately 100 mg/mL. The specimens were approximately 10 mm in height and were compressed to 30% strain at a crosshead speed of 1 mm/min. Fitting was performed over the 5–15% strain interval.",
          },
          {
            t: "strong",
            v: " The wet-lab results are presented below:",
          },
        ],
      },
      {
        t: "figure",
        src: "https://static.igem.wiki/teams/6102/wiki/images/model/selp/6.avif",
        alt: "Experimental stress–strain curves",
        width: 680,
      },
      {
        t: "p",
        parts: [
          {
            t: "em",
            v: "Figure 6 | Experimentally measured stress–strain curves. ",
          },
        ],
      },
      {
        t: "figure",
        src: "https://static.igem.wiki/teams/6102/wiki/images/model/selp/7.avif",
        alt: "Experimental Young’s moduli",
        width: 680,
      },
      {
        t: "p",
        parts: [
          {
            t: "em",
            v: "Figure 7 | Experimentally measured compressive moduli.  ",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Our modeling approach integrates these parameters to predict the crosslinked networks and mechanical responses of different constructs, providing a basis for subsequent protein design, candidate screening, and experimental validation.",
          },
        ],
      },
    ],
  },
];

export const m1References: M1Block[] = [
  {
    t: "h3",
    v: "References",
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "[1] Huang J, Rauscher S, Nawrocki G, et al. CHARMM36m: an improved force field for folded and intrinsically disordered proteins. ",
      },
      {
        t: "em",
        v: "Nature Methods",
      },
      {
        t: "text",
        v: ". 2017;14:71–73. ",
      },
      {
        t: "link",
        v: "https://doi.org/10.1038/nmeth.4067",
        href: "https://doi.org/10.1038/nmeth.4067",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "[2] Li X, Latour RA, Stuart SJ. TIGER2: An improved algorithm for temperature intervals with global exchange of replicas. ",
      },
      {
        t: "em",
        v: "The Journal of Chemical Physics",
      },
      {
        t: "text",
        v: ". 2009;130:174106. ",
      },
      {
        t: "link",
        v: "https://doi.org/10.1063/1.3129342",
        href: "https://doi.org/10.1063/1.3129342",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "[3] Souza PCT, Alessandri R, Barnoud J, et al. Martini 3: a general purpose force field for coarse-grained molecular dynamics. ",
      },
      {
        t: "em",
        v: "Nature Methods",
      },
      {
        t: "text",
        v: ". 2021;18:382–388. ",
      },
      {
        t: "link",
        v: "https://doi.org/10.1038/s41592-021-01098-3",
        href: "https://doi.org/10.1038/s41592-021-01098-3",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "[4] Newman MEJ, Ziff RM. Fast Monte Carlo algorithm for site or bond percolation. ",
      },
      {
        t: "em",
        v: "Physical Review E",
      },
      {
        t: "text",
        v: ". 2001;64:016706. ",
      },
      {
        t: "link",
        v: "https://doi.org/10.1103/PhysRevE.64.016706",
        href: "https://doi.org/10.1103/PhysRevE.64.016706",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "[5] Tirion MM. Large Amplitude Elastic Motions in Proteins from a Single-Parameter, Atomic Analysis. ",
      },
      {
        t: "em",
        v: "Physical Review Letters",
      },
      {
        t: "text",
        v: ". 1996;77:1905–1908. ",
      },
      {
        t: "link",
        v: "https://doi.org/10.1103/PhysRevLett.77.1905",
        href: "https://doi.org/10.1103/PhysRevLett.77.1905",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "[6] Lemaître A, Maloney C. Sum Rules for the Quasi-Static and Visco-Elastic Response of Disordered Solids at Zero Temperature. ",
      },
      {
        t: "em",
        v: "Journal of Statistical Physics",
      },
      {
        t: "text",
        v: ". 2006;123:415–453. ",
      },
      {
        t: "link",
        v: "https://doi.org/10.1007/s10955-005-9015-5",
        href: "https://doi.org/10.1007/s10955-005-9015-5",
      },
    ],
  },
];
