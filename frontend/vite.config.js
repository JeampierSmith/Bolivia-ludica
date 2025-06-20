import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Bolivia-ludica/', // Necesario para GitHub Pages
  plugins: [react()],
})
