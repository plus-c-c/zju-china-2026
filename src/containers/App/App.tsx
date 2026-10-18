import "bootstrap/dist/css/bootstrap.min.css";
import "katex/dist/katex.min.css";
import "./App.css";
import "../../components/table.css";
import "../../components/figureCaption.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { getPathMapping, stringToSlug } from "../../utils";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { NotFound } from "../../components/NotFound";
import { Footer } from "../../components/Footer";
import { Toc } from "../../components/toc";
import { BackToTop } from "../../components/BackToTop";
import { LoadingScreen } from "../../components/LoadingScreen";
import "./Mobile.css";
import { BirdCursorProvider } from "../../components/BirdCursor";

import { waitForHomeAssets } from "../../utils/homeAssetReadiness";

const MINIMUM_LOADING_TIME = 600;
const MAXIMUM_LOADING_TIME = 8000;

const SHARED_WETLAB_PAGES = ["/experiments", "/results"];

const App = () => {
  const location = useLocation();
  const previousScrollPath = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const loadedWetlabPages = useRef<Set<string>>(new Set());
  const [homeIntroReady, setHomeIntroReady] = useState(false);
  const [isMobileNavigation, setIsMobileNavigation] = useState(
    () => window.matchMedia("(max-width: 991.98px)").matches,
  );
  const pathMapping = getPathMapping();
  const currentPath =
    location.pathname
      .split(`${stringToSlug(import.meta.env.VITE_TEAM_NAME)}`)
      .pop() || "/";

  useLayoutEffect(() => {
    if (previousScrollPath.current === location.pathname) return;
    previousScrollPath.current = location.pathname;
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);

  // Set Page Title
  const currentPage =
    currentPath in pathMapping ? pathMapping[currentPath] : undefined;
  const isNotFound = !currentPage;
  const isHome = currentPath === "/";
  const navigationTitle = currentPage
    ? currentPage.navigationTitle
    : "Not Found";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 991.98px)");
    const updateMobileNavigation = () =>
      setIsMobileNavigation(mediaQuery.matches);

    updateMobileNavigation();
    mediaQuery.addEventListener("change", updateMobileNavigation);
    return () =>
      mediaQuery.removeEventListener("change", updateMobileNavigation);
  }, []);

  useEffect(() => {
    const handleHomeIntroReady = () => setHomeIntroReady(true);
    window.addEventListener("home-intro-ready", handleHomeIntroReady);

    return () => {
      window.removeEventListener("home-intro-ready", handleHomeIntroReady);
    };
  }, []);

  useEffect(() => {
    document.title = `${navigationTitle || ""} | ${import.meta.env.VITE_TEAM_NAME} - iGEM ${import.meta.env.VITE_TEAM_YEAR}`;
  }, [navigationTitle]);

  useEffect(() => {
    document.documentElement.classList.add("scrollbar");
    document.body.classList.add("scrollbar");

    return () => {
      document.documentElement.classList.remove("scrollbar");
      document.body.classList.remove("scrollbar");
    };
  }, []);

  useLayoutEffect(() => {
    let cancelled = false;
    const startedAt = performance.now();
    const isSharedWetlabPage = SHARED_WETLAB_PAGES.includes(currentPath);

    // Experiments and Results stay loaded together: entering either page keeps
    // both available, so switching between them skips the loading screen.
    if (
      isSharedWetlabPage &&
      SHARED_WETLAB_PAGES.every((path) => loadedWetlabPages.current.has(path))
    ) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setLoadingFailed(false);
    if (currentPath === "/") {
      setHomeIntroReady(false);
    }

    let onOpeningReady: (() => void) | undefined;
    const openingReady = currentPath === "/" ? new Promise<void>((resolve) => {
      onOpeningReady = () => resolve();
      window.addEventListener("home-opening-assets-ready", onOpeningReady, { once: true });
    }) : Promise.resolve();

    const waitForPageAssets = async () => {
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );

      const contentImages = Array.from(
        document.querySelectorAll<HTMLImageElement>(".content img"),
      ).filter((image) => image.loading !== "lazy");

      const imagePromises = contentImages.map((image) => {
        if (image.complete) return Promise.resolve();
        return new Promise<void>((resolve) => {
          image.addEventListener("load", () => resolve(), { once: true });
          image.addEventListener("error", () => resolve(), { once: true });
        });
      });

      const fontsReady = document.fonts?.ready ?? Promise.resolve();
      const assetsReady = Promise.all([...imagePromises, fontsReady]);
      const timeout = new Promise<void>((resolve) =>
        window.setTimeout(resolve, MAXIMUM_LOADING_TIME),
      );

      await Promise.all([
        currentPath === "/" ? waitForHomeAssets() : Promise.race([assetsReady, timeout]),
        openingReady,
      ]);
      const remainingTime = Math.max(
        0,
        MINIMUM_LOADING_TIME - (performance.now() - startedAt),
      );
      await new Promise((resolve) => window.setTimeout(resolve, remainingTime));

      if (!cancelled) {
        if (isSharedWetlabPage)
          SHARED_WETLAB_PAGES.forEach((path) =>
            loadedWetlabPages.current.add(path),
          );
        setIsLoading(false);
      }
    };

    void waitForPageAssets().catch(() => {
      if (!cancelled) setLoadingFailed(true);
    });

    return () => {
      cancelled = true;
      if (onOpeningReady) window.removeEventListener("home-opening-assets-ready", onOpeningReady);
    };
  }, [currentPath, location.key]);

  useEffect(() => {
    if (!isLoading) window.dispatchEvent(new Event("page-loading-complete"));
  }, [isLoading]);

  return (
    <BirdCursorProvider enabled={!isLoading && !isHome}>
      <div className="app">
        <LoadingScreen visible={isLoading} failed={loadingFailed} />

        {/* Navigation */}
        {(!isHome || homeIntroReady || isMobileNavigation) && (
          <Navbar
            introEntrance={isHome && homeIntroReady && !isMobileNavigation}
          />
        )}

        {/* Header and PageContent */}
        <main
          className={`content ${
            currentPath === "/"
              ? "content-home"
              : isNotFound
                ? "content-not-found"
                : "content-page"
          }`}
        >
          <Routes>
            {Object.entries(pathMapping).map(
              ([path, { title, component: Component }]) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    path === "/" ? (
                      <div className="home-container" key={location.key}>
                        <Component />
                      </div>
                    ) : (
                      <Toc
                        key={path}
                        title={title || ""}
                        hideToc={path === "/engineering"}
                        tocSide={path === "/results" ? "right" : "left"}
                      >
                        <Component />
                      </Toc>
                    )
                  }
                />
              ),
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {!isNotFound && <BackToTop />}

        {/* Footer */}
        {/* MUST mention license AND have a link to team wiki's repository on gitlab.igem.org */}
        {currentPath !== "/" && !isNotFound && <Footer />}
      </div>
    </BirdCursorProvider>
  );
};

export default App;
