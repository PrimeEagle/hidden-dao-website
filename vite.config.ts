import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tsConfigPaths(), tanstackStart(), tailwindcss()],
  server: {
    host: true,
    port: 3000,
    allowedHosts: ['morpheus.local']
  },
})