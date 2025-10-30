"use client"

import { useState } from "react"
import { MoreVertical, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreatePOCModal } from "@/components/admin/poc/create-poc"
import api from "@/lib/kanban/api"
import type { Challenge, POC, Startup } from "@/types/poc"
import { toast } from "sonner"

interface POCCardProps {
  poc: POC
  onUpdate: () => void
  challenges: Challenge[]
  startups: Startup[]
}


const statusConfig = {
  PENDING: { label: "Pendente", variant: "secondary" as const },
  IN_PROGRESS: { label: "Em Progresso", variant: "default" as const },
  COMPLETED: { label: "Concluída", variant: "default" as const },
  CANCELLED: { label: "Cancelada", variant: "destructive" as const },
}

export function POCCard({ poc, onUpdate, challenges, startups }: POCCardProps) {
  const status = statusConfig[poc.status] || statusConfig.PENDING
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Excluir POC
  const handleDelete = async () => {
    const confirmDelete = confirm(`Tem certeza que deseja excluir a POC "${poc.name}"?`)
    if (!confirmDelete) return

    setIsDeleting(true)
    try {
      await api.delete(`/pocs/${poc.id}`)
      toast.success("POC excluída com sucesso!")
      onUpdate()
    } catch (error) {
      console.error("Erro ao excluir POC:", error)
      toast.error("Erro ao excluir POC.")
    } finally {
      setIsDeleting(false)
    }
  }

  // Abrir modal de edição
  const handleEdit = () => setIsEditing(true)

  // Salvar edição
  const handleUpdateSuccess = async (updatedPOC: POC) => {
    try {
      await api.patch(`/pocs/${poc.id}`, updatedPOC)
      toast.success("POC atualizada com sucesso!")
      setIsEditing(false)
      onUpdate()
    } catch (error) {
      console.error("Erro ao atualizar POC:", error)
      toast.error("Erro ao atualizar POC.")
    }
  }

  return (
    <>
      <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg">{poc.name}</CardTitle>
              <CardDescription className="mt-1.5 line-clamp-2">{poc.description}</CardDescription>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Pencil className="mr-2 size-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-destructive"
                  disabled={isDeleting}
                >
                  <Trash2 className="mr-2 size-4" />
                  {isDeleting ? "Excluindo..." : "Excluir"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <Badge variant={status.variant}>{status.label}</Badge>

            {poc.challenge && (
              <div className="text-sm">
                <span className="text-muted-foreground">Desafio: </span>
                <span className="font-medium">{poc.challenge.name}</span>
              </div>
            )}

            {poc.startup && (
              <div className="text-sm">
                <span className="text-muted-foreground">Startup: </span>
                <span className="font-medium">{poc.startup.name}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de edição */}
      <CreatePOCModal
        open={isEditing}
        onOpenChange={setIsEditing}
        onSuccess={handleUpdateSuccess}
        editMode
        initialData={poc}
        challenges={challenges}
        startups={startups}
      />
    </>
  )
}
