import { FlappyInjection } from "../components/FlappyInjection";

export function Game() {
  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article>
          <h2>Inject the cartilage</h2>
          <p>
            Fly the NEST bird between healthy bones and complete the injection
            &mdash; a playful take on our cartilage-repair idea. Pass all 20
            bone pairs at different heights: each pair injects 5% of the gel and
            covers a little more of the damaged cartilage.
          </p>
          <FlappyInjection />
        </article>
      </div>
    </div>
  );
}
