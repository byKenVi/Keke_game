<script setup lang="ts">
import { ref } from 'vue'
import { ACCESS_CODE } from '../config'

const emit = defineEmits<{ unlock: [] }>()

const entered = ref('')
const error = ref('')
const shake = ref(false)

// Petits messages taquins quand le code est faux.
const teases = [
  "Raté. Tu confonds avec ta taille de chaussure ?",
  "Non. Indice : C'est Evident…",
  "Presque. Enfin non, pas du tout. Réessaie, mon chou.",
  "Erreur. Même ton anglais est plus fiable que ça. (Si, si.)",
  "Toujours pas. Je te laisse réfléchir, je ne suis pas pressé.",
]

function press(d: string) {
  if (entered.value.length >= ACCESS_CODE.length) return
  error.value = ''
  entered.value += d
  if (entered.value.length === ACCESS_CODE.length) {
    // Petit délai pour laisser voir le dernier point se remplir.
    setTimeout(check, 180)
  }
}

function del() {
  error.value = ''
  entered.value = entered.value.slice(0, -1)
}

function check() {
  if (entered.value === ACCESS_CODE) {
    emit('unlock')
  } else {
    error.value = teases[Math.floor(Math.random() * teases.length)]
    shake.value = true
    setTimeout(() => {
      shake.value = false
      entered.value = ''
    }, 450)
  }
}

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
</script>

<template>
  <div class="screen access">
    <div class="top">
      <div class="lock" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="30" height="30" fill="none">
          <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" stroke="currentColor" stroke-width="1.4" />
          <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" stroke-width="1.4" />
          <circle cx="12" cy="15" r="1.3" fill="currentColor" />
        </svg>
      </div>
      <p class="eyebrow">Un soir rien que pour nous</p>
      <h1 class="title">Pour Kékéli</h1>
      <p class="prompt">Entre notre code pour ouvrir.</p>
    </div>

    <div class="middle" :class="{ shake }">
      <div class="dots" aria-label="code">
        <span
          v-for="i in ACCESS_CODE.length"
          :key="i"
          class="dot"
          :class="{ filled: entered.length >= i }"
        />
      </div>
      <p class="error" :class="{ visible: error }">{{ error || ' ' }}</p>
    </div>

    <div class="keypad">
      <button v-for="k in keys" :key="k" class="key" @click="press(k)">{{ k }}</button>
      <span class="key key--empty" aria-hidden="true"></span>
      <button class="key" @click="press('0')">0</button>
      <button class="key key--action" @click="del" aria-label="Effacer">⌫</button>
    </div>
  </div>
</template>

<style scoped>
.access {
  justify-content: space-between;
  text-align: center;
}
.top {
  padding-top: 8%;
}
.lock {
  color: var(--gold);
  display: inline-flex;
  padding: 14px;
  border-radius: 50%;
  border: 1px solid var(--border-hi);
  background: rgba(255, 255, 255, 0.03);
  margin-bottom: 18px;
}
.eyebrow {
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 10px;
}
.title {
  font-size: clamp(2.6rem, 11vw, 3.4rem);
  color: var(--text);
  margin-bottom: 14px;
}
.prompt {
  color: var(--text-soft);
  font-size: 1rem;
}

.middle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.dots {
  display: flex;
  gap: 18px;
}
.dot {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1.5px solid var(--border-hi);
  transition: all 0.2s ease;
}
.dot.filled {
  background: linear-gradient(135deg, var(--gold-hi), var(--gold-deep));
  border-color: transparent;
  box-shadow: 0 0 14px -2px var(--gold);
  transform: scale(1.08);
}
.error {
  min-height: 1.3em;
  font-size: 0.9rem;
  color: var(--rose);
  opacity: 0;
  transition: opacity 0.2s ease;
  max-width: 300px;
}
.error.visible {
  opacity: 1;
}
.shake {
  animation: shake 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}
@keyframes shake {
  10%, 90% { transform: translateX(-2px); }
  20%, 80% { transform: translateX(4px); }
  30%, 50%, 70% { transform: translateX(-8px); }
  40%, 60% { transform: translateX(8px); }
}

.keypad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  max-width: 320px;
  width: 100%;
  margin: 0 auto;
}
.key {
  aspect-ratio: 1.55 / 1;
  border-radius: var(--radius-md);
  font-family: var(--font-title);
  font-size: 1.6rem;
  color: var(--text);
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid var(--border);
  transition: transform 0.1s ease, background 0.2s ease;
}
.key:active {
  transform: scale(0.94);
  background: rgba(255, 255, 255, 0.1);
}
.key--empty {
  background: none;
  border: none;
}
.key--action {
  font-size: 1.3rem;
  color: var(--gold);
}
</style>
