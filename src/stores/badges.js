// src/stores/badges.js
import { defineStore } from 'pinia'

export const useBadgesStore = defineStore('jl-badges', {
  state: () => ({ collected: {} }),
  getters: {
    count:  (s) => Object.keys(s.collected).length,
    hasAll: (s) => Object.keys(s.collected).length === 5,
    has:    (s) => (bookId) => !!s.collected[String(bookId)],
  },
  actions: {
    collect(bookId) { this.collected[String(bookId)] = true },
  },
  persist: true,
})
