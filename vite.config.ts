import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Configuration Vite minimale : site 100 % statique.
// `npm run build` produit le dossier `dist/` prêt pour Vercel.
export default defineConfig({
  plugins: [vue()],
  base: './',
})
