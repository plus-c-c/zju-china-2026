/** The fixed site header and the in-page sub-navigation leave this much room
 *  above an anchored heading. */
const ANCHOR_OFFSET = 130;

let activeJump: (() => void) | null = null;

/**
 * Bring an in-page heading just below the sticky header.
 *
 * The destination is recomputed on every animation frame instead of being
 * fixed up front, so late layout changes above the target (a lazy figure, a
 * paragraph that gains the SEED emphasis) are absorbed by the same motion.
 *
 * This replaces the previous "native smooth scroll, then an instant re-align
 * 600ms later" approach: the native animation can still be running at that
 * point, so the correction snapped the remaining distance in a single frame
 * and looked like a page jump. Here the motion is a single easing curve and
 * the target is reached exactly, without a second scroll. The animation stops
 * as soon as the reader scrolls by hand.
 */
export function scrollToSection(id: string, offset = ANCHOR_OFFSET) {
  const target = document.getElementById(id);
  if (!target) return;

  /* A newer jump supersedes the one in flight. */
  activeJump?.();

  const startY = window.scrollY;
  const startTime = performance.now();
  const startTarget =
    target.getBoundingClientRect().top + startY - offset;
  const distance = Math.abs(startTarget - startY);
  const duration = Math.min(850, Math.max(340, distance * 0.35));

  let frame = 0;
  let lastY = startY;
  let done = false;

  const onKeyDown = (event: KeyboardEvent) => {
    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "PageUp" ||
      event.key === "PageDown" ||
      event.key === "Home" ||
      event.key === "End" ||
      event.key === " "
    ) {
      stop();
    }
  };

  const stop = () => {
    if (done) return;
    done = true;
    cancelAnimationFrame(frame);
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchmove", stop);
    window.removeEventListener("keydown", onKeyDown);
    if (activeJump === stop) activeJump = null;
  };

  const step = (now: number) => {
    if (done) return;
    /* Any scroll we did not write ourselves means the reader took over
       (wheel, touch, scrollbar drag, keyboard): stand down immediately. */
    if (Math.abs(window.scrollY - lastY) > 2) {
      stop();
      return;
    }
    const el = document.getElementById(id);
    if (!el) {
      stop();
      return;
    }
    const dest = el.getBoundingClientRect().top + window.scrollY - offset;
    const progress = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const y = Math.round(startY + (dest - startY) * eased);
    lastY = y;
    window.scrollTo({ top: y, behavior: "instant" });
    if (progress < 1) {
      frame = requestAnimationFrame(step);
    } else {
      stop();
    }
  };

  activeJump = stop;
  window.addEventListener("wheel", stop, { passive: true });
  window.addEventListener("touchmove", stop, { passive: true });
  window.addEventListener("keydown", onKeyDown);
  frame = requestAnimationFrame(step);
}
