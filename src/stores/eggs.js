// src/stores/eggs.js
import { defineStore } from 'pinia'

export const useEggsStore = defineStore('jl-eggs', {
  state: () => ({ found: {} }),
  getters: {
    count:  (s) => Object.keys(s.found).length,
    hasAll: (s) => Object.keys(s.found).length === 8,
    has:    (s) => (word) => !!s.found[word],
  },
  actions: {
    /** Returns true if this is the first time the word is found */
    find(word) {
      const isNew = !this.found[word]
      this.found[word] = true
      return isNew
    },
  },
  persist: true,
})
