import { useEffect } from "react";

/** A reversible document-space route, shared with the OA bird. */
export function PipelineBird() {
  useEffect(() => {
    const bird = document.querySelector<HTMLElement>(".story-guide-bird");
    if (!bird) return;
    let frame = 0, previousTime = 0;
    let routeY: number | null = null;
    let angle = 0;
    let lastX: number | null = null;
    let lastY: number | null = null;
    let wasMoving = false;
    let previousScroll = window.scrollY;
    let routeDirection = 1;
    let activeBefore = false;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp = (n: number) => Math.max(0, Math.min(1, n));
    const tick = (time: number) => {
      frame = 0;
      const dt = previousTime ? Math.min(0.05, (time - previousTime) / 1000) : 0.016;
      previousTime = time;
      const root = document.querySelector(".selp-pipeline");
      const footer = document.querySelector(".footer");
      const canvas = bird.parentElement;
      if (!root || !footer || !canvas) return;
      const scroll = window.scrollY;
      if (Math.abs(scroll - previousScroll) > 1.5) routeDirection = scroll > previousScroll ? 1 : -1;
      previousScroll = scroll;
      const c = canvas.getBoundingClientRect();
      const scale = c.width / 1280;
      const pipelineTop = root.getBoundingClientRect().top + scroll;
      const start = pipelineTop - innerHeight;
      const foot = footer.getBoundingClientRect();
      const active = scroll >= start - 1 && foot.bottom > 0;
      if (!active) {
        if (activeBefore) {
          bird.classList.remove("story-guide-bird--flying");
          bird.style.setProperty("--bird-flight-angle", "0deg");
        }
        routeY = null; activeBefore = false; previousTime = 0;
        lastX = null; lastY = null; wasMoving = false;
        document.body.classList.remove("pipeline-bird-active");
        return;
      }
      const oaX = c.left + 1092 * scale;
      const oaScreenY = c.top + 590 * scale;
      const arch = Math.min(104, Math.max(64, innerWidth * 0.07));
      const landingY = foot.top + scroll + arch * 0.35 - 3;
      const stages = [...root.querySelectorAll(".selp-pipeline__stage")].map(e => e.getBoundingClientRect());
      const points = [
        { x: oaX, y: start + oaScreenY },
        { x: innerWidth * 0.85, y: stages[0].top + scroll + stages[0].height * 0.42 },
        { x: innerWidth * 0.17, y: stages[1].top + scroll + stages[1].height * 0.45 },
        { x: innerWidth * 0.85, y: stages[2].top + scroll + stages[2].height * 0.45 },
        { x: foot.left + foot.width * 0.12, y: landingY },
      ];
      const requestedY = Math.max(points[0].y, Math.min(landingY, scroll + oaScreenY));
      if (!activeBefore) {
        routeY = requestedY;
        angle = parseFloat(bird.style.getPropertyValue("--bird-flight-angle")) || 0;
      }
      activeBefore = true;
      routeY = reduced ? requestedY : routeY! + (requestedY - routeY!) * (1 - Math.exp(-dt / 0.16));
      // Never overshoot the landing surface, including while reversing direction.
      routeY = Math.min(landingY, Math.max(points[0].y, routeY));
      let i = points.findIndex((_point, index) => index < points.length - 1 && routeY! <= points[index + 1].y);
      if (i < 0) i = points.length - 2;
      const a = points[i], b = points[i + 1];
      const t = clamp((routeY - a.y) / Math.max(1, b.y - a.y));
      const ease = t*t*t*(10 + t*(-15 + 6*t));
      const x = a.x + (b.x - a.x) * ease;
      const y = Math.min(routeY - scroll, landingY - scroll);
      const moving = Math.abs(requestedY - routeY) > 0.8;
      bird.dataset.pipelineControlled = "true";
      bird.style.left = `${(x - c.left) / scale}px`;
      bird.style.top = `${(y - c.top) / scale}px`;
      bird.style.setProperty("--bird-size", "0.4");
      bird.classList.toggle("story-guide-bird--flying", moving && !reduced);
      if (moving && lastX !== null && lastY !== null) {
        const dx = (b.x - a.x) * 30*t*t*(1-t)*(1-t) * routeDirection;
        const dy = Math.max(1, b.y - a.y) * routeDirection;
        // Follow the rendered motion, including scrolling, rather than a future target.
        if (Math.hypot(dx, dy) > 0.3) {
          const desired = Math.atan2(dy, dx) * 180 / Math.PI;
          const difference = ((desired - angle + 540) % 360 + 360) % 360 - 180;
          angle = wasMoving ? angle + difference * (1 - Math.exp(-dt / 0.12)) : desired;
          bird.style.setProperty("--bird-flight-angle", `${angle}deg`);
        }
      }
      lastX = x; lastY = y;
      wasMoving = moving;
      document.body.classList.add("pipeline-bird-active");
      if (moving) frame = requestAnimationFrame(tick);
      else previousTime = 0;
    };
    const wake = () => { if (!frame) frame = requestAnimationFrame(tick); };
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
