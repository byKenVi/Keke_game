// ─────────────────────────────────────────────────────────────────────────
//  Logique de l'atelier de vérification des cartes.
//  Tout est local (localStorage) : aucune donnée n'est envoyée nulle part.
// ─────────────────────────────────────────────────────────────────────────
import { computed, reactive, watch } from 'vue'
import { cards as sourceCards } from '../data/cards'
import { proposals as sourceProposals } from '../data/proposals'
import { STORAGE_KEYS } from '../config'
import type { Card } from '../types'

export type Verdict = 'keep' | 'delete'

/** Les deux lots triables : les cartes du jeu, ou les nouvelles propositions. */
export type ReviewMode = 'game' | 'proposals'

/** Une décision prise sur une carte. */
export interface Decision {
  verdict: Verdict
  /** Texte final retenu (reformulé ou original). */
  text: string
  /** true si le texte a été reformulé à la main. */
  edited: boolean
}

interface PersistedState {
  index: number
  decisions: Record<number, Decision>
}

const SOURCES: Record<ReviewMode, { list: Card[]; storageKey: string }> = {
  game: { list: sourceCards.slice(), storageKey: STORAGE_KEYS.reviewState },
  proposals: { list: sourceProposals.slice(), storageKey: STORAGE_KEYS.reviewProposals },
}

function load(storageKey: string): PersistedState {
  try {
    const raw = localStorage.getItem(storageKey)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PersistedState>
      return {
        index: typeof parsed.index === 'number' ? parsed.index : 0,
        decisions: parsed.decisions ?? {},
      }
    }
  } catch {
    /* stockage indisponible ou JSON cassé : on repart à zéro */
  }
  return { index: 0, decisions: {} }
}

// Un état réactif par mode, créé une seule fois (watcher de sauvegarde inclus).
const states: Partial<Record<ReviewMode, PersistedState>> = {}
function stateFor(mode: ReviewMode): PersistedState {
  let s = states[mode]
  if (!s) {
    const { storageKey } = SOURCES[mode]
    s = reactive<PersistedState>(load(storageKey))
    watch(
      s,
      (val) => {
        try {
          localStorage.setItem(storageKey, JSON.stringify(val))
        } catch {
          /* pas grave : on perd juste la reprise de session */
        }
      },
      { deep: true },
    )
    states[mode] = s
  }
  return s
}

export function useReview(mode: ReviewMode = 'game') {
  const reviewList = SOURCES[mode].list
  const state = stateFor(mode)
  const total = reviewList.length

  const current = computed<Card | null>(() =>
    state.index < total ? reviewList[state.index] : null,
  )
  const next = computed<Card | null>(() =>
    state.index + 1 < total ? reviewList[state.index + 1] : null,
  )

  const finished = computed(() => state.index >= total)
  const position = computed(() => Math.min(state.index + 1, total))

  const decidedCount = computed(() => Object.keys(state.decisions).length)
  const keptCount = computed(
    () => Object.values(state.decisions).filter((d) => d.verdict === 'keep').length,
  )
  const deletedCount = computed(
    () => Object.values(state.decisions).filter((d) => d.verdict === 'delete').length,
  )
  const editedCount = computed(
    () => Object.values(state.decisions).filter((d) => d.edited).length,
  )

  /** Enregistre une décision sur la carte courante et avance. */
  function decide(verdict: Verdict, text?: string) {
    const card = current.value
    if (!card) return
    const original = card.text
    const finalText = (text ?? original).trim() || original
    state.decisions[card.id] = {
      verdict,
      text: finalText,
      edited: finalText !== original,
    }
    state.index += 1
  }

  /** Reformule la carte courante (la garde avec le nouveau texte). */
  function keepReformulated(text: string) {
    decide('keep', text)
  }

  /** Revient sur la carte précédente et efface sa décision. */
  function undo() {
    if (state.index === 0) return
    state.index -= 1
    const card = reviewList[state.index]
    if (card) delete state.decisions[card.id]
  }

  /** Change le verdict d'une carte déjà décidée (depuis le récap). */
  function setVerdict(id: number, verdict: Verdict) {
    const d = state.decisions[id]
    if (d) d.verdict = verdict
  }

  /** Reformule une carte déjà décidée (depuis le récap). */
  function reword(id: number, text: string) {
    const card = reviewList.find((c) => c.id === id)
    if (!card) return
    const finalText = text.trim() || card.text
    state.decisions[id] = {
      verdict: 'keep',
      text: finalText,
      edited: finalText !== card.text,
    }
  }

  /** Aller directement à une carte (par son index de liste). */
  function goTo(idx: number) {
    state.index = Math.max(0, Math.min(idx, total))
  }

  /** Repart de la première carte non encore décidée. */
  function resumeFirstUndecided() {
    const idx = reviewList.findIndex((c) => !state.decisions[c.id])
    state.index = idx === -1 ? total : idx
  }

  /** Efface tout (remet l'atelier à zéro). */
  function resetAll() {
    state.index = 0
    for (const k of Object.keys(state.decisions)) delete state.decisions[Number(k)]
  }

  /** Décision pour une carte (ou null si pas encore décidée). */
  function decisionFor(id: number): Decision | null {
    return state.decisions[id] ?? null
  }

  /** Construit l'export final : seulement les cartes gardées, texte retenu. */
  function buildExport() {
    const keptCards = reviewList
      .filter((c) => state.decisions[c.id]?.verdict === 'keep')
      .map((c) => {
        const d = state.decisions[c.id]!
        const out: Record<string, unknown> = {
          id: c.id,
          category: c.category,
          level: c.level,
          text: d.text,
        }
        if (c.german) out.german = c.german
        if (c.secret) out.secret = c.secret
        if (d.edited) {
          out.edited = true
          out.originalText = c.text
        }
        return out
      })

    const deletedIds = reviewList
      .filter((c) => state.decisions[c.id]?.verdict === 'delete')
      .map((c) => c.id)

    return {
      generatedAt: new Date().toISOString(),
      mode,
      total,
      decided: decidedCount.value,
      kept: keptCount.value,
      deleted: deletedCount.value,
      reformulated: editedCount.value,
      undecided: total - decidedCount.value,
      cards: keptCards,
      deletedIds,
    }
  }

  function exportJson(): string {
    return JSON.stringify(buildExport(), null, 2)
  }

  return {
    state,
    reviewList,
    total,
    current,
    next,
    finished,
    position,
    decidedCount,
    keptCount,
    deletedCount,
    editedCount,
    decide,
    keepReformulated,
    undo,
    setVerdict,
    reword,
    goTo,
    resumeFirstUndecided,
    resetAll,
    decisionFor,
    exportJson,
  }
}
