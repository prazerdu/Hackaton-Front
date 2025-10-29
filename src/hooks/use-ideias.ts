"use client"

import { useEffect, useState } from "react"
import { ideasService } from "@/lib/kanban/services/ideas"
import type { Column, IDEA_STATUSES, Idea } from "@/lib/kanban/types"

export function useIdeas(challengeId: string) {
  const [columns, setColumns] = useState<Column[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!challengeId) return

    async function fetchIdeas() {
      setLoading(true)
      setError(null)
      try {
        const data = await ideasService.getIdeasByChallenge(challengeId)

        const mappedColumns: Column[] = Object.entries(data).map(([key, ideas]) => {
        const status = key as IDEA_STATUSES

        return {
          id: status,
          title: formatColumnTitle(status),
          color: getColumnColor(status),
          ideas: ideas as Idea[],
        }
      })
        setColumns(mappedColumns)
      } catch (err) {
        console.error("Erro ao carregar ideias:", err)
        setError("Erro ao carregar ideias.")
      } finally {
        setLoading(false)
      }
    }

    fetchIdeas()
  }, [challengeId])

  return { columns, loading, error }
}


function formatColumnTitle(status: IDEA_STATUSES): string {
  const map: Record<IDEA_STATUSES, string> = {
    GENERATION: "Geração/Captura",
    TRIAGE: "Triagem",
    IDEATION: "Ideação",
    IMPLEMENTATION: "Implementação",
    COMPLETED: "Concluído",
  }
  return map[status] || status
}

function getColumnColor(status: IDEA_STATUSES): string {
  const colors: Record<IDEA_STATUSES, string> = {
    GENERATION: "bg-blue-500",
    TRIAGE: "bg-purple-500",
    IDEATION: "bg-green-500",
    IMPLEMENTATION: "bg-orange-500",
    COMPLETED: "bg-red-500",
  }
  return colors[status]
}
