import { motion } from 'motion/react'
import { EmptyState } from '../components/EmptyState'
import { PlaceItem } from '../components/PlaceItem'
import { SectionHeader } from '../components/SectionHeader'
import { useStore } from '../store/useStore'

export const History = () => {
  const { history, removeFromHistory } = useStore()

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <SectionHeader
        title="Your Meal History"
        subtitle="A record of your past decisions. Hopefully they were delicious."
      />

      {history.length === 0 ? (
        <EmptyState
          title="No history yet"
          message="Start spinning the wheel to build up your dining history!"
        />
      ) : (
        <div className="space-y-6">
          {history.map((item, index) => (
            <motion.div
              key={item.timestamp}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <PlaceItem
                restaurant={item}
                timestamp={item.timestamp}
                onRemove={() => removeFromHistory(item.timestamp)}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
