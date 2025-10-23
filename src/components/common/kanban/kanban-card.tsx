"use client"

import { MessageSquare, ThumbsUp } from "lucide-react"
import type { Idea } from "@/lib/kanban/types"
import { Card } from "@/components/ui/card"

interface KanbanCardProps {
  idea: Idea
  onClick: () => void
}

export function KanbanCard({ idea, onClick }: KanbanCardProps) {
  const commentsCount = idea.comments?.length || 0
  const votesCount = idea.votes?.length || 0

  return (
    <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-card" onClick={onClick}>
      <h4 className="font-medium text-sm mb-2 line-clamp-2">{idea.title}</h4>
      <p className="text-xs text-muted-foreground line-clamp-3 mb-3">{idea.description}</p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <ThumbsUp className="w-3 h-3" />
          <span>{votesCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className="w-3 h-3" />
          <span>{commentsCount}</span>
        </div>
      </div>
    </Card>
  )
}
