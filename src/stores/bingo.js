// src/stores/bingo.js
import { defineStore } from 'pinia'

const FREE = 12 // center square index

// All possible winning lines (rows, columns, diagonals)
const LINES = [
  [0,1,2,3,4], [5,6,7,8,9], [10,11,12,13,14], [15,16,17,18,19], [20,21,22,23,24],
  [0,5,10,15,20], [1,6,11,16,21], [2,7,12,17,22], [3,8,13,18,23], [4,9,14,19,24],
  [0,6,12,18,24], [4,8,12,16,20],
]

export const useBingoStore = defineStore('jl-bingo', {
  state: () => ({ marked: {} }),
  getters: {
    count: (s) => Object.keys(s.marked).filter((k) => s.marked[k]).length,
    isMarked: (s) => (i) => i === FREE || !!s.marked[String(i)],
    completedLines: (s) =>
      LINES.filter((line) => line.every((i) => i === FREE || s.marked[String(i)])),
  },
  actions: {
    toggle(i) {
      if (i === FREE) return
      this.marked[String(i)] = !this.marked[String(i)]
    },
    clear() { this.marked = {} },
  },
  persist: true,
})
