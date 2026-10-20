import { ref } from 'vue'
import { STORAGE_KEYS } from '../config'

/**
 * Retour haptique léger (mobile). Tolérant : ne fait rien si l'appareil ne
 * supporte pas `navigator.vibrate` ou si l'utilisateur l'a désactivé.
 */

type Pattern = 'tap' | 'next' | 'pass' | 'favorite' | 'gage'

const PATTERNS: Record<Pattern, number | number[]> = {
  tap: 8,
  next: 14,
  pass: 10,
  favorite: [0, 18, 40, 18],
  gage: [0, 22, 50, 22, 50, 40],
}

function readEnabled(): boolean {
  try {
    // Activé par défaut, sauf si explicitement désactivé.
    return localStorage.getItem(STORAGE_KEYS.haptics) !== 'false'
  } catch {
    return true
  }
}

const enabled = ref(readEnabled())

function setEnabled(value: boolean): void {
  enabled.value = value
  try {
    localStorage.setItem(STORAGE_KEYS.haptics, String(value))
  } catch {
    /* pas grave : réglage non mémorisé */
  }
  if (value) buzz('tap')
}

function buzz(pattern: Pattern): void {
  if (!enabled.value) return
  try {
    navigator.vibrate?.(PATTERNS[pattern])
  } catch {
    /* appareil sans vibration : on ignore */
  }
}

export function useHaptics() {
  return { enabled, setEnabled, buzz }
}
