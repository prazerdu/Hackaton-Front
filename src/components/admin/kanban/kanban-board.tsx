"use client"

import { useEffect, useState, useCallback } from "react"
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  pointerWithin,
} from "@dnd-kit/core"
import { KanbanColumn } from "./kanban-column"
import { KanbanCard } from "./kanban-card"
import { CardDetailModal } from "./card-details"
import { AddCardModal } from "./add-card"
import type { Idea, IDEA_STATUSES, Column } from "@/lib/kanban/types"
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
  const [activeIdea, setActiveIdea] = useState<Idea | null>(null)
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<string>("")
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null
    if (token) {
      setAccessToken(token)
      const decoded = decodeToken(token)
      if (decoded?.role) {
        setUserRole(decoded.role.toUpperCase())
      }
    }
  }, [])

  const canUpdateStatus = ["MANAGER", "EVALUATOR"].includes(userRole)

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

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const idea = columns.flatMap((col) => col.ideas).find((i) => String(i.id) === String(active.id))
    setActiveIdea(idea || null)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveIdea(null)
    if (!over) return

    const ideaId = String(active.id)
    const newStatus = String(over.id) as IDEA_STATUSES

    const sourceColumn = columns.find((col) => col.ideas.some((i) => String(i.id) === ideaId))
    if (!sourceColumn) return
    if (sourceColumn.id === newStatus) return

    const movedIdea = sourceColumn.ideas.find((i) => String(i.id) === ideaId)
    if (!movedIdea) return

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === sourceColumn.id) {
          return { ...col, ideas: col.ideas.filter((i) => String(i.id) !== ideaId) }
        }
        if (col.id === newStatus) {
          return { ...col, ideas: [...col.ideas, { ...movedIdea, status: newStatus }] }
        }
        return col
      }),
    )

    if (canUpdateStatus && accessToken) {
      try {
        await ideasService.updateIdeaStatus(ideaId, newStatus)
      } catch (err) {
        console.error("Erro ao atualizar status:", err)
        await fetchIdeas()
      }
    } else {
      await fetchIdeas()
    }
  }

  if (loading) {
    return <div className="p-6 text-muted-foreground">Carregando ideias...</div>
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={pointerWithin}
    >
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
      </div>

      <DragOverlay>
        {activeIdea ? (
          <div className="rotate-3 opacity-80">
            <KanbanCard idea={activeIdea} onClick={() => {}} />
          </div>
        ) : null}
      </DragOverlay>

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
    </DndContext>
  )
}
