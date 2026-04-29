import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Restaurant } from '../types'
import { useStore } from './useStore'

const sample: Restaurant = {
  id: 'r1',
  name: 'Sample',
  description: 'desc',
  foodTypes: ['American & Pub'],
  budget: 2,
  distance: 0.5,
  rating: 4,
  imageUrl: 'https://example.com/img.jpg',
  address: '123 Test St',
  hours: '9-5',
  phone: '555',
  website: 'https://example.com',
}

beforeEach(() => {
  useStore.setState({
    history: [],
    favorites: [],
    lastGenerated: null,
    globalModal: { isOpen: false, type: 'notice', message: '' },
  })
})

describe('useStore favorites', () => {
  it('adds a restaurant on first toggle and removes it on the second', () => {
    useStore.getState().toggleFavorite(sample)
    expect(useStore.getState().favorites.map((r) => r.id)).toEqual(['r1'])
    expect(useStore.getState().isFavorite('r1')).toBe(true)

    useStore.getState().toggleFavorite(sample)
    expect(useStore.getState().favorites).toEqual([])
    expect(useStore.getState().isFavorite('r1')).toBe(false)
  })
})

describe('useStore history', () => {
  it('prepends new entries with a timestamp', () => {
    useStore.getState().addToHistory(sample)
    const [entry] = useStore.getState().history
    expect(entry.id).toBe('r1')
    expect(typeof entry.timestamp).toBe('number')
  })

  it('removes entries by timestamp', () => {
    useStore.getState().addToHistory(sample)
    const [{ timestamp }] = useStore.getState().history
    useStore.getState().removeFromHistory(timestamp)
    expect(useStore.getState().history).toEqual([])
  })

  it('keeps unrelated entries when removing by timestamp', () => {
    // Stub Date.now so each entry gets a unique timestamp — production code keys
    // history by Date.now() so two inserts in the same millisecond collide.
    const now = vi.spyOn(Date, 'now')
    now.mockReturnValueOnce(1000)
    useStore.getState().addToHistory(sample)
    now.mockReturnValueOnce(2000)
    useStore.getState().addToHistory({ ...sample, id: 'r2' })
    now.mockRestore()

    const newest = useStore.getState().history[0].timestamp
    useStore.getState().removeFromHistory(newest)
    expect(useStore.getState().history).toHaveLength(1)
    expect(useStore.getState().history[0].id).toBe('r1')
  })
})

describe('useStore modal', () => {
  it('opens and closes the global modal', () => {
    useStore.getState().showModal('success', 'done')
    expect(useStore.getState().globalModal).toEqual({
      isOpen: true,
      type: 'success',
      message: 'done',
    })
    useStore.getState().hideModal()
    expect(useStore.getState().globalModal.isOpen).toBe(false)
  })
})
