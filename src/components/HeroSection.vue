<!-- src/components/HeroSection.vue -->
<template>
  <header class="hero">
    <StarField />
    <SignatureStars />
    <div class="hero-content">
      <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
      <h1>{{ title }}</h1>
      <p v-if="lead" class="lead">{{ lead }}</p>
      <slot />
    </div>
  </header>
</template>

<script setup>
import StarField from './StarField.vue'
import SignatureStars from './SignatureStars.vue'

defineProps({
  title:   { type: String, required: true },
  eyebrow: { type: String, default: '' },
  lead:    { type: String, default: '' },
})
</script>

<style scoped>
.hero {
  position:   relative;
  padding:    5rem 1.5rem 4rem;
  text-align: center;
  overflow:   hidden;
  background: radial-gradient(ellipse at 50% -30%, #2c1e5c 0%, var(--court-bg, var(--stone)) 65%);
}

.hero-content { position: relative; z-index: 1; }

h1 {
  font-size:  var(--text-hero);
  font-style: italic;
  line-height: 1.1;
  margin:     0.9rem 0 0.3rem;
}

.lead {
  max-width:  36rem;
  margin:     1.2rem auto 0;
  color:      var(--mist);
  font-style: italic;
  font-size:  1.12rem;
}
</style>
