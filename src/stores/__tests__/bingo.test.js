// src/stores/__tests__/bingo.test.js
import { setActivePinia, createPinia } from 'pinia'
import { useBingoStore } from '../bingo'

beforeEach(() => { setActivePinia(createPinia()) })

test('center square (12) is always marked', () => {
  const store = useBingoStore()
  expect(store.isMarked(12)).toBe(true)
})

test('toggle marks and unmarks a square', () => {
  const store = useBingoStore()
  store.toggle(0)
  expect(store.isMarked(0)).toBe(true)
  store.toggle(0)
  expect(store.isMarked(0)).toBe(false)
})

test('completedLines detects a full row', () => {
  const store = useBingoStore()
  ;[0,1,2,3,4].forEach((i) => store.toggle(i))
  expect(store.completedLines.length).toBeGreaterThan(0)
})

test('clear resets all marks', () => {
  const store = useBingoStore()
  store.toggle(0); store.toggle(1)
  store.clear()
  expect(store.count).toBe(0)
})
