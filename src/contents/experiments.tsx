export function Experiments() {
  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article>
          <h2 className="mb-4">Mitochondrial Therapeutic Module</h2>
          <p>
            Our experiments examined the key steps underlying the proposed
            mitochondrial therapeutic strategy: responsive protein expression,
            construction and characterization of the liposomal delivery system,
            and functional validation. We first produced the engineered peptides
            and assessed their conjugation capability, then constructed
            liposome–mitochondria complexes, and finally evaluated protease
            responsiveness and cellular delivery.
          </p>
          <h3 className="mt-5 mb-3">Responsive Protein Expression</h3>
          <h4 className="mt-4 mb-3">
            Expression Screening and Protein Purification
          </h4>
          <p>
            The responsive peptide connects the liposomal carrier to the SELP
            scaffold. Obtaining a functional peptide suitable for subsequent
            assembly was therefore the starting point of our experimental work.
          </p>
          <p>
            We expressed the responsive and control peptides as His/SUMO fusion
            proteins in Escherichia coli BL21(DE3). Different induction
            conditions were compared using uninduced samples as controls.
            Soluble and insoluble lysate fractions were examined by SDS-PAGE and
            Western blotting to assess protein distribution and guide expression
            scale-up and purification.
          </p>
          <p>
            Initial electrophoresis experiments produced weak or poorly resolved
            bands, limiting interpretation of protein expression. We therefore
            adjusted the induction and electrophoresis conditions and used
            Western blotting as an additional detection method. Selected
            conditions were subsequently applied to larger cultures.
          </p>
          <p>
            The fusion proteins were purified using His-tag affinity
            chromatography. By comparing the lysate, flow-through, wash, and
            elution fractions, we followed protein recovery throughout
            purification and selected target-containing fractions for further
            processing.
          </p>
          <h4 className="mt-4 mb-3">Tag Removal and Conjugation Capability</h4>
          <p>
            To recover peptides for subsequent conjugation, we used TEV cleavage
            to remove the expression tags, followed by reverse nickel affinity
            separation. Cleaved and uncleaved samples, together with the
            collected fractions, were compared by SDS-PAGE to assess cleavage
            and separation.
          </p>
          <p>
            Because the target peptides were small and difficult to detect
            directly by electrophoresis, we introduced GFP-SnoopTag as a
            reporter to examine whether the recovered peptides retained
            DogTag-mediated conjugation capability. Responsive and control
            peptides were tested in parallel, with reactions lacking SnoopLigase
            serving as comparisons.
          </p>
          <p>
            Higher-molecular-weight bands consistent with conjugate formation
            appeared in the presence of the ligase, supporting retention of
            peptide conjugation activity. This model reaction also provided
            detectable substrates for the subsequent MMP cleavage assay. It
            validated the protein connection step rather than directly
            demonstrating carrier attachment to the SELP hydrogel.
          </p>
          <h3 className="mt-5 mb-3">
            Liposomal Delivery System Construction and Characterization
          </h3>
          <h4 className="mt-4 mb-3">
            Functionalized Liposomes and Peptide Conjugation
          </h4>
          <p>
            The liposomal carrier needed to associate with mitochondria while
            providing attachment sites for the engineered peptide. We therefore
            prepared liposomes containing DOPE, DOTAP, and DSPE-PEG-Mal, with
            the latter supplying maleimide groups for surface conjugation.
          </p>
          <p>
            The Cys-containing peptide was incubated with functionalized
            liposomes, and liposomes without added peptide were retained as a
            comparison. We then investigated separation of unbound peptide from
            carrier-associated material as a basis for assessing conjugation.
          </p>
          <p>
            This stage encountered limitations in both separation and detection.
            Liposome loss occurred during centrifugal filtration, and lipid
            components interfered with the colorimetric measurements, preventing
            reliable differentiation between free and carrier-associated
            peptide. These data were therefore not used to calculate a
            quantitative conjugation efficiency, and post-conjugation separation
            and analysis require further optimization.
          </p>
          <h4 className="mt-4 mb-3">
            Mitochondrial Isolation and Fraction Identification
          </h4>
          <p>
            In parallel with liposome preparation, we cultured cells and
            isolated mitochondria. Early preparations contained relatively
            sparse fluorescent particles, prompting adjustments to the starting
            cell number to obtain sufficient material for characterization and
            assembly.
          </p>
          <p>
            We assessed the isolated fractions by detecting TOMM20 and COX IV as
            outer- and inner-membrane mitochondrial markers, respectively.
            Whole-cell input, cytoplasmic supernatant, and mitochondrial pellet
            samples were compared by Western blotting. This fraction-based
            comparison supported identification of mitochondrial components in
            the recovered material for subsequent complex construction.
          </p>
          <h4 className="mt-4 mb-3">
            Characterization of Mitochondrial Encapsulation
          </h4>
          <p>
            To examine assembly of the liposome–mitochondria complexes, we
            combined confocal imaging with transmission electron microscopy,
            assessing both fluorescence distribution and microscopic structure.
          </p>
          <p>
            DiD and MitoTracker Green were used to label the lipid and
            mitochondrial components, respectively. Dual-channel imaging
            revealed overlapping fluorescence signals, providing preliminary
            evidence of association between liposomes and mitochondria.
          </p>
          <p>
            We subsequently completed transmission electron microscopy
            characterization of the complexes, confirming mitochondrial
            encapsulation by the liposomes. Together, fluorescence
            colocalization and ultrastructural evidence supported successful
            construction of the liposome–mitochondria delivery system.
          </p>
          <h3 className="mt-5 mb-3">Functional Validation</h3>
          <h4 className="mt-4 mb-3">MMP-Responsive Cleavage</h4>
          <p>
            The proposed release mechanism depends on proteolytic cleavage of
            the engineered linker. We therefore examined whether the responsive
            sequence remained susceptible to cleavage after conjugation to the
            reporter protein.
          </p>
          <p>
            Responsive peptide–GFP and control peptide–GFP conjugates were
            incubated with the MMP preparation under matched conditions. Samples
            were collected over a time course and analyzed by SDS-PAGE to follow
            changes in the intact conjugates and compare band patterns between
            the two groups.
          </p>
          <p>
            The responsive samples showed band changes consistent with
            proteolytic cleavage, supporting MMP responsiveness of the
            engineered sequence. The control peptide provided a comparison for
            assessing the contribution of the responsive sequence to cleavage.
            This assay addressed a soluble reporter substrate; carrier release
            from an intact SELP hydrogel requires separate evaluation of
            attachment and physical retention within the network.
          </p>
          <h4 className="mt-4 mb-3">
            Cellular Delivery and Intracellular Localization
          </h4>
          <p>
            To determine whether the complexes could enter recipient cells, we
            incubated cells with the liposome–mitochondria preparation and
            performed multichannel confocal imaging with mitochondrial, nuclear,
            and plasma membrane staining.
          </p>
          <p>
            Plasma membrane staining defined the cell boundaries, nuclear
            staining provided an intracellular spatial reference, and
            mitochondrial labeling tracked the delivered cargo. Joint
            examination of the channels confirmed that complex-associated
            mitochondrial signals were located within the membrane-defined
            intracellular region, demonstrating cellular internalization of the
            delivery system.
          </p>
          <p>
            Together, TEM-confirmed encapsulation and multichannel imaging of
            intracellular localization validated two key steps: complex
            construction and cellular delivery. Further functional evaluation
            will determine whether the delivered mitochondria retain their
            activity and influence the metabolic state of recipient cells.
          </p>
        </article>
      </div>
    </div>
  );
}
