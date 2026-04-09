import { AlertCircle, CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useStore } from '../store/useStore'
import { Button } from './Button'

export const GlobalModal = () => {
  const { globalModal, hideModal } = useStore()

  const icons = {
    success: <CheckCircle2 className="w-6 h-6 text-green-500" />,
    alert: <AlertCircle className="w-6 h-6 text-amber-500" />,
    notice: <Info className="w-6 h-6 text-blue-500" />,
    fail: <XCircle className="w-6 h-6 text-red-500" />,
  }

  return (
    <AnimatePresence>
      {globalModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden"
          >
            <button
              onClick={hideModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 rounded-full bg-gray-50">{icons[globalModal.type]}</div>
              <h3 className="text-xl font-semibold text-gray-900">
                {globalModal.type.charAt(0).toUpperCase() + globalModal.type.slice(1)}
              </h3>
              <p className="text-gray-500 leading-relaxed">{globalModal.message}</p>
              <Button onClick={hideModal} className="w-full mt-2">
                Dismiss
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
