import "bootstrap/dist/css/bootstrap.min.css";
import "katex/dist/katex.min.css";
import "./App.css";
import "../../components/table.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { getPathMapping, stringToSlug } from "../../utils";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { NotFound } from "../../components/NotFound";
import { Footer } from "../../components/Footer";
import { Toc } from "../../components/toc";
import { BackToTop } from "../../components/BackToTop";
import { LoadingScreen } from "../../components/LoadingScreen";

const MINIMUM_LOADING_TIME = 600;
const MAXIMUM_LOADING_TIME = 8000;

const App = () => {
  const location = useLocation();
  const previousScrollPath = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(true);
    if (currentPath === "/") {
      setHomeIntroReady(false);
    }

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

      await Promise.race([assetsReady, timeout]);
      const remainingTime = Math.max(
        0,
        MINIMUM_LOADING_TIME - (performance.now() - startedAt),
      );
      await new Promise((resolve) => window.setTimeout(resolve, remainingTime));

      if (!cancelled) setIsLoading(false);
    };

    void waitForPageAssets();

    return () => {
      cancelled = true;
    };
  }, [currentPath, location.key]);

  return (
    <div className="app">
      <LoadingScreen visible={isLoading} />

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
                    <div className="home-container">
                      {!isLoading && <Component />}
                    </div>
                  ) : (
                    <Toc
                      key={path}
                      title={title || ""}
                      hideToc={path === "/engineering"}
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
  );
};

export default App;
