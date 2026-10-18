export function SoftwareReferences() {
  return (
    <>
      <h2 className="mt-5 mb-3">References</h2>
      <blockquote className="blockquote border-start border-3 ps-3">
        <p>
          Scientific literature that the two software tools directly rely on or
          cite in their implementation, grouped by tool and by purpose. The
          entries correspond to the methods actually used in the code and
          project documentation (simulation engines, force fields, network
          elasticity models, magnetomechanics, and poroelasticity), each with a
          DOI / arXiv link.
        </p>
      </blockquote>
      <h3 className="mt-5 mb-3">
        Software I: SELP molecular dynamics simulation platform
      </h3>
      <h4 className="mt-4 mb-3">
        1. All-atom simulation and enhanced sampling
      </h4>
      <ol className="references-list">
        <li>
          Phillips, J. C.; Hardy, D. J.; Maia, J. D. C.; et al.{" "}
          <strong>
            Scalable molecular dynamics on CPU and GPU architectures with NAMD.
          </strong>{" "}
          <em>J. Chem. Phys.</em> <strong>2020</strong>, 153, 044130.{" "}
          <a
            href="https://doi.org/10.1063/5.0014475"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1063/5.0014475
          </a>
          <span className="d-block text-body-secondary">
            — the engine for the first-step all-atom simulations.
          </span>
        </li>
        <li>
          Huang, J.; Rauscher, S.; Nawrocki, G.; et al.{" "}
          <strong>
            CHARMM36m: an improved force field for folded and intrinsically
            disordered proteins.
          </strong>{" "}
          <em>Nat. Methods</em> <strong>2017</strong>, 14, 71–73.{" "}
          <a
            href="https://doi.org/10.1038/nmeth.4067"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1038/nmeth.4067
          </a>
          <span className="d-block text-body-secondary">
            — the all-atom force field for SELP.
          </span>
        </li>
        <li>
          Tanner, D. E.; Chan, K.-Y.; Phillips, J. C.; Schulten, K.{" "}
          <strong>
            Parallel generalized Born implicit solvent calculations with NAMD.
          </strong>{" "}
          <em>J. Chem. Theory Comput.</em> <strong>2011</strong>, 7, 3635–3642.{" "}
          <a
            href="https://doi.org/10.1021/ct200563j"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1021/ct200563j
          </a>
          <span className="d-block text-body-secondary">
            — the GBIS implicit solvent (NAMD).
          </span>
        </li>
        <li>
          Hopkins, C. W.; Le Grand, S.; Walker, R. C.; Roitberg, A. E.{" "}
          <strong>
            Long-time-step molecular dynamics through hydrogen mass
            repartitioning.
          </strong>{" "}
          <em>J. Chem. Theory Comput.</em> <strong>2015</strong>, 11, 1864–1874.{" "}
          <a
            href="https://doi.org/10.1021/ct5010406"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1021/ct5010406
          </a>
          <span className="d-block text-body-secondary">
            — hydrogen mass repartitioning (HMR), supporting a 4 fs timestep.
          </span>
        </li>
        <li>
          Li, X.; Latour, R. A.; Stuart, S. J.{" "}
          <strong>
            TIGER2: An improved algorithm for temperature intervals with global
            exchange of replicas.
          </strong>{" "}
          <em>J. Chem. Phys.</em> <strong>2009</strong>, 130, 174106.{" "}
          <a
            href="https://doi.org/10.1063/1.3129342"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1063/1.3129342
          </a>
          <span className="d-block text-body-secondary">
            — the replica-exchange sampling algorithm itself.
          </span>
        </li>
        <li>
          Menz, W. J.; Penna, M. J.; Biggs, M. J.{" "}
          <strong>TNAMD: Implementation of TIGER2 in NAMD.</strong>{" "}
          <em>Comput. Phys. Commun.</em> <strong>2010</strong>, 181, 2082–2085.{" "}
          <a
            href="https://doi.org/10.1016/j.cpc.2010.09.011"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1016/j.cpc.2010.09.011
          </a>
          <span className="d-block text-body-secondary">
            — the source of the NAMD-side TIGER2 (Tcl) implementation used by
            the platform.
          </span>
        </li>
        <li>
          Humphrey, W.; Dalke, A.; Schulten, K.{" "}
          <strong>VMD: Visual molecular dynamics.</strong>{" "}
          <em>J. Mol. Graph.</em> <strong>1996</strong>, 14, 33–38.{" "}
          <a
            href="https://doi.org/10.1016/0263-7855(96)00018-5"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1016/0263-7855(96)00018-5
          </a>
          <span className="d-block text-body-secondary">
            — structure building and psfgen topology generation.
          </span>
        </li>
      </ol>
      <h4 className="mt-4 mb-3">2. Coarse-graining and network simulation</h4>
      <ol className="references-list" start={8}>
        <li>
          Souza, P. C. T.; Alessandri, R.; Barnoud, J.; et al.{" "}
          <strong>
            Martini 3: a general purpose force field for coarse-grained
            molecular dynamics.
          </strong>{" "}
          <em>Nat. Methods</em> <strong>2021</strong>, 18, 382–388.{" "}
          <a
            href="https://doi.org/10.1038/s41592-021-01098-3"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1038/s41592-021-01098-3
          </a>
          <span className="d-block text-body-secondary">
            — the force field for the second-step coarse-grained network (
            <code>martini_v3.0.0.itp</code>).
          </span>
        </li>
        <li>
          Abraham, M. J.; Murtola, T.; Schulz, R.; et al.{" "}
          <strong>
            GROMACS: High performance molecular simulations through multi-level
            parallelism from laptops to supercomputers.
          </strong>{" "}
          <em>SoftwareX</em> <strong>2015</strong>, 1–2, 19–25.{" "}
          <a
            href="https://doi.org/10.1016/j.softx.2015.06.001"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1016/j.softx.2015.06.001
          </a>
          <span className="d-block text-body-secondary">
            — the simulation engine for the second step.
          </span>
        </li>
      </ol>
      <h4 className="mt-4 mb-3">
        3. Network elasticity and modulus estimation
      </h4>
      <ol className="references-list" start={10}>
        <li>
          James, H. M.; Guth, E.{" "}
          <strong>
            Simple presentation of network theory of rubber, with a discussion
            of other theories.
          </strong>{" "}
          <em>J. Polym. Sci.</em> <strong>1949</strong>, 4, 153–182.{" "}
          <a
            href="https://doi.org/10.1002/pol.1949.120040206"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1002/pol.1949.120040206
          </a>
          <span className="d-block text-body-secondary">
            — phantom networks and junction fluctuations; the basis of the
            platform&rsquo;s phantom modulus estimate.
          </span>
        </li>
        <li>
          Treloar, L. R. G. <strong>The Physics of Rubber Elasticity</strong>,
          3rd ed.; Oxford University Press: Oxford, 1975.
          <span className="d-block text-body-secondary">
            — classical rubber-elasticity theory (affine networks, stress–strain
            relations).
          </span>
        </li>
        <li>
          Scanlan, J.{" "}
          <strong>
            The effect of network flaws on the elastic properties of
            vulcanizates.
          </strong>{" "}
          <em>J. Polym. Sci.</em> <strong>1960</strong>, 43, 501–508.{" "}
          <a
            href="https://doi.org/10.1002/pol.1960.1204314219"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1002/pol.1960.1204314219
          </a>
          <span className="d-block text-body-secondary">
            — the &ldquo;effective network&rdquo; criterion: a junction must be
            connected through at least three independent paths.
          </span>
        </li>
        <li>
          Case, L. C.{" "}
          <strong>Branching in polymers. I. Network defects.</strong>{" "}
          <em>J. Polym. Sci.</em> <strong>1960</strong>, 45, 397–404.{" "}
          <a
            href="https://doi.org/10.1002/pol.1960.1204514609"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1002/pol.1960.1204514609
          </a>
          <span className="d-block text-body-secondary">
            — the effective-chain criterion cognate with Scanlan&rsquo;s (the
            Scanlan–Case criterion).
          </span>
        </li>
        <li>
          Akagi, Y.; Fujimoto, K.; Yasuda, Y.{" "}
          <strong>
            Coarse-grained molecular dynamics simulations and structural
            analysis of end-linked polymer networks under different
            cross-linking protocols.
          </strong>{" "}
          <em>Polym. J.</em> <strong>2025</strong>, 57, 1183–1194.{" "}
          <a
            href="https://doi.org/10.1038/s41428-025-01089-7"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1038/s41428-025-01089-7
          </a>
          <span className="d-block text-body-secondary">
            — coarse-grained validation of <code>G_affine = νkT</code> and{" "}
            <code>G_phantom = (ν−μ)kT</code>, and the Scanlan–Case based
            effective-network extraction algorithm.
          </span>
        </li>
        <li>
          Lang, M.{" "}
          <strong>
            On the elasticity of polymer model networks containing finite loops.
          </strong>{" "}
          <em>Macromolecules</em> <strong>2019</strong>, 52, 6266–6273.{" "}
          <a
            href="https://doi.org/10.1021/acs.macromol.9b00996"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1021/acs.macromol.9b00996
          </a>{" "}
          (preprint: arXiv:2103.16181)
          <span className="d-block text-body-secondary">
            — correction of the phantom modulus by cycle rank (finite loops);
            the basis of the platform&rsquo;s reported &ldquo;ideal topology
            interval&rdquo;.
          </span>
        </li>
      </ol>
      <h4 className="mt-4 mb-3">4. Magnetomechanics and poroelasticity</h4>
      <ol className="references-list" start={16}>
        <li>
          Rosensweig, R. E. <strong>Ferrohydrodynamics</strong>; Cambridge
          University Press: Cambridge, 1985 (Dover reprint 1997).
          <span className="d-block text-body-secondary">
            — Langevin magnetization curves of superparamagnetic particles, the
            demagnetizing field (self-consistent internal field), and the
            magnetic energy density of dipolar chain interactions.
          </span>
        </li>
        <li>
          Fisher, R. A. <strong>Dispersion on a sphere.</strong>{" "}
          <em>Proc. R. Soc. Lond. A</em> <strong>1953</strong>, 217, 295–305.{" "}
          <a
            href="https://doi.org/10.1098/rspa.1953.0064"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1098/rspa.1953.0064
          </a>
          <span className="d-block text-body-secondary">
            — the crosslink-frozen fiber orientation distribution (closed-form
            moments of the Fisher distribution, constructing the orientation
            tensors A<sub>2</sub>/A<sub>4</sub>).
          </span>
        </li>
        <li>
          Biot, M. A.{" "}
          <strong>General theory of three-dimensional consolidation.</strong>{" "}
          <em>J. Appl. Phys.</em> <strong>1941</strong>, 12, 155–164.{" "}
          <a
            href="https://doi.org/10.1063/1.1712886"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1063/1.1712886
          </a>
          <span className="d-block text-body-secondary">
            — the theoretical basis of the third-step poroelastic governing
            equations (pore-pressure–displacement coupling).
          </span>
        </li>
      </ol>
      <h3 className="mt-5 mb-3">
        Software II: NEST Software clinician application
      </h3>
      <p>
        Software II is itself a clinical workflow tool; its material and
        biological basis comes from the wet-lab modules. Listed below are the
        technical standards and tools that the application directly involves:
      </p>
      <ol className="references-list" start={19}>
        <li>
          ISO/IEC 18004:2024,{" "}
          <strong>
            Information technology — Automatic identification and data capture
            techniques — QR Code bar code symbology specification
          </strong>{" "}
          (2015 edition: ISO/IEC 18004:2015).{" "}
          <a
            href="https://www.iso.org/standard/62021.html"
            target="_blank"
            rel="noreferrer"
          >
            https://www.iso.org/standard/62021.html
          </a>
          <span className="d-block text-body-secondary">
            — the QR-code symbology standard used for instructions travelling
            with each formulation.
          </span>
        </li>
        <li>
          ZXing Project.{" "}
          <strong>
            ZXing (&ldquo;Zebra Crossing&rdquo;) barcode scanning library.
          </strong>{" "}
          <a
            href="https://github.com/zxing/zxing"
            target="_blank"
            rel="noreferrer"
          >
            https://github.com/zxing/zxing
          </a>
          <span className="d-block text-body-secondary">
            — on-device QR-code decoding.
          </span>
        </li>
        <li>
          AndroidX. <strong>CameraX</strong> (Jetpack camera library).{" "}
          <a
            href="https://developer.android.com/media/camera/camerax"
            target="_blank"
            rel="noreferrer"
          >
            https://developer.android.com/media/camera/camerax
          </a>
          <span className="d-block text-body-secondary">
            — the live viewfinder for the scanning step.
          </span>
        </li>
      </ol>
      <blockquote className="blockquote border-start border-3 ps-3">
        <p>
          Note: the materials-science literature for the adhesive peptides, the
          liposomal linker peptides, and the SELP / Ru / sPS functional modules
          involved in Software II is cited by the respective wet-lab modules and
          their wiki pages and is not repeated here.
        </p>
      </blockquote>
    </>
  );
}
