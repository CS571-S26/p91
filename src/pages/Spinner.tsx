import { ArrowLeft, RefreshCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { RestaurantModal } from '../components/RestaurantModal'
import { SectionHeader } from '../components/SectionHeader'
import { SpinnerWheel } from '../components/SpinnerWheel'
import { useStore } from '../store/useStore'
import type { Restaurant } from '../types'

export const Spinner = () => {
  const { lastGenerated, addToHistory, showModal } = useStore()
  const [winner, setWinner] = useState<Restaurant | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!lastGenerated || lastGenerated.length === 0) {
      navigate('/')
    }
  }, [lastGenerated, navigate])

  if (!lastGenerated) return null

  const handleSpinEnd = (result: Restaurant) => {
    setWinner(result)
    setIsModalOpen(true)
  }

  const handleSelect = () => {
    if (winner) {
      addToHistory(winner)
      showModal('success', `Awesome! ${winner.name} has been added to your history.`)
      setIsModalOpen(false)
      navigate('/history')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 flex flex-col items-center">
      <div className="w-full flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/')} className="group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Filters
        </Button>
        <Button variant="outline" onClick={() => navigate('/')} size="sm">
          <RefreshCcw className="w-4 h-4 mr-2" />
          New Wheel
        </Button>
      </div>

      <SectionHeader
        align="center"
        title="Spin the Wheel"
        subtitle="Your destiny awaits. Click the button below to find your next meal."
      />

      <SpinnerWheel
        key={lastGenerated.map((r) => r.id).join(',')}
        items={lastGenerated}
        onSpinEnd={handleSpinEnd}
      />

      <RestaurantModal
        restaurant={winner}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelect}
      />
    </div>
  )
}
