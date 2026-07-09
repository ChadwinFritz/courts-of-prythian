// src/composables/__tests__/useSecrets.test.js
import { setActivePinia, createPinia } from 'pinia'
import { useSecrets } from '../useSecrets'
import { useEggsStore } from '../../stores/eggs'

beforeEach(() => { setActivePinia(createPinia()) })

function fireKeys(fn, word) {
  for (const ch of word) {
    fn(new KeyboardEvent('keydown', { key: ch, target: document.body }))
  }
}

test('typing "rhysand" marks that egg as found', () => {
  const { onKeydown } = useSecrets()
  const eggs = useEggsStore()
  fireKeys(onKeydown, 'rhysand')
  expect(eggs.has('rhysand')).toBe(true)
  expect(eggs.count).toBe(1)
})

test('typing in an input field does not trigger', () => {
  const { onKeydown } = useSecrets()
  const eggs = useEggsStore()
  const input = document.createElement('input')
  for (const ch of 'rhysand') {
    const evt = new KeyboardEvent('keydown', { key: ch })
    Object.defineProperty(evt, 'target', { value: input, configurable: true })
    onKeydown(evt)
  }
  expect(eggs.count).toBe(0)
})

test('count reaches 8 when all words typed', () => {
  const { onKeydown } = useSecrets()
  const eggs = useEggsStore()
  ;['rhysand','jodi','nyx','velaris','starfall','cauldron','mate','prythian']
    .forEach((w) => fireKeys(onKeydown, w))
  expect(eggs.hasAll).toBe(true)
})
