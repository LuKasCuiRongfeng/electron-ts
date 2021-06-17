import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { config } from "dotenv"

config()
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  root: "src/render/pages/main",
  base: "./",
  build: {
    outDir: "dist/render"
  },
  server: {
    port: +process.env.PORT
  }
})
