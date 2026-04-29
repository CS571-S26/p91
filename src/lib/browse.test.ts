import { describe, expect, it } from 'vitest'
import type { Restaurant } from '../types'
import { filterBrowseRestaurants } from './browse'

const make = (overrides: Partial<Restaurant>): Restaurant => ({
  id: 'r',
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
  make({ id: 'a', name: "Ian's Pizza", description: 'Slices on State', foodTypes: ['Pizza & Italian'] }),
  make({ id: 'b', name: 'Tavernakaya', description: 'Sushi and ramen', foodTypes: ['Asian'] }),
  make({ id: 'c', name: "L'Etoile", description: 'Fine French dining', foodTypes: ['Fine Dining'] }),
]

describe('filterBrowseRestaurants', () => {
  it('returns everything when no filters are set', () => {
    const result = filterBrowseRestaurants(fixtures, { search: '', genres: [] })
    expect(result).toHaveLength(3)
  })

  it('matches search against name and description, case-insensitively', () => {
    expect(filterBrowseRestaurants(fixtures, { search: 'pizza', genres: [] })).toHaveLength(1)
    expect(filterBrowseRestaurants(fixtures, { search: 'RAMEN', genres: [] })).toHaveLength(1)
  })

  it('filters by genre overlap', () => {
    const result = filterBrowseRestaurants(fixtures, { search: '', genres: ['Asian'] })
    expect(result.map((r) => r.id)).toEqual(['b'])
  })

  it('combines search and genre filters', () => {
    const result = filterBrowseRestaurants(fixtures, {
      search: 'fine',
      genres: ['Fine Dining'],
    })
    expect(result.map((r) => r.id)).toEqual(['c'])
  })

  it('ignores leading/trailing whitespace in search', () => {
    expect(filterBrowseRestaurants(fixtures, { search: '   pizza   ', genres: [] })).toHaveLength(1)
  })
})
