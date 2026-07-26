import { defineConfig } from "vitest/config";

export default defineConfig({
  publicDir: false,
  build: {
    lib: {
      entry: "src/solar-battery-card.ts",
      name: "SolarBatteryCard",
      formats: ["es"],
      fileName: () => "solar-battery-card.js"
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    minify: "esbuild",
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  },
  test: {
    include: ["tests/**/*.test.ts"]
  }
});
