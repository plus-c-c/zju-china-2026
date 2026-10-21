import { useEffect, useRef, useState } from "react";
import {
  PlatformFunctionSections,
  SharedProjectSections,
} from "../components/PlatformFunctionSections";
import { FigureCaption } from "../components/FigureCaption";
import { ProjectExperimentNotes } from "../components/ProjectExperimentNotes";
import {
  FigureSourceCitation,
  FigureSourceEntry,
} from "../components/FigureSourceCitation";
import { References } from "../components/References";
import { TransparentImage } from "../components/TransparentImage";
import {
  BIOSAFETY_FIGURE_URL,
  BiosafetyFigureCaption,
  BiosafetyIntroduction,
  BiosafetyResultsText,
} from "./results/biosafety-content";
import "./proof-of-concept.css";

function AnimatedWebPSprite({
  sprite,
  fallback,
  frames,
  columns,
  rows,
  width,
  height,
  alt,
  className,
  frameMs = 100,
}: {
  sprite: string;
  fallback: string;
  frames: number;
  columns: number;
  rows: number;
  width: number;
  height: number;
  alt: string;
  className?: string;
  frameMs?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (failed) return;
    const image = new Image();
    let timer: number | undefined;
    let frame = 0;

    const draw = () => {
      const context = canvasRef.current?.getContext("2d");
      if (!context) return;
      const column = frame % columns;
      const row = Math.floor(frame / columns);
      context.clearRect(0, 0, width, height);
      context.drawImage(
        image,
        column * width,
        row * height,
        width,
        height,
        0,
        0,
        width,
        height,
      );
      frame = (frame + 1) % frames;
    };

    image.onload = () => {
      draw();
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        timer = window.setInterval(draw, frameMs);
      }
    };
    image.onerror = () => setFailed(true);
    image.src = sprite;

    return () => {
      if (timer) window.clearInterval(timer);
      image.onload = null;
      image.onerror = null;
    };
  }, [sprite, frames, columns, rows, width, height, frameMs, failed]);

  if (failed) {
    return (
      <img
        src={fallback}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        style={{ width: "100%", maxWidth: 520 }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      role="img"
      aria-label={alt}
      className={className}
    />
  );
}

export function ProofOfConcept() {
  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article className="poc-article">
          <p>
            Faced with different types of cartilage damage, we hope to avoid
            designing a new hydrogel from scratch for every case. NEST retains a
            common silk–elastin-like polypeptide (SELP) scaffold, tunes material
            properties through sequence design, and uses a standardized ligation
            interface to configure different functions, so that the material can
            be tailored to specific repair needs.
          </p>
          <p>
            Can this concept work in practice? Only experiments can answer that
            question. We pursued two lines of validation,{" "}
            <strong>tunable scaffold properties</strong> and{" "}
            <strong>configurable functions</strong>. We produced and
            characterized the materials, examined interface-mediated ligation,
            verified module-specific functions, and included the{" "}
            <em>in vitro</em> cytocompatibility of the major components in our
            evaluation. Using osteoarthritis (OA) as a representative
            application, magnetically responsive components, glycosaminoglycan
            (GAG) retention, and mitochondrial delivery address distinct repair
            needs and together demonstrate how NEST's programmable design
            performs in practice.
          </p>
          <figure className="my-4 text-center">
            <TransparentImage
              src="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/schematic-01.avif"
              width={3120}
              height={1370}
              alt="Figure 1 | Overview of proof-of-concept validation"
              className="img-fluid rounded"
              style={{ width: "100%" }}
            />
            <FigureCaption className="figure-caption mt-2">
              <strong>
                Figure 1 | Overview of Proof-of-Concept Validation.
              </strong>{" "}
              The two validation tracks address scaffold property tuning and
              functional configuration, respectively; cytocompatibility is
              evaluated across both tracks.
              <FigureSourceCitation source={1} href="#poc-reference-1" />
            </FigureCaption>
          </figure>
          <ProjectExperimentNotes />
          <PlatformFunctionSections
            id="poc"
            platform={
              <>
                <h2 className="mt-5 mb-3">
                  1 Programmable Biomimetic Platform
                </h2>
                <p>
                  NEST's programmability begins with the SELP scaffold itself.
                  We need not only to turn different sequences into actual
                  protein materials but also to show that sequence changes can
                  tune material properties. At the same time, the platform must
                  retain an effective means of attaching functional components.
                  We therefore organized scaffold-platform validation around
                  three questions: Can the proteins be produced and made into a
                  gel? Can the material properties be tuned? Can the shared
                  interface mediate protein ligation?
                </p>
                <h3 className="mt-5 mb-3">
                  1.1 From Protein Sequence to Hydrogel: Validating the
                  Manufacturing Route
                </h3>
                <p>
                  A programmable material must first be manufacturable. We
                  selected scaffolds with different repeat numbers and
                  introduced SnoopTag2 into some constructs, testing whether the
                  modified protein sequences could still be produced. We then
                  used photocrosslinking to convert the protein precursors into
                  hydrogels.
                </p>
                <h4 className="mt-5 mb-3">
                  1.1.1 SELP Scaffolds with Different Sequences Were
                  Successfully Produced
                </h4>
                <p>
                  The 2KY scaffolds with different repeat numbers, together with
                  their SnoopTag2-bearing variants, were successfully expressed,
                  purified, and recovered as lyophilized products. We obtained
                  2KY-5, 2KY-10, and 2KY-16, as well as tagged constructs
                  2KY-5-Tag and 2KY-10-Tag. Even after changing scaffold length
                  or introducing a ligation tag, the sequence designs could
                  still be realized as protein products, demonstrating the
                  manufacturability of different scaffold configurations
                  (Figures 2 and 3).
                </p>
                <figure className="my-4 text-center">
                  <TransparentImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/figure-01.avif"
                    alt="Figure 2 | Production of scaffolds with different repeat numbers"
                    className="img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption mt-2">
                    <strong>
                      Figure 2 | Successful Production of Scaffolds with
                      Different Repeat Numbers.
                    </strong>{" "}
                    (A) 2KY-5; (B) 2KY-10. We also produced 2KY-16. Sup/Pel
                    denotes supernatant/pellet. Arrows and red boxes indicate
                    the target bands.
                  </FigureCaption>
                </figure>
                <figure className="my-4 text-center">
                  <TransparentImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/figure-02.avif"
                    alt="Figure 3 | Expression and recovery of SnoopTag2-bearing scaffolds"
                    className="img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption mt-2">
                    <strong>
                      Figure 3 | Successful Expression and Recovery of
                      SnoopTag2-Bearing Scaffolds.
                    </strong>{" "}
                    (A) 2KY-5-Tag; (B) 2KY-10-Tag. Lyophilized products and
                    protein electrophoresis results are shown.
                  </FigureCaption>
                </figure>
                <h4 className="mt-5 mb-3">
                  1.1.2 Rapid Gelation within 2 Seconds of Blue-Light
                  Irradiation
                </h4>
                <p>
                  After obtaining the scaffold proteins, we tested whether they
                  could rapidly form hydrogels. Under blue-light irradiation,
                  2KY-5 changed from a flowable solution into a gel that
                  retained its shape and did not flow when the container was
                  inverted, all within <strong>2 s</strong>. This provided a
                  direct demonstration of the transformation from a protein
                  precursor into a material (Figure 4).
                </p>
                <figure className="my-4 text-center">
                  <TransparentImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01/10.avif"
                    alt="Figure 4 | Rapid gelation of SELP"
                    className="img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption mt-2">
                    <strong>Figure 4 | Rapid Gelation of SELP.</strong> After 2
                    s of blue-light irradiation, the material remained in place
                    and did not flow upon inversion.
                  </FigureCaption>
                </figure>
                <p>
                  Together, the successful production of multiple sequences and
                  the rapid gelation of 2KY-5 validated NEST's manufacturing
                  route from protein design and production to hydrogel
                  formation.
                </p>
                <h3 className="mt-5 mb-3">
                  1.2 Tunable Scaffold Properties for Cartilage Repair
                </h3>
                <p>
                  Once a hydrogel has been formed, the more important question
                  is whether sequence design can meaningfully alter its
                  properties. We evaluated the SELP scaffold in terms of network
                  architecture, elasticity, and shear load-bearing behavior, and
                  investigated its relationship to the intended cartilage
                  application through co-culture with chondrocytes.
                </p>
                <p>
                  The hydrogel displayed an interconnected three-dimensional
                  porous network. Crosslinking-associated spectral features and
                  a predominantly elastic rheological response together
                  supported the formation of a gel network. Changes in sequence
                  and repeat number were accompanied by changes in elastic
                  modulus and shear load-bearing performance, with{" "}
                  <strong>2KY-16 showing higher measured values</strong>.
                  Sequence variation was thus reflected in the material's actual
                  mechanical behavior, validating the tunability of the SELP
                  scaffold (Figure 5).
                </p>
                <figure className="my-4 text-center">
                  <TransparentImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/figure-04.avif"
                    alt="Figure 5 | Porous elastic network and sequence-tunable mechanical properties"
                    className="img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption mt-2">
                    <strong>
                      Figure 5 | The Scaffold Forms a Porous Elastic Network
                      with Sequence-Tunable Mechanical Properties.
                    </strong>{" "}
                    (A) Scanning electron microscopy (SEM); (B) fluorescence
                    spectroscopy; (C) rheology; (D, E) stress-strain behavior
                    and Young's modulus; (F, G) shear force and shear strength.
                    Panels C-G were measured by our collaborators.
                  </FigureCaption>
                </figure>
                <p>
                  The scaffold's performance was also reflected at the cellular
                  level. Following co-culture with the scaffold, the 2KY groups
                  showed increased expression of{" "}
                  <strong>ACAN, COL2, and SOX9</strong> and decreased expression
                  of <strong>COL1</strong>, a gene-expression pattern favorable
                  to cartilage-associated phenotypes. These cellular responses
                  were consistent with the scaffold's design for cartilage
                  applications (Figure 6).
                </p>
                <figure className="poc-half-width my-4 text-center">
                  <TransparentImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/figure-05-v2.avif"
                    alt="Figure 6 | Cartilage-related gene expression associated with the 2KY scaffold"
                    className="img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption mt-2">
                    <strong>
                      Figure 6 | The 2KY Scaffold Supports Cartilage-Related
                      Gene Expression.
                    </strong>{" "}
                    (A-E) ACAN, COL1, COL2, COLX, and SOX9; expression was
                    normalized to 2Y-5 = 1. Measurements were conducted by our
                    collaborators. ns, not significant; <code>*</code>, p &lt;
                    0.05; <code>**</code>, p &lt; 0.01; <code>***</code>, p &lt;
                    0.001.
                  </FigureCaption>
                </figure>
                <p>
                  Mechanical properties changed with sequence configuration, and
                  cartilage-associated gene-expression responses were also
                  observed. Together, these findings show that SELP tunability
                  translates into measurable material properties, while the
                  scaffold's relevance to cartilage applications is supported by
                  cellular-level evidence.
                </p>
                <h3 className="mt-5 mb-3">
                  1.3 The Standardized Interface Exhibits Effective Protein
                  Ligation Activity
                </h3>
                <p>
                  The key to configuring functions on demand is the ability of
                  different components to share a common ligation mechanism. We
                  first assessed the catalytic activity of SnoopLigase2 in a
                  SnoopTag2-DogTag reporter system to determine whether the
                  shared interface could ligate proteins.
                </p>
                <p>
                  Using SnoopTag2-sfGFP and SUMO-DogTag as substrates, we
                  observed the expected ligation product after SnoopLigase2
                  catalysis, accompanied by a reduction in substrate bands.
                  Changes in the reporter-system products confirmed ligation
                  activity at the shared interface. The successful production of
                  tagged scaffolds separately demonstrated that the ligation tag
                  could be incorporated into scaffold constructs (Figure 7).
                </p>
                <figure className="my-4 text-center">
                  <TransparentImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/figure-06.avif"
                    alt="Figure 7 | SnoopLigase2-mediated formation of the expected ligation product"
                    className="img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption mt-2">
                    <strong>
                      Figure 7 | SnoopLigase2 Catalyzes Formation of the
                      Expected Ligation Product.
                    </strong>{" "}
                    SnoopTag2-sfGFP and SUMO-DogTag were used as substrates; +/-
                    indicates the presence or absence of each component in the
                    corresponding lane.
                  </FigureCaption>
                </figure>
                <p>
                  The shared interface achieved the expected enzyme-mediated
                  protein ligation, validating the ligation mechanism required
                  for NEST's functional configuration.
                </p>
                <h3 className="mt-5 mb-3">Scaffold Platform Summary</h3>
                <p>
                  We successfully produced SELPs with different sequences,
                  demonstrated rapid gelation and tunable mechanical properties,
                  and obtained cellular results supporting cartilage-related
                  gene expression. The shared ligation interface also displayed
                  effective protein ligation activity. These findings validate
                  the scaffold platform's manufacturability, tunability, and
                  interface activity, demonstrating that SELP can serve as the
                  central material foundation of NEST's programmable design.
                </p>
              </>
            }
            functionContent={
              <>
                <h2 className="mt-5 mb-3">
                  2 Functional Configuration and Validation for Osteoarthritis
                </h2>
                <p>
                  Having established that scaffold properties can be tuned, the
                  platform must answer a second question: Can different
                  functions be configured for a particular type of damage? We
                  selected OA as a representative application and matched its
                  mechanical and structural needs, matrix GAG retention needs,
                  and cell-function-related needs to three components:{" "}
                  <strong>TVN-mediated magnetic response</strong>,{" "}
                  <strong>GAG retention</strong>, and{" "}
                  <strong>responsive mitochondrial delivery</strong>. Each
                  function plays a different role, but all use a shared ligation
                  mechanism. We therefore examined whether their components
                  could be produced, whether the interface remained compatible,
                  and whether their intended functions could be achieved.
                </p>
                <figure className="my-4 text-center">
                  <TransparentImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/schematic-02.avif"
                    alt="Figure 8 | OA needs mapped to functional modules"
                    className="img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption mt-2">
                    <strong>
                      Figure 8 | Mapping the Needs of OA to Functional Modules.
                    </strong>{" "}
                    OA is used as a representative application. The left column
                    shows the design needs being addressed, and the right column
                    shows the corresponding functions validated on this page.
                    <FigureSourceCitation source={1} href="#poc-reference-1" />
                  </FigureCaption>
                </figure>
                <h3 className="mt-5 mb-3">
                  2.1 Key Components for All Three Functional Modules Were
                  Obtained
                </h3>
                <p>
                  We separately prepared the functional proteins required for
                  each module and isolated the biological components needed for
                  mitochondrial delivery.{" "}
                  <strong>TVN, CPC, Link-N, CPC-Link-N</strong>, and the
                  delivery module's responsive fusion protein were all
                  successfully obtained.
                </p>
                <p>
                  Mitochondria were also successfully isolated and confirmed by
                  detection of the mitochondrial marker proteins{" "}
                  <strong>COX IV</strong> and <strong>TOMM20</strong>. The key
                  components required for all three modules had thus been
                  prepared, translating the functional designs into constructs
                  and delivery components available for experimental testing
                  (Figure 9).
                </p>
                <figure className="my-4 text-center">
                  <TransparentImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/figure-07.avif"
                    alt="Figure 9 | Key components for the functional modules"
                    className="img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption mt-2">
                    <strong>
                      Figure 9 | Successful Preparation of Key Components for
                      Each Functional Module.
                    </strong>{" "}
                    (A) TVN; (B) CPC, CPC-Link-N, and Link-N; (C) the delivery
                    fusion protein; (D) mitochondrial marker proteins COX IV and
                    TOMM20.
                  </FigureCaption>
                </figure>
                <h3 className="mt-5 mb-3">
                  2.2 Different Functional Constructs Are Compatible with the
                  Same Ligation Interface
                </h3>
                <p>
                  The functions differ, but can the ligation mechanism remain
                  the same? This is a critical test of NEST's modular design.
                  Using the same reporter system, we separately evaluated the
                  ligation activity of the TVN, GAG-retention, and delivery
                  constructs, examining whether the interface remained
                  functional after the introduction of different functional
                  sequences.
                </p>
                <p>
                  All three functional constructs formed the expected
                  enzyme-mediated ligation products and retained DogTag-mediated
                  ligation activity. The different functional sequences did not
                  prevent the shared interface from working; each construct
                  could use the same ligation mechanism (Figure 10).
                </p>
                <figure className="my-4 text-center">
                  <TransparentImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/figure-08.avif"
                    alt="Figure 10 | Shared ligation activity across three functional modules"
                    className="img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption mt-2">
                    <strong>
                      Figure 10 | All Three Functional Modules Retain Ligation
                      Activity at the Shared Interface.
                    </strong>{" "}
                    (A) TVN; (B) GAG-retention construct; (C) responsive
                    delivery construct and scrambled-sequence control. A GFP
                    reporter system was used; +/- indicates the presence or
                    absence of each component in the corresponding lane.
                  </FigureCaption>
                </figure>
                <p>
                  Different functional sequences, one consistent ligation
                  mechanism. This result validates the design of a common NEST
                  interface that is compatible with distinct functional
                  components.
                </p>
                <h3 className="mt-5 mb-3">
                  2.3 All Three Modules Demonstrated Their Intended Functions
                </h3>
                <p>
                  The value of each module ultimately depends on what it can do.
                  To address the different needs associated with OA, we examined
                  the magnetic-field response of the composite components,
                  retention of matrix-associated substances, and the key steps
                  in mitochondrial delivery.
                </p>
                <h4 className="mt-5 mb-3">
                  2.3.1 Magnetic Response: Reorienting Protein-Particle
                  Complexes with a Magnetic Field
                </h4>
                <p>
                  To control local orientation using an external field, the
                  protein must first be linked to magnetic particles. After
                  washing, the TVN group retained protein-associated
                  fluorescence on the particles, showing a clear difference from
                  the control group and confirming TVN-mediated particle binding
                  (Figures 11 and 12).
                </p>
                <figure className="my-4 text-center">
                  <TransparentImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/figure-09.avif"
                    alt="Figure 11 | Control group for magnetic particle binding"
                    className="img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption mt-2">
                    <strong>
                      Figure 11 | Control Group for Magnetic Particle Binding.
                    </strong>{" "}
                    The left column shows bright-field images and the right
                    column shows fluorescence images; A/a and B/b are the panel
                    labels in the original figure.
                  </FigureCaption>
                </figure>
                <figure className="my-4 text-center">
                  <TransparentImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/figure-10.avif"
                    alt="Figure 12 | TVN-particle fluorescence and magnetic alignment"
                    className="img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption mt-2">
                    <strong>
                      Figure 12 | TVN-Associated Protein Fluorescence Remains on
                      Particles after Washing, and TVN-Magnetic Nanoparticle
                      Complexes Align with the Magnetic Field.
                    </strong>{" "}
                    The TVN-magnetic nanoparticle complexes could adopt a
                    uniform orientation along the applied magnetic field. The
                    left column shows bright-field images and the right column
                    shows fluorescence images; red arrows indicate the direction
                    of the external magnetic field.
                  </FigureCaption>
                </figure>
                <p>
                  After establishing this association, we investigated whether
                  the composite components could change orientation in response
                  to the magnetic field. As the direction of the applied field
                  changed, particle aggregates reoriented, and the
                  protein-labeled composite components reoriented with them. The
                  association between proteins and magnetic particles was thus
                  translated into an observable response to an external field
                  (Figures 13 and 14).
                </p>
                <div className="poc-animation-grid">
                  <figure className="poc-animation-panel">
                    <div className="poc-animation-frame">
                      <AnimatedWebPSprite
                        sprite="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/figure-11-sprite.webp"
                        fallback="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/figure-11.webp"
                        frames={56}
                        columns={10}
                        rows={6}
                        width={360}
                        height={240}
                        alt="Figure 13 | Bright-field recording of magnetic particle aggregates reorienting"
                        className="poc-sprite rounded"
                      />
                    </div>
                    <FigureCaption className="figure-caption">
                      <strong>
                        Figure 13 | Bright-Field Dynamic Recording of Magnetic
                        Particle Aggregates Reorienting in Response to an Applied
                        Field.
                      </strong>
                    </FigureCaption>
                  </figure>
                  <figure className="poc-animation-panel">
                    <div className="poc-animation-frame">
                      <AnimatedWebPSprite
                        sprite="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/figure-12-sprite.webp"
                        fallback="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/figure-12.webp"
                        frames={60}
                        columns={10}
                        rows={6}
                        width={360}
                        height={240}
                        alt="Figure 14 | Fluorescence recording of protein-labeled complexes reorienting"
                        className="poc-sprite rounded"
                      />
                    </div>
                    <FigureCaption className="figure-caption">
                      <strong>
                        Figure 14 | Fluorescence Dynamic Recording of
                        Protein-Labeled SELP-TVN-Magnetic Nanoparticle Complexes
                        Reorienting.
                      </strong>
                    </FigureCaption>
                  </figure>
                </div>
                <p>
                  TVN enabled the association of proteins with magnetic
                  particles and allowed the protein-particle complexes to be
                  directionally controlled by an external field, fulfilling the
                  key design goal of the magnetically responsive module.
                </p>
                <h4 className="mt-5 mb-3">
                  2.3.2 GAG Retention: Capturing and Retaining Matrix-Associated
                  Components
                </h4>
                <p>
                  The purpose of the GAG-retention module is to retain
                  matrix-associated components using functional proteins.
                  Following validation of the biotinylation and immobilization
                  interface, we used{" "}
                  <strong>chondroitin sulfate A (CS-A)</strong> to test this
                  capability. Immobilized <strong>CPC</strong> and{" "}
                  <strong>CPC-Link-N</strong> both reduced residual CS-A in the
                  supernatant, indicating that CPC-containing constructs could
                  capture GAGs and retained this function after fusion with
                  Link-N (Figures 15 and 16).
                </p>
                <div className="poc-animation-grid">
                  <figure className="poc-animation-panel">
                    <div className="poc-animation-frame">
                      <TransparentImage
                        src="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/figure-13.avif"
                        alt="Figure 15 | Biotinylation and immobilization interface for GAG constructs"
                        className="img-fluid rounded"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <FigureCaption className="figure-caption">
                      <strong>
                        Figure 15 | Validation of the Biotinylation and
                        Immobilization Interface for GAG Constructs.
                      </strong>{" "}
                      SA denotes streptavidin; the red box marks the
                      high-molecular-weight complex.
                    </FigureCaption>
                  </figure>
                  <figure className="poc-animation-panel">
                    <div className="poc-animation-frame">
                      <TransparentImage
                        src="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/figure-14.avif"
                        alt="Figure 16 | Residual CS-A in the supernatant after CPC-mediated retention"
                        className="img-fluid rounded"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <FigureCaption className="figure-caption">
                      <strong>
                        Figure 16 | Immobilized CPC and CPC-Link-N Reduce
                        Residual CS-A in the Supernatant.
                      </strong>{" "}
                      R1-R3 represent the three corresponding measurements.
                      Individual points show measured values, and bars indicate
                      the mean.
                    </FigureCaption>
                  </figure>
                </div>
                <p>
                  The GAG-retention activity of CPC was demonstrated in
                  immobilized constructs and was preserved after fusion with
                  Link-N. These results validate the ability of the
                  GAG-retention module to capture and retain matrix-associated
                  components.
                </p>
                <h4 className="mt-5 mb-3">
                  2.3.3 Mitochondrial Delivery: Validating Encapsulation,
                  Enzyme-Responsive Cleavage, and Cellular Delivery
                </h4>
                <p>
                  Effective mitochondrial delivery requires us to resolve three
                  key questions: Can we construct the delivery carrier, achieve
                  the intended enzyme-responsive cleavage, and deliver
                  mitochondria to recipient cells?
                </p>
                <p>
                  We first examined carrier construction. Fluorescence signals
                  from liposomes and mitochondria overlapped spatially, and
                  transmission electron microscopy (TEM) further revealed an
                  encapsulating structure. These two imaging approaches provided
                  complementary evidence for successful formation of the
                  liposome-mitochondria complex (Figures 17 and 18).
                </p>
                <div className="poc-stack-halved">
                  <figure className="poc-halved-figure text-center">
                    <TransparentImage
                      src="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/figure-15.avif"
                      alt="Figure 17 | Fluorescence colocalization of liposomes and mitochondria"
                      className="img-fluid rounded"
                      style={{ width: "100%" }}
                    />
                    <FigureCaption className="figure-caption mt-2">
                      <strong>
                        Figure 17 | Fluorescence Colocalization of Liposomes and
                        Mitochondria.
                      </strong>{" "}
                      Green: MitoTracker Green; red: DiD; overlapping signals
                      appear yellow-orange.
                    </FigureCaption>
                  </figure>
                  <figure className="poc-halved-figure text-center">
                    <TransparentImage
                      src="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/figure-16.avif"
                      alt="Figure 18 | TEM visualization of encapsulation"
                      className="img-fluid rounded"
                      style={{ width: "100%" }}
                    />
                    <FigureCaption className="figure-caption mt-2">
                      <strong>
                        Figure 18 | TEM Reveals the Composite Encapsulation
                        Structure.
                      </strong>{" "}
                      (A) Functionalized liposome; (B) free mitochondria; (C)
                      liposome-mitochondria complex. All scale bars are 200 nm.
                    </FigureCaption>
                  </figure>
                </div>
                <p>
                  Next, we tested whether the responsive linker peptide could be
                  cleaved as designed. Following <strong>MMP-13</strong>{" "}
                  treatment, the responsive group exhibited band changes
                  distinct from those of the scrambled-sequence control
                  beginning at <strong>2 h</strong>. These changes were
                  consistent with the expected cleavage pattern and validated
                  the enzyme-responsive function of the sequence (Figure 19).
                </p>
                <figure className="poc-half-width my-4 text-center">
                  <TransparentImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/figure-17.avif"
                    alt="Figure 19 | MMP-13-responsive cleavage"
                    className="img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption mt-2">
                    <strong>Figure 19 | MMP-13-Responsive Cleavage.</strong> Pep
                    denotes the responsive peptide group; Control denotes the
                    scrambled-sequence control. Differences in band patterns
                    emerged from 2 h onward; the arrow indicates the uncleaved
                    product in the control group.
                  </FigureCaption>
                </figure>
                <p>
                  Finally, we examined recipient cells following delivery
                  treatment. Mitochondrial labeling was detected within cellular
                  regions and around the nuclei in the complex-treated group,
                  showing a clear difference from the control group and
                  providing imaging evidence consistent with cellular delivery
                  (Figure 20).
                </p>
                <figure className="my-4 text-center">
                  <TransparentImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/proof-of-concept/figure-18.avif"
                    alt="Figure 20 | Mitochondrial labeling in recipient-cell regions"
                    className="img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption mt-2">
                    <strong>
                      Figure 20 | Mitochondrial Labeling Detected in
                      Recipient-Cell Regions.
                    </strong>{" "}
                    (A) Complex-treated group; (B) control group. Blue: cell
                    nuclei; green: mitochondrial labeling.
                  </FigureCaption>
                </figure>
                <p>
                  Fluorescence imaging and TEM confirmed construction of the
                  carrier, band changes validated the cleavage response, and
                  recipient-cell imaging provided evidence supporting delivery.
                  All three steps were examined and validated, completing the
                  key functional tests of the mitochondrial delivery module.
                </p>
                <h3 className="mt-5 mb-3">Functional Configuration Summary</h3>
                <p>
                  Using OA as a representative application, we successfully
                  constructed and validated three types of functional modules:
                  the magnetic-response module controlled the orientation of
                  composite components; the GAG-retention module captured
                  matrix-associated substances; and the mitochondrial delivery
                  module underwent validation of encapsulation,
                  enzyme-responsive cleavage, and cellular delivery. Each
                  functional construct also retained activity at the shared
                  ligation interface. The combination of distinct functions and
                  interface compatibility shows that it is feasible to select
                  functions for specific repair needs while maintaining
                  compatibility through a standardized interface.
                </p>
              </>
            }
          />
          <SharedProjectSections>
            <h2 className="mt-5 mb-3">
              Biocompatibility
            </h2>
            <BiosafetyIntroduction />
            <BiosafetyResultsText figureNumber="21" />
            <figure className="my-4 text-center">
              <TransparentImage
                src={BIOSAFETY_FIGURE_URL}
                alt="Figure 21 | Preliminary cytocompatibility assessment of NEST components using the CCK-8 assay"
                width={3080}
                height={2434}
                trim={false}
                className="img-fluid rounded"
                style={{ width: "100%" }}
              />
              <BiosafetyFigureCaption figureNumber="21" />
            </figure>
            <h2 className="mt-5 mb-3">Conclusion</h2>
            <p>
              In testing NEST's core concept, we successfully produced SELP
              hydrogels and demonstrated that material properties can be altered
              through sequence configuration. The shared ligation interface was
              compatible with different functional constructs, while the
              magnetic-response, GAG-retention, and mitochondrial-delivery
              modules each exhibited their key intended functions. The scaffold
              and major functional components were also evaluated in preliminary{" "}
              <em>in vitro</em> cytocompatibility assays.
            </p>
            <p>
              We have therefore established two experimental aspects of NEST's
              programmability:{" "}
              <strong>
                changing the sequence can tune scaffold properties, and
                different functional constructs can use the same ligation
                mechanism
              </strong>
              . Together with the performance of the three modules and the{" "}
              <em>in vitro</em> cytocompatibility results, these findings
              complete NEST's proof of concept and demonstrate the feasibility
              of its core design and the effectiveness of its key functions.
            </p>
            <p>
              No two cartilage injuries are exactly alike. Enabling the material
              to change with the needs of repair is why we designed NEST.
            </p>
          </SharedProjectSections>
          <References
            level={2}
            title="Figure Sources and Credits"
            id="figure-sources-and-credits"
          >
            <ul className="references-list figure-sources-list">
              <FigureSourceEntry source={1} id="poc-reference-1">
                <p>
                  Icons used in Figure 1 and Figure 8. Protein chain: DBCLS (CC
                  BY 4.0); hydrogel: Marcel Tisch (CC0); proteoglycan:
                  Daniel-Marcos (CC0); mitochondrion: Servier (CC BY 3.0). Link,
                  puzzle, magnet, and adjustment icons: Google Noto Emoji
                  (Google, Apache 2.0). Icons were resized and recolored in
                  shades of blue.
                </p>
              </FigureSourceEntry>
            </ul>
          </References>
        </article>
      </div>
    </div>
  );
}
