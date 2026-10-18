import type { DbtlModule } from "./dbtl";

/**
 * Dry Lab — software engineering (DBTL) record for the Engineering page.
 * Converted from `software-engineering-en.md` (2026-10-16): the Design–Build–Test–Learn
 * cycles of Software I (SELP molecular dynamics simulation platform) and
 * Software II (NEST Software), plus the cycle overview and design trade-offs.
 */
export const softwareIModule: DbtlModule = {
  title: "Software I: SELP Molecular Dynamics Simulation Platform",
  introTitle: "From single-task monitoring to a pipeline console",
  intro: (
    <p>
      Research on SELP hydrogels relies on a cross-software molecular simulation
      chain: all-atom TIGER2 FAMD (NAMD) → coarse-grained CG (GROMACS) →
      magneto-mechanical composite modulus (MATLAB). Making this chain viewable,
      adjustable, and re-runnable is itself an engineering problem, which we
      advanced through DBTL cycles, passing through four framework-level stages.
    </p>
  ),
  cycles: [
    {
      title:
        "Cycle 1 — From manual monitoring to automated platform monitoring",
      content: {
        Design: (
          <p>
            The team ran NAMD TIGER2 FAMD replica-exchange simulations on the
            iGEM local server and the ZJU cluster. Progress could previously
            only be checked by grepping logs command by command over SSH, with
            no way to tell how far a run had progressed. We therefore planned a
            Web interface that shows the key status of remote tasks (progress,
            temperature, convergence) across SSH,{" "}
            <strong>replacing manual log-watching in a terminal</strong>.
          </p>
        ),
        Build: (
          <p>
            Built the frontend/backend scaffold: an Express backend with a React
            + Vite frontend; introduced the TIGER2 FAMD task type, connected the
            iGEM local server, and implemented the task-monitoring interface.
          </p>
        ),
        Test: (
          <p>
            Verified log-prefix recognition, replica-count recognition, and
            progress display on real TIGER2 FAMD tasks, then added convergence
            detection and progress synchronisation.
          </p>
        ),
        Learn: (
          <p>
            The monitoring code was tightly coupled to the specific task type:
            every additional simulation tool required changing the entire
            monitoring logic. New needs appeared at the same time — GROMACS CG
            also needed monitoring, and trajectories were expected to be
            viewable directly in the browser. The conclusion:{" "}
            <strong>task types must become plugins</strong>, with the monitoring
            logic described by the task types themselves.
          </p>
        ),
      },
    },
    {
      title: "Cycle 2 — Task-type plugins and pipeline chaining",
      content: {
        Design: (
          <p>
            Move where a task runs, how it is detected, and what it produces
            into each task type&rsquo;s own configuration, with the backend
            dispatching by type instead of hard-coding TIGER2 FAMD. Two
            sub-goals: first, visibility — a trajectory viewer merging
            multi-segment DCD files, sequence annotation, and server-side
            MP4/GIF rendering; second, chaining —{" "}
            <strong>tasks pass products through next links</strong> (an output
            directory points to the downstream input directory), and a
            conversion task (DCD → CG, turning all-atom trajectories into
            coarse-grained starting structures) bridges the two.
          </p>
        ),
        Build: (
          <p>
            Refactored the system into task-type plugins and switched SSH
            routing to per-type dispatch; added the GROMACS CG task type and the
            trajectory visualisation interface; implemented the Flow pipeline
            with automatic sequential launching of the whole chain plus a
            conversion-task generator; merged shared Python modules, added a
            running-tasks bar, and renamed the platform to Molecular Dynamics
            Platform.
          </p>
        ),
        Test: (
          <p>
            Verified end-to-end with a real full chain (2KY-10: TIGER2 FAMD →
            conversion → CG), confirming one-click sequential launch and
            automatic product passing.
          </p>
        ),
        Learn: (
          <p>
            <strong>
              scientific parameters still lived in configuration files
            </strong>
            : changing one value required logging into the server and editing
            files, and a change could leave results unchanged in ways that were
            hard to explain; runs could also fail midway and go unnoticed for
            hours.
            <strong>
              Parameter editing and unattended monitoring were left for later
              cycles
            </strong>
            , while research itself set a new requirement — the next round had
            to bring the complete sequence-to-properties chain onto the
            platform.
          </p>
        ),
      },
    },
    {
      title:
        "Cycle 3 — A complete computation chain from sequence to properties",
      content: {
        Design: (
          <p>
            As the research goals became clear, the platform needed to carry a
            complete property-computation chain beyond monitoring simulations:
            sequence → structure → coarse-graining → compressive modulus →
            magneto-mechanical response. The design included: an
            all-atom-to-coarse-grained pipeline and orchestration script for
            one-click computation from sequence to network modulus; a new
            magnetomechanics task type that reads the CG modulus and computes
            the deformation under an applied field; automatic appending of the
            magnetomechanics step at the end of every chain; and merging the
            conversion step into the main step to simplify the user interface.
          </p>
        ),
        Build: (
          <p>
            On the CG side: all-atom-to-CG mapping, candidate network
            generation, and rubber-elasticity and force-balance analysis, plus a
            crosslink-site interface and sequence-contract tests. On the
            magnetomechanics side: field-induced deformation computed from the
            CG modulus, the corresponding task type, a local computation
            interface, and MATLAB 3D figure rendering.
          </p>
        ),
        Test: (
          <p>
            Checked the six MATLAB result figures (modulus, displacement field,
            axial strain, pore pressure, axial stress, applied magnetic field)
            one by one for layout, labelling, and axes.
          </p>
        ),
        Learn: (
          <p>
            The chain could compute and plot results, but every step&rsquo;s
            parameters still had to be set by editing configuration files — no
            essential difference from the monitoring era — and better graphics
            did not solve the core problem of letting users change parameters
            and re-run. The conclusion:{" "}
            <strong>
              a parameter-driven interactive platform was required
            </strong>
            , turning each step&rsquo;s scientific inputs into editable forms
            and passing parameters from top to bottom.
          </p>
        ),
      },
    },
    {
      title: "Cycle 4 — A parameter-driven interactive platform",
      content: {
        Design: (
          <p>
            A pipeline consists of several sequential steps (flow_tiger2,
            flow_gromacs_cg, flow_magnetomech), each with a parameter panel, run
            controls, and result charts. Three key decisions:{" "}
            <strong>parameter-driven rather than file-driven</strong> — the
            panel saves the user&rsquo;s intent and inputs are regenerated at
            launch, so results can never lag behind the configuration; four
            tabbed sections (Dashboard, Parameters, Results, Control) carrying
            the whole chain in a single page; and template creation — one click
            generates a fully ordered, automatically chained pipeline from a
            template.
          </p>
        ),
        Build: (
          <p>
            The frontend was reorganised around flows and the backend exposes
            flow data; the four sections became tab switches; all three
            computation steps became editable, covering sequence input and motif
            annotation, crosslink/temperature/stretch input, and volume
            fractions and field distribution; parameters pass from top to bottom
            and placeholders never enter actual commands; full run control was
            implemented (start, stop, restart, pause, continue), with an
            Execution panel showing the real run location and external-program
            resolution, and GROMACS launching from within the application
            (sbatch when SLURM is available, detached launch otherwise).
          </p>
        ),
        Test: (
          <p>
            Added a launch regression suite covering starting, liveness checks,
            completion detection, and the no-SLURM path; ran a real end-to-end
            smoke test on the iGEM server, completing the full simulation from
            within the application at about <strong>894 ns/day</strong>, and
            confirmed that a quickly finished smoke test is judged a success
            rather than a failure; frontend type checks and builds and all
            backend unit tests passed.
          </p>
        ),
        Learn: (
          <p>
            <strong>
              The frontend finally converged from single-task monitoring into a
              pipeline console.
            </strong>{" "}
            Several design trade-offs were fixed in place: parameter-driven
            inputs, immediate validation on save, run location configured
            separately and required to be absolute, and explicit input units.
            These trade-offs are summarised below.
          </p>
        ),
      },
    },
  ],
  outro: (
    <>
      <h3 className="mt-5 mb-3">Cycle Overview</h3>
      <p>
        <strong>Table 1</strong>: Cycle overview — Design / Build / Test / Learn
        of each cycle.
      </p>
      <div className="table-responsive mb-4">
        <table
          className="table table-bordered align-middle"
          aria-label="Table 1: cycle overview — Design / Build / Test / Learn of each cycle"
        >
          <thead>
            <tr>
              <th scope="col">Cycle</th>
              <th scope="col">Design starting point</th>
              <th scope="col">Build outcome</th>
              <th scope="col">Test verification</th>
              <th scope="col">Learn output</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>C1</td>
              <td>Remote simulations invisible</td>
              <td>Single-task monitoring platform</td>
              <td>TIGER2 FAMD progress and convergence</td>
              <td>Need for plugins</td>
            </tr>
            <tr>
              <td>C2</td>
              <td>Multiple task types and pipelines</td>
              <td>Task-type plugins, Flow chaining</td>
              <td>2KY-10 end-to-end</td>
              <td>Parameters must be editable; monitoring needed</td>
            </tr>
            <tr>
              <td>C3</td>
              <td>Sequence-to-properties chain</td>
              <td>CG pipeline and magnetomechanics chain</td>
              <td>Result figures checked one by one</td>
              <td>Parameters still depend on config files</td>
            </tr>
            <tr>
              <td>C4</td>
              <td>Parameter-driven interaction</td>
              <td>Four-section console and templates</td>
              <td>Regression tests and a real smoke test</td>
              <td>Platform converged into a single console</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 className="mt-5 mb-3">Design Trade-offs</h3>
      <ol>
        <li>
          <strong>Parameter-driven, not file-driven.</strong> Cost: inputs are
          regenerated on restart; benefit: parameters and results always agree.
        </li>
        <li>
          <strong>A single page, not one page per task.</strong> Cost: high
          information density; benefit: the whole chain is visible.
        </li>
        <li>
          <strong>Immediate validation on save, not errors after a run.</strong>{" "}
          Illegal sequences, fractions summing above 1, millimetres read as
          metres, and illegal path characters are all caught the moment Save is
          clicked.
        </li>
        <li>
          <strong>
            Run location is a deployment decision, not a physical parameter.
          </strong>{" "}
          It has its own sub-panel, requires absolute paths, and restricts the
          prefix character set.
        </li>
        <li>
          <strong>
            Magnetomechanics runs locally instead of on the cluster.
          </strong>{" "}
          It is a second-scale computation; waiting for scheduling is a waste.
        </li>
      </ol>
    </>
  ),
};

export const softwareIIModule: DbtlModule = {
  title: "Software II: NEST Software",
  introTitle: "From a paper workflow to a four-step preparation wizard",
  intro: (
    <p>
      NEST Software is the clinician-facing digital layer of the injectable SELP
      biomaterial, with two clinical tasks: ordering the desired scaffold and
      functional module combination, and correctly preparing the formulation
      through a controlled bedside workflow. Iteration for real clinical
      scenarios involves not only code but also workflows, copy, and trade-offs
      about hardware signals. The whole development process went through four
      DBTL cycles, each distilling only major changes and improving usability,
      correctness, and traceability in turn.
    </p>
  ),
  cycles: [
    {
      title: "Cycle 1 — From a paper workflow to a navigable wizard",
      content: {
        Design: (
          <p>
            <strong>
              Replace the paper instructions with a step-by-step wizard driven
              by workflow state
            </strong>
            , and provide two entry points matching the two stages of the
            clinical workflow: Ordering (selecting the scaffold and functional
            modules) and Operating Instructions.
          </p>
        ),
        Build: (
          <p>
            Built the Kotlin / Compose wizard framework with previous/next
            navigation; added hardware schematics, camera preview, and release
            signing; then restructured into the two modules above and formed a
            unified six-step wizard with a consistent visual theme.
          </p>
        ),
        Test: (
          <p>
            Automatically traversed every screen on the emulator, covering
            navigation boundaries, paging controls, and text extraction from
            each screen, with viewport-level pixel layout checks.
          </p>
        ),
        Learn: (
          <p>
            <strong>
              The value of a wizard lies in making each step&rsquo;s purpose
              clearly recognisable
            </strong>
            ; purely decorative schematics only add noise, and giving each
            hardware action its own screen creates repetition that must be
            solved in the next cycle.
          </p>
        ),
      },
    },
    {
      title: "Cycle 2 — Merging hardware steps into a unified chain screen",
      content: {
        Design: (
          <p>
            <strong>
              Merge the repetitive hardware-step screens into one unified chain
              screen
            </strong>
            : switching the operation row by step, with the camera preview and
            timer staying persistent across switches.
          </p>
        ),
        Build: (
          <p>
            Introduced the shared chain screen, removed the four separate
            hardware-step screens, and pointed all hardware steps in the wizard
            to that screen.
          </p>
        ),
        Test: (
          <p>
            Verified on the emulator that the camera preview and timer keep
            state across step switches (no flicker from re-mounting), and that
            each operation row behaves independently.
          </p>
        ),
        Learn: (
          <p>
            Merging duplicate screens made the hardware area easier to
            understand and also prepared the ground for later removal on demand
            (see Cycle 4). With the interface structure settled, the next round
            turned to the information itself: letting information travel with
            the material.
          </p>
        ),
      },
    },
    {
      title:
        "Cycle 3 — QR recognition, dynamic instructions, and copy standardisation",
      content: {
        Design: (
          <p>
            <strong>Let information travel with the material</strong>: every
            dispensed vial carries a QR code that, when scanned, loads that
            formulation&rsquo;s instructions directly on the device, with live
            camera view and on-device decoding, and manual entry kept as a
            fallback.
          </p>
        ),
        Build: (
          <p>
            Added the scan step at the front of the wizard, with the camera view
            as background and a mask exposing only a central frame; the decoded
            result loads the corresponding instructions; instructions became
            product-dynamic (the PBS–SELP–Ru–sPS module manual), and all
            placeholder copy was replaced with final wording.
          </p>
        ),
        Test: (
          <p>
            Completed end-to-end scanning tests with a USB camera on the
            emulator, verified no image leakage outside the mask, and
            regression-tested the manual fallback path.
          </p>
        ),
        Learn: (
          <p>
            The emulator camera is unstable, so a manual fallback is a
            prerequisite for a clinical-grade tool; Compose camera previews need
            correct cropping and compatible render modes or the image overflows;
            and <strong>copy is an engineering output too</strong> — every
            user-visible string deserves review. With scanning, the app gained
            formulation information; the next round therefore put that advantage
            to work for operating safety and narrowed the scope together with
            the hardware team.
          </p>
        ),
      },
    },
    {
      title: "Cycle 4 — Safety constraints, localisation, and scope adjustment",
      content: {
        Design: (
          <ul>
            <li>
              <strong>Ordered reagent loading</strong>: the formulation must be
              assembled in a fixed order — PBS → SELP → Ru → sPS → functional
              module — with each reagent confirmed before the next unlocks.
            </li>
            <li>
              <strong>Scope adjustment</strong>: after discussions with the
              hardware team the project focus shifted, and we decided not to
              integrate hardware-related signals (live camera, magnetic field,
              blue light) for now.
            </li>
          </ul>
        ),
        Build: (
          <p>
            Added the ordered-reagent interface (completion count and guidance
            cues; Next stays locked until all five reagents are confirmed);
            added EN/CH switching and unified the app brand as NEST Software;
            removed the hardware-related later steps (injection, magnetic field,
            blue light, closing) together with the shared hardware chain screen
            and schematics, converging the wizard to four steps — scan QR code →
            general instructions → add reagents → premixing — and updated the
            instructions and workflow-overview copy accordingly.
          </p>
        ),
        Test: (
          <p>
            Verified on the emulator that the four-step wizard renders in order
            from 1/4 to 4/4, that Next stays correctly locked until all reagents
            are confirmed, that EN/CH switching covers every screen, and that
            neither language shows placeholder or test traces.
          </p>
        ),
        Learn: (
          <p>
            The premixing step ultimately shows only one operating instruction
            (wait for the premixer&rsquo;s green light), and the operator judges
            completion from it —{" "}
            <strong>the software does not read device status</strong>; removing
            hardware-related steps was a decision made together with the
            hardware team, focusing effort on the confirmed app workflow.
          </p>
        ),
      },
    },
  ],
};
