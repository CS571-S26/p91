import { ChevronRight, Heart, MapPin, Star, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'
import type { Restaurant } from '../types'
import { Badge } from './Badge'
import { Button } from './Button'
import { Card } from './Card'

interface PlaceItemProps {
  restaurant: Restaurant
  timestamp?: number
  onRemove?: () => void
}

export const PlaceItem = ({ restaurant, timestamp, onRemove }: PlaceItemProps) => {
  const { toggleFavorite, isFavorite } = useStore()
  const favorite = isFavorite(restaurant.id)

  return (
    <Card className="flex flex-col sm:flex-row items-stretch sm:items-center p-4 space-y-4 sm:space-y-0 sm:space-x-6">
      <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="flex-grow space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{restaurant.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{restaurant.rating}</span>
              <span>•</span>
              <MapPin className="w-4 h-4" />
              <span>{restaurant.distance} miles</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleFavorite(restaurant)}
              className={`p-2 rounded-full transition-colors ${
                favorite
                  ? 'text-[#c5050c] bg-red-50'
                  : 'text-gray-300 hover:text-gray-400 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${favorite ? 'fill-[#c5050c]' : ''}`} />
            </button>
            {onRemove && (
              <button
                onClick={onRemove}
                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {restaurant.foodTypes.slice(0, 3).map((type) => (
            <Badge key={type} variant="gray">
              {type}
            </Badge>
          ))}
          <Badge variant="default">{'$'.repeat(restaurant.budget)}</Badge>
        </div>

        {timestamp && (
          <p className="text-xs text-gray-400">
            Visited on {new Date(timestamp).toLocaleDateString()} at{' '}
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>

      <div className="flex items-center justify-end">
        <Link to={`/restaurant/${restaurant.id}`}>
          <Button variant="ghost" size="sm" className="group">
            Details
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </Card>
  )
}
