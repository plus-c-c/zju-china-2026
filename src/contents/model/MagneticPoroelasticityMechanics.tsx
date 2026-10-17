import { MathFormula } from "../../components/MathFormula";

export function MagneticPoroelasticityMechanics() {
  return (
    <>
      <h2 className="mt-5 mb-3">7. Water Phase and Poroelastic Coupling</h2>
      <p>
        In the SELP–Fe₃O₄ four-phase system, the water phase exists as a pore
        fluid within the porous structure formed by SELP fibers and Fe₃O₄
        nanoparticles. The water phase itself does not carry the shear
        deformation of the solid phase; its main mechanical role is coupled to
        the solid phase through pore water pressure and relative flow.
      </p>
      <h3 className="mt-5 mb-3">7.1 Basic Assumptions for the Water Phase</h3>
      <p>
        The water phase is treated as a continuous liquid with approximate
        incompressibility. The pore water pressure is defined as:
      </p>
      <MathFormula display>{"p_w=p_w(x_i,t)"}</MathFormula>
      <p>
        Neglecting viscous shear stress and inertia of the water phase, its
        stress tensor is mainly isotropic pressure:
      </p>
      <MathFormula display>{"\\sigma_{ij}^{w}=-p_w\\delta_{ij}"}</MathFormula>
      <p>
        Here, <MathFormula>{"\\delta_{ij}"}</MathFormula> is the identity
        tensor. Isotropic water pressure does not imply isotropic seepage.
        Because the magnetic fiber network is directional, the pore structure
        can exhibit pronounced anisotropic permeability.
      </p>
      <h3 className="mt-5 mb-3">
        7.2 Mass Conservation of Solid and Water Phases
      </h3>
      <p>The solid displacement is:</p>
      <MathFormula display>{"u_i=u_i(\\mathbf{x},t)"}</MathFormula>
      <p>The solid velocity is:</p>
      <MathFormula display>{"v_i^s=\\dot{u}_i"}</MathFormula>
      <p>The water velocity is:</p>
      <MathFormula display>{"v_i^w"}</MathFormula>
      <p>The relative flow of water with respect to the solid is defined as:</p>
      <MathFormula display>
        {"q_i=\\phi_w\\left(v_i^w-v_i^s\\right)"}
      </MathFormula>
      <p>
        where <MathFormula>{"\\phi_w"}</MathFormula> is the water volume
        fraction.
      </p>
      <p>Thus, the total volumetric flux of water can be expressed as:</p>
      <MathFormula display>{"\\phi_wv_i^w=\\phi_wv_i^s+q_i"}</MathFormula>
      <p>
        Since the solid is approximately incompressible with constant intrinsic
        density <MathFormula>{"\\rho_s"}</MathFormula>, its mass conservation
        equation is:
      </p>
      <MathFormula display>
        {
          "\\frac{\\partial(\\phi_s\\rho_s)}{\\partial t}+\\left(\\phi_s\\rho_sv_i^s\\right)_{,i}=0"
        }
      </MathFormula>
      <p>
        Similarly, the water phase is approximately incompressible with constant
        intrinsic density <MathFormula>{"\\rho_w"}</MathFormula>, and its mass
        conservation equation is:
      </p>
      <MathFormula display>
        {
          "\\frac{\\partial(\\phi_w\\rho_w)}{\\partial t}+\\left(\\phi_w\\rho_wv_i^w\\right)_{,i}=0"
        }
      </MathFormula>
      <p>Thus:</p>
      <MathFormula display>
        {"\\dot{\\phi}_w+\\left(\\phi_wv_i^w\\right)_{,i}=0"}
      </MathFormula>
      <p>Expanding:</p>
      <MathFormula display>
        {"\\dot{\\phi}_w+\\phi_{w,i}v_i^s+\\phi_wv_{i,i}^s+q_{i,i}=0"}
      </MathFormula>
      <p>Since the solid and water phases together fill the mixture space:</p>
      <MathFormula display>{"\\phi_s+\\phi_w=1"}</MathFormula>
      <p>Therefore:</p>
      <MathFormula display>{"\\phi_w=1-\\phi_s"}</MathFormula>
      <p>The water mass conservation equation reduces to:</p>
      <MathFormula display>{"v_{i,i}^s+q_{i,i}=0"}</MathFormula>
      <p>Under small deformation:</p>
      <MathFormula display>{"v_i^s=\\dot{u}_i"}</MathFormula>
      <p>
        Thus, the mixture mass conservation equation under approximately
        incompressible solid and water phases is:
      </p>
      <MathFormula display>{"\\dot{u}_{i,i}+q_{i,i}=0"}</MathFormula>
      <p>Substituting Darcy&apos;s law:</p>
      <MathFormula display>{"q_i=-K_{ij}p_{w,j}"}</MathFormula>
      <p>into the mass conservation equation gives:</p>
      <MathFormula display>
        {"\\dot{u}_{i,i}-\\left(K_{ij}p_{w,j}\\right)_{,i}=0"}
      </MathFormula>
      <h3 className="mt-5 mb-3">
        7.3 Spatially Nonuniform Anisotropic Permeability
      </h3>
      <p>
        Because the nonuniform magnetic field makes the fiber orientation
        distribution spatially dependent, the permeability also becomes a
        spatially dependent tensor field:
      </p>
      <MathFormula display>{"K_{ij}=K_{ij}(\\mathbf{x})"}</MathFormula>
      <p>
        Considering the influence of fiber orientation on pore structure, the
        permeability tensor is defined as:
      </p>
      <MathFormula display>
        {
          "K_{ij}=k_{\\perp}\\delta_{ij}+\\left(k_{\\parallel}-k_{\\perp}\\right)A_{ij}^{(2)}(\\mathbf{x})"
        }
      </MathFormula>
      <p>
        Here, <MathFormula>{"k_{\\parallel}"}</MathFormula> and{" "}
        <MathFormula>{"k_{\\perp}"}</MathFormula> denote the permeabilities
        along and perpendicular to the dominant fiber orientation, respectively.
      </p>
      <p>Using the product rule:</p>
      <MathFormula display>
        {"\\left(K_{ij}p_{w,j}\\right)_{,i}=K_{ij,i}p_{w,j}+K_{ij}p_{w,ji}"}
      </MathFormula>
      <p>Therefore, the exact mass conservation equation is:</p>
      <MathFormula display>
        {"\\dot{u}_{i,i}-K_{ij,i}p_{w,j}-K_{ij}p_{w,ji}=0"}
      </MathFormula>
      <p>
        If <MathFormula>{"k_{\\parallel}"}</MathFormula> and{" "}
        <MathFormula>{"k_{\\perp}"}</MathFormula> are constants, then:
      </p>
      <MathFormula display>
        {"K_{ij,i}=\\left(k_{\\parallel}-k_{\\perp}\\right)A_{ij,i}^{(2)}"}
      </MathFormula>
      <p>Thus:</p>
      <MathFormula display>
        {
          "\\dot{u}_{i,i}-\\left(k_{\\parallel}-k_{\\perp}\\right)A_{ij,i}^{(2)}p_{w,j}-K_{ij}p_{w,ji}=0"
        }
      </MathFormula>
      <h3 className="mt-5 mb-3">
        7.4 Poroelastic Coupling between Water and Solid Phases
      </h3>
      <p>
        The water phase acts on the solid through pore pressure. Using the
        Mow–Biot effective stress decomposition, the total stress can be written
        as:
      </p>
      <MathFormula display>
        {"\\sigma_{ij}=\\sigma_{ij}^{\\mathrm{eff}}-\\alpha_Bp_w\\delta_{ij}"}
      </MathFormula>
      <p>
        Here, <MathFormula>{"\\sigma_{ij}^{\\mathrm{eff}}"}</MathFormula> is the
        effective solid stress and <MathFormula>{"\\alpha_B"}</MathFormula> is
        the Biot coefficient.
      </p>
      <p>
        For approximately incompressible, highly hydrated soft tissues, one may
        take:
      </p>
      <MathFormula display>{"\\alpha_B\\approx1"}</MathFormula>
      <p>Therefore:</p>
      <MathFormula display>
        {"\\sigma_{ij}=\\sigma_{ij}^{\\mathrm{eff}}-p_w\\delta_{ij}"}
      </MathFormula>
      <p>Since:</p>
      <MathFormula display>
        {"\\left(-p_w\\delta_{ij}\\right)_{,j}=-p_{w,i}"}
      </MathFormula>
      <p>
        The pore water pressure eventually enters the force balance equation in
        the form of a pressure gradient.
      </p>

      <h2 className="mt-5 mb-3">8. Photocrosslinking Free Energy</h2>
      <h3 className="mt-5 mb-3">8.1 Basic Idea of Photocrosslinking</h3>
      <p>
        The fiber orientation probability distribution before photocrosslinking
        is:
      </p>
      <MathFormula display>{"\\rho_f^*(\\mathbf{x},\\mathbf{n})"}</MathFormula>
      <p>
        The fiber orientation probability distribution after photocrosslinking
        is:
      </p>
      <MathFormula display>{"\\rho_f(\\mathbf{x},\\mathbf{n})"}</MathFormula>
      <p>The experimental process is:</p>
      <p>
        Nonuniform magnetic field → Fe₃O₄–SELP fiber alignment →
        photocrosslinking → removal of the magnetic field
      </p>
      <p>
        Therefore, before photocrosslinking, the nonuniform magnetic field first
        induces a spatially varying orientation distribution of Fe₃O₄–SELP
        magnetic fibers:
      </p>
      <MathFormula display>
        {
          "\\rho_f^*(\\mathbf{x},\\mathbf{n})=\\frac{\\alpha_f(\\mathbf{x})}{4\\pi\\sinh\\left(\\alpha_f(\\mathbf{x})\\right)}\\exp\\left[\\alpha_f(\\mathbf{x})h_i(\\mathbf{x})n_i\\right]"
        }
      </MathFormula>
      <p>
        Photocrosslinking fixes this spatially nonuniform orientation structure,
        so that the magnetic-field-induced fiber orientation is retained after
        the field is removed.
      </p>
      <h3 className="mt-5 mb-3">8.2 Photocrosslinking Free Energy</h3>
      <p>
        To describe the locking effect of photocrosslinking on fiber
        orientation, we introduce the structural memory free energy per unit
        volume:
      </p>
      <MathFormula display>
        {
          "\\psi_{\\mathrm{lock}}=\\frac12 N_f(\\mathbf{x})k_c\\eta_c\\int_{S^2}\\left[\\rho_f(\\mathbf{x},\\mathbf{n})-\\rho_f^*(\\mathbf{x},\\mathbf{n})\\right]^2\\,d\\Omega"
        }
      </MathFormula>
      <p>where:</p>
      <MathFormula display>{"0\\leq\\eta_c\\leq1"}</MathFormula>
      <p>
        is the dimensionless photocrosslinking degree parameter, and{" "}
        <MathFormula>{"k_c"}</MathFormula> is the orientation locking stiffness.
      </p>
      <p>
        The larger <MathFormula>{"k_c"}</MathFormula> is, the more difficult it
        is for the fiber orientation to change.
      </p>

      <h2 className="mt-5 mb-3">9. Total Free Energy per Unit Volume</h2>
      <h3 className="mt-5 mb-3">
        9.1 Before Photocrosslinking, with Magnetic Field
      </h3>
      <p>
        Considering the non-fibrous SELP matrix, magnetic fibers, unpaired Fe₃O₄
        particles, dipolar interactions, and pore fluid, before
        photocrosslinking, the total free energy per unit volume can be written
        as:
      </p>
      <MathFormula display>
        {
          "\\begin{aligned}\\psi={}&\\phi_m\\left[\\frac{1}{2}\\lambda_m\\varepsilon_{kk}\\varepsilon_{ll}+\\mu_m\\varepsilon_{ij}\\varepsilon_{ij}\\right]\\\\&+\\frac{1}{2}\\phi_fE_fA_{ijkl}^{(4)}\\varepsilon_{ij}\\varepsilon_{kl}\\\\&+\\psi_{\\mathrm{dip}}\\\\&+N_f\\left[k_BT\\int_{S^2}\\rho_f\\ln\\rho_f\\,d\\Omega-\\mu_0m_fH\\int_{S^2}\\rho_fh_in_i\\,d\\Omega\\right]\\\\&-N_pk_BT\\ln\\left(\\frac{\\sinh\\xi_p}{\\xi_p}\\right)\\\\&-p_w\\varepsilon_{kk}.\\end{aligned}"
        }
      </MathFormula>
      <p>
        Here, the dimensionless magnetic field parameter for unpaired Fe₃O₄
        nanoparticles is:
      </p>
      <MathFormula display>
        {"\\xi_p(\\mathbf{x})=\\frac{\\mu_0m_pH(\\mathbf{x})}{k_BT}"}
      </MathFormula>
      <p>
        The magnetic-field-induced reference fiber orientation distribution is:
      </p>
      <MathFormula display>
        {
          "\\rho_f^*(\\mathbf{x},\\mathbf{n})=\\frac{\\exp\\left[\\alpha_f(\\mathbf{x})h_i(\\mathbf{x})n_i\\right]}{4\\pi\\sinh\\left(\\alpha_f(\\mathbf{x})\\right)/\\alpha_f(\\mathbf{x})}"
        }
      </MathFormula>
      <p>where:</p>
      <MathFormula display>
        {"\\alpha_f(\\mathbf{x})=\\frac{\\mu_0m_fH(\\mathbf{x})}{k_BT}"}
      </MathFormula>
      <p>
        denotes the dimensionless magnetic field strength of magnetic fibers in
        the local field.
      </p>
      <h3 className="mt-5 mb-3">
        9.2 Reference Orientation Structure after Photocrosslinking
      </h3>
      <p>
        After photocrosslinking, the fiber orientation is fixed. Therefore, in
        the subsequent mechanical loading stage under the small-deformation
        approximation, the fiber orientation distribution can be treated as a
        known spatial field in the reference configuration:
      </p>
      <MathFormula display>
        {
          "\\rho_f^{\\mathrm{ref}}(\\mathbf{x},\\mathbf{n})=\\rho_f^*(\\mathbf{x},\\mathbf{n})"
        }
      </MathFormula>
      <p>
        This represents the magnetic-field-induced orientation structure frozen
        by photocrosslinking.
      </p>
      <p>The reference fourth-order orientation tensor is defined as:</p>
      <MathFormula display>
        {
          "A_{ijkl}^{\\mathrm{ref}}(\\mathbf{x})=\\int_{S^2}\\rho_f^{\\mathrm{ref}}(\\mathbf{x},\\mathbf{n})n_in_jn_kn_l\\,d\\Omega"
        }
      </MathFormula>
      <p>
        Thus, in subsequent finite element mechanical analysis,{" "}
        <MathFormula>{"\\rho_f"}</MathFormula> no longer needs to be solved as
        an additional unknown field;{" "}
        <MathFormula>{"A_{ijkl}^{\\mathrm{ref}}(\\mathbf{x})"}</MathFormula> can
        be directly used as a spatially nonuniform material parameter.
      </p>
      <h3 className="mt-5 mb-3">
        9.3 After Photocrosslinking and Removal of the Magnetic Field
      </h3>
      <p>
        After photocrosslinking and removal of the magnetic field, the free
        energy per unit volume is:
      </p>
      <MathFormula display>
        {
          "\\begin{aligned}\\psi={}&\\phi_m\\left[\\frac{1}{2}\\lambda_m\\varepsilon_{kk}\\varepsilon_{ll}+\\mu_m\\varepsilon_{ij}\\varepsilon_{ij}\\right]\\\\&+\\frac{1}{2}\\phi_fE_fA_{ijkl}^{(4)}\\varepsilon_{ij}\\varepsilon_{kl}\\\\&+\\psi_{\\mathrm{dip}}\\\\&+N_f\\left[k_BT\\int_{S^2}\\rho_f\\ln\\rho_f\\,d\\Omega\\right]\\\\&-p_w\\varepsilon_{kk}.\\end{aligned}"
        }
      </MathFormula>
      <p>The total stress can be written as:</p>
      <MathFormula display>
        {
          "\\begin{aligned}\\sigma_{ij}={}&\\phi_m\\left(\\lambda_m\\varepsilon_{kk}\\delta_{ij}+2\\mu_m\\varepsilon_{ij}\\right)\\\\&+\\phi_fE_fA_{ijkl}^{\\mathrm{ref}}(\\mathbf{x})\\varepsilon_{kl}\\\\&+\\sigma_{ij}^{\\mathrm{dip}}-p_w\\delta_{ij}.\\end{aligned}"
        }
      </MathFormula>
      <p>
        Here, the stress corresponding to dipolar interactions is defined as:
      </p>
      <MathFormula display>
        {
          "\\sigma_{ij}^{\\mathrm{dip}}=\\frac{\\partial\\psi_{\\mathrm{dip}}}{\\partial\\varepsilon_{ij}}"
        }
      </MathFormula>
      <p>
        If magnetic nanoparticle interactions are neglected after removing the
        field, one may take:
      </p>
      <MathFormula display>{"\\sigma_{ij}^{\\mathrm{dip}}=0"}</MathFormula>
      <p>Then the total stress simplifies to:</p>
      <MathFormula display>
        {
          "\\begin{aligned}\\sigma_{ij}={}&\\phi_m\\left(\\lambda_m\\varepsilon_{kk}\\delta_{ij}+2\\mu_m\\varepsilon_{ij}\\right)\\\\&+\\phi_fE_fA_{ijkl}^{\\mathrm{ref}}(\\mathbf{x})\\varepsilon_{kl}-p_w\\delta_{ij}.\\end{aligned}"
        }
      </MathFormula>

      <h2 className="mt-5 mb-3">
        10. Mechanical Equilibrium and Finite Element Governing Equations
      </h2>
      <p>
        Under quasi-static conditions with inertia neglected, the material
        satisfies:
      </p>
      <MathFormula display>{"\\sigma_{ij,j}+b_i=0"}</MathFormula>
      <p>
        where <MathFormula>{"b_i"}</MathFormula> is the body force per unit
        volume.
      </p>
      <p>
        After removing the magnetic field, completing photocrosslinking, and
        applying mechanical loading, the model satisfies:
      </p>
      <MathFormula display>
        {
          "\\begin{aligned}\\sigma_{ij,j}+b_i&=0,\\\\\\sigma_{ij}&=\\phi_m\\left(\\lambda_m\\varepsilon_{kk}\\delta_{ij}+2\\mu_m\\varepsilon_{ij}\\right)+\\phi_fE_fA_{ijkl}^{\\mathrm{ref}}(\\mathbf{x})\\varepsilon_{kl}-p_w\\delta_{ij},\\\\\\varepsilon_{ij}&=\\frac{1}{2}\\left(u_{i,j}+u_{j,i}\\right),\\\\\\dot{u}_{i,i}+q_{i,i}&=0,\\\\q_i&=-K_{ij}p_{w,j}.\\end{aligned}"
        }
      </MathFormula>
      <p>
        Here, the reference orientation tensor is determined by the fiber
        orientation induced by the nonuniform magnetic field:
      </p>
      <MathFormula display>
        {
          "A_{ijkl}^{\\mathrm{ref}}(\\mathbf{x})=\\int_{S^2}\\rho_f^*(\\mathbf{x},\\mathbf{n})n_in_jn_kn_l\\,d\\Omega"
        }
      </MathFormula>
      <p>
        For steady state, no external body force, and stress loading on the
        boundary, the equations and boundary conditions are:
      </p>
      <MathFormula display>
        {
          "\\begin{aligned}\\sigma_{ij,j}&=0,\\\\\\sigma_{ij}&=\\phi_m\\left(\\lambda_m\\varepsilon_{kk}\\delta_{ij}+2\\mu_m\\varepsilon_{ij}\\right)+\\phi_fE_fA_{ijkl}^{\\mathrm{ref}}(\\mathbf{x})\\varepsilon_{kl}-p_w\\delta_{ij},\\\\\\varepsilon_{ij}&=\\frac{1}{2}\\left(u_{i,j}+u_{j,i}\\right),\\\\q_{i,i}&=0,\\\\q_i&=-K_{ij}p_{w,j}.\\end{aligned}"
        }
      </MathFormula>
      <p>
        The magnetic-field-induced reference fiber orientation distribution is:
      </p>
      <MathFormula display>
        {
          "\\rho_f^*(\\mathbf{x},\\mathbf{n})=\\frac{\\exp\\left[\\alpha_f(\\mathbf{x})h_i(\\mathbf{x})n_i\\right]}{4\\pi\\sinh\\left(\\alpha_f(\\mathbf{x})\\right)/\\alpha_f(\\mathbf{x})}"
        }
      </MathFormula>
      <p>where:</p>
      <MathFormula display>
        {"\\alpha_f(\\mathbf{x})=\\frac{\\mu_0m_fH(\\mathbf{x})}{k_BT}"}
      </MathFormula>
      {/* Figure reference placeholder from the draft: 图 8 — finite element boundary conditions, spatially nonuniform material parameters, and solution workflow */}
      {/* Draft placeholder: section 11 "Model 页面配图设计" (Figure Design for the Model Page) is an empty section, content not yet written */}
    </>
  );
}
