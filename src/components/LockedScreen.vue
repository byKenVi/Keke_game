<script setup lang="ts">
import { LOCKED_MESSAGE } from '../config'
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
    <span class="heart" aria-hidden="true">💛</span>
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
  animation: beat 2.6s ease-in-out infinite;
}
@keyframes beat {
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.22); }
  28% { transform: scale(1); }
  42% { transform: scale(1.12); }
}
</style>
