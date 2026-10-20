import { MathFormula } from "../../components/MathFormula";

export function MagneticPoroelasticityFundamentals() {
  return (
    <>
      <h2 className="mt-5 mb-3">
        Modeling of Magnetic-Field-Induced SELP–Fe₃O₄ Multiphase Poroelasticity
      </h2>
      <h3 className="mt-5 mb-3">Research Question and Modeling Framework</h3>
      <p>
        In the preceding modeling of 2KY10-SELP single-chain conformations,
        Martini coarse-grained multichain systems, and tyrosine crosslink
        networks, the system was treated primarily as a protein network in
        water. When Fe₃O₄ nanoparticles are introduced and magnetic-field-driven
        orientation and dipolar interactions are considered, the system can no
        longer be described by a single protein network alone. It must instead
        be extended to a multiphase composite description.
      </p>
      <p>
        In addition to the need to distinguish paired Fe₃O₄ from free Fe₃O₄
        after nanoparticle incorporation, three further reasons require lifting
        the description from fully atomistic/Martini molecular simulations to a
        four-phase macroscopic level:
      </p>
      {/* The draft interleaves Chinese list items 1/3/5 with English items 2/4/6 for the same three points; the duplicate pairs are merged into three items here */}
      <ol>
        <li>
          The computational cost of the hydrogel is too high. Fully atomistic
          and Martini simulations are suitable for single-chain conformations,
          local crosslink topology, and short-time stress relaxation. However,
          an experimental-scale hydrogel contains a large number of protein
          chains, water, ions, and nanoparticles. Tracking every atom or
          coarse-grained bead while covering macroscopic sample dimensions,
          long-time network rearrangements, and external-field responses would
          be computationally prohibitive. The system therefore needs to be
          coarse-grained into macroscopic phases described by volume fractions
          and mean-field quantities.
        </li>
        <li>
          The magnetic field introduces macroscopic anisotropy. An external
          magnetic field induces dipolar interactions among Fe₃O₄ particles and
          orientational alignment of fibers and particles. The material is then
          no longer isotropic; mechanical moduli, magnetic response, and
          load-bearing capacity of the crosslinked network may all become
          direction-dependent. The four-phase system can describe the paired
          fiber phase, free particle phase, non-fibrous matrix, and water phase
          separately, with orientational and dipolar terms explicitly
          representing macroscopic anisotropy.
        </li>
        <li>
          Statistical nature. The modulus, crosslinking fraction, and magnetic
          response of a hydrogel are inherently statistical averages over many
          chains, crosslink points, particles, and water molecules, rather than
          properties of a single chain or a single particle. The four-phase
          model describes the system using statistical quantities such as volume
          fractions, making it better suited for comparison with the bulk
          material properties measured in wet-lab experiments.
        </li>
      </ol>
      <p>
        Therefore, the four-phase system does not replace the preceding FAMD and
        Martini simulations. Instead, it takes their outputs — single-chain
        conformations, crosslink endpoints, and local mechanical parameters —
        and coarse-grains them upward into a macroscopic statistical
        description.
      </p>
      <p>
        We aim to establish a continuum model that connects
        magnetic-field-induced fiber orientation, photochemical crosslinking
        locking, and poroelastic mechanical response. The model treats the
        SELP–Fe₃O₄ system as a four-phase mixture. Its goal is to incorporate
        magnetic fiber orientation under a nonuniform field, Langevin
        magnetization of free Fe₃O₄ particles, pore water pressure, and the
        reference orientation structure after photocrosslinking into a single
        volume-averaged free energy, and then to derive
        stress–strain–pore-pressure governing equations suitable for finite
        element analysis.
      </p>

      <h2 className="mt-5 mb-3">1 Basic Assumptions</h2>
      <h3 className="mt-5 mb-3">1.1 Einstein Summation Convention</h3>
      <p>
        We adopt the Einstein summation convention. Repeated indices are summed
        automatically, namely
      </p>
      <MathFormula display>{"a_i b_i=\\sum_{i=1}^{3}a_i b_i"}</MathFormula>
      <p>
        Here, a repeated index denotes a summation index, and a free index
        cannot appear more than once in the same term.
      </p>
      <h3 className="mt-5 mb-3">1.2 Four-Phase System</h3>
      <p>We define four macroscopic phases:</p>
      <MathFormula display>
        {"\\mathcal{B}=\\mathcal{F}+\\mathcal{M}+\\mathcal{P}+\\mathcal{W}"}
      </MathFormula>
      <p>where:</p>
      <ul>
        <li>
          <MathFormula>{"\\mathcal{F}"}</MathFormula>: SELP–Fe₃O₄ paired fiber
          phase
        </li>
        <li>
          <MathFormula>{"\\mathcal{M}"}</MathFormula>: non-fibrous matrix such
          as unpaired SELP and short peptides
        </li>
        <li>
          <MathFormula>{"\\mathcal{P}"}</MathFormula>: unpaired Fe₃O₄
          nanoparticle phase
        </li>
        <li>
          <MathFormula>{"\\mathcal{W}"}</MathFormula>: H₂O liquid phase
        </li>
      </ul>
      <p>The volume fractions satisfy:</p>
      <MathFormula display>{"\\phi_f+\\phi_m+\\phi_p+\\phi_w=1"}</MathFormula>
      <p>The solid volume fraction is:</p>
      <MathFormula display>{"\\phi_s=\\phi_f+\\phi_m+\\phi_p"}</MathFormula>
      <p>In particular, it is necessary to distinguish:</p>
      <MathFormula display>
        {"\\mathrm{Fe_3O_4}^{\\,\\mathrm{paired}}\\subset\\mathcal{F}"}
      </MathFormula>
      <p>and</p>
      <MathFormula display>
        {"\\mathrm{Fe_3O_4}^{\\,\\mathrm{free}}\\subset\\mathcal{P}"}
      </MathFormula>
      <p>
        Therefore, <MathFormula>{"\\mathcal{P}"}</MathFormula> is the free
        magnetic particle phase.
      </p>
      <p>
        Based on the above assumptions, the total free energy per unit volume is
        written as:
      </p>
      <MathFormula display>
        {
          "\\begin{aligned}\\psi={}&\\psi_{\\mathrm{SELP-Fe_3O_4}}+\\psi_{\\mathrm{fiber}}+\\psi_{\\mathrm{particle}}\\\\&+\\psi_{\\mathrm{orient}}+\\psi_{\\mathrm{dip}}+\\psi_{\\mathrm{crosslink}}+\\psi_{\\mathrm{fluid}}+\\psi_{\\mathrm{coupling}}.\\end{aligned}"
        }
      </MathFormula>
      <h3 className="mt-5 mb-3">1.3 Basic Kinematics</h3>
      <p>
        The solid displacement is denoted by <MathFormula>{"u_i"}</MathFormula>.
        Under the small-deformation assumption, the linear strain tensor is
        defined as:
      </p>
      <MathFormula display>
        {"\\varepsilon_{ij}=\\frac{1}{2}\\left(u_{i,j}+u_{j,i}\\right)"}
      </MathFormula>
      <p>where:</p>
      <MathFormula display>
        {"u_{i,j}=\\frac{\\partial u_i}{\\partial x_j}"}
      </MathFormula>
      <p>The volumetric strain is:</p>
      <MathFormula display>
        {"\\varepsilon_{kk}=\\nabla\\cdot\\mathbf{u}"}
      </MathFormula>

      <h2 className="mt-5 mb-3">2 SELP Non-Fibrous Matrix</h2>
      <p>
        An isotropic linear elastic model is adopted. The matrix free energy
        density per unit volume is:
      </p>
      <MathFormula display>
        {
          "\\psi_m=\\frac{1}{2}\\lambda_m\\varepsilon_{kk}\\varepsilon_{ll}+\\mu_m\\varepsilon_{ij}\\varepsilon_{ij}"
        }
      </MathFormula>
      <p>
        The matrix stress is obtained by differentiating the free energy with
        respect to strain:
      </p>
      <MathFormula display>
        {
          "\\sigma_{ij}^{m}=\\frac{\\partial\\psi_m}{\\partial\\varepsilon_{ij}}"
        }
      </MathFormula>
      <p>Thus:</p>
      <MathFormula display>
        {
          "\\sigma_{ij}^{m}=\\lambda_m\\varepsilon_{kk}\\delta_{ij}+2\\mu_m\\varepsilon_{ij}"
        }
      </MathFormula>
      <p>
        Here, <MathFormula>{"\\lambda_m"}</MathFormula> and{" "}
        <MathFormula>{"\\mu_m"}</MathFormula> are the Lamé constants of the SELP
        non-fibrous matrix, and <MathFormula>{"\\delta_{ij}"}</MathFormula> is
        the Kronecker delta.
      </p>
      <p>The macroscopic matrix stress contribution is:</p>
      <MathFormula display>
        {
          "\\sigma_{ij}^{m,\\mathrm{eff}}=\\phi_m\\left(\\lambda_m\\varepsilon_{kk}\\delta_{ij}+2\\mu_m\\varepsilon_{ij}\\right)"
        }
      </MathFormula>
      {/* Figure reference placeholder from the draft: 图 1 — schematic of the SELP non-fibrous matrix, the fiber phase, and the free particle phase */}

      <h2 className="mt-5 mb-3">3 Magnetic Field Terms</h2>
      <p>The applied magnetic field is:</p>
      <MathFormula display>
        {"\\mathbf{H}=\\mathbf{H}(\\mathbf{x},t)"}
      </MathFormula>
      <p>Its components are:</p>
      <MathFormula display>{"H_i=H_i(\\mathbf{x},t)"}</MathFormula>
      <p>where:</p>
      <MathFormula display>
        {"H_i\\neq \\mathrm{constant},\\qquad H_{i,j}\\neq0"}
      </MathFormula>
      <p>The magnitude of the magnetic field is:</p>
      <MathFormula display>{"H(\\mathbf{x},t)=\\sqrt{H_iH_i}"}</MathFormula>
      <p>The local unit magnetic field direction is:</p>
      <MathFormula display>
        {"h_i(\\mathbf{x},t)=\\frac{H_i(\\mathbf{x},t)}{H(\\mathbf{x},t)}"}
      </MathFormula>
      <p>and satisfies the normalization condition:</p>
      <MathFormula display>{"h_ih_i=1"}</MathFormula>
      <p>Therefore, the magnetic field can be written as:</p>
      <MathFormula display>
        {"H_i(\\mathbf{x},t)=H(\\mathbf{x},t)h_i(\\mathbf{x},t)"}
      </MathFormula>

      <h2 className="mt-5 mb-3">
        4 Orientation Free Energy of Magnetic Fibers under a Nonuniform Field
      </h2>
      <h3 className="mt-5 mb-3">
        4.1 Single-Fiber Magnetic Interaction Energy
      </h3>
      <p>The external-field energy of a magnetic fiber is:</p>
      <MathFormula display>
        {
          "U_H^f(\\mathbf{x},\\mathbf{n})=-\\mu_0m_fH(\\mathbf{x})h_i(\\mathbf{x})n_i"
        }
      </MathFormula>
      <p>The dimensionless form of the external-field energy is:</p>
      <MathFormula display>
        {"\\alpha_f(\\mathbf{x})=\\frac{\\mu_0m_fH(\\mathbf{x})}{k_BT}"}
      </MathFormula>
      <p>Thus:</p>
      <MathFormula display>
        {"U_H^f=-k_BT\\alpha_f(\\mathbf{x})h_i(\\mathbf{x})n_i"}
      </MathFormula>
      <p>
        The spatially dependent fiber orientation probability distribution is:
      </p>
      <MathFormula display>{"\\rho_f(\\mathbf{x},\\mathbf{n})"}</MathFormula>
      <p>and satisfies the normalization constraint:</p>
      <MathFormula display>
        {"\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})\\,d\\Omega=1"}
      </MathFormula>
      <h3 className="mt-5 mb-3">4.2 Fiber Orientation Free Energy</h3>
      <p>The orientation free energy per unit volume of fibers is:</p>
      <MathFormula display>
        {
          "\\begin{aligned}\\psi_{\\mathrm{orient}}^f&=N_f(\\mathbf{x})\\left[k_BT\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})\\ln\\rho_f(\\mathbf{x},\\mathbf{n})\\,d\\Omega\\right.\\\\&\\quad\\left.-\\mu_0m_fH(\\mathbf{x})\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})h_i(\\mathbf{x})n_i\\,d\\Omega\\right].\\end{aligned}"
        }
      </MathFormula>
      <p>
        The first term describes the thermal fluctuation entropy of fiber
        orientation, and the second term describes the coupling between the
        effective magnetic moment of fibers and the external magnetic field.
      </p>
      <h3 className="mt-5 mb-3">
        4.3 Variational Problem with Normalization Constraint
      </h3>
      <p>We construct the functional with a Lagrange multiplier:</p>
      <MathFormula display>
        {
          "\\begin{aligned}\\mathcal{L}[\\rho_f,\\lambda]={}&N_f\\left[k_BT\\int_{S^2}\\rho_f\\ln\\rho_f\\,d\\Omega-\\mu_0m_fH\\int_{S^2}\\rho_fh_in_i\\,d\\Omega\\right]\\\\&+\\lambda(\\mathbf{x})\\left[\\int_{S^2}\\rho_f\\,d\\Omega-1\\right].\\end{aligned}"
        }
      </MathFormula>
      <p>The extremum condition is:</p>
      <MathFormula display>
        {"\\frac{\\delta\\mathcal{L}}{\\delta\\rho_f}=0"}
      </MathFormula>
      <p>This gives the Euler–Lagrange equation:</p>
      <MathFormula display>
        {"N_fk_BT(1+\\ln\\rho_f)-N_f\\mu_0m_fHh_in_i+\\lambda(\\mathbf{x})=0"}
      </MathFormula>
      <p>We define the renormalized Lagrange multiplier:</p>
      <MathFormula display>
        {
          "\\widetilde{\\lambda}(\\mathbf{x})=\\frac{\\lambda(\\mathbf{x})}{N_f(\\mathbf{x})}"
        }
      </MathFormula>
      <p>Then:</p>
      <MathFormula display>
        {
          "k_BT(1+\\ln\\rho_f)-\\mu_0m_fHh_in_i+\\widetilde{\\lambda}(\\mathbf{x})=0"
        }
      </MathFormula>
      <p>Solving gives:</p>
      <MathFormula display>
        {
          "\\rho_f(\\mathbf{x},\\mathbf{n})=C(\\mathbf{x})\\exp\\left[\\alpha_f(\\mathbf{x})h_i(\\mathbf{x})n_i\\right]"
        }
      </MathFormula>
      <p>
        The normalization condition determines{" "}
        <MathFormula>{"C(\\mathbf{x})"}</MathFormula>:
      </p>
      <MathFormula display>
        {
          "C(\\mathbf{x})=\\frac{\\alpha_f(\\mathbf{x})}{4\\pi\\sinh\\alpha_f(\\mathbf{x})}"
        }
      </MathFormula>
      <p>The final local equilibrium orientation distribution is:</p>
      <MathFormula display>
        {
          "\\rho_f(\\mathbf{x},\\mathbf{n})=\\frac{\\alpha_f(\\mathbf{x})}{4\\pi\\sinh\\alpha_f(\\mathbf{x})}\\exp\\left[\\alpha_f(\\mathbf{x})h_i(\\mathbf{x})n_i\\right]"
        }
      </MathFormula>
      <p>where:</p>
      <MathFormula display>
        {"\\alpha_f(\\mathbf{x})=\\frac{\\mu_0m_fH(\\mathbf{x})}{k_BT}"}
      </MathFormula>
      <h3 className="mt-5 mb-3">4.4 Mean Fiber Orientation</h3>
      <p>
        From the local equilibrium distribution, the mean fiber direction can be
        calculated as:
      </p>
      <MathFormula display>
        {"\\langle n_i\\rangle=\\int_{S^2}\\rho_f n_i\\,d\\Omega"}
      </MathFormula>
      <p>
        Because the problem is axisymmetric about the magnetic field direction{" "}
        <MathFormula>{"\\mathbf{h}"}</MathFormula>, we have:
      </p>
      <MathFormula display>
        {"\\langle n_i\\rangle=L(\\alpha_f)h_i"}
      </MathFormula>
      <p>
        where <MathFormula>{"L(\\alpha_f)"}</MathFormula> is the Langevin
        function:
      </p>
      <MathFormula display>
        {"L(\\alpha_f)=\\coth\\alpha_f-\\frac{1}{\\alpha_f}"}
      </MathFormula>
      <p>Therefore:</p>
      <MathFormula display>
        {"\\langle\\mathbf{n}\\rangle=L(\\alpha_f)\\mathbf{h}"}
      </MathFormula>
      <h3 className="mt-5 mb-3">
        4.5 Relation to Second- and Fourth-Order Orientation Tensors
      </h3>
      <p>The second-order fiber orientation tensor is defined as:</p>
      <MathFormula display>
        {
          "A_{ij}^{(2)}=\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})n_in_j\\,d\\Omega"
        }
      </MathFormula>
      <p>The fourth-order orientation tensor is defined as:</p>
      <MathFormula display>
        {
          "A_{ijkl}^{(4)}=\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})n_in_jn_kn_l\\,d\\Omega"
        }
      </MathFormula>
      <p>where:</p>
      <MathFormula display>{"A_{ii}^{(2)}=1"}</MathFormula>
      <p>
        Since{" "}
        <MathFormula>{"\\rho_f=\\rho_f(\\mathbf{x},\\mathbf{n})"}</MathFormula>,
        we have, under a nonuniform magnetic field:
      </p>
      <MathFormula display>
        {
          "A_{ij}^{(2)}=A_{ij}^{(2)}(\\mathbf{x}),\\qquad A_{ijkl}^{(4)}=A_{ijkl}^{(4)}(\\mathbf{x})"
        }
      </MathFormula>
      <p>
        Thus, the macroscopic mechanical response of the fiber network also
        becomes spatially dependent.
      </p>

      <h2 className="mt-5 mb-3">
        5 Wilson Fiber Free Energy per Unit Volume and Stress Tensor
      </h2>
      <p>
        Let the unit fiber direction be <MathFormula>{"n_i"}</MathFormula>. The
        axial strain along the fiber direction is:
      </p>
      <MathFormula display>
        {"\\varepsilon_f=n_in_j\\varepsilon_{ij}"}
      </MathFormula>
      <p>
        <MathFormula>{"E_f"}</MathFormula> is defined as the effective
        Young&apos;s modulus along the fiber axis of the SELP–Fe₃O₄ paired fiber
        network, namely:
      </p>
      <MathFormula display>
        {"E_f=\\frac{\\partial\\sigma_f}{\\partial\\varepsilon_f}"}
      </MathFormula>
      <p>
        For a linear elastic fiber aligned along{" "}
        <MathFormula>{"n_i"}</MathFormula>, the axial elastic energy per unit
        volume is:
      </p>
      <MathFormula display>
        {
          "\\psi_f(\\mathbf{n})=\\int_0^{\\varepsilon_f}\\sigma_f(\\varepsilon_f')\\,d\\varepsilon_f'"
        }
      </MathFormula>
      <p>Under linear elasticity and small deformation:</p>
      <MathFormula display>{"\\sigma_f=E_f\\varepsilon_f"}</MathFormula>
      <p>Using the Einstein summation convention, this can be written as:</p>
      <MathFormula display>
        {
          "\\psi_f(\\mathbf{n})=\\frac{1}{2}E_fn_in_jn_kn_l\\varepsilon_{ij}\\varepsilon_{kl}"
        }
      </MathFormula>
      <p>
        Averaging over all fiber directions gives the Wilson-type fiber network
        free energy per unit volume:
      </p>
      <MathFormula display>
        {
          "\\psi_f^{\\mathrm{W}}=\\phi_f\\int_{S^2}\\rho_f(\\mathbf{x},\\mathbf{n})\\frac{1}{2}E_fn_in_jn_kn_l\\varepsilon_{ij}\\varepsilon_{kl}\\,d\\Omega"
        }
      </MathFormula>
      <p>or equivalently:</p>
      <MathFormula display>
        {
          "\\psi_f^{\\mathrm{W}}(\\mathbf{x})=\\frac{1}{2}\\phi_f(\\mathbf{x})E_fA_{ijkl}^{(4)}(\\mathbf{x})\\varepsilon_{ij}(\\mathbf{x})\\varepsilon_{kl}(\\mathbf{x})"
        }
      </MathFormula>
      <p>where:</p>
      <MathFormula display>
        {"\\varepsilon_{ij}=\\frac{1}{2}\\left(u_{i,j}+u_{j,i}\\right)"}
      </MathFormula>
      <p>The fiber stress tensor is:</p>
      <MathFormula display>
        {
          "\\sigma_{ij}^{f}=\\frac{\\partial\\psi_f^{\\mathrm{W}}}{\\partial\\varepsilon_{ij}}"
        }
      </MathFormula>
      <MathFormula display>
        {
          "\\sigma_{ij}^f(\\mathbf{x})=\\phi_f(\\mathbf{x})E_fA_{ijkl}^{(4)}(\\mathbf{x})\\varepsilon_{kl}(\\mathbf{x})"
        }
      </MathFormula>
      <p>Its derivative with respect to j is:</p>
      <MathFormula display>
        {
          "\\sigma_{ij,j}^f=\\left[\\phi_fE_fA_{ijkl}^{(4)}\\varepsilon_{kl}\\right]_{,j}"
        }
      </MathFormula>
      <p>Expanding:</p>
      <MathFormula display>
        {
          "\\begin{aligned}\\sigma_{ij,j}^f={}&\\phi_{f,j}E_fA_{ijkl}^{(4)}\\varepsilon_{kl}\\\\&+\\phi_fE_fA_{ijkl,j}^{(4)}\\varepsilon_{kl}\\\\&+\\phi_fE_fA_{ijkl}^{(4)}\\varepsilon_{kl,j}.\\end{aligned}"
        }
      </MathFormula>
      {/* Figure reference placeholder from the draft: 图 4 — Wilson fiber network, single-fiber axial strain, and statistical averaging */}

      <h2 className="mt-5 mb-3">6 Free Fe₃O₄ Particle Model</h2>
      <p>
        This section separately considers free Fe₃O₄ nanoparticles that are not
        paired with SELP. Their magnetic response is described by the classical
        Langevin model.
      </p>
      <p>
        Assume the free Fe₃O₄ nanoparticle is spherical with diameter{" "}
        <MathFormula>{"d_p"}</MathFormula>. Its single-particle volume is:
      </p>
      <MathFormula display>{"V_p=\\frac{\\pi}{6}d_p^3"}</MathFormula>
      <p>
        For a Fe₃O₄ nanoparticle with diameter{" "}
        <MathFormula>{"20\\,\\mathrm{nm}"}</MathFormula>:
      </p>
      <MathFormula display>{"d_p=20\\times10^{-9}\\,\\mathrm{m}"}</MathFormula>
      <p>Thus:</p>
      <MathFormula display>
        {
          "V_p=\\frac{\\pi}{6}\\left(20\\times10^{-9}\\right)^3\\approx4.19\\times10^{-24}\\,\\mathrm{m}^3"
        }
      </MathFormula>
      <p>
        Using the saturation magnetization <MathFormula>{"M_s"}</MathFormula> to
        characterize the magnetic moment density of Fe₃O₄ particles, the maximum
        magnetic moment of a single particle is:
      </p>
      <MathFormula display>{"m_p=M_sV_p"}</MathFormula>
      <p>
        Introducing the unit vector <MathFormula>{"s_i"}</MathFormula>{" "}
        describing the magnetic moment direction, the particle magnetic moment
        can be written as:
      </p>
      <MathFormula display>{"m_i=m_ps_i,\\qquad s_is_i=1"}</MathFormula>
      <p>
        For a single free Fe₃O₄ nanoparticle located at{" "}
        <MathFormula>{"\\mathbf{x}"}</MathFormula>, the interaction energy
        between its magnetic moment and the external field is:
      </p>
      <MathFormula display>{"U_p=-\\mu_0m_iH_i"}</MathFormula>
      <p>Substituting gives:</p>
      <MathFormula display>{"U_p=-\\mu_0m_ps_iH_i"}</MathFormula>
      <p>
        Using <MathFormula>{"H_i=Hh_i"}</MathFormula> and defining the angle
        between the particle magnetic moment and the local field direction as{" "}
        <MathFormula>{"\\theta"}</MathFormula>, we have:
      </p>
      <MathFormula display>{"s_ih_i=\\cos\\theta"}</MathFormula>
      <p>Thus:</p>
      <MathFormula display>{"U_p=-\\mu_0m_pH\\cos\\theta"}</MathFormula>
      <p>The dimensionless Langevin parameter is defined as:</p>
      <MathFormula display>
        {"\\xi_p(\\mathbf{x},t)=\\frac{\\mu_0m_pH(\\mathbf{x},t)}{k_BT}"}
      </MathFormula>
      <p>
        Using the above definition, the single-particle magnetic interaction
        energy can be written as:
      </p>
      <MathFormula display>{"U_p=-k_BT\\xi_p\\cos\\theta"}</MathFormula>
      <p>The single-particle orientation partition function is defined as:</p>
      <MathFormula display>
        {"Z_p=\\int_{S^2}\\exp\\left(\\xi_ps_ih_i\\right)\\,d\\Omega"}
      </MathFormula>
      <p>Integrating gives:</p>
      <MathFormula display>
        {"Z_p=4\\pi\\frac{\\sinh\\xi_p}{\\xi_p}"}
      </MathFormula>
      <p>The single-particle free energy is:</p>
      <MathFormula display>
        {
          "F_p=-k_BT\\ln Z_p=-k_BT\\ln\\left(4\\pi\\frac{\\sinh\\xi_p}{\\xi_p}\\right)"
        }
      </MathFormula>
      <p>
        Differentiating the single-particle magnetic free energy with respect to{" "}
        <MathFormula>{"\\xi_p"}</MathFormula> gives:
      </p>
      <MathFormula display>
        {
          "\\frac{\\partial F_p^{\\mathrm{mag}}}{\\partial\\xi_p}=-k_BT\\left(\\coth\\xi_p-\\frac{1}{\\xi_p}\\right)=-k_BTL(\\xi_p)"
        }
      </MathFormula>
      <p>
        The average magnetic moment along the local field direction is obtained
        by differentiating the free energy with respect to the magnetic field:
      </p>
      <MathFormula display>
        {
          "\\langle m_{\\parallel}^p\\rangle=-\\frac{1}{\\mu_0}\\frac{\\partial F_p^{\\mathrm{mag}}}{\\partial H}=m_pL(\\xi_p)"
        }
      </MathFormula>
      <p>
        Because the system is axisymmetric about the local magnetic field
        direction, the average magnetic moment is aligned with the local field:
      </p>
      <MathFormula display>
        {"\\langle m_i^p\\rangle=m_pL(\\xi_p)h_i"}
      </MathFormula>
      <p>
        Let <MathFormula>{"N_p"}</MathFormula> be the number density of free
        Fe₃O₄ nanoparticles per unit total volume:
      </p>
      <MathFormula display>{"N_p=\\frac{N}{V}"}</MathFormula>
      <p>
        Thus, the average magnetic moment of all particles per unit volume is:
      </p>
      <MathFormula display>
        {"\\mathbf{M}^p=N_pm_pL(\\xi_p)\\mathbf{h}"}
      </MathFormula>
      <p>In a nonuniform magnetic field:</p>
      <MathFormula display>
        {
          "N_p=N_p(\\mathbf{x}),\\qquad \\xi_p=\\xi_p(\\mathbf{x}),\\qquad h_i=h_i(\\mathbf{x})"
        }
      </MathFormula>
      <p>The local magnetization of free particles is:</p>
      <MathFormula display>
        {
          "M_i^p(\\mathbf{x},t)=N_p(\\mathbf{x})m_pL[\\xi_p(\\mathbf{x})]h_i(\\mathbf{x})"
        }
      </MathFormula>
      <p>
        The free energy density of free magnetic particles interacting with the
        external field is:
      </p>
      <MathFormula display>
        {
          "\\psi_p^{\\mathrm{mag}}(\\mathbf{x})=-N_p(\\mathbf{x})k_BT\\ln\\left[\\frac{\\sinh\\xi_p(\\mathbf{x})}{\\xi_p(\\mathbf{x})}\\right]"
        }
      </MathFormula>
    </>
  );
}
