import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SELP.css";

const STATIC_HOME = "https://static.igem.wiki/teams/6102/wiki/images/home";
const STATIC_GIF = "https://static.igem.wiki/teams/6102/wiki/gif";

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
  { label: "Description", to: "/description", icon: "document" },
  { label: "Design", to: "/design", icon: "design" },
  {
    label: "Proof of Concept",
    to: "/proof-of-concept",
    icon: "proof",
  },
  { label: "Model", to: "/model", icon: "model" },
  {
    label: "Entrepreneurship",
    to: "/entrepreneurship",
    icon: "business",
  },
  {
    label: "Integrated Human Practice",
    to: "/human-practices",
    icon: "people",
  },
] as const;

function ShortcutIcon({ type }: { type: (typeof quickLinks)[number]["icon"] }) {
  const paths = {
    document: <path d="M7 3h8l4 4v14H7zM15 3v5h5M10 12h6m-6 4h6m-6 4h4" />,
    design: <path d="m4 19 4-1 10-10-3-3L5 15l-1 4Zm9-12 3 3M12 21h9M5 5l3 3" />,
    proof: <path d="M4 5h16v15H4zM8 5V2m8 3V2M8 9h3v3H8zm5 0h3v3h-3zm-5 5h3v3H8zm5 0h3v3h-3z" />,
    model: <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 0v9m8-4.5-8 4.5-8-4.5m8 4.5v9" />,
    business: <path d="M4 10h16v10H4zM9 10V7h6v3M4 14h16M10 14v2h4v-2" />,
    people: <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-1a3 3 0 1 0 0-6M2 21v-3c0-3 3-5 7-5s7 2 7 5v3m1-8c3 0 5 2 5 4v3" />,
  } as const;

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      {paths[type]}
    </svg>
  );
}

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
                <ShortcutIcon type={item.icon} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <section className="selp-promotion" aria-labelledby="promotion-video-title">
            <div className="selp-promotion__heading">
              <span aria-hidden="true" className="selp-promotion__line" />
              <h2 id="promotion-video-title">Promotion Video</h2>
              <span aria-hidden="true" className="selp-promotion__line" />
            </div>
            <div className="selp-promotion__bird" aria-hidden="true">
              <img src="/images/home/home-heading-bird.png" alt="" />
            </div>
            <span className="selp-promotion__ornament selp-promotion__ornament--one" aria-hidden="true" />
            <span className="selp-promotion__ornament selp-promotion__ornament--two" aria-hidden="true" />
            <span className="selp-promotion__ornament selp-promotion__ornament--three" aria-hidden="true" />
            <div className="selp-promotion__frame">
              <iframe
                src="https://video.igem.org/videos/embed/6626b25e-37f5-4fbc-8f49-a9897496b6b0"
                title="ZJU-China NEST promotion video"
                loading="lazy"
                allow="fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
