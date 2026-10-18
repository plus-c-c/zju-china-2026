import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TransparentImage } from "../TransparentImage";
import "./SELP.css";

const STATIC_HOME = "https://static.igem.wiki/teams/6102/wiki/images/home";
const STATIC_GIF = "https://static.igem.wiki/teams/6102/wiki/gif";

export function DashedArrow({ className }: { className: string }) {
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
          <h2 className="nest-solution-ligase-title">Link system</h2>
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

function PipelineConnector({ variant }: { variant: "first" | "second" }) {
  const paths = {
    first:
      "M3.99805 0V159.302C3.99805 172.552 14.7376 183.292 27.9876 183.292H514.805C528.055 183.292 538.795 194.031 538.795 207.276V352.729",
    second:
      "M542.79 0V171.328C542.79 184.578 532.05 195.318 518.805 195.318H27.9876C14.7376 195.318 3.99805 206.057 3.99805 219.302V356.937",
  } as const;

  return (
    <svg
      aria-hidden="true"
      className={`selp-pipeline__connector selp-pipeline__connector--${variant}`}
      viewBox={
        variant === "first" ? "0 0 542.793 352.729" : "0 0 546.788 356.937"
      }
      preserveAspectRatio="none"
    >
      <path d={paths[variant]} transform="translate(12 12)" fill="none" stroke="#aac8ec"
        strokeLinecap="round" strokeLinejoin="round" strokeWidth="10" />
      <path d={paths[variant]} transform="translate(6 6)" fill="none" stroke="#6d9bd5"
        strokeLinecap="round" strokeLinejoin="round" strokeWidth="10" />
      <path d={paths[variant]} fill="none" stroke="#7eb5ff"
        strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
    </svg>
  );
}

function PipelineAnimation({
  alt,
  className,
  src,
  stopAtFirstFrame = false,
}: {
  alt: string;
  className: string;
  src: string;
  stopAtFirstFrame?: boolean;
}) {
  const [started, setStarted] = useState(false);
  const wasVisible = useRef(false);
  const [finished, setFinished] = useState(false);
  const durationRef = useRef(4800);
  const finishTimer = useRef(0);
  const [animationBlob, setAnimationBlob] = useState<Blob | null>(null);
  const [playbackSrc, setPlaybackSrc] = useState("");
  const [scrolling, setScrolling] = useState(false);
  const [visible, setVisible] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frozenRef = useRef(false);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const paused = scrolling || !visible || reduced;
  const freeze = () => {
    const image = imageRef.current, canvas = canvasRef.current;
    if (!image?.complete || !image.naturalWidth || !canvas) return;
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    canvas.getContext("2d")?.drawImage(image, 0, 0);
  };

  // Preserve a single playback and read its duration from the frame metadata.
  useEffect(() => {
    const controller = new AbortController();
    fetch(src, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error("Animation could not be loaded");
        return response.arrayBuffer();
      })
      .then(buffer => {
        const bytes = new Uint8Array(buffer);
        const view = new DataView(buffer);
        let duration = 0;
        for (let offset = 12; offset + 8 <= bytes.length;) {
          const size = view.getUint32(offset + 4, true);
          if (offset + 8 + size > bytes.length) break;
          if (String.fromCharCode(...bytes.subarray(offset, offset + 4)) === "ANIM" && size >= 6) {
            view.setUint16(offset + 12, 1, true);
          }
          if (String.fromCharCode(...bytes.subarray(offset, offset + 4)) === "ANMF" && size >= 16) {
            duration += bytes[offset + 20] + bytes[offset + 21] * 256 + bytes[offset + 22] * 65536;
          }
          offset += 8 + size + (size % 2);
        }
        durationRef.current = duration || 4800;
        const blob = new Blob([buffer], { type: "image/webp" });
        setAnimationBlob(blob);
        createImageBitmap(blob).then(image => {
          const canvas = canvasRef.current;
          if (canvas) {
            canvas.width = image.width; canvas.height = image.height;
            canvas.getContext("2d")?.drawImage(image, 0, 0);
          }
          image.close();
        }).catch(() => {});
      })
      .catch(() => { /* Keep the original image available if fetching fails. */ });
    return () => controller.abort();
  }, [src]);

  useEffect(() => {
    if (!animationBlob || !started) return;
    const url = URL.createObjectURL(animationBlob);
    setPlaybackSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [animationBlob, src, started]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // Activate only the module nearest the viewport center, rather than every
    // illustration that happens to intersect the screen at the same time.
    const stage = container.closest(".selp-pipeline__stage");
    const update = () => {
      const stages = [...document.querySelectorAll(".selp-pipeline__stage")];
      const center = innerHeight * 0.5;
      const nearest = stages.reduce<Element | null>((best, candidate) => {
        const bounds = candidate.getBoundingClientRect();
        if (bounds.bottom <= innerHeight * 0.15 || bounds.top >= innerHeight * 0.85) return best;
        if (!best) return candidate;
        const previous = best.getBoundingClientRect();
        return Math.abs(bounds.top + bounds.height / 2 - center)
          < Math.abs(previous.top + previous.height / 2 - center) ? candidate : best;
      }, null);
      setVisible(stage === nearest);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (wasVisible.current && !visible) {
      // Re-arm only when leaving the active module, not on every scroll pause.
      window.clearTimeout(finishTimer.current);
      setStarted(false);
      setPlaybackSrc("");
      setFinished(false);
    }
    wasVisible.current = visible;
  }, [visible]);

  useEffect(() => {
    if (!visible || scrolling || reduced || !animationBlob || started) return;
    const timer = window.setTimeout(() => setStarted(true), 120);
    return () => window.clearTimeout(timer);
  }, [visible, scrolling, reduced, animationBlob, started]);

  useEffect(() => () => window.clearTimeout(finishTimer.current), []);

  useEffect(() => {
    let timer = 0;
    const onScroll = () => {
      if (!frozenRef.current) { freeze(); frozenRef.current = true; }
      setScrolling(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        frozenRef.current = false;
        setScrolling(false);
      }, 350);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, []);


  return (
    <div ref={containerRef} data-home-preload-src={src} className={`${className} selp-pipeline__animation`} data-paused={finished ? stopAtFirstFrame : paused || !started} data-finished={finished} role="img" aria-label={alt}>
      <img ref={imageRef} src={started && playbackSrc ? playbackSrc : undefined} alt="" onLoad={() => {
        freeze();
        window.clearTimeout(finishTimer.current);
        finishTimer.current = window.setTimeout(() => setFinished(true), durationRef.current + 80);
      }} />
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}

const quickLinks = [
  {
    label: "Description",
    to: "/description",
    icon: `${STATIC_HOME}/shortcut-icons/description.avif`,
  },
  {
    label: "Design",
    to: "/design",
    icon: `${STATIC_HOME}/shortcut-icons/design.avif`,
  },
  {
    label: "Proof of Concept",
    to: "/proof-of-concept",
    icon: `${STATIC_HOME}/shortcut-icons/proof-of-concept.avif`,
  },
  {
    label: "Model",
    to: "/model",
    icon: `${STATIC_HOME}/shortcut-icons/model.avif`,
  },
  {
    label: "Entrepreneurship",
    to: "/entrepreneurship",
    icon: `${STATIC_HOME}/shortcut-icons/entrepreneurship.avif`,
  },
  {
    label: "Integrated Human Practice",
    to: "/human-practices",
    icon: `${STATIC_HOME}/shortcut-icons/human-practices.svg`,
  },
] as const;

const promotionDecorations = [
  ["orange-cell-lower-right", "orange-cell-lower-right.avif"],
  ["orange-molecule-upper-left", "orange-molecule-upper-left.avif"],
  ["cyan-particle-top", "cyan-particle-top.avif"],
  ["dna-left", "dna-left.avif"],
  ["white-cell-lower-right", "white-cell-lower-right.avif"],
  ["orange-cell-left", "orange-cell-left.avif"],
  ["green-cell-right", "green-cell-right.avif"],
  ["cyan-gear-upper-right", "cyan-gear-upper-right.avif"],
  ["cyan-gear-middle-right", "cyan-gear-middle-right.avif"],
] as const;

export function SelpPipeline() {
  const pipelineRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = pipelineRef.current;
    if (!root) return;
    let frame = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      frame = 0;
      root.querySelectorAll<HTMLElement>(".selp-pipeline__stage").forEach((stage) => {
        const bounds = stage.getBoundingClientRect();
        const progress = reduced.matches ? 1 : Math.max(0, Math.min(1, (innerHeight * 0.8 - bounds.top) / (bounds.height * 1.25)));
        stage.style.setProperty("--pipeline-reveal", String(progress));
        const connector = stage.querySelector<HTMLElement>(".selp-pipeline__connector");
        if (connector) {
          const lineBounds = connector.getBoundingClientRect();
          const lineProgress = reduced.matches ? 1 : Math.max(0, Math.min(1, (innerHeight * 0.8 - lineBounds.top) / Math.max(1, lineBounds.height * 1.5)));
          connector.style.clipPath = `inset(-18px -18px calc(${(1 - lineProgress) * 100}% - 18px) -18px)`;
        }
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  useEffect(() => {
    let animation = 0;
    let target = window.scrollY;
    let appliedScroll = window.scrollY;
    let previousTime = 0;
    let wheelDirection = 0;
    let reverseImpulse = 0;
    let lastWheelTime = 0;
    let initialImpulse = 0;
    const desktop = window.matchMedia("(min-width: 992px) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animate = (time: number) => {
      const pipeline = pipelineRef.current;
      const boundary = pipeline ? pipeline.getBoundingClientRect().top + window.scrollY - innerHeight * 1.6 + 2 : Infinity;
      if (window.scrollY < boundary - 2) { stop(); return; }
      // Native wheel/iframe/scrollbar movement owns the new position. Never
      // pull it back toward a target from a previous intercepted gesture.
      if (Math.abs(window.scrollY - appliedScroll) > 2) { stop(); return; }
      const elapsed = previousTime ? Math.min(50, time - previousTime) : 16;
      previousTime = time;
      const distance = target - window.scrollY;
      if (Math.abs(distance) < 0.8) {
        window.scrollTo({ top: target, behavior: "instant" });
        animation = 0;
        previousTime = 0;
        return;
      }
      const step = Math.sign(distance) * Math.min(Math.abs(distance), Math.max(1, Math.abs(distance) * (1 - Math.exp(-elapsed / 210))));
      window.scrollTo({ top: window.scrollY + step, behavior: "instant" });
      appliedScroll = window.scrollY;
      animation = requestAnimationFrame(animate);
    };
    const onWheel = (event: WheelEvent) => {
      if (event.defaultPrevented) {
        stop();
        return;
      }
      if (!desktop.matches || event.ctrlKey || reduced.matches || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (event.target instanceof Element && event.target.closest(".nest-navbar, input, textarea, select, [role=dialog]")) {
        stop();
        return;
      }
      const root = pipelineRef.current;
      if (!root) return;
      const bounds = root.getBoundingClientRect();
      const start = bounds.top + window.scrollY - innerHeight * 1.6 + 2;
      const inEntry = bounds.top > innerHeight * 0.25;
      if (window.scrollY < start - 2 || bounds.bottom <= 0) { stop(); return; }
      if (window.scrollY <= start + 2 && event.deltaY < 0) return;
      event.preventDefault();
      let delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
      const limit = document.documentElement.scrollHeight - innerHeight;
      if (!delta) return;
      const closingTop = root.querySelector(".selp-after-pipeline")?.getBoundingClientRect().top;
      const inClosing = closingTop !== undefined && closingTop < innerHeight * 0.85;
      const now = performance.now();
      const direction = Math.sign(delta);
      const freshGesture = now - lastWheelTime > 280;
      lastWheelTime = now;
      if (!animation) {
        if (freshGesture || Math.sign(initialImpulse) !== direction) initialImpulse = 0;
        initialImpulse += delta;
        // A resting section needs intentional input before starting to move.
        if (Math.abs(initialImpulse) < (inClosing ? 40 : 20)) return;
        delta = initialImpulse;
        initialImpulse = 0;
      }
      if (freshGesture || !wheelDirection) {
        wheelDirection = direction;
        reverseImpulse = 0;
      } else if (direction !== wheelDirection) {
        reverseImpulse += Math.abs(delta);
        // Ignore tiny opposite impulses at the tail of a trackpad gesture.
        if (reverseImpulse < (inClosing ? 88 : 32)) return;
        wheelDirection = direction;
        reverseImpulse = 0;
        target = window.scrollY;
      } else reverseImpulse = 0;
      if (!animation || Math.abs(window.scrollY - appliedScroll) > 2) {
        target = window.scrollY;
        appliedScroll = window.scrollY;
      }
      // Do not let an old inertia target pull against the accepted wheel intent.
      target = direction > 0 ? Math.max(target, window.scrollY) : Math.min(target, window.scrollY);
      const proposed = target + delta * (inEntry ? 0.22 : inClosing ? 0.23 : 0.32);
      // Keep closing links/video deliberate without changing the module scroll.
      const lead = innerHeight * (inEntry ? 0.14 : inClosing ? 0.16 : 0.22);
      target = Math.max(start, Math.min(limit, Math.max(window.scrollY - lead, Math.min(window.scrollY + lead, proposed))));
      if (!animation) animation = requestAnimationFrame(animate);
    };
    const stop = () => {
      cancelAnimationFrame(animation);
      animation = 0;
      previousTime = 0;
      target = window.scrollY;
      appliedScroll = window.scrollY;
      initialImpulse = 0;
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("pointerdown", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
    window.addEventListener("home-story-seek", stop);
    return () => {
      stop();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerdown", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("home-story-seek", stop);
    };
  }, []);
  return (
    <main
      ref={pipelineRef}
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
          <PipelineAnimation
            stopAtFirstFrame
            className="selp-pipeline__art selp-pipeline__art--magnetic-network"
            src={`${STATIC_GIF}/magnetic-nanoparticle-chain-assembly.webp`}
            alt="Magnetically aligned SELP network"
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
          <PipelineConnector variant="first" />
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
          <PipelineAnimation
            className="selp-pipeline__art selp-pipeline__art--gag-chain"
            src={`${STATIC_GIF}/selp-chain-original-pink-zoom.webp`}
            alt="GAG-binding SELP peptide chain"
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
          <PipelineConnector variant="second" />
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
          <PipelineAnimation
            className="selp-pipeline__art selp-pipeline__art--liposome"
            src={`${STATIC_GIF}/selp-liposome-zoom-blue-elements.webp`}
            alt="Mitochondria-loaded liposome"
          />
          <PipelinePill
            label="About Delivery"
            to="/design#3-4-module-3-mmp-13-responsive-mitochondrial-delivery-linking-local-response-to-cellular-support"
          />
        </section>

        <section
          className="selp-after-pipeline"
          aria-label="Explore the NEST project"
        >
          <nav className="selp-shortcuts" aria-label="Project shortcuts">
            {quickLinks.map((item) => (
              <Link className="selp-shortcut" key={item.to} to={item.to}>
                <TransparentImage
                  alt=""
                  ariaHidden
                  src={item.icon}
                  whiteThreshold={240}
                  opaqueThreshold={222}
                />

                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <section
            className="selp-promotion"
            aria-labelledby="promotion-video-title"
          >
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
                src={`${STATIC_HOME}/promotion/${fileName}`}
              />
            ))}
          </section>
        </section>
      </div>
    </main>
  );
}
