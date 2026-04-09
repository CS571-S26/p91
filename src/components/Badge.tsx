import React from 'react'
import { cn } from '../lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'red' | 'gray'
  className?: string
  key?: string | number
}

export const Badge = ({ children, variant = 'default', className }: BadgeProps) => {
  const variants = {
    default: 'bg-red-50 text-[#c5050c]',
    red: 'bg-[#c5050c] text-white',
    gray: 'bg-gray-100 text-gray-600',
  }

  return (
    <span
      className={cn(
        'px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
