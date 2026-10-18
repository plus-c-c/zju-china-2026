import type { DbtlModule } from "../dbtl";
import type { Group } from "../group";

/** Dry Lab group: hardware development of the delivery device and the
 *  preparation unit. */
const hardwareModule: DbtlModule = {
  title: "Hardware",
  intro: (
    <p>
      Our hardware development progressed from integrating multiple functions
      into a single device to refining the operating workflow. Consultations and
      structural checks showed that module layout, fluid connections, and
      practical operation needed to be considered together.
    </p>
  ),
  cycles: [
    {
      title: "Cycle 1 — From an integrated delivery device to separate modules",
      content: {
        Design: (
          <p>
            We initially planned to integrate a camera, a blue-light source, an
            injection module, and a magnetic coil into{" "}
            <strong>a single delivery device</strong>. The device would support
            visualisation, hydrogel injection, photocrosslinking, and
            magnetic-field control. Bringing these functions together was
            intended to reduce the number of separate devices and make the
            delivery workflow more compact.
          </p>
        ),
        Build: (
          <p>
            Built an initial structural prototype to explore how the functional
            modules could be arranged, secured, and connected within one device.
            This stage focused on structural integration and provided a basis
            for evaluating how the device would be operated.
          </p>
        ),
        Test: (
          <p>
            Consultations and discussions of clinicians&rsquo; practical needs
            revealed that the integrated arrangement was inconvenient to
            operate. Visualisation, injection, illumination, and magnetic-field
            control required different adjustments. Fixing these functions
            within one device{" "}
            <strong>limited their independent adjustment</strong> and made it
            harder to coordinate the operating steps.
          </p>
        ),
        Learn: (
          <p>
            Reducing the number of devices did not necessarily simplify
            operation; the structure needed to follow the workflow. We therefore{" "}
            <strong>
              separated the injection module, the imaging and illumination
              module, and the magnetic-field component
            </strong>
            , using an external magnetic band for magnetic-field control. This
            revised arrangement became the starting point for the next cycle.
          </p>
        ),
      },
    },
    {
      title: "Cycle 2 — From sidewall refilling to three-way valve switching",
      content: {
        Design: (
          <p>
            Following module separation, we refined the independent injection
            module so that the preparation unit could supply hydrogel precursor
            to the syringe before manual injection. The initial approach was to{" "}
            <strong>
              connect the supply tubing through the sidewall of the syringe
              barrel
            </strong>
            , keeping the refill inlet separate from the delivery outlet at the
            tip.
          </p>
        ),
        Build: (
          <p>
            Explored the sidewall connection between the supply tubing and the
            syringe barrel, and examined the relative positions of the refill
            inlet, plunger, and delivery outlet. The design focus shifted from
            the overall module arrangement to the fluid path within the
            injection module.
          </p>
        ),
        Test: (
          <p>
            Further checks showed that the sidewall refill arrangement{" "}
            <strong>could not accommodate changes in plunger position</strong>.
            Once the plunger had advanced halfway through its stroke, fluid
            entering through the side inlet might no longer reach the fluid
            chamber ahead of the plunger. A layout suitable only for the initial
            position could therefore not support alternating refilling and
            injection throughout operation.
          </p>
        ),
        Learn: (
          <>
            <p>
              Fluid-path design needed to account for the full range of plunger
              movement. We moved the refill connection to the syringe tip and{" "}
              <strong>
                introduced a three-way valve connecting the syringe, supply
                line, and injection needle
              </strong>
              . During refilling, the valve connects the supply line to the
              syringe; during injection, it connects the syringe to the needle,
              isolating the remaining line in each case.
            </p>
            <p>
              This change addressed the mismatch between the sidewall inlet and
              the moving plunger, while{" "}
              <strong>
                defining separate fluid paths for refilling and injection
              </strong>
              . Air management during valve switching and stability across
              repeated operating cycles still require further evaluation.
            </p>
          </>
        ),
      },
    },
    {
      title:
        "Cycle 3 — Control-board integration and sensor feedback refinement",
      content: {
        Design: (
          <p>
            With the mechanical structure and fluid connections refined, we
            needed a control system to coordinate the preparation unit. We
            designed{" "}
            <strong>
              a custom printed circuit board (PCB) around an STM32
              microcontroller
            </strong>
            , bringing together pump control, heating and cooling, temperature
            and liquid-level sensing, display functions, and button inputs. The
            aim was to provide real-time status feedback and a unified means of
            operating the device.
          </p>
        ),
        Build: (
          <p>
            Connected the control board to the functional modules, using relays
            to switch the pump and the heating and cooling units. Added the
            sensors, OLED display, and status indicators. An ESP32 was connected
            through the reserved UART interface, allowing the device to send
            operating data to a web interface and receive control commands.
          </p>
        ),
        Test: (
          <p>
            During heating and cooling, we observed{" "}
            <strong>
              delayed temperature feedback and uneven temperatures across the
              reservoir
            </strong>
            . The available readings therefore did not fully represent the
            actual temperature of the material. Successful signal acquisition
            and display alone were insufficient: the timeliness and
            representativeness of the feedback also needed to be evaluated under
            the actual sensor installation and operating conditions.
          </p>
        ),
        Learn: (
          <>
            <p>
              Control-system validation needs to assess both whether functions
              execute correctly and whether feedback accurately represents the
              controlled system. We will check sensor placement and operating
              conditions against the relevant datasheets, and compare reference
              temperature measurements with readings taken at different
              positions. These checks will help{" "}
              <strong>
                distinguish sensor response delays from uneven heat transfer
              </strong>{" "}
              and guide changes to sensor placement and the control strategy.
            </p>
            <p>
              For liquid-level detection, we{" "}
              <strong>
                added capacitors in parallel with the aim of improving sensor
                sensitivity
              </strong>
              . Planned comparisons between the actual liquid level and the
              state reported by the control board, before and after the circuit
              adjustment, will assess detection consistency and reliability.
            </p>
          </>
        ),
      },
    },
  ],
};

export const hardwareGroup: Group = {
  label: "Hardware",
  parts: [{ label: "DBTL Cycles", module: hardwareModule }],
};
