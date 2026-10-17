export function LigationSystemEngineering() {
  return (
    <>
      <h3 className="mt-5 mb-3">Ligation system</h3>
      <h4 className="mt-4 mb-3">
        Cycle 1 — Selection of the ligation system: the SnoopLigase system
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        A scaffold with excellent mechanical performance is only the foundation
        of the platform. To achieve programmable material design, functional
        modules for targeting, sensing, and drug release must be{" "}
        <strong>
          stably coupled to the scaffold without destroying the activity of
          either side
        </strong>
        . We first evaluated conventional schemes:
      </p>
      <ul>
        <li>
          <strong>Random chemical conjugation (click chemistry, etc.):</strong>{" "}
          relatively harsh reaction conditions, random coupling sites, easy to
          destroy protein activity, and each change of functional module
          requires re-optimizing the reaction conditions — fundamentally
          conflicting with the &ldquo;plug-and-play&rdquo; platform goal;
        </li>
        <li>
          <strong>Sortase A-mediated ligation:</strong> requires a longer
          recognition motif, needs Ca&sup2;&#8314;, and has limited rate;
        </li>
        <li>
          <strong>SpyTag/SpyCatcher:</strong> covalent and specific, but the
          reaction partners are globular protein tags of considerable size (~12
          kDa), unsuitable for dense interface modification;
        </li>
        <li>
          <strong>SnoopLigase system:</strong> a class of engineered ligases
          that catalyze the formation of a stable covalent isopeptide bond
          between two short peptide tags (the 12 aa SnoopTag2 and the 23 aa
          DogTag2), with three features that fit this project&rsquo;s needs:
          ligation specificity, mild conditions (physiological buffer, room
          temperature), and plug-and-play tags encoded directly in the gene
          sequence.
        </li>
      </ul>
      <p>
        We chose the SnoopLigase system and first built a validation system with
        the two model proteins sfGFP and SUMO.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We constructed three expression plasmids for SnoopTag2-sfGFP,
        SUMO-DogTag, and SnoopLigase2 (all with His tags), transformed them into{" "}
        <em>E. coli</em> BL21(DE3), purified by nickel affinity chromatography,
        dialyzed using 3.5 kDa cutoff bags (SnoopTag2-sfGFP and SUMO-DogTag into
        PBS; SnoopLigase2 into 25 mM TB buffer containing 20% glycerol to
        preserve enzyme activity), and after BCA quantification assembled a
        ligation reaction system with a final concentration of 25 &micro;M for
        each of the three components, reacting at room temperature.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        Samples were taken at 10 / 30 / 60 min after assembling the system,
        boiled to stop the reaction, and observed by SDS-PAGE:
      </p>
      {/* One figure removed from the draft (ligation time course) */}
      <ul>
        <li>
          an obvious ligation-product band (SUMO-DogTag:SnoopTag2-sfGFP)
          appeared within 10 min;
        </li>
        <li>
          the reaction went to completion within 1 h (the band of the less
          abundant SUMO-DogTag disappeared).
        </li>
      </ul>
      <p>
        This proves that the ligation reaction is specific, fast, and efficient,
        and proceeds entirely under physiological buffer at room temperature
        without disrupting the folding and activity of the protein modules.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        The SnoopLigase system was formally established as the general interface
        between the scaffold and functional modules, the technical foundation
        for personalized functional configuration of the NEST platform. But in
        the Test we also noticed a hidden concern: SnoopLigase2 is &ldquo;used
        once and discarded&rdquo; as a catalyst, a significant cost item at
        production scale. This motivated the later iterative optimization of the
        enzyme.
      </p>
      <h4 className="mt-4 mb-3">
        Cycle 2 — Expression optimization: gradient exploration of induction
        conditions
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        The three components of the ligation system (SnoopTag2-sfGFP,
        SUMO-DogTag, and SnoopLigase2) had insufficient soluble expression under
        the initial conditions, so both the inducer concentration and the
        induction temperature needed optimization. The design used a
        &ldquo;gradient experiment + semi-quantitative Western blot&rdquo;
        approach to find the best induction conditions for each of the three
        proteins.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        The expression strains were inoculated into Kan-containing LB liquid
        medium, expanded to mid-logarithmic phase, and induced with IPTG; an
        induction concentration gradient of 0.1 / 0.25 / 0.5 / 1.0 mM was
        established with induction at 16 &deg;C for 16 h. A small amount of
        culture was lysed by sonication and purified on a small scale by nickel
        chromatography.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        The lysate and purification eluate were analyzed by Western blot
        (anti-His primary antibody), confirming that all three target proteins
        were successfully induced and expressed and located intracellularly, and
        the optimal induction concentration was determined from the band
        signals:
      </p>
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
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
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        The optimal conditions were subsequently used for large-scale expression
        of the linker proteins, with good expression results. After purification
        and dialysis, BCA quantification gave: sfGFP-SnoopTag2 (30 kDa) 1.33
        mg/mL, SnoopLigase2 (12.9 kDa) 0.66 mg/mL, and SUMO-DogTag (14.7 kDa)
        0.60 mg/mL, providing the material basis for repeated preparation of the
        25 &micro;M standard ligation system in Cycle 5. With this, the ligation
        system gained a stable, reproducible supply chain.
      </p>
      <h4 className="mt-4 mb-3">SnoopLigase2 rational design</h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        In earlier repeated experiments and literature research, we found two
        engineering defects in SnoopLigase2:
      </p>
      <ol>
        <li>
          <strong>Turnover bottleneck:</strong> after the reaction completes,
          the ligation product reconstitutes a conformation resembling the
          native RrgA domain and binds the ligase very tightly, making
          SnoopLigase2 behave as a <strong>single-turnover catalyst</strong>{" "}
          that remains bound to the ligation product — essentially a
          stoichiometric reagent rather than an enzyme, with high cost at
          production scale;
        </li>
        <li>
          <strong>Poor solution stability:</strong> the purified enzyme is
          unstable in solution and prone to aggregation, which is unfavorable
          for storage and transport.
        </li>
      </ol>
      <p>
        Considering the needs of actual production, we carried out targeted
        engineering of SnoopLigase. The system originates from the C-terminal
        domain of the Streptococcus pneumoniae adhesin RrgA; we combined its
        known mutational background and structural information to{" "}
        <strong>
          introduce three of our own mutations (A771P, E785P, and E827Q)
        </strong>
        , aiming to weaken the enzyme–product complex binding and improve
        solution behavior without disturbing the active center.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        On the SnoopLigase2 expression framework we constructed the A771P /
        E785P / E827Q triple-mutant variant (SnoopLigase-ZJU), expressed and
        purified it under the optimized conditions of Cycle 6, and compared
        ligation kinetics using exactly the same 25 &micro;M system as Cycle 5.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        The engineered SnoopLigase-ZJU showed a ligation rate more than three
        orders of magnitude higher than the original generation, and complete
        conjugation within minutes at room temperature in ordinary PBS (pH 7.4),
        retaining activity from 4&ndash;45 &deg;C, pH 4&ndash;10, and up to 1 M
        NaCl. This allows interface assembly to be embedded directly into the
        main process flow — &ldquo;expression — ITC purification — assembly —
        precursor preparation — injection — blue-light crosslinking&rdquo; —
        without designing a dedicated buffer system for it.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        We overcame an inherent limitation of the system, converting SnoopLigase
        from a stoichiometric reagent into a true multi-turnover catalyst while
        markedly improving its solution stability. This builds a bridge for
        extending the ligation system from the laboratory toward real
        application scenarios.
      </p>
      {/* Draft figure note: schematic of the three SnoopLigase2 mutation sites */}
      {/* Original draft note: contains AI-generated content from Doubao Work */}
    </>
  );
}
