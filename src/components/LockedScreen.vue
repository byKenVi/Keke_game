<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { ADMIN_CODE, LOCKED_MESSAGE } from '../config'

const emit = defineEmits<{ unlock: [] }>()

// Geste caché : 5 taps sur le cœur en moins de ~1,4 s → saisie du code admin.
const taps = ref(0)
const showAdmin = ref(false)
const code = ref('')
const error = ref(false)
const field = ref<HTMLInputElement | null>(null)
let timer: ReturnType<typeof setTimeout> | null = null

function tapHeart() {
  if (showAdmin.value) return
  taps.value += 1
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => (taps.value = 0), 1400)
  if (taps.value >= 5) {
    taps.value = 0
    showAdmin.value = true
    nextTick(() => field.value?.focus())
  }
}

function submit() {
  if (code.value.trim() === ADMIN_CODE) {
    emit('unlock')
  } else {
    error.value = true
    code.value = ''
  }
}
</script>

<template>
  <div class="screen locked">
    <div class="lock" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="34" height="34" fill="none">
        <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" stroke="currentColor" stroke-width="1.4" />
        <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" stroke-width="1.4" />
        <circle cx="12" cy="15" r="1.3" fill="currentColor" />
      </svg>
    </div>

    <p class="eyebrow">Pour Kékéli</p>
    <p class="message">{{ LOCKED_MESSAGE }}</p>

    <!-- 💛 cliquable : 5 taps → accès admin (invisible pour elle). -->
    <button class="heart" aria-label="💛" @click="tapHeart">💛</button>

    <!-- Saisie du code admin, révélée par le geste. -->
    <form v-if="showAdmin" class="admin" @submit.prevent="submit">
      <input
        ref="field"
        v-model="code"
        class="admin-field"
        type="password"
        inputmode="numeric"
        autocomplete="off"
        placeholder="code admin"
        :class="{ error }"
      />
      <button type="submit" class="admin-go">Entrer</button>
    </form>
  </div>
</template>

<style scoped>
.locked {
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 22px;
}
.lock {
  color: var(--gold);
  display: inline-flex;
  padding: 18px;
  border-radius: 50%;
  border: 1px solid var(--border-hi);
  background: rgba(255, 255, 255, 0.03);
}
.eyebrow {
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-dim);
}
.message {
  font-family: var(--font-title);
  font-size: clamp(1.5rem, 6vw, 2.1rem);
  line-height: 1.4;
  color: var(--text);
  max-width: 440px;
  text-wrap: balance;
}
.heart {
  font-size: 1.4rem;
  line-height: 1;
  animation: beat 2.6s ease-in-out infinite;
  -webkit-tap-highlight-color: transparent;
}

/* Saisie du code admin (révélée par 5 taps sur le cœur). */
.admin {
  display: flex;
  gap: 8px;
  margin-top: 4px;
  animation: fadeUp 0.25s ease;
}
.admin-field {
  width: 150px;
  text-align: center;
  letter-spacing: 0.1em;
  font-size: 1rem;
  padding: 11px 12px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-hi);
  color: var(--text);
}
.admin-field.error {
  border-color: var(--rose-deep);
}
.admin-go {
  padding: 0 16px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  color: #2a160a;
  background: linear-gradient(135deg, var(--gold-hi), var(--gold-deep));
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes beat {
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.22); }
  28% { transform: scale(1); }
  42% { transform: scale(1.12); }
}
</style>
