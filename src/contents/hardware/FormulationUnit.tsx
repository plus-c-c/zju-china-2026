import { TableCaption } from "../../components/FigureCaption";
import { FigureCaption } from "../../components/FigureCaption";
import { HardwareVideo } from "./HardwareVideo";

export function FormulationUnit() {
  return (
    <>
      <h2 className="mt-5 mb-3">2 Preparation Unit</h2>
      <p>
        <strong>The preparation unit has an enclosed, two-tier housing</strong>.
        The lower tier handles the proportioned dispensing and mixing of
        multiple ingredients, while the upper tier provides formulation storage
        and the user interface.
      </p>
      <p>
        The hydrogel ingredients are dispensed from three syringes, pass through
        a serpentine-channel microfluidic chip for passive mixing, and then
        enter the reservoir on the upper tier for temperature-controlled
        storage. Upon receiving an administration command, a transfer pump
        delivers the formulation to the administration module through flexible
        tubing and a three-way valve assembly.
      </p>
      <h3 className="mt-5 mb-3">2.1 Overall Architecture</h3>
      <p>
        <strong>
          The preparation unit consists of four subsystems: ingredient
          dispensing, mixing, storage, and transfer.
        </strong>
      </p>
      <p>
        The dispensing subsystem is located on the lower tier and consists of
        three independent stepper-motor-driven lead-screw linear stages. These
        dispense controlled volumes of different ingredients at preset ratios.
      </p>
      <p>
        The mixing subsystem uses a serpentine-channel microfluidic chip to mix
        the ingredients as they flow through it.
      </p>
      <p>
        The storage subsystem consists of a reservoir with integrated
        liquid-level monitoring and both heating and cooling.
      </p>
      <p>
        The transfer subsystem comprises a transfer pump and a three-way valve,
        which switch between the refill and administration pathways to deliver
        the hydrogel.
      </p>
      <figure className="hardware-media hardware-media--square">
        <img
          src="https://static.igem.wiki/teams/6102/wiki/images/hardware/figure2-1.avif"
          alt="Exploded view of the preparation unit’s internal structure."
          className="hardware-media-image"
          loading="lazy"
          decoding="async"
          width={1080}
          height={1080}
        />
        <FigureCaption className="figure-caption mt-2">
          Figure 2.1 | Exploded view of the preparation unit’s internal
          structure.
        </FigureCaption>
      </figure>
      <h3 className="mt-5 mb-3">2.2 Three-Channel Ingredient Dispensing</h3>
      <p>
        Three independent NEMA 17HS-series stepper-motor-driven lead-screw
        linear stages are arranged side by side on the lower tier. They{" "}
        <strong>drive three ingredient syringes</strong> containing,
        respectively, Ru and SPS, the SELP scaffold material, and the functional
        module powder, with all three formulations dissolved in
        phosphate-buffered saline (PBS).
      </p>
      <p>
        <strong>
          The syringe actuation rates can be adjusted independently to control
          the volumetric mixing ratios of the ingredients.
        </strong>{" "}
        The motor controller also includes{" "}
        <strong>a display and buttons</strong>, allowing physicians and other
        users to adjust the mixing ratios easily.
      </p>
      <figure className="hardware-media">
        <img
          src="https://static.igem.wiki/teams/6102/wiki/images/hardware/figure2-2.avif"
          alt="Photograph of the three independent stepper-motor-driven lead-screw linear stages."
          className="hardware-media-image"
          loading="lazy"
          decoding="async"
          width={1792}
          height={1265}
        />
        <FigureCaption className="figure-caption mt-2">
          Figure 2.2 | Photograph of the three independent stepper-motor-driven
          lead-screw linear stages.
        </FigureCaption>
      </figure>
      <figure className="hardware-media hardware-media--video">
        <HardwareVideo
          src="https://video.igem.org/videos/embed/gK12mmf1zY6n3EkStbdgXD"
          title="Video 2.2: Demonstration of the stepper-motor-driven lead-screw linear stage"
          poster="https://video.igem.org/lazy-static/thumbnails/9c6115c5-666b-467e-82fd-c4399ed6bb76.png"
          aspectRatio={1.7777777777777777}
        />
        <FigureCaption className="figure-caption mt-2">
          Video 2.2 | Demonstration of the stepper-motor-driven lead-screw
          linear stage.
        </FigureCaption>
      </figure>
      <h3 className="mt-5 mb-3">2.3 Mixing and Storage</h3>
      <p>
        The outputs from the three syringes are routed through flexible tubing
        into a <strong>serpentine-channel microfluidic chip</strong>. Repeated
        bends in the microchannels perturb the laminar flow to achieve{" "}
        <strong>passive mixing</strong> of the ingredients. This eliminates the
        need for mechanical stirring components while reducing shear-induced
        damage to bioactive components.
      </p>
      <figure className="hardware-media">
        <img
          src="https://static.igem.wiki/teams/6102/wiki/images/hardware/figure2-3-1.avif"
          alt="Microfluidic chip design."
          className="hardware-media-image"
          loading="lazy"
          decoding="async"
          width={3971}
          height={2476}
        />
        <FigureCaption className="figure-caption mt-2">
          Figure 2.3.1 | Microfluidic chip design.
        </FigureCaption>
      </figure>
      <div className="hardware-media-grid hardware-media-grid--streams">
        <div className="hardware-media-cell">
          <figure className="hardware-media-panel">
            <img
              src="https://static.igem.wiki/teams/6102/wiki/images/hardware/gif2-3-2a-60frames.webp"
              alt="Simulation of component A flowing through the microfluidic chip."
              className="hardware-media-image"
              loading="lazy"
              decoding="async"
              width={1200}
              height={650}
            />
            <FigureCaption className="figure-caption mt-2">
              Animation 2.3.2a | Simulation of component A flowing through the
              microfluidic chip.
            </FigureCaption>
          </figure>
        </div>
        <div className="hardware-media-cell">
          <figure className="hardware-media-panel">
            <img
              src="https://static.igem.wiki/teams/6102/wiki/images/hardware/gif2-3-2b-60frames.webp"
              alt="Simulation of component B flowing through the microfluidic chip."
              className="hardware-media-image"
              loading="lazy"
              decoding="async"
              width={1200}
              height={650}
            />
            <FigureCaption className="figure-caption mt-2">
              Animation 2.3.2b | Simulation of component B flowing through the
              microfluidic chip.
            </FigureCaption>
          </figure>
        </div>
        <div className="hardware-media-cell">
          <figure className="hardware-media-panel">
            <img
              src="https://static.igem.wiki/teams/6102/wiki/images/hardware/gif2-3-2c-60frames.webp"
              alt="Simulation of component C flowing through the microfluidic chip."
              className="hardware-media-image"
              loading="lazy"
              decoding="async"
              width={1200}
              height={650}
            />
            <FigureCaption className="figure-caption mt-2">
              Animation 2.3.2c | Simulation of component C flowing through the
              microfluidic chip.
            </FigureCaption>
          </figure>
        </div>
      </div>
      <figure className="hardware-media">
        <img
          src="https://static.igem.wiki/teams/6102/wiki/images/hardware/gif2-3-3-60frames.webp"
          alt="Demonstration of mixing in the microfluidic chip."
          className="hardware-media-image"
          loading="lazy"
          decoding="async"
          width={1200}
          height={650}
        />
        <FigureCaption className="figure-caption mt-2">
          Animation 2.3.3 | Demonstration of mixing in the microfluidic chip.
        </FigureCaption>
      </figure>
      <p>
        After mixing in the microfluidic chip, the hydrogel precursor flows
        through tubing routed through the partition into the reservoir on the
        upper tier.{" "}
        <strong>
          The reservoir integrates two subsystems: liquid-level monitoring and
          temperature control with both heating and cooling.
        </strong>
      </p>
      <p>
        The liquid-level monitoring subsystem tracks the liquid level in real
        time and uses multicolor LEDs to indicate states such as empty, low,
        normal, and full. The temperature control subsystem provides heating and
        cooling to adjust the reservoir temperature according to experimental
        requirements. The temperature is displayed in real time on an OLED
        screen.
      </p>
      <p>
        The main control panel has three physical buttons whose functions change
        according to the current screen. They can be used for menu navigation,
        parameter adjustment, confirmation, or workflow control. On the
        administration screen, the corresponding button initiates the
        administration sequence. Once activated, the transfer pump draws
        hydrogel from the reservoir, while the three-way valve selects the flow
        pathway so that the hydrogel enters the administration module along the
        intended route. The specific flow connections for each valve state are
        described in the administration section.
      </p>
      <p>
        In addition,{" "}
        <strong>
          we developed a bilingual Chinese–English web interface for visualizing
          the reservoir.
        </strong>{" "}
        The interface can be displayed on a hospital endoscopy monitor, allowing
        physicians to view device status and operate the system during surgery.
      </p>
      <figure className="hardware-media">
        <img
          src="https://static.igem.wiki/teams/6102/wiki/images/hardware/figure2-3-4.avif"
          alt="The reservoir module."
          className="hardware-media-image"
          loading="lazy"
          decoding="async"
          width={4000}
          height={2364}
        />
        <FigureCaption className="figure-caption mt-2">
          Figure 2.3.4 | The reservoir module.
        </FigureCaption>
      </figure>
      <figure className="hardware-media hardware-media--video">
        <HardwareVideo
          src="https://video.igem.org/videos/embed/n7UwHzzYyWV3B9Vvksuaaf"
          title="Video 2.3.1: Demonstration of reservoir operation"
          poster="https://video.igem.org/lazy-static/thumbnails/77339ebd-3b63-4011-9492-7c4614535975.png"
          aspectRatio={1.7777777777777777}
        />
        <FigureCaption className="figure-caption mt-2">
          Video 2.3.1 | Demonstration of reservoir operation.
        </FigureCaption>
      </figure>
      <div className="hardware-media-grid">
        <figure className="hardware-media-panel">
          <img
            src="https://static.igem.wiki/teams/6102/wiki/images/hardware/figure2-3-5a.avif"
            alt="Web visualization of the reservoir module when connected to the ESP32."
            className="hardware-media-image"
            loading="lazy"
            decoding="async"
            width={3072}
            height={1770}
          />
          <FigureCaption className="figure-caption mt-2">
            Figure 2.3.5a | Web visualization of the reservoir module when
            connected to the ESP32.
          </FigureCaption>
        </figure>
        <figure className="hardware-media-panel">
          <img
            src="https://static.igem.wiki/teams/6102/wiki/images/hardware/figure2-3-5b.avif"
            alt="Web-based 3D simulation of the reservoir module when the ESP32 is disconnected."
            className="hardware-media-image"
            loading="lazy"
            decoding="async"
            width={3116}
            height={1800}
          />
          <FigureCaption className="figure-caption mt-2">
            Figure 2.3.5b | Web-based 3D simulation of the reservoir module when
            the ESP32 is disconnected.
          </FigureCaption>
        </figure>
      </div>
      <figure className="hardware-media hardware-media--video">
        <HardwareVideo
          src="https://video.igem.org/videos/embed/kG7JXMvgBiLzCmZANMnqUD"
          title="Video 2.3.2: Demonstration of the reservoir web interface"
          poster="https://video.igem.org/lazy-static/thumbnails/471633f2-c33d-46c9-931d-0718cef916e5.png"
          aspectRatio={1.7777777777777777}
        />
        <FigureCaption className="figure-caption mt-2">
          Video 2.3.2 | Demonstration of the reservoir web interface.
        </FigureCaption>
      </figure>
      <h3 className="mt-5 mb-3">2.4 Electronic Control System</h3>
      <p>
        <strong>
          An STM32 microcontroller serves as the central electronic controller
          of the preparation unit
        </strong>
        . It controls the transfer pump, heating and cooling, liquid-level
        signal acquisition, OLED display, buttons, and status indicators.
        High-power loads, including the pump, heater, and cooling module, are
        switched through relays to protect the main controller from excessive
        current.
      </p>
      <p>
        Users can configure parameters, view device status, and control
        operation through either the main control panel or the web interface.{" "}
        <strong>
          The STM32 communicates with an ESP32 through a UART interface provided
          on the circuit board.
        </strong>{" "}
        The ESP32 handles data exchange with the web interface, enabling online
        visualization of reservoir status and transmission of operating
        commands.
      </p>
      <p>
        The web interface can be used on devices with network access and a web
        browser. It can also be displayed on a hospital endoscopy monitor,
        allowing physicians to monitor device status and operate the system
        during surgery.
      </p>
      <div className="hardware-media-grid hardware-media-grid--electronics">
        <figure className="hardware-media-panel">
          <img
            src="https://static.igem.wiki/teams/6102/wiki/images/hardware/figure2-4a.avif"
            alt="Electronic control system of the preparation unit."
            className="hardware-media-image"
            loading="lazy"
            decoding="async"
            width={1699}
            height={900}
          />
          <FigureCaption className="figure-caption mt-2">
            Figure 2.4a | Electronic control system of the preparation unit.
          </FigureCaption>
        </figure>
        <figure className="hardware-media-panel">
          <img
            src="https://static.igem.wiki/teams/6102/wiki/images/hardware/figure2-4b.avif"
            alt="Circuit board of the preparation unit."
            className="hardware-media-image"
            loading="lazy"
            decoding="async"
            width={2160}
            height={2089}
          />
          <FigureCaption className="figure-caption mt-2">
            Figure 2.4b | Circuit board of the preparation unit.
          </FigureCaption>
        </figure>
      </div>
      <h3 className="mt-5 mb-3">2.5 Bill of Materials</h3>
      <p>
        The following table lists the components and corresponding costs for the
        preparation unit, including the three-channel dispensing subsystem,
        mixing and storage subsystem, and electronic control system.
      </p>
      <TableCaption>
        <strong>Table 1 | Components and Costs of the Preparation Unit</strong>
      </TableCaption>
      <div className="table-scroll">
        <table aria-label="Preparation unit bill of materials">
          <thead>
            <tr>
              <th scope="col">
                <strong>Component</strong>
              </th>
              <th scope="col">
                <strong>Quantity</strong>
              </th>
              <th scope="col">
                <strong>Total Cost (USD)</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Stepper-motor-driven lead-screw linear stage</td>
              <td>3</td>
              <td>180</td>
            </tr>
            <tr>
              <td>Microfluidic chip</td>
              <td>1</td>
              <td>18</td>
            </tr>
            <tr>
              <td>Tubing and syringes</td>
              <td>4</td>
              <td>10</td>
            </tr>
            <tr>
              <td>Reservoir</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Custom PCB</td>
              <td>1</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Cooling module (TEC1-12702)</td>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Cooling fan (12 V)</td>
              <td>1</td>
              <td>1.5</td>
            </tr>
            <tr>
              <td>Heating module</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Centrifugal pump (12 V)</td>
              <td>1</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Non-contact liquid-level sensor</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>LED module</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Temperature sensor (AHT10)</td>
              <td>1</td>
              <td>0.5</td>
            </tr>
            <tr>
              <td>Power supply module (12 V / 10 A)</td>
              <td>1</td>
              <td>4.5</td>
            </tr>
            <tr>
              <td>Relay module (5 V)</td>
              <td>3</td>
              <td>1.5</td>
            </tr>
            <tr>
              <td>OLED display (0.96-inch, I²C)</td>
              <td>1</td>
              <td>1.5</td>
            </tr>
            <tr>
              <td>ESP32 controller</td>
              <td>1</td>
              <td>4</td>
            </tr>
            <tr>
              <td>STM32 controller</td>
              <td>1</td>
              <td>1.5</td>
            </tr>
            <tr>
              <td>Acrylic enclosure (450 × 460 × 450 mm)</td>
              <td>1</td>
              <td>90</td>
            </tr>
            <tr>
              <td>Miscellaneous items (wires, heat sinks, etc.)</td>
              <td>/</td>
              <td>5</td>
            </tr>
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td></td>
              <td>
                <strong>333</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
