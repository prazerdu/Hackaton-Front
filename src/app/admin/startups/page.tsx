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
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { IconLayout, IconTable } from "@tabler/icons-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface Startup {
  id: string
  name: string
  cnpj: string
  segment: string
  problems: string
  technologies: string[]
  stage: string
  location: string
  founders: string[]
  pitch: string
  links: {
    site: string
  }
  createdAt: string
  updatedAt: string
}

export default function StartupsPage() {
  const [startups, setStartups] = useState<Startup[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"table" | "card">("table")
  const startupsPerPage = viewMode === "card" ? 6 : 5 // ✅ 6 cards por página

  useEffect(() => {
    const fetchStartups = async () => {
      const token = localStorage.getItem("access_token")
      if (!token) {
        console.warn("Token não encontrado")
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

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))

  return (
    <div className="min-h-screen">
      <Card className="w-full shadow-md border bg-background">
        <CardHeader className="flex flex-row items-center justify-between border-b p-4">
          <CardTitle className="text-2xl font-bold">Startups no sistema</CardTitle>

          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
            className="flex items-center gap-2"
          >
            {viewMode === "table" ? (
              <>
                <IconLayout size={18} /> Ver em Cards
              </>
            ) : (
              <>
                <IconTable size={18} /> Ver em Tabela
              </>
            )}
          </Button>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex flex-col justify-center items-center py-10">
              <Spinner className="text-primary" variant="bars" />
              <p className="font-semibold mt-2">Carregando dados...</p>
            </div>
          ) : startups.length === 0 ? (
            <p className="text-center py-10">Nenhuma startup cadastrada.</p>
          ) : viewMode === "table" ? (
            // ==== TABLE VIEW ====
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Segmento</TableHead>
                    <TableHead>Tecnologias</TableHead>
                    <TableHead>Estágio</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Fundadores</TableHead>
                    <TableHead>Links</TableHead>
                    <TableHead>Data Criação</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedStartups.map((startup) => (
                    <TableRow key={startup.id}>
                      <TableCell className="font-semibold">{startup.name}</TableCell>
                      <TableCell>{startup.cnpj}</TableCell>
                      <TableCell>{startup.segment}</TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger className="w-[150px] text-xs bg-background">
                            <SelectValue placeholder={`${startup.technologies[0]}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {startup.technologies.map((tech, i) => (
                              <SelectItem className="dark:text-white" disabled key={i} value={tech}>
                                {tech}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            startup.stage === "OPERACAO"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {startup.stage}
                        </span>
                      </TableCell>
                      <TableCell>{startup.location}</TableCell>
                      <TableCell>
                        <ul className="text-sm list-disc ml-4">
                          {startup.founders.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                        {startup.links.site && (
                          <a
                            href={startup.links.site}
                            target="_blank"
                            className="text-primary hover:underline flex items-center gap-1 text-xs"
                          >
                            <ExternalLink size={12} /> Site
                          </a>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(startup.createdAt).toLocaleDateString("pt-BR")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedStartups.map((startup) => (
                <Card key={startup.id} className="p-4 hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">{startup.name}</CardTitle>
                    <Badge className="text-sm">
                      {startup.segment}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm"><strong>Estágio:</strong> {startup.stage}</p>
                    <p className="text-sm"><strong>Localização:</strong> {startup.location}</p>
                    <p className="text-sm"><strong>Tecnologias:</strong> {startup.technologies.join(", ")}</p>
                    <p className="text-sm"><strong>Fundadores:</strong> {startup.founders.join(", ")}</p>

                    {startup.links.site && (
                      <div className="flex gap-2 text-xs mt-2">
                        <a href={startup.links.site} target="_blank" className="text-primary hover:underline flex items-center gap-1">
                          <ExternalLink size={12} /> Site
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* ==== PAGINAÇÃO ==== */}
          {!loading && startups.length > startupsPerPage && (
            <div className="flex justify-between items-center mt-6">
              <Button variant="outline" onClick={handlePrevPage} disabled={currentPage === 1}>
                <ChevronLeft className="mr-1 h-4 w-4" /> Anterior
              </Button>

              <p className="text-sm">
                Página {currentPage} de {totalPages}
              </p>

              <Button variant="default" onClick={handleNextPage} disabled={currentPage === totalPages}>
                Próximo <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
