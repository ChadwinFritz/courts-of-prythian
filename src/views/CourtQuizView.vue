<!-- src/views/CourtQuizView.vue -->
<template>
  <HeroSection
    title="Which Court Is Yours?"
    eyebrow="The Sorting"
    lead="Seven courts, seven questions. The Cauldron knows if you're fishing for Night Court."
  />

  <main>
    <!-- Active quiz -->
    <template v-if="!finished">
      <div class="progress">
        <div
          class="prog-fill"
          :style="{ width: (answers.length / questions.length * 100) + '%' }"
        />
      </div>

      <div class="q-num">Question {{ answers.length + 1 }} of {{ questions.length }}</div>

      <p class="q-text">{{ current.q }}</p>

      <div class="opts">
        <button
          v-for="opt in current.options"
          :key="opt.label"
          class="opt"
          @click="answer(opt.court)"
        >
          {{ opt.label }}
        </button>
      </div>
    </template>

    <!-- Result screen -->
    <div v-else class="result">
      <div class="court-sigil">{{ result.sigil }}</div>
      <div class="eyebrow">Your Court</div>
      <h2>The {{ result.court }} Court</h2>
      <p class="kin">{{ result.kin }}</p>
      <p class="desc">{{ result.description }}</p>
      <button class="btn-retry" @click="restart">Retake the sorting</button>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import { questions, courtResults } from '../data/courtQuiz'

const answers  = ref([])
const finished = ref(false)

const current = computed(() => questions[answers.value.length])

function answer(court) {
  answers.value = [...answers.value, court]
  if (answers.value.length === questions.length) finished.value = true
}

const result = computed(() => {
  if (!finished.value) return null
  const tally = {}
  answers.value.forEach(c => { tally[c] = (tally[c] || 0) + 1 })
  const winner = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0]
  return { court: winner, ...courtResults[winner] }
})

function restart() {
  answers.value  = []
  finished.value = false
}
</script>

<style scoped>
main {
  max-width: 46rem;
  margin: 0 auto;
  padding: 2rem 1.5rem 5rem;
}

.progress {
  height: 3px;
  background: rgba(180, 142, 240, 0.18);
  border-radius: 2px;
  margin-bottom: 2rem;
}

.prog-fill {
  height: 100%;
  background: var(--amethyst);
  border-radius: 2px;
  transition: width 0.4s ease;
}

.q-num {
  font-family: var(--font-display);
  font-size: 0.62rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--amethyst);
  margin-bottom: 0.6rem;
}

.q-text {
  font-size: 1.35rem;
  margin-bottom: 1.6rem;
  line-height: 1.45;
}

.opts {
  display: grid;
  gap: 0.7rem;
}

.opt {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(180, 142, 240, 0.25);
  padding: 0.85rem 1.2rem;
  text-align: left;
  font-size: 1rem;
  color: var(--moonwhite);
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}

.opt:hover {
  border-color: var(--amethyst);
  background: rgba(180, 142, 240, 0.1);
}

.result {
  text-align: center;
  padding: 2rem 0;
}

.court-sigil {
  font-size: 4rem;
  margin-bottom: 0.8rem;
}

.result h2 {
  font-size: 2.2rem;
  font-style: italic;
  margin: 0.3rem 0 0.8rem;
}

.kin {
  font-family: var(--font-display);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--burnished);
  margin-bottom: 1.2rem;
}

.desc {
  color: var(--mist);
  font-style: italic;
  max-width: 38rem;
  margin: 0 auto 2rem;
  font-size: 1.08rem;
  line-height: 1.6;
}

.btn-retry {
  padding: 0.7rem 1.8rem;
  background: transparent;
  border: 1px solid var(--amethyst);
  color: var(--amethyst);
  font-family: var(--font-display);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
