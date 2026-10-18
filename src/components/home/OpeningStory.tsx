import { useEffect, useRef, useState, type CSSProperties } from "react";
import { InteractiveWorldMap } from "./InteractiveWorldMap";
import bubbleAcl from "../../assets/home/bubble-awareness/bubble-acl.svg";
import bubbleDecorLeft from "../../assets/home/bubble-awareness/bubble-decor-left.svg";
import bubbleDecorRight from "../../assets/home/bubble-awareness/bubble-decor-right.svg";
import bubbleDecorTop from "../../assets/home/bubble-awareness/bubble-decor-top.svg";
import bubbleFocal from "../../assets/home/bubble-awareness/bubble-focal.svg";
import bubbleGout from "../../assets/home/bubble-awareness/bubble-gout.svg";
import bubbleHyaline from "../../assets/home/bubble-awareness/bubble-hyaline.svg";
import bubbleOsteoarthritis from "../../assets/home/bubble-awareness/bubble-osteoarthritis.svg";
import bubblePatellae from "../../assets/home/bubble-awareness/bubble-patellae.svg";
import postOpRehabilitation from "../../assets/home/bubble-awareness/post-op-rehabilitation.png";
import sportsKneeTrauma from "../../assets/home/bubble-awareness/sports-knee-trauma.png";
import stairKneePain from "../../assets/home/bubble-awareness/stair-knee-pain.png";
import "./OpeningStory.css";

const bubbles = [
  { className: "osteoarthritis", image: bubbleOsteoarthritis, label: "osteoarthritis" },
  { className: "hyaline", image: bubbleHyaline, label: <>hyaline<br />cartilage<br />injury</> },
  { className: "focal", image: bubbleFocal, label: <>focal traumatic<br />cartilage defect</> },
  { className: "gout", image: bubbleGout, label: "chronic gout" },
  { className: "patellae", image: bubblePatellae, label: <>chondromalacia<br />patellae</> },
  { className: "acl", image: bubbleAcl, label: <>status post ACL<br />reconstruction</> },
] as const;

const decorativeBubbles = [
  ["top", bubbleDecorTop],
  ["left", bubbleDecorLeft],
  ["right", bubbleDecorRight],
] as const;

const statementLines = [
  "Cartilage",
  "damage is",
  "widespread—",
  "yet lasting",
  "repair remains",
  "elusive.",
] as const;

function useRevealOnScroll<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function BubbleAwareness() {
  const introReveal = useRevealOnScroll<HTMLDivElement>(0.22);
  const figureOneReveal = useRevealOnScroll<HTMLDivElement>(0.2);

  return (
    <section
      id="bubble-awareness"
      className="bubble-awareness"
      aria-label="The global burden of cartilage damage"
      data-node-id="1226:1877"
    >
      <div className="bubble-awareness__inner">
        <div
          ref={introReveal.ref}
          className="bubble-awareness__intro"
          data-visible={introReveal.visible}
        >
          <h1 className="bubble-awareness__statement">
            {statementLines.map((line, index) => (
              <span
                key={line}
                style={{ "--reveal-order": index } as CSSProperties}
              >
                {line}
              </span>
            ))}
          </h1>

          <div className="bubble-cluster" aria-label="Types of cartilage damage">
            {bubbles.map((bubble, index) => (
              <div
                className={`bubble-cluster__item bubble-cluster__item--${bubble.className}`}
                key={bubble.className}
                style={{ "--bubble-order": index } as CSSProperties}
              >
                <img src={bubble.image} alt="" />
                <span>{bubble.label}</span>
              </div>
            ))}
            {decorativeBubbles.map(([name, image], index) => (
              <img
                className={`bubble-cluster__decor bubble-cluster__decor--${name}`}
                src={image}
                alt=""
                aria-hidden="true"
                key={name}
                style={{ "--bubble-order": bubbles.length + index } as CSSProperties}
              />
            ))}
          </div>
        </div>

        <div
          ref={figureOneReveal.ref}
          className="bubble-awareness__burden"
          data-visible={figureOneReveal.visible}
        >
          <div className="bubble-awareness__burden-copy">
            <h2>A world in <strong>PAIN</strong>.<br />A need for repair.</h2>
            <div
              className="bubble-awareness__stair-person"
              data-node-id="1226:1722"
            >
              <img
                src={stairKneePain}
                alt="A person experiencing knee pain while using stairs"
              />
            </div>
          </div>

          <div className="bubble-awareness__map-card">
            <div className="bubble-awareness__stat">
              <strong>2 in 3</strong>
              <span>Knees examined had cartilage damage.</span>
            </div>
            <div className="opening-burden__map">
              <InteractiveWorldMap />
              <div className="opening-burden__legend" aria-hidden="true">
                <strong>OA PATIENT COUNTS</strong>
                <img src={`${import.meta.env.BASE_URL}images/home/490d7.svg`} alt="" />
                <span>&lt;100k</span>
                <span>50m+</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bubble-awareness__sports">
          <div className="bubble-awareness__sports-copy">
            <h2>Pain <strong>takes more</strong><br />than movement.</h2>
            <div className="bubble-awareness__score">
              <strong>27.5</strong>
              <span>OUT OF 100</span>
              <small>(higher is better)</small>
            </div>
            <p>Quality of life score<br />prior to cartilage repair</p>
          </div>
          <img
            className="bubble-awareness__sports-person"
            src={sportsKneeTrauma}
            alt="A boy holding his knee after a sports injury"
          />
        </div>

        <div className="bubble-awareness__rehab">
          <img
            className="bubble-awareness__rehab-person"
            src={postOpRehabilitation}
            alt="A young patient recovering after knee surgery"
          />
          <div className="bubble-awareness__rehab-copy">
            <h2>Getting life back<br />comes at a <strong>COST</strong>.</h2>
            <div className="bubble-awareness__cost">
              <strong>~£2</strong>
              <b>billion/yr.</b>
              <span>Treatment-spending scenario.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
