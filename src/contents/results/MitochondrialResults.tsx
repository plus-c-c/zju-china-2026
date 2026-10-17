export function MitochondrialResults() {
  return (
    <>
      <h3
        id="wetlab-delivery-01"
        data-toc="include"
        data-toc-depth="2"
        className="mt-5 mb-3"
      >
        Mitochondrial therapeutic module
      </h3>
      <p>
        Around the construction and delivery of the mitochondrial carrier, we
        obtained the engineered responsive peptide, validated its protein
        ligation capability and MMP responsiveness, and completed structural
        characterization and cell-delivery validation of the
        liposome&ndash;mitochondria complexes.
      </p>
      <h4
        id="wetlab-delivery-02"
        data-toc="include"
        data-toc-depth="3"
        className="mt-5 mb-3"
      >
        Responsive protein expression
      </h4>
      <h5
        id="wetlab-delivery-03"
        data-toc="include"
        data-toc-depth="4"
        className="mt-4 mb-3"
      >
        Expression plasmid and control design
      </h5>
      <p>
        To obtain the fusion proteins for subsequent ligation and cleavage
        validation, we used the pET-28a vector backbone and designed the
        responsive-group expression plasmid pET28a-MMP13sp and the control-group
        plasmid pET28a-Control, both 5691 bp in full length (figure X). The two
        groups share the same expression framework, both containing the T7
        promoter and a kanamycin resistance gene. From N-terminus to C-terminus,
        the target fusion protein contains a 6&times;His tag, a SUMO fusion tag,
        a TEV cleavage site, a Cys conjugation site, the responsive or control
        fragment, and DogTag, with GGGGS linkers flanking the responsive or
        control fragment.
      </p>
      <p>
        The responsive group contains the peptide RRGPLGLSLGKR designed for
        MMP-13 cleavage; the control group replaces it with the scrambled
        peptide RKGLSLGLPGRR. Both sequences consist of 12 amino acids of
        identical length and composition, differing only in order, while the
        rest of the plasmid sequence is identical. This control design allows
        the cleavage behavior of the two groups under identical treatment
        conditions to be compared, evaluating the contribution of the responsive
        sequence to protease cleavage.
      </p>
      <p>
        Both groups retain the 6&times;His tag and TEV cleavage site for
        subsequent purification and tag removal, as well as the Cys site and
        DogTag for carrier conjugation and protein ligation, providing the basis
        for parallel expression, ligation-function, and MMP-responsiveness
        validation.
      </p>
      {/* One figure removed from the draft (figure X: plasmid design) */}
      <h5
        id="wetlab-delivery-04"
        data-toc="include"
        data-toc-depth="4"
        className="mt-4 mb-3"
      >
        Plasmid transformation and antibiotic selection
      </h5>
      <p>
        We transformed the responsive-protein expression plasmid into{" "}
        <em>E. coli</em> BL21(DE3) and spread it on kanamycin-containing LB
        solid medium for antibiotic selection. After cultivation, multiple
        independent colonies appeared on the experimental plate, while no
        obvious colonies grew on the control plate (figure X), supporting that
        candidate transformants were obtained. Single colonies were then picked
        and expanded for induced expression of the fusion protein.
      </p>
      {/* One figure removed from the draft (figure X: transformation plates) */}
      <h5
        id="wetlab-delivery-05"
        data-toc="include"
        data-toc-depth="4"
        className="mt-4 mb-3"
      >
        Fusion protein expression and purification
      </h5>
      <p>
        To screen suitable induction conditions, we compared protein expression
        at different IPTG concentrations. Initial screening showed clearly
        visible target-protein bands at 0.25 mM and 0.5 mM IPTG, so these two
        conditions were chosen for scale-up expression. Addressing weak bands
        and insufficient separation in early electrophoresis, we used Western
        blot to assist detection of the target protein and further adjusted the
        expression and electrophoresis conditions.
      </p>
      <p>
        We then purified the responsive-group and scrambled-control-group fusion
        proteins by Ni-NTA affinity chromatography, collecting the lysate,
        flow-through, wash, and elution fractions for SDS-PAGE analysis. In both
        groups induced with 0.25 mM IPTG, an enriched band in the 15&ndash;25
        kDa range was observed in the elution fraction (figure X), consistent
        with the expected molecular weight range of the target fusion protein,
        supporting expression and enrichment of both the responsive and control
        fusion proteins.
      </p>
      <p>
        The purified samples were dialyzed for subsequent experiments. One batch
        of responsive-peptide fusion protein measured 0.43 mg/mL, and the
        control protein measured 0.52 mg/mL, providing material for subsequent
        tag removal, protein ligation, and cleavage validation.
      </p>
      {/* One figure removed from the draft (figure X: Ni-NTA purification) */}
      <h5
        id="wetlab-delivery-06"
        data-toc="include"
        data-toc-depth="4"
        className="mt-4 mb-3"
      >
        TEV cleavage and recovery of functional peptides
      </h5>
      <p>
        To remove the SUMO tag from the responsive-group fusion protein and
        release the responsive peptide for subsequent ligation and functional
        validation, we incubated the purified fusion protein with TEV protease
        at 30 &deg;C, sampling after 1, 2, and 4 hours of reaction and including
        a control without TEV, and analyzed the cleavage by SDS-PAGE.
      </p>
      <p>
        Electrophoresis showed that at all three time points a band of the
        released SUMO tag appeared after cleavage, with an apparent molecular
        weight in the 15&ndash;25 kDa range (figure X, red arrow), migrating
        differently from the uncleaved fusion protein, supporting successful
        TEV-mediated removal of the SUMO tag. The band indicated by the yellow
        arrow corresponds to the added TEV protease, with a molecular weight of
        about 27 kDa. These results provided the basis for subsequent isolation
        of the responsive peptide and protein ligation experiments.
      </p>
      {/* One figure removed from the draft (figure X: TEV cleavage) */}
      <p>
        To verify the ligation capability of the functional peptide, we mixed
        the DogTag-containing peptide with the GFP-SnoopTag reporter protein and
        SnoopLigase, reacted at room temperature for 1 h, and analyzed the
        ligation result by SDS-PAGE. As a positive control we used the enzymatic
        ligation of SUMO-DogTag with GFP-SnoopTag, and as a negative control
        reactions without SnoopLigase.
      </p>
      <p>
        Compared with the negative control, the peptide experimental group
        showed a new higher-molecular-weight band above the main GFP-SnoopTag
        band (figure X, red arrow), whose shift is consistent with formation of
        the peptide&ndash;GFP-SnoopTag ligation product. The band indicated by
        the yellow arrow corresponds to SnoopLigase, with an apparent molecular
        weight in the 10&ndash;15 kDa range. These results support the presence
        in the recovered samples of a peptide with DogTag ligation activity, and
        provide a reporter substrate detectable by electrophoresis for
        subsequent MMP responsiveness studies.
      </p>
      <p>
        Because the concentration of the recovered peptide was low, we
        subsequently concentrated the samples by freeze-drying to meet the
        sample requirements of the subsequent ligation and cleavage validation.
      </p>
      {/* One figure removed from the draft (figure X: ligation with GFP reporter) */}
      <h4
        id="wetlab-delivery-07"
        data-toc="include"
        data-toc-depth="3"
        className="mt-5 mb-3"
      >
        Construction and characterization of the liposomal delivery system
      </h4>
      <h5
        id="wetlab-delivery-08"
        data-toc="include"
        data-toc-depth="4"
        className="mt-4 mb-3"
      >
        Mitochondrial extraction and fraction confirmation
      </h5>
      <p>
        To prepare the liposome&ndash;mitochondria complexes, we first isolated
        mitochondrial samples and detected the mitochondrial marker proteins COX
        IV (an inner-membrane protein) and TOMM20 (an outer-membrane protein).
        Western blot results showed detectable signals of the corresponding
        proteins in the extracted fraction (pellet), supporting that the samples
        contained mitochondrial components and providing the material basis for
        subsequent carrier assembly (figure X).
      </p>
      {/* One figure removed from the draft (figure X: Western blot of mitochondrial markers) */}
      <h5
        id="wetlab-delivery-09"
        data-toc="include"
        data-toc-depth="4"
        className="mt-4 mb-3"
      >
        Preparation of functionalized liposomes
      </h5>
      <p>
        To construct a carrier for mitochondrial delivery that can interface
        with the engineered linker peptide, we prepared functionalized liposomes
        from DOPE, DOTAP, and DSPE-PEG-Mal. The DSPE-PEG-Mal was introduced to
        provide maleimide reactive sites for subsequent conjugation with the Cys
        sulfhydryl of the linker peptide.
      </p>
      <p>
        The prepared liposome suspension had a milky white appearance (figure
        X). It was then co-incubated with the isolated mitochondria to construct
        liposome&ndash;mitochondria complexes, and the spatial association
        between the components and the encapsulation structure were further
        evaluated by fluorescence imaging and transmission electron microscopy.
      </p>
      {/* One figure removed from the draft (figure X: liposome suspension) */}
      <h5
        id="wetlab-delivery-10"
        data-toc="include"
        data-toc-depth="4"
        className="mt-4 mb-3"
      >
        Characterization of the complexes
      </h5>
      <h6 id="wetlab-delivery-11" className="mt-4 mb-2">
        Confocal fluorescence characterization
      </h6>
      <p>
        To observe the spatial distribution of liposomes and mitochondria, we
        labeled liposomes with DiD and mitochondria with MitoTracker Green, and
        performed confocal fluorescence imaging of the assembled complexes,
        acquiring green fluorescence, red fluorescence, and bright-field images.
      </p>
      <p>
        The imaging results showed mitochondria labeled with MitoTracker Green
        as green fluorescence and DiD-labeled liposomes as red fluorescence. The
        two signals overlapped at multiple positions, with yellow&ndash;orange
        regions visible in the merged image (figure X), supporting spatial
        association between liposomes and mitochondria. Whether the complexes
        form an encapsulation structure was further evaluated by transmission
        electron microscopy.
      </p>
      {/* One figure removed from the draft (figure X: confocal imaging) */}
      <h6 id="wetlab-delivery-12" className="mt-4 mb-2">
        Transmission electron microscopy characterization
      </h6>
      <p>
        To further evaluate the encapsulation structure of the
        liposome&ndash;mitochondria complexes, we observed functionalized
        liposomes, free mitochondria, and the assembled complexes by
        transmission electron microscopy (TEM), comparing their morphology and
        structural features (figure XA&ndash;C).
      </p>
      <p>
        The liposome samples showed vesicle-like structures with membranous
        contours (figure XA). In the liposome&ndash;mitochondria complexes, an
        outer membrane-like structure surrounding internal components was
        observed (figure XC), consistent with the expected configuration of
        liposomes encapsulating mitochondria and providing morphological support
        for the formation of the encapsulation structure. Together with the
        overlapping fluorescence signals in confocal imaging, these results
        support the construction of liposome&ndash;mitochondria complexes.
      </p>
      {/* One figure removed from the draft (figure X: TEM images) */}
      <h5
        id="wetlab-delivery-13"
        data-toc="include"
        data-toc-depth="4"
        className="mt-4 mb-3"
      >
        Preliminary evaluation of peptide conjugation to liposomes
      </h5>
      <p>
        To attach the liposomal carrier to the protein ligation system, we
        attempted conjugation of the peptide to the liposome surface through the
        reaction between the Cys sulfhydryl of the linker peptide and the
        maleimide groups on the liposome surface. After the reaction,
        ultrafiltration was used to separate unbound free peptide, and protein
        quantification was combined with it to evaluate the conjugation.
      </p>
      <p>
        During evaluation, the ultrafiltration separation suffered from unstable
        sample recovery and losses, and the liposome system also interfered with
        protein colorimetric assays, making it difficult for the existing
        detection to distinguish the contributions of covalent conjugation,
        non-specific adsorption, and separation loss to the measured result.
        Therefore, conjugation success cannot be judged solely from the decrease
        in free peptide after separation, and a reliable conjugation efficiency
        cannot currently be calculated.
      </p>
      <p>
        Follow-up work needs to further optimize the separation and
        quantification methods, combining recovery-rate evaluation and liposome
        controls without maleimide groups to establish a reliable conjugation
        validation workflow, providing the basis for integrating the delivery
        carrier with the SELP scaffold.
      </p>
      <h4
        id="wetlab-delivery-14"
        data-toc="include"
        data-toc-depth="3"
        className="mt-5 mb-3"
      >
        Functional validation
      </h4>
      <h5
        id="wetlab-delivery-15"
        data-toc="include"
        data-toc-depth="4"
        className="mt-4 mb-3"
      >
        Validation of SnoopLigase-mediated ligation activity of the linker
        peptide
      </h5>
      <p>
        To validate the ligation activity of the DogTag module in the linker
        peptide, we mixed the responsive-group protein (MMP13-DogTag) and the
        scrambled control-group protein (Control-DogTag) separately with the
        GFP-SnoopTag reporter protein, set up reaction groups with and without
        SnoopLigase, and analyzed the formation of ligation products by
        SDS-PAGE.
      </p>
      <p>
        The results showed that in both the responsive and control groups with
        SnoopLigase, a higher-molecular-weight band appeared near 55 kDa (figure
        X, red arrow), while no obvious band at the same position appeared in
        the corresponding no-enzyme groups. This migration change is consistent
        with the expected increase in molecular weight after the two proteins
        ligate to GFP-SnoopTag, supporting formation of the SnoopLigase-mediated
        ligation product.
      </p>
      <p>
        These results support that both the responsive group and the scrambled
        control group retained DogTag-mediated ligation activity, and provide
        the experimental basis for subsequently comparing the MMP-13 cleavage
        response of the two reporter substrates.
      </p>
      {/* One figure removed from the draft (figure X: SnoopLigase-mediated ligation) */}
      <h5
        id="wetlab-delivery-16"
        data-toc="include"
        data-toc-depth="4"
        className="mt-4 mb-3"
      >
        MMP-13 cleavage validation of the responsive linker peptide
      </h5>
      <p>
        To evaluate the MMP-13 responsiveness of the linker peptide, we ligated
        the responsive peptide (Pep) and the scrambled control peptide (Control)
        separately to GFP-SnoopTag, constructing reporter substrates detectable
        by electrophoresis. MMP-13 cleavage was then performed, with sampling at
        0, 2, 4, 6, and 24 h, and the band changes of the ligation products were
        analyzed by SDS-PAGE.
      </p>
      <p>
        Electrophoresis showed that the control group retained a
        slower-migrating band in the ~35 kDa region, corresponding to the
        uncleaved GFP&ndash;peptide ligation product (figure X, red arrow); in
        the Pep group the corresponding higher-molecular-weight band was weaker
        or not clearly detected. This band pattern is consistent with cleavage
        of the responsive-peptide ligation product, suggesting MMP-13 cleavage
        responsiveness. Considering that differences between groups already
        existed in the 0 h samples, it is still necessary to combine pre-enzyme
        substrate and no-enzyme controls to further confirm that the difference
        arises from cleavage rather than from differences in the initial
        ligation product composition between the two groups.
      </p>
      {/* One figure removed from the draft (figure X: MMP-13 cleavage) */}
      <h5
        id="wetlab-delivery-17"
        data-toc="include"
        data-toc-depth="4"
        className="mt-4 mb-3"
      >
        Cellular delivery evaluation of the liposome&ndash;mitochondria
        complexes
      </h5>
      <p>
        To evaluate the cellular delivery capability of the
        liposome&ndash;mitochondria complexes, we first labeled isolated
        mitochondria with MitoTracker Green, then co-incubated the stained
        mitochondria with liposomes to obtain liposome&ndash;mitochondria
        complexes. The complexes were then added to recipient cell cultures, and
        combined with Hoechst 33342 nuclear staining, bright-field, and
        fluorescence imaging to observe the distribution of labeled mitochondria
        in the cells.
      </p>
      <p>
        The imaging results showed green fluorescence signals in cells of the
        complex-treated group, with the merged image showing green signal
        distributed within the cell outlines and around the nuclei (figure XA);
        no obvious corresponding green fluorescence was seen in the control
        group (figure XB). These results suggest that exogenous mitochondria in
        the complexes can enter recipient cells, providing preliminary imaging
        support for the cellular delivery capability of the
        liposome&ndash;mitochondria complexes.
      </p>
      {/* One figure removed from the draft (figure X: cellular delivery imaging) */}
      <h5
        id="wetlab-delivery-18"
        data-toc="include"
        data-toc-depth="4"
        className="mt-4 mb-3"
      >
        Biosafety validation
      </h5>
      <p>
        To preliminarily evaluate the in vitro cytocompatibility of the
        functional peptide, we measured the relative cell viability after
        peptide treatment using the CCK-8 assay. The experiment included a
        control group, a blank group, and peptide-treated groups (figure XA),
        examining cell viability after treatment with 5 &micro;M and 10 &micro;M
        peptide for 24, 48, and 96 h.
      </p>
      <p>
        The results showed that after 24 h of treatment, the relative cell
        viability of the 5 &micro;M and 10 &micro;M groups was about 70% and
        55%, respectively. At 48 h, both groups reached about 85%&ndash;90%; by
        96 h, both groups remained in the range of about 85%&ndash;95% (figure
        XB). These results indicate that the peptide treatment groups at both
        concentrations had high relative cell viability at the later time
        points.
      </p>
      <p>
        The lower cell viability at 24 h may be related to the initial state of
        the cells themselves at the start of the experiment, but the current
        data cannot clearly distinguish the effects of cell state from those of
        peptide treatment. This experiment provides preliminary data on the
        cytocompatibility of the functional peptide; follow-up work needs
        repeated validation under controlled initial cell states to further
        clarify the cause of the early viability change and suitable dosing
        conditions.
      </p>
      {/* One figure removed from the draft (figure X: CCK-8 results) */}
      {/* Original draft note: contains AI-generated content from Doubao Work */}
    </>
  );
}
