export function SoftwareIIUsage() {
  return (
    <>
      <h3 className="mt-5 mb-3">
        Software II: NEST Software clinician application
      </h3>
      <p>
        NEST Software serves physicians, nurses, and clinical operators, turning
        material selection and bedside preparation into a step-by-step confirmed
        process. The home page provides two modules: Ordering and operating
        instructions (the Injection Module, a four-step clinical wizard).
      </p>
      <h4 className="mt-4 mb-3">Tech stack</h4>
      {/* Draft placeholder: tech stack content not written yet */}
      <h4 className="mt-4 mb-3">Ordering Module</h4>
      <p>
        Ordering is the clinician&rsquo;s entry point into the material system:
        choose an adhesive peptide (A / B / C) and a liposomal linker peptide (X
        / Y / Z), fill in the order quantity (mg / vial), and an order summary
        is aggregated in real time at the bottom of the page. Both selections
        come with guidance — the adhesive peptide affects binding affinity and
        specificity for the target site, and the liposomal linker peptide
        affects delivery function and payload capacity. After submission the app
        moves automatically to the operating instructions, and the order
        information is handled centrally by the project team.
      </p>
      {/* Figure 4 (image removed): ordering interface and batch attributes returned by the server. */}
      <h4 className="mt-4 mb-3">Injection Module</h4>
      <p>
        After entering the operating instructions, a four-step wizard is shown,
        with &ldquo;step n / 4&rdquo; and a progress bar at the top and
        previous/next buttons at the bottom:
      </p>
      <p>
        <strong>Scan the QR code.</strong> Every formulation carries a printed
        QR code; scanning it loads the instructions specific to that
        formulation, including component composition, operating conditions,
        safety notes, and storage QC data; if it is not recognized, the page
        shows &ldquo;Unrecognized&rdquo;, and the content can also be entered
        manually in the QR content field. The software never presents generic
        content as product-specific content.
      </p>
      <p>
        <strong>Load the reagents.</strong> Assemble the formulation in the
        corresponding order, confirming item by item.
      </p>
      <p>
        <strong>Premix.</strong> Once the reagents are loaded, the workflow
        enters the premixing stage. This page shows only one instruction: wait
        for the premixer&rsquo;s green light. The software does not communicate
        with the premixer or read device state; completion is judged by the
        operator from the instruction, so that instruction must be clear and
        unambiguous.
      </p>
      {/* Figure 5 (image removed): the four steps of the clinician wizard. */}
    </>
  );
}
