import type { MouseEventHandler } from "react";
import "./HomeScrollCue.css";

export function HomeScrollCue({ onClick }: { onClick?: MouseEventHandler<HTMLButtonElement> }) {
  const continueReading: MouseEventHandler<HTMLButtonElement> = (event) => {
    const next = event.currentTarget.closest("section")?.nextElementSibling;
    const target = next?.querySelector(".selp-pipeline__stage") ?? next;
    target?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  };

  return (
    <button
      className="home-scroll-cue"
      type="button"
      aria-label="Scroll down to continue"
      onClick={onClick ?? continueReading}
    >
      <svg className="home-scroll-cue__icon" viewBox="0 0 149 149" width={149} height={149} aria-hidden="true" focusable="false">
        {/* Arrow path from down-arrow-v0.svg, without its circular background. */}
        <path fill="currentColor" d="M81 38C81 34.134 77.866 31 74 31C70.134 31 67 34.134 67 38L74 38L81 38ZM69.0503 124.95C71.7839 127.683 76.2161 127.683 78.9498 124.95L123.497 80.402C126.231 77.6683 126.231 73.2362 123.497 70.5025C120.764 67.7689 116.332 67.7689 113.598 70.5025L74 110.101L34.402 70.5025C31.6684 67.7689 27.2362 67.7689 24.5025 70.5025C21.7689 73.2362 21.7689 77.6684 24.5025 80.402L69.0503 124.95ZM74 38L67 38L67 120L74 120L81 120L81 38L74 38Z" />
      </svg>
    </button>
  );
}
