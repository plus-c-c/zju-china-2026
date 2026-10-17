export function AdministrationUnit() {
  return (
    <>
      <h2 className="mt-5 mb-3">Administration unit</h2>
      <p>
        The administration components are configured as independent peripherals
        rather than being integrated into the formulation housing, and are all
        connected back to the host through tubing. The set of peripherals
        comprises three parts: a damped injection syringe, an arthroscopic
        observation and blue-light photocrosslinking module, and a leg-mounted
        magnetic band.
      </p>
      <h3 className="mt-5 mb-3">Damped injection assembly</h3>
      <p>
        The gel output by the transfer pump is switched to the administration
        circuit by the three-way valve and enters the administration syringe.
        The plunger of this syringe is wrapped with tape to form a damping
        structure, and the damping magnitude is adjusted by changing the number
        and thickness of the wraps. The damping mechanism absorbs the
        instantaneous impulse of injection, smooths the gel output, and reduces
        mechanical stimulation of the target tissue; the gel is finally
        dispensed through the front-end needle.
      </p>
      {/* Draft placeholder: figure to be inserted */}
      {/* To be supplemented: survey the literature for comparable approaches and add a discussion of advantages and disadvantages */}
      <h3 className="mt-5 mb-3">
        Arthroscopic observation and blue-light photocrosslinking module
      </h3>
      {/* Draft remark (not part of the heading): the module has not yet been packaged — decide whether to keep this section */}
      <p>
        This module is designed for local intra-articular administration
        scenarios. The camera observes the delivery target inside the joint in
        real time, and a blue LED in the light-source switching device outputs a
        specific wavelength to trigger in situ photocrosslinking and
        solidification of the hydrogel; white light allows the physician to see
        clearly inside the joint.
      </p>
      {/* Draft placeholder: figure to be inserted */}
      {/* Data to be supplemented: camera resolution, blue LED center wavelength, light source intensity */}
      <h3 className="mt-5 mb-3">Magnetic band</h3>
      {/* Draft remark (not part of the heading): not built yet */}
      <p>
        The magnetic band is a wearable peripheral worn on the leg. It provides
        an external static magnetic field that induces an anisotropic magnetic
        structure inside the gel.
      </p>
      {/* Draft placeholder: conceptual schematic of the magnetic band */}
      {/* To be supplemented: magnetic field and related parameters; may be hyperlinked to the Model page */}
    </>
  );
}
