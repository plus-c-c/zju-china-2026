import { FigureCaption } from "../components/FigureCaption";
/**
 * Software page — usage documentation for both software tools, converted from
 * `Software-new-en.md` (2026-10-16):
 *
 *   Introduction            Background and the division of labour within NEST
 *   1 Research Side         SELP molecular dynamics simulation platform
 *   2 User Side             NEST Software (ordering + operating instructions)
 *   3 Engineering Practices Safety, performance, resource and accessibility
 *
 * The engineering (DBTL) record lives in the separate engineering document.
 */
import "./software.css";

export function Software() {
  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article className="software-page">
          <h2 className="mt-5 mb-4">Introduction</h2>
          <p>
            This project focuses on an injectable SELP hydrogel delivery system.
            SELP combines the mechanical support of silk-like blocks with the
            flexibility of elastin-like blocks. Crosslinked by the Ru/SPS
            (ruthenium/sodium persulfate) visible-light initiating system and
            assembled with functional modules through standardized peptide
            interfaces, it forms a modular, tunable, injectable material system
            (the roles of the individual modules are described in the General
            Instructions in the Injection Module).
          </p>
          <p>
            Within NEST, the material defines the repair function, models
            support design choices, hardware establishes gelation conditions,
            and the software{" "}
            <strong>
              organizes the formulation, status, and operating information along
              the workflow
            </strong>
            , carrying the design and modeling rationale into the operating
            steps (see the Model page for the modeling part). Two groups of
            users each have one central question:
          </p>
          <ul>
            <li>
              <strong>Researchers</strong>: How does a SELP sequence behave
              mechanically after crosslinking? How do crosslink density, strain,
              and the applied magnetic field change the overall response?
            </li>
            <li>
              <strong>Clinicians</strong>: Given a specific formulation, how
              should it be selected, prepared, and injected to ensure safety?
            </li>
          </ul>
          <p>
            The two software tools answer these questions.{" "}
            <strong>
              Software I · SELP Molecular Dynamics Simulation Platform
            </strong>{" "}
            serves researchers: it organizes the simulation workflow into a
            pipeline that can be inspected and modified at any time, supporting
            prediction of material behavior and explanation of its causes.{" "}
            <strong>Software II · NEST Software</strong> serves the clinic: it
            guides clinicians step by step through material selection and
            preparation. The two tools differ in users, scenarios, and
            deployment; the following sections introduce the research side and
            the user side in turn, and then the engineering practices they
            share.
          </p>

          <h2 className="mt-5 mb-4">
            1 Research Side: SELP Molecular Dynamics Simulation Platform
          </h2>
          <p>
            The SELP molecular dynamics simulation platform is built for
            researchers and material developers. It organizes the modeling
            workflow described on the Model page into a pipeline (Flow) that can
            be <strong>inspected, modified, and re-run at any time</strong>,
            supporting researchers in predicting material behavior and
            explaining its causes.
          </p>

          <h3 className="mt-5 mb-3">1.1 The Three-Step Simulation Pipeline</h3>
          <p>
            A complete analysis consists of three computational steps, with
            products passed automatically along the pipeline — each step&rsquo;s
            output is the next step&rsquo;s input,{" "}
            <strong>with no manual file handling</strong>. The three steps
            correspond to the three computational stages of the modeling
            workflow described on the Model page (see that page for method
            details):
          </p>
          <p>
            <strong>Table 1</strong>: Task types, purpose, and interface of the
            three computational steps.
          </p>
          <div className="table-responsive mb-4">
            <table
              className="table table-bordered align-middle"
              aria-label="Table 1: task types and interfaces of the three computational steps"
            >
              <thead>
                <tr>
                  <th scope="col">Step</th>
                  <th scope="col">Task type</th>
                  <th scope="col">What it solves</th>
                  <th scope="col">Interface</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Step 1</td>
                  <td>flow_tiger2</td>
                  <td>
                    Single-chain conformations (all-atom enhanced sampling)
                  </td>
                  <td>TIGER2 FAMD (all-atom MD)</td>
                </tr>
                <tr>
                  <td>Step 2</td>
                  <td>flow_gromacs_cg</td>
                  <td>
                    Coarse-grained crosslinked network and compressive modulus
                  </td>
                  <td>GROMACS (coarse-grained)</td>
                </tr>
                <tr>
                  <td>Step 3</td>
                  <td>flow_magnetomech</td>
                  <td>
                    Anisotropic response under the applied field
                    (magneto-mechanical coupling)
                  </td>
                  <td>Magnetomechanics (composite + field)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <figure className="figure d-block my-4 text-center">
            <img
              src="https://static.igem.wiki/teams/6102/wiki/images/software/01.avif"
              alt="Pipeline overview of the SELP molecular dynamics simulation platform."
              className="figure-img img-fluid rounded"
              style={{ width: "100%" }}
              loading="lazy"
              decoding="async"
            />
            <FigureCaption className="figure-caption">
              Figure 1 | Pipeline overview. ① flow name and the three-step chain
              (TIGER2 FAMD → GROMACS → Magnetomech, with products passed along
              the chain); ② completion (2 / 3 steps complete); ③ each step card
              with its run status.
            </FigureCaption>
          </figure>

          <h3 className="mt-5 mb-3">1.2 Components and Implementation</h3>
          <p>
            The platform is split into four layers in a replaceable, extensible
            way, so that adding a new type of simulation step requires no
            changes to the other layers:
          </p>
          <ul>
            <li>
              <strong>Frontend</strong>: the interface is organized by flow
              rather than by individual task; the four sections (Dashboard,
              Parameters, Results, Control) share the same progress data, so
              switching tabs requires no new chart requests.
            </li>
            <li>
              <strong>Backend service</strong>: the routing layer (routes/) is
              separated from the service layer (services/).
            </li>
            <li>
              <strong>Task-type plugins</strong>: every kind of step is a plugin
              (flow_tiger2, flow_gromacs_cg, flow_magnetomech). Once a task type
              and its parameter template are registered on the backend, the
              frontend automatically generates the corresponding parameter panel
              and run buttons, with no frontend code changes.
            </li>
            <li>
              <strong>Compute layer</strong>: the first and second steps run on
              the remote server; the third runs locally on the backend host.
            </li>
          </ul>
          <p>The technology choices for these components are as follows:</p>
          <p>
            <strong>Table 2</strong>: Technology stack of the SELP molecular
            dynamics simulation platform.
          </p>
          <div className="table-responsive mb-4">
            <table
              className="table table-bordered align-middle"
              aria-label="Table 2: technology stack of the simulation platform"
            >
              <thead>
                <tr>
                  <th scope="col">Layer</th>
                  <th scope="col">Technology</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Frontend</td>
                  <td>React 19, TypeScript, Vite 7</td>
                </tr>
                <tr>
                  <td>Charts &amp; 3D</td>
                  <td>Recharts (charts), NGL (3D trajectories)</td>
                </tr>
                <tr>
                  <td>Backend</td>
                  <td>Node.js, Express</td>
                </tr>
                <tr>
                  <td>Remote execution</td>
                  <td>ssh2 (SSH key authentication)</td>
                </tr>
                <tr>
                  <td>Simulation &amp; analysis</td>
                  <td>
                    NAMD (TIGER2 FAMD all-atom), GROMACS (Martini 3
                    coarse-grained), Python
                  </td>
                </tr>
                <tr>
                  <td>Toolchain</td>
                  <td>npm (backend Node.js / frontend Vite)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-5 mb-3">
            1.3 Usage Flow: From Parameters to Results
          </h3>
          <p>
            The platform fits the whole pipeline into a single page, organized
            around the four questions a user asks in order: where the run
            currently stands (Dashboard), what this step needs (Parameters), how
            to start and control it (Control), and what results came out
            (Results).
          </p>

          <h4 className="mt-4 mb-3">1.3.1 Progress: Dashboard</h4>
          <p>
            Dashboard answers &ldquo;how far along is this pipeline and what
            comes next&rdquo;. The top shows progress such as 2 / 3 steps
            complete, and the step cards below list the status of each step and
            mark the current one.
          </p>
          <p>
            The flow page lives at <code>#/flow/&lt;flow-id&gt;</code>, and each
            tab also has its own address (e.g.{" "}
            <code>#/flow/&lt;flow-id&gt;/parameters</code>), so links can be
            shared directly. The page refreshes automatically every 30 seconds,
            so long-running simulations can be tracked without manual
            refreshing.
          </p>

          <h4 className="mt-4 mb-3">1.3.2 Parameters and Saving: Parameters</h4>
          <p>
            Parameters is the main area for using the platform. Each step has
            one parameter panel, arranged top to bottom in pipeline order, so
            filling them in from top to bottom is the correct execution order.
            Steps that need SSH (the first and second) have an additional{" "}
            <strong>Where this step runs</strong> sub-panel for the remote
            working directory and log prefix. It concerns execution location
            rather than physical parameters: the paths must be absolute, and the
            step can only start once both fields are filled in and show
            configured.
          </p>
          <p>
            Each panel has two buttons at the bottom with deliberately distinct
            semantics (Figure 2):
          </p>
          <p>
            <strong>Table 3</strong>: Semantics of the Save and Save &amp;
            restart buttons in a parameter panel.
          </p>
          <div className="table-responsive mb-4">
            <table
              className="table table-bordered align-middle"
              aria-label="Table 3: semantics of the Save and Save & restart buttons"
            >
              <thead>
                <tr>
                  <th scope="col">Button</th>
                  <th scope="col">Behaviour</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Save</td>
                  <td>Saves parameters only; does not trigger a run</td>
                </tr>
                <tr>
                  <td>Save &amp; restart</td>
                  <td>
                    Saves, regenerates inputs with the new parameters, and
                    restarts the step
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The third step is the exception: it has only <strong>Save</strong>,
            because it is a one-off local computation — every click on{" "}
            <strong>Compute</strong> re-computes with the current values in the
            panel.
          </p>
          <figure className="figure d-block my-4 text-center">
            <img
              src="https://static.igem.wiki/teams/6102/wiki/images/software/02.avif"
              alt="Step 1 parameter panel."
              className="figure-img img-fluid rounded"
              style={{ width: "100%" }}
              loading="lazy"
              decoding="async"
            />
            <FigureCaption className="figure-caption">
              Figure 2 | Step 1 parameter panel. ① sequence and annotation
              input; ② Where this step runs (the step can only start once it
              shows configured); ③ the Derive sub-panel; ④ Motif annotations; ⑤
              Save / Save &amp; restart.
            </FigureCaption>
          </figure>

          <h5 className="mt-4 mb-2">
            Step 1 Parameters: Sequence &amp; Motif Annotation
          </h5>
          <p>
            The panel is titled <strong>Sequence &amp; annotation input</strong>{" "}
            and contains the following fields: <strong>Protein</strong> (an
            identifier only, e.g. 2KY10), <strong>Amino-acid sequence</strong>{" "}
            (multi-line text box, showing the residue count live),{" "}
            <strong>PSF topology</strong> (e.g. protein.psf, generated on the
            remote host and required before NAMD can start). Illegal amino-acid
            codes are flagged immediately, and an empty sequence cannot be
            saved.
          </p>
          <p>
            <strong>Motif annotations</strong> highlight every occurrence of
            each motif in the trajectory viewer, with four columns: Label,
            Motif, Matches and Color (hex colour; when left empty a colour is
            assigned automatically). If a motif does not occur in the sequence,
            or a colour is not a valid hex value, the save is rejected
            immediately — there is no need to wait until the simulation ends.
          </p>
          <p>
            If a PDB structure already exists (e.g. the product of an upstream
            step), the <strong>Derive</strong> sub-panel can recover the
            sequence from another step in the same flow: select the step, click{" "}
            <strong>Derive</strong>, choose a specific chain if the structure
            contains several, and then click <strong>Save &amp; restart</strong>
            . The panel also states the limitation: this only recovers the
            sequence — restarting rebuilds a fresh extended chain rather than
            the original folded conformation.
          </p>

          <h5 className="mt-4 mb-2">
            Step 2 Parameters: CG Crosslinking and Compressive Modulus
          </h5>
          <p>
            The panel is titled{" "}
            <strong>CG network &amp; deformation input</strong>, with the
            following main fields:
          </p>
          <p>
            <strong>Table 4</strong>: Main parameter fields and units of Step 2
            (CG network and deformation).
          </p>
          <div className="table-responsive mb-4">
            <table
              className="table table-bordered align-middle"
              aria-label="Table 4: main parameter fields of step 2"
            >
              <thead>
                <tr>
                  <th scope="col">Field</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>System</td>
                  <td>—</td>
                  <td>System name</td>
                </tr>
                <tr>
                  <td>Crosslinks</td>
                  <td>count</td>
                  <td>Number of crosslink edges in the periodic CG network</td>
                </tr>
                <tr>
                  <td>Chains</td>
                  <td>count</td>
                  <td>Number of chains in the network</td>
                </tr>
                <tr>
                  <td>Temperature</td>
                  <td>K</td>
                  <td>
                    Thermostat reference temperature written into the GROMACS
                    mdp
                  </td>
                </tr>
                <tr>
                  <td>Stretch</td>
                  <td>ε</td>
                  <td>
                    Axial Hencky strains sampled along each axis,
                    comma-separated
                  </td>
                </tr>
                <tr>
                  <td>Replicas</td>
                  <td>count</td>
                  <td>Number of replicas</td>
                </tr>
                <tr>
                  <td>Steps / cycle</td>
                  <td>steps</td>
                  <td>Steps per cycle</td>
                </tr>
                <tr>
                  <td>Cycles</td>
                  <td>count</td>
                  <td>Total number of cycles</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Crosslink-density hint: below the Crosslinks field the platform
            shows the number of crosslinks per chain live (e.g. 1.375 crosslinks
            per chain), so the network density can be judged against the target
            range while filling in the form, rather than after the simulation
            ends.
          </p>
          <p>
            The compressive modulus computed in the second step is written into
            the step&rsquo;s analysis output directory (output/); the same file
            provides estimates under several network models, and the third step
            reads it automatically — no manual entry. If no modulus curve
            appears in Results, the analysis for this step has not finished yet:
            click <strong>Start</strong> in Control and wait for the status to
            turn <strong>Done</strong>.
          </p>
          <p>
            <strong>Input checks run before saving</strong>: Stretch must be a
            number greater than 0 and not exceeding 1, comma-separated and
            without unit symbols; Temperature must not be below 10 K; Chains,
            Steps / cycle and Cycles must be integers of at least 1.
          </p>

          <h5 className="mt-4 mb-2">
            Step 3 Parameters: Volume Fractions and Applied Field
          </h5>
          <p>
            The panel is titled{" "}
            <strong>Polymer &amp; nanoparticle fractions, applied field</strong>
            .
          </p>
          <p>
            Volume fractions: the sum of Polymer fraction (polymer skeleton) and
            Nanoparticle fraction (magnetic particles) must not exceed 1; the
            water fraction does not need to be entered — the platform fills in
            the remainder, so that the polymer skeleton, the magnetic particles,
            and water sum to exactly 1. If the two exceed 1, the panel turns red
            and points at the field at fault.
          </p>
          <p>
            The applied magnetic field has three modes: Uniform (constant
            field), Gradient (rising linearly from Base field along the sample
            height by Field rise, with the peak being their sum) and From file
            (a profile specified by a CSV file). Whichever mode is chosen, the
            sample height and profile points are required.
          </p>
          <p>
            To specify the field profile with a CSV file: first upload the local
            CSV to this step&rsquo;s input/ directory with{" "}
            <strong>Upload</strong> (<strong>Download</strong> fetches it back).
            Uploading and saving are two different things — uploading only
            places the file in the directory, and it is used for the run only
            after you also click <strong>Save</strong>. The first line of the
            CSV must be a header containing a position column (z/x in metres,
            z_mm/x_mm/position_mm in millimetres) and a field column (b in
            tesla, h in A/m).
          </p>
          <p>
            Column names and units must be explicit: a column name with no
            suffix is read as metres, and a name ending in _mm as millimetres —
            the convention exists so that a unit mistake cannot silently produce
            a near-zero field. If the file is empty, lacks a position or field
            column, or its position range does not cover (or far exceeds) the
            sample height, the platform rejects the save and reports the column
            names actually found (Figure 3).
          </p>
          <figure className="figure d-block my-4 text-center">
            <img
              src="https://static.igem.wiki/teams/6102/wiki/images/software/03.avif"
              alt="Step 3 run summary."
              className="figure-img img-fluid rounded"
              style={{ width: "100%" }}
              loading="lazy"
              decoding="async"
            />
            <FigureCaption className="figure-caption">
              Figure 3 | Step 3 run summary. ① the step and its locally computed
              result (cache/…); ② applied magnetic field parameters (incl.
              particle volume fraction 0.05); ③ applied field profile (generated
              from the parameters in uniform mode, not read from a CSV file).
            </FigureCaption>
          </figure>

          <h4 className="mt-4 mb-3">1.3.3 Running and Monitoring: Control</h4>
          <p>
            With parameters filled in, both running and monitoring happen in the
            Control block, which provides run and view buttons for each step:
          </p>
          <p>
            <strong>Table 5</strong>: Run and view buttons for each step.
          </p>
          <div className="table-responsive mb-4">
            <table
              className="table table-bordered align-middle"
              aria-label="Table 5: run and view buttons for each step"
            >
              <thead>
                <tr>
                  <th scope="col">Step</th>
                  <th scope="col">Run buttons</th>
                  <th scope="col">View buttons</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Step 1 TIGER2 FAMD</td>
                  <td>Start / Stop / Restart / Pause / Continue</td>
                  <td>Temperature / Convergence / Structure</td>
                </tr>
                <tr>
                  <td>Step 2 GROMACS</td>
                  <td>Start / Stop / Restart / Pause / Continue</td>
                  <td>Structure</td>
                </tr>
                <tr>
                  <td>Step 3 Magnetomechanics</td>
                  <td>Compute</td>
                  <td>Field deformation</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The <strong>Start / Restart</strong> buttons of the second step
            launch GROMACS from within the application: with SLURM on the server
            the job is submitted via sbatch, and without SLURM it is started
            detached (setsid) —{" "}
            <strong>
              no need to log into the server and submit jobs by hand
            </strong>
            . <strong>Pause</strong> genuinely pauses the simulation (SIGSTOP
            for the first step, scontrol suspend for the second), and{" "}
            <strong>Continue</strong> resumes from where it stopped without
            recomputing; if the simulation is not actually running, the
            interface says so explicitly instead of falsely reporting a
            successful pause.
          </p>
          <p>
            The third step has only <strong>Compute</strong>: it is a local
            numerical computation where queueing takes longer than the
            computation itself, so it runs locally on the backend host and
            returns a result figure. After clicking, the button briefly shows a
            running state and then reports success or failure. The bottom of the
            panel shows the step&rsquo;s working directory, with locally run
            steps labelled &ldquo;runs locally on the backend host&rdquo;; the{" "}
            <strong>Execution</strong> section below shows the execution
            location (local / ssh), input and output directories, and the
            resolution of external programs such as gmx and matlab, so
            configuration errors are visible before a run.
          </p>
          <blockquote className="blockquote border-start border-3 ps-3">
            <p>
              Why are the parameter buttons separated from the run buttons?
              Parameters modifies parameters; Control runs. This lets you finish
              setting and saving the parameters of every step first, then start
              them in order, instead of triggering a long computation the moment
              one parameter changes.
            </p>
          </blockquote>

          <h4 className="mt-4 mb-3">
            1.3.4 Results and Interpretation: Results
          </h4>
          <p>
            Results groups output by category and shows only the result tabs a
            step actually produces; steps that are not finished yet{" "}
            <strong>
              state what is missing instead of showing an empty panel
            </strong>
            . The result types presented by different steps are as follows:
          </p>
          <p>
            <strong>Table 6</strong>: Result categories in Results and the steps
            they apply to.
          </p>
          <div className="table-responsive mb-4">
            <table
              className="table table-bordered align-middle"
              aria-label="Table 6: result categories and applicable steps"
            >
              <thead>
                <tr>
                  <th scope="col">Tab</th>
                  <th scope="col">Content</th>
                  <th scope="col">Applies to</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Trajectory</td>
                  <td>3D trajectory animation, replica selectable</td>
                  <td>Steps with trajectory output</td>
                </tr>
                <tr>
                  <td>Structure</td>
                  <td>Structural analysis charts</td>
                  <td>Steps 1 and 2</td>
                </tr>
                <tr>
                  <td>Convergence</td>
                  <td>Convergence check (pass / fail and overall verdict)</td>
                  <td>Step 1 only</td>
                </tr>
                <tr>
                  <td>Temperature</td>
                  <td>Temperature-exchange details</td>
                  <td>Step 1 only</td>
                </tr>
                <tr>
                  <td>Field &amp; deformation</td>
                  <td>Magneto-mechanical result figures</td>
                  <td>Step 3 only</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The <strong>Structure</strong> charts grow and shrink with the
            actual data: radius of gyration, end-to-end distance, RMSD,
            secondary structure, per-chain radius of gyration, energy,
            simulation-box vectors and crosslink counts.
          </p>
          <p>
            <strong>Temperature</strong> does not apply to steps run at a fixed
            temperature; the second step explicitly notes that it runs at fixed
            temperature without replica exchange.
          </p>
          <p>
            <strong>Field &amp; deformation</strong> (third step) consists of
            one main figure (Computed deformation under the applied field) and
            six itemised result figures: local axial modulus, displacement
            field, axial strain, pore pressure, axial stress and applied
            magnetic field. These results cross-reference the modeling on the
            Model page.
          </p>

          <h2 className="mt-5 mb-4">2 User Side: NEST Software</h2>
          <p>
            The simulation platform answers &ldquo;how will the material
            behave&rdquo;; when the material moves toward the clinic, another
            question arises: how should a given formulation be selected,
            prepared, and used. NEST Software is the clinician-facing digital
            layer of the injectable SELP biomaterial, with two clinical tasks:
            ordering the desired scaffold and functional module combination, and
            correctly preparing the formulation through a controlled bedside
            workflow. The home screen provides two modules: Ordering and
            Operating Instructions (the Injection Module, a four-step clinical
            wizard).
          </p>
          <p>
            <strong>
              The current version focuses on the preparation stage
            </strong>
            : the application does not communicate with hardware devices, and
            its guidance <strong>ends at premixing</strong>; injection, magnetic
            orientation and photocrosslinking are carried out by the hardware
            devices and their operating procedures (see the Hardware page).
          </p>

          <h3 className="mt-5 mb-3">2.1 Formulation Selection: Ordering</h3>
          <p>
            Ordering is how clinicians enter the material system: first select a
            Preconditioned SELP Scaffold (2KY-5-Tag / 2KY-10-Tag — the
            corresponding 2KY-5 / 2KY-10 scaffolds with SnoopTag2 added), then a
            Functional Module (Mitochondrial Therapy / Magnetically Responsive
            Anisotropy / GAG Retention), and fill in the order quantity (vials);
            a summary of the order is shown live at the bottom of the page. Both
            selections carry explanations — the scaffold entry notes the number
            of repeat units and the SnoopTag2 docking sites, while the module
            entry notes its composition and purpose. After submission the flow
            moves automatically to Operating Instructions, and the order details
            are handled centrally by the project team (Figure 4).
          </p>
          {/* Figure 4 为竖版手机截图（500×1000）：宽度取 25%，
              使渲染高度与横版 Figure 5（software/005，1752×876，2:1）一致 */}
          <figure className="figure d-block my-4 text-center">
            <img
              src="https://static.igem.wiki/teams/6102/wiki/images/software/04.avif"
              alt="Ordering screen."
              className="figure-img img-fluid rounded"
              style={{ width: "25%" }}
              loading="lazy"
              decoding="async"
            />
            <FigureCaption className="figure-caption">
              Figure 4 | Ordering screen. ① select the preconditioned SELP
              scaffold (2KY-5-Tag / 2KY-10-Tag — the corresponding 2KY-5 /
              2KY-10 scaffolds with SnoopTag2 added); ② select the functional
              module (Mitochondrial Therapy / Magnetically Responsive Anisotropy
              / GAG Retention); ③ enter the order quantity (vials); ④ live order
              summary.
            </FigureCaption>
          </figure>

          <h3 className="mt-5 mb-3">
            2.2 Operating Instructions: the Four-Step Clinical Wizard (Injection
            Module)
          </h3>
          <p>
            Operating Instructions opens a four-step wizard, with &ldquo;Step n
            / 4&rdquo; and a progress bar at the top and Previous / Next buttons
            at the bottom. The four steps and their contents are as follows
            (Figure 5):
          </p>
          <p>
            <strong>Table 7</strong>: Steps and contents of the four-step
            clinical wizard.
          </p>
          <div className="table-responsive mb-4">
            <table
              className="table table-bordered align-middle"
              aria-label="Table 7: steps and contents of the four-step clinical wizard"
            >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Step</th>
                  <th scope="col">Content</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Scan QR Code</td>
                  <td>
                    Recognise the QR code on the package in the viewfinder and
                    read that batch&rsquo;s formulation; the code content can
                    also be entered by hand
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>General Instructions</td>
                  <td>
                    The formulation-specific instructions loaded from the scan
                    result
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Add Reagents</td>
                  <td>
                    Place the reagents one by one in the fixed order and confirm
                    each item
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Premixing</td>
                  <td>
                    On-screen instruction: wait for the premixer&rsquo;s green
                    light
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>Scan QR Code.</strong> Every vial carries a printed QR code;
            scanning it loads the instructions for that specific formulation,
            including component composition, operating conditions, safety notes
            and storage/quality-control data. If the code is not recognised, the
            page shows &ldquo;Unrecognized&rdquo;, and the code content can also
            be entered by hand in the &ldquo;QR code content&rdquo; field. The
            app never presents generic content as formulation-specific content.
          </p>
          <p>
            <strong>General Instructions.</strong> The instructions switch with
            the scan result: the page shows the complete Instructions for Use of
            that formulation, and the following steps are based on it.
          </p>
          <p>
            <strong>Add Reagents.</strong> Add the reagents one by one in the
            fixed order and confirm each item, completing the formulation
            assembly.
          </p>
          <p>
            <strong>Premixing.</strong> After the reagents are placed, the
            wizard moves to premixing. This page shows a single operating
            instruction: wait for the premixer&rsquo;s green light. The app does
            not communicate with the premixer or read device status — whether
            premixing is complete is judged by the operator from the
            instruction, so that instruction must be unambiguous.
          </p>
          <figure className="figure d-block my-4 text-center">
            <img
              src="https://static.igem.wiki/teams/6102/wiki/images/software/005.avif"
              alt="The four-step app wizard."
              className="figure-img img-fluid rounded"
              style={{ width: "100%" }}
              loading="lazy"
              decoding="async"
            />
            <FigureCaption className="figure-caption">
              Figure 5 | The app wizard. ① scan the QR code (manual entry also
              possible); ② load the formulation-specific Instructions for Use; ③
              add the reagents in order and confirm each one; ④ premixing — wait
              for the premixer&rsquo;s green light.
            </FigureCaption>
          </figure>

          <h3 className="mt-5 mb-3">2.3 Tech Stack</h3>
          <p>
            The app is built for bedside use, prioritising on-device capability
            and offline availability:
          </p>
          <p>
            <strong>Table 8</strong>: Tech stack of the NEST Software app.
          </p>
          <div className="table-responsive mb-4">
            <table
              className="table table-bordered align-middle"
              aria-label="Table 8: tech stack of the NEST Software app"
            >
              <thead>
                <tr>
                  <th scope="col">Layer</th>
                  <th scope="col">Technology</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Client</td>
                  <td>Kotlin, Jetpack Compose, Material 3</td>
                </tr>
                <tr>
                  <td>Platform</td>
                  <td>Android, minSdk 26</td>
                </tr>
                <tr>
                  <td>Capture &amp; recognition</td>
                  <td>CameraX, ZXing (on-device decoding)</td>
                </tr>
                <tr>
                  <td>Localisation</td>
                  <td>
                    Bilingual interface copy, switchable in-app with EN / CH
                  </td>
                </tr>
                <tr>
                  <td>Server dependency</td>
                  <td>
                    Material server (batch attributes and instructions lookup)
                  </td>
                </tr>
                <tr>
                  <td>Toolchain</td>
                  <td>Gradle 8.13, AGP 8.13.2, Kotlin 2.2.21, JDK 21</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="mt-5 mb-4">3 Engineering Practices</h2>
          <p>
            Both tools are designed and optimised for their own scenarios and
            share one set of engineering and accessibility practices.
          </p>

          <h3 className="mt-5 mb-3">3.1 Safety by Design</h3>
          <p>
            The software writes safety requirements directly into the workflow
            rather than relying on paper attachments:
          </p>
          <ul>
            <li>
              <strong>Ordered loading</strong>: a fixed sequence with
              item-by-item confirmation, preventing wrong order or omissions;
            </li>
            <li>
              <strong>Explicit completion guidance</strong>: every step states
              the next action in unambiguous text, so the operator never has to
              guess;
            </li>
            <li>
              <strong>Large-text status messages</strong>: designed for
              operation when both hands are occupied — readable at a glance.
            </li>
          </ul>
          <p>
            Safety information reaches the bedside together with the material:
            after a successful scan, the instructions shown belong to that
            specific formulation; when the QR code is not recognised, the page
            clearly displays &ldquo;Unrecognized&rdquo;. The interface copy is
            bilingual (English / Chinese) and can be switched inside the
            application with EN / CH.
          </p>

          <h3 className="mt-5 mb-3">3.2 Performance Optimization</h3>
          <ul>
            <li>
              <strong>
                Software I · separation of remote and local computation
              </strong>
              : long-running simulations go to the remote cluster, while
              second-scale computations such as the third step run locally on
              the backend host, without SSH and without occupying the cluster
              queue.
            </li>
            <li>
              <strong>Software I · per-step caching</strong>: trajectories and
              analysis products are cached in cache/, so later viewing requires
              no re-download or re-conversion.
            </li>
            <li>
              <strong>Software I · step-level restart</strong>: every step can
              be started, stopped and restarted individually, so a failure does
              not require re-running the whole flow.
            </li>
            <li>
              <strong>Software II · offline scanning</strong>: QR codes are
              recognised directly on the device, so instructions can still be
              loaded offline; when no camera is available, manual entry works.
            </li>
          </ul>

          <h3 className="mt-5 mb-3">3.3 Resource and Accessibility</h3>
          <p>
            Both tools are built and run in a standard engineering way, and keys
            and signing configurations are not kept in the repository.
          </p>

          <h4 className="mt-4 mb-3">3.3.1 Setup and Deployment</h4>
          <pre>
            <code>{`# Software I · SELP molecular dynamics simulation platform
git clone <repository-url>
cd igem-2026-software

cd backend && npm install      # backend dependencies
cd ../frontend && npm install  # frontend dependencies

cd ../backend && npm start     # start backend on :3001
cd ../frontend && npm run dev  # start frontend on :5174

# Software II · NEST Software
cd igem-2026-app
./gradlew assembleDebug`}</code>
          </pre>

          <h4 className="mt-4 mb-3">3.3.2 Data Availability</h4>
          <p>
            Task configurations, parameter templates and example data are
            published alongside the code; external inputs such as the magnetic
            field profile use CSV files with explicit column and unit
            conventions (z/x in metres, z_mm in millimetres; b in T, h in A/m),
            so they can be exchanged directly with experimental measurements.
          </p>

          <h4 className="mt-4 mb-3">3.3.3 Code Availability</h4>
          <p>
            The Software I documentation includes docs/full-workflow-guide.md,
            docs/simulation-principles.md, docs/sequence-annotation-workflow.md,
            docs/task-creation.md, docs/environment-setup.md and others;
            Software II is a standard Gradle project that builds without extra
            environment configuration.
          </p>
        </article>
      </div>
    </div>
  );
}
