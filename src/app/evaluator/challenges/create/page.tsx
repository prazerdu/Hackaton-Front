"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { getCurrentUser } from "@/utils/get-current-user"
import { useRouter } from "next/navigation"

export default function AddChallengePage() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [objectives, setObjectives] = useState("")
  const [area, setArea] = useState("")
  const [benefits, setBenefits] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [status, setStatus] = useState("DRAFT")
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) setUserName(currentUser.name)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const challengeData = {
      title,
      description,
      objectives,
      area,
      benefits,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      isPublic,
      status,
    }

    try {
      const token = localStorage.getItem("access_token")

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/challenges`,
        challengeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      console.log("Desafio criado com sucesso!")
      window.location.reload()
    } catch (error) {
      console.error("Erro ao criar desafio:", error)
    }
  }

  return (
    <div className="container max-w-2xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Criar Novo Desafio</CardTitle>
          <CardDescription>Preencha as informações abaixo para cadastrar um novo desafio</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Criador */}
            <div>
              <Label>Criado por</Label>
              <Input value={userName} readOnly disabled className="bg-muted cursor-not-allowed" />
            </div>

            {/* Título */}
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Desafio Sustentabilidade 2025"
                required
              />
            </div>

            {/* Descrição */}
            <div>
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explique o desafio..."
                className="min-h-[100px]"
                required
              />
            </div>

            {/* Objetivos */}
            <div>
              <Label htmlFor="objectives">Objetivos *</Label>
              <Textarea
                id="objectives"
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
                placeholder="Resolver problema X..."
                className="min-h-[80px]"
                required
              />
            </div>

            {/* Área e Benefícios */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="area">Área *</Label>
                <Input
                  id="area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Sustentabilidade, Tecnologia..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="benefits">Benefícios *</Label>
                <Input
                  id="benefits"
                  value={benefits}
                  onChange={(e) => setBenefits(e.target.value)}
                  placeholder="Ex: 1000 R$ ANUAL"
                  required
                />
              </div>
            </div>

            {/* Datas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Data de Início *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="endDate">Data de Encerramento *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="DRAFT">Rascunho</option>
                <option value="OPEN">Aberto</option>
                <option value="CLOSED">Fechado</option>
                <option value="ARCHIVED">Arquivado</option>
              </select>
            </div>

            {/* Público */}
            <div className="flex items-center gap-2">
              <input
                id="isPublic"
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              <Label htmlFor="isPublic">Tornar público</Label>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" form="addChallengeForm">
            Criar Desafio
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
