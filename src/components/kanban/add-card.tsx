"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ideasService } from "@/lib/kanban/services/ideas"

interface AddCardModalProps {
  challengeId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onIdeaCreated: () => void
}

export function AddCardModal({ challengeId, open, onOpenChange, onIdeaCreated }: AddCardModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !description.trim()) {
      return
    }

    setIsSubmitting(true)

    const result = await ideasService.createIdea({
      title: title.trim(),
      description: description.trim(),
      challengeId,
    })

    setIsSubmitting(false)

    if (result) {
      setTitle("")
      setDescription("")
      onOpenChange(false)
      onIdeaCreated()
    } else {
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Submeter Nova Ideia</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título da Ideia *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Automação de processos com IA"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva sua ideia em detalhes..."
              className="min-h-[150px]"
              required
              disabled={isSubmitting}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submetendo..." : "Submeter Ideia"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
