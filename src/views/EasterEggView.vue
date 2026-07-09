<template>
  <HeroSection
    title="The Chamber of Echoes"
    eyebrow="Hidden"
    lead="Eight whispers hide in these pages — words that, when typed anywhere, make the site answer."
  />

  <main>
    <p class="count-label">{{ eggs.count }} / 8 whispers heard</p>

    <ul class="checklist">
      <li
        v-for="egg in EGGS"
        :key="egg.word"
        class="egg-item"
        :class="{ found: eggs.has(egg.word) }"
      >
        <span class="dot">{{ eggs.has(egg.word) ? '✦' : '✧' }}</span>
        <span class="hint-text">
          {{ eggs.has(egg.word) ? `"${egg.word}" — ${egg.hint}` : '· · · · · · ·' }}
        </span>
      </li>
    </ul>

    <div v-if="eggs.hasAll" class="final-message">
      <div class="seal">✦</div>
      <h2>The Inner Circle</h2>
      <p>So here is the last thing we have to say, from the whole Inner Circle, with nothing hidden behind it: this world was better the moment you walked into it — ours, and the real one. Keep reading past midnight. Keep loving things completely. Keep being exactly the kind of person secret rooms open for.</p>
      <p>The Chamber of Echoes is yours now. Nothing else is hidden. Everything else was always meant to be found.</p>
      <p class="sig">— Rhys, Feyre, Cassian, Nesta, Azriel, Mor, Amren, Elain, Lucien,<br>Gwyn, Emerie, the House, and one very smug baby ✦</p>
    </div>

    <div v-else class="hint-box">
      <p>Type the hidden words anywhere on the site — no input box needed. The site is always listening.</p>
      <p class="hint-sub">Try: a High Lord's name, a city of starlight, a night of falling stars…</p>
    </div>
  </main>
</template>

<script setup>
import HeroSection from '../components/HeroSection.vue'
import { useEggsStore } from '../stores/eggs'

const eggs = useEggsStore()

const EGGS = [
  { word: 'rhysand',  hint: 'The most feared name in Prythian — and her favorite.' },
  { word: 'jodi',     hint: 'The name the stars already know.' },
  { word: 'nyx',      hint: 'The smallest, newest star of the Night Court.' },
  { word: 'velaris',  hint: 'The city kept secret for five thousand years.' },
  { word: 'starfall', hint: 'The night the sky migrates.' },
  { word: 'cauldron', hint: 'The vessel that made the world — and two sisters.' },
  { word: 'mate',     hint: 'The word that reframes the entire story.' },
  { word: 'prythian', hint: 'The land itself, named aloud.' },
]
</script>

<style scoped>
main { max-width: 46rem; margin: 0 auto; padding: 2rem 1.5rem 5rem; }
.count-label { font-family: var(--font-display); font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--amethyst); margin-bottom: 1.6rem; }

.checklist { list-style: none; padding: 0; margin: 0 0 2.4rem; display: flex; flex-direction: column; gap: 0.6rem; }
.egg-item { display: flex; align-items: flex-start; gap: 0.8rem; padding: 0.85rem 1rem; background: rgba(255,255,255,.03); border: 1px solid rgba(180,142,240,.15); transition: border-color var(--dur-mid) var(--ease-out); }
.egg-item.found { border-color: rgba(180,142,240,.5); background: rgba(180,142,240,.08); }
.dot { color: var(--amethyst); font-size: 1.1rem; flex-shrink: 0; margin-top: 0.1rem; }
.hint-text { color: var(--mist); font-size: 0.97rem; }
.egg-item.found .hint-text { color: var(--moonwhite); }

.final-message { background: rgba(180,142,240,.1); border: 1px solid var(--amethyst); padding: 2.4rem 2rem; margin-bottom: 2rem; }
.seal { font-size: 2.4rem; text-align: center; color: var(--burnished); margin-bottom: 0.8rem; }
.final-message h2 { text-align: center; font-size: 1.8rem; font-style: italic; margin: 0 0 1.2rem; }
.final-message p { color: var(--mist); font-size: 1.05rem; margin-bottom: 0.9rem; line-height: 1.65; }
.sig { font-style: italic; color: var(--burnished); text-align: right; font-size: 0.95rem; }

.hint-box { background: rgba(255,255,255,.03); border: 1px solid rgba(180,142,240,.2); border-left: 3px solid var(--amethyst); padding: 1.2rem 1.4rem; }
.hint-box p { color: var(--mist); font-size: 0.96rem; margin: 0 0 0.4rem; }
.hint-sub { font-style: italic; font-size: 0.88rem; }
</style>
