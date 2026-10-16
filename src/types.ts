// Types partagés du jeu.

/** Les trois niveaux d'intensité, du plus doux au plus chaud. */
export type Level = 'soft' | 'medium' | 'hot'

/** Les cinq familles de cartes (chacune a son badge de couleur). */
export type Category = 'connaissance' | 'profonde' | 'gage' | 'audacieux' | 'raconte'

/** Un petit défi « devine / utilise ce mot d'allemand » + sa récompense. */
export interface GermanHint {
  /** La bonne réponse (traduction), affichée après avoir tapé « Révéler ». */
  answer: string
  /** Message de félicitations taquin quand elle a deviné. */
  reward: string
}

/** Une carte du jeu. */
export interface Card {
  id: number
  category: Category
  level: Level
  text: string
  /** Petit easter egg allemand : question à deviner + récompense. */
  german?: GermanHint
  /**
   * Carte cachée (easter egg du titre tapé 5 fois). Elle n'entre jamais
   * dans le tirage normal.
   */
  secret?: boolean
}

/** Métadonnées d'affichage d'une catégorie (label + emoji + couleur). */
export interface CategoryMeta {
  label: string
  emoji: string
  /** Variable CSS de la couleur d'accent, ex. 'var(--c-connaissance)'. */
  color: string
}
