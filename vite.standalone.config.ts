import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "dist-home-anim",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        animation: "home-anim.html",
      },
    },
  },
});
