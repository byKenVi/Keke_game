<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useGame } from '../composables/useGame'
import { useHaptics } from '../composables/useHaptics'
import { LEVELS } from '../data/cards'
import GameCard from './GameCard.vue'
import LevelSelect from './LevelSelect.vue'

const emit = defineEmits<{ finish: [] }>()

const game = useGame()
const { buzz } = useHaptics()

const showLevelPanel = ref(false)
const coldMessage = ref('')

const cardKey = computed(() => game.currentCard.value?.id ?? -1)

// ── Swipe de carte ───────────────────────────────────────────────────────
const dragX = ref(0)
const dragY = ref(0)
const dragging = ref(false)
const leaving = ref<null | 'next' | 'pass'>(null)
const snap = ref(false)
let startX = 0
let startY = 0
let pointerId: number | null = null

const SWIPE_THRESHOLD = 110

const rot = computed(() => dragX.value / 20)
const hintNext = computed(() => dragX.value > 40)
const hintPass = computed(() => dragX.value < -40)

const swipeStyle = computed(() => {
  if (leaving.value) {
    const dir = leaving.value === 'next' ? 1 : -1
    return {
      transform: `translate(${dir * 520}px, 30px) rotate(${dir * 20}deg)`,
      opacity: '0',
      transition: 'transform .32s ease, opacity .32s ease',
    }
  }
  if (snap.value) return { transform: 'translate(0,0)', transition: 'none' }
  if (dragging.value) {
    return {
      transform: `translate(${dragX.value}px, ${dragY.value}px) rotate(${rot.value}deg)`,
      transition: 'none',
    }
  }
  return {
    transform: `translate(${dragX.value}px, ${dragY.value}px) rotate(${rot.value}deg)`,
    transition: 'transform .3s cubic-bezier(.2,.8,.3,1)',
  }
})

function onPointerDown(e: PointerEvent) {
  if (leaving.value) return
  dragging.value = true
  startX = e.clientX
  startY = e.clientY
  pointerId = e.pointerId
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}
function onPointerMove(e: PointerEvent) {
  if (!dragging.value || e.pointerId !== pointerId) return
  dragX.value = e.clientX - startX
  dragY.value = (e.clientY - startY) * 0.35
}
function onPointerUp(e: PointerEvent) {
  if (!dragging.value || e.pointerId !== pointerId) return
  dragging.value = false
  pointerId = null
  if (dragX.value > SWIPE_THRESHOLD) commit('next')
  else if (dragX.value < -SWIPE_THRESHOLD) commit('pass')
  else {
    dragX.value = 0
    dragY.value = 0
  }
}

/** Fait sortir la carte puis applique l'action (swipe ou bouton). */
function commit(action: 'next' | 'pass') {
  if (leaving.value) return
  leaving.value = action
  buzz(action)
  window.setTimeout(() => {
    snap.value = true
    leaving.value = null
    dragX.value = 0
    dragY.value = 0
    if (action === 'next') game.next()
    else game.pass()
    requestAnimationFrame(() => (snap.value = false))
  }, 300)
}

function onBack() {
  if (!game.canGoBack.value) return
  buzz('tap')
  game.back()
}

// ── Favoris ──────────────────────────────────────────────────────────────
function onFavorite() {
  const added = game.toggleFavorite()
  buzz(added ? 'favorite' : 'tap')
}

// ── Annonce des gages ──────────────────────────────────────────────────────
const gageFlash = ref(false)
let gageTimer: ReturnType<typeof setTimeout> | null = null
watch(cardKey, () => {
  if (game.currentCard.value?.category === 'gage') {
    gageFlash.value = true
    buzz('gage')
    if (gageTimer) clearTimeout(gageTimer)
    gageTimer = setTimeout(() => (gageFlash.value = false), 1500)
  } else {
    gageFlash.value = false
  }
})

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
  buzz('tap')
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
      <div
        class="card-swipe"
        :style="swipeStyle"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
      >
        <GameCard
          v-if="game.currentCard.value"
          :key="cardKey"
          :card="game.currentCard.value"
          class="dealt"
        />
        <div class="swipe-stamp next" :class="{ show: hintNext }">SUIVANT →</div>
        <div class="swipe-stamp pass" :class="{ show: hintPass }">← PASSER</div>
      </div>

      <!-- Bouton favori -->
      <button
        v-if="game.currentCard.value"
        class="fav"
        :class="{ on: game.currentIsFavorite.value }"
        :aria-pressed="game.currentIsFavorite.value"
        aria-label="Mettre en favori"
        @click="onFavorite"
      >
        ♥
      </button>

      <!-- Annonce de gage -->
      <Transition name="gage">
        <div v-if="gageFlash" class="gage-flash">
          <span class="gage-emoji">🎭</span>
          <span class="gage-word">Gage</span>
        </div>
      </Transition>
    </main>

    <!-- Commandes -->
    <div class="controls">
      <button class="btn btn-ghost ctrl" :disabled="!game.canGoBack.value" @click="onBack">
        ↩ Retour
      </button>
      <button class="btn btn-ghost ctrl" @click="commit('pass')">Passer</button>
      <button class="btn btn-gold ctrl" @click="commit('next')">Suivant →</button>
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
.card-swipe {
  flex: 1;
  display: flex;
  position: relative;
  min-height: 0;
  touch-action: pan-y;
  will-change: transform;
}

/* Entrée de carte : « deal-in ». */
.dealt {
  animation: cardIn 0.42s cubic-bezier(0.22, 0.61, 0.36, 1) both;
}
@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Tampons SUIVANT / PASSER pendant le swipe. */
.swipe-stamp {
  position: absolute;
  top: 30px;
  padding: 7px 16px;
  font-weight: 800;
  letter-spacing: 0.08em;
  font-size: 1.05rem;
  border-radius: 12px;
  border: 3px solid;
  opacity: 0;
  transition: opacity 0.12s ease;
  z-index: 4;
  pointer-events: none;
}
.swipe-stamp.next {
  right: 22px;
  color: var(--gold);
  border-color: var(--gold);
  transform: rotate(12deg);
}
.swipe-stamp.pass {
  left: 22px;
  color: var(--text-soft);
  border-color: var(--text-soft);
  transform: rotate(-12deg);
}
.swipe-stamp.show {
  opacity: 0.95;
}

/* Bouton favori, posé en haut à droite de la scène. */
.fav {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: var(--text-dim);
  border: 1px solid var(--border-hi);
  background: rgba(20, 8, 16, 0.55);
  backdrop-filter: blur(6px);
  z-index: 6;
  transition: transform 0.15s ease, color 0.2s ease, border-color 0.2s ease;
}
.fav:active {
  transform: scale(0.88);
}
.fav.on {
  color: var(--rose);
  border-color: color-mix(in srgb, var(--rose) 55%, transparent);
  animation: favPop 0.4s ease;
}
@keyframes favPop {
  0% { transform: scale(1); }
  40% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

/* Annonce de gage. */
.gage-flash {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 8;
  pointer-events: none;
}
.gage-flash::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(60% 50% at 50% 50%, color-mix(in srgb, var(--c-gage) 34%, transparent), transparent 70%);
}
.gage-emoji {
  font-size: 3.6rem;
  filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.5));
  animation: gageBounce 0.6s ease;
}
.gage-word {
  font-family: var(--font-title);
  font-size: 2.1rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--c-gage);
  text-shadow: 0 2px 20px color-mix(in srgb, var(--c-gage) 60%, transparent);
}
@keyframes gageBounce {
  0% { transform: scale(0.4) rotate(-12deg); }
  55% { transform: scale(1.18) rotate(8deg); }
  100% { transform: scale(1) rotate(0); }
}
.gage-enter-active { transition: opacity 0.2s ease; }
.gage-leave-active { transition: opacity 0.5s ease; }
.gage-enter-from,
.gage-leave-to { opacity: 0; }

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
