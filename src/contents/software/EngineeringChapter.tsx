import { TableCaption } from "../../components/FigureCaption";
export function EngineeringChapter() {
  return (
    <>
      {/* The draft labels this first chapter "Engineering"; it documents the DBTL cycles of Software I and states that usage is described on the Software page. */}
      <h2 className="mb-4">Engineering</h2>
      <h3 className="mt-5 mb-3">The software as a workflow problem</h3>
      <p>
        SELP hydrogel research in NEST depends on a chain of computation that
        spans several software packages: all-atom TIGER2 replica-exchange
        sampling in NAMD, coarse-grained simulation in GROMACS, and
        magnetomechanical modulus calculation in MATLAB. In parallel, the
        clinical side of the project needs a way to order the right combination
        of scaffold and functional modules and to prepare each formulation
        correctly at the bedside. In both cases, the difficulty is not a single
        computation or a single screen, but the distance between what the
        science requires and what the existing tools let people do.
      </p>
      <p>
        The simulations ran on a local server and on the Zhejiang University
        cluster, but their progress could only be reconstructed by searching log
        files line by line over SSH; products were passed between stages by
        hand; and the scientific parameters lived in configuration files on the
        remote machines, so a stalled run or a stale result could go unnoticed
        for a long time. On the clinical side, the material system is freely
        combinable, which means an operator must select the correct modules and
        follow a preparation procedure whose steps belong to a specific product.
        Our idea was to close both gaps in the same way: make the workflow
        itself the interface. For researchers, the chain of simulation steps
        becomes a pipeline (a Flow) that can be viewed and modified at any time;
        for clinicians, the procedure becomes a guided wizard in which the
        information travels with the material.
      </p>
      <p>
        This idea had to answer questions on several levels at once: where does
        each step run, and how can its state be judged without reading logs by
        hand? How can a new simulation type join the platform without rewriting
        the monitoring logic for every addition? How do scientific parameters
        reach the computation itself, so that what runs is always what was
        edited? And how should the clinical wizard behave when the hardware
        scope of the project changes? We advanced the answers through four
        consecutive DBTL cycles for each tool, keeping only framework-level
        changes and omitting technical details and bug fixes.
      </p>
      <p>
        The engineering cycles below record how this route took shape: we move
        from monitoring a single remote simulation to a parameter-driven
        platform that carries a full property-computation chain, and from a
        paper workflow to a four-step clinical wizard whose instructions are
        generated per formulation. Usage of both tools is described on the
        Software page.
      </p>
      <h3 className="mt-5 mb-3">
        I. Software I: from manual monitoring to a parameter-driven platform
      </h3>
      <p>
        The first question was operational rather than scientific: simulations
        were running, but their state could only be reconstructed by hand.
        Before any scientific parameter could be made editable, the running
        process itself had to become visible. The four cycles below start there
        and end with a console in which every step&rsquo;s inputs, controls, and
        results live on a single page.
      </p>
      <h4 className="mt-4 mb-3">
        Cycle 1｜From manual log inspection to a monitoring platform
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        The team ran NAMD TIGER2 replica-exchange simulations on a local server
        and on the Zhejiang University cluster. Progress could previously be
        judged only by searching log files command by command over SSH, so it
        was impossible to tell in real time how far a simulation had progressed.
        We therefore planned a web interface that displays the key states of
        remote jobs — progress, temperature, and convergence — across SSH,
        replacing manual log inspection in a terminal. The platform began from
        the smallest useful unit: one job type with one reliable, real-time
        readout.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We built a first frontend and backend framework: an Express backend for
        interacting with the remote hosts and a React + Vite frontend that
        presents job state. A TIGER2 job type was introduced and connected to
        the local server, together with the status view for progress,
        temperature, and convergence.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        The interface was validated on real TIGER2 jobs: log-prefix recognition,
        replica-count detection, and progress display were checked against the
        actual runs, and convergence detection and progress synchronization were
        added until the displayed state matched the jobs.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        Making one job visible immediately revealed how tightly the monitoring
        code was coupled to its job type: every additional simulation package
        would have required modifying the entire monitoring logic. At the same
        time a new requirement appeared — GROMACS CG runs also needed
        monitoring, and trajectory files were expected to be viewable directly
        in the browser. The conclusion was that job types must become plugins
        that describe their own monitoring logic, and that viewing had to be
        part of the platform rather than an external tool.
      </p>
      <h4 className="mt-4 mb-3">
        Cycle 2｜Plugin-based job types and pipeline chaining
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        The fix for the coupling problem was to let each job type describe
        itself: running location, detection method, and produced outputs move
        into the type&rsquo;s own configuration, and the backend dispatches by
        type instead of carrying hard-coded TIGER2 knowledge. The design
        proceeded in two steps. The first was viewing — a trajectory viewer that
        merges multi-segment DCD files, annotates the sequence, and renders
        MP4/GIF previews on the server. The second was chaining — products pass
        between jobs through next links, where one job&rsquo;s output directory
        points at the next job&rsquo;s input directory, and a conversion job
        (DCD &rarr; CG, turning all-atom trajectories into coarse-grained
        starting structures) acts as the connector between the two simulation
        stages.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We refactored the platform into a plugin-based job-type system and
        changed SSH routing to dispatch by type; added a GROMACS CG job type and
        the trajectory visualization interface; implemented the Flow pipeline
        with automatic sequential launching of a whole chain, together with a
        conversion-job generator; merged the shared Python modules; and added a
        running-jobs bar, renaming the platform to Molecular Dynamics Platform.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        The chain was validated end to end on a real complete workflow — 2KY-10
        through TIGER2 &rarr; conversion &rarr; CG — confirming one-click
        sequential launch and automatic passing of products.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        The pipeline turned manual file passing into automatic passing, but the
        scientific parameters were still scattered across configuration files:
        changing one value required logging into the server and editing files,
        and after such an edit the results could stay the same in ways that were
        hard to explain. Simulations could also fail midway without anyone
        noticing for a long time. The conclusion was that the next stage had to
        solve two problems: make parameters directly editable, and add automatic
        supervision.
      </p>
      <h4 className="mt-4 mb-3">
        Cycle 3｜A complete computation chain from sequence to properties
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        As the research goals became clear, monitoring alone was no longer
        enough: the platform needed to carry a complete property-computation
        chain — sequence &rarr; structure &rarr; coarse-graining &rarr;
        Young&rsquo;s modulus &rarr; magnetomechanical response. Four decisions
        defined this stage: add an all-atom-to-coarse-grained pipeline and
        orchestration scripts so that the computation from sequence to network
        modulus runs with one click; add a magnetomechanical job type that reads
        the CG moduli and computes the deformation under an applied magnetic
        field, so that the material response is evaluated by the same platform
        that produced its inputs; append this step automatically at the end of
        each chain; and merge the conversion step into the main steps to
        simplify the user interface.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        On the coarse-grained side, we implemented the
        all-atom-to-coarse-grained mapping, candidate network generation, and
        rubber-elasticity and force-balance analysis, and added a crosslink-site
        interface together with sequence-contract tests. On the
        magnetomechanical side, we implemented the field-induced deformation
        computed from the CG moduli, the corresponding job type, a local
        computation interface, and MATLAB three-dimensional figure rendering.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        The six MATLAB field maps were verified one by one — modulus,
        displacement field, axial strain, pore pressure, axial stress, and the
        applied magnetic field — checking the layout, labels, and axes of each
        figure.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        The chain could already compute and plot its results, but the parameters
        of every step still had to be set by editing configuration files — no
        essential change from the monitoring-stage experience. The visual
        presentation had improved, yet the core problem of letting users modify
        parameters and rerun remained unsolved. The conclusion was that the
        platform had to become parameter-driven: every step&rsquo;s scientific
        input should be an editable form, and parameters should pass from top to
        bottom.
      </p>
      <h4 className="mt-4 mb-3">
        Cycle 4｜A parameter-driven interactive platform
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        A pipeline consists of several sequentially connected steps
        (flow_tiger2, flow_gromacs_cg, flow_magnetomech), each with a parameter
        panel, run controls, and result charts. The design rested on three
        decisions: parameters drive the computation rather than files, with the
        panels saving user intent and regenerating the input files at launch, so
        that a run can never silently ignore an edit; the four sections —
        Dashboard, Parameters, Results, Control — share a single page, so that
        the whole chain stays visible; and templates create a complete ordered,
        automatically chained pipeline in one click.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        The frontend was reorganized around flows and the backend was given
        flow-data endpoints; the four sections became tabs; all three
        computation steps became editable, corresponding to sequence input with
        motif annotation, crosslink/temperature/stretch inputs, and volume
        fractions with a magnetic-field profile; parameters pass from top to
        bottom and placeholders never enter the actual commands; complete run
        control (start, stop, restart, pause, continue) was implemented,
        together with an Execution panel that shows the real running location
        and the resolution of external programs, and GROMACS can be launched
        from within the application (submitted via sbatch when SLURM is
        available, detached otherwise).
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        We added a launch regression test suite covering startup, liveness
        checks, completion detection, and the no-SLURM path; ran a real
        end-to-end smoke test on the iGEM server, completing grompp and mdrun
        inside the application at approximately 894 ns/day, and confirmed that a
        fast smoke test is classified as success rather than failure; and passed
        TypeScript type checking, the frontend build, and all backend unit
        tests.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        The frontend converged from single-job monitoring into a pipeline
        console. Several design trade-offs were settled along the way —
        parameter-driven operation, validation at save time, running location
        configured separately with absolute paths, and mandatory explicitness of
        input units — and are summarized below.
      </p>
      <h4 className="mt-4 mb-3">Cycle summary</h4>
      <p>
        Across the four cycles the platform moved from a single-job monitor to a
        parameter-driven console, with each stage&rsquo;s Learn becoming the
        next stage&rsquo;s starting point:
      </p>
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <TableCaption as="caption">
            Table 1 | Software development cycles.
          </TableCaption>
          <thead>
            <tr>
              <th>Cycle</th>
              <th>Time</th>
              <th>Design starting point</th>
              <th>Build outcome</th>
              <th>Test validation</th>
              <th>Learn output</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2026-07</td>
              <td>Remote simulations invisible</td>
              <td>Single-job monitoring platform</td>
              <td>TIGER2 progress and convergence</td>
              <td>Plugin architecture needed</td>
            </tr>
            <tr>
              <td>2</td>
              <td>2026-08</td>
              <td>Multiple job types and pipelines</td>
              <td>Plugin-based job types, Flow chaining</td>
              <td>2KY-10 end to end</td>
              <td>Parameters must be editable; supervision needed</td>
            </tr>
            <tr>
              <td>3</td>
              <td>2026-09</td>
              <td>Full chain from sequence to properties</td>
              <td>CG pipeline and magnetomechanical chain</td>
              <td>Field maps verified one by one</td>
              <td>Parameters still depend on configuration files</td>
            </tr>
            <tr>
              <td>4</td>
              <td>2026-10</td>
              <td>Parameter-driven interaction</td>
              <td>Four-section console and templates</td>
              <td>Regression tests and real smoke test</td>
              <td>Platform converged into a single console</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4 className="mt-4 mb-3">Design trade-offs</h4>
      <p>
        The four cycles settled several trade-offs that have been kept since,
        each balancing a cost against a benefit:
      </p>
      <ol>
        <li>
          <strong>Parameter-driven rather than file-driven.</strong> The cost is
          regenerating inputs on restart; the benefit is that parameters and
          results always stay consistent.
        </li>
        <li>
          <strong>A single page rather than one page per job.</strong> The cost
          is high information density; the benefit is that the whole chain stays
          visible.
        </li>
        <li>
          <strong>Validation on save rather than errors after running.</strong>{" "}
          Illegal sequences, volume fractions summing above 1, unit errors, and
          illegal path characters are all intercepted at save time.
        </li>
        <li>
          <strong>
            Running location as a deployment decision rather than a physical
            parameter.
          </strong>{" "}
          It is listed separately in a sub-panel, requires absolute paths, and
          restricts the prefix character set.
        </li>
        <li>
          <strong>
            Magnetomechanics computed locally rather than occupying the cluster.
          </strong>{" "}
          This step takes seconds, so waiting in a scheduling queue would be
          pure waste.
        </li>
      </ol>
      <h3 className="mt-5 mb-3">
        II. Software II: from a paper workflow to a guided clinical wizard
      </h3>
      <p>
        NEST Software is the digital layer of the injectable SELP material for
        clinicians, serving two clinical tasks: ordering the correct combination
        of scaffold and functional modules, and preparing the formulation
        correctly through a controlled bedside workflow. Its difficulties come
        not from computation but from a real procedure: a specific formulation
        must be selected, its instructions must match the product in hand, and a
        misread step at the bedside cannot be corrected by rerunning a script.
        Iteration for this setting involved not only code but also procedures,
        copywriting, and trade-offs about hardware signals. The development
        process went through four DBTL cycles, each retaining only major changes
        and improving usability, correctness, and traceability in turn.
      </p>
      <h4 className="mt-4 mb-3">
        Cycle 1｜From a paper workflow to a navigable wizard
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        The design replaced the paper instructions with a step-by-step wizard
        driven by workflow state, and provided two entry points corresponding to
        the two parts of the clinical process: ordering (choosing scaffold and
        functional modules) and operating instructions. Each step of the
        procedure should state its own purpose, rather than leave the operator
        to locate it in a document.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We built a Kotlin / Compose wizard framework with previous/next
        navigation; added hardware schematics, camera preview, and release
        signing; then refactored it into the two modules above, forming a
        unified six-step wizard and a unified visual theme.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        We automatically traversed all screens on the emulator, covering
        navigation boundaries, back-and-forward control, and text export from
        each screen, and performed pixel-level layout checks within the
        viewport.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        The value of a wizard lies in making the purpose of each step clearly
        identifiable; purely decorative schematics only add distraction. Giving
        each hardware action its own screen, however, creates repetition — a
        problem the next cycle had to solve.
      </p>
      <h4 className="mt-4 mb-3">
        Cycle 2｜Merging the hardware steps into a unified chain screen
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        The repeated hardware-step screens were merged into one unified chain
        screen: the operation rows switch step by step, while the camera preview
        and timer remain present across the switches, so that state is not lost
        between steps.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We introduced a shared chain screen, deleted four independent
        hardware-step screens, and pointed the wizard&rsquo;s hardware steps at
        the shared screen.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        We verified on the emulator that the camera preview and timer retain
        their state across step switches (no flicker from remounting) and that
        the operation rows behave independently.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        Merging the duplicated screens made the hardware section easier to
        understand and also prepared for the later on-demand removal of hardware
        steps at reduced cost (see Cycle 4).
      </p>
      <h4 className="mt-4 mb-3">
        Cycle 3｜QR-code recognition, dynamic instructions, and standardized
        copy
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        The design goal was that information should travel with the material:
        every prefilled formulation carries a printed QR code, and scanning it
        loads the instructions specific to that formulation directly on the
        device, using live camera capture and on-device decoding, with manual
        input retained as a fallback. Generic content must never appear as
        product-specific content, so the instructions themselves had to become
        product-bound rather than document-bound.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We added a scanning step at the start of the wizard, with the camera
        feed as background and a mask exposing only the central recognition
        frame; the decoded result loads the corresponding instructions.
        Instructions became product-specific, and all placeholder copy was
        replaced with final wording.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        We completed an end-to-end scan test with a USB camera on the emulator,
        verified that no picture leaks outside the mask, and regression-tested
        the manual fallback path.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        The emulator camera is unstable, so a manual fallback is a necessity for
        a clinical-grade tool; camera preview in Compose requires correct
        cropping and a compatible rendering mode, or the image overflows; and
        copy is an engineering output too — every user-visible string should be
        reviewed.
      </p>
      <h4 className="mt-4 mb-3">Cycle 4｜Scope adjustment</h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        After communicating with the hardware team, the project focus shifted,
        and we decided not to integrate hardware-related signals (live camera,
        magnetic field, blue light) at the current stage. The wizard should only
        present steps that the software can genuinely support, so the scope of
        the flow had to shrink accordingly.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We removed the downstream hardware-related steps (injection, magnetic
        field, blue light, shutdown) as well as the shared hardware chain screen
        and its schematics, and updated the instructions and the
        workflow-overview copy accordingly.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        We verified on the emulator that the four-step wizard renders in order
        from 1/4 to 4/4, that the instructions include interactive guidance, and
        that language switching between English and Chinese works.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        The premixing step ultimately shows only one instruction (wait for the
        premixer&rsquo;s green light), leaving the operator to judge completion;
        the software no longer reads device state, and the clarity of the
        instruction text alone carries the step.
      </p>
    </>
  );
}
