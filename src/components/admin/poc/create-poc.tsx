"use client"

import type React from "react"

import { useState } from "react"
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
import type { POC, Challenge, Startup, CreatePOCData } from "@/types/poc"

interface CreatePOCModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  challenges: Challenge[]
  startups: Startup[]
  onSuccess: (poc: POC) => void
}

export function CreatePOCModal({ open, onOpenChange, challenges, startups, onSuccess }: CreatePOCModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>("")
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>(startups)

  const [formData, setFormData] = useState<CreatePOCData>({
    name: "",
    description: "",
    challengeId: "",
    startupId: "",
    status: "PENDING",
  })

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
    setIsSubmitting(true)

    try {
      const response = await api.post<POC>("/pocs", formData)
      onSuccess(response.data)

      setFormData({
        name: "",
        description: "",
        challengeId: "",
        startupId: "",
        status: "PENDING",
      })
      setSelectedChallengeId("")
      setFilteredStartups(startups)
    } catch (error) {
      console.error("[v0] Error creating POC:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Criar Nova POC</DialogTitle>
          <DialogDescription>Preencha os dados para criar uma nova Prova de Conceito</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da POC</Label>
            <Input
              id="name"
              placeholder="Ex: Teste IoT Saúde"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva o objetivo da POC..."
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
                      {challenge.title && <span className="text-muted-foreground text-xs">{challenge.title} Area:{challenge.area}</span>}
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
                      {startup.area && <span className="text-muted-foreground text-xs">{startup.area}</span>}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedChallengeId && filteredStartups.length === 0 && (
              <p className="text-muted-foreground text-xs">Nenhuma startup encontrada para esta área</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED") =>
              setFormData({ ...formData, status: value })}>
              <SelectTrigger id="status" className="w-full">
                <SelectValue />
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
              Criar POC
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
