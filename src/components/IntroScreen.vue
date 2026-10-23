<script setup lang="ts">
const emit = defineEmits<{ start: [] }>()
</script>

<template>
  <div class="screen intro">
    <div class="intro-body">
      <p class="eyebrow">Pour toi, et personne d'autre</p>

      <h1 class="title">
        Pour Kékéli,<br /><span class="chou">mon chou</span>
        <span class="heart">💛</span>
      </h1>

      <!-- ─────────────────────────────────────────────────────────────
           Petit mot de Kevin (modifie ce texte à ta guise).
           ───────────────────────────────────────────────────────────── -->
      <p class="note">
        J'espère que tu es prête à jouer.
      </p>

      <div class="rule">
        <span class="rule-label">La seule règle</span>
        <p>« On répond vraiment, puis on se renvoie la question. »</p>
      </div>
    </div>

    <div class="intro-foot">
      <button class="btn btn-gold start" @click="emit('start')">Commencer</button>
      <p class="signature">Codé avec ❤️ par Kevin, développeur full-stack</p>
    </div>
  </div>
</template>

<style scoped>
.intro {
  justify-content: flex-start;
  text-align: center;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.intro-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Prend la place dispo (contenu centré) mais ne se laisse jamais
     écraser : sur écran court, on scrolle au lieu de couper le bouton. */
  flex: 1 0 auto;
  gap: clamp(14px, 3.2vh, 22px);
  padding: 12px 0;
}
.eyebrow {
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-dim);
}
.title {
  font-size: clamp(2.3rem, 10vw, 3.2rem);
  color: var(--text);
  position: relative;
  cursor: pointer;
  user-select: none;
}
.chou {
  font-style: italic;
  color: var(--gold);
}
.heart {
  display: inline-block;
  margin-left: 6px;
  font-size: 0.7em;
  animation: beat 2.4s ease-in-out infinite;
}
@keyframes beat {
  0%, 100% { transform: scale(1); }
  12% { transform: scale(1.22); }
  24% { transform: scale(1); }
  36% { transform: scale(1.14); }
}
.note {
  color: var(--text-soft);
  font-size: 1.05rem;
  line-height: 1.6;
  max-width: 400px;
}
.rule {
  margin-top: 4px;
  padding: 18px 20px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-hi);
  background: rgba(255, 255, 255, 0.03);
  max-width: 420px;
}
.rule-label {
  display: block;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 8px;
}
.rule p {
  font-family: var(--font-title);
  font-style: italic;
  font-size: 1.12rem;
  color: var(--text);
}
.intro-foot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  flex: 0 0 auto;
  padding-top: 8px;
}
.start {
  width: 100%;
  max-width: 420px;
}
.signature {
  font-size: 0.82rem;
  color: var(--text-dim);
}
</style>
