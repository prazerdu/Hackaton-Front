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
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import { SignupModal } from "@/components/signup-modal"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
  companyId: string
  createdAt: string
}

interface TokenPayload {
  sub: string
  role: string
  companyId: string
  exp: number
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("access_token")
      if (!token) {
        console.warn("Token não encontrado")
        setLoading(false)
        return
      }

      let companyId: string
      try {
        const decoded: TokenPayload = jwtDecode(token)
        companyId = decoded.companyId
      } catch (err) {
        console.error("Erro ao decodificar JWT:", err)
        setLoading(false)
        return
      }

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users?companyId=${companyId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        setUsers(res.data)
      } catch (error) {
        console.error("Erro ao buscar usuários:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Tem certeza que deseja excluir este usuário?")
    if (!confirmed) return

    const token = localStorage.getItem("access_token")
    if (!token) return

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUsers((prev) => prev.filter((user) => user.id !== id))
      alert("Usuário deletado com sucesso!")
    } catch (error) {
      console.error("Erro ao deletar usuário:", error)
      alert("Não foi possível excluir o usuário.")
    }
  }

  const totalPages = Math.ceil(users.length / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const endIndex = startIndex + usersPerPage
  const paginatedUsers = users.slice(startIndex, endIndex)

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))

  return (
    <div className="p-6">
      <Card className="w-full shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Usuários da Empresa</CardTitle>
          <SignupModal />
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
                    <TableHead>Email</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Data de Criação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString("pt-BR", {
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
                          onClick={() => handleDelete(user.id)}
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
              {users.length > usersPerPage && (
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
