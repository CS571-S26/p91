import { Ghost } from 'lucide-react'

interface EmptyStateProps {
  title: string
  message: string
}

export const EmptyState = ({ title, message }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center space-y-4 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
      <div className="p-6 bg-white rounded-full shadow-sm">
        <Ghost className="w-12 h-12 text-gray-300" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-500 max-w-md mx-auto">{message}</p>
    </div>
  )
}
