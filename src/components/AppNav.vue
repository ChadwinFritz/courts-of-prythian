<!-- src/components/AppNav.vue -->
<template>
  <nav>
    <RouterLink to="/">✦ Home</RouterLink>
    <RouterLink v-for="b in 5" :key="b" :to="`/book/${b}`">Book {{ toRoman(b) }}</RouterLink>
    <RouterLink to="/journeys">Journeys</RouterLink>
    <RouterLink to="/quiz">Trivia</RouterLink>
    <RouterLink to="/court-quiz">Court Quiz</RouterLink>
    <RouterLink to="/games">Games</RouterLink>
    <RouterLink to="/scenes">Scenes</RouterLink>
    <RouterLink to="/map">Map</RouterLink>
    <RouterLink to="/bingo">Bingo</RouterLink>
    <RouterLink to="/match">Match</RouterLink>
    <RouterLink to="/theories">Whispers</RouterLink>
    <RouterLink v-if="eggs.hasAll" to="/echoes" class="echoes-link">✧ Echoes</RouterLink>
    <RouterLink to="/starfall" class="starfall-link">★ For Jodi-Lee</RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useEggsStore } from '../stores/eggs'
const eggs = useEggsStore()
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V']
const toRoman = (n) => ROMAN[n]
</script>

<style scoped>
nav {
  position:        sticky;
  top:             0;
  z-index:         var(--z-nav);
  background:      rgba(15, 11, 24, 0.92);
  backdrop-filter: blur(14px) saturate(180%);
  border-bottom:   1px solid rgba(180, 142, 240, 0.35);
  padding:         0.55rem 1rem;
  display:         flex;
  flex-wrap:       wrap;
  gap:             0.35rem 0.9rem;
  justify-content: center;
  font-family:     var(--font-display);
  font-size:       var(--text-xs);
  letter-spacing:  0.16em;
  text-transform:  uppercase;
}

nav a {
  color:           var(--mist);
  cursor:          pointer;
  display:         inline-flex;
  align-items:     center;
  min-height:      2.75rem;
  padding:         0 0.4rem;
  transition:      color var(--dur-mid) ease, text-shadow var(--dur-mid) ease;
}

nav a:hover,
nav a.router-link-active {
  color:       var(--burnished);
  text-shadow: 0 0 12px rgba(201, 148, 58, 0.55);
}

.echoes-link  { color: var(--amethyst); }
.starfall-link { color: var(--burnished); }
</style>
