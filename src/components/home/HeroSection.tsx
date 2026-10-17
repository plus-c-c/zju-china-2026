const assetPathPrefix = "https://static.igem.wiki/teams/6102/wiki/images/home";
import { WaterSurface } from "./WaterSurface";

const imgImageNestBlueBirdMascot = `${assetPathPrefix}/58a94.avif`;
const imgEllipse1 = `${assetPathPrefix}/7d0c2.svg`;

export default function HeroSection() {
  return (
    <header
      className="home-layer-1"
      data-node-id="186:262"
      data-name="Hero section"
    >
      <div aria-hidden className="home-layer-2">
        <div className="home-layer-3" />
        <WaterSurface />
      </div>
      <p className="home-layer-5" data-node-id="211:297">
        NEST
      </p>
      <div className="home-layer-6" data-node-id="211:302">
        <div className="home-layer-7">
          <div
            className="home-layer-8"
            data-name="Image (NEST blue bird mascot)"
          >
            <img
              alt=""
              loading="eager"
              decoding="async"
              className="home-layer-9"
              src={imgImageNestBlueBirdMascot}
            />
          </div>
        </div>
      </div>
      <div className="home-layer-10" data-node-id="225:89">
        <img
          alt=""
          loading="eager"
          decoding="async"
          className="home-layer-11"
          src={imgEllipse1}
        />
      </div>
    </header>
  );
}
