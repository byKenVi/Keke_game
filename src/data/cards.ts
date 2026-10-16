import type { Card, Category, CategoryMeta, Level } from '../types'

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  LES CARTES
 *  Ajoute, retire ou modifie librement : chaque carte a un `id` unique,
 *  une `category`, un `level` (soft | medium | hot) et un `text`.
 *  Pour une carte « allemand » : ajoute un objet `german` (answer + reward).
 *
 *  Règle d'écriture : tout se joue ASSIS, à table, souvent entourés.
 *  Donc pas de « lève-toi / danse / chante / imite tout haut ». On parle,
 *  on chuchote, on écrit, on se regarde, on se tient la main, on sort le
 *  téléphone. Ton adulte et taquin — on a 21 ans, pas 14.
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
  { id: 1, category: 'connaissance', level: 'soft', text: "Quelle est la toute première chose que tu as remarquée chez moi ?" },
  { id: 2, category: 'connaissance', level: 'soft', text: "Qu'est-ce qui t'a fait du bien cette semaine, même un petit rien ?" },
  { id: 3, category: 'connaissance', level: 'soft', text: "Tu es plutôt du genre à tout planifier, ou à improviser et voir venir ?" },
  { id: 4, category: 'connaissance', level: 'soft', text: "Y a-t-il un artiste ou un album que tu peux écouter en boucle sans jamais t'en lasser ?" },
  { id: 5, category: 'connaissance', level: 'soft', text: "Qu'est-ce qui te détend vraiment après une journée qui t'a vidée ?" },
  { id: 6, category: 'connaissance', level: 'soft', text: "Ton plaisir coupable, celui que tu n'assumes qu'à moitié." },
  { id: 7, category: 'connaissance', level: 'soft', text: "Si on pouvait partir quelque part demain, sans aucune contrainte, tu choisirais quoi ?" },
  { id: 8, category: 'connaissance', level: 'soft', text: "Smile Space ou un soir tranquille sur le canapé avec moi ? Réponds vite, sans réfléchir." },
  { id: 9, category: 'connaissance', level: 'soft', text: "Un seul endroit où retourner ce soir : Krep's, Piao Piao ou Iced Drinks ? Défends ton choix." },
  { id: 10, category: 'connaissance', level: 'soft', text: "En général, tu te fies plutôt à ton instinct ou à ta raison ?" },

  // Medium
  { id: 11, category: 'connaissance', level: 'medium', text: "Quelle est la dernière chose qui t'a fait rire au point d'en pleurer ?" },
  { id: 12, category: 'connaissance', level: 'medium', text: "Qu'est-ce qui te fait monter en pression instantanément ?" },
  { id: 13, category: 'connaissance', level: 'medium', text: "Si tu ne devais garder qu'un seul souvenir de nous deux, lequel ?" },
  { id: 14, category: 'connaissance', level: 'medium', text: "Quel genre de compliment te touche vraiment, et lequel te laisse froide ?" },
  { id: 15, category: 'connaissance', level: 'medium', text: "Décris ta journée parfaite à 21 ans, pour de vrai — pas celle d'Instagram." },
  { id: 16, category: 'connaissance', level: 'medium', text: "Quelle habitude chez moi te fait sourire, et laquelle te fait lever les yeux au ciel ?" },
  { id: 17, category: 'connaissance', level: 'medium', text: "Si tu devais me présenter en une phrase à quelqu'un qui compte pour toi, tu dirais quoi ?" },
  { id: 18, category: 'connaissance', level: 'medium', text: "Quelle version de toi très peu de gens ont la chance de connaître ?" },

  // Hot
  { id: 19, category: 'connaissance', level: 'hot', text: "Quel moment avec moi tu rejoues le plus souvent dans ta tête ?" },
  { id: 20, category: 'connaissance', level: 'hot', text: "Qu'est-ce que tu n'oses pas me demander, mais que tu aimerais ?" },
  { id: 21, category: 'connaissance', level: 'hot', text: "C'était quand, la première fois que tu t'es dit « lui, c'est différent » ?" },
  { id: 22, category: 'connaissance', level: 'hot', text: "Qu'est-ce qui te manque le plus quand on n'est pas ensemble ?" },
  { id: 23, category: 'connaissance', level: 'hot', text: "Si je pouvais lire dans tes pensées là, tout de suite, je tomberais sur quoi ?" },
  { id: 24, category: 'connaissance', level: 'hot', text: "Qu'est-ce que tu aimerais qu'on fasse plus souvent, tous les deux ?" },
  { id: 25, category: 'connaissance', level: 'hot', text: "La chose la plus sincère que tu aies envie de me dire ce soir. Je t'écoute." },
  { id: 26, category: 'connaissance', level: 'hot', text: "Décris le genre de « nous » que tu as envie de construire cette année." },
  {
    id: 27,
    category: 'connaissance',
    level: 'medium',
    text: "Traduis à voix basse : « Du bist wunderschön. » (Je ne fais que constater, note bien.)",
    german: { answer: 'Tu es magnifique.', reward: 'Richtig, mon chou. Et c’est la stricte vérité.' },
  },

  // ───────────────────────────── 🧠 PROFONDES ─────────────────────────────
  // Soft
  { id: 101, category: 'profonde', level: 'soft', text: "Quel rêve d'enfant tu n'as jamais vraiment abandonné ?" },
  { id: 102, category: 'profonde', level: 'soft', text: "Qu'est-ce qui te fait te sentir vraiment en sécurité avec quelqu'un ?" },
  { id: 103, category: 'profonde', level: 'soft', text: "Quel souvenir, aussi banal soit-il, te revient toujours quand tu penses à chez toi ?" },
  { id: 104, category: 'profonde', level: 'soft', text: "Qu'est-ce que tu as retenu de tes parents, en bien comme en moins bien ?" },
  { id: 105, category: 'profonde', level: 'soft', text: "Une valeur sur laquelle tu refuses de transiger, quoi qu'il arrive." },
  { id: 106, category: 'profonde', level: 'soft', text: "Dans quels moments tu te sens pleinement toi-même ?" },
  { id: 107, category: 'profonde', level: 'soft', text: "De quoi es-tu le plus fière aujourd'hui, et que peu de gens savent ?" },

  // Medium
  { id: 108, category: 'profonde', level: 'medium', text: "De quoi as-tu le plus peur, au fond, quand tu y penses vraiment ?" },
  { id: 109, category: 'profonde', level: 'medium', text: "La chose la plus difficile que tu aies traversée. Je t'écoute, vraiment." },
  { id: 110, category: 'profonde', level: 'medium', text: "Quelque chose que tu n'as jamais dit à personne et que tu pourrais me confier." },
  { id: 111, category: 'profonde', level: 'medium', text: "Qu'est-ce qui te manque dans ta vie en ce moment ?" },
  { id: 112, category: 'profonde', level: 'medium', text: "Si tu pouvais parler à la toi d'il y a cinq ans, tu lui dirais quoi ?" },
  { id: 113, category: 'profonde', level: 'medium', text: "Quelle part de toi tu caches le plus souvent, et pourquoi ?" },
  { id: 114, category: 'profonde', level: 'medium', text: "Quand t'es-tu sentie incomprise pour la dernière fois ?" },
  { id: 115, category: 'profonde', level: 'medium', text: "De quoi as-tu réellement besoin quand ça ne va pas — pas ce que les gens croient." },

  // Hot
  { id: 116, category: 'profonde', level: 'hot', text: "Qu'est-ce que tu attends vraiment de l'amour, aujourd'hui ?" },
  { id: 117, category: 'profonde', level: 'hot', text: "Y a-t-il une part de toi que tu as peur de me montrer ?" },
  { id: 118, category: 'profonde', level: 'hot', text: "Qu'est-ce qui te ferait te sentir profondément aimée par moi ?" },
  { id: 119, category: 'profonde', level: 'hot', text: "Ton plus grand regret, et ce qu'il t'a appris sur toi." },
  { id: 120, category: 'profonde', level: 'hot', text: "Qu'est-ce que tu espères qu'on se dira encore dans dix ans ?" },
  { id: 121, category: 'profonde', level: 'hot', text: "Une blessure du passé qui influence encore ta façon d'aimer." },
  { id: 122, category: 'profonde', level: 'hot', text: "Si tu devais me confier une peur à propos de nous, ce serait laquelle ?" },
  { id: 123, category: 'profonde', level: 'hot', text: "Qu'est-ce que tu n'avais jamais osé espérer, et que tu espères quand même ?" },
  { id: 124, category: 'profonde', level: 'hot', text: "Dis-moi une chose que tu n'as jamais dite à voix haute à qui que ce soit." },
  { id: 125, category: 'profonde', level: 'hot', text: "Qu'est-ce qui te fait sentir que tu comptes vraiment pour quelqu'un ?" },

  // ───────────────────────────── 🎭 GAGES ─────────────────────────────
  // Tout se joue à table, discrètement. Rien qui demande de se lever.
  // Soft
  { id: 201, category: 'gage', level: 'soft', text: "Montre-moi la dernière photo de ta galerie — sans faire défiler pour en trouver une plus avantageuse." },
  { id: 202, category: 'gage', level: 'soft', text: "Déverrouille ton téléphone et montre-moi ton fond d'écran. Et dis-moi pourquoi c'est celui-là." },
  { id: 203, category: 'gage', level: 'soft', text: "Classe nos repaires — Krep's, Piao Piao, Iced Drinks, Royal Panini — du pire au meilleur, et assume tes choix." },
  { id: 204, category: 'gage', level: 'soft', text: "Mode radiateur : réchauffe mes mains trente secondes. (On sait tous les deux pourquoi.)" },
  { id: 205, category: 'gage', level: 'soft', text: "Prends-moi en photo maintenant, tel que tu me vois ce soir. Une seule prise, pas de deuxième chance." },
  { id: 206, category: 'gage', level: 'soft', text: "Pendant les trois prochaines cartes, interdit de dire mon prénom. Débrouille-toi." },
  { id: 207, category: 'gage', level: 'soft', text: "Donne-moi trois bons arguments pour que je t'offre le dessert. Le meilleur l'emporte." },
  { id: 208, category: 'gage', level: 'soft', text: "Montre-moi une photo de nous que tu as gardée, et raconte-moi ce qu'il se passait ce jour-là." },

  // Medium
  { id: 209, category: 'gage', level: 'medium', text: "Écris sur une serviette un mot qui résume la soirée, plie-la et garde-la : je la lirai avant qu'on parte." },
  { id: 210, category: 'gage', level: 'medium', text: "Montre-moi ton dernier message envoyé à quelqu'un d'autre que moi. Ou assume de refuser, c'est permis." },
  {
    id: 211,
    category: 'gage',
    level: 'medium',
    text: "Traduis en anglais : « Mon copain est le plus beau. » Kevin sera juge — et parfaitement impartial, bien sûr.",
  },
  { id: 212, category: 'gage', level: 'medium', text: "Le débat, tranché ce soir : qui de nous deux est vraiment le plus élancé ? Plaide ta cause, je plaide la mienne." },
  { id: 213, category: 'gage', level: 'medium', text: "Jusqu'à ta prochaine carte, tu dois glisser le mot « destin » dans tout ce que tu dis. L'air de rien." },
  { id: 214, category: 'gage', level: 'medium', text: "Mode radiateur, niveau 2 : garde mes mains dans les tiennes jusqu'à la prochaine carte." },
  { id: 215, category: 'gage', level: 'medium', text: "Tu as droit à une seule question indiscrète ce soir. C'est maintenant, ou jamais." },
  { id: 216, category: 'gage', level: 'medium', text: "Note-moi sur dix pour ce soir, honnêtement — et dis-moi ce qui me ferait gagner le point qui manque." },

  // Hot
  { id: 217, category: 'gage', level: 'hot', text: "Écris sur ton téléphone une phrase que je ne lirai qu'une fois rentré chez moi. Puis range-le, sois patiente." },
  { id: 218, category: 'gage', level: 'hot', text: "Fais-moi un compliment auquel je ne m'attends absolument pas. Vise juste, je retiens tout." },
  {
    id: 219,
    category: 'gage',
    level: 'hot',
    text: "Fais-moi une phrase en anglais de plus de dix mots. Les fautes seront comptées — avec beaucoup d'amour.",
  },
  { id: 220, category: 'gage', level: 'hot', text: "Sous la table, prends ma main et dis-moi, d'une voix tout à fait normale, une chose qui n'a rien d'innocent." },
  { id: 221, category: 'gage', level: 'hot', text: "Donne-moi un surnom tout neuf, rien que pour nous, que personne d'autre n'utilisera jamais." },
  { id: 222, category: 'gage', level: 'hot', text: "Dis-moi tout bas la pensée la moins sage que tu aies eue depuis le début de la soirée." },
  { id: 223, category: 'gage', level: 'hot', text: "Tu as vingt secondes, montre en main, pour me convaincre de prolonger la soirée. Vas-y." },
  { id: 224, category: 'gage', level: 'hot', text: "Choisis ton moment : avant qu'on se quitte, vole-moi un baiser quand je m'y attendrai le moins." },
  { id: 225, category: 'gage', level: 'hot', text: "Décris-moi, rien que pour moi et à voix basse, ce que tu as en tête pour la fin de cette soirée." },

  // ───────────────────────────── 💋 AUDACIEUX ─────────────────────────────
  // Flirt discret, jouable à une table. Chacune reste refusable (« Passer »).
  // Soft
  { id: 301, category: 'audacieux', level: 'soft', text: "Dis-moi ce que tu préfères dans mon regard. Sois précise." },
  { id: 302, category: 'audacieux', level: 'soft', text: "Pose ta main sur la mienne, sur la table, et décris ce que tu ressens là, maintenant." },
  { id: 303, category: 'audacieux', level: 'soft', text: "Regarde-moi et finis cette phrase sans réfléchir : « Ce qui m'attire chez toi, c'est… »" },
  { id: 304, category: 'audacieux', level: 'soft', text: "Rapproche ta chaise de la mienne. Juste un peu. Voilà — reste là." },
  { id: 305, category: 'audacieux', level: 'soft', text: "Dis-moi un compliment que tu gardais pour toi depuis un moment." },
  { id: 306, category: 'audacieux', level: 'soft', text: "Raconte-moi le moment précis où tu m'as trouvé attirant pour la première fois." },
  { id: 307, category: 'audacieux', level: 'soft', text: "Sans me toucher et sans un mot, fais-moi comprendre que tu as envie d'être plus près." },

  // Medium
  { id: 308, category: 'audacieux', level: 'medium', text: "Sous la table, garde mes mains dans les tiennes, et continue de me parler comme si de rien n'était." },
  { id: 309, category: 'audacieux', level: 'medium', text: "Penche-toi et chuchote-moi ce dont tu as envie pour quand on sera enfin seuls." },
  { id: 310, category: 'audacieux', level: 'medium', text: "Regarde ma bouche, puis mes yeux. Ne dis rien, laisse-moi deviner le reste." },
  { id: 311, category: 'audacieux', level: 'medium', text: "Décris-moi, à voix basse, le baiser parfait — et ne m'épargne aucun détail." },
  { id: 312, category: 'audacieux', level: 'medium', text: "Dis-moi trois choses chez moi que tu trouves franchement irrésistibles." },
  { id: 313, category: 'audacieux', level: 'medium', text: "Tiens mon regard sans le lâcher jusqu'à ce que l'un de nous deux craque." },
  { id: 314, category: 'audacieux', level: 'medium', text: "Décris en un seul mot ce que tu ressens, là, assise en face de moi. Puis explique-le-moi." },
  {
    id: 315,
    category: 'audacieux',
    level: 'medium',
    text: "Penche-toi et chuchote-moi « Ich mag dich » à l'oreille. (Oui, tu sais très bien ce que ça veut dire.)",
    german: { answer: 'Je t’aime bien / je t’apprécie beaucoup.', reward: 'Ich mag dich auch. Beaucoup plus que « bien », en fait.' },
  },

  // Hot
  { id: 316, category: 'audacieux', level: 'hot', text: "Murmure-moi la pensée la plus osée que tu aies eue de moi ce soir." },
  { id: 317, category: 'audacieux', level: 'hot', text: "Du bout des doigts, écris un mot sur ma main — et laisse-moi deviner lequel." },
  { id: 318, category: 'audacieux', level: 'hot', text: "Dis-moi tout bas ce que tu voudrais, toi, que je te murmure à l'oreille." },
  { id: 319, category: 'audacieux', level: 'hot', text: "Mords-toi la lèvre en me regardant, discrètement, et observe l'effet que ça me fait." },
  { id: 320, category: 'audacieux', level: 'hot', text: "Dis-moi, les yeux dans les yeux et sans baisser la voix, une chose que tu ne dirais à personne d'autre." },
  { id: 321, category: 'audacieux', level: 'hot', text: "Promets-moi à l'oreille une chose précise pour quand on sera seuls, tous les deux." },
  {
    id: 322,
    category: 'audacieux',
    level: 'hot',
    text: "Dis-moi « Küss mich » en me regardant dans les yeux. On verra ce qu'il se passe quand on sera au bon endroit.",
    german: { answer: 'Embrasse-moi.', reward: 'Mit Vergnügen, mon chou. (Avec grand plaisir — mais au bon moment.)' },
  },
  { id: 323, category: 'audacieux', level: 'hot', text: "Décris à voix basse comment tu imaginerais la fin de cette soirée, si c'était toi qui décidais de tout." },
  { id: 324, category: 'audacieux', level: 'hot', text: "Approche-toi comme pour m'embrasser… puis décide, à la dernière seconde, si tu me fais patienter." },
  { id: 325, category: 'audacieux', level: 'hot', text: "Glisse ta main dans la mienne : serre une fois pour « oui », deux fois pour « plus tard ». Je poserai la question du regard." },
  { id: 326, category: 'audacieux', level: 'hot', text: "Dis-moi une limite que tu ne veux pas franchir ce soir. Savoir ça, c'est aussi une forme de confiance." },

  // ───────────────────────────── 🎲 RACONTE-MOI ─────────────────────────────
  // Soft
  { id: 401, category: 'raconte', level: 'soft', text: "Raconte-moi ta journée, mais comme si c'était la scène d'ouverture d'un film." },
  { id: 402, category: 'raconte', level: 'soft', text: "Raconte-moi un fou rire dont tu te souviens encore dans les détails." },
  { id: 403, category: 'raconte', level: 'soft', text: "Raconte-moi un endroit où tu t'es sentie parfaitement à ta place." },
  { id: 404, category: 'raconte', level: 'soft', text: "Raconte-moi une décision que tu as prise seule et dont tu es encore fière." },
  { id: 405, category: 'raconte', level: 'soft', text: "Raconte-moi un souvenir précis à partir de l'odeur qui va avec." },
  { id: 406, category: 'raconte', level: 'soft', text: "Souviens-toi de Royal Panini, le snack où on avait encore faim en repartant. Raconte-moi cette soirée, ta version." },
  { id: 407, category: 'raconte', level: 'soft', text: "Raconte-moi la chanson qui te ramène d'un coup à un moment précis de ta vie." },

  // Medium
  { id: 408, category: 'raconte', level: 'medium', text: "Raconte-moi la fois où tu t'es sentie la plus courageuse." },
  { id: 409, category: 'raconte', level: 'medium', text: "Raconte-moi un moment où tu as failli tout plaquer et recommencer ailleurs." },
  { id: 410, category: 'raconte', level: 'medium', text: "Raconte-moi notre rencontre, ta version à toi — sans rien arrondir." },
  { id: 411, category: 'raconte', level: 'medium', text: "Raconte-moi une chose que tu as faite et que tes parents ignorent encore." },
  { id: 412, category: 'raconte', level: 'medium', text: "Raconte-moi la dernière fois que tu as pleuré — de joie ou pas." },
  { id: 413, category: 'raconte', level: 'medium', text: "Raconte-moi un moment où tu t'es sentie incroyablement vivante." },
  { id: 414, category: 'raconte', level: 'medium', text: "Raconte-moi une rencontre qui a changé ta façon de voir les choses." },

  // Hot
  { id: 415, category: 'raconte', level: 'hot', text: "Raconte-moi le moment précis où tu as su que tu tenais à moi." },
  { id: 416, category: 'raconte', level: 'hot', text: "Raconte-moi comment tu nous imagines dans cinq ans, un soir tout à fait ordinaire." },
  { id: 417, category: 'raconte', level: 'hot', text: "Raconte-moi ta soirée idéale, rien que nous deux, du début à la fin." },
  { id: 418, category: 'raconte', level: 'hot', text: "Raconte-moi un moment où tu as eu très envie de m'embrasser sans le faire." },
  { id: 419, category: 'raconte', level: 'hot', text: "Raconte-moi ce que tu ressens quand je te fixe un peu trop longtemps." },
  { id: 420, category: 'raconte', level: 'hot', text: "Raconte-moi la soirée dont tu gardes le meilleur souvenir avec moi." },
  { id: 421, category: 'raconte', level: 'hot', text: "Raconte-moi ce que tu dirais de moi à ta meilleure amie, vraiment sans filtre." },
  { id: 422, category: 'raconte', level: 'hot', text: "Raconte-moi comment tu aimerais que je m'y prenne si je devais te séduire de zéro, ce soir." },
  { id: 423, category: 'raconte', level: 'hot', text: "Invente-nous une histoire : nous deux, dans dix ans, un soir comme celui-ci." },
  { id: 424, category: 'raconte', level: 'hot', text: "Raconte-moi un désir, une vraie envie, que tu n'as encore dite à personne." },
  { id: 425, category: 'raconte', level: 'medium', text: "Raconte-moi le meilleur conseil qu'on t'ait donné — et si tu l'as suivi, ou pas du tout." },

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
