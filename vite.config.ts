import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
    react(),
    (tailwindcss as any)({
      filter: (id: string) => !id.includes("node_modules"),
    }),
    svgr({
      include: "**/*.svg?react",
    }),
  ],
  ssr: {
    noExternal: ["vite-plugin-svgr"],
  },
  server: {
    host: true,
    port: 3000,
    allowedHosts: ["morpheus.local", "matrixprime.tplinkdns.com"],
  },
});
