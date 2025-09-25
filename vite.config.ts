import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
    tailwindcss(),
    svgr({
      include: "**/*.svg?react",
      svgrOptions: {},
    }),
  ],
  ssr: {
    noExternal: ["vite-plugin-svgr"],
  },
  server: {
    host: true,
    port: 3000,
    allowedHosts: ["morpheus.local"],
  },
});
