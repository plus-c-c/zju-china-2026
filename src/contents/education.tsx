import { Inspirations, InspirationLink } from "../components/Inspirations";
import { FlappyInjection } from "../components/FlappyInjection";

export function Education() {
  const links: InspirationLink[] = [
    { year: 2024, teamName: "CityU-HongKong", pageName: "education" },
    { year: 2024, teamName: "CJUH-JLU-China", pageName: "education" },
    { year: 2024, teamName: "Keystone", pageName: "education" },
    { year: 2024, teamName: "Stanford", pageName: "education" },
    { year: 2024, teamName: "GEMS-Taiwan", pageName: "education" },
    { year: 2024, teamName: "Heidelberg", pageName: "education" },
  ];

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <div className="bd-callout bd-callout-info">
            <h4>Best Education</h4>
            <p>
              Innovative educational tools and outreach activities have the
              ability to establish a two-way dialogue with new communities by
              discussing public values and the science behind synthetic biology.
              How have you developed new opportunities to include more people in
              shaping synthetic biology? Education activities do not have to be
              directly related to your project but may look at wider issues of
              iGEM or synthetic biology. Education activities must promote
              scientific learning and avoid simply proselytizing or marketing
              synthetic biology and/or iGEM. Document your approach, and what
              was learned by everyone involved, to compete for this award.
            </p>
            <hr />
            <p>
              Visit the{" "}
              <a href="https://competition.igem.org/judging/special-prizes">
                Special Prizes page
              </a>{" "}
              for more information.
            </p>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col">
          <h2 className="mt-4">Mini game: inject the cartilage</h2>
          <p>
            Fly the NEST bird between healthy bones and complete the injection —
            a playful take on our cartilage-repair idea. Passing each bone pair
            advances the syringe; fill the injection to win.
          </p>
          <FlappyInjection />
        </div>
      </div>

      <div className="row mt-4">
        <Inspirations inspirationLinkList={links} />
      </div>
    </>
  );
}
