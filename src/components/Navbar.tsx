import { Link, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState, type HTMLAttributes } from "react";
import Pages from "../pages.ts";
import { navigationIcon, pageDetails } from "./navigationIcons";
import { NavIcon } from "./NavIcon";
import "./Navbar.css";

const desktopNavigation = () => window.matchMedia("(min-width: 992px)").matches;

function NavigationPanel({
  isOpen,
  allowExit,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { isOpen: boolean; allowExit: boolean }) {
  const [present, setPresent] = useState(isOpen);
  useEffect(() => {
    if (isOpen) {
      setPresent(true);
      return;
    }
    if (!allowExit) {
      setPresent(false);
      return;
    }
    const timer = window.setTimeout(() => setPresent(false), 120);
    return () => window.clearTimeout(timer);
  }, [isOpen, allowExit]);
  return (
    <div
      {...props}
      hidden={!isOpen && (!present || !allowExit)}
      inert={!isOpen}
      aria-hidden={!isOpen}
      data-state={isOpen ? "open" : "closing"}
    >
      {children}
    </div>
  );
}

export function Navbar({ introEntrance = false, opening = false }: { introEntrance?: boolean; opening?: boolean }) {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const focusFrame = useRef(0);
  const scheduleVisibilityUpdate = useRef<(() => void) | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const openMenuRef = useRef<string | null>(null);
  openMenuRef.current = openDropdown;
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [introPlaying, setIntroPlaying] = useState(introEntrance);

  useLayoutEffect(() => {
    if (introEntrance) setIntroPlaying(true);
  }, [introEntrance]);

  const closeMenus = () => {
    setOpenDropdown(null);
    setExpanded(false);
  };

  useEffect(() => {
    setOpenDropdown(null);
    setExpanded(false);
    const hoverMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    const desktopMedia = window.matchMedia("(min-width: 992px)");
    let visible = false;
    let showTimer: number | undefined;
    let hideTimer: number | undefined;
    let frame = 0;
    let pointer: { x: number; y: number } | null = null;
    const canHover = () => desktopMedia.matches && hoverMedia.matches;
    const atPageTop = () => window.scrollY <= 2;
    const hasKeyboardFocus = () =>
      navRef.current?.contains(document.activeElement) &&
      document.activeElement?.matches(":focus-visible");
    const show = () => {
      window.clearTimeout(hideTimer);
      hideTimer = undefined;
      visible = true;
      setNavbarVisible(true);
      // Hover navigation must respond immediately, even during the home intro.
      if (canHover() && pointer) setIntroPlaying(false);
    };
    const hide = () => {
      visible = false;
      setNavbarVisible(false);
      setOpenDropdown(null);
      setExpanded(false);
      setIntroPlaying(false);
    };
    const update = () => {
      frame = 0;
      if (!canHover() || atPageTop()) {
        window.clearTimeout(showTimer);
        showTimer = undefined;
        show();
        return;
      }
      const target = pointer
        ? document.elementFromPoint(pointer.x, pointer.y)
        : null;
      // The Engineering level-1 row pins to the very top of the viewport
      // during the DBTL runway. Its rectangle must not wake the navbar, or
      // the bar would cover the buttons. The tiny gap above it and the areas
      // to its left/right remain normal wake zones.
      const engineeringNav = document.querySelector<HTMLElement>(
        ".eng-module-nav",
      );
      const engineeringRect = engineeringNav?.getBoundingClientRect();
      const navHeight = navRef.current?.offsetHeight ?? 88;
      const engineeringAtTop =
        !!engineeringRect &&
        engineeringRect.top >= 0 &&
        engineeringRect.top <= navHeight + 12;
      const overEngineeringL1 =
        !!pointer &&
        engineeringAtTop &&
        engineeringRect &&
        pointer.x >= engineeringRect.left - 8 &&
        pointer.x <= engineeringRect.right + 8 &&
        pointer.y >= engineeringRect.top - 2 &&
        pointer.y <= engineeringRect.bottom + 10;
      const overNavigation =
        visible &&
        pointer &&
        !overEngineeringL1 &&
        (navRef.current?.contains(target) ||
          (pointer.y >= 0 &&
            pointer.y <= (navRef.current?.offsetHeight ?? 88)));
      // The wake-up area matches the navigation bar itself: the full page
      // width across the bar's height, so hovering anywhere over the bar's
      // resting place brings it back. Interactive controls and sticky section
      // navigation stay excluded below, so their buttons do not move on hover.
      let overRevealArea =
        !!pointer &&
        pointer.y >= 0 &&
        pointer.y <= (navRef.current?.offsetHeight ?? 88) &&
        !overEngineeringL1;
      if (overRevealArea && pointer) {
        // No overlay intercepts clicks. Exclude the entire section sticky bar,
        // including its padding, and other interactive controls at the edge.
        const protectedBar = document.querySelector(
          ".wetlab-results__navigation, .project-tracks__navigation",
        );
        const rect = protectedBar?.getBoundingClientRect();
        const overSectionBar =
          rect &&
          pointer.x >= rect.left - 8 &&
          pointer.x <= rect.right + 8 &&
          pointer.y >= rect.top - 8 &&
          pointer.y <= rect.bottom + 8;
        overRevealArea =
          !overSectionBar &&
          !target?.closest(
            "a, button, input, select, textarea, [role='button'], [contenteditable='true']",
          );
      }
      if (overNavigation || hasKeyboardFocus() || openMenuRef.current) {
        window.clearTimeout(hideTimer);
        hideTimer = undefined;
      } else if (overRevealArea) {
        window.clearTimeout(hideTimer);
        hideTimer = undefined;
        if (showTimer === undefined) {
          showTimer = window.setTimeout(() => {
            showTimer = undefined;
            show();
          }, 140);
        }
      } else {
        window.clearTimeout(showTimer);
        showTimer = undefined;
        if (visible && hideTimer === undefined) {
          hideTimer = window.setTimeout(() => {
            hideTimer = undefined;
            if (!atPageTop() && !hasKeyboardFocus() && !openMenuRef.current)
              hide();
          }, 220);
        }
      }
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.buttons) return;
      pointer = { x: event.clientX, y: event.clientY };
      scheduleUpdate();
    };
    const leaveWindow = (event: PointerEvent) => {
      if (!event.relatedTarget) {
        pointer = null;
        scheduleUpdate();
      }
    };
    const focus = () => {
      if (hasKeyboardFocus()) show();
      else scheduleUpdate();
    };
    const resetMode = () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      showTimer = hideTimer = undefined;
      // Initialize both visibility states when restoring a scrolled page or
      // switching from touch navigation to desktop hover navigation.
      if (canHover() && !atPageTop() && !hasKeyboardFocus()) hide();
      update();
    };
    scheduleVisibilityUpdate.current = scheduleUpdate;
    resetMode();
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", leaveWindow);
    document.addEventListener("focusin", focus);
    document.addEventListener("focusout", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    hoverMedia.addEventListener("change", resetMode);
    desktopMedia.addEventListener("change", resetMode);
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      scheduleVisibilityUpdate.current = null;
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leaveWindow);
      document.removeEventListener("focusin", focus);
      document.removeEventListener("focusout", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      hoverMedia.removeEventListener("change", resetMode);
      desktopMedia.removeEventListener("change", resetMode);
      window.removeEventListener("resize", scheduleUpdate);
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(focusFrame.current);
    };
  }, [location.pathname]);

  useEffect(() => {
    // Closing a menu must recheck visibility even if the pointer stays still.
    scheduleVisibilityUpdate.current?.();
  }, [openDropdown]);

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

  const navbarHidden = opening || !navbarVisible;
  const pages = Pages;

  return (
    <>
      <button
        type="button"
        className="nest-nav__reveal"
        hidden={opening}
        onClick={() => {
          setNavbarVisible(true);
          setIntroPlaying(false);
          focusFrame.current = window.requestAnimationFrame(() =>
            navRef.current?.querySelector<HTMLAnchorElement>("a")?.focus(),
          );
        }}
      >
        Show main navigation
      </button>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        aria-hidden={navbarHidden}
        inert={navbarHidden}
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
        className={`nest-navbar${opening ? " nest-navbar-opening" : ""}${introPlaying ? " nest-navbar-intro-enter" : ""}${navbarHidden ? " nest-navbar-hidden" : ""}`}
      >
        <div className="nest-navbar-bar">
          <Link
            to="/"
            className="brand-link"
            onClick={closeMenus}
            aria-label="ZJU-China home"
          >
            <img
              className="brand-project-logo"
              src="https://static.igem.wiki/teams/6102/wiki/team-logo.avif"
              alt="NEST project"
              width="66"
              height="62"
            />
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
                    <li key={item.name} className="nest-nav-group">
                      <button
                        id={`${dropdownId}-trigger`}
                        type="button"
                        className={`nest-nav-trigger${isActive ? " is-active" : ""}`}
                        aria-expanded={isOpen}
                        aria-controls={dropdownId}
                        onClick={() => {
                          setOpenDropdown(isOpen ? null : dropdownId);
                        }}
                        onKeyDown={(event) => {
                          if (
                            event.key !== "ArrowDown" &&
                            event.key !== "ArrowUp"
                          )
                            return;
                          event.preventDefault();
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

                      <NavigationPanel
                        isOpen={isOpen}
                        allowExit={openDropdown === null}
                        id={dropdownId}
                        className="nest-mega-panel"
                        aria-labelledby={`${dropdownId}-trigger`}
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
                                  {details ? (
                                    <NavIcon
                                      className="nest-tile-icon"
                                      src={navigationIcon(details.icon)}
                                    />
                                  ) : (
                                    <img
                                      className="nest-tile-icon"
                                      alt=""
                                      width="72"
                                      height="72"
                                    />
                                  )}
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
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </NavigationPanel>
                    </li>
                  );
                }

                if ("path" in item && item.path) {
                  return (
                    <li key={item.path}>
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
    </>
  );
}
