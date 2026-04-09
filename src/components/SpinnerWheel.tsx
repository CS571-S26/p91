import { motion } from 'motion/react'
import React, { useRef, useState } from 'react'
import type { Restaurant } from '../types'
import { Button } from './Button'

interface SpinnerWheelProps {
  items: Restaurant[]
  onSpinEnd: (winner: Restaurant) => void
}

const COLORS = [
  '#c5050c', // UW Red
  '#282828', // Dark Gray
  '#9b0000', // Darker Red
  '#4a4a4a', // Medium Gray
  '#f7f7f7', // Light Gray
  '#d1d1d1', // Silver
]

export const SpinnerWheel: React.FC<SpinnerWheelProps> = ({ items, onSpinEnd }) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const wheelRef = useRef<HTMLDivElement>(null)

  const spin = () => {
    if (isSpinning || items.length === 0) return

    setIsSpinning(true)
    const extraRounds = 7 + Math.floor(Math.random() * 5)
    const randomDegree = Math.floor(Math.random() * 360)
    const totalRotation = rotation + extraRounds * 360 + randomDegree

    setRotation(totalRotation)

    setTimeout(() => {
      setIsSpinning(false)
      const angle = 360 / items.length
      // Calculate winner: the pointer is at 0 degrees (top)
      // We need to find which segment's center is currently at 0 degrees
      const winnerIndex = Math.round(((360 - (totalRotation % 360)) % 360) / angle) % items.length
      onSpinEnd(items[winnerIndex])
    }, 4000)
  }

  const angle = 360 / items.length
  const halfAngle = angle / 2
  const tanVal = Math.tan((halfAngle * Math.PI) / 180)
  const p1 = 50 - 50 * tanVal
  const p2 = 50 + 50 * tanVal

  return (
    <div className="flex flex-col items-center space-y-12">
      <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
        {/* Pointer */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30">
          <div
            className="w-10 h-12 bg-[#c5050c] clip-path-triangle shadow-2xl border-x-4 border-t-4 border-white/20"
            style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
          />
        </div>

        {/* Wheel Container */}
        <div className="w-full h-full rounded-full p-4 bg-white shadow-[0_0_60px_rgba(0,0,0,0.15)] border border-gray-100 relative z-10">
          <motion.div
            ref={wheelRef}
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: [0.45, 0.05, 0.55, 0.95] }}
            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
            className="w-full h-full rounded-full relative overflow-hidden bg-gray-100 shadow-inner isolate transform-gpu"
          >
            {items.map((item, index) => {
              const rotate = angle * index
              const bgColor = COLORS[index % COLORS.length]

              return (
                <div
                  key={item.id}
                  className="absolute inset-0 w-full h-full origin-center"
                  style={{
                    transform: `rotate(${rotate}deg)`,
                    clipPath: `polygon(50% 50%, ${p1}% 0%, ${p2}% 0%)`,
                    backgroundColor: bgColor,
                  }}
                >
                  {/* Restaurant Image with Overlay */}
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/20 to-transparent" />
                  </div>

                  {/* Content - Positioned near the outer edge */}
                  <div className="absolute top-0 left-0 w-full h-1/2 flex flex-col items-center justify-start pt-6 md:pt-8">
                    <div className="flex flex-col items-center px-4 max-w-[140px] text-white">
                      <span className="text-xs md:text-sm font-black text-center leading-tight line-clamp-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase tracking-wide">
                        {item.name}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Center Circle */}
            <div className="absolute inset-0 m-auto w-20 h-20 bg-white rounded-full shadow-2xl z-10 flex items-center justify-center border-8 border-gray-50">
              <div className="w-6 h-6 bg-[#c5050c] rounded-full shadow-inner animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>

      <Button
        size="lg"
        onClick={spin}
        disabled={isSpinning}
        className="w-72 h-16 text-xl shadow-2xl hover:shadow-[0_20px_50px_rgba(197,5,12,0.3)] transition-all"
      >
        {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
      </Button>
    </div>
  )
}
