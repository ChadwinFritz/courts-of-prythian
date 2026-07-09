<!-- src/App.vue -->
<template>
  <AppNav />
  <ProgressBar />
  <RouterView v-slot="{ Component }">
    <Transition name="courtfade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
  <Toast />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import AppNav from './components/AppNav.vue'
import ProgressBar from './components/ProgressBar.vue'
import Toast from './components/Toast.vue'
import { useSecrets } from './composables/useSecrets'
import { useMagic } from './composables/useMagic'

const { onKeydown } = useSecrets()
const { initCursor, initShootingStars } = useMagic()

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  initCursor()
  initShootingStars()
})

onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style>
@media (prefers-reduced-motion: no-preference) {
  .courtfade-enter-active,
  .courtfade-leave-active {
    transition: opacity var(--dur-slow, 400ms) var(--ease-out, cubic-bezier(0.22, 0.68, 0, 1.18));
  }
  .courtfade-enter-from,
  .courtfade-leave-to { opacity: 0; }
}
</style>
