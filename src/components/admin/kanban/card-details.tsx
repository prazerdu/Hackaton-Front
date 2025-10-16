"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, ThumbsUp, Calendar, User } from "lucide-react"
import { DialogTitle } from "@radix-ui/react-dialog"
import { ideasService } from "@/lib/kanban/services/ideas"
import { Badge } from "@/components/ui/badge"
import AlertError from "../../alert-error"
import AlertSuccess from "../../alert-success"
import AlertInfo from "../../alert-info"
import type { Idea, Comment } from "@/lib/kanban/types"

interface CardDetailModalProps {
  idea: Idea | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onIdeaUpdated: () => void
}

export function CardDetailModal({ idea, open, onOpenChange, onIdeaUpdated }: CardDetailModalProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [votes, setVotes] = useState(0)
  const [newComment, setNewComment] = useState("")
  const [hasVoted, setHasVoted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alert, setAlert] = useState<"success" | "error" | "info" | null>(null)

  const canInteract = idea?.status === "IDEATION"

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
    console.error("Erro ao carregar comentários e votos:", error)
  }
}


    fetchData()
  }, [idea])

  if (!idea) return null

  const handleAddComment = async () => {
    if (!newComment.trim() || !canInteract) {
      setAlert("error")
      return
    }

    setIsSubmitting(true)
    const result = await ideasService.addComment(idea.id, newComment.trim())
    setIsSubmitting(false)

    if (result) {
      setComments((prev) => [...prev, result])
      setNewComment("")
      setAlert("success")
      onIdeaUpdated()
    } else {
      setAlert("error")
    }
  }

  // 🔹 Vota na ideia
  const handleVote = async () => {
    if (!canInteract) {
      setAlert("error")
      return
    }

    if (hasVoted) {
      setAlert("info")
      return
    }

    const result = await ideasService.voteIdea(idea.id)
    if (result) {
      setVotes((prev) => prev + 1)
      setHasVoted(true)
      setAlert("success")
      onIdeaUpdated()
    } else {
      setAlert("error")
    }
  }

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
          {/* Esquerda */}
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

            {/* Botão de voto */}
            <div className="flex items-center gap-4 pt-4 border-t">
              <Button
                variant={hasVoted ? "secondary" : "default"}
                size="sm"
                onClick={handleVote}
                disabled={!canInteract || hasVoted}
                className="flex items-center gap-2"
              >
                <ThumbsUp className="w-4 h-4" />
                {hasVoted ? "Votado" : "Votar"} ({votes})
              </Button>
              {!canInteract && (
                <p className="text-xs text-muted-foreground">
                  Votação e comentários disponíveis apenas na etapa de Ideação
                </p>
              )}
            </div>

            {alert === "success" && <AlertSuccess />}
            {alert === "error" && <AlertError />}
            {alert === "info" && <AlertInfo />}
          </div>

          {/* Direita — Comentários */}
          <div className="w-96 border-l overflow-y-auto p-4">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5" />
              <h3 className="text-sm font-semibold">Comentários ({comments.length})</h3>
            </div>

            <div className="mb-4">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={
                  canInteract ? "Adicione um comentário..." : "Comentários disponíveis apenas na etapa de Ideação"
                }
                className="min-h-[80px] resize-none text-sm mb-2"
                disabled={!canInteract || isSubmitting}
              />
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim() || !canInteract || isSubmitting}
                className="w-full"
                size="sm"
              >
                {isSubmitting ? "Enviando..." : "Comentar"}
              </Button>
            </div>

            {/* Lista de comentários */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Nenhum comentário ainda
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
