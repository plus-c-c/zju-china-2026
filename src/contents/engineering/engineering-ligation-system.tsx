import { TableCaption } from "../../components/FigureCaption";
import type { DbtlModule } from "./dbtl";

export const ligationModule: DbtlModule = {
  title: "Ligation system",
  cycles: [
    {
      title:
        "Cycle 1 — Selection of the ligation system: the SnoopLigase system",
      content: {
        Design: (
          <>
            <p>
              A scaffold with excellent mechanical properties is only the
              foundation of the platform. To achieve programmable material
              design, functional modules for targeting, sensing, drug release
              and so on must be{" "}
              <strong>
                stably attached to the scaffold without compromising the
                activity of either partner
              </strong>
              . We first evaluated conventional approaches:
            </p>
            <ul>
              <li>
                <strong>
                  Random chemical conjugation (e.g., click chemistry)
                </strong>
                : the reaction conditions are relatively harsh, the attachment
                sites are random and protein activity is easily disrupted, and
                the reaction conditions must be re-optimized whenever the
                functional module is changed, which fundamentally conflicts with
                the &ldquo;plug-and-play&rdquo; goal of the platform;
              </li>
              <li>
                <strong>Sortase A-mediated ligation</strong>: it requires a
                relatively long recognition motif, the reaction depends on Ca²⁺,
                and the rate is limited;
              </li>
              <li>
                <strong>SpyTag/SpyCatcher</strong>: the reaction is covalent and
                specific, but the relatively bulky globular protein tag
                (approximately 12 kDa) makes it unsuitable for dense interfacial
                modification;
              </li>
              <li>
                <strong>The SnoopLigase system</strong>: a class of engineered
                ligases that catalyse the formation of a stable covalent
                isopeptide bond between two short peptide tags (the 12-aa
                SnoopTag2 and the 23-aa DogTag2); it offers three features that
                match the needs of this project, namely specific ligation, mild
                conditions (physiological buffer, room temperature) and
                plug-and-play tags (the tags are encoded directly in the gene
                sequence).
              </li>
            </ul>
            <p>
              We selected the SnoopLigase system and first built a validation
              system using the two model proteins sfGFP and SUMO.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              Three expression plasmids for SnoopTag2-sfGFP, SUMO-DogTag and
              SnoopLigase2 (all carrying a His tag) were constructed and
              transformed into <em>E. coli</em> BL21(DE3); the proteins were
              purified by nickel-affinity chromatography and dialyzed in 3.5-kDa
              dialysis bags (SnoopTag2-sfGFP and SUMO-DogTag into PBS, and
              SnoopLigase2 into 25 mM Tris&ndash;borate (TB) buffer containing
              20% (v/v) glycerol in order to preserve enzyme activity). After
              quantification by the BCA assay, the ligation reaction system was
              prepared with all three components at a final concentration of 25
              &micro;M and reacted at room temperature.
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              Samples were taken at 10, 30 and 60 min after the system had been
              prepared and the reaction was terminated by boiling, and the
              samples were analyzed by SDS-PAGE:
            </p>
            <ul>
              <li>
                A distinct ligation-product band appeared within 10 min
                (SUMO-DogTag:SnoopTag2-sfGFP);
              </li>
              <li>
                The reaction went to completion within 1 h (the band of
                SUMO-DogTag, which was present in lower amount, disappeared).
              </li>
            </ul>
            <p>
              This demonstrated that the ligation reaction is specific, rapid
              and efficient, and that it proceeds entirely in physiological
              buffer at room temperature without disrupting the folding or
              activity of the protein modules.
            </p>
            {/* One figure removed from the draft (ligation time course) */}
          </>
        ),
        Learn: (
          <>
            <p>
              The SnoopLigase system was formally established as the universal
              interface between the scaffold and the functional modules, and it
              is the technical basis on which the NEST platform achieves
              customizable functional configuration. In the Test stage, however,
              we also noticed a latent problem: SnoopLigase2 is used once and
              discarded as a catalyst, which represents a significant cost in
              scaled-up production. This motivated the subsequent iterative
              optimization of the enzyme.
            </p>
          </>
        ),
      },
    },
    {
      title:
        "Cycle 2 — Expression optimization: gradient screening of induction conditions",
      content: {
        Design: (
          <>
            <p>
              Under the initial conditions, the soluble expression levels of the
              three ligation-system components (SnoopTag2-sfGFP, SUMO-DogTag and
              SnoopLigase2) were insufficient, so the inducer concentration and
              the induction temperature had to be optimized simultaneously. The
              design adopted a &ldquo;gradient experiment + semi-quantitative
              Western blot&rdquo; approach in order to identify the optimal
              induction conditions for each of the three proteins.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              The expression strains were inoculated into LB liquid medium
              containing Kan and cultured to mid-logarithmic phase, after which
              IPTG was added to establish a gradient of 0.1 / 0.25 / 0.5 / 1.0
              mM; induction was carried out at 16 °C for 16 h. A small volume of
              culture was lysed by sonication and subjected to small-scale
              purification by nickel-affinity chromatography.
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              The lysates and the purified eluates were analyzed by Western blot
              with an anti-His primary antibody, which confirmed that all three
              target proteins were successfully induced and located
              intracellularly, and the optimal induction concentrations were
              determined from the band intensities:
            </p>
            <div className="dbtl-table-compact">
              <TableCaption>
                <strong>
                  Table 2.2.1. Optimal IPTG concentration for the induction of
                  each ligation-system protein.
                </strong>
              </TableCaption>
              <div className="table-responsive">
                <table
                  className="table table-bordered align-middle"
                  aria-label="Table 2.2.1: Optimal IPTG concentration for each ligation-system protein"
                >
                  <thead>
                    <tr>
                      <th>Protein</th>
                      <th>Optimal IPTG concentration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>SnoopTag2-sfGFP</td>
                      <td>0.1 mM</td>
                    </tr>
                    <tr>
                      <td>SUMO-DogTag</td>
                      <td>0.1 mM</td>
                    </tr>
                    <tr>
                      <td>SnoopLigase2</td>
                      <td>1.0 mM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ),
        Learn: (
          <>
            <p>
              The optimal conditions were subsequently used for large-scale
              expression of the adaptor proteins, all with good results. After
              purification and dialysis, the concentrations determined by the
              BCA assay were 1.33 mg/mL for SnoopTag2-sfGFP (30 kDa), 0.66 mg/mL
              for SnoopLigase2 (12.9 kDa) and 0.60 mg/mL for SUMO-DogTag (14.7
              kDa), providing the material basis for the reproducible
              preparation of the standard 25 &micro;M ligation system described
              in Section 2.1. At this point the ligation system had a stable and
              reproducible supply chain.
            </p>
          </>
        ),
      },
    },
    {
      title: "SnoopLigase2 rational design",
      content: {
        Design: (
          <>
            <p>
              In our previous replicate experiments and literature survey, we
              identified two engineering defects in SnoopLigase2:
            </p>
            <ol>
              <li>
                <strong>Turnover bottleneck</strong>: after the reaction is
                complete, the ligation product refolds into a conformation
                resembling the native RrgA domain and binds the ligase very
                tightly, so that SnoopLigase2 behaves as a{" "}
                <strong>single-turnover catalyst</strong> that remains bound to
                the ligation product; in essence, it is a stoichiometric reagent
                rather than an enzyme, which makes its use costly at scale;
              </li>
              <li>
                <strong>Poor solution stability</strong>: the purified enzyme is
                unstable in solution and prone to aggregation, which complicates
                storage and transport.
              </li>
            </ol>
            <p>
              In view of the requirements of practical production, we carried
              out targeted engineering of SnoopLigase. The system is derived
              from the C-terminal domain of the{" "}
              <em>Streptococcus pneumoniae</em> adhesin RrgA; combining its
              known mutational background with structural information, we{" "}
              <strong>
                introduced three mutations of our own design (A771P, E785P and
                E827Q)
              </strong>
              , aiming to weaken the enzyme&ndash;product interaction and
              improve the solution behaviour without perturbing the active site.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              The triple-mutant variant (SnoopLigase-ZJU) carrying A771P / E785P
              / E827Q was constructed on the SnoopLigase2 expression framework,
              expressed and purified under the optimized conditions described in
              Section 2.2, and compared in terms of ligation kinetics using
              exactly the same 25 &micro;M system as in Section 2.1.
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              The engineered SnoopLigase-ZJU showed a more than
              three-order-of-magnitude increase in ligation rate over the
              original version, was able to complete conjugation in conventional
              PBS (pH 7.4) at room temperature within minutes, and retained
              activity over 4&ndash;45 °C, pH 4&ndash;10 and up to 1 M NaCl.
              This allowed interface assembly to be embedded directly in the
              main process flow of &ldquo;expression—ITC
              purification—assembly—precursor preparation—injection—blue-light
              crosslinking&rdquo;, without the need to design a separate buffer
              system for it.
            </p>
          </>
        ),
        Learn: (
          <>
            <p>
              We overcame the intrinsic limitation of the system, converting
              SnoopLigase from a stoichiometric reagent into a genuine
              multiple-turnover catalyst while markedly improving its solution
              stability. This bridges the gap between laboratory use of the
              ligation system and its translation to practical applications.
            </p>
            {/* Draft figure 2.3.1: schematic of the three mutations (A771P, E785P and E827Q) introduced into the RrgA-derived C-terminal domain. Replace with the static-library version of the SnoopLigase model (the draft version is outdated). */}
            {/* Original draft note: contains AI-generated content from Doubao Work */}
          </>
        ),
      },
    },
  ],
};
