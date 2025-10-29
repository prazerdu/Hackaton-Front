'use client'

import { XIcon, CheckCircleIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface AlertProps {
  title: string
  description?: string
  onClose?: () => void
}

export default function Alert({ title, description, onClose }: AlertProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-5 right-5 left-5 sm:left-auto sm:right-5 
                   bg-white dark:bg-zinc-900 shadow-xl border border-white/20 
                   rounded-2xl p-4 flex items-start gap-3 max-w-sm mx-auto sm:mx-0
                   backdrop-blur-md z-[9999]"
      >
        <CheckCircleIcon className="text-green-500 mt-0.5 w-5 h-5 flex-shrink-0" />

        <div className="flex-1">
          <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{title}</h4>
          {description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              {description}
            </p>
          )}
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
          >
            <XIcon className="w-4 h-4" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
