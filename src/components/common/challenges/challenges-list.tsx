"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
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
import { IconCalendar, IconCirclePlus } from "@tabler/icons-react"
import { EmptyChallenges } from "@/components/challenges/empty"

interface Challenge {
  id: string
  title: string
  createdAt: string
  status: string
  area?: string
}

interface TokenPayload {
  sub: string
  role: string
  companyId: string
  exp: number
}

export default function MyChallengesUser() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const challengesPerPage = 6

  useEffect(() => {
    const fetchChallenges = async () => {
      const token = localStorage.getItem("access_token")
      if (!token) {
        console.warn("Token não encontrado")
        setLoading(false)
        return
      }

      try {
        const decoded: TokenPayload = jwtDecode(token)
        if (Date.now() >= decoded.exp * 1000) {
          console.warn("Token expirado")
          localStorage.removeItem("access_token")
          setLoading(false)
          return
        }

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/challenges`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        setChallenges(res.data)
      } catch (error) {
        console.error("Erro ao buscar desafios:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchChallenges()
  }, [])

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      DRAFT: "bg-muted text-muted-foreground",
      ACTIVE: "bg-green-500 text-white",
      CLOSED: "bg-destructive text-destructive-foreground",
      "Em aberto": "bg-blue-500 text-white",
    }
    return colors[status] || "bg-secondary text-secondary-foreground"
  }

  const totalPages = Math.ceil(challenges.length / challengesPerPage)
  const startIndex = (currentPage - 1) * challengesPerPage
  const endIndex = startIndex + challengesPerPage
  const paginatedChallenges = challenges.slice(startIndex, endIndex)

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Spinner className="text-primary" variant="bars" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-1 text-balance">Meus Desafios</h1>
          <p className="text-muted-foreground text-lg">
            Gerencie e acompanhe os desafios criados pela sua organização
          </p>
        </div>
        <Button asChild className="flex items-center gap-2">
          <Link href="/admin/challenges/create">
            <IconCirclePlus className="h-4 w-4" /> Criar desafio
          </Link>
        </Button>
      </div>

      {challenges.length === 0 ? (
        <EmptyChallenges />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedChallenges.map((challenge) => (
              <Card
                key={challenge.id}
                className="flex flex-col hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge className={getStatusColor(challenge.status)}>
                      {challenge.status || "Em aberto"}
                    </Badge>
                    {challenge.area && (
                      <Badge variant="outline">{challenge.area}</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl text-balance">
                    {challenge.title}
                  </CardTitle>
                  <CardDescription>
                    Criado em {formatDate(challenge.createdAt)}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 text-sm text-muted-foreground space-y-3">
                  <div className="flex items-center gap-2">
                    <IconCalendar className="h-4 w-4 text-muted-foreground" />
                    <span>Última atualização: {formatDate(challenge.createdAt)}</span>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Button asChild variant="default" className="flex-1">
                    <Link href={`/user/challenges/my-challenges/${challenge.id}`}>
                      Ver detalhes
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <Link href={`/user/funil/kanban/${challenge.id}`}>
                      Ver no kanban
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {challenges.length > challengesPerPage && (
            <div className="flex justify-between items-center mt-6">
              <Button
                variant="outline"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <p className="text-sm font-medium">
                Página {currentPage} de {totalPages}
              </p>
              <Button
                variant="default"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Próximo
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
