import { motion } from 'motion/react'
import { EmptyState } from '../components/EmptyState'
import { PlaceItem } from '../components/PlaceItem'
import { SectionHeader } from '../components/SectionHeader'
import { useStore } from '../store/useStore'

export const Favorites = () => {
  const { favorites } = useStore()

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <SectionHeader
        title="Your Favorites"
        subtitle="The best of the best. Your go-to spots on campus."
      />

      {favorites.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          message="Click the heart icon on any restaurant to save it here for quick access."
        />
      ) : (
        <div className="space-y-6">
          {favorites.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <PlaceItem restaurant={item} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
