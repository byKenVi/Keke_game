<script setup lang="ts">
defineProps<{ playedCount: number }>()
defineEmits<{ replay: [] }>()
</script>

<template>
  <div class="screen end">
    <div class="end-body">
      <p class="eyebrow">Fin de la soirée</p>
      <h1 class="title">Merci, mon chou 💛</h1>

      <!-- ─────────────────────────────────────────────────────────────
           Mot de fin de Kevin — modifie librement ce texte.
           ───────────────────────────────────────────────────────────── -->
      <p class="message">
        Peu importe le score (il n'y en a pas, je sais). Ce que je retiens,
        c'est ta voix, tes rires, et toutes ces petites choses que tu m'as
        confiées ce soir. Je t'ai codé un jeu, mais c'est toi qui le rends
        précieux. Reste au chaud contre moi — surtout toi.
      </p>

      <div class="stat">
        <span class="stat-num">{{ playedCount }}</span>
        <span class="stat-label">carte{{ playedCount > 1 ? 's' : '' }} partagée{{ playedCount > 1 ? 's' : '' }}</span>
      </div>
    </div>

    <div class="end-foot">
      <button class="btn btn-gold replay" @click="$emit('replay')">Rejouer une partie</button>

      <div class="credits">
        <p class="credit-line">Codé par Kevin</p>
        <div class="links">
          <a href="https://github.com/byKenVi" target="_blank" rel="noopener">
            github.com/byKenVi
          </a>
          <span class="sep">·</span>
          <a
            href="https://linkedin.com/in/kevin-lihounhinto-32072b2b5"
            target="_blank"
            rel="noopener"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.end {
  justify-content: space-between;
  text-align: center;
}
.end-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 22px;
}
.eyebrow {
  font-size: 0.76rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-dim);
}
.title {
  font-size: clamp(2.2rem, 9vw, 3rem);
  color: var(--text);
}
.message {
  color: var(--text-soft);
  font-size: 1.06rem;
  line-height: 1.65;
  max-width: 420px;
}
.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px 28px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-hi);
  background: rgba(255, 255, 255, 0.03);
}
.stat-num {
  font-family: var(--font-title);
  font-size: 2.4rem;
  color: var(--gold);
  line-height: 1;
}
.stat-label {
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
}

.end-foot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.replay {
  width: 100%;
  max-width: 420px;
}
.credits {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.credit-line {
  font-family: var(--font-title);
  font-style: italic;
  color: var(--text-soft);
}
.links {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.86rem;
}
.sep {
  color: var(--text-dim);
}
</style>
