// src/stores/eggs.js — stub, replaced in Task 4
import { defineStore } from 'pinia'
export const useEggsStore = defineStore('jl-eggs', {
  state: () => ({ found: {} }),
  getters: { count: (s) => Object.keys(s.found).length },
  persist: true,
})
