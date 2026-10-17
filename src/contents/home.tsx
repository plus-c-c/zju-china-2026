import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { HomeIntro } from "../components/home/HomeIntro";
import { BubbleAwareness } from "../components/home/OpeningStory";
import {
  OsteoarthritisTargetScene,
  SelpAndSnoopLigaseScene,
  SelpPipeline,
} from "../components/home/SELP";
import { HydrogelMaterialsPage } from "../components/home/HydrogelMaterialsPage";
import { MaterialLimitations } from "../components/home/LimitationsCards";
import { Footer } from "../components/Footer";
import "../components/home/Layers.css";
import "./home.css";

function FlowScene({ children, className = "" }: { children: ReactNode; className?: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / 1280));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={frame}
      className={`home-flow-scene ${className}`}
      style={{ height: 720 * scale }}
    >
      <div
        className="home-flow-scene__canvas"
        style={{ transform: `translateX(-50%) scale(${scale})` }}
      >
        {children}
      </div>
    </section>
  );
}

function LimitationsDrawScene() {
  const section = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(
        Math.min(
          1,
          entry.contentRect.width / 1280,
          entry.contentRect.height / 720,
        ),
      );
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    const update = () => {
      animationFrame = 0;
      const element = section.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const distance = Math.max(1, element.offsetHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -rect.top / distance)));
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section ref={section} className="home-card-draw" aria-label="Material limitations and solutions">
      <div ref={frame} className="home-card-draw__sticky">
        <div
          className="home-card-draw__canvas"
          style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        >
          <MaterialLimitations drawProgress={progress} />
        </div>
      </div>
    </section>
  );
}

export function Home() {
  const bubbleSection = useRef<HTMLDivElement>(null);
  const enterStory = useCallback(() => {
    bubbleSection.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <main className="nest-home">
      <section className="home-intro-section">
        <HomeIntro onEnter={enterStory} />
      </section>
      <div ref={bubbleSection}>
        <BubbleAwareness />
      </div>
      <FlowScene className="home-flow-scene--hydrogel">
        <HydrogelMaterialsPage />
      </FlowScene>
      <LimitationsDrawScene />
      <FlowScene className="home-flow-scene--selp">
        <SelpAndSnoopLigaseScene />
      </FlowScene>
      <FlowScene className="home-flow-scene--selp">
        <OsteoarthritisTargetScene />
      </FlowScene>
      <SelpPipeline />
      <Footer />
    </main>
  );
}
