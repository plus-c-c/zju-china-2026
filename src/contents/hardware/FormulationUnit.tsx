export function FormulationUnit() {
  return (
    <>
      <h2 className="mt-5 mb-3">Formulation unit</h2>
      <p>
        The formulation unit is a closed double-decker housing. The lower deck
        proportions and mixes multiple raw components, while the upper deck
        handles storage of the prepared solution and the human–machine
        interface. The hydrogel is extruded from three reagent syringes,
        passively mixed in a serpentine microfluidic chip, and then flows into
        the upper reservoir for thermostatic storage; upon receiving a delivery
        command, a transfer pump conveys it to the administration unit through
        the fluid-switching unit.
      </p>
      <h3 className="mt-5 mb-3">Overall architecture</h3>
      <p>
        The formulation unit consists of four parts. The lower deck houses three
        independent stepper-motor and lead-screw stage assemblies that
        quantitatively propel the raw materials; the serpentine microfluidic
        chip forms the mixing section; the reservoir, which integrates level
        detection and bidirectional temperature control, forms the storage
        section; and the transfer pump together with a three-way valve forms the
        hydrogel conveying section, enabling switching between the refill and
        administration circuits.
      </p>
      {/* Draft placeholder: optional figure caption */}
      <h3 className="mt-5 mb-3">Three-channel reagent propulsion</h3>
      <p>
        On the lower deck, three independent stepper-motor linear-stage modules
        {/* Motor model to confirm: NEMA 17HS */} are arranged side by side,
        each driving one reagent syringe,
        {/* Which reagents? To be
            confirmed */}{" "}
        so that the propulsion rate of each syringe can be adjusted individually
        to proportion the multi-component mixture. We also designed a
        screen-and-button human–machine interface so that physicians and users
        can easily adjust the mixing ratio.
      </p>
      {/* To add: a video or physical photograph of the prototype */}
      {/* Consider adding multi-channel volume error analysis here */}
      <h3 className="mt-5 mb-3">Mixing and storage</h3>
      <p>
        The outputs of the three syringes converge through tubing into the
        serpentine microfluidic chip. The continuously winding microchannels
        achieve passive mixing of the components through laminar flow
        disturbance, without stirring parts, while reducing shear damage to
        bioactive components.
      </p>
      {/* Draft placeholder: serpentine microfluidic chip CAD figure; a video demonstrating sufficient mixing (e.g. using differently colored liquids); simulation figures */}
      <p>
        After being mixed in the microfluidic chip, the prepared gel flows
        through a bulkhead tube into the upper reservoir. The reservoir
        integrates two subsystems: level detection, which continuously monitors
        the remaining volume and indicates empty, low, normal, and full states
        through a multicolor LED; and bidirectional temperature control, which
        provides heating and cooling to maintain the target temperature as
        required, with the value displayed in real time on an OLED screen.
      </p>
      <p>
        Several expansion buttons are reserved on the main panel as hardware
        interfaces for future iterations, and the trigger button for the
        administration workflow is also placed there. Once triggered, the
        transfer pump starts and draws gel from the reservoir; the three-way
        valve in the tubing switches between the refill circuit and the needle
        administration circuit, keeping the two circuits isolated to prevent
        backflow.
      </p>
      <p>
        We have also built a web page that visualizes the reservoir, which can
        be connected to the arthroscope screen so that physicians can operate
        the device during surgery.
      </p>
      {/* Draft placeholder: reservoir assembly diagram; level indicator light and screen/button panel; videos showing precise temperature control and level detection */}
      {/* Optionally to be supplemented: reservoir effective volume, temperature-control working range, level sensor model, pump rated parameters, three-way valve pressure and chemical resistance parameters */}
      <h3 className="mt-5 mb-3">Electronic control system</h3>
      <p>
        An STM32 serves as the electronic control hub of the formulation unit,
        handling transfer-pump driving, heating and cooling driving,
        level-signal acquisition, OLED display, buttons, and status lamps.
        High-power loads such as the pump, heater, and cooler are all switched
        through relays to prevent large currents from damaging the main control
        chip. All parameter setting and status reading are centralized on the
        main panel.
      </p>
      {/* Draft remark: remove the annotation? */}
    </>
  );
}
