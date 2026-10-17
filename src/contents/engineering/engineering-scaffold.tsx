import { DbtlFigure } from "./Figure";
import type { DbtlModule } from "./dbtl";

export const scaffoldModule: DbtlModule = {
  title: "Hydrogel scaffold",
  cycles: [
    {
      title:
        "Cycle 1 — Material selection: from chemically crosslinked hydrogels to an “encodable” SELP",
      content: {
        Design: (
          <>
            <p>
              The selection of a material for cartilage repair cannot be based
              on intuition. Although hydrogels match the requirements in terms
              of properties, the choice of the material from which the construct
              is ultimately assembled demands careful consideration. We
              therefore began by translating the clinical requirements into
              comparable engineering metrics. Through a literature survey, we
              identified three major obstacles faced by cartilage-repair
              materials: the mechanical contradiction (high compressive modulus
              versus high water content and low friction), the interfacial
              challenge (long-term adhesion in a wet, dynamic environment) and
              the structural discrepancy (the difficulty of replicating the
              anisotropic zoning of native cartilage). Accordingly, we proposed
              five criteria that an ideal material should satisfy
              simultaneously: adequate mechanical performance, firm interfacial
              adhesion, good biocompatibility, a feasible production process and
              programmability of function.
            </p>
            <p>
              Using these five criteria as our frame of reference, we listed a
              set of parallel candidate solutions for evaluation:
            </p>
            <p>
              <strong>
                Table 1.1.1. Comparison of candidate materials for cartilage
                repair and the main reasons for their exclusion.
              </strong>
            </p>
            <div className="table-responsive mb-4">
              <table
                className="table table-bordered align-middle"
                aria-label="Table 1.1.1: Comparison of candidate materials for cartilage repair"
              >
                <thead>
                  <tr>
                    <th>Candidate material</th>
                    <th>Advantages</th>
                    <th>Main reason for exclusion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Chemically synthesized hydrogels (PEG, HA derivatives,
                      etc.)
                    </td>
                    <td>
                      Tunable mechanical properties; mature fabrication
                      processes
                    </td>
                    <td>
                      Require multi-component formulation and chemical
                      crosslinking, resulting in large batch-to-batch variation;
                      crosslinkers and residual monomers are cytotoxic, making
                      safe in situ gelation difficult; functional expansion
                      relies on chemical modification
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Naturally derived materials (collagen, gelatin,
                      decellularized matrix, etc.)
                    </td>
                    <td>Good biocompatibility</td>
                    <td>
                      Insufficient mechanical strength; inconsistent
                      batch-to-batch sourcing; not programmable and difficult to
                      scale up
                    </td>
                  </tr>
                  <tr>
                    <td>Recombinant collagen</td>
                    <td>Can be produced biosynthetically</td>
                    <td>
                      The triple-helix structure depends on specific sequences
                      and post-translational modifications, leaving limited room
                      for mechanical tuning; downstream purification relies on
                      chromatography
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>SELP (silk&ndash;elastin-like protein)</strong>
                    </td>
                    <td>
                      Encoded by a single gene; the silk domain provides
                      strength and the elastin domain provides toughness; the
                      repeat number itself is the mechanical parameter; the
                      inverse temperature transition enables chromatography-free
                      purification; variable sites in the elastin domain allow
                      the introduction of photocrosslinking, adhesive and
                      cell-adhesive functions
                    </td>
                    <td>—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ),
        Build: (
          <p>
            We constructed a three-dimensional evaluation matrix of
            &ldquo;literature evidence + experimental feasibility + clinical
            accessibility&rdquo; and actively stepped out of the laboratory: we
            conducted structured interviews with orthopaedic clinicians, experts
            in biomaterials and patients, asking each of them about their
            expectations for an ideal repair material (property requirements,
            intraoperative handling window, degradation matching, cost
            sensitivity, and so on).
          </p>
        ),
        Test: (
          <>
            <p>
              The conclusions of the interviews and of the literature assessment
              were highly consistent: what clinicians care about most is not
              &ldquo;how strong a material can be made&rdquo;, but
              &ldquo;whether it can be set in situ within a few minutes during
              surgery, whether batches are consistent, and whether its functions
              can later be adjusted on demand&rdquo;. These are precisely the
              requirements that conventional chemically crosslinked hydrogel
              systems find hardest to meet and that SELP satisfies
              intrinsically:
            </p>
            <ol>
              <li>
                SELP is translated and synthesized directly by cells, so a
                single protein species is obtained and batch-to-batch
                reproducibility is high;
              </li>
              <li>
                The material properties can be tuned directly by changing the
                composition of the repeat sequence, without redesigning a new
                material;
              </li>
              <li>
                Inserting bases at the corresponding positions of the gene adds
                functional residues or short peptide tags to the protein chain.
              </li>
            </ol>
          </>
        ),
        Learn: (
          <>
            <p>
              We ultimately selected SELP as the scaffold material of NEST and
              thereby established the top-level architecture of the entire
              project:{" "}
              <strong>&ldquo;one scaffold + extensible modules&rdquo;</strong>,
              in which the scaffold provides the fundamental properties such as
              mechanics, adhesion and second-scale gelation, while functions are
              mounted as standardized modules. This architecture remained
              unchanged throughout all subsequent cycles and became the premise
              that makes the whole platform &ldquo;programmable&rdquo;.
            </p>
            {/* Draft figure note: candidate-material evaluation matrix and expert interview highlights or exchange photos */}
          </>
        ),
      },
    },
    {
      title:
        "Cycle 2 — Scaffold protein purification: systematic exploration of ITC conditions",
      content: {
        Design: (
          <>
            <p>
              SELP contains an elastin domain and therefore exhibits an inverse
              temperature transition: at elevated temperature the protein
              denatures, aggregates and precipitates, and it redissolves upon
              cooling. On this basis we decided to abandon conventional
              chromatography and to purify the protein by{" "}
              <strong>ITC (inverse transition cycling)</strong>, obtaining a
              highly pure product using only temperature cycling and
              centrifugation.
            </p>
            <p>
              The question we set out to answer was:{" "}
              <strong>
                what values of the two key ITC parameters, temperature and salt
                concentration, minimize protein loss while maintaining purity?
              </strong>
            </p>
          </>
        ),
        Build: (
          <p>
            We transformed pET19b-2KY5 into BL21(DE3). After colony PCR had
            confirmed that the insert was of the correct size and sequencing had
            confirmed its sequence, expression was induced with 1 mM IPTG for 6
            h, and the supernatant obtained by sonication was used as the
            starting material for ITC.
          </p>
        ),
        Test: (
          <>
            <p>
              The initial ITC procedure (conventional PBS, relatively high
              temperature) lost a considerable amount of protein during the
              high-temperature phase-transition step, and a prominent target
              band was present in H-Sup. (the supernatant after heating),
              indicating that much of the target protein was discarded before it
              could precipitate. To identify the cause, we carried out a matrix
              gradient experiment over heating temperature (65 °C / 80 °C) ×
              buffer salt concentration (0.5 / 1 / 2 M NaCl), comparing H-Sup.
              and C-Sup. (the supernatant after cooling) by SDS-PAGE for each
              condition:
            </p>
            <ul>
              <li>
                The more intense the band in the supernatant after heating, the
                more protein was not recovered during purification;
              </li>
              <li>
                The more intense the band in the supernatant after cooling, the
                higher the purification yield.
              </li>
            </ul>
            <p>
              The results showed that raising the temperature only marginally
              improved the yield, whereas the salt concentration was the more
              influential factor, with the 2 M NaCl buffer giving the highest
              purification yield.
            </p>
            <DbtlFigure
              src={["result/01/05.avif", "result/01/06.avif"]}
              caption="Figure 1.2.1. Systematic optimization of the ITC purification conditions. (A) SDS–PAGE analysis of the temperature × salt-concentration gradient screen. (B) SDS–PAGE verification of the complete ITC workflow under the optimized conditions (65 °C in PBS containing 2 M NaCl), together with the resulting lyophilized protein product. H-Sup., supernatant after heating; C-Sup., supernatant after cooling."
            />
          </>
        ),
        Learn: (
          <>
            <p>
              We established the optimal ITC conditions as{" "}
              <strong>heating to 65 °C in PBS containing 2 M NaCl</strong>.
              Under these conditions, the lysate supernatant, the supernatant
              after the high-temperature phase transition, the pellet after
              cooling-induced redissolution and the supernatant after cooling
              were collected and verified by SDS-PAGE: compared with the initial
              lysate supernatant, the contaminating protein bands in the cooled
              supernatant after ITC disappeared completely, while the 2KY-5 band
              was retained in the final solution with almost no loss.
            </p>
            <p>
              More importantly, this set of conditions was subsequently applied
              to all constructs in the series (2KY-10, 2KY-5-Tag and
              2KY-10-Tag), yielding comparable yields and purities. The ITC
              protocol is therefore general within the scaffold series and
              constitutes the &ldquo;standardized production module&rdquo; we
              aimed for.
            </p>
          </>
        ),
      },
    },
    {
      title:
        "Cycle 3 — Crosslinking strategy: establishment of the photocrosslinking system and iteration of the illumination hardware",
      content: {
        Design: (
          <>
            <p>
              Cartilage defects are irregular in shape and variable in depth, so
              the material must <strong>gelate in situ</strong> in order to
              conform to the lesion; moreover, the joint cavity is continuously
              flushed by synovial fluid, so solidification must be completed{" "}
              <strong>within seconds</strong>, otherwise the precursor is
              diluted and washed away before gelation. Focusing on the question
              of &ldquo;how to turn a 2KY-5 solution into a hydrogel&rdquo;, we
              compared the common crosslinking strategies for protein hydrogels:
            </p>
            <ol>
              <li>
                <strong>Thermal crosslinking</strong>: gelation is driven by the
                inverse temperature transition of the elastin domain, but the
                gelation rate is strongly coupled to temperature, so that
                controllable second-scale setting near body temperature cannot
                be achieved, and the gel properties are sensitive to
                fluctuations in ambient temperature, which is incompatible with
                intraoperative requirements;
              </li>
              <li>
                <strong>
                  Enzymatic crosslinking (e.g., the HRP/H₂O₂ system)
                </strong>
                : this catalyses tyrosine crosslinking under relatively mild
                conditions, but the reaction kinetics depend on the diffusion
                and concentration balance of the enzyme and hydrogen peroxide,
                the gelation time is typically on the order of minutes to tens
                of minutes, and H₂O₂ poses a risk of oxidative damage to
                encapsulated cells and requires additional control of residual
                levels;
              </li>
              <li>
                <strong>
                  Exogenous chemical crosslinkers (e.g., glutaraldehyde)
                </strong>
                : crosslinking is efficient, but the cytotoxicity is well
                established and in situ use is not possible;
              </li>
              <li>
                <strong>
                  Visible-light-initiated dityrosine crosslinking (the
                  photoinitiator system based on ruthenium (Ru) and sodium
                  persulfate (SPS))
                </strong>
                : the elastin domain we designed contains editable tyrosine
                sites, and photoinitiation drives the formation of covalent
                dityrosine crosslinks between tyrosine residues, achieving
                solidification within seconds; compared with ultraviolet light,
                visible light (450 nm) causes less damage to cells and matrix.
              </li>
            </ol>
            <p>
              Weighing{" "}
              <strong>
                gelation rate, biocompatibility and compatibility with the SELP
                sequence
              </strong>
              , we selected Ru/SPS visible-light crosslinking as our main route.
              This choice is consistent with our overall design philosophy of
              &ldquo;writing properties into the primary sequence&rdquo;: the
              crosslinking sites themselves are introduced by sequence design
              rather than added exogenously.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              Using lyophilized 2KY-5 powder as the raw material, a 10% (w/v)
              hydrogel precursor solution was prepared in PBS, the
              photocrosslinker C₃₀H₂₄Cl₂N₆Ru·6H₂O/Na₂S₂O₈ (Ru/SPS) was added at
              final concentrations of 2 mM / 20 mM, and the solution was placed
              in a 1.5-mL microcentrifuge tube and irradiated with the
              blue-light source then available in our laboratory in order to
              initiate crosslinking.
            </p>
            <p>
              We built and adopted a blue-light curing system (450 nm) with a
              more suitable light intensity, and fixed the irradiation distance
              and the position of the sample container as a standard geometry so
              that the energy density was reproducible in every experiment. The
              precursor formulation and the Ru/SPS concentrations were kept
              unchanged at the optimal conditions established previously, so
              that the effect of the hardware change could be isolated on a
              single-variable basis.
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              Gelation was assessed by the inverted-tube test: the
              non-irradiated system flowed to the bottom of the tube upon
              inversion, whereas the irradiated system remained in place,
              confirming that the photocrosslinking route is viable and that the
              system can be fully crosslinked. During testing, however, we
              identified a key problem: with the existing light source, the
              gelation time was markedly longer than the level reported in the
              literature, and the degree of gelation varied between samples of
              the same batch, with an incompletely crosslinked &ldquo;soft
              core&rdquo; frequently appearing in the peripheral region.
            </p>
            <p>
              The inverted-tube test was repeated with the upgraded illumination
              system:{" "}
              <strong>
                the system was fully crosslinked after 2 s of blue-light
                irradiation
              </strong>{" "}
              and remained immobile upon inversion, whereas the non-irradiated
              control flowed normally to the bottom of the tube. Compared with
              the original hardware, the gelation time was markedly shortened
              and the results were consistent both within and between batches,
              with no further occurrence of an incompletely crosslinked soft
              core. The hydrogels prepared on this basis were used for the
              subsequent mechanical characterization and cytocompatibility
              testing (co-culture of the extraction solution with mesenchymal
              stem cells (MSCs) and measurement of metabolic activity by the
              CCK-8 assay, which confirmed that the material has no obvious
              cytotoxicity).
            </p>
            <DbtlFigure
              src="result/01/32.avif"
              caption="Figure 1.3.1. Establishment of the Ru/SPS photocrosslinking route. Comparison of the crosslinking strategies available for protein hydrogels and the mechanism by which Ru/SPS-mediated photoinitiation generates covalent dityrosine crosslinks between tyrosine residues under visible light; comparison of gelation with the original and the upgraded light source in the inverted-tube test; and the cytocompatibility of the resulting hydrogel evaluated by the CCK-8 assay."
            />
          </>
        ),
        Learn: (
          <>
            <p>
              The photocrosslinking chemistry itself was feasible, but the
              bottleneck lay not in the material but in the illumination
              hardware: neither the wavelength match nor the irradiation
              uniformity of the existing light source was sufficient to support
              stable, reproducible second-scale gelation.
            </p>
            <p>
              After breaking the problem down, we realized that the main factor
              affecting gelation quality is the irradiation wavelength, which
              determines the initiation efficiency of dityrosine crosslinking.
              The initial experiments used an ordinary blue-light source with a
              wavelength of approximately 480 nm, which differs from the 450 nm
              reported in the literature as the excitation maximum; we therefore
              hypothesized that this wavelength mismatch was the main cause of
              the slow gelation and of the large batch-to-batch variation. The
              design objective of this cycle was accordingly to switch to an
              illumination system with a better-matched wavelength and a more
              stable output, and to fix the irradiation geometry, so that the
              gelation time reliably falls within the second range.
            </p>
            <p>
              <strong>
                The photocrosslinking system was fully established
              </strong>
              : at the material level, the dityrosine crosslinking sites had
              been written into the sequence; at the process level, the
              high-intensity blue-light curing system allowed &ldquo;precursor
              preparation—injection—blue-light irradiation&rdquo; to achieve in
              situ setting within seconds, meeting the intraoperative
              requirements of a joint cavity flushed by synovial fluid. This
              cycle demonstrated that the coordinated iteration of hardware and
              biological design is likewise part of the design–build–test–learn
              (DBTL) cycle.
            </p>
            <p>
              At this point the gelation step was closed within the main process
              flow of &ldquo;expression—ITC purification—assembly—precursor
              preparation—injection—blue-light crosslinking&rdquo;, and the
              standardized illumination parameters and formulation were written
              into our Protocol for reuse in all subsequent hydrogel
              experiments.
            </p>
          </>
        ),
      },
    },
    {
      title:
        "Cycle 4 — Mechanical programmability: repeat doubling and the PRe-RDL platform",
      content: {
        Design: (
          <>
            <p>
              The mechanical properties of SELP are determined by the{" "}
              <strong>ratio and repeat number</strong> of the silk and elastin
              domains: a higher silk fraction increases stiffness and
              compressive performance, whereas a higher elastin fraction
              increases toughness and resilience. The repeat number is therefore
              an important programmable variable for tuning the mechanical
              properties of the hydrogel. Turning 2KY-5 into 2KY-10, however,
              encountered a genuine engineering obstacle:
            </p>
            <p>
              The 2KY scaffold consists of tandem repeats of a 171-bp / 57-aa
              unit, and such highly repetitive genes cannot be extended by
              conventional PCR or homologous recombination: every repeat is an
              identical primer-binding site, so that any primer annealing within
              the repeat region initiates extension from all repeats
              simultaneously.
            </p>
            <p>
              Our solution was to draw on the plasmid reconstruction recursive
              directional ligation (PRe-RDL) concept developed by the Chilkoti
              group and to design 2KY-5 as a{" "}
              <strong>cassette that can be doubled recursively</strong>:
            </p>
            <ul>
              <li>
                A BseRI recognition site was embedded in the GGGGS linker 14 bp
                upstream of the repeat array, and an AcuI recognition site was
                embedded in the GGSGGSSGS trailer 17 bp downstream; both are
                type IIS restriction enzymes that cleave outside their
                recognition sequences, each leaving a 2-nt 3′ overhang, and
                their phases were designed such that both overhangs are GG,
                identical to the first two bases of the repeat array;
              </li>
              <li>
                The plasmid is digested with (AcuI + XbaI) and with (BseRI +
                XbaI), respectively, and the gene-containing half of each digest
                is ligated;{" "}
                <strong>
                  a single cycle doubles the repeat array and reconstitutes the
                  plasmid
                </strong>
                , leaving no extra bases at the junction and preserving the
                reading frame, while the restriction sites remain outside the
                doubled array so that the cycle can be repeated indefinitely;
              </li>
              <li>
                The key feature of the design is that the enzyme recognition
                sites lie within the flanking linkers and never enter the repeat
                sequence itself; the approach is therefore not constrained by
                the codon degeneracy of glycine/alanine-rich sequences such as
                2KY, which is precisely the obstacle that classical RDL cannot
                overcome for such sequences.
              </li>
            </ul>
            {/* One figure removed from the draft (PRe-RDL scheme) */}
          </>
        ),
        Build: (
          <>
            <p>
              The single parental plasmid pET19b-2KY5-RDL was obtained by gene
              synthesis, and one round of doubling was performed: the 1008-bp
              target fragment containing the scaffold gene was taken from digest
              A (AcuI + XbaI), and the 6483-bp large fragment was taken from
              digest B (BseRI + XbaI), with the 153-bp small fragment discarded;
              after gel purification the two fragments were mixed in equimolar
              amounts, ligated with T4 DNA ligase at 16 °C overnight and
              transformed into DH5α. In addition, we reserved three SnoopTag2
              docking sites on the plasmid (N-terminus / end of the gene /
              C-terminus), whose positions relative to the cut sites determine
              the fate of the tag during doubling; in this project the gene-end
              site was chosen, so that each 2KY-5 block is followed by one
              SnoopTag2, and{" "}
              <strong>
                scaffold length and interface number thus become a jointly
                programmable quantity
              </strong>
              . Because of the same repetitive-sequence problem, the insertion
              of SnoopTag2 itself could not be achieved by whole-plasmid
              amplification and was instead carried out by two-fragment
              amplification using Method 2 of the Mut Express II kit.
            </p>
            <DbtlFigure
              src="result/01/12.avif"
              caption="Figure 1.4.1. Construction of the 2KY-10 plasmid by one round of PRe-RDL. The parental plasmid is divided into two aliquots and digested with AcuI + XbaI (digest A) and with BseRI + XbaI (digest B); the 1008-bp gene-containing fragment from digest A and the 6483-bp backbone fragment from digest B are ligated to reconstitute the plasmid carrying a doubled repeat array."
            />
          </>
        ),
        Test: (
          <p>
            Single colonies were picked for colony PCR: the band shifted upward
            from 1152 bp for 2KY-5 to 2007 bp, and the difference of 855 bp
            corresponds exactly to one 2KY-5 unit, demonstrating successful
            doubling; sequencing confirmed that the repeat region consisted of
            10 complete monomers without deletions. The expression and
            purification of 2KY-10 followed the conditions used for 2KY-5
            (induction with 1 mM IPTG for 6 h; ITC at 65 °C in PBS containing 2
            M NaCl), giving approximately 480 mg per liter of bacterial culture,
            close to that of 2KY-5.
          </p>
        ),
        Learn: (
          <>
            <p>
              <strong>The PRe-RDL platform was successfully validated</strong>:
              the scaffold was expanded from a single length to a series in
              which both length and interface density are programmable, and the
              same expression and purification procedure is applicable to all
              constructs in the series. With this the scaffold line formed a
              closed loop: the sequence determines the properties, the sequence
              can be edited recursively, and the properties can be measured
              systematically. The differences in mechanical properties between
              hydrogels with different repeat numbers (together with the
              modeling-based prediction system) are presented on the Results
              page.
            </p>
            <DbtlFigure
              src="result/01/16.avif"
              caption="Figure 1.4.2. Recursive doubling cycle of the PRe-RDL platform. Both enzyme recognition sites lie within the flanking linkers, outside the repeat array, so that the doubling cycle can be repeated indefinitely without introducing extra bases at the junction."
            />
          </>
        ),
      },
    },
  ],
};
