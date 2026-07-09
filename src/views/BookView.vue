<!-- src/views/BookView.vue -->
<template>
  <div :style="courtVars">
    <CourtHero :bookId="id" />

    <main>
      <section class="summary-section">
        <span class="eyebrow">The Story</span>
        <h2>What happens</h2>
        <p class="summary">{{ bookData.summary }}</p>
      </section>

      <section>
        <span class="eyebrow">Dramatis Personae</span>
        <h2>The characters</h2>
        <div class="card-grid">
          <div v-for="char in bookData.characters" :key="char.name" class="card">
            <h3>{{ char.name }}</h3>
            <div class="role">{{ char.role }}</div>
            <p>{{ char.description }}</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="book-footer">
      <RouterLink v-if="nextId" :to="`/book/${nextId}`" class="next-door">
        {{ courts[nextId]?.title }} →
      </RouterLink>
      <RouterLink v-else to="/starfall" class="next-door gold">
        ★ Open Your Gift →
      </RouterLink>
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import CourtHero from '../components/CourtHero.vue'
import { useBadgesStore } from '../stores/badges'
import { useToast } from '../composables/useToast'
import { useGsap } from '../composables/useGsap'
import { courts } from '../data/courts'
import { books } from '../data/books'

const route  = useRoute()
const badges = useBadgesStore()
const { say } = useToast()
const { stagger } = useGsap()

const id      = computed(() => Number(route.params.id))
const nextId  = computed(() => id.value < 5 ? id.value + 1 : null)
const court   = computed(() => courts[id.value])
const bookData = computed(() => books[id.value])

const courtVars = computed(() => ({
  '--court-accent': court.value.accent,
  '--court-gold':   court.value.gold,
  '--court-bg':     court.value.bg,
}))

// Triple-tap constellation to earn badge
let taps = 0; let tapTimer = null
function onConstellationClick() {
  taps++
  clearTimeout(tapTimer)
  tapTimer = setTimeout(() => { taps = 0 }, 1400)
  if (taps === 3) {
    taps = 0
    if (!badges.has(id.value)) {
      badges.collect(id.value)
      const names = { 1:'✿ the Rose of Spring', 2:'✦ the Star of Velaris', 3:'⚔ the Blade of the War', 4:'❄ the Solstice Frost', 5:'✵ the Silver Flame' }
      say(`✦ Hidden sigil found — ${names[id.value]} now glows on the library shelf. (${badges.count}/5 sigils)`)
    } else {
      say('✦ You already hold this sigil.')
    }
  }
}

onMounted(() => {
  stagger('.card', { delay: 0.3 })
  // Attach constellation click handler after mount
  const con = document.querySelector('.hero-constellation')
  if (con) con.addEventListener('click', onConstellationClick)
})
</script>

<style scoped>
main { max-width: 60rem; margin: 0 auto; padding: 2.5rem 1.5rem 5rem; }
.summary-section { margin-bottom: 3rem; }
.summary { font-size: 1.1rem; max-width: 52rem; }
.card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.3rem; margin-top: 1.8rem; }
.card {
  background: rgba(255,255,255,.03); border: 1px solid rgba(180,142,240,.2);
  padding: 1.4rem; cursor: default; box-shadow: var(--shadow-card);
  transition: transform var(--dur-mid) ease, box-shadow var(--dur-mid) ease;
}
.card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); }
.card h3 { font-size: 1.3rem; margin-bottom: 0.2rem; }
.role { font-style: italic; color: var(--mist); font-size: 0.9rem; margin-bottom: 0.7rem; }
.book-footer { text-align: center; padding: 3rem 1.5rem; border-top: 1px solid rgba(180,142,240,.15); }
.next-door { font-family: var(--font-display); font-size: 0.75rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--amethyst); cursor: pointer; }
.next-door.gold { color: var(--burnished); }
</style>
