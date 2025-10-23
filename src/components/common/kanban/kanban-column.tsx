"use client"

import { KanbanCard } from "@/components/common/kanban/kanban-card"
import type { Column, Idea } from "@/lib/kanban/types"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface KanbanColumnProps {
  column: Column
  onCardClick: (idea: Idea) => void
  onAddCard: () => void
}

export function KanbanColumn({ column, onCardClick, onAddCard }: KanbanColumnProps) {
  return (
    <div className="flex-shrink-0 w-80 rounded-lg p-4 transition-colors min-h-[500px] border border-border bg-secondary/50">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${column.color}`} />
          <h3 className="font-semibold text-sm text-foreground">{column.title}</h3>
          <span className="text-xs text-muted-foreground">({column.ideas.length})</span>
        </div>

        {/* Botão para adicionar cards */}
        {column.id === "GENERATION" && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={onAddCard}
          >
            <Plus className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {column.ideas.length > 0 ? (
          column.ideas.map((idea) => <KanbanCard key={idea.id} idea={idea} onClick={() => onCardClick(idea)} />)
        ) : (
          <div className="text-xs text-muted-foreground italic text-center py-4">Nenhuma ideia aqui ainda</div>
        )}
      </div>
    </div>
  )
}
