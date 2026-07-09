<template>
  <HeroSection
    title="Map of Prythian"
    eyebrow="The Chart"
    lead="Seven courts, the Wall, the mortal lands — tap a region for its story."
  />

  <main>
    <div class="map-layout">
      <div class="map-wrap">
        <svg
          viewBox="0 0 520 760"
          class="prythian-map"
          role="group"
          aria-label="Stylized map of Prythian with clickable courts"
        >
          <!-- Sky / sea background -->
          <defs>
            <radialGradient id="night-glow" cx="50%" cy="30%" r="55%">
              <stop offset="0%" stop-color="#2a2d6e" />
              <stop offset="100%" stop-color="#0d1020" />
            </radialGradient>
            <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <rect width="520" height="760" fill="url(#night-glow)" />

          <!-- Sea texture -->
          <circle cx="30" cy="420" r="1.5" fill="rgba(144,151,184,.25)" />
          <circle cx="490" cy="440" r="1.5" fill="rgba(144,151,184,.25)" />
          <circle cx="18" cy="210" r="1.2" fill="rgba(144,151,184,.18)" />
          <circle cx="500" cy="280" r="1" fill="rgba(144,151,184,.15)" />
          <circle cx="45" cy="310" r="1" fill="rgba(144,151,184,.15)" />
          <circle cx="480" cy="600" r="1.2" fill="rgba(144,151,184,.15)" />

          <!-- Night Court stars -->
          <circle cx="170" cy="80"  r="1.2" fill="rgba(232,200,119,.7)" />
          <circle cx="250" cy="55"  r="0.9" fill="rgba(232,200,119,.5)" />
          <circle cx="310" cy="90"  r="1"   fill="rgba(232,200,119,.6)" />
          <circle cx="360" cy="60"  r="0.8" fill="rgba(232,200,119,.45)" />
          <circle cx="200" cy="170" r="0.8" fill="rgba(232,200,119,.4)" />
          <circle cx="380" cy="150" r="0.9" fill="rgba(232,200,119,.4)" />

          <!-- Court regions -->
          <path
            v-for="court in COURTS"
            :key="court.id"
            :d="court.d"
            :fill="selected && selected.id === court.id ? court.activeFill : court.fill"
            :stroke="selected && selected.id === court.id ? court.accent : 'rgba(13,16,32,0.6)'"
            :stroke-width="selected && selected.id === court.id ? '2.5' : '1'"
            class="region"
            :class="{ active: selected && selected.id === court.id }"
            tabindex="0"
            role="button"
            :aria-label="court.name"
            @click="selectCourt(court)"
            @keyup.enter="selectCourt(court)"
          />

          <!-- Night Court: star of Velaris -->
          <path d="M210,120 l5,-15 5,15 15,5 -15,5 -5,15 -5,-15 -15,-5 Z" fill="#e8c877" opacity="0.9" />

          <!-- Illyrian mountains (Night Court) -->
          <path d="M290,145 l10,22 -20,0 Z M312,143 l11,24 -22,0 Z M335,145 l10,22 -20,0 Z" fill="rgba(58,65,128,0.8)" />

          <!-- Dawn Court: sunrise arc -->
          <path d="M338,270 a18,18 0 0 1 36,0 Z" fill="#f2d9a8" opacity="0.8" />

          <!-- Winter Court: snowflake -->
          <path d="M152,348 l0,26 M139,361 l26,0 M142,351 l18,18 M160,351 l-18,18"
            stroke="#daeef8" stroke-width="2.2" stroke-linecap="round" fill="none" />

          <!-- Autumn Court: flame -->
          <path d="M345,335 c7,9 18,9 18,22 c0,13 -11,19 -18,24 c-7,-5 -18,-11 -18,-24 c0,-13 11,-13 18,-22 Z"
            fill="#e8913f" opacity="0.9" />

          <!-- Summer Court: waves -->
          <path d="M128,436 q9,-7 18,0 q9,7 18,0 M128,450 q9,-7 18,0 q9,7 18,0"
            stroke="#7ec8e3" stroke-width="2.2" stroke-linecap="round" fill="none" />

          <!-- Spring Court: rose -->
          <path d="M272,518 c7,3 11,11 7,19 c-3,6 -12,7 -15,1 c-2,-4 2,-8 6,-6 c-3,-5 -2,-10 2,-14 Z"
            fill="#e8a0b4" opacity="0.9" />

          <!-- Mortal Lands: cottage -->
          <path d="M242,652 l11,0 0,-13 9,0 0,13 11,0 0,9 -31,0 Z" fill="#6b5f45" opacity="0.85" />

          <!-- Day Court: sun -->
          <circle cx="140" cy="258" r="10" fill="#f4e2ad" opacity="0.85" />

          <!-- Region labels -->
          <text x="215" y="138" fill="rgba(240,237,228,.85)" font-size="10" font-family="Georgia,serif" font-style="italic" text-anchor="middle" letter-spacing="0.5">Night</text>
          <text x="140" y="261" fill="rgba(30,20,10,.85)" font-size="8.5" font-family="Georgia,serif" text-anchor="middle">Day</text>
          <text x="350" y="274" fill="rgba(30,20,10,.85)" font-size="8.5" font-family="Georgia,serif" text-anchor="middle">Dawn</text>
          <text x="158" y="368" fill="rgba(30,20,10,.85)" font-size="8.5" font-family="Georgia,serif" text-anchor="middle">Winter</text>
          <text x="345" y="368" fill="rgba(240,237,228,.9)" font-size="8.5" font-family="Georgia,serif" text-anchor="middle">Autumn</text>
          <text x="158" y="458" fill="rgba(240,237,228,.9)" font-size="8.5" font-family="Georgia,serif" text-anchor="middle">Summer</text>
          <text x="272" y="544" fill="rgba(240,237,228,.9)" font-size="8.5" font-family="Georgia,serif" text-anchor="middle">Spring</text>
          <text x="280" y="580" fill="rgba(240,237,228,.75)" font-size="7.5" font-family="Georgia,serif" text-anchor="middle" letter-spacing="0.3">The Wall</text>
          <text x="272" y="672" fill="rgba(240,237,228,.8)" font-size="8.5" font-family="Georgia,serif" text-anchor="middle">Mortal Lands</text>
        </svg>
      </div>

      <div class="map-info" :class="{ active: selected }">
        <template v-if="selected">
          <div class="info-accent-bar" :style="{ background: selected.accent }" />
          <div class="info-kind">{{ selected.kind }}</div>
          <h2>{{ selected.name }}</h2>
          <p class="info-desc">{{ selected.description }}</p>
          <p class="info-ruler">{{ selected.ruler }}</p>
          <button class="close-btn" @click="selected = null">Dismiss ✕</button>
        </template>
        <template v-else>
          <div class="map-placeholder-wrap">
            <div class="compass">✦</div>
            <p class="map-placeholder">Tap any region of the map to read its story.</p>
            <p class="map-hint">Geography approximate, magic guaranteed.</p>
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import { useGsap } from '../composables/useGsap'

const { stagger } = useGsap()
onMounted(() => stagger('.region', { delay: 0.08 }))

const COURTS = [
  {
    id: 'p-night',
    name: 'The Night Court',
    kind: 'Solar Court · The North',
    ruler: '✦ Ruled by Rhysand — with Feyre, the first High Lady, at his side.',
    description: "The most feared court in Prythian — and its best-kept secret. Beyond the public cruelty of the Hewn City lies Velaris, the City of Starlight, hidden five thousand years; above it rise the Illyrian mountains and sacred Ramiel, where the Blood Rite ends. Home of the Inner Circle, Starfall, and the series' heart from ACOMAF onward.",
    d: 'M120,42 C210,12 330,16 398,50 C450,80 465,145 452,205 C400,230 300,238 240,232 C180,226 120,215 95,205 C82,145 84,75 120,42 Z',
    fill: '#1e2156',
    activeFill: '#272e78',
    accent: '#b48ef0',
  },
  {
    id: 'p-day',
    name: 'The Day Court',
    kind: 'Solar Court · The Rising Light',
    ruler: "✦ Ruled by Helion Spell-Cleaver, owner of Prythian's best gossip and worst-kept secret.",
    description: "A land of a thousand libraries, spell-cleaving scholars, and blinding white palaces. Its High Lord can shatter enchantments no one else can touch — a talent one particular red-haired Autumn exile mysteriously shares. Key scenes: the High Lords' meeting in ACOWAR.",
    d: 'M95,208 C130,220 200,230 240,234 L235,300 C180,300 130,292 98,282 C90,258 90,232 95,208 Z',
    fill: '#b8892a',
    activeFill: '#d4a030',
    accent: '#e8c877',
  },
  {
    id: 'p-dawn',
    name: 'The Dawn Court',
    kind: 'Solar Court · The Healers',
    ruler: '✦ Ruled by Thesan, the quiet mender of the seven.',
    description: 'Palaces at the edge of sunrise, famed for healers and clever inventions. Its ruler is among the gentler High Lords — his healers helped mend more than one broken wing the Night Court holds dear. Appears at Under the Mountain, the war councils, and the final battle.',
    d: 'M240,234 C310,238 400,230 452,208 C458,232 458,258 450,282 C400,296 300,302 235,300 Z',
    fill: '#a86880',
    activeFill: '#c07a94',
    accent: '#e8b0c0',
  },
  {
    id: 'p-winter',
    name: 'The Winter Court',
    kind: 'Seasonal Court · The Still North-West',
    ruler: '✦ Ruled by Kallias, with Viviane — the friendship Mor treasures.',
    description: "Endless snows, frozen lakes, and a warmth its ice never touches. Winter suffered horrifically under Amarantha — its children among her cruelest crimes — and rose anyway to fight beside the alliance in ACOWAR. Also home to the series' most beloved married High Lord and Lady.",
    d: 'M98,284 C150,294 200,300 235,302 L232,398 C180,400 130,392 96,380 C82,348 86,314 98,284 Z',
    fill: '#5a82a8',
    activeFill: '#6a96c0',
    accent: '#b9cee3',
  },
  {
    id: 'p-autumn',
    name: 'The Autumn Court',
    kind: 'Seasonal Court · The Burning East',
    ruler: "✦ Ruled (for now) by Beron Vanserra. The fandom is counting his days.",
    description: "Forever-turning leaves, fire magic, and the series' most poisonous family tree. Beron's court is a den of scheming sons — one exiled (Lucien), one playing the longest game in Prythian (Eris), and a Lady whose quiet love story may be the key to both. Fire-hearted and dangerous in every book.",
    d: 'M235,302 C305,304 400,296 450,284 C462,316 460,350 446,382 C395,398 300,402 232,398 Z',
    fill: '#943d1a',
    activeFill: '#b04820',
    accent: '#e0913f',
  },
  {
    id: 'p-summer',
    name: 'The Summer Court',
    kind: 'Seasonal Court · The Shining Coast',
    ruler: '✦ Ruled by Tarquin, the most open heart among the High Lords.',
    description: "Turquoise harbors, pearl palaces, the shining city of Adriata. Its young High Lord inherited his title Under the Mountain and still chose openness over vengeance — even after a certain High Lady stole a certain magical book from his treasury in ACOMAF. There's still a blood ruby about that.",
    d: 'M96,382 C150,394 200,400 232,400 L230,486 C180,490 135,482 100,470 C84,442 86,410 96,382 Z',
    fill: '#1e5a82',
    activeFill: '#24699a',
    accent: '#7ec8e3',
  },
  {
    id: 'p-spring',
    name: 'The Spring Court',
    kind: 'Seasonal Court · The Threshold',
    ruler: '✦ Ruled by Tamlin, whose story is not finished.',
    description: "Eternal blossom, rolling green, the manor of the masks — where the whole story begins. Feyre's prison, then her home, then the court she dismantles from within in ACOWAR. Now nearly empty: a beast alone in a ruined manor, the series' most haunting open door.",
    d: 'M100,472 C160,486 200,490 230,488 C300,492 395,486 446,384 C462,430 458,470 440,510 C380,560 320,572 270,574 C210,576 150,560 118,530 C106,512 100,492 100,472 Z',
    fill: '#2a5c38',
    activeFill: '#336e44',
    accent: '#7ec897',
  },
  {
    id: 'p-wall',
    name: 'The Wall',
    kind: 'The Boundary',
    ruler: "✦ Guarded once by sentries like Andras — the wolf in the snow.",
    description: "An invisible barrier of magic that divided Fae from mortal for five hundred years after the Treaty — crossed by Feyre's arrow in book one and shattered by the Cauldron in book three. Its fall remade the world's map and set up everything still to come.",
    d: 'M118,532 C170,562 230,578 280,576 C330,574 390,558 438,514 L444,534 C395,580 330,596 278,598 C226,600 165,584 112,552 Z',
    fill: '#48486a',
    activeFill: '#565680',
    accent: '#9097b8',
  },
  {
    id: 'p-mortal',
    name: 'The Mortal Lands',
    kind: 'Below the Wall',
    ruler: '✦ Home of a huntress who changed two worlds.',
    description: "The cold sliver of the continent's edge where the Archeron sisters starved in a cottage, and where human queens sold their own kind. Now, after the wall's fall: Vassa, Jurian and Lucien hold court in a manor by the sea, guarding a fragile human future — the likeliest stage for coming books.",
    d: 'M112,554 C165,586 226,602 278,600 C330,598 396,582 444,536 C452,570 440,606 400,640 C360,676 330,662 300,702 C280,728 242,730 222,702 C198,670 162,656 134,618 C118,596 112,574 112,554 Z',
    fill: '#6a5a3a',
    activeFill: '#7e6c46',
    accent: '#c9943a',
  },
]

const selected = ref(null)

function selectCourt(court) {
  selected.value = selected.value?.id === court.id ? null : court
}
</script>

<style scoped>
main {
  max-width: 72rem;
  margin: 0 auto;
  padding: 2rem 1.5rem 5rem;
}

.map-layout {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2.4rem;
  align-items: start;
}

@media (max-width: 800px) {
  .map-layout {
    grid-template-columns: 1fr;
  }
}

.map-wrap {
  position: sticky;
  top: 1rem;
}

.prythian-map {
  width: 100%;
  max-width: 460px;
  display: block;
  filter: drop-shadow(0 8px 40px rgba(0, 0, 0, 0.6));
}

.region {
  cursor: pointer;
  transition:
    fill 200ms ease,
    stroke 200ms ease,
    filter 200ms ease;
  opacity: 0.92;
}

.region:hover {
  opacity: 1;
  filter: brightness(1.18);
}

.region:focus {
  outline: none;
  opacity: 1;
  filter: brightness(1.18);
}

.region.active {
  opacity: 1;
  filter: brightness(1.22);
}

/* ── Info panel ── */

.map-info {
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(180, 142, 240, 0.18);
  min-height: 260px;
  overflow: hidden;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.4);
  transition: border-color 300ms ease;
}

.map-info.active {
  border-color: rgba(180, 142, 240, 0.35);
}

.info-accent-bar {
  height: 3px;
  width: 100%;
}

.info-kind {
  font-family: var(--font-display);
  font-size: 0.58rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--burnished);
  padding: 1.4rem 1.6rem 0;
}

.map-info h2 {
  font-size: 1.6rem;
  font-style: italic;
  margin: 0.4rem 0 0.9rem;
  color: var(--moonwhite);
  padding: 0 1.6rem;
}

.info-desc {
  color: var(--mist);
  font-size: 0.95rem;
  line-height: 1.68;
  margin-bottom: 0.8rem;
  padding: 0 1.6rem;
}

.info-ruler {
  font-style: italic;
  color: var(--amethyst);
  font-size: 0.9rem;
  margin-bottom: 1.4rem;
  padding: 0 1.6rem;
}

.close-btn {
  display: block;
  margin: 0 1.6rem 1.6rem;
  background: transparent;
  border: 1px solid rgba(180, 142, 240, 0.28);
  color: var(--mist);
  padding: 0.4rem 1rem;
  font-size: 0.82rem;
  cursor: pointer;
  transition:
    border-color 200ms ease,
    color 200ms ease;
}

.close-btn:hover {
  border-color: var(--amethyst);
  color: var(--moonwhite);
}

.map-placeholder-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 260px;
  padding: 2rem;
  text-align: center;
  gap: 0.6rem;
}

.compass {
  font-size: 1.6rem;
  color: var(--burnished);
  opacity: 0.6;
  margin-bottom: 0.4rem;
}

.map-placeholder {
  color: var(--mist);
  font-style: italic;
  font-size: 0.98rem;
}

.map-hint {
  color: var(--mist);
  opacity: 0.5;
  font-size: 0.82rem;
}
</style>
