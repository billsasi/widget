import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: "src/lib.ts",
      name: "GuidanceWidget",
      fileName: (format) => `guidance-widget.${format}.js`,
      formats: ["umd"],
    },
  },
  define: {
    "process.env": {},
    __VUE_PROD_DEVTOOLS__: false,
  },
});
