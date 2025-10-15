"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import type { Card } from "@/types/kanban"

interface AddCardModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddCard: (card: Omit<Card, "id">) => void
  columnId: string
}

export function AddCardModal({ open, onOpenChange, onAddCard }: AddCardModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [user, setUser] = useState("")
  const [tags, setTags] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !user.trim()) return

    const newCard: Omit<Card, "id"> = {
      title: title.trim(),
      description: description.trim(),
      user: user.trim(),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      date: new Date().toISOString().split("T")[0],
      comments: 0,
      attachments: 0,
    }

    onAddCard(newCard)

    // Reset form
    setTitle("")
    setDescription("")
    setUser("")
    setTags("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Card</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Automação de Processos Logísticos"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva a ideia ou desafio..."
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="user">Empresa *</Label>
              <Input
                id="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Nome da empresa"
                required
              />
            </div>

          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Ex: IA, Logística, Automação"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar Card</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
