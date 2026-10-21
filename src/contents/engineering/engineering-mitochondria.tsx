import { DbtlFigure } from "./Figure";
import type { DbtlModule } from "./dbtl";

export const mitochondriaModule: DbtlModule = {
  title: "Mitochondrial Therapeutic Module",
  intro: (
    <>
      <p>
        Repairing a cartilage defect requires both structural support for cells
        and the ability of those cells to maintain newly formed tissue. Previous
        studies of mitochondrial transplantation have reported improvements in
        mitochondrial function and inflammation-related parameters in
        osteoarthritis models and patient-derived chondrocytes, suggesting the
        potential of exogenous mitochondria to provide metabolic support.
      </p>
      <p>
        NEST&rsquo;s Mitochondrial Therapeutic Module builds on this concept:
        liposomes <strong>serve as mitochondrial delivery carriers</strong>,
        engineered linker peptides <strong>connect the carriers to the SELP
        scaffold</strong>, and enzymatic cleavage is intended to <strong>enable
        carrier detachment</strong> and subsequent cellular delivery.
      </p>
      <p>
        This module uses mitochondrial delivery as an application example while
        retaining scope for broader drug delivery applications. The modular
        &ldquo;carrier&ndash;responsive linker peptide&ndash;SELP
        scaffold&rdquo; design allows the therapeutic cargo and the scaffold
        attachment strategy to be adjusted independently. In future work, we aim
        to optimize carrier composition, loading methods, and responsive
        sequences according to the physicochemical properties and therapeutic
        requirements of different drugs. By exploring the local delivery of
        small-molecule drugs, proteins, nucleic acids, and other cargoes, we
        hope to develop this design into a responsive drug delivery platform
        adaptable to diverse therapeutic needs.
      </p>
      <p>
        With mitochondria as our current focus, this approach raises three
        interconnected questions: <strong>How can mitochondria be
        delivered?</strong> <strong>How can the delivery carrier support both
        local retention and subsequent detachment?</strong> Once the system
        enters cellular evaluation, <strong>how should delivery performance and
        cellular tolerance be assessed?</strong>
      </p>
      <p>
        The engineering cycles below address these questions, documenting how
        carrier construction, ligation and cleavage assays, and cellular
        evaluation progressively informed our design assessment and experimental
        refinement.
      </p>
      <p>
        Owing to the constraints of our own laboratory facilities, all
        experiments involving cells were outsourced to and performed by the
        laboratory of Prof. Wenwen Huang.
      </p>
    </>
  ),
  cycles: [
    {
      title: "Cycle 1 — From mitochondrial delivery to functionalized liposomes",
      content: {
        Design: (
          <>
            <p>
              Mitochondrial delivery requires a carrier that can interact with
              cells and connect to the scaffold. Previous research on fusogenic
              liposomes provided a reference for delivering mitochondria to
              chondrocytes. We therefore selected liposomes as the carrier and
              incorporated surface attachment sites into the formulation,
              allowing delivery and scaffold assembly to be integrated within
              the same system.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              We prepared functionalized liposomes using
              DOPE(1,2-dioleoyl-<em>sn</em>-glycero-3-phosphoethanolamine),
              DOTAP(1,2-dioleoyl-3-trimethylammonium-propane (chloride)), and
              DSPE-PEG-Mal(1,2-distearoyl-<em>sn</em>-glycero-3-phosphoethanolamine-N-[maleimide(polyethylene
              glycol)]). The combination of DOPE and DOTAP was intended to
              support interactions between the carrier and biological membranes,
              while DSPE-PEG-Mal provided maleimide groups for subsequent
              peptide conjugation. We co-incubated the liposomes with labeled
              mitochondria and examined their spatial relationship and
              structural morphology using confocal fluorescence imaging and
              transmission electron microscopy.
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              The fluorescence images showed <strong>partial overlap between the
              liposomal and mitochondrial signals</strong>, supporting a
              spatial association between the two components (Figure 1.1.1).
              Transmission electron microscopy revealed peripheral membrane-like
              outlines surrounding internal structures in the complex samples,
              providing morphological support for complex formation (Figure
              1.1.2). These results supported further investigation of the
              liposomal approach, although they <strong>did not establish the
              proportion of fully encapsulated mitochondria</strong> or the
              extent to which mitochondrial function was preserved.
            </p>
            <DbtlFigure
              readable="microscopy"
              src="result/04/09.avif"
              caption="Figure 1.1.1 | Confocal fluorescence imaging of the liposome–mitochondria complexes. Partial overlap between the liposomal and mitochondrial signals supports a spatial association between the two components."
            />
            <DbtlFigure
              src="result/04/10.avif"
              caption="Figure 1.1.2 | Transmission electron microscopy of the liposome–mitochondria complexes. Peripheral membrane-like outlines surrounding internal structures provide morphological support for complex formation."
            />
          </>
        ),
        Learn: (
          <>
            <p>
              The association between the carrier and mitochondria provided a
              starting point for the delivery design. The next question
              concerned the connection between the carrier and SELP: surface
              maleimide groups provided attachment sites, but how could the
              connection support local retention while remaining cleavable when
              needed? This question led the next cycle toward linker peptide
              design.
            </p>
          </>
        ),
      },
    },
    {
      title: "Cycle 2 — From local anchoring to a cleavable linker",
      content: {
        Design: (
          <>
            <p>
              The carrier needs to remain localized while retaining the
              potential for subsequent detachment. We incorporated both
              requirements into a single linker peptide, with attachment sites
              for the liposome and scaffold at opposite ends and a cleavable
              region between them. The selection of
              <strong>MMP-13</strong>(matrix metalloproteinase-13) <strong>as the
              target enzyme</strong> was informed by its mechanistic
              <strong>association with cartilage erosion</strong>.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              We combined a <strong>Cys conjugation site</strong>, <strong>an
              MMP-responsive region</strong>, and <strong>DogTag</strong> into an
              independent module. Cys was intended to react with maleimide
              groups on the liposome surface, while DogTag was designed to form
              a covalent linkage with SnoopTagJr on SELP through
              SnoopLigase-mediated ligation. Previous research has established
              the ability of SnoopLigase to catalyze isopeptide bond formation
              between this tag pair.
            </p>
            <p>
              We also designed a Control construct with the same attachment
              sites and expression framework. The responsive region contained
              RRGPLGLSLGKR, while the corresponding region in the Control
              construct contained the scrambled sequence RKGLSLGLPGRR. This
              design allowed subsequent comparisons to focus on sequence
              differences within this region (Figure 1.2.1).
            </p>
            <DbtlFigure
              readable="diagram"
              src="design/04/02.avif"
              caption="Figure 1.2.1 | Design of the responsive construct and the Control construct. Both share the same attachment sites and expression framework; the responsive region RRGPLGLSLGKR is replaced by the scrambled sequence RKGLSLGLPGRR in the Control construct."
            />
          </>
        ),
        Test: (
          <>
            <p>
              This cycle began with a review of the sequences and connection
              architecture. The corresponding regions of the two constructs had
              identical lengths and amino acid compositions, and their Cys and
              DogTag interfaces were unchanged. The responsive region was
              positioned between the two attachment sites, so cleavage was
              expected to separate the two ends. The Control construct provided
              a basis for assessing sequence-dependent differences, although its
              actual cleavage behavior still required experimental evaluation.
            </p>
          </>
        ),
        Learn: (
          <>
            <p>
              The linker peptide assigned liposome conjugation, scaffold
              anchoring, and enzyme-responsive cleavage to distinct positions,
              allowing each function to be assessed separately. These
              assessments first required peptide samples suitable for the
              reactions. The next cycle therefore focused on expression, tag
              removal, and sample recovery.
            </p>
          </>
        ),
      },
    },
    {
      title: "Cycle 1 — From fusion expression to detectable peptides",
      content: {
        Design: (
          <>
            <p>
              The functional peptide needed to be produced in a form that could
              be prepared and recovered for experimental use. We adopted a
              His/SUMO fusion expression framework and incorporated a TEV
              protease cleavage site, allowing affinity purification to precede
              removal of the expression tag. The responsive and Control
              constructs shared this framework to facilitate subsequent
              comparisons.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              We compared expression at different IPTG concentrations, examined
              the samples using SDS-PAGE and Western blotting, and obtained
              fusion proteins through nickel-affinity chromatography and
              dialysis. We then performed TEV cleavage and peptide recovery,
              with the aim of using the recovered samples for liposome
              conjugation and subsequent functional assays.
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              Target protein bands were relatively prominent at 0.25 and 0.5 mM
              IPTG, so these conditions were selected for larger-scale
              expression. TEV treatment produced band changes consistent with
              SUMO release, supporting tag removal (Figure 2.1.1). However, the
              <strong>recovered peptide concentration was low</strong>, and
              <strong>recovery during ultrafiltration was inconsistent</strong>.
              These limitations made it difficult to obtain reliable readouts
              from the original liposome conjugation assessment, which depended
              on separation and recovery.
            </p>
            <DbtlFigure
              src="result/04/05.avif"
              caption="Figure 2.1.1 | Expression screening and TEV cleavage of the linker peptides. Target bands are prominent at 0.25 and 0.5 mM IPTG; TEV treatment produces band changes consistent with SUMO release."
            />
          </>
        ),
        Learn: (
          <>
            <p>
              This difficulty prompted us to reconsider the detection strategy.
              When sample recovery and ligation both influence the results,
              <strong>a weak signal cannot readily be attributed to either
              step</strong>. We therefore introduced lyophilization to
              concentrate the peptide samples and assessed the two linker
              interfaces separately. In the next cycle, we introduced a GFP
              reporter protein to evaluate DogTag-mediated ligation through a
              distinguishable change in molecular weight.
            </p>
          </>
        ),
      },
    },
    {
      title:
        "Cycle 2 — From a complex conjugation system to a GFP ligation model",
      content: {
        Design: (
          <>
            <p>
              Determining whether DogTag retained its ligation activity required
              an assay that did not depend on liposome separation. We selected
              GFP-SnoopTag as the reporter substrate: ligation of the peptide to
              this protein was expected to produce a higher-molecular-weight
              product detectable by electrophoresis.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              We mixed the responsive and Control peptides separately with
              GFP-SnoopTag and established parallel reactions with and without
              SnoopLigase. After incubation at room temperature for 1 h, the
              products were analyzed by SDS-PAGE (Figure 2.2.1). This setup
              allowed both constructs to be examined within the same reporter
              system, with the presence of SnoopLigase serving as the key
              variable for assessing enzyme dependence.
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              <strong>Higher-molecular-weight bands appeared in the
              SnoopLigase-containing reactions</strong> for both responsive and
              control peptides. Their mobility shifts were consistent with
              ligation product formation. These results supported the
              <strong>retention of DogTag-mediated ligation activity</strong> in
              the recovered peptides and indicated that both constructs could
              be used to generate reporter substrates for subsequent assays.
            </p>
            <DbtlFigure
              readable="gel"
              src="result/04/06.avif"
              caption="Figure 2.2.1 | GFP-SnoopTag ligation reactions with and without SnoopLigase. Higher-molecular-weight bands appear in the ligase-containing reactions for both the responsive and Control peptides."
            />
          </>
        ),
        Learn: (
          <>
            <p>
              The GFP model provided a detectable readout for the scaffold
              attachment interface and offered an additional application: once
              the peptide was attached to the reporter protein, cleavage could
              also be monitored through changes in the band pattern. The next
              cycle therefore used these products to examine the MMP-responsive
              region. Cys-mediated conjugation at the liposome interface
              remained a separate validation task, keeping the conclusions
              specific to the interface tested.
            </p>
          </>
        ),
      },
    },
    {
      title: "Cycle 3 — From ligation activity to responsive cleavage",
      content: {
        Design: (
          <>
            <p>
              Following ligation, the central question shifted to the responsive
              region: would addition of the target protease produce changes
              consistent with linker cleavage? We aimed to use the GFP reporter
              substrate to translate peptide changes that were difficult to
              observe directly into comparable electrophoretic band patterns.
              The Control construct would help assess whether any differences
              were associated with the responsive region.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              The responsive and Control peptides were separately ligated to
              GFP-SnoopTag and used in MMP cleavage assays. We included
              different treatment durations and retained 0 h samples as the
              starting reference. Cleavage responses were evaluated by comparing
              bands corresponding to intact substrates and
              lower-molecular-weight species across the groups.
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              <strong>Two closely spaced bands were observed near 35 kDa</strong>
              in the responsive peptide group, whereas the Control group
              predominantly showed the corresponding higher-molecular-weight
              band. This difference was consistent with partial substrate
              cleavage and provided a preliminary indication that the responsive
              region could be cleaved (Figure 2.3.1). However, differences
              between the groups were <strong>already present in the 0 h
              samples</strong>. Matched controls without the enzyme and
              consistent starting substrates are therefore needed to further
              assess enzyme dependence and the time course of cleavage.
            </p>
            <DbtlFigure
              src="result/04/12.avif"
              caption="Figure 2.3.1 | MMP cleavage assay of the ligated peptides. Two closely spaced bands near 35 kDa in the responsive peptide group indicate partial substrate cleavage."
            />
          </>
        ),
        Learn: (
          <>
            <p>
              This cycle translated the cleavable-linker design into an
              observable reporter system and clarified which conditions needed
              to be standardized in the next cleavage assay. Nevertheless,
              molecular cleavage and release of the complete carrier remain
              distinct processes. Liposome conjugation, attachment through
              multiple linkers, and the hydrogel network all need to be included
              in an integrated evaluation. Meanwhile, the carrier&rsquo;s
              cellular delivery potential could be assessed independently,
              providing a cellular reference for subsequent release experiments.
            </p>
          </>
        ),
      },
    },
    {
      title:
        "Cycle 1 — From complex formation to preliminary evidence of cellular delivery",
      content: {
        Design: (
          <>
            <p>
              Complex formation addressed whether the carrier and mitochondria
              could associate, while cellular evaluation needed to determine
              whether this association could support delivery. At this stage, we
              used preformed liposome&ndash;mitochondria complexes to examine
              tracer signals in recipient cells, establishing a reference for
              later evaluation of carriers released from the scaffold.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              We co-incubated labeled mitochondria with liposomes to obtain
              complexes and then added them to recipient cells. Cells without
              added complexes served as the control. Cell staining and
              fluorescence imaging were used to examine the spatial relationship
              between the mitochondrial green signal and the cells.
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              <strong>Green fluorescence</strong> was observed <strong>within the
              cellular regions</strong> of the complex-treated group. Its
              distribution was consistent with the expected entry of exogenous
              mitochondria into cells, providing preliminary evidence of
              cellular delivery (Figure 3.1.1). Further confirmation of
              intracellular localization requires three-dimensional imaging and
              free-dye controls. These observations also <strong>do not yet
              establish delivery efficiency</strong> or improvements in
              metabolic function.
            </p>
            <DbtlFigure
              src="result/04/13.avif"
              caption="Figure 3.1.1 | Cellular delivery of the liposome–mitochondria complexes. Green fluorescence within the cellular regions is consistent with the entry of exogenous mitochondria into cells."
            />
          </>
        ),
        Learn: (
          <>
            <p>
              Fluorescence tracking allowed us to continue examining the
              delivery process, but selecting subsequent experimental conditions
              also required consideration of cellular tolerance to the
              system&rsquo;s components. The next cycle therefore extended the
              evaluation to linker peptide cytocompatibility, using
              concentration and treatment duration as variables to inform future
              conditions for the complete system.
            </p>
          </>
        ),
      },
    },
    {
      title:
        "Cycle 2 — From delivery observations to defining cytocompatibility limits",
      content: {
        Design: (
          <>
            <p>
              The linker peptide participates in carrier assembly and may also
              contact cells as an unreacted component or as cleavage fragments.
              We needed to understand the cellular response to this component
              before extending cytocompatibility assessment to the liposomes,
              complexes, and final scaffold. We therefore used the CCK-8 (Cell
              Counting Kit-8) assay to compare relative cell viability across
              peptide concentrations and treatment durations.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              We established 5 and 10 &micro;M peptide treatment groups, cell
              control groups, and blank groups, with measurements at 24, 48, and
              72 h. Blank wells were used for background correction, and cell
              controls at the corresponding time points served as the reference
              for monitoring changes in viability readings over time.
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              The peptide-treated groups showed <strong>an initial decrease in
              viability readings followed by a recovery</strong>. Readings at
              48&ndash;72 h were closer to the control levels than those at the
              early time point (Figure 3.2.1). The initial changes may have been
              related to the starting condition of the cells, cell attachment,
              or experimental handling, while the effects of peptide exposure
              also need to be considered. The available results <strong>do not
              support attributing the changes to a single factor</strong>.
            </p>
            <DbtlFigure
              src="result/04/14.avif"
              caption="Figure 3.2.1 | CCK-8 cytocompatibility evaluation of the linker peptide. Viability readings show an initial decrease followed by recovery at 48–72 h."
            />
          </>
        ),
        Learn: (
          <>
            <p>
              Cytocompatibility assessment requires joint consideration of
              concentration, exposure duration, and cell condition. The recovery
              in later readings supported continued optimization, while the
              initial decrease highlighted the need to standardize cell seeding
              and treatment conditions. Independent repeats and additional
              observations of cell condition will help clarify this change.
              Assessment must also gradually extend from the peptide to the
              complete delivery system so that cytocompatibility and carrier
              delivery performance can jointly guide the selection of
              experimental conditions.
            </p>
          </>
        ),
      },
    },
  ],
  infos: [
    {
      afterCycle: 0,
      title: "Construction of a mitochondrial delivery carrier",
    },
    {
      afterCycle: 2,
      title: "Validation of delivery-related functions",
    },
    {
      afterCycle: 5,
      title: "Evaluation of cellular delivery performance",
    },
  ],
  outro: (
    <>
      <p>
        Through these engineering cycles, the Mitochondrial Therapeutic Module developed
        into a set of components that could be evaluated individually:
        <strong>liposomes provided the carrier interface</strong>, <strong>the
        linker peptide coordinated anchoring and detachment</strong>, and the GFP
        model <strong>converted ligation and cleavage into observable
        changes</strong>. Difficulties with ultrafiltration recovery prompted
        adjustments to the detection strategy and clarified which interfaces
        were supported by evidence and which still required independent
        validation.
      </p>
      <p>
        Next, we will refine the quantification methods and controls for
        peptide&ndash;liposome conjugation, integrate the carrier with SELP, and
        compare <strong>retention and release in the presence and absence of
        MMP</strong>. The released carriers will then be evaluated for cellular
        delivery, mitochondrial function, and cytocompatibility. This approach
        will bring attachment, detachment, and delivery into the same
        experimental system and progressively determine whether the module can
        provide the metabolic support needed by damaged chondrocytes.
      </p>
    </>
  ),
};
