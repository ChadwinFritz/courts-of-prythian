<template>
  <HeroSection
    title="Games of the Courts"
    eyebrow="Play"
    lead="Four enchantments to test your knowledge of Prythian."
  />
  <main>
    <!-- Game I: Memory Match -->
    <section class="game-section">
      <span class="eyebrow">Game I</span>
      <h2>Sigil Memory Match</h2>
      <p class="game-desc">Find all 8 court sigil pairs. Flips: {{ moves }}</p>
      <div v-if="matchWon" class="win-msg">✦ All sigils matched in {{ moves }} moves!</div>
      <div class="match-grid">
        <button
          v-for="(card, idx) in cards"
          :key="card.uid"
          class="mcard"
          :class="{ face: flipped.includes(idx) || matched.has(idx), win: matched.has(idx) }"
          @click="flipCard(idx)"
        >
          <span class="card-front">{{ card.symbol }}</span>
          <span class="card-back">✦</span>
        </button>
      </div>
      <button class="btn-reset" @click="initMatch">Shuffle &amp; restart</button>
    </section>

    <!-- Game II: Guess the Character -->
    <section class="game-section">
      <span class="eyebrow">Game II</span>
      <h2>Guess the Character</h2>
      <p class="game-desc">Clues appear one by one. Type a name and see if the shadows agree.</p>
      <div class="clue-box">
        <div
          v-for="(clue, i) in currentClue.clues"
          :key="i"
          class="clue"
          :class="{ hidden: i > clueIdx }"
        >
          {{ i <= clueIdx ? clue : '· · · · · · ·' }}
        </div>
      </div>
      <div class="guess-row">
        <button
          class="btn-sm"
          :disabled="clueIdx >= currentClue.clues.length - 1"
          @click="revealNextClue"
        >
          Reveal next clue
        </button>
        <button class="btn-sm" @click="guessRevealed = true">Reveal answer</button>
      </div>
      <div v-if="guessRevealed" class="reveal">{{ currentClue.character }}</div>
      <div v-if="guessResult" class="guess-result" :class="guessResult">
        {{ guessResult === 'correct' ? '✦ Correct!' : '✗ Not quite — try the next clue.' }}
      </div>
      <div class="guess-input-row">
        <input
          v-model="guessInput"
          placeholder="Type a character name…"
          class="guess-input"
          @keyup.enter="checkGuess"
        />
        <button class="btn-sm" @click="checkGuess">Guess</button>
      </div>
      <button class="btn-reset" @click="nextCharacter">Next character →</button>
    </section>

    <!-- Game III: Would You Rather -->
    <section class="game-section">
      <span class="eyebrow">Game III</span>
      <h2>Would You Rather</h2>
      <p class="game-desc">
        Dilemma {{ wyrIdx + 1 }} of {{ wouldYouRather.length }}. In-character verdict follows your pick.
      </p>
      <div class="wyr-grid">
        <button
          class="wyr-btn"
          :class="{ picked: wyrChoice === 'a' }"
          @click="pickWyr('a')"
        >
          {{ currentWyr.a }}
        </button>
        <span class="wyr-or">or</span>
        <button
          class="wyr-btn"
          :class="{ picked: wyrChoice === 'b' }"
          @click="pickWyr('b')"
        >
          {{ currentWyr.b }}
        </button>
      </div>
      <div v-if="wyrChoice" class="wyr-verdict">
        {{ wyrChoice === 'a' ? currentWyr.judgeA : currentWyr.judgeB }}
      </div>
      <button class="btn-reset" @click="nextWyr">Next dilemma →</button>
    </section>

    <!-- Game IV: Suriel's Riddles -->
    <section class="game-section">
      <span class="eyebrow">Game IV · The Suriel Speaks</span>
      <h2>Suriel's Riddles</h2>
      <p class="game-desc">
        Riddle {{ riddleIdx + 1 }} of {{ surielsRiddles.length }}. Solve it. Then see if you're worthy.
      </p>
      <blockquote class="riddle">{{ currentRiddle.riddle }}</blockquote>
      <button class="btn-sm" @click="riddleRevealed = !riddleRevealed">
        {{ riddleRevealed ? 'Hide answer' : 'Reveal answer' }}
      </button>
      <div v-if="riddleRevealed" class="riddle-answer">
        <strong>{{ currentRiddle.answer }}</strong>
        <em class="riddle-verdict">{{ currentRiddle.verdict }}</em>
      </div>
      <button class="btn-reset" @click="nextRiddle">Next riddle →</button>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import { sigils, characterClues, wouldYouRather, surielsRiddles } from '../data/games'
import { useGsap } from '../composables/useGsap'

const { stagger } = useGsap()

// ── Game I: Memory Match ─────────────────────────────────────────────────────

const cards = ref([])
const flipped = ref([])        // indices of currently face-up (unmatched) cards
const matched = ref(new Set())
const moves = ref(0)
const matchWon = computed(() => matched.value.size === 16)

function initMatch() {
  const deck = [...sigils, ...sigils].map((s, i) => ({ ...s, uid: i }))
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]
  }
  cards.value = deck
  flipped.value = []
  matched.value = new Set()
  moves.value = 0
}

function flipCard(idx) {
  if (matched.value.has(idx)) return
  if (flipped.value.includes(idx)) return
  if (flipped.value.length === 2) return
  flipped.value = [...flipped.value, idx]
  if (flipped.value.length === 2) {
    moves.value++
    const [a, b] = flipped.value
    if (cards.value[a].id === cards.value[b].id) {
      matched.value = new Set([...matched.value, a, b])
      flipped.value = []
    } else {
      setTimeout(() => { flipped.value = [] }, 900)
    }
  }
}

onMounted(() => {
  initMatch()
  stagger('.game-section', { delay: 0.1 })
})

// ── Game II: Guess the Character ─────────────────────────────────────────────

const guessIdx = ref(0)
const clueIdx = ref(0)
const guessInput = ref('')
const guessResult = ref(null)   // 'correct' | 'wrong' | null
const guessRevealed = ref(false)

const currentClue = computed(() => characterClues[guessIdx.value])

function revealNextClue() {
  if (clueIdx.value < currentClue.value.clues.length - 1) clueIdx.value++
}

function checkGuess() {
  const g = guessInput.value.trim().toLowerCase()
  const name = currentClue.value.character.toLowerCase()
  if (name.includes(g) || g.includes(name.split(' ')[0])) {
    guessResult.value = 'correct'
  } else {
    guessResult.value = 'wrong'
  }
}

function nextCharacter() {
  guessIdx.value = (guessIdx.value + 1) % characterClues.length
  clueIdx.value = 0
  guessInput.value = ''
  guessResult.value = null
  guessRevealed.value = false
}

// ── Game III: Would You Rather ───────────────────────────────────────────────

const wyrIdx = ref(0)
const wyrChoice = ref(null)   // 'a' | 'b' | null

const currentWyr = computed(() => wouldYouRather[wyrIdx.value])

function pickWyr(side) {
  wyrChoice.value = side
}

function nextWyr() {
  wyrIdx.value = (wyrIdx.value + 1) % wouldYouRather.length
  wyrChoice.value = null
}

// ── Game IV: Suriel's Riddles ────────────────────────────────────────────────

const riddleIdx = ref(0)
const riddleRevealed = ref(false)

const currentRiddle = computed(() => surielsRiddles[riddleIdx.value])

function nextRiddle() {
  riddleIdx.value = (riddleIdx.value + 1) % surielsRiddles.length
  riddleRevealed.value = false
}
</script>

<style scoped>
main {
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 1.5rem 5rem;
}

/* ── Section wrapper ── */
.game-section {
  padding: 3rem 0 2rem;
  border-bottom: 1px solid rgba(180, 142, 240, 0.15);
}

.game-section:last-child {
  border-bottom: none;
}

.game-section h2 {
  font-size: 1.9rem;
  margin: 0.3rem 0 0.5rem;
}

.game-desc {
  color: var(--mist);
  margin-bottom: 1.6rem;
}

.win-msg {
  background: rgba(180, 142, 240, 0.15);
  border: 1px solid var(--amethyst);
  padding: 0.8rem 1.2rem;
  margin-bottom: 1.2rem;
  text-align: center;
  color: var(--amethyst);
}

/* ── Memory Match ── */
.match-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.7rem;
  max-width: 38rem;
  margin-bottom: 1.2rem;
}

.mcard {
  aspect-ratio: 1;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(180, 142, 240, 0.25);
  font-size: 1.8rem;
  cursor: pointer;
  position: relative;
  transition: border-color var(--dur-mid) var(--ease-out),
              background var(--dur-mid) var(--ease-out);
}

.mcard .card-front {
  display: none;
}

.mcard .card-back {
  display: block;
}

.mcard.face .card-front {
  display: block;
}

.mcard.face .card-back {
  display: none;
}

.mcard.win {
  border-color: var(--burnished);
  background: rgba(201, 148, 58, 0.12);
}

/* ── Guess the Character ── */
.clue-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(180, 142, 240, 0.2);
  padding: 1.2rem 1.4rem;
  margin-bottom: 1rem;
}

.clue {
  color: var(--mist);
  font-style: italic;
  margin-bottom: 0.5rem;
}

.clue.hidden {
  opacity: 0.3;
}

.guess-row {
  display: flex;
  gap: 0.7rem;
  margin-bottom: 0.8rem;
  flex-wrap: wrap;
}

.reveal {
  font-size: 1.3rem;
  font-style: italic;
  color: var(--burnished);
  margin-bottom: 0.8rem;
}

.guess-result {
  padding: 0.6rem 1rem;
  margin-bottom: 0.8rem;
  font-size: 0.95rem;
}

.guess-result.correct {
  color: var(--correct);
  background: rgba(109, 191, 126, 0.12);
}

.guess-result.wrong {
  color: var(--wrong);
  background: rgba(192, 96, 96, 0.12);
}

.guess-input-row {
  display: flex;
  gap: 0.7rem;
  margin-bottom: 1rem;
}

.guess-input {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(180, 142, 240, 0.3);
  padding: 0.6rem 0.9rem;
  color: var(--moonwhite);
  font-size: 0.97rem;
  min-width: 0;
}

/* ── Would You Rather ── */
.wyr-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.wyr-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(180, 142, 240, 0.25);
  padding: 1.1rem 1.2rem;
  font-size: 1rem;
  color: var(--moonwhite);
  cursor: pointer;
  transition: border-color var(--dur-mid) var(--ease-out),
              background var(--dur-mid) var(--ease-out);
  text-align: center;
}

.wyr-btn:hover {
  border-color: var(--amethyst);
  background: rgba(180, 142, 240, 0.1);
}

.wyr-btn.picked {
  border-color: var(--burnished);
  background: rgba(201, 148, 58, 0.12);
}

.wyr-or {
  color: var(--mist);
  font-style: italic;
  text-align: center;
}

.wyr-verdict {
  background: rgba(255, 255, 255, 0.04);
  border-left: 2px solid var(--burnished);
  padding: 0.9rem 1.2rem;
  color: var(--mist);
  font-style: italic;
  margin-bottom: 1rem;
}

/* ── Suriel's Riddles ── */
.riddle {
  border-left: 2px solid var(--amethyst);
  padding: 1rem 1.4rem;
  margin: 0 0 1.2rem;
  font-size: 1.15rem;
  font-style: italic;
  color: var(--moonwhite);
}

.riddle-answer {
  margin-top: 1rem;
  padding: 1rem 1.2rem;
  background: rgba(255, 255, 255, 0.04);
  margin-bottom: 1rem;
}

.riddle-answer strong {
  display: block;
  font-size: 1.2rem;
  color: var(--burnished);
  margin-bottom: 0.4rem;
}

.riddle-verdict {
  display: block;
  color: var(--mist);
  font-size: 0.95rem;
}

/* ── Shared buttons ── */
.btn-sm {
  background: transparent;
  border: 1px solid rgba(180, 142, 240, 0.4);
  color: var(--amethyst);
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: border-color var(--dur-mid) var(--ease-out);
}

.btn-sm:hover:not(:disabled) {
  border-color: var(--amethyst);
}

.btn-sm:disabled {
  opacity: 0.4;
  cursor: default;
}

.btn-reset {
  display: block;
  margin-top: 1.2rem;
  background: transparent;
  border: 1px solid rgba(180, 142, 240, 0.3);
  color: var(--mist);
  padding: 0.55rem 1.2rem;
  font-size: 0.88rem;
  cursor: pointer;
  transition: border-color var(--dur-mid) var(--ease-out),
              color var(--dur-mid) var(--ease-out);
}

.btn-reset:hover {
  border-color: var(--amethyst);
  color: var(--moonwhite);
}
</style>
