import { DbtlFigure } from "./Figure";
import type { DbtlModule } from "./dbtl";

export const anisotropyModule: DbtlModule = {
  title: "Magnetically Responsive Anisotropy Module",
  intro: (
    <>
      <p>
        Walking, running, and bending the knee may appear effortless, but
        articular cartilage continuously bears and distributes the resulting
        loads. Under alternating compression, tension, and shear, collagen
        fibers oriented in different directions work together with the hydrated,
        proteoglycan-rich matrix to support joint movement. This finely
        organized microstructure is fundamental to the load-bearing properties
        of cartilage.
        <sup>
          <a href="#ref-anisotropy-1">[1]</a>
        </sup>
      </p>
      <p>
        Cartilage injury disrupts this organization and alters local load
        distribution. Abnormal stresses can further damage the matrix, while the
        ability of chondrocytes to maintain tissue homeostasis declines.
        Mechanical imbalance, matrix loss, and cellular degeneration can
        therefore reinforce one another. The mechanical module of NEST addresses
        this challenge by seeking to restore load distribution within the repair
        region and provide a more favorable mechanical environment for tissue
        regeneration.
      </p>
      <p>
        The architecture of native cartilage led us to a specific question:
        Could we introduce a preferred orientation into SELP before gelation and
        subsequently lock that organization in place?
      </p>
      <p>
        Answering this question required us to address three linked challenges:
        What component would respond to an external field? How could that
        response be transmitted to the protein scaffold? And how could the
        resulting alignment be preserved within a cartilage defect? We developed
        an integrated strategy: use a magnetic field to guide alignment,
        establish a molecular interface between magnetic particles and the
        scaffold, and stabilize the resulting architecture by photocrosslinking.
        Each step has a distinct function and can be optimized independently.
      </p>
      <p>
        The following engineering cycles document how this strategy evolved. We
        began by comparing alignment approaches, then designed the molecular
        coupling interface and progressively examined peptide binding,
        recombinant expression, ligation, and particle-associated fluorescence.
        Literature-based evaluation narrowed the design space, while
        experimental observations informed subsequent iterations.
      </p>
    </>
  ),
  cycles: [
    {
      title: "Cycle 1 — Electric-field versus magnetic-field alignment",
      content: {
        Design: (
          <>
            <p>
              Injection requires a flowable precursor, whereas load bearing
              requires a stable structure after gelation. We therefore
              positioned the alignment step between injection and curing: an
              external field would be applied while the precursor could still
              rearrange, followed by photocrosslinking to lock in the structure.
              The candidate method needed to guide alignment, be compatible with
              local defect treatment, and integrate with the curing step.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              We developed two conceptual routes.{" "}
              <strong>The electric-field strategy</strong> used an applied
              electric field to orient material components; the{" "}
              <strong>magnetic-field strategy</strong> incorporated magnetically
              responsive components that could be organized by an external
              magnetic field.
              Both followed the same
              injection&ndash;alignment&ndash;illumination sequence, allowing
              comparison within a common application scenario.
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              A review of relevant studies, together with consideration of in
              situ operating conditions, identified electrode placement and the
              need to apply an electrical current as practical challenges for
              the electric-field route. By contrast, an external magnetic device
              could act on responsive components within the precursor without
              placing electrodes in the material, providing a more
              straightforward integration with injection and illumination.
            </p>
            <DbtlFigure
              src="engineering/02/01.avif"
              caption="Figure 1 | Comparison of the electric-field and magnetic-field alignment routes. Both strategies were assessed within the same injection–alignment–illumination workflow; the magnetic-field route acts on responsive components within the precursor and does not require electrodes in the material."
            />
          </>
        ),
        Learn: (
          <>
            <p>
              The magnetic-field route was better suited to our proposed in situ
              workflow and was selected for further development. Separating
              alignment from photocrosslinking also allows the external field to
              be adjusted before the structure is fixed. The next challenge was
              to couple the magnetic component to the protein network.
            </p>
          </>
        ),
      },
    },
    {
      title: "Cycle 2 — Magnetically responsive composite fibers",
      content: {
        Design: (
          <>
            <p>
              Fibers have a defined longitudinal axis and can serve as
              structural carriers for directional organization. We considered
              loading magnetic nanoparticles onto fibers and incorporating those
              fibers during SELP gelation: the particles would respond to the
              applied field, the fibers would provide a directional element, and
              crosslinking would preserve the resulting structure.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              We designed a candidate approach using gelatin or collagen fibers
              loaded with Fe₃O₄ nanoparticles, and outlined the required
              tyrosine functionalization and particle-loading steps. The fibers
              would be blended with SELP, magnetically aligned, and then
              incorporated into the gel through Ru/SPS-mediated
              photocrosslinking. In this scheme, the alignment carrier would
              also participate in network formation.
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              Literature review and workflow analysis suggested that composite
              fibers provide a well-defined carrier for alignment but require
              additional fabrication, nanoparticle loading, and
              functionalization steps. The approach would also require
              coordinated control over particle&ndash;fiber interactions and
              fiber integration into the SELP scaffold.
            </p>
            <DbtlFigure
              readable="portrait"
              src="engineering/02/02.avif"
              caption="Figure 2 | The magnetically responsive composite-fiber approach. Fe₃O₄-loaded fibers were designed as directional carriers that also participate in network formation through Ru/SPS-mediated photocrosslinking."
            />
          </>
        ),
        Learn: (
          <>
            <p>
              Composite fibers remained a potential alternative but prompted a
              more focused question: Since SELP already serves as the
              load-bearing scaffold, could we give SELP a direct
              nanoparticle-binding capability and eliminate the need to
              fabricate a separate fibrous carrier? This led us to develop a
              dedicated magnetic coupling interface.
            </p>
          </>
        ),
      },
    },
    {
      title: "Cycle 3 — Direct coupling of nanoparticles to SELP",
      content: {
        Design: (
          <>
            <p>
              We wanted the magnetic function to be produced independently and
              then assembled onto SELP, as with the other NEST modules. This
              would preserve the scaffold sequence while allowing the
              particle-binding moiety and module loading ratio to be varied
              independently, focusing optimization on the relevant molecular
              interface.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              We outlined a magnetic nanoparticle&ndash;binding
              module&ndash;SELP assembly scheme, integrating a particle-binding
              element and a scaffold-coupling element into one module. At this
              stage, we defined the functions and connectivity of these elements
              before selecting their specific sequences and coupling chemistry.
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              We compared fabrication and assembly requirements against those of
              the composite-fiber route. Direct coupling avoids constructing a
              separate fibrous carrier while retaining flexibility in the
              module-to-scaffold ratio. It shifts the main technical challenges
              to two interfaces: particle binding and protein ligation.
            </p>
          </>
        ),
        Learn: (
          <>
            <p>
              Direct coupling became our primary approach. It replaces the
              additional carrier-fabrication process with a molecular interface
              and integrates the magnetic function into NEST&rsquo;s
              standardized modular assembly strategy.
            </p>
          </>
        ),
      },
    },
    {
      title: "Cycle 1 — Comparison of particle–protein coupling strategies",
      content: {
        Design: (
          <>
            <p>
              A suitable coupling method must provide stable association while
              remaining compatible with subsequent material preparation and
              modular assembly. We compared the required pretreatment of
              particles and proteins, genetic encodability of the coupling
              interface, operating conditions, and compatibility with SELP
              assembly. Our goal was a magnetic coupling module that could be
              produced, characterized, and reused independently within NEST.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              We considered three strategies: click chemistry,
              biotin&ndash;streptavidin interactions, and SpyTag/SpyCatcher
              coupling. For each, we mapped the necessary functionalization of
              the particle and protein components. In parallel, we searched for
              peptides capable of directly recognizing Fe₃O₄, assessing whether
              nanoparticle-binding capability could be introduced into a
              recombinant protein through genetic encoding.
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              The literature and workflow assessment indicated that click
              chemistry requires complementary reactive groups on both the
              particle and protein; biotin&ndash;streptavidin coupling requires
              prior biotinylation and the incorporation of streptavidin as an
              intermediary; and SpyTag/SpyCatcher, although genetically
              encodable on the protein side, still requires immobilization of
              the appropriate reaction partner on the nanoparticle surface. All
              three routes are technically feasible but introduce additional
              surface-modification, purification, and optimization steps. They
              may also increase variability in coupling density, orientation,
              and batch-to-batch consistency.
            </p>
            <p>
              In contrast, an Fe₃O₄-binding peptide could be genetically fused
              to a protein, allowing particle recognition to be encoded directly
              into the expressed construct without requiring extensive covalent
              modification of the nanoparticles. Combining the binding peptide
              with a scaffold-coupling tag would produce a bifunctional module
              that integrates particle binding and SELP attachment and can be
              manufactured and assessed separately.
            </p>
            <DbtlFigure
              src="engineering/02/03.avif"
              caption="Figure 3 | Screening of particle–protein coupling strategies, from covalent modification of the nanoparticles to a genetically encoded Fe₃O₄-binding peptide sequence."
            />
          </>
        ),
        Learn: (
          <>
            <p>
              This comparison showed that bond strength alone was not sufficient
              to determine the optimal coupling strategy. For NEST, we also
              wanted to minimize poorly controlled nanoparticle surface
              chemistry and retain an interface that was genetically encodable,
              experimentally verifiable, and replaceable. We therefore did not
              pursue click chemistry, biotin&ndash;streptavidin, or
              SpyTag/SpyCatcher as the primary particle-coupling route, and
              instead developed the Fe₃O₄-binding peptide approach.
            </p>
            <p>
              This decision made magnetic nanoparticle recognition part of the
              protein sequence, enabling separate expression and testing of the
              magnetic module while leaving the other end available for SELP
              coupling. Consequently, subsequent iterations focused on
              binding-peptide selection, expression of the fusion construct, and
              experimental evaluation of its particle-binding and
              scaffold-coupling functions.
            </p>
          </>
        ),
      },
    },
    {
      title: "Cycle 2 — Design of the TVN–DogTag module",
      content: {
        Design: (
          <>
            <p>
              A bifunctional interface must interact with both an inorganic
              nanoparticle surface and a protein scaffold. We assigned particle
              recognition to a binding peptide and scaffold assembly to a
              peptide tag. These distinct functions could first be tested
              separately and then integrated into one module.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              We combined the Fe₃O₄-binding heptapeptide TVNFKLY (TVN) with
              DogTag to create an independently expressed magnetic module. SELP
              carries SnoopTag2, and SnoopLigase2 catalyzes covalent ligation
              between the two peptide tags. We assessed TVN-dependent particle
              binding using peptide-based experiments and initially evaluated
              DogTag-mediated assembly using a model protein bearing SnoopTag2,
              matching each design element with a corresponding verification
              method.
            </p>
            <DbtlFigure
              src="engineering/02/04.avif"
              caption="Figure 4 | Design of the TVN–DogTag magnetic module. The Fe₃O₄-binding heptapeptide TVN is fused to DogTag, which is covalently ligated to the SnoopTag2-bearing SELP scaffold by SnoopLigase2."
            />
          </>
        ),
        Test: (
          <>
            <p>
              The selection of TVN was informed by previous binding-peptide
              screening and fusion-protein studies. TVNFKLY and HYIDFRW were
              among the sequences identified by phage display against Fe₃O₄,
              providing a literature basis for incorporating a
              nanoparticle-binding peptide into our fusion construct.
              <sup>
                <a href="#ref-anisotropy-2">[2]</a>
              </sup>
            </p>
          </>
        ),
        Learn: (
          <>
            <p>
              TVN&ndash;DogTag combines two complementary interfaces in one
              module while allowing their performance to be assessed
              independently. Particle-binding conditions can be optimized at the
              TVN end, whereas ligation can be evaluated using model substrates
              at the DogTag end. This separation provides a clear sequence for
              subsequent engineering iterations.
            </p>
          </>
        ),
      },
    },
    {
      title: "Cycle 1 — Peptide-binding detection and condition optimization",
      content: {
        Design: (
          <>
            <p>
              We initially evaluated peptide&ndash;particle binding
              independently of recombinant expression and scaffold attachment.
              The immediate objective was to establish a clear binding readout
              and use it to adjust the peptide-to-particle ratio.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              Our initial workflow involved binding, washing, elution, and BCA
              analysis to indirectly quantify peptide associated with the
              nanoparticles. The initial observations led us to adopt FITC
              labeling and test peptide concentrations of 90, 215, 375, and 500
              &micro;g/mL, allowing the detection procedure to support both
              visualization and condition screening.
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              The BCA assay did not provide sufficiently clear results, whereas
              fluorescence offered a more direct observational readout. Among
              the concentrations tested (90, 215, 375, and 500 &micro;g/mL), the
              500 &micro;g/mL condition produced the clearest observations.
              Nanoparticle quantity and mixing procedures also affected sample
              appearance.
            </p>
            <DbtlFigure
              src="engineering/02/05.avif"
              caption="Figure 5 | Peptide-based detection of TVN binding to Fe₃O₄ nanoparticles and optimization of the fluorescence readout conditions."
            />
          </>
        ),
        Learn: (
          <>
            <p>
              We subsequently refined the proposed nanoparticle-to-peptide
              ratio, including reducing the nanoparticle amount per sample from
              0.075 mg to 0.025 mg. Switching to fluorescence-based detection
              provided more readily interpretable feedback and identified mixing
              and component ratios as important variables to control.
            </p>
          </>
        ),
      },
    },
    {
      title: "Cycle 2 — Expression and purification of TVN–DogTag",
      content: {
        Design: (
          <>
            <p>
              Following the peptide-binding experiments, we incorporated TVN and
              DogTag into a recombinant fusion protein. We adopted a His/SUMO
              fusion-expression strategy: TVN provides particle recognition,
              DogTag provides a ligation interface, and the His tag enables
              affinity purification, creating a continuous workflow from sample
              production to functional assays.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              We constructed the target sequence, screened colonies, verified
              the construct by sequencing, and introduced the plasmid into{" "}
              <em>Escherichia coli</em> BL21(DE3). We tested an IPTG
              concentration gradient during expression, followed by
              nickel-affinity purification, dialysis, and protein
              quantification. Ultrafiltration-based concentration was included
              when required to prepare samples for ligation assays.
            </p>
            <DbtlFigure
              sharedFrame
              src={["engineering/02/06.avif", "engineering/02/07.avif"]}
              caption="Figure 6 | Expression and purification of the TVN–DogTag module. SDS–PAGE analysis of the expression screen and of the purified protein."
            />
          </>
        ),
        Test: (
          <>
            <p>
              Sequencing confirmed successful introduction of the target
              sequence. Electrophoresis, Western blotting, and concentration
              measurements were used to assess the protein samples. Some
              purified samples had low protein concentrations and required
              further concentration to support ligation assays and obtain
              clearly visible electrophoretic bands.
            </p>
          </>
        ),
        Learn: (
          <>
            <p>
              This cycle connected recombinant protein production with
              downstream ligation assays and emphasized the need to re-quantify
              protein after concentration. In the following iteration, we
              standardized sample conditions and used a model substrate to
              evaluate the ligation capability of the tags.
            </p>
          </>
        ),
      },
    },
    {
      title: "Cycle 3 — Ligation testing with a GFP model substrate",
      content: {
        Design: (
          <>
            <p>
              We selected GFP&ndash;SnoopTag2 as a model substrate to assess
              whether TVN&ndash;DogTag could be joined through the Snoop
              ligation interface. GFP offers a convenient traceable protein
              substrate, and successful ligation was expected to produce a
              molecular-weight shift detectable by electrophoresis. This
              provided an initial test before applying the interface to SELP.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              We established reactions containing GFP&ndash;SnoopTag2,
              TVN&ndash;DogTag, and SnoopLigase2, with matched controls lacking
              the ligase. Following preliminary tests, we adjusted protein
              concentrations and sample loading and compared reaction times of
              15 minutes and 6 hours, including SUMO-based controls to improve
              the interpretation of between-group differences.
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              For the formal ligation assay, we standardized protein quantities,
              reaction times, loading volumes, and electrophoresis conditions,
              and included both ligase-positive and ligase-negative controls.
              SDS-PAGE revealed higher-molecular-weight bands consistent with
              the expected ligation products in the ligase-containing reactions,
              whereas the corresponding ligase-free controls did not show the
              same band pattern. These results supported the formation of the
              proposed ligation products.
            </p>
            <DbtlFigure
              readable="gel"
              src="engineering/02/08.avif"
              caption="Figure 7 | Ligation testing with a GFP model substrate. Higher-molecular-weight products appear in the SnoopLigase-containing reactions, supporting DogTag-mediated ligation."
            />
          </>
        ),
        Learn: (
          <>
            <p>
              The higher-molecular-weight bands observed in the presence of
              ligase, but not in the matched ligase-free controls, are
              consistent with covalent assembly of the model substrates. We
              therefore standardized protein quantification, reaction
              conditions, and gel-loading parameters and incorporated
              enzyme-positive and enzyme-negative controls into the working
              protocol. This model-substrate assay can be used to support
              subsequent validation of module assembly.
            </p>
          </>
        ),
      },
    },
    {
      title: "Cycle 4 — Fluorescence detection in nanoparticle samples",
      content: {
        Design: (
          <>
            <p>
              The ligation experiment tested the protein assembly interface, but
              the particle-binding interface also needed to be examined in
              actual nanoparticle preparations. We continued using fluorescence
              tracking to determine whether particle-associated signals could be
              observed after sample processing and to identify factors affecting
              their detection.
            </p>
          </>
        ),
        Build: (
          <>
            <p>
              To investigate weak fluorescence signals, we separated the
              workflow into labeling, binding, washing, and imaging. We assessed
              light protection, processing duration, and ultrasonic washing
              conditions. Fluorescence gel analysis was used to assess labeled
              samples, while microscopy was used to inspect nanoparticle
              preparations, separating sample-preparation performance from final
              imaging performance.
            </p>
          </>
        ),
        Test: (
          <>
            <p>
              After adjusting the detection workflow, we observed fluorescence
              signals in the magnetic nanoparticle samples. This enabled
              continued evaluation of the particle-binding interface and
              provided a basis for subsequent integration of the module with
              SELP.
            </p>
            <DbtlFigure
              src={["engineering/02/09.avif", "engineering/02/10.avif"]}
              caption="Figure 8 | Fluorescence detection of particle-associated samples. Labeling, binding, and washing conditions were compared to separate sample-preparation performance from imaging performance."
            />
          </>
        ),
        Learn: (
          <>
            <p>
              Next, we plan to assemble the magnetic module onto SELP, compare
              structural alignment with and without an applied magnetic field,
              and characterize the direction-dependent mechanical response after
              photocrosslinking. These studies will test whether alignment can
              be induced and preserved and whether it translates into altered
              load-bearing behavior.
            </p>
          </>
        ),
      },
    },
  ],
  infos: [
    {
      afterCycle: 0,
      title: "1 Selection of an alignment strategy",
      content: (
        <p>
          An alignment method that works under laboratory conditions must also
          be compatible with the intended material application. In NEST,
          alignment is designed to occur after injection but before
          crosslinking. Our initial question was therefore how to establish a
          preferred orientation within the defect while maintaining a practical
          window for light-induced fixation.
        </p>
      ),
    },
    {
      afterCycle: 3,
      title: "2 Coupling magnetic nanoparticles to SELP",
      content: (
        <p>
          Having selected a general alignment approach, we next asked how
          magnetic particles could be physically coupled to SELP. Composite
          fibers provided a structural precedent, but modular assembly required
          a molecular-level connection. We therefore evaluated methods for
          binding Fe₃O₄ and for attaching the binding component to the scaffold.
        </p>
      ),
    },
    {
      afterCycle: 5,
      title: "3 Protein expression and functional testing",
      content: (
        <p>
          With the molecular interface defined, we established an experimental
          workflow: first obtain a measurable readout of peptide&ndash;particle
          binding, then express the recombinant module, test its ligation
          activity with a GFP-based substrate, and finally examine fluorescence
          associated with particle samples. Each stage reduces the number of
          unresolved variables before the next.
        </p>
      ),
    },
  ],
  outro: (
    <>
      <p>
        TVN comprises only seven amino acids but offers a compact recognition
        element for connecting a protein module with magnetic nanoparticles. By
        combining TVN with DogTag, we designed a magnetic module that can be
        manufactured independently and subsequently coupled to SELP through the
        Snoop ligation system. Particle recognition and scaffold ligation are
        mediated by distinct interfaces, allowing their respective conditions
        and loading ratios to be optimized without redesigning the underlying
        SELP scaffold. This approach integrates magnetic responsiveness into the
        broader modular architecture of NEST.
      </p>
      <p>
        The expression experiments, model ligation assays, and nanoparticle
        fluorescence observations have established candidate materials and
        detection workflows for further assembly. The next stage will combine
        magnetic-field-induced alignment with SELP photocrosslinking and
        investigate whether the resulting organization is retained and how it
        affects mechanical responses along different directions. Ultimately, the
        aim is to determine whether controlled internal alignment can improve
        load distribution within a cartilage repair material and provide
        suitable support for damaged cartilage.
      </p>
    </>
  ),
};
