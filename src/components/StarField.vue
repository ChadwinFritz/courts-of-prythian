<!-- src/components/StarField.vue -->
<template>
  <svg
    ref="sky"
    class="star-field"
    aria-hidden="true"
    width="100%"
    height="100%"
    viewBox="0 0 900 420"
    preserveAspectRatio="xMidYMid slice"
  >
    <circle
      v-for="(star, i) in stars"
      :key="i"
      :cx="star.x"
      :cy="star.y"
      :r="star.r"
      fill="#fff"
      :style="{ animationDelay: star.delay }"
    />
  </svg>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const stars = Array.from({ length: 18 }, () => ({
  x: Math.random() * 900,
  y: Math.random() * 420,
  r: 0.9 + Math.random() * 0.9,
  delay: (Math.random() * 3.6).toFixed(1) + 's',
}))

const sky = ref(null)
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function onScroll() {
  if (!sky.value || reduced) return
  sky.value.style.transform = `translateY(${window.scrollY * 0.28}px)`
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.star-field {
  position:       absolute;
  inset:          0;
  pointer-events: none;
  will-change:    transform;
}

@media (prefers-reduced-motion: no-preference) {
  circle {
    animation: tw 3.6s ease-in-out infinite;
  }
  @keyframes tw {
    0%, 100% { opacity: 0.2; }
    50%       { opacity: 1;   }
  }
}
</style>
