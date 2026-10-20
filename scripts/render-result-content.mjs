import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const [moduleName, componentName] = process.argv.slice(2);
if (!moduleName || !componentName) {
  throw new Error("Usage: render-result-content.mjs <module> <component>");
}

const server = await createServer({
  appType: "custom",
  logLevel: "silent",
  server: { middlewareMode: true },
});

try {
  const exports = await server.ssrLoadModule(
    `/src/contents/results/${moduleName}`,
  );
  const Content = exports[componentName];
  if (typeof Content !== "function") {
    throw new Error(`${componentName} is not exported by ${moduleName}`);
  }
  process.stdout.write(renderToStaticMarkup(createElement(Content)));
} finally {
  await server.close();
}
