<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { REVIEW_CODE, STORAGE_KEYS } from '../config'
import { useReview } from './useReview'
import type { ReviewMode } from './useReview'
import ReviewDeck from './ReviewDeck.vue'

// ── Accès (petit code admin) ───────────────────────────────────────────────
const unlocked = ref(false)
const codeInput = ref('')
const codeError = ref(false)

onMounted(() => {
  try {
    unlocked.value = localStorage.getItem(STORAGE_KEYS.reviewUnlocked) === 'true'
  } catch {
    /* on redemandera le code */
  }
})

function submitCode() {
  if (codeInput.value.trim() === REVIEW_CODE) {
    unlocked.value = true
    codeError.value = false
    try {
      localStorage.setItem(STORAGE_KEYS.reviewUnlocked, 'true')
    } catch {
      /* pas grave */
    }
  } else {
    codeError.value = true
  }
}

// ── Choix du lot ───────────────────────────────────────────────────────────
const mode = ref<ReviewMode | null>(null)

// Résumé de progression par lot (pour l'écran de choix).
const game = useReview('game')
const prop = useReview('proposals')

const summaries = computed(() => [
  {
    key: 'game' as ReviewMode,
    title: 'Cartes du jeu',
    subtitle: 'La base déjà validée, à réviser si tu veux.',
    emoji: '💛',
    total: game.total,
    decided: game.decidedCount.value,
    kept: game.keptCount.value,
  },
  {
    key: 'proposals' as ReviewMode,
    title: 'Nouvelles propositions',
    subtitle: 'Le nouveau lot généré, à trier.',
    emoji: '✨',
    total: prop.total,
    decided: prop.decidedCount.value,
    kept: prop.keptCount.value,
  },
])
</script>

<template>
  <!-- ─── Écran de code ─── -->
  <div v-if="!unlocked" class="screen gate">
    <p class="eyebrow">Atelier des cartes</p>
    <h1 class="gate-title">Vérification</h1>
    <p class="gate-sub">Réservé à Kevin. Entre le code admin.</p>
    <form class="gate-form" @submit.prevent="submitCode">
      <input
        v-model="codeInput"
        class="code-field"
        type="password"
        inputmode="numeric"
        autocomplete="off"
        placeholder="••••"
        :class="{ error: codeError }"
      />
      <button type="submit" class="btn-primary">Entrer</button>
    </form>
    <p v-if="codeError" class="gate-err">Mauvais code.</p>
  </div>

  <!-- ─── Choix du lot ─── -->
  <div v-else-if="mode === null" class="screen landing">
    <p class="eyebrow">Atelier des cartes</p>
    <h1 class="landing-title">Quel lot tu veux trier ?</h1>

    <div class="choices">
      <button
        v-for="s in summaries"
        :key="s.key"
        class="choice"
        @click="mode = s.key"
      >
        <span class="choice-emoji">{{ s.emoji }}</span>
        <span class="choice-body">
          <span class="choice-title">{{ s.title }}</span>
          <span class="choice-sub">{{ s.subtitle }}</span>
          <span class="choice-meta">
            {{ s.decided }} / {{ s.total }} triées
            <template v-if="s.decided > 0"> · {{ s.kept }} gardées</template>
          </span>
          <span class="choice-bar">
            <span class="choice-bar-fill" :style="{ width: (s.decided / s.total) * 100 + '%' }" />
          </span>
        </span>
        <span class="choice-arrow">›</span>
      </button>
    </div>
  </div>

  <!-- ─── Atelier ─── -->
  <div v-else class="screen review">
    <ReviewDeck :key="mode" :mode="mode" @back="mode = null" />
  </div>
</template>

<style scoped>
.screen {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: calc(var(--safe-top) + 14px) 16px calc(var(--safe-bottom) + 14px);
  max-width: 520px;
  margin: 0 auto;
}

/* ── Gate ── */
.gate {
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 14px;
}
.eyebrow {
  font-size: 0.74rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-dim);
}
.gate-title {
  font-family: var(--font-title);
  font-size: 2.4rem;
  color: var(--text);
}
.gate-sub {
  color: var(--text-soft);
  font-size: 0.95rem;
}
.gate-form {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}
.code-field {
  width: 120px;
  text-align: center;
  letter-spacing: 0.3em;
  font-size: 1.3rem;
  padding: 12px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-hi);
  color: var(--text);
}
.code-field.error {
  border-color: var(--rose-deep);
}
.gate-err {
  color: var(--rose);
  font-size: 0.9rem;
}

/* ── Landing ── */
.landing {
  justify-content: center;
  gap: 10px;
}
.landing-title {
  font-family: var(--font-title);
  font-size: 1.9rem;
  color: var(--text);
  text-align: center;
  margin-bottom: 14px;
}
.choices {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.choice {
  display: flex;
  align-items: center;
  gap: 14px;
  text-align: left;
  padding: 18px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: linear-gradient(165deg, var(--surface-hi), var(--surface));
  box-shadow: var(--shadow-card);
  color: var(--text);
}
.choice:active {
  transform: scale(0.99);
}
.choice-emoji {
  font-size: 1.8rem;
  flex: 0 0 auto;
}
.choice-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.choice-title {
  font-family: var(--font-title);
  font-size: 1.25rem;
}
.choice-sub {
  font-size: 0.85rem;
  color: var(--text-soft);
}
.choice-meta {
  font-size: 0.78rem;
  color: var(--text-dim);
  font-variant-numeric: tabular-nums;
  margin-top: 2px;
}
.choice-bar {
  margin-top: 6px;
  height: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}
.choice-bar-fill {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--rose), var(--gold));
}
.choice-arrow {
  font-size: 1.6rem;
  color: var(--text-dim);
  flex: 0 0 auto;
}

/* ── Review wrapper ── */
.review {
  padding-top: calc(var(--safe-top) + 10px);
}

.btn-primary {
  padding: 12px 18px;
  border-radius: var(--radius-sm);
  border: none;
  font-weight: 600;
  color: #2a1018;
  background: linear-gradient(120deg, var(--gold-hi), var(--rose));
}
</style>
