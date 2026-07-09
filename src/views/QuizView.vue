<!-- src/views/QuizView.vue -->
<template>
  <HeroSection
    title="The Trivia Gauntlet"
    eyebrow="Five Books, Five Rounds"
    lead="Twenty-five questions stand between you and Amren's grudging approval."
  />

  <main>
    <!-- Active quiz -->
    <template v-if="!done">
      <div class="progress-bar">
        <div
          class="fill"
          :style="{ width: ((roundIdx * 5 + questionIdx + 1) / 25 * 100) + '%' }"
        />
      </div>

      <div class="round-label">
        <span class="eyebrow">Round {{ roundIdx + 1 }}/5</span>
        <span class="book-title">{{ round.book }}</span>
      </div>

      <p class="q-text">{{ question.q }}</p>

      <div class="options">
        <button
          v-for="item in shuffled"
          :key="item.i"
          class="opt"
          :class="{
            correct: answered !== null && item.i === question.answer,
            wrong:   answered === item.i && item.i !== question.answer,
          }"
          :disabled="answered !== null"
          @click="select(item.i)"
        >
          {{ item.o }}
        </button>
      </div>

      <div v-if="answered !== null" class="lore">
        <em>{{ question.lore }}</em>
      </div>

      <button
        v-if="answered !== null"
        class="btn-next"
        @click="next"
      >
        {{
          roundIdx === rounds.length - 1 && questionIdx === round.questions.length - 1
            ? 'See my verdict →'
            : 'Next →'
        }}
      </button>
    </template>

    <!-- Verdict screen -->
    <div v-else class="verdict">
      <div class="character">{{ verdict.character }}</div>
      <div class="score">{{ score }} / 25</div>
      <p class="text">{{ verdict.text }}</p>
      <button
        class="btn-next"
        @click="roundIdx = 0; questionIdx = 0; score = 0; answered = null; done = false; reshuffleOptions()"
      >
        Try again
      </button>
    </div>
  </main>
</template>

<script setup>
import { ref, shallowRef, computed, onMounted } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import { rounds, verdicts } from '../data/quiz'
import { useGsap } from '../composables/useGsap'

const roundIdx    = ref(0)
const questionIdx = ref(0)
const score       = ref(0)
const answered    = ref(null)
const done        = ref(false)
const shuffled    = shallowRef([])

const round    = computed(() => rounds[roundIdx.value])
const question = computed(() => round.value.questions[questionIdx.value])

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function reshuffleOptions() {
  shuffled.value = shuffle(question.value.options.map((o, i) => ({ o, i })))
}

function select(origIndex) {
  if (answered.value !== null) return
  answered.value = origIndex
  if (origIndex === question.value.answer) score.value++
}

function next() {
  answered.value = null
  if (questionIdx.value < round.value.questions.length - 1) {
    questionIdx.value++
  } else if (roundIdx.value < rounds.length - 1) {
    roundIdx.value++
    questionIdx.value = 0
  } else {
    done.value = true
    return
  }
  reshuffleOptions()
}

const verdict = computed(() => {
  if (!done.value) return null
  return [...verdicts]
    .sort((a, b) => b.min - a.min)
    .find(v => score.value >= v.min)
})

onMounted(() => {
  reshuffleOptions()
  const { fadeUp } = useGsap()
  fadeUp('.q-text, .options', { delay: 0.1, stagger: 0.1 })
})
</script>

<style scoped>
main {
  max-width: 50rem;
  margin: 0 auto;
  padding: 2rem 1.5rem 5rem;
}

.progress-bar {
  height: 3px;
  background: rgba(180, 142, 240, 0.18);
  border-radius: 2px;
  margin-bottom: 1.8rem;
}

.fill {
  height: 100%;
  background: var(--amethyst);
  border-radius: 2px;
  transition: width 0.4s ease;
}

.round-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.book-title {
  font-style: italic;
  color: var(--mist);
  font-size: 0.95rem;
}

.q-text {
  font-size: 1.35rem;
  margin-bottom: 1.4rem;
  line-height: 1.45;
}

.options {
  display: grid;
  gap: 0.7rem;
}

.opt {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(180, 142, 240, 0.25);
  padding: 0.85rem 1.1rem;
  text-align: left;
  font-size: 1rem;
  color: var(--moonwhite);
  cursor: pointer;
  transition: border-color 0.2s;
}

.opt:hover:not(:disabled) {
  border-color: var(--amethyst);
}

.opt:disabled {
  cursor: default;
}

.opt.correct {
  border-color: var(--correct);
  background: rgba(109, 191, 126, 0.12);
}

.opt.wrong {
  border-color: var(--wrong);
  background: rgba(192, 96, 96, 0.12);
}

.lore {
  margin-top: 1.2rem;
  padding: 1rem 1.2rem;
  background: rgba(255, 255, 255, 0.04);
  border-left: 2px solid var(--burnished);
  color: var(--mist);
  font-size: 0.95rem;
}

.btn-next {
  margin-top: 1.2rem;
  padding: 0.7rem 1.6rem;
  background: var(--amethyst);
  color: var(--moonwhite);
  border: none;
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
}

.verdict {
  text-align: center;
  padding: 3rem 1rem;
}

.verdict .character {
  font-size: 2rem;
  font-style: italic;
  margin-bottom: 0.5rem;
}

.verdict .score {
  color: var(--burnished);
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
}

.verdict .text {
  color: var(--mist);
  font-style: italic;
  max-width: 36rem;
  margin: 0 auto 2rem;
  font-size: 1.1rem;
}
</style>
