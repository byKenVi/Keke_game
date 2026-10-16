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
  { id: 3, category: 'connaissance', level: 'soft', text: "Tu planifies tout, ou tu improvises et tu vois venir ?" },
  { id: 4, category: 'connaissance', level: 'soft', text: "C'est quoi l'album que tu peux écouter en boucle sans jamais saturer ?" },
  { id: 5, category: 'connaissance', level: 'soft', text: "Tu fais quoi pour décompresser après une journée pourrie ?" },
  { id: 6, category: 'connaissance', level: 'soft', text: "C'est quoi ton plaisir coupable, celui que tu assumes à moitié ?" },
  { id: 7, category: 'connaissance', level: 'soft', text: "On part où si on pouvait partir demain, n'importe où ?" },
  { id: 8, category: 'connaissance', level: 'soft', text: "Smile Space ou un soir sur le canapé avec moi ? Vite, sans réfléchir." },
  { id: 9, category: 'connaissance', level: 'soft', text: "Krep's, Piao Piao ou Iced Drinks : on y retourne où ce soir ?" },
  { id: 10, category: 'connaissance', level: 'soft', text: "Tu fonctionnes plus à l'instinct ou à la raison ?" },

  // Medium
  { id: 11, category: 'connaissance', level: 'medium', text: "C'est quoi la dernière chose qui t'a fait rire aux larmes ?" },
  { id: 12, category: 'connaissance', level: 'medium', text: "Qu'est-ce qui t'énerve direct, sans prévenir ?" },
  { id: 13, category: 'connaissance', level: 'medium', text: "Si tu gardais un seul souvenir de nous, ce serait lequel ?" },
  { id: 14, category: 'connaissance', level: 'medium', text: "Quel compliment te touche vraiment, et lequel te laisse de marbre ?" },
  { id: 15, category: 'connaissance', level: 'medium', text: "C'est quoi une journée parfaite pour toi, en ce moment ?" },
  { id: 16, category: 'connaissance', level: 'medium', text: "Quelle habitude chez moi te fait sourire, et laquelle t'agace ?" },
  { id: 17, category: 'connaissance', level: 'medium', text: "Tu me décrirais comment en une phrase à quelqu'un qui compte pour toi ?" },
  { id: 18, category: 'connaissance', level: 'medium', text: "Il y a une version de toi que presque personne connaît ?" },

  // Hot
  { id: 19, category: 'connaissance', level: 'hot', text: "Quel moment avec moi tu repasses le plus dans ta tête ?" },
  { id: 20, category: 'connaissance', level: 'hot', text: "Il y a un truc que tu n'oses pas me demander, mais que tu voudrais ?" },
  { id: 21, category: 'connaissance', level: 'hot', text: "C'était quand, la première fois que tu t'es dit que j'étais pas comme les autres ?" },
  { id: 22, category: 'connaissance', level: 'hot', text: "Qu'est-ce qui te manque le plus quand je suis pas là ?" },
  { id: 23, category: 'connaissance', level: 'hot', text: "Si je lisais dans tes pensées là, je verrais quoi ?" },
  { id: 24, category: 'connaissance', level: 'hot', text: "Qu'est-ce que tu aimerais qu'on fasse plus souvent ?" },
  { id: 25, category: 'connaissance', level: 'hot', text: "La chose la plus sincère que tu as envie de me dire ce soir ?" },
  { id: 26, category: 'connaissance', level: 'hot', text: "Tu nous imagines comment d'ici la fin de l'année ?" },
  {
    id: 27,
    category: 'connaissance',
    level: 'medium',
    text: "Traduis à voix basse : « Du bist wunderschön ».",
    german: { answer: 'Tu es magnifique.', reward: "Richtig. Et c'est juste la vérité." },
  },

  // ───────────────────────────── 🧠 PROFONDES ─────────────────────────────
  // Soft
  { id: 101, category: 'profonde', level: 'soft', text: "Quel rêve de gamine tu n'as jamais vraiment lâché ?" },
  { id: 102, category: 'profonde', level: 'soft', text: "Qu'est-ce qui te fait te sentir en sécurité avec quelqu'un ?" },
  { id: 103, category: 'profonde', level: 'soft', text: "Quel souvenir te revient quand tu penses à chez toi ?" },
  { id: 104, category: 'profonde', level: 'soft', text: "Qu'est-ce que tu as retenu de tes parents, en bien comme en mal ?" },
  { id: 105, category: 'profonde', level: 'soft', text: "C'est quoi une valeur sur laquelle tu ne lâches jamais ?" },
  { id: 106, category: 'profonde', level: 'soft', text: "Dans quels moments tu te sens vraiment toi-même ?" },
  { id: 107, category: 'profonde', level: 'soft', text: "De quoi tu es le plus fière en ce moment ?" },

  // Medium
  { id: 108, category: 'profonde', level: 'medium', text: "De quoi tu as le plus peur, vraiment ?" },
  { id: 109, category: 'profonde', level: 'medium', text: "C'est quoi le truc le plus dur que tu as traversé ?" },
  { id: 110, category: 'profonde', level: 'medium', text: "Il y a une chose que tu n'as jamais dite à personne et que tu pourrais me dire ?" },
  { id: 111, category: 'profonde', level: 'medium', text: "Qu'est-ce qui te manque dans ta vie en ce moment ?" },
  { id: 112, category: 'profonde', level: 'medium', text: "Tu dirais quoi à la toi d'il y a cinq ans ?" },
  { id: 113, category: 'profonde', level: 'medium', text: "Quelle partie de toi tu caches le plus souvent ?" },
  { id: 114, category: 'profonde', level: 'medium', text: "C'était quand, la dernière fois que tu t'es sentie incomprise ?" },
  { id: 115, category: 'profonde', level: 'medium', text: "Tu as besoin de quoi, concrètement, quand ça ne va pas ?" },

  // Hot
  { id: 116, category: 'profonde', level: 'hot', text: "Tu attends quoi de l'amour, aujourd'hui ?" },
  { id: 117, category: 'profonde', level: 'hot', text: "Il y a une part de toi que tu as peur de me montrer ?" },
  { id: 118, category: 'profonde', level: 'hot', text: "Qu'est-ce qui te ferait te sentir vraiment aimée par moi ?" },
  { id: 119, category: 'profonde', level: 'hot', text: "C'est quoi ton plus grand regret ?" },
  { id: 120, category: 'profonde', level: 'hot', text: "Qu'est-ce que tu espères qu'on se dira encore dans dix ans ?" },
  { id: 121, category: 'profonde', level: 'hot', text: "Il y a une blessure du passé qui joue encore sur ta façon d'aimer ?" },
  { id: 122, category: 'profonde', level: 'hot', text: "Si tu devais me confier une peur sur nous, ce serait laquelle ?" },
  { id: 123, category: 'profonde', level: 'hot', text: "Qu'est-ce que tu oses à peine espérer, mais que tu espères quand même ?" },
  { id: 124, category: 'profonde', level: 'hot', text: "Dis-moi un truc que tu n'as jamais dit à voix haute." },
  { id: 125, category: 'profonde', level: 'hot', text: "Qu'est-ce qui te fait sentir que tu comptes vraiment pour quelqu'un ?" },

  // ───────────────────────────── 🎭 GAGES ─────────────────────────────
  // Tout se joue à table, discrètement.
  // Soft
  { id: 201, category: 'gage', level: 'soft', text: "Montre-moi la dernière photo de ta galerie. Sans tricher." },
  { id: 202, category: 'gage', level: 'soft', text: "Montre-moi ton fond d'écran et dis-moi pourquoi c'est celui-là." },
  { id: 203, category: 'gage', level: 'soft', text: "Classe Krep's, Piao Piao, Iced Drinks et Royal Panini, du pire au meilleur." },
  { id: 204, category: 'gage', level: 'soft', text: "Mode radiateur : réchauffe mes mains trente secondes." },
  { id: 205, category: 'gage', level: 'soft', text: "Prends-moi en photo là, tel que tu me vois. Une seule prise." },
  { id: 206, category: 'gage', level: 'soft', text: "Pendant les trois prochaines cartes, interdit de dire mon prénom." },
  { id: 207, category: 'gage', level: 'soft', text: "Donne-moi trois raisons de t'offrir le dessert." },
  { id: 208, category: 'gage', level: 'soft', text: "Montre-moi une photo de nous que tu as gardée, et raconte ce jour-là." },

  // Medium
  { id: 209, category: 'gage', level: 'medium', text: "Écris sur une serviette un mot qui résume la soirée, plie-la : je la lirai avant qu'on parte." },
  { id: 210, category: 'gage', level: 'medium', text: "Montre-moi ton dernier message envoyé à quelqu'un d'autre que moi. Ou refuse, tu as le droit." },
  {
    id: 211,
    category: 'gage',
    level: 'medium',
    text: "Traduis en anglais : « Mon copain est le plus beau. » C'est moi le juge.",
  },
  { id: 212, category: 'gage', level: 'medium', text: "Le débat de ce soir : qui est le plus élancé de nous deux ? Défends-toi." },
  { id: 213, category: 'gage', level: 'medium', text: "Jusqu'à ta prochaine carte, tu dois caser le mot « destin » dans tout ce que tu dis." },
  { id: 214, category: 'gage', level: 'medium', text: "Mode radiateur, niveau 2 : garde mes mains dans les tiennes jusqu'à la prochaine carte." },
  { id: 215, category: 'gage', level: 'medium', text: "Tu as droit à une seule question indiscrète ce soir. C'est le moment." },
  { id: 216, category: 'gage', level: 'medium', text: "Tu me mets combien sur dix pour ce soir ? Et il manque quoi pour le 10 ?" },

  // Hot
  { id: 217, category: 'gage', level: 'hot', text: "Écris sur ton téléphone une phrase que je ne lirai qu'en rentrant. Puis range-le." },
  { id: 218, category: 'gage', level: 'hot', text: "Fais-moi un compliment auquel je ne m'attends pas du tout." },
  {
    id: 219,
    category: 'gage',
    level: 'hot',
    text: "Fais-moi une phrase en anglais, dix mots minimum. Je compte les fautes.",
  },
  { id: 220, category: 'gage', level: 'hot', text: "Sous la table, prends ma main et dis-moi, d'une voix normale, un truc pas innocent du tout." },
  { id: 221, category: 'gage', level: 'hot', text: "Trouve-moi un surnom rien que pour nous." },
  { id: 222, category: 'gage', level: 'hot', text: "Dis-moi tout bas la pensée la moins sage que tu as eue ce soir." },
  { id: 223, category: 'gage', level: 'hot', text: "Tu as vingt secondes pour me convaincre de prolonger la soirée." },
  { id: 224, category: 'gage', level: 'hot', text: "Avant qu'on se quitte, vole-moi un baiser quand je m'y attends le moins." },
  { id: 225, category: 'gage', level: 'hot', text: "Dis-moi tout bas ce que tu as en tête pour la fin de la soirée." },

  // ───────────────────────────── 💋 AUDACIEUX ─────────────────────────────
  // Flirt discret, jouable à table. Chaque carte reste refusable (« Passer »).
  // Soft
  { id: 301, category: 'audacieux', level: 'soft', text: "Qu'est-ce que tu préfères dans mon regard ?" },
  { id: 302, category: 'audacieux', level: 'soft', text: "Pose ta main sur la mienne et dis-moi ce que tu ressens." },
  { id: 303, category: 'audacieux', level: 'soft', text: "Finis cette phrase : « Ce qui m'attire chez toi, c'est… »" },
  { id: 304, category: 'audacieux', level: 'soft', text: "Rapproche ta chaise de la mienne. Et reste là." },
  { id: 305, category: 'audacieux', level: 'soft', text: "Dis-moi un compliment que tu gardais pour toi." },
  { id: 306, category: 'audacieux', level: 'soft', text: "C'était quand, la première fois que tu m'as trouvé attirant ?" },
  { id: 307, category: 'audacieux', level: 'soft', text: "Sans me toucher ni parler, fais-moi comprendre que tu veux être plus près." },

  // Medium
  { id: 308, category: 'audacieux', level: 'medium', text: "Sous la table, garde mes mains dans les tiennes et continue de parler normalement." },
  { id: 309, category: 'audacieux', level: 'medium', text: "Chuchote-moi ce dont tu as envie pour quand on sera seuls." },
  { id: 310, category: 'audacieux', level: 'medium', text: "Regarde ma bouche, puis mes yeux. Ne dis rien." },
  { id: 311, category: 'audacieux', level: 'medium', text: "Décris-moi le baiser parfait, à voix basse." },
  { id: 312, category: 'audacieux', level: 'medium', text: "Dis-moi trois trucs chez moi que tu trouves irrésistibles." },
  { id: 313, category: 'audacieux', level: 'medium', text: "On se fixe sans lâcher jusqu'à ce que l'un de nous craque." },
  { id: 314, category: 'audacieux', level: 'medium', text: "Un seul mot pour ce que tu ressens là, en face de moi. Puis explique." },
  {
    id: 315,
    category: 'audacieux',
    level: 'medium',
    text: "Penche-toi et chuchote-moi « Ich mag dich » à l'oreille.",
    german: { answer: 'Je t’aime bien / je t’apprécie beaucoup.', reward: "Ich mag dich auch. Sauf que c'est bien plus que « bien »." },
  },

  // Hot
  { id: 316, category: 'audacieux', level: 'hot', text: "Murmure-moi la pensée la plus osée que tu as eue de moi ce soir." },
  { id: 317, category: 'audacieux', level: 'hot', text: "Du bout des doigts, écris un mot sur ma main. Je devine." },
  { id: 318, category: 'audacieux', level: 'hot', text: "Dis-moi tout bas ce que tu voudrais que je te murmure." },
  { id: 319, category: 'audacieux', level: 'hot', text: "Mords-toi la lèvre en me regardant, discrètement. Regarde l'effet." },
  { id: 320, category: 'audacieux', level: 'hot', text: "Les yeux dans les yeux, dis-moi un truc que tu ne dirais à personne d'autre." },
  { id: 321, category: 'audacieux', level: 'hot', text: "Promets-moi à l'oreille un truc précis pour quand on sera seuls." },
  {
    id: 322,
    category: 'audacieux',
    level: 'hot',
    text: "Dis-moi « Küss mich » en me regardant dans les yeux.",
    german: { answer: 'Embrasse-moi.', reward: 'Mit Vergnügen. Mais au bon moment.' },
  },
  { id: 323, category: 'audacieux', level: 'hot', text: "Si c'était toi qui décidais de tout, la soirée finit comment ? Dis-le tout bas." },
  { id: 324, category: 'audacieux', level: 'hot', text: "Approche-toi comme pour m'embrasser. Et décide si tu me fais attendre." },
  { id: 325, category: 'audacieux', level: 'hot', text: "Prends ma main : une pression pour « oui », deux pour « plus tard ». Je poserai la question du regard." },
  { id: 326, category: 'audacieux', level: 'hot', text: "Dis-moi une limite que tu ne veux pas franchir ce soir." },

  // ───────────────────────────── 🎲 RACONTE-MOI ─────────────────────────────
  // Soft
  { id: 401, category: 'raconte', level: 'soft', text: "Raconte-moi ta journée comme si c'était le début d'un film." },
  { id: 402, category: 'raconte', level: 'soft', text: "Raconte-moi un fou rire que tu as encore en tête." },
  { id: 403, category: 'raconte', level: 'soft', text: "Raconte-moi un endroit où tu t'es sentie à ta place." },
  { id: 404, category: 'raconte', level: 'soft', text: "Raconte-moi une décision que tu as prise seule et dont tu es fière." },
  { id: 405, category: 'raconte', level: 'soft', text: "Raconte-moi un souvenir à partir de l'odeur qui va avec." },
  { id: 406, category: 'raconte', level: 'soft', text: "Souviens-toi de Royal Panini, le snack où on avait encore faim en partant. Raconte-moi cette soirée." },
  { id: 407, category: 'raconte', level: 'soft', text: "Raconte-moi la chanson qui te ramène direct à un moment de ta vie." },

  // Medium
  { id: 408, category: 'raconte', level: 'medium', text: "Raconte-moi la fois où tu t'es sentie la plus courageuse." },
  { id: 409, category: 'raconte', level: 'medium', text: "Raconte-moi une fois où tu as failli tout plaquer." },
  { id: 410, category: 'raconte', level: 'medium', text: "Raconte-moi notre rencontre, ta version, sans rien arranger." },
  { id: 411, category: 'raconte', level: 'medium', text: "Raconte-moi un truc que tu as fait et que tes parents ignorent encore." },
  { id: 412, category: 'raconte', level: 'medium', text: "Raconte-moi la dernière fois que tu as pleuré." },
  { id: 413, category: 'raconte', level: 'medium', text: "Raconte-moi un moment où tu t'es sentie vraiment vivante." },
  { id: 414, category: 'raconte', level: 'medium', text: "Raconte-moi une rencontre qui a changé ta façon de voir les choses." },
  { id: 425, category: 'raconte', level: 'medium', text: "Raconte-moi le meilleur conseil qu'on t'ait donné. Tu l'as suivi ?" },

  // Hot
  { id: 415, category: 'raconte', level: 'hot', text: "Raconte-moi le moment où tu as su que tu tenais à moi." },
  { id: 416, category: 'raconte', level: 'hot', text: "Raconte-moi comment tu nous vois dans cinq ans, un soir normal." },
  { id: 417, category: 'raconte', level: 'hot', text: "Raconte-moi ta soirée idéale, juste nous deux." },
  { id: 418, category: 'raconte', level: 'hot', text: "Raconte-moi un moment où tu as eu très envie de m'embrasser sans le faire." },
  { id: 419, category: 'raconte', level: 'hot', text: "Raconte-moi ce que ça te fait quand je te fixe un peu trop longtemps." },
  { id: 420, category: 'raconte', level: 'hot', text: "Raconte-moi la soirée dont tu gardes le meilleur souvenir avec moi." },
  { id: 421, category: 'raconte', level: 'hot', text: "Raconte-moi ce que tu dirais de moi à ta meilleure amie, sans filtre." },
  { id: 422, category: 'raconte', level: 'hot', text: "Raconte-moi comment tu voudrais que je m'y prenne pour te séduire de zéro." },
  { id: 423, category: 'raconte', level: 'hot', text: "Invente-nous une histoire : nous deux dans dix ans, un soir comme ça." },
  { id: 424, category: 'raconte', level: 'hot', text: "Raconte-moi une envie que tu n'as encore dite à personne." },

  // ───────────────────────────── ✨ CARTE CACHÉE ─────────────────────────────
  // Déclenchée en tapant 5 fois sur le titre, en jeu. N'apparaît jamais au tirage.
  {
    id: 999,
    category: 'audacieux',
    level: 'soft',
    secret: true,
    text: "Tu as trouvé la carte cachée. Alors voilà, c'est écrit noir sur or : Kevin t'aime bien. Beaucoup, même. Tu peux rougir, maintenant, mon chou.",
  },
]

/** La carte secrète (easter egg du titre tapé 5 fois). */
export const secretCard: Card = cards.find((c) => c.secret)!

/** Toutes les cartes jouables (hors cartes secrètes). */
export const playableCards: Card[] = cards.filter((c) => !c.secret)
