const MAXIMUM_ASSET_WAIT = 4000;

/** Preload a fixed URL so animated components cannot interrupt its decoding. */
async function preloadImage(url: string) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const image = new Image();
    image.decoding = "async";
    image.src = url;
    try {
      await image.decode();
      if (!image.naturalWidth) throw new Error("Empty image");
      return;
    } catch (error) {
      if (attempt === 1) {
        const reason = error instanceof Error ? error.message : String(error);
        throw new Error(`Homepage image unavailable: ${url} (${reason})`);
      }
    }
  }
}

/** Start a request without making the loading screen wait for its decode. */
function warmImage(url: string) {
  const image = new Image();
  image.decoding = "async";
  image.src = url;
}

function collectImageUrl(image: HTMLImageElement, urls: Set<string>) {
  const src = image.getAttribute("src")?.trim();
  if (src) urls.add(image.currentSrc || image.src);
}

function collectBackgroundUrl(element: Element | null, urls: Set<string>) {
  if (!element) return;
  const background = getComputedStyle(element).backgroundImage;
  for (const match of background.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
    urls.add(match[1]);
  }
}

/**
 * Warm the homepage assets that are needed for the first visible frame.
 *
 * The opening scene contains a large set of scene illustrations and sprite
 * sheets. Waiting for every one of them kept the loading screen visible for
 * several seconds even when the browser cache was warm. Only the chrome and
 * the currently visible scene are critical now; the remaining images continue
 * loading in the background while the visitor watches the opening animation.
 */
export async function waitForHomeAssets() {
  const criticalUrls = new Set<string>();
  const allUrls = new Set<string>();

  document
    .querySelectorAll<HTMLImageElement>(
      '.loading-screen img[src], .nest-navbar img[src], .home-scene[aria-hidden="false"] img[src]:not([loading="lazy"])',
    )
    .forEach((image) => collectImageUrl(image, criticalUrls));

  collectBackgroundUrl(
    document.querySelector(".home-shared-background"),
    criticalUrls,
  );
  collectBackgroundUrl(
    document.querySelector('.home-scene[aria-hidden="false"]'),
    criticalUrls,
  );

  // Everything else is warming only. Keep the `loading` attributes intact so
  // images already marked lazy are not forced back into the initial request
  // burst. Animated sprites have no `loading` attribute because their source
  // is assigned after the scene starts, so preload only those explicitly.
  document
    .querySelectorAll<HTMLElement>("[data-home-preload-src]")
    .forEach((element) => {
      const src = element.dataset.homePreloadSrc;
      if (src) allUrls.add(src);
    });

  const criticalReadiness = Promise.allSettled([
    ...[...criticalUrls].map(preloadImage),
    ...["Outfit", "Rubik Maps", "Seymour One", "Mansalva"].map((font) =>
      document.fonts.load(`16px "${font}"`),
    ),
    ...[500, 600, 700, 800, 900].map((weight) =>
      document.fonts.load(`${weight} 16px "Outfit"`),
    ),
    document.fonts.ready,
  ]);

  let timeout = 0;
  await Promise.race([
    criticalReadiness,
    new Promise<void>((resolve) => {
      timeout = window.setTimeout(resolve, MAXIMUM_ASSET_WAIT);
    }),
  ]);
  window.clearTimeout(timeout);

  // Let the intro paint first, then fetch the remaining artwork in the
  // background. These requests no longer block the loading screen.
  window.setTimeout(() => {
    for (const url of allUrls) {
      if (!criticalUrls.has(url)) warmImage(url);
    }
  }, 1200);
}
