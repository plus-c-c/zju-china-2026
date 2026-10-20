import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { stringToSlug } from "./src/utils/stringToSlug";

const execFileAsync = promisify(execFile);

function regenerateWetlabSplit(): Plugin {
  return {
    name: "regenerate-wetlab-split",
    configureServer(server) {
      let running = false;
      let rerun = false;

      async function regenerate() {
        if (running) {
          rerun = true;
          return;
        }
        running = true;
        try {
          await execFileAsync("python3", ["scripts/split-wetlab.py"], {
            cwd: process.cwd(),
          });
          server.ws.send({ type: "full-reload" });
        } finally {
          running = false;
          if (rerun) {
            rerun = false;
            void regenerate();
          }
        }
      }

      server.watcher.on("change", (path) => {
        if (
          /src[\\/]contents[\\/]results[\\/](?:scaffold|anisotropy|gag|delivery|biosafety)-content\.tsx$/.test(
            path,
          )
        ) {
          void regenerate();
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const basePath = env.VITE_BASE_PATH || `/${stringToSlug(env.VITE_TEAM_NAME || "igem-starter")}/`;

  return defineConfig({
    base: basePath,
    plugins: [react(), regenerateWetlabSplit()],
  });
};
