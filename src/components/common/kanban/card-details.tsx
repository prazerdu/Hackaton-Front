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
  const [currentIdea, setCurrentIdea] = useState<Idea | null>(null)

  const statusOrder = ["GENERATION", "TRIAGE", "IDEATION", "IMPLEMENTATION", "COMPLETED"]
  const currentStatusIndex = currentIdea ? statusOrder.indexOf(currentIdea.status) : -1
  const ideationIndex = statusOrder.indexOf("IDEATION")

  const canInteract = currentIdea?.status === "IDEATION"
  const showComments = currentStatusIndex >= ideationIndex

  useEffect(() => {
    const fetchData = async () => {
      if (!idea?.id) return

      console.log("[v0] Fetching idea data from API for idea:", idea.id)
      const freshIdea = await ideasService.getIdeaById(idea.id, idea.challengeId)
      if (freshIdea) {
        console.log("[v0] Fresh idea status from API:", freshIdea.status)
        setCurrentIdea(freshIdea)
        setComments(freshIdea.comments || [])
        setVotes(freshIdea.votes?.length || 0)
      }
    }

    if (open) {
      fetchData()
    } else {
      setAlert(null)
    }
  }, [idea?.id, idea?.challengeId, open]);

  if (!idea || !currentIdea) return null

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      setAlert("error")
      setTimeout(() => setAlert(null), 3000)
      return
    }

    if (!canInteract) {
      setAlert("info")
      setTimeout(() => setAlert(null), 3000)
      return
    }

    setIsSubmitting(true)
    const result = await ideasService.addComment(currentIdea.id, newComment.trim())
    setIsSubmitting(false)

    if (result) {
      setComments((prev) => [...prev, result])
      setNewComment("")
      setAlert("success")
      setTimeout(() => setAlert(null), 3000)
      onIdeaUpdated()
    } else {
      setAlert("error")
      setTimeout(() => setAlert(null), 3000)
    }
  }

  const handleVote = async () => {
    if (hasVoted) {
      setAlert("info")
      setTimeout(() => setAlert(null), 3000)
      return
    }

    if (!canInteract) {
      setAlert("info")
      setTimeout(() => setAlert(null), 3000)
      return
    }

    const result = await ideasService.voteIdea(currentIdea.id)
    if (result) {
      setVotes((prev) => prev + 1)
      setHasVoted(true)
      setAlert("success")
      setTimeout(() => setAlert(null), 3000)
      onIdeaUpdated()
    } else {
      setAlert("error")
      setTimeout(() => setAlert(null), 3000)
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
    return colors[status?.toUpperCase()] || "bg-gray-500"
  }

  const getAuthorName = () => {
    if (typeof currentIdea.createdById === "object" && currentIdea.createdById?.name) {
      return currentIdea.createdById.name
    }
    return String(currentIdea.createdById)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-4xl w-[90vw] overflow-hidden p-0 gap-0">
        <DialogTitle className="sr-only">{currentIdea.title}</DialogTitle>
        <div className="flex items-center justify-between p-4 border-b">
          <Badge className={`${getStatusBadgeColor(currentIdea.status)} text-white`}>{currentIdea.status}</Badge>
        </div>

        <div className="flex overflow-hidden h-[calc(95vh-73px)]">
          {/* Coluna esquerda - Detalhes da ideia */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{currentIdea.title}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{getAuthorName()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(currentIdea.createdAt).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Descrição</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{currentIdea.description}</p>
            </div>

            {canInteract && (
              <div className="flex items-center gap-4 pt-4 border-t">
                <Button
                  variant={hasVoted ? "secondary" : "default"}
                  size="sm"
                  onClick={handleVote}
                  disabled={hasVoted}
                  className="flex items-center gap-2"
                >
                  <ThumbsUp className="w-4 h-4" />
                  {hasVoted ? "Votado" : "Votar"} ({votes})
                </Button>
              </div>
            )}
            {/* </CHANGE> */}

            {alert === "success" && <AlertSuccess />}
            {alert === "error" && <AlertError />}
            {alert === "info" && <AlertInfo />}
          </div>

          {showComments && (
            <div className="w-96 border-l overflow-y-auto p-4">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5" />
                <h3 className="text-sm font-semibold">Comentários ({comments.length})</h3>
              </div>

              {/* Only show comment input in IDEATION */}
              {canInteract && (
                <div className="mb-4">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Adicione um comentário..."
                    className="min-h-[80px] resize-none text-sm mb-2"
                    disabled={isSubmitting}
                  />
                  <Button
                    onClick={handleAddComment}
                    disabled={!newComment.trim() || isSubmitting}
                    className="w-full"
                    size="sm"
                  >
                    {isSubmitting ? "Enviando..." : "Comentar"}
                  </Button>
                </div>
              )}

              {/* Comments list - visible in IDEATION and after */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    {canInteract ? "Nenhum comentário ainda. Seja o primeiro a comentar!" : "Nenhum comentário"}
                  </p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex flex-col border-b pb-3 last:border-b-0">
                      <p className="text-sm text-foreground mb-1">{comment.content}</p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          {/* </CHANGE> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
