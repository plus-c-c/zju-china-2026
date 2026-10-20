import type { ReactNode } from "react";
import "./sponsors.css";

interface SponsorEntryProps {
  id: string;
  name: string;
  image: string;
  width: number;
  height: number;
  photograph?: boolean;
  children: ReactNode;
}

function SponsorEntry({
  id,
  name,
  image,
  width,
  height,
  photograph = false,
  children,
}: SponsorEntryProps) {
  return (
    <section
      className={`sponsors-entry${photograph ? " sponsors-entry--photograph" : ""}`}
      aria-labelledby={id}
    >
      <div className="sponsors-entry__media">
        <img
          src={image}
          alt={photograph ? name : `${name} logo`}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="sponsors-entry__content">
        <h3 id={id} data-toc-depth="1">
          {name}
        </h3>
        {children}
      </div>
    </section>
  );
}

// Based on material/SPONSORS/Sponsors.md; copy edits approved by the team.
export function Sponsors() {
  return (
    <article className="sponsors-page">
      <section
        className="sponsors-introduction"
        aria-labelledby="sponsors-introduction"
      >
        <h2 id="sponsors-introduction" data-toc="exclude">
          Every Contribution Matters.
          <br />
          Every Partnership Drives Innovation.
        </h2>
        <p>
          ZJU-China thanks the colleges, academic and research institutions at
          Zhejiang University, and the companies and organizations that have
          supported our project.
        </p>
      </section>
      <section
        className="sponsors-section"
        aria-labelledby="sponsors-special-thanks"
      >
        <h2
          id="sponsors-special-thanks"
          data-toc-label="College of Life Sciences, Zhejiang University"
        >
          Special Thanks to{" "}
          <br />
          the College of Life Sciences, Zhejiang University
        </h2>
        <div className="sponsors-entry sponsors-entry--special">
          <div className="sponsors-entry__media">
            <img
              src="https://static.igem.wiki/teams/6102/wiki/images/footer/001.avif"
              alt="College of Life Sciences, Zhejiang University logo"
              width={1206}
              height={330}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="sponsors-entry__content">
            <p>
              We thank the{" "}
              <strong>College of Life Sciences, Zhejiang University</strong> for
              providing funding, faculty mentorship, and support for team
              administration throughout our project.
            </p>
          </div>
        </div>
      </section>
      <section
        className="sponsors-section"
        aria-labelledby="sponsors-long-term"
      >
        <h2 id="sponsors-long-term" data-toc="exclude">
          Gratitude for Long-Term Support
        </h2>
        <SponsorEntry
          id="sponsors-education-foundation"
          name="Zhejiang University Education Foundation"
          image="https://static.igem.wiki/teams/6102/wiki/images/footer/zhejiang-university-education-foundation.avif"
          width={1520}
          height={990}
          photograph
        >
          <p>
            We thank the Zhejiang University Education Foundation for its
            financial support of ZJU-China and its continued commitment to our
            team's development.
          </p>
        </SponsorEntry>
        <SponsorEntry
          id="sponsors-biology-education-center"
          name="National Demonstration Center for Experimental Biology Education, Zhejiang University"
          image="https://static.igem.wiki/teams/6102/wiki/images/footer/national-demonstration-center-for-experimental-biology-education-zhejiang-university.avif"
          width={1512}
          height={988}
          photograph
        >
          <p>
            We thank the National Demonstration Center for Experimental Biology
            Education, Zhejiang University, for providing laboratory space for
            ZJU-China's experimental work.
          </p>
        </SponsorEntry>
      </section>
      <section
        className="sponsors-section"
        aria-labelledby="sponsors-corporate-partners"
      >
        <h2 id="sponsors-corporate-partners" data-toc="exclude">
          Our Partners
        </h2>
        <p>
          We acknowledge the following companies and organizations for their
          support and their contributions to the research tools and resources
          available to the life sciences community.
        </p>
        <SponsorEntry
          id="sponsors-genscript"
          name="GenScript"
          image="https://static.igem.wiki/teams/6102/wiki/images/footer/01-genscript.avif"
          width={856}
          height={318}
        >
          <p>
            <a
              href="https://www.genscript.com/"
              target="_blank"
              rel="noreferrer"
            >
              GenScript
            </a>{" "}
            is a global biotechnology company that provides life science
            research products and services, including gene synthesis and
            molecular biology solutions. Its offerings support researchers
            working in genetic engineering and related experimental fields.
          </p>
          <p>
            We thank GenScript for supporting our project.
          </p>
        </SponsorEntry>
        <SponsorEntry
          id="sponsors-yanyin-technology"
          name="Yanyin Technology"
          image="https://static.igem.wiki/teams/6102/wiki/images/footer/02-yanyin.avif"
          width={420}
          height={342}
        >
          <p>
            We thank{" "}
            <a
              href="https://www.yanyin.tech/company/"
              target="_blank"
              rel="noreferrer"
            >
              Yanyin Technology
            </a>{" "}
            for its support and assistance to ZJU-China.
          </p>
        </SponsorEntry>
        <SponsorEntry
          id="sponsors-cusabio"
          name="CUSABIO"
          image="https://static.igem.wiki/teams/6102/wiki/images/footer/03-cusabio-huamei.avif"
          width={856}
          height={354}
        >
          <p>
            <a href="https://www.cusabio.com/" target="_blank" rel="noreferrer">
              CUSABIO
            </a>{" "}
            provides a range of life science research products, including
            recombinant proteins, antibodies, and ELISA kits. These products
            serve as research tools for experimental studies in biology and
            biomedicine.
          </p>
          <p>
            We thank CUSABIO for supporting our project.
          </p>
        </SponsorEntry>
        <SponsorEntry
          id="sponsors-twist-bioscience"
          name="Twist Bioscience"
          image="https://static.igem.wiki/teams/6102/wiki/images/footer/04-twist-bioscience.avif"
          width={752}
          height={398}
        >
          <p>
            <a
              href="https://www.twistbioscience.com/"
              target="_blank"
              rel="noreferrer"
            >
              Twist Bioscience
            </a>{" "}
            develops synthetic DNA technologies and related research tools. Its
            technologies support applications in healthcare, agriculture, and
            industrial biotechnology, creating new possibilities for genetic
            engineering and synthetic biology research.
          </p>
          <p>
            Through its partnership with iGEM, Twist Bioscience offers each
            2026 team 20 kb of free DNA synthesis, available as Gene Fragments
            or Express Clonal Genes. We thank Twist Bioscience for making this
            resource available to iGEM teams. See the{" "}
            <a
              href="https://competition.igem.org/sponsorships"
              target="_blank"
              rel="noreferrer"
            >
              official iGEM sponsorship offer
            </a>{" "}
            for details.
          </p>
        </SponsorEntry>
        <SponsorEntry
          id="sponsors-biorender"
          name="BioRender"
          image="https://static.igem.wiki/teams/6102/wiki/images/footer/05-biorender.avif"
          width={858}
          height={324}
        >
          <p>
            <a
              href="https://www.biorender.com/"
              target="_blank"
              rel="noreferrer"
            >
              BioRender
            </a>{" "}
            is a scientific illustration platform designed for the life
            sciences. It helps researchers communicate biological mechanisms,
            experimental designs, and scientific findings through clear and
            intuitive visualizations.
          </p>
          <p>
            We acknowledge BioRender's contribution to scientific visualization
            and communication.
          </p>
        </SponsorEntry>
        <SponsorEntry
          id="sponsors-addgene"
          name="Addgene"
          image="https://static.igem.wiki/teams/6102/wiki/images/footer/06-addgene.avif"
          width={762}
          height={268}
        >
          <p>
            <a href="https://www.addgene.org/" target="_blank" rel="noreferrer">
              Addgene
            </a>{" "}
            is a nonprofit scientific repository dedicated to facilitating the
            sharing and distribution of plasmids and other molecular biology
            research resources.
          </p>
          <p>
            We acknowledge Addgene's work in making research materials available
            to the scientific community.
          </p>
        </SponsorEntry>
      </section>
    </article>
  );
}
