export function DbtlCycles() {
  return (
    <>
      <h2 className="mt-5 mb-3">
        The DBTL Cycle for Protein Hydrogel Modeling
      </h2>
      <p>
        Our goal is to develop a model that links protein structure,
        crosslinking networks, and gel mechanical properties. We will first
        calibrate the model against experimental data for 2KY5, then apply the
        fixed methodology to 2KY10.
      </p>
      <h3 className="mt-5 mb-3">
        Cycle 1: Establishing a Reliable Protein Model
      </h3>
      <p>
        <strong>Design:</strong> Select representative protein conformations to
        provide a reliable starting point for hydrogel modeling.
      </p>
      <p>
        <strong>Build:</strong> Audit the FAMD trajectories and exchange
        records, select representative 2KY5 structures from the later stages of
        sampling, and use Martini 3 to construct a coarse-grained system
        containing 32 protein chains.
      </p>
      <p>
        <strong>Test:</strong> Examine conformational dimensions, coarse-grained
        bead mapping, and tyrosine reactive sites, confirming substantial
        contraction during the early stages and smaller dimensional changes at
        later stages.
      </p>
      <p>
        <strong>Learn:</strong> Initial conformations and trajectory-processing
        procedures affect the resulting network, making it essential to retain
        complete records of structural provenance.
      </p>
      <h3 className="mt-5 mb-3">
        Cycle 2: Identifying a Suitable Method for Mechanical Evaluation
      </h3>
      <p>
        <strong>Design:</strong> Compare dynamic stress and static energy
        approaches to identify a suitable method for evaluating hydrogel
        stiffness.
      </p>
      <p>
        <strong>Build:</strong> Perform small-strain loading, zero-strain
        control simulations, decomposition of water-related stress
        contributions, and static calculations both without relaxation and after
        energy minimization.
      </p>
      <p>
        <strong>Test:</strong> Dynamic stress exhibits large fluctuations.
        Although subtracting water-related contributions substantially reduces
        these fluctuations, the mean response remains unstable. Unrelaxed
        calculations yield an energy curvature of approximately 5.7 GPa, while
        some static relaxation calculations fail to converge sufficiently.
      </p>
      <p>
        <strong>Learn:</strong> Subtracting water-related contributions changes
        the physical meaning of the stress, and the unrelaxed energy curvature
        cannot be directly interpreted as the gel&apos;s Young&apos;s modulus.
        We therefore retain these methods as diagnostic tools and turn to an
        effective network model that describes interchain connections and
        rearrangements.
      </p>
      <h3 className="mt-5 mb-3">
        Cycle 3: Constructing a Load-Bearing Crosslinked Network
      </h3>
      <p>
        <strong>Design:</strong> Construct a network at approximately 100 mg/mL
        and 37°C in which all protein chains are connected and the network spans
        the periodic system along the Z direction.
      </p>
      <p>
        <strong>Build:</strong> Bring tyrosine sites into proximity through
        successive rounds of guided assembly, introduce permanent crosslinks
        once the distance criterion is met, and then remove the guiding forces
        and relax the system.
      </p>
      <p>
        <strong>Test:</strong> Periodic spanning along the Z direction first
        appears at 24 crosslinks, although multiple disconnected components
        remain. Increasing the number of crosslinks to 34 incorporates all 32
        chains into a single chemically connected network.
      </p>
      <p>
        <strong>Learn:</strong> Periodic spanning, connectivity of all chains,
        and mechanical stability are distinct requirements. Because the network
        was constructed by artificially bringing reactive sites together, it
        cannot be regarded as a prediction of spontaneous crosslinking kinetics.
        In addition, the current solution uses only NaCl to approximate PBS.
      </p>
      <h3 className="mt-5 mb-3">
        Cycle 4: Assessing Stability and Model Transferability
      </h3>
      <p>
        <strong>Design:</strong> Assess the stability of the effective stiffness
        before calibration against experimental values, and evaluate whether the
        same methodology can be applied to 2KY10.
      </p>
      <p>
        <strong>Build:</strong> Develop an effective network model that allows
        protein-chain translation and rotation, as well as transverse
        relaxation. Relax the fully connected 2KY5 system without guiding
        forces, and analyze the available 2KY10 structures using the same
        methodology.
      </p>
      <p>
        <strong>Test:</strong> In the initial 400 ps assessment of 2KY5, the
        mean stiffness changes between the earlier and later time windows are
        approximately −2.9% and −21.9% at contact cutoffs of 0.6 nm and 0.7 nm,
        respectively, failing the stability criterion that must be satisfied at
        both cutoffs. Interfacial analysis reveals that connections can persist
        while individual contact points within the interfaces continually
        change. Current comparisons with 2KY10 are further limited by
        differences in concentration, crosslink count, and sampling procedures.
      </p>
      <p>
        <strong>Learn:</strong> Connectivity of all chains does not guarantee a
        reliable modulus. We have continued to examine relaxation and
        interfacial changes without removing sensitive interfaces or tuning
        parameters to force agreement with experiments. Once the stability
        criteria are met, we will calibrate a single global stiffness scale and
        then apply the fixed methodology to 2KY10 under matched conditions.
      </p>
    </>
  );
}
