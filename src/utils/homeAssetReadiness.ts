const MAXIMUM_ASSET_WAIT = 8000;

/** Preload a fixed URL so animated components cannot interrupt its decoding. */
async function preloadImage(url: string) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const image = new Image();
    image.src = url;
    try {
      await image.decode();
      if (!image.naturalWidth) throw new Error('Empty image');
      return;
    } catch (error) {
      if (attempt === 1) {
        const reason = error instanceof Error ? error.message : String(error);
        throw new Error(`Homepage image unavailable: ${url} (${reason})`);
      }
    }
  }
}

/** Warm homepage assets without letting one illustration block the whole page. */
export async function waitForHomeAssets() {
  const images = [...document.querySelectorAll<HTMLImageElement>('img[src]')];
  const urls = new Set<string>();
  images.forEach(image => {
    image.loading = 'eager';
    if (image.getAttribute('src')?.trim()) urls.add(image.currentSrc || image.src);
  });
  document.querySelectorAll<HTMLElement>('.content, .content *').forEach(element => {
    const background = getComputedStyle(element).backgroundImage;
    for (const match of background.matchAll(/url\(["']?([^"')]+)["']?\)/g)) urls.add(match[1]);
    if (element.dataset.homePreloadSrc) urls.add(element.dataset.homePreloadSrc);
  });
  document.querySelectorAll<SVGImageElement>('.content svg image').forEach(image => {
    if (image.href.baseVal) urls.add(image.href.baseVal);
  });
  const readiness = Promise.allSettled([
    ...[...urls].map(preloadImage),
    ...['Outfit', 'Rubik Maps', 'Seymour One', 'Mansalva'].map(font => document.fonts.load(`16px "${font}"`)),
    ...[500, 600, 700, 800, 900].map(weight => document.fonts.load(`${weight} 16px "Outfit"`)),
    document.fonts.ready,
  ]).then(results => {
    results.forEach(result => {
      if (result.status === 'rejected') console.warn(result.reason);
    });
  });
  let timeout = 0;
  try {
    await Promise.race([
      readiness,
      new Promise<void>(resolve => {
        timeout = window.setTimeout(() => {
          console.warn('Homepage asset preload timed out; continuing with available content.');
          resolve();
        }, MAXIMUM_ASSET_WAIT);
      }),
    ]);
  } finally {
    window.clearTimeout(timeout);
  }
}
