import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Pages from "../pages.ts";
import "./Navbar.css";

// Short navigation descriptions; scientific page content stays in its own route.
const descriptions: Record<string, string> = {
  "/description": "The context behind our project",
  "/design": "How our system is designed",
  "/proof-of-concept": "Putting the concept to the test",
  "/implementation": "From the lab to application",
  "/future-plan": "The next steps for our project",
  "/contribution": "Resources for the iGEM community",
  "/experiments": "Explore our experimental work",
  "/results": "Platform and function in focus",
  "/protocol": "Methods and step-by-step procedures",
  "/parts": "The biological parts in our system",
  "/notebook": "Follow our work in the lab",
  "/safety": "Responsible work in the laboratory",
  "/hardware": "Tools built for our project",
  "/software": "Our computational tools",
  "/model": "Understanding our system through models",
  "/human-practices": "Listening, learning and responding",
  "/entrepreneurship": "Exploring a path to market",
  "/education": "Sharing science with our communities",
  "/members": "Meet the people behind ZJU-China",
  "/attributions": "The people and support behind the work",
  "/sponsors": "The partners supporting our team",
};

const navigation = Pages.filter(
  (page) => !("path" in page && page.path === "/"),
);
const mobileQuery = "(max-width: 991.98px)";

export function Navbar({ introEntrance = false }: { introEntrance?: boolean }) {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const leaveTimer = useRef<number | undefined>(undefined);
  const focusFrame = useRef(0);
  const hoverOpened = useRef<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [introPlaying, setIntroPlaying] = useState(introEntrance);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(mobileQuery).matches,
  );

  const cancelLeave = () => window.clearTimeout(leaveTimer.current);
  const closeNavigation = () => {
    cancelLeave();
    hoverOpened.current = null;
    setOpenDropdown(null);
    setExpanded(false);
  };

  useEffect(() => {
    const media = window.matchMedia(mobileQuery);
    const update = () => {
      setIsMobile(media.matches);
      setExpanded(false);
      setOpenDropdown(null);
      window.clearTimeout(leaveTimer.current);
    };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    setExpanded(false);
    window.clearTimeout(leaveTimer.current);
    let frame = 0;
    const update = () => {
      frame = 0;
      const atTop = window.scrollY < 10;
      setNavbarVisible(atTop);
      if (!atTop) {
        setOpenDropdown(null);
        setExpanded(false);
        setIntroPlaying(false);
      }
    };
    const scroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(focusFrame.current);
      window.clearTimeout(leaveTimer.current);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobile || !expanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobile, expanded]);

  useEffect(() => {
    if (!openDropdown && !expanded) return;
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !navRef.current?.contains(event.target)
      ) {
        setOpenDropdown(null);
        setExpanded(false);
        window.clearTimeout(leaveTimer.current);
      }
    };
    const keyboard = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        window.clearTimeout(leaveTimer.current);
        if (openDropdown) {
          document.getElementById(`${openDropdown}-trigger`)?.focus();
          setOpenDropdown(null);
        } else {
          setExpanded(false);
          toggleRef.current?.focus();
        }
      }
      // Keep keyboard focus inside the full-screen mobile navigation while open.
      if (event.key === "Tab" && isMobile && expanded) {
        const controls = Array.from(
          navRef.current?.querySelectorAll<HTMLElement>("a[href], button") ||
            [],
        ).filter((element) => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", keyboard);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", keyboard);
    };
  }, [expanded, isMobile, openDropdown]);

  const focusPanel = (id: string, last: boolean) => {
    cancelLeave();
    hoverOpened.current = null;
    setOpenDropdown(id);
    window.cancelAnimationFrame(focusFrame.current);
    focusFrame.current = window.requestAnimationFrame(() => {
      const links = document
        .getElementById(id)
        ?.querySelectorAll<HTMLAnchorElement>("a");
      links?.[last ? links.length - 1 : 0]?.focus();
    });
  };

  const moveWithinPanel = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    const links = Array.from(
      event.currentTarget.querySelectorAll<HTMLAnchorElement>("a"),
    );
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (current < 0) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? links.length - 1
          : (current + (event.key === "ArrowDown" ? 1 : -1) + links.length) %
            links.length;
    links[next]?.focus();
  };

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      aria-hidden={!navbarVisible}
      inert={!navbarVisible}
      className={`nest-navbar${introPlaying ? " nest-navbar-intro-enter" : ""}${!navbarVisible ? " nest-navbar-hidden" : ""}`}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) setIntroPlaying(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          closeNavigation();
      }}
    >
      <div className="nest-nav__bar">
        <Link
          to="/"
          className="nest-nav__brand"
          aria-label="ZJU-China home"
          onClick={closeNavigation}
        >
          <img
            src="https://static.igem.wiki/teams/6102/wiki/images/team-logo.avif"
            alt=""
            width="98"
            height="41"
          />
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className="nest-nav__toggle"
          aria-controls="nest-navigation"
          aria-expanded={expanded}
          aria-label={expanded ? "Close navigation" : "Open navigation"}
          onClick={() => {
            setExpanded(!expanded);
            setOpenDropdown(null);
          }}
        >
          <span>{expanded ? "Close" : "Menu"}</span>
          <span className="nest-nav__menu-icon" aria-hidden="true" />
        </button>
        <ul
          id="nest-navigation"
          className="nest-nav__items"
          hidden={isMobile && !expanded}
        >
          {navigation.map((item, index) => {
            if ("folder" in item && item.folder) {
              const id = `nest-nav-panel-${index}`;
              const isOpen = openDropdown === id;
              const isActive = item.folder.some(
                (page) => page.path === location.pathname,
              );
              return (
                <li
                  key={item.name}
                  className="nest-nav__group"
                  onPointerEnter={cancelLeave}
                  onPointerLeave={() => {
                    if (isMobile) return;
                    cancelLeave();
                    leaveTimer.current = window.setTimeout(() => {
                      // A mouse departure must not dismiss a panel being used by keyboard.
                      if (
                        !document
                          .getElementById(id)
                          ?.contains(document.activeElement)
                      ) {
                        setOpenDropdown((current) =>
                          current === id ? null : current,
                        );
                      }
                    }, 180);
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget))
                      setOpenDropdown((current) =>
                        current === id ? null : current,
                      );
                  }}
                >
                  <button
                    type="button"
                    id={`${id}-trigger`}
                    className={`nest-nav__tab${isActive ? " is-current" : ""}`}
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onPointerEnter={(event) => {
                      if (
                        !isMobile &&
                        event.pointerType === "mouse" &&
                        window.matchMedia("(hover: hover)").matches
                      ) {
                        cancelLeave();
                        if (!isOpen) hoverOpened.current = id;
                        setOpenDropdown(id);
                      }
                    }}
                    onClick={() => {
                      cancelLeave();
                      setOpenDropdown(
                        isOpen && hoverOpened.current !== id ? null : id,
                      );
                      hoverOpened.current = null;
                    }}
                    onKeyDown={(event) => {
                      if (
                        event.key === "ArrowDown" ||
                        event.key === "ArrowUp"
                      ) {
                        event.preventDefault();
                        focusPanel(id, event.key === "ArrowUp");
                      }
                    }}
                  >
                    {item.name}
                    <span className="nest-nav__chevron" aria-hidden="true" />
                  </button>
                  <div
                    id={id}
                    className="nest-nav__panel"
                    aria-labelledby={`${id}-trigger`}
                    hidden={!isOpen}
                    onKeyDown={moveWithinPanel}
                  >
                    <div className="nest-nav__panel-inner">
                      <ul className="nest-nav__grid">
                        {item.folder
                          .filter((page) => page.path)
                          .map((page, pageIndex) => (
                            <li key={page.path}>
                              <Link
                                to={page.path!}
                                className="nest-nav__tile"
                                aria-current={
                                  location.pathname === page.path
                                    ? "page"
                                    : undefined
                                }
                                onClick={closeNavigation}
                              >
                                <span
                                  className="nest-nav__number"
                                  aria-hidden="true"
                                >
                                  {String(pageIndex + 1).padStart(2, "0")}
                                </span>
                                <span className="nest-nav__text">
                                  <span className="nest-nav__title">
                                    {page.title || page.name}
                                  </span>
                                  <span className="nest-nav__description">
                                    {descriptions[page.path!]}
                                  </span>
                                </span>
                                <span
                                  className="nest-nav__arrow"
                                  aria-hidden="true"
                                >
                                  ↗
                                </span>
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            }
            if ("path" in item && item.path)
              return (
                <li key={item.path} className="nest-nav__group">
                  <Link
                    to={item.path}
                    className={`nest-nav__tab${location.pathname === item.path ? " is-current" : ""}`}
                    aria-current={
                      location.pathname === item.path ? "page" : undefined
                    }
                    onPointerEnter={() => {
                      if (!isMobile) {
                        cancelLeave();
                        setOpenDropdown(null);
                      }
                    }}
                    onClick={closeNavigation}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            return null;
          })}
        </ul>
      </div>
    </nav>
  );
}
