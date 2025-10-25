"use client"
import { MoreVertical, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { POC } from "@/types/poc"

interface POCCardProps {
  poc: POC
  onUpdate: () => void
}

const statusConfig = {
  PENDING: { label: "Pendente", variant: "secondary" as const },
  IN_PROGRESS: { label: "Em Progresso", variant: "default" as const },
  COMPLETED: { label: "Concluída", variant: "default" as const },
  CANCELLED: { label: "Cancelada", variant: "destructive" as const },
}

export function POCCard({ poc }: POCCardProps) {
  const status = statusConfig[poc.status] || statusConfig.PENDING

  return (
    <Card className="hover:shadow-md transition-shadow">
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
              <DropdownMenuItem>
                <Pencil className="mr-2 size-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 size-4" />
                Excluir
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
  )
}
