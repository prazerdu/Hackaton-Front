"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, ThumbsUp, Calendar } from "lucide-react"
import { DialogTitle } from "@radix-ui/react-dialog"
import { ideasService } from "@/lib/kanban/services/ideas"
import { Badge } from "@/components/ui/badge"
import AlertError from "./alert-error"
import AlertSuccess from "./alert-success"
import AlertInfo from "./alert-info"
import type { Idea, Comment } from "@/lib/kanban/types"

interface CardDetailModalProps {
  idea: Idea | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onIdeaUpdated: () => void
}

export function CardDetailModal({ idea, open, onOpenChange, onIdeaUpdated }: CardDetailModalProps) {
  const [currentIdea, setCurrentIdea] = useState<Idea | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [votes, setVotes] = useState(0)
  const [newComment, setNewComment] = useState("")
  const [hasVoted, setHasVoted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alert, setAlert] = useState<"success" | "error" | "info" | null>(null)

  const canInteract = currentIdea?.status === "IDEATION"

  useEffect(() => {
  const fetchData = async () => {
    if (!idea?.id || !idea?.challengeId || !open) return

    try {
      const current = await ideasService.getIdeaById(idea.id, idea.challengeId)
      if (current) {
        setCurrentIdea(current)
        setComments(current.comments || [])
        setVotes(current.votes?.length || 0)

        const userId = localStorage.getItem("userId")
        setHasVoted(current.votes?.some((v) => v.userId === userId) || false)
      }
    } catch (error) {
      console.error("Erro ao carregar comentários e votos:", error)
    }
  }

  fetchData()
}, [idea?.id, idea?.challengeId, open])


  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [alert])

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

  const handleVote = async () => {
    if (!canInteract) return setAlert("error")
    if (hasVoted) return setAlert("info")

    const result = await ideasService.voteIdea(idea.id)
    if (result) {
      setHasVoted(true)
      setVotes((prev) => prev + 1)
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

  const displayIdea = currentIdea || idea

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] max-w-5xl p-0 overflow-hidden">
        <DialogTitle />

        <div className="flex items-center justify-between p-4 border-b">
          <Badge className={`${getStatusBadgeColor(displayIdea.status)} text-white`}>
            {displayIdea.status}
          </Badge>
        </div>

        <div className="flex flex-col md:flex-row h-[calc(95vh-73px)] overflow-hidden">
          {/* Esquerda */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{displayIdea.title}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(displayIdea.createdAt).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Descrição</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{displayIdea.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 pt-4 border-t">
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
          <div className="w-full md:w-96 border-t md:border-t-0 md:border-l p-4 overflow-y-auto">
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

            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">Nenhum comentário ainda</p>
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
