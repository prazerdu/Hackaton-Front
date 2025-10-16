"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { challengesService } from "@/lib/kanban/services/challenges"
import type { Challenge } from "@/lib/kanban/types"
import { Skeleton } from "@/components/ui/skeleton"
import { KanbanBoard } from "@/components/kanban/kanban-board"
import { Lightbulb } from "lucide-react"

export default function ChallengeKanbanPage() {
  const params = useParams()
  const id = params.id as string
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChallenge = async () => {
      setLoading(true)
      const data = await challengesService.getById(id)
      setChallenge(data)
      setLoading(false)
    }

    if (id) {
      fetchChallenge()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen">
        <header className="border-b border-border">
          <div className="px-6 py-4">
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
        </header>
        <main className="p-6">
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="w-80 h-96" />
            ))}
          </div>
        </main>
      </div>
    )
  }

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Desafio não encontrado</h1>
          <p className="text-muted-foreground">O desafio com ID {id} não foi encontrado.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-background">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <Lightbulb className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{challenge.title}</h1>
              {challenge.description && <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>}
            </div>
          </div>
        </div>
      </header>

      <main>
        <KanbanBoard challengeId={id} />
      </main>
    </div>
  )
}
