import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Pages from "../pages.ts";
import { navigationIcon, pageDetails } from "./navigationIcons";
import "./Navbar.css";

const desktopNavigation = () => window.matchMedia("(min-width: 992px)").matches;

export function Navbar({ introEntrance = false }: { introEntrance?: boolean }) {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const leaveTimer = useRef<number | undefined>(undefined);
  const focusFrame = useRef(0);
  const hoverOpened = useRef<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [introPlaying, setIntroPlaying] = useState(introEntrance);

  const cancelLeave = () => window.clearTimeout(leaveTimer.current);
  const closeMenus = () => {
    cancelLeave();
    hoverOpened.current = null;
    setOpenDropdown(null);
    setExpanded(false);
  };

  useEffect(() => {
    window.clearTimeout(leaveTimer.current);
    setOpenDropdown(null);
    setExpanded(false);
    let frame = 0;

    const updateNavbar = () => {
      frame = 0;
      const atTop = window.scrollY < 10;
      setNavbarVisible(atTop);

      if (!atTop) {
        setOpenDropdown(null);
        setExpanded(false);
        setIntroPlaying(false);
      }
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateNavbar);
    };

    updateNavbar();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(focusFrame.current);
      window.clearTimeout(leaveTimer.current);
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsidePointer = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !navRef.current?.contains(event.target)
      ) {
        setOpenDropdown(null);
        setExpanded(false);
      }
    };
    const breakpoint = window.matchMedia("(min-width: 992px)");
    const handleResize = () => {
      setOpenDropdown(null);
      setExpanded(false);
    };

    document.addEventListener("pointerdown", handleOutsidePointer);
    breakpoint.addEventListener("change", handleResize);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointer);
      breakpoint.removeEventListener("change", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [expanded]);

  const navbarHidden = !navbarVisible;
  const pages = Pages.filter((item) => !("path" in item && item.path === "/"));

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      aria-hidden={navbarHidden}
      inert={navbarHidden}
      onPointerEnter={cancelLeave}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse" && desktopNavigation()) {
          cancelLeave();
          leaveTimer.current = window.setTimeout(() => {
            const panel = openDropdown
              ? document.getElementById(openDropdown)
              : null;
            if (!panel?.contains(document.activeElement)) setOpenDropdown(null);
          }, 180);
        }
      }}
      onBlur={(event) => {
        // Switching panels can hide the focused link and send focus to the body.
        // Only a real focus destination outside this navigation should close it.
        if (
          event.relatedTarget &&
          !event.currentTarget.contains(event.relatedTarget)
        ) {
          closeMenus();
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Tab" && expanded && !desktopNavigation()) {
          const controls = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              "a[href], button",
            ),
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
        if (event.key !== "Escape") return;
        cancelLeave();
        event.preventDefault();
        if (openDropdown) {
          document.getElementById(`${openDropdown}-trigger`)?.focus();
          setOpenDropdown(null);
        } else if (expanded) {
          document.getElementById("nest-navigation-toggle")?.focus();
          setExpanded(false);
        }
      }}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) setIntroPlaying(false);
      }}
      className={`nest-navbar${introPlaying ? " nest-navbar-intro-enter" : ""}${navbarHidden ? " nest-navbar-hidden" : ""}`}
    >
      <div className="nest-navbar-bar">
        <Link
          to="/"
          className="brand-link"
          onClick={closeMenus}
          aria-label="ZJU-China home"
        >
          <img
            className="brand-team-logo"
            src="https://static.igem.wiki/teams/6102/wiki/images/team-logo.avif"
            alt=""
            width="98"
            height="41"
          />
        </Link>

        <button
          id="nest-navigation-toggle"
          className="nest-navigation-toggle"
          type="button"
          aria-label={expanded ? "Close navigation" : "Open navigation"}
          aria-controls="nest-navigation"
          aria-expanded={expanded}
          onClick={() => {
            setExpanded(!expanded);
            setOpenDropdown(null);
          }}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          id="nest-navigation"
          className={`nest-navigation${expanded ? " is-expanded" : ""}`}
        >
          <ul className="nest-nav-list">
            {pages.map((item, index) => {
              if ("folder" in item && item.folder) {
                const dropdownId = `nest-menu-${index}`;
                const isOpen = openDropdown === dropdownId;
                const isActive = item.folder.some(
                  (page) => page.path === location.pathname,
                );

                return (
                  <li
                    key={item.name}
                    className="nest-nav-group"
                    onPointerEnter={(event) => {
                      if (
                        event.pointerType === "mouse" &&
                        desktopNavigation() &&
                        window.matchMedia("(hover: hover)").matches
                      ) {
                        cancelLeave();
                        if (!isOpen) hoverOpened.current = dropdownId;
                        setOpenDropdown(dropdownId);
                      }
                    }}
                  >
                    <button
                      id={`${dropdownId}-trigger`}
                      type="button"
                      className={`nest-nav-trigger${isActive ? " is-active" : ""}`}
                      aria-expanded={isOpen}
                      aria-controls={dropdownId}
                      onClick={() => {
                        cancelLeave();
                        setOpenDropdown(
                          isOpen && hoverOpened.current !== dropdownId
                            ? null
                            : dropdownId,
                        );
                        hoverOpened.current = null;
                      }}
                      onKeyDown={(event) => {
                        if (
                          event.key !== "ArrowDown" &&
                          event.key !== "ArrowUp"
                        )
                          return;
                        event.preventDefault();
                        cancelLeave();
                        hoverOpened.current = null;
                        setOpenDropdown(dropdownId);
                        const focusLast = event.key === "ArrowUp";
                        window.cancelAnimationFrame(focusFrame.current);
                        focusFrame.current = window.requestAnimationFrame(
                          () => {
                            const links = document
                              .getElementById(dropdownId)
                              ?.querySelectorAll<HTMLAnchorElement>("a");
                            if (links?.length)
                              links[focusLast ? links.length - 1 : 0].focus();
                          },
                        );
                      }}
                    >
                      <span>{item.name}</span>
                      <span className="nest-nav-chevron" aria-hidden="true" />
                    </button>

                    <div
                      id={dropdownId}
                      className="nest-mega-panel"
                      aria-labelledby={`${dropdownId}-trigger`}
                      hidden={!isOpen}
                      onKeyDown={(event) => {
                        if (
                          !["ArrowDown", "ArrowUp", "Home", "End"].includes(
                            event.key,
                          )
                        )
                          return;
                        const links = Array.from(
                          event.currentTarget.querySelectorAll<HTMLAnchorElement>(
                            "a",
                          ),
                        );
                        const current = links.indexOf(
                          document.activeElement as HTMLAnchorElement,
                        );
                        if (current === -1) return;
                        event.preventDefault();
                        const next =
                          event.key === "Home"
                            ? 0
                            : event.key === "End"
                              ? links.length - 1
                              : (current +
                                  (event.key === "ArrowDown" ? 1 : -1) +
                                  links.length) %
                                links.length;
                        links[next].focus();
                      }}
                    >
                      <ul className="nest-mega-grid">
                        {item.folder.map((page) => {
                          if (!page.path) return null;
                          const details = pageDetails[page.path];
                          const active = location.pathname === page.path;
                          return (
                            <li key={page.path}>
                              <Link
                                className={`nest-nav-tile${active ? " is-active" : ""}`}
                                to={page.path}
                                aria-current={active ? "page" : undefined}
                                onClick={closeMenus}
                              >
                                <img
                                  className="nest-tile-icon"
                                  src={
                                    details
                                      ? navigationIcon(details.icon)
                                      : undefined
                                  }
                                  alt=""
                                  width="72"
                                  height="72"
                                />
                                <span className="nest-tile-copy">
                                  <span className="nest-tile-title">
                                    {page.name}
                                  </span>
                                  {details && (
                                    <span className="nest-tile-description">
                                      {details.description}
                                    </span>
                                  )}
                                </span>
                                <span
                                  className="nest-tile-arrow"
                                  aria-hidden="true"
                                >
                                  ↗
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              }

              if ("path" in item && item.path) {
                return (
                  <li
                    key={item.path}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse" && desktopNavigation())
                        setOpenDropdown(null);
                    }}
                  >
                    <Link
                      className={`nest-nav-trigger${location.pathname === item.path ? " is-active" : ""}`}
                      to={item.path}
                      aria-current={
                        location.pathname === item.path ? "page" : undefined
                      }
                      onClick={closeMenus}
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              }
              return null;
            })}
            <li
              className="navigation-cart"
              title="Shopping cart — not available yet"
            >
              <img
                src="https://static.igem.wiki/teams/6102/wiki/images/navigation/cart.svg"
                alt="Shopping cart (not available yet)"
                width="22"
                height="22"
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
