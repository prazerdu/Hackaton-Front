"use client"

import type React from "react"
import { KanbanCard } from "./kanban-card"
import type { Column, Card } from "@/types/kanban"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface KanbanColumnProps {
  column: Column
  onDragStart: (card: Card, columnId: string) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (columnId: string) => void
  onCardClick: (card: Card) => void
  onAddCard: (columnId: string) => void
}

export function KanbanColumn({ column, onDragStart, onDragOver, onDrop, onCardClick, onAddCard }: KanbanColumnProps) {
  return (
    <div
      className="flex-shrink-0 w-80 bg-secondary/50 rounded-lg p-2"
      onDragOver={onDragOver}
      onDrop={() => onDrop(column.id)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${column.color}`} />
          <h3 className="font-semibold text-sm text-foreground">{column.title}</h3>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{column.cards.length}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={() => onAddCard(column.id)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-1 min-h-[500px]">
        {column.cards.map((card) => (
          <KanbanCard
            key={card.id}
            card={card}
            onDragStart={() => onDragStart(card, column.id)}
            onClick={() => onCardClick(card)}
          />
        ))}
      </div>
    </div>
  )
}
