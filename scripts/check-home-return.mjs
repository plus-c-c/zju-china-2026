import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";

const require = createRequire(import.meta.url);
const root = fileURLToPath(new URL("../", import.meta.url));
const bundled = await build({
  stdin: {
    contents: 'export * from "./src/utils/homeProgress"; export { SelpAndSnoopLigaseScene, SelpPipeline } from "./src/components/home/SELP";',
    resolveDir: root,
    loader: "tsx",
  },
  bundle: true,
  platform: "node",
  format: "cjs",
  write: false,
  external: ["react", "react-dom", "react-router-dom"],
  loader: { ".css": "empty" },
  plugins: [{
    name: "omit-video-player",
    setup(bundler) {
      bundler.onResolve({ filter: /^@peertube\/embed-api/ }, () => ({ path: "player", namespace: "test" }));
      bundler.onLoad({ filter: /.*/, namespace: "test" }, () => ({ contents: "export class PeerTubePlayer {}" }));
    },
  }],
});
const module = { exports: {} };
new Function("require", "module", "exports", bundled.outputFiles[0].text)(require, module, module.exports);
const {
  pinHomeReturnTarget, saveHomeProgress, readHomeProgress, finishHomeReturn,
  resolveHomeProgress, restoreHomeProgress, SelpAndSnoopLigaseScene, SelpPipeline,
} = module.exports;

// Model measured document coordinates, clamping, layout changes and animation
// frames without controlling a browser or fetching any homepage media.
function layout(height = 720, desktop = true) {
  const frames = new Map();
  let nextFrame = 0;
  let limit = Infinity;
  let writes = 0;
  const nodes = new Map();
  globalThis.window = {
    scrollY: 16000,
    innerHeight: height,
    matchMedia: () => ({ matches: false }),
    scrollTo({ top }) { this.scrollY = Math.min(limit, Math.max(0, top)); writes++; },
  };
  const node = (top, nodeHeight = 500) => ({
    top, height: nodeHeight,
    getBoundingClientRect() { return { top: this.top - window.scrollY, height: this.height }; },
  });
  const viewport = { clientHeight: height };
  if (desktop) {
    nodes.set(".story-viewport", viewport);
    nodes.set(".home-scroll-space", node(0));
  } else {
    nodes.set('.mobile-home section[aria-label="SELP and Ligation system"]', node(4500));
  }
  for (const [index, target] of ["magnetic", "gag", "mitochondrial"].entries()) {
    nodes.set(`.selp-pipeline__stage--${target}`, node(11000 + index * 700));
  }
  globalThis.document = {
    querySelector: selector => nodes.get(selector) ?? null,
    documentElement: { style: { overflowAnchor: "auto" } },
    fonts: { status: "loaded" },
  };
  globalThis.requestAnimationFrame = callback => { frames.set(++nextFrame, callback); return nextFrame; };
  globalThis.cancelAnimationFrame = id => frames.delete(id);
  return {
    nodes, viewport,
    setLimit(value) { limit = value; },
    get writes() { return writes; },
    frame() {
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach(callback => callback());
    },
    settle() {
      for (let i = 0; frames.size && i < 12; i++) this.frame();
      assert.equal(frames.size, 0, "restoration should settle");
    },
  };
}

for (const height of [600, 720, 823, 900, 1080, 1440]) {
  layout(height);
  const restored = resolveHomeProgress({ scrollY: 16000, storyPosition: 22, returnTarget: "selp" });
  assert.equal(restored.storyPosition, 19);
  assert.equal(restored.scrollY, Math.ceil(11.4 * height), `SELP page at ${height}px viewport height`);
}

for (const target of ["magnetic", "gag", "mitochondrial"]) {
  const env = layout();
  const stage = env.nodes.get(`.selp-pipeline__stage--${target}`);
  const restored = resolveHomeProgress({ scrollY: 0, storyPosition: 0, returnTarget: target });
  assert.equal(restored.scrollY + window.innerHeight / 2, stage.top + stage.height / 2);
  stage.top += 240;
  assert.equal(resolveHomeProgress(restored).scrollY, restored.scrollY + 240, "follow a remeasured module");
}

layout(844, false);
assert.equal(resolveHomeProgress({ scrollY: 0, storyPosition: 19, returnTarget: "selp" }).scrollY, 4500);

const env = layout(1080);
env.viewport.clientHeight = 720;
env.setLimit(6000);
let completed = 0;
restoreHomeProgress({ scrollY: 16000, storyPosition: 19, returnTarget: "selp" }, () => completed++);
env.frame();
assert.equal(completed, 0, "do not finish against the temporary short layout");
env.viewport.clientHeight = 1080;
env.setLimit(20000);
env.settle();
assert.ok(Math.abs(window.scrollY - 12312) < 0.01, "remeasure the scene after the viewport settles");
assert.equal(completed, 1);
assert.equal(document.documentElement.style.overflowAnchor, "auto");

const interrupted = layout();
let interruptedComplete = false;
const cancel = restoreHomeProgress({ scrollY: 16000, storyPosition: 19, returnTarget: "selp" }, () => { interruptedComplete = true; });
cancel();
const writes = interrupted.writes;
interrupted.frame();
assert.equal(interrupted.writes, writes, "user input cancels pending corrections");
assert.equal(interruptedComplete, false);
assert.equal(document.documentElement.style.overflowAnchor, "auto");

for (const target of ["selp", "magnetic", "gag", "mitochondrial"]) {
  const key = `entry-${target}`;
  saveHomeProgress(key, { scrollY: 16000, storyPosition: 22 });
  pinHomeReturnTarget(key, target);
  readHomeProgress(key);
  readHomeProgress(key);
  saveHomeProgress(key, { scrollY: 18000, storyPosition: 22 });
  assert.equal(readHomeProgress(key).returnTarget, target, "late scroll must not replace the selected target");
  finishHomeReturn(key);
  saveHomeProgress(key, { scrollY: 1000, storyPosition: 2 });
  assert.deepEqual(readHomeProgress(key), { scrollY: 1000, storyPosition: 2 });
}

layout();
const markup = renderToStaticMarkup(createElement(MemoryRouter, null,
  createElement(SelpAndSnoopLigaseScene), createElement(SelpPipeline)));
const links = [...markup.matchAll(/<a\b([^>]*data-home-return-target="([^"]+)"[^>]*)>(.*?)<\/a>/gs)];
assert.deepEqual(links.map(match => [match[2], match[3]]), [
  ["selp", "learn more"], ["selp", "learn more"],
  ["magnetic", "About Anisotropy"], ["gag", "About GAG"], ["mitochondrial", "About Delivery"],
]);
assert.ok(links.every(match => /href="\/design#/.test(match[1])), "keep all five article destinations intact");
console.log("PASS: five link targets, six viewport heights, mobile anchor, changing layout, late scroll events and user interruption.");
