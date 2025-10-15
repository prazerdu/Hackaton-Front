"use client"

import type { Card } from "@/types/kanban"
import { Calendar, UserCircle2 } from "lucide-react"

interface KanbanCardProps {
  card: Card
  onDragStart: () => void
  onClick: () => void
}

export function KanbanCard({ card, onDragStart, onClick }: KanbanCardProps) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="bg-card rounded-lg p-3 shadow-sm border border-border hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-sm text-card-foreground leading-tight flex-1">{card.title}</h4>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {card.tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <UserCircle2 className="w-3 h-3" />
          <span>{card.user}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{new Date(card.date).toLocaleDateString("pt-BR")}</span>
        </div>
      </div>
    </div>
  )
}
