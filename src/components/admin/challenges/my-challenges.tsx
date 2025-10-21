"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react"

interface Challenge {
  id: string
  title: string
  createdAt: string
  status: string
}

interface TokenPayload {
  sub: string
  role: string
  companyId: string
  exp: number
}

export default function MyChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const challengesPerPage = 10

  useEffect(() => {
    const fetchChallenges = async () => {
      const token = localStorage.getItem("access_token")
      if (!token) {
        console.warn("Token não encontrado")
        setLoading(false)
        return
      }

      try {
        // Decodifica para validar expiração e obter empresa
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

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Deseja realmente excluir este desafio?")
    if (!confirmed) return

    const token = localStorage.getItem("access_token")
    if (!token) return

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/challenges/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setChallenges((prev) => prev.filter((challenge) => challenge.id !== id))
      alert("Desafio excluído com sucesso!")
    } catch (error) {
      console.error("Erro ao excluir desafio:", error)
      alert("Não foi possível excluir o desafio.")
    }
  }

  // Paginação
  const totalPages = Math.ceil(challenges.length / challengesPerPage)
  const startIndex = (currentPage - 1) * challengesPerPage
  const endIndex = startIndex + challengesPerPage
  const paginatedChallenges = challenges.slice(startIndex, endIndex)

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))

  return (
    <div className="p-6">
      <Card className="w-full shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Meus Desafios</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex flex-col justify-center items-center">
              <Spinner className="text-[#8884d8]" variant="bars" />
              <p className="font-semibold mt-2">Carregando desafios...</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data de Criação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedChallenges.map((challenge) => (
                    <TableRow key={challenge.id}>
                      <TableCell className="font-medium">{challenge.title}</TableCell>
                      <TableCell className="capitalize">
                        {challenge.status || "Em aberto"}
                      </TableCell>
                      <TableCell>
                        {new Date(challenge.createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(challenge.id)}
                          className="flex items-center gap-1"
                        >
                          <Trash2 className="h-4 w-4" /> Excluir
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Paginação */}
              {challenges.length > challengesPerPage && (
                <div className="flex justify-between items-center mt-3">
                  <Button
                    variant="outline"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft /> Anterior
                  </Button>
                  <p className="text-sm font-medium">
                    Página {currentPage} de {totalPages}
                  </p>
                  <Button
                    variant="default"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Próximo <ChevronRight />
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
