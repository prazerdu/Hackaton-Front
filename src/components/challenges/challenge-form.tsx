"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import axios from "axios"

interface ChallengeFormData {
  title: string
  description: string
  objectives: string
  area: string
  benefits: string
  startDate: string
  endDate: string
  isPublic: boolean
  status: "DRAFT" | "PUBLISHED" | "CLOSED"
}

export function ChallengeForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ChallengeFormData>({
    title: "",
    description: "",
    objectives: "",
    area: "",
    benefits: "",
    startDate: "",
    endDate: "",
    isPublic: false,
    status: "DRAFT",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value as ChallengeFormData["status"] }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isPublic: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL

      const payload = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      }

      const response = await axios.post(`${apiUrl}/challenges`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("✅ Desafio criado com sucesso!", response.data)

      setFormData({
        title: "",
        description: "",
        objectives: "",
        area: "",
        benefits: "",
        startDate: "",
        endDate: "",
        isPublic: false,
        status: "DRAFT",
      })
    } catch (error) {
      console.error("❌ Erro ao criar desafio:", error)

      if (axios.isAxiosError(error)) {
        console.error("Mensagem do servidor:", error.response?.data?.message || error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Detalhes do Desafio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-semibold">
              Título *
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Ex: Desafio Sustentabilidade 2025"
              required
              className="border-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-semibold">
              Descrição *
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Descreva o problema que precisa ser resolvido..."
              required
              rows={4}
              className="border-2 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="objectives" className="text-base font-semibold">
              Objetivos *
            </Label>
            <Textarea
              id="objectives"
              name="objectives"
              value={formData.objectives}
              onChange={handleInputChange}
              placeholder="Quais são os objetivos deste desafio?"
              required
              rows={3}
              className="border-2 resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Challenge Scope Section */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Escopo e Benefícios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="area" className="text-base font-semibold">
              Área *
            </Label>
            <Input
              id="area"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              placeholder="Ex: Sustentabilidade, Tecnologia, Saúde..."
              required
              className="border-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="benefits" className="text-base font-semibold">
              Benefícios *
            </Label>
            <Input
              id="benefits"
              name="benefits"
              value={formData.benefits}
              onChange={handleInputChange}
              placeholder="Ex: 1100 R$ ANUAL"
              required
              className="border-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Timeline Section */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Cronograma</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-base font-semibold">
                Data de Início *
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                required
                className="border-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-base font-semibold">
                Data de Término *
              </Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                required
                className="border-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Section */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Configurações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="isPublic" className="text-base font-semibold">
                Desafio Público
              </Label>
              <p className="text-sm text-muted-foreground">Tornar este desafio visível publicamente</p>
            </div>
            <Switch id="isPublic" checked={formData.isPublic} onCheckedChange={handleSwitchChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-base font-semibold">
              Status *
            </Label>
            <Select value={formData.status} onValueChange={handleSelectChange}>
              <SelectTrigger className="border-2">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Rascunho</SelectItem>
                <SelectItem value="PUBLISHED">Publicado</SelectItem>
                <SelectItem value="CLOSED">Fechado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setFormData({
              title: "",
              description: "",
              objectives: "",
              area: "",
              benefits: "",
              startDate: "",
              endDate: "",
              isPublic: false,
              status: "DRAFT",
            })
          }}
          disabled={isLoading}
          className="border-2"
        >
          Limpar
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-accent hover:bg-accent/90 text-accent-foreground min-w-[140px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Criando...
            </>
          ) : (
            "Criar Desafio"
          )}
        </Button>
      </div>
    </form>
  )
}
