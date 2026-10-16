# Pour Kékéli 💛

Un petit jeu de cartes pour un date, mobile-first, codé avec ❤️ par Kevin.
Vue 3 + Vite + TypeScript, 100 % statique, aucun backend.

---

## Lancer en local

```bash
npm install      # une seule fois
npm run dev      # serveur de dev → http://localhost:5173
```

Pour tester la version finale :

```bash
npm run build    # génère le dossier dist/ (et vérifie les types)
npm run preview  # sert dist/ en local
```

---

## Modifier le code d'accès

Tout est dans [`src/config.ts`](src/config.ts) :

```ts
export const ACCESS_CODE = '2105' // ← change le code ici
```

Tu peux aussi y changer le prénom/surnom et le rythme de montée
automatique d'intensité (`ESCALATE_EVERY`).

---

## Éditer les cartes

Tout le contenu est dans [`src/data/cards.ts`](src/data/cards.ts).
Chaque carte est un objet simple :

```ts
{ id: 42, category: 'connaissance', level: 'soft', text: "Ta question ici ?" }
```

- **`category`** : `'connaissance' | 'profonde' | 'gage' | 'audacieux' | 'raconte'`
- **`level`** : `'soft' | 'medium' | 'hot'`
- **`id`** : un nombre unique (les plages 1xx/2xx/3xx… regroupent les familles)

### Carte avec easter egg allemand

Ajoute un objet `german` (une traduction à révéler + un petit mot) :

```ts
{
  id: 27, category: 'connaissance', level: 'medium',
  text: "Traduis : « Du bist wunderschön. »",
  german: { answer: 'Tu es magnifique.', reward: 'Richtig, mon chou.' },
}
```

### Les textes de Kevin

- Le mot d'intro : [`src/components/IntroScreen.vue`](src/components/IntroScreen.vue) (bloc `.note`)
- Le mot de fin : [`src/components/EndScreen.vue`](src/components/EndScreen.vue) (bloc `.message`)

---

## Easter eggs cachés

- **Titre tapé 5 fois** pendant le jeu (le petit « Pour Kékéli » en haut) →
  carte secrète « Kevin t'aime bien ».
- **Bouton « 🥶 J'ai froid »** → message taquin « mode radiateur ».
- Clins d'œil semés dans les cartes : Krep's, Smile Space, Piao Piao,
  Iced Drinks, Royal Panini, le running gag anglais, et le débat éternel
  « qui est le plus élancé ».

---

## Déployer sur Vercel (< 5 min)

### Option A : depuis GitHub (recommandé)

1. Pousse le projet sur un dépôt GitHub.
2. Va sur [vercel.com](https://vercel.com) → **Add New… → Project** → importe le dépôt.
3. Vercel détecte Vite automatiquement :
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
4. Clique **Deploy**. Chaque `git push` redéploie tout seul.

### Option B : en ligne de commande

```bash
npm i -g vercel
vercel          # première fois : suis l'assistant
vercel --prod   # met en ligne la version de prod
```

C'est un site statique : aucune variable d'environnement, aucune base de
données, rien à configurer de plus.

---

## PWA

Un `manifest.webmanifest` et un service worker (`public/sw.js`) permettent
d'ajouter l'app à l'écran d'accueil (iPhone/Android) et de la lancer en
plein écran, même hors-ligne. L'icône est dans `public/icon.svg`.

---

## Structure

```
src/
  config.ts              réglages rapides (code d'accès, surnoms…)
  types.ts               types TypeScript
  data/cards.ts          TOUT le contenu des cartes
  composables/useGame.ts logique du jeu (tirage, niveaux, historique)
  components/            écrans (Access, Intro, LevelSelect, Game, End, Card)
  App.vue                enchaînement des écrans
```
