export function AnisotropyModule() {
  return (
    <>
      <h2 className="mb-4">Anisotropy module</h2>
      <h3 className="mt-5 mb-3">Cartilage mechanics and anisotropy</h3>
      <p>
        Walking, running, bending the knee — behind these seemingly simple
        movements, cartilage shares the load. Compression, tension, and shear
        arrive in turn, collagen fibers are arranged along different directions,
        and together with a proteoglycan-rich hydrated matrix they support joint
        motion. The load-bearing capacity of cartilage is hidden in these fine
        structural arrangements.
        <sup>
          <a href="#ref-anisotropy-1">[1]</a>
        </sup>
      </p>
      <p>
        Injury disrupts this architecture and also changes the local
        distribution of forces. Abnormal stress continues to damage the matrix,
        and the ability of cells to maintain the tissue declines accordingly;
        &ldquo;mechanical imbalance &mdash; matrix loss &mdash; cell
        degeneration&rdquo; thus reinforce one another. The mechanical module of
        NEST starts here: helping the repaired region share the load again and
        creating a better mechanical environment for tissue recovery.
      </p>
      <p>
        The alignment of natural cartilage gave us a concrete idea: could we
        give SELP a direction before gelation, and then lock this structure in
        place?
      </p>
      <p>
        This idea requires answering material and operational questions at the
        same time: what responds to the external field? How is the response
        transmitted to the protein? And how is the alignment retained within the
        defect? We connected these into one design route — use a magnetic field
        to guide the organization, use molecular interfaces to couple the
        particles to the scaffold, and use photocrosslinking to fix the
        structure. Each step carries a clear task and also leaves room for
        adjusting the material and operating conditions.
      </p>
      <p>
        The engineering cycles below record how this route took shape. We move
        from screening alignment methods to designing the coupling interface,
        and then progressively carry out peptide testing, protein expression,
        ligation reactions, and particle observation. Literature assessment
        helped us narrow the options, while experimental results continuously
        drove the next round of adjustment.
      </p>
      <h3 className="mt-5 mb-3">I. Choosing an alignment method</h3>
      <p>
        A scheme that can form alignment in the laboratory also has to fit the
        way the material is used. For NEST, alignment happens after injection
        and before crosslinking. Therefore we first focused on the question: how
        can a direction be established within the defect while leaving an
        operating window for light fixation?
      </p>
      <h4 className="mt-4 mb-3">
        Cycle 1｜Electric-field versus magnetic-field alignment
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        Injection requires the material to flow, while load bearing requires the
        structure to stabilize after gelation. We placed alignment between the
        two: apply an external field while the network can still rearrange, then
        lock the structure by photocrosslinking. A candidate method had to
        satisfy three conditions at once — guide the alignment, adapt to
        operation within the defect, and connect with the crosslinking step.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        Around this workflow we developed two schemes. The electric-field route
        uses an electric field to induce alignment of the components; the
        magnetic-field route equips the material with magnetically responsive
        components organized by an external magnetic field. Both schemes follow
        the same &ldquo;inject&ndash;align&ndash;illuminate&rdquo; order, so
        that the comparison lands in the same usage scenario.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        After reviewing the relevant studies and checking them against in situ
        operating conditions, electrode placement and current requirements
        became the obstacles in the electric-field route. A magnetic field can
        act on responsive components within the material through an external
        device, which combines more directly with injection and illumination.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        The magnetic-field route fits the in situ workflow we defined better and
        therefore became the main choice. Alignment and crosslinking are
        controlled separately, which also lets us adjust the external field
        before fixing the structure. The next round had to address the
        connection between the magnetic components and the protein network.
      </p>
      <h4 className="mt-4 mb-3">Cycle 2｜Magnetic composite fibers</h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        Fibers have a clear long axis and can serve as structural carriers for
        alignment. We envisioned loading magnetic particles onto fibers and
        letting the fibers participate in SELP gelation: the particles respond
        to the external field, the fibers provide direction, and crosslinking
        preserves this structure.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We designed a scheme using Fe₃O₄-loaded gelatin or collagen fibers, and
        laid out the tyrosine functionalization and particle-loading steps.
        After mixing these fibers with SELP, a magnetic field is applied and
        then the Ru/SPS photocrosslinking system integrates them into the gel.
        In this way the alignment carrier also becomes a component that can
        participate in network formation.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        Literature research and process breakdown showed that the fiber route
        has a clear alignment carrier, but adds fiber preparation, particle
        loading, and modification steps. The whole scheme must coordinate both
        the binding of particles to fibers and the integration of fibers with
        the scaffold.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        The composite fibers give us a retainable fallback option and also point
        to a more focused design direction: SELP is already the load-bearing
        scaffold, so could directly adding particle-binding capability to it
        reduce the extra carrier preparation steps? On this basis we began
        designing an independent magnetic interface.
      </p>
      <h4 className="mt-4 mb-3">
        Cycle 3｜Direct coupling of particles to SELP
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        We wanted the magnetic function to be prepared independently and then
        coupled to SELP, like the other functions of NEST. In this way the
        scaffold sequence can remain stable, while the particle-binding end and
        the addition ratio can be adjusted separately, concentrating later
        screening on the interface that most needs optimization.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We set up an assembly scheme of &ldquo;magnetic particle &mdash; binding
        module &mdash; SELP&rdquo;, arranging the particle-binding end and the
        scaffold-coupling end within the same module. At this stage we first
        defined the responsibilities and connection relationships of the parts,
        before moving on to screen specific sequences and coupling methods.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        Against the composite-fiber scheme, we compared preparation and assembly
        requirements item by item. Direct coupling eliminates the construction
        of an independent fiber carrier while retaining room to adjust the
        module ratio; it concentrates subsequent work on two interfaces:
        particle binding and protein coupling.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        Direct coupling became the main route. It converges the task of
        preparing an extra carrier into a single molecular interface and brings
        the magnetic function into the unified assembly system of NEST.
      </p>
      <p>
        Once the alignment method was chosen, a new question followed: how do
        the particles establish a connection with SELP? The fiber scheme
        provided structural inspiration, while the modular route required us to
        complete the connection at the molecular level. In the next stage we
        sought methods to bind Fe₃O₄ and to couple to the scaffold,
        respectively.
      </p>
      <h3 className="mt-5 mb-3">II. Coupling magnetic particles to SELP</h3>
      <h4 className="mt-4 mb-3">
        Cycle 1｜Comparison of particle&ndash;protein coupling methods
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        A particle-coupling method must both achieve binding and suit material
        preparation. We took into account the pretreatment steps, whether the
        interface can be expressed, and the integration with scaffold assembly,
        hoping to find a coupling module that can be reused in NEST.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We designed coupling routes based on click chemistry,
        biotin&ndash;streptavidin, and SpyTag/SpyCatcher, listing the
        modifications required on the particle and protein sides. In parallel,
        we searched for short peptides that directly recognize Fe₃O₄, exploring
        a scheme in which particle-binding capability is obtained through
        sequence design.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        Literature assessment showed that the former routes require
        pre-introducing complementary reactive groups or recognition components.
        Binding peptides brought a new possibility: write the
        particle-recognition capability into the protein sequence, obtain the
        function through expression, and then combine it with the
        scaffold-coupling end.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        We continued to develop the binding-peptide route. The magnetic
        interface thus became an expressible module that can be prepared,
        checked, and assembled independently, fitting naturally with the protein
        design approach of NEST.
      </p>
      <h4 className="mt-4 mb-3">Cycle 2｜Design of the TVN-DogTag module</h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        The design of a two-ended interface must serve both the inorganic
        particle surface and the protein scaffold. We let the particle-binding
        peptide take on the recognition task and the protein tag take on the
        assembly task. Each end has a clear role and can also be tested
        separately before being integrated into the same module.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We combined the Fe₃O₄-binding peptide TVNFKLY (TVN) with DogTag to form
        an independently expressed magnetic module; the SELP side carries
        SnoopTag2, with SnoopLigase2 catalyzing the covalent ligation between
        the two tags. The particle binding of TVN is checked through peptide
        experiments, while the assembly of DogTag is first tested with a model
        protein carrying SnoopTag2, so that each construction matches its
        validation method.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        The choice of TVN came from binding-peptide screening and fusion
        application studies. Sequences such as TVNFKLY and HYIDFRW were obtained
        by phage display targeting Fe₃O₄; the related studies provided the basis
        for bringing binding peptides into fusion designs.
        <sup>
          <a href="#ref-anisotropy-2">[2]</a>
        </sup>
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        TVN-DogTag allows the two interfaces to cooperate within one module and
        also allows the experiments to be carried out separately. When the
        particle-binding conditions need adjustment, we can work on the particle
        end first; when the ligation reaction needs optimization, we can check
        the assembly end with a model substrate. This arrangement provides a
        clear order of judgment for subsequent iterations.
      </p>
      <p>
        With a clear interface, the experimental sequence also became clear.
        First use the peptide to establish a readout for particle binding, then
        express the recombinant module and check protein ligation with a GFP
        model substrate, and finally move to particle sample observation. Each
        step reduces variables for the next, gradually bringing the whole
        assembly process into a testable experimental system.
      </p>
      <h3 className="mt-5 mb-3">
        III. Protein expression and functional testing
      </h3>
      <h4 className="mt-4 mb-3">
        Cycle 1｜Detection and condition optimization for peptide binding
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        We first used the peptide to check particle binding, leaving recombinant
        expression and scaffold coupling for later. The first round needed to
        obtain a clear binding readout, on which the peptide-to-particle ratio
        could then be adjusted.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        Initially, we designed a workflow with binding, washing, and elution
        followed by BCA detection to indirectly track the peptide on the
        particles. The initial results prompted us to switch to FITC labeling
        and to set up a peptide concentration gradient of 90, 215, 375, and 500
        &micro;g/mL, making the detection method also serve condition screening.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        The BCA results were not clear enough, whereas the fluorescence route
        provided a more direct way to observe. Among the peptide concentrations
        of 90, 215, 375, and 500 &micro;g/mL, 500 &micro;g/mL gave the best
        observation; the particle amount and the mixing process also affected
        sample performance.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        On this basis we continued adjusting the particle&ndash;peptide ratio
        and proposed reducing the particle amount per group from 0.075 mg to
        0.025 mg. The change in detection method gave intuitive feedback for
        subsequent optimization, and the ratio and mixing conditions became
        variables requiring careful control.
      </p>
      <h4 className="mt-4 mb-3">
        Cycle 2｜Expression and purification of TVN-DogTag
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        After the peptide experiments, TVN needed to enter a recombinant protein
        together with DogTag. We adopted a His/SUMO fusion expression design:
        TVN retains the particle-recognition task, DogTag provides the ligation
        interface, and the His tag connects to affinity purification, so that
        sample preparation and functional testing can proceed continuously.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We completed the target-sequence construction, colony screening, and
        sequencing, and then introduced the plasmid into{" "}
        <em>Escherichia coli</em> BL21(DE3). In the expression stage we set an
        IPTG concentration gradient, followed by nickel affinity purification,
        dialysis, and concentration measurement; depending on the sample,
        ultrafiltration concentration was added to prepare protein for the
        ligation experiments.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        Sequencing confirmed the introduction of the target sequence.
        Electrophoresis, Western blot, and concentration measurement were used
        to check the protein samples; some purified samples were at low
        concentration and needed further concentration before they could be used
        for ligation reactions and clear band observation.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        This round connected the expression samples with the ligation reaction
        and also drew our attention to the need to re-quantify the protein after
        concentration. The next round would unify sample conditions and check
        the ligation capability of the tag with a model substrate.
      </p>
      <h4 className="mt-4 mb-3">
        Cycle 3｜Ligation testing with the GFP model
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        We chose GFP-SnoopTag2 as the model substrate to first check whether
        TVN-DogTag2 can complete ligation through the Snoop interface. GFP is
        easy to track, and protein ligation is expected to produce a
        molecular-weight change, so the reaction products can be checked by
        electrophoresis before applying this interface to SELP.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        We assembled a ligation system of GFP-SnoopTag2, TVN-DogTag2, and
        SnoopLigase2 and designed comparison groups without the ligase. After
        the initial experiment, we readjusted protein concentrations and loading
        amounts and set up 15-minute and 6-hour reaction conditions plus a SUMO
        control, progressively improving the between-group comparison.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        The initial experiment produced a higher-molecular-weight band,
        providing a clue for product formation. At the same time, some groups
        intended to lack the enzyme had mistakenly received the ligase, and
        loading differences and electrophoresis conditions also affected the
        between-group comparison. Subsequent experiments therefore focused on
        clear controls and consistent sample conditions.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        After the higher-molecular-weight band appeared, the next step was to
        use clear controls to judge its relationship to the ligation reaction.
        We accordingly unified sample quantification and loading conditions and
        re-examined the reaction setup, making the model substrate a reusable
        tool for subsequent assembly testing.
      </p>
      <h4 className="mt-4 mb-3">
        Cycle 4｜Fluorescence detection in particle samples
      </h4>
      <h5 className="mt-4 mb-2">Design</h5>
      <p>
        The ligation experiments checked the protein-assembly end, while the
        particle-binding end needed to be observed in actual samples. We
        continued to use fluorescence tracking to check whether particle-related
        signals are retained after sample processing, and to look for the steps
        that affect observation.
      </p>
      <h5 className="mt-4 mb-2">Build</h5>
      <p>
        Around the weak signal, we split the workflow into four stages —
        labeling, binding, washing, and imaging — and examined conditions such
        as light protection, processing time, and image storage one by one.
        Fluorescence electrophoresis was used to check labeled samples and
        microscopic observation to check the particle system, helping us look
        separately at sample preparation and final imaging.
      </p>
      <h5 className="mt-4 mb-2">Test</h5>
      <p>
        After adjusting the detection workflow, we observed fluorescence signals
        in the magnetic nanoparticle samples. This result allowed observation of
        the particle end to continue and provided the basis for subsequently
        integrating the module with SELP.
      </p>
      <h5 className="mt-4 mb-2">Learn</h5>
      <p>
        Next, we will couple the module to SELP, compare the structural
        alignment with and without a magnetic field, and measure the mechanical
        response of the crosslinked material in different directions. In this
        way we can continue to examine the formation of alignment and its
        relationship to load-bearing performance.
      </p>
      <h3 className="mt-5 mb-3">Summary and next steps</h3>
      <p>
        TVN has only seven amino acids, yet it provides a compact recognition
        end for coupling proteins to magnetic particles. Combined with DogTag2,
        it allows us to prepare the magnetic module independently and then
        couple it to SELP through the Snoop system. Particle binding and
        scaffold coupling each have their own interface, and ratio adjustments
        can reuse the same scaffold. This design lets us optimize the two
        coupling steps separately while installing the magnetic function into
        the overall NEST material.
      </p>
      <p>
        Expression, ligation testing, and particle fluorescence observation
        provided samples that can continue to be assembled and detection methods
        for this design. Next, we will bring magnetic alignment and
        photocrosslinking into the SELP material together, checking whether the
        alignment can be retained and how it changes the mechanical response in
        different directions. What we care about is the outcome these alignments
        can ultimately deliver: allowing the repair material to share the load
        of joint motion better and provide the support damaged cartilage needs.
      </p>
    </>
  );
}
