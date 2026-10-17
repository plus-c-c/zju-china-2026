export function WorkflowAndOutlook() {
  return (
    <>
      <h2 className="mt-5 mb-3">Complete workflow</h2>
      <p>
        The workflow of the entire system is divided into five stages. The first
        stage is formulation and mixing: three lead-screw stages propel the
        reagent syringes according to a preset ratio, the three reagents enter
        the serpentine microfluidic chip for passive mixing, and the mixed gel
        flows into the upper reservoir. The second stage is temporary storage
        and monitoring: the level sensor reads the remaining volume in real
        time, indicator lights report the state, the heating and cooling units
        maintain the temperature, and the OLED screen displays the reservoir
        temperature. The third stage is initiating administration: a button on
        the main panel is triggered, the transfer pump starts, the three-way
        valve switches to the administration circuit, and the gel is conveyed to
        the administration syringe. The fourth stage is targeted delivery: the
        operator dispenses the gel with the damped plunger while the camera
        observation is switched on, blue light completes photocrosslinking, and
        the magnetic band applies an external field. The fifth stage is reset
        and maintenance: the pump and light sources are switched off, the
        three-way valve returns to standby, and the consumables contacting the
        solution are cleaned or replaced as required.
      </p>
      {/* Draft placeholder: overall workflow diagram (may also be placed in the first section) */}
      {/* Data that could be supplemented: typical duration of each stage; single-load and single-dose volume ranges */}
      <h2 className="mt-5 mb-3">Future outlook</h2>
      {/* Draft placeholder: future outlook section is empty in the source */}
      <h2 className="mt-5 mb-3">Bill of materials</h2>
      {/* Draft placeholder: bill-of-materials table not yet filled in (columns: component, quantity, cost in USD) */}
      <h2 className="mt-5 mb-3">Engineering</h2>
      {/* Draft note: this is an unfinished single-cycle draft; it may belong on the Engineering page instead of here */}
      <h3 className="mt-5 mb-3">One design cycle</h3>
      <p>
        <strong>Design:</strong> the initial plan was an integrated formulation
        box and administration part, with the camera, magnetic field, and
        photocrosslinking components all placed on a single device.
      </p>
      {/* Draft placeholder: Build — empty in the source */}
      {/* Draft placeholder: Test — empty in the source */}
      {/* Draft placeholder: Learn — empty in the source */}
      {/* Original draft note: contains AI-generated content from Doubao Work */}
    </>
  );
}
