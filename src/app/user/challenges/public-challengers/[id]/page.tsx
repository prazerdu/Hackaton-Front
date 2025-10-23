"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Target, Award, Building2, ArrowLeft } from "lucide-react"

interface Challenge {
  id: string
  title: string
  description: string
  objectives: string
  area: string
  benefits: string
  startDate: string
  endDate: string
  isPublic: boolean
  status: string
  companyId: string
  createdById: string
  createdAt: string
  updatedAt: string
}

export default function ChallengeDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/challenges/${params.id}`)
        setChallenge(response.data)
      } catch (err) {
        setError("Erro ao carregar detalhes do desafio")
        console.error("[v0] Error fetching challenge details:", err)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchChallenge()
    }
  }, [params.id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      DRAFT: "bg-muted text-muted-foreground",
      ACTIVE: "bg-green-500 text-white",
      CLOSED: "bg-destructive text-destructive-foreground",
    }
    return colors[status] || "bg-secondary text-secondary-foreground"
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando detalhes...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !challenge) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle className="text-destructive">Erro</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error || "Desafio não encontrado"}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para Desafios
      </Button>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div className="flex flex-wrap gap-2">
              <Badge className={getStatusColor(challenge.status)}>{challenge.status}</Badge>
              <Badge variant="outline">{challenge.area}</Badge>
              {challenge.isPublic && <Badge variant="secondary">Público</Badge>}
            </div>
          </div>

          <CardTitle className="text-3xl text-balance">{challenge.title}</CardTitle>
          <CardDescription className="text-base mt-2">{challenge.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Separator />

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Objetivos</h3>
                <p className="text-muted-foreground leading-relaxed">{challenge.objectives}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <Award className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Benefícios</h3>
                <p className="text-muted-foreground leading-relaxed">{challenge.benefits}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Período</h3>
                <div className="space-y-1 text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Início:</span> {formatDate(challenge.startDate)}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Término:</span> {formatDate(challenge.endDate)}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Informações Adicionais</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">ID da Empresa:</span> {challenge.companyId}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Criado em:</span> {formatDate(challenge.createdAt)}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Atualizado em:</span>{" "}
                    {formatDate(challenge.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex gap-3">
            <Button className="flex-1">Participar do Desafio</Button>
            <Button variant="outline">Compartilhar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
