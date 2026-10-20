import "./NotFound.css";

export function NotFound() {
  return (
    <section className="not-found-page" aria-labelledby="not-found-title">
      <div className="not-found-page__content">
        <div className="not-found-page__bird" aria-hidden="true">
          <img
            src="https://static.igem.wiki/teams/6102/wiki/images/page-404-bird.avif"
            alt=""
            width="2360"
            height="1640"
            onError={(event) => {
              const fallback = `https://static.igem.wiki/teams/6102/wiki/images/page-404-bird.png`;
              if (
                event.currentTarget.src !==
                new URL(fallback, window.location.href).href
              ) {
                event.currentTarget.src = fallback;
              }
            }}
          />
        </div>
        <h1 id="not-found-title" className="not-found-page__label">
          404 not found
        </h1>
      </div>
    </section>
  );
}
