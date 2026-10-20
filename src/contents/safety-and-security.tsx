// English content from the team's Safety document:
// https://rcny9dy1085s.feishu.cn/docx/TXrudTDOjo5wACxma42c7oFjn6g
export function SafetyAndSecurity() {
  return (
    <div className="row mt-4">
      <div className="col">
        <p>
          Safety is our foremost principle throughout the design,
          experimentation, and product development of NEST. Our safety
          considerations span three levels: safety by design at the molecular
          and material level, laboratory safety (including a dedicated
          cell-culture room), and product biosafety — protecting researchers,
          future users, and the environment alike.
        </p>

        <h2 id="design-safety" className="mt-5">
          Design Safety
        </h2>
        <hr />
        <p>
          <strong>Production chassis.</strong> All protein components of NEST —
          the SELP scaffold (2KY series), the SnoopLigase ligation system, and
          the functional peptides of each module — are produced in{" "}
          <em>Escherichia coli</em> DH5α (cloning) and BL21(DE3) (expression).
          Both strains are Risk Group 1 microorganisms with no pathogenicity,
          and all related work is carried out under BSL-1 conditions.
        </p>
        <p>
          <strong>SELP scaffold.</strong> The scaffold is a silk–elastin-like
          protein (SELP) composed of natural amino acids. It degrades naturally
          in vivo, and the degradation rate can be programmed through the number
          of repeat units (<em>m</em>) to match the pace of cartilage
          regeneration — avoiding the chronic inflammation and secondary
          surgical removal associated with long-term retention of permanent
          implants. The composition, crosslinking sites, and functional
          interfaces of the material are all encoded in its DNA sequence, making
          batch-to-batch consistency sequence-defined rather than dependent on
          formulation mixing.
        </p>
        <p>
          <strong>Functional peptides.</strong> Each of the three functional
          modules uses a short peptide as its molecular effector. In the
          TVN Magnetic Binding Module, the heptapeptide TVNFKLY serves as the
          Fe₃O₄-binding motif; Fe₃O₄ is a magnetic material widely used in
          biomedicine, and the particles retain their magnetic properties after
          peptide modification. In the GAG Retention Module, CPC+14A and
          Link-N are employed: CPC+14A is an arginine-rich cationic peptide
          whose charge design balances reversible binding to sulfated
          glycosaminoglycans (GAGs) against the irreversible aggregation that
          excessive positive charge would cause; Link-N is a 16-amino-acid
          N-terminal fragment of cartilage link protein, a proteolytic product
          that occurs naturally in vivo. In the Mitochondrial Therapeutic Module,
          the MMP-13-responsive peptide ensures that the carrier is cleaved and
          released only within the degenerative osteoarthritic microenvironment
          (elevated MMP-13 expression); validation includes a scrambled-sequence
          control (identical amino-acid composition, different sequence order)
          to ensure that the observed behavior is attributable to the sequence
          itself.
        </p>
        <p>All functional peptides follow two shared safety principles:</p>
        <ul>
          <li>
            <strong>Immobilized delivery</strong> — peptides are anchored to the
            SELP scaffold through the ligation system and incorporated during in
            situ crosslinking; they are never administered as free molecules,
            preventing systemic exposure.
          </li>
          <li>
            <strong>Proteolytic clearance</strong> — as amino-acid chains, the
            peptides are degraded by endogenous proteolytic pathways.
          </li>
        </ul>
        <p>
          <strong>In-use controls.</strong> Injection and curing are performed
          sequentially: the Ru/SPS visible-light system completes in situ
          crosslinking within approximately 2 s of blue-light irradiation,
          preventing wash-out of the precursor solution by synovial fluid in the
          joint cavity. The external magnetic field is applied only transiently
          during molding and structural alignment, with no long-term exposure.
        </p>
        <p>
          <strong>Mitochondrial delivery without environmental release.</strong>{" "}
          Unlike applications that release engineered organisms into open
          environments, the final NEST product is a non-living assembly composed
          of a purified protein scaffold, functionalized liposomes, and
          exogenous mitochondria. It contains no viable engineered organisms and
          no self-replicating genetic elements, and therefore presents no risk
          of environmental colonization or horizontal gene transfer of
          engineered organisms. The exogenous mitochondria are genetically
          unmodified natural organelles. Administration is by local
          intra-articular injection, confining exposure to the lesion site.
        </p>

        <h2 id="laboratory-safety" className="mt-5">
          Laboratory Safety
        </h2>
        <hr />
        <p>
          Our work strictly follows national and university regulations. The
          Ministry of Education’s Regulations on Laboratory Safety in
          Institutions of Higher Education apply to all university laboratories;
          at Zhejiang University, laboratory supervision and safety management
          are the responsibility of the Laboratory and Equipment Management
          Office. Our molecular experiments are conducted in Laboratory 413 of
          the National Demonstration Center for Experimental Biology Teaching at
          Zhejiang University, while cell-related experiments are carried out in
          a dedicated cell-culture room. Both facilities are equipped with
          complete safety infrastructure and management systems.
        </p>
        <h3 id="training-and-access" className="mt-4">
          Training and Access
        </h3>
        <p>
          All members must pass the university-level laboratory safety access
          examination before entering the laboratory. The examination covers
          basic experimental skills, waste disposal, chemical storage, and
          emergency response. After joining the team, members receive
          specialized safety training from the laboratory supervisor, covering
          molecular cloning, microbial culture, and cell culture and
          cell-room-specific procedures (gowning on entry and exit, aseptic
          technique, and use of CO₂ incubators and clean benches). Large
          equipment such as autoclaves and high-speed centrifuges may be
          operated only after dedicated training, and standard operating
          procedures are posted in both the laboratory and the cell-culture
          room.
        </p>
        <h3 id="facilities-and-protection" className="mt-4">
          Facilities and Protection
        </h3>
        <p>
          All personnel wear lab coats, gloves, and masks, with safety goggles
          when necessary. Work areas are strictly zoned: molecular cloning,
          bacterial culture, and protein purification are performed in
          designated areas to prevent cross-contamination. All cell culture is
          carried out in the dedicated cell-culture room — entry requires
          changing into clean gowns and shoe covers, cell handling is performed
          in clean benches or biological safety cabinets, and the CO₂
          incubators, reagents, and consumables in the room are reserved
          exclusively for cell work. Mitochondrial isolation and liposome
          preparation are likewise completed in zoned clean areas.
        </p>
        <h3 id="equipment-and-chemical-storage" className="mt-4">
          Equipment and Chemical Storage
        </h3>
        <p>
          The laboratory is under access control; large equipment is managed by
          designated, trained personnel, and chemicals are stored by class in
          dedicated cabinets with usage records maintained. CO₂ cylinders,
          incubators, and water baths in the cell-culture room are subject to
          regular inspection, and cryopreservation reagents such as DMSO are
          stored in designated zones in accordance with regulations.
        </p>
        <h3 id="waste-management" className="mt-4">
          Waste Management
        </h3>
        <p>
          All microbially contaminated items (culture plates, centrifuge tubes,
          pipette tips, bacterial suspensions) and cell-culture waste (culture
          supernatant, detached cells, spent medium) are collected together,
          autoclaved, and disposed of as biohazardous waste. Chemical waste
          liquids and gels are collected separately, clearly labeled, and handed
          over to the university’s equipment management department for
          centralized disposal. Sharps such as needles and blades are discarded
          into puncture-resistant sharps containers.
        </p>
        <h3 id="laboratory-supervisor" className="mt-4">
          Laboratory Supervisor
        </h3>
        <p>
          Associate Professor Yang Fan is the supervising instructor of our
          laboratory and has been responsible for laboratory safety management
          for 11 years. She is familiar with the vast majority of molecular
          cloning experiments and can provide technical guidance at any time.
          Before formal experiments began, she delivered safety lectures to all
          members, covering laboratory-specific rules and emergency response
          procedures; during experimentation, she supervises critical operations
          to minimize unnecessary hazards and injuries.
        </p>

        <h2 id="product-safety" className="mt-5">
          Product Safety
        </h2>
        <hr />
        <p>
          Product safety is the core of NEST’s safety case — it is supported not
          only by design-level commitments but also by experimental data.
        </p>
        <p>
          <strong>Cell compatibility (CCK-8 assay).</strong> We used the Cell
          Counting Kit-8 (CCK-8) assay to measure the relative viability of
          mesenchymal stem cells (MSCs) treated with the engineered responsive
          peptide. Control, blank, and treatment groups (5 μM and 10 μM) were
          examined at three time points (24, 48, and 72 h). From 48 h onward,
          the relative viability of both treatment groups was approximately
          85–90%, and it was maintained at 85–95% at 72 h — indicating good cell
          compatibility within the tested concentration range (Figure 1).
          Viability at the 24 h time point was lower in both groups (~70% and
          ~55%); repeat experiments under controlled initial cell states are
          underway to determine whether this early change arises from cell
          condition at seeding or from peptide treatment.
        </p>
        <figure className="figure d-block my-4 text-center">
          <img
            src="https://static.igem.wiki/teams/6102/wiki/images/result/01-skeleton/19.avif"
            alt="Color development in a 96-well plate after the CCK-8 assay."
            className="figure-img img-fluid rounded"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="figure-caption">
            Figure 1. Color development in a 96-well plate after the CCK-8
            assay. Each well shows the color reaction after CCK-8 treatment
            (Figure 2.1.1 in the scaffold-group results).
          </figcaption>
        </figure>
        <p>
          <strong>Component safety.</strong> The SELP scaffold is a recombinant
          protein composed of natural amino acids and degrades in vivo; the
          lipid components (DOPE, DOTAP, and DSPE-PEG-Mal) are well-established
          materials in drug delivery; and the exogenous mitochondria are
          genetically unmodified natural organelles. Each functional module is
          expressed, purified, and quality-checked separately before assembly
          according to the formulation — avoiding cross-contamination of
          intermediates and allowing safety effects to be attributed to
          individual components.
        </p>
      </div>
    </div>
  );
}
