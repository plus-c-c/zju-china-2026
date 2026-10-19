import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import "./BirdCursor.css";

type BirdPhase = "following" | "arriving" | "landed" | "returning";

const BirdContext = createContext<{
  phase: BirdPhase;
  landing: HTMLSpanElement | null;
  registerLanding: (element: HTMLSpanElement) => () => void;
}>({ phase: "following", landing: null, registerLanding: () => () => {} });

function BirdArtwork({ onLoad }: { onLoad?: () => void }) {
  const [homeFailed, setHomeFailed] = useState(false);
  return (
    <>
      <span
        className="bird-art bird-art--loading"
        style={homeFailed ? { opacity: 1 } : undefined}
      >
        <img
          src="https://static.igem.wiki/teams/6102/wiki/images/loading-bird.avif"
          alt=""
          draggable={false}
          onLoad={onLoad}
        />
      </span>
      <span
        className="bird-art bird-art--home"
        style={homeFailed ? { opacity: 0 } : undefined}
      >
        <img
          src="https://static.igem.wiki/teams/6102/wiki/home-opening/guide-bird-rest.avif"
          alt=""
          draggable={false}
          onError={() => setHomeFailed(true)}
        />
      </span>
    </>
  );
}

export function BirdLanding({
  className = "description-bird-slot",
  whenVisible = false,
  whenPassed = false,
}: {
  className?: string;
  whenVisible?: boolean;
  whenPassed?: boolean;
}) {
  const { phase, landing, registerLanding } = useContext(BirdContext);
  const slot = useRef<HTMLSpanElement | null>(null);
  const register = useCallback(
    (element: HTMLSpanElement | null) => {
      slot.current = element;
      if (element) return registerLanding(element);
    },
    [registerLanding],
  );
  return (
    <span
      ref={register}
      className={className}
      data-state={phase}
      data-landing-visibility={
        whenPassed ? "passed" : whenVisible ? "visible" : undefined
      }
      aria-hidden="true"
    >
      <span
        className="bird-rest"
        style={{
          visibility:
            phase === "landed" && landing === slot.current
              ? "visible"
              : "hidden",
        }}
      >
        <BirdArtwork />
      </span>
    </span>
  );
}

export function BirdCursorProvider({
  children,
  enabled,
}: {
  children: ReactNode;
  enabled: boolean;
}) {
  const { pathname } = useLocation();
  const bird = useRef<HTMLSpanElement>(null);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const [landing, setLanding] = useState<HTMLSpanElement | null>(null);
  const [landings, setLandings] = useState<HTMLSpanElement[]>([]);
  const registerLanding = useCallback((element: HTMLSpanElement) => {
    setLandings((previous) => [...previous, element]);
    return () =>
      setLandings((previous) => previous.filter((item) => item !== element));
  }, []);
  const [phase, setPhase] = useState<BirdPhase>("following");
  const [artworkReady, setArtworkReady] = useState(false);
  const [finePointer, setFinePointer] = useState(
    () => matchMedia("(hover: hover) and (pointer: fine)").matches,
  );

  useEffect(() => {
    let frame = 0;
    const select = () => {
      frame = 0;
      const visible = landings.filter((element) => {
        const rect = element.getBoundingClientRect();
        return (
          element.isConnected &&
          rect.width > 0 &&
          rect.top >= 82 &&
          rect.bottom < innerHeight * 0.9
        );
      });
      visible.sort(
        (a, b) =>
          Math.abs(a.getBoundingClientRect().top - innerHeight * 0.55) -
          Math.abs(b.getBoundingClientRect().top - innerHeight * 0.55),
      );
      // A fast scroll may skip a perch's entire visible range. Keep the most
      // recently passed reference perch eligible until scrolling back above it.
      const passed = landings
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return (
            element.isConnected &&
            element.dataset.landingVisibility === "passed" &&
            rect.width > 0 &&
            rect.top < innerHeight * 0.8
          );
        })
        .sort(
          (a, b) =>
            b.getBoundingClientRect().top - a.getBoundingClientRect().top,
        );
      setLanding(
        visible[0] ??
          passed[0] ??
          landings.find(
            (element) =>
              element.isConnected && !element.dataset.landingVisibility,
          ) ??
          null,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(select);
    };
    select();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [landings, pathname]);

  useEffect(() => {
    const media = matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const image = bird.current;
    if (!image) return;
    const target = landing?.isConnected ? landing : null;
    const waitForVisibility = target?.dataset.landingVisibility === "visible";
    const keepAfterPassing = target?.dataset.landingVisibility === "passed";
    const restingBird = target?.querySelector<HTMLElement>(".bird-rest");
    image.style.visibility = "hidden";
    if (!finePointer) {
      setPhase("landed");
      return;
    }
    if (!enabled || !artworkReady) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const cursorSize = 34;
    let state: BirdPhase = "following";
    let landingVisible = false;
    let frame = 0;
    let scrollFrame = 0;
    let clickHop: Animation | null = null;
    setPhase("following");

    const place = (x: number, y: number, size: number, homePose: number) => {
      image.style.left = `${x}px`;
      image.style.top = `${y}px`;
      image.style.width = `${size}px`;
      image.style.setProperty("--home-pose", String(homePose));
    };
    const cursorPosition = () => ({
      x: Math.max(0, Math.min(pointer.current.x + 6, innerWidth - cursorSize)),
      y: Math.max(0, Math.min(pointer.current.y + 6, innerHeight - cursorSize)),
      size: cursorSize,
    });
    const follow = () => {
      const position = cursorPosition();
      place(position.x, position.y, cursorSize, 0);
      image.style.visibility = pointer.current.active ? "visible" : "hidden";
    };
    const changeState = (next: BirdPhase) => {
      state = next;
      setPhase(next);
    };
    const resumeFollowing = () => {
      cancelAnimationFrame(frame);
      clickHop?.cancel();
      changeState("following");
      follow();
    };
    const jump = (toNest: boolean) => {
      if (!restingBird) return;
      cancelAnimationFrame(frame);
      clickHop?.cancel();
      const from =
        state === "landed"
          ? restingBird.getBoundingClientRect()
          : image.getBoundingClientRect();
      const fromHome =
        state === "landed"
          ? 1
          : Number(image.style.getPropertyValue("--home-pose")) || 0;
      const start = {
        x: from.left,
        y: from.top,
        size: from.width || cursorSize,
      };
      changeState(toNest ? "arriving" : "returning");
      image.style.visibility = "visible";
      const began = performance.now();
      const tick = (now: number) => {
        const progress = reducedMotion.matches
          ? 1
          : Math.min(
              1,
              (now - began) /
                (waitForVisibility || keepAfterPassing ? 1100 : 1400),
            );
        const eased = progress * progress * (3 - 2 * progress);
        // Follow the landing box while the page scrolls during the hop.
        const rect = restingBird.getBoundingClientRect();
        const destination = toNest
          ? { x: rect.left, y: rect.top, size: rect.width }
          : cursorPosition();
        const hop = Math.abs(Math.sin(progress * Math.PI * 3)) *
          55 * Math.sin(Math.PI * progress);
        const homePose = waitForVisibility
          ? 0
          : fromHome +
            ((toNest ? 1 : 0) - fromHome) * Math.max(0, (progress - 0.6) / 0.4);
        place(
          start.x + (destination.x - start.x) * eased,
          start.y + (destination.y - start.y) * eased - hop,
          start.size + (destination.size - start.size) * eased,
          homePose,
        );
        if (progress < 1) frame = requestAnimationFrame(tick);
        else if (toNest) {
          image.style.visibility = "hidden";
          changeState("landed");
        } else {
          changeState("following");
          follow();
        }
      };
      frame = requestAnimationFrame(tick);
    };
    const checkScroll = () => {
      scrollFrame = 0;
      if (!target || !restingBird) return;
      if (waitForVisibility) {
        if (!landingVisible) {
          if (state !== "following") resumeFollowing();
        } else if (state === "following" || state === "returning") {
          jump(true);
        }
        return;
      }
      const rect = target.getBoundingClientRect();
      // A fast upward scroll can move the nest far below the viewport in one
      // frame. Resume at the pointer instead of hopping in from off screen.
      if (state !== "following" && rect.top > innerHeight + cursorSize) {
        resumeFollowing();
        return;
      }
      if (
        (state === "following" || state === "returning") &&
        rect.top < innerHeight * 0.67
      )
        jump(true);
      else if (
        (state === "landed" || state === "arriving") &&
        rect.top > innerHeight * 0.8
      )
        jump(false);
    };
    const scheduleScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(checkScroll);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.current = { x: event.clientX, y: event.clientY, active: true };
      if (state === "following") follow();
    };
    const leave = () => {
      pointer.current.active = false;
      if (state === "following") follow();
    };
    const hopOnClick = (event: PointerEvent) => {
      if (
        event.pointerType !== "mouse" ||
        event.button !== 0 ||
        state !== "following" ||
        reducedMotion.matches
      )
        return;
      pointer.current = { x: event.clientX, y: event.clientY, active: true };
      follow();
      clickHop?.cancel();
      clickHop = image.animate(
        [
          { transform: "translateY(0)", easing: "cubic-bezier(0, 0, 0.3, 1)" },
          {
            transform: "translateY(-16px)",
            offset: 0.45,
            easing: "cubic-bezier(0.5, 0, 1, 1)",
          },
          { transform: "translateY(0)" },
        ],
        { duration: 420 },
      );
    };
    // IntersectionObserver also accounts for the Model card's inner scroll
    // clipping, so a hidden callout cannot attract the bird off screen.
    const visibilityObserver =
      waitForVisibility && target
        ? new IntersectionObserver(
            ([entry]) => {
              landingVisible =
                entry.isIntersecting && entry.intersectionRatio >= 0.99;
              scheduleScroll();
            },
            { threshold: [0, 0.99, 1] },
          )
        : null;
    if (visibilityObserver && target) visibilityObserver.observe(target);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", hopOnClick, {
      passive: true,
      capture: true,
    });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    window.addEventListener("scroll", scheduleScroll, { passive: true });
    window.addEventListener("resize", scheduleScroll);
    follow();
    checkScroll();
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scrollFrame);
      visibilityObserver?.disconnect();
      clickHop?.cancel();
      image.style.visibility = "hidden";
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", hopOnClick, true);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
      window.removeEventListener("scroll", scheduleScroll);
      window.removeEventListener("resize", scheduleScroll);
    };
  }, [landing, pathname, enabled, artworkReady, finePointer]);

  return (
    <BirdContext.Provider value={{ phase, landing, registerLanding }}>
      {children}
      {createPortal(
        <span
          ref={bird}
          className="bird-cursor"
          data-state={phase}
          aria-hidden="true"
        >
          <BirdArtwork onLoad={() => setArtworkReady(true)} />
        </span>,
        document.body,
      )}
    </BirdContext.Provider>
  );
}
