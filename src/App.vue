<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGame } from './composables/useGame'
import { STORAGE_KEYS } from './config'
import AccessScreen from './components/AccessScreen.vue'
import IntroScreen from './components/IntroScreen.vue'
import LevelSelect from './components/LevelSelect.vue'
import GameScreen from './components/GameScreen.vue'
import EndScreen from './components/EndScreen.vue'

type Screen = 'access' | 'intro' | 'level' | 'game' | 'end'

const game = useGame()
const screen = ref<Screen>('access')

// Déverrouillage mémorisé : on saute l'écran de code si déjà fait.
onMounted(() => {
  let unlocked = false
  try {
    unlocked = localStorage.getItem(STORAGE_KEYS.unlocked) === 'true'
  } catch {
    /* stockage indisponible : on redemande le code, pas grave */
  }
  if (unlocked) screen.value = 'intro'
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
    <AccessScreen v-if="screen === 'access'" key="access" @unlock="onUnlock" />

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
      @replay="replay"
    />
  </Transition>
</template>
