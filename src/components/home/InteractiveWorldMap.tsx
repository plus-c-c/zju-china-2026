import {
  type FocusEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { CHINA_ISLANDS_PATH } from "./ChinaIslands";
import { SOUTH_CHINA_SEA_NINE_DASH_PATH } from "./SouthChinaSeaNineDash";
import { worldMapData } from "./WorldMapData";

const CHINA_ISO = "CHN";
const TAIWAN_ISO = "TWN";
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

type MapTooltip = {
  country: string;
  count: number | null;
  left?: number;
  right?: number;
  top: number;
};

const numberFormatter = new Intl.NumberFormat("en-US");

function findCountry(target: EventTarget | null) {
  return target instanceof Element
    ? target.closest<SVGGraphicsElement>(".country")
    : null;
}

function prepareWorldMapMarkup(markup: string) {
  const document = new DOMParser().parseFromString(markup, "image/svg+xml");
  const svg = document.documentElement;
  const china = svg.querySelector<SVGGraphicsElement>(
    `.country[data-iso="${CHINA_ISO}"]`,
  );
  const taiwan = svg.querySelector<SVGGraphicsElement>(
    `.country[data-iso="${TAIWAN_ISO}"]`,
  );
  const chinaRecord = worldMapData[CHINA_ISO];

  if (china && taiwan && chinaRecord) {
    const accessibleLabel = `${chinaRecord.country}: ${numberFormatter.format(chinaRecord.mapCount ?? 0)} people (GBD model)`;

    china.dataset.name = chinaRecord.country;
    china.setAttribute("aria-label", accessibleLabel);
    china.querySelector("title")?.replaceChildren(chinaRecord.country);

    // Taiwan shares China's interaction and data instead of acting as a
    // separately focusable reporting region.
    taiwan.dataset.iso = CHINA_ISO;
    taiwan.dataset.name = chinaRecord.country;
    taiwan.removeAttribute("tabindex");
    taiwan.setAttribute("aria-hidden", "true");
    taiwan.querySelector("title")?.replaceChildren(chinaRecord.country);
  }

  if (china && !svg.querySelector(".china-nine-dash")) {
    const nineDash = document.createElementNS(SVG_NAMESPACE, "path");
    nineDash.setAttribute("class", "china-nine-dash");
    nineDash.setAttribute("aria-hidden", "true");
    nineDash.setAttribute("d", SOUTH_CHINA_SEA_NINE_DASH_PATH);
    // The supplied reference uses a 1440 × 730 canvas; the project map uses
    // 900 × 435, so keep the source geometry aligned through view-box scaling.
    nineDash.setAttribute("transform", "scale(0.625 0.595890411)");
    china.parentElement?.append(nineDash);
  }

  if (china && !svg.querySelector(".china-islands")) {
    const chinaIslands = document.createElementNS(SVG_NAMESPACE, "path");
    chinaIslands.setAttribute("class", "country china-islands");
    chinaIslands.setAttribute("data-iso", CHINA_ISO);
    chinaIslands.setAttribute("data-name", chinaRecord?.country ?? "China");
    chinaIslands.setAttribute("aria-hidden", "true");
    chinaIslands.setAttribute("d", CHINA_ISLANDS_PATH);
    chinaIslands.setAttribute("transform", "scale(0.625 0.595890411)");
    china.parentElement?.append(chinaIslands);
  }

  return svg.outerHTML;
}

export function InteractiveWorldMap({ interactive = true }: { interactive?: boolean }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [worldMapMarkup, setWorldMapMarkup] = useState("");
  const [tooltip, setTooltip] = useState<MapTooltip | null>(null);
  const [activeIso, setActiveIso] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(
      "https://static.igem.wiki/teams/6102/wiki/images/home/world-map-new.svg",
      {
        signal: controller.signal,
      },
    )
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load the world map");
        return response.text();
      })
      .then(prepareWorldMapMarkup)
      .then(setWorldMapMarkup)
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.error(error);
        }
      });

    return () => controller.abort();
  }, []);

  function showTooltip(
    countryElement: SVGGraphicsElement,
    clientX: number,
    clientY: number,
  ) {
    const map = mapRef.current;
    if (!map) return;

    const bounds = map.getBoundingClientRect();
    const scaleX = map.offsetWidth / bounds.width;
    const scaleY = map.offsetHeight / bounds.height;
    const pointerX = (clientX - bounds.left) * scaleX;
    const top = (clientY - bounds.top) * scaleY - 48;
    const iso = countryElement.dataset.iso ?? "";
    const record = worldMapData[iso];

    setActiveIso(iso || null);

    setTooltip({
      country: record?.country ?? countryElement.dataset.name ?? iso,
      count: record?.mapCount ?? null,
      ...(pointerX > map.offsetWidth / 2
        ? { right: Math.max(8, map.offsetWidth - pointerX + 12) }
        : { left: Math.max(8, pointerX + 12) }),
      top: Math.max(8, Math.min(top, map.offsetHeight - 62)),
    });
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;

    const country = findCountry(event.target);
    if (country) showTooltip(country, event.clientX, event.clientY);
    else {
      setTooltip(null);
      setActiveIso(null);
    }
  }

  function handleFocus(event: FocusEvent<HTMLDivElement>) {
    const country = findCountry(event.target);
    if (!country) return;

    const bounds = country.getBoundingClientRect();
    showTooltip(
      country,
      bounds.left + bounds.width / 2,
      bounds.top + bounds.height / 2,
    );
  }

  return (
    <div
      aria-label={interactive ? "Interactive world map of osteoarthritis patient counts" : "World map of osteoarthritis patient counts"}
      inert={!interactive}
      className="opening-burden__world"
      data-active-iso={activeIso ?? undefined}
      onBlurCapture={() => {
        setTooltip(null);
        setActiveIso(null);
      }}
      onFocusCapture={interactive ? handleFocus : undefined}
      onPointerLeave={() => {
        setTooltip(null);
        setActiveIso(null);
      }}
      onPointerMove={interactive ? handlePointerMove : undefined}
      ref={mapRef}
      role="img"
    >
      <div
        className="opening-burden__world-svg"
        dangerouslySetInnerHTML={{ __html: worldMapMarkup }}
      />
      {interactive && tooltip && (
        <div
          className="opening-burden__map-tip"
          role="status"
          style={{
            left: tooltip.left,
            right: tooltip.right,
            top: tooltip.top,
          }}
        >
          <strong>{tooltip.country}</strong>
          <span>
            {tooltip.count === null
              ? "No included data"
              : `${numberFormatter.format(tooltip.count)} people living with osteoarthritis`}
          </span>
        </div>
      )}
    </div>
  );
}
