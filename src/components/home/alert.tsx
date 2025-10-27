"use client"

import { useEffect } from "react"
import { CheckCircleIcon, XIcon } from "lucide-react"

type AlertProps = {
  title: string
  description: string
  onClose: () => void
}

const Alert = ({ title, description, onClose }: AlertProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 4000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md animate-in slide-in-from-top-2 fade-in-0">
      <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-green-900 dark:text-green-100">{title}</h3>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Alert
