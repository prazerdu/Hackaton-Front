'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function NotFoundPage() {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-6">
        Ops! A página que você está procurando não foi encontrada.
      </p>
      <Button
        onClick={() => router.push('/home')}
        className="bg-primary hover:bg-primary/90 text-white"
      >
        Voltar para o início
      </Button>
    </div>
  )
}
