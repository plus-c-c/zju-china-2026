import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import "./get-your-nest.css";

const inquiryOptions = [
  "Research collaboration",
  "Clinical / hospital partnership",
  "CDMO / manufacturing",
  "Investment / business development",
  "Something else",
];

const productAreas = [
  {
    id: "core",
    title: "NEST core hydrogel",
    text: "A sequence-programmable SELP backbone with SnoopTag2 interfaces, designed to fill irregular focal cartilage defects and gel in situ under visible light.",
  },
  {
    id: "modules",
    title: "Functional modules",
    text: "Magnetic anisotropy, GAG retention and mitochondrial delivery are being developed as separate add-ons that can be selected for different repair needs.",
  },
  {
    id: "delivery",
    title: "Preparation & delivery",
    text: "The proposed product system includes formulation selection, component verification, a preparation device and clinician-facing operating guidance.",
  },
];

export function GetYourNest() {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleArea = (id: string) => {
    setSelectedAreas((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article className="gyn-page">
          <section className="gyn-hero">
            <p className="gyn-hero-title">Get Your NEST</p>
            <p className="gyn-lede">
              NEST is a programmable, modular protein-hydrogel platform for
              focal cartilage repair. We are building the first product around
              the SELP&ndash;SnoopTag2 hydrogel and a shared set of functional
              interfaces.
            </p>
            <div className="gyn-actions">
              <a className="gyn-button" href="#inquiry">
                Start an inquiry
              </a>
              <Link className="gyn-button gyn-button--quiet" to="/proof-of-concept">
                See the concept
              </Link>
            </div>
          </section>

          <aside className="gyn-notice">
            <strong>This is a concept inquiry page, not an online store.</strong>{" "}
            NEST has not received marketing approval and is not available for
            clinical use. We do not process orders, payments or personal data
            here.
          </aside>

          <section className="gyn-section" aria-labeledby="gyn-offer">
            <div className="gyn-section-heading">
              <h2 id="gyn-offer">One scaffold. Configurable repair.</h2>
            </div>
            <p>
              A cartilage defect is not a single clinical problem. NEST is being
              designed as a platform that can tune material properties and
              combine functions without developing a new material for every
              indication.
            </p>
            <div className="gyn-grid">
              {productAreas.map((area) => (
                <label
                  className={`gyn-card${selectedAreas.includes(area.id) ? " is-selected" : ""}`}
                  key={area.id}
                >
                  <input
                    type="checkbox"
                    checked={selectedAreas.includes(area.id)}
                    onChange={() => toggleArea(area.id)}
                  />
                  <span className="gyn-card-check" aria-hidden="true" />
                  <span className="gyn-card-title">{area.title}</span>
                  <span className="gyn-card-text">{area.text}</span>
                </label>
              ))}
            </div>
            <p className="gyn-small">
              Select the areas relevant to your inquiry. Selections stay in this
              browser and are not sent anywhere.
            </p>
          </section>

          <section className="gyn-section gyn-inquiry" id="inquiry" aria-labeledby="gyn-inquiry-title">
            <div className="gyn-section-heading">
              <h2 id="gyn-inquiry-title">Inquiry form</h2>
            </div>
            <p>
              Tell us who you are and which part of the NEST platform you would
              like to discuss. This demo form validates locally and does not
              transmit or store your message.
            </p>

            {submitted ? (
              <div className="gyn-confirmation" role="status">
                <strong>Inquiry prepared.</strong>
                <p>
                  Thank you. A real submission channel is not connected yet, so
                  nothing has been sent or stored. Please continue through our{" "}
                  <Link to="/members">team page</Link>.
                </p>
                {selectedAreas.length > 0 && (
                  <p>
                    Selected areas:{" "}
                    {productAreas
                      .filter((area) => selectedAreas.includes(area.id))
                      .map((area) => area.title)
                      .join(", ")}
                    .
                  </p>
                )}
                <button
                  className="gyn-button gyn-button--quiet"
                  type="button"
                  onClick={() => setSubmitted(false)}
                >
                  Edit inquiry
                </button>
              </div>
            ) : (
              <form className="gyn-form" onSubmit={handleSubmit}>
                <div className="gyn-field-row">
                  <label>
                    First name
                    <input name="firstName" autoComplete="given-name" required />
                  </label>
                  <label>
                    Last name
                    <input name="lastName" autoComplete="family-name" required />
                  </label>
                </div>
                <div className="gyn-field-row">
                  <label>
                    Email
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@organization.org"
                      required
                    />
                  </label>
                  <label>
                    Organization
                    <input name="organization" autoComplete="organization" />
                  </label>
                </div>
                <div className="gyn-field-row">
                  <label>
                    Phone
                    <input name="phone" type="tel" autoComplete="tel" />
                  </label>
                  <label>
                    Inquiry about
                    <select name="topic" defaultValue="">
                      <option value="" disabled>
                        Select an area
                      </option>
                      {inquiryOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="gyn-message">
                  Message
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us about your organization, the question you are working on, and what you would like to discuss."
                    required
                  />
                </label>
                <div className="gyn-form-footer">
                  <p className="gyn-small">
                    This page is a demonstration. It does not create an order
                    or establish a commercial relationship.
                  </p>
                  <button className="gyn-button" type="submit">
                    Prepare inquiry
                  </button>
                </div>
              </form>
            )}
          </section>

        </article>
      </div>
    </div>
  );
}
