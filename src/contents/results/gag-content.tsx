import { TableCaption } from "../../components/FigureCaption";
import { FigureCaption } from "../../components/FigureCaption";
import { ContentMath } from "./ContentMath";

const gagMath = [
  { latex: "i" },
  { latex: "d_i<0" },
  { latex: String.raw`H_0:\mu_d=0;\ H_1:\mu_d<0` },
  { latex: String.raw`\mu_d` },
  { latex: String.raw`t=\frac{\bar d}{s_d/\sqrt{n}}` },
  { latex: String.raw`\bar d` },
  { latex: "s_d" },
  { latex: "n=3" },
  { latex: String.raw`\mathrm{df}=n-1=2` },
  { latex: String.raw`p=P(T_{\mathrm{df}}\leq t)` },
  { latex: String.raw`p_{(1)}=0.0053,\ p_{(2)}=0.0314` },
  {
    latex: String.raw`p'_{(1)}=(m-1+1)\times0.0053=0.0106`,
    display: true,
  },
  {
    latex: String.raw`p'_{(2)}=\max\left(p'_{(1)},(m-2+1)\times0.0314\right)=0.0314`,
    display: true,
  },
] as const;

export function GagContent() {
  return (
    <>
      <h3 id="wetlab-gag-overview" data-toc="include" data-toc-depth="2">
        5 GAG Retention Module
      </h3>
      <h4 id="wetlab-gag-introduction" data-toc="include" data-toc-depth="3">
        Overview
      </h4>
      <div className="source-block">
        <p>
          To validate the molecular basis of our GAG Retention Module, we established a complete
          experimental workflow spanning plasmid construction, recombinant protein preparation, tag
          removal, and functional validation. The overall strategy was to first obtain a purified
          recombinant protein that could be used in subsequent experiments while retaining the CPC
          functional module, and then directly evaluate whether the protein could interact with
          glycosaminoglycans (GAGs), particularly chondroitin sulfate A (CS-A).
        </p>
        <p>
          Therefore, we constructed the <strong>His-SUMO-AviTag-TEVsite-linker-DogTag-CPC</strong> expression system and used <em>Escherichia coli</em> for
          recombinant protein production. Following expression and purification of the fusion
          protein by His-tag affinity chromatography, ultrafiltration was used to concentrate the
          protein and exchange the buffer. The SUMO domain was subsequently removed from the fusion
          protein using ULP1, followed by reverse purification using the His tag and another round
          of ultrafiltration to obtain a CPC-containing protein preparation suitable for subsequent
          functional validation.
        </p>
        <p>
          The processed protein was then evaluated for GAG interaction from two complementary
          perspectives. First, changes in CS-A electrophoretic mobility were analyzed to
          qualitatively or semi-quantitatively evaluate protein–GAG interaction. Subsequently, the
          retained AviTag was used for BirA-mediated enzymatic biotinylation, allowing the protein
          to be immobilized on streptavidin magnetic beads, followed by DMMB-based analysis of its
          ability to capture soluble CS-A. In this way, we could first validate the molecular
          function of the protein-level functional module before introducing it into the final SELP
          hydrogel.
        </p>
      </div>
      <h4 id="wetlab-gag-preparation" data-toc="include" data-toc-depth="3">
        5.1 Preparation of CPC Recombinant Proteins
      </h4>
      <div className="source-block">
        <p>
          To support subsequent validation of ligation activity and glycosaminoglycan (GAG) capture,
          we first prepared recombinant proteins containing the cationic peptide carrier (CPC). This
          section describes the design of the expression plasmids, establishment and optimization of
          the CPC recombinant-protein expression system, His-tag affinity purification and
          concentration, and SUMO-tag removal followed by reverse purification.
        </p>
      </div>
      <div className="pair" data-layout-row="gag-1">
        <div className="columns">
          <div className="column">
            <div className="column-label">
              Experiment
            </div>
            <h5 id="wetlab-gag-1-1" data-toc="include" data-toc-depth="4">
              5.1.1 Plasmid Construction
            </h5>
            <div className="source-block">
              <p>
                The GAG Retention Module required a recombinant protein that could be stably
                expressed while remaining compatible with downstream functional validation.
                Therefore, we adopted a modular fusion protein design: the His tag was used for
                protein purification, SUMO was used to facilitate recombinant protein expression and
                processing, the AviTag was used for subsequent BirA-mediated enzymatic
                biotinylation, the DogTag-containing region was used for modular conjugation, and
                the CPC sequence served as the core GAG-interacting domain.
              </p>
            </div>
            <h5 id="wetlab-gag-1-2" data-toc="include" data-toc-depth="4">
              5.1.2 Recombinant Protein Production and Optimization of Induction Conditions
            </h5>
            <div className="source-block">
              <p>
                After plasmid construction, the recombinant expression plasmid was confirmed and the
                correct construct was introduced into <em>E. coli</em> BL21(DE3). Expression samples were
                then analyzed to evaluate the production of the target fusion protein and its
                solubility distribution, and the established expression conditions were used for
                subsequent large-scale protein preparation.
              </p>
            </div>
            <h5 id="wetlab-gag-1-3" data-toc="include" data-toc-depth="4">
              5.1.3 His-Tag Affinity Purification and Concentration
            </h5>
            <div className="source-block">
              <p>
                The obtained <strong>His-SUMO-AviTag-TEVsite-linker-DogTag-CPC</strong> fusion protein was further purified by His-tag affinity
                chromatography. By comparing the distribution of the target protein among different
                purification fractions, we confirmed the recovery of the recombinant protein and
                obtained the target protein fractions for subsequent processing. This established
                the upstream experimental workflow from <strong>plasmid construction → recombinant protein production → purified fusion protein</strong>.
              </p>
            </div>
          </div>
          <div className="column">
            <div className="column-label">
              Results
            </div>
            <h5 id="wetlab-gag-1-1" data-toc="include" data-toc-depth="4">
              5.1.1 Design of Expression Plasmids
            </h5>
            <div className="source-block">
              <p>
                Using the pET-28a(+) backbone, we designed three expression plasmids:
                pET-28a(+)-CPC, pET-28a(+)-LinkN, and pET-28a(+)-CPC+LinkN, with full lengths of
                5,827 bp, 5,815 bp, and 5,887 bp, respectively (Table 5.1.1 and Figure 5.1.1). All
                three constructs used the same expression framework, containing a T7 promoter, lac
                operator, and kanamycin (Kan) resistance gene. From the N-terminus to the
                C-terminus, each target fusion protein contained a 6×His tag, SUMO fusion tag, TEV
                cleavage site, linker, CPC and/or Link-N sequence, AviTag, and DogTag. In the
                CPC+LinkN construct, CPC and Link-N were connected by a linker.
              </p>
              <p>
                The three constructs differed only in their inserted sequences (Table 5.1.1): the
                CPC construct contained the CPC sequence; the Link-N construct contained Link-N and
                served as a CPC-free control; and the CPC+LinkN construct contained both CPC and
                Link-N, allowing us to assess whether Link-N fusion affected CPC-mediated GAG
                interactions.
              </p>
            </div>
            <div className="table-scroll">
              <table>
                <TableCaption as="caption">
                  Table 5.1.1. Full lengths and insert sequences of the three expression plasmids.
                </TableCaption>
                <thead>
                  <tr>
                    <th scope="col">
                      Plasmid
                    </th>
                    <th scope="col">
                      Full length (bp)
                    </th>
                    <th scope="col">
                      Insert
                    </th>
                    <th scope="col">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      pET-28a(+)-CPC
                    </td>
                    <td>
                      5827
                    </td>
                    <td>
                      CPC
                    </td>
                    <td>
                      CPC-containing experimental group
                    </td>
                  </tr>
                  <tr>
                    <td>
                      pET-28a(+)-LinkN
                    </td>
                    <td>
                      5815
                    </td>
                    <td>
                      Link-N
                    </td>
                    <td>
                      Control lacking CPC
                    </td>
                  </tr>
                  <tr>
                    <td>
                      pET-28a(+)-CPC+LinkN
                    </td>
                    <td>
                      5887
                    </td>
                    <td>
                      CPC and Link-N (connected by a linker)
                    </td>
                    <td>
                      To assess whether Link-N fusion affects CPC-mediated GAG interactions
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/03/01.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 5.1.1">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/03/01.avif" alt="Figure 5.1.1." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 5.1.1 |</strong> Maps of the three expression plasmids. From left to right:
                pET-28a(+)-CPC+LinkN, pET-28a(+)-LinkN, and pET-28a(+)-CPC. The maps indicate the T7
                promoter, lac operator, KanR, origin of replication (ori), and components of the
                target fusion proteins, including the His tag, TEV cleavage site, linker, CPC,
                AviTag, and DogTag.
              </FigureCaption>
            </figure>
            <h5 id="wetlab-gag-1-2" data-toc="include" data-toc-depth="4">
              5.1.2 Expression of CPC Recombinant Proteins and Optimization of Induction Conditions
            </h5>
            <div className="source-block">
              <p>
                The synthesized plasmids were transformed into <em>E. coli</em> BL21(DE3) for protein
                expression. Colonies were obtained on Kan-containing plates for the transformed
                constructs (Figure 5.1.2), whereas no colonies grew on the control (CK) plate
                without plasmid transformation.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/03/02-new.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 5.1.2">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/03/02-new.avif" alt="Figure 5.1.2." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 5.1.2 |</strong> Colonies after transformation of <em>E. coli</em> BL21(DE3) with
                pET-28a(+)-CPC, pET-28a(+)-LinkN, and pET-28a(+)-CPC+LinkN. All plates contained
                Kan. Upper left: negative control without plasmid transformation (CK); upper right:
                CPC; lower left: LinkN; lower right: CPC+LinkN.
              </FigureCaption>
            </figure>
            <div className="source-block">
              <p>
                We then performed small-scale induction screening of the CPC expression system in
                <em>E. coli</em> BL21(DE3). The initial construct contained a repetitive CPC sequence
                designed in-house. We compared different IPTG concentrations, induction
                temperatures, and induction durations. After colony PCR validation, transformants
                were induced with 0.1–1.0 mM IPTG at 16 °C for 16 h or at 30 °C for 6 h. Additional
                conditions included 37 °C for 4 h and induction at 30 °C for 9 h or 16 h. Repeated
                SDS-PAGE analyses of the supernatant and pellet fractions revealed no clear induced
                bands at the expected positions; target bands were weak or diffuse, and background
                bands were also present in some uninduced samples. Consistent with these
                observations, His-tag affinity purification of both small- and large-scale cultures
                failed to enrich a clearly identifiable target protein: proteins were visible in the
                lysate and flow-through, but the eluate contained no band or only a very weak one
                (see Notebook). Thus, expanding the range of induction conditions alone did not
                resolve the expression bottleneck.
              </p>
              <p>
                We therefore redesigned the CPC coding sequence using the literature-reported
                CPC+14A sequence, RRRR(AARRR)₃R, and performed codon optimization for <em>E. coli</em>
                while reducing sequence repetitiveness at the DNA level. The redesigned expression
                system yielded detectable CPC-containing recombinant proteins: SDS-PAGE showed
                identifiable target bands (Figure 5.1.3A), although some basal expression remained.
                The final induction condition was 30 °C with 0.5 mM IPTG for 16 h. SDS-PAGE after
                affinity purification showed enrichment of the target protein in the eluate (Figure
                5.1.3B). Western blotting detected Link-N, CPC, and CPC–Link-N at the expected
                molecular-weight positions (Figure 5.1.3C), confirming successful expression of the
                target proteins. A weaker band was also visible in the uninduced control, indicating
                a degree of leaky expression.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/03/03.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 5.1.3">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/03/03.avif" alt="Figure 5.1.3." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 5.1.3 |</strong> Establishment and optimization of the CPC recombinant-protein expression
                system. (A) SDS-PAGE analysis of small-scale screening of CPC, LinkN, and CPC+LinkN
                recombinant-protein expression in <em>E. coli</em> BL21(DE3) under different induction
                conditions. Temperatures were 16 °C and 30 °C, and IPTG concentrations were 0.25 mM
                and 0.5 mM. Red arrows indicate the expected target bands after codon optimization
                and sequence redesign. (B) SDS-PAGE analysis of fractions from recombinant-protein
                affinity purification (uninduced, uninduced control; eluate, elution fraction;
                lysate, cell lysate; flow-through, flow-through fraction). The red box indicates
                target-protein enrichment in the eluate. (C) Western blot validation of the purified
                recombinant proteins. Molecular-weight markers are labeled at 25 and 35 kDa.
              </FigureCaption>
            </figure>
            <h5 id="wetlab-gag-1-3" data-toc="include" data-toc-depth="4">
              5.1.3 His-Tag Affinity Purification and Concentration
            </h5>
            <div className="source-block">
              <p>
                We compared the lysate, flow-through, wash, and elution fractions of CPC, Link-N,
                and CPC–Link-N by SDS-PAGE (Figure 5.1.4). The target band was strongest in the
                Link-N eluate and weaker in the CPC-containing constructs, indicating substantial
                differences in the final recovery among constructs.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/03/04.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 5.1.4">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/03/04.avif" alt="Figure 5.1.4." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 5.1.4 |</strong> SDS-PAGE analysis of His-tag affinity purification and target-protein
                recovery from different constructs. Large-scale CPC, LinkN, and CPC+LinkN
                recombinant proteins were purified by His-tag affinity chromatography. Fractions are
                shown in the following order for each construct: lysate, flow-through, wash, and
                eluates (Eluates 1, 3, and 5; the LinkN group includes Eluates 1 and 3). Uninduced:
                uninduced control. Molecular-weight markers on both sides are labeled at 25 and 35
                kDa.
              </FigureCaption>
            </figure>
            <div className="source-block">
              <p>
                After His-tag affinity elution, the samples were concentrated and buffer-exchanged
                using 0.5-mL centrifugal ultrafiltration units with a 5-kDa molecular-weight cutoff.
                Protein concentrations were then measured by the BCA assay (standard curve R² =
                0.9977; Figure 5.1.5a). The concentration of SUMO–Link-N was 17.51 mg/mL, whereas
                those of SUMO–CPC and SUMO–CPC–Link-N were only 0.43 mg/mL and 0.26 mg/mL,
                respectively (Figures 1.3.2b and 1.3.2c). The concentrations of the CPC-containing
                constructs were more than tenfold lower than that of the Link-N construct,
                suggesting that introduction of the CPC sequence substantially reduced
                recombinant-protein expression or recovery.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/03/05.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 5.1.5">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/03/05.avif" alt="Figure 5.1.5." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 5.1.5 |</strong> Concentration and BCA quantification of SUMO fusion proteins. His-tag
                affinity eluates were concentrated and buffer-exchanged using 0.5-mL centrifugal
                ultrafiltration units with a 5-kDa cutoff, followed by BCA protein quantification.
                (a) BCA standard curve based on raw absorbance: y = 0.833238x + 0.145746, R² =
                0.997705. (b) Concentrations of the SUMO fusion proteins: SUMO–Link-N, 17.51 mg/mL;
                SUMO–CPC, 0.43 mg/mL; and SUMO–CPC–Link-N, 0.26 mg/mL. Dots indicate replicate
                measurements, and error bars show the range of variation. (c) Color development in
                the 96-well plate for the BCA assay and corresponding absorbance readings. The first
                six columns contain BSA standards (0–0.5 mg/mL), and the next three columns contain
                sample wells; the Link-N sample wells show the strongest color.
              </FigureCaption>
            </figure>
          </div>
        </div>
      </div>
      <div className="pair" data-layout-row="gag-2">
        <div className="columns">
          <div className="column">
            <div className="column-label">
              Experiment
            </div>
            <h5 id="wetlab-gag-1-4" data-toc="include" data-toc-depth="4">
              5.1.4 Protein Concentration and SUMO Removal
            </h5>
            <div className="source-block">
              <p>
                After affinity purification, the recombinant protein was subjected to centrifugal
                ultrafiltration. This step was used to increase the protein concentration while
                simultaneously performing buffer exchange, thereby transferring the protein into
                conditions suitable for subsequent enzymatic cleavage.
              </p>
              <p>
                The fusion protein was then treated with ULP1 to remove the SUMO domain. This step
                was performed because the downstream functional experiments focused on the actual
                CPC-containing functional construct rather than the complete expression fusion
                protein. At the same time, the AviTag was retained, allowing the processed protein
                to undergo BirA-mediated biotinylation and subsequent immobilization on streptavidin
                magnetic beads.
              </p>
              <p>
                After SUMO cleavage, the sample was further analyzed to confirm tag removal and was
                subjected to another round of ultrafiltration to complete protein concentration and
                buffer exchange. After ULP1 cleavage, the final functional protein is <strong>AviTag-TEVsite-linker-DogTag-CPC</strong>.
              </p>
            </div>
          </div>
          <div className="column">
            <div className="column-label">
              Results
            </div>
            <h5 id="wetlab-gag-1-4" data-toc="include" data-toc-depth="4">
              5.1.4 SUMO-Tag Removal and Reverse Purification
            </h5>
            <div className="source-block">
              <p>
                Cleavage products were clearly visible by SDS-PAGE (Figure 5.1.6a), indicating that
                SUMO removal occurred; however, cleavage was incomplete, and some uncleaved protein
                remained. BCA quantification yielded concentrations of 0.30 mg/mL for Link-N, 0.21
                mg/mL for CPC, and 0.19 mg/mL for CPC–Link-N (Figures 1.4.1b–d).
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/03/06.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 5.1.6">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/03/06.avif" alt="Figure 5.1.6." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 5.1.6 |</strong> Validation of SUMO-tag removal, reverse purification, and target-protein
                recovery. The SUMO tags were cleaved from purified fusion proteins using ULP1
                protease. Reverse His-tag purification was then used to remove ULP1 and other
                His-tagged components, followed by ultrafiltration, concentration, and buffer
                exchange. (a) SDS-PAGE comparison of each construct (LinkN, CPC, and CPC+LinkN)
                before cleavage and after ULP1 cleavage. Molecular-weight markers are labeled at 15,
                25, and 35 kDa. (b) BCA standard curve after blank correction with the intercept
                constrained to zero: y = 1.429212x, R² = 0.966585. (c) Concentrations of the final
                recovered proteins: LinkN, 0.30 mg/mL; CPC, 0.21 mg/mL; and CPC–LinkN, 0.19 mg/mL.
                Dots indicate replicate measurements, and error bars show the range of variation.
                (d) Color development in the 96-well plate for the BCA assay and corresponding
                absorbance readings. The first six columns contain BSA standards, and the remaining
                wells contain purified protein samples.
              </FigureCaption>
            </figure>
            <div className="source-block">
              <p>
                In a separate BCA measurement, protein concentrations after reverse affinity
                purification, ultrafiltration, concentration, and buffer exchange were 1.42 mg/mL
                for Link-N, 0.14 mg/mL for CPC, and 0.69 mg/mL for CPC–Link-N (Figure 5.1.7). This
                workflow yielded further-processed proteins but introduced additional handling steps
                and was accompanied by some protein loss.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/03/07.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 5.1.7">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/03/07.avif" alt="Figure 5.1.7." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 5.1.7 |</strong> Recovery and BCA quantification of target proteins after reverse
                affinity purification and ultrafiltration. Following SUMO cleavage, reverse affinity
                purification was performed to remove ULP1 and other His-tagged components, followed
                by ultrafiltration, concentration, and buffer exchange. (a) BCA standard curve based
                on raw absorbance: y = 1.008667x + 0.159000, R² = 0.995301. (b) Concentrations of
                the final recovered proteins: Link-N, 1.42 mg/mL; CPC, 0.14 mg/mL; and CPC–Link-N,
                0.69 mg/mL. Dots indicate replicate measurements, and error bars show the range of
                variation. (c) Color development in the 96-well plate for the BCA assay and
                corresponding raw absorbance readings. The first six columns contain BSA standards,
                followed by purified protein samples.
              </FigureCaption>
            </figure>
          </div>
        </div>
      </div>
      <h4 id="wetlab-gag-validation" data-toc="include" data-toc-depth="3">
        5.2 Validation of Ligation Activity and GAG-Binding Capability
      </h4>
      <div className="source-block">
        <p>
          After obtaining purified proteins, we first validated DogTag-mediated ligation activity.
          We then evaluated interactions between CPC-containing recombinant proteins and sulfated
          GAGs using a chondroitin sulfate A (CS-A) agarose electrophoretic mobility assay and an
          AviTag-based bead-immobilization assay with DMMB detection.
        </p>
      </div>
      <div className="pair" data-layout-row="gag-3">
        <div className="columns">
          <div className="column">
            <div className="column-label">
              Experiment
            </div>
            <h5 id="wetlab-gag-2-1" data-toc="include" data-toc-depth="4">
              5.2.1 Conjugation Activity Validation
            </h5>
            <div className="source-block">
              <p>
                Because the target CPC peptide is relatively small and therefore difficult to detect
                directly by electrophoresis, we introduced a GFP-SnoopTag reporter protein to
                examine whether the recovered CPC peptide retained DogTag-mediated conjugation
                activity. The CPC peptide and control peptide were subjected to conjugation
                reactions in parallel, with corresponding reactions lacking SnoopLigase included as
                controls.
              </p>
              <p>
                After addition of the ligase, higher-molecular-weight bands corresponding to the
                conjugation products were observed, supporting the retention of DogTag-mediated
                conjugation activity by the CPC peptide. This model reaction also provided a readily
                detectable basis for validating the site-specific conjugation of CPC to the SELP
                scaffold in subsequent experiments. The assay validates the protein conjugation step
                and does not directly demonstrate successful anchoring of CPC within the SELP
                hydrogel.
              </p>
            </div>
          </div>
          <div className="column">
            <div className="column-label">
              Results
            </div>
            <h5 id="wetlab-gag-2-1" data-toc="include" data-toc-depth="4">
              5.2.1 Validation of DogTag-Mediated Ligation Activity
            </h5>
            <div className="source-block">
              <p>
                After SnoopLigase2 was added, higher-molecular-weight bands consistent with
                SnoopTag2-GFP ligation products were observed at 55–70 kDa in lanes 1, 3, and 5 (red
                box in Figure 5.2.1). These bands disappeared or were markedly weaker in the
                corresponding ligase-free controls (lanes 2, 4, and 6). A ligation-product band was
                also observed at approximately 55 kDa in lane 7 (SUMO–DogTag control). These results
                support the conclusion that the recovered constructs retained DogTag-mediated
                ligation activity and could undergo specific ligation with SnoopTag2-GFP.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/03/08.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 5.2.1">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/03/08.avif" alt="Figure 5.2.1." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 5.2.1 |</strong> Validation of DogTag-mediated ligation activity by SDS-PAGE using the
                SnoopTag2-GFP reporter system. The table below the gel lists the protein components
                added to each lane (1–8), where “+” indicates presence and “−” indicates absence.
                The red box marks the ligation-product bands in the 55–70 kDa region.
                Molecular-weight markers are shown on the left and labeled from 15 to 70 kDa.
              </FigureCaption>
            </figure>
          </div>
        </div>
      </div>
      <div className="pair" data-layout-row="gag-4">
        <div className="columns">
          <div className="column">
            <div className="column-label">
              Experiment
            </div>
            <h5 id="wetlab-gag-2-2" data-toc="include" data-toc-depth="4">
              5.2.2 CS-A Electrophoretic Mobility Analysis
            </h5>
            <div className="source-block">
              <p>
                We first examined whether the recombinant protein could interact with CS-A. CS-A is
                an important sulfated GAG in the cartilage extracellular matrix, while CPC is
                enriched in positively charged amino acids. We therefore expected that interaction
                between CPC and negatively charged CS-A would alter the migration behavior of CS-A
                in the electrophoresis system.
              </p>
              <p>
                Before conducting the protein–GAG experiments, CS-A was first analyzed independently
                to confirm that a detectable GAG signal could be obtained under the established
                electrophoresis and staining conditions. The migration of CS-A was then compared
                under different protein conditions, with particular attention to whether increasing
                protein levels caused reduced migration distance, broader bands, or increased
                retention near the loading wells. This provided a direct molecular-level evaluation
                of the interaction between the recombinant protein and sulfated GAGs.
              </p>
              <p>
                This experiment was primarily used as a binding screen. Because CS-A is a
                heterogeneous and polydisperse polymer, changes in electrophoretic mobility are
                suitable for determining whether an interaction occurs and assessing its relative
                changes.
              </p>
              <p>
                This experiment therefore primarily addressed the first key question of the
                GAG Retention Module:
              </p>
              <p>
                <strong>Can the engineered CPC-containing recombinant protein still directly interact with sulfated GAGs at the molecular level?</strong>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="column-label">
              Results
            </div>
            <h5 id="wetlab-gag-2-2" data-toc="include" data-toc-depth="4">
              5.2.2 Establishment and Optimization of the CS-A Agarose Electrophoretic Mobility
              Assay
            </h5>
            <div className="source-block">
              <p>
                To directly assess interactions between CPC-containing recombinant proteins and
                sulfated GAGs, we first established a CS-A agarose electrophoretic mobility shift
                assay (EMSA). CS-A alone and CS-A mixed with 0.5, 1, 2.5, 5, or 10 µM SUMO–CPC,
                SUMO–CPC–Link-N, or SUMO–Link-N were analyzed by agarose gel electrophoresis (16
                lanes in total), followed by toluidine blue staining. The initial electrophoresis
                duration was approximately 50 min, with bromophenol blue as the tracking dye. CS-A
                migrated substantially faster than bromophenol blue and had migrated too far by the
                end of the 50-min run for reliable comparison. Although CS-A was clearly visible,
                none of the proteins—including the CPC-free SUMO–Link-N control—caused an obvious
                change in migration distance, band width, or retention near the loading wells (see
                Notebook). These results indicated that the initial electrophoresis duration was
                unsuitable for the current CS-A detection system.
              </p>
              <p>
                To rule out problems with the detection system itself, we analyzed CS-A alone at
                different loading amounts (1, 2, 5, and 10 µg). The CS-A-only controls produced
                clear, detectable GAG bands, and band intensity increased with loading amount
                (Figure 5.2.2), demonstrating that the current agarose electrophoresis and toluidine
                blue staining system could detect CS-A. The electrophoresis duration was therefore
                shortened to approximately 30–40 min.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/03/09.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 5.2.2">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/03/09.avif" alt="Figure 5.2.2." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 5.2.2 |</strong> Establishment and optimization of the CS-A agarose electrophoretic
                mobility assay. Different amounts of CS-A (1, 2, 5, and 10 µg) were electrophoresed
                individually on an agarose gel and stained with toluidine blue.
              </FigureCaption>
            </figure>
            <div className="source-block">
              <p>
                After the electrophoresis duration was optimized, CS-A consistently appeared in a
                more suitable region of the gel for analysis. However, when different concentrations
                of CPC-containing fusion proteins were mixed with CS-A and analyzed again, no clear
                concentration-dependent mobility shift was observed. In other words, the system
                reliably detected CS-A, but adding the proteins did not produce a sufficiently clear
                migration change. Thus, the CS-A detection system was successfully established and
                optimized, but no clear positive CPC–CS-A readout was obtained through a mobility
                shift. This result does not directly demonstrate that CPC lacks GAG-binding
                activity, because migration may also be affected by molecular size, charge,
                conformation, and the state of the protein samples.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pair" data-layout-row="gag-5">
        <div className="columns">
          <div className="column">
            <div className="column-label">
              Experiment
            </div>
            <h5 id="wetlab-gag-2-3" data-toc="include" data-toc-depth="4">
              5.2.3 AviTag-Mediated GAG Capture Assay
            </h5>
            <div className="source-block">
              <p>
                To complement the electrophoretic mobility assay, we established a second functional
                validation approach based on protein immobilization and GAG quantification.
              </p>
              <p>
                Following ULP1 treatment, the recombinant protein retained the AviTag and was
                therefore first subjected to site-specific biotinylation using BirA. After
                biotinylation, free biotin was removed by desalting, and the protein concentration
                was re-measured by BCA. Biotinylation efficiency was verified by streptavidin gel
                shift or streptavidin-HRP Western blotting. The protein was then immobilized on
                streptavidin magnetic beads through the biotin–streptavidin interaction, thereby
                establishing an immobilized protein–GAG interaction system.
              </p>
              <p>
                The immobilized protein was subsequently incubated with CS-A. After magnetic
                separation, the supernatant was collected and the remaining soluble CS-A was
                quantified using the DMMB assay.
              </p>
              <p>
                Unlike the electrophoretic mobility assay, this experiment focused on whether
                <strong>immobilized protein could reduce the amount of CS-A remaining in solution</strong>. Naked magnetic bead controls and input controls were included to
                distinguish protein-dependent GAG capture from nonspecific adsorption by the
                magnetic beads and to determine the total amount of GAG at the beginning of the
                reaction.
              </p>
              <p>
                Therefore, the primary readout of this experiment was the relative capture
                efficiency of CS-A by the immobilized protein.
              </p>
            </div>
          </div>
          <div className="column">
            <div className="column-label">
              Results
            </div>
            <h5 id="wetlab-gag-2-3" data-toc="include" data-toc-depth="4">
              5.2.3 CS-A Capture Assay Using an AviTag-Based Immobilization System
            </h5>
            <h6 id="wetlab-gag-2-3-1" data-toc="include" data-toc-depth="5">
              5.2.3.1 Site-Specific Biotinylation of AviTag
            </h6>
            <div className="source-block">
              <p>
                Biotinylation was assessed by SDS-PAGE, using non-biotinylated protein as the
                control (Figure 5.2.3). After incubation of non-biotinylated Link-N with SA, a free
                Link-N band was visible at approximately 15 kDa (red arrow). In contrast, this band
                disappeared or was markedly weaker when biotinylated Link-N, CPC, or CPC–Link-N was
                incubated with SA, while higher-molecular-weight bands associated with SA-containing
                complexes appeared near 70 kDa (red box). These observations suggest successful
                biotinylation and indicate that the resulting proteins could bind to streptavidin
                magnetic beads, establishing a basis for the subsequent protein–GAG interaction
                assay.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/03/10.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 5.2.3">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/03/10.avif" alt="Figure 5.2.3." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 5.2.3 |</strong> Validation of AviTag-mediated site-specific biotinylation by SDS-PAGE.
                LinkN, CPC, and CPC–LinkN recombinant proteins containing AviTag were
                site-specifically biotinylated using BirA ligase. The biotinylated proteins and a
                non-biotinylated control were then incubated with free streptavidin (SA) for 30 min.
                Molecular-weight markers on the left are labeled from 15 to 70 kDa. From left to
                right, the lanes contain: non-biotinylated LinkN + SA (control), biotinylated LinkN
                + SA, biotinylated CPC + SA, and biotinylated CPC–LinkN + SA. The red arrow
                indicates the free LinkN band, and the red box indicates the higher-molecular-weight
                bands associated with SA-containing complexes.
              </FigureCaption>
            </figure>
            <h6 id="wetlab-gag-2-3-2" data-toc="include" data-toc-depth="5">
              5.2.3.2 Bead Immobilization and DMMB-Based Detection of CS-A Capture
            </h6>
            <div className="source-block">
              <p>
                The experimental groups included bare beads (CK), the CPC-free Link-N protein
                control (L), CPC-containing protein (C), and CPC–Link-N (L+C). An Input CS-A sample
                without beads was also included to assess the initial substrate amount. These
                conditions were intended to examine background adsorption, the contribution of the
                protein components, and the starting substrate level, respectively. The assay
                response was calculated as the recorded OD525−OD600, and concentrations were derived
                using a common CS-A standard curve (y = 0.01309x + 0.04845, R² = 0.8888), followed
                by correction for the fourfold dilution. The original group labels CK, L, C, and L+C
                were retained. A decrease relative to CK is not, by itself, equivalent to capture
                efficiency corrected for bare-bead background.
              </p>
              <p>
                The estimated CS-A concentrations in the supernatants, summarized across three
                replicate measurements, are shown in Figure 5.2.4a. In all three corresponding
                readings, the values for C and L+C were lower than CK, whereas the L group did not
                show a consistent downward trend. This pattern was consistent with the expectation
                that CPC-containing treatments would reduce the amount of CS-A remaining in the
                supernatant.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/03/11.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 5.2.4">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/03/11.avif" alt="Figure 5.2.4." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 5.2.4 |</strong> CS-A capture assay using the AviTag-based immobilization system,
                measured by the DMMB assay. Site-specifically biotinylated proteins were immobilized
                on streptavidin magnetic beads and incubated with CS-A. After magnetic separation,
                the supernatant was collected for DMMB detection. CK: bare beads; L: CPC-free LinkN
                protein control; C: CPC; L+C: CPC–LinkN. Data were calculated as OD525−OD600,
                converted to concentrations using a common CS-A standard curve, and adjusted for the
                fourfold dilution. (a) Raw CS-A concentration measurements in the supernatants of
                each group (R1–R3; three replicates; µg/mL). (b) Color development in the 96-well
                plate for the DMMB assay; the red boxes mark the standard-curve region and the
                biotinylated-sample region. (c) Raw data for the GAG standard curve (0–40 µg/mL),
                including replicate readings, mean ± standard deviation, and replicate number (n) at
                each concentration. (d) Fitted GAG standard curve: y = 0.01309x + 0.04845, R² =
                0.8888.
              </FigureCaption>
            </figure>
            <h6 id="wetlab-gag-2-3-3" data-toc="include" data-toc-depth="5">
              5.2.3.3 Statistical Analysis of the Reduction in Supernatant CS-A Associated with CPC
              and CPC–Link-N
            </h6>
            <div className="source-block">
              <p>
                To avoid drawing mechanistic conclusions directly from visual observations, we
                specified statistical hypotheses and applied multiple-comparison correction. This
                analysis assessed whether the reduction in supernatant CS-A was supported by
                statistical evidence and defined the scope of the conclusions that could be drawn.
              </p>
              <p>
                CPC was compared with CK, and CPC–Link-N was compared with CK. Because each of the
                three treatment measurements corresponded one-to-one with a CK measurement, paired
                t-tests were used. For CPC versus CK, the difference for the <ContentMath formulas={gagMath} index={0} />th pair was
                defined as:
              </p>
              <p>
                If CPC captures more CS-A, the amount of residual CS-A in the supernatant after
                treatment should decrease; that is, we expect <ContentMath formulas={gagMath} index={1} />. Accordingly, the hypotheses
                for the prespecified one-sided test were: <ContentMath formulas={gagMath} index={2} />. Here, <ContentMath formulas={gagMath} index={3} /> denotes the
                population mean difference between the treatment group and the CK control. The same
                hypotheses were used to compare CPC–Link-N with CK.
              </p>
              <p>
                The paired t-statistic is defined as: <ContentMath formulas={gagMath} index={4} /> where <ContentMath formulas={gagMath} index={5} /> and <ContentMath formulas={gagMath} index={6} /> denote
                the mean and standard deviation of the paired differences, respectively. The number
                of pairs was <ContentMath formulas={gagMath} index={7} />, giving <ContentMath formulas={gagMath} index={8} />; the one-sided p-value was calculated as
                <ContentMath formulas={gagMath} index={9} />.
              </p>
              <p>
                The mean paired differences for CPC versus CK and CPC–Link-N versus CK were −39.73
                µg/mL and −26.49 µg/mL, respectively. The raw p-values from the one-sided paired
                t-tests were 0.0314 and 0.0053, respectively (Figure 5.2.5). When the two
                prespecified comparisons were tested together, the Holm method was used to correct
                for multiple comparisons. The raw p-values, ranked from smallest to largest, were
                <ContentMath formulas={gagMath} index={10} />, with the number of comparisons m = 2. The adjusted p-values were
                calculated as: <ContentMath formulas={gagMath} index={11} /> and <ContentMath formulas={gagMath} index={12} />
              </p>
              <p>
                After adjustment, the p-value for CPC–Link-N versus CK was 0.0106, and that for CPC
                versus CK was 0.0314. At a significance level of α = 0.05, both adjusted p-values
                were below 0.05; therefore, the null hypotheses that the mean differences between
                each treatment and CK were zero could be rejected.
              </p>
              <p>
                In summary, the amount of residual CS-A in the supernatant was lower after treatment
                with both CPC and CPC–Link-N than in CK. Under the current dataset and analysis
                method, the results support an association between immobilized CPC or CPC–Link-N and
                reduced supernatant CS-A, in a direction consistent with the expected CPC-mediated
                GAG capture. However, because all measurements came from a single experiment (n =
                3), this analysis should be considered exploratory.
              </p>
            </div>
            <figure className="figure-block">
              <a className="figure-link" href="https://static.igem.wiki/teams/6102/wiki/images/result/03/12.avif" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: Figure 5.2.5">
                <img src="https://static.igem.wiki/teams/6102/wiki/images/result/03/12.avif" alt="Figure 5.2.5." loading="lazy" decoding="async" />
              </a>
              <FigureCaption className="figure-caption">
                <strong>Figure 5.2.5 |</strong> Statistical analysis of the reduction in residual supernatant CS-A
                associated with CPC and CPC–Link-N (paired t-test). One-sided paired t-tests were
                performed on residual supernatant CS-A concentrations measured by DMMB (n = 3) to
                compare CPC and CPC–Link-N treatment groups with CK. The p-values for the two
                prespecified comparisons were adjusted using the Holm method (α = 0.05). Mean paired
                difference = treatment group − corresponding CK; a negative value indicates lower
                residual GAG than in CK.
              </FigureCaption>
            </figure>
          </div>
        </div>
      </div>
      <h4 id="wetlab-gag-binding-design" data-toc="include" data-toc-depth="3">
        From Molecular Binding to the GAG-Retention Design
      </h4>
      <div className="source-block">
        <p>
          The two experimental approaches validated the same molecular basis from different
          perspectives.
        </p>
        <p>
          The CS-A electrophoretic mobility assay examined <strong>whether the CPC-containing protein altered the migration behavior of CS-A</strong>, whereas the streptavidin
          magnetic bead–DMMB assay further examined <strong>whether the immobilized protein could capture CS-A from solution</strong>.
        </p>
        <p>
          Together, the two assays established a stepwise validation chain:
        </p>
        <p>
          <strong>Plasmid construction → recombinant CPC protein production → purification and SUMO removal → protein–GAG interaction → GAG capture.</strong>
        </p>
      </div>
      <h4 id="wetlab-gag-selp-system" data-toc="include" data-toc-depth="3">
        Relationship to the Final SELP System
      </h4>
      <div className="source-block">
        <p>
          The experiments described above represent the <strong>molecular validation of the GAG Retention Module</strong>. Their purpose was to determine
          whether the engineered CPC-containing protein retained the GAG interaction expected from
          the design.
        </p>
        <p>
          Therefore, the current protein-level experiments first validate <strong>the molecular basis of CPC–GAG interaction</strong>, whereas
          whether CPC immobilized within the SELP hydrogel can truly reduce GAG loss represents a
          further <strong>material-level validation</strong> that requires direct evaluation through GAG retention/loss experiments
          in the hydrogel.
        </p>
        <p>
          Through this approach, we progressively advanced the experimental logic from the smallest
          functional unit to the final biomaterial system:
        </p>
        <p>
          <strong>engineered plasmid → recombinant protein → protein processing → molecular GAG interaction → GAG capture → hydrogel-level GAG retention.</strong>
        </p>
      </div>
    </>
  );
}
