import { ArrowRight, Clock, Heart, MapPin, Star, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'
import type { Restaurant } from '../types'
import { Badge } from './Badge'
import { Button } from './Button'

interface RestaurantModalProps {
  restaurant: Restaurant | null
  isOpen: boolean
  onClose: () => void
  onSelect: () => void
}

export const RestaurantModal = ({
  restaurant,
  isOpen,
  onClose,
  onSelect,
}: RestaurantModalProps) => {
  const { toggleFavorite, isFavorite } = useStore()

  if (!restaurant) return null
  const favorite = isFavorite(restaurant.id)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="relative h-64 flex-shrink-0">
              <img
                src={restaurant.imageUrl}
                alt={restaurant.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/40 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-6 left-8 right-8">
                <div className="flex items-center space-x-2 mb-2">
                  {restaurant.foodTypes.map((type) => (
                    <Badge
                      key={type}
                      variant="red"
                      className="bg-white/20 backdrop-blur-md text-white border border-white/30"
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
                <h2 className="text-3xl font-bold text-white">{restaurant.name}</h2>
              </div>
            </div>

            <div className="p-8 overflow-y-auto space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span className="font-bold text-lg">{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <MapPin className="w-5 h-5" />
                    <span>{restaurant.distance} miles</span>
                  </div>
                  <div className="font-medium text-[#c5050c]">{'$'.repeat(restaurant.budget)}</div>
                </div>
                <button
                  onClick={() => toggleFavorite(restaurant)}
                  className={`p-3 rounded-2xl transition-all ${
                    favorite
                      ? 'bg-red-50 text-[#c5050c]'
                      : 'bg-gray-50 text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${favorite ? 'fill-[#c5050c]' : ''}`} />
                </button>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg">{restaurant.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Hours</p>
                    <p className="text-sm text-gray-500">{restaurant.hours}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Address</p>
                    <p className="text-sm text-gray-500">{restaurant.address}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={onSelect} className="flex-grow group">
                  Select This Place
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Link to={`/restaurant/${restaurant.id}`} className="flex-grow">
                  <Button variant="outline" className="w-full">
                    View Full Details
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
