import type { Card } from '../types'

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  NOUVELLES PROPOSITIONS (à trier via /verification → « Nouvelles propositions »)
 *
 *  Lot vide pour l'instant : le dernier lot a été trié et les cartes gardées
 *  ont été promues dans data/cards.ts. Quand un nouveau lot est généré, il
 *  vient ici, et le tri recommence dans l'atelier.
 *
 *  Règles d'écriture (reprises des tris précédents) :
 *   • Une seule idée par carte, pas de question à tiroirs.
 *   • « je / nous » à la 1re personne, jamais « Kevin » à la 3e, pas de « mon chou ».
 *   • Assis, à table, souvent entourés. Rien de performatif ou d'enfantin.
 *   • Gages : intimes, verbaux, piquants. Pas d'instructions gestuelles (tenir
 *     la main, écrire sur la paume...) : le tri a montré qu'elles ne passent pas.
 *   • Audacieux : chuchotés, « à l'oreille », les yeux dans les yeux, consentis.
 *   • Ton direct, 21 ans, pas mièvre.
 *
 *  Plages d'id dédiées (pas de collision avec le jeu) :
 *   1001+ connaissance · 1101+ profonde · 1201+ gage · 1301+ audacieux · 1401+ raconte
 * ─────────────────────────────────────────────────────────────────────────
 */
export const proposals: Card[] = []
