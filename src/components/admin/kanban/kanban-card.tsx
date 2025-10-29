"use client"

import { useDraggable } from "@dnd-kit/core"
import type { Idea } from "@/lib/kanban/types"

interface KanbanCardProps {
  idea: Idea
  onClick: () => void
}

export function KanbanCard({ idea, onClick }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: idea.id,
    data: { idea },
  })

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className="p-3 bg-card rounded-lg shadow-sm cursor-grab active:cursor-grabbing border border-border transition"
    >
      <h4 className="font-medium text-sm">{idea.title}</h4>
      {idea.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{idea.description}</p>}
    </div>
  )
}
