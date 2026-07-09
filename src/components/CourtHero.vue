<!-- src/components/CourtHero.vue -->
<template>
  <div :style="courtVars">
    <HeroSection :title="book.title" :eyebrow="`Book ${book.numeral}`" :lead="book.lead">
      <slot />
    </HeroSection>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import HeroSection from './HeroSection.vue'
import { courts } from '../data/courts'

const props = defineProps({ bookId: { type: Number, required: true } })

const book  = computed(() => courts[props.bookId])
const courtVars = computed(() => ({
  '--court-accent': book.value.accent,
  '--court-gold':   book.value.gold,
  '--court-bg':     book.value.bg,
}))
</script>
