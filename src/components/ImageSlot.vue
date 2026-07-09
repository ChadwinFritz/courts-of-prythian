<!-- src/components/ImageSlot.vue -->
<template>
  <img
    v-if="!errored"
    :src="src"
    :alt="alt"
    class="portrait"
    @error="errored = true"
  />
  <component :is="fallback" v-else class="portrait-svg" aria-hidden="true" />
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  filename: { type: String, required: true },
  alt:      { type: String, required: true },
  fallback: { type: Object, required: true }, // SVG component
})

const errored = ref(false)
const base = import.meta.env.BASE_URL
const src  = computed(() => `${base}images/${props.filename}`)
</script>

<style scoped>
.portrait     { max-width: 100%; border-radius: 2px; }
.portrait-svg { display: block; }
</style>
