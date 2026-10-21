import { TableCaption } from "../components/FigureCaption";
import { PlatformFunctionSections } from "../components/PlatformFunctionSections";
import { FigureCaption } from "../components/FigureCaption";
import { References } from "../components/References";
import { FigureImage } from "../components/FigureImage";
import { MathFormula } from "../components/MathFormula";
import "./design.css";

export function Design() {
  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article className="design-article">
          <h2 className="mt-5 mb-4">Introduction</h2>
          <p>
            Hyaline cartilage damage affects a large population, yet existing
            treatments—rehabilitation and drugs, microfracture, osteochondral
            transplantation, autologous chondrocyte implantation, and joint
            replacement—struggle to restore durable native hyaline cartilage.
            Water-rich, injectable hydrogels that form in situ have recently
            emerged as a new direction, but remain limited: one material must
            combine strength, toughness, and wet adhesion; degradation must be
            coordinated with tissue regeneration; and multistep modification and
            composite assembly complicate added functions, batch consistency,
            sterilization, and storage.
          </p>
          <p>
            Synthetic biology allows protein composition and functional sites to
            be encoded in genes and produced by biomanufacturing, while modular
            ligation combines functions. Cartilage strength, toughness, and
            local microenvironment vary across joint sites and patient
            populations; an ideal material should therefore share a common basis
            with tunable properties and functions combined on demand. We
            designed <strong>the NEST platform</strong>, built on a{" "}
            <strong>
              programmable silk–elastin-like polypeptide (SELP) scaffold
            </strong>{" "}
            and <strong>standardized peptide interfaces</strong> that assemble{" "}
            <strong>functional modules</strong>. Unlike conventional designs
            that rely on blending components,{" "}
            <strong>
              NEST encodes material composition, crosslinking sites, and
              functional interfaces in a single DNA sequence
            </strong>{" "}
            (Figure 0.1).
          </p>
          <figure className="figure d-block my-4 text-center">
            <FigureImage
              src="https://static.igem.wiki/teams/6102/wiki/images/design/01/00001.avif"
              width={4000}
              height={2263}
              alt="Overview of the NEST platform design."
              className="figure-img img-fluid rounded"
              style={{ width: "100%" }}
            />
            <FigureCaption className="figure-caption">
              Figure 0.1 | Overview of the NEST platform. The upper panel shows
              SELP scaffolds and functional modules expressed in <em>E. coli</em>,
              assembled through SnoopTag/DogTag ligation, and combined into a
              hydrogel precursor that is crosslinked in situ using Ru/SPS under
              450 nm blue light. The lower panel illustrates the proposed
              treatment workflow: injection into the cartilage defect, magnetic
              alignment using a knee brace, and blue-light crosslinking to fix
              the aligned network. The enlarged interface depicts electrostatic
              interactions with cartilage glycosaminoglycans (GAGs) and covalent
              bonds intended to support hydrogel–cartilage integration and
              cartilage repair.
            </FigureCaption>
          </figure>
          <PlatformFunctionSections
            id="design"
            platform={
              <>
                <h2
                  id="1-programmable-material-foundation-the-selp-scaffold"
                  className="mt-5 mb-4"
                >
                  1 Programmable Material Foundation: The SELP Scaffold
                </h2>
                <p>
                  <strong>
                    NEST (a SELP-based Modular and Programmable Biomimetic
                    Cartilage Hydrogel Platform)
                  </strong>{" "}
                  comprises two core elements: a{" "}
                  <strong>
                    programmable silk–elastin-like polypeptide (SELP) scaffold
                  </strong>{" "}
                  and <strong>standardized peptide ligation interfaces</strong>{" "}
                  for assembling functional units. SELP provides support,
                  elasticity, crosslinkable sites, and a basis for displaying
                  functions; the interface relatively decouples the material
                  body from external functions, so that functional modules can
                  be <strong>assembled</strong>, <strong>replaced</strong>, and{" "}
                  <strong>iterated</strong>. This part first describes the
                  scaffold.
                </p>
                <h3 className="mt-5 mb-3">
                  1.1 Sequence Design and Nomenclature
                </h3>
                <p>
                  NEST uses SELP as its scaffold. SELPs are genetically
                  engineered chimeric polypeptides that combine{" "}
                  <strong>silk-like (GAGAGS)</strong> and{" "}
                  <strong>
                    elastin-like (GXGVP, where X is any amino acid except
                    proline)
                  </strong>{" "}
                  repeats and can be produced recombinantly in <em>E. coli</em>
                  <sup>
                    [
                    <a
                      href="#design-reference-1"
                      aria-label="Reference 1"
                      className="text-decoration-none"
                    >
                      1
                    </a>
                    ]
                  </sup>
                  . Silk-like blocks form β-sheets that act as physical
                  crosslinks and provide mechanical support, whereas
                  elastin-like blocks confer chain flexibility and
                  thermoresponsiveness
                  <sup>
                    [
                    <a
                      href="#design-reference-1"
                      aria-label="Reference 1"
                      className="text-decoration-none"
                    >
                      1
                    </a>
                    ]
                  </sup>
                  . Because composition and functional sites are specified by
                  the gene sequence, chain length, hydrophilic–hydrophobic
                  balance, and structural behavior can be tuned by changing the
                  number of repeats, the domain ratio, or the guest residue, and
                  new functional sites can be built directly into the scaffold
                  by inserting functional residues or short peptide tags
                  <sup>
                    [
                    <a
                      href="#design-reference-1"
                      aria-label="Reference 1"
                      className="text-decoration-none"
                    >
                      1
                    </a>
                    ]
                  </sup>
                  .
                </p>
                <p>
                  We placed three types of functional sites in the elastin-like
                  domain (Table 1.1, Figure 1.1). <strong>Lysine (K)</strong>{" "}
                  provides positive charge and strengthens electrostatic
                  interaction with the negatively charged cartilage matrix; its
                  position relative to tyrosine also affects tyrosine
                  accessibility and crosslinking reactivity
                  <sup>
                    [
                    <a
                      href="#design-reference-2"
                      aria-label="Reference 2"
                      className="text-decoration-none"
                    >
                      2
                    </a>
                    ]
                  </sup>
                  . <strong>Tyrosine (Y)</strong> serves as the
                  photocrosslinking site, enabling protein chains to be joined
                  into a network through <strong>dityrosine bonds</strong>. The{" "}
                  <strong>RGD sequence (GRGDS)</strong> provides a recognition
                  site for cell-surface integrins and supports cell adhesion
                  <sup>
                    [
                    <a
                      href="#design-reference-3"
                      aria-label="Reference 3"
                      className="text-decoration-none"
                    >
                      3
                    </a>
                    ]
                  </sup>
                  . Mechanics, tissue contact, cell recognition, and gelation
                  behavior are thus integrated into a single sequence.
                </p>
                <TableCaption>
                  <strong>
                    Table 1.1 | Design elements, key sequences, insertion
                    positions, and intended functions of the SELP scaffold.
                  </strong>
                </TableCaption>
                <div className="table-responsive mb-4">
                  <table
                    className="table table-bordered align-middle text-center"
                    aria-label="Table 1.1: SELP scaffold design elements"
                  >
                    <thead className="table-primary">
                      <tr>
                        <th scope="col" className="align-middle">
                          Design Motif
                        </th>
                        <th scope="col">Key Sequence (Residue)</th>
                        <th scope="col">Position and Design Parameters</th>
                        <th scope="col">Expected Function and Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row" className="align-middle">
                          Silk-like Motif
                        </th>
                        <td>
                          (GAGAGS)
                          <sub>
                            <em>n</em>
                          </sub>
                        </td>
                        <td>
                          Mimics the crystalline region of natural silk fibroin
                        </td>
                        <td>Forms β-sheet, provides mechanical strength</td>
                      </tr>
                      <tr>
                        <th scope="row" className="align-middle">
                          Elastin-like Motif
                        </th>
                        <td>
                          (GVGVP)
                          <sub>
                            <em>n</em>
                          </sub>
                        </td>
                        <td>
                          Mimics the hydrophobic region of natural elastin
                        </td>
                        <td>
                          Confers chain flexibility (elasticity) and
                          thermoresponsive behavior
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr className="table-primary">
                        <th colSpan={4} scope="rowgroup">
                          Functional Motif Integration
                        </th>
                      </tr>
                      <tr>
                        <th scope="row" className="align-middle">
                          Surface Charge Modulation Site
                        </th>
                        <td>Lysine (K)</td>
                        <td>2nd residue of the first elastin block</td>
                        <td>
                          Modulates surface charge; enhances electrostatic
                          interaction with negatively charged cartilage ECM
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="align-middle">
                          Photo-crosslinking Site
                        </th>
                        <td>Tyrosine (Y)</td>
                        <td>2nd residue of the fifth elastin block</td>
                        <td>
                          Enables ultrafast Ru/SPS-mediated visible
                          light-triggered crosslinking; covalently couples with
                          endogenous tyrosine
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="align-middle">
                          Cell Adhesion Sequence
                        </th>
                        <td>GRGDS sequence</td>
                        <td>Between silk fibroin and elastin domains</td>
                        <td>Provides strong cell adhesion</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  We follow the <strong>2X-m</strong> naming convention
                  <sup>
                    [
                    <a
                      href="#design-reference-4"
                      aria-label="Reference 4"
                      className="text-decoration-none"
                    >
                      4
                    </a>
                    ]
                  </sup>
                  : “2” denotes the{" "}
                  <strong>
                    fixed ratio of silk-like (S) to elastin-like (E) motifs
                  </strong>{" "}
                  in each repeat unit, “X” denotes the{" "}
                  <strong>signature residue(s)</strong> written into the
                  elastin-like domain, and “m” denotes the{" "}
                  <strong>number of repeat units</strong>. For example, 2KY-20
                  carries K and Y signature residues with 20 repeats (Figure
                  1.1).
                </p>
                <figure className="figure d-block my-4 text-center">
                  <FigureImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/design/01/01-02.avif"
                    alt="SELP scaffold sequence design and nomenclature."
                    className="figure-img img-fluid rounded"
                    style={{ width: "100%" }}
                    cropTop={0.152}
                  />
                  <FigureCaption className="figure-caption">
                    Figure 1.1 | Domain composition and sequence nomenclature of
                    SELPs. Schematic of the elastin-like, adhesion, and
                    silk-like domains; the insertion positions of functional
                    residues and of the SnoopTag2 peptide tag; and the naming of
                    representative constructs (2Y-5, 2KY-5, 2KY-20). The inset
                    table lists the ζ potential, elastic modulus (E), and
                    gelation time (GEL) of each construct. K and Y denote lysine
                    and tyrosine; RGD is the cell-adhesion motif; m is the
                    number of repeat units.
                  </FigureCaption>
                </figure>
                <h3 className="mt-5 mb-3">
                  1.2 In Situ Gelation: Ru/SPS Visible-Light Crosslinking
                </h3>
                <p>
                  Cartilage defects differ in shape and depth, so the material
                  must first flow to fill the defect and then be fixed in place.
                  Because synovial fluid continuously washes the joint cavity,
                  slow solidification could allow the precursor solution to be
                  diluted and lost before gelation; gelation therefore needs to
                  be completed within seconds. We use a{" "}
                  <strong>ruthenium/sodium persulfate (Ru/SPS)</strong>{" "}
                  visible-light initiating system: photoexcited [Ru(bpy)₃]²⁺
                  transfers an electron to persulfate, generating Ru(III), a
                  strong one-electron oxidant that oxidizes tyrosine and
                  mediates dityrosine crosslinking
                  <sup>
                    [
                    <a
                      href="#design-reference-5"
                      aria-label="Reference 5"
                      className="text-decoration-none"
                    >
                      5
                    </a>
                    ]
                  </sup>
                  . This system has been applied to silk fibroin hydrogels and
                  supports long-term culture of human articular chondrocytes
                  <sup>
                    [
                    <a
                      href="#design-reference-6"
                      aria-label="Reference 6"
                      className="text-decoration-none"
                    >
                      6
                    </a>
                    ]
                  </sup>
                  . In our system,{" "}
                  <strong>2 s of blue-light irradiation</strong> is sufficient
                  to form a covalent network from the SELP precursor (Figure
                  1.2). Injection and crosslinking are decoupled, so the
                  operator can complete filling and structural orientation
                  before triggering gelation.
                </p>
                <figure className="figure d-block my-4 text-center">
                  <FigureImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/design/01/32.avif"
                    alt="Ru/SPS-mediated visible-light crosslinking of the SELP scaffold."
                    className="figure-img img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption">
                    Figure 1.2 | Ru/SPS-mediated visible-light crosslinking and
                    in situ gelation of SELPs. Tyrosine residues on the protein
                    chains form dityrosine crosslinks under Ru/SPS and 450 nm
                    blue light, converting the SELP precursor solution into a
                    covalent network; photographs show the material before and
                    after irradiation.
                  </FigureCaption>
                </figure>
                <h3 className="mt-5 mb-3">
                  1.3 Expression, Purification, and Degradation
                </h3>
                <p>
                  Production of the scaffold also exploits its sequence
                  features. We use <em>E. coli</em> BL21(DE3) as the expression
                  host and purify SELPs by{" "}
                  <strong>inverse transition cycling (ITC)</strong>, which takes
                  advantage of their aggregation on heating and redissolution on
                  cooling to separate the target protein from contaminants by
                  temperature cycling and centrifugation, reducing the reliance
                  on chromatography
                  <sup>
                    [
                    <a
                      href="#design-reference-7"
                      aria-label="Reference 7"
                      className="text-decoration-none"
                    >
                      7
                    </a>
                    ]
                  </sup>{" "}
                  (Figure 1.3). Each functional module is prepared separately
                  and assembled according to the formulation, which facilitates
                  component quality control and later formulation adjustment.
                </p>
                <figure className="figure d-block my-4 text-center">
                  <FigureImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/design/01/01-03.avif"
                    alt="SELP expression and purification by inverse transition cycling."
                    width={1280}
                    height={896}
                    className="figure-img img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption">
                    Figure 1.3 | Purification of SELPs by inverse transition
                    cycling (ITC), exploiting their thermoresponsiveness. Cell
                    lysis is followed by heating (65 °C, 2 h) to induce SELP
                    aggregation, cooling (4 °C, overnight) to redissolve SELPs,
                    and centrifugation to remove precipitate, progressively
                    removing contaminant proteins and recovering the target
                    protein.
                  </FigureCaption>
                </figure>
                <p>
                  Regarding degradation, the SELP scaffold can{" "}
                  <strong>degrade naturally in vivo</strong>, and its
                  degradation rate slows as the number of repeat units
                  increases; the repeat number m can therefore tune both
                  mechanical properties and degradation rate, allowing design
                  adjustment according to the rate of articular cartilage
                  regeneration. The rate at which the material disappears must
                  match the rate of new cartilage deposition, whereas a
                  long-term non-degradable implant would continuously activate
                  M1 macrophages and prevent cartilage regeneration.
                  Degradability is thus precisely the functional property that
                  allows the material to be progressively replaced by new
                  tissue.
                </p>
                <h3 className="mt-5 mb-3">
                  1.4 Sequence–Structure–Property Modeling
                </h3>
                <p>
                  A sequence specifies composition but does not by itself
                  describe how multiple crosslinked chains bear load. We
                  therefore simulate five variables:
                </p>
                <ol>
                  <li>
                    the effect of repeat number on{" "}
                    <strong>chain length and mechanical strength</strong>;
                  </li>
                  <li>
                    the effect of the silk-to-elastin ratio on the{" "}
                    <strong>
                      transition temperature (<em>T</em>
                      <sub>t</sub>)
                    </strong>
                    ;
                  </li>
                  <li>
                    the effect of substituting the X residue on the{" "}
                    <strong>
                      hydrophilic–hydrophobic balance and structural stability
                    </strong>
                    ;
                  </li>
                  <li>
                    the effect of the number and exposure of crosslinking sites
                    on <strong>gelation rate and network formation</strong>;
                  </li>
                  <li>
                    the <strong>reverse regulation of material behavior</strong>{" "}
                    by the insertion position of functional sites.
                  </li>
                </ol>
                <p>
                  The computational pipeline has two steps.{" "}
                  <strong>All-atom molecular dynamics (MD) simulations</strong>{" "}
                  track chain conformations, segment interactions, and the
                  spatial state of functional sites; representative
                  conformations are then converted into a{" "}
                  <strong>coarse-grained (CG) model</strong> and extended to{" "}
                  <strong>multi-chain crosslinked networks,</strong> in which
                  small deformations are applied and the stress response is
                  analyzed, linking the structural behavior of single chains to
                  the mechanical properties of the network
                  <sup>
                    [
                    <a
                      href="#design-reference-1"
                      aria-label="Reference 1"
                      className="text-decoration-none"
                    >
                      1
                    </a>
                    ]
                  </sup>
                  . Rheological and other wet-lab data are used to{" "}
                  <strong>calibrate and test the model</strong>. This workflow
                  allows representative candidate sequences to be screened
                  before experiments, reduces unproductive trial and error, and
                  progressively builds a sequence–structure–property map,
                  yielding a standardized design process.
                </p>
                <h2
                  id="2-standardized-interface-decoupling-functional-assembly-from-scaffold-design"
                  className="mt-5 mb-4"
                >
                  2 Standardized Interface: Decoupling Functional Assembly from
                  Scaffold Design
                </h2>
                <h3 className="mt-5 mb-3">
                  2.1 The SnoopLigase Peptide–Peptide Ligation System
                </h3>
                <p>
                  If SELP addresses how the scaffold supports load and responds
                  to its environment, the interface addresses how functional
                  units are{" "}
                  <strong>
                    connected to the scaffold in a controllable, reproducible,
                    and extensible way
                  </strong>
                  . In NEST the interface is not an accessory modification but
                  the key to <strong>modularity</strong>: the material body
                  stays constant while external functions are changed according
                  to the task.
                </p>
                <p>
                  We use the{" "}
                  <strong>
                    SnoopLigase2/
                    <wbr />
                    SnoopTag2/
                    <wbr />
                    DogTag peptide–peptide ligation system
                  </strong>
                  . It derives from the domain split of the{" "}
                  <em>Streptococcus pneumoniae</em> adhesin RrgA; SELP carries
                  SnoopTag2, functional components carry DogTag, and
                  SnoopLigase2 catalyzes the formation of a stable covalent
                  isopeptide bond
                  <sup>
                    [
                    <a
                      href="#design-reference-8"
                      aria-label="Reference 8"
                      className="text-decoration-none"
                    >
                      8
                    </a>
                    ,{" "}
                    <a
                      href="#design-reference-9"
                      aria-label="Reference 9"
                      className="text-decoration-none"
                    >
                      9
                    </a>
                    ]
                  </sup>
                  . Short peptide tags can be placed at predetermined positions
                  by genetic fusion, providing a defined interface for
                  functional assembly (Figure 2.1).
                </p>
                <figure className="figure d-block my-4 text-center">
                  <FigureImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/design/01/01-04.avif"
                    alt="SnoopLigase-mediated ligation between the SELP scaffold and functional components."
                    width={1280}
                    height={1280}
                    maxWidth={520}
                    className="figure-img img-fluid rounded"
                    style={{ width: "70%" }}
                  />
                  <FigureCaption className="figure-caption">
                    Figure 2.1 | Structural origin of the Snoop ligation system.
                    SnoopTagJr/DogTag are illustrated as derived from the split
                    of the RrgA domain; NEST assembly uses the SnoopTag2/DogTag
                    interface.
                  </FigureCaption>
                </figure>
                <p>
                  Building on the first-generation system, we performed directed
                  evolution and rational design to obtain the{" "}
                  <strong>SnoopLigase-ZJU system</strong>, whose ligation rate
                  is more than three orders of magnitude higher than that of the
                  first generation; coupling is completed within minutes at room
                  temperature in standard PBS (pH 7.4), and activity is retained
                  at 4–45 °C, pH 4–10, and up to 1 M NaCl. This allows interface
                  assembly to be embedded directly in the main process flow of
                  "expression, ITC purification, assembly, precursor
                  formulation, injection, and photocrosslinking" without a
                  separately designed buffer system.
                </p>
                <p>
                  After ligation, the product reconstitutes a conformation
                  resembling the native RrgA domain and binds the ligase very
                  tightly, so that SnoopLigase2 behaves as a single-turnover
                  catalyst that remains bound to the ligated product
                  <sup>
                    [
                    <a
                      href="#design-reference-9"
                      aria-label="Reference 9"
                      className="text-decoration-none"
                    >
                      9
                    </a>
                    ]
                  </sup>
                  . Notably, through modeling, we have overcome this inherent
                  limitation and achieved multiple turnovers of SnoopLigase,{" "}
                  <strong>
                    converting it from a stoichiometric reagent into a true
                    multi-turnover catalyst
                  </strong>
                  .
                </p>
                <h3 className="mt-5 mb-3">
                  2.2 Interface Placement and Functional Assembly
                </h3>
                <p>
                  Interface position determines loading mode: terminal
                  interfaces are convenient to{" "}
                  <strong>construct and characterize</strong>, whereas
                  interfaces between repeat units{" "}
                  <strong>make loading density a programmable parameter</strong>
                  . Functional assembly is completed before injection, and
                  photocrosslinking then fixes the whole network; the former
                  determines which functions the scaffold carries, and the
                  latter determines where and in what form the material remains.
                  To test whether the interface can be introduced extensibly
                  into the SELP monomer, we designed three sets of validation
                  constructs (Figure 2.2):
                </p>
                <ol className="mb-4">
                  <li className="mb-3">
                    SnoopTag2 is placed{" "}
                    <strong>at the N terminus or the C terminus</strong> of
                    SELP; with a single interface per chain, coupling efficiency
                    is straightforward to quantify;
                  </li>
                  <li className="mb-3">
                    SnoopTag2 is inserted <strong>between repeat units</strong>,
                    so that the loading density of functional modules becomes a
                    programmable parameter set by the insertion spacing;
                  </li>
                  <li className="mb-3">
                    A second <strong>orthogonal channel</strong>, the SpyLigase
                    system
                    <sup>
                      [
                      <a
                        href="#design-reference-10"
                        aria-label="Reference 10"
                        className="text-decoration-none"
                      >
                        10
                      </a>
                      ]
                    </sup>
                    , is introduced in addition to the SnoopLigase-ZJU system,
                    upgrading the interface layer from a single interface to an
                    extensible interface standard. Because the two systems are
                    mutually orthogonal, replacing some scaffold interfaces with
                    SpyTag and fusing specific functional modules to KTag allows
                    the two classes of functional units to be assembled onto the
                    same scaffold sequentially and quantitatively.
                  </li>
                </ol>
                <figure className="figure d-block my-4 text-center">
                  <FigureImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/design/01/33.avif"
                    alt="Interface placement and functional assembly designs for the SELP scaffold."
                    className="figure-img img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption">
                    Figure 2.2 | Placement of standardized interfaces and
                    strategies for assembling functional modules. Top: terminal
                    insertion, dual-terminal interfaces, inter-domain insertion,
                    and two orthogonal channels, extending the interface layer
                    from a single interface to an interface standard. Bottom:
                    pluggable functional modules (e.g., Fe₃O₄-binding, GAG
                    retention, and cargo) connect through interfaces such as
                    DogTag.
                  </FigureCaption>
                </figure>
                <p>
                  The properties of the scaffold and the assembly of its
                  functions are thereby decoupled: the scaffold remains{" "}
                  <strong>stable and computable</strong>, whereas functions are
                  added afterwards, replaced, and iterated as{" "}
                  <strong>standardized units</strong>.
                </p>
              </>
            }
            functionContent={
              <>
                <h2 className="mt-5 mb-4">
                  3 Our Solution to the Vicious Cycle of Osteoarthritis
                </h2>
                <h3 className="mt-5 mb-3">
                  3.1 Assigning Modules from the Pathological Cycle
                </h3>
                <p>
                  Osteoarthritis (OA) is a progressive degenerative joint
                  disease often accompanied by pain, restricted mobility, and
                  declining joint function. Global burden-of-disease analyses
                  estimate that about 607 million people had OA in 2021
                  <sup>
                    [
                    <a
                      href="#design-reference-11"
                      aria-label="Reference 11"
                      className="text-decoration-none"
                    >
                      11
                    </a>
                    ]
                  </sup>
                  . We consulted Prof. Hongwei Ouyang of Zhejiang University
                  about NEST. He has long worked on articular cartilage tissue
                  engineering and regenerative medicine, including clinical
                  transplantation of tissue-engineered articular cartilage. He
                  suggested that repair must go beyond defect filling to address
                  the persistent degenerative microenvironment, coordinate
                  material degradation with new tissue formation, and integrate
                  reliably with surrounding cartilage. This shifted our design
                  question from “how to fill a cartilage defect” to “how to cope
                  with a continuously deteriorating local microenvironment.”
                  Alongside an injectable, in-situ-formable biomimetic scaffold,
                  NEST therefore needs distinct modules to address the
                  interrelated problems of mechanical imbalance, matrix loss,
                  and impaired cell function.
                </p>
                <p>
                  In healthy cartilage, the zonal arrangement of collagen
                  fibrils, the proteoglycan-rich ECM, and chondrocytes maintain
                  load bearing and homeostasis. In OA, microdamage and abnormal
                  loading promote matrix breakdown; loss of glycosaminoglycans
                  (GAGs) reduces the fixed charge density, hydration, and
                  compressive resistance; and inflammatory signaling and
                  cellular dysfunction suppress matrix synthesis and accelerate
                  degradation. In this cycle, increasing material stiffness
                  alone or supplementing a single matrix component may not
                  change the local degenerative trajectory.
                </p>
                <p>
                  NEST maps this cycle onto three cooperating but
                  mechanistically distinct design goals:
                </p>
                <p>
                  <strong>Module 1</strong> uses a magnetically responsive
                  component to guide the formation of directional structure in
                  the scaffold, addressing mechanical imbalance;{" "}
                </p>
                <p>
                  <strong>Module 2</strong> combines CPC and Link-N to regulate
                  local retention and renewal of GAG/hyaluronan-related
                  matrix;{" "}
                </p>
                <p>
                  <strong>Module 3</strong> uses an enzyme-responsive linker to
                  control the attachment of mitochondria-loaded liposomes to the
                  scaffold, exploring local delivery of cellular metabolic
                  support. The rationale, implementation, and validation
                  boundaries of each module are described below.
                </p>
                <h3
                  id="3-2-module-1-magnetically-responsive-anisotropy-directional-load-bearing"
                  className="mt-5 mb-3"
                >
                  3.2 Module 1 | Magnetically Responsive Anisotropy Module: Directional
                  Load Bearing
                </h3>
                <h4 className="mt-4 mb-3">
                  3.2.1 Biomimetic Rationale and Design Concept
                </h4>
                <p>
                  The collagen fibrils of native articular cartilage are
                  organized in zones:{" "}
                  <strong>
                    fibrils in the superficial zone run largely parallel to the
                    joint surface, those in the deep zone tend to be
                    perpendicular to it, and the middle zone provides a
                    transition
                  </strong>
                  <sup>
                    [
                    <a
                      href="#design-reference-12"
                      aria-label="Reference 12"
                      className="text-decoration-none"
                    >
                      12
                    </a>
                    ]
                  </sup>{" "}
                  (Figure 3.2.1). This spatial organization gives cartilage
                  direction-dependent mechanical responses and, together with
                  the water- and proteoglycan-rich matrix, bears load. Cartilage
                  function therefore depends not only on what the tissue is made
                  of but also on how its components are arranged. Through
                  biomimicry of the internal structure, we aim to
                  <strong>
                    {" "}
                    introduce controllable alignment into the material
                  </strong>
                  , investigate whether it can improve direction-dependent
                  mechanical performance, and provide spatial guidance for cells
                  and subsequent matrix tissue formation.
                </p>
                <figure className="figure d-block my-4 text-center">
                  <FigureImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/design/02/01.avif"
                    alt="Native articular cartilage architecture and the directional organization of collagen bundles."
                    className="figure-img img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption">
                    Figure 3.2.1 | Native articular cartilage architecture and
                    the directional organization that serves as the biomimetic
                    reference. Schematic of the position of articular cartilage
                    in the joint and the zonal organization and spatial
                    orientation of collagen bundles within the cartilage matrix,
                    showing that cartilage function depends not only on matrix
                    composition but also on spatial arrangement. This
                    architecture provides a biomimetic reference for NEST in
                    exploring directional load bearing.
                  </FigureCaption>
                </figure>
                <h4 className="mt-4 mb-3">
                  3.2.2 Magnetically Guided Gelation
                </h4>
                <p>
                  Accordingly, building on the three-dimensional support
                  provided by the SELP scaffold, we introduce{" "}
                  <strong>
                    a Magnetically Responsive Anisotropy Module consisting of Fe₃O₄
                    magnetic nanoparticles (MNPs) and a binding peptide.
                  </strong>{" "}
                  First, the SELP precursor solution, already conjugated with
                  the magnetic component, is injected into the defect. While the
                  network is still flowable, a magnetic field is applied to{" "}
                  <strong>
                    guide the orientation of the MNPs and SELP structures
                  </strong>
                  . Visible-light crosslinking is then performed while the
                  target orientation is maintained: the magnetic field provides
                  the alignment direction, whereas crosslinking fixes the
                  anisotropy (Figure 3.2.2).
                </p>
                <figure className="figure d-block my-4 text-center">
                  <FigureImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/design/02/002.avif"
                    alt="Magnetically guided orientation and visible-light gelation of the SELP scaffold."
                    className="figure-img img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption">
                    Figure 3.2.2 | Design schematic of how the magnetically
                    responsive component and an external magnetic field jointly
                    establish internal orientation in the scaffold. After
                    injection of the SELP precursor containing the magnetically
                    responsive component into the defect, an external magnetic
                    field aligns the particles and the structures coupled to
                    them, and subsequent photocrosslinking fixes the material
                    network.
                  </FigureCaption>
                </figure>
                <h4 className="mt-4 mb-3">
                  3.2.3 Molecular Coupling of Magnetic Particles to the Scaffold
                </h4>
                <p>
                  Magnetic particles respond to an external field, but merely
                  mixing them into the precursor solution does not ensure that
                  particle motion will drive the protein network into an ordered
                  structure. We therefore need a molecular linkage between the
                  magnetic particles and the SELP scaffold, to connect the
                  magnetic response of the particles to material assembly. For
                  this purpose we chose the heptapeptide TVNFKLY as the
                  Fe₃O₄-binding motif. The original study verified the
                  Fe₃O₄-binding ability of TVNFKLY and found that the particles
                  retained their magnetic properties after peptide modification,
                  providing a basis for using it to link proteins to magnetic
                  particles
                  <sup>
                    [
                    <a
                      href="#design-reference-13"
                      aria-label="Reference 13"
                      className="text-decoration-none"
                    >
                      13
                    </a>
                    ]
                  </sup>
                  .
                </p>
                <p>
                  We integrate TVNFKLY and DogTag into a single fusion protein
                  with two linking tasks:{" "}
                  <strong>the TVNFKLY end binds Fe₃O₄ particles</strong>, and
                  the{" "}
                  <strong>
                    dogtag end forms a covalent isopeptide bond with SnoopTag2
                    on SELP{" "}
                  </strong>
                  via the SnoopLigase system of this project. A flexible linker
                  provides spacing, intended to reduce the influence of
                  neighboring structures on motif exposure and target access
                  (Figure 3.2.3).
                </p>
                <figure className="figure d-block my-4 text-center">
                  <FigureImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/design/02/03.avif"
                    alt="Molecular coupling of magnetic particles to the SELP scaffold."
                    className="figure-img img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption">
                    Figure 3.2.3 | Molecular design for coupling magnetic
                    nanoparticles to the SELP scaffold via TVNFKLY. TVNFKLY
                    binds Fe₃O₄, and the DogTag on the fusion protein forms a
                    covalent linkage with SnoopTag2 on SELP in the presence of
                    the ligase, thereby attaching the magnetically responsive
                    component to the protein scaffold.
                  </FigureCaption>
                </figure>
                <h4 className="mt-4 mb-3">
                  3.2.4 Magneto-Mechanical Coupling Model
                </h4>
                <p>
                  We built a coupled magneto-mechanical model to compare the
                  potential effects of magnetic field conditions, particle
                  distribution, and network orientation on stress, deformation,
                  and aqueous-phase flow in the material, and to help design the
                  external magnetic device and the illumination protocol (Figure
                  3.2.4).
                </p>
                <figure className="figure d-block my-4 text-center">
                  <FigureImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/design/02/004.avif"
                    alt="Magneto-mechanical coupling model of the magnetic nanoparticle-containing hydrogel."
                    className="figure-img img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption">
                    Figure 3.2.4 | Magneto-mechanical coupling model: multiscale
                    analysis from magnetic field distribution to material
                    response. Magnetic field distribution, the spatial
                    orientation of magnetic particles and their coupled
                    structures, and the modeling approach that uses orientation
                    information to analyze stress, deformation, and
                    aqueous-phase flow.
                  </FigureCaption>
                </figure>
                <h3
                  id="3-3-module-2-cpc-link-n-maintaining-matrix-retention-and-renewal"
                  className="mt-5 mb-3"
                >
                  3.3 Module 2 | GAG Retention Module: Maintaining Matrix Retention and
                  Renewal
                </h3>
                <h4 className="mt-4 mb-3">
                  3.3.1 GAG Loss and Fixed Charge Density
                </h4>
                <p>
                  Sulfated GAGs such as chondroitin sulfate and keratan sulfate
                  are densely attached to aggrecan, which forms
                  aggrecan–hyaluronan (HA) complexes; together they create an
                  environment with a fixed negative charge that sustains the
                  osmotic pressure, hydration, and compressive resistance of the
                  tissue
                  <sup>
                    [
                    <a
                      href="#design-reference-14"
                      aria-label="Reference 14"
                      className="text-decoration-none"
                    >
                      14
                    </a>
                    ]
                  </sup>
                  . Mechanistically, fixed negative charges attract mobile
                  cations (e.g., Na⁺), generating a Donnan osmotic pressure that
                  drives water into the tissue and produces a swelling pressure,
                  thereby increasing the compressive modulus (Figure 3.3.1).
                  Loss of GAG lowers the fixed charge density and weakens the
                  ability of cartilage to resist compression
                  <sup>
                    [
                    <a
                      href="#design-reference-14"
                      aria-label="Reference 14"
                      className="text-decoration-none"
                    >
                      14
                    </a>
                    ]
                  </sup>
                  .
                </p>
                <figure className="figure d-block my-4 text-center">
                  <FigureImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/design/03/01.avif"
                    alt="Glycosaminoglycan loss and fixed charge density in cartilage."
                    className="figure-img img-fluid rounded"
                    style={{ width: "100%" }}
                    cropTop={0.138}
                  />
                  <FigureCaption className="figure-caption">
                    Figure 3.3.1 | Mechanism of CPC-associated water retention
                    and osmotic pressure build-up. Negatively charged groups on
                    GAG chains, the electrostatic complexes they form with
                    multiple positively charged sites on CPC, and the Donnan
                    equilibrium among fixed charges, mobile cations (Na⁺), and
                    water molecules: high osmotic pressure → massive water
                    influx → higher swelling pressure → higher water content →
                    higher compressive modulus.
                  </FigureCaption>
                </figure>
                <h4 className="mt-4 mb-3">
                  3.3.2 CPC: Reversible Binding to Sulfated GAG
                </h4>
                <p>
                  To protect this load-bearing foundation, we attach a cationic
                  peptide carrier (CPC) and Link-N to SELP. The two have
                  complementary roles:{" "}
                  <strong>
                    CPC focuses on interaction with sulfated GAG, whereas Link-N
                    focuses on HA-related matrix retention and support of matrix
                    synthesis.
                  </strong>
                </p>
                <p>
                  CPCs are short arginine-rich peptides that exploit the high
                  fixed charge density (FCD) of cartilage, allowing positively
                  charged carriers to penetrate rapidly and be retained within
                  cartilage
                  <sup>
                    [
                    <a
                      href="#design-reference-15"
                      aria-label="Reference 15"
                      className="text-decoration-none"
                    >
                      15
                    </a>
                    ]
                  </sup>
                  . The sequence of CPC+14A is RRRR(AARRR)₃R. Arginine supplies
                  the positive charge, alanine serves as a spacer residue that
                  disperses the cationic sites, and the guanidinium group of the
                  arginine side chain also participates in short-range
                  interactions with sulfated GAG. Previous CPC studies have
                  shown that charge design must balance attraction with
                  reversible binding, and more positive charge is not
                  necessarily better. This molecular rationale supports our
                  choice of CPC+14A rather than merely increasing the overall
                  positive charge of the material
                  <sup>
                    [
                    <a
                      href="#design-reference-15"
                      aria-label="Reference 15"
                      className="text-decoration-none"
                    >
                      15
                    </a>
                    ]
                  </sup>
                  .
                </p>
                <p>
                  Anchoring CPC on the scaffold creates spatially confined
                  cationic binding sites in the repair region. The scaffold
                  retains the functional peptide, and the exposed CPC interacts
                  reversibly with GAG (Figure 3.3.2):
                </p>
                <div
                  className="design-binding-equation"
                  role="math"
                  aria-label="Positively charged SELP–CPC plus negatively charged GAG reversibly forms an SELP–CPC and GAG complex."
                >
                  <div className="design-equation-wide">
                    <MathFormula display>
                      {String.raw`\mathrm{SELP\text{–}CPC}^{+} + \mathrm{GAG}^{-} \rightleftharpoons \mathrm{SELP\text{–}CPC}^{+}\!\cdots\!\mathrm{GAG}^{-}`}
                    </MathFormula>
                  </div>
                  <div className="design-equation-compact">
                    <MathFormula display>
                      {String.raw`\begin{gathered}\mathrm{SELP\text{–}CPC}^{+} + \mathrm{GAG}^{-}\\[-0.1em]\rightleftharpoons \mathrm{SELP\text{–}CPC}^{+}\!\cdots\!\mathrm{GAG}^{-}\end{gathered}`}
                    </MathFormula>
                  </div>
                </div>
                <p>
                  This design reduces GAG loss while preserving dynamic matrix
                  exchange, converting CPC from a free carrier into a
                  matrix-binding component of the network.
                </p>
                <figure className="figure d-block my-4 text-center">
                  <FigureImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/design/03/02.avif"
                    alt="Reversible binding of scaffold-anchored CPC to sulfated glycosaminoglycans."
                    className="figure-img img-fluid rounded"
                    style={{ width: "100%" }}
                    cropTop={0.102}
                  />
                  <FigureCaption className="figure-caption">
                    Figure 3.3.2 | Electrostatic interaction between CPC and GAG
                    and the matrix-retention design. CPC anchored on the SELP
                    scaffold interacts reversibly with negatively charged GAG,
                    increasing the fixed charge density of the system; the
                    schematic also shows the expected links between this design
                    and local matrix retention, hydration, swelling pressure,
                    and compressive performance.
                  </FigureCaption>
                </figure>
                <h4 className="mt-4 mb-3">
                  3.3.3 Link-N and Assembly of the Dual-Function Module
                </h4>
                <p>
                  Link-N (DHLSDNYTLDHDRAIH) is a 16-amino-acid fragment from the
                  N terminus of cartilage link protein, generated by proteolytic
                  cleavage of link protein. It has been reported to stimulate
                  proteoglycan and type II collagen synthesis by human articular
                  cartilage
                  <sup>
                    [
                    <a
                      href="#design-reference-16"
                      aria-label="Reference 16"
                      className="text-decoration-none"
                    >
                      16
                    </a>
                    ,{" "}
                    <a
                      href="#design-reference-17"
                      aria-label="Reference 17"
                      className="text-decoration-none"
                    >
                      17
                    </a>
                    ]
                  </sup>{" "}
                  and to increase the expression of SOX9, aggrecan, and collagen
                  II in three-dimensional cultures of rat cartilage
                  stem/progenitor cells (CSPCs)
                  <sup>
                    [
                    <a
                      href="#design-reference-18"
                      aria-label="Reference 18"
                      className="text-decoration-none"
                    >
                      18
                    </a>
                    ]
                  </sup>
                  , providing a biological basis for supporting matrix renewal.{" "}
                  <strong>
                    Studies of immobilized Link-N provide a basis for local
                    retention: in poly(ethylene glycol) (PEG) hydrogels,
                    covalently tethered Link-N reduced the loss of entrapped
                    hyaluronan under dynamic compression by about 60%
                    <sup>
                      [
                      <a
                        href="#design-reference-19"
                        aria-label="Reference 19"
                        className="text-decoration-none"
                      >
                        19
                      </a>
                      ]
                    </sup>
                    .
                  </strong>{" "}
                  We therefore configure Link-N as an HA-related
                  matrix-regulating component that complements CPC, which
                  focuses on sulfated GAG.
                </p>
                <p>
                  For molecular assembly, a flexible hydrophilic spacer such as
                  GGSGG is introduced between CPC and Link-N to reduce local
                  charge and steric interference and to increase exposure of the
                  functional sites in the aqueous phase. The components are
                  attached to SELP through site-specific ligation before
                  injection, enter the defect with the scaffold, and are fixed
                  by in situ crosslinking (Figure 3.3.3). Structural support and
                  matrix protection thus occur within the same network, jointly
                  intervening in the feedback loop of matrix loss, reduced load
                  bearing, and aggravated damage.
                </p>
                <figure className="figure d-block my-4 text-center">
                  <FigureImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/design/03/04.avif"
                    alt="Assembly of the CPC and Link-N dual-function module onto the SELP scaffold."
                    maxWidth={700}
                    className="figure-img img-fluid rounded"
                    style={{ width: "88%" }}
                  />
                  <FigureCaption className="figure-caption">
                    Figure 3.3.3 | Design of the GAG Retention Module (CPC/Link-N)
                    attached to the SELP scaffold. Assembly of a
                    dogtag–CPC–linker–Link-N fusion protein onto SELP through
                    the standardized SnoopTag2/dogtag interface. CPC focuses on
                    interaction with sulfated GAG; Link-N supports HA-related
                    matrix retention and matrix synthesis.
                  </FigureCaption>
                </figure>
                <h3
                  id="3-4-module-3-mmp-13-responsive-mitochondrial-delivery-linking-local-response-to-cellular-support"
                  className="mt-5 mb-3"
                >
                  3.4 Module 3 | Mitochondrial Therapeutic Module:
                  Linking Local Response to Cellular Support
                </h3>
                <h4 className="mt-4 mb-3">3.4.1 Design Rationale and Goals</h4>
                <p>
                  Repair after cartilage injury requires not only a suitable
                  extracellular supporting environment but also depends on the
                  metabolic state of chondrocytes. The activity of respiratory
                  chain complexes is altered in OA chondrocytes, suggesting that
                  mitochondrial dysfunction contributes to cartilage
                  degeneration
                  <sup>
                    [
                    <a
                      href="#design-reference-20"
                      aria-label="Reference 20"
                      className="text-decoration-none"
                    >
                      20
                    </a>
                    ]
                  </sup>
                  .
                </p>
                <p>
                  Delivery of exogenous mitochondria offers a potential route to
                  improve this state. In an OA rat model and in patient-derived
                  chondrocytes, mitochondrial transplantation improved
                  mitochondrial function indices such as membrane potential and
                  oxygen consumption rate and reduced the expression of
                  inflammation- and catabolism-related genes, including IL-1β,
                  TNF-α, and MMP-13
                  <sup>
                    [
                    <a
                      href="#design-reference-21"
                      aria-label="Reference 21"
                      className="text-decoration-none"
                    >
                      21
                    </a>
                    ]
                  </sup>
                  . A further study encapsulated mitochondria in fusogenic
                  liposomes and reported, within the systems tested, faster and
                  more efficient delivery to chondrocytes than with naked
                  mitochondria, together with reduced inflammatory cytokines and
                  MMP-13, increased expression of matrix components, and
                  cartilage regeneration
                  <sup>
                    [
                    <a
                      href="#design-reference-22"
                      aria-label="Reference 22"
                      className="text-decoration-none"
                    >
                      22
                    </a>
                    ]
                  </sup>
                  ; this provides a basis for engineered mitochondrial delivery.
                </p>
                <p>
                  Building on these studies, we introduce an exogenous
                  mitochondrial delivery strategy on top of the structural
                  support provided by the SELP hydrogel. By combining an
                  engineered responsive protein with functionalized liposomes,
                  we build a system organized around “local anchoring,
                  enzyme-responsive detachment, and cellular delivery”, aiming
                  to provide metabolic support to damaged chondrocytes and to
                  explore its potential to promote cartilage repair (Figure
                  3.4.1).
                </p>
                <figure className="figure d-block my-4 text-center">
                  <FigureImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/design/04/01.avif"
                    alt="Design concept for locally anchored, enzyme-responsive mitochondrial delivery."
                    className="figure-img img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption">
                    Figure 3.4.1 | Overall design of the MMP-13-responsive
                    Mitochondrial Therapeutic Module. Three stages are shown: local
                    anchoring, detachment of the responsive linker, and cellular
                    delivery. Liposomes carrying exogenous mitochondria are
                    anchored to the SELP hydrogel through a linker; after the
                    responsive region is cleaved by MMP-13, the carrier is
                    expected to separate from the scaffold, and its ability to
                    deliver cargo to chondrocytes is further explored.
                  </FigureCaption>
                </figure>
                <h4 className="mt-4 mb-3">
                  3.4.2 Design of the Responsive Protein
                </h4>
                <p>
                  The linkage between the mitochondrial carrier and the scaffold
                  must balance local retention with subsequent release. We
                  therefore designed an engineered short peptide that contains a
                  cysteine (Cys) coupling site, an MMP-responsive sequence, and
                  a dogtag, integrating liposome attachment, enzyme-sensitive
                  cleavage, and scaffold anchoring in one molecule. From the N
                  to the C terminus it reads Cys–GGGGS–responsive
                  segment–GGGGS–dogtag, with the two GGGGS segments serving as
                  flexible spacers (Figure 3.4.2).
                </p>
                <p>
                  On the scaffold side, we use the SnoopLigase-mediated ligation
                  system. The enzyme catalyzes covalent isopeptide bond
                  formation between dogtag and SnoopTag2, providing a molecular
                  tool for modular assembly of protein components
                  <sup>
                    [
                    <a
                      href="#design-reference-8"
                      aria-label="Reference 8"
                      className="text-decoration-none"
                    >
                      8
                    </a>
                    ,{" "}
                    <a
                      href="#design-reference-9"
                      aria-label="Reference 9"
                      className="text-decoration-none"
                    >
                      9
                    </a>
                    ]
                  </sup>
                  . In this design, dogtag on the linker peptide pairs with
                  SnoopTag2 on SELP, so that the carrier can be attached to the
                  hydrogel network through a preset interface.
                </p>
                <p>
                  On the carrier side, the thiol of Cys reacts with the
                  maleimide groups on the liposome surface to establish a
                  covalent linkage between the linker peptide and the liposome
                  <sup>
                    [
                    <a
                      href="#design-reference-23"
                      aria-label="Reference 23"
                      className="text-decoration-none"
                    >
                      23
                    </a>
                    ]
                  </sup>
                  . The MMP-responsive sequence lies between the two linking
                  ends as a cleavable region, enabling responsive detachment of
                  the carrier from the scaffold; its target enzyme, MMP-13, is
                  detected in OA cartilage and chondrocytes and has strong type
                  II collagenolytic activity
                  <sup>
                    [
                    <a
                      href="#design-reference-24"
                      aria-label="Reference 24"
                      className="text-decoration-none"
                    >
                      24
                    </a>
                    ]
                  </sup>
                  .
                </p>
                <p>
                  The experimental group uses RRGPLGLSLGKR and the control group
                  uses the scrambled sequence RKGLSLGLPGRR, with all other
                  linker elements retained. The two sequences have identical
                  length and amino acid composition and differ only in residue
                  order, allowing the effect of sequence arrangement on cleavage
                  to be compared.
                </p>
                <p>
                  To facilitate production of the functional peptide, the
                  expression precursor uses a His/SUMO fusion design. SUMO
                  fusion has been used to improve the expression and solubility
                  of some recombinant proteins
                  <sup>
                    [
                    <a
                      href="#design-reference-25"
                      aria-label="Reference 25"
                      className="text-decoration-none"
                    >
                      25
                    </a>
                    ]
                  </sup>
                  . A TEV protease site is added separately and is designed to
                  be cleaved at ENLYFQ↓C to remove the expression tag; the
                  released peptide retains the N-terminal Cys, which mediates
                  carrier attachment and responsive release.
                </p>
                <figure className="figure d-block my-4 text-center">
                  <FigureImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/design/04/02.avif"
                    alt="Responsive peptide design linking liposome attachment, enzyme-sensitive cleavage, and scaffold anchoring."
                    className="figure-img img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption">
                    Figure 3.4.2 | Expression precursor and control design of
                    the responsive linker peptide. (A) Functional regions of the
                    His/SUMO fusion precursor and the TEV cleavage design; after
                    cleavage at ENLYFQ↓C, the target peptide is expected to
                    retain the N-terminal Cys. (B) The experimental peptide and
                    the scrambled control both retain Cys, the GGGGS spacers,
                    and dogtag; the variable regions are RRGPLGLSLGKR and
                    RKGLSLGLPGRR, which have identical length and amino acid
                    composition and differ only in residue order.
                  </FigureCaption>
                </figure>
                <h4 className="mt-4 mb-3">
                  3.4.3 Design of the Liposomal Delivery System
                </h4>
                <p>
                  As the carrier interface between the mitochondria and the
                  scaffold, the liposome must combine organelle-delivery
                  potential with surface-conjugation capability. Fusogenic
                  liposomes have been reported to improve delivery of exogenous
                  mitochondria to chondrocytes, providing a direct reference for
                  this carrier strategy
                  <sup>
                    [
                    <a
                      href="#design-reference-22"
                      aria-label="Reference 22"
                      className="text-decoration-none"
                    >
                      22
                    </a>
                    ]
                  </sup>
                  . Taking the scaffold-attachment requirement into account, we
                  selected DOPE, DOTAP, and DSPE-PEG-Mal to build functionalized
                  liposomes. DOPE supports inter-membrane interaction and
                  fusion, and DOTAP provides cationic character; their
                  combination is intended to promote interaction between the
                  carrier and biological membranes. The design draws on the
                  delivery rationale of fusogenic liposomes, and the fusion
                  efficiency and delivery performance of the specific
                  formulation must be evaluated in our system.
                </p>
                <p>
                  DSPE-PEG-Mal provides surface functionalization: its
                  hydrophobic lipid chains insert into the lipid bilayer, and
                  PEG acts as a spacer arm that presents the maleimide group
                  outward, providing a coupling site for the engineered peptide.
                  Through this interface, the liposome can be linked to the
                  protein ligation system
                  <sup>
                    [
                    <a
                      href="#design-reference-23"
                      aria-label="Reference 23"
                      className="text-decoration-none"
                    >
                      23
                    </a>
                    ]
                  </sup>
                  .
                </p>
                <p>
                  The functionalized liposomes are assembled with exogenous
                  mitochondria to form a composite for mitochondrial protection
                  and cellular delivery. After attachment of the responsive
                  peptide, the carrier is anchored to the SELP network through
                  the dogtag–SnoopTag2 interface, so that the hydrogel provides
                  structural support and also serves as a local loading platform
                  for the mitochondrial carrier (Figure 3.4.3A). After MMP-13
                  cleaves the responsive region, the liposome-side and
                  scaffold-side linker fragments separate, and the carrier is
                  expected to detach from the hydrogel network (Figure 3.4.3B).
                </p>
                <figure className="figure d-block my-4 text-center">
                  <FigureImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/design/04/03.avif"
                    alt="Liposomal mitochondrial delivery system showing scaffold anchoring and enzyme-responsive detachment."
                    className="figure-img img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption">
                    Figure 3.4.3 | Assembly interface between liposome and
                    scaffold, and the responsive detachment mechanism. (A)
                    Functionalized liposomes composed of DOPE, DOTAP, and
                    DSPE-PEG-Mal are coupled through the maleimide group to the
                    N-terminal Cys of the responsive peptide (thiol–maleimide
                    coupling) and then linked to the SELP network through the
                    dogtag/SnoopTag2 interface. (B) After MMP-13 cleaves the
                    responsive region, the liposome-side and scaffold-side
                    linker fragments separate, and the carrier is expected to be
                    uncoupled from the hydrogel network.
                  </FigureCaption>
                </figure>
              </>
            }
            wholeProcess={
              <>
                <h2
                  id="4-whole-process-system-from-formulation-to-structure-formation-in-the-defect"
                  className="mt-5 mb-4"
                >
                  4 Whole-Process System: From Formulation to Structure
                  Formation in the Defect
                </h2>
                <p>
                  Material function must be realized at the right place and
                  through the right process. NEST therefore divides tabletop
                  formulation and local operation into two interconnected units
                  and uses software to organize formulation, state, and
                  operation information. The hardware is not an accessory to the
                  material but the execution step that converts molecular design
                  into an in situ scaffold.
                </p>
                <h3 className="mt-4 mb-3">
                  4.1 Formulation and Staging: Converting a Functional
                  Formulation into an Injectable Precursor
                </h3>
                <p>
                  The functional components are assembled with the scaffold
                  prior to injection. The main preparation unit controls the
                  dispensing ratio of each component through a three-channel
                  independent injection mechanism. After being mixed in
                  serpentine microfluidic channels, the formulation enters the
                  reservoir unit. This unit integrates temperature-control and
                  liquid-level detection modules: the temperature-control module
                  manages the state of the protein solution, while liquid-level
                  monitoring provides information on the remaining volume,
                  thereby establishing conditions for subsequent delivery. At
                  this stage, the temporarily stored material is the precursor
                  solution before photocrosslinking: its flowability allows it
                  to adapt to the defect, whereas network fixation is deferred
                  until the material reaches the target site.
                </p>
                <h3 className="mt-4 mb-3">
                  4.2 Delivery, Positioning, and Gelation: Continuous Shape
                  Adaptation and Structural Control
                </h3>
                <p>
                  The precursor solution is delivered through the delivery pump
                  and tubing into the delivery tip. A three-way valve enables
                  switching between the refilling and administration pathways.
                  The delivery tip is equipped with a damping-optimized
                  injection assembly and an endoscopic module, allowing the
                  operator to visualize the defect site and filling status while
                  precisely delivering the gel. Subsequently, an external
                  magnetic field guides the internal alignment. An independently
                  controlled blue-light source integrated into the endoscopic
                  module is then activated to trigger protein crosslinking,
                  fixing the material into a network.
                </p>
                <p>
                  The workflow proceeds as formulation, delivery, observation
                  and filling, magnetic orientation, and blue-light
                  crosslinking: the formulation determines the functions the
                  material carries, injection accomplishes shape matching, the
                  magnetic field helps establish the internal structure, and
                  photocrosslinking preserves the formed state. Each step
                  creates the conditions for the next and together they
                  determine the final state of the scaffold.
                </p>
                <figure className="figure d-block my-4 text-center">
                  <FigureImage
                    src="https://static.igem.wiki/teams/6102/wiki/images/hardware/hardware-overview-diagram.avif"
                    alt="Hardware overview diagram."
                    className="figure-img img-fluid rounded"
                    style={{ width: "100%" }}
                  />
                  <FigureCaption className="figure-caption">
                    Figure 4.2 | Hardware overview diagram.
                  </FigureCaption>
                </figure>
                <h3 className="mt-4 mb-3">
                  4.3 Software and Modeling: Using One Logic for Parameter
                  Selection and Operation
                </h3>
                <p>
                  To support and guide the wet-lab experiments, the modeling
                  component was carried out in several aspects. First, to
                  characterize and predict the mechanical properties of
                  hydrogels formed by SELP proteins, we performed corresponding
                  all-atom simulations as well as compressive-modulus
                  simulations after network construction. Starting from the
                  protein sequence, the complete workflow successfully
                  reconstructed the SELP hydrogel network and predicted its
                  mechanical properties. Second, to improve the ligation
                  efficiency of the connector system, we engineered the key
                  ligase, SnoopLigase. Mutations at three sites conferred
                  greater stability and higher catalytic turnover. We also
                  conducted modeling simulations of the Magnetically Responsive
                  Anisotropy Module, in which the mechanical properties of hydrogels
                  containing magnetic nanoparticles were predicted. These
                  results help us better understand and apply magnetic fields to
                  engineer the anisotropy of hydrogels.
                </p>
                <p>
                  The software organizes formulation selection, component
                  ratios, mixing steps, status display, and gelation timing
                  across the whole workflow and presents the target region
                  together with imaging information. Molecular models provide
                  mechanical comparisons of the scaffold and crosslinked
                  networks, and the magneto-mechanical model analyzes the
                  relationship among magnetic field, orientation, and material
                  response; the interface links these comparisons to the
                  corresponding formulation and gelation conditions, so that the
                  design rationale is carried into the operating steps.
                </p>
                <p>
                  The material defines the repair function, models support
                  design choices, hardware establishes gelation conditions, and
                  software organizes the whole operation. The coherence of NEST
                  lies not in showing several technologies side by side but in
                  their jointly accomplishing one task: establishing, in the
                  cartilage defect, a repair microenvironment that combines
                  structural support, matrix protection, and cellular support.
                </p>
              </>
            }
          />
          <References level={2}>
            <div className="references-list references-list--paragraphs">
              <p id="design-reference-1" style={{ scrollMarginTop: "112px" }}>
                [1] Huang W, Tarakanova A, Dinjaski N, Wang Q, Xia X, Chen Y,
                Wong JY, Buehler MJ, Kaplan DL. Design of multistimuli
                responsive hydrogels using integrated modeling and genetically
                engineered silk–elastin-like proteins. <em>Adv Funct Mater</em>.
                2016;26(23):4113–4123. doi:10.1002/adfm.201600236.
              </p>
              <p id="design-reference-2" style={{ scrollMarginTop: "112px" }}>
                [2] Gonzalez-Obeso C, Backlund FG, Kaplan DL. Charge-modulated
                accessibility of tyrosine residues for silk-elastin copolymers
                cross-linking. <em>Biomacromolecules</em>. 2022;23(3):760–765.
                doi:10.1021/acs.biomac.1c01192.
              </p>
              <p id="design-reference-3" style={{ scrollMarginTop: "112px" }}>
                [3] Ruoslahti E. RGD and other recognition sequences for
                integrins. <em>Annu Rev Cell Dev Biol</em>. 1996;12:697–715.
                doi:10.1146/annurev.cellbio.12.1.697.
              </p>
              <p id="design-reference-4" style={{ scrollMarginTop: "112px" }}>
                [4] Nie et al., 2026.
              </p>
              <p id="design-reference-5" style={{ scrollMarginTop: "112px" }}>
                [5] Fancy DA, Kodadek T. Chemistry for the analysis of
                protein–protein interactions: rapid and efficient cross-linking
                triggered by long wavelength light.{" "}
                <em>Proc Natl Acad Sci USA</em>. 1999;96(11):6020–6024.
                doi:10.1073/pnas.96.11.6020.
              </p>
              <p id="design-reference-6" style={{ scrollMarginTop: "112px" }}>
                [6] Cui X, Soliman BG, Alcala-Orozco CR, Li J, Vis MAM, Santos
                M, Wise SG, Levato R, Malda J, Woodfield TBF, Rnjak-Kovacina J,
                Lim KS. Rapid photocrosslinking of silk hydrogels with high cell
                density and enhanced shape fidelity. <em>Adv Healthc Mater</em>.
                2020;9(4):e1901667. doi:10.1002/adhm.201901667.
              </p>
              <p id="design-reference-7" style={{ scrollMarginTop: "112px" }}>
                [7] Meyer DE, Chilkoti A. Purification of recombinant proteins
                by fusion with thermally-responsive polypeptides.{" "}
                <em>Nat Biotechnol</em>. 1999;17(11):1112–1115.
                doi:10.1038/15100.
              </p>
              <p id="design-reference-8" style={{ scrollMarginTop: "112px" }}>
                [8] Buldun CM, Jean JX, Bedford MR, Howarth M. SnoopLigase
                catalyzes peptide–peptide locking and enables solid-phase
                conjugate isolation. <em>J Am Chem Soc</em>.
                2018;140(8):3008–3018. doi:10.1021/jacs.7b13237.
              </p>
              <p id="design-reference-9" style={{ scrollMarginTop: "112px" }}>
                [9] Keeble AH, Wood DP, Howarth M. Design and evolution of
                enhanced peptide–peptide ligation for modular transglutaminase
                assembly. <em>Bioconjug Chem</em>. 2023;34.
                doi:10.1021/acs.bioconjchem.3c00122.
              </p>
              <p id="design-reference-10" style={{ scrollMarginTop: "112px" }}>
                [10] Fierer JO, Veggiani G, Howarth M. SpyLigase peptide–peptide
                ligation polymerizes affibodies to enhance magnetic cancer cell
                capture. <em>Proc Natl Acad Sci USA</em>.
                2014;111(13):E1176–E1181. doi:10.1073/pnas.1315776111.
              </p>
              <p id="design-reference-11" style={{ scrollMarginTop: "112px" }}>
                [11] Chen M, Chen S, Xie C, Li F, Tao C, Gong W, Qu M, Lin S,
                Shao Z, Xiao G. Global prevalence, incidence, and years lived
                with disability (YLDs) of osteoarthritis: trends from 1990 to
                2021 and projections to 2050. <em>J Orthop Translat</em>.
                2026;56:101029. doi:10.1016/j.jot.2025.11.005.
              </p>
              <p id="design-reference-12" style={{ scrollMarginTop: "112px" }}>
                [12] Medvedeva EV, Grebenik EA, Gornostaeva SN, Telpuhov VI,
                Lychagin AV, Timashev PS, Chagin AS. Repair of damaged articular
                cartilage: current approaches and future directions.{" "}
                <em>Int J Mol Sci</em>. 2018;19(8):2366.
                doi:10.3390/ijms19082366.
              </p>
              <p id="design-reference-13" style={{ scrollMarginTop: "112px" }}>
                [13] Li Y, Yin G, Pu X, Chen X, Liao X, Huang Z. Novel
                bi-functional 14-mer peptides with both ovarian carcinoma cells
                targeting and magnetic Fe₃O₄ nanoparticles affinity.{" "}
                <em>Materials (Basel)</em>. 2019;12(5):755.
                doi:10.3390/ma12050755.
              </p>
              <p id="design-reference-14" style={{ scrollMarginTop: "112px" }}>
                [14] Horkay F, et al. Cartilage extracellular matrix polymers:
                hierarchical structure, osmotic properties, and function.{" "}
                <em>Soft Matter</em>. 2024;20:6033–6043. doi:10.1039/D4SM00617H.
              </p>
              <p id="design-reference-15" style={{ scrollMarginTop: "112px" }}>
                [15] Vedadghavami A, Wagner EK, Mehta S, He T, Zhang C, Bajpayee
                AG. Cartilage penetrating cationic peptide carriers for
                applications in drug delivery to avascular negatively charged
                tissues. <em>Acta Biomater</em>. 2019;93:258–269.
                doi:10.1016/j.actbio.2018.12.004.
              </p>
              <p id="design-reference-16" style={{ scrollMarginTop: "112px" }}>
                [16] McKenna LA, Liu H, Sansom PA, Dean MF. An N-terminal
                peptide from link protein stimulates proteoglycan biosynthesis
                in human articular cartilage in vitro. <em>Arthritis Rheum</em>.
                1998;41(1):157–162.
              </p>
              <p id="design-reference-17" style={{ scrollMarginTop: "112px" }}>
                [17] Liu H, McKenna LA, Dean MF. An N-terminal peptide from link
                protein can stimulate biosynthesis of collagen by human
                articular cartilage. <em>Arch Biochem Biophys</em>. 2000.
                doi:10.1006/abbi.2000.1758.
              </p>
              <p id="design-reference-18" style={{ scrollMarginTop: "112px" }}>
                [18] He R, Wang B, Cui M, Xiong Z, Lin H, Zhao L, et al. Link
                protein N-terminal peptide as a potential stimulating factor for
                stem cell-based cartilage regeneration. <em>Stem Cells Int</em>.
                2018;2018:3217895. doi:10.1155/2018/3217895.
              </p>
              <p id="design-reference-19" style={{ scrollMarginTop: "112px" }}>
                [19] Roberts JJ, Nicodemus GD, Giunta S, Bryant SJ.
                Incorporation of biomimetic matrix molecules in PEG hydrogels
                enhances matrix deposition and reduces load-induced loss of
                chondrocyte-secreted matrix. <em>J Biomed Mater Res A</em>.
                2011;97(3):281–291. doi:10.1002/jbm.a.33057.
              </p>
              <p id="design-reference-20" style={{ scrollMarginTop: "112px" }}>
                [20] Maneiro E, Martín MA, de Andres MC, López-Armada MJ,
                Fernández-Sueiro JL, del Hoyo P, Galdo F, Arenas J, Blanco FJ.
                Mitochondrial respiratory activity is altered in osteoarthritic
                human articular chondrocytes. <em>Arthritis Rheum</em>.
                2003;48(3):700–708. doi:10.1002/art.10837.
              </p>
              <p id="design-reference-21" style={{ scrollMarginTop: "112px" }}>
                [21] Lee RA, Woo JS, Lee SY, Na HS, Cho KH, Lee YS, Lee JS, Kim
                SA, Park SH, Kim SJ, Cho ML. Mitochondrial transplantation
                ameliorates the development and progression of osteoarthritis.{" "}
                <em>Immune Netw</em>. 2022;22(2):e14. PMID:35573148.
              </p>
              <p id="design-reference-22" style={{ scrollMarginTop: "112px" }}>
                [22] Kim et al. Fusogenic liposomes encapsulating mitochondria
                as a promising delivery system for osteoarthritis therapy.{" "}
                <em>Biomaterials</em>. 2023. PMID:37864947.
              </p>
              <p id="design-reference-23" style={{ scrollMarginTop: "112px" }}>
                [23] Nobs L, Buchegger F, Gurny R, Allémann E. Current methods
                for attaching targeting ligands to liposomes and nanoparticles.{" "}
                <em>J Pharm Sci</em>. 2004;93(8):1980–1992.
                doi:10.1002/jps.20098.
              </p>
              <p id="design-reference-24" style={{ scrollMarginTop: "112px" }}>
                [24] Mitchell PG, et al. Cloning, expression, and type II
                collagenolytic activity of matrix metalloproteinase-13 from
                human osteoarthritic cartilage. <em>J Clin Invest</em>.
                1996;97(3):761–768.
              </p>
              <p id="design-reference-25" style={{ scrollMarginTop: "112px" }}>
                [25] Marblestone JG, Edavettal SC, Lim Y, Lim P, Zuo X, Butt TR.
                Comparison of SUMO fusion technology with traditional gene
                fusion systems: enhanced expression and solubility with SUMO.{" "}
                <em>Protein Sci</em>. 2006;15(1):182–189.
              </p>
            </div>
          </References>
        </article>
      </div>
    </div>
  );
}
