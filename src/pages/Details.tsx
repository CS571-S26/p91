import { ArrowLeft, ArrowRight, Clock, Globe, Heart, MapPin, Phone, Star } from 'lucide-react'
import { motion } from 'motion/react'
import { useNavigate, useParams } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { SectionHeader } from '../components/SectionHeader'
import { MOCK_RESTAURANTS } from '../constants'
import { useStore } from '../store/useStore'

export const Details = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toggleFavorite, isFavorite, addToHistory, showModal } = useStore()

  const restaurant = MOCK_RESTAURANTS.find((r) => r.id === id)

  const handleSelect = () => {
    if (!restaurant) return
    addToHistory(restaurant)
    showModal('success', `Awesome! ${restaurant.name} has been added to your history.`)
    navigate('/history')
  }

  if (!restaurant) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold">Restaurant not found</h2>
        <Button onClick={() => navigate('/')} className="mt-4">
          Go Home
        </Button>
      </div>
    )
  }

  const favorite = isFavorite(restaurant.id)

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      <Button variant="ghost" onClick={() => navigate(-1)} className="group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-[3rem] overflow-hidden shadow-2xl h-[500px]"
        >
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {restaurant.foodTypes.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
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
            <SectionHeader title={restaurant.name} />
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="font-bold text-xl">{restaurant.rating}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-500">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">{restaurant.distance} miles from Bascom</span>
              </div>
              <div className="text-xl font-bold text-[#c5050c]">
                {'$'.repeat(restaurant.budget)}
              </div>
            </div>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed">{restaurant.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-50 rounded-2xl">
                  <Clock className="w-6 h-6 text-[#c5050c]" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Opening Hours</p>
                  <p className="text-gray-500">{restaurant.hours}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-50 rounded-2xl">
                  <MapPin className="w-6 h-6 text-[#c5050c]" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Address</p>
                  <p className="text-gray-500">{restaurant.address}</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-50 rounded-2xl">
                  <Phone className="w-6 h-6 text-[#c5050c]" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Phone</p>
                  <p className="text-gray-500">{restaurant.phone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-50 rounded-2xl">
                  <Globe className="w-6 h-6 text-[#c5050c]" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Website</p>
                  <a
                    href={restaurant.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#c5050c] hover:underline"
                  >
                    Visit Official Site
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleSelect} size="lg" className="w-full sm:w-auto group">
              Select This Place
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
