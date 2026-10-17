export function SoftwareOverview() {
  return (
    <>
      <h2 className="mt-5 mb-3">Software</h2>
      <h3 className="mt-5 mb-3">Overview</h3>
      <h4 className="mt-4 mb-3">Background and motivation</h4>
      <p>
        This project focuses on an injectable <strong>SELP</strong> (
        <strong>silk-elastin-like protein</strong>) hydrogel delivery system.
        SELP combines the strength of silk with the flexibility of elastin, and
        together with the <strong>spider silk protein (sPS)</strong> mechanical
        backbone, the ruthenium-based (<strong>Ru</strong>) photoinitiated
        crosslinking unit, and the <strong>PBS</strong> buffer phase it forms
        the <strong>PBS&ndash;SELP&ndash;Ru&ndash;sPS</strong> functional module
        — a modular, tunable, injectable material system (see the general
        instructions in the Injection Module for the role of each module).
      </p>
      <p>
        This freely combinable material system poses one core question to each
        of two user groups:
      </p>
      <ul>
        <li>
          Researchers: how does a SELP sequence behave mechanically after
          crosslinking? How do crosslink density, strain, and an applied
          magnetic field change the overall response?
        </li>
        <li>
          Clinicians: given a specific formulation, how should it be selected,
          prepared, and injected to guarantee safety?
        </li>
      </ul>
      <p>
        The two software tools answer these two questions respectively. Software
        I, the <strong>SELP</strong> molecular dynamics simulation platform,
        serves researchers and organizes simulation steps into a workflow that
        can be viewed and modified at any time, supporting researchers in
        predicting material behavior and explaining it. Software II,{" "}
        <strong>NEST Software</strong> (the clinician application), serves the
        clinic and guides clinicians step by step through material selection,
        preparation, and injection.
      </p>
      <p>
        The two tools differ in users, usage scenarios, and operation, so they
        are presented separately below.
      </p>
    </>
  );
}
