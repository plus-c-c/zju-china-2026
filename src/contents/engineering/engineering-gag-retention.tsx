import { DbtlFigure } from "./Figure";
import type { DbtlModule } from "./dbtl";

export const gagRetentionModule: DbtlModule = {
  title: "GAG retention module",
  intro: (
    <>
      <p>
        We developed the GAG retention module through iterative
        Design&ndash;Build&ndash;Test&ndash;Learn (DBTL) cycles, focusing on
        both protein engineering and functional-assay engineering. Rather than
        treating recombinant-protein expression, tag removal, and functional
        validation as isolated experiments, we used bottlenecks identified at
        each stage to guide revisions to the CPC coding sequence, fusion-protein
        processing strategy, or GAG detection method.
      </p>
      <p>
        The overall workflow was to obtain an expressible CPC-containing
        protein, optimize protein processing and module ligation, establish a
        CS-A assay, quantify GAG capture, and ultimately assess GAG retention in
        SELP hydrogels. The first four steps constituted the main work in this
        stage. Our current evidence supports GAG capture at the protein level;
        it does not yet demonstrate that integrating CPC into the SELP network
        reduces GAG loss from the hydrogel.
      </p>
      <p>
        During development, we identified two related challenges. The first
        involved the molecular design and processing of the recombinant protein,
        including the CPC coding sequence, expression system, and SUMO-removal
        strategy. The second concerned the reliability and interpretability of
        downstream functional assays, including the CS-A electrophoretic
        mobility assay and the AviTag-mediated GAG capture assay.
      </p>
      <p>
        Accordingly, our engineering workflow comprised two interconnected DBTL
        tracks: protein engineering and assay engineering.
      </p>
    </>
  ),
  cycles: [
    {
      title:
        "Cycle 1 — CPC sequence design, expression optimization, and protein production",
      content: {
        Design: (
          <>
            <p>
              The initial CPC design used five self-designed, repetitive RAAA
              units. Although this sequence encoded the intended arginine-rich
              peptide at the amino-acid level, the initial codon optimization
              prioritized host codon preference without sufficiently reducing
              DNA-sequence repetition across the repeated units. Repetitive
              coding sequences may introduce additional challenges during gene
              synthesis, amplification, plasmid maintenance, or recombinant
              expression. After the initial expression attempt failed, we
              therefore reconsidered sequence repetitiveness as a design factor.
              However, the available data do not establish DNA repetitiveness as
              the sole cause of the expression failure.
            </p>
            <p>
              The second-generation design used the literature-reported CPC+14A
              sequence, RRRR(AARRR)₃R. This 20-amino-acid peptide has a net
              charge of +14, and its interactions with cartilage-associated
              sulfated GAGs, including chondroitin sulfate, have been
              characterized previously. It therefore had a clearer literature
              basis than our initial repetitive design
              <sup>
                <a href="#ref-gag-1">[3]</a>
              </sup>
              . We retained the intended cationic properties while re-optimizing
              the codons for <em>E. coli</em> and reducing unnecessary
              repetition at the DNA level.
            </p>
          </>
        ),
        Build: (
          <p>
            The initial CPC plasmid was transformed into <em>E. coli</em>{" "}
            BL21(DE3), followed by small-scale expression screening. We compared
            different IPTG concentrations, induction temperatures, and induction
            durations.
          </p>
        ),
        Test: (
          <>
            <p>
              The initial construct did not produce a clear, reproducible
              induced band at the expected molecular weight. The target band was
              weak or difficult to distinguish, and background bands were also
              present in some uninduced samples. Consistent with the expression
              screen, affinity purification did not efficiently enrich the
              target protein: proteins were visible in the lysate and
              flow-through, whereas the eluate contained only a very weak band
              or no clearly identifiable target band. Expanding the range of
              induction conditions alone did not resolve the expression
              bottleneck.
            </p>
            <p>
              After sequence redesign, the target band of the CPC-containing
              protein became detectable by SDS-PAGE, indicating that the system
              had progressed from producing little detectable product to
              yielding the target protein. Western blotting also detected
              Link-N, CPC, and CPC&ndash;Link-N constructs at the expected
              molecular weights. A prominent band in one uninduced sample
              suggested possible basal expression. Based on the overall results,
              subsequent expression used 0.5 mM IPTG at 30 °C for 16 h, followed
              by His-tag affinity purification.
            </p>
            <DbtlFigure
              src="result/03/03.avif"
              caption="Figure 1.1.1 | Establishment and optimization of CPC recombinant-protein expression. (A) SDS-PAGE screening across induction conditions; red arrows indicate the expected target bands after sequence redesign and codon optimization. (B) SDS-PAGE of affinity-purification fractions; red boxes indicate target-protein enrichment in the eluates. (C) Western blot detection of Link-N, CPC, and CPC–Link-N at the expected molecular weights. A band in an uninduced sample suggests basal expression."
            />
          </>
        ),
        Learn: (
          <p>
            CPC optimization progressed from screening expression conditions
            alone to jointly optimizing sequence design and expression strategy,
            establishing a starting point for protein purification and
            functional validation. However, the bands observed in uninduced
            samples indicate that basal expression should be monitored because
            it may affect protein production.
          </p>
        ),
      },
    },
    {
      title: "Cycle 2 — Optimization of the SUMO-removal strategy",
      content: {
        Design: (
          <p>
            After obtaining detectable fusion protein, we used ULP1 protease to
            remove the SUMO tag, aiming to reduce potential interference from
            the expression-associated fusion partner in downstream functional
            assays while retaining AviTag for subsequent biotinylation and bead
            immobilization. The planned workflow included His-tag affinity
            purification, ultrafiltration and buffer exchange, ULP1 cleavage,
            reverse affinity purification to remove ULP1 and other His-tagged
            components, and a further ultrafiltration step to prepare protein
            for functional assays.
          </p>
        ),
        Build: (
          <p>
            ULP1 cleavage was first evaluated at small scale and then performed
            at a larger scale. Cleavage products were examined by SDS-PAGE.
            Reverse His-tag affinity purification was then used to remove ULP1
            and other His-tagged components, followed by ultrafiltration, buffer
            exchange, and BCA protein quantification. This workflow connected
            protein processing directly to downstream functional testing, but
            also introduced additional steps that required control.
          </p>
        ),
        Test: (
          <>
            <p>
              SDS-PAGE showed new bands consistent with ULP1 cleavage, with a
              clearer cleavage product for the Link-N construct. However,
              uncleaved protein remained, indicating that SUMO removal occurred
              but was incomplete. After the first scale-up, the recovered
              protein concentrations were approximately 0.30 mg/mL for Link-N
              and 0.2 mg/mL for both CPC and CPC&ndash;Link-N.
            </p>
            <DbtlFigure
              src="result/03/06.avif"
              caption="Figure 1.2.1 | Validation of SUMO removal, reverse purification, and protein recovery. (A) SDS-PAGE of Link-N, CPC, and CPC–Link-N before and after ULP1 cleavage; residual uncleaved fusion protein remained. (B) Blank-corrected BCA standard curve (y = 1.429212x, R² = 0.966585). (C) Final concentrations after reverse purification and concentration: Link-N, 0.30 mg/mL; CPC, 0.21 mg/mL; CPC–Link-N, 0.19 mg/mL. (D) Representative colorimetric readout from the BCA assay."
            />
            <p>
              Incomplete cleavage was not the only limitation. Reverse
              purification, ultrafiltration, and buffer exchange increased
              workflow complexity and caused some protein loss; final recovery
              also differed substantially among constructs. Given the cost of
              ULP1 and the cleavage performance observed, simply increasing the
              amount of ULP1 was not an ideal long-term optimization strategy.
            </p>
          </>
        ),
        Learn: (
          <p>
            We therefore redesigned the cleavage architecture by moving the TEV
            protease recognition site immediately downstream of SUMO, with the
            aim of removing the N-terminal expression-associated region more
            directly while retaining AviTag&ndash;linker&ndash;DogTag&ndash;CPC.
            This was a proposed design improvement, not a validated outcome.
            Because of time and sample constraints, we did not re-express the
            redesigned construct or test TEV cleavage; instead, we used the
            available proteins for subsequent functional assays. Whether the new
            architecture improves cleavage efficiency, protein recovery, and
            reproducibility remains to be determined experimentally.
          </p>
        ),
      },
    },
    {
      title:
        "Cycle 1 — Establishment and optimization of the CS-A electrophoretic mobility assay",
      content: {
        Design: (
          <p>
            To test whether CPC-containing proteins interact with sulfated GAGs,
            we first established an agarose-gel electrophoretic mobility assay.
            The rationale was that interaction between positively charged CPC
            and negatively charged CS-A might alter CS-A migration, resulting in
            a shorter migration distance, broader bands, or retention near the
            wells. Because CS-A is a heterogeneous, polydisperse polysaccharide,
            this method was intended primarily for qualitative or
            semi-quantitative screening.
          </p>
        ),
        Build: (
          <>
            <p>
              In the initial experiment, CS-A was run alone or mixed with 0.5,
              1, 2.5, 5, or 10 &micro;M SUMO&ndash;CPC,
              SUMO&ndash;CPC&ndash;Link-N, or SUMO&ndash;Link-N, for a total of
              16 lanes. Electrophoresis was initially run for approximately 50
              min, using bromophenol blue as a tracking dye, followed by
              toluidine blue staining. CS-A migrated substantially faster than
              bromophenol blue and had travelled too far by the end of the
              50-min run, making comparisons difficult. The initial
              electrophoresis conditions were therefore unsuitable for this
              assay.
            </p>
            <p>
              To determine whether the problem lay in the electrophoresis
              parameters rather than an inability to detect CS-A, we first
              tested different CS-A loading amounts on their own. The CS-A-only
              controls produced clear bands, and band width varied across
              loading amounts. These results showed that agarose electrophoresis
              combined with toluidine blue staining could detect CS-A, although
              the CS-A samples themselves showed some band heterogeneity. We
              therefore shortened the run to approximately 30&ndash;40 min and
              repeated the comparison between CS-A alone and protein&ndash;CS-A
              mixtures at different protein concentrations.
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              After the run time was shortened, CS-A consistently appeared in a
              more suitable region of the gel, resolving the excessive-migration
              problem. However, under the optimized 30&ndash;40 min conditions,
              we still observed no clear protein-concentration-dependent change
              in migration distance or band width, nor any retention near the
              wells. Thus, the assay reliably visualized CS-A but did not
              provide a clear positive CPC&ndash;CS-A readout based on a
              mobility shift.
            </p>
            <DbtlFigure
              src="result/03/09.avif"
              caption="Figure 2.1.1 | Establishment and optimization of the CS-A agarose electrophoretic mobility assay. CS-A alone (1, 2, 5, and 10 µg) was separated by agarose-gel electrophoresis and stained with toluidine blue, confirming that the assay could detect CS-A bands."
            />
          </>
        ),
        Learn: (
          <p>
            The absence of a clear mobility shift does not directly demonstrate
            that CPC lacks GAG-interacting activity. Migration depends on
            molecular size, charge, and conformation, and the state of the
            protein preparation may also affect the readout—for example,
            residual tags, incomplete cleavage, protein aggregation, or limited
            exposure of the CPC functional region. Similar experiments in the
            literature commonly use chemically synthesized short peptides, which
            are expected to have high purity
            <sup>
              <a href="#ref-gag-2">[4]</a>
            </sup>
            . These explanations remain possibilities and were not tested
            individually in our system. Because this assay requires the
            interaction to produce a visible migration change, we moved to a
            quantitative capture method that does not depend on electrophoretic
            mobility.
          </p>
        ),
      },
    },
    {
      title: "Cycle 2 — AviTag-mediated GAG capture and DMMB quantification",
      content: {
        Design: (
          <>
            <p>
              The electrophoretic assay provided an indirect readout of
              protein&ndash;GAG interaction by asking whether binding produced a
              visible change in migration. To obtain a more direct functional
              readout, we developed a GAG capture assay based on bead
              immobilization and DMMB quantification. If immobilized protein
              captures CS-A, the amount of free CS-A remaining in the
              supernatant after incubation and magnetic separation should
              decrease as the amount of protein increases.
            </p>
            <p>
              The workflow was: AviTag-containing protein → BirA-mediated
              biotinylation → desalting → immobilization on streptavidin
              magnetic beads → incubation with CS-A → magnetic separation → DMMB
              quantification.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              We performed BirA-mediated site-specific biotinylation of the
              available AviTag fusion proteins, followed by desalting to remove
              residual free biotin and other small molecules that could
              interfere with subsequent streptavidin immobilization. The
              biotinylated proteins were then bound to streptavidin magnetic
              beads, incubated with CS-A, and magnetically separated to collect
              the supernatant. Link-N, CPC, and CPC&ndash;Link-N constructs were
              processed through the biotinylation and bead-incubation workflow
              and compared with the CK control.
            </p>
            <p>
              An early attempt to assess biotinylation directly by SDS-PAGE
              using streptavidin was inconclusive because desalting was
              insufficient. Desalting was therefore included as a necessary step
              before bead immobilization in the subsequent workflow. An unclear
              early readout could not, by itself, be taken as evidence that
              biotinylation had failed.
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              After magnetic separation, we measured residual soluble CS-A in
              the supernatant using the DMMB assay. Protein-functionalized
              beads, naked beads, and an input control were included to
              distinguish protein-associated capture from nonspecific adsorption
              to the beads. Across the recorded measurements, the residual
              free-GAG concentration in the supernatant tended to decrease as
              more CPC-containing fusion protein was added. Unlike the
              electrophoretic mobility assay, this method did not rely on visual
              inspection for a CS-A band shift; instead, it provided a clearer
              functional readout through quantitative changes in residual GAG in
              solution.
            </p>
            <DbtlFigure
              src="result/03/10.avif"
              caption="Figure 1.4.1 | Validation of AviTag-mediated site-specific biotinylation by SDS-PAGE. AviTag-tagged Link-N, CPC, and CPC–Link-N were biotinylated with BirA and incubated with streptavidin (SA). The unbiotinylated Link-N control retained a free band at approximately 15 kDa (red arrow), whereas biotinylated samples showed reduced free Link-N and higher-molecular-weight complexes near 70 kDa (red boxes)."
            />
            <p>
              The recorded p values were 0.0314 for CPC versus the CK control
              and 0.0053 for CPC&ndash;Link-N versus the CK control; both
              comparisons were recorded as statistically significant. These
              results support GAG capture by CPC-containing recombinant proteins
              under the conditions of this molecular-level protein&ndash;CS-A
              bead assay. They should not be interpreted as proof of GAG
              retention in the hydrogel material.
            </p>
            <DbtlFigure
              src="result/03/11.avif"
              caption="Figure 2.2.2 | Statistical analysis of the reduction in residual supernatant CS-A associated with CPC and CPC–Link-N (paired t-test). One-sided paired t-tests were performed on residual supernatant CS-A concentrations measured by DMMB (n = 3) to compare CPC and CPC–Link-N treatment groups with CK. The p-values for the two prespecified comparisons were adjusted using the Holm method (α = 0.05). Mean paired difference = treatment group − corresponding CK; a negative value indicates lower residual GAG than in CK."
            />
          </>
        ),
        Learn: (
          <p>
            This cycle also helped us reinterpret the electrophoresis results.
            The two methods measure different outcomes: electrophoresis asks
            whether an interaction causes an observable migration change,
            whereas the bead-capture assay measures whether immobilized protein
            reduces the amount of free GAG in the supernatant. The absence of a
            clear mobility shift therefore does not directly conflict with the
            concentration-dependent capture trend measured in the bead assay.
            For the current CPC&ndash;CS-A system, bead immobilization combined
            with DMMB quantification provided clearer functional evidence.
          </p>
        ),
      },
    },
  ],
  infos: [
    {
      afterCycle: 0,
      title: "Engineering goal",
      content: (
        <>
          <p>
            Our initial goal was to obtain a CPC-containing recombinant protein
            that could be expressed in <em>E. coli</em>, efficiently purified,
            and, when necessary, processed to remove expression-associated
            elements. The protein would then be used to assess interactions with
            glycosaminoglycans (GAGs), particularly chondroitin sulfate A
            (CS-A).
          </p>
          <p>
            The fusion protein contains several functional modules. The His tag
            enables affinity purification; SUMO serves as an
            expression-associated fusion partner; AviTag enables subsequent
            BirA-mediated site-specific biotinylation; and DogTag supports our
            modular assembly strategy. CPC is the core GAG-interacting domain.
          </p>
          <p>
            The fusion-protein architecture also evolved during these
            engineering iterations.
          </p>
          <p>The first-generation fusion-protein architecture was:</p>
          <p>
            <code>
              His&ndash;SUMO&ndash;AviTag&ndash;TEVsite&ndash;linker&ndash;DogTag&ndash;CPC
            </code>
          </p>
          <p>
            After ULP1-mediated SUMO removal proved inefficient, we revised the
            cleavage architecture:
          </p>
          <p>
            <code>
              His&ndash;SUMO&ndash;TEVsite&ndash;AviTag&ndash;linker&ndash;DogTag&ndash;CPC
            </code>
          </p>
          <p>
            The engineering effort therefore expanded from sequence design to
            protein expression, protein processing, functional-assay
            development, and ultimately material-level validation of GAG
            retention.
          </p>
        </>
      ),
    },
    { afterCycle: 0, title: "Protein expression" },
    { afterCycle: 2, title: "Functional validation" },
    {
      afterCycle: 2,
      title: "DogTag ligation-interface validation",
      content: (
        <>
          <p>
            In parallel, we used a GFP&ndash;SnoopTag reporter system to test
            whether DogTag in the CPC constructs retained ligation activity.
            Because the CPC peptide is small, its ligation activity is difficult
            to assess directly by conventional SDS-PAGE. We therefore used a
            detectable GFP reporter and compared reactions with and without
            SnoopLigase2. A higher-molecular-weight band consistent with the
            ligation product appeared when the ligase was added, whereas the
            no-ligase controls did not show the same band pattern. These results
            support detectable DogTag-mediated ligation activity in the
            recovered CPC-related constructs, but do not establish that CPC had
            been integrated into SELP.
          </p>
          <DbtlFigure
            src="result/03/08.avif"
            caption="Figure 2 | Validation of DogTag-mediated ligation activity by SDS-PAGE using the SnoopTag2-GFP reporter system. The table below the gel lists the protein components added to each lane (1–8), where “+” indicates presence and “−” indicates absence. The red box marks the ligation-product bands in the 55–70 kDa region. Molecular-weight markers are shown on the left and labeled from 15 to 70 kDa."
          />
        </>
      ),
    },
  ],
  outro: (
    <>
      <p>
        Taken together, the results support three conclusions: (1) sequence
        redesign enabled production of detectable CPC-containing recombinant
        protein; (2) the available constructs retained detectable
        DogTag-mediated ligation activity; and (3) the bead&ndash;DMMB method
        provided molecular-level evidence of GAG capture by CPC-related
        constructs. However, ULP1-mediated SUMO removal remained incomplete and
        protein recovery was limited; the redesigned TEV cleavage site has not
        yet been validated; and the optimized CS-A electrophoretic mobility
        assay did not yield a clear positive mobility-shift readout.
      </p>
      <p>
        Link-N has not yet been directly evaluated for cartilage-related
        biological activity using cell-based assays, tissue assays, or hydrogel
        culture. Protein-level GAG capture does not establish a cartilage-repair
        effect for Link-N, nor is it equivalent to GAG retention within a
        hydrogel. The next steps are to validate the redesigned cleavage
        architecture, evaluate how CPC is integrated into the SELP network, and
        directly measure GAG retention and loss in SELP materials to determine
        whether the protein-level capture observed here translates into
        material-level retention.
      </p>
    </>
  ),
};
