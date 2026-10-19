export function WorkflowAndOutlook() {
  return (
    <>
      <h2 className="mt-5 mb-3">4 Complete Workflow</h2>
      <p>
        The system workflow consists of five stages, as illustrated in the
        overview figure.
      </p>
      <ol>
        <li className="mb-3">
          <strong>Preparation and mixing:</strong> Three motor-driven lead-screw
          linear stages actuate the ingredient syringes at user-defined speeds
          and travel distances. The three ingredients enter the serpentine
          microfluidic chip for passive mixing. The mixed hydrogel precursor
          then flows through tubing routed through the partition into the
          reservoir on the upper tier.
        </li>
        <li className="mb-3">
          <strong>Temporary storage and status monitoring:</strong> Liquid-level
          sensors monitor the reservoir level in real time, and indicator lights
          show the corresponding status. The heating and cooling units regulate
          the reservoir temperature according to the settings. Temperature
          information is displayed on the circuit board’s OLED screen and on the
          hospital monitor.
        </li>
        <li className="mb-3">
          <strong>Transfer initiation:</strong> The operator issues a command to
          begin administration through the main control panel or web interface,
          activating the transfer pump. The three-way valve is switched to the
          administration pathway, allowing the hydrogel precursor to move from
          the reservoir into the syringe at the administration end. The
          remaining pathway is closed and isolated.
        </li>
        <li className="mb-3">
          <strong>Targeted administration and photocuring:</strong> The operator
          uses the administration syringe to deliver the hydrogel precursor
          through the needle to the target site. Needles with different internal
          diameters provide different flow resistances, affecting delivery
          behavior and injection feel. Physicians can select a suitable needle
          according to their needs. During administration, the camera provides a
          view of the operating area. Once the hydrogel reaches the target
          location, the blue light can be switched on for photocuring. The
          magnetic leg band can also be fitted to apply an external magnetic
          field as required by the experiment.
        </li>
        <li className="mb-3">
          <strong>Reset and maintenance:</strong> After the procedure, the
          transfer pump and light sources are switched off, and the three-way
          valve is returned to its standby position. Consumables that have
          contacted the formulation are cleaned or replaced according to
          experimental requirements.
        </li>
      </ol>
      <figure className="hardware-media">
        <img
          src="https://static.igem.wiki/teams/6102/wiki/images/hardware/hardware-overview-diagram.avif"
          alt="Hardware overview."
          className="hardware-media-image"
          loading="lazy"
          decoding="async"
          width={4000}
          height={2834}
        />
        <figcaption className="figure-caption mt-2">
          Figure 4.1 | Hardware overview.
        </figcaption>
      </figure>
      <h2 className="mt-5 mb-3">5 Future Outlook</h2>
      <p>
        In the future, we aim to develop this device into a{" "}
        <strong>modular experimental platform</strong> that can accommodate
        different hydrogel systems. By replacing mixing chips and adjusting
        ingredient channels, we will explore its use with different material
        formulations, mixing conditions, and administration requirements,
        providing hardware support for hydrogel formulation screening and
        research into local administration.
      </p>
      <p>
        We also plan to coordinate ingredient dispensing, temperature control,
        transfer, and photocrosslinking more closely. Combined with the
        recording and retrieval of experimental parameters, these improvements
        could reduce repetitive operations and increase{" "}
        <strong>workflow automation and reproducibility.</strong>
      </p>
      <p>
        We will continue to improve the open-source designs and assembly
        documentation so that future teams can reproduce, modify, and expand the
        system to suit their own needs.
      </p>
    </>
  );
}
