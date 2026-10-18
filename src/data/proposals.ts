import type { Card } from '../types'

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  NOUVELLES PROPOSITIONS
 *  Lot de cartes générées dans l'esprit des 79 cartes validées, à trier via
 *  la page /verification (onglet « Nouvelles propositions »).
 *
 *  Règles reprises du tri précédent :
 *   • Une seule idée par carte, pas de question à tiroirs.
 *   • « je / nous » à la 1re personne, jamais « Kevin » à la 3e, pas de « mon chou ».
 *   • Assis, à table, souvent entourés. Rien de performatif ou d'enfantin.
 *   • Gages & audacieux : intimes, chuchotés, « à l'oreille », consentis.
 *   • Ton direct, 21 ans, pas mièvre.
 *
 *  Plages d'id dédiées (pas de collision avec le jeu) :
 *   1001+ connaissance · 1101+ profonde · 1201+ gage · 1301+ audacieux · 1401+ raconte
 *  Les cartes gardées ici seront promues dans data/cards.ts avec un id définitif.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const proposals: Card[] = [
  // ───────────────────────────── 💬 CONNAISSONS-NOUS ─────────────────────────────
  // Soft
  { id: 1001, category: 'connaissance', level: 'soft', text: "Tu revis plutôt le matin ou quand la nuit tombe ?" },
  { id: 1002, category: 'connaissance', level: 'soft', text: "C'est quoi le film que tu peux revoir sans jamais t'en lasser ?" },
  { id: 1003, category: 'connaissance', level: 'soft', text: "Un truc tout bête qui te rend heureuse à chaque fois ?" },
  { id: 1004, category: 'connaissance', level: 'soft', text: "C'est quoi ton rituel du dimanche ?" },

  // Medium
  { id: 1011, category: 'connaissance', level: 'medium', text: "Qu'est-ce que tu n'avoues jamais en premier à quelqu'un ?" },
  { id: 1012, category: 'connaissance', level: 'medium', text: "Tu préfères qu'on te dise les choses cash ou en douceur ?" },
  { id: 1013, category: 'connaissance', level: 'medium', text: "C'est quoi le compliment qu'on te fait tout le temps et qui ne te fait plus rien ?" },

  // Hot
  { id: 1021, category: 'connaissance', level: 'hot', text: "Qu'est-ce que tu remarques chez moi que les autres ne voient pas ?" },
  { id: 1022, category: 'connaissance', level: 'hot', text: "Il y a eu un moment où tu as failli m'embrasser avant que je le fasse ?" },
  { id: 1023, category: 'connaissance', level: 'hot', text: "Qu'est-ce qui te fait craquer chez moi sans que tu l'aies décidé ?" },

  // ───────────────────────────── 🧠 PROFONDES ─────────────────────────────
  // Soft
  { id: 1101, category: 'profonde', level: 'soft', text: "C'est quoi qui te fait te sentir vraiment toi-même ?" },
  { id: 1102, category: 'profonde', level: 'soft', text: "Qu'est-ce que tu aimerais qu'on comprenne de toi sans avoir à l'expliquer ?" },
  { id: 1103, category: 'profonde', level: 'soft', text: "C'est quoi une vie réussie, pour toi ?" },

  // Medium
  { id: 1111, category: 'profonde', level: 'medium', text: "Qu'est-ce que tu as le plus de mal à te pardonner ?" },
  { id: 1112, category: 'profonde', level: 'medium', text: "Qu'est-ce qui te fait te sentir seule, même entourée ?" },
  { id: 1113, category: 'profonde', level: 'medium', text: "Tu crois qu'on choisit qui on aime, ou pas vraiment ?" },

  // Hot
  { id: 1121, category: 'profonde', level: 'hot', text: "Qu'est-ce que tu n'as jamais osé attendre de quelqu'un ?" },
  { id: 1122, category: 'profonde', level: 'hot', text: "Si tu pouvais être sûre d'une seule chose sur nous, ce serait laquelle ?" },
  { id: 1123, category: 'profonde', level: 'hot', text: "Qu'est-ce qu'il te faudrait pour me faire totalement confiance ?" },

  // ───────────────────────────── 🎭 GAGES ─────────────────────────────
  // Soft
  { id: 1201, category: 'gage', level: 'soft', text: "Jusqu'à ta prochaine carte, tu n'as plus le droit de dire « non ». Trouve autre chose." },
  { id: 1202, category: 'gage', level: 'soft', text: "Choisis un surnom que tu me donnes rien que pour ce soir." },
  { id: 1203, category: 'gage', level: 'soft', text: "On se regarde dix secondes sans rien dire. Le premier qui sourit a perdu." },

  // Medium
  { id: 1211, category: 'gage', level: 'medium', text: "Garde ma main dans la tienne jusqu'à ta prochaine carte." },
  { id: 1212, category: 'gage', level: 'medium', text: "Pendant une minute, tu réponds à tout ce que je dis par une question." },
  { id: 1213, category: 'gage', level: 'medium', text: "Dis-moi trois vérités et un mensonge sur toi. À moi de trouver l'intrus." },

  // Hot
  { id: 1221, category: 'gage', level: 'hot', text: "Écris sur ma paume, du bout du doigt, ce que tu penses tout bas." },
  { id: 1222, category: 'gage', level: 'hot', text: "Rapproche ta chaise de la mienne, et ne t'explique pas." },
  { id: 1223, category: 'gage', level: 'hot', text: "Choisis : un baiser maintenant, ou un secret. Pas les deux." },

  // ───────────────────────────── 💋 AUDACIEUX ─────────────────────────────
  // Soft
  { id: 1301, category: 'audacieux', level: 'soft', text: "Dis-moi ce que tu as pensé la première fois que tu m'as vu." },
  { id: 1302, category: 'audacieux', level: 'soft', text: "C'est quoi le détail chez moi que tu regardes sans que je le sache ?" },
  { id: 1303, category: 'audacieux', level: 'soft', text: "Finis la phrase, tout bas : ce soir, j'ai envie que tu…" },

  // Medium
  { id: 1311, category: 'audacieux', level: 'medium', text: "Chuchote-moi le moment de la soirée que tu ne vas pas oublier." },
  { id: 1312, category: 'audacieux', level: 'medium', text: "Dis-moi à l'oreille ce que tu ferais si personne ne nous regardait." },
  { id: 1313, category: 'audacieux', level: 'medium', text: "Approche-toi et dis-moi ce que tu gardes pour toi depuis tout à l'heure." },

  // Hot
  { id: 1321, category: 'audacieux', level: 'hot', text: "Décris-moi, à voix basse, comment tu voudrais que je t'embrasse." },
  { id: 1322, category: 'audacieux', level: 'hot', text: "Dis-moi tout bas jusqu'où tu as envie d'aller ce soir." },
  { id: 1323, category: 'audacieux', level: 'hot', text: "Les yeux dans les yeux, dis-moi ce dont tu as le plus envie là, maintenant." },

  // ───────────────────────────── 🎲 RACONTE-MOI ─────────────────────────────
  // Soft
  { id: 1401, category: 'raconte', level: 'soft', text: "Raconte-moi ton plus beau souvenir d'enfance." },
  { id: 1402, category: 'raconte', level: 'soft', text: "Raconte-moi un endroit où tu te sens parfaitement bien." },

  // Medium
  { id: 1411, category: 'raconte', level: 'medium', text: "Raconte-moi une amitié qui a compté et ce qu'elle t'a appris." },
  { id: 1412, category: 'raconte', level: 'medium', text: "Raconte-moi la fois où tu as osé un truc qui te faisait peur." },

  // Hot
  { id: 1421, category: 'raconte', level: 'hot', text: "Raconte-moi la première fois que tu as pensé à moi en souriant toute seule." },
  { id: 1422, category: 'raconte', level: 'hot', text: "Raconte-moi ce que tu as ressenti la première fois qu'on s'est tenu la main." },
  { id: 1423, category: 'raconte', level: 'hot', text: "Raconte-moi la soirée que tu aimerais qu'on vive, sans rien censurer." },
]
