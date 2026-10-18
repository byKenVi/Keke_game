// ─────────────────────────────────────────────────────────────────────────
//  RÉGLAGES RAPIDES : modifie ici ce qui doit l'être.
// ─────────────────────────────────────────────────────────────────────────

/**
 * Verrou global du site.
 *   true  = le jeu est inaccessible, on affiche seulement le message ci-dessous.
 *   false = le jeu fonctionne normalement.
 * Pour réactiver le jeu le jour J : repasse cette valeur à `false`.
 */
export const SITE_LOCKED = true

/** Message affiché quand le site est verrouillé. */
export const LOCKED_MESSAGE =
  'Non Kékéli, tu ne joueras pas sans moi. Prochaine activation à notre prochaine rencontre.'

/** Code d'accès de l'écran de verrouillage. Change-le si besoin. */
export const ACCESS_CODE = '2105'

/**
 * Code de l'outil de vérification des cartes (page /verification).
 * Différent du code du jeu : comme ça, même avec le code d'accès,
 * elle ne peut pas tomber sur l'atelier de tri/reformulation.
 */
export const REVIEW_CODE = '0000'

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
  reviewUnlocked: 'kekeli:review:unlocked',
  reviewState: 'kekeli:review:v1',
} as const
