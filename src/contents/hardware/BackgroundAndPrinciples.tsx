export function BackgroundAndPrinciples() {
  return (
    <>
      <h2 className="mb-4">Background</h2>
      <p>
        As a functional material with a complex internal structure, hydrogel
        combines high viscosity with strong temperature sensitivity, which poses
        significant challenges for precise transport and targeted delivery. In
        practice, several raw components must be mixed in specified ratios, and
        both preparation and storage require careful temperature control, since
        a deviation from the target temperature causes premature gelation or
        inactivation of the active components. The administration stage
        additionally demands a steady output rate, visualization of the target
        region, in situ photocrosslinking, and an applied magnetic field that
        tunes the anisotropic structure inside the material. If these steps were
        performed entirely by hand, output stability and reproducibility could
        not be guaranteed.
      </p>
      <p>
        To address these problems, the system adopts a split architecture that
        separates hydrogel preparation from administration into two independent
        units. The formulation unit handles raw-material proportioning, mixing,
        and thermostatic storage; the administration unit delivers the gel
        precisely and integrates imaging, photocrosslinking, and magnetic-field
        control. The two units are interconnected through fluidic tubing and
        circuit design, and cooperate to complete the entire delivery workflow.
      </p>
      {/* Draft placeholder: overview figure (the magnetic coil may or may not be included; the first figure is still to be revised) */}
      <h2 className="mt-5 mb-3">Core design principles</h2>
      <h3 className="mt-5 mb-3">Modular design</h3>
      <p>
        The system is built on a modular architecture in which the formulation
        and administration units are independent of each other, and the
        subsystems within each unit are likewise independent. The propulsion
        mechanism, fluidic paths, temperature sensing, and human–machine
        interface panel are all designed as individually replaceable modules; on
        the administration side, the injection assembly, optical unit, and
        magnetic band can each be removed and installed separately. This design
        allows the system to be flexibly adapted to experimental needs and
        facilitates subsequent iterative upgrades of individual modules.
      </p>
      <h3 className="mt-5 mb-3">Designed for laboratory and application use</h3>
      <p>
        The hardware design takes full account of real usage scenarios in both
        the wet lab and future clinical practice. Addressing practical problems
        that arise easily — frequent consumable replacement, difficulty in
        observing tubing anomalies, and backflow caused by misoperation — the
        system incorporates corresponding structural optimizations: all fluidic
        consumables support quick removal and replacement, reducing maintenance
        costs during experiments; the enclosure is made of transparent material
        so that the fluid state inside the tubing can be observed directly,
        making it easy to identify bubbles or blockages in time; and a three-way
        valve physically isolates different fluid circuits, suppressing the risk
        of reagent backflow at the structural level. In addition, the main
        controls are concentrated on a single operation panel, so the system is
        simple to operate and does not require trained personnel.
      </p>
      <h3 className="mt-5 mb-3">Adapted to the material&rsquo;s properties</h3>
      <p>
        In response to the temperature sensitivity of the hydrogel, the
        reservoir integrates bidirectional heating and cooling to keep the
        physicochemical state of the gel stable. The administration plunger uses
        a damping structure formed by wrapped tape, whose controlled mechanical
        resistance buffers the instantaneous impulse of injection and reduces
        mechanical disturbance to the target tissue.
      </p>
      <h3 className="mt-5 mb-3">Open source and reproducible</h3>
      <p>
        All mechanical drawings and PCB engineering files related to the system
        are open-sourced for reuse and secondary development by future teams.
      </p>
    </>
  );
}
