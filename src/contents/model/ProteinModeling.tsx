import { MathFormula } from "../../components/MathFormula";

export function ProteinModeling() {
  return (
    <>
      {/* Draft note "蛋白质建模wiki部分": internal note; the Model page title is supplied by the site header */}
      <h2 className="mb-4">Modeling of 2KY-10-SnoopyTag Hydrogels</h2>
      <h3 className="mt-5 mb-3">
        Research Question and Modeling Starting Point
      </h3>
      <p>
        We set out to understand a question directly relevant to protein
        hydrogel design:{" "}
        <strong>
          how many crosslinks does tyrosine participate in, and how many of
          these crosslinks actually translate into the load-bearing capacity of
          the material?
        </strong>{" "}
        Around this question, the wet-lab work was designed to include protein
        crosslinking, tyrosine crosslinking fraction assays, and mechanical
        modulus measurements. Modeling starts from the single-chain structure
        and the crosslinked network, defining for the experiments the variables
        that need to be controlled, the quantities that need to be measured
        jointly, and the mechanistic hypotheses worth testing.
      </p>
      <p>
        We took <strong>2KY-10</strong> as the modeling target, where SELP
        denotes silk-elastin-like protein. The construct consists of 564 amino
        acids, and each single chain contains 14 Tyr residues.
      </p>
      <p>
        We divided the problem into four consecutive stages: (1) all-atom
        molecular dynamics (FAMD) provides single-chain conformations; (2)
        Martini coarse-graining makes multichain simulations in water feasible;
        (3) a crosslinked network model simulates the actual crosslinking
        situation; (4) production simulations examine the stress response and
        the Young&apos;s modulus.
      </p>
      <h2 className="mt-5 mb-3">FAMD All-Atom Molecular Dynamics</h2>
      <h3 className="mt-5 mb-3">1.1 Generation of the Starting Model</h3>
      <p>
        We first used Chimera to build a fully extended single protein chain,
        and then performed all-atom molecular dynamics (FAMD) simulations with
        NAMD to generate a credible single-chain structure, providing a
        geometric starting point for subsequent multichain placement and
        crosslink-site pairing.
      </p>
      <h3 className="mt-5 mb-3">
        1.2 Enhanced Sampling to Obtain Multiple Candidate Conformations
      </h3>
      <p>
        In NAMD we adopted the CHARMM36m force field, GBIS implicit solvent, and
        an ionic strength of 0.15 M, together with TIGER2 enhanced sampling{" "}
        <sup>
          [<a href="#ref-modeling-1">1</a>,<a href="#ref-modeling-2">2</a>]
        </sup>
        . The force field describes interatomic interactions, while the implicit
        solvent approximates the influence of water with a continuum
        environment, lowering the cost of single-chain sampling. Four replicas
        covered 280–400 K, with the aim of increasing the chance that the single
        chain explores different conformations. This temperature range is a
        sampling setting and does not mean that the wet-lab experiments have
        been tested over the same range.
      </p>
      <p>
        Each replica was run for 100 ns, and subsequent analyses selected
        conformations according to the actual temperature. After extracting 100
        frames from the late-stage interval at 280 K, we performed
        average-linkage hierarchical clustering according to the Cα-atom
        root-mean-square deviation (RMSD) with a cutoff of 6 Å, obtaining
        several conformational clusters. We selected the actual frame that best
        represents its cluster, with a radius of gyration of{" "}
        <strong>2.94 nm</strong>, a maximum internal distance of{" "}
        <strong>10.30 nm</strong>, and an end-to-end distance of{" "}
        <strong>7.49 nm</strong>. These metrics describe the overall
        compactness, the spatial span, and the separation of the two ends,
        respectively, giving an explicit basis for the structure selected for
        the coarse-graining stage.
      </p>
      <h2 className="mt-5 mb-3">2 Martini Coarse-Graining</h2>
      <h3 className="mt-5 mb-3">2.1 Necessity of a Multichain System</h3>
      <p>
        The modulus to be measured in the wet-lab experiments comes from a
        material formed jointly by many protein chains and water, and cannot be
        judged from whether a single chain is compact alone. Interchain
        contacts, crosslink distributions, and network rearrangements all need
        to be studied in a multichain system. If every atom were retained and a
        sufficient amount of solvent were added, the computational cost would
        limit the system size and time scales that can be studied. We therefore
        mapped the representative all-atom structure onto a Martini 3.0.0
        coarse-grained model{" "}
        <sup>
          <a href="#ref-modeling-3">[3]</a>
        </sup>
        .
      </p>
      <p>
        In this model, the interactions of several atoms are merged into a
        single coarse-grained bead, and one 564-residue 2KY-10 chain corresponds
        to <strong>964 beads</strong>. The model preserves the correspondence
        between the sequence and residue positions, so that Tyr can still serve
        as an identifiable linkage endpoint, while reducing the computational
        cost of multichain simulations.
      </p>
      <h3 className="mt-5 mb-3">
        2.2 Translating Experimental Conditions into Simulation Conditions
      </h3>
      <p>
        The system uses explicit coarse-grained water and{" "}
        <strong>0.15 M NaCl</strong>. Likewise, the number of protein chains in
        the model has meaning as a concentration only when reported together
        with the box volume. Increasing the number of chains while keeping the
        concentration unchanged enlarges the representative volume and does not
        automatically imply a stiffer material.
      </p>
      <p>
        For comparison with the subsequent experiments, we used the following
        equation to map the sample mass concentration to the simulation box:
      </p>
      {/* Source formula garbled in the draft; reconstructed as c = nM / (N_A V) */}
      <MathFormula display>{"c=\\frac{nM}{N_A V}"}</MathFormula>
      <p>
        (where <MathFormula>{"n"}</MathFormula> is the number of protein chains,{" "}
        <MathFormula>{"M"}</MathFormula> is the molar mass of the complete
        construct, and <MathFormula>{"N_A"}</MathFormula> is Avogadro&apos;s
        constant; <MathFormula>{"M"}</MathFormula> is given in g/mol,{" "}
        <MathFormula>{"V"}</MathFormula> in L, and the unit of{" "}
        <MathFormula>{"c"}</MathFormula> is g/L.)
      </p>
      <p>
        Each system was first energy-minimized to eliminate unreasonable close
        contacts, then equilibrated successively under NVT (constant volume,
        constant temperature) and NPT (constant pressure, constant temperature)
        so that the water, ions, and protein could adjust their positions,
        before entering production simulation.
      </p>
      <h2 className="mt-5 mb-3">3 Constructing the Crosslinked Network</h2>
      <h3 className="mt-5 mb-3">3.1 Prescribing the Post-Crosslinking State</h3>
      <p>
        Before the wet-lab experiments began, we first posed a conditional
        question:{" "}
        <strong>
          if a specified number of Tyr–Tyr linkages form, how will the
          crosslinked protein chains organize and move?
        </strong>{" "}
        To this end, we introduced GROMACS type-6 harmonic bonds between the
        specified Tyr sites, with an equilibrium distance{" "}
        <MathFormula>{"r_0=0.350\\,\\mathrm{nm}"}</MathFormula> and a force
        constant{" "}
        <MathFormula>
          {"k=4000\\,\\mathrm{kJ\\cdot mol^{-1}\\cdot nm^{-2}}"}
        </MathFormula>
        . This acts as a local spring that maintains the linkage, allowing the
        protein chains to move within the prescribed topology{" "}
        <sup>
          <a href="#ref-modeling-6">[6]</a>
        </sup>
        .
      </p>
      <h3 className="mt-5 mb-3">
        3.2 Translating the Tyrosine Crosslinking Fraction into Network
        Constraints
      </h3>
      <p>
        The tyrosine crosslinking fraction assay is the most direct data entry
        point linking the wet-lab experiments to network modeling, but its
        definition must be fixed before use. If the experimentally reported{" "}
        <MathFormula>{"p_{\\mathrm{Tyr}}"}</MathFormula> is "the fraction of all
        Tyr residues that participate in dityrosine linkages", and each Tyr acts
        as at most one linkage endpoint, then for a model containing{" "}
        <MathFormula>{"n"}</MathFormula> 2KY-10 chains:
      </p>
      <MathFormula display>
        {"N_{\\mathrm{xlink}}\\approx\\frac{14n\\,p_{\\mathrm{Tyr}}}{2}"}
      </MathFormula>
      <h2 className="mt-5 mb-3">4 Production Simulations</h2>
      <h3 className="mt-5 mb-3">
        4.1 Temperature Response of the Crosslinked System
      </h3>
      <p>
        When arranging the crosslinking fraction and the mechanical tests, the
        sample temperature must also be controlled. We first test whether the
        protein chains still rearrange with changes in the environment while the
        linkage topology remains fixed. If the answer is yes, experimental
        comparisons must record not only the crosslinking conditions but also
        the temperature and hydration state during the mechanical measurements,
        so as to distinguish the effects of linkage number from those of chain
        conformational changes.
      </p>
      <p>
        Using a finite system containing 32 2KY-10 protein chains and 6 Tyr–Tyr
        linkages, we completed <strong>500 ns</strong> Martini production
        simulations at <strong>280, 300, 320, and 340 K</strong>. None of the
        four trajectories showed fatal dynamics errors or LINCS constraint
        warnings. To reduce the influence of early adjustment, the following
        summary reports the last 100 ns of each trajectory:
      </p>
      <p>
        The radius of gyration Rg describes how widely a structure is
        distributed about its center; larger values generally indicate a more
        expanded spatial distribution. From 280 K to 340 K, the cluster Rg
        increased by about <strong>12.2%</strong>, and the average single-chain
        Rg increased by about <strong>23.8%</strong>. Therefore, within the
        current model and observation window, heating is accompanied by
        expansion of both the individual chains and the whole cluster.
      </p>
      <p>
        The average Tyr–Tyr distance remained at about 0.363–0.365 nm. This
        indicates that the prescribed harmonic bonds maintained the imposed
        constraints in the trajectories; it does not independently prove that
        experimental dityrosine bonds would not break within this temperature
        range.
      </p>
      {/* Draft numbering jumps from 4.1 to 4.3; there is no subsection 4.2 in the source */}
      <h3 className="mt-5 mb-3">
        4.3 Measuring Stress Relaxation After Stepwise Deformation
      </h3>
      <p>
        We applied tension and compression along the X, Y, and Z directions
        separately, establishing six loading branches in total. Deformation is
        expressed as Hencky strain:
      </p>
      <MathFormula display>
        {"\\varepsilon=\\ln\\left(\\frac{L}{L_0}\\right)"}
      </MathFormula>
      <p>
        The target strains were <MathFormula>{"+0.20"}</MathFormula> and{" "}
        <MathFormula>{"-0.20"}</MathFormula>, corresponding to approximately 20%
        axial elongation and 20% axial shortening, respectively. The box and
        particle coordinates are scaled simultaneously during loading.
      </p>
      <MathFormula display>{"L_x'=L_xe^\\varepsilon"}</MathFormula>
      <MathFormula display>{"L_y'=L_ye^{-\\varepsilon/2}"}</MathFormula>
      <MathFormula display>{"L_z'=L_ze^{-\\varepsilon/2}"}</MathFormula>
      <p>
        The product of the scaling factors in the three directions equals 1, so
        the deformation preserves the total volume. This boundary condition
        facilitates the study of the deviatoric stress response of the network,
        but differs from an experimental uniaxial tension test with free lateral
        contraction.
      </p>
      <p>
        Each branch reaches the target strain in four steps, each step adding{" "}
        <MathFormula>{"+0.05"}</MathFormula> or{" "}
        <MathFormula>{"-0.05"}</MathFormula>, followed by 0.5 ns of relaxation.
        After this stepwise loading totaling 2 ns, the box shape is fixed and
        the production simulation begins. At this point loading is no longer
        applied, while the protein chains and solvent can still move, so that
        the stress relaxation of the network under the prescribed deformation is
        recorded.
      </p>
      {/* Draft placeholder: the production-simulation settings table announced here ("The main settings of the production simulation are as follows:") is missing from the source */}
      <p>
        The tensile and compressive branches along Y and Z were subsequently
        extended to 40 ns each; a zero-strain control matched to the preparation
        protocol was also established and extended to 80 ns. The zero-strain
        control is used to observe residual stress and structural relaxation
        without applied deformation; it does not mean that all loading branches
        reached 80 ns.
      </p>
      <h3 className="mt-5 mb-3">
        4.4 Estimating the Equivalent Modulus from the Pressure Tensor
      </h3>
      <p>
        The simulations output the three diagonal components of the pressure
        tensor. For the branch loaded along direction{" "}
        <MathFormula>{"i"}</MathFormula>, we compute the difference between the
        axial stress and the two transverse stresses:
      </p>
      <MathFormula display>
        {"s_i=-100\\left(P_{ii}-\\frac{P_{jj}+P_{kk}}{2}\\right)"}
      </MathFormula>
      <p>
        Here the pressure is in bar and the stress difference is in kPa. The
        negative sign converts the pressure sign convention into the convention
        that tensile stress is positive. This combination eliminates the
        hydrostatic pressure common to all three directions and retains the
        directional response related to the deformation.
      </p>
      <p>Under the assumption of an incompressible neo-Hookean model:</p>
      <MathFormula display>
        {
          "s_i(\\varepsilon)=b_i+G_i\\left(e^{2\\varepsilon}-e^{-\\varepsilon}\\right)"
        }
      </MathFormula>
      <p>
        where <MathFormula>{"G_i"}</MathFormula> is the equivalent shear
        parameter in the model and <MathFormula>{"b_i"}</MathFormula> is a
        stress offset assumed to be equal in the two loading branches. Using the
        average stress difference between the tensile and compressive branches,
        this common offset can be eliminated:
      </p>
      {/* Source subscripts garbled in the draft (\overline{s}{i,...}); reconstructed as \overline{s}_{i,...} */}
      <MathFormula display>
        {
          "3\\frac{\\overline{s}_{i,+0.20}-\\overline{s}_{i,-0.20}}{f(+0.20)-f(-0.20)}, \\qquad f(\\varepsilon)=e^{2\\varepsilon}-e^{-\\varepsilon}"
        }
      </MathFormula>
    </>
  );
}
