// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import { useEggsStore } from '../stores/eggs'

const routes = [
  { path: '/',           component: () => import('../views/HomeView.vue') },
  { path: '/book/:id',   component: () => import('../views/BookView.vue') },
  { path: '/journeys',   component: () => import('../views/CharacterJourneysView.vue') },
  { path: '/quiz',       component: () => import('../views/QuizView.vue') },
  { path: '/court-quiz', component: () => import('../views/CourtQuizView.vue') },
  { path: '/games',      component: () => import('../views/GamesView.vue') },
  { path: '/theories',   component: () => import('../views/TheoriesView.vue') },
  { path: '/map',        component: () => import('../views/MapView.vue') },
  { path: '/scenes',     component: () => import('../views/ScenesView.vue') },
  { path: '/bingo',      component: () => import('../views/BingoView.vue') },
  { path: '/match',      component: () => import('../views/CharacterMatchView.vue') },
  { path: '/starfall',   component: () => import('../views/StarfallView.vue') },
  {
    path: '/echoes',
    component: () => import('../views/EasterEggView.vue'),
    meta: { hidden: true },
    beforeEnter: () => {
      const eggs = useEggsStore()
      if (eggs.count < 8) return '/'
    },
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
})
