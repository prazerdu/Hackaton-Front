"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, ThumbsUp, Calendar, User } from "lucide-react"
import { DialogTitle } from "@radix-ui/react-dialog"
import { ideasService } from "@/lib/kanban/services/ideas"
import { Badge } from "@/components/ui/badge"
import type { Idea, Comment } from "@/lib/kanban/types"

interface CardDetailModalProps {
  idea: Idea | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CardDetailModal({ idea, open, onOpenChange }: CardDetailModalProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [votes, setVotes] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      if (!idea?.challengeId) return
      try {
        const ideasByStatus = await ideasService.getIdeasByChallenge(idea.challengeId)
        const allIdeas = Object.values(ideasByStatus).flat()
        const current = allIdeas.find((i: Idea) => i.id === idea.id)
        if (current) {
          setComments(current.comments || [])
          setVotes(current.votes?.length || 0)
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes da ideia:", error)
      }
    }

    fetchData()
  }, [idea])

  if (!idea) return null

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      GENERATION: "bg-blue-500",
      TRIAGE: "bg-purple-500",
      IDEATION: "bg-green-500",
      IMPLEMENTATION: "bg-orange-500",
      COMPLETED: "bg-red-500",
    }
    return colors[status] || "bg-gray-500"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-4xl w-[90vw] overflow-hidden p-0 gap-0">
        <DialogTitle />
        <div className="flex items-center justify-between p-4 border-b">
          <Badge className={`${getStatusBadgeColor(idea.status)} text-white`}>
            {idea.status}
          </Badge>
        </div>

        <div className="flex overflow-hidden h-[calc(95vh-73px)]">
          {/* Esquerda — informações da ideia */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{idea.title}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{String(idea.createdById)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(idea.createdAt).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Descrição</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {idea.description}
              </p>
            </div>

            {/* Botão de voto (somente visual) */}
            <div className="flex items-center gap-4 pt-4 border-t">
              <Button
                variant="secondary"
                size="sm"
                disabled
                className="flex items-center gap-2 opacity-70 cursor-not-allowed"
              >
                <ThumbsUp className="w-4 h-4" />
                Votar ({votes})
              </Button>
              <p className="text-xs text-muted-foreground">
                Votação desativada neste modo
              </p>
            </div>
          </div>

          {/* Direita — Comentários */}
          <div className="w-96 border-l overflow-y-auto p-4">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5" />
              <h3 className="text-sm font-semibold">Comentários ({comments.length})</h3>
            </div>

            {/* Área de comentário (somente visual) */}
            <div className="mb-4">
              <Textarea
                placeholder="Comentários desativados neste modo"
                className="min-h-[80px] resize-none text-sm mb-2 opacity-70 cursor-not-allowed"
                disabled
              />
              <Button
                className="w-full opacity-70 cursor-not-allowed"
                size="sm"
                disabled
              >
                Comentar
              </Button>
            </div>

            {/* Lista de comentários */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Nenhum comentário ainda.
                </p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex flex-col border-b pb-2">
                    <p className="text-sm text-muted-foreground">{comment.content}</p>
                    <span className="text-xs text-muted-foreground mt-1">
                      {new Date(comment.createdAt).toLocaleString("pt-BR")}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
