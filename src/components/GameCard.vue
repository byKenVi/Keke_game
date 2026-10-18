<script setup lang="ts">
import { ref } from 'vue'
import type { Card } from '../types'
import { CATEGORIES } from '../data/cards'

const props = defineProps<{ card: Card }>()

const meta = CATEGORIES[props.card.category]
const germanRevealed = ref(false)
</script>

<template>
  <article
    class="card"
    :class="{ secret: card.secret }"
    :style="{ '--accent': meta.color }"
  >
    <header class="card-top">
      <span class="badge">
        <span class="badge-dot" />
        <span class="badge-emoji">{{ meta.emoji }}</span>
        {{ meta.label }}
      </span>
    </header>

    <div class="card-body">
      <p class="card-text">{{ card.text }}</p>

      <!-- Easter egg allemand : révéler la traduction + récompense. -->
      <div v-if="card.german" class="german">
        <button v-if="!germanRevealed" class="reveal" @click="germanRevealed = true">
          Révéler la traduction
        </button>
        <div v-else class="german-answer">
          <p class="german-trad">{{ card.german.answer }}</p>
          <p class="german-reward">{{ card.german.reward }}</p>
        </div>
      </div>
    </div>

    <footer class="card-foot">
      <span v-if="card.category === 'audacieux' && !card.secret" class="refusable">
        Toujours le droit de dire non.
      </span>
      <span v-else-if="card.secret" class="refusable">Kevin</span>
    </footer>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 26px 24px;
  border-radius: var(--radius-lg);
  background:
    radial-gradient(130% 80% at 50% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 60%),
    linear-gradient(165deg, var(--surface-hi), var(--surface));
  box-shadow: var(--shadow-card);
  border: 1px solid var(--border);
  overflow: hidden;
}
/* Fin liseré d'accent en haut de la carte. */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.85;
}

.card-top {
  display: flex;
  justify-content: center;
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 15px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
}
.badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}
.badge-emoji {
  font-size: 0.95rem;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  text-align: center;
}
.card-text {
  font-family: var(--font-title);
  font-size: clamp(1.5rem, 5.6vw, 2rem);
  line-height: 1.34;
  color: var(--text);
  text-wrap: balance;
  white-space: pre-line;
}

.german {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.reveal {
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 0.86rem;
  color: var(--gold);
  border: 1px solid var(--border-hi);
  background: rgba(255, 255, 255, 0.03);
}
.german-answer {
  animation: fadeUp 0.4s ease;
}
.german-trad {
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: var(--text);
  margin-bottom: 6px;
}
.german-reward {
  font-size: 0.92rem;
  color: var(--gold);
  font-style: italic;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.card-foot {
  min-height: 1.2em;
  text-align: center;
}
.refusable {
  font-size: 0.8rem;
  color: var(--text-dim);
  font-style: italic;
}

/* Carte secrète : un peu plus précieuse. */
.secret {
  --accent: var(--gold);
}
.secret .card-text {
  color: var(--gold-hi);
}
</style>
