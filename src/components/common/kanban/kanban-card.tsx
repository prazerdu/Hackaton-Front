import type { Idea } from "@/lib/kanban/types"

interface KanbanCardProps {
  idea: Idea
  onClick: () => void
}

export function KanbanCard({ idea, onClick }: KanbanCardProps) {
  return (
    <div
      onClick={onClick}
      className="p-3 bg-card rounded-lg shadow-sm border border-border cursor-pointer hover:bg-accent transition"
    >
      <h4 className="font-medium text-sm">{idea.title}</h4>
      {idea.description && (
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
          {idea.description}
        </p>
      )}
    </div>
  )
}
