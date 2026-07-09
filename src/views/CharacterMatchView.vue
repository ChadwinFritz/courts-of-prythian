<!-- src/views/CharacterMatchView.vue -->
<template>
  <HeroSection
    title="Which Character Are You?"
    eyebrow="The Mirror"
    lead="Eight questions, six possible souls. The Ouroboros is kinder than the mirror — but no less honest."
  />

  <main>
    <!-- Start panel -->
    <div v-if="!started && !finished" class="start-panel">
      <p>Answer honestly — the mirror knows.</p>
      <button class="btn-primary" @click="started = true">Begin</button>
    </div>

    <!-- Quiz panel -->
    <template v-if="started && !finished">
      <div class="progress-bar">
        <div class="fill" :style="{ width: ((step + 1) / QS.length * 100) + '%' }" />
      </div>
      <div class="q-num">Question {{ step + 1 }} of {{ QS.length }}</div>
      <p class="q-text">{{ QS[step].q }}</p>
      <div class="opts">
        <button
          v-for="([label, key], i) in shuffledOptions"
          :key="i"
          class="opt"
          @click="choose(key)"
        >
          {{ label }}
        </button>
      </div>
    </template>

    <!-- Result panel -->
    <div v-if="finished && result" class="result">
      <div class="result-glyph">{{ result.g }}</div>
      <h2>You are {{ result.n }}</h2>
      <p class="kin">{{ result.kin }}</p>
      <p class="desc">{{ result.d }}</p>
      <button class="btn-retry" @click="restart">Take it again</button>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import HeroSection from '../components/HeroSection.vue'

const QS = [
  {
    q: "Someone you love is in danger. Your first instinct?",
    o: [
      ["Go myself — quietly, immediately, whatever it costs", "F"],
      ["Plan three moves ahead, then strike where it hurts most", "R"],
      ["Become the wall between them and the world. Try me.", "N"],
      ["Charge in loud, first, and take the hit meant for them", "C"],
      ["Get everyone laughing and safe, then handle it in the dark", "M"],
      ["Notice the thing everyone else missed — and act on it", "E"],
    ],
  },
  {
    q: "What would you sacrifice, if it came to it?",
    o: [
      ["My own life — I've made that trade before", "F"],
      ["My reputation. Let them think the worst of me.", "R"],
      ["My power, if it saves my family", "N"],
      ["My place, my rank, my wings — but never my people", "C"],
      ["My comfort — I'll carry the hard truth so others don't", "M"],
      ["My quiet. I'll step into the storm if I'm needed", "E"],
    ],
  },
  {
    q: "How do you handle conflict?",
    o: [
      ["Head on, even when I'm terrified", "F"],
      ["Smile, deflect, and win the war they didn't know we were fighting", "R"],
      ["Say the sharp true thing everyone's avoiding", "N"],
      ["Loudly. Then hug it out. Then spar about it.", "C"],
      ["Bring wine, name the feeling, refuse to let it fester", "M"],
      ["Go quiet, watch closely, and forgive more than I should", "E"],
    ],
  },
  {
    q: "Your idea of home is…",
    o: [
      ["Somewhere I chose — with paint on the walls", "F"],
      ["Wherever my people are safe and laughing too loudly", "R"],
      ["A door I control, and one or two people allowed past it", "N"],
      ["A crowded table with extra chairs, always", "C"],
      ["A party that never quite ends, full of chosen family", "M"],
      ["A garden — something alive that I helped grow", "E"],
    ],
  },
  {
    q: "Your flaw, honestly?",
    o: [
      ["I run toward danger before I finish the thought", "F"],
      ["I carry everything alone and call it protecting people", "R"],
      ["My armor cuts the people trying to hold me", "N"],
      ["I joke at the exact wrong moment", "C"],
      ["I keep my deepest truth for last", "M"],
      ["People underestimate me because I let them", "E"],
    ],
  },
  {
    q: "Pick a small joy.",
    o: [
      ["An afternoon with paint and no one needing me", "F"],
      ["Watching my favorite people shine — arranging it, secretly", "R"],
      ["A book, silence, and absolutely no visitors", "N"],
      ["Winning. At anything. Snowballs count.", "C"],
      ["A new dress and old friends", "M"],
      ["Bread rising. Seeds sprouting. Slow miracles.", "E"],
    ],
  },
  {
    q: "What do people get wrong about you?",
    o: [
      ["That I'm fearless. I'm just stubborn about love.", "F"],
      ["Nearly everything — by my own design", "R"],
      ["That cold means empty. It means guarded.", "N"],
      ["That loud means simple", "C"],
      ["That joy means life has been easy on me", "M"],
      ["That gentle means weak", "E"],
    ],
  },
  {
    q: "Choose the words that feel like yours.",
    o: [
      ["I will not be caged again", "F"],
      ["To the people who see behind the mask", "R"],
      ["I am the rock the wave breaks against", "N"],
      ["Together — or not at all", "C"],
      ["Choose joy anyway", "M"],
      ["I saw it coming. I always do.", "E"],
    ],
  },
]

const RES = {
  F: {
    g: "🎨",
    n: "Feyre Archeron",
    kin: "Your kindred spirit: Rhysand — the one who hands you power instead of protection",
    d: "You're the one who walks into the mountain. Loyal past reason, braver than you feel, and quietly artistic — you rebuild yourself as many times as life demands and come back wanting to paint about it. You don't need rescuing; you need someone who knows better than to try.",
  },
  R: {
    g: "✦",
    n: "Rhysand",
    kin: "Your kindred spirit: Feyre — the one person who sees the whole hand you're playing",
    d: "You play the long game so the people you love never have to. Charm out front, chess in the back, and an ocean of feeling underneath that maybe two people ever get to see. Your flaw and your glory are the same thing: you'd carry it all alone. Jodi-Lee's favorite, and the mirror sees why.",
  },
  N: {
    g: "🔥",
    n: "Nesta Archeron",
    kin: "Your kindred spirit: Cassian — the one who meets your fire without flinching",
    d: "You are the blade and the forge both. The world calls you difficult because you refuse to shrink, and the people who earn your loyalty get something unbreakable. Your love language is showing up armed for the people you'd never admit you'd die for. You would win the Blood Rite.",
  },
  C: {
    g: "⚔",
    n: "Cassian",
    kin: "Your kindred spirit: Nesta — the one worth every one of the ten thousand steps",
    d: "Big heart, bigger loyalty, zero subtlety — and that's your superpower. You build family wherever you stand and defend it with everything, and you know the secret the clever ones miss: showing up, again and again, is the whole game. You'd absolutely turn this website into a competition.",
  },
  M: {
    g: "🌞",
    n: "Morrigan (Mor)",
    kin: "Your kindred spirit: the whole Inner Circle — you're the thread that keeps it woven",
    d: "You survived what should have broken you and answered it with red dresses and radical joy. You feel truth like a sixth sense, keep your deepest self for the worthy, and make every room warmer just by walking into it. Choosing happiness this fiercely is not softness — it's defiance.",
  },
  E: {
    g: "🌸",
    n: "Elain Archeron",
    kin: "Your kindred spirit: the House of Wind — it would adore you, and bake with you",
    d: "Everyone mistakes your quiet for fragility, which is exactly how you get to be ten steps ahead. You notice everything, tend what's broken until it blooms, and when the moment truly demands it — you're the one holding the knife nobody saw coming. Your story is the one everyone's waiting for.",
  },
}

const step = ref(0)
const scores = ref({ F: 0, R: 0, N: 0, C: 0, M: 0, E: 0 })
const finished = ref(false)
const started = ref(false)

// shuffledOptions re-computes on every step change — intentional
const shuffledOptions = computed(() => {
  if (!started.value) return []
  const opts = [...QS[step.value].o]
  return opts.sort(() => Math.random() - 0.5)
})

function choose(key) {
  scores.value[key]++
  if (step.value < QS.length - 1) {
    step.value++
  } else {
    finished.value = true
  }
}

const result = computed(() => {
  if (!finished.value) return null
  const winner = Object.entries(scores.value).sort((a, b) => b[1] - a[1])[0][0]
  return RES[winner]
})

function restart() {
  step.value = 0
  scores.value = { F: 0, R: 0, N: 0, C: 0, M: 0, E: 0 }
  finished.value = false
  started.value = true
}
</script>

<style scoped>
main {
  max-width: 46rem;
  margin: 0 auto;
  padding: 2rem 1.5rem 5rem;
}

/* START PANEL */
.start-panel {
  text-align: center;
  padding: 4rem 1rem;
}

.start-panel p {
  color: var(--mist);
  font-style: italic;
  margin-bottom: 1.8rem;
  font-size: 1.1rem;
}

.btn-primary {
  padding: 0.8rem 2.2rem;
  background: var(--amethyst);
  color: var(--moonwhite);
  border: none;
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  cursor: pointer;
  transition: opacity var(--dur-mid) var(--ease-out);
}

.btn-primary:hover {
  opacity: 0.85;
}

/* PROGRESS BAR */
.progress-bar {
  height: 3px;
  background: rgba(180, 142, 240, 0.18);
  border-radius: 2px;
  margin-bottom: 2rem;
}

.fill {
  height: 100%;
  background: var(--amethyst);
  border-radius: 2px;
  transition: width 0.4s ease;
}

/* QUESTION */
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

/* OPTIONS */
.opts {
  display: grid;
  gap: 0.7rem;
}

.opt {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(180, 142, 240, 0.25);
  padding: 0.9rem 1.2rem;
  text-align: left;
  font-size: 1rem;
  color: var(--moonwhite);
  cursor: pointer;
  transition:
    border-color var(--dur-mid) var(--ease-out),
    background var(--dur-mid) var(--ease-out);
}

.opt:hover {
  border-color: var(--amethyst);
  background: rgba(180, 142, 240, 0.1);
}

/* RESULT */
.result {
  text-align: center;
  padding: 2.5rem 1rem;
}

.result-glyph {
  font-size: 3.5rem;
  margin-bottom: 0.6rem;
}

.result h2 {
  font-size: 2.2rem;
  font-style: italic;
  margin: 0 0 0.6rem;
}

.kin {
  font-family: var(--font-display);
  font-size: 0.64rem;
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
  line-height: 1.65;
}

.btn-retry {
  padding: 0.65rem 1.8rem;
  background: transparent;
  border: 1px solid var(--amethyst);
  color: var(--amethyst);
  font-family: var(--font-display);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background var(--dur-mid) var(--ease-out),
    color var(--dur-mid) var(--ease-out);
}

.btn-retry:hover {
  background: var(--amethyst);
  color: var(--moonwhite);
}
</style>
