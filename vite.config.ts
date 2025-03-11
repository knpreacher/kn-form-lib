import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "lib/": resolve(__dirname, "./lib"),
    },
  },
  plugins: [vue(), dts({ tsconfigPath: "./tsconfig.lib.json" })],
  build: {
    copyPublicDir: false,
    rollupOptions: {
      external: ["vue", "quasar"],
    },
    lib: {
      name: "KnForm",
      fileName: "kn-form",
      entry: resolve(__dirname, "lib/main.ts"),
      formats: ["es"],
    },
  },
});
