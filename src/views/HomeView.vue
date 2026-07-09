<!-- src/views/HomeView.vue -->
<template>
  <HeroSection title="The Courts of Prythian" eyebrow="A gift made of starlight">
    <p class="lead">Five books. One family. A city of starlight — and a whole world built for one very special reader. Choose a door, dreamer.</p>
    <em class="mood">{{ mood }}</em>
  </HeroSection>

  <main>
    <section>
      <span class="eyebrow">Choose Your Door</span>
      <h2>The experience</h2>
      <p class="sub">Everything in this gift, gathered in one entrance hall.</p>
      <div class="doors">
        <RouterLink v-for="door in doors" :key="door.to"
          :to="door.to" class="door" :class="{ special: door.special }">
          <SignatureStars />
          <span class="k">{{ door.label }}</span>
          <h3>{{ door.title }}</h3>
          <p>{{ door.desc }}</p>
          <span class="go">{{ door.cta }} →</span>
        </RouterLink>
      </div>
    </section>

    <section>
      <span class="eyebrow">The Library</span>
      <h2>The five books</h2>
      <div class="shelf">
        <RouterLink v-for="id in [1,2,3,4,5]" :key="id"
          :to="`/book/${id}`" class="book" :class="`b${id}`">
          <span class="num">Book {{ courts[id].numeral }}</span>
          <h3>
            {{ courts[id].title }}
            <span v-if="badges.has(id)" class="badge" :style="{ color: courts[id].accent }">
              {{ SIGILS[id] }}
            </span>
          </h3>
        </RouterLink>
      </div>
    </section>
  </main>

  <footer>
    <p>To the stars who listen — and the reader who found her way here.</p>
    <small>✦ There are words that open hidden doors. The footer won't tell you what they are.</small>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import HeroSection from '../components/HeroSection.vue'
import SignatureStars from '../components/SignatureStars.vue'
import { useBadgesStore } from '../stores/badges'
import { useGsap } from '../composables/useGsap'
import { courts } from '../data/courts'

const badges = useBadgesStore()
const { stagger } = useGsap()

const SIGILS = { 1: '✿', 2: '✦', 3: '⚔', 4: '❄', 5: '✵' }

const doors = [
  { to: '/journeys',   label: 'The Gallery',    title: 'Character Journeys', desc: 'Follow Feyre, Rhysand, Nesta and the whole Inner Circle as they grow, break, and become — book by book.', cta: 'Walk the gallery' },
  { to: '/quiz',       label: 'The Trial',      title: 'Trivia Gauntlet',    desc: 'Five rounds, one per book, 25 questions. Amarantha had three trials; we have opinions about your score.', cta: 'Face the gauntlet' },
  { to: '/court-quiz', label: 'The Sorting',    title: 'Which Court Is Yours?', desc: 'Seven courts, seven questions. Answer honestly — the Cauldron knows if you\'re fishing for Night Court.', cta: 'Be sorted' },
  { to: '/games',      label: 'The Games',      title: 'Starfall Games',     desc: 'A sigil memory-match, guess-the-character, Would You Rather, and the Suriel\'s Riddles.', cta: 'Play' },
  { to: '/theories',   label: 'The Whispers',   title: 'Theories & Rereads', desc: 'Hidden foreshadowing, the great fan theories, the fairy tales under the story.', cta: 'Enter the chamber' },
  { to: '/match',      label: 'The Mirror',     title: 'Which Character Are You?', desc: 'Eight honest questions, six possible souls.', cta: 'Look in the mirror' },
  { to: '/scenes',     label: 'The Gallery',    title: 'Scenes of Prythian', desc: 'Six settings from the books — illustrated.', cta: 'See the scenes' },
  { to: '/map',        label: 'The Chart',      title: 'Map of Prythian',    desc: 'All seven courts, the Wall, the mortal lands — tap a court for its lore.', cta: 'Unroll the map' },
  { to: '/bingo',      label: 'The Rite',       title: 'Reread Bingo',       desc: 'Twenty-four squares of things that will absolutely happen on your reread.', cta: 'Mark your card' },
  { to: '/starfall',   label: '★ The Starfall', title: 'For Jodi-Lee',       desc: 'The Night Court gathered for you. A letter from Rhysand, and messages from the whole family.', cta: 'Open your gift', special: true },
]

// Court-mood greeting: time of day + real-world season
const MOODS = {
  'deep-night': ['Reading past midnight again? The Night Court approves.', 'Even Azriel\'s shadows are asleep. Welcome, night owl.'],
  morning:      ['Morning, dreamer. Cassian has already trained. You don\'t have to.', 'The courts wake slowly. So may you.'],
  afternoon:    ['Afternoon, dreamer. The library beneath the mountain is open.', 'Somewhere in Prythian it is always teatime with the Suriel.'],
  evening:      ['Good evening — Velaris is at its best after dark.', 'Evening, dreamer. Starfall weather, if you ask the sky.'],
}
const SEASONAL = {
  spring: 'Petals on the wind tonight — the Spring Court sends its regards.',
  summer: 'Warm tides and long light — Adriata weather, Tarquin would say.',
  autumn: 'The leaves are turning — mind the foxes of the Autumn Court.',
  winter: 'Frost on the glass — Winter Solstice feeling, Feyre\'s favourite.',
}
function buildMood() {
  const h  = new Date().getHours()
  const mo = new Date().getMonth()
  const tod    = h < 5 ? 'deep-night' : h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening'
  const season = mo >= 2 && mo <= 4 ? 'spring' : mo >= 5 && mo <= 7 ? 'summer' : mo >= 8 && mo <= 10 ? 'autumn' : 'winter'
  const pool = [...MOODS[tod], SEASONAL[season]]
  return pool[Math.floor(Math.random() * pool.length)]
}

const mood = ref(buildMood())

onMounted(() => stagger('.door', { delay: 0.2 }))
</script>

<style scoped>
main   { max-width: 64rem; margin: 0 auto; padding: 0 1.5rem 5rem; }
section { padding-top: 3.6rem; }
section > h2 { font-size: 1.9rem; margin: 0.3rem 0 0.4rem; }
.sub   { color: var(--mist); max-width: 40rem; margin-bottom: 1.8rem; }
.lead  { max-width: 36rem; margin: 1.2rem auto 0; color: var(--mist); font-style: italic; font-size: 1.12rem; }
.mood  { display: block; margin-top: 0.6rem; color: var(--burnished); }

.doors { display: grid; grid-template-columns: repeat(auto-fill, minmax(255px, 1fr)); gap: 1.3rem; }
.door  {
  background: rgba(255,255,255,.03); border: 1px solid rgba(180,142,240,.25);
  padding: 1.5rem 1.4rem; display: block; position: relative; overflow: hidden; cursor: pointer;
  box-shadow: var(--shadow-card);
  transition: transform var(--dur-mid) var(--ease-out), box-shadow var(--dur-mid) ease, border-color var(--dur-mid) ease;
}
@media (prefers-reduced-motion: no-preference) {
  .door:hover { transform: translateY(-5px); box-shadow: var(--shadow-hover); border-color: var(--amethyst); }
}
.door.special { border-color: rgba(201,148,58,.55); }
@media (prefers-reduced-motion: no-preference) {
  .door.special { animation: aurora 4s ease-in-out infinite; }
  @keyframes aurora {
    0%,100% { box-shadow: 0 0 30px rgba(201,148,58,.1), var(--shadow-card); }
    50%      { box-shadow: 0 0 52px rgba(201,148,58,.26), 0 0 90px rgba(180,142,240,.16), var(--shadow-card); }
  }
}
.k  { font-family: var(--font-display); font-size: 0.6rem; letter-spacing: 0.26em; text-transform: uppercase; color: var(--amethyst); }
.door h3 { font-size: 1.45rem; margin: 0.35rem 0 0.4rem; }
.door p  { font-size: 0.96rem; color: var(--mist); }
.go { margin-top: 0.8rem; font-family: var(--font-display); font-size: 0.62rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--burnished); display: block; }

.shelf { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 1rem; }
.book  { display: block; padding: 1.2rem 1.1rem; border-top: 3px solid; cursor: pointer; transition: transform var(--dur-mid) ease; }
.book:hover { transform: translateY(-4px); }
.b1 { background: #22301f; border-color: #c96a80; }
.b2 { background: #181d40; border-color: #b48ef0; }
.b3 { background: #2c1c13; border-color: #d4602e; }
.b4 { background: #1c2f42; border-color: #a9c1da; }
.b5 { background: #22242e; border-color: #8fb0dd; }
.num { font-family: var(--font-display); font-size: 0.6rem; letter-spacing: 0.26em; text-transform: uppercase; opacity: 0.85; }
.book h3 { font-size: 1.2rem; margin-top: 0.3rem; line-height: 1.25; }
.badge { margin-left: 0.4rem; font-size: 1rem; }

footer { background: #06080e; color: var(--mist); text-align: center; padding: 2.4rem 1.5rem; font-style: italic; margin-top: 4rem; }
footer small { display: block; margin-top: 0.5rem; font-size: 0.85rem; opacity: 0.7; }
</style>
