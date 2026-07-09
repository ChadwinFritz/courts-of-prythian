// src/stores/polls.js
import { defineStore } from 'pinia'

export const usePollsStore = defineStore('jl-polls', {
  state: () => ({ votes: {} }),
  getters: {
    vote: (s) => (pollId) => s.votes[pollId] || null,
  },
  actions: {
    cast(pollId, choice) { this.votes[pollId] = choice },
  },
  persist: true,
})
