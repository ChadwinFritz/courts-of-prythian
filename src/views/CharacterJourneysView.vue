<!-- src/views/CharacterJourneysView.vue -->
<template>
  <HeroSection
    title="Character Journeys"
    eyebrow="The Gallery of Becoming"
    lead="No one in Prythian ends where they began."
  />

  <main>
    <div
      v-for="char in characters"
      :key="char.name"
      class="journey"
    >
      <div class="jhead">
        <h2>{{ char.name }}</h2>
        <div class="tag">{{ char.tag }}</div>
      </div>

      <p class="arc">{{ char.arc }}</p>

      <div class="steps">
        <div
          v-for="(m, idx) in char.milestones"
          :key="idx"
          class="step"
          :class="{ big: m.big }"
        >
          <span class="bk">{{ m.book }}</span>
          <p>{{ m.text }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import { characters } from '../data/characters'
import { useGsap } from '../composables/useGsap'

const { stagger } = useGsap()

onMounted(() => {
  stagger('.journey', { delay: 0.2 })
})
</script>

<style scoped>
main {
  max-width: 68rem;
  margin: 0 auto;
  padding: 0 1.5rem 5rem;
}

.journey {
  border: 1px solid rgba(180, 142, 240, 0.2);
  padding: 2rem 2rem 1.8rem;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.02);
}

.jhead {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.7rem;
}

.jhead h2 {
  font-size: 1.7rem;
  margin: 0;
}

.tag {
  font-family: var(--font-display);
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--amethyst);
}

.arc {
  color: var(--mist);
  font-style: italic;
  margin-bottom: 1.2rem;
  max-width: 60rem;
}

.steps {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.step {
  background: rgba(255, 255, 255, 0.03);
  border-left: 2px solid rgba(180, 142, 240, 0.35);
  padding: 0.9rem 1rem;
  flex: 1 1 220px;
}

.step.big {
  border-left-color: var(--burnished);
}

.bk {
  display: block;
  font-family: var(--font-display);
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--burnished);
  margin-bottom: 0.4rem;
}

.step p {
  font-size: 0.96rem;
  color: var(--mist);
  margin: 0;
}
</style>
