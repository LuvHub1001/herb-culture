import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2020",
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-router")) return "router";
          if (id.includes("react-dom") || id.includes("scheduler"))
            return "react-dom";
          if (id.includes("react")) return "react";
          if (id.includes("axios")) return "axios";
          if (id.includes("jotai")) return "jotai";
          if (id.includes("@mui") || id.includes("@emotion")) return "mui";
        },
      },
    },
  },
});
