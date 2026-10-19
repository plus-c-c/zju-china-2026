import { HardwareVideo } from "./HardwareVideo";

export function AdministrationUnit() {
  return (
    <>
      <h2 className="mt-5 mb-3">3 Administration Module</h2>
      <p>
        <strong>
          The administration components are configured as separate peripherals
          outside the preparation enclosure and connect back to the main unit
          through flexible tubing.
        </strong>{" "}
        The assembly consists of three parts: a flow-resistance-based injection
        assembly, an arthroscopic imaging and blue-light photocrosslinking
        module, and a magnetic leg band.
      </p>
      <h3 className="mt-5 mb-3">
        3.1 Flow-Resistance-Based Injection Assembly
      </h3>
      <p>
        The uncured hydrogel precursor delivered by the transfer pump enters{" "}
        <strong>a three-way valve</strong> through flexible tubing. The valve
        connects to the transfer tubing, administration needle, and syringe
        barrel. Switching the valve state opens or closes connections between
        these ports, allowing the flow pathway to be changed while{" "}
        <strong>isolating the inactive pathway</strong>. The flow configurations
        for the different valve states are shown in the figures and videos
        below.
      </p>
      <div className="hardware-media-grid hardware-media-grid--valves">
        <figure className="hardware-media-panel">
          <img
            src="https://static.igem.wiki/teams/6102/wiki/images/hardware/figure3-1a.avif"
            alt="Schematic of the three-way valve configured to pump hydrogel into the syringe."
            className="hardware-media-image"
            loading="lazy"
            decoding="async"
            width={3685}
            height={1356}
          />
          <figcaption className="figure-caption mt-2">
            Figure 3.1a | Schematic of the three-way valve configured to pump
            hydrogel into the syringe.
          </figcaption>
        </figure>
        <figure className="hardware-media-panel">
          <img
            src="https://static.igem.wiki/teams/6102/wiki/images/hardware/figure3-1b.avif"
            alt="Schematic of the three-way valve configured to inject hydrogel into the lesion site."
            className="hardware-media-image"
            loading="lazy"
            decoding="async"
            width={3290}
            height={1324}
          />
          <figcaption className="figure-caption mt-2">
            Figure 3.1b | Schematic of the three-way valve configured to inject
            hydrogel into the lesion site.
          </figcaption>
        </figure>
      </div>
      <figure className="hardware-media hardware-media--video">
        <HardwareVideo
          src="https://video.igem.org/videos/embed/3GxGTcv5z3GSUTvBgCA2zg"
          title="Video 3.1a: Demonstration of pumping hydrogel into the syringe"
          poster="https://video.igem.org/lazy-static/thumbnails/cfc03f62-6e8a-4be3-9a03-79396aa4b564.jpg"
          aspectRatio={2.4625}
        />
        <figcaption className="figure-caption mt-2">
          Video 3.1a | Demonstration of pumping hydrogel into the syringe.
        </figcaption>
      </figure>
      <figure className="hardware-media hardware-media--video">
        <HardwareVideo
          src="https://video.igem.org/videos/embed/egiRwNbPvt36AGNyiVRCr8"
          title="Video 3.1b: Demonstration of hydrogel injection"
          poster="https://video.igem.org/lazy-static/thumbnails/06a8626b-7b1f-4ad4-bcfd-aa1aec4acc9d.jpg"
          aspectRatio={1.7777777777777777}
        />
        <figcaption className="figure-caption mt-2">
          Video 3.1b | Demonstration of hydrogel injection.
        </figcaption>
      </figure>
      <p>
        The hydrogel passes through the three-way valve and exits through the
        needle.{" "}
        <strong>
          Different needle internal diameters produce different flow
          resistances, affecting both delivery behavior and the tactile feedback
          experienced during injection.
        </strong>
      </p>
      <p>
        To compare the resistance produced by different needle sizes and
        identify options that better support precise hydrogel delivery by
        physicians, we will provide needles of different diameters at our
        exhibition booth for visitors to try. Suitable needle sizes will be
        selected based on delivery smoothness and user feedback.
      </p>
      <h3 className="mt-5 mb-3">
        3.2 Arthroscopic Imaging and Blue-Light Photocrosslinking Module
      </h3>
      <p>
        To support visualization and photocrosslinking during local
        administration within a joint,{" "}
        <strong>
          we modified an endoscope with a 5.5 mm camera-head diameter.
        </strong>{" "}
        The endoscope connects to a smartphone through USB Type-C. After
        installing the corresponding application, users can view live images on
        the phone. Its built-in white-light illumination turns on when powered,
        providing light for observing the target area.
      </p>
      <p>
        <strong>
          We added a blue LED strip with a central wavelength of 450 nm around
          the camera head
        </strong>
        . A thumbwheel switch controls the blue light. By combining imaging with
        blue-light illumination, this design allows the operator to observe the
        target area and activate the blue light as needed, providing hardware
        support for{" "}
        <strong>in situ hydrogel photocrosslinking experiments.</strong>
      </p>
      <figure className="hardware-media hardware-media--portrait">
        <img
          src="https://static.igem.wiki/teams/6102/wiki/images/hardware/figure3-2-1.avif"
          alt="Endoscope module."
          className="hardware-media-image"
          loading="lazy"
          decoding="async"
          width={2763}
          height={3772}
        />
        <figcaption className="figure-caption mt-2">
          Figure 3.2.1 | Endoscope module.
        </figcaption>
      </figure>
      <div className="hardware-media-grid hardware-media-grid--endoscope">
        <figure className="hardware-media-panel">
          <img
            src="https://static.igem.wiki/teams/6102/wiki/images/hardware/figure3-2-2.avif"
            alt="Endoscope camera head and illumination."
            className="hardware-media-image"
            loading="lazy"
            decoding="async"
            width={3000}
            height={4000}
          />
          <figcaption className="figure-caption mt-2">
            Figure 3.2.2 | Endoscope camera head and illumination.
          </figcaption>
        </figure>
        <figure className="hardware-media-panel">
          <img
            src="https://static.igem.wiki/teams/6102/wiki/images/hardware/figure3-2-3.avif"
            alt="Endoscope module and blue-light control module."
            className="hardware-media-image"
            loading="lazy"
            decoding="async"
            width={3300}
            height={2475}
          />
          <figcaption className="figure-caption mt-2">
            Figure 3.2.3 | Endoscope module and blue-light control module.
          </figcaption>
        </figure>
      </div>
      <h3 className="mt-5 mb-3">3.3 Bill of Materials</h3>
      <p>
        The following tables list the components and corresponding costs for the
        administration module, including the injection assembly, endoscope
        module, and blue-light curing module.
      </p>
      <div className="table-scroll">
        <table aria-label="Administration module bill of materials">
          <thead>
            <tr>
              <th colSpan={3} className="text-center">
                Administration Module
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={3} scope="rowgroup">
                <strong>Flow-Resistance-Based Injection Assembly</strong>
              </th>
            </tr>
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
            <tr>
              <td>Syringe barrel</td>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Needles of various sizes</td>
              <td>/</td>
              <td>5</td>
            </tr>
            <tr>
              <td>Three-way valve</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>
                <strong>Subtotal</strong>
              </td>
              <td></td>
              <td>
                <strong>8</strong>
              </td>
            </tr>
            <tr>
              <th colSpan={3} scope="rowgroup">
                <strong>Endoscope and Blue-Light Curing Module</strong>
              </th>
            </tr>
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
            <tr>
              <td>Endoscope (5.5 mm camera-head diameter)</td>
              <td>1</td>
              <td>2.5</td>
            </tr>
            <tr>
              <td>Blue LED strip</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Miscellaneous items (wires, etc.)</td>
              <td>/</td>
              <td>1</td>
            </tr>
            <tr>
              <td>
                <strong>Subtotal</strong>
              </td>
              <td></td>
              <td>
                <strong>4.5</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Administration Module Total</strong>
              </td>
              <td></td>
              <td>
                <strong>12.5</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
