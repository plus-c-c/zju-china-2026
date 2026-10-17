export function LigationSystemResults() {
  return (
    <>
      <h2 className="mt-5 mb-3">Ligation system</h2>
      <p>
        We verified the ligation capability and efficiency of the ligation
        system. First the three components themselves were validated, and the
        system was then extended to the scaffold and functional modules to
        verify its function in the hydrogel system.
      </p>
      <h3 className="mt-5 mb-3">Expression of ligation-system proteins</h3>
      <p>
        We separately transformed the plasmids for SnoopTag2-sfGFP, SUMO-DogTag,
        and SnoopLigase2 into <em>E. coli</em> BL21(DE3) for protein expression.
        The expression strains were inoculated into Kan-containing LB liquid
        medium, expanded to mid-logarithmic phase, and induced with IPTG. An
        induction concentration gradient of 0.1 / 0.25 / 0.5 / 1.0 mM was
        established. After 16 hours of cultivation at 16 &deg;C, a small amount
        of culture was lysed by sonication and subjected to small-scale
        purification by nickel affinity chromatography. The lysate and
        purification eluate were analyzed by Western blot with an anti-His
        primary antibody. The Western blot results confirmed that all three
        target proteins were successfully induced and expressed, and the optimal
        induction concentrations for SnoopTag2-sfGFP, SUMO-DogTag, and
        SnoopLigase2 were 0.1 mM, 0.1 mM, and 1.0 mM respectively (figure).
        Large-scale production then used the best conditions identified, with
        good expression results (figure).
      </p>
      {/* Two figures removed from the draft (induction gradient and larger-scale expression) */}
      <h3 className="mt-5 mb-3">
        Purification and dialysis of ligation-system proteins
      </h3>
      <p>
        The proteins obtained from large-scale production were purified by
        nickel affinity chromatography. The purified solutions of the three
        proteins were dialyzed using 3.5 kDa cutoff dialysis bags: the dialysis
        buffer for SnoopTag2-sfGFP and SUMO-DogTag was PBS, while SnoopLigase2
        was dialyzed against 25 mM TB buffer (pH 7.4) containing 20% (v/v)
        glycerol to preserve enzyme activity. The buffer was changed 3 times
        over 1 day of dialysis, and the equilibrated liquid inside the bag was
        collected. Protein concentrations were measured by the BCA method
        (figure). The final concentrations of the three protein solutions were:
      </p>
      <ul>
        <li>sfGFP-SnoopTag2 (30 kDa): 1.33 mg/mL</li>
        <li>SnoopLigase2 (12.9 kDa): 0.66 mg/mL</li>
        <li>SUMO-DogTag (14.7 kDa): 0.60 mg/mL</li>
      </ul>
      {/* One figure removed from the draft (BCA quantification) */}
      <h3 className="mt-5 mb-3">Ligation reaction</h3>
      <p>
        Based on the measured protein concentrations, a reaction system was
        assembled with a final concentration of 25 &micro;M for each of the
        three components, and the ligation reaction was carried out at room
        temperature (about 24 &deg;C). Samples were taken at 10 min / 30 min /
        60 min after assembling the system and boiled to stop the reaction; the
        individual components and the samples from different reaction times were
        analyzed by SDS-PAGE. The ligation reaction succeeded within 10 minutes
        (an obvious ligation-product band appeared), and the reaction went to
        completion within 1 hour (the band of the less abundant SUMO-DogTag
        disappeared). This shows that the ligation reaction is very fast and
        efficient.
      </p>
      {/* One figure removed from the draft (time-course SDS-PAGE) */}
      <h3 className="mt-5 mb-3">Ligation of SELP with the linker</h3>
      {/* Draft note (待补充3): this subsection is still to be supplemented */}
      {/* Draft fragment found here: "SELP标记 0.625" (an unplaced note/value) */}
    </>
  );
}
