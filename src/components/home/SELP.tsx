import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SELP.css";

const STATIC_HOME = "https://static.igem.wiki/teams/6102/wiki/images/home";
const STATIC_GIF = "https://static.igem.wiki/teams/6102/wiki/gif";
const LOCAL_HOME = `${import.meta.env.BASE_URL}images/home`;

function DashedArrow({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 380 217"
      fill="none"
    >
      <path
        d="M18 24c38 85 109 73 122 24 10-39 60-31 50 17-10 50 55 80 130 7"
        stroke="#1f2126"
        strokeWidth="3"
        strokeDasharray="8 8"
        strokeLinecap="round"
      />
      <path
        d="m311 69 14 2-6 13"
        stroke="#1f2126"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SelpAndSnoopLigaseScene() {
  return (
    <div
      className="nest-solution-scene nest-solution-scene--selp"
      data-node-id="909:5"
      data-name="Page 01 · SELP / SnoopLigase-ZJU"
    >
      <div className="nest-solution-design">
        <div className="nest-solution-background" aria-hidden="true" />

        <article className="nest-solution-card nest-solution-card--selp">
          <h2 className="nest-solution-selp-title">S E L P</h2>
          <p className="nest-solution-selp-subtitle">
            (Silk-elastin-like protein)
          </p>
          <p className="nest-solution-selp-copy">
            Optimizing the 2KY5/2KY10 ratio enables model-guided control of
            strength and toughness to mimic natural cartilage.
          </p>
          <Link
            className="nest-solution-button nest-solution-button--selp"
            to="/design#1-programmable-material-foundation-the-selp-scaffold"
          >
            learn more
          </Link>
        </article>

        <article className="nest-solution-card nest-solution-card--ligase">
          <h2 className="nest-solution-ligase-title">Linker System</h2>
          <p className="nest-solution-ligase-copy">
            An engineered linker system enables modular functionalization of
            SELP for targeted cartilage repair.
          </p>
          <Link
            className="nest-solution-button nest-solution-button--ligase"
            to="/design#2-standardized-interface-decoupling-functional-assembly-from-scaffold-design"
          >
            learn more
          </Link>
        </article>

        <img
          alt="SELP peptide chain"
          className="nest-solution-selp-chain"
          decoding="async"
          loading="lazy"
          src={`https://static.igem.wiki/teams/6102/wiki/gif/selp-chain-gentle-wobble.webp`}
        />
        <DashedArrow className="nest-solution-arrow nest-solution-arrow--upper" />
        <DashedArrow className="nest-solution-arrow nest-solution-arrow--lower" />

        <div className="nest-solution-functionalized-chain" aria-hidden="true">
          <img
            alt=""
            decoding="async"
            loading="lazy"
            src={`${STATIC_GIF}/last-gif.webp`}
          />
        </div>
      </div>
    </div>
  );
}

export function OsteoarthritisTargetScene() {
  return (
    <div
      className="nest-solution-scene nest-solution-scene--oa"
      data-node-id="909:8"
      data-name="Page 02 · Osteoarthritis target"
    >
      <div className="nest-solution-design">
        <div className="nest-solution-background" aria-hidden="true" />
        <p className="oa-intro">
          We chose{" "}
          <strong className="oa-intro__target">osteoarthritis (OA)</strong>, one
          of the most
          <strong> prevalent</strong> and widely studied forms of hyaline
          cartilage damage, as our therapeutic target to demonstrate NEST’s
          potential as <strong>a versatile biomaterial platform</strong>.
        </p>
        <div className="oa-panel">
          <img
            alt="Osteoarthritis vicious cycle: cartilage loss, mechanical imbalance, and elevated inflammation"
            className="oa-cycle-image"
            decoding="async"
            loading="lazy"
            src={`${STATIC_HOME}/threecycles.avif`}
          />
          <div className="oa-panel-copy">
            <p>
              In osteoarthritis, mechanical imbalance, matrix loss, and impaired
              cellular function reinforce one another—a cycle that is difficult
              to resolve using conventional approaches.
            </p>
            <p>
              We have designed <strong>three functional modules</strong> to{" "}
              <strong>break this vicious cycle</strong> within the
              microenvironment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const PIPELINE_ASSETS = "https://static.igem.wiki/teams/6102/wiki/images/home";

function PipelinePill({ label, to }: { label: string; to: string }) {
  return (
    <Link className="selp-pipeline__pill" to={to}>
      {label}
    </Link>
  );
}

function LoopingPipelineGif({
  alt,
  className,
  duration,
  src,
}: {
  alt: string;
  className: string;
  duration: number;
  src: string;
}) {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setCycle((current) => (current + 1) % 2),
      duration,
    );
    return () => window.clearInterval(timer);
  }, [duration]);

  return (
    <img
      key={cycle}
      className={className}
      src={`${src}?cycle=${cycle}`}
      alt={alt}
    />
  );
}

const quickLinks = [
  {
    label: "Description",
    to: "/description",
    icon: "description.png",
  },
  {
    label: "Design",
    to: "/design",
    icon: "design.png",
  },
  {
    label: "Proof of Concept",
    to: "/proof-of-concept",
    icon: "proof-of-concept.png",
  },
  {
    label: "Model",
    to: "/model",
    icon: "model.png",
  },
  {
    label: "Entrepreneurship",
    to: "/entrepreneurship",
    icon: "entrepreneurship.png",
  },
  {
    label: "Integrated Human Practice",
    to: "/human-practices",
    icon: "human-practices.svg",
  },
] as const;

const promotionDecorations = [
  ["orange-cell-lower-right", "orange-cell-lower-right.png"],
  ["orange-molecule-upper-left", "orange-molecule-upper-left.png"],
  ["cyan-particle-top", "cyan-particle-top.png"],
  ["blue-bird-lower-left", "blue-bird-lower-left.png"],
  ["blue-bird-top", "blue-bird-top.png"],
  ["dna-left", "dna-left.png"],
  ["white-cell-lower-right", "white-cell-lower-right.png"],
  ["orange-cell-left", "orange-cell-left.png"],
  ["green-cell-right", "green-cell-right.png"],
  ["cyan-gear-upper-right", "cyan-gear-upper-right.png"],
  ["cyan-gear-middle-right", "cyan-gear-middle-right.png"],
] as const;

export function SelpPipeline() {
  return (
    <main
      className="selp-pipeline"
      data-node-id="985:5"
      aria-label="NEST therapeutic modules"
    >
      <div className="selp-pipeline__canvas">
        <section
          className="selp-pipeline__stage selp-pipeline__stage--magnetic"
          data-node-id="985:6"
        >
          <article className="selp-pipeline__card">
            <h2>Magnetically Responsive Anisotropy Module</h2>
            <p>
              Under an external magnetic field, these peptides guide SELP to
              form anisotropic structures, helping restore mechanical balance.
            </p>
          </article>
          <LoopingPipelineGif
            className="selp-pipeline__art selp-pipeline__art--magnetic-network"
            src={`${STATIC_GIF}/magnetic-nanoparticle-chain-assembly.webp`}
            alt="Magnetically aligned SELP network"
            duration={4800}
          />
          <img
            className="selp-pipeline__art selp-pipeline__art--purple-flask"
            src={`${PIPELINE_ASSETS}/pipeline-8ada8.avif`}
            alt=""
          />
          <img
            className="selp-pipeline__art selp-pipeline__art--purple-vial"
            src={`${PIPELINE_ASSETS}/pipeline-98a2f.avif`}
            alt=""
          />
          <PipelinePill
            label="About Anisotropy"
            to="/design#3-2-module-1-magnetically-responsive-anisotropy-directional-load-bearing"
          />
          <img
            className="selp-pipeline__connector selp-pipeline__connector--first"
            src={`${PIPELINE_ASSETS}/pipeline-02-03.svg`}
            alt=""
          />
        </section>

        <section
          className="selp-pipeline__stage selp-pipeline__stage--gag"
          data-node-id="985:35"
        >
          <article className="selp-pipeline__card">
            <h2>GAG Retention Module</h2>
            <p>
              Through electrostatic interactions, these peptides prevent
              glycosaminoglycan (GAG) loss and promote cartilage self-repair,
              addressing matrix depletion.
            </p>
          </article>
          <LoopingPipelineGif
            className="selp-pipeline__art selp-pipeline__art--gag-chain"
            src={`${STATIC_GIF}/selp-chain-original-pink-zoom.webp`}
            alt="GAG-binding SELP peptide chain"
            duration={5600}
          />
          <img
            className="selp-pipeline__art selp-pipeline__art--pink-vial"
            src={`${PIPELINE_ASSETS}/pipeline-4567c.avif`}
            alt=""
          />
          <img
            className="selp-pipeline__art selp-pipeline__art--gag-reactor"
            src={`${PIPELINE_ASSETS}/pipeline-b9107.avif`}
            alt=""
          />
          <PipelinePill
            label="About GAG"
            to="/design#3-3-module-2-cpc-link-n-maintaining-matrix-retention-and-renewal"
          />
          <img
            className="selp-pipeline__connector selp-pipeline__connector--second"
            src={`${PIPELINE_ASSETS}/pipeline-03-04.svg`}
            alt=""
          />
        </section>

        <section
          className="selp-pipeline__stage selp-pipeline__stage--mitochondrial"
          data-node-id="985:68"
        >
          <article className="selp-pipeline__card">
            <h2>Mitochondrial Therapeutic Module</h2>
            <p>
              Liposomes deliver mitochondria to enhance immune function and
              address cellular degeneration. The system also enables
              personalized delivery of other molecules, such as drugs and
              cytokines, according to individual patient needs.
            </p>
          </article>
          <img
            className="selp-pipeline__art selp-pipeline__art--mito-reactor"
            src={`${PIPELINE_ASSETS}/b8418.avif`}
            alt=""
          />
          <img
            className="selp-pipeline__art selp-pipeline__art--yellow-vial"
            src={`${PIPELINE_ASSETS}/pipeline-fabb3.avif`}
            alt=""
          />
          <LoopingPipelineGif
            className="selp-pipeline__art selp-pipeline__art--liposome"
            src={`${STATIC_GIF}/selp-liposome-zoom-blue-elements.webp`}
            alt="Mitochondria-loaded liposome"
            duration={4640}
          />
          <PipelinePill
            label="About Delivery"
            to="/design#3-4-module-3-mmp-13-responsive-mitochondrial-delivery-linking-local-response-to-cellular-support"
          />
        </section>

        <section className="selp-after-pipeline" aria-label="Explore the NEST project">
          <nav className="selp-shortcuts" aria-label="Project shortcuts">
            {quickLinks.map((item) => (
              <Link className="selp-shortcut" key={item.to} to={item.to}>
                <img
                  aria-hidden="true"
                  alt=""
                  src={`${LOCAL_HOME}/shortcut-icons/${item.icon}`}
                />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <section className="selp-promotion" aria-labelledby="promotion-video-title">
            <div className="selp-promotion__depth" aria-hidden="true" />
            <div className="selp-promotion__border" aria-hidden="true" />
            <div className="selp-promotion__frame">
              <iframe
                src="https://video.igem.org/videos/embed/6626b25e-37f5-4fbc-8f49-a9897496b6b0"
                title="ZJU-China NEST promotion video"
                loading="lazy"
                allow="fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h2 id="promotion-video-title">Promotion Video</h2>
            {promotionDecorations.map(([className, fileName]) => (
              <img
                alt=""
                aria-hidden="true"
                className={`selp-promotion__decoration selp-promotion__decoration--${className}`}
                key={fileName}
                src={`${LOCAL_HOME}/promotion/${fileName}`}
              />
            ))}
          </section>
        </section>
      </div>
    </main>
  );
}
