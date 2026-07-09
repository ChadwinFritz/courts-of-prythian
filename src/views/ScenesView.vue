<template>
  <HeroSection
    title="Scenes of Prythian"
    eyebrow="The Gallery"
    lead="Six settings from across the books — illustrated."
  />

  <main>
    <div v-for="scene in scenes" :key="scene.id" class="scene">
      <div class="scene-img">
        <ImageSlot
          :filename="scene.image"
          :alt="scene.title"
          :fallback="ScenePlaceholder"
        />
      </div>
      <div class="caption">
        <span class="eyebrow">{{ scene.book }}</span>
        <h3>{{ scene.title }}</h3>
        <p>{{ scene.caption }}</p>
      </div>
    </div>
  </main>
</template>

<script setup>
// Web Audio soundscape deferred — too complex for this implementation
import { defineComponent, onMounted } from 'vue'
import { useGsap } from '../composables/useGsap'

const { stagger } = useGsap()
onMounted(() => stagger('.scene', { delay: 0.1 }))
import HeroSection from '../components/HeroSection.vue'
import ImageSlot from '../components/ImageSlot.vue'
import { scenes } from '../data/scenes'

// Generic scene illustration placeholder — renders when image file is absent or fails to load
const ScenePlaceholder = defineComponent({
  props: ['id'],
  template: `<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;background:rgba(13,16,32,.8);">
    <rect width="480" height="320" fill="rgba(13,16,32,.8)" />
    <text x="240" y="165" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="22" fill="rgba(180,142,240,.35)">✦ Illustration pending ✦</text>
  </svg>`,
})
</script>

<style scoped>
main {
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 1.5rem 5rem;
}

.scene {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
  align-items: start;
  padding: 3rem 0;
  border-bottom: 1px solid rgba(180, 142, 240, 0.12);
}

.scene:last-child {
  border-bottom: none;
}

.scene:nth-child(even) {
  direction: rtl;
}

.scene:nth-child(even) > * {
  direction: ltr;
}

@media (max-width: 660px) {
  .scene {
    grid-template-columns: 1fr;
  }

  .scene:nth-child(even) {
    direction: ltr;
  }
}

.scene-img {
  border: 1px solid rgba(180, 142, 240, 0.2);
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.caption .eyebrow {
  display: block;
  font-family: var(--font-display);
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--burnished);
  margin-bottom: 0.5rem;
}

.caption h3 {
  font-size: 1.6rem;
  font-style: italic;
  margin: 0 0 0.8rem;
  color: var(--moonwhite);
}

.caption p {
  color: var(--mist);
  line-height: 1.7;
  font-size: 0.97rem;
}
</style>
