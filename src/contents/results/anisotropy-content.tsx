import { FigureCaption } from "../../components/FigureCaption";
export function AnisotropyContent() {
  return (
    <>
      <h3 id="wetlab-anisotropy-overview" data-toc="include" data-toc-depth="2">
        4 Magnetically Responsive Anisotropy
      </h3>
      <div className="source-block">
        <p>
          To validate the key steps in the design of the magnetically responsive anisotropy module,
          we carried out expression, purification, and fluorescence-based binding experiments for a
          magnetic-nanoparticle-binding protein. We first obtained a recombinant fusion protein
          containing the Fe₃O₄-binding peptide TVNFKLY and completed its expression, purification,
          and desalting. We then examined its binding to magnetic nanoparticles through FITC
          fluorescence labeling, co-incubation with the particles, magnetic separation, and washing,
          thereby providing an experimental basis for subsequently introducing
          magnetic-field-induced orientation into a SELP hydrogel.
        </p>
      </div>
      <h4 id="wetlab-anisotropy-4-1" data-toc="include" data-toc-depth="3">
        4.1 Design of the Magnetic-Nanoparticle-Binding Protein
      </h4>
      <section className="pair">
        <div className="columns">
          <div className="column experiment">
            <div className="column-label">
              Experiment
            </div>
            <div className="source-block">
              <p>
                The Fe₃O₄-binding capability of TVNFKLY has previously been validated through
                phage-display screening and multiple characterization methods [1]. We used TVNFKLY
                as the functional peptide in the experimental group and included GTWSLLL, which was
                expected not to bind magnetic nanoparticles, as a control to evaluate the
                contribution of the TVNFKLY sequence to particle binding. <strong>The experimental construct contained a His tag, a SUMO tag, a DogTag sequence, and the TVNFKLY peptide.</strong> The His tag
                was used for subsequent affinity purification, the SUMO tag helped improve soluble
                expression and stability of the heterologous protein [2], and DogTag provided an
                interface for subsequent connection to other protein modules [3,4].
              </p>
              <p>
                Because this plasmid differs from the corresponding SUMO-DogTag plasmid by only 81
                bp, we used a site-directed mutagenesis system for construction. The SUMO-DogTag
                plasmid was used as the backbone, and the TVNFKLY-coding sequence was introduced by
                high-fidelity PCR. The methylated parental template was then digested with DpnI, and
                Exnase II-mediated homologous recombination was used to recircularize the linear
                amplification product. The recombinant product was transformed into Trelief 5alpha
                competent cells, and single colonies were picked after selection on
                kanamycin-containing medium. Candidate clones were screened by colony PCR, and
                positive clones were further subjected to plasmid extraction and Sanger sequencing.
              </p>
            </div>
          </div>
          <div className="column results">
            <div className="column-label">
              Results
            </div>
            <div className="source-block">
              <p>
                Western blot results showed that, after IPTG addition, an enhanced band appeared in
                the molecular-weight region corresponding to the target fusion protein, indicating
                that pET28a-SUMO-DogTag-TVNFKLY could be expressed in BL21(DE3). Based on the
                literature and preliminary screening results, the band in the target region was
                relatively clear under the 1 mM IPTG condition, and this condition was therefore
                selected for scale-up expression [5].
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/02/anisotropy-v2-03-d8f6e016.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 4.1.1">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/02/anisotropy-v2-03-d8f6e016.avif" alt="Figure 4.1.1." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 4.1.1 |</strong> Representative plates following plasmid amplification and transformation
                into the expression host. The figure shows the Trelief 5α plate used for plasmid
                amplification, the BL21(DE3) expression-host plate, and the negative control. Colony
                growth on the experimental plates enabled subsequent colony selection and culture.
              </FigureCaption>
            </figure>
            <div className="source-block">
              <p>
                We constructed an expression plasmid encoding 6xHis-SUMO-DogTag-TVNFKLY (Figure
                4.1.2).
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/02/anisotropy-v2-01-bce663fd.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 4.1.2">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/02/anisotropy-v2-01-bce663fd.avif" alt="Figure 4.1.2." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 4.1.2 |</strong> Map of the pET28a-SUMO-DogTag-TVNFKLY expression plasmid. The plasmid is
                approximately 5,683 bp in length and contains T7 expression elements, a
                kanamycin-resistance (KanR) selection marker, and a 6×His-SUMO-DogTag-TVNFKLY fusion
                expression cassette.
              </FigureCaption>
            </figure>
            <div className="source-block">
              <p>
                Single colonies suitable for subsequent screening were obtained on the
                transformation plates. In the colony PCR assay, multiple candidate clones exhibited
                the target band indicated in the original experimental records.
              </p>
              <p>
                Agarose gel electrophoresis of the colony PCR products revealed a band at
                approximately 5,683 bp, consistent with the theoretical value (Figure 4.1.3).
                <strong>Sequencing results matched the designed sequence</strong>; therefore, the construct was advanced to expression validation.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/02/anisotropy-v2-02-008d394b.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 4.1.3">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/02/anisotropy-v2-02-008d394b.avif" alt="Figure 4.1.3." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 4.1.3 |</strong> Preliminary colony PCR screening of candidate pET28a-SUMO-DogTag-TVNFKLY
                transformants. The amplification products from the candidate colonies are shown on
                the left, and the DNA marker is shown on the right. The red arrows indicate the
                bands of interest annotated in the original experimental records.
              </FigureCaption>
            </figure>
          </div>
        </div>
      </section>
      <h4 id="wetlab-anisotropy-4-2" data-toc="include" data-toc-depth="3">
        4.2 Expression, Purification, and Concentration of the Fusion Protein
      </h4>
      <section className="pair">
        <div className="columns">
          <div className="column experiment">
            <div className="column-label">
              Experiment
            </div>
            <div className="source-block">
              <p>
                The sequence-confirmed pET28a-SUMO-DogTag-TVNFKLY plasmid was transformed into
                <em>E. coli</em> BL21(DE3) competent cells, and expression strains were selected on
                kanamycin-containing medium. A single colony was picked for small-scale culture, and
                IPTG was added under different induction conditions to induce fusion-protein
                expression. After induction, the cells were collected and lysed, and Western
                blotting was used to compare changes in the protein bands before and after induction
                or under different induction conditions. Based on the small-scale
                expression-screening results, the condition showing a more prominent band in the
                target molecular-weight region was selected for subsequent scale-up culture. In this
                stage, 1 mM IPTG was ultimately used to induce expression of the fusion protein.
              </p>
              <p>
                After scale-up culture, the cells were collected, resuspended, and disrupted by
                sonication to obtain the lysate. The N-terminal 6xHis tag of the fusion protein was
                used for Ni-affinity chromatography. The lysate, flow-through, wash, and elution
                fractions were collected sequentially, and enrichment of the target protein was
                evaluated by SDS-PAGE.
              </p>
              <p>
                The purified elution fraction was further dialyzed or desalted to reduce the effects
                of imidazole, salt ions, and other small molecules on FITC labeling and subsequent
                particle-binding experiments. The desalted protein was concentrated using an
                ultrafiltration device. Samples before concentration, the retentate after
                concentration, and the filtrate were retained, and their protein concentrations were
                measured using the BCA assay.
              </p>
            </div>
          </div>
          <div className="column results">
            <div className="column-label">
              Results
            </div>
            <div className="source-block">
              <p>
                <strong>SDS-PAGE showed a relatively distinct enriched band in the approximately 25-35 kDa region of the elution fraction</strong>, whereas some contaminating proteins were mainly present in the lysate,
                flow-through, or wash fractions. These results indicated that Ni-affinity
                chromatography enriched the His-tagged SUMO-DogTag-TVN fusion protein.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/02/anisotropy-v2-04-5bef46b7.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 4.2.1">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/02/anisotropy-v2-04-5bef46b7.avif" alt="Figure 4.2.1." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 4.2.1 |</strong> Ni-affinity purification of the SUMO-DogTag-TVN fusion protein. The gel
                sequentially shows the elution, wash, flow-through, lysate, and protein-marker
                lanes. An enriched band is present in the approximately 25-35 kDa region of the
                elution fraction, and the red box indicates the main region of interest.
              </FigureCaption>
            </figure>
            <div className="source-block">
              <p>
                The BCA results showed that the calculated protein concentration increased from
                approximately 0.37 mg/mL before concentration to approximately 5.04 mg/mL after
                concentration, indicating that <strong>ultrafiltration markedly increased the protein concentration in the retentate</strong>. A protein signal of approximately 0.34
                mg/mL was still detected in the filtrate, suggesting that small-molecule
                interference, membrane permeation loss, or measurement background may have been
                present during the concentration process.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/02/anisotropy-v2-05-3a1f5277.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 4.2.2">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/02/anisotropy-v2-05-3a1f5277.avif" alt="Figure 4.2.2." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 4.2.2 |</strong> BCA protein quantification before and after ultrafiltration. (a) BCA
                reaction plate and absorbance records; (b) protein standard curve; and (c)
                calculated concentrations of the sample before concentration, the retentate after
                concentration, and the filtrate. The results show that the protein was mainly
                concentrated in the ultrafiltration retentate.
              </FigureCaption>
            </figure>
          </div>
        </div>
      </section>
      <h4 id="wetlab-anisotropy-4-3" data-toc="include" data-toc-depth="3">
        4.3 Ligation Reaction
      </h4>
      <section className="pair">
        <div className="columns">
          <div className="column experiment">
            <div className="column-label">
              Experiment
            </div>
            <div className="source-block">
              <p>
                To verify whether the purified SUMO-DogTag-TVN fusion protein retained
                DogTag-mediated conjugation activity, we used GFP-SnoopTag2 as a visual reporter
                protein and SnoopLigase2 to catalyze covalent ligation between DogTag and SnoopTag2.
                The reaction systems contained either SUMO-DogTag-TVN or SUMO-DogTag lacking
                TVNFKLY. A negative control lacking SnoopLigase2 was also included to exclude
                higher-molecular-weight bands caused by protein mixing or nonspecific aggregation.
                Each group was reacted at room temperature for 15 min or 6 h. After the reaction,
                SDS-PAGE loading buffer was added to terminate the reaction, and SDS-PAGE was used
                to compare the migration patterns of the substrate bands and the ligation-product
                bands.
              </p>
            </div>
          </div>
          <div className="column results">
            <div className="column-label">
              Results
            </div>
            <div className="source-block">
              <p>
                In the control group without SnoopLigase2, GFP-SnoopTag2 and SUMO-DogTag-TVN
                primarily retained their respective substrate bands, and no obvious
                higher-molecular-weight ligation product was observed. <strong>After SnoopLigase2 was added, a new higher-molecular-weight band appeared above the substrate bands.</strong> Its migration
                position was consistent with the expected molecular weight of the ligation product
                formed by GFP-SnoopTag2 and the DogTag-containing protein.
              </p>
              <p>
                SUMO-DogTag-TVN and SUMO-DogTag both showed the same type of enzyme-dependent band
                change, indicating that introduction of the TVNFKLY peptide did not substantially
                disrupt the ligation function of DogTag. A ligation product could already be
                observed after 15 min, and the corresponding band remained detectable after
                extending the reaction to 6 h.
              </p>
              <p>
                Therefore, these results support the conclusion that the purified SUMO-DogTag-TVN
                retained detectable SnoopLigase2-dependent conjugation activity.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/02/anisotropy-v2-06-84dc206e.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 4.3.1">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/02/anisotropy-v2-06-84dc206e.avif" alt="Figure 4.3.1." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 4.3.1 |</strong> SnoopLigase2-mediated DogTag ligation reaction. GFP-SnoopTag2 was
                reacted with SUMO-DogTag-TVN or SUMO-DogTag in the presence or absence of
                SnoopLigase2 for 15 min or 6 h. Higher-molecular-weight ligation-product bands
                appeared after SnoopLigase2 was added, whereas the no-ligase control did not show
                the same band pattern, indicating that SUMO-DogTag-TVN retained detectable
                DogTag-mediated conjugation activity.
              </FigureCaption>
            </figure>
          </div>
        </div>
      </section>
      <h4 id="wetlab-anisotropy-4-4" data-toc="include" data-toc-depth="3">
        4.4 Functional Validation
      </h4>
      <h5 id="wetlab-anisotropy-4-4-1" data-toc="include" data-toc-depth="4">
        4.4.1 FITC Fluorescence Labeling
      </h5>
      <section className="pair">
        <div className="columns">
          <div className="column experiment">
            <div className="column-label">
              Experiment
            </div>
            <div className="source-block">
              <p>
                To track the distribution of the fusion protein during magnetic-nanoparticle
                incubation, magnetic separation, and washing, we fluorescently labeled the purified
                protein with fluorescein isothiocyanate (FITC).
              </p>
              <p>
                The protein was placed in a carbonate buffer suitable for the reaction between FITC
                and protein amino groups. FITC was slowly added under light-protected conditions,
                and the labeling reaction was allowed to proceed. After the reaction, glycine was
                added to terminate the remaining FITC-labeling reaction, and unreacted free dye was
                removed using a desalting column [6]. The control protein was subjected to the same
                labeling and post-treatment procedures.
              </p>
              <p>
                Small amounts of FITC-labeled protein and unlabeled protein were analyzed by
                SDS-PAGE. The nonfluorescent half of the gel was immersed in Coomassie Brilliant
                Blue G250 rapid staining solution, while the side containing the FITC-labeled
                protein was kept protected from light and was not stained. Images were acquired
                using the 532 nm and 302 nm imaging channels. One portion was used to observe
                protein migration and loading, and the other was used to compare the fluorescence
                signals of the labeled and unlabeled samples.
              </p>
            </div>
          </div>
          <div className="column results">
            <div className="column-label">
              Results
            </div>
            <div className="source-block">
              <p>
                Gel imaging showed a clear fluorescence signal in the FITC-labeled protein lane,
                whereas the unlabeled protein lane displayed only weak background. The fluorescence
                signal largely corresponded to the protein-band region, supporting the conclusion
                that FITC was associated with the protein sample rather than that the signal was
                produced entirely by free dye in the gel.
              </p>
              <p>
                These results indicate that the labeled fusion protein had a fluorescence signal
                suitable for subsequent microscopic observation.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/02/anisotropy-v2-07-b6c92224.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 4.4.1">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/02/anisotropy-v2-07-b6c92224.avif" alt="Figure 4.4.1." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 4.4.1 |</strong> Verification of FITC labeling of the SUMO-DogTag-TVN fusion protein. (a)
                The 532 nm imaging channel recorded in the original experiment; (b) the 302 nm
                imaging channel. The FITC-labeled protein lane showed a clear fluorescence signal,
                whereas the unlabeled protein lane showed no fluorescence, indicating that the
                fusion protein had acquired detectable FITC labeling.
              </FigureCaption>
            </figure>
          </div>
        </div>
      </section>
      <h5 id="wetlab-anisotropy-4-4-2" data-toc="include" data-toc-depth="4">
        4.4.2 Magnetic-Nanoparticle Binding and Washing
      </h5>
      <section className="pair">
        <div className="columns">
          <div className="column experiment">
            <div className="column-label">
              Experiment
            </div>
            <div className="source-block">
              <p>
                To preliminarily evaluate the binding of SUMO-DogTag-TVN to magnetic nanoparticles
                and its retention after washing, the FITC-labeled fusion protein was co-incubated
                with Fe₃O₄ magnetic nanoparticles. The experimental group used the fusion protein
                containing TVNFKLY, whereas the control group used the control protein containing
                GTWSLLL. Protein input, particle amount, incubation time, and buffer system were
                kept as consistent as possible.
              </p>
              <p>
                A magnetic separator was used to collect the magnetic nanoparticles and remove the
                original dispersion medium. The labeled-protein reaction mixture was then added and
                thoroughly resuspended. Co-incubation was performed at room temperature in the dark,
                with periodic gentle mixing to ensure sufficient contact between the protein and the
                particles.
              </p>
              <p>
                After incubation, the magnetic nanoparticles were collected using the magnetic rack
                and the supernatant was removed. The particles were then washed multiple times with
                buffer to reduce the retention of unbound protein and free fluorescent material.
                After washing, the particles were gently resuspended, and bright-field and
                green-fluorescence images were acquired to determine whether the fluorescence signal
                remained associated with the particle fraction.
              </p>
            </div>
          </div>
          <div className="column results">
            <div className="column-label">
              Results
            </div>
            <div className="source-block">
              <p>
                After magnetic separation and multiple washes, green fluorescence could still be
                observed in particles or particle-aggregation regions in some microscopic fields,
                indicating that FITC-labeled material could be retained with the magnetic-particle
                fraction in this experimental workflow. <strong>Under the action of the magnetic field, the magnetic nanoparticles changed from a disordered state to an ordered arrangement, and the green fluorescence aligned accordingly.</strong> This result provided qualitative
                evidence for magnetic-field-guided changes in SELP orientation [7].
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/02/anisotropy-v2-08-23def463.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 4.4.2">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/02/anisotropy-v2-08-23def463.avif" alt="Figure 4.4.2." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 4.4.2 |</strong> MNPs group. The red arrows indicate the direction of the magnetic field.
                No fluorescence was observed from the magnetic nanoparticles, indicating that FITC
                alone did not detectably bind to the nanoparticles under these conditions.
              </FigureCaption>
            </figure>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/02/anisotropy-v2-09-b271a139.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 4.4.3">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/02/anisotropy-v2-09-b271a139.avif" alt="Figure 4.4.3." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 4.4.3 |</strong> GTWSLLL group. The red arrows indicate the direction of the magnetic
                field. No fluorescence was observed from the magnetic nanoparticles, indicating that
                GTWSLLL did not detectably bind to the nanoparticles under these conditions.
              </FigureCaption>
            </figure>
            <div className="source-block">
              <p>
                <span className="wetlab-results__video-pending">ZJU-China: MNPs in magnetic field (2026).</span> <span className="badge">Video awaiting platform review</span>
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/02/anisotropy-v2-11-1aef8f37.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 4.4.4">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/02/anisotropy-v2-11-1aef8f37.avif" alt="Figure 4.4.4." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 4.4.4 |</strong> TVNFKLY group. The red arrows indicate the direction of the magnetic
                field. The magnetic nanoparticles exhibited fluorescence, indicating that TVNFKLY
                bound to the nanoparticles and that the resulting complexes underwent directional
                alignment under the applied magnetic field.
              </FigureCaption>
            </figure>
            <div className="source-block">
              <p>
                <span className="wetlab-results__video-pending">ZJU-China: TVNFKLY-MNPs in magnetic field (2026).</span> <span className="badge">Video awaiting platform review</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
