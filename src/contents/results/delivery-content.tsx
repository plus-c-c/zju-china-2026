export function DeliveryContent() {
  return (
    <>
      <h3 id="wetlab-delivery-01" data-toc="include" data-toc-depth="2">
        6 Mitochondrial Therapeutic Module
      </h3>
      <div className="source-block">
        <p>
          As part of developing a modular carrier and delivery platform, we used mitochondria as a
          representative therapeutic cargo, prepared an engineered responsive peptide, evaluated its
          protein ligation activity and MMP-13 responsiveness, and characterized
          liposome–mitochondria complexes and their cellular delivery potential. With mitochondrial
          delivery as the initial application, this module <strong>provides a foundation for a broader delivery platform</strong> that could be extended to other therapeutic cargoes through further optimization of the carrier formulation and cargo-specific validation.
        </p>
      </div>
      <h4 id="wetlab-delivery-02" data-toc="include" data-toc-depth="3">
        6.1 Responsive Protein Expression and Functional Peptide Preparation
      </h4>
      <h5 id="wetlab-delivery-03" data-toc="include" data-toc-depth="4">
        6.1.1 Expression Plasmid and Control Design
      </h5>
      <section className="pair">
        <div className="columns">
          <div className="column experiment">
            <div className="column-label">
              Experiment
            </div>
            <div className="source-block">
              <p>
                We designed the responsive construct pET28a-MMP13sp and the scrambled control
                construct pET28a-Control using the pET-28a backbone. The responsive segment,
                RRGPLGLSLGKR, was replaced with RKGLSLGLPGRR in the control construct, preserving
                peptide length and amino acid composition while changing residue order. All other
                construct sequences were kept identical.
              </p>
              <p>
                Both designs incorporated a 6×His tag, a SUMO tag, a TEV protease cleavage site, a
                Cys conjugation site, and DogTag. GGGGS linkers were placed on either side of the
                responsive or control segment.
              </p>
            </div>
          </div>
          <div className="column results">
            <div className="column-label">
              Results
            </div>
            <div className="source-block">
              <p>
                The two plasmid designs were each 5691 bp long and shared a T7 promoter and a
                kanamycin resistance gene (Figures 1.1.1 and 1.1.2). Both encoded the same
                N-to-C-terminal arrangement: 6×His–SUMO–TEV cleavage site–Cys–GGGGS–responsive or
                control segment–GGGGS–DogTag. The responsive and control segments each contained 12
                amino acids and differed only in residue order.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-01-ceb8a502.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 6.1.1">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-01-ceb8a502.avif" alt="Figure 6.1.1." loading="lazy" decoding="async" />
              </a>
              <figcaption className="figure-caption">
                <strong>Figure 6.1.1 |</strong> Map of the MMP-responsive peptide expression plasmid pET28a-MMP13sp.
              </figcaption>
            </figure>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-02-fbba0648.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 6.1.2">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-02-fbba0648.avif" alt="Figure 6.1.2." loading="lazy" decoding="async" />
              </a>
              <figcaption className="figure-caption">
                <strong>Figure 6.1.2 |</strong> Map of the control peptide expression plasmid pET28a-Control.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <h5 id="wetlab-delivery-04" data-toc="include" data-toc-depth="4">
        6.1.2 Plasmid Transformation and Antibiotic Selection
      </h5>
      <section className="pair">
        <div className="columns">
          <div className="column experiment">
            <div className="column-label">
              Experiment
            </div>
            <div className="source-block">
              <p>
                The two plasmids were separately transformed into <em>Escherichia coli</em> BL21(DE3). Transformed
                cells were plated onto LB agar containing kanamycin, with an uninoculated plate
                included as a negative control. Following incubation, individual colonies were
                picked and expanded for protein expression.
              </p>
            </div>
          </div>
          <div className="column results">
            <div className="column-label">
              Results
            </div>
            <div className="source-block">
              <p>
                Multiple discrete colonies were observed on the experimental plates, whereas no
                visible colonies were detected on the uninoculated negative-control plate (Figure
                6.1.3).
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-03-ee44da00.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 6.1.3">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-03-ee44da00.avif" alt="Figure 6.1.3." loading="lazy" decoding="async" />
              </a>
              <figcaption className="figure-caption">
                <strong>Figure 6.1.3 |</strong> Colony selection results following transformation with the expression
                plasmids.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <h5 id="wetlab-delivery-05" data-toc="include" data-toc-depth="4">
        6.1.3 Fusion Protein Expression and Purification
      </h5>
      <section className="pair">
        <div className="columns">
          <div className="column experiment">
            <div className="column-label">
              Experiment
            </div>
            <div className="source-block">
              <p>
                We screened IPTG induction conditions by comparing target protein expression across
                IPTG concentrations, including 0.25 and 0.5 mM, with uninduced cultures as controls.
                Bacterial lysates were separated into soluble supernatant and pellet fractions and
                analyzed by SDS-PAGE and Western blotting. Expression and electrophoresis conditions
                were adjusted during optimization.
              </p>
              <p>
                Responsive and control fusion proteins were produced at a larger scale under the
                selected conditions and purified separately by Ni-NTA affinity chromatography.
                Lysate, flow-through, wash, and elution fractions were analyzed by SDS-PAGE.
                Fractions containing the target proteins were pooled and dialyzed, and protein
                concentrations were measured.
              </p>
            </div>
          </div>
          <div className="column results">
            <div className="column-label">
              Results
            </div>
            <div className="source-block">
              <p>
                Preliminary screening showed relatively prominent target protein bands at 0.25 and
                0.5 mM IPTG. In both groups induced with 0.25 mM IPTG, bands in the 15–25 kDa range
                were enriched in the elution fractions, consistent with the expected size range of
                the fusion proteins (Figure 6.1.4).
              </p>
              <p>
                One preparation of the responsive fusion protein had a measured concentration of
                0.43 mg/mL; the corresponding control preparation had a measured concentration of
                0.52 mg/mL.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-04-19d249d5.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 6.1.4">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-04-19d249d5.avif" alt="Figure 6.1.4." loading="lazy" decoding="async" />
              </a>
              <figcaption className="figure-caption">
                <strong>Figure 6.1.4 |</strong> Expression and Ni-NTA affinity purification of the MMP-responsive and
                control fusion proteins. (A) MMP-responsive fusion protein. (B) Scrambled-sequence
                control fusion protein. Red arrows indicate target protein bands at apparent
                molecular weights between 15 and 25 kDa, supporting the expression of both fusion
                proteins and their enrichment in the elution fractions.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <h5 id="wetlab-delivery-06" data-toc="include" data-toc-depth="4">
        6.1.4 TEV Protease Cleavage and Functional Peptide Release
      </h5>
      <h6 id="wetlab-delivery-1-4-1" data-toc="include" data-toc-depth="5">
        6.1.4.1 TEV Cleavage and Peptide Recovery
      </h6>
      <section className="pair">
        <div className="columns">
          <div className="column experiment">
            <div className="column-label">
              Experiment
            </div>
            <div className="source-block">
              <p>
                Purified responsive fusion protein was incubated with TEV protease at 30 °C. Samples
                were collected after 1, 2, and 4 h, alongside a control without TEV protease, and
                analyzed by SDS-PAGE.
              </p>
              <p>
                Following cleavage, subtractive nickel-affinity chromatography was used to separate
                the target peptide from His-tagged components. Recovered peptide samples were
                concentrated by lyophilization for downstream assays.
              </p>
            </div>
          </div>
          <div className="column results">
            <div className="column-label">
              Results
            </div>
            <div className="source-block">
              <p>
                Bands attributed to the released His/SUMO tag were observed in TEV-treated samples
                at 1, 2, and 4 h, with <strong>apparent molecular weights in the 15–25 kDa range and
                migration distinct from that of the uncleaved fusion protein</strong> (Figure 6.1.5). A band
                corresponding to the added TEV protease was observed at approximately 27 kDa.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-05-15449c38.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 6.1.5">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-05-15449c38.avif" alt="Figure 6.1.5." loading="lazy" decoding="async" />
              </a>
              <figcaption className="figure-caption">
                <strong>Figure 6.1.5 |</strong> TEV protease-mediated removal of the SUMO tag from the fusion protein in
                the experimental group. Red arrows indicate the released SUMO tag, which exhibits an
                apparent molecular weight of 15–25 kDa and migrates differently from the uncleaved
                fusion protein, supporting successful TEV-mediated cleavage. Yellow arrows indicate
                TEV protease, with a molecular weight of approximately 27 kDa.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <h6 id="wetlab-delivery-1-4-2" data-toc="include" data-toc-depth="5">
        6.1.4.2 Ligation Activity of the Functional Peptide
      </h6>
      <section className="pair">
        <div className="columns">
          <div className="column experiment">
            <div className="column-label">
              Experiment
            </div>
            <div className="source-block">
              <p>
                The published SnoopLigase system catalyzes covalent isopeptide-bond formation
                between DogTag and SnoopTagJr. This work established a basis for using SDS-PAGE
                mobility shifts to assess peptide ligation activity <sup className="article-citation">[23]</sup>.
              </p>
              <p>
                The recovered DogTag-containing peptide was mixed with GFP-SnoopTag and SnoopLigase
                and incubated at room temperature for 1 h. SnoopLigase-mediated ligation of
                SUMO-DogTag to GFP-SnoopTag served as a positive control, and a reaction without
                SnoopLigase served as a negative control. Reaction products were analyzed by
                SDS-PAGE.
              </p>
            </div>
          </div>
          <div className="column results">
            <div className="column-label">
              Results
            </div>
            <div className="source-block">
              <p>
                An additional band above the main GFP-SnoopTag band appeared in the peptide reaction
                containing SnoopLigase relative to the negative control (Figure 6.1.6). This
                mobility shift was <strong>consistent with the formation of a peptide–GFP-SnoopTag conjugate.</strong> SnoopLigase migrated to the 10–15 kDa range.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-06-78e26024.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 6.1.6">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-06-78e26024.avif" alt="Figure 6.1.6." loading="lazy" decoding="async" />
              </a>
              <figcaption className="figure-caption">
                <strong>Figure 6.1.6 |</strong> SnoopLigase-mediated ligation of the recovered peptide to GFP-SnoopTag.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <h4 id="wetlab-delivery-07" data-toc="include" data-toc-depth="3">
        6.2 Construction and Characterization of the Liposomal Delivery System
      </h4>
      <h5 id="wetlab-delivery-08" data-toc="include" data-toc-depth="4">
        6.2.1 Mitochondrial Isolation and Fraction Characterization
      </h5>
      <section className="pair">
        <div className="columns">
          <div className="column experiment">
            <div className="column-label">
              Experiment
            </div>
            <div className="source-block">
              <p>
                TOMM20 (Tom20) is a receptor of the mitochondrial outer-membrane protein import
                machinery <sup className="article-citation">[24]</sup>, whereas cytochrome c oxidase subunit IV (COX IV) is located in the
                inner mitochondrial membrane <sup className="article-citation">[25]</sup>. Their complementary localizations provided the
                rationale for assessing mitochondrial components from both membrane compartments.
              </p>
              <p>
                Mitochondria were isolated from cultured cells, with the starting cell number
                adjusted during preparation optimization. Whole-cell samples, cytosolic
                supernatants, and mitochondrial pellets were analyzed by Western blotting for TOMM20
                and COX IV to examine the presence and distribution of mitochondrial components
                across fractions. The isolated mitochondrial fraction was used for subsequent
                complex assembly.
              </p>
              <p>
                Marker detection was interpreted as evidence of mitochondrial components; organelle
                purity, membrane integrity, and respiratory function require distinct assessments
                <sup className="article-citation">[25]</sup>.
              </p>
            </div>
          </div>
          <div className="column results">
            <div className="column-label">
              Results
            </div>
            <div className="source-block">
              <p>
                TOMM20 and COX IV were both detected in the isolated pellet fraction (Figure 6.2.1),
                <strong>indicating the presence of mitochondrial components in the preparation.</strong>
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-07-ec62d720.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 6.2.1">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-07-ec62d720.avif" alt="Figure 6.2.1." loading="lazy" decoding="async" />
              </a>
              <figcaption className="figure-caption">
                <strong>Figure 6.2.1 |</strong> Western blot analysis of mitochondrial markers following mitochondrial
                isolation. (A) Detection of COX IV (approximately 17 kDa). (B) Detection of TOMM20
                (approximately 16 kDa). Arrows indicate the corresponding target protein bands. Both
                markers were detected in the input and pellet fractions, with weaker signals in the
                supernatant, supporting the recovery of mitochondrial components in the pellet.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <h5 id="wetlab-delivery-09" data-toc="include" data-toc-depth="4">
        6.2.2 Preparation of Functionalized Liposomes
      </h5>
      <section className="pair">
        <div className="columns">
          <div className="column experiment">
            <div className="column-label">
              Experiment
            </div>
            <div className="source-block">
              <p>
                DOTAP and DOPE were selected as cationic and fusogenic lipid components,
                respectively. A previous study used DOTAP/DOPE coatings to improve mitochondrial
                transfer, providing a rationale for investigating this lipid combination in our
                carrier system <sup className="article-citation">[26]</sup>. DSPE-PEG-Mal was included to provide maleimide groups for
                conjugation with Cys-containing peptides, based on established peptide–PEG–lipid
                coupling chemistry <sup className="article-citation">[27]</sup>.
              </p>
              <p>
                Functionalized liposomes were prepared using DOPE, DOTAP, and DSPE-PEG-Mal and
                subsequently co-incubated with isolated mitochondria for complex assembly.
              </p>
            </div>
          </div>
          <div className="column results">
            <div className="column-label">
              Results
            </div>
            <div className="source-block">
              <p>
                The prepared liposome suspension had a <strong>milky-white appearance</strong> (Figure 6.2.2).
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-08-10bd8ce4.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 6.2.2">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-08-10bd8ce4.avif" alt="Figure 6.2.2." loading="lazy" decoding="async" />
              </a>
              <figcaption className="figure-caption">
                <strong>Figure 6.2.2 |</strong> Appearance of the prepared functionalized liposome suspension.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <h5 id="wetlab-delivery-10" data-toc="include" data-toc-depth="4">
        6.2.3 Characterization of the Complexes
      </h5>
      <h6 id="wetlab-delivery-11" data-toc="include" data-toc-depth="5">
        6.2.3.1 Confocal Fluorescence Characterization
      </h6>
      <section className="pair">
        <div className="columns">
          <div className="column experiment">
            <div className="column-label">
              Experiment
            </div>
            <div className="source-block">
              <p>
                Liposomes and mitochondria were labeled with DiD and MitoTracker Green,
                respectively. Following co-incubation, samples were examined by confocal
                fluorescence microscopy. Red and green fluorescence channels were acquired alongside
                bright-field images to assess the spatial distribution of the two components.
              </p>
            </div>
          </div>
          <div className="column results">
            <div className="column-label">
              Results
            </div>
            <div className="source-block">
              <p>
                DiD-labeled liposomes exhibited red fluorescence, and MitoTracker Green-labeled
                mitochondria exhibited green fluorescence. The signals overlapped at multiple
                locations, appearing as yellow–orange regions in the merged image (Figure 6.2.3).
              </p>
              <p>
                These observations support a spatial association between liposomes and mitochondria, <strong>providing preliminary imaging evidence for the formation of liposome–mitochondria complexes during co-incubation.</strong>
                Whether this association involves membrane fusion requires further verification.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-09-94ca1cee.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 6.2.3">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-09-94ca1cee.avif" alt="Figure 6.2.3." loading="lazy" decoding="async" />
              </a>
              <figcaption className="figure-caption">
                <strong>Figure 6.2.3 |</strong> Fluorescence characterization of liposome–mitochondria complexes.
                Mitochondria and liposomes were labeled with MitoTracker Green (green) and DiD
                (red), respectively. Individual fluorescence channel images, a bright-field image
                (BF), and the merged image are shown.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <h6 id="wetlab-delivery-12" data-toc="include" data-toc-depth="5">
        6.2.3.2 Structural Characterization by Transmission Electron Microscopy
      </h6>
      <section className="pair">
        <div className="columns">
          <div className="column experiment">
            <div className="column-label">
              Experiment
            </div>
            <div className="source-block">
              <p>
                Functionalized liposomes, isolated mitochondria, and samples obtained after
                liposome–mitochondria co-incubation were examined by transmission electron
                microscopy. Morphology and membrane-like structures were compared across the three
                sample types.
              </p>
            </div>
          </div>
          <div className="column results">
            <div className="column-label">
              Results
            </div>
            <div className="source-block">
              <p>
                Vesicle-like structures with visible membrane outlines were observed in the liposome
                samples (Figure 6.2.4A). In the complex samples, peripheral membrane-like structures
                surrounded internal components (Figure 6.2.4C). <strong>This morphology was consistent with liposomal enclosure of mitochondrial material.</strong>
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-10-2e5d434b.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 6.2.4">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-10-2e5d434b.avif" alt="Figure 6.2.4." loading="lazy" decoding="async" />
              </a>
              <figcaption className="figure-caption">
                <strong>Figure 6.2.4 |</strong> Transmission electron microscopy characterization of
                liposome–mitochondria complexes. TEM images of (A) functionalized liposomes, (B)
                isolated mitochondria, and (C) liposome–mitochondria complexes. Scale bars: 200 nm
                in all panels.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <h5 id="wetlab-delivery-13" data-toc="include" data-toc-depth="4">
        6.2.4 Evaluation of Linker Peptide Conjugation to Liposomes
      </h5>
      <section className="pair">
        <div className="columns">
          <div className="column experiment">
            <div className="column-label">
              Experiment
            </div>
            <div className="source-block">
              <p>
                The conjugation strategy was based on thiol–maleimide coupling between a peptide
                cysteine residue and a maleimide-functionalized PEG–lipid <sup className="article-citation">[27]</sup>.
              </p>
              <p>
                The Cys-containing linker peptide was co-incubated with maleimide-functionalized
                liposomes, with liposomes lacking added peptide included as controls. Following
                incubation, ultrafiltration was used to separate unbound peptide from
                carrier-associated material. Colorimetric protein assays were used to evaluate
                peptide recovery and association with the liposomes.
              </p>
            </div>
          </div>
          <div className="column results">
            <div className="column-label">
              Results
            </div>
            <div className="source-block">
              <p>
                Ultrafiltration produced variable sample recovery and liposome loss, while the
                liposome formulation interfered with colorimetric protein detection. These effects
                prevented reliable distinction between free and carrier-associated peptide. Covalent
                conjugation could not be distinguished from nonspecific adsorption or losses during
                sample processing, and conjugation efficiency could not be reliably determined.
              </p>
            </div>
          </div>
        </div>
      </section>
      <h4 id="wetlab-delivery-14" data-toc="include" data-toc-depth="3">
        6.3 Functional Assessment
      </h4>
      <h5 id="wetlab-delivery-15" data-toc="include" data-toc-depth="4">
        6.3.1 SnoopLigase Mediated Ligation of Responsive and Control Proteins
      </h5>
      <section className="pair">
        <div className="columns">
          <div className="column experiment">
            <div className="column-label">
              Experiment
            </div>
            <div className="source-block">
              <p>
                Responsive MMP13-DogTag and scrambled Control-DogTag protein preparations were
                separately mixed with GFP-SnoopTag. Parallel reactions with and without SnoopLigase
                were analyzed by SDS-PAGE to compare ligation product formation between the two
                groups.
              </p>
            </div>
          </div>
          <div className="column results">
            <div className="column-label">
              Results
            </div>
            <div className="source-block">
              <p>
                A higher-molecular-weight band near 55 kDa was observed in both responsive and
                control reactions containing SnoopLigase (Figure 6.3.1). No distinct band at the
                same position was observed in the corresponding reactions without SnoopLigase. <strong>The enzyme-associated mobility shifts were consistent with formation of ligation products in both groups.</strong>
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-11-32417c50.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 6.3.1">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-11-32417c50.avif" alt="Figure 6.3.1." loading="lazy" decoding="async" />
              </a>
              <figcaption className="figure-caption">
                <strong>Figure 6.3.1 |</strong> Validation of SnoopLigase-mediated ligation using GFP-SnoopTag as a
                reporter protein.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <h5 id="wetlab-delivery-16" data-toc="include" data-toc-depth="4">
        6.3.2 MMP Responsive Cleavage of Reporter Conjugates
      </h5>
      <section className="pair">
        <div className="columns">
          <div className="column experiment">
            <div className="column-label">
              Experiment
            </div>
            <div className="source-block">
              <p>
                MMP-13 was selected as a disease-relevant enzyme because Mmp13-deficient mice show
                reduced osteoarthritic cartilage erosion <sup className="article-citation">[28]</sup>. This finding motivated evaluation of
                MMP-13 responsiveness in the linker design.
              </p>
              <p>
                Responsive peptide (Pep) and scrambled control peptide (Control) were separately
                ligated to GFP-SnoopTag to generate reporter substrates. The conjugates were treated
                with MMP-13 under matched treatment conditions. Samples were collected at 0, 2, 4,
                6, and 24 h and analyzed by SDS-PAGE to compare bands corresponding to intact
                conjugates and lower-molecular-weight species.
              </p>
            </div>
          </div>
          <div className="column results">
            <div className="column-label">
              Results
            </div>
            <div className="source-block">
              <p>
                At 2 h, the Control group retained a slower-migrating band near 35 kDa, assigned to
                the intact GFP–peptide conjugate, whereas the corresponding higher-molecular-weight
                band in the Pep group was weaker or not clearly detectable (Figure 6.3.2).
              </p>
              <p>
                <strong>The observed difference was consistent with cleavage of the responsive conjugate</strong>, but the available comparisons did not establish whether it arose from MMP-13
                activity or differences in the initial composition of the reporter substrates.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-12-e15a9f6d.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 6.3.2">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-12-e15a9f6d.avif" alt="Figure 6.3.2." loading="lazy" decoding="async" />
              </a>
              <figcaption className="figure-caption">
                <strong>Figure 6.3.2 |</strong> MMP-13 cleavage analysis of peptide–GFP-SnoopTag conjugates. Red arrows
                indicate higher-molecular-weight bands near 35 kDa in the Control samples,
                corresponding to uncleaved conjugates.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <h5 id="wetlab-delivery-17" data-toc="include" data-toc-depth="4">
        6.3.3 Cellular Localization of Delivered Mitochondrial Tracers
      </h5>
      <section className="pair">
        <div className="columns">
          <div className="column experiment">
            <div className="column-label">
              Experiment
            </div>
            <div className="source-block">
              <p>
                Isolated mitochondria were labeled with MitoTracker Green and co-incubated with
                liposomes. The resulting complexes were added to recipient cell cultures. Hoechst
                33342 and cell membrane staining provided nuclear and cellular reference points for
                multichannel confocal imaging, alongside bright-field images. The distribution of
                mitochondria-associated green fluorescence was compared between complex-treated
                cells and control cells.
              </p>
            </div>
          </div>
          <div className="column results">
            <div className="column-label">
              Results
            </div>
            <div className="source-block">
              <p>
                Green fluorescence was observed within the cell outlines and in perinuclear regions
                of complex-treated cells (Figure 6.3.3A). No distinct corresponding green
                fluorescence was observed in the control group (Figure 3.3.1B). <strong>These images showed cell-associated localization of the mitochondrial tracer. They did not establish the intracellular integrity or function of the delivered mitochondria.</strong>
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-13-9fae80ae.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 6.3.3">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-13-9fae80ae.avif" alt="Figure 6.3.3." loading="lazy" decoding="async" />
              </a>
              <figcaption className="figure-caption">
                <strong>Figure 6.3.3 |</strong> Fluorescence assessment of cellular delivery by liposome–mitochondria
                complexes. (A) Cells treated with liposome–mitochondria complexes. (B) Control
                cells.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <h5 id="wetlab-delivery-18" data-toc="include" data-toc-depth="4">
        6.3.4 In Vitro Cytocompatibility of the Functional Peptide
      </h5>
      <section className="pair">
        <div className="columns">
          <div className="column experiment">
            <div className="column-label">
              Experiment
            </div>
            <div className="source-block">
              <p>
                Reduction of WST-8 produces a water-soluble formazan signal and has been established
                as a colorimetric indicator of cell viability <sup className="article-citation">[29]</sup>. The assay was used here as a
                preliminary measure of peptide cytocompatibility.
              </p>
              <p>
                Cells were treated with 5 or 10 µM functional peptide for 24, 48, or 72 h. A CCK-8
                assay was used to assess relative cell viability, with control, blank, and
                peptide-treated groups included in the experimental design (Figure 6.3.4A).
              </p>
            </div>
          </div>
          <div className="column results">
            <div className="column-label">
              Results
            </div>
            <div className="source-block">
              <p>
                At 24 h, relative cell viability was approximately 70% in the 5 µM group and 55% in
                the 10 µM group. At 48 h, the values were approximately 85%–90% in both groups and
                were approximately 85%–95% at 72 h (Figure 6.3.4B). At both concentrations, the
                measured values were lower at 24 h than at the later time points.
              </p>
              <p>
                The relatively high cell viability observed at 48 and 72 h provides preliminary
                evidence of limited cytotoxicity of the functional peptide at these later time
                points under the tested conditions, <strong>supporting its potential cytocompatibility</strong>. However, the reduced
                viability at 24 h indicates that early cellular responses require further evaluation
                before conclusions about overall cytocompatibility can be drawn.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-14-6c94c3ad.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 6.3.4">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/04/delivery-v2-14-6c94c3ad.avif" alt="Figure 6.3.4." loading="lazy" decoding="async" />
              </a>
              <figcaption className="figure-caption">
                <strong>Figure 6.3.4 |</strong> Preliminary assessment of functional peptide cytocompatibility using the
                CCK-8 assay. (A) Photograph of the assay plate. Yellow, blue, and red boxes indicate
                control, blank, and peptide-treated wells, respectively. (B) Relative cell viability
                following treatment with 5 or 10 μM experimental peptide for 24, 48, and 72 h.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
