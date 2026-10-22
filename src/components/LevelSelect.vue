<script setup lang="ts">
import type { Level } from '../types'
import { ESCALATE_EVERY } from '../config'
import { useHaptics } from '../composables/useHaptics'

const haptics = useHaptics()

defineProps<{
  level: Level
  autoEscalate: boolean
  /** Mode « panneau » : affiché par-dessus le jeu, sans l'en-tête complet. */
  compact?: boolean
}>()

const emit = defineEmits<{
  select: [level: Level]
  toggleAuto: [value: boolean]
  confirm: []
}>()

const options: { value: Level; emoji: string; title: string; desc: string }[] = [
  { value: 'soft', emoji: '🌸', title: 'Soft', desc: 'Doux, pour se mettre en jambes. On rit, on s’apprivoise.' },
  { value: 'medium', emoji: '🔥', title: 'Medium', desc: 'On ose un peu plus. Les regards traînent, les réponses aussi.' },
  { value: 'hot', emoji: '🌶️', title: 'Hot', desc: 'Plus proche, plus intense. Toujours le droit de dire non.' },
]
</script>

<template>
  <div class="screen level" :class="{ compact }">
    <div class="level-head" v-if="!compact">
      <p class="eyebrow">Choose your vibe <span class="wink">(oui Kékéli, c'est de l'anglais)</span></p>
      <h1 class="title">On commence à quelle intensité ?</h1>
    </div>
    <h2 v-else class="panel-title">Changer l'intensité</h2>

    <div class="options">
      <button
        v-for="opt in options"
        :key="opt.value"
        class="opt"
        :class="[`opt--${opt.value}`, { active: level === opt.value }]"
        @click="emit('select', opt.value)"
      >
        <span class="opt-emoji">{{ opt.emoji }}</span>
        <span class="opt-text">
          <span class="opt-title">{{ opt.title }}</span>
          <span class="opt-desc">{{ opt.desc }}</span>
        </span>
        <span class="opt-check" aria-hidden="true"></span>
      </button>
    </div>

    <label class="auto">
      <span class="auto-text">
        <span class="auto-title">Montée automatique</span>
        <span class="auto-desc">L'intensité grimpe toute seule toutes les {{ ESCALATE_EVERY }} cartes.</span>
      </span>
      <input
        type="checkbox"
        :checked="autoEscalate"
        @change="emit('toggleAuto', ($event.target as HTMLInputElement).checked)"
      />
      <span class="switch" aria-hidden="true"></span>
    </label>

    <label class="auto">
      <span class="auto-text">
        <span class="auto-title">Vibrations</span>
        <span class="auto-desc">Léger retour haptique sur le téléphone (tirage, gage, favori).</span>
      </span>
      <input
        type="checkbox"
        :checked="haptics.enabled.value"
        @change="haptics.setEnabled(($event.target as HTMLInputElement).checked)"
      />
      <span class="switch" aria-hidden="true"></span>
    </label>

    <button class="btn btn-gold go" @click="emit('confirm')">
      {{ compact ? 'Reprendre' : 'C’est parti' }}
    </button>
  </div>
</template>

<style scoped>
.level {
  /* `safe center` : centré quand il y a la place, sinon aligné en haut et
     scrollable (jamais de contenu coupé sur petit écran). */
  justify-content: safe center;
  gap: 22px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.level.compact {
  position: static;
  inset: auto;
  padding: 0;
  max-width: none;
  gap: 16px;
}
.level-head {
  text-align: center;
}
.eyebrow {
  font-size: 0.74rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 12px;
}
.wink {
  display: block;
  letter-spacing: 0.02em;
  text-transform: none;
  font-size: 0.7rem;
  color: var(--text-dim);
  opacity: 0.7;
  margin-top: 4px;
}
.title {
  font-size: clamp(1.8rem, 7vw, 2.4rem);
  color: var(--text);
  margin-bottom: 4px;
}
.panel-title {
  font-size: 1.4rem;
  color: var(--text);
  text-align: center;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.opt {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 18px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid var(--border);
  text-align: left;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.12s ease;
}
.opt:active {
  transform: scale(0.99);
}
.opt-emoji {
  font-size: 1.7rem;
  filter: saturate(1.1);
}
.opt-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.opt-title {
  font-family: var(--font-title);
  font-size: 1.2rem;
  color: var(--text);
}
.opt-desc {
  font-size: 0.86rem;
  color: var(--text-soft);
  line-height: 1.4;
}
.opt-check {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid var(--border-hi);
  flex-shrink: 0;
  transition: all 0.2s ease;
}
.opt.active {
  background: rgba(255, 255, 255, 0.07);
}
.opt--soft.active { border-color: var(--c-connaissance); }
.opt--medium.active { border-color: var(--c-audacieux); }
.opt--hot.active { border-color: var(--rose-deep); }
.opt.active .opt-check {
  border-color: var(--gold);
  background: radial-gradient(circle, var(--gold) 45%, transparent 48%);
  box-shadow: 0 0 10px -2px var(--gold);
}

/* Interrupteur « montée auto ». */
.auto {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 15px 18px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.025);
  cursor: pointer;
}
.auto input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.auto-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.auto-title {
  font-weight: 600;
  color: var(--text);
}
.auto-desc {
  font-size: 0.82rem;
  color: var(--text-soft);
  line-height: 1.4;
}
.switch {
  position: relative;
  width: 50px;
  height: 28px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.12);
  flex-shrink: 0;
  transition: background 0.25s ease;
}
.switch::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--text);
  transition: transform 0.25s ease;
}
.auto input:checked ~ .switch {
  background: linear-gradient(135deg, var(--gold-hi), var(--gold-deep));
}
.auto input:checked ~ .switch::after {
  transform: translateX(22px);
  background: #2a160a;
}

.go {
  width: 100%;
}
</style>
