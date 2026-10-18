/** Decode every homepage illustration, including offscreen and portal images. */
export async function waitForHomeAssets() {
  const images = [...document.querySelectorAll<HTMLImageElement>('img[src]')];
  const decode = async (image: HTMLImageElement) => {
    image.loading = 'eager';
    await image.decode();
    if (!image.naturalWidth) throw new Error('Homepage image unavailable');
  };
  const urls = new Set<string>();
  document.querySelectorAll<HTMLElement>('.content, .content *').forEach(element => {
    const background = getComputedStyle(element).backgroundImage;
    for (const match of background.matchAll(/url\(["']?([^"')]+)["']?\)/g)) urls.add(match[1]);
    if (element.dataset.homePreloadSrc) urls.add(element.dataset.homePreloadSrc);
  });
  document.querySelectorAll<SVGImageElement>('.content svg image').forEach(image => {
    if (image.href.baseVal) urls.add(image.href.baseVal);
  });
  const decodedImages = new Set(images.map(image => image.currentSrc || image.src));
  const backgroundImages = [...urls].filter(url => !decodedImages.has(url)).map(url => {
    const image = new Image();
    image.src = url;
    return decode(image);
  });
  await Promise.all([
    ...images.map(decode),
    ...backgroundImages,
    ...['Outfit', 'Rubik Maps', 'Seymour One', 'Mansalva'].map(font => document.fonts.load(`16px "${font}"`)),
    document.fonts.ready,
  ]);
}
