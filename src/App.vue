<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useGame } from './composables/useGame'
import { ADMIN_CODE, SITE_LOCKED, STORAGE_KEYS } from './config'
import LockedScreen from './components/LockedScreen.vue'
import AccessScreen from './components/AccessScreen.vue'
import IntroScreen from './components/IntroScreen.vue'
import LevelSelect from './components/LevelSelect.vue'
import GameScreen from './components/GameScreen.vue'
import EndScreen from './components/EndScreen.vue'

type Screen = 'access' | 'intro' | 'level' | 'game' | 'end'

const game = useGame()
const screen = ref<Screen>('access')

// Accès admin : permet de jouer même quand le site est verrouillé.
const adminUnlocked = ref(false)
const locked = computed(() => SITE_LOCKED && !adminUnlocked.value)

/** Active l'accès admin (mémorisé) et va directement au jeu. */
function enableAdmin() {
  adminUnlocked.value = true
  try {
    localStorage.setItem(STORAGE_KEYS.adminUnlocked, 'true')
    localStorage.setItem(STORAGE_KEYS.unlocked, 'true')
  } catch {
    /* on continue même sans persistance */
  }
  screen.value = 'intro'
}

onMounted(() => {
  // Admin déjà mémorisé ?
  try {
    if (localStorage.getItem(STORAGE_KEYS.adminUnlocked) === 'true') adminUnlocked.value = true
  } catch {
    /* pas grave */
  }

  // Admin via l'URL : ?admin=LECODE (puis on nettoie l'URL).
  try {
    const url = new URL(window.location.href)
    if (url.searchParams.get('admin') === ADMIN_CODE) {
      enableAdmin()
      url.searchParams.delete('admin')
      window.history.replaceState({}, '', url.pathname + url.search + url.hash)
    }
  } catch {
    /* URL exotique : on ignore */
  }

  // Déverrouillage mémorisé : on saute l'écran de code si déjà fait.
  let unlocked = false
  try {
    unlocked = localStorage.getItem(STORAGE_KEYS.unlocked) === 'true'
  } catch {
    /* stockage indisponible : on redemande le code, pas grave */
  }
  if (unlocked && screen.value === 'access') screen.value = 'intro'
})

function onUnlock() {
  try {
    localStorage.setItem(STORAGE_KEYS.unlocked, 'true')
  } catch {
    /* on continue même sans persistance */
  }
  screen.value = 'intro'
}

function startGame() {
  game.start()
  screen.value = 'game'
}

function replay() {
  game.reset()
  screen.value = 'level'
}
</script>

<template>
  <Transition name="fade" mode="out-in">
    <LockedScreen v-if="locked" key="locked" @unlock="enableAdmin" />

    <AccessScreen v-else-if="screen === 'access'" key="access" @unlock="onUnlock" />

    <IntroScreen v-else-if="screen === 'intro'" key="intro" @start="screen = 'level'" />

    <LevelSelect
      v-else-if="screen === 'level'"
      key="level"
      :level="game.state.level"
      :auto-escalate="game.state.autoEscalate"
      @select="game.setLevel($event)"
      @toggle-auto="game.setAutoEscalate($event)"
      @confirm="startGame"
    />

    <GameScreen v-else-if="screen === 'game'" key="game" @finish="screen = 'end'" />

    <EndScreen
      v-else
      key="end"
      :played-count="game.state.playedCount"
      :favorites="game.favoriteCards.value"
      @replay="replay"
    />
  </Transition>
</template>
