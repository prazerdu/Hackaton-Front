"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import api from "@/lib/kanban/api"
import type { POC, Challenge, Startup } from "@/types/poc"

interface EditPOCModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  poc: POC | null
  challenges: Challenge[]
  startups: Startup[]
  onSuccess: (poc: POC) => void
}

export function EditPOCModal({ open, onOpenChange, poc, challenges, startups, onSuccess }: EditPOCModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>(startups)
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>("")

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    challengeId: "",
    startupId: "",
    status: "IN_PROGRESS" as "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "PENDING",
  })

  // ✅ Carregar dados da POC quando o modal abrir
  useEffect(() => {
    if (poc) {
      setFormData({
        name: poc.name,
        description: poc.description,
        challengeId: poc.challengeId,
        startupId: poc.startupId,
        status: poc.status,
      })
      setSelectedChallengeId(poc.challengeId)

      const selectedChallenge = challenges.find((c) => c.id === poc.challengeId)
      if (selectedChallenge?.area) {
        const filtered = startups.filter((s) => s.area === selectedChallenge.area)
        setFilteredStartups(filtered.length > 0 ? filtered : startups)
      } else {
        setFilteredStartups(startups)
      }
    }
  }, [poc, challenges, startups])

  const handleChallengeChange = (challengeId: string) => {
    setSelectedChallengeId(challengeId)
    setFormData({ ...formData, challengeId, startupId: "" })

    const selectedChallenge = challenges.find((c) => c.id === challengeId)
    if (selectedChallenge?.area) {
      const filtered = startups.filter((s) => s.area === selectedChallenge.area)
      setFilteredStartups(filtered.length > 0 ? filtered : startups)
    } else {
      setFilteredStartups(startups)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!poc) return
    setIsSubmitting(true)

    try {
      const response = await api.put<POC>(`/pocs/${poc.id}`, formData)
      onSuccess(response.data)
      onOpenChange(false)
    } catch (error) {
      console.error("[EditPOCModal] Error updating POC:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar POC</DialogTitle>
          <DialogDescription>Atualize as informações da Prova de Conceito</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da POC</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="challenge">Desafio</Label>
            <Select value={formData.challengeId} onValueChange={handleChallengeChange} required>
              <SelectTrigger id="challenge" className="w-full">
                <SelectValue placeholder="Selecione um desafio" />
              </SelectTrigger>
              <SelectContent>
                {challenges.map((challenge) => (
                  <SelectItem key={challenge.id} value={challenge.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{challenge.name}</span>
                      {challenge.area && (
                        <span className="text-muted-foreground text-xs">
                          {challenge.title} • Área: {challenge.area}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startup">Startup</Label>
            <Select
              value={formData.startupId}
              onValueChange={(value) => setFormData({ ...formData, startupId: value })}
              required
              disabled={!selectedChallengeId}
            >
              <SelectTrigger id="startup" className="w-full">
                <SelectValue placeholder="Selecione uma startup" />
              </SelectTrigger>
              <SelectContent>
                {filteredStartups.map((startup) => (
                  <SelectItem key={startup.id} value={startup.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{startup.name}</span>
                      {startup.area && (
                        <span className="text-muted-foreground text-xs">{startup.area}</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED") =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pendente</SelectItem>
                <SelectItem value="IN_PROGRESS">Em Progresso</SelectItem>
                <SelectItem value="COMPLETED">Concluída</SelectItem>
                <SelectItem value="CANCELLED">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
