import { createApp } from 'vue'
import '../style.css'
import ReviewApp from './ReviewApp.vue'

// Atelier de vérification des cartes (page /verification, hors jeu).
// Pas de service worker ici : c'est un outil, pas la PWA du jeu.
createApp(ReviewApp).mount('#app')
