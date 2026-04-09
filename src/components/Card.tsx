import React from 'react'
import { cn } from '../lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const Card = ({ children, className, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden transition-all duration-300',
        onClick && 'cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1',
        className,
      )}
    >
      {children}
    </div>
  )
}
