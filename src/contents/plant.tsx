import { Inspirations, InspirationLink } from "../components/Inspirations";

export function Plant() {
  const links: InspirationLink[] = [
    { year: 2024, teamName: "Marburg", pageName: "plant" },
    { year: 2024, teamName: "SCU-China", pageName: "plant" },
    { year: 2023, teamName: "Marburg", pageName: "plant" },
    { year: 2023, teamName: "ZJU-China", pageName: "plant" },
    { year: 2023, teamName: "Tsinghua-TFL", pageName: "plant" },
  ];

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <div className="bd-callout bd-callout-info">
            <h4>Best Plant Synthetic Biology</h4>
            <p>
              This award is designed to celebrate exemplary work done in plant
              synthetic biology. Did you build a project in a plant chassis? Did
              you submit plant parts to the Registry? This award could also be
              given to a team working with algae or another eukaryotic
              photosynthetic chassis. Show us what you made and remember to
              adhere to iGEM safety guidelines!
            </p>
            <p>
              <em>
                Note: Photosynthetic bacteria cannot be considered for this
                prize.
              </em>
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
      <Inspirations inspirationLinkList={links} />
    </>
  );
}
