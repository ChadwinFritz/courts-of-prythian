// src/stores/__tests__/eggs.test.js
import { setActivePinia, createPinia } from 'pinia'
import { useEggsStore } from '../eggs'

beforeEach(() => { setActivePinia(createPinia()) })

test('find returns true on first discovery, false on repeat', () => {
  const store = useEggsStore()
  expect(store.find('rhysand')).toBe(true)
  expect(store.find('rhysand')).toBe(false)
})

test('count increments correctly', () => {
  const store = useEggsStore()
  ;['rhysand','jodi','nyx','velaris','starfall','cauldron','mate','prythian']
    .forEach((w) => store.find(w))
  expect(store.count).toBe(8)
  expect(store.hasAll).toBe(true)
})
