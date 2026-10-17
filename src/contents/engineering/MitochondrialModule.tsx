export function MitochondrialModule() {
  return (
    <>
      <h2 className="mt-5 mb-3">Mitochondrial therapeutic module</h2>
      <h3 className="mt-5 mb-3">From local loading to cellular delivery</h3>
      <p>
        Repairing a cartilage defect requires both providing support for the
        cells and enabling them to maintain the newly formed tissue. Existing
        mitochondrial transplantation studies have observed improvements in
        mitochondrial function and inflammation-related indicators in
        osteoarthritis models and patient-derived chondrocytes, opening the
        possibility of providing metabolic support through exogenous
        mitochondria.
      </p>
      <p>
        The mitochondrial therapeutic module of NEST starts from this idea:
        encapsulate exogenous mitochondria with liposomes, couple the carrier to
        the SELP scaffold through an engineered linker peptide, and use
        enzymatic cleavage to create conditions for carrier dissociation and
        cellular delivery.
      </p>
      <p>
        This route needs to answer three interconnected questions: how are
        mitochondria delivered? How does the delivery carrier balance local
        retention with subsequent dissociation? And once cellular evaluation
        begins, how should delivery performance and cell tolerance be judged?
      </p>
      <p>The engineering cycles below unfold around these questions.</p>
      <h3 className="mt-5 mb-3">
        I. Construction of the mitochondrial delivery carrier
      </h3>
      <h4 className="mt-4 mb-3">
        Cycle 1｜From mitochondrial delivery to functionalized liposomes
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        Mitochondrial delivery needs a carrier that can interact with cells and
        also couple to the scaffold. Existing fusogenic liposome studies
        provided a reference for delivering mitochondria to chondrocytes. We
        therefore chose liposomes as the carrier and reserved surface attachment
        sites in the formulation, so that delivery and scaffold assembly can
        connect within the same system.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We prepared functionalized liposomes using DOPE, DOTAP, and
        DSPE-PEG-Mal. The combination of DOPE and DOTAP supports the interaction
        between the carrier and biological membranes, while DSPE-PEG-Mal
        provides the maleimide groups needed for subsequent peptide conjugation.
        The liposomes were co-incubated with stained mitochondria, and the
        spatial relationship and structural morphology of the two were observed
        by confocal fluorescence imaging and transmission electron microscopy,
        respectively.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        In the fluorescence images the two signals of liposomes and mitochondria
        partially overlapped, supporting spatial association between the two. In
        transmission electron microscopy, the complex samples showed peripheral
        membrane-like contours surrounding internal structures, providing
        morphological support for the formation of a composite structure. These
        results give the liposome route a basis for continued study, but cannot
        yet establish the complete encapsulation ratio or the preservation of
        mitochondrial function.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        The carrier and mitochondria can form an association, providing a
        starting point for the delivery design. The next problem to solve was
        the relationship between the carrier and SELP: the surface maleimide can
        provide attachment positions, but how can the connection both support
        local retention and break when needed? The next round therefore turned
        to the design of the linker peptide.
      </p>
      <h4 className="mt-4 mb-3">
        Cycle 2｜From local anchoring to a cleavable linker
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        The carrier needs to be retained locally and also needs the possibility
        of subsequent dissociation. We arranged these two requirements on the
        same linker peptide: the two ends connect the liposome and the scaffold
        respectively, and a cleavable region is placed in between. MMP-13 was
        chosen as the target responsive enzyme, referring to its mechanistic
        association with cartilage erosion.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We combined a Cys conjugation site, an MMP-responsive region, and DogTag
        into an independent module. Cys connects to the maleimide on the
        liposome surface; DogTag is planned to form a covalent connection with
        SnoopTagJr on SELP through SnoopLigase. The ability of SnoopLigase to
        catalyze isopeptide-bond formation between this tag pair already has a
        research basis.
      </p>
      <p>
        At the same time, we set up a Control construct that keeps the
        connection ends consistent with the expression framework. The responsive
        region uses RRGPLGLSLGKR, while the corresponding region of the Control
        uses the sequence-rearranged RKGLSLGLPGRR, so that the subsequent
        comparison can focus on the sequence difference in this region.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        This round first checked the sequence and connection relationships. The
        corresponding regions of the two constructs have the same length and
        amino-acid composition, and the Cys and DogTag interfaces are also kept
        consistent; in the designed position, the responsive region lies between
        the two connection ends, and cleavage is expected to separate the two
        ends. The Control provides the basis for judging sequence-related
        differences, while its actual cleavage behavior still needs experimental
        verification.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        The linker peptide assigns liposome conjugation, scaffold anchoring, and
        enzyme-responsive cleavage to explicit positions, allowing each function
        to be checked separately. To carry out these checks, we first needed to
        obtain a peptide usable for the reaction. The next round therefore
        focused on expression, tag removal, and sample recovery.
      </p>
      <h3 className="mt-5 mb-3">II. Validation of delivery function</h3>
      <h4 className="mt-4 mb-3">
        Cycle 3｜From fusion expression to a detectable peptide
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        The functional peptide needs to enter experiments in a form that can be
        prepared and recovered. We adopted a His/SUMO fusion expression
        framework with a TEV cleavage site, so that samples can first undergo
        affinity purification and then have the expression tag removed. The
        responsive construct and the Control follow the same framework,
        facilitating later comparison.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We compared expression at different IPTG concentrations, checked samples
        with SDS-PAGE and Western blot, and obtained the fusion protein through
        nickel affinity chromatography and dialysis. TEV cleavage and peptide
        recovery followed, and the samples were then used for liposome
        conjugation and subsequent functional testing.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        Target bands were relatively clear at 0.25 mM and 0.5 mM IPTG, so these
        conditions were used for scale-up expression. After TEV treatment, band
        changes consistent with SUMO release appeared, supporting tag removal.
        At the same time, the concentration of the recovered peptide was low and
        the recovery performance of the ultrafiltration process was unstable,
        making it difficult to obtain a reliable readout from the original plan,
        which depended on separation and recovery for the liposome-conjugation
        evaluation.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        This difficulty led us to re-examine the detection approach: when sample
        recovery and the ligation reaction both affect the result, it is hard to
        tell which step a weak signal comes from. We therefore added a
        freeze-drying concentration step for the peptide and checked the two
        interfaces of the linker peptide separately. The next round first
        introduced a GFP reporter protein, using a recognizable molecular-weight
        change to evaluate the ligation activity of the DogTag end.
      </p>
      <h4 className="mt-4 mb-3">
        Cycle 4｜From a complex conjugation system to a GFP ligation model
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        Whether DogTag retains ligation activity requires a detection system
        that does not depend on liposome separation. We chose GFP-SnoopTag as
        the reporter substrate: after ligation with the peptide, a
        higher-molecular-weight product is expected, observable by
        electrophoresis.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We mixed the responsive peptide and the Control peptide with
        GFP-SnoopTag separately, set up comparison groups with and without
        SnoopLigase, reacted at room temperature for 1 h, and analyzed the
        products by SDS-PAGE. In this way both constructs could be checked in
        the same reporter system, and the addition of the ligase became the key
        variable for judging reaction dependence.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        In the reactions containing SnoopLigase, both the responsive peptide and
        the Control peptide produced higher-molecular-weight bands, whose
        migration changes are consistent with ligation-product formation. This
        result supports that the recovered peptides retained DogTag-mediated
        ligation activity and indicates that both constructs can enter the
        subsequent reporter-substrate system.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        The GFP model provided a detectable readout for the scaffold coupling
        end and also brought a new use: once the peptide is attached to the
        reporter protein, cleavage can also be tracked through band changes. The
        next round therefore reused this product to check the MMP-responsive
        region. Cys conjugation on the liposome end was kept as an independent
        validation task, avoiding extending the result of one interface to the
        whole assembly system.
      </p>
      <h4 className="mt-4 mb-3">
        Cycle 5｜From ligation activity to responsive cleavage
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        After successful ligation, the key question turned to the responsive
        region: upon adding the target protease, does the linker peptide show
        changes consistent with cleavage? We wanted to use the GFP reporter
        substrate to convert hard-to-observe peptide changes into comparable
        band changes on a gel, and to use the Control to judge whether the
        difference is related to the responsive region.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We ligated the responsive peptide and the Control peptide to
        GFP-SnoopTag separately and used them in MMP cleavage experiments,
        setting different treatment times and retaining a 0 h starting sample.
        By comparing the intact substrate and lower-molecular-weight bands
        across the groups, we evaluated the cleavage response of the ligation
        products.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        The responsive-peptide group showed two closely spaced bands in the ~35
        kDa region, while the Control group was dominated by the corresponding
        higher-molecular-weight band. This difference is consistent with partial
        cleavage of the substrate, providing a preliminary clue for the
        cleavability of the responsive region. However, differences between
        groups already existed in the 0 h samples, so matched no-enzyme controls
        and consistent starting substrate are still needed to further judge
        enzyme dependence and the change of cleavage over time.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        This round advanced the &ldquo;cleavable&rdquo; design into an
        observable reporter system and clarified the conditions that needed to
        be unified for the next cleavage validation. At the same time, a gap
        remained between molecular cleavage and release of the intact carrier:
        liposome conjugation, multi-point anchoring, and the hydrogel network
        all need to enter the overall evaluation. The cellular delivery
        potential of the carrier itself can first be checked independently,
        establishing a cellular baseline for later release experiments.
      </p>
      <h3 className="mt-5 mb-3">
        III. Evaluation of cellular delivery performance
      </h3>
      <h4 className="mt-4 mb-3">
        Cycle 6｜From complex structure to cellular delivery evidence
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        Formation of the composite structure answered whether the carrier and
        mitochondria can establish an association, while cellular evaluation
        needs to judge whether this association helps delivery. At this stage,
        we first used pre-prepared liposome&ndash;mitochondria complexes to
        check the tracer signal in recipient cells, providing a reference for
        later evaluation of the carrier released from the scaffold.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We co-incubated stained mitochondria with liposomes to obtain the
        complexes, then added the complexes to recipient cells, with cells
        without complexes set as the control. Through cell staining and
        fluorescence imaging, we observed the positional relationship between
        the mitochondria-related green signal and the cells.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        Green fluorescence was visible in the cell region of the complex-treated
        group, and its distribution is consistent with the expectation that
        exogenous mitochondria enter the cells, providing a preliminary clue for
        cellular delivery. This result still needs three-dimensional
        localization and free-dye controls to further confirm intracellular
        distribution, and cannot yet be used to judge delivery efficiency or
        improvement of metabolic function.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        Cellular tracing allows us to keep tracking the delivery process, but
        the selection of subsequent conditions also needs to consider whether
        the cells tolerate the components of the system. The next round
        therefore extends the evaluation to the cytocompatibility of the linker
        peptide, using concentration and treatment time as variables to provide
        a basis for the conditions of the complete system.
      </p>
      <h4 className="mt-4 mb-3">
        Cycle 7｜From delivery observations to the cytocompatibility boundary
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        The linker peptide participates in carrier assembly and may come into
        contact with cells as an unreacted component or as cleavage fragments.
        We needed to understand how cells respond to this component before
        extending the compatibility evaluation to liposomes, complexes, and
        finally the scaffold. For this purpose, CCK-8 was used to compare
        relative cell viability at different peptide concentrations and
        treatment times.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We set up 5 &micro;M and 10 &micro;M peptide-treated groups, a cell
        control group, and a blank group, with measurements at 24, 48, and 96 h.
        Blank wells were used to correct the background, and contemporaneous
        cell controls served as the reference, observing how the viability
        readout changes over time.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        The peptide-treated groups showed a drop in viability readout at the
        early time point, then recovered; the 48&ndash;96 h readouts were closer
        to the control level than the early ones. The early change may be
        related to the initial cell state, attachment, or the treatment process,
        and the influence of peptide exposure must also be considered; the
        current results are not enough to attribute it to a single factor.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        Judging compatibility requires considering concentration, time, and cell
        state simultaneously. The later recovery of the readout provides a basis
        for continued optimization, while the early drop indicates that
        subsequent work should unify cell seeding and dosing conditions and
        examine this change through independent repeats and additional
        observations of cell state. Evaluation of the peptide also needs to be
        progressively extended to the complete delivery system, so that it can
        guide condition selection together with carrier delivery performance.
      </p>
      <p>
        These engineering cycles gradually gave the mitochondrial module
        components that can be checked separately: liposomes provide the carrier
        interface, the linker peptide coordinates anchoring and dissociation,
        and the GFP model turns ligation and cleavage into observable changes.
        Difficulties in ultrafiltration recovery drove adjustments to the
        detection methods and clarified which interfaces already have support
        and which still need independent validation.
      </p>
      <p>
        Next, we will first improve the quantification and controls for
        peptide&ndash;liposome conjugation, then couple the carrier to SELP and
        compare retention and release with and without MMP action; afterward we
        will use the released carrier for cellular delivery, mitochondrial
        function, and cytocompatibility evaluation. In this way, ligation,
        dissociation, and delivery can be examined in the same system and
        gradually answer whether this module can provide the metabolic support
        that damaged chondrocytes need.
      </p>
    </>
  );
}
