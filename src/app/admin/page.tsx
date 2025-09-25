"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BarChart3, Rocket, Lightbulb, Layers, PlusCircle, Search, Users, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

const mockKpis = {
  ideias: 128,
  desafios: 12,
  startups: 34,
  pocs: 5,
}

const mockChart = [
  { etapa: "Captura", qtd: 128 },
  { etapa: "Pré-Triagem", qtd: 64 },
  { etapa: "Ideação", qtd: 40 },
  { etapa: "Triagem Detalhada", qtd: 18 },
  { etapa: "POCs", qtd: 5 },
]

const mockAtividades = [
  { id: 1, titulo: "Novo desafio publicado", detalhe: "Sustentabilidade na cadeia de suprimentos", data: "15/09" },
  { id: 2, titulo: "Startup conectada", detalhe: "GreenTech Solutions", data: "14/09" },
  { id: 3, titulo: "POC iniciada", detalhe: "Automação de processos internos", data: "13/09" },
]

function KPICards({ kpis }: { kpis: typeof mockKpis }) {
  return (
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
  )
}

function QuickActions() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Criar Desafio
          </Button>
          <Button className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Lista de desafios
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Explorar Startups
          </Button>
          <a href="">
          <Button variant="secondary" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Usuários
          </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

function FunnelEvolutionChart({ data }: { data: typeof mockChart }) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Evolução no Funil de Inovação</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorQtd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="etapa" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="qtd"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorQtd)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

function FunnelStageChart({ data }: { data: typeof mockChart }) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Quantidade de Ideias por Etapa</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="etapa" type="category" />
              <Tooltip />
              <Bar dataKey="qtd" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

function RecentActivities({ atividades }: { atividades: typeof mockAtividades }) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {atividades.map((item) => (
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
  )
}

export default function DashboardPage() {
  const [kpis, setKpis] = useState(mockKpis)
  const [data, setData] = useState(mockChart)
  const [atividadesRecentes, setAtividadesRecentes] = useState(mockAtividades)

  useEffect(() => {
    const fetchData = async () => {
        try {
            const adminURL = process.env.NEXT_PUBLIC_API_URL;

            const [kpiRes, chartRes, atividadesRes] = await Promise.all([
            axios.get(`${adminURL}`),
            axios.get(`${adminURL}`),
            axios.get(`${adminURL}`),
            ]);

            setKpis(kpiRes.data);
            setData(chartRes.data);
            setAtividadesRecentes(atividadesRes.data);
        } catch (error) {
            console.warn("⚠️ Usando mocks, API não encontrada:", error);
        }
        };

    fetchData()
  }, [])

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard de Inovação</h1>
        <p className="text-muted-foreground">
          Acompanhe o desempenho e engajamento geral da sua corporação na plataforma.
        </p>
      </div>

      <KPICards kpis={kpis} />
      <QuickActions />
      <FunnelEvolutionChart data={data} />
      <FunnelStageChart data={data} />
      <RecentActivities atividades={atividadesRecentes} />
    </div>
  )
}
