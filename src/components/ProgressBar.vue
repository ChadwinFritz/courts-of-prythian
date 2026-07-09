<!-- src/components/ProgressBar.vue -->
<template>
  <div
    aria-hidden="true"
    :style="{ width: pct + '%' }"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const pct = ref(0)
function update() {
  const h = document.documentElement
  const max = h.scrollHeight - h.clientHeight
  pct.value = max > 0 ? (h.scrollTop / max) * 100 : 0
}
onMounted(() => { window.addEventListener('scroll', update, { passive: true }); update() })
onUnmounted(() => window.removeEventListener('scroll', update))
</script>

<style scoped>
div {
  position:   fixed;
  top:        0;
  left:       0;
  height:     3px;
  z-index:    var(--z-progress);
  background: linear-gradient(90deg, var(--amethyst), var(--burnished));
  box-shadow: 0 0 8px rgba(201, 148, 58, 0.7);
  transition: width 0.1s linear;
  pointer-events: none;
}
</style>
