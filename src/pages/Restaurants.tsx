import { Search, UtensilsCrossed, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { EmptyState } from '../components/EmptyState'
import { PlaceItem } from '../components/PlaceItem'
import { SectionHeader } from '../components/SectionHeader'
import { FOOD_GENRES, MOCK_RESTAURANTS } from '../constants'
import { filterBrowseRestaurants } from '../lib/browse'

export const Restaurants = () => {
  const [search, setSearch] = useState('')
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    )
  }

  const results = useMemo(
    () => filterBrowseRestaurants(MOCK_RESTAURANTS, { search, genres: selectedGenres }),
    [search, selectedGenres],
  )

  const hasFilters = search.trim().length > 0 || selectedGenres.length > 0

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      <SectionHeader
        title="Browse Restaurants"
        subtitle="Explore every spot in our catalog and tap the heart to save your go-to places."
      />

      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-6">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or description"
            className="w-full pl-14 pr-12 py-3.5 bg-gray-50 border-2 border-transparent rounded-xl text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-[#c5050c] outline-none transition-all"
          />
          {search.length > 0 && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 uppercase tracking-wider">
              <UtensilsCrossed className="w-4 h-4 text-[#c5050c]" />
              <span>Cuisine</span>
            </label>
            {selectedGenres.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedGenres([])}
                className="text-xs font-bold uppercase tracking-wide text-[#c5050c] hover:text-[#9b0000]"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {FOOD_GENRES.map((genre) => {
              const active = selectedGenres.includes(genre)
              return (
                <button
                  key={genre}
                  type="button"
                  onClick={() => toggleGenre(genre)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold border-2 transition-all ${
                    active
                      ? 'bg-[#c5050c] text-white border-[#c5050c] shadow-sm'
                      : 'bg-gray-50 text-gray-600 border-transparent hover:border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {genre}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          Showing <span className="font-bold text-gray-900">{results.length}</span> of{' '}
          {MOCK_RESTAURANTS.length}
        </span>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setSearch('')
              setSelectedGenres([])
            }}
            className="text-xs font-bold uppercase tracking-wide text-[#c5050c] hover:text-[#9b0000]"
          >
            Reset filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <EmptyState
          title="No matches"
          message="Try clearing a filter or searching for a different word."
        />
      ) : (
        <div className="space-y-6">
          {results.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(index, 8) * 0.04 }}
            >
              <PlaceItem restaurant={item} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
