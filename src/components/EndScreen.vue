<script setup lang="ts">
import type { Card } from '../types'
import { CATEGORIES } from '../data/cards'

const props = defineProps<{ playedCount: number; favorites?: Card[] }>()
defineEmits<{ replay: [] }>()

const favs = () => props.favorites ?? []

function meta(c: Card) {
  return CATEGORIES[c.category]
}
</script>

<template>
  <div class="screen end">
    <div class="end-body">
      <p class="eyebrow">Fin de la soirée</p>
      <h1 class="title">Merci, mon chou 💛</h1>

      <!-- ─────────────────────────────────────────────────────────────
           Mot de fin de Kevin (modifie librement ce texte).
           ───────────────────────────────────────────────────────────── -->
      <p class="message">
        Peu importe le score (il n'y en a pas, je sais). Ce que je retiens,
        c'est ta voix, tes rires, et toutes ces petites choses que tu m'as
        confiées ce soir. Je t'ai codé un jeu, mais c'est toi qui le rends
        précieux. Reste au chaud contre moi, surtout toi.
      </p>

      <div class="stats-row">
        <div class="stat">
          <span class="stat-num">{{ playedCount }}</span>
          <span class="stat-label">carte{{ playedCount > 1 ? 's' : '' }} partagée{{ playedCount > 1 ? 's' : '' }}</span>
        </div>
        <div v-if="favs().length" class="stat">
          <span class="stat-num">{{ favs().length }}</span>
          <span class="stat-label">coup{{ favs().length > 1 ? 's' : '' }} de cœur</span>
        </div>
      </div>

      <!-- Coups de cœur de la soirée -->
      <div v-if="favs().length" class="favs">
        <p class="favs-title">Tes coups de cœur 💛</p>
        <ul class="favs-list">
          <li v-for="c in favs()" :key="c.id" class="fav-item" :style="{ '--accent': meta(c).color }">
            <span class="fav-dot" />
            <span class="fav-text">{{ c.text }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="end-foot">
      <button class="btn btn-gold replay" @click="$emit('replay')">Rejouer une partie</button>

      <div class="credits">
        <p class="credit-line">Codé par Kevin</p>
        <div class="links">
          <a href="https://github.com/byKenVi" target="_blank" rel="noopener">
            github.com/byKenVi
          </a>
          <span class="sep">·</span>
          <a
            href="https://linkedin.com/in/kevin-lihounhinto-32072b2b5"
            target="_blank"
            rel="noopener"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.end {
  justify-content: flex-start;
  text-align: center;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.end-body {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(14px, 3vh, 22px);
  padding: 12px 0;
}
.eyebrow {
  font-size: 0.76rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-dim);
}
.title {
  font-size: clamp(2.2rem, 9vw, 3rem);
  color: var(--text);
}
.message {
  color: var(--text-soft);
  font-size: 1.06rem;
  line-height: 1.65;
  max-width: 420px;
}
.stats-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px 28px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-hi);
  background: rgba(255, 255, 255, 0.03);
}
.stat-num {
  font-family: var(--font-title);
  font-size: 2.4rem;
  color: var(--gold);
  line-height: 1;
}
.stat-label {
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
}

/* Coups de cœur */
.favs {
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.favs-title {
  font-size: 0.74rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-dim);
}
.favs-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 32vh;
  overflow-y: auto;
  padding-right: 4px;
}
.fav-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  text-align: left;
  padding: 11px 14px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
}
.fav-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  margin-top: 7px;
  flex: 0 0 auto;
  box-shadow: 0 0 8px var(--accent);
}
.fav-text {
  flex: 1;
  font-size: 0.92rem;
  line-height: 1.4;
  color: var(--text);
  white-space: pre-line;
}

.end-foot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  flex: 0 0 auto;
  padding-top: 8px;
}
.replay {
  width: 100%;
  max-width: 420px;
}
.credits {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.credit-line {
  font-family: var(--font-title);
  font-style: italic;
  color: var(--text-soft);
}
.links {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.86rem;
}
.sep {
  color: var(--text-dim);
}
</style>
