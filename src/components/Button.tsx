import React from 'react'
import { cn } from '../lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  [key: string]: any
}

export const Button = ({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: 'bg-[#c5050c] text-white hover:bg-[#9b0000] shadow-sm',
    secondary: 'bg-white text-[#c5050c] hover:bg-gray-50 border border-[#c5050c]',
    outline: 'bg-transparent border border-gray-200 text-gray-700 hover:bg-gray-50',
    ghost: 'bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5',
    lg: 'px-8 py-3.5 text-lg font-medium',
  }

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
