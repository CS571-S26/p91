import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { MealForm } from '../components/MealForm'
import { SectionHeader } from '../components/SectionHeader'
import { useStore } from '../store/useStore'
import type { Restaurant } from '../types'

export const Home = () => {
  const navigate = useNavigate()
  const { setLastGenerated, lastGenerated, showModal } = useStore()

  const handleGenerate = (results: Restaurant[]) => {
    if (results.length === 0) {
      showModal('fail', 'No restaurants found matching your criteria. Try expanding your search!')
      return
    }

    setLastGenerated(results)
    navigate('/spinner')
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-6 md:py-10 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <Badge variant="red" className="mb-2 scale-95">
          UW-Madison Exclusive
        </Badge>
        <SectionHeader
          align="center"
          title="Can't decide where to eat?"
          subtitle="Let the Madison Meal Spinner choose your next campus dining adventure."
          className="mb-0"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <MealForm onGenerate={handleGenerate} />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12">
        {[
          {
            title: 'Campus Favorites',
            desc: 'From Gordon to the Terrace, we have all the iconic spots.',
          },
          {
            title: 'Smart Filters',
            desc: 'Filter by your budget and how far you are willing to walk.',
          },
          {
            title: 'Save History',
            desc: 'Keep track of where you have been and your favorite meals.',
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="space-y-3"
          >
            <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
            <p className="text-gray-500 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

import { Badge } from '../components/Badge'
