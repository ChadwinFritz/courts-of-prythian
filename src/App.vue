<!-- src/App.vue -->
<template>
  <AppNav />
  <ProgressBar />
  <RouterView />
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
