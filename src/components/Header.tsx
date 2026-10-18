import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";

const headerImageBase =
  "https://static.igem.wiki/teams/6102/wiki/images/header";

const headerImages: Record<string, string> = {
  "/description": "02-project-description.avif",
  "/design": "03-project-design.avif",
  "/proof-of-concept": "04-proof-of-concept.avif",
  "/implementation": "05-project-implementation.avif",
  "/future-plan": "06-project-future-plan.avif",
  "/contribution": "07-project-contribution.avif",
  "/engineering": "08-engineering.avif",
  "/experiments": "09-wetlab-experiment-and-result.avif",
  "/results": "09-wetlab-experiment-and-result.avif",
  "/protocol": "10-wetlab-protocol.avif",
  "/parts": "11-wetlab-parts.avif",
  "/safety": "12-wetlab-safety.avif",
  "/hardware": "13-drylab-hardware.avif",
  "/software": "14-drylab-software.avif",
  "/model": "15-drylab-model.avif",
  "/human-practices": "16-engagement-ihp.avif",
  "/entrepreneurship": "17-engagement-entrepreneurship.avif",
  "/education": "18-engagement-education.avif",
  "/notebook": "20-team-notebook.avif",
  "/attributions": "22-team-attributions.avif",
  "/sponsors": "23-team-sponsors.avif",
};

const membersHeaderImage =
  "https://static.igem.wiki/teams/6102/wiki/images/header/24-members.avif";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { pathname } = useLocation();
  const normalizedPath = pathname.replace(/\/$/, "") || "/";
  const imageName = headerImages[normalizedPath];
  const imageSource =
    normalizedPath === "/members"
      ? membersHeaderImage
      : imageName
        ? `${headerImageBase}/${imageName}`
        : undefined;

  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const heading = titleRef.current;
    const text = textRef.current;
    if (!heading || !text) return;
    const fitTitle = () => {
      heading.style.removeProperty("--header-title-size");
      const style = getComputedStyle(heading);
      const available = heading.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - 6;
      const width = text.getBoundingClientRect().width;
      if (width > available && available > 0) {
        heading.style.setProperty("--header-title-size", `${parseFloat(style.fontSize) * available / width}px`);
      }
    };
    const observer = new ResizeObserver(fitTitle);
    observer.observe(heading.parentElement!);
    let active = true;
    void document.fonts.ready.then(() => { if (active) fitTitle(); });
    document.fonts.addEventListener("loadingdone", fitTitle);
    fitTitle();
    return () => {
      active = false;
      observer.disconnect();
      document.fonts.removeEventListener("loadingdone", fitTitle);
    };
  }, [title]);

  return (
    <header className="header">
      <div className="header-card">
        {imageSource && (
          <img
            className="header-image"
            src={imageSource}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
          />
        )}
        <h1 className="header-title" ref={titleRef}><span ref={textRef}>{title}</span></h1>
      </div>
    </header>
  );
}
