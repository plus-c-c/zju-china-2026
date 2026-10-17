import { MathFormula } from "../../components/MathFormula";

export function SnoopLigaseDesign() {
  return (
    <>
      <h2 className="mt-5 mb-3">Rational Engineering of SnoopLigase2</h2>
      <p>
        Modular assembly of proteins requires efficient and reliable ligation
        tools. To ligate our functional modules more effectively, we rationally
        engineered SnoopLigase2.
      </p>
      <p>
        Our engineering effort revolved around two questions: first, maintaining
        the structural stability of SnoopLigase2 in the working solution;
        second, improving the turnover rate of SnoopLigase2.
      </p>
      <h3 className="mt-5 mb-3">Background</h3>
      <p>
        SnoopLigase2 catalyzes the formation of a covalent isopeptide bond
        between SnoopTag2 and DogTag2 and can provide a short-peptide ligation
        interface for different protein modules. Previous studies have also
        pointed out that SnoopLigase2 binds its ligation product strongly and
        non-covalently, so that product release and catalyst recycling remain
        limited. This led us to recognize that completion of the ligation
        reaction and release of the ligase are two processes that need to be
        evaluated separately (
        <a
          href="https://doi.org/10.1021/acs.bioconjchem.3c00122"
          target="_blank"
          rel="noreferrer"
        >
          Keeble et al., 2023
        </a>
        ).
      </p>
      <p>
        We therefore proposed a stepwise design hypothesis: first, find
        stabilization candidates with good structural compatibility to establish
        a basis for subsequent engineering; then, on this background, screen for
        mutations that markedly affect the product interface while only weakly
        affecting the free-state structure. The goal of the modeling was to
        identify candidates worth experimental validation, rather than to infer
        turnover rates directly from structural scores alone.
      </p>
      <h3 className="mt-5 mb-3">Building the Model</h3>
      <p>
        We used the crystal structure of RrgA, 2WW8, as a template and built a
        model of the ligase core comprising 104 amino acids (
        <a
          href="https://www.rcsb.org/structure/2WW8"
          target="_blank"
          rel="noreferrer"
        >
          RCSB PDB: 2WW8
        </a>
        ).
      </p>
      <p>
        Based on previous engineering efforts, we introduced 9 mutations to
        construct the initial model. After coordinate-constrained FastRelax with
        PyRosetta, we generated 20 models and selected several representative
        conformations. They share the same sequence but represent different
        optimized conformations, which reduces the dependence of subsequent
        screening on a single starting structure.
      </p>
      <h3 className="mt-5 mb-3">Stability Screening</h3>
      <p>
        Following the literature{" "}
        <sup>
          <a href="#ref-modeling-7">[7]</a>
        </sup>
        , we adopted a loop-region proline substitution strategy. Proline
        restricts the conformational freedom of the backbone, so it may produce
        a favorable stabilizing effect when the original local geometry is
        compatible with it.
      </p>
      <p>
        We comprehensively analyzed backbone dihedral angles, secondary
        structure, solvent exposure, and the distance to key functional regions,
        and selected five candidates: A771P, N775P, E785P, S795P, and D796P. We
        then built each mutant and a matched control on the representative
        conformations, using the same ref2015 scoring function, side-chain
        optimization range, and FastRelax protocol for repeated calculations.
      </p>
      <p>The main evaluation metric for the free state was:</p>
      <MathFormula display>{"S_{mutant}-S_{control}"}</MathFormula>
      <p>
        Negative values indicate that the mutant has a lower Rosetta score under
        the current computational protocol. Screening also considered the
        consistency of the results, backbone deviation, steric clashes, and
        changes in local interactions.
      </p>
      <p>
        After single-mutant screening, A771P and E785P entered combinatorial
        evaluation. Over three starting conformations, we completed 30 groups of
        comparisons among four structures: the original structure, A771P, E785P,
        and the double mutant. The double mutant outperformed the corresponding
        original-structure control in all 30 calculations, with a median score
        difference of approximately −9.24 REU across the four groups; 25 of them
        showed that adding E785P on the A771P background still yielded further
        benefit. Combined with inspection of representative structures, we
        defined original structure + A771P + E785P as Construct1.
      </p>
      <h3 className="mt-5 mb-3">
        Product-Like Structure Check: Does Stabilization Affect Functionally
        Relevant Regions?
      </h3>
      <p>
        An improved free-state score does not directly demonstrate that ligation
        function is retained. We further built a single-chain product model
        containing the K742–N854 isopeptide bond and introduced the SnoopTag2
        mutations in the corresponding regions to examine the behavior of
        Construct1 in this structural environment.
      </p>
      <p>
        The evaluation covered whether the isopeptide linkage was retained,
        changes in key distances around E803, overall conformational deviation,
        and proxy values for the interaction between the ligase core and the
        tag/tail. However, in the eight groups of calculations, the core–tail
        interaction of Construct1 was slightly more favorable, suggesting that
        the stabilization design may strengthen it as well.
      </p>
      <h3 className="mt-5 mb-3">
        State-Selective Engineering of the Product Interface
      </h3>
      <p>
        We performed a residue-by-residue analysis of the 104 ligase-core
        residues in 20 matched product-like models. Combining interface
        distances, contact ranges, and structural protection criteria, we
        selected six positions — K792, N793, S795, E827, V828, and V831 — and
        designed 12 alanine-scanning or milder substitutions.
      </p>
      <p>
        Each candidate was compared with its control group in both the free
        state and the product-like state. In addition to the free-state scoring
        cost, we calculated:
      </p>
      <MathFormula display>
        {"I_{\\mathrm{mutant}}-I_{\\mathrm{control}}"}
      </MathFormula>
      <p>
        where <MathFormula>{"I"}</MathFormula> is the Rosetta-computed
        core–tag/tail interaction value. A positive value indicates weakening of
        this interface interaction and is the metric used to screen potential
        release candidates. At the same time, the candidate must satisfy the
        inspection criteria for the overall structure and key functional
        geometry.
      </p>
      <p>
        On the basis of the combined analysis, we prioritized E827Q. Its median
        free-state score difference was −0.138 REU, and its median
        product-interface interaction difference was +1.386 REU. In the selected
        representative models, the original close E827–K734 contact was pulled
        apart, while the local polar contact between Q827 and R829 in the free
        state was retained.
      </p>
    </>
  );
}
