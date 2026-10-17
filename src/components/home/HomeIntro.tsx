import { useCallback, useEffect, useRef, useState } from "react";
import "./HomeIntro.css";

const homepageVideo = `${import.meta.env.BASE_URL}videos/homepage.mp4`;

type HomeIntroProps = {
  onEnter: () => void;
};

export function HomeIntro({ onEnter }: HomeIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [finished, setFinished] = useState(false);

  const finishIntro = useCallback(() => {
    setFinished(true);
    window.dispatchEvent(new Event("home-intro-ready"));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    void video.play().catch(() => finishIntro());
  }, [finishIntro]);

  useEffect(() => {
    document.documentElement.classList.toggle("home-intro-open", !finished);
    document.body.classList.toggle("home-intro-open", !finished);

    return () => {
      document.documentElement.classList.remove("home-intro-open");
      document.body.classList.remove("home-intro-open");
    };
  }, [finished]);

  return (
    <div
      className={`home-intro${finished ? " home-intro--ready" : ""}`}
      aria-label={
        finished ? "NEST homepage introduction" : "Homepage animation playing"
      }
    >
      <video
        ref={videoRef}
        className="home-intro__video"
        src={homepageVideo}
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onEnded={finishIntro}
        onError={finishIntro}
      />
      <div className="home-intro__landing" aria-hidden={!finished}>
        <div className="home-intro__brand" aria-label="NEST">
          <span
            className="home-intro__nest home-intro__nest--cyan"
            data-node-id="644:15"
            aria-hidden="true"
          >
            NEST
          </span>
          <span
            className="home-intro__nest home-intro__nest--yellow"
            data-node-id="644:16"
            aria-hidden="true"
          >
            NEST
          </span>
          <span className="home-intro__nest" data-node-id="644:17">
            NEST
          </span>
        </div>
        <p className="home-intro__tagline" data-node-id="741:5">
          Native-like programmablE cartilage Scaffold for Tissue repair
        </p>
        <button
          className="home-intro__next"
          data-node-id="644:24"
          type="button"
          tabIndex={finished ? 0 : -1}
          onClick={onEnter}
        >
          <span data-node-id="644:25">NEXT</span>
        </button>
      </div>
    </div>
  );
}
