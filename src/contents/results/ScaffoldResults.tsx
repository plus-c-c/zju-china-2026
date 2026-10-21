export function ScaffoldResults() {
  return (
    <>
      {/* Draft note: figure legends and captions still to be added */}
      <h2 className="mb-4">Hydrogel scaffold</h2>
      <p>
        We verified normal expression and purification of the scaffold protein,
        used the obtained protein to prepare hydrogel solutions and validate the
        photocrosslinking approach, and then measured the mechanical properties
        and biocompatibility of the material. On this basis, we extended the
        scaffold from a single length into a series in which both length and
        interface density are programmable, and verified that the same
        expression and purification method is generalizable across the
        constructs of the series.
      </p>
      <h2 className="mt-5 mb-3">
        Scaffold plasmid design: a PRe-RDL platform for recursive doubling and
        interface insertion
      </h2>
      <p>
        The 2KY scaffold is assembled from tandem repeats of a 171 bp / 57 aa
        unit, <code>(GAGAGS)₂–GRGDS–GKGVP–(GVGVP)₃–GYGVP–(GVGVP)₃</code>. Genes
        this highly repetitive cannot be extended by conventional PCR or
        homologous recombination: every repeat is an identical primer-binding
        site, so a primer annealing inside any repeat initiates on all repeats
        at once, and the products differ by one repeat unit in length, which is
        inseparable at the whole-plasmid scale.
      </p>
      <p>
        We therefore did not treat 2KY-5 as a fixed sequence, but designed it as
        a cassette structure that can be recursively doubled, following the
        PRe-RDL (recursive directional ligation by plasmid reconstruction)
        approach of the Chilkoti group. Specifically, a BseRI recognition site
        (GAGGAG) is embedded in the GGGGS linker 14 bp upstream of the repeat
        array, and an AcuI recognition site (coding strand CTTCAG) is embedded
        in the GGSGGSSGS tail 17 bp downstream. Both are type IIS restriction
        enzymes that cut outside their recognition sequences — BseRI at 10/8 and
        AcuI at 16/14 — each leaving a 2-nucleotide 3&prime; overhang; the
        phases of the two flanking linkers are designed so that both overhangs
        are exactly GG, identical to the first two bases of the repeat array.
        Therefore, digesting the plasmid with <em>AcuI + XbaI</em> and{" "}
        <em>BseRI + XbaI</em> respectively, taking the gene-containing half from
        each and ligating them, makes one cycle double the repeat array and
        rebuild the plasmid, with no extra bases left at the junction, the
        reading frame unchanged, and both enzyme sites retained outside the
        doubled array, so the cycle can be repeated iteratively.
      </p>
      <p>
        The key to this design is that the enzyme recognition sites lie within
        the flanking linkers and never enter the repeat array itself, so it is
        not constrained by the codon degeneracy of a glycine/alanine-rich
        sequence such as 2KY — precisely the obstacle that classic RDL cannot
        overcome for this class of sequence.
      </p>
      <p>
        In parallel, we reserved three SnoopTag2 docking positions on the
        plasmid; their positions relative to the two restriction sites determine
        the fate of the tag during doubling:
      </p>
      {/* Two figures removed from the draft (SnoopTag2 docking positions and doubling scheme) */}
      <p>
        This project uses the second position, so that every 2KY-5 block carries
        one SnoopTag2 after it; scaffold length and interface count thus become
        a single quantity that can be programmed together, rather than two
        variables that must be built separately.
      </p>
      <p>
        On this basis we whole-gene synthesized the single parental plasmid{" "}
        <strong>pET19b-2KY5-RDL (6636 bp)</strong>, and all three remaining
        constructs were derived from it experimentally (figure).
        {/* Draft note: replace "base pairs" with "bp" in the figure */}
      </p>
      {/* One figure removed from the draft (derivation of the three constructs) */}
      <h2 className="mt-5 mb-3">Scaffold protein 2KY-5</h2>
      <h3 className="mt-5 mb-3">Expression of scaffold protein 2KY-5</h3>
      <p>
        We transformed the synthesized pET19b-2KY5-RDL into <em>E. coli</em>{" "}
        BL21(DE3) for subsequent protein expression and obtained successfully
        transformed colonies (figure). The correctness of the plasmid was first
        verified by colony PCR. Because the insert consists of a fully
        repetitive sequence, we chose the T7 promoter primer and the T7
        terminator primer, which lie outside the insert, as the upstream and
        downstream primers — this pair is universal to all constructs of the
        series, and the product size varies with the repeat number, so the copy
        number can be read directly from the band position. Agarose gel
        electrophoresis of the PCR product showed a band at 1152 bp, consistent
        with the theoretical value for 2KY-5, and sequencing of the insert after
        submitting the bacterial culture confirmed the sequence (figure).
      </p>
      {/* Two figures removed from the draft (transformation colonies and colony PCR) */}
      <p>
        The expression strain was then inoculated into Amp-containing LB medium
        and cultured; IPTG was added to a final concentration of 1 mM at
        mid-logarithmic phase for induction, and cells were harvested after
        about 6 hours of induction and lysed by sonication to obtain the
        supernatant. Samples of the culture before induction, after induction,
        and the supernatant and pellet after lysis were analyzed by SDS-PAGE: at
        the target molecular weight the pre-induction lane was blank while a
        band appeared after induction, proving successful IPTG induction with no
        basal expression. Meanwhile, the target band was present in the lysate
        supernatant and only faint in the pellet, showing that the initial
        approach of recovering 2KY-5 from lysed cells was feasible.
      </p>
      {/* One figure removed from the draft (SDS-PAGE of induction and lysis) */}
      <h3 className="mt-5 mb-3">Purification of scaffold protein 2KY-5</h3>
      <p>
        We purified 2KY-5 from the cell-lysis supernatant by ITC. In preliminary
        experiments we found that the original conditions lost a considerable
        amount of protein during the high-temperature phase transition; to
        improve the purification yield, we performed gradient experiments on two
        parameters of this stage — buffer salt concentration and heating
        temperature — and analyzed the post-heating supernatant (H-Sup.) and the
        post-cooling supernatant (C-Sup.) for each condition by SDS-PAGE,
        comparing the band intensities of the two to estimate which condition
        gave the highest recovery. A denser post-heating supernatant band
        indicates more protein not recovered during purification, while a denser
        post-cooling supernatant band indicates a higher protein yield after
        purification. As the figure shows, raising the temperature had little
        effect on the purification yield, whereas the buffer salt concentration
        was the more significant factor, and the 2 M NaCl buffer gave the best
        purification yield (figure).
      </p>
      {/* Two figures removed from the draft (H-Sup./C-Sup. gradient comparison) */}
      <p>
        We then carried out subsequent purification under the best conditions
        found (65 &deg;C heating, 2 M NaCl PBS), and analyzed samples collected
        throughout the ITC process — the lysis supernatant, the
        post-phase-transition supernatant, the pellet after cooling and
        redissolution, and the post-cooling supernatant — by SDS-PAGE to confirm
        the purification effect. Compared with the initial lysis supernatant,
        the contaminant bands in the post-cooling supernatant collected after
        ITC disappeared, while the 2KY-5 band was present only in the final
        solution, supporting enrichment of the target protein (figure).
      </p>
      {/* One figure removed from the draft (SDS-PAGE of the ITC process) */}
      <p>
        The purified 2KY-5 supernatant was concentrated with a 10 kDa cutoff
        ultrafiltration tube by centrifugation at 3500g for 30 min, yielding
        about 5 mL of concentrated solution; samples before and after
        concentration were measured by the BCA method, giving a concentration
        factor of about 3.5 (figure).
      </p>
      {/* One figure removed from the draft (BCA quantification) */}
      <p>
        Residual salt was then removed by dialysis against a membrane for 24
        hours. The dialyzed liquid was stored in a &minus;80 &deg;C freezer;
        after complete freezing, the top of the centrifuge tube was wrapped with
        filter paper and quickly transferred to a freeze dryer, and lyophilized
        for 12 hours into a powder for storage and subsequent hydrogel
        preparation. Our laboratory&rsquo;s specific workflow and equipment are
        shown in the figure (figure). Based on the yield calculation, 1 L of
        bacterial culture produced close to 500 mg of protein; this is a high
        yield under our current routine induction and expression conditions,
        suitable for further optimization of production conditions toward
        industrial-scale production, with considerable commercial value.
      </p>
      {/* One figure removed from the draft (laboratory workflow and equipment) */}
      <h3 className="mt-5 mb-3">
        Photocrosslinking of scaffold protein 2KY-5 and hydrogel preparation
      </h3>
      <p>
        Using the prepared 2KY-5 lyophilized powder, a 10% (w/v) hydrogel
        precursor solution containing 2/20 mM Ru/SPS photoinitiator was prepared
        and placed in a 1.5 mL centrifuge tube. The system was then irradiated
        with blue light at a wavelength of 450 nm; after 2 seconds of
        illumination the tube was inverted to observe the internal state — the
        unilluminated system flowed to the bottom on inversion, whereas the
        illuminated system stayed in place, proving that the system had fully
        crosslinked after 2 seconds of blue-light illumination.
      </p>
      {/* Two figures removed from the draft (inversion test) */}
      {/* Two video placeholders from the draft: 未照光.mp4, 蓝光照射.mp4 */}
      <h3 className="mt-5 mb-3">Hydrogel property characterization</h3>
      {/* Draft note (待补充1): this subsection is still to be supplemented */}
      <p>Hydrogel adhesion and elastic properties:</p>
      {/* Two video placeholders from the draft (hydrogel adhesion and elasticity recordings) */}
      <h2 className="mt-5 mb-3">
        Construction and production of hydrogels with different repeat numbers
      </h2>
      <h3 className="mt-5 mb-3">
        Plasmid construction, expression, and purification of scaffold protein
        2KY-10
      </h3>
      <p>
        2KY-10 was not chemically synthesized but obtained directly from
        pET19b-2KY5-RDL by one round of PRe-RDL (figure). The plasmid was
        divided into two portions: one digested with AcuI + XbaI (digestion A)
        and one with BseRI + XbaI (digestion B). All three enzymes work at 37
        &deg;C in rCutSmart buffer and can be used for direct double digestion;
        the digestion time was kept within 2 hours and the enzyme amount below
        10 U/&micro;g to avoid the star activity of AcuI (the AcuI reaction
        requires supplementary SAM).
      </p>
      <p>
        Digestion A produced 4 fragments, from which the 1008 bp target fragment
        containing the scaffold gene was taken; digestion B produced 2
        fragments, from which the 6483 bp large fragment was taken and the 153
        bp small fragment discarded. The two target fragments were gel-purified,
        mixed in equimolar amounts, ligated with T4 ligase at 16 &deg;C
        overnight, and transformed into DH5&alpha; (figure).
      </p>
      <p>
        One design safeguard is worth explaining here: the plasmid backbone
        naturally carries two background AcuI sites, but the 3&prime; overhangs
        they produce are CG and TT, which are not complementary to the designed
        GG overhang, so background fragments cannot be chemically incorporated
        into the correct product; the only source that could ligate back into
        the parental plasmid is the 153 bp small fragment in digestion B, which
        differs from the target fragment by more than a factor of 40 and is
        removed simply by gel excision. In other words, the specificity of the
        entire doubling process is guaranteed by the overhang sequences rather
        than by gel resolution.
      </p>
      {/* One figure removed from the draft (double digestion and ligation scheme) */}
      <p>
        Single colonies were picked for colony PCR (T7 promoter / T7 terminator
        primer pair): the band shifted upward from 1152 bp for 2KY-5 to 2007 bp,
        and the 855 bp difference corresponds exactly to one 2KY-5 unit, proving
        successful doubling. Sequencing confirmed that the repeat region
        consisted of 10 complete monomers with no deletion (figure). Target
        colonies were then picked for plasmid amplification; because this
        plasmid is low-copy, streptomycin was added when the culture reached an
        OD of about 0.6 to promote plasmid amplification, after which the
        plasmid was extracted with a midiprep kit, and Nanodrop measurements
        showed that both plasmid concentration and purity reached good levels.
      </p>
      {/* Three figures removed from the draft (colony PCR and sequencing) */}
      <p>
        The expression and purification of 2KY-10 followed the conditions
        established for 2KY-5 (1 mM IPTG induction for 6 h; ITC at 65 &deg;C / 2
        M NaCl PBS). The purification result was good, with a yield of about 480
        mg per liter of culture, comparable to 2KY-5.
      </p>
      {/* One figure removed from the draft (2KY-10 purification) */}
      <h3 className="mt-5 mb-3">
        Plasmid construction, expression, and purification of 2KY-5-Tag +
        2KY-10-Tag
      </h3>
      <p>
        SnoopTag2 (KLGYIEFYKVEK, coding sequence 36 bp) was introduced into
        pET19b-2KY5-RDL by site-directed insertion, with the insertion site
        after the 5th repeat unit and before the AcuI cut site. This position
        was chosen deliberately: after insertion, the AcuI recognition site
        shifts 36 bp downstream and the cut site moves accordingly, so the RDL
        replication unit changes from the 855 bp 2KY-5 to an 891 bp
        2KY-5-SnoopTag2, bringing the tag into the replicable region.
      </p>
      <p>
        This step cannot be performed by conventional single-fragment
        whole-plasmid amplification: the upstream side of the insertion point is
        immediately adjacent to the repeat region, so no matter how the reverse
        primer is designed, its 3&prime; end falls inside the repeats and
        initiates on all 5 repeats simultaneously, producing a ladder of
        products differing by 171 bp, which cannot be separated at the 6.6 kb
        whole-plasmid scale and would inevitably be contaminated with deletion
        mutants.
      </p>
      <p>
        We therefore adopted the Mut Express II method 2 (two-fragment segmented
        amplification){/* Draft note: hyperlink to be added */}, designing an
        additional mutation-free anchor point B outside the insertion site
        (before NdeI) and splitting the plasmid into two segments for separate
        amplification (figure):
      </p>
      <ol>
        <li>
          Segment B&rarr;I (Anchor-BF + Snp-IR): the correct product should be
          956 bp.
        </li>
        <li>
          Segment I&rarr;B (Snp-IF + Anchor-BR): both primer annealing regions
          are unique, giving a single 5792 bp product.
        </li>
      </ol>
      <p>
        After separate DpnI digestion, the two segments were recombined with
        Exnase II at 37 &deg;C for 30 min following the manual ratio (0.03 pmol
        of the longer fragment, 0.06 pmol of the shorter) and transformed into
        DH5&alpha;.
      </p>
      {/* One figure removed from the draft (two-fragment amplification scheme) */}
      <p>
        After single colonies appeared on the plates, plasmids were extracted in
        the same way, colony PCR was performed, and plasmids with the correct
        band were subjected to fourth-generation sequencing, which confirmed all
        sequences. The sequence-verified 2KY-5-Tag plasmid was transformed into{" "}
        <em>E. coli</em> BL21, while the 2KY-10-Tag plasmid was constructed with
        the same RDL method used for 2KY-10, transformed into DH5&alpha;, and
        verified by colony PCR of single colonies followed by fourth-generation
        sequencing, which also confirmed all sequences. Both the 2KY-5-Tag and
        2KY-10-Tag plasmids were thus successfully constructed and transformed
        (figure).
      </p>
      {/* One figure removed from the draft (construction results) */}
      <p>
        Protein expression was then induced and the proteins purified; the
        expression and purification of 2KY-5-Tag and 2KY-10-Tag followed the
        2KY-5 conditions (1 mM IPTG induction for 6 h; ITC at 65 &deg;C / 2 M
        NaCl PBS). The purification results were good, with yields of about 520
        mg and 490 mg per liter of culture respectively, comparable to 2KY-5
        (figure).
      </p>
      {/* One figure removed from the draft (2KY-5-Tag / 2KY-10-Tag purification) */}
      <h2 className="mt-5 mb-3">Hydrogel safety assessment</h2>
      {/* Draft note (待补充2): to be confirmed with the cell team and supplemented */}
      {/* One figure removed from the draft */}
    </>
  );
}
