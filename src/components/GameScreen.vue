<script setup lang="ts">
import { ref } from 'vue'
import { useGame } from '../composables/useGame'
import { LEVELS } from '../data/cards'
import GameCard from './GameCard.vue'
import LevelSelect from './LevelSelect.vue'

const emit = defineEmits<{ finish: [] }>()

const game = useGame()

const showLevelPanel = ref(false)
const coldMessage = ref('')

// Easter egg : 5 taps sur le petit titre → carte cachée.
const titleTaps = ref(0)
let tapTimer: ReturnType<typeof setTimeout> | null = null
function tapTitle() {
  titleTaps.value += 1
  if (tapTimer) clearTimeout(tapTimer)
  tapTimer = setTimeout(() => (titleTaps.value = 0), 1200)
  if (titleTaps.value >= 5) {
    titleTaps.value = 0
    game.revealSecret()
  }
}

// Gag « elle a souvent froid » : message d'attente taquin.
const coldTeases = [
  "Froid ? Quelle coïncidence, mes bras sont justement libres.",
  "Mode radiateur activé. Approche-toi, c'est le seul remède connu.",
  "Encore froid ? On va devoir se rapprocher. Pour la science.",
  "Tiens, prends mes mains. (Oui, c'était le plan depuis le début.)",
]
function iAmCold() {
  coldMessage.value = coldTeases[Math.floor(Math.random() * coldTeases.length)]
  setTimeout(() => (coldMessage.value = ''), 3600)
}
</script>

<template>
  <div class="screen game">
    <!-- Barre du haut -->
    <header class="bar">
      <button class="pill" @click="showLevelPanel = true">
        <span class="pill-emoji">{{ LEVELS[game.state.level].emoji }}</span>
        {{ LEVELS[game.state.level].label }}
        <span v-if="game.state.autoEscalate" class="auto-dot" title="Montée auto">▲</span>
      </button>

      <button class="wordmark" @click="tapTitle" aria-label="Pour Kékéli">
        Pour&nbsp;Kékéli
      </button>

      <span class="counter">
        <span class="counter-num">{{ game.state.playedCount }}</span>
        <span class="counter-label">jouée{{ game.state.playedCount > 1 ? 's' : '' }}</span>
      </span>
    </header>

    <!-- Carte -->
    <main class="stage">
      <Transition name="flip" mode="out-in">
        <GameCard
          v-if="game.currentCard.value"
          :key="game.currentCard.value.id"
          :card="game.currentCard.value"
        />
      </Transition>
    </main>

    <!-- Commandes -->
    <div class="controls">
      <button
        class="btn btn-ghost ctrl"
        :disabled="!game.canGoBack.value"
        @click="game.back()"
      >
        ↩ Retour
      </button>
      <button class="btn btn-ghost ctrl" @click="game.pass()">Passer</button>
      <button class="btn btn-gold ctrl" @click="game.next()">Suivant →</button>
    </div>

    <div class="subrow">
      <button class="link-btn" @click="iAmCold">🥶 J'ai froid</button>
      <button class="link-btn" @click="emit('finish')">Terminer la soirée</button>
    </div>

    <!-- Toast « froid » -->
    <Transition name="fade">
      <div v-if="coldMessage" class="cold-toast">{{ coldMessage }}</div>
    </Transition>

    <!-- Panneau d'intensité -->
    <Transition name="sheet">
      <div v-if="showLevelPanel" class="sheet-backdrop" @click.self="showLevelPanel = false">
        <div class="sheet">
          <LevelSelect
            compact
            :level="game.state.level"
            :auto-escalate="game.state.autoEscalate"
            @select="game.setLevel($event)"
            @toggle-auto="game.setAutoEscalate($event)"
            @confirm="showLevelPanel = false"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.game {
  gap: 16px;
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 14px;
  border-radius: 999px;
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--text);
  border: 1px solid var(--border-hi);
  background: rgba(255, 255, 255, 0.04);
}
.pill-emoji {
  font-size: 1rem;
}
.auto-dot {
  font-size: 0.6rem;
  color: var(--gold);
}
.wordmark {
  font-family: var(--font-title);
  font-style: italic;
  font-size: 0.98rem;
  color: var(--text-soft);
  letter-spacing: 0.02em;
  user-select: none;
  white-space: nowrap;
}
.counter {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1;
  min-width: 52px;
}
.counter-num {
  font-family: var(--font-title);
  font-size: 1.3rem;
  color: var(--gold);
}
.counter-label {
  font-size: 0.64rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-top: 2px;
}

.stage {
  flex: 1;
  display: flex;
  position: relative;
  min-height: 0;
}

.controls {
  display: grid;
  grid-template-columns: 1fr 1fr 1.3fr;
  gap: 10px;
}
.ctrl {
  min-height: 58px;
  padding: 0 10px;
  font-size: 0.98rem;
}
.ctrl:disabled {
  opacity: 0.4;
  pointer-events: none;
}

.subrow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.link-btn {
  font-size: 0.85rem;
  color: var(--text-dim);
  padding: 6px 4px;
}
.link-btn:active {
  color: var(--text-soft);
}

/* Toast froid */
.cold-toast {
  position: fixed;
  left: 50%;
  bottom: calc(var(--safe-bottom) + 96px);
  transform: translateX(-50%);
  max-width: 320px;
  width: calc(100% - 48px);
  text-align: center;
  padding: 14px 18px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--surface-hi), var(--surface));
  border: 1px solid var(--border-hi);
  box-shadow: 0 20px 40px -16px rgba(0, 0, 0, 0.7);
  color: var(--text);
  font-size: 0.95rem;
  line-height: 1.4;
  z-index: 20;
}

/* Bottom sheet d'intensité */
.sheet-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(8, 3, 8, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-end;
  z-index: 30;
}
.sheet {
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 24px 20px calc(var(--safe-bottom) + 24px);
  border-radius: 28px 28px 0 0;
  background: linear-gradient(180deg, var(--bg-1), var(--bg-0));
  border-top: 1px solid var(--border-hi);
  box-shadow: 0 -20px 50px -20px rgba(0, 0, 0, 0.8);
}

.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.3s ease;
}
.sheet-enter-active .sheet,
.sheet-leave-active .sheet {
  transition: transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}
.sheet-enter-from .sheet,
.sheet-leave-to .sheet {
  transform: translateY(100%);
}
</style>
