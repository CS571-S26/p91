import { DollarSign, ListFilter, MapPin, Search } from 'lucide-react'
import React, { useState } from 'react'
import { MOCK_RESTAURANTS } from '../constants'
import type { Restaurant } from '../types'
import { Button } from './Button'

interface MealFormProps {
  onGenerate: (results: Restaurant[]) => void
}

export const MealForm = ({ onGenerate }: MealFormProps) => {
  const [budget, setBudget] = useState(2)
  const [distance, setDistance] = useState(1)
  const [genNumber, setGenNumber] = useState(6)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Filter mock data based on criteria
    let results = MOCK_RESTAURANTS.filter((r) => r.budget <= budget && r.distance <= distance)

    // If we don't have enough results, add more from the mock data to reach genNumber
    if (results.length < genNumber) {
      const remaining = MOCK_RESTAURANTS.filter((r) => !results.find((res) => res.id === r.id))
      results = [...results, ...remaining].slice(0, genNumber)
    } else {
      results = results.slice(0, genNumber)
    }

    onGenerate(results)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Left Column: Budget */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 uppercase tracking-wider">
              <DollarSign className="w-4 h-4 text-[#c5050c]" />
              <span>Max Budget</span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { val: 1, label: '< $10', desc: 'Budget' },
              { val: 2, label: '$10-$20', desc: 'Moderate' },
              { val: 3, label: '$20-$40', desc: 'Upscale' },
              { val: 4, label: '$40+', desc: 'Fine Dining' },
            ].map((item) => (
              <button
                key={item.val}
                type="button"
                onClick={() => setBudget(item.val)}
                className={`flex flex-col items-center justify-center py-4 px-3 rounded-2xl transition-all border-2 ${
                  budget === item.val
                    ? 'bg-[#c5050c] text-white border-[#c5050c] shadow-md'
                    : 'bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100 hover:border-gray-200'
                }`}
              >
                <span className="text-sm font-bold">{item.label}</span>
                <span
                  className={`text-[10px] uppercase tracking-widest font-semibold mt-0.5 ${budget === item.val ? 'text-white/80' : 'text-gray-400'}`}
                >
                  {item.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Distance & Options */}
        <div className="space-y-10 flex flex-col justify-center">
          {/* Distance */}
          <div className="space-y-4">
            <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-[#c5050c]" />
              <span>Max Distance</span>
            </label>

            <div className="space-y-3">
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={distance}
                onChange={(e) => setDistance(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#c5050c]"
              />
              <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-xl">
                <span className="text-[10px] font-medium text-gray-400">0.1 mi</span>
                <div className="flex items-center space-x-1">
                  <span className="text-base font-bold text-[#c5050c]">{distance}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">miles</span>
                </div>
                <span className="text-[10px] font-medium text-gray-400">5.0 mi</span>
              </div>
            </div>
          </div>

          {/* Number of Options */}
          <div className="space-y-3">
            <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 uppercase tracking-wider">
              <ListFilter className="w-4 h-4 text-[#c5050c]" />
              <span>Options</span>
            </label>
            <div className="relative">
              <select
                value={genNumber}
                onChange={(e) => setGenNumber(parseInt(e.target.value))}
                className="w-full py-3.5 px-6 bg-gray-50 border-2 border-transparent rounded-xl text-sm font-bold text-gray-700 focus:bg-white focus:border-[#c5050c] outline-none appearance-none transition-all cursor-pointer"
              >
                {[4, 6, 8, 10].map((n) => (
                  <option key={n} value={n}>
                    {n} Restaurants
                  </option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ListFilter className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          className="w-full h-16 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all group"
        >
          <Search className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
          Generate My Wheel
        </Button>
      </div>
    </form>
  )
}
