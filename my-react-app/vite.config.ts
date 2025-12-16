import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    fs: {
      strict: false
    },
    proxy: {
      '/images': 'http://localhost:3000',
      '/api': 'http://localhost:3000',
      // Ha a frontend relatív útvonalakat használ az API hívásokhoz (pl. /users, /alkalmak), azokat is érdemes lehet felvenni, vagy használni a teljes URL-t a kódban.
      // Mivel a backend app.js-ben sok külön route van (users, alkalmak, stb.), ha ezeket is relatívan hívod, akkor azokat is proxyzni kellene, vagy egyedi beállítás kell.
      // A képekhez a fenti '/images' sor a legfontosabb.
    }
  }
})