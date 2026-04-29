import type { Restaurant } from '../types'

export interface BrowseFilters {
  search: string
  genres: string[]
}

/** Free-text + cuisine filter for the Browse page. Empty inputs match everything. */
export const filterBrowseRestaurants = (
  restaurants: Restaurant[],
  { search, genres }: BrowseFilters,
): Restaurant[] => {
  const query = search.trim().toLowerCase()
  return restaurants.filter((r) => {
    if (query.length > 0) {
      const haystack = `${r.name} ${r.description}`.toLowerCase()
      if (!haystack.includes(query)) return false
    }
    if (genres.length > 0 && !genres.some((g) => r.foodTypes.includes(g))) {
      return false
    }
    return true
  })
}
