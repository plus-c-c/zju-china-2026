import "./StakeBridgeEmbed.css";

/** The tool is built and served by this wiki, with its own navigation and styles. */
export function StakeBridgeEmbed() {
  const appUrl = `${import.meta.env.BASE_URL}stakebridge/index.html#home`;

  return (
    <section
      id="ihp-engagement-stakebridge"
      className="ihp-stakebridge"
      aria-label="StakeBridge"
    >
      <iframe
        className="ihp-stakebridge__frame"
        src={appUrl}
        title="StakeBridge — stakeholder library, workspace and handbook"
        loading="lazy"
      />
    </section>
  );
}
