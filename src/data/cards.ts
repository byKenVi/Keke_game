import type { Card, Category, CategoryMeta, Level } from '../types'

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  LES CARTES
 *  Chaque carte : `id` unique, `category`, `level` (soft|medium|hot), `text`.
 *  Carte « allemand » : ajoute un objet `german` (answer + reward).
 *
 *  Règles d'écriture :
 *   • Tout se joue ASSIS, à table, souvent entourés. Rien qui demande de se
 *     lever, danser, chanter ou imiter tout haut.
 *   • Ton naturel, direct, un peu taquin. On a 21 ans. Pas de mièvrerie,
 *     pas de phrase trop lisse ou trop « parfaite ». On va à l'essentiel.
 *   • Une seule idée par carte : pas de question à tiroirs (« … et sinon ? »).
 *   • On parle de nous, à la première personne. Pas de « Kevin » à la 3e.
 *
 *  Ce jeu a été trié et reformulé à la main via la page /verification :
 *  ces 79 cartes sont la base validée. Les nouvelles propositions passent
 *  par le même atelier avant d'arriver ici.
 * ─────────────────────────────────────────────────────────────────────────
 */

/** Libellés, emojis et couleurs d'accent par catégorie. */
export const CATEGORIES: Record<Category, CategoryMeta> = {
  connaissance: { label: 'Connaissons-nous', emoji: '💬', color: 'var(--c-connaissance)' },
  profonde: { label: 'Profondes', emoji: '🧠', color: 'var(--c-profonde)' },
  gage: { label: 'Gages', emoji: '🎭', color: 'var(--c-gage)' },
  audacieux: { label: 'Audacieux', emoji: '💋', color: 'var(--c-audacieux)' },
  raconte: { label: 'Raconte-moi', emoji: '🎲', color: 'var(--c-raconte)' },
}

/** Libellés des niveaux pour l'UI. */
export const LEVELS: Record<Level, { label: string; emoji: string }> = {
  soft: { label: 'Soft', emoji: '🌸' },
  medium: { label: 'Medium', emoji: '🔥' },
  hot: { label: 'Hot', emoji: '🌶️' },
}

export const LEVEL_ORDER: Level[] = ['soft', 'medium', 'hot']

export const cards: Card[] = [
  // ───────────────────────────── 💬 CONNAISSONS-NOUS ─────────────────────────────
  // Soft
  { id: 1, category: 'connaissance', level: 'soft', text: "C'est quoi la première chose que tu as remarquée chez moi ?" },
  { id: 2, category: 'connaissance', level: 'soft', text: "Qu'est-ce qui t'a fait du bien cette semaine ?" },
  { id: 4, category: 'connaissance', level: 'soft', text: "C'est quoi l'album que tu peux écouter en boucle sans jamais saturer ?" },
  { id: 5, category: 'connaissance', level: 'soft', text: "Tu fais quoi pour décompresser après une journée pourrie ?" },
  { id: 6, category: 'connaissance', level: 'soft', text: "C'est quoi ton plaisir coupable, celui que tu assumes à moitié ?" },
  { id: 7, category: 'connaissance', level: 'soft', text: "On part où si on pouvait partir demain, n'importe où ?" },
  { id: 10, category: 'connaissance', level: 'soft', text: "Tu fonctionnes plus à l'instinct ou à la raison ?" },
  { id: 28, category: 'connaissance', level: 'soft', text: "C'est quoi le film que tu peux revoir sans jamais t'en lasser ?" },
  { id: 29, category: 'connaissance', level: 'soft', text: "Un truc tout bête qui te rend heureuse à chaque fois ?" },

  // Medium
  { id: 12, category: 'connaissance', level: 'medium', text: "Qu'est-ce qui t'énerve le plus chez un homme ?" },
  { id: 13, category: 'connaissance', level: 'medium', text: "Si tu gardais un seul souvenir de nous, ce serait lequel ?" },
  { id: 14, category: 'connaissance', level: 'medium', text: "Quel compliment te touche vraiment ?" },
  { id: 15, category: 'connaissance', level: 'medium', text: "C'est quoi une journée parfaite pour toi, en ce moment ?" },
  { id: 16, category: 'connaissance', level: 'medium', text: "Quelle habitude chez moi te fait sourire, et laquelle t'agace ?" },
  { id: 17, category: 'connaissance', level: 'medium', text: "Tu me décrirais comment en une phrase à quelqu'un qui compte pour toi ?" },
  { id: 18, category: 'connaissance', level: 'medium', text: "Il y a une version de toi que presque personne connaît ?" },
  { id: 30, category: 'connaissance', level: 'medium', text: "Qu'est-ce que tu n'avoues jamais en premier à quelqu'un ?" },
  { id: 31, category: 'connaissance', level: 'medium', text: "Tu préfères qu'on te dise les choses cash ou en douceur ?" },
  { id: 34, category: 'connaissance', level: 'medium', text: "C'est quoi ton langage de l'amour, celui qui te touche vraiment ?" },
  {
    id: 27,
    category: 'connaissance',
    level: 'medium',
    text: "Traduis à voix basse : « Du bist wunderschön ».",
    german: { answer: 'Tu es magnifique.', reward: "Richtig. Et c'est juste la vérité." },
  },

  // Hot
  { id: 19, category: 'connaissance', level: 'hot', text: "Quel moment avec moi tu repasses le plus dans ta tête ?" },
  { id: 20, category: 'connaissance', level: 'hot', text: "Il y a un truc que tu n'oses pas me demander, mais que tu voudrais ?" },
  { id: 21, category: 'connaissance', level: 'hot', text: "C'était quand, la première fois que tu t'es dit que j'étais pas comme les autres ?" },
  { id: 22, category: 'connaissance', level: 'hot', text: "Qu'est-ce qui te manque le plus quand je suis pas là ?" },
  { id: 23, category: 'connaissance', level: 'hot', text: "Si je lisais dans tes pensées là, je verrais quoi ?" },
  { id: 24, category: 'connaissance', level: 'hot', text: "Qu'est-ce que tu aimerais qu'on fasse plus souvent ?" },
  { id: 25, category: 'connaissance', level: 'hot', text: "La chose la plus sincère que tu as envie de me dire ce soir ?" },
  { id: 26, category: 'connaissance', level: 'hot', text: "Tu nous imagines comment d'ici la fin de l'année ?" },
  { id: 32, category: 'connaissance', level: 'hot', text: "Qu'est-ce que tu remarques chez moi que les autres ne voient pas ?" },
  { id: 33, category: 'connaissance', level: 'hot', text: "Qu'est-ce qui te fait craquer chez moi sans que tu l'aies décidé ?" },

  // ───────────────────────────── 🧠 PROFONDES ─────────────────────────────
  // Soft
  { id: 101, category: 'profonde', level: 'soft', text: "Quel rêve de gamine tu n'as jamais vraiment lâché ?" },
  { id: 102, category: 'profonde', level: 'soft', text: "Qu'est-ce qui te fait te sentir en sécurité avec quelqu'un ?" },
  { id: 125, category: 'profonde', level: 'soft', text: "Qu'est-ce que tu aimerais qu'on comprenne de toi sans avoir à l'expliquer ?" },
  { id: 126, category: 'profonde', level: 'soft', text: "C'est quoi une vie réussie, pour toi ?" },
  { id: 133, category: 'profonde', level: 'soft', text: "Qu'est-ce que tu as compris sur toi, récemment ?" },

  // Medium
  { id: 108, category: 'profonde', level: 'medium', text: "De quoi tu as le plus peur, vraiment ?" },
  { id: 109, category: 'profonde', level: 'medium', text: "C'est quoi le truc le plus dur que tu as traversé ?" },
  { id: 110, category: 'profonde', level: 'medium', text: "Il y a une chose que tu n'as jamais dite à personne et que tu pourrais me dire ?" },
  { id: 111, category: 'profonde', level: 'medium', text: "Qu'est-ce qui te manque dans ta vie en ce moment ?" },
  { id: 112, category: 'profonde', level: 'medium', text: "Tu dirais quoi à la toi d'il y a cinq ans ?" },
  { id: 113, category: 'profonde', level: 'medium', text: "Quelle partie de toi tu caches le plus souvent ?" },
  { id: 114, category: 'profonde', level: 'medium', text: "C'était quand, la dernière fois que tu t'es sentie incomprise ?" },
  { id: 115, category: 'profonde', level: 'medium', text: "Tu as besoin de quoi, concrètement, quand ça ne va pas ?" },
  { id: 127, category: 'profonde', level: 'medium', text: "Qu'est-ce que tu as le plus de mal à te pardonner ?" },
  { id: 128, category: 'profonde', level: 'medium', text: "Qu'est-ce qui te fait te sentir seule, même entourée ?" },
  { id: 129, category: 'profonde', level: 'medium', text: "Tu crois qu'on choisit qui on aime, ou pas vraiment ?" },
  { id: 134, category: 'profonde', level: 'medium', text: "C'est quoi la chose la plus difficile à demander, pour toi ?" },

  // Hot
  { id: 116, category: 'profonde', level: 'hot', text: "Tu attends quoi de l'amour, aujourd'hui ?" },
  { id: 117, category: 'profonde', level: 'hot', text: "Il y a une part de toi que tu as peur de me montrer ?" },
  { id: 118, category: 'profonde', level: 'hot', text: "Qu'est-ce qui te ferait te sentir vraiment aimée par moi ?" },
  { id: 119, category: 'profonde', level: 'hot', text: "C'est quoi ton plus grand regret ?" },
  { id: 120, category: 'profonde', level: 'hot', text: "Qu'est-ce que tu espères qu'on se dira encore dans dix ans ?" },
  { id: 121, category: 'profonde', level: 'hot', text: "Il y a une blessure du passé qui joue encore sur ta façon d'aimer ?" },
  { id: 122, category: 'profonde', level: 'hot', text: "Si tu devais me confier une peur sur nous, ce serait laquelle ?" },
  { id: 130, category: 'profonde', level: 'hot', text: "Qu'est-ce que tu n'as jamais osé attendre de quelqu'un ?" },
  { id: 131, category: 'profonde', level: 'hot', text: "Si tu pouvais être sûre d'une seule chose sur nous, ce serait laquelle ?" },
  { id: 132, category: 'profonde', level: 'hot', text: "Qu'est-ce qu'il te faudrait pour me faire totalement confiance ?" },

  // ───────────────────────────── 🎭 GAGES ─────────────────────────────
  // Medium
  { id: 213, category: 'gage', level: 'medium', text: "Jusqu'à ta prochaine carte, tu dois caser le mot « destin » dans tout ce que tu dis." },
  { id: 215, category: 'gage', level: 'medium', text: "Tu as droit à une seule question indiscrète ce soir. C'est le moment." },
  { id: 227, category: 'gage', level: 'medium', text: "Invente-moi un gage, et je le fais tout de suite." },
  { id: 228, category: 'gage', level: 'medium', text: "Dis-moi un truc gentil et un truc vache sur moi. Dans cet ordre." },
  { id: 229, category: 'gage', level: 'medium', text: "Pose-moi la question piège que tu gardes pour la fin." },

  // Hot
  { id: 218, category: 'gage', level: 'hot', text: "Fais-moi un compliment auquel je ne m'attends pas du tout." },
  { id: 221, category: 'gage', level: 'hot', text: "Trouvons notre handshake rien que pour nous." },
  { id: 222, category: 'gage', level: 'hot', text: "Dis-moi tout bas la pensée la moins sage que tu as eue ce soir." },
  { id: 224, category: 'gage', level: 'hot', text: "Avant qu'on se quitte, vole-moi un baiser quand je m'y attends le moins." },
  { id: 225, category: 'gage', level: 'hot', text: "Dis-moi tout bas ce que tu as en tête pour la fin de la soirée." },
  { id: 226, category: 'gage', level: 'hot', text: "Choisis : un baiser maintenant, ou un secret. Pas les deux." },
  { id: 230, category: 'gage', level: 'hot', text: "Tu as dix secondes pour me convaincre de t'embrasser." },
  { id: 231, category: 'gage', level: 'hot', text: "Dis-moi une vérité sur moi que je n'aurais pas forcément envie d'entendre." },

  // ───────────────────────────── 💋 AUDACIEUX ─────────────────────────────
  // Soft
  { id: 301, category: 'audacieux', level: 'soft', text: "Qu'est-ce que tu préfères dans mon regard ?" },
  { id: 305, category: 'audacieux', level: 'soft', text: "Dis-moi un compliment que tu gardais pour toi." },
  { id: 306, category: 'audacieux', level: 'soft', text: "C'était quand, la première fois que tu m'as trouvé attirant ?" },
  { id: 328, category: 'audacieux', level: 'soft', text: "Finis la phrase, tout bas : ce soir, j'ai envie que tu…" },

  // Medium
  { id: 309, category: 'audacieux', level: 'medium', text: "Chuchote-moi ce dont tu as envie pour quand on sera seuls." },
  { id: 311, category: 'audacieux', level: 'medium', text: "Décris-moi le baiser parfait, à voix basse." },
  { id: 312, category: 'audacieux', level: 'medium', text: "Dis-moi trois trucs chez moi que tu trouves irrésistibles." },
  { id: 329, category: 'audacieux', level: 'medium', text: "Chuchote-moi le moment de la soirée que tu ne vas pas oublier." },
  { id: 330, category: 'audacieux', level: 'medium', text: "Dis-moi à l'oreille ce que tu ferais si personne ne nous regardait." },
  { id: 331, category: 'audacieux', level: 'medium', text: "Approche-toi et dis-moi ce que tu gardes pour toi depuis tout à l'heure." },
  { id: 335, category: 'audacieux', level: 'medium', text: "Avoue-moi une pensée d'aujourd'hui que tu n'assumes pas tout à fait." },

  // Hot
  { id: 316, category: 'audacieux', level: 'hot', text: "Murmure-moi la pensée la plus osée que tu as eue de moi ce soir." },
  { id: 320, category: 'audacieux', level: 'hot', text: "Les yeux dans les yeux, dis-moi un truc que tu ne dirais à personne d'autre." },
  { id: 324, category: 'audacieux', level: 'hot', text: "Approche-toi comme pour m'embrasser. Et décide si tu me fais attendre." },
  { id: 326, category: 'audacieux', level: 'hot', text: "Dis-moi une limite que tu ne veux pas franchir ce soir." },
  { id: 332, category: 'audacieux', level: 'hot', text: "Décris-moi, à voix basse, comment tu voudrais que je t'embrasse." },
  { id: 333, category: 'audacieux', level: 'hot', text: "Dis-moi tout bas jusqu'où tu as envie d'aller ce soir." },
  { id: 336, category: 'audacieux', level: 'hot', text: "C'est quoi la chose la plus osée que tu aurais envie d'essayer avec moi ?" },

  // ───────────────────────────── 🎲 RACONTE-MOI ─────────────────────────────
  // Soft
  { id: 401, category: 'raconte', level: 'soft', text: "Raconte-moi ta journée comme si c'était le début d'un film." },
  { id: 404, category: 'raconte', level: 'soft', text: "Raconte-moi une décision que tu as prise seule et dont tu es fière." },
  { id: 426, category: 'raconte', level: 'soft', text: "Raconte-moi ton plus beau souvenir d'enfance." },
  { id: 427, category: 'raconte', level: 'soft', text: "Raconte-moi un endroit où tu te sens parfaitement bien." },

  // Medium
  { id: 408, category: 'raconte', level: 'medium', text: "Raconte-moi la fois où tu t'es sentie la plus courageuse." },
  { id: 409, category: 'raconte', level: 'medium', text: "Raconte-moi une fois où tu as failli tout plaquer." },
  { id: 411, category: 'raconte', level: 'medium', text: "Raconte-moi un truc que tu as fait et que tes parents ignorent encore." },
  { id: 412, category: 'raconte', level: 'medium', text: "Raconte-moi la dernière fois que tu as pleuré." },
  { id: 414, category: 'raconte', level: 'medium', text: "Raconte-moi une rencontre qui a changé ta façon de voir les choses." },
  { id: 425, category: 'raconte', level: 'medium', text: "Raconte-moi le meilleur conseil qu'on t'ait donné. Tu l'as suivi ?" },
  { id: 428, category: 'raconte', level: 'medium', text: "Raconte-moi la fois où tu as osé un truc qui te faisait peur." },
  { id: 432, category: 'raconte', level: 'medium', text: "Raconte-moi ton pire rendez-vous avant moi." },

  // Hot
  { id: 415, category: 'raconte', level: 'hot', text: "Raconte-moi le moment où tu as su que tu tenais à moi." },
  { id: 416, category: 'raconte', level: 'hot', text: "Raconte-moi comment tu nous vois dans cinq ans." },
  {
    id: 417,
    category: 'raconte',
    level: 'hot',
    text: "Raconte-moi ta soirée idéale, juste nous deux.\nEt je ferai en sorte de la réaliser.",
  },
  { id: 418, category: 'raconte', level: 'hot', text: "Raconte-moi un moment où tu as eu très envie de m'embrasser sans le faire." },
  { id: 419, category: 'raconte', level: 'hot', text: "Raconte-moi ce que ça te fait quand je te fixe un peu trop longtemps." },
  { id: 421, category: 'raconte', level: 'hot', text: "Raconte-moi ce que tu dirais de moi à ta meilleure amie, sans filtre." },
  { id: 422, category: 'raconte', level: 'hot', text: "Raconte-moi comment tu voudrais que je m'y prenne pour te séduire de zéro." },
  { id: 424, category: 'raconte', level: 'hot', text: "Raconte-moi une envie que tu n'as encore dite à personne." },
  { id: 430, category: 'raconte', level: 'hot', text: "Raconte-moi ce que tu as ressenti la première fois qu'on s'est tenu la main." },

  // ───────────────────────────── ✨ CARTE CACHÉE ─────────────────────────────
  // Déclenchée en tapant 5 fois sur le titre, en jeu. N'apparaît jamais au tirage.
  {
    id: 999,
    category: 'audacieux',
    level: 'soft',
    secret: true,
    text: "Tu as trouvé la carte cachée. Alors voilà, c'est écrit noir sur or : je t'aime bien. Beaucoup, même. Voilà tu peux passer à la suite maintenant 🙂",
  },
]

/** La carte secrète (easter egg du titre tapé 5 fois). */
export const secretCard: Card = cards.find((c) => c.secret)!

/** Toutes les cartes jouables (hors cartes secrètes). */
export const playableCards: Card[] = cards.filter((c) => !c.secret)
