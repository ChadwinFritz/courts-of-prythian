<template>
  <HeroSection
    title="Theories & Rereads"
    eyebrow="The Chamber of Whispers"
    lead="Foreshadowing, fan theories, and the oldest folklore in Prythian."
  />

  <main>
    <!-- Section 1: Foreshadowing -->
    <section>
      <span class="eyebrow">Hidden in Plain Sight</span>
      <h2>The foreshadowing you missed the first time</h2>
      <div class="card-grid">
        <div v-for="item in foreshadowing" :key="item.title" class="fore-card">
          <h3>{{ item.title }}</h3>
          <p class="fore-text">{{ item.text }}</p>
          <p class="mission"><em>Mission: {{ item.mission }}</em></p>
        </div>
      </div>
    </section>

    <!-- Section 2: Theories -->
    <section>
      <span class="eyebrow">Case Files</span>
      <h2>The great fan theories</h2>
      <div class="theory-list">
        <div v-for="t in theories" :key="t.id" class="theory-card">
          <div class="theory-head">
            <h3>{{ t.title }}</h3>
            <div class="heat" :title="`Heat level ${t.heat}/5`">
              <span v-for="n in 5" :key="n" class="heat-dot" :class="{ on: n <= t.heat }" />
            </div>
          </div>
          <div class="theory-body">
            <div class="side for">
              <strong>For:</strong>
              <p>{{ t.for }}</p>
            </div>
            <div class="side against">
              <strong>Against:</strong>
              <p>{{ t.against }}</p>
            </div>
          </div>
          <!-- Poll if available -->
          <div v-if="getPoll(t.id)" class="poll">
            <p class="poll-q">{{ getPoll(t.id).question }}</p>
            <div class="poll-btns">
              <button
                class="poll-btn"
                :class="{ voted: pollStore.vote(t.id) === 'a' }"
                :disabled="!!pollStore.vote(t.id)"
                @click="pollStore.cast(t.id, 'a')"
              >{{ getPoll(t.id).a }}</button>
              <button
                class="poll-btn"
                :class="{ voted: pollStore.vote(t.id) === 'b' }"
                :disabled="!!pollStore.vote(t.id)"
                @click="pollStore.cast(t.id, 'b')"
              >{{ getPoll(t.id).b }}</button>
            </div>
            <p v-if="pollStore.vote(t.id)" class="voted-msg">
              ✦ You voted: {{ pollStore.vote(t.id) === 'a' ? getPoll(t.id).a : getPoll(t.id).b }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Folklore -->
    <section>
      <span class="eyebrow">The Source Material</span>
      <h2>Folklore roots</h2>
      <div class="card-grid folk-grid">
        <div v-for="item in folklore" :key="item.title" class="folk-card">
          <h3>{{ item.title }}</h3>
          <p>{{ item.connection }}</p>
        </div>
      </div>
    </section>

    <!-- Section 4: Debates -->
    <section>
      <span class="eyebrow">The Fandom Weighs In</span>
      <h2>The great debates</h2>
      <div class="debate-list">
        <div v-for="d in debates" :key="d.title" class="debate-card">
          <h3>{{ d.title }}</h3>
          <div class="debate-sides">
            <div class="debate-side a">
              <strong>{{ d.sideA.label }}</strong>
              <p>{{ d.sideA.argument }}</p>
            </div>
            <div class="debate-side b">
              <strong>{{ d.sideB.label }}</strong>
              <p>{{ d.sideB.argument }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import { usePollsStore } from '../stores/polls'
import { foreshadowing, theories, folklore, debates, polls } from '../data/theories'
import { useGsap } from '../composables/useGsap'

const pollStore = usePollsStore()
const { stagger } = useGsap()

onMounted(() => stagger('.theory-card, .fore-card', { delay: 0.15 }))

function getPoll(theoryId) {
  return polls.find(p => p.id === theoryId) || null
}
</script>

<style scoped>
main { max-width: 68rem; margin: 0 auto; padding: 0 1.5rem 5rem; }
section { padding-top: 3.5rem; }
section > h2 { font-size: 1.9rem; margin: 0.3rem 0 1.4rem; }

/* Foreshadowing */
.card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.2rem; }
.fore-card { background: rgba(255,255,255,.03); border: 1px solid rgba(180,142,240,.2); border-left: 3px solid var(--amethyst); padding: 1.4rem; }
.fore-card h3 { font-size: 1.1rem; margin: 0 0 0.7rem; }
.fore-text { color: var(--mist); font-size: 0.96rem; margin-bottom: 0.6rem; }
.mission { font-size: 0.88rem; color: var(--burnished); margin: 0; }

/* Theories */
.theory-list { display: flex; flex-direction: column; gap: 1.4rem; }
.theory-card { background: rgba(255,255,255,.03); border: 1px solid rgba(180,142,240,.2); padding: 1.6rem; }
.theory-head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
.theory-head h3 { font-size: 1.2rem; margin: 0; }
.heat { display: flex; gap: 4px; }
.heat-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(180,142,240,.2); }
.heat-dot.on { background: var(--amethyst); }
.theory-body { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; margin-bottom: 1.2rem; }
@media (max-width: 600px) { .theory-body { grid-template-columns: 1fr; } }
.side { font-size: 0.94rem; }
.side strong { display: block; font-size: 0.6rem; font-family: var(--font-display); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.4rem; }
.side.for strong { color: var(--amethyst); }
.side.against strong { color: var(--burnished); }
.side p { color: var(--mist); margin: 0; }

/* Poll */
.poll { border-top: 1px solid rgba(180,142,240,.15); padding-top: 1rem; }
.poll-q { font-size: 0.95rem; font-style: italic; margin-bottom: 0.7rem; }
.poll-btns { display: flex; gap: 0.7rem; flex-wrap: wrap; }
.poll-btn { background: transparent; border: 1px solid rgba(180,142,240,.3); color: var(--mist); padding: 0.5rem 1rem; font-size: 0.9rem; cursor: pointer; transition: border-color var(--dur-mid) var(--ease-out), color var(--dur-mid) var(--ease-out); }
.poll-btn:hover:not(:disabled) { border-color: var(--amethyst); color: var(--moonwhite); }
.poll-btn:disabled { cursor: default; opacity: 0.7; }
.poll-btn.voted { border-color: var(--amethyst); color: var(--amethyst); }
.voted-msg { font-size: 0.88rem; color: var(--amethyst); margin-top: 0.5rem; }

/* Folklore */
.folk-card { background: rgba(255,255,255,.03); border: 1px solid rgba(180,142,240,.2); border-top: 2px solid var(--burnished); padding: 1.2rem 1.4rem; }
.folk-card h3 { font-size: 1rem; margin: 0 0 0.5rem; color: var(--burnished); }
.folk-card p { color: var(--mist); font-size: 0.94rem; margin: 0; }

/* Debates */
.debate-list { display: flex; flex-direction: column; gap: 1.4rem; }
.debate-card { background: rgba(255,255,255,.03); border: 1px solid rgba(180,142,240,.2); padding: 1.6rem; }
.debate-card h3 { font-size: 1.15rem; margin: 0 0 1rem; }
.debate-sides { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
@media (max-width: 600px) { .debate-sides { grid-template-columns: 1fr; } }
.debate-side { font-size: 0.94rem; }
.debate-side strong { display: block; font-family: var(--font-display); font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.5rem; }
.debate-side.a strong { color: var(--amethyst); }
.debate-side.b strong { color: var(--burnished); }
.debate-side p { color: var(--mist); margin: 0; }
</style>
