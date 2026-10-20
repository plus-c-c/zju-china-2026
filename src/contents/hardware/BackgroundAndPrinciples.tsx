import { FigureCaption } from "../../components/FigureCaption";
export function BackgroundAndPrinciples() {
  return (
    <>
      <h2 className="mt-5 mb-3">Background</h2>
      <p>
        Hydrogels are functional materials with complex structures. Their{" "}
        <strong>high viscosity and temperature sensitivity</strong> present
        significant challenges for precise delivery and site-specific
        administration. In our experiments, multiple hydrogel ingredients must
        be mixed in specific proportions, while preparation and storage
        temperatures must be carefully controlled. Deviations from the required
        temperature may cause premature gelation or inactivate bioactive
        components. During administration, the system must also provide steady
        delivery, visualization of the target site, and in situ
        photocrosslinking, together with an external magnetic field to regulate
        anisotropic structures within the material. Achieving consistent and
        reproducible performance across these steps is difficult when relying
        entirely on manual operation.
      </p>
      <p>
        To address these challenges, our system uses a{" "}
        <strong>two-module architecture</strong> that separates hydrogel
        preparation from administration, while integrating the necessary
        functions within each module. The preparation module handles{" "}
        <strong>
          ingredient proportioning, mixing, and temperature-controlled storage
        </strong>
        . The administration module provides precise hydrogel delivery and
        integrates{" "}
        <strong>imaging, photocrosslinking, and magnetic field control</strong>.
        The two modules are interconnected through fluidic tubing and electrical
        circuitry to support the complete administration workflow.
      </p>
      <figure className="hardware-media hardware-media--portrait">
        <img
          src="https://static.igem.wiki/teams/6102/wiki/images/hardware/figure0-1-1.avif"
          alt="Hardware diagram 0-1-1"
          className="hardware-media-image"
          loading="lazy"
          decoding="async"
          width={1920}
          height={2399}
        />
        <FigureCaption className="figure-caption mt-2">
          Figure 0.1.1 | Overall view of the hardware.
        </FigureCaption>
      </figure>
      <div className="hardware-media-grid">
        <figure className="hardware-media-panel">
          <img
            src="https://static.igem.wiki/teams/6102/wiki/images/hardware/figure0-1-2a.avif"
            alt="Magnetic leg band."
            className="hardware-media-image"
            loading="lazy"
            decoding="async"
            width={1920}
            height={1080}
          />
          <FigureCaption className="figure-caption mt-2">
            Figure 0.1.2a | Magnetic leg band.
          </FigureCaption>
        </figure>
        <figure className="hardware-media-panel">
          <img
            src="https://static.igem.wiki/teams/6102/wiki/images/hardware/figure0-1-2b.avif"
            alt="Transparent schematic view of the magnetic leg band."
            className="hardware-media-image"
            loading="lazy"
            decoding="async"
            width={1920}
            height={1080}
          />
          <FigureCaption className="figure-caption mt-2">
            Figure 0.1.2b | Transparent schematic view of the magnetic leg band.
          </FigureCaption>
        </figure>
      </div>
      <figure className="hardware-media hardware-media--square">
        <img
          src="https://static.igem.wiki/teams/6102/wiki/images/hardware/figure0-1-3.avif"
          alt="Photograph of the assembled hardware."
          className="hardware-media-image"
          loading="lazy"
          decoding="async"
          width={3072}
          height={3253}
        />
        <FigureCaption className="figure-caption mt-2">
          Figure 0.1.3 | Photograph of the assembled hardware.
        </FigureCaption>
      </figure>
      <h2 className="mt-5 mb-3">1 Core Design Principles</h2>
      <h3 className="mt-5 mb-3">1.1 Modular Design</h3>
      <p>
        The system uses a modular architecture consisting of two main units:
        preparation and administration. Each unit and its internal subsystems
        can be{" "}
        <strong>disassembled and serviced relatively independently</strong>. The
        actuation mechanisms, fluidic pathways, temperature control and sensing
        modules, and user interface panel are all designed as modules. On the
        administration side, the injection assembly, optical unit, and magnetic
        leg band can also be installed and removed separately. This modular
        design allows the system configuration to be adjusted to suit different
        experiments and supports maintenance and future upgrades of individual
        modules.
      </p>
      <h3 className="mt-5 mb-3">
        1.2 Designed for Laboratory and Practical Use
      </h3>
      <p>
        The hardware design takes into account the practical requirements of
        laboratory work and potential downstream applications. Several
        structural features address frequent consumable replacement, difficulty
        observing fluid conditions inside tubing, and the risk of formulation
        backflow caused by operating errors. Fluid-contact consumables can be{" "}
        <strong>quickly installed and removed</strong>, simplifying sample
        changes and maintenance. A transparent enclosure allows users to observe
        fluid conditions in the tubing and promptly identify bubbles, blockages,
        and other abnormalities. Three-way valves{" "}
        <strong>switch between and isolate fluidic pathways</strong>, reducing
        the risk of backflow caused by incorrect operation.
      </p>
      <p>
        Most functions are accessible from a centralized control panel and can
        also be operated through a web interface, simplifying the workflow and
        reducing operational complexity.
      </p>
      <h3 className="mt-5 mb-3">1.3 Design Adapted to Material Properties</h3>
      <p>
        To accommodate the temperature sensitivity of hydrogels, the reservoir
        integrates <strong>both heating and cooling</strong> to regulate and
        maintain its internal temperature, helping preserve the hydrogel’s
        physicochemical stability.
      </p>
      <p>
        At the administration end, needles with different internal diameters can
        be exchanged to <strong>adjust flow resistance</strong>. This helps
        smooth hydrogel delivery and reduce transient surges during injection,
        thereby limiting mechanical disturbance to the target tissue and
        enabling more precise handling by physicians. Users can compare the
        delivery performance and tactile feedback of different needle sizes in
        person to select a suitable option.
      </p>
      <h3 className="mt-5 mb-3">1.4 Open Source and Reproducibility</h3>
      <p>
        All <strong>mechanical drawings and PCB project files</strong> for the
        system are <strong>open source</strong>, allowing future teams to
        reference, reuse, and further develop the design.
      </p>
      <p>
        <a
          href="https://github.com/ccc8701/ZJU-China-2026-hardware"
          className="btn btn-outline-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Hardware Repository ↗
        </a>
      </p>
    </>
  );
}
