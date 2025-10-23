"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import axios, { AxiosError, AxiosResponse } from "axios"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Target, Award } from "lucide-react"
import api from "@/lib/kanban/api"
import { Spinner } from "@/components/ui/shadcn-io/spinner"

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

export default function PublicChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response: AxiosResponse<Challenge[]> = await api.get("/challenges/publics")
        setChallenges(response.data)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError
          console.error("[v0] Error fetching challenges:", axiosError.message)

          if (axiosError.response?.status === 401) {
            setError("Acesso não autorizado. Faça login novamente.")
          } else {
            setError("Erro ao carregar desafios.")
          }
        } else {
          console.error("Unknown error:", err)
          setError("Erro inesperado ao carregar desafios.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchChallenges()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
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
          <div className="flex justify-center items-center h-screen">
            <Spinner className="mb-44 text-[#8884d8]" variant="bars"/>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle className="text-destructive">Erro</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-balance">Desafios Públicos</h1>
        <p className="text-muted-foreground text-lg">Explore os desafios disponíveis e participe das oportunidades</p>
      </div>

      {challenges.length === 0 ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Nenhum desafio encontrado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Não há desafios públicos disponíveis no momento.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge className={getStatusColor(challenge.status)}>{challenge.status}</Badge>
                  <Badge variant="outline">{challenge.area}</Badge>
                </div>
                <CardTitle className="text-xl text-balance">{challenge.title}</CardTitle>
                <CardDescription className="line-clamp-2">{challenge.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 space-y-3">
                <div className="flex items-start gap-2 text-sm">
                  <Target className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-medium">Objetivos</p>
                    <p className="text-muted-foreground line-clamp-2">{challenge.objectives}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <Award className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-medium">Benefícios</p>
                    <p className="text-muted-foreground line-clamp-2">{challenge.benefits}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}
                  </span>
                </div>
              </CardContent>

              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`public-challenges/${challenge.id}`}>Ver Detalhes</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
