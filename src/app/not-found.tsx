'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

export default function NotFoundPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6 bg-gradient-to-b from-background to-muted">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6"
        >
          <AlertTriangle className="w-12 h-12 text-primary" />
        </motion.div>

        <h1 className="text-7xl font-bold mb-2 text-foreground">404</h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-md">
          Oops! A página que você tentou acessar não existe ou foi movida.
        </p>

        <div className="flex gap-3">
          <Button
            variant={'outline'}
            onClick={() => router.push('/')}
            className="bg-primary hover:bg-primary/90"
          >
            Ir para o início
          </Button>
          <Button
            variant="outline"
            onClick={() => router.back()}
          >
            Voltar
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
