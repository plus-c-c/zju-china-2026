export function ScaffoldAndLinkers() {
  return (
    <>
      <h2 className="mt-5 mb-3">Scaffold and linkers</h2>
      <h3 className="mt-5 mb-3">Hydrogel scaffold</h3>
      <h4 className="mt-4 mb-3">
        Cycle 1 — Material selection: from chemical hydrogels to an encodable
        SELP
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        The selection of a cartilage-repair material cannot rely on intuition;
        although hydrogels fit the requirements in terms of properties, the
        choice of material for the final construction deserves careful
        consideration. We therefore first translated clinical requirements into
        comparable engineering indicators. Through literature research, we
        identified three obstacles facing cartilage-repair materials — the
        mechanical contradiction (high compressive modulus constrains high water
        content / low friction), the interface problem (long-term adhesion is
        difficult in a wet, dynamic environment), and the structural difference
        (the anisotropic zoning of native cartilage is hard to replicate) — and
        accordingly proposed that an ideal material should satisfy five criteria
        at once: adequate mechanical performance, firm interface adhesion, good
        biocompatibility, feasible production, and programmable function.
      </p>
      <p>
        Using these five criteria as coordinates, we listed a set of parallel
        candidate approaches for evaluation:
      </p>
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead>
            <tr>
              <th>Candidate material</th>
              <th>Advantages</th>
              <th>Primary reasons for exclusion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Chemically synthesized hydrogels (PEG, HA derivatives, etc.)
              </td>
              <td>Tunable mechanical properties; mature fabrication process</td>
              <td>
                Require multi-component formulation and chemical crosslinking,
                with large batch-to-batch variability; crosslinkers/residual
                monomers are cytotoxic, making safe in situ gelation difficult;
                functional expansion depends on chemical modification
              </td>
            </tr>
            <tr>
              <td>
                Naturally derived materials (collagen, gelatin, decellularized
                matrix, etc.)
              </td>
              <td>Good biocompatibility</td>
              <td>
                Insufficient mechanical strength; inconsistent source and batch;
                non-programmable and difficult to scale up
              </td>
            </tr>
            <tr>
              <td>Recombinant collagen</td>
              <td>Can be biosynthesized</td>
              <td>
                Triple-helix structure depends on specific sequences and
                post-translational modifications, with limited room for
                mechanical tuning; downstream purification relies on
                chromatography
              </td>
            </tr>
            <tr>
              <td>
                <strong>SELP (silk-elastin-like protein)</strong>
              </td>
              <td>
                Single-component, genetically encoded; silk-like domains provide
                strength and elastin-like domains provide toughness; repeat
                number serves as a mechanical parameter; exhibits inverse
                temperature phase transition, enabling chromatography-free
                purification; variable sites in elastin-like domains can
                introduce functions such as photocrosslinking, adhesion, and
                cell adhesion
              </td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We constructed an evaluation matrix along three dimensions: literature
        evidence + experimental feasibility + clinical accessibility, and
        stepped out of the laboratory: we conducted structured interviews with
        orthopedic clinicians, expert teachers in biomaterials, and patients,
        asking them one by one about their expectations for an ideal repair
        material (property requirements, intraoperative handling window,
        degradation matching, cost sensitivity, etc.).
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        The conclusions of the interviews and the literature assessment were
        highly consistent: what clinicians care about most is not &ldquo;how
        strong the material can be&rdquo;, but &ldquo;whether it can be set in
        place within minutes during surgery, whether batches can be consistent,
        and whether later functions can be adjusted on demand&rdquo;. These are
        precisely what traditional chemical hydrogel systems struggle to satisfy
        and what SELP naturally provides:
      </p>
      <ol>
        <li>
          SELP is translated directly by cells; as a single protein it is
          completely identical and reproducible between batches;
        </li>
        <li>
          Material properties can be adjusted directly by changing the
          repeat-sequence composition, without redesigning a new material;
        </li>
        <li>
          inserting bases at the corresponding gene position adds functional
          residues or short peptide tags to the protein chain.
        </li>
      </ol>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        We finally settled on SELP as the scaffold material of NEST and thereby
        established the top-level architecture of the entire project —{" "}
        <strong>&ldquo;one scaffold + extensible modules&rdquo;</strong>: the
        scaffold provides basic properties such as mechanics, adhesion, and
        second-scale gelation, while functions are attached as standardized
        modules. This architecture remained unchanged across all subsequent
        cycles and became the premise that allows the whole platform to be
        programmable.
      </p>
      {/* Draft figure note: candidate-material evaluation matrix and expert interview highlights or exchange photos */}
      <h4 className="mt-4 mb-3">
        Cycle 2 — Scaffold protein purification: systematic exploration of ITC
        conditions
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        SELP contains elastin-like domains and exhibits an inverse temperature
        transition: at high temperature the protein denatures, aggregates, and
        precipitates, and it redissolves upon cooling. On this basis we planned
        to abandon traditional chromatography and purify using{" "}
        <strong>ITC (inverse transition cycling)</strong> — obtaining highly
        pure product with only temperature cycling and centrifugation.
      </p>
      <p>
        The question we wanted to answer was:{" "}
        <strong>
          how should the two key parameters of ITC, temperature and salt
          concentration, be chosen to ensure purity while minimizing protein
          loss?
        </strong>
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We transformed pET19b-2KY5 into BL21(DE3); after colony PCR confirmed
        the correct insert size and sequencing was correct, the protein was
        expressed with 1 mM IPTG induction for 6 h, and the supernatant obtained
        by sonication served as the starting material for ITC.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        The initial ITC workflow (ordinary PBS, higher temperature) lost a
        considerable amount of protein during the high-temperature phase
        transition, with an obvious target band in H-Sup. (the post-heating
        supernatant) — indicating that much of the target protein was discarded
        before it could precipitate. To locate the cause, we performed a matrix
        gradient experiment over heating temperature (65 &deg;C / 80 &deg;C)
        &times; buffer salt concentration (0.5 / 1 / 2 M NaCl), comparing H-Sup.
        and C-Sup. (the post-cooling supernatant) under each condition by
        SDS-PAGE:
      </p>
      <ul>
        <li>
          a denser post-heating supernatant band &rarr; more protein not
          recovered during purification;
        </li>
        <li>
          a denser post-cooling supernatant band &rarr; higher purification
          yield.
        </li>
      </ul>
      <p>
        The results showed that raising the temperature improved the yield only
        marginally, whereas salt concentration was the more significant factor,
        with the 2 M NaCl buffer giving the best purification yield.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        We determined the optimal ITC conditions to be{" "}
        <strong>65 &deg;C heating / 2 M NaCl PBS</strong>. Under these
        conditions we collected the lysis supernatant, the post-phase-transition
        supernatant, the pellet after cooling and redissolution, and the
        post-cooling supernatant for SDS-PAGE verification: compared with the
        initial lysis supernatant, the contaminant bands in the post-ITC cooled
        supernatant disappeared completely, and the 2KY-5 band was retained
        almost without loss in the final solution.
      </p>
      <p>
        More importantly, this set of conditions was subsequently applied to all
        constructs — 2KY-10, 2KY-5-Tag, and 2KY-10-Tag — yielding comparable
        yield and purity, showing that the ITC scheme is generalizable within
        the scaffold series, the &ldquo;standardized production module&rdquo; we
        were aiming for.
      </p>
      {/* Two figures removed from the draft (ITC condition comparison) */}
      <h4 className="mt-4 mb-3">
        Cycle 3 — Crosslinking strategy: establishing the photocrosslinking
        system and iterating on the illumination hardware
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        Cartilage defects are irregular in shape and variable in depth, so the
        material must <strong>gel in situ</strong> to conform to the lesion; the
        joint cavity is subject to continuous synovial-fluid washout, so
        solidification must complete at the <strong>second scale</strong>, or
        the precursor is diluted and lost before gelation. Around the question
        &ldquo;how to turn a 2KY-5 solution into a hydrogel&rdquo;, we compared
        common protein hydrogel crosslinking strategies side by side:
      </p>
      <ol>
        <li>
          <strong>Thermal crosslinking:</strong> gelation through the inverse
          temperature transition of the elastin-like domains, but the gelation
          rate is strongly coupled to temperature, making controllable
          second-scale setting near body temperature impossible, and the gel
          properties are sensitive to ambient temperature fluctuations, so it
          does not meet intraoperative operating requirements;
        </li>
        <li>
          <strong>Enzymatic crosslinking (HRP/H₂O₂ systems, etc.):</strong> can
          catalyze tyrosine crosslinking under relatively mild conditions, but
          the reaction kinetics depend on the diffusion and concentration
          balance of the enzyme and hydrogen peroxide, gelation typically takes
          minutes to ten minutes, and H₂O₂ carries a risk of oxidative damage to
          embedded cells with residual levels requiring additional control;
        </li>
        <li>
          <strong>
            Exogenous chemical crosslinkers (glutaraldehyde, etc.):
          </strong>{" "}
          high crosslinking efficiency, but clearly cytotoxic and unusable in
          situ;
        </li>
        <li>
          <strong>
            Visible-light-initiated dityrosine crosslinking (Ru/SPS
            photoinitiating system):
          </strong>{" "}
          the elastin-like domains we designed contain editable tyrosine sites;
          under photoinitiation, covalent dityrosine crosslinks form between
          tyrosines, achieving solidification within seconds; compared with
          ultraviolet, visible light (450 nm) causes less damage to cells and
          matrix.
        </li>
      </ol>
      <p>
        Weighing{" "}
        <strong>
          gelation rate, biocompatibility, and compatibility with the SELP
          sequence
        </strong>
        , we chose Ru/SPS visible-light crosslinking as the main route. This
        choice is consistent with our overall design philosophy of
        &ldquo;writing properties into the primary sequence&rdquo; — the
        crosslinking sites themselves are introduced by our sequence design
        rather than added exogenously.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        Using lyophilized 2KY-5 powder as the raw material, a 10% (w/v) hydrogel
        precursor solution was prepared with PBS, the photoinitiators
        C&#8323;&#8320;H&#8322;&#8324;Cl&#8322;N&#8326;Ru&middot;6H&#8322;O /
        Na&#8322;S&#8322;O&#8328; were added (final concentrations 2 mM / 20
        mM), and the solution was placed in a 1.5 mL centrifuge tube and
        irradiated with the laboratory&rsquo;s existing blue-light source to
        initiate crosslinking.
      </p>
      {/* One figure removed from the draft (photocrosslinking setup) */}
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        Gelation was judged by the inversion method: the unilluminated system
        flowed to the bottom upon inversion, whereas the illuminated system
        stayed in place — the photocrosslinking route worked and the system
        could fully crosslink. But during testing we found a key problem: with
        the existing light source, the gelation time was clearly longer than
        reported in the literature, the degree of gelation varied between
        samples of the same batch, and a &ldquo;soft core&rdquo; of incomplete
        crosslinking often appeared at the edges.
      </p>
      {/* One figure removed from the draft (inversion test) */}
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        The photocrosslinking chemistry itself was feasible, but the bottleneck
        was not the material but the illumination hardware: the wavelength match
        and irradiation uniformity of the existing light source were both
        insufficient to support stable, repeatable second-scale gelation.
      </p>
      <p>
        After breaking the problem down, we realized the main factors affecting
        gelation quality include the illumination wavelength (which determines
        the initiation efficiency of dityrosine crosslinking). The initial
        experiments used an ordinary blue-light source at about 480 nm, which
        falls short of the 450 nm maximum excitation wavelength reported in the
        literature; we suspected this wavelength difference to be the main cause
        of slow gelation and large batch-to-batch variation. The design goal of
        this cycle was therefore: switch to an illumination system with a better
        wavelength match and more stable output, and fix the irradiation
        geometry, so that the gelation time stably reaches the second scale.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We built/adopted a blue-light curing system (450 nm) with a more
        suitable intensity and fixed the irradiation distance and sample
        container position to a standard geometry, making the energy density of
        each experiment reproducible. The precursor formulation and Ru/SPS
        concentrations kept the previously optimized conditions unchanged,
        isolating the effect of the hardware change under a single-variable
        principle.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        Under the upgraded illumination system, the inversion test was repeated:{" "}
        <strong>
          the system fully crosslinked after 2 seconds of blue-light
          illumination
        </strong>
        , staying immobile upon inversion, while the unilluminated control
        flowed to the bottom normally. Compared with the initial hardware, the
        gelation time was significantly shortened and results were consistent
        within and between batches, with no further soft-core regions of
        incomplete crosslinking. The hydrogels prepared on this basis were used
        for subsequent mechanical characterization and cytocompatibility testing
        (co-culture of extract liquid with MSCs, CCK-8 metabolic-activity assay,
        confirming no obvious cytotoxicity of the material).
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        <strong>The photocrosslinking system was fully established:</strong> at
        the material level, the dityrosine crosslinking sites are written into
        the sequence; at the process level, the high-intensity blue-light curing
        system allows &ldquo;precursor preparation — injection — blue-light
        illumination&rdquo; to complete in situ setting within seconds, meeting
        intraoperative requirements in the synovial-washout environment of the
        joint cavity. This cycle proves that the coordinated iteration of
        hardware and biological design is also part of the DBTL cycle.
      </p>
      <p>
        At this point the gelation stage of the main process flow —
        &ldquo;expression — ITC purification — assembly — precursor preparation
        — injection — blue-light crosslinking&rdquo; — was closed, and the
        standardized illumination parameters and formulation were written into
        the Protocol for reuse in all subsequent hydrogel experiments.
      </p>
      <h4 className="mt-4 mb-3">
        Cycle 4 — Mechanical programmability: repeat-number doubling and the
        PRe-RDL platform
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        The mechanical performance of SELP is determined by the{" "}
        <strong>ratio and repeat number</strong> of the silk-like and
        elastin-like domains: a higher silk proportion increases rigidity and
        compressive performance, while a higher elastin proportion increases
        toughness and resilience. The repeat number is therefore an important
        programmable variable for tuning hydrogel mechanics. However, turning
        2KY-5 into 2KY-10 ran into a real engineering obstacle:
      </p>
      <p>
        The 2KY scaffold is assembled from tandem repeats of a 171 bp / 57 aa
        unit, and such highly repetitive genes cannot be extended by
        conventional PCR or homologous recombination — every repeat is an
        identical primer-binding site, so a primer annealing inside any repeat
        initiates on all repeats simultaneously.
      </p>
      <p>
        Our solution borrows the PRe-RDL (recursive directional ligation by
        plasmid reconstruction) concept of the Chilkoti group, designing 2KY-5
        as a <strong>recursively duplicable cassette structure</strong>:
      </p>
      <ul>
        <li>
          the BseRI recognition site is embedded in the GGGGS linker 14 bp
          upstream of the repeat array, and the AcuI recognition site in the
          GGSGGSSGS tail 17 bp downstream; both are type IIS restriction enzymes
          that cut outside their recognition sequences, each leaving a 2 nt
          3&prime; overhang, and the phases are designed so that both overhangs
          are exactly GG, identical to the first two bases of the repeat array;
        </li>
        <li>
          the plasmid is digested with (AcuI + XbaI) and (BseRI + XbaI)
          respectively, and the gene-containing half from each is ligated,{" "}
          <strong>
            so that one cycle doubles the repeat array and rebuilds the plasmid
          </strong>
          , with no extra bases at the junction, the reading frame unchanged,
          and the restriction sites retained outside the doubled array, allowing
          indefinite cycling;
        </li>
        <li>
          the key design is that the enzyme recognition sites lie within the
          flanking linkers and never enter the repeat array itself, so it is not
          constrained by the codon degeneracy of the glycine/alanine-rich 2KY
          sequence — precisely the obstacle that classic RDL cannot overcome for
          this class of sequence.
        </li>
      </ul>
      {/* One figure removed from the draft (PRe-RDL scheme) */}
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        The single parental plasmid pET19b-2KY5-RDL was gene-synthesized. One
        doubling round: digestion A (AcuI + XbaI) provided the 1008 bp target
        fragment containing the scaffold gene, and digestion B (BseRI + XbaI)
        provided the 6483 bp large fragment while discarding the 153 bp small
        fragment; after gel purification the fragments were mixed in equimolar
        amounts, ligated with T4 ligase at 16 &deg;C overnight, and transformed
        into DH5&alpha;. In addition, we reserved three SnoopTag2 docking
        positions on the plasmid (N terminus / gene end / C terminus), whose
        positions relative to the restriction sites determine the fate of the
        tag during doubling — this project uses the gene-end position, so that
        every 2KY-5 block carries one SnoopTag2 after it, making{" "}
        <strong>
          scaffold length and interface count a single quantity that can be
          programmed together
        </strong>
        . The insertion of SnoopTag2 itself also cannot be done by whole-plasmid
        amplification because of the same repeat-sequence problem, and was
        solved instead by Mut Express II two-fragment segmented amplification.
        {/* Draft note: hyperlink to be added */}
      </p>
      {/* One figure removed from the draft (doubling build) */}
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        Colony PCR of picked single colonies: the band shifted upward from 1152
        bp for 2KY-5 to 2007 bp, and the 855 bp difference corresponds exactly
        to one 2KY-5 unit, proving successful doubling; sequencing confirmed
        that the repeat region consisted of 10 complete monomers with no
        deletion. The expression and purification of 2KY-10 followed the 2KY-5
        conditions (1 mM IPTG induction for 6 h, ITC at 65 &deg;C / 2 M NaCl
        PBS), producing about 480 mg per liter of culture, comparable to 2KY-5.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        <strong>The PRe-RDL platform was successfully validated:</strong> the
        scaffold was extended from a single length into a series in which
        &ldquo;both length and interface density are programmable&rdquo;, and
        the same expression and purification method is generalizable within the
        series. With this cycle the scaffold line reached a closed loop —
        sequence determines properties, the sequence can be edited recursively,
        and the properties can be measured systematically. The mechanical
        differences of hydrogels with different repeat numbers (together with
        the modeling prediction system) are presented on the Results page.
      </p>
    </>
  );
}
