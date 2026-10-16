import { computed, reactive, readonly } from 'vue'
import type { Card, Level } from '../types'
import { playableCards, secretCard } from '../data/cards'
import { LEVEL_ORDER } from '../data/cards'
import { ESCALATE_EVERY, STORAGE_KEYS } from '../config'

/**
 * Petit helper localStorage tolérant : ne casse jamais si le stockage
 * est indisponible (navigation privée, stockage bloqué…).
 */
function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}
function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* on ignore : le jeu marche très bien sans persistance */
  }
}

interface GameState {
  level: Level
  autoEscalate: boolean
  /** Historique des cartes montrées, dans l'ordre (permet le « Retour »). */
  history: Card[]
  /** Position courante dans `history`. */
  pos: number
  /** Nombre de cartes réellement jouées (« Suivant »), hors « Passer ». */
  playedCount: number
  /** Ids déjà tirés, pour le tirage aléatoire sans répétition. */
  seen: Set<number>
}

const initialLevel = (readStorage(STORAGE_KEYS.level) as Level | null) ?? 'soft'
const initialAuto = readStorage(STORAGE_KEYS.autoEscalate) === 'true'

const state = reactive<GameState>({
  level: LEVEL_ORDER.includes(initialLevel) ? initialLevel : 'soft',
  autoEscalate: initialAuto,
  history: [],
  pos: -1,
  playedCount: 0,
  seen: new Set<number>(),
})

/** Carte actuellement affichée (ou null avant le premier tirage). */
const currentCard = computed<Card | null>(() =>
  state.pos >= 0 && state.pos < state.history.length ? state.history[state.pos] : null,
)

const canGoBack = computed(() => state.pos > 0)

/** Tire une carte aléatoire du niveau courant, jamais vue de préférence. */
function pickCard(): Card {
  const pool = playableCards.filter((c) => c.level === state.level)

  // Cartes du niveau pas encore vues.
  let available = pool.filter((c) => !state.seen.has(c.id))

  // Tout vu pour ce niveau → on « rebat les cartes » de ce niveau.
  if (available.length === 0) {
    for (const c of pool) state.seen.delete(c.id)
    available = pool.slice()
  }

  const chosen = available[Math.floor(Math.random() * available.length)]
  state.seen.add(chosen.id)
  return chosen
}

/** Avance vers une nouvelle carte (élague l'historique « avant » si besoin). */
function advanceToNew(countAsPlayed: boolean): void {
  // Si on était revenu en arrière, on coupe la branche « future ».
  if (state.pos < state.history.length - 1) {
    state.history.splice(state.pos + 1)
  }

  const card = pickCard()
  state.history.push(card)
  state.pos = state.history.length - 1

  if (countAsPlayed) {
    state.playedCount += 1
    maybeEscalate()
  }
}

/** Montée automatique d'intensité toutes les N cartes jouées. */
function maybeEscalate(): void {
  if (!state.autoEscalate) return
  if (state.playedCount === 0) return
  if (state.playedCount % ESCALATE_EVERY !== 0) return

  const idx = LEVEL_ORDER.indexOf(state.level)
  if (idx < LEVEL_ORDER.length - 1) {
    setLevel(LEVEL_ORDER[idx + 1])
  }
}

// ── Actions exposées ───────────────────────────────────────────────────────

/** Première carte / démarrage du jeu. */
function start(): void {
  if (state.history.length === 0) advanceToNew(true)
}

/** « Suivant » : carte jouée, on passe à la suivante. */
function next(): void {
  if (state.pos < state.history.length - 1) {
    // On avait reculé : on ré-avance dans l'historique existant.
    state.pos += 1
  } else {
    advanceToNew(true)
  }
}

/** « Passer » : illimité, sans jugement. Ne compte pas comme jouée. */
function pass(): void {
  advanceToNew(false)
}

/** « Retour » : revient à la carte précédente. */
function back(): void {
  if (canGoBack.value) state.pos -= 1
}

/** Change le niveau à la volée (et le mémorise). */
function setLevel(level: Level): void {
  state.level = level
  writeStorage(STORAGE_KEYS.level, level)
}

/** Active/désactive la montée automatique (et la mémorise). */
function setAutoEscalate(value: boolean): void {
  state.autoEscalate = value
  writeStorage(STORAGE_KEYS.autoEscalate, String(value))
}

/** Easter egg : affiche la carte cachée « Kevin t'aime bien ». */
function revealSecret(): void {
  if (currentCard.value?.id === secretCard.id) return
  if (state.pos < state.history.length - 1) {
    state.history.splice(state.pos + 1)
  }
  state.history.push(secretCard)
  state.pos = state.history.length - 1
}

/** Réinitialise une partie (pour rejouer après l'écran de fin). */
function reset(): void {
  state.history = []
  state.pos = -1
  state.playedCount = 0
  state.seen = new Set<number>()
}

export function useGame() {
  return {
    state: readonly(state),
    currentCard,
    canGoBack,
    start,
    next,
    pass,
    back,
    setLevel,
    setAutoEscalate,
    revealSecret,
    reset,
  }
}
