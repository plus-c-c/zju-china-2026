import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { BIRD_ARTWORK_HEADING } from "./flightHeading";
import "./MobileStoryBird.css";

const media = "https://static.igem.wiki/teams/6102/wiki/home-opening/";

// Positions are relative to mobile content, never to the desktop scene canvas.
const perches: [string, number, number][] = [
  [".home-intro__bird-anchor", 0.5, 1],
  [".opening-bubble--hyaline", 0.23, 0.08],
  [".opening-burden__stat strong", 0.8, 0.1],
  [".opening-sports__person", 0.8, 0.15],
  [".opening-rehab__person", 0.8, 0.15],
  [".hydrogel-materials-page__button", 0.9, 0],
  [".limitations-card", 0.88, 0.02],
  [".mobile-home__nest > img", 0.5, 0.25],
  [".nest-solution-card", 0.88, 0],
  [".oa-panel", 0.9, 0],
  [".selp-pipeline__card", 0.9, 0],
  [".mobile-home__footer-bird", 0.5, 0.5],
];

export function MobileStoryBird() {
  const birdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bird = birdRef.current;
    const home = document.querySelector<HTMLElement>(".mobile-home");
    if (!bird || !home) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previousTime = 0;
    let position: { x: number; y: number } | null = null;
    let target: { x: number; y: number; opacity: number } | null = null;
    let introEntering = false;
    let measureNeeded = true;

    const measure = () => {
      if (!home.querySelector(".home-intro--ready")) return null;
      const viewport = window.visualViewport;
      const top = viewport?.offsetTop ?? 0;
      const height = viewport?.height ?? window.innerHeight;
      const width = document.documentElement.clientWidth;
      const minY = top + Math.min(120, height * 0.35);
      const maxY = top + height - 28;
      const candidates = perches
        .flatMap(([selector, x, y], index) =>
          [...home.querySelectorAll<HTMLElement>(selector)].map((element) => {
            const bounds = element.getBoundingClientRect();
            return {
              element,
              first: index === 0,
              x: bounds.left + bounds.width * x,
              y: bounds.top + bounds.height * y,
              visible: bounds.width > 0,
            };
          }),
        )
        .filter((point) => point.visible && point.y >= minY && point.y <= maxY);
      const intro = home
        .querySelector(".mobile-home__intro")
        ?.getBoundingClientRect();
      const first = candidates.find((point) => point.first);
      const perch =
        first && intro && intro.top > top - height * 0.3
          ? first
          : candidates.sort(
              (a, b) =>
                Math.abs(a.y - top - height * 0.58) -
                Math.abs(b.y - top - height * 0.58),
            )[0];
      const button = home.querySelector(".home-intro__next");
      const opacity =
        perch?.first && button ? Number(getComputedStyle(button).opacity) : 1;
      introEntering = !!perch?.first && opacity < 1;
      return {
        x: Math.max(56, Math.min(width - 56, perch?.x ?? width - 60)),
        y: Math.max(minY, Math.min(maxY, perch?.y ?? top + height * 0.62)),
        opacity,
      };
    };

    const tick = (time: number) => {
      frame = 0;
      if (measureNeeded || introEntering) {
        target = measure();
        measureNeeded = false;
      }
      if (!target) {
        bird.style.opacity = "0";
        return;
      }
      const elapsed = previousTime ? Math.min(64, time - previousTime) : 16;
      previousTime = time;
      if (!position || reduced.matches) position = { x: target.x, y: target.y };
      const dx = target.x - position.x;
      const dy = target.y - position.y;
      const moving = !reduced.matches && Math.hypot(dx, dy) > 1;
      const blend = moving ? 1 - Math.exp(-elapsed / 100) : 1;
      position.x += dx * blend;
      position.y += dy * blend;
      bird.style.left = `${position.x}px`;
      bird.style.top = `${position.y}px`;
      bird.style.opacity = String(target.opacity);
      bird.dataset.flying = String(moving);
      if (moving) {
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        bird.style.setProperty(
          "--mobile-bird-heading",
          `${angle - BIRD_ARTWORK_HEADING}deg`,
        );
      }
      if (moving || introEntering) frame = requestAnimationFrame(tick);
    };
    const update = () => {
      measureNeeded = true;
      if (!frame) {
        previousTime = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const observer = new ResizeObserver(update);
    observer.observe(home);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("home-intro-ready", update);
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);
    reduced.addEventListener("change", update);
    home.addEventListener("load", update, true);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("home-intro-ready", update);
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
      reduced.removeEventListener("change", update);
      home.removeEventListener("load", update, true);
    };
  }, []);

  return createPortal(
    <div ref={birdRef} className="mobile-story-bird" aria-hidden="true">
      <img
        className="mobile-story-bird__rest"
        src={`${media}guide-bird-rest.avif`}
        alt=""
      />
      <div className="mobile-story-bird__flight">
        <img src={`${media}guide-bird-flight-01.avif`} alt="" />
        <img src={`${media}guide-bird-flight-02.avif`} alt="" />
      </div>
    </div>,
    document.body,
  );
}
