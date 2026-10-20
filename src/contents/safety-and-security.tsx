// English content from the team's Safety document (Safety.md).
export function SafetyAndSecurity() {
  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article>
          <p>
            Safety is a fundamental consideration throughout the design,
            experimentation, and development of NEST. Our safety framework
            covers three aspects: molecular and material design, laboratory
            safety, and product biosafety. Together, these measures aim to
            protect researchers, future users, and the environment throughout
            the development and potential application of NEST.
          </p>

          <h2 id="design-safety" className="mt-5">
            Design Safety
          </h2>

          <h3 id="production-chassis" className="mt-4">
            Production Chassis
          </h3>
          <p>
            All recombinant protein components of NEST—including the
            silk–elastin-like protein (SELP) scaffold, the SnoopLigase ligation
            system, and the functional peptides used in each module—are
            produced using <em>Escherichia coli</em> DH5α for cloning and
            BL21(DE3) for protein expression. These laboratory strains are
            generally classified as Risk Group 1 organisms. All related
            procedures are conducted under appropriate BSL-1 laboratory
            practices and institutional biosafety requirements.
          </p>

          <h3 id="selp-scaffold" className="mt-4">
            SELP Scaffold
          </h3>
          <p>
            The NEST scaffold is a silk–elastin-like protein (SELP) composed of
            natural amino acids. Its sequence can be engineered to incorporate
            structural and functional features while allowing its material
            properties to be adjusted through the number and arrangement of
            repeat units. This design provides a potential means of tuning
            degradation behavior to better match the timescale of cartilage
            regeneration, with the aim of reducing the need for permanent
            implants and their associated long-term complications.
          </p>
          <p>
            The scaffold composition, crosslinking sites, and functional
            interfaces are encoded in its DNA sequence. This sequence-defined
            design facilitates reproducible production and characterization,
            reducing reliance on formulation-dependent mixing alone to
            determine material composition.
          </p>

          <h3 id="functional-peptides" className="mt-4">
            Functional Peptides
          </h3>
          <p>
            Each functional module uses a short peptide to provide a specific
            molecular function.
          </p>
          <p>
            In the TVN Magnetic Binding Module, the heptapeptide TVNFKLY serves
            as the Fe₃O₄-binding motif. Fe₃O₄ is a magnetic material used in
            biomedical research, and peptide functionalization is intended to
            provide a means of associating the material with the SELP-based
            system.
          </p>
          <p>
            In the GAG Retention Module, CPC+14A and Link-N are employed to
            support glycosaminoglycan (GAG) retention and
            cartilage-matrix-related functions. CPC+14A is an arginine-rich
            cationic peptide designed to promote electrostatic interactions
            with sulfated GAGs. Its charge design aims to balance GAG binding
            with the risk of excessive intermolecular association or
            aggregation. Link-N is a 16-amino-acid N-terminal fragment of
            cartilage link protein, based on a naturally occurring protein
            sequence.
          </p>
          <p>
            In the Mitochondrial Therapeutic Module, an MMP-13-responsive
            peptide is designed to respond to the elevated matrix
            metalloproteinase 13 (MMP-13) activity associated with osteoarthritic
            degeneration. The intended function is to enable
            environment-responsive cleavage and cargo release. A
            scrambled-sequence control, with the same amino-acid composition but
            a different sequence order, is included to distinguish
            sequence-dependent effects from effects attributable solely to
            amino-acid composition.
          </p>
          <p>
            All functional peptides are designed around two shared safety
            principles:
          </p>
          <ul>
            <li>
              <strong>Immobilized delivery.</strong> Functional peptides are
              attached to the SELP scaffold through the ligation system and
              incorporated into the material during assembly and crosslinking.
              This design aims to reduce the administration of free peptides and
              limit unintended exposure. The extent of peptide retention and
              release depends on the stability of the material and the local
              biological environment.
            </li>
            <li>
              <strong>Proteolytic clearance.</strong> The peptides are composed
              of amino acids and may be degraded by endogenous proteases. Their
              degradation rates and resulting products depend on peptide
              sequence and the surrounding environment and should be evaluated
              where relevant to the intended application.
            </li>
          </ul>

          <h3 id="in-use-controls" className="mt-4">
            In-Use Controls
          </h3>
          <p>
            The injection and curing steps are designed to occur sequentially.
            The Ru/SPS visible-light crosslinking system is intended to enable
            rapid in situ curing under blue-light irradiation, reducing the time
            during which the uncrosslinked precursor may be displaced by
            synovial fluid. The curing conditions must be controlled to achieve
            reproducible crosslinking while minimizing unnecessary exposure to
            the light source and crosslinking reagents.
          </p>
          <p>
            The external magnetic field used for molding and structural
            alignment is applied transiently rather than continuously. This
            limits unnecessary magnetic-field exposure during material
            preparation and intended use.
          </p>

          <h3 id="mitochondrial-delivery" className="mt-4">
            Mitochondrial Delivery Without Environmental Release
          </h3>
          <p>
            Unlike applications involving the release of engineered organisms
            into open environments, the final NEST product is designed as a
            non-living material assembly comprising a purified protein scaffold,
            functionalized liposomes, and exogenous mitochondria. It does not
            contain viable engineered microorganisms or an engineered organism
            intended to replicate in the environment.
          </p>
          <p>
            The exogenous mitochondria are unmodified natural organelles rather
            than genetically engineered organisms. As natural organelles may
            contain mitochondrial genetic material, their inclusion does not
            imply that the final product is free of all genetic material.
            Instead, the biosafety strategy focuses on avoiding
            engineered-organism release, controlling material preparation and
            handling, and restricting the intended route of administration to
            local intra-articular injection.
          </p>

          <h2 id="laboratory-safety" className="mt-5">
            Laboratory Safety
          </h2>
          <p>
            Our work follows applicable national regulations and Zhejiang
            University laboratory safety requirements. The Ministry of
            Education&rsquo;s regulations on laboratory safety in institutions of
            higher education provide a general framework for safe laboratory
            operations, while laboratory safety supervision and management at
            Zhejiang University are supported by the university&rsquo;s relevant
            administrative offices.
          </p>
          <p>
            Our molecular experiments are conducted in Laboratory 413 of the
            National Demonstration Center for Experimental Biology Teaching at
            Zhejiang University. Experimental activities are organized according
            to their risk profiles, with designated areas and procedures for
            molecular cloning, microbial culture, protein expression, and
            purification.
          </p>

          <h3 id="training-and-access" className="mt-4">
            Training and Access
          </h3>
          <p>
            All team members must pass the university-level laboratory safety
            access examination before entering the laboratory. The examination
            covers basic laboratory practices, waste disposal, chemical storage,
            and emergency response.
          </p>
          <p>
            Before beginning project-related experiments, members receive
            additional safety training from the laboratory supervisor. This
            training covers molecular cloning, microbial culture, protein
            expression and purification, reagent handling, contamination
            prevention, and the laboratory&rsquo;s emergency procedures.
          </p>
          <p>
            Large equipment, including autoclaves and high-speed centrifuges,
            may be operated only by personnel who have received the required
            training. Standard operating procedures are made available in the
            laboratory to support consistent and safe operation.
          </p>

          <h3 id="facilities-and-protection" className="mt-4">
            Facilities and Personal Protection
          </h3>
          <p>
            All personnel wear laboratory coats and gloves, with masks and
            safety goggles used as appropriate for the procedure and its
            associated risks.
          </p>
          <p>
            Work areas are organized to separate molecular cloning, bacterial
            culture, protein purification, and material preparation. This
            arrangement reduces the risk of cross-contamination and supports
            appropriate handling of biological and chemical materials.
          </p>
          <p>
            Procedures involving microbial cultures are carried out using
            appropriate containment and aseptic techniques. Protein purification
            and material preparation are performed in designated work areas,
            with equipment and consumables selected according to the
            requirements of each procedure.
          </p>

          <h3 id="equipment-and-chemical-storage" className="mt-4">
            Equipment and Chemical Storage
          </h3>
          <p>
            Laboratory access is controlled, and major equipment is operated
            only by designated or appropriately trained personnel. Chemicals are
            stored in designated cabinets according to their hazards and
            compatibility, and usage records are maintained as required.
          </p>
          <p>
            Equipment is inspected and maintained in accordance with laboratory
            procedures. Reagents are clearly labeled, appropriately stored, and
            handled according to their safety data sheets and the
            laboratory&rsquo;s chemical management requirements.
          </p>

          <h3 id="waste-management" className="mt-4">
            Waste Management
          </h3>
          <p>
            Waste generated from microbial culture—including contaminated
            culture plates, centrifuge tubes, pipette tips, and bacterial
            suspensions—is collected separately from ordinary waste and treated
            using the laboratory&rsquo;s approved decontamination procedures.
            Where required, microbial waste is autoclaved before disposal
            through the designated waste-management pathway.
          </p>
          <p>
            Chemical waste liquids, gels, and other chemical-contaminated
            materials are collected separately, clearly labeled, and transferred
            to the university&rsquo;s designated waste-management service for
            centralized disposal. Sharps, including needles and blades, are
            discarded in puncture-resistant sharps containers.
          </p>
          <p>
            All waste is handled in accordance with institutional procedures and
            applicable safety requirements. Biological waste and chemical waste
            are not disposed of together unless explicitly permitted by the
            relevant procedures.
          </p>

          <h3 id="laboratory-supervisor" className="mt-4">
            Laboratory Supervisor
          </h3>
          <p>
            Associate Professor Yang Fan supervises our laboratory and has more
            than 11 years of experience in laboratory safety management. She is
            familiar with the laboratory&rsquo;s molecular biology procedures
            and provides technical guidance when required.
          </p>
          <p>
            Before formal experiments began, she provided safety instruction to
            team members covering laboratory-specific rules, safe operating
            practices, and emergency response procedures. During experimentation,
            she supervises critical operations and advises team members on risk
            reduction and the appropriate handling of equipment and reagents.
          </p>

          <h2 id="product-safety" className="mt-5">
            Product Safety
          </h2>
          <p>
            Product safety is considered throughout NEST&rsquo;s design and
            assembly. The system uses separately prepared components and a
            defined assembly process to support traceability, material
            consistency, and the evaluation of component-specific risks.
          </p>

          <h3 id="component-safety" className="mt-4">
            Component Safety
          </h3>
          <p>
            The SELP scaffold is a recombinant protein composed of natural amino
            acids and is designed to undergo degradation under appropriate
            biological conditions. Its actual degradation behavior depends on
            the final sequence, material structure, and local environment and
            should not be assumed to be identical under all conditions.
          </p>
          <p>
            The lipid components used in the delivery system, including DOPE,
            DOTAP, and DSPE-PEG-Mal, have established applications in
            lipid-based delivery research. Their inclusion does not by itself
            establish the safety of the final formulation; compatibility, dose,
            formulation properties, and potential component-specific effects
            remain relevant to product assessment.
          </p>
          <p>
            The exogenous mitochondria are unmodified natural organelles. Their
            use does not involve the engineering or environmental release of a
            living recombinant organism. Nevertheless, the safety of the final
            assembly depends on the origin and quality of the starting
            materials, the preparation and handling procedures, and the intended
            route of administration.
          </p>
          <p>
            Each functional module is expressed or prepared, purified where
            applicable, and quality-checked separately before assembly according
            to the intended formulation. This modular workflow facilitates the
            identification of component-specific problems and reduces the
            likelihood of unintended carryover between preparation steps.
          </p>
        </article>
      </div>
    </div>
  );
}
