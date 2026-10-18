import "./LoadingScreen.css";

type LoadingScreenProps = {
  visible: boolean;
};

export function LoadingScreen({ visible }: LoadingScreenProps) {
  return (
    <div
      className={`loading-screen${visible ? " loading-screen--visible" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      aria-hidden={!visible}
    >
      <div className="loading-screen__content">
        <div className="loading-screen__bird" aria-hidden="true">
          <img
            src={`https://static.igem.wiki/teams/6102/wiki/images/loading-bird.avif`}
            alt=""
            width="2360"
            height="1640"
          />
        </div>
        <div className="loading-screen__label" aria-hidden="true">
          <span>Loading</span>
          <span className="loading-screen__dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>
      </div>
    </div>
  );
}
