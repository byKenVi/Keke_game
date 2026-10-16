// ─────────────────────────────────────────────────────────────────────────
//  RÉGLAGES RAPIDES — modifie ici ce qui doit l'être.
// ─────────────────────────────────────────────────────────────────────────

/** Code d'accès de l'écran de verrouillage. Change-le si besoin. */
export const ACCESS_CODE = '2105'

/** Prénom / surnom affichés un peu partout. */
export const HER_NAME = 'Kékéli'
export const HER_NICKNAME = 'mon chou'

/** Nombre de cartes entre deux montées automatiques d'intensité. */
export const ESCALATE_EVERY = 4

/** Clés de stockage local (déverrouillage + préférences). */
export const STORAGE_KEYS = {
  unlocked: 'kekeli:unlocked',
  level: 'kekeli:level',
  autoEscalate: 'kekeli:autoEscalate',
} as const
