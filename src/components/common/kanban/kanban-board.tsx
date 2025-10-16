"use client"

import { useEffect, useState, useCallback } from "react"
import { KanbanColumn } from "./kanban-column"
import { CardDetailModal } from "./card-details"
import { AddCardModal } from "./add-card"
import type { Idea, Column } from "@/lib/kanban/types"
import { ideasService } from "@/lib/kanban/services/ideas"

function decodeToken(token: string) {
  try {
    const payload = token.split(".")[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

const COLUMNS: Omit<Column, "ideas">[] = [
  { id: "GENERATION", title: "Geração/Captura", color: "bg-blue-500" },
  { id: "TRIAGE", title: "Triagem", color: "bg-purple-500" },
  { id: "IDEATION", title: "Ideação", color: "bg-green-500" },
  { id: "IMPLEMENTATION", title: "Implementação", color: "bg-orange-500" },
  { id: "COMPLETED", title: "Concluído", color: "bg-red-500" },
]

export function KanbanBoard({ challengeId }: { challengeId: string }) {
  const [columns, setColumns] = useState<Column[]>([])
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [, setUserRole] = useState<string>("")

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null
    if (token) {
      const decoded = decodeToken(token)
      if (decoded?.role) {
        setUserRole(decoded.role.toUpperCase())
      }
    }
  }, [])

  const fetchIdeas = useCallback(async () => {
    setLoading(true)
    const ideasByStatus = await ideasService.getIdeasByChallenge(challengeId)

    const newColumns: Column[] = COLUMNS.map((col) => ({
      ...col,
      ideas: ideasByStatus[col.id] || [],
    }))

    setColumns(newColumns)
    setLoading(false)
  }, [challengeId])

  useEffect(() => {
    fetchIdeas()
  }, [fetchIdeas])

  if (loading) {
    return <div className="p-6 text-muted-foreground">Carregando ideias...</div>
  }

  return (
    <div className="flex gap-4 p-6 overflow-x-auto">
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          onCardClick={(idea) => {
            setSelectedIdea(idea)
            setIsDetailModalOpen(true)
          }}
          onAddCard={() => setIsAddModalOpen(true)}
        />
      ))}

      <CardDetailModal
        idea={selectedIdea}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        onIdeaUpdated={fetchIdeas}
      />

      <AddCardModal
        challengeId={challengeId}
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onIdeaCreated={fetchIdeas}
      />
    </div>
  )
}
