"use client"

import { useEffect, useState } from "react"
import axios from "axios"
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
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Startup {
  id: string
  name: string
  tagline: string
  stage: string
  createdAt: string
}

export default function StartupsPage() {
  const [startups, setStartups] = useState<Startup[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const startupsPerPage = 10

  useEffect(() => {
    const fetchStartups = async () => {
      const token = localStorage.getItem("access_token")
      if (!token) {
        console.warn("Token não encontrado")
        setLoading(false)
        return
      }

      try {
      } catch (err) {
        console.error("Erro ao decodificar JWT:", err)
        setLoading(false)
        return
      }

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/startups/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setStartups(res.data)
      } catch (error) {
        console.error("Erro ao buscar startups:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStartups()
  }, [])

  const totalPages = Math.ceil(startups.length / startupsPerPage)
  const startIndex = (currentPage - 1) * startupsPerPage
  const endIndex = startIndex + startupsPerPage
  const paginatedStartups = startups.slice(startIndex, endIndex)

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <div className="p-6">
      <Card className="w-full shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Startups no sistema</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex flex-col justify-center items-center">
              <Spinner className="text-[#8884d8]" variant="bars" />
              <p className="font-semibold mt-2">Carregando dados...</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead></TableHead>
                    <TableHead>Estágio</TableHead>
                    <TableHead>Data de Criação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedStartups.map((startup) => (
                    <TableRow key={startup.id}>
                      <TableCell>{startup.name}</TableCell>
                      <TableCell>{startup.tagline}</TableCell>
                      <TableCell>{startup.stage}</TableCell>
                      <TableCell>
                        {new Date(startup.createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {startups.length > startupsPerPage && (
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