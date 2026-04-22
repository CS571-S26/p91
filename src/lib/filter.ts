import type { Restaurant } from '../types'

export interface RestaurantFilters {
  budget: number
  distance: number
  genres: string[]
}

export const matchesFilters = (restaurant: Restaurant, filters: RestaurantFilters): boolean => {
  if (restaurant.budget > filters.budget) return false
  if (restaurant.distance > filters.distance) return false
  if (filters.genres.length > 0 && !filters.genres.some((g) => restaurant.foodTypes.includes(g))) {
    return false
  }
  return true
}

export const filterRestaurants = (
  restaurants: Restaurant[],
  filters: RestaurantFilters,
  limit: number,
): Restaurant[] => {
  return restaurants.filter((r) => matchesFilters(r, filters)).slice(0, limit)
}
