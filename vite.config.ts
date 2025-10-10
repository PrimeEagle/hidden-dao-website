import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    // 🔥 TanStack MUST come before React
    tanstackStart(),
    react({
      jsxRuntime: "automatic",
      jsxImportSource: "react",
    }),
    tsConfigPaths(),
    tailwindcss(),
    svgr({
      include: "**/*.svg?react",
      svgrOptions: {},
    }),
  ],
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
  ssr: {
    noExternal: ["vite-plugin-svgr"],
  },
  server: {
    host: true,
    port: 3000,
    allowedHosts: ["morpheus.local", "matrixprime.tplinkdns.com"],
  },
});
