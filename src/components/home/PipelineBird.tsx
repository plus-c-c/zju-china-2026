import { useEffect } from "react";
import { OA_BIRD_STOP, perch } from "./storyBirdGeometry";
import { getStoryHandoffTop } from "./UseStoryNavigation";
import { getPipelineFlightRoute } from "./PipelineFlightRoute";

/** A reversible document-space route, shared with the OA bird. */
export function PipelineBird() {
  useEffect(() => {
    const bird = document.querySelector<HTMLElement>(".story-guide-bird");
    if (!bird) return;
    let frame = 0;
    let previousScroll = window.scrollY;
    let lastScrollTime = -Infinity;
    let routeDirection = 1;
    let activeBefore = false;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = (time: number) => {
      frame = 0;
      const root = document.querySelector(".selp-pipeline");
      const footer = document.querySelector(".footer");
      const canvas = bird.parentElement;
      if (!root || !footer || !canvas) return;
      const scroll = window.scrollY;
      if (Math.abs(scroll - previousScroll) > 0.1) {
        // The wheel controller has already rejected trackpad rebound. Use its
        // accepted movement immediately so the head never points backward.
        routeDirection = Math.sign(scroll - previousScroll);
        lastScrollTime = time;
      }
      previousScroll = scroll;
      const c = canvas.getBoundingClientRect();
      const scale = c.width / 1280;
      const pipelineTop = root.getBoundingClientRect().top + scroll;
      // Keep ownership at the OA story endpoint even when the module overlaps
      // the outgoing viewport to reduce the visual gap.
      const story = document.querySelector(".home-scroll-space");
      const storyBottom = story ? story.getBoundingClientRect().bottom + scroll : pipelineTop;
      const start = getStoryHandoffTop() ?? storyBottom - innerHeight;
      const foot = footer.getBoundingClientRect();
      const active = scroll >= start - 1 && foot.bottom > 0;
      if (!active) {
        if (activeBefore) {
          bird.classList.remove("story-guide-bird--flying");
          bird.style.setProperty("--bird-flight-angle", "0deg");
          // Restore the shared OA perch before returning ownership. A fast
          // reverse scroll may otherwise leave the fixed bird below the screen.
          const anchor = perch(OA_BIRD_STOP);
          bird.style.left = `${anchor.x}px`;
          bird.style.top = `${anchor.y}px`;
          document.body.classList.remove("pipeline-bird-active");
          window.dispatchEvent(new CustomEvent("home-bird-handoff", { detail: { x: anchor.x, y: anchor.y } }));
        }
        activeBefore = false;
        document.body.classList.remove("pipeline-bird-active");
        return;
      }
      const oaPerch = perch(OA_BIRD_STOP);
      const oaX = c.left + oaPerch.x * scale;
      const oaScreenY = c.top + oaPerch.y * scale;
      const arch = Math.min(104, Math.max(64, innerWidth * 0.07));
      const landingY = foot.top + scroll + arch * 0.35 - 3;
      // The bird's position is its feet; put its body center on the drawn line.
      const centerOffset = bird.offsetHeight * 0.4 * scale / 2;
      const route = getPipelineFlightRoute(root,
        { x: oaX, y: start + oaScreenY },
        { x: foot.left + foot.width * 0.12, y: landingY },
        start, c, centerOffset);
      if (!route) {
        frame = requestAnimationFrame(tick);
        return;
      }
      activeBefore = true;
      const position = route.sample(scroll);
      const x = position.x, y = position.y - scroll;
      const onRoute = scroll > route.start + 0.5 && scroll < route.end - 0.5;
      const moving = onRoute && time - lastScrollTime < 350;
      bird.dataset.pipelineControlled = "true";
      bird.style.left = `${(x - c.left) / scale}px`;
      bird.style.top = `${(y - c.top) / scale}px`;
      bird.style.setProperty("--bird-size", "0.4");
      bird.classList.toggle("story-guide-bird--flying", moving && !reduced);
      if (moving) {
        // Align directly with this same route's tangent. atan2 stays within
        // [-180, 180]; no accumulated rotations or delayed heading catch-up.
        // Before the drawn connector, use the visible flight direction: the
        // document itself is scrolling underneath the fixed bird.
        const inEntry = scroll < route.stops[0];
        const dx = position.dx * position.speed;
        const dy = position.dy * position.speed - (inEntry ? 1 : 0);
        const heading = Math.atan2(dy * routeDirection, dx * routeDirection) * 180 / Math.PI;
        bird.style.setProperty("--bird-flight-angle", `${heading}deg`);
      }
      document.body.classList.add("pipeline-bird-active");
      // Keep one clock alive while active; wheel bursts no longer restart the flight.
      frame = requestAnimationFrame(tick);
    };
    const wake = () => {
      // Apply the latest scroll position in the scroll event itself, so the
      // fixed bird cannot lag a frame behind the document near the video.
      cancelAnimationFrame(frame);
      tick(performance.now());
    };
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
    wake();
    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove("pipeline-bird-active");
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
    };
  }, []);
  return null;
}
