export function SoftwareIUsage() {
  return (
    <>
      <h3 className="mt-5 mb-3">
        Software I: SELP molecular dynamics simulation platform
      </h3>
      <p>
        The SELP molecular dynamics simulation platform serves researchers and
        material developers alongside wet-lab experiments and simulations. It
        organizes the simulation steps that previously had to be chained by hand
        into a pipeline (a <strong>Flow</strong>) that can be viewed and
        modified at any time. One complete analysis consists of three
        computation steps:
      </p>
      {/* Figure 1 (image removed): pipeline steps and product passing. */}
      <h4 className="mt-4 mb-3">Core components</h4>
      <ul>
        <li>
          Frontend: the interface is organized by flow rather than by individual
          job; the four sections (Dashboard, Parameters, Results, Control) share
          the same progress data, so switching tabs does not require requesting
          charts again.
        </li>
        <li>
          Backend service: routing layer (routes/) separated from service layer
          (services/).
        </li>
        <li>
          Job-type plugins: each kind of step is a plugin (flow_tiger2,
          flow_gromacs_cg, flow_magnetomech). After the backend registers a job
          type and parameter template, the frontend automatically generates the
          corresponding parameter panel and run button without frontend code
          changes.
        </li>
        <li>
          Computation layer: the first and second steps run on the remote
          server; the third runs locally on the backend host.
        </li>
      </ul>
      <h4 className="mt-4 mb-3">Tech stack</h4>
      {/* Draft placeholder: tech stack content not written yet */}
      <h4 className="mt-4 mb-3">Dashboard</h4>
      <p>
        The Dashboard answers one core question: how far has this flow
        progressed, and what should be done next. The top shows progress in the
        form of 2 / 4 steps complete, and progress cards below list the status
        of each step and mark the current one.
      </p>
      <p>
        A flow page has the address #/flow/&lt;flow-id&gt;, and every tab also
        has its own address (e.g. #/flow/&lt;flow-id&gt;/parameters), so it can
        be shared directly. The page refreshes automatically every{" "}
        <strong>30</strong> seconds.
      </p>
      <h4 className="mt-4 mb-3">Parameters</h4>
      <p>
        This is the main working area of the platform. Each step has a parameter
        panel, arranged from top to bottom in flow order, so filling them in top
        to bottom is the correct execution order. Steps requiring SSH (the first
        and second) additionally have a <strong>Where this step runs</strong>{" "}
        sub-panel for the remote working directory and log prefix; this item is
        a running location rather than a physical parameter, the paths must be
        absolute, and the step can only be started once both fields are filled
        and configured is displayed.
      </p>
      <p>Each panel has two buttons at the bottom:</p>
      <p>
        The third step is an exception with only <strong>Save</strong>: it is a
        one-off local computation, and each click of <strong>Compute</strong>{" "}
        recalculates with the current panel values.
      </p>
      {/* Figure 2 (image removed): parameter panel (save semantics and validation on save). */}
      <h5 className="mt-4 mb-2">
        Step-one parameters: sequence and motif annotation
      </h5>
      <p>
        The panel is titled <strong>Sequence &amp; annotation input</strong> and
        contains the following fields: <strong>Protein</strong> (an identifier
        only, e.g. 2KY-10 SELP (339 aa)), <strong>Amino-acid sequence</strong> (a
        multi-line text box showing the residue count in real time), and{" "}
        <strong>PSF topology</strong> (e.g. protein.psf, generated on the remote
        host and required before NAMD starts). Illegal amino-acid codes are
        flagged immediately, and an empty sequence cannot be saved.
      </p>
      <p>
        <strong>Motif annotations</strong> highlight the occurrences of each
        motif in the trajectory viewer and contain four columns: Label, Motif
        (the highlighted segment), Matches (occurrence count), and Color
        (hexadecimal, auto-assigned when left empty). If a motif does not occur
        in the sequence, or a color is not a valid hexadecimal value, saving is
        rejected immediately, without waiting for the simulation to finish.
      </p>
      <p>
        If a PDB structure already exists (for example the product of an
        upstream step), the <strong>Derive</strong> sub-panel can read the
        sequence from another step of the same flow: select the step and click{" "}
        <strong>Derive</strong>; when the structure contains multiple chains, a
        specific chain can be chosen, followed by{" "}
        <strong>Save &amp; restart</strong>. The panel also states its
        limitation: the operation only restores the sequence, and the restart
        rebuilds a completely new extended chain rather than the original folded
        conformation.
      </p>
      <h5 className="mt-4 mb-2">
        Step-two parameters: CG crosslinking and Young&rsquo;s modulus
      </h5>
      <p>
        The panel is titled <strong>CG network &amp; deformation input</strong>,
        with the main fields listed below:
      </p>
      <p>
        Crosslink-density hint: below the Crosslinks field, the number of
        crosslinks per chain is displayed in real time (e.g. 1.375 crosslinks
        per chain), so users can judge whether the network density falls in the
        target range while typing, without waiting for the simulation to finish.
      </p>
      <p>
        The Young&rsquo;s modulus obtained in step two is written to the
        step&rsquo;s analysis output directory and output/, where the same file
        provides estimates under several network models for step three to read
        automatically, with no manual entry. If no modulus curve appears in
        Results, the analysis of that step has not finished; click{" "}
        <strong>Start</strong> in Control and wait for the status to become{" "}
        <strong>Done</strong>.
      </p>
      <p>
        Inputs are checked on save: Stretch must be a number greater than 0 and
        no greater than 1, separated by English commas without unit symbols;
        Temperature must be at least 10 K; and Chains, Steps / cycle, and Cycles
        must be integers no less than 1.
      </p>
      <h5 className="mt-4 mb-2">
        Step-three parameters: volume fractions and applied magnetic field
      </h5>
      <p>
        The panel is titled{" "}
        <strong>Polymer &amp; nanoparticle fractions, applied field</strong>.
      </p>
      <p>
        Volume fractions: the sum of Polymer fraction (polymer backbone) and
        Nanoparticle fraction (magnetic particles) must not exceed 1. The water
        fraction needs no entry and is computed automatically by the platform so
        that the four phases sum to exactly 1. If the two exceed 1, the panel
        highlights the error in red and locates it at the corresponding field.
      </p>
      <p>
        The applied magnetic field supports three modes: Uniform (constant
        field), Gradient (rising linearly from Base field along the sample
        height by Field rise, with the peak being their sum), and From file (CSV
        profile). The sample height and number of sampling points are always
        required.
      </p>
      <p>
        Importing a profile from a file: <strong>Upload</strong> places a local
        CSV into the step&rsquo;s input/ directory, and{" "}
        <strong>Download</strong> retrieves it. Note that Upload and Save are
        two separate steps: uploading only places the file in the directory, and
        clicking <strong>Save</strong> associates it with the current run. The
        first row of the CSV must be a header containing one position column
        (z/x meaning meters, z_mm/x_mm/position_mm meaning millimeters) and one
        magnetic-field column (b meaning tesla, h meaning A/m).
      </p>
      <p>
        Units must be explicit: bare column names are interpreted as meters, and
        names ending in _mm as millimeters. This convention exists to prevent a
        unit error from producing a near-zero magnetic field without being
        noticed. If the file is empty, lacks a position or field column, or its
        position range does not cover or far exceeds the sample height, saving
        is rejected with the actual column names found.
      </p>
      {/* Figure 3 (image removed): step-three parameter panel (volume fractions and field profile). */}
      <h4 className="mt-4 mb-3">Control</h4>
      <p>
        The Control section provides two groups of buttons for each step, for
        running and viewing:
      </p>
      <p>
        <strong>Start / Restart</strong> in step two can launch GROMACS from
        within the application: sbatch submission when SLURM is available,
        detached launch (setsid) otherwise, with no need to log into the server
        and submit jobs by hand. <strong>Pause</strong> genuinely pauses the
        simulation (SIGSTOP for step one, scontrol suspend for step two), and{" "}
        <strong>Continue</strong> resumes from the pause point without
        recomputation; if the simulation is not running, the interface says so
        explicitly instead of falsely reporting a successful pause.
      </p>
      <p>
        Step three offers only <strong>Compute</strong>: it is a local numerical
        computation for which queueing would take longer than the calculation
        itself, so it runs locally on the backend host and returns the result
        figure. After clicking, the button briefly shows a running state and
        then gives success or failure feedback. The bottom of the panel shows
        the step&rsquo;s working directory, with locally run steps labeled runs
        locally on the backend host; the <strong>Execution</strong> area below
        shows the running location (local / ssh), input and output directories,
        and the resolution of external programs such as gmx and matlab, so
        configuration errors can be found before running.
      </p>
      <blockquote className="blockquote border-start border-3 ps-3">
        <p>
          Why are parameter buttons separate from run buttons? Parameters
          handles modifying parameters, and Control handles running. This way
          all steps can be configured and saved first and then started in order,
          avoiding a long computation being triggered immediately by changing a
          single parameter.
        </p>
      </blockquote>
      <h4 className="mt-4 mb-3">Results</h4>
      <p>
        Results is grouped by result category and shows only the result tabs the
        step actually produced; steps that are not yet complete state directly
        what is missing instead of showing empty panels.
      </p>
      <p>
        <strong>Structure</strong> charts grow and shrink with the actual data
        and include radius of gyration, end-to-end distance, RMSD, secondary
        structure, per-chain radius of gyration, energy, simulation-box vectors,
        and crosslink count.
      </p>
      <p>
        <strong>Temperature</strong> does not apply to steps running at a fixed
        temperature, and step two states explicitly that it runs at a fixed
        temperature without replica exchange.
      </p>
      <p>
        <strong>Field &amp; deformation</strong> (step three) consists of one
        main result figure (Computed deformation under the applied field) and
        six field maps: local axial modulus, displacement field, axial strain,
        pore pressure, axial stress, and the applied magnetic field.
      </p>
      {/* Draft remark: results reference the Model page. */}
    </>
  );
}
