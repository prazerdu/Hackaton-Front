"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BarChart3, Rocket, Lightbulb, Layers } from "lucide-react"

// -------- MOCKS --------
const mockKpis = {
  ideias: 128,
  desafios: 12,
  startups: 34,
  pocs: 5,
}

const mockAtividades = [
  { id: 1, titulo: "Novo desafio publicado", detalhe: "Sustentabilidade na cadeia de suprimentos", data: "15/09" },
  { id: 2, titulo: "Startup conectada", detalhe: "GreenTech Solutions", data: "14/09" },
  { id: 3, titulo: "POC iniciada", detalhe: "Automação de processos internos", data: "13/09" },
]
// ------------------------

export default function DashboardPage() {
  const [kpis, setKpis] = useState(mockKpis)
  const [atividadesRecentes, setAtividadesRecentes] = useState(mockAtividades)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kpiRes, atividadesRes] = await Promise.all([
          axios.get("/api/kpis"),
          axios.get("/api/atividades"),
        ])

        setKpis(kpiRes.data)
        setAtividadesRecentes(atividadesRes.data)
      } catch (error) {
        console.warn("⚠️ Usando mocks, API não encontrada:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="p-6 space-y-8">
      {/* Título */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bem-vindo à Plataforma</h1>
        <p className="text-muted-foreground">
          Acompanhe suas interações, desafios e novidades em inovação.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ideias Capturadas</CardTitle>
            <Lightbulb className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.ideias}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Desafios Ativos</CardTitle>
            <Layers className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.desafios}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Startups Conectadas</CardTitle>
            <Rocket className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.startups}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">POCs em Andamento</CardTitle>
            <BarChart3 className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.pocs}</div>
          </CardContent>
        </Card>
      </div>

      {/* Atividades Recentes */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {atividadesRecentes.map((item) => (
              <li key={item.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{item.titulo}</p>
                  <p className="text-sm text-muted-foreground">{item.detalhe}</p>
                </div>
                <span className="text-xs text-muted-foreground">{item.data}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
