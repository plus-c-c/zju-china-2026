/* AUTO-GENERATED from model.tsx (Model 3 section) — content data for model3.tsx. */

export interface M3Part {
  t: "text" | "math" | "em" | "link" | "strong";
  v: string;
  href?: string;
}

export interface M3Block {
  t: "h4" | "p" | "display" | "figure";
  v?: string;
  parts?: M3Part[];
  src?: string;
  alt?: string;
  width?: number;
  /** Visible caption shown under the figure. */
  caption?: string;
}

export interface M3Step {
  num: number;
  title: string;
  goal: string;
  term: string | null;
  key: number;
  blocks: M3Block[];
}

export const m3Title =
  "Modeling of Magnetic-Field-Induced SELP–Fe₃O₄ Multiphase Poroelasticity";

export const m3Overview: M3Block[] = [
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "In our previous modeling, we mainly simulated the mechanical properties of the hydrogel platform we fabricated. In our project, after the incorporation of magnetic nanoparticles, the mechanical properties of the hydrogel also change, and anisotropy is induced. Therefore, we simulated the mechanical properties of the hydrogel that became anisotropic after the introduction of magnetic nanoparticles.",
      },
    ],
  },
];

export const m3Question: M3Block[] = [
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "In the preceding modeling of 2KY10-SELP single-chain conformations, Martini coarse-grained multichain systems, and tyrosine crosslink networks, the system was treated primarily as a protein network in water. When Fe₃O₄ nanoparticles are introduced and magnetic-field-driven orientation and dipolar interactions are considered, the system can no longer be described by a single protein network alone. It must instead be extended to a multiphase composite description.",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "In addition to the need to distinguish paired Fe₃O₄ from free Fe₃O₄ after nanoparticle incorporation, three further reasons require lifting the description from fully atomistic/Martini molecular simulations to a four-phase macroscopic level:",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "1. The computational cost of the hydrogel is too high. Fully atomistic and Martini simulations are suitable for single-chain conformations, local crosslink topology, and short-time stress relaxation. However, an experimental-scale hydrogel contains a large number of protein chains, water, ions, and nanoparticles. Tracking every atom or coarse-grained bead while covering macroscopic sample dimensions, long-time network rearrangements, and external-field responses would be computationally prohibitive. The system therefore needs to be coarse-grained into macroscopic phases described by volume fractions and mean-field quantities.",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "2. The magnetic field introduces macroscopic anisotropy. An external magnetic field induces dipolar interactions among Fe₃O₄ particles and orientational alignment of fibers and particles. The material is then no longer isotropic; mechanical moduli, magnetic response, and load-bearing capacity of the crosslinked network may all become direction-dependent. The four-phase system can describe the paired fiber phase, free particle phase, non-fibrous matrix, and water phase separately, with orientational and dipolar terms explicitly representing macroscopic anisotropy.",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "3. Statistical nature. The modulus, crosslinking fraction, and magnetic response of a hydrogel are inherently statistical averages over many chains, crosslink points, particles, and water molecules, rather than properties of a single chain or a single particle. The four-phase model describes the system using statistical quantities such as volume fractions, making it better suited for comparison with the bulk material properties measured in wet-lab experiments.",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "Therefore, the four-phase system does not replace the preceding TIGER2 FAMD and Martini simulations. Instead, it takes their outputs—single-chain conformations, crosslink endpoints, and local mechanical parameters—and coarse-grains them upward into a macroscopic statistical description.",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "We aim to establish a continuum model that connects magnetic-field-induced fiber orientation, photochemical crosslinking locking, and poroelastic mechanical response. The model treats the SELP–Fe₃O₄ system as a four-phase mixture. Its goal is to incorporate magnetic fiber orientation under a nonuniform field, Langevin magnetization of free Fe₃O₄ particles, pore water pressure, and the reference orientation structure after photocrosslinking into a single volume-averaged free energy, and then to derive stress–strain–pore-pressure governing equations suitable for finite element analysis.",
      },
    ],
  },
];

export const m3Steps: M3Step[] = [
  {
    num: 1,
    title: "Basic Assumptions",
    goal: "Set up the four-phase system, the summation convention and the kinematics — then write the total free energy that the following steps build term by term.",
    term: null,
    key: 26,
    blocks: [
      {
        t: "display",
        v: "a_i b_i=\\sum_{i=1}^{3}a_i b_i",
      },
      {
        t: "h4",
        v: "1.1 Einstein Summation Convention",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "We adopt the Einstein summation convention. Repeated indices are summed automatically, namely",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Here, a repeated index denotes a summation index, and a free index cannot appear more than once in the same term.",
          },
        ],
      },
      {
        t: "h4",
        v: "1.2 Four-Phase System",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "We define four macroscopic phases:",
          },
        ],
      },
      {
        t: "display",
        v: "\\mathcal{B}=\\mathcal{F}+\\mathcal{M}+\\mathcal{P}+\\mathcal{W}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "where:",
          },
        ],
      },
      {
        t: "display",
        v: "\\mathcal{F}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "：SELP–Fe₃O₄ paired fiber phase",
          },
        ],
      },
      {
        t: "display",
        v: "\\mathcal{M}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "：unpaired SELP, short peptides, and other non-fibrous matrix",
          },
        ],
      },
      {
        t: "display",
        v: "\\mathcal{P}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "：unpaired Fe3O4 nanoparticle phase",
          },
        ],
      },
      {
        t: "display",
        v: "\\mathcal{W}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "：H₂O liquid phase",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The volume fractions satisfy:",
          },
        ],
      },
      {
        t: "display",
        v: "\\phi_f+\\phi_m+\\phi_p+\\phi_w=1",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The solid volume fraction is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\phi_s=\\phi_f+\\phi_m+\\phi_p",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "In particular, it is necessary to distinguish:",
          },
        ],
      },
      {
        t: "display",
        v: "\\mathrm{Fe_3O_4}^{\\,\\mathrm{paired}}\\subset\\mathcal{F}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "and",
          },
        ],
      },
      {
        t: "display",
        v: "\\mathrm{Fe_3O_4}^{\\,\\mathrm{free}}\\subset\\mathcal{P}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Therefore, ",
          },
          {
            t: "math",
            v: "\\mathcal{P}",
          },
          {
            t: "text",
            v: " is the free magnetic particle phase.",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Based on the above assumptions, the total free energy per unit volume is written as:",
          },
        ],
      },
      {
        t: "display",
        v: "\\begin{aligned} \\psi={}& \\psi_{\\mathrm{SELP-Fe_3O_4}} +\\psi_{\\mathrm{fiber}} +\\psi_{\\mathrm{particle}}+\\psi_{\\mathrm{orient}} +\\psi_{\\mathrm{dip}} +\\psi_{\\mathrm{crosslink}} +\\psi_{\\mathrm{fluid}} +\\psi_{\\mathrm{coupling}}. \\end{aligned}",
      },
      {
        t: "h4",
        v: "1.3 Basic Kinematics",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The solid displacement is denoted by ",
          },
          {
            t: "math",
            v: "u_i",
          },
          {
            t: "text",
            v: ". Under the small-deformation assumption, the linear strain tensor is defined as:",
          },
        ],
      },
      {
        t: "display",
        v: "\\varepsilon_{ij}=\\frac{1}{2}\\left(u_{i,j}+u_{j,i}\\right)",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "where:",
          },
        ],
      },
      {
        t: "display",
        v: "u_{i,j}=\\frac{\\partial u_i}{\\partial x_j}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The volumetric strain is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\varepsilon_{kk}=\\nabla\\cdot\\mathbf{u}",
      },
    ],
  },
  {
    num: 2,
    title: "SELP Non-Fibrous Matrix",
    goal: "Derive the non-fibrous matrix contribution and its effective stress.",
    term: "fiber",
    key: 1,
    blocks: [
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "An isotropic linear elastic model is adopted. The matrix free energy density per unit volume is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\psi_m=\\frac{1}{2}\\lambda_m\\varepsilon_{kk}\\varepsilon_{ll}+\\mu_m\\varepsilon_{ij}\\varepsilon_{ij}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The matrix stress is obtained by differentiating the free energy with respect to strain:",
          },
        ],
      },
      {
        t: "display",
        v: "\\sigma_{ij}^{m}=\\frac{\\partial\\psi_m}{\\partial\\varepsilon_{ij}}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Thus:",
          },
        ],
      },
      {
        t: "display",
        v: "\\sigma_{ij}^{m}=\\lambda_m\\varepsilon_{kk}\\delta_{ij}+2\\mu_m\\varepsilon_{ij}",
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
            v: "\\lambda_m",
          },
          {
            t: "text",
            v: " and ",
          },
          {
            t: "math",
            v: "\\mu_m",
          },
          {
            t: "text",
            v: " are the Lamé constants of the SELP non-fibrous matrix, and ",
          },
          {
            t: "math",
            v: "\\delta_{ij}",
          },
          {
            t: "text",
            v: " is the Kronecker delta.",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The macroscopic matrix stress contribution is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\sigma_{ij}^{m,\\mathrm{eff}} = \\phi_m\\left(\\lambda_m\\varepsilon_{kk}\\delta_{ij}+2\\mu_m\\varepsilon_{ij}\\right)",
      },
    ],
  },
  {
    num: 3,
    title: "Magnetic Field Terms",
    goal: "Introduce the magnetic field and the dipolar interactions.",
    term: "orient",
    key: 14,
    blocks: [
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The applied magnetic field is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\mathbf{H}=\\mathbf{H}(\\mathbf{x},t)",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Its components are:",
          },
        ],
      },
      {
        t: "display",
        v: "H_i=H_i(\\mathbf{x},t)",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "where:",
          },
        ],
      },
      {
        t: "display",
        v: "H_i\\neq \\mathrm{constant},\\qquad H_{i,j}\\neq0",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The magnitude of the magnetic field is:",
          },
        ],
      },
      {
        t: "display",
        v: "H(\\mathbf{x},t)=\\sqrt{H_iH_i}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The local unit magnetic field direction is:",
          },
        ],
      },
      {
        t: "display",
        v: "h_i(\\mathbf{x},t)=\\frac{H_i(\\mathbf{x},t)}{H(\\mathbf{x},t)}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "and satisfies the normalization condition:",
          },
        ],
      },
      {
        t: "display",
        v: "h_ih_i=1",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Therefore, the magnetic field can be written as:",
          },
        ],
      },
      {
        t: "display",
        v: "H_i(\\mathbf{x},t)=H(\\mathbf{x},t)h_i(\\mathbf{x},t)",
      },
      {
        t: "display",
        v: "\\begin{aligned} \\psi_{\\mathrm{orient}}^f &= N_f(\\mathbf{x})\\left[ k_BT\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})\\ln\\rho_f(\\mathbf{x},\\mathbf{n})\\,d\\Omega \\right.\\\\ &\\quad\\left. -\\mu_0m_fH(\\mathbf{x})\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})h_i(\\mathbf{x})n_i\\,d\\Omega \\right]. \\end{aligned}",
      },
      {
        t: "display",
        v: "\\rho_f(\\mathbf{x},\\mathbf{n}) = \\frac{\\alpha_f(\\mathbf{x})}{4\\pi\\sinh\\alpha_f(\\mathbf{x})} \\exp\\left[\\alpha_f(\\mathbf{x})h_i(\\mathbf{x})n_i\\right]",
      },
    ],
  },
  {
    num: 4,
    title:
      "Orientation Free Energy of Magnetic Fibers under a Nonuniform Field",
    goal: "Derive the fiber orientation free energy under a nonuniform field.",
    term: "orient",
    key: 18,
    blocks: [
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The orientation free energy per unit volume of fibers is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\begin{aligned} \\psi_{\\mathrm{orient}}^f &= N_f(\\mathbf{x})\\left[ k_BT\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})\\ln\\rho_f(\\mathbf{x},\\mathbf{n})\\,d\\Omega  -\\mu_0m_fH(\\mathbf{x})\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})h_i(\\mathbf{x})n_i\\,d\\Omega \\right]. \\end{aligned}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The first term describes the thermal fluctuation entropy of fiber orientation, and the second term describes the coupling between the effective magnetic moment of fibers and the external magnetic field.The second term in the orientation free energy per unit volume is precisely the origin of the magnetic response observed in our wet-lab experiments.",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "link",
            href: "https://video.igem.org/w/aKNRpgAnSstH3okfNiHitR",
            v: "**ZJU-China: MNPs in magnetic field (2026)**",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "link",
            href: "https://video.igem.org/w/jTZZfgsycPBGhN78bz2S9g",
            v: "**ZJU-China: TVNFKLY-MNPs in magnetic field (2026)**",
          },
        ],
      },
      {
        t: "h4",
        v: "4.1 Single-Fiber Magnetic Interaction Energy",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The external-field energy of a magnetic fiber is:",
          },
        ],
      },
      {
        t: "display",
        v: "U_H^f(\\mathbf{x},\\mathbf{n}) = -\\mu_0m_fH(\\mathbf{x})h_i(\\mathbf{x})n_i",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The dimensionless form of the external-field energy is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\alpha_f(\\mathbf{x})=\\frac{\\mu_0m_fH(\\mathbf{x})}{k_BT}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Thus:",
          },
        ],
      },
      {
        t: "display",
        v: "U_H^f=-k_BT\\alpha_f(\\mathbf{x})h_i(\\mathbf{x})n_i",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The spatially dependent fiber orientation probability distribution is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\rho_f(\\mathbf{x},\\mathbf{n})",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "and satisfies the normalization constraint:",
          },
        ],
      },
      {
        t: "display",
        v: "\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})\\,d\\Omega=1",
      },
      {
        t: "h4",
        v: "4.2 Fiber Orientation Free Energy",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The orientation free energy per unit volume of fibers is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\begin{aligned} \\psi_{\\mathrm{orient}}^f &= N_f(\\mathbf{x})\\left[ k_BT\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})\\ln\\rho_f(\\mathbf{x},\\mathbf{n})\\,d\\Omega \\right.\\\\ &\\quad\\left. -\\mu_0m_fH(\\mathbf{x})\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})h_i(\\mathbf{x})n_i\\,d\\Omega \\right]. \\end{aligned}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The first term describes the thermal fluctuation entropy of fiber orientation, and the second term describes the coupling between the effective magnetic moment of fibers and the external magnetic field.",
          },
        ],
      },
      {
        t: "h4",
        v: "4.3 Variational Problem with Normalization Constraint",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "We construct the functional with a Lagrange multiplier:",
          },
        ],
      },
      {
        t: "display",
        v: "\\begin{aligned} \\mathcal{L}[\\rho_f,\\lambda] ={}& N_f\\left[ k_BT\\int_{S^2}\\rho_f\\ln\\rho_f\\,d\\Omega -\\mu_0m_fH\\int_{S^2}\\rho_fh_in_i\\,d\\Omega \\right]\\\\ &+\\lambda(\\mathbf{x})\\left[\\int_{S^2}\\rho_f\\,d\\Omega-1\\right]. \\end{aligned}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The extremum condition is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\frac{\\delta\\mathcal{L}}{\\delta\\rho_f}=0",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "This gives the Euler–Lagrange equation:",
          },
        ],
      },
      {
        t: "display",
        v: "N_fk_BT(1+\\ln\\rho_f) -N_f\\mu_0m_fHh_in_i +\\lambda(\\mathbf{x})=0",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "We define the renormalized Lagrange multiplier:",
          },
        ],
      },
      {
        t: "display",
        v: "\\widetilde{\\lambda}(\\mathbf{x})=\\frac{\\lambda(\\mathbf{x})}{N_f(\\mathbf{x})}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Then:",
          },
        ],
      },
      {
        t: "display",
        v: "k_BT(1+\\ln\\rho_f) -\\mu_0m_fHh_in_i +\\widetilde{\\lambda}(\\mathbf{x})=0",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Solving gives:",
          },
        ],
      },
      {
        t: "display",
        v: "\\rho_f(\\mathbf{x},\\mathbf{n}) = C(\\mathbf{x})\\exp\\left[\\alpha_f(\\mathbf{x})h_i(\\mathbf{x})n_i\\right]",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The normalization condition determines ",
          },
          {
            t: "math",
            v: "C(\\mathbf{x}",
          },
          {
            t: "text",
            v: ":",
          },
        ],
      },
      {
        t: "display",
        v: "C(\\mathbf{x})=\\frac{\\alpha_f(\\mathbf{x})}{4\\pi\\sinh\\alpha_f(\\mathbf{x})}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The final local equilibrium orientation distribution is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\rho_f(\\mathbf{x},\\mathbf{n}) = \\frac{\\alpha_f(\\mathbf{x})}{4\\pi\\sinh\\alpha_f(\\mathbf{x})} \\exp\\left[\\alpha_f(\\mathbf{x})h_i(\\mathbf{x})n_i\\right]",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "where:",
          },
        ],
      },
      {
        t: "display",
        v: "\\alpha_f(\\mathbf{x})=\\frac{\\mu_0m_fH(\\mathbf{x})}{k_BT}",
      },
      {
        t: "h4",
        v: "4.4 Mean Fiber Orientation",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "From the local equilibrium distribution, the mean fiber direction can be calculated as:",
          },
        ],
      },
      {
        t: "display",
        v: "\\langle n_i\\rangle=\\int_{S^2}\\rho_f n_i\\,d\\Omega",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Because the problem is axisymmetric about the magnetic field direction ",
          },
          {
            t: "math",
            v: "\\mathbf{h}",
          },
          {
            t: "text",
            v: ", we have:",
          },
        ],
      },
      {
        t: "display",
        v: "\\langle n_i\\rangle=L(\\alpha_f)h_i",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "where ",
          },
          {
            t: "math",
            v: "L(\\alpha_f",
          },
          {
            t: "text",
            v: " is the Langevin function:",
          },
        ],
      },
      {
        t: "display",
        v: "L(\\alpha_f)=\\coth\\alpha_f-\\frac{1}{\\alpha_f}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Therefore:",
          },
        ],
      },
      {
        t: "display",
        v: "\\langle\\mathbf{n}\\rangle=L(\\alpha_f)\\mathbf{h}",
      },
      {
        t: "h4",
        v: "4.5 Relation to Second- and Fourth-Order Orientation Tensors",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The second-order fiber orientation tensor is defined as:",
          },
        ],
      },
      {
        t: "display",
        v: "A_{ij}^{(2)}=\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})n_in_j\\,d\\Omega",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The fourth-order orientation tensor is defined as:",
          },
        ],
      },
      {
        t: "display",
        v: "A_{ijkl}^{(4)}=\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})n_in_jn_kn_l\\,d\\Omega",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "where:",
          },
        ],
      },
      {
        t: "display",
        v: "A_{ii}^{(2)}=1",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Since:",
          },
        ],
      },
      {
        t: "display",
        v: "\\rho_f=\\rho_f(\\mathbf{x},\\mathbf{n})",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "under a nonuniform magnetic field:",
          },
        ],
      },
      {
        t: "display",
        v: "A_{ij}^{(2)}=A_{ij}^{(2)}(\\mathbf{x}),\\qquad A_{ijkl}^{(4)}=A_{ijkl}^{(4)}(\\mathbf{x})",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Thus, the macroscopic mechanical response of the fiber network also becomes spatially dependent.",
          },
        ],
      },
    ],
  },
  {
    num: 5,
    title: "Wilson Fiber Free Energy per Unit Volume and Stress Tensor",
    goal: "Average the fiber energy into the Wilson fiber term and obtain its stress tensor.",
    term: "selp",
    key: 12,
    blocks: [
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Let the unit fiber direction be ",
          },
          {
            t: "math",
            v: "n_i",
          },
          {
            t: "text",
            v: ". The axial strain along the fiber direction is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\varepsilon_f=n_in_j\\varepsilon_{ij}",
      },
      {
        t: "display",
        v: "E_f",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: " is defined as the effective Young’s modulus along the fiber axis of the SELP–Fe₃O₄ paired fiber network, namely:",
          },
        ],
      },
      {
        t: "display",
        v: "E_f=\\frac{\\partial\\sigma_f}{\\partial\\varepsilon_f}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "For a linear elastic fiber aligned along ",
          },
          {
            t: "math",
            v: "n_i",
          },
          {
            t: "text",
            v: ", the axial elastic energy per unit volume is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\psi_f(\\mathbf{n})=\\int_0^{\\varepsilon_f}\\sigma_f(\\varepsilon_f')\\,d\\varepsilon_f'",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Under linear elasticity and small deformation:",
          },
        ],
      },
      {
        t: "display",
        v: "\\sigma_f=E_f\\varepsilon_f",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Using the Einstein summation convention, this can be written as:",
          },
        ],
      },
      {
        t: "display",
        v: "\\psi_f(\\mathbf{n}) = \\frac{1}{2}E_fn_in_jn_kn_l\\varepsilon_{ij}\\varepsilon_{kl}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Averaging over all fiber directions gives the Wilson-type fiber network free energy per unit volume:",
          },
        ],
      },
      {
        t: "display",
        v: "\\psi_f^{\\mathrm{W}} = \\phi_f\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n}) \\frac{1}{2}E_fn_in_jn_kn_l\\varepsilon_{ij}\\varepsilon_{kl}\\,d\\Omega",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "or equivalently:",
          },
        ],
      },
      {
        t: "display",
        v: "\\psi_f^{\\mathrm{W}}(\\mathbf{x}) = \\frac{1}{2}\\phi_f(\\mathbf{x})E_f A_{ijkl}^{(4)}(\\mathbf{x}) \\varepsilon_{ij}(\\mathbf{x})\\varepsilon_{kl}(\\mathbf{x})",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "where:",
          },
        ],
      },
      {
        t: "display",
        v: "\\varepsilon_{ij}=\\frac{1}{2}\\left(u_{i,j}+u_{j,i}\\right)",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The fiber stress tensor is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\sigma_{ij}^{f}=\\frac{\\partial\\psi_f^{\\mathrm{W}}}{\\partial\\varepsilon_{ij}}",
      },
      {
        t: "display",
        v: "\\sigma_{ij}^f(\\mathbf{x}) = \\phi_f(\\mathbf{x})E_f A_{ijkl}^{(4)}(\\mathbf{x}) \\varepsilon_{kl}(\\mathbf{x})",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Its derivative with respect to ",
          },
          {
            t: "math",
            v: "x_{j}",
          },
          {
            t: "text",
            v: " is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\sigma_{ij,j}^f = \\left[\\phi_fE_fA_{ijkl}^{(4)}\\varepsilon_{kl}\\right]_{,j}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Expanding:",
          },
        ],
      },
      {
        t: "display",
        v: "\\begin{aligned} \\sigma_{ij,j}^f ={}& \\phi_{f,j}E_fA_{ijkl}^{(4)}\\varepsilon_{kl} +\\phi_fE_fA_{ijkl,j}^{(4)}\\varepsilon_{kl} +\\phi_fE_fA_{ijkl}^{(4)}\\varepsilon_{kl,j}. \\end{aligned}",
      },
    ],
  },
  {
    num: 6,
    title: "Free Fe₃O₄ Particle Model",
    goal: "Add the free Fe₃O₄ particle term with Langevin magnetization.",
    term: "particle",
    key: 44,
    blocks: [
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "This section separately considers free Fe₃O₄ nanoparticles that are not paired with SELP. Their magnetic response is described by the classical Langevin model.",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Assume the free Fe₃O₄ nanoparticle is spherical with diameter ",
          },
          {
            t: "math",
            v: "d_p",
          },
          {
            t: "text",
            v: ". Its single-particle volume is:",
          },
        ],
      },
      {
        t: "display",
        v: "V_p=\\frac{\\pi}{6}d_p^3",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "For a Fe₃O₄ nanoparticle with diameter ",
          },
          {
            t: "math",
            v: "20\\,\\mathrm{nm}",
          },
          {
            t: "text",
            v: ":",
          },
        ],
      },
      {
        t: "display",
        v: "d_p=20\\times10^{-9}\\,\\mathrm{m}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Thus:",
          },
        ],
      },
      {
        t: "display",
        v: "V_p = \\frac{\\pi}{6}\\left(20\\times10^{-9}\\right)^3 \\approx4.19\\times10^{-24}\\,\\mathrm{m}^3",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Using the saturation magnetization ",
          },
          {
            t: "math",
            v: "M_s",
          },
          {
            t: "text",
            v: " to characterize the magnetic moment density of Fe₃O₄ particles, the maximum magnetic moment of a single particle is:",
          },
        ],
      },
      {
        t: "display",
        v: "m_p=M_sV_p",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Introducing the unit vector ",
          },
          {
            t: "math",
            v: "s_i",
          },
          {
            t: "text",
            v: " describing the magnetic moment direction, the particle magnetic moment can be written as:",
          },
        ],
      },
      {
        t: "display",
        v: "m_i=m_ps_i,\\qquad s_is_i=1",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "For a single free Fe₃O₄ nanoparticle located at ",
          },
          {
            t: "math",
            v: "\\mathbf{x}",
          },
          {
            t: "text",
            v: ", the interaction energy between its magnetic moment and the external field is:",
          },
        ],
      },
      {
        t: "display",
        v: "U_p=-\\mu_0m_iH_i",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Substituting gives:",
          },
        ],
      },
      {
        t: "display",
        v: "U_p=-\\mu_0m_ps_iH_i",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Using ",
          },
          {
            t: "math",
            v: "H_i=Hh_i",
          },
          {
            t: "text",
            v: " and defining the angle between the particle magnetic moment and the local field direction as ",
          },
          {
            t: "math",
            v: "\\theta",
          },
          {
            t: "text",
            v: ", we have:",
          },
        ],
      },
      {
        t: "display",
        v: "s_ih_i=\\cos\\theta",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Thus:",
          },
        ],
      },
      {
        t: "display",
        v: "U_p=-\\mu_0m_pH\\cos\\theta",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The dimensionless Langevin parameter is defined as:",
          },
        ],
      },
      {
        t: "display",
        v: "\\xi_p(\\mathbf{x},t)=\\frac{\\mu_0m_pH(\\mathbf{x},t)}{k_BT}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Using the above definition, the single-particle magnetic interaction energy can be written as:",
          },
        ],
      },
      {
        t: "display",
        v: "U_p=-k_BT\\xi_p\\cos\\theta",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The single-particle orientation partition function is defined as:",
          },
        ],
      },
      {
        t: "display",
        v: "Z_p=\\int_{S^2}\\exp\\left(\\xi_ps_ih_i\\right)\\,d\\Omega",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Integrating gives:",
          },
        ],
      },
      {
        t: "display",
        v: "Z_p=4\\pi\\frac{\\sinh\\xi_p}{\\xi_p}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The single-particle free energy is:",
          },
        ],
      },
      {
        t: "display",
        v: "F_p=-k_BT\\ln Z_p = -k_BT\\ln\\left(4\\pi\\frac{\\sinh\\xi_p}{\\xi_p}\\right)",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Differentiating the single-particle magnetic free energy with respect to ",
          },
          {
            t: "math",
            v: "\\xi_p",
          },
          {
            t: "text",
            v: " gives:",
          },
        ],
      },
      {
        t: "display",
        v: "\\frac{\\partial F_p^{\\mathrm{mag}}}{\\partial\\xi_p} = -k_BT\\left(\\coth\\xi_p-\\frac{1}{\\xi_p}\\right) = -k_BTL(\\xi_p)",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The average magnetic moment along the local field direction is obtained by differentiating the free energy with respect to the magnetic field:",
          },
        ],
      },
      {
        t: "display",
        v: "\\langle m_{\\parallel}^p\\rangle = -\\frac{1}{\\mu_0}\\frac{\\partial F_p^{\\mathrm{mag}}}{\\partial H} = m_pL(\\xi_p)",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Because the system is axisymmetric about the local magnetic field direction, the average magnetic moment is aligned with the local field:",
          },
        ],
      },
      {
        t: "display",
        v: "\\langle m_i^p\\rangle=m_pL(\\xi_p)h_i",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Let ",
          },
          {
            t: "math",
            v: "N_p",
          },
          {
            t: "text",
            v: " be the number density of free Fe₃O₄ nanoparticles per unit total volume:",
          },
        ],
      },
      {
        t: "display",
        v: "N_p=\\frac{N}{V}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Thus, the average magnetic moment of all particles per unit volume is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\mathbf{M}^p=N_pm_pL(\\xi_p)\\mathbf{h}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "In a nonuniform magnetic field:",
          },
        ],
      },
      {
        t: "display",
        v: "N_p=N_p(\\mathbf{x}),\\qquad \\xi_p=\\xi_p(\\mathbf{x}),\\qquad h_i=h_i(\\mathbf{x})",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The local magnetization of free particles is:",
          },
        ],
      },
      {
        t: "display",
        v: "M_i^p(\\mathbf{x},t) = N_p(\\mathbf{x})m_pL[\\xi_p(\\mathbf{x})]h_i(\\mathbf{x})",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The free energy density of free magnetic particles interacting with the external field is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\psi_p^{\\mathrm{mag}}(\\mathbf{x}) = -N_p(\\mathbf{x})k_BT \\ln\\left[ \\frac{\\sinh\\xi_p(\\mathbf{x})}{\\xi_p(\\mathbf{x})} \\right]",
      },
    ],
  },
  {
    num: 7,
    title: "Water Phase and Poroelastic Coupling",
    goal: "Couple the pore water: fluid and coupling terms, ending with the effective stress.",
    term: "fluid",
    key: 56,
    blocks: [
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "In the SELP–Fe₃O₄ four-phase system, the water phase exists as a pore fluid within the porous structure formed by SELP fibers and Fe₃O₄ nanoparticles. The water phase itself does not carry the shear deformation of the solid phase; its main mechanical role is coupled to the solid phase through pore water pressure and relative flow.",
          },
        ],
      },
      {
        t: "h4",
        v: "7.1 Basic Assumptions for the Water Phase",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The water phase is treated as a continuous liquid with approximate incompressibility. The pore water pressure is defined as:",
          },
        ],
      },
      {
        t: "display",
        v: "p_w=p_w(x_i,t)",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Neglecting viscous shear stress and inertia of the water phase, its stress tensor is mainly isotropic pressure:",
          },
        ],
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
            v: "\\delta_{ij}",
          },
          {
            t: "text",
            v: " is the identity tensor. Isotropic water pressure does not imply isotropic seepage. Because the magnetic fiber network is directional, the pore structure can exhibit pronounced anisotropic permeability.",
          },
        ],
      },
      {
        t: "h4",
        v: "7.2 Mass Conservation of Solid and Water Phases",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The solid displacement is:",
          },
        ],
      },
      {
        t: "display",
        v: "u_i=u_i(\\mathbf{x},t)",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The solid velocity is:",
          },
        ],
      },
      {
        t: "display",
        v: "v_i^s=\\dot{u}_i",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The water velocity is:",
          },
        ],
      },
      {
        t: "display",
        v: "v_i^w",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The relative flow of water with respect to the solid is defined as:",
          },
        ],
      },
      {
        t: "display",
        v: "q_i=\\phi_w\\left(v_i^w-v_i^s\\right)",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "where ",
          },
          {
            t: "math",
            v: "\\phi_w",
          },
          {
            t: "text",
            v: " is the water volume fraction.",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Thus, the total volumetric flux of water can be expressed as:",
          },
        ],
      },
      {
        t: "display",
        v: "\\phi_wv_i^w=\\phi_wv_i^s+q_i",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Since the solid is approximately incompressible with constant intrinsic density ",
          },
          {
            t: "math",
            v: "\\rho_s",
          },
          {
            t: "text",
            v: ", its mass conservation equation is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\frac{\\partial(\\phi_s\\rho_s)}{\\partial t} +\\left(\\phi_s\\rho_sv_i^s\\right)_{,i}=0",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Similarly, the water phase is approximately incompressible with constant intrinsic density ",
          },
          {
            t: "math",
            v: "\\rho_w",
          },
          {
            t: "text",
            v: ", and its mass conservation equation is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\frac{\\partial(\\phi_w\\rho_w)}{\\partial t} +\\left(\\phi_w\\rho_wv_i^w\\right)_{,i}=0",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Thus:",
          },
        ],
      },
      {
        t: "display",
        v: "\\dot{\\phi}_w+\\left(\\phi_wv_i^w\\right)_{,i}=0",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Expanding:",
          },
        ],
      },
      {
        t: "display",
        v: "\\dot{\\phi}_w+\\phi_{w,i}v_i^s+\\phi_wv_{i,i}^s+q_{i,i}=0",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Since the solid and water phases together fill the mixture space:",
          },
        ],
      },
      {
        t: "display",
        v: "\\phi_s+\\phi_w=1",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Therefore:",
          },
        ],
      },
      {
        t: "display",
        v: "\\phi_w=1-\\phi_s",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The water mass conservation equation reduces to:",
          },
        ],
      },
      {
        t: "display",
        v: "v_{i,i}^s+q_{i,i}=0",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Under small deformation:",
          },
        ],
      },
      {
        t: "display",
        v: "v_i^s=\\dot{u}_i",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Thus, the mixture mass conservation equation under approximately incompressible solid and water phases is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\dot{u}_{i,i}+q_{i,i}=0",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Substituting Darcy’s law:",
          },
        ],
      },
      {
        t: "display",
        v: "q_i=-K_{ij}p_{w,j}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "into the mass conservation equation gives:",
          },
        ],
      },
      {
        t: "display",
        v: "\\dot{u}_{i,i}-\\left(K_{ij}p_{w,j}\\right)_{,i}=0",
      },
      {
        t: "h4",
        v: "7.3 Spatially Nonuniform Anisotropic Permeability",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Because the nonuniform magnetic field makes the fiber orientation distribution spatially dependent, the permeability also becomes a spatially dependent tensor field:",
          },
        ],
      },
      {
        t: "display",
        v: "K_{ij}=K_{ij}(\\mathbf{x})",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Considering the influence of fiber orientation on pore structure, the permeability tensor is defined as:",
          },
        ],
      },
      {
        t: "display",
        v: "K_{ij} = k_{\\perp}\\delta_{ij} +\\left(k_{\\parallel}-k_{\\perp}\\right)A_{ij}^{(2)}(\\mathbf{x})",
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
            v: "k_{\\parallel}",
          },
          {
            t: "text",
            v: " and ",
          },
          {
            t: "math",
            v: "k_{\\perp}",
          },
          {
            t: "text",
            v: " denote the permeabilities along and perpendicular to the dominant fiber orientation, respectively.",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Using the product rule:",
          },
        ],
      },
      {
        t: "display",
        v: "\\left(K_{ij}p_{w,j}\\right)_{,i} = K_{ij,i}p_{w,j}+K_{ij}p_{w,ji}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Therefore, the exact mass conservation equation is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\dot{u}_{i,i} -K_{ij,i}p_{w,j} -K_{ij}p_{w,ji}=0",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "If ",
          },
          {
            t: "math",
            v: "k_{\\parallel}",
          },
          {
            t: "text",
            v: " and ",
          },
          {
            t: "math",
            v: "k_{\\perp}",
          },
          {
            t: "text",
            v: " are constants, then:",
          },
        ],
      },
      {
        t: "display",
        v: "K_{ij,i} = \\left(k_{\\parallel}-k_{\\perp}\\right)A_{ij,i}^{(2)}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Thus:",
          },
        ],
      },
      {
        t: "display",
        v: "\\dot{u}_{i,i} -\\left(k_{\\parallel}-k_{\\perp}\\right)A_{ij,i}^{(2)}p_{w,j} -K_{ij}p_{w,ji}=0",
      },
      {
        t: "h4",
        v: "7.4 Poroelastic Coupling between Water and Solid Phases",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The water phase acts on the solid through pore pressure. Using the Mow–Biot effective stress decomposition, the total stress can be written as:",
          },
        ],
      },
      {
        t: "display",
        v: "\\sigma_{ij}=\\sigma_{ij}^{\\mathrm{eff}}-\\alpha_Bp_w\\delta_{ij}",
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
            v: "\\sigma_{ij}^{\\mathrm{eff}}",
          },
          {
            t: "text",
            v: " is the effective solid stress and ",
          },
          {
            t: "math",
            v: "\\alpha_B",
          },
          {
            t: "text",
            v: " is the Biot coefficient.",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "For approximately incompressible, highly hydrated soft tissues, one may take:",
          },
        ],
      },
      {
        t: "display",
        v: "\\alpha_B\\approx1",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Therefore:",
          },
        ],
      },
      {
        t: "display",
        v: "\\sigma_{ij}=\\sigma_{ij}^{\\mathrm{eff}}-p_w\\delta_{ij}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Since:",
          },
        ],
      },
      {
        t: "display",
        v: "\\left(-p_w\\delta_{ij}\\right)_{,j}=-p_{w,i}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The pore water pressure eventually enters the force balance equation in the form of a pressure gradient.",
          },
        ],
      },
    ],
  },
  {
    num: 8,
    title: "Photocrosslinking Free Energy",
    goal: "Lock the orientation structure by photocrosslinking.",
    term: "crosslink",
    key: 12,
    blocks: [
      {
        t: "h4",
        v: "8.1 Basic Idea of Photocrosslinking",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The fiber orientation probability distribution before photocrosslinking is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\rho_f^*(\\mathbf{x},\\mathbf{n})",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The fiber orientation probability distribution after photocrosslinking is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\rho_f(\\mathbf{x},\\mathbf{n})",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The experimental process is:",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Non-uniform magnetic field → Fe₃O₄–SELP fiber alignment → photocrosslinking → removal of the magnetic field",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Therefore, before photocrosslinking, the nonuniform magnetic field first induces a spatially varying orientation distribution of Fe₃O₄–SELP magnetic fibers:",
          },
        ],
      },
      {
        t: "display",
        v: "\\rho_f^*(\\mathbf{x},\\mathbf{n}) = \\frac{\\alpha_f(\\mathbf{x})}{4\\pi\\sinh\\left(\\alpha_f(\\mathbf{x})\\right)} \\exp\\left[\\alpha_f(\\mathbf{x})h_i(\\mathbf{x})n_i\\right]",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Photocrosslinking fixes this spatially nonuniform orientation structure, so that the magnetic-field-induced fiber orientation is retained after the field is removed.",
          },
        ],
      },
      {
        t: "h4",
        v: "8.2 Photocrosslinking Free Energy",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "To describe the locking effect of photocrosslinking on fiber orientation, we introduce the structural memory free energy per unit volume:",
          },
        ],
      },
      {
        t: "display",
        v: "\\psi_{\\mathrm{lock}} = \\frac12 N_f(\\mathbf{x})k_c\\eta_c \\int_{S^2} \\left[ \\rho_f(\\mathbf{x},\\mathbf{n})-\\rho_f^*(\\mathbf{x},\\mathbf{n}) \\right]^2 \\,d\\Omega",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "where:",
          },
        ],
      },
      {
        t: "display",
        v: "0\\leq\\eta_c\\leq1",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "is the dimensionless photocrosslinking degree parameter, and ",
          },
          {
            t: "math",
            v: "k_c",
          },
          {
            t: "text",
            v: " is the orientation locking stiffness:",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The larger ",
          },
          {
            t: "math",
            v: "k_c",
          },
          {
            t: "text",
            v: " is, the more difficult it is for the fiber orientation to change.",
          },
        ],
      },
    ],
  },
  {
    num: 9,
    title: "Total Free Energy per Unit Volume",
    goal: "Collect every term into the total free energy and the total stress.",
    term: null,
    key: 2,
    blocks: [
      {
        t: "h4",
        v: "9.1 Before Photocrosslinking, with Magnetic Field",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Considering the non-fibrous SELP matrix, magnetic fibers, unpaired Fe₃O₄ particles, dipolar interactions, and pore fluid, before photocrosslinking, the total free energy per unit volume can be written as:",
          },
        ],
      },
      {
        t: "display",
        v: "\\begin{aligned} \\psi={}& \\phi_m\\left[ \\frac{1}{2}\\lambda_m\\varepsilon_{kk}\\varepsilon_{ll} +\\mu_m\\varepsilon_{ij}\\varepsilon_{ij} \\right]\\\\ &+\\frac{1}{2}\\phi_fE_fA_{ijkl}^{(4)}\\varepsilon_{ij}\\varepsilon_{kl}\\\\ &+\\psi_{\\mathrm{dip}}\\\\ &+N_f\\left[ k_BT\\int_{S^2}\\rho_f\\ln\\rho_f\\,d\\Omega -\\mu_0m_fH\\int_{S^2}\\rho_fh_in_i\\,d\\Omega \\right]\\\\ &-N_pk_BT\\ln\\left(\\frac{\\sinh\\xi_p}{\\xi_p}\\right)\\\\ &-p_w\\varepsilon_{kk}. \\end{aligned}",
      },
      {
        t: "display",
        v: "\\begin{aligned} \\sigma_{ij}={}& \\phi_m\\left( \\lambda_m\\varepsilon_{kk}\\delta_{ij} +2\\mu_m\\varepsilon_{ij} \\right)+\\phi_fE_fA_{ijkl}^{\\mathrm{ref}}(\\mathbf{x})\\varepsilon_{kl} -p_w\\delta_{ij}. \\end{aligned}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Here, the dimensionless magnetic field parameter for unpaired Fe₃O₄ nanoparticles is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\xi_p(\\mathbf{x})=\\frac{\\mu_0m_pH(\\mathbf{x})}{k_BT}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The magnetic-field-induced reference fiber orientation distribution is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\rho_f^*(\\mathbf{x},\\mathbf{n}) = \\frac{ \\exp\\left[\\alpha_f(\\mathbf{x})h_i(\\mathbf{x})n_i\\right] }{ 4\\pi\\sinh\\left(\\alpha_f(\\mathbf{x})\\right)/\\alpha_f(\\mathbf{x}) }",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "where:",
          },
        ],
      },
      {
        t: "display",
        v: "\\alpha_f(\\mathbf{x})=\\frac{\\mu_0m_fH(\\mathbf{x})}{k_BT}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "denotes the dimensionless magnetic field strength of magnetic fibers in the local field.",
          },
        ],
      },
      {
        t: "h4",
        v: "9.2 Reference Orientation Structure after Photocrosslinking",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "After photocrosslinking, the fiber orientation is fixed. Therefore, in the subsequent mechanical loading stage under the small-deformation approximation, the fiber orientation distribution can be treated as a known spatial field in the reference configuration:",
          },
        ],
      },
      {
        t: "display",
        v: "\\rho_f^{\\mathrm{ref}}(\\mathbf{x},\\mathbf{n}) = \\rho_f^*(\\mathbf{x},\\mathbf{n})",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "This represents the magnetic-field-induced orientation structure frozen by photocrosslinking.",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The reference fourth-order orientation tensor is defined as:",
          },
        ],
      },
      {
        t: "display",
        v: "A_{ijkl}^{\\mathrm{ref}}(\\mathbf{x}) = \\int_{S^2} \\rho_f^{\\mathrm{ref}}(\\mathbf{x},\\mathbf{n}) n_in_jn_kn_l\\,d\\Omega",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Thus, in subsequent finite element mechanical analysis, ",
          },
          {
            t: "math",
            v: "\\rho_f^{\\mathrm{ref}}",
          },
          {
            t: "text",
            v: " no longer needs to be solved as an additional unknown field; ",
          },
          {
            t: "math",
            v: "A_{ijkl}^{\\mathrm{ref}}(\\mathbf{x})",
          },
          {
            t: "text",
            v: " can be directly used as a spatially nonuniform material parameter.",
          },
        ],
      },
      {
        t: "h4",
        v: "9.3 After Photocrosslinking and Removal of the Magnetic Field",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "After photocrosslinking and removal of the magnetic field, the free energy per unit volume is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\begin{aligned} \\psi={}& \\phi_m\\left[ \\frac{1}{2}\\lambda_m\\varepsilon_{kk}\\varepsilon_{ll} +\\mu_m\\varepsilon_{ij}\\varepsilon_{ij} \\right]\\\\ &+\\frac{1}{2}\\phi_fE_fA_{ijkl}^{(4)}\\varepsilon_{ij}\\varepsilon_{kl}\\\\ &+\\psi_{\\mathrm{dip}}\\\\ &+N_f\\left[ k_BT\\int_{S^2}\\rho_f\\ln\\rho_f\\,d\\Omega \\right]\\\\ &-p_w\\varepsilon_{kk}. \\end{aligned}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The total stress can be written as:",
          },
        ],
      },
      {
        t: "display",
        v: "\\begin{aligned} \\sigma_{ij}={}& \\phi_m\\left( \\lambda_m\\varepsilon_{kk}\\delta_{ij} +2\\mu_m\\varepsilon_{ij} \\right)\\\\ &+\\phi_fE_fA_{ijkl}^{\\mathrm{ref}}(\\mathbf{x})\\varepsilon_{kl}\\\\ &+\\sigma_{ij}^{\\mathrm{dip}} -p_w\\delta_{ij}. \\end{aligned}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Here, the stress corresponding to dipolar interactions is defined as:",
          },
        ],
      },
      {
        t: "display",
        v: "\\sigma_{ij}^{\\mathrm{dip}} = \\frac{\\partial\\psi_{\\mathrm{dip}}}{\\partial\\varepsilon_{ij}}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "If magnetic nanoparticle interactions are neglected after removing the field, one may take:",
          },
        ],
      },
      {
        t: "display",
        v: "\\sigma_{ij}^{\\mathrm{dip}}=0",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Then the total stress simplifies to:",
          },
        ],
      },
      {
        t: "display",
        v: "\\begin{aligned} \\sigma_{ij}={}& \\phi_m\\left( \\lambda_m\\varepsilon_{kk}\\delta_{ij} +2\\mu_m\\varepsilon_{ij} \\right)+\\phi_fE_fA_{ijkl}^{\\mathrm{ref}}(\\mathbf{x})\\varepsilon_{kl} -p_w\\delta_{ij}. \\end{aligned}",
      },
    ],
  },
  {
    num: 10,
    title:
      "Mechanical Equilibrium , Finite Element Governing Equations and Simulation",
    goal: "Variational equilibrium, finite-element governing equations and simulation results.",
    term: null,
    key: 1,
    blocks: [
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Under quasi-static conditions with inertia neglected, the material satisfies:",
          },
        ],
      },
      {
        t: "display",
        v: "\\sigma_{ij,j}+b_i=0",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "where ",
          },
          {
            t: "math",
            v: "b_i",
          },
          {
            t: "text",
            v: " is the body force per unit volume.",
          },
        ],
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "After removing the magnetic field, completing photocrosslinking, and applying mechanical loading, the model satisfies:",
          },
        ],
      },
      {
        t: "display",
        v: "\\begin{aligned} \\sigma_{ij,j}+b_i&=0,\\\\ \\sigma_{ij}&= \\phi_m\\left( \\lambda_m\\varepsilon_{kk}\\delta_{ij} +2\\mu_m\\varepsilon_{ij} \\right) +\\phi_fE_fA_{ijkl}^{\\mathrm{ref}}(\\mathbf{x})\\varepsilon_{kl} -p_w\\delta_{ij},\\\\ \\varepsilon_{ij}&=\\frac{1}{2}\\left(u_{i,j}+u_{j,i}\\right),\\\\ \\dot{u}_{i,i}+q_{i,i}&=0, \\\\ q_i&=-K_{ij}p_{w,j}. \\end{aligned}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "Here, the reference orientation tensor is determined by the fiber orientation induced by the nonuniform magnetic field:",
          },
        ],
      },
      {
        t: "display",
        v: "A_{ijkl}^{\\mathrm{ref}}(\\mathbf{x}) = \\int_{S^2} \\rho_f^*(\\mathbf{x},\\mathbf{n}) n_in_jn_kn_l\\,d\\Omega",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "The magnetic-field-induced reference fiber orientation distribution is:",
          },
        ],
      },
      {
        t: "display",
        v: "\\rho_f^*(\\mathbf{x},\\mathbf{n}) = \\frac{ \\exp\\left[\\alpha_f(\\mathbf{x})h_i(\\mathbf{x})n_i\\right] }{ 4\\pi\\sinh\\left(\\alpha_f(\\mathbf{x})\\right)/\\alpha_f(\\mathbf{x}) }",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "where:",
          },
        ],
      },
      {
        t: "display",
        v: "\\alpha_f(\\mathbf{x})=\\frac{\\mu_0m_fH(\\mathbf{x})}{k_BT}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "For steady state, no external body force, and stress loading on the boundary, the equations and boundary conditions are:",
          },
        ],
      },
      {
        t: "display",
        v: "\\begin{aligned} \\sigma_{ij,j}&=0,\\\\ \\sigma_{ij}&= \\phi_m\\left( \\lambda_m\\varepsilon_{kk}\\delta_{ij} +2\\mu_m\\varepsilon_{ij} \\right) +\\phi_fE_fA_{ijkl}^{\\mathrm{ref}}(\\mathbf{x})\\varepsilon_{kl} -p_w\\delta_{ij},\\\\ \\varepsilon_{ij}&=\\frac{1}{2}\\left(u_{i,j}+u_{j,i}\\right),\\\\ q_{i,i}&=0,\\\\ q_i&=-K_{ij}p_{w,j}. \\end{aligned}",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "We completed the magnetic field simulation using COMSOL and MATLAB.",
          },
        ],
      },
      {
        t: "figure",
        src: "https://static.igem.wiki/teams/6102/wiki/images/model/model/b-field.avif",
        alt: "Full-space magnetic field strength map",
        width: 680,
        caption: "Figure 1 | Full-space magnetic field strength map",
      },
      {
        t: "figure",
        src: "https://static.igem.wiki/teams/6102/wiki/images/model/model/b-xz-y-0-000mm.avif",
        alt: "Cross-sectional map of the magnetic field strength on the plane y = 0 mm",
        width: 680,
        caption: "Figure 2 | Cross-sectional map of the magnetic field strength on the plane y = 0 mm",
      },
      {
        t: "figure",
        src: "https://static.igem.wiki/teams/6102/wiki/images/model/model/b-yz-x-0-000mm.avif",
        alt: "Cross-sectional map of the magnetic field strength on the plane x = 0 mm",
        width: 680,
        caption: "Figure 3 | Cross-sectional map of the magnetic field strength on the plane x = 0 mm",
      },
      {
        t: "p",
        parts: [
          {
            t: "text",
            v: "After this, we imported the magnetic field results and compressive modulus data into the MATLAB code we wrote to complete the computational simulation of the hydrogel in an anisotropic magnetic field.",
          },
        ],
      },
      {
        t: "figure",
        src: "https://static.igem.wiki/teams/6102/wiki/images/model/model/fiber-axial-strain-epsf.avif",
        alt: "Spatial distribution map of the local normal strain along the fiber axial direction",
        width: 680,
        caption: "Figure 4 | Spatial distribution map of the local normal strain along the fiber axial direction",
      },
      {
        t: "figure",
        src: "https://static.igem.wiki/teams/6102/wiki/images/model/model/magnetic-field-h-x.avif",
        alt: "Spatial distribution map of the magnetic field within the hydrogel",
        width: 680,
        caption: "Figure 5 | Spatial distribution map of the magnetic field within the hydrogel",
      },
      {
        t: "figure",
        src: "https://static.igem.wiki/teams/6102/wiki/images/model/model/e-z-local-young-modulus.avif",
        alt: "Distribution map of Young’s modulus along the z-direction inside the hydrogel",
        width: 680,
        caption: "Figure 6 | Distribution map of Young’s modulus along the z-direction inside the hydrogel",
      },
    ],
  },
];

export const m3References: M3Block[] = [
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "[1] Mow, V. C., Kuei, S. C., Lai, W. M., Armstrong, C. G. (1980). Biphasic Creep and Stress Relaxation of Articular Cartilage in Compression: Theory and Experiments. ",
      },
      {
        t: "em",
        v: "Journal of Biomechanical Engineering",
      },
      {
        t: "text",
        v: ", 102, 73–84. DOI: 10.1115/1.3138202",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "[2] Wilson, W., van Donkelaar, C. C., van Rietbergen, B., Ito, K., Huiskes, R. (2004). Stresses in the local collagen network of articular cartilage: a poroviscoelastic fibril-reinforced finite element study. ",
      },
      {
        t: "em",
        v: "Journal of Biomechanics",
      },
      {
        t: "text",
        v: ", 37(3), 357–366. DOI: 10.1016/S0021-9290(03)00267-7",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "[3] Wilson, W., van Donkelaar, C. C., van Rietbergen, B., Huiskes, R. (2005). A fibril-reinforced poroviscoelastic swelling model for articular cartilage. ",
      },
      {
        t: "em",
        v: "Journal of Biomechanics",
      },
      {
        t: "text",
        v: ", 38(6), 1195–1204. DOI: 10.1016/j.jbiomech.2004.07.003",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "[4] Doi, M., Edwards, S. F. (1978). Dynamics of Rod-Like Macromolecules in Concentrated Solution. Part 1. ",
      },
      {
        t: "em",
        v: "Journal of the Chemical Society, Faraday Transactions 2",
      },
      {
        t: "text",
        v: ", 74, 560–570. DOI: 10.1039/F29787400560",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "[5] Doi, M., Edwards, S. F. (1978). Dynamics of Rod-Like Macromolecules in Concentrated Solution. Part 2. ",
      },
      {
        t: "em",
        v: "Journal of the Chemical Society, Faraday Transactions 2",
      },
      {
        t: "text",
        v: ", 74, 918–932. DOI: 10.1039/F29787400918",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "[6] Langevin, P. (1905). Magnétisme et théorie des électrons. ",
      },
      {
        t: "em",
        v: "Annales de Chimie et de Physique",
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
        v: "[7] Ivanov, A. O., Kuznetsova, O. B. (2001). Magnetic properties of dense ferrofluids: An influence of interparticle correlations. ",
      },
      {
        t: "em",
        v: "Physical Review E",
      },
      {
        t: "text",
        v: ", 64, 041405. DOI: 10.1103/PhysRevE.64.041405",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "[8] Ferrofluids and bio-ferrofluids: looking back and stepping forward. ",
      },
      {
        t: "em",
        v: "Nanoscale",
      },
      {
        t: "text",
        v: " (2022). DOI: 10.1039/D1NR05841J",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "[9] Zhang, Y.-N., Avery, R. K., Vallmajo-Martin, Q., et al. (2015). A Highly Elastic and Rapidly Crosslinkable Elastin-Like Polypeptide-Based Hydrogel for Biomedical Applications. ",
      },
      {
        t: "em",
        v: "Advanced Functional Materials",
      },
      {
        t: "text",
        v: ", 25, 4814–4826. DOI: 10.1002/adfm.201501489",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "[10] Mow, V. C., Holmes, M. H., & Lai, W. M. (1984). Fluid transport and mechanical properties of articular cartilage: A review. ",
      },
      {
        t: "em",
        v: "Journal of Biomechanics",
      },
      {
        t: "text",
        v: ", 17(5), 377–394.",
      },
    ],
  },
  {
    t: "p",
    parts: [
      {
        t: "text",
        v: "[11] Spilker, R. L., Suh, J. K., & Mow, V. C. (1992). A finite element analysis of the indentation stress-relaxation response of linear biphasic articular cartilage. ",
      },
      {
        t: "em",
        v: "Journal of Biomechanical Engineering",
      },
      {
        t: "text",
        v: ", 114(2), 191–201.",
      },
    ],
  },
];
