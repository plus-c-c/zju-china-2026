export function ScaffoldIntro() {
  return (
    <>
      Our wet-lab work is organized into Platform and Function. The
      scaffold-group contribution to Platform covers the construction and
      production of protein scaffolds, hydrogel preparation and
      characterization, cellular evaluation, and the ligation system. Within
      each experiment, the corresponding results and supporting figures are
      presented alongside the experimental description. Function is organized
      into magnetically responsive anisotropy, GAG retention and delivery.
    </>
  );
}

export function ScaffoldContent() {
  return (
    <>
      <div className="section-heading">
        <h3
          data-block="1"
          id="wetlab-scaffold-01"
          data-toc="include"
          data-toc-depth="2"
        >
          1 Hydrogel scaffold
        </h3>
      </div>
      <div className="section-heading">
        <div className="source-block" data-block="2">
          <p>
            To produce the finished hydrogel, to verify the photocrosslinking
            and other properties of the scaffold protein, and to clarify how the
            protein sequence determines hydrogel performance, we carried out the{" "}
            <strong>expression and purification of the scaffold protein</strong>
            , <strong>the photocrosslinking reaction</strong> and{" "}
            <strong>the measurement of its mechanical properties</strong>. In
            parallel, we constructed plasmids encoding SELPs with{" "}
            <strong>different repeat numbers</strong>, produced and purified the
            corresponding proteins and fabricated hydrogels from them, compared
            their mechanical properties with one another, and thereby{" "}
            <strong>
              determined the effect of repeat number on hydrogel properties
            </strong>
            ; this work was combined with our
            <strong>modeling</strong> to build a more{" "}
            <strong>accurate and reliable</strong> prediction system. We also
            tested the
            <strong>cytocompatibility</strong> of the hydrogel material in order
            to assess its <strong>safety</strong>.
          </p>
        </div>
      </div>
      <div className="section-heading">
        <h4
          data-block="3"
          id="wetlab-scaffold-02"
          data-toc="include"
          data-toc-depth="3"
        >
          1.1 Design of the scaffold plasmid
        </h4>
      </div>
      <section className="pair">
        <h5 className="pair-label" id="wetlab-scaffold-03">
          Scaffold plasmid design
        </h5>
        <div className="columns">
          <div className="column experiment">
            <p className="column-label">Experiment</p>
            <div className="source-block" data-block="4">
              <p>
                This study used the{" "}
                <strong>silk–elastin-like protein (SELP)</strong> sequence{" "}
                <strong>2KY</strong> as the base scaffold. The basic repeat unit
                of 2KY is 171 bp in length, encodes 57 amino acids, and has the
                following sequence composition:
              </p>
              <p>
                <strong>(GAGAGS)₂–GRGDS–GKGVP–(GVGVP)₃–GYGVP–(GVGVP)₃</strong>
              </p>
              <p>
                The sequence contains both <strong>silk-like GAGAGS</strong>{" "}
                modules and <strong>elastin-like GVGVP</strong> modules, and
                introduces tyrosine (Tyr, <strong>Y</strong>), lysine (Lys,{" "}
                <strong>K</strong>) and the cell-adhesion-related{" "}
                <strong>RGD</strong> motif into the repeat unit.
              </p>
              <p>
                Because the 2KY sequence is highly repetitive, conventional PCR
                amplification or extension by homologous recombination may cause
                primers to anneal simultaneously to multiple identical repeat
                units, generating a mixture of products that differ in length by
                one repeat unit. We therefore treated 2KY-5 not as a gene of
                fixed length but designed it as a{" "}
                <strong>cassette that can be doubled recursively</strong>,
                following the{" "}
                <strong>
                  plasmid reconstruction recursive directional ligation
                  (PRe-RDL)
                </strong>{" "}
                method established by the Chilkoti group.
              </p>
            </div>
          </div>
          <div className="column results">
            <p className="column-label">Results</p>
            <div className="source-block" data-block="5">
              <p>
                Specifically, a BseRI recognition site (GAGGAG) was embedded in
                the GGGGS linker 14 bp upstream of the repeat array, and an AcuI
                recognition site (CTTCAG on the coding strand) was embedded in
                the GGSGGSSGS trailer 17 bp downstream. Both are{" "}
                <strong>type IIS restriction enzymes</strong>
                that cleave outside their recognition sequences: BseRI cuts 10/8
                nt and AcuI 16/14 nt away from the recognition site, each
                leaving a 2-nt 3′ overhang. The phases of the two flanking
                linkers were designed such that both overhangs are GG, identical
                to the first two bases of the repeat array.
              </p>
              <p>
                Consequently, the plasmid is digested with{" "}
                <strong>AcuI + XbaI</strong> and with{" "}
                <strong>BseRI + XbaI</strong> in parallel, the gene-containing
                half of each digest is recovered, and the two pieces are
                ligated.{" "}
                <strong>
                  In a single cycle, this doubles the repeat array and
                  reconstitutes the plasmid, with no extra bases remaining at
                  the junction and the reading frame unchanged. Both enzyme
                  sites remain outside the doubled array, so the cycle can be
                  repeated indefinitely
                </strong>{" "}
                (Figure 1.1.1).
              </p>
            </div>
            <div className="source-block figure-block" data-block="6">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/12.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/12.avif"
                    alt="Figure 1.1.1. Recursive doubling of the 2KY repeat array by PRe-RDL. A copy of the gene is excised with AcuI + XbaI and with BseRI + XbaI; ligation of the two gene-containing halves doubles the repeat array and reconstitutes the plasmid, leaving no extra bases at the junction and keeping the reading frame unchanged."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="7">
              <p className="figure-caption">
                <strong>Figure 1.1.1.</strong> Recursive doubling of the 2KY
                repeat array by PRe-RDL. A copy of the gene is excised with AcuI
                + XbaI and with BseRI + XbaI; ligation of the two
                gene-containing halves doubles the repeat array and
                reconstitutes the plasmid, leaving no extra bases at the
                junction and keeping the reading frame unchanged.
              </p>
            </div>
            <div className="source-block" data-block="8">
              <p>
                A key feature of this design is that the enzyme recognition
                sites lie within the flanking linkers and never within the
                repeat sequence itself. The approach is therefore not
                constrained by the codon degeneracy of glycine/alanine-rich
                sequences such as 2KY, which is precisely the obstacle that{" "}
                <strong>
                  classical RDL cannot overcome for such sequences.
                </strong>
              </p>
              <p>
                In addition, we{" "}
                <strong>
                  reserved three docking sites for SnoopTag2 on the plasmid.
                </strong>{" "}
                Their positions relative to the two cut sites determine the fate
                of the tag during doubling (Table 1.1.1):
              </p>
            </div>
            <div className="table-scroll">
              <table>
                <caption>
                  Table 1.1.1. Positions of the three SnoopTag2 docking sites
                  relative to the cut sites, their behavior during a doubling
                  round, and the resulting constructs.
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Tag insertion site</th>
                    <th scope="col">Position relative to cut site</th>
                    <th scope="col">Behavior during a doubling round</th>
                    <th scope="col">Resulting construct</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>N-terminus (before NdeI)</td>
                    <td>Upstream of the BseRI cut site</td>
                    <td>Not duplicated; remains a single copy</td>
                    <td>Tag–[2KY-5]n</td>
                  </tr>
                  <tr>
                    <td>End of the gene (before the trailer)</td>
                    <td>Upstream of the AcuI cut site</td>
                    <td>Duplicated together with the repeat unit</td>
                    <td>[2KY-5-Tag]n</td>
                  </tr>
                  <tr>
                    <td>C-terminus (before the stop codon)</td>
                    <td>Downstream of the AcuI cut site</td>
                    <td>Not duplicated; remains a single copy</td>
                    <td>[2KY-5]n–Tag</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="source-block" data-block="11">
              <p>
                In this project, we adopted the second site, such that{" "}
                <strong>each 2KY-5 block is followed by one SnoopTag2</strong>.
                Scaffold length and interface number thereby become a jointly
                programmable quantity, rather than two variables that must be
                constructed separately.
              </p>
              <p>
                Accordingly, we obtained a single parental plasmid,{" "}
                <strong>pET19b-2KY5-RDL</strong> (6636 bp; Figure 1.1.2), by
                whole-gene synthesis; all three other constructs were derived
                from it experimentally.
              </p>
            </div>
            <div className="source-block figure-block" data-block="12">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/figure-1-1-1-pet19b-2ky5-rdl-source.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    crossOrigin="anonymous"
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/figure-1-1-1-pet19b-2ky5-rdl-source.avif"
                    alt="Figure 1.1.2. The parental plasmid pET19b-2KY5-RDL (6636 bp)."
                    data-whiten="true"
                    data-whiten-white="242"
                    data-whiten-opaque="232"
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="13">
              <p className="figure-caption">
                <strong>Figure 1.1.2.</strong> The parental plasmid
                pET19b-2KY5-RDL (6636 bp).
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="section-heading">
        <h4
          data-block="14"
          id="wetlab-scaffold-04"
          data-toc="include"
          data-toc-depth="3"
        >
          1.2 Scaffold protein 2KY-5
        </h4>
        <h5
          data-block="15"
          id="wetlab-scaffold-section-1-2-1"
          data-toc="include"
          data-toc-depth="4"
        >
          1.2.1 Expression of the scaffold protein 2KY-5
        </h5>
      </div>
      <section className="pair">
        <h6 className="pair-label" id="wetlab-scaffold-05">
          Transformation and sequence verification
        </h6>
        <div className="columns">
          <div className="column experiment">
            <p className="column-label">Experiment</p>
            <div className="source-block" data-block="16">
              <p>
                The constructed plasmid encoding the 2KY-5 protein was
                transformed into <em>E. coli</em>
                BL21(DE3). Plasmid identity was verified by colony PCR. We used
                the T7 promoter and T7 terminator primers, which anneal outside
                the insert, as the forward and reverse primers. This primer pair
                is common to all constructs in this series, and the product size
                varies with the repeat number, so that the copy number can be
                read directly from the band position. The cultures were then
                sent for sequencing to verify that the sequence was correct.
              </p>
              <p>
                The expression strain was then inoculated into LB medium
                containing Amp and cultured to mid-logarithmic phase, after
                which expression was induced with 1 mM IPTG (final
                concentration) for approximately 6 h. Cells were harvested and
                lysed by sonication, and the supernatant was collected. Samples
                of the culture before and after induction, the lysate
                supernatant and the lysate pellet were analyzed by SDS-PAGE.
              </p>
            </div>
          </div>
          <div className="column results">
            <p className="column-label">Results</p>
            <div className="source-block" data-block="17">
              <p>
                The synthesized pET19b-2KY5-RDL was successfully transformed
                into <em>E. coli</em>
                BL21(DE3), and colonies were obtained (Figure 1.2.1). Agarose
                gel electrophoresis of the PCR products showed a band at 1152
                bp,{" "}
                <strong>
                  consistent with the theoretical size of 2KY-5
                </strong>{" "}
                (Figure 1.2.2), and
                <strong>
                  sequencing of the insert confirmed that its sequence was
                  correct
                </strong>
                .
              </p>
            </div>
            <div className="source-block figure-block" data-block="18">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/02.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/02.avif"
                    alt="Figure 1.2.1. Colonies of E. coli BL21(DE3) obtained after transformation with the synthesized pET19b-2KY5-RDL plasmid."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="19">
              <p className="figure-caption">
                <strong>Figure 1.2.1.</strong> Colonies of <em>E. coli</em>{" "}
                BL21(DE3) obtained after transformation with the synthesized
                pET19b-2KY5-RDL plasmid.
              </p>
            </div>
            <div className="source-block figure-block" data-block="20">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/03.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/03.avif"
                    alt="Figure 1.2.2. Colony PCR verification of the 2KY-5 plasmid. The T7 promoter/T7 terminator primer pair gave a single band at 1152 bp, consistent with the theoretical size of 2KY-5."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="21">
              <p className="figure-caption">
                <strong>Figure 1.2.2.</strong> Colony PCR verification of the
                2KY-5 plasmid. The T7 promoter/T7 terminator primer pair gave a
                single band at 1152 bp, consistent with the theoretical size of
                2KY-5.
              </p>
            </div>
            <div className="source-block" data-block="22">
              <p>
                No band was present at the expected molecular weight before
                induction, whereas a band appeared after induction,{" "}
                <strong>
                  demonstrating successful IPTG induction without leaky
                  expression
                </strong>{" "}
                (Figure 1.2.3). In addition, the target band was present in the
                lysate supernatant but faint in the pellet, indicating that cell
                lysis is a feasible method for the initial recovery of 2KY-5.
              </p>
            </div>
            <div className="source-block figure-block" data-block="23">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/04.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/04.avif"
                    alt="Figure 1.2.3. SDS-PAGE analysis of 2KY-5 expression. Samples: culture before induction, culture after induction, lysate supernatant and lysate pellet. A target band appears only after induction and is mainly present in the supernatant."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="24">
              <p className="figure-caption">
                <strong>Figure 1.2.3.</strong> SDS-PAGE analysis of 2KY-5
                expression. Samples: culture before induction, culture after
                induction, lysate supernatant and lysate pellet. A target band
                appears only after induction and is mainly present in the
                supernatant.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="section-heading">
        <h5
          data-block="25"
          id="wetlab-scaffold-section-1-2-2"
          data-toc="include"
          data-toc-depth="4"
        >
          1.2.2 Purification of the scaffold protein 2KY-5
        </h5>
      </div>
      <section className="pair">
        <h6 className="pair-label" id="wetlab-scaffold-07">
          Optimization of inverse transition cycling
        </h6>
        <div className="columns">
          <div className="column experiment">
            <p className="column-label">Experiment</p>
            <div className="source-block" data-block="26">
              <p>
                Elastin-like proteins undergo an{" "}
                <strong>
                  inverse temperature transition, denaturing and aggregating at
                  elevated temperature and redissolving upon cooling
                </strong>
                . On the basis of this behaviour, we selected{" "}
                <strong>inverse transition cycling (ITC)</strong> for the
                purification of the scaffold protein.
              </p>
              <p>
                Briefly, the lysate of the harvested cells was subjected
                repeatedly to high-salt, high-temperature denaturation and
                aggregation, collection of the pellet, and low-temperature
                dissolution in ultrapure water followed by collection of the
                supernatant, which completed the extraction of the scaffold
                protein.
              </p>
              <p>
                We determined the optimal ITC parameters through a two-factor
                gradient screen of the transition temperature and the transition
                salinity, and the purification performance was monitored by
                SDS-PAGE. The solution obtained after ITC was further subjected
                to ultrafiltration, which served to purify, concentrate and
                exchange the buffer, yielding a scaffold protein solution whose
                final solvent was{" "}
                <strong>
                  water; the protein was then lyophilized to a powder, the
                  storage form used for the
                </strong>{" "}
                subsequent preparation of hydrogel solutions.
              </p>
              <p>
                The purified supernatant was concentrated using ultrafiltration
                tubes with a 10-kDa molecular weight cut-off (3,500 × g, 30
                min), and the protein concentrations before and after
                concentration were determined by the BCA assay.([6])
              </p>
              <p>
                The solution was then dialyzed for 24 h to remove residual salt,
                and the dialyzed solution was stored at −80 °C. Once completely
                frozen, a layer of filter paper was wrapped over the top of the
                tube, and the sample was rapidly transferred to a freeze dryer
                and lyophilized for 12 h to obtain a lyophilized powder, which
                was stored for subsequent hydrogel preparation.
              </p>
            </div>
          </div>
          <div className="column results">
            <p className="column-label">Results</p>
            <div className="source-block" data-block="27">
              <p>
                We performed a gradient screen of two parameters, the NaCl
                concentration of the buffer and the heating temperature. The
                results showed that raising the temperature had little effect on
                the purification yield, whereas the{" "}
                <strong>
                  NaCl concentration of the buffer was the more influential
                  factor
                </strong>
                , and that the buffer containing <strong>2 M NaCl</strong> gave
                the highest yield (Figure 1.2.4). This trend is consistent with
                the reported regulation of the phase-transition temperature of
                elastin-like polypeptides by salt ions.([5])
              </p>
            </div>
            <div className="source-block figure-block" data-block="28">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/05.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/05.avif"
                    alt="Figure 1.2.4. SDS-PAGE screening of temperature and NaCl concentration during inverse transition cycling."
                  />
                </a>
              </p>
            </div>
            <div className="source-block figure-block" data-block="29">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/06.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/06.avif"
                    alt="Figure 1.2.4. Purification fractions at different NaCl concentrations during inverse transition cycling."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="30">
              <p className="figure-caption">
                <strong>Figure 1.2.4.</strong> SDS-PAGE analysis of the ITC
                condition screen. The heating temperature and the buffer NaCl
                concentration were varied; the buffer containing 2 M NaCl gave
                the highest purification yield.
              </p>
            </div>
            <div className="source-block" data-block="31">
              <p>
                Subsequent purifications were carried out under the{" "}
                <strong>
                  optimal conditions identified (heating to 65 °C; PBS
                  containing 2 M NaCl)
                </strong>
                . Samples of the lysate supernatant, the supernatant after the
                high-temperature phase transition, the pellet obtained after
                cooling-induced redissolution, and the supernatant after cooling
                were collected during ITC and analyzed by SDS-PAGE to confirm
                the purification effect. Compared with the initial lysate
                supernatant, the contaminating protein bands were absent from
                the cooled supernatant collected after ITC, and the band
                corresponding to 2KY-5 was present only in the final solution,
                with almost no loss during the process, indicating{" "}
                <strong>excellent purification</strong> (Figure 1.2.5).
              </p>
            </div>
            <div className="source-block figure-block" data-block="32">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/07.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/07.avif"
                    alt="Figure 1.2.5. SDS-PAGE verification of ITC purification under the optimized conditions (65 °C, PBS containing 2 M NaCl). Contaminating protein bands are removed and the 2KY-5 band is retained in the final solution with almost no loss."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="33">
              <p className="figure-caption">
                <strong>Figure 1.2.5.</strong> SDS-PAGE verification of ITC
                purification under the optimized conditions (65 °C, PBS
                containing 2 M NaCl). Contaminating protein bands are removed
                and the 2KY-5 band is retained in the final solution with almost
                no loss.
              </p>
            </div>
            <div className="source-block" data-block="34">
              <p>
                The purified 2KY-5 supernatant was concentrated with an
                ultrafiltration tube to give approximately 5 mL of solution. The
                concentration factor between the samples before and after
                concentration was approximately 3.5, with essentially no protein
                loss (Figure 1.2.6).
              </p>
            </div>
            <div className="source-block figure-block" data-block="35">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/08.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/08.avif"
                    alt="Figure 1.2.6. BCA quantification of the protein concentration before and after ultrafiltration concentration. The concentration factor was approximately 3.5, with essentially no protein loss."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="36">
              <p className="figure-caption">
                <strong>Figure 1.2.6.</strong> BCA quantification of the protein
                concentration before and after ultrafiltration concentration.
                The concentration factor was approximately 3.5, with essentially
                no protein loss.
              </p>
            </div>
            <div className="source-block" data-block="37">
              <p>
                The solution was then dialyzed to remove residual salt, and the
                dialyzed solution was stored at −80 °C and lyophilized to a
                powder for storage. Based on the calculated yield, approximately{" "}
                <strong>500 mg</strong> of protein was obtained per liter of
                bacterial culture. This is a <strong>high yield</strong> under
                the routine protein-induction conditions currently used in our
                laboratory, making the process suitable for further optimization
                of the production conditions toward industrial-scale mass
                production, and <strong>giving it high commercial value</strong>
                . The detailed workflow and equipment in our laboratory are
                shown in Figure 1.2.7.
              </p>
            </div>
            <div className="source-block figure-block" data-block="38">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/09.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/09.avif"
                    alt="Figure 1.2.7. Workflow and equipment used in our laboratory for the expression, purification and lyophilization of the scaffold protein."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="39">
              <p className="figure-caption">
                <strong>Figure 1.2.7.</strong> Workflow and equipment used in
                our laboratory for the expression, purification and
                lyophilization of the scaffold protein.
              </p>
            </div>
            <div className="source-block" data-block="40">
              <p>
                In our project, 2KY-5 and 2KY-10 proteins were independently
                produced and purified in our laboratory, while samples of 2Y-5
                and 2KY-16 were provided by Professor Hongwei Ouyang and
                Professor Wenwen Huang at our collaborating laboratory. We
                subsequently performed standardized characterization of all four
                proteins. Therefore, the production of 2Y-5 and 2KY-16 is not
                described further in the following sections.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="section-heading">
        <h5
          data-block="41"
          id="wetlab-scaffold-section-1-2-3"
          data-toc="include"
          data-toc-depth="4"
        >
          1.2.3 Photocrosslinking of 2KY-5 and preparation of the hydrogel
        </h5>
      </div>
      <section className="pair">
        <h6 className="pair-label" id="wetlab-scaffold-11">
          Blue-light photocrosslinking
        </h6>
        <div className="columns">
          <div className="column experiment">
            <p className="column-label">Experiment</p>
            <div className="source-block" data-block="42">
              <p>
                Using the lyophilized scaffold protein powder obtained above,
                together with the photocrosslinker (C₃₀H₂₄Cl₂N₆Ru ·
                6H₂O/Na₂S₂O₈), we prepared a 10% (w/v) hydrogel precursor
                solution in PBS containing 2 mM ruthenium (Ru) and 20 mM sodium
                persulfate (SPS).
              </p>
              <p>
                The system was then irradiated with 450-nm blue light to
                initiate crosslinking. After 2 s of irradiation the tube was
                inverted to observe the state of its contents, and gelation was
                judged by comparing the state on inversion of the
                photocrosslinker-containing hydrogel solution placed in a 1.5-mL
                microcentrifuge tube before and after blue-light irradiation
                (Figure 1.2.8).
              </p>
            </div>
          </div>
          <div className="column results">
            <p className="column-label">Results</p>
            <div className="source-block" data-block="43">
              <p>
                The non-irradiated system flowed to the bottom of the tube upon
                inversion, whereas the irradiated system remained in place,
                demonstrating that the{" "}
                <strong>
                  system was fully crosslinked after 2 s of blue-light
                  irradiation
                </strong>{" "}
                (Figure 1.2.9; Supplementary Movies S1 and S2).
              </p>
            </div>
            <div className="source-block figure-block" data-block="44">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/32.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/32.avif"
                    alt="Figure 1.2.8. Mechanism of Ru/SPS-mediated dityrosine photocrosslinking. Under visible light, the Ru/SPS system catalyses the formation of covalent dityrosine crosslinks between adjacent tyrosine residues."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="45">
              <p className="figure-caption">
                <strong>Figure 1.2.8.</strong> Mechanism of Ru/SPS-mediated
                dityrosine photocrosslinking. Under visible light, the Ru/SPS
                system catalyses the formation of covalent dityrosine crosslinks
                between adjacent tyrosine residues.
              </p>
            </div>
            <div className="source-block figure-block" data-block="46">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/10.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/10.avif"
                    alt="Figure 1.2.9. Appearance before and after photocrosslinking. Left, hydrogel precursor solution before illumination; right, hydrogel formed after 2 s of 450-nm blue-light irradiation."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="47">
              <p className="figure-caption">
                <strong>Figure 1.2.9.</strong> Appearance before and after
                photocrosslinking. Left, hydrogel precursor solution before
                illumination; right, hydrogel formed after 2 s of 450-nm
                blue-light irradiation.
              </p>
            </div>
            <div className="source-block" data-block="48">
              <p>
                <span className="wetlab-results__video-pending">
                  Before photoexcitation: the Ru/SPS hydrogel precursor solution
                  flows when inverted (S1).
                </span>{" "}
                <span className="badge">Video awaiting platform review</span>
              </p>
            </div>
            <div className="source-block" data-block="49">
              <p>
                <span className="wetlab-results__video-pending">
                  After photoexcitation: no flow when inverted, indicating
                  successful gelation via crosslinking at tyrosine residues
                  (S2).
                </span>{" "}
                <span className="badge">Video awaiting platform review</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="section-heading">
        <h5
          data-block="50"
          id="wetlab-scaffold-section-1-2-4"
          data-toc="include"
          data-toc-depth="4"
        >
          1.2.4 Characterization of the hydrogel
        </h5>
      </div>
      <section className="pair">
        <h6 className="pair-label" id="wetlab-scaffold-12">
          Structure and mechanical properties of the hydrogel
        </h6>
        <div className="columns">
          <div className="column experiment">
            <p className="column-label">Experiment</p>
            <div className="source-block" data-block="51">
              <p>
                We characterized the structure and mechanical properties of the
                hydrogels constructed from SELP proteins with different repeat
                numbers. Scanning electron microscopy (SEM) was first used to
                observe the hydrogel structure and pore size. Samples taken
                before and after gelation were then examined by
                three-dimensional excitation–emission matrix (EEM) fluorescence
                spectroscopy in order to confirm tyrosine crosslinking.
              </p>
              <p>
                With respect to mechanical properties, we performed
                frequency-sweep rheology, compression tests and shear adhesion
                tests, from which mechanical parameters such as the Young’s
                modulus of the hydrogels were obtained.
              </p>
              <p>
                These data can be cross-validated with our modeling work and
                support the direct prediction of hydrogel mechanical properties
                from sequence information.
              </p>
            </div>
            <h6>Scanning electron microscopy (SEM)</h6>
            <div className="source-block" data-block="52">
              <p>
                Hydrogel microstructures were characterized by scanning electron
                microscopy (SEM). Samples were prepared, dried, and examined
                using a COXEM 30+ microscope at an accelerating voltage of 15 kV
                to assess pore morphology and network structure.
              </p>
            </div>
            <h6>Excitation–emission matrix (EEM) fluorescence spectroscopy</h6>
            <div className="source-block" data-block="53">
              <p>
                EEM fluorescence spectra of precursor solutions and hydrogels
                were recorded to characterize tyrosine-related fluorescence
                changes during gelation. The excitation and emission wavelengths
                were scanned to identify fluorescence peak shifts associated
                with dityrosine crosslink formation.
              </p>
            </div>
            <h6>Rheological measurements</h6>
            <div className="source-block" data-block="54">
              <p>
                Rheological properties were measured using a TA Instruments HR20
                rheometer equipped with a 20-mm parallel-plate geometry.
                Frequency sweeps were performed at 1% strain over an angular
                frequency range of 0.1–100 rad/s. The storage modulus (G′) and
                loss modulus (G″) were recorded to evaluate hydrogel
                viscoelasticity.
              </p>
            </div>
            <h6>Compressive mechanical testing</h6>
            <div className="source-block" data-block="55">
              <p>
                Hydrogel mechanical properties were evaluated using an Instron
                5943 mechanical tester equipped with a 50-N load cell.
                Cylindrical samples were compressed at a constant rate of 1
                mm/min until 30% strain. Stress–strain curves were recorded, and
                Young’s modulus was calculated from the linear elastic region.
              </p>
            </div>
            <h6>Lap-shear adhesion testing</h6>
            <div className="source-block" data-block="56">
              <p>
                Adhesive properties were evaluated using a modified ASTM F2255
                lap-shear test. Hydrogels were applied between collagen casing
                substrates, and the maximum load was recorded during shear
                testing. Adhesion strength was calculated by dividing the
                maximum load by the adhesive area.
              </p>
            </div>
            <h6>Statistical analysis</h6>
            <div className="source-block" data-block="57">
              <p>
                All experiments were performed with at least three replicates.
                Data are presented as mean ± standard deviation.
              </p>
            </div>
          </div>
          <div className="column results">
            <p className="column-label">Results</p>
            <div className="source-block" data-block="58">
              <p>
                Scanning electron microscopy (SEM) showed that the hydrogel has
                an{" "}
                <strong>
                  interconnected, three-dimensional porous network with pores of
                  varying size
                </strong>
                (Figure 1.2.10). Such a porous architecture may{" "}
                <strong>
                  facilitate the diffusion of nutrients and metabolites
                </strong>
                .
              </p>
            </div>
            <div className="source-block figure-block" data-block="59">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/31.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/31.avif"
                    alt="Figure 1.2.10. SEM image of the hydrogel. The hydrogel has an interconnected, three-dimensional porous network with pores of varying size."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="60">
              <p className="figure-caption">
                <strong>Figure 1.2.10.</strong> SEM image of the hydrogel. The
                hydrogel has an interconnected, three-dimensional porous network
                with pores of varying size.
              </p>
            </div>
            <div className="source-block" data-block="61">
              <p>
                To verify the chemical{" "}
                <strong>nature of the crosslinking</strong>,{" "}
                <strong>
                  three-dimensional excitation–emission matrix (EEM)
                </strong>{" "}
                fluorescence spectra of the precursor solution and the resulting
                hydrogel were recorded (Figure 1.2.11). The precursor solution
                showed a fluorescence peak at an excitation wavelength of
                approximately 280 nm and an emission wavelength of approximately
                300–310 nm, corresponding to the intrinsic fluorescence of
                tyrosine. After gelation, the main fluorescence peak shifted to
                an excitation wavelength of approximately 330 nm and an emission
                wavelength of approximately 400 nm, with markedly increased
                intensity. Emission near 400 nm is characteristic of dityrosine
                [9],{" "}
                <strong>
                  suggesting that dityrosine crosslinks formed between tyrosine
                  residues upon illumination.
                </strong>
              </p>
            </div>
            <div className="figure-row">
              <div className="figure-unit">
                <div className="source-block figure-block" data-block="62">
                  <p>
                    <a
                      className="figure-link"
                      href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/24.avif"
                      target="_blank"
                      rel="noopener"
                    >
                      <img
                        loading="lazy"
                        src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/24.avif"
                        alt="Figure 1.2.11. Three-dimensional excitation–emission matrix (EEM) fluorescence spectra of the hydrogel precursor solution and of the hydrogel after gelation. The main fluorescence peak shifts from approximately 280/300–310 nm to approximately 330/400 nm upon gelation."
                      />
                    </a>
                  </p>
                </div>
              </div>
              <div className="figure-unit">
                <div className="source-block figure-block" data-block="65">
                  <p>
                    <a
                      className="figure-link"
                      href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/21.avif"
                      target="_blank"
                      rel="noopener"
                    >
                      <img
                        loading="lazy"
                        src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/21.avif"
                        alt="Figure 1.2.12. Frequency-sweep rheology of the hydrogels. Storage modulus (G′) and loss modulus (G″) as a function of angular frequency for 2Y-5, 2KY-5 and 2KY-16."
                      />
                    </a>
                  </p>
                </div>
              </div>
              <div className="figure-unit figure-unit--caption">
                <div className="source-block" data-block="63">
                  <p className="figure-caption">
                    <strong>Figure 1.2.11.</strong> Three-dimensional
                    excitation–emission matrix (EEM) fluorescence spectra of the
                    hydrogel precursor solution and of the hydrogel after
                    gelation. The main fluorescence peak shifts from
                    approximately 280/300–310 nm to approximately 330/400 nm
                    upon gelation.
                  </p>
                </div>
              </div>
              <div className="figure-unit figure-unit--caption">
                <div className="source-block" data-block="66">
                  <p className="figure-caption">
                    <strong>Figure 1.2.12.</strong> Frequency-sweep rheology of
                    the hydrogels. Storage modulus (G′) and loss modulus (G″) as
                    a function of angular frequency for 2Y-5, 2KY-5 and 2KY-16.
                  </p>
                </div>
              </div>
            </div>
            <div className="source-block" data-block="64">
              <p>
                <strong>Frequency-sweep rheology</strong> (Figure 1.2.12) showed
                that, over the entire range of 0.1–100 rad/s, the storage
                modulus (G′) of all three hydrogels (2Y-5, 2KY-5 and 2KY-16)
                exceeded the loss modulus (G″) by at least approximately two
                orders of magnitude and was essentially independent of
                frequency, indicating that{" "}
                <strong>
                  photocrosslinking produced a stable, predominantly elastic,
                  solid-like network
                </strong>
                . The G′ values of 2Y-5 and 2KY-5 were similar (approximately
                2–3 kPa), whereas that of{" "}
                <strong>
                  2KY-16 reached approximately 20 kPa, nearly one order of
                  magnitude higher.
                </strong>{" "}
                We speculate that this may be related to the larger number of
                crosslinking sites provided by the longer scaffold chains and
                the resulting reduction in dangling chain ends (a hypothesis
                that remains to be tested experimentally).
              </p>
            </div>
            <div className="source-block" data-block="67">
              <p>
                The <strong>stress–strain curves</strong> (Figure 1.2.13A)
                showed that, within a strain range of 0–0.3, the stress of all
                three hydrogels increased nonlinearly with strain;{" "}
                <strong>
                  the stress of 2KY-16 (approximately 23 kPa at a strain of 0.3)
                  was clearly higher than that of 2Y-5 and 2KY-5 (approximately
                  15 kPa
                </strong>
                ), whose curves nearly overlapped. The Young’s moduli calculated
                accordingly were approximately 29 kPa for 2Y-5, 30 kPa for 2KY-5
                and 53 kPa for 2KY-16; there was no significant difference
                between 2Y-5 and 2KY-5 (ns), whereas 2KY-16 was significantly
                higher than both (p &lt; 0.001) (Figure 1.2.13B). Thus,
                increasing the{" "}
                <strong>
                  repeat number from 5 to 16 effectively enhanced the mechanical
                  strength of the hydrogel
                </strong>
                .
              </p>
            </div>
            <div className="figure-row">
              <div className="figure-unit">
                <div className="source-block figure-block" data-block="68">
                  <p>
                    <a
                      className="figure-link"
                      href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/22.avif"
                      target="_blank"
                      rel="noopener"
                    >
                      <img
                        loading="lazy"
                        src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/22.avif"
                        alt="Figure 1.2.13A. Stress–strain curves of the three hydrogels."
                      />
                    </a>
                  </p>
                </div>
              </div>
              <div className="figure-unit">
                <div className="source-block figure-block" data-block="72">
                  <p>
                    <a
                      className="figure-link"
                      href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/25.avif"
                      target="_blank"
                      rel="noopener"
                    >
                      <img
                        loading="lazy"
                        src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/25.avif"
                        alt="Figure 1.2.14A. Shear force–displacement curves of the three hydrogels."
                      />
                    </a>
                  </p>
                </div>
              </div>
              <div className="figure-unit">
                <div className="source-block figure-block" data-block="69">
                  <p>
                    <a
                      className="figure-link"
                      href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/23.avif"
                      target="_blank"
                      rel="noopener"
                    >
                      <img
                        loading="lazy"
                        src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/23.avif"
                        alt="Figure 1.2.13.B. Young’s moduli of the three hydrogels."
                      />
                    </a>
                  </p>
                </div>
              </div>
              <div className="figure-unit">
                <div className="source-block figure-block" data-block="73">
                  <p>
                    <a
                      className="figure-link"
                      href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/26.avif"
                      target="_blank"
                      rel="noopener"
                    >
                      <img
                        loading="lazy"
                        src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/26.avif"
                        alt="Figure 1.2.14.B. Shear strengths of the three hydrogels."
                      />
                    </a>
                  </p>
                </div>
              </div>
              <div className="figure-unit figure-unit--caption">
                <div className="source-block" data-block="70">
                  <p className="figure-caption">
                    <strong>Figure 1.2.13.</strong> Stress–strain curves and
                    Young’s moduli of the hydrogels. (A) Stress–strain curves
                    over a strain range of 0–0.3. (B) Young’s moduli. ns, not
                    significant; ***, p &lt; 0.001.
                  </p>
                </div>
              </div>
              <div className="figure-unit figure-unit--caption">
                <div className="source-block" data-block="74">
                  <p className="figure-caption">
                    <strong>Figure 1.2.14.</strong> Shear adhesion performance
                    of the hydrogels. (A) Shear force–displacement curves. (B)
                    Shear strength. ns, not significant; ***, p &lt; 0.001.
                  </p>
                </div>
              </div>
            </div>
            <div className="source-block" data-block="71">
              <p>
                In the <strong>shear adhesion test</strong> (Figure 1.2.14A),
                the shear force of all three hydrogels rose with displacement to
                a peak and then declined, with peak forces of approximately 11 N
                (2Y-5), 17 N (2KY-5) and 27.5 N (2KY-16). The resulting shear
                strengths were approximately 32, 42 and 91 kPa, respectively (no
                significant difference between 2Y-5 and 2KY-5;{" "}
                <strong>2KY-16 significantly higher than both</strong>, p &lt;
                0.001) (Figure 1.2.14B). In addition, probing the hydrogel with
                a pipette tip (Supplementary Movie S3) and adhering it to the
                surface of a culture dish (Supplementary Movie S4) both
                demonstrated that the{" "}
                <strong>hydrogel has good elasticity and adhesiveness</strong>.
              </p>
            </div>
            <div className="source-block" data-block="75">
              <p>
                The two videos below demonstrate the shape and excellent
                elasticity of our hydrogel, as well as its strong adhesive
                properties.
              </p>
            </div>
            <div className="source-block" data-block="76">
              <p>
                <span className="wetlab-results__video-pending">
                  Fabricated hydrogel and demonstration of elasticity (S3).
                </span>{" "}
                <span className="badge">Video awaiting platform review</span>
              </p>
            </div>
            <div className="source-block" data-block="77">
              <p>
                <span className="wetlab-results__video-pending">
                  Demonstration of the hydrogel’s adhesive properties (S4).
                </span>{" "}
                <span className="badge">Video awaiting platform review</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="section-heading">
        <h4
          data-block="108"
          id="wetlab-scaffold-17"
          data-toc="include"
          data-toc-depth="3"
        >
          1.3 Construction and production of hydrogels with different repeat
          numbers
        </h4>
        <h5
          data-block="109"
          id="wetlab-scaffold-section-1-3-1"
          data-toc="include"
          data-toc-depth="4"
        >
          1.3.1 Plasmid construction, expression and purification of the
          scaffold protein 2KY-10
        </h5>
      </div>
      <section className="pair">
        <h6 className="pair-label" id="wetlab-scaffold-18">
          Recursive doubling and production of 2KY-10
        </h6>
        <div className="columns">
          <div className="column experiment">
            <p className="column-label">Experiment</p>
            <div className="source-block" data-block="110">
              <p>
                Taking the previously constructed 2KY-5 plasmid as the starting
                material, we constructed the{" "}
                <strong>corresponding 2KY-10 plasmid</strong>, in which the
                repeat number is doubled. Because SELP coding sequences are
                highly repetitive, doubling the repeat number is difficult to
                achieve by conventional PCR or homologous recombination. We
                therefore adopted the plasmid reconstruction recursive
                directional ligation (PRe-RDL) method, which is better suited to
                this situation (see Section 1.1).
              </p>
              <p>
                2KY-10 was not chemically synthesized but was{" "}
                <strong>
                  obtained directly from pET19b-2KY5-RDL by one round of
                  PRe-RDL.
                </strong>{" "}
                The plasmid was divided into two aliquots: one was
                double-digested with AcuI + XbaI (digest A) and the other with
                BseRI + XbaI (digest B). All three enzymes are active at 37 °C
                in rCutSmart buffer and can therefore be used directly in double
                digestions. The digestion time was kept within 2 h and the
                enzyme amount did not exceed 10 U/µg to avoid the star activity
                of AcuI; AcuI reactions were supplemented with
                S-adenosylmethionine (SAM). Digest A yielded four fragments,
                from which the 1008-bp target fragment containing the scaffold
                gene was taken (fragment F); digest B yielded two fragments,
                from which the 6483-bp large fragment was taken (fragment G) and
                the 153-bp small fragment was discarded. The two target
                fragments were gel-purified separately, mixed in equimolar
                amounts, ligated with T4 DNA ligase at 16 °C overnight, and
                transformed into DH5α.
              </p>
              <p>
                Plasmid construction was then verified by colony PCR and
                sequencing. The target colony was picked for plasmid
                amplification: because this is a low-copy plasmid, streptomycin
                was added when the culture reached an OD of approximately 0.6 to
                promote plasmid amplification; the plasmid was then extracted
                with a plasmid midi-prep kit, and the plasmid concentration and
                purity were measured by NanoDrop, both reaching satisfactory
                levels.
              </p>
              <p>
                The expression and purification of 2KY-10 followed the
                conditions used for 2KY-5 (induction with 1 mM IPTG for 6 h; ITC
                at 65 °C in PBS containing 2 M NaCl).
              </p>
            </div>
          </div>
          <div className="column results">
            <p className="column-label">Results</p>
            <div className="source-block" data-block="111">
              <p>
                <strong>
                  2KY-10 was obtained directly from pET19b-2KY5-RDL by one round
                  of PRe-RDL
                </strong>{" "}
                following the method described in Section 1.1, and the plasmid
                was successfully transformed into DH5α and BL21 (Figure 1.3.1).
              </p>
            </div>
            <div className="source-block figure-block" data-block="112">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/13.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/13.avif"
                    alt="Figure 1.3.1. Construction of the 2KY-10 plasmid by one round of PRe-RDL and its transformation into DH5α and BL21. The 1008-bp gene-containing fragment from digest A and the 6483-bp backbone fragment from digest B are ligated to reconstitute the plasmid carrying a doubled repeat array."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="113">
              <p className="figure-caption">
                <strong>Figure 1.3.1.</strong> Construction of the 2KY-10
                plasmid by one round of PRe-RDL and its transformation into DH5α
                and BL21. The 1008-bp gene-containing fragment from digest A and
                the 6483-bp backbone fragment from digest B are ligated to
                reconstitute the plasmid carrying a doubled repeat array.
              </p>
            </div>
            <div className="source-block" data-block="114">
              <p>
                Single colonies were picked for colony PCR, and the band shifted
                upward from 1152 bp for 2KY-5 to 2007 bp (Figure 1.3.2); the
                difference of 855 bp corresponds exactly to one 2KY-5 unit,{" "}
                <strong>demonstrating successful doubling</strong>.{" "}
                <strong>
                  Sequencing confirmed that the repeat region consisted of 10
                  complete monomers.
                </strong>
              </p>
            </div>
            <div className="source-block figure-block" data-block="115">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/14.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/14.avif"
                    alt="Figure 1.3.2. Colony PCR verification of the 2KY-10 plasmid. The band shifts from 1152 bp (2KY-5) to 2007 bp (2KY-10), a difference of 855 bp corresponding exactly to one 2KY-5 unit; sequencing confirmed a repeat region of 10 complete monomers."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="116">
              <p className="figure-caption">
                <strong>Figure 1.3.2.</strong> Colony PCR verification of the
                2KY-10 plasmid. The band shifts from 1152 bp (2KY-5) to 2007 bp
                (2KY-10), a difference of 855 bp corresponding exactly to one
                2KY-5 unit; sequencing confirmed a repeat region of 10 complete
                monomers.
              </p>
            </div>
            <div className="source-block" data-block="117">
              <p>
                The purification results are shown in Figure 1.3.3: the
                purification was effective, with a yield of approximately 480 mg
                per liter of bacterial culture, close to that of 2KY-5.
              </p>
            </div>
            <div className="source-block figure-block" data-block="118">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/15.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/15.avif"
                    alt="Figure 1.3.3. SDS-PAGE analysis of the purified 2KY-10 protein. The yield was approximately 480 mg per liter of bacterial culture, close to that of 2KY-5."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="119">
              <p className="figure-caption">
                <strong>Figure 1.3.3.</strong> SDS-PAGE analysis of the purified
                2KY-10 protein. The yield was approximately 480 mg per liter of
                bacterial culture, close to that of 2KY-5.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="section-heading">
        <h5
          data-block="120"
          id="wetlab-scaffold-section-1-3-2"
          data-toc="include"
          data-toc-depth="4"
        >
          1.3.2 Plasmid construction, expression and purification of the
          scaffold proteins 2KY-5-Tag and 2KY-10-Tag
        </h5>
      </div>
      <section className="pair">
        <h6 className="pair-label" id="wetlab-scaffold-20">
          Insertion of SnoopTag2
        </h6>
        <div className="columns">
          <div className="column experiment">
            <p className="column-label">Experiment</p>
            <div className="source-block" data-block="121">
              <p>
                Using the corresponding 2KY-5 and 2KY-10 plasmids as the
                starting materials, we introduced SnoopTag2 (KLGYIEFYKVEK;
                coding sequence of 36 bp) into both by site-directed insertion.
              </p>
              <p>
                This step cannot be accomplished by conventional single-fragment
                whole-plasmid amplification: the insertion point lies
                immediately adjacent to the repeat region, so that however the
                reverse primer is designed, its 3′ end falls within the repeat
                sequence and initiates extension from all five repeats
                simultaneously, generating a ladder of products that differ by
                171 bp. At the scale of the 6.6-kb whole plasmid, these products
                cannot be separated, and deletion mutants would inevitably be
                mixed in.
              </p>
              <p>
                We therefore{" "}
                <strong>
                  adopted Method 2 of the Mut Express II kit (two-fragment
                  amplification)
                </strong>{" "}
                and joined the two fragments by homologous recombination: an
                additional anchor, B, which introduces no mutation, was placed
                in a unique region outside the insertion point (upstream of
                NdeI), splitting the plasmid into two fragments that were
                amplified separately.
              </p>
              <p>
                After DpnI digestion, the two fragments were recombined using
                Exnase II at 37 °C for 30 min according to the ratio recommended
                in the manual (0.03 pmol of the longer fragment and 0.06 pmol of
                the shorter fragment) and transformed into DH5α. Colony PCR was
                then performed, and plasmids giving the correct band were
                sequenced; all sequencing results were correct. The correctly
                sequenced 2KY-5-Tag and 2KY-10-Tag plasmids were transformed
                into <em>E. coli</em> BL21.
              </p>
              <p>
                The expression and purification of 2KY-5-Tag and 2KY-10-Tag
                followed the conditions used for 2KY-5 (induction with 1 mM IPTG
                for 6 h; ITC at 65 °C in PBS containing 2 M NaCl).
              </p>
            </div>
          </div>
          <div className="column results">
            <p className="column-label">Results</p>
            <div className="source-block" data-block="122">
              <p>
                Taking 2KY-5-Tag as an example (the procedure for 2KY-10-Tag is
                the same), the two fragments were amplified separately by the
                method described in the Experiment section and analyzed by
                agarose gel electrophoresis, which showed that the amplified
                bands were all of the expected size; the fragments were then
                gel-purified (Figure 1.3.4):
              </p>
              <p>
                1. B→I fragment (Anchor-BF + Snp-IR): the correct product should
                be 956 bp.
              </p>
              <p>
                2. I→B fragment (Snp-IF + Anchor-BR): the correct product should
                be 5792 bp.
              </p>
            </div>
            <div className="source-block figure-block" data-block="123">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/16.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/16.avif"
                    alt="Figure 1.3.4. Two-fragment amplification of the 2KY-5-Tag plasmid. Agarose gel electrophoresis of the B→I (956 bp) and I→B (5792 bp) fragments before gel purification; all amplified bands were of the expected size."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="124">
              <p className="figure-caption">
                <strong>Figure 1.3.4.</strong> Two-fragment amplification of the
                2KY-5-Tag plasmid. Agarose gel electrophoresis of the B→I (956
                bp) and I→B (5792 bp) fragments before gel purification; all
                amplified bands were of the expected size.
              </p>
            </div>
            <div className="source-block" data-block="125">
              <p>
                After recombination of the two fragments with Exnase II, the
                products were successfully transformed into DH5α to give single
                colonies on the plates. Plasmids were extracted in the same way
                and subjected to colony PCR, and plasmids giving the correct
                band were sequenced;{" "}
                <strong>all sequencing results were correct</strong>.
              </p>
              <p>
                The correctly sequenced{" "}
                <strong>2KY-5-Tag and 2KY-10-Tag</strong> plasmids were
                transformed into <em>E. coli</em> BL21, and single colonies were
                successfully obtained (Figure 1.3.5); both plasmids were thus
                successfully constructed and transformed.
              </p>
            </div>
            <div className="source-block figure-block" data-block="126">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/17.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/17.avif"
                    alt="Figure 1.3.5. Single colonies of E. coli BL21 obtained after transformation with the 2KY-5-Tag and 2KY-10-Tag plasmids."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="127">
              <p className="figure-caption">
                <strong>Figure 1.3.5.</strong> Single colonies of{" "}
                <em>E. coli</em> BL21 obtained after transformation with the
                2KY-5-Tag and 2KY-10-Tag plasmids.
              </p>
            </div>
            <div className="source-block" data-block="128">
              <p>
                Protein expression was subsequently induced and the proteins
                were purified. The purification results are shown in Figure
                1.3.6: <strong>the purification was effective</strong>, with
                yields of approximately 520 mg and 490 mg per liter of bacterial
                culture for 2KY-5-Tag and 2KY-10-Tag, respectively,{" "}
                <strong>close to that of 2KY-5.</strong>
              </p>
            </div>
            <div className="source-block figure-block" data-block="129">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/18.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/18.avif"
                    alt="Figure 1.3.6. SDS-PAGE analysis of the purified 2KY-5-Tag and 2KY-10-Tag proteins. Yields were approximately 520 mg and 490 mg per liter of bacterial culture, respectively, close to that of 2KY-5."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="130">
              <p className="figure-caption">
                <strong>Figure 1.3.6.</strong> SDS-PAGE analysis of the purified
                2KY-5-Tag and 2KY-10-Tag proteins. Yields were approximately 520
                mg and 490 mg per liter of bacterial culture, respectively,
                close to that of 2KY-5.
              </p>
            </div>
          </div>
        </div>
      </section>
      <p
        className="description-closing"
        id="wetlab-scaffold-23"
        data-toc="exclude"
      >
        <strong>Hydrogel scaffold</strong>
        <br />
        The scaffold workflow links plasmid construction, protein production and
        hydrogel characterization. The parental 2KY-5 construct supports
        recursive extension and SnoopTag2 insertion, while the expression and
        purification workflow is applied across the resulting scaffold series.
        Photocrosslinking, structural characterization and mechanical testing
        establish the material properties described above.
      </p>
      <div className="section-heading">
        <h3
          data-block="78"
          id="wetlab-scaffold-24"
          data-toc="include"
          data-toc-depth="2"
        >
          2 Safety and functional evaluation of the hydrogel
        </h3>
        <h4
          data-block="79"
          id="wetlab-scaffold-25"
          data-toc="include"
          data-toc-depth="3"
        >
          2.1 Cytotoxicity assessment
        </h4>
      </div>
      <section className="pair">
        <h6 className="pair-label" id="wetlab-scaffold-26">
          Cytotoxicity assessment
        </h6>
        <div className="columns">
          <div className="column experiment">
            <p className="column-label">Experiment</p>
            <div className="source-block" data-block="80">
              <p>
                The relative viability of mesenchymal stem cells (MSCs) after
                co-culture with the SELP protein was measured by the{" "}
                <strong>CCK-8 assay</strong>. A control group, a blank group and
                treatment groups (5 µM and 10 µM) were set up, and three time
                points (24, 48 and 72 h) were examined. The experimental groups
                comprised a dressing-solution group and low- and
                high-concentration G-S groups (G-S low, stock solution diluted
                20-fold; G-S high, stock solution diluted 10-fold).
              </p>
            </div>
          </div>
          <div className="column results">
            <p className="column-label">Results</p>
            <div className="source-block" data-block="81">
              <p>
                The CCK-8 results were as follows. At 24 h, the cell viability
                of the dressing-solution, G-S low and G-S high groups was 125.1
                ± 36.3%, 110.2 ± 12.4% and 100.7 ± 12.7%, respectively; at 48 h,
                134.7 ± 3.2%, 103.0 ± 4.4% and 102.7 ± 4.7%; and at 72 h, 119.0
                ± 15.5%, 98.6 ± 27.6% and 88.2 ± 17.6% (percentages relative to
                the control group; mean ± SD, n = 3).
              </p>
              <p>
                The mean viability of every group at every time point was not
                lower than 88%, above the 70% threshold defined in ISO 10993-5
                (a reduction of cell viability by more than 30% is considered a
                cytotoxic effect) [10]{" "}
                <strong>
                  Overall, these results indicate that the material is not
                  markedly cytotoxic
                </strong>{" "}
                (Figure 2.1.1).
              </p>
            </div>
            <div className="source-block figure-block" data-block="82">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/19.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/19.avif"
                    alt="Figure 2.1.1. Relative viability of mesenchymal stem cells co-cultured with the SELP protein, measured by the CCK-8 assay at 24, 48 and 72 h. Percentages are relative to the control group (mean ± SD, n = 3)."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="83">
              <p className="figure-caption">
                <strong>Figure 2.1.1.</strong> Relative viability of mesenchymal
                stem cells co-cultured with the SELP protein, measured by the
                CCK-8 assay at 24, 48 and 72 h. Percentages are relative to the
                control group (mean ± SD, n = 3).
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="section-heading">
        <h4
          data-block="84"
          id="wetlab-scaffold-27"
          data-toc="include"
          data-toc-depth="3"
        >
          2.2 Functional validation in chondrocytes
        </h4>
      </div>
      <section className="pair">
        <h6 className="pair-label" id="wetlab-scaffold-28">
          Chondrocyte gene-expression analysis
        </h6>
        <div className="columns">
          <div className="column experiment">
            <p className="column-label">Experiment</p>
            <div className="source-block" data-block="85">
              <p>
                <strong>Special Note:</strong> Our collaborating team, led by
                Professors Hongwei Ouyang and Wenwen Huang, has an established
                and well-developed cartilage cell culture system. Therefore,
                their team conducted the cartilage cell culture and functional
                validation of SELP. Our team did not directly perform any
                biosafety-relevant experimental procedures in this part of the
                project.
              </p>
              <p>
                To further evaluate the effect of the hydrogels on the
                chondrocyte phenotype (the chondrocytes were not cultured or
                validated by our own team; the SELP hydrogel materials were sent
                to a third party for evaluation, so no biosafety issue is
                involved), chondrocytes were co-cultured with the hydrogels
                (2Y-5, 2KY-5 and 2KY-16), and the expression of
                cartilage-related genes was measured by qPCR (Figure 2.2.1).
              </p>
            </div>
          </div>
          <div className="column results">
            <p className="column-label">Results</p>
            <div className="source-block" data-block="86">
              <p>
                The qPCR results after co-culture of the hydrogels with
                chondrocytes were as follows:
              </p>
              <p>
                Using the 2Y-5 group (a scaffold protein without lysine sites,
                constructed in our laboratory and not shown here for reasons of
                space) as the reference (relative expression set to 1), the
                expression of aggrecan (ACAN) and type II collagen (COL2) was
                significantly upregulated in both the 2KY-5 and 2KY-16 groups;
                SOX9 expression was upregulated to approximately 3.2–3.3-fold (p
                &lt; 0.05), with no significant difference between the two
                groups. At the same time, the expression of type I collagen
                (COL1) decreased to approximately 0.17-fold and 0.13-fold (p
                &lt; 0.001), with no significant difference between the two
                groups. Type X collagen (COLX) was elevated to approximately
                2.7-fold in the 2KY-5 group (p &lt; 0.05 compared with both the
                2Y-5 and 2KY-16 groups), whereas there was no significant
                difference between the 2KY-16 and 2Y-5 groups.
              </p>
              <p>
                <strong>
                  These results indicate that the 2KY hydrogels promote the
                  expression of cartilage matrix-related genes (ACAN, COL2 and
                  SOX9) in chondrocytes and suppress COL1 expression. Increased
                  COL1 expression is a hallmark of the loss of the cartilage
                  phenotype (dedifferentiation) of chondrocytes in
                  culture,([11]) and SOX9 is a key transcriptional activator of
                  COL2 expression;([12]) this expression profile is therefore
                  conducive to maintaining the chondrocyte phenotype. Among the
                  groups, 2KY-16 had the stronger promoting effect on ACAN and
                  COL2 expression, indicating that to a certain extent the
                  effect is better as the repeat number increases, which makes
                  it more suitable for our clinical choice.
                </strong>
              </p>
            </div>
            <div className="source-block figure-block" data-block="87">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/20.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/20.avif"
                    alt="Figure 2.2.1. Relative expression of cartilage-related genes in chondrocytes co-cultured with the hydrogels, determined by qPCR. ACAN, COL2, SOX9, COL1 and COLX are shown with the 2Y-5 group as the reference (relative expression set to 1)."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="88">
              <p className="figure-caption">
                <strong>Figure 2.2.1.</strong> Relative expression of
                cartilage-related genes in chondrocytes co-cultured with the
                hydrogels, determined by qPCR. ACAN, COL2, SOX9, COL1 and COLX
                are shown with the 2Y-5 group as the reference (relative
                expression set to 1).
              </p>
            </div>
          </div>
        </div>
      </section>
      <p
        className="description-closing"
        id="wetlab-scaffold-29"
        data-toc="exclude"
      >
        <strong>Hydrogel evaluation</strong>
        <br />
        The cell experiments evaluate the hydrogel-related samples through CCK-8
        measurements and cartilage-related gene expression. Together, these
        assays connect the material characterization to the cellular responses
        reported for the tested conditions.
      </p>
      <div className="section-heading">
        <h3
          data-block="89"
          id="wetlab-scaffold-30"
          data-toc="include"
          data-toc-depth="2"
        >
          3 Ligation system
        </h3>
      </div>
      <div className="section-heading">
        <div className="source-block" data-block="90">
          <p>
            To verify that our ligation system is{" "}
            <strong>feasible and efficient</strong> and{" "}
            <strong>
              does not impair the hydrogel scaffold or the functional modules,
            </strong>{" "}
            we first fused SnoopTag2 and DogTag to sfGFP and SUMO, respectively,
            and placed the two fusion proteins together with SnoopLigase2 in a
            single system for the ligation reaction, which provided an initial
            validation of the normal function and efficiency of the system. We
            then ligated SnoopTag2 and DogTag to the scaffold protein and to the
            functional modules, respectively, in order to verify the performance
            of the ligation system under realistic conditions; the resulting
            products can in turn be used to examine the effect of incorporating
            functional modules into the hydrogel scaffold.
          </p>
        </div>
      </div>
      <div className="section-heading">
        <h4
          data-block="91"
          id="wetlab-scaffold-31"
          data-toc="include"
          data-toc-depth="3"
        >
          3.1 Expression of the ligation-system proteins
        </h4>
      </div>
      <section className="pair">
        <h6 className="pair-label" id="wetlab-scaffold-32">
          Expression of the ligation-system components
        </h6>
        <div className="columns">
          <div className="column experiment">
            <p className="column-label">Experiment</p>
            <div className="source-block" data-block="92">
              <p>
                Plasmids encoding SnoopTag2-sfGFP, SUMO-DogTag and SnoopLigase2
                were separately transformed into <em>E. coli</em> BL21(DE3) for
                protein expression. The expression strains were inoculated into
                LB liquid medium containing kanamycin (Kan) and cultured to
                mid-logarithmic phase, after which expression was induced with
                IPTG at a gradient of 0.1/0.25/0.5/1.0 mM. After culture at 16
                °C for 16 h, a small volume of culture was lysed by sonication
                and subjected to small-scale purification by nickel-affinity
                chromatography. The lysates and the purified eluates were
                analyzed by Western blot using an anti-His primary antibody.
              </p>
              <p>
                Samples taken before and after induction, during purification
                and from the culture supernatant were analyzed by SDS-PAGE and
                Western blot, which confirmed that all three proteins were
                successfully induced and located intracellularly, and identified
                the optimal induction concentration within the IPTG gradient.
                Large-scale expression of the adaptor proteins was then carried
                out under the optimal induction conditions.
              </p>
            </div>
          </div>
          <div className="column results">
            <p className="column-label">Results</p>
            <div className="source-block" data-block="93">
              <p>
                The Western blot results confirmed that all three target
                proteins were successfully induced, and the optimal induction
                concentrations of SnoopTag2-sfGFP, SUMO-DogTag and SnoopLigase2
                were 0.1 mM, 0.1 mM and 1.0 mM, respectively (Figure 3.1.1).
                <strong>
                  Large-scale production was subsequently carried out under the
                  optimal conditions determined, and expression was good for all
                  three proteins
                </strong>{" "}
                (Figure 3.1.2).
              </p>
            </div>
            <div className="source-block figure-block" data-block="94">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/27.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/27.avif"
                    alt="Figure 3.1.1. Western blot analysis of the IPTG induction gradient. Lysates and purified eluates of SnoopTag2-sfGFP, SUMO-DogTag and SnoopLigase2 were probed with an anti-His primary antibody; the optimal induction concentrations were 0.1, 0.1 and 1.0 mM, respectively."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="95">
              <p className="figure-caption">
                <strong>Figure 3.1.1.</strong> Western blot analysis of the IPTG
                induction gradient. Lysates and purified eluates of
                SnoopTag2-sfGFP, SUMO-DogTag and SnoopLigase2 were probed with
                an anti-His primary antibody; the optimal induction
                concentrations were 0.1, 0.1 and 1.0 mM, respectively.
              </p>
            </div>
            <div className="source-block figure-block" data-block="96">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/28.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/28.avif"
                    alt="Figure 3.1.2. Large-scale expression of the ligation-system proteins. SnoopTag2-sfGFP, SUMO-DogTag and SnoopLigase2 were expressed under the optimized induction conditions."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="97">
              <p className="figure-caption">
                <strong>Figure 3.1.2.</strong> Large-scale expression of the
                ligation-system proteins. SnoopTag2-sfGFP, SUMO-DogTag and
                SnoopLigase2 were expressed under the optimized induction
                conditions.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="section-heading">
        <h4
          data-block="98"
          id="wetlab-scaffold-33"
          data-toc="include"
          data-toc-depth="3"
        >
          3.2 Purification and dialysis of the ligation-system proteins
        </h4>
      </div>
      <section className="pair">
        <h6 className="pair-label" id="wetlab-scaffold-34">
          Purification and protein concentrations
        </h6>
        <div className="columns">
          <div className="column experiment">
            <p className="column-label">Experiment</p>
            <div className="source-block" data-block="99">
              <p>
                The proteins were purified by nickel-affinity chromatography.
                The purified solutions of the three proteins were dialyzed in
                dialysis bags with a 3.5-kDa molecular weight cut-off. The
                dialysis buffer was PBS for SnoopTag2-sfGFP and SUMO-DogTag, and
                25 mM Tris–borate (TB) buffer (pH 7.4) containing 20% (v/v)
                glycerol for SnoopLigase2, in order to preserve enzyme activity.
                Dialysis was carried out for 1 day with three buffer changes,
                and the liquid in the dialysis bags was collected after
                equilibration; protein concentrations were determined by the BCA
                assay. Protein solutions meeting the required concentration were
                dialyzed into an appropriate buffer system, and the dialyzed
                protein solutions were quantified again by the BCA assay to
                guide the preparation of the subsequent ligation reaction
                systems.
              </p>
            </div>
          </div>
          <div className="column results">
            <p className="column-label">Results</p>
            <div className="source-block" data-block="100">
              <p>
                After purification by nickel-affinity chromatography and
                dialysis (Figure 3.2.1), the final concentrations of the three
                protein solutions were: SnoopTag2-sfGFP (30 kDa) - 1.33 mg/mL;
                SnoopLigase2 (12.9 kDa) - 0.66 mg/mL; and SUMO-DogTag (14.7 kDa)
                - 0.60 mg/mL.
              </p>
            </div>
            <div className="source-block figure-block" data-block="101">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/29.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/29.avif"
                    alt="Figure 3.2.1. Purified and dialyzed ligation-system proteins. Final concentrations determined by the BCA assay: SnoopTag2-sfGFP (30 kDa), 1.33 mg/mL; SnoopLigase2 (12.9 kDa), 0.66 mg/mL; SUMO-DogTag (14.7 kDa), 0.60 mg/mL."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="102">
              <p className="figure-caption">
                <strong>Figure 3.2.1.</strong> Purified and dialyzed
                ligation-system proteins. Final concentrations determined by the
                BCA assay: SnoopTag2-sfGFP (30 kDa), 1.33 mg/mL; SnoopLigase2
                (12.9 kDa), 0.66 mg/mL; SUMO-DogTag (14.7 kDa), 0.60 mg/mL.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="section-heading">
        <h4
          data-block="103"
          id="wetlab-scaffold-35"
          data-toc="include"
          data-toc-depth="3"
        >
          3.3 Ligation reaction
        </h4>
      </div>
      <section className="pair">
        <h6 className="pair-label" id="wetlab-scaffold-36">
          Time-course analysis of ligation
        </h6>
        <div className="columns">
          <div className="column experiment">
            <p className="column-label">Experiment</p>
            <div className="source-block" data-block="104">
              <p>
                Based on the measured protein concentrations, the reaction
                system was prepared with all three components at a final
                concentration of 25 µM, and the ligation reaction was carried
                out at room temperature (approximately 24 °C). Samples were
                taken at 10, 30 and 60 min after setting up the reaction, and
                the reactions were terminated by boiling. The individual
                components and the samples from the different reaction times
                were analyzed by SDS-PAGE.
              </p>
              <p>
                Because SnoopTag2 and DogTag are small, fusing them to sfGFP and
                SUMO, respectively, allowed the individual components and the
                ligation product to be distinguished by molecular weight. The
                ligation results were analyzed by SDS-PAGE in order to verify
                the efficiency and completeness of the reaction.
              </p>
            </div>
          </div>
          <div className="column results">
            <p className="column-label">Results</p>
            <div className="source-block" data-block="105">
              <p>
                The results showed that{" "}
                <strong>ligation had occurred within 10 min</strong> (a distinct
                ligation-product band of approximately 45 kDa appeared,
                consistent with the sum of SUMO-DogTag at 14.7 kDa and
                SnoopTag2-sfGFP at 30 kDa) and was complete within 1 h (the band
                of SUMO-DogTag, which was present in lower amount, disappeared),
                demonstrating that{" "}
                <strong>
                  the ligation reaction is very rapid and efficient
                </strong>
                (Figure 3.3.1).
              </p>
            </div>
            <div className="source-block figure-block" data-block="106">
              <p>
                <a
                  className="figure-link"
                  href="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/30.avif"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/30.avif"
                    alt="Figure 3.3.1. SDS-PAGE analysis of the ligation reaction time course. Samples were taken at 10, 30 and 60 min; the approximately 45-kDa ligation product appeared within 10 min and the reaction was complete within 1 h."
                  />
                </a>
              </p>
            </div>
            <div className="source-block" data-block="107">
              <p className="figure-caption">
                <strong>Figure 3.3.1.</strong> SDS-PAGE analysis of the ligation
                reaction time course. Samples were taken at 10, 30 and 60 min;
                the approximately 45-kDa ligation product appeared within 10 min
                and the reaction was complete within 1 h.
              </p>
            </div>
          </div>
        </div>
      </section>
      <p
        className="description-closing"
        id="wetlab-scaffold-37"
        data-toc="exclude"
      >
        <strong>Ligation system</strong>
        <br />
        The ligation workflow covers production and purification of the three
        components, followed by a time-course assay of the reaction. The results
        connect preparation of the ligation-system proteins with the formation
        of the ligation product shown in the original gel.
      </p>
      <p
        className="description-closing"
        id="wetlab-scaffold-38"
        data-toc="exclude"
      >
        <strong>Platform</strong>
        <br />
        The scaffold-group work brings together a programmable protein scaffold,
        a hydrogel preparation workflow, material and cellular characterization,
        and a peptide ligation system. These experimental stages provide the
        basis for assembling and evaluating the platform described in this
        section.
      </p>
    </>
  );
}

export function ScaffoldReferences() {
  return (
    <>
      <div className="source-block" data-block="117">
        <p>
          [1] Huang, W.; Tarakanova, A.; Dinjaski, N.; Wang, Q.; Xia, X.; Chen,
          Y.; Wong, J. Y.; Buehler, M. J.; Kaplan, D. L. Design of multistimuli
          responsive hydrogels using integrated modeling and genetically
          engineered silk–elastin-like proteins. Adv. Funct. Mater. 2016, 26
          (23), 4113–4123.{" "}
          <a
            href="https://doi.org/10.1002/adfm.201600236"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1002/adfm.201600236
          </a>
          .
        </p>
      </div>
      <div className="source-block" data-block="118">
        <p>
          [2] Nie, K.; et al. Ultrafast crosslinking, strongly adhesive de novo
          protein hydrogels promote cartilage regeneration. Bioact. Mater. 2026,
          56, 368–385.{" "}
          <a
            href="https://doi.org/10.1016/j.bioactmat.2025.10.009"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1016/j.bioactmat.2025.10.009
          </a>
          .
        </p>
      </div>
      <div className="source-block" data-block="119">
        <p>
          [3] McDaniel, J. R.; MacKay, J. A.; Quiroz, F. G.; Chilkoti, A.
          Recursive directional ligation by plasmid reconstruction allows rapid
          and seamless cloning of oligomeric genes. Biomacromolecules 2010, 11
          (4), 944–952.{" "}
          <a
            href="https://doi.org/10.1021/bm901387t"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1021/bm901387t
          </a>
          .
        </p>
      </div>
      <div className="source-block" data-block="120">
        <p>
          [4] Meyer, D. E.; Chilkoti, A. Purification of recombinant proteins by
          fusion with thermally-responsive polypeptides. Nat. Biotechnol. 1999,
          17 (11), 1112–1115.{" "}
          <a
            href="https://doi.org/10.1038/15100"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1038/15100
          </a>
          .
        </p>
      </div>
      <div className="source-block" data-block="121">
        <p>
          [5] Cho, Y.; Zhang, Y.; Christensen, T.; Sagle, L. B.; Chilkoti, A.;
          Cremer, P. S. Effects of Hofmeister anions on the phase transition
          temperature of elastin-like polypeptides. J. Phys. Chem. B 2008, 112
          (44), 13765–13771.{" "}
          <a
            href="https://doi.org/10.1021/jp8062977"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1021/jp8062977
          </a>
          .
        </p>
      </div>
      <div className="source-block" data-block="122">
        <p>
          [6] Smith, P. K.; Krohn, R. I.; Hermanson, G. T.; Mallia, A. K.;
          Gartner, F. H.; Provenzano, M. D.; Fujimoto, E. K.; Goeke, N. M.;
          Olson, B. J.; Klenk, D. C. Measurement of protein using bicinchoninic
          acid. Anal. Biochem. 1985, 150 (1), 76–85.{" "}
          <a
            href="https://doi.org/10.1016/0003-2697(85)90442-7"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1016/0003-2697(85)90442-7
          </a>
          .
        </p>
      </div>
      <div className="source-block" data-block="123">
        <p>
          [7] Fancy, D. A.; Kodadek, T. Chemistry for the analysis of
          protein–protein interactions: rapid and efficient cross-linking
          triggered by long wavelength light. Proc. Natl. Acad. Sci. U.S.A.
          1999, 96 (11), 6020–6024.{" "}
          <a
            href="https://doi.org/10.1073/pnas.96.11.6020"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1073/pnas.96.11.6020
          </a>
          .
        </p>
      </div>
      <div className="source-block" data-block="124">
        <p>
          [8] Elvin, C. M.; Carr, A. G.; Huson, M. G.; Maxwell, J. M.; Pearson,
          R. D.; Vuocolo, T.; Liyou, N. E.; Wong, D. C. C.; Merritt, D. J.;
          Dixon, N. E. Synthesis and properties of crosslinked recombinant
          pro-resilin. Nature 2005, 437 (7061), 999–1002.{" "}
          <a
            href="https://doi.org/10.1038/nature04085"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1038/nature04085
          </a>
          .
        </p>
      </div>
      <div className="source-block" data-block="125">
        <p>
          [9] Malencik, D. A.; Anderson, S. R. Dityrosine as a product of
          oxidative stress and fluorescent probe. Amino Acids 2003, 25 (3-4),
          233–247.{" "}
          <a
            href="https://doi.org/10.1007/s00726-003-0014-z"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1007/s00726-003-0014-z
          </a>
          .
        </p>
      </div>
      <div className="source-block" data-block="126">
        <p>
          [10] ISO 10993-5:2009. Biological evaluation of medical devices — Part
          5: Tests for in vitro cytotoxicity; International Organization for
          Standardization: Geneva, Switzerland, 2009.
        </p>
      </div>
      <div className="source-block" data-block="127">
        <p>
          [11] von der Mark, K.; Gauss, V.; von der Mark, H.; Müller, P.
          Relationship between cell shape and type of collagen synthesised as
          chondrocytes lose their cartilage phenotype in culture. Nature 1977,
          267 (5611), 531–532.{" "}
          <a
            href="https://doi.org/10.1038/267531a0"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1038/267531a0
          </a>
          .
        </p>
      </div>
      <div className="source-block" data-block="128">
        <p>
          [12] Lefebvre, V.; Huang, W.; Harley, V. R.; Goodfellow, P. N.; de
          Crombrugghe, B. SOX9 is a potent activator of the chondrocyte-specific
          enhancer of the proα1(II) collagen gene. Mol. Cell. Biol. 1997, 17
          (4), 2336–2346.{" "}
          <a
            href="https://doi.org/10.1128/MCB.17.4.2336"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1128/MCB.17.4.2336
          </a>
          .
        </p>
      </div>
      <div className="source-block" data-block="129">
        <p>
          [13] Veggiani, G.; Nakamura, T.; Brenner, M. D.; Gayet, R. V.; Yan,
          J.; Robinson, C. V.; Howarth, M. Programmable polyproteams built using
          twin peptide superglues. Proc. Natl. Acad. Sci. U.S.A. 2016, 113 (5),
          1202–1207.{" "}
          <a
            href="https://doi.org/10.1073/pnas.1519214113"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1073/pnas.1519214113
          </a>
          .
        </p>
      </div>
      <div className="source-block" data-block="130">
        <p>
          [14] Buldun, C. M.; Jean, J. X.; Bedford, M. R.; Howarth, M.
          SnoopLigase catalyzes peptide–peptide locking and enables solid-phase
          conjugate isolation. J. Am. Chem. Soc. 2018, 140 (8), 3008–3018.{" "}
          <a
            href="https://doi.org/10.1021/jacs.7b13237"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1021/jacs.7b13237
          </a>
          .
        </p>
      </div>
      <div className="source-block" data-block="131">
        <p>
          [15] Keeble, A. H.; Wood, D. P.; Howarth, M. Design and evolution of
          enhanced peptide–peptide ligation for modular transglutaminase
          assembly. Bioconjugate Chem. 2023, 34 (6), 1019–1036.
        </p>
      </div>
      <div className="source-block" data-block="132">
        <p>
          [23] Buldun CM, Jean JX, Bedford MR, Howarth M. SnoopLigase Catalyzes
          Peptide–Peptide Locking and Enables Solid-Phase Conjugate Isolation.
          Journal of the American Chemical Society. 2018;140(8):3008–3018.
        </p>
      </div>
      <div className="source-block" data-block="133">
        <p>
          [24] Abe Y, Shodai T, Muto T, Mihara K, Torii H, Nishikawa S, Endo T,
          Kohda D. Structural Basis of Presequence Recognition by the
          Mitochondrial Protein Import Receptor Tom20. Cell.
          2000;100(5):551–560.
        </p>
      </div>
      <div className="source-block" data-block="134">
        <p>
          [25] Okutani A, Naima J, Ogihara A, Motoichi T, Ohsawa I, Ohta Y. A
          method for isolating and cryopreserving intact mitochondria with
          improved integrity and functionality. Biophysics and Physicobiology.
          2025;22(2):e220012.
        </p>
      </div>
      <div className="source-block" data-block="135">
        <p>
          [26] Nakano T, et al. Mitochondrial surface coating with artificial
          lipid membrane improves the transfer efficacy. Communications
          Biology. 2022;5:745.
        </p>
      </div>
      <div className="source-block" data-block="136">
        <p>
          [27] Miyasaki K, Han S, Carton O, Kandell RM, Gunn J, Kwon EJ.
          Formulation methods for peptide-modified lipid nanoparticles. Journal
          of Controlled Release. 2025;385:114030.
        </p>
      </div>
      <div className="source-block" data-block="137">
        <p>
          [28] Little CB, Barai A, Burkhardt D, Smith SM, Fosang AJ, Werb Z,
          Shah M, Thompson EW. Matrix metalloproteinase 13–deficient mice are
          resistant to osteoarthritic cartilage erosion but not chondrocyte
          hypertrophy or osteophyte development. Arthritis &amp; Rheumatism.
          2009;60(12):3723–3733.
        </p>
      </div>
      <div className="source-block" data-block="138">
        <p>
          [29] Ishiyama M, Miyazono Y, Sasamoto K, Ohkura Y, Ueno K. A highly
          water-soluble disulfonated tetrazolium salt as a chromogenic indicator
          for NADH as well as cell viability. Talanta.
          1997;44(7):1299–1305.
        </p>
      </div>
    </>
  );
}

export function ScaffoldConclusion() {
  return (
    <>
      The scaffold-group experiments connect scaffold design with protein
      production, hydrogel formation, material characterization and cellular
      evaluation. Recursive construction and tag insertion extend the scaffold
      design, while the ligation experiments establish the accompanying
      connection system. Together, these results form the scaffold-group
      contribution to the wet-lab platform.
    </>
  );
}
