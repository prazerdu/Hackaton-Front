"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import {
  IconArrowLeft,
  IconAward,
  IconBulbFilled,
  IconCalendar,
  IconTargetArrow,
} from "@tabler/icons-react"

interface Idea {
  id: string
  title: string
  description?: string
  status: string
  createdAt: string
}

interface Challenge {
  id: string
  title: string
  description: string
  objectives: string
  area: string
  benefits: string
  startDate: string
  endDate: string
  status: string
  createdBy: { name: string }
  createdAt: string
  updatedAt: string
  ideas: Idea[]
}

export default function ChallengeDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = Array.isArray(params?.id) ? params.id[0] : params.id
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchChallenge = async () => {
      const token = localStorage.getItem("access_token")
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/challenges/${id}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          }
        )
        setChallenge(res.data)
      } catch (err) {
        console.error("Erro ao buscar desafio:", err)
        setError("Não foi possível carregar este desafio.")
      } finally {
        setLoading(false)
      }
    }

    fetchChallenge()
  }, [id])

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })

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
      <div className="flex justify-center items-center h-[70vh]">
        <Spinner className="text-[#8884d8]" variant="bars" />
      </div>
    )
  }

  if (error || !challenge) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle className="text-destructive">Erro</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.back()}>Voltar</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <Button
        variant="outline"
        className="mb-6 flex items-center gap-2"
        onClick={() => router.back()}
      >
        <IconArrowLeft className="h-4 w-4" /> Voltar
      </Button>

      {/* CARD PRINCIPAL */}
      <Card className="shadow-md border border-border/60 mb-8">
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <Badge className={getStatusColor(challenge.status)}>
              {challenge.status}
            </Badge>
            <Badge variant="outline">{challenge.area}</Badge>
          </div>
          <CardTitle className="text-2xl font-bold">{challenge.title}</CardTitle>
          <CardDescription>
            Criado por{" "}
            <span className="font-medium">{challenge.createdBy?.name}</span> em{" "}
            {formatDate(challenge.createdAt)}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 text-muted-foreground">
          <section>
            <h3 className="font-semibold text-foreground mb-1">Descrição</h3>
            <p>{challenge.description || "Sem descrição disponível."}</p>
          </section>

          <section className="flex items-start gap-3">
            <IconTargetArrow className="h-5 w-5 mt-1 text-muted-foreground flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Objetivos</h3>
              <p>{challenge.objectives || "Nenhum objetivo informado."}</p>
            </div>
          </section>

          <section className="flex items-start gap-3">
            <IconAward className="h-5 w-5 mt-1 text-muted-foreground flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Benefícios</h3>
              <p>{challenge.benefits || "Nenhum benefício informado."}</p>
            </div>
          </section>

          <section className="flex items-center gap-2 text-sm text-muted-foreground">
            <IconCalendar className="h-4 w-4" />
            <span>
              {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}
            </span>
          </section>
        </CardContent>
      </Card>

      <section className="pt-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-lg">
          <IconBulbFilled className="h-5 w-5 text-yellow-500" />
          {challenge.ideas?.length || 0} Ideias
        </h3>

        {challenge.ideas && challenge.ideas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {challenge.ideas.map((idea) => (
              <Card
                key={idea.id}
                className="border border-border/70 hover:border-primary/50 hover:shadow-lg transition-all duration-200 rounded-2xl"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">
                    {idea.title}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="mt-1 capitalize text-xs w-fit"
                  >
                    {idea.status}
                  </Badge>
                </CardHeader>
                <CardFooter className="text-xs text-muted-foreground">
                  Criada em {formatDate(idea.createdAt)}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            Nenhuma ideia foi submetida ainda.
          </p>
        )}
      </section>
    </div>
  )
}
