import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Configuration Vite : site 100 % statique, deux pages.
//  • index.html        → le jeu
//  • verification.html → l'atelier de tri/reformulation des cartes
// `npm run build` produit le dossier `dist/` prêt pour Vercel.
export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        verification: 'verification.html',
      },
    },
  },
})
