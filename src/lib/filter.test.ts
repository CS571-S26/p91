import { describe, expect, it } from 'vitest'
import type { Restaurant } from '../types'
import { filterRestaurants, matchesFilters } from './filter'

const makeRestaurant = (overrides: Partial<Restaurant>): Restaurant => ({
  id: 'test',
  name: 'Test',
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
  ...overrides,
})

const fixtures: Restaurant[] = [
  makeRestaurant({ id: 'a', budget: 1, distance: 0.3, foodTypes: ['Pizza & Italian'] }),
  makeRestaurant({ id: 'b', budget: 2, distance: 0.8, foodTypes: ['Asian'] }),
  makeRestaurant({ id: 'c', budget: 3, distance: 1.2, foodTypes: ['Fine Dining'] }),
  makeRestaurant({ id: 'd', budget: 4, distance: 2.0, foodTypes: ['Fine Dining'] }),
  makeRestaurant({ id: 'e', budget: 1, distance: 0.5, foodTypes: ['Pizza & Italian', 'Late Night'] }),
]

describe('matchesFilters', () => {
  it('rejects restaurants above the max budget', () => {
    const r = makeRestaurant({ budget: 3 })
    expect(matchesFilters(r, { budget: 2, distance: 5, genres: [] })).toBe(false)
  })

  it('rejects restaurants beyond the max distance', () => {
    const r = makeRestaurant({ distance: 1.5 })
    expect(matchesFilters(r, { budget: 4, distance: 1, genres: [] })).toBe(false)
  })

  it('accepts restaurants at exactly the budget and distance limits', () => {
    const r = makeRestaurant({ budget: 2, distance: 1 })
    expect(matchesFilters(r, { budget: 2, distance: 1, genres: [] })).toBe(true)
  })

  it('requires at least one overlapping genre when genres are provided', () => {
    const r = makeRestaurant({ foodTypes: ['Pizza & Italian'] })
    expect(matchesFilters(r, { budget: 4, distance: 5, genres: ['Pizza & Italian'] })).toBe(true)
    expect(matchesFilters(r, { budget: 4, distance: 5, genres: ['Asian'] })).toBe(false)
  })

  it('treats an empty genres array as no cuisine restriction', () => {
    const r = makeRestaurant({ foodTypes: ['Asian'] })
    expect(matchesFilters(r, { budget: 4, distance: 5, genres: [] })).toBe(true)
  })
})

describe('filterRestaurants', () => {
  it('returns an empty list when no restaurant matches', () => {
    const result = filterRestaurants(fixtures, { budget: 1, distance: 0.1, genres: [] }, 6)
    expect(result).toEqual([])
  })

  it('caps the results at the requested limit', () => {
    const result = filterRestaurants(fixtures, { budget: 4, distance: 5, genres: [] }, 2)
    expect(result).toHaveLength(2)
  })

  it('returns fewer than the limit when matches are scarce', () => {
    const result = filterRestaurants(fixtures, { budget: 1, distance: 0.5, genres: [] }, 6)
    expect(result.map((r) => r.id)).toEqual(['a', 'e'])
  })

  it('intersects budget, distance, and genre filters', () => {
    const result = filterRestaurants(
      fixtures,
      { budget: 3, distance: 1.2, genres: ['Fine Dining'] },
      6,
    )
    expect(result.map((r) => r.id)).toEqual(['c'])
  })
})
