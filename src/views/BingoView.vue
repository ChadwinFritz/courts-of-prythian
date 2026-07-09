<template>
  <HeroSection
    title="Reread Bingo"
    eyebrow="The Rite"
    lead="Twenty-four squares of things that will absolutely happen on your reread."
  />
  <main>
    <div v-if="bingo.completedLines.length" class="bingo-banner">
      {{ completionMsg }}
    </div>

    <div class="bingo-grid">
      <button
        v-for="cell in grid"
        :key="cell.i"
        class="square"
        :class="{ marked: bingo.isMarked(cell.i), free: cell.free }"
        :aria-pressed="bingo.isMarked(cell.i)"
        @click="bingo.toggle(cell.i)"
      >
        {{ cell.text }}
      </button>
    </div>

    <div class="bingo-actions">
      <button class="btn-action" @click="bingo.clear()">Clear card</button>
      <button class="btn-action gold" @click="shareCard">Copy card to clipboard</button>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import { useBingoStore } from '../stores/bingo'
import { squares } from '../data/bingo'

const bingo = useBingoStore()

// Build grid: 25 slots, center (index 12) is FREE
// Grid positions 0–11  → squares[0]–squares[11]
// Grid position  12    → FREE ★
// Grid positions 13–24 → squares[12]–squares[23]
const grid = computed(() =>
  Array.from({ length: 25 }, (_, i) => {
    if (i === 12) return { free: true, text: '★ FREE', i }
    const sqIdx = i < 12 ? i : i - 1
    return { free: false, text: squares[sqIdx], i }
  })
)

const completionMsg = computed(() => {
  const n = bingo.completedLines.length
  if (n === 0) return ''
  if (n === 1) return '✦ Bingo! One line complete!'
  return `✦ BINGO! ${n} lines complete!`
})

function shareCard() {
  const rows = []
  for (let r = 0; r < 5; r++) {
    const row = []
    for (let c = 0; c < 5; c++) {
      const i = r * 5 + c
      row.push(bingo.isMarked(i) ? '★' : '·')
    }
    rows.push(row.join(' '))
  }
  const text = 'ACOTAR Reread Bingo\n' + rows.join('\n')
  navigator.clipboard.writeText(text).catch(() => {})
}
</script>

<style scoped>
main {
  max-width: 54rem;
  margin: 0 auto;
  padding: 2rem 1.5rem 5rem;
}

.bingo-banner {
  background: rgba(180, 142, 240, 0.18);
  border: 1px solid var(--amethyst);
  text-align: center;
  padding: 1rem;
  margin-bottom: 1.4rem;
  color: var(--amethyst);
  font-size: 1.1rem;
  letter-spacing: 0.05em;
}

.bingo-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.4rem;
}

.square {
  min-height: 90px;
  padding: 0.6rem 0.4rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(180, 142, 240, 0.2);
  font-size: 0.78rem;
  color: var(--mist);
  text-align: center;
  cursor: pointer;
  transition: background var(--dur-mid) var(--ease-out),
              border-color var(--dur-mid) var(--ease-out);
  line-height: 1.35;
  display: flex;
  align-items: center;
  justify-content: center;
}

.square:hover {
  border-color: var(--amethyst);
  background: rgba(180, 142, 240, 0.08);
}

.square.marked {
  background: rgba(180, 142, 240, 0.2);
  border-color: var(--amethyst);
  color: var(--moonwhite);
}

.square.free {
  background: rgba(201, 148, 58, 0.15);
  border-color: var(--burnished);
  color: var(--burnished);
  cursor: default;
  font-size: 0.9rem;
}

.bingo-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-action {
  padding: 0.65rem 1.4rem;
  background: transparent;
  border: 1px solid rgba(180, 142, 240, 0.4);
  color: var(--mist);
  font-family: var(--font-display);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  transition: border-color var(--dur-mid) var(--ease-out),
              color var(--dur-mid) var(--ease-out);
}

.btn-action:hover {
  border-color: var(--amethyst);
  color: var(--moonwhite);
}

.btn-action.gold {
  border-color: rgba(201, 148, 58, 0.5);
  color: var(--burnished);
}

.btn-action.gold:hover {
  border-color: var(--burnished);
}
</style>
