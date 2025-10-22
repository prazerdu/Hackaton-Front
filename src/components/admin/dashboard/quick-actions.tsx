"use client"

import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, ClipboardList, Search, Users } from "lucide-react"

export function QuickActions() {
  const router = useRouter()

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={() => router.push("/admin/challenges/create")}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" /> Criar Desafio
          </Button>

          <Button
            onClick={() => router.push("/admin/challenges/my-challenges")}
            className="flex items-center gap-2"
          >
            <ClipboardList className="h-4 w-4" /> Lista de Desafios
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push("/admin/startups")}
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" /> Explorar Startups
          </Button>

          <Button
            variant="secondary"
            onClick={() => router.push("/admin/users")}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" /> Usuários
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
