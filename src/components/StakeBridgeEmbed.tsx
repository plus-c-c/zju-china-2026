import "./StakeBridgeEmbed.css";

/** The tool is built and served by this wiki, with its own navigation and styles. */
export function StakeBridgeEmbed() {
  const appUrl = `${import.meta.env.BASE_URL}stakebridge/index.html#workspace`;

  return (
    <section
      id="ihp-engagement-stakebridge"
      className="ihp-stakebridge"
      aria-label="StakeBridge"
    >
      <div className="ihp-stakebridge__toolbar">
        <strong>StakeBridge</strong>
        <a href={appUrl} target="_blank" rel="noreferrer">
          Open in a new tab ↗
        </a>
      </div>
      <iframe
        className="ihp-stakebridge__frame"
        src={appUrl}
        title="StakeBridge — stakeholder library, workspace and handbook"
        loading="lazy"
      />
    </section>
  );
}
