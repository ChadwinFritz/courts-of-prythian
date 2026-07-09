// src/stores/__tests__/badges.test.js
import { setActivePinia, createPinia } from 'pinia'
import { useBadgesStore } from '../badges'

beforeEach(() => { setActivePinia(createPinia()) })

test('collect adds book and increments count', () => {
  const store = useBadgesStore()
  expect(store.count).toBe(0)
  store.collect(2)
  expect(store.count).toBe(1)
  expect(store.has(2)).toBe(true)
  expect(store.has(1)).toBe(false)
})

test('hasAll is true only when all 5 books collected', () => {
  const store = useBadgesStore()
  expect(store.hasAll).toBe(false)
  ;[1,2,3,4,5].forEach((id) => store.collect(id))
  expect(store.hasAll).toBe(true)
})

test('collecting same book twice does not double count', () => {
  const store = useBadgesStore()
  store.collect(1)
  store.collect(1)
  expect(store.count).toBe(1)
})
