import { cn } from '../lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export const SectionHeader = ({
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeaderProps) => {
  return (
    <div className={cn('space-y-2 mb-8', align === 'center' && 'text-center', className)}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">{title}</h2>
      {subtitle && <p className="text-lg text-gray-500 max-w-2xl mx-auto">{subtitle}</p>}
      <div className={cn('w-12 h-1 bg-[#c5050c] rounded-full', align === 'center' && 'mx-auto')} />
    </div>
  )
}
