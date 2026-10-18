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
export const proposals: Card[] = [
  // ───────────────────────────── 💬 CONNAISSONS-NOUS ─────────────────────────────
  { id: 1001, category: 'connaissance', level: 'soft', text: "Tu te sens comment quand on est tous les deux à ne rien faire ?" },
  { id: 1002, category: 'connaissance', level: 'medium', text: "C'est quoi ton langage de l'amour, celui qui te touche vraiment ?" },
  { id: 1003, category: 'connaissance', level: 'medium', text: "Qu'est-ce qui te ferait fuir quelqu'un sans hésiter ?" },

  // ───────────────────────────── 🧠 PROFONDES ─────────────────────────────
  { id: 1101, category: 'profonde', level: 'soft', text: "Qu'est-ce que tu as compris sur toi, récemment ?" },
  { id: 1102, category: 'profonde', level: 'medium', text: "Il y a quelqu'un à qui tu n'as jamais réussi à dire au revoir ?" },
  { id: 1103, category: 'profonde', level: 'medium', text: "C'est quoi la chose la plus difficile à demander, pour toi ?" },

  // ───────────────────────────── 🎭 GAGES ─────────────────────────────
  { id: 1201, category: 'gage', level: 'soft', text: "Jusqu'à ta prochaine carte, interdit de sourire. On verra qui craque." },
  { id: 1202, category: 'gage', level: 'medium', text: "Invente-moi un gage, et je le fais tout de suite." },
  { id: 1203, category: 'gage', level: 'medium', text: "Donne-moi une note sur dix, et assume-la à voix haute." },
  { id: 1204, category: 'gage', level: 'medium', text: "Dis-moi un truc gentil et un truc vache sur moi. Dans cet ordre." },
  { id: 1205, category: 'gage', level: 'medium', text: "Pose-moi la question piège que tu gardes pour la fin." },
  { id: 1206, category: 'gage', level: 'hot', text: "Tu as dix secondes pour me convaincre de t'embrasser." },
  { id: 1207, category: 'gage', level: 'hot', text: "Dis-moi une vérité sur moi que je n'aurais pas forcément envie d'entendre." },
  { id: 1208, category: 'gage', level: 'hot', text: "Choisis un moment de la soirée, et on le refait, là, maintenant." },

  // ───────────────────────────── 💋 AUDACIEUX ─────────────────────────────
  { id: 1301, category: 'audacieux', level: 'soft', text: "C'est quoi le moment où tu t'es sentie le plus désirée avec moi ?" },
  { id: 1302, category: 'audacieux', level: 'medium', text: "Avoue-moi une pensée d'aujourd'hui que tu n'assumes pas tout à fait." },
  { id: 1303, category: 'audacieux', level: 'hot', text: "C'est quoi la chose la plus osée que tu aurais envie d'essayer avec moi ?" },

  // ───────────────────────────── 🎲 RACONTE-MOI ─────────────────────────────
  { id: 1401, category: 'raconte', level: 'soft', text: "Raconte-moi un fou rire dont tu te souviens encore." },
  { id: 1402, category: 'raconte', level: 'medium', text: "Raconte-moi ton pire rendez-vous avant moi." },
  { id: 1403, category: 'raconte', level: 'medium', text: "Raconte-moi la fois où tu t'es sentie vraiment belle." },
]
