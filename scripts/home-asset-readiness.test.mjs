import assert from 'node:assert/strict';
import test from 'node:test';
import { waitForHomeAssets } from '../src/utils/homeAssetReadiness.ts';

function installAssets(t, { images = [], elements = [], svgImages = [], decode = () => Promise.resolve(), fontLoad = () => Promise.resolve([]) } = {}) {
  const requests = [];
  const warnings = [];
  t.mock.method(console, 'warn', (...args) => warnings.push(args));
  const originals = new Map(['document', 'window', 'Image', 'getComputedStyle'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  globalThis.document = {
    querySelectorAll: selector => selector === 'img[src]' ? images : selector === '.content svg image' ? svgImages : elements,
    fonts: { load: fontLoad, ready: Promise.resolve() },
  };
  globalThis.window = { setTimeout: (...args) => setTimeout(...args), clearTimeout: timer => clearTimeout(timer) };
  globalThis.Image = class {
    naturalWidth = 100;
    decode() { requests.push(this.src); return decode(this.src, requests); }
  };
  globalThis.getComputedStyle = element => ({ backgroundImage: element.background ?? 'none' });
  t.after(() => {
    for (const [key, descriptor] of originals) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  });
  return { requests, warnings };
}

const illustration = src => ({ src, currentSrc: src, loading: 'lazy', getAttribute: () => src });

test('animation source changes cannot cancel an independent image preload', async t => {
  const image = illustration('https://example.test/poster.avif');
  image.decode = () => { throw new Error('Live image decoding must not be used'); };
  const { requests } = installAssets(t, { images: [image], decode: () => {
    image.src = 'blob:animation-playback';
    return Promise.resolve();
  } });
  await waitForHomeAssets();
  assert.deepEqual(requests, ['https://example.test/poster.avif']);
  assert.equal(image.loading, 'eager');
});

test('a transient image failure is retried', async t => {
  const { requests, warnings } = installAssets(t, {
    images: [illustration('https://example.test/bird.avif')],
    decode: (_url, calls) => calls.length === 1 ? Promise.reject(new Error('Temporary failure')) : Promise.resolve(),
  });
  await waitForHomeAssets();
  assert.equal(requests.length, 2);
  assert.equal(warnings.length, 0);
});

test('a broken illustration or font does not prevent entry to the homepage', async t => {
  const { requests, warnings } = installAssets(t, {
    images: [illustration('https://example.test/missing.avif')],
    decode: () => Promise.reject(new Error('EncodingError')),
    fontLoad: () => Promise.reject(new Error('Font unavailable')),
  });
  await assert.doesNotReject(waitForHomeAssets());
  assert.equal(requests.length, 2);
  assert.ok(warnings.some(args => String(args[0]).includes('missing.avif')));
});

test('shared images are deduplicated while background, animation and SVG assets are preloaded', async t => {
  const url = 'https://example.test/shared.avif';
  const { requests } = installAssets(t, {
    images: [illustration(url), illustration(url)],
    elements: [{ background: `url("${url}")`, dataset: { homePreloadSrc: 'https://example.test/animation.webp' } }],
    svgImages: [{ href: { baseVal: 'https://example.test/diagram.avif' } }],
  });
  await waitForHomeAssets();
  assert.deepEqual(new Set(requests), new Set([url, 'https://example.test/animation.webp', 'https://example.test/diagram.avif']));
  assert.equal(requests.length, 3);
});

test('an unresponsive asset stops delaying the homepage after eight seconds', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { warnings } = installAssets(t, {
    images: [illustration('https://example.test/stalled.avif')],
    decode: () => new Promise(() => {}),
  });
  const ready = waitForHomeAssets();
  t.mock.timers.tick(8000);
  await assert.doesNotReject(ready);
  assert.ok(warnings.some(args => String(args[0]).includes('timed out')));
});
