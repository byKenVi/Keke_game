import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

// Enregistrement du service worker (PWA — add to home screen + hors-ligne).
// Uniquement en production, et sans bloquer le rendu.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      /* pas grave : l'app marche sans service worker */
    })
  })
}
