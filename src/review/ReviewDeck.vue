<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { CATEGORIES, LEVELS } from '../data/cards'
import { useReview } from './useReview'
import type { ReviewMode, Verdict } from './useReview'

const props = defineProps<{ mode: ReviewMode }>()
const emit = defineEmits<{ back: [] }>()

const r = useReview(props.mode)

const title = computed(() =>
  props.mode === 'proposals' ? 'Nouvelles propositions' : 'Cartes du jeu',
)

// ── Pile de cartes : drag / swipe ──────────────────────────────────────────
const dragX = ref(0)
const dragY = ref(0)
const dragging = ref(false)
const leaving = ref<null | Verdict>(null)
let startX = 0
let startY = 0
let pointerId: number | null = null

const SWIPE_THRESHOLD = 110

const rotation = computed(() => dragX.value / 18)
const hintKeep = computed(() => dragX.value > 40)
const hintDelete = computed(() => dragX.value < -40)
const cardStyle = computed(() => {
  if (leaving.value) {
    const dir = leaving.value === 'keep' ? 1 : -1
    return {
      transform: `translate(${dir * 480}px, 40px) rotate(${dir * 22}deg)`,
      opacity: '0',
      transition: 'transform .34s ease, opacity .34s ease',
    }
  }
  return {
    transform: `translate(${dragX.value}px, ${dragY.value}px) rotate(${rotation.value}deg)`,
    transition: dragging.value ? 'none' : 'transform .28s cubic-bezier(.2,.8,.3,1)',
  }
})

function onPointerDown(e: PointerEvent) {
  if (leaving.value || editing.value) return
  dragging.value = true
  startX = e.clientX
  startY = e.clientY
  pointerId = e.pointerId
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}
function onPointerMove(e: PointerEvent) {
  if (!dragging.value || e.pointerId !== pointerId) return
  dragX.value = e.clientX - startX
  dragY.value = (e.clientY - startY) * 0.4
}
function onPointerUp(e: PointerEvent) {
  if (!dragging.value || e.pointerId !== pointerId) return
  dragging.value = false
  pointerId = null
  if (dragX.value > SWIPE_THRESHOLD) fly('keep')
  else if (dragX.value < -SWIPE_THRESHOLD) fly('delete')
  else {
    dragX.value = 0
    dragY.value = 0
  }
}

/** Animation de sortie puis enregistrement de la décision. */
function fly(verdict: Verdict) {
  leaving.value = verdict
  window.setTimeout(() => {
    r.decide(verdict)
    leaving.value = null
    dragX.value = 0
    dragY.value = 0
  }, 300)
}

function onUndo() {
  dragX.value = 0
  dragY.value = 0
  leaving.value = null
  r.undo()
}

// ── Reformulation ──────────────────────────────────────────────────────────
const editing = ref(false)
const editText = ref('')
const editArea = ref<HTMLTextAreaElement | null>(null)

function openEdit() {
  if (!r.current.value) return
  editText.value = r.current.value.text
  editing.value = true
  nextTick(() => editArea.value?.focus())
}
function cancelEdit() {
  editing.value = false
}
function saveEdit() {
  r.keepReformulated(editText.value)
  editing.value = false
  editText.value = ''
}

// ── Écran de fin / récap ───────────────────────────────────────────────────
const recapTab = ref<'kept' | 'reformulated' | 'deleted'>('kept')

const keptList = computed(() =>
  r.reviewList.filter((c) => r.decisionFor(c.id)?.verdict === 'keep'),
)
const reformulatedList = computed(() =>
  r.reviewList.filter((c) => r.decisionFor(c.id)?.edited),
)
const deletedList = computed(() =>
  r.reviewList.filter((c) => r.decisionFor(c.id)?.verdict === 'delete'),
)

// Édition d'une carte depuis le récap.
const recapEditId = ref<number | null>(null)
const recapEditText = ref('')
function startRecapEdit(id: number) {
  const d = r.decisionFor(id)
  const card = r.reviewList.find((c) => c.id === id)
  recapEditText.value = d?.text ?? card?.text ?? ''
  recapEditId.value = id
}
function saveRecapEdit() {
  if (recapEditId.value != null) r.reword(recapEditId.value, recapEditText.value)
  recapEditId.value = null
}

// ── Export ─────────────────────────────────────────────────────────────────
const showExport = ref(false)
const exportText = ref('')
const copied = ref(false)

function openExport() {
  exportText.value = r.exportJson()
  showExport.value = true
  copied.value = false
}
function downloadExport() {
  const blob = new Blob([r.exportJson()], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const stamp = new Date().toISOString().slice(0, 10)
  a.href = url
  a.download = `kekeli-${props.mode}-${stamp}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
async function copyExport() {
  try {
    await navigator.clipboard.writeText(r.exportJson())
    copied.value = true
    window.setTimeout(() => (copied.value = false), 2000)
  } catch {
    /* le fallback : la zone de texte est sélectionnable */
  }
}

function confirmReset() {
  if (window.confirm('Tout effacer et recommencer ce lot depuis le début ?')) {
    r.resetAll()
    showExport.value = false
  }
}

function meta(categoryKey: string) {
  return CATEGORIES[categoryKey as keyof typeof CATEGORIES]
}
function levelMeta(levelKey: string) {
  return LEVELS[levelKey as keyof typeof LEVELS]
}
</script>

<template>
  <div class="deckroot">
    <!-- Barre du haut : progression -->
    <header class="top">
      <div class="top-row">
        <button class="back" title="Retour" @click="emit('back')">‹</button>
        <span class="mode-title">{{ title }}</span>
        <span class="counter">{{ r.position.value }} / {{ r.total }}</span>
      </div>
      <div class="stats-row">
        <span class="stat keep">♥ {{ r.keptCount.value }}</span>
        <span class="stat edit">✎ {{ r.editedCount.value }}</span>
        <span class="stat del">✕ {{ r.deletedCount.value }}</span>
      </div>
      <div class="bar">
        <div class="bar-fill" :style="{ width: (r.total ? (r.decidedCount.value / r.total) * 100 : 0) + '%' }" />
      </div>
    </header>

    <!-- Pile de cartes -->
    <main v-if="!r.finished.value" class="deck-wrap">
      <div class="deck">
        <article v-if="r.next.value" class="rcard behind" :style="{ '--accent': meta(r.next.value.category).color }">
          <div class="rcard-badges">
            <span class="rbadge">{{ meta(r.next.value.category).emoji }} {{ meta(r.next.value.category).label }}</span>
          </div>
          <p class="rcard-text">{{ r.next.value.text }}</p>
        </article>

        <article
          v-if="r.current.value"
          class="rcard top"
          :style="[{ '--accent': meta(r.current.value.category).color }, cardStyle]"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointercancel="onPointerUp"
        >
          <div class="stamp keep" :class="{ show: hintKeep }">GARDER</div>
          <div class="stamp del" :class="{ show: hintDelete }">SUPPRIMER</div>

          <div class="rcard-badges">
            <span class="rbadge">{{ meta(r.current.value.category).emoji }} {{ meta(r.current.value.category).label }}</span>
            <span class="rbadge lvl">{{ levelMeta(r.current.value.level).emoji }} {{ levelMeta(r.current.value.level).label }}</span>
          </div>

          <p class="rcard-text">{{ r.current.value.text }}</p>

          <p v-if="r.current.value.german" class="rcard-note">🇩🇪 {{ r.current.value.german.answer }}</p>
          <p class="rcard-id">#{{ r.current.value.id }}</p>
        </article>
      </div>

      <div class="actions">
        <button class="act undo" title="Annuler" :disabled="r.state.index === 0" @click="onUndo">↩</button>
        <button class="act del" title="Supprimer" @click="fly('delete')">✕</button>
        <button class="act edit" title="Reformuler" @click="openEdit">✎</button>
        <button class="act keep" title="Garder" @click="fly('keep')">♥</button>
      </div>
      <p class="hint">Glisse la carte, ou utilise les boutons.</p>
    </main>

    <!-- Écran de fin -->
    <main v-else class="end">
      <h2 class="end-title">Lot terminé 🎉</h2>
      <p class="end-sub">
        {{ r.keptCount.value }} gardées · {{ r.editedCount.value }} reformulées ·
        {{ r.deletedCount.value }} supprimées
      </p>

      <div class="tabs">
        <button :class="{ active: recapTab === 'kept' }" @click="recapTab = 'kept'">♥ Gardées ({{ keptList.length }})</button>
        <button :class="{ active: recapTab === 'reformulated' }" @click="recapTab = 'reformulated'">✎ Reformulées ({{ reformulatedList.length }})</button>
        <button :class="{ active: recapTab === 'deleted' }" @click="recapTab = 'deleted'">✕ Supprimées ({{ deletedList.length }})</button>
      </div>

      <ul class="recap-list">
        <li v-for="c in (recapTab === 'kept' ? keptList : recapTab === 'reformulated' ? reformulatedList : deletedList)" :key="c.id" class="recap-item">
          <div v-if="recapEditId === c.id" class="recap-edit">
            <textarea v-model="recapEditText" rows="3" />
            <div class="recap-edit-btns">
              <button class="btn-ghost" @click="recapEditId = null">Annuler</button>
              <button class="btn-primary sm" @click="saveRecapEdit">Enregistrer</button>
            </div>
          </div>
          <template v-else>
            <span class="recap-dot" :style="{ background: meta(c.category).color }" />
            <span class="recap-text">
              {{ r.decisionFor(c.id)?.text }}
              <span v-if="r.decisionFor(c.id)?.edited" class="recap-tag">reformulée</span>
            </span>
            <span class="recap-acts">
              <button v-if="recapTab !== 'deleted'" class="mini" title="Reformuler" @click="startRecapEdit(c.id)">✎</button>
              <button v-if="recapTab === 'deleted'" class="mini" title="Restaurer" @click="r.setVerdict(c.id, 'keep')">↩</button>
              <button v-else class="mini" title="Supprimer" @click="r.setVerdict(c.id, 'delete')">✕</button>
            </span>
          </template>
        </li>
        <li v-if="(recapTab === 'kept' ? keptList : recapTab === 'reformulated' ? reformulatedList : deletedList).length === 0" class="recap-empty">
          Rien ici pour l'instant.
        </li>
      </ul>

      <div class="end-actions">
        <button class="btn-primary" @click="openExport">Exporter le résultat</button>
        <button class="btn-ghost" @click="r.resumeFirstUndecided()">Revoir les non décidées</button>
        <button class="btn-ghost" @click="emit('back')">Changer de lot</button>
        <button class="btn-ghost danger" @click="confirmReset">Tout recommencer</button>
      </div>
    </main>

    <!-- Overlay reformulation -->
    <div v-if="editing" class="overlay" @click.self="cancelEdit">
      <div class="sheet">
        <h3>Reformuler</h3>
        <p class="sheet-orig" v-if="r.current.value">Original : « {{ r.current.value.text }} »</p>
        <textarea ref="editArea" v-model="editText" rows="4" placeholder="Réécris la carte ici…" />
        <div class="sheet-btns">
          <button class="btn-ghost" @click="cancelEdit">Annuler</button>
          <button class="btn-primary" @click="saveEdit">Garder reformulée</button>
        </div>
      </div>
    </div>

    <!-- Overlay export -->
    <div v-if="showExport" class="overlay" @click.self="showExport = false">
      <div class="sheet wide">
        <h3>Export ({{ title }})</h3>
        <p class="sheet-hint">
          Télécharge le fichier (ou copie le texte) et renvoie-le moi : j'intègre
          ces cartes au jeu.
        </p>
        <textarea class="export-area" :value="exportText" readonly rows="10" />
        <div class="sheet-btns">
          <button class="btn-ghost" @click="showExport = false">Fermer</button>
          <button class="btn-ghost" @click="copyExport">{{ copied ? 'Copié ✓' : 'Copier' }}</button>
          <button class="btn-primary" @click="downloadExport">Télécharger .json</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.deckroot {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

/* ── Top bar ── */
.top {
  flex: 0 0 auto;
}
.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
.back {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--border-hi);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-soft);
  font-size: 1.3rem;
  line-height: 1;
  flex: 0 0 auto;
}
.mode-title {
  flex: 1;
  text-align: center;
  font-size: 0.86rem;
  color: var(--text-soft);
  font-weight: 600;
}
.counter {
  font-size: 0.86rem;
  color: var(--text-soft);
  font-variant-numeric: tabular-nums;
  flex: 0 0 auto;
}
.stats-row {
  display: flex;
  justify-content: center;
  gap: 12px;
  font-size: 0.82rem;
  font-variant-numeric: tabular-nums;
  margin: 8px 0;
}
.stat.keep { color: var(--rose); }
.stat.edit { color: var(--gold); }
.stat.del { color: var(--text-dim); }
.bar {
  height: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}
.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--rose), var(--gold));
  transition: width 0.3s ease;
}

/* ── Deck ── */
.deck-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.deck {
  position: relative;
  flex: 1;
  min-height: 0;
  margin: 16px 0;
}
.rcard {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: 24px 22px;
  border-radius: var(--radius-lg);
  background:
    radial-gradient(130% 80% at 50% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 60%),
    linear-gradient(165deg, var(--surface-hi), var(--surface));
  box-shadow: var(--shadow-card);
  border: 1px solid var(--border);
  overflow: hidden;
  touch-action: none;
  user-select: none;
}
.rcard::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.85;
}
.rcard.behind {
  transform: scale(0.94) translateY(14px);
  opacity: 0.6;
  filter: saturate(0.8);
}
.rcard.top {
  cursor: grab;
  z-index: 2;
}
.rcard.top:active {
  cursor: grabbing;
}
.rcard-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}
.rbadge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 13px;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
}
.rbadge.lvl {
  color: var(--text-soft);
  background: rgba(255, 255, 255, 0.04);
  border-color: var(--border-hi);
}
.rcard-text {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: var(--font-title);
  font-size: clamp(1.35rem, 5vw, 1.85rem);
  line-height: 1.34;
  color: var(--text);
  text-wrap: balance;
  white-space: pre-line;
}
.rcard-note {
  text-align: center;
  font-size: 0.88rem;
  color: var(--gold);
  font-style: italic;
  margin-bottom: 4px;
}
.rcard-id {
  text-align: center;
  font-size: 0.72rem;
  color: var(--text-dim);
  font-variant-numeric: tabular-nums;
}

/* Tampons GARDER / SUPPRIMER */
.stamp {
  position: absolute;
  top: 26px;
  padding: 6px 14px;
  font-weight: 800;
  letter-spacing: 0.08em;
  font-size: 1rem;
  border-radius: 10px;
  border: 3px solid;
  opacity: 0;
  transition: opacity 0.12s ease;
  z-index: 3;
}
.stamp.keep {
  right: 20px;
  color: var(--rose);
  border-color: var(--rose);
  transform: rotate(14deg);
}
.stamp.del {
  left: 20px;
  color: #c98;
  border-color: #c98;
  transform: rotate(-14deg);
}
.stamp.show {
  opacity: 1;
}

/* ── Actions ── */
.actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 4px 0 2px;
}
.act {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--border-hi);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text);
  transition: transform 0.12s ease, background 0.2s ease;
}
.act:active {
  transform: scale(0.9);
}
.act:disabled {
  opacity: 0.35;
}
.act.undo { width: 48px; height: 48px; font-size: 1.2rem; }
.act.del { width: 60px; height: 60px; font-size: 1.5rem; color: #d9a; border-color: rgba(220,150,160,.4); }
.act.edit { width: 54px; height: 54px; font-size: 1.3rem; color: var(--gold); border-color: var(--border-hi); }
.act.keep { width: 60px; height: 60px; font-size: 1.5rem; color: var(--rose); border-color: color-mix(in srgb, var(--rose) 45%, transparent); background: color-mix(in srgb, var(--rose) 10%, transparent); }
.hint {
  text-align: center;
  font-size: 0.78rem;
  color: var(--text-dim);
  margin-top: 8px;
}

/* ── End ── */
.end {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding-top: 10px;
}
.end-title {
  font-family: var(--font-title);
  font-size: 1.8rem;
  text-align: center;
  color: var(--text);
}
.end-sub {
  text-align: center;
  color: var(--text-soft);
  font-size: 0.92rem;
  margin: 6px 0 14px;
}
.tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
}
.tabs button {
  flex: 1;
  padding: 8px 4px;
  font-size: 0.76rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-soft);
}
.tabs button.active {
  color: var(--text);
  border-color: var(--border-hi);
  background: rgba(255, 255, 255, 0.07);
}
.recap-list {
  flex: 1;
  overflow-y: auto;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 4px;
}
.recap-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
}
.recap-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 6px;
  flex: 0 0 auto;
}
.recap-text {
  flex: 1;
  font-size: 0.9rem;
  color: var(--text);
  line-height: 1.4;
  white-space: pre-line;
}
.recap-tag {
  display: inline-block;
  margin-left: 6px;
  font-size: 0.68rem;
  color: var(--gold);
  border: 1px solid var(--border-hi);
  border-radius: 6px;
  padding: 1px 6px;
}
.recap-acts {
  display: flex;
  gap: 6px;
  flex: 0 0 auto;
}
.mini {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid var(--border-hi);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-soft);
  font-size: 0.85rem;
}
.recap-empty {
  text-align: center;
  color: var(--text-dim);
  padding: 30px 0;
}
.recap-edit {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.recap-edit textarea {
  width: 100%;
  resize: vertical;
  padding: 10px;
  border-radius: var(--radius-sm);
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--border-hi);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 0.95rem;
}
.recap-edit-btns {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
.end-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 12px;
}

/* ── Boutons génériques ── */
.btn-primary {
  padding: 12px 18px;
  border-radius: var(--radius-sm);
  border: none;
  font-weight: 600;
  color: #2a1018;
  background: linear-gradient(120deg, var(--gold-hi), var(--rose));
}
.btn-primary.sm {
  padding: 8px 14px;
  font-size: 0.85rem;
}
.btn-ghost {
  padding: 12px 18px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-hi);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-soft);
}
.btn-ghost.danger {
  color: var(--rose);
}

/* ── Overlays ── */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 50;
  padding: 16px;
}
.sheet {
  width: 100%;
  max-width: 500px;
  background: linear-gradient(165deg, var(--surface-hi), var(--surface));
  border: 1px solid var(--border-hi);
  border-radius: var(--radius-lg);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: slideUp 0.25s ease;
}
.sheet.wide {
  max-width: 560px;
}
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.sheet h3 {
  font-family: var(--font-title);
  font-size: 1.3rem;
  color: var(--text);
}
.sheet-orig,
.sheet-hint {
  font-size: 0.85rem;
  color: var(--text-dim);
  line-height: 1.4;
}
.sheet textarea {
  width: 100%;
  resize: vertical;
  padding: 12px;
  border-radius: var(--radius-sm);
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--border-hi);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.4;
}
.export-area {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.72rem;
}
.sheet-btns {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  flex-wrap: wrap;
}
</style>
