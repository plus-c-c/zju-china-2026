export function CrossCutting() {
  return (
    <>
      <h3 className="mt-5 mb-3">Data Safety</h3>
      <p>
        The software writes safety requirements directly into the workflow
        rather than relying on paper attachments: ordered loading (a fixed
        sequence with item-by-item confirmation, preventing wrong order or
        omissions); explicit completion guidance (every step states the next
        action in unambiguous text, leaving no guessing); and large-text status
        messages (for operating scenarios where both hands are occupied,
        readable at a glance).
      </p>
      <p>
        Safety information reaches the bedside together with the material: after
        a successful scan, the instructions shown belong to that specific
        formulation; when the QR code is not recognized, the page clearly
        displays &ldquo;Unrecognized&rdquo;.
      </p>
      <p>
        The interface copy is bilingual (English / Chinese) and can be switched
        inside the application with EN / CH.
      </p>
      <h3 className="mt-5 mb-3">Performance Optimization</h3>
      <ul>
        <li>
          Software I · separation of remote and local computation: long-running
          simulations go to the remote cluster, while second-scale computation
          such as the third step runs locally on the backend host, without SSH
          and without occupying the cluster queue.
        </li>
        <li>
          Software I · per-step caching: trajectories and analysis products are
          cached in cache/, so later viewing requires no re-download or
          re-conversion.
        </li>
        <li>
          Software I · step-level restart: every step can be started, stopped,
          and restarted individually, so a failure does not require rerunning
          the whole flow.
        </li>
        <li>
          Software II · offline scanning: QR codes are recognized directly on
          the device, so instructions can still be loaded offline; when no
          camera is available, manual entry works.
        </li>
      </ul>
      <h3 className="mt-5 mb-3">Resource and Accessibility</h3>
      <p>
        Both tools are built and run in a standard engineering way, and keys and
        signing configurations are not kept in the repository.
      </p>
      <pre>
        <code>{`# Software I · SELP molecular dynamics simulation platform
git clone <repository-url>
cd igem-2026-software
cd backend  && npm install        # backend dependencies
cd ../frontend && npm install     # frontend dependencies
cd ../backend && npm start        # start backend on :3001
cd ../frontend && npm run dev     # start frontend on :5174
# Software II · NEST Software clinician application
cd igem-2026-app
./gradlew assembleDebug`}</code>
      </pre>
      <p>
        <strong>Data availability.</strong> Job configurations, parameter
        templates, and example data are published together with the code;
        external inputs such as magnetic-field profiles use CSV files with
        explicit column-name and unit conventions (z/x for meters, z_mm for
        millimeters; b for T, h for A/m) and can be exchanged directly with
        experimental measurement data.
      </p>
      <p>
        <strong>Code accessibility.</strong> The technical documentation of
        Software I includes docs/full-workflow-guide.md,
        docs/simulation-principles.md, docs/sequence-annotation-workflow.md,
        docs/task-creation.md, docs/environment-setup.md, and others; Software
        II is a standard Gradle project that builds without extra environment
        setup.
      </p>
      {/* Original draft note: contains AI-generated content from Doubao Work */}
    </>
  );
}
