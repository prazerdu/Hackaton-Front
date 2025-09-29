"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Rocket, Lightbulb, PlusCircle, Search, Users, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

type JwtPayload = {
  exp: number
  role?: string
}

const mockKpis = {
  ideias: 128,
  desafios: 12,
  startups: 34,
  pocs: 5,
}

const mockLoginData = {
  daily: [
    { date: "21/09", logins: 5 },
    { date: "22/09", logins: 8 },
    { date: "23/09", logins: 12 },
    { date: "24/09", logins: 7 },
    { date: "25/09", logins: 10 },
  ],
  weekly: [
    { week: "Semana 36", logins: 32 },
    { week: "Semana 37", logins: 41 },
    { week: "Semana 38", logins: 50 },
  ],
  monthly: [
    { month: "Julho", logins: 120 },
    { month: "Agosto", logins: 150 },
    { month: "Setembro", logins: 98 },
  ],
}

const mockAtividades = [
  { id: 1, titulo: "Novo desafio publicado", detalhe: "Sustentabilidade na cadeia de suprimentos", data: "15/09" },
  { id: 2, titulo: "Startup conectada", detalhe: "GreenTech Solutions", data: "14/09" },
  { id: 3, titulo: "POC iniciada", detalhe: "Automação de processos internos", data: "13/09" },
]

function KPICards({ kpis }: { kpis: typeof mockKpis }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ideias Capturadas</CardTitle>
          <Lightbulb className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent><div className="text-2xl font-bold">{kpis.ideias}</div></CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Desafios</CardTitle>
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent><div className="text-2xl font-bold">{kpis.desafios}</div></CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Startups Conectadas</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent><div className="text-2xl font-bold">{kpis.startups}</div></CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">POCs em andamento</CardTitle>
          <Rocket className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent><div className="text-2xl font-bold">{kpis.pocs}</div></CardContent>
      </Card>
    </div>
  )
}

function QuickActions() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button><PlusCircle className="mr-2 h-4 w-4" /> Nova Ideia</Button>
      <Button variant="secondary"><ClipboardList className="mr-2 h-4 w-4" /> Novo Desafio</Button>
      <Button variant="secondary"><Search className="mr-2 h-4 w-4" /> Buscar Startups</Button>
    </div>
  )
}

function LoginWaveChart() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily")
  const data = mockLoginData[period]

  const getLabelKey = () => {
    if (period === "daily") return "date"
    if (period === "weekly") return "week"
    return "month"
  }

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Logins de Corporações</CardTitle>
        <div className="flex gap-2">
          <Button size="sm" variant={period === "daily" ? "default" : "outline"} onClick={() => setPeriod("daily")}>Dia</Button>
          <Button size="sm" variant={period === "weekly" ? "default" : "outline"} onClick={() => setPeriod("weekly")}>Semana</Button>
          <Button size="sm" variant={period === "monthly" ? "default" : "outline"} onClick={() => setPeriod("monthly")}>Mês</Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorLogins" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={getLabelKey()} />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="logins" stroke="#4f46e5" fillOpacity={1} fill="url(#colorLogins)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

function RecentActivities({ atividades }: { atividades: typeof mockAtividades }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {atividades.map((item) => (
            <li key={item.id} className="flex justify-between">
              <div>
                <p className="font-medium">{item.titulo}</p>
                <p className="text-sm text-muted-foreground">{item.detalhe}</p>
              </div>
              <span className="text-sm text-muted-foreground">{item.data}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}


export default function DashboardPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  const [kpis, setKpis] = useState(mockKpis)
  const [atividadesRecentes, setAtividadesRecentes] = useState(mockAtividades)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token")
      if (!token) {
        router.push("/login")
        return
      }

      try {
        const decoded = jwtDecode<JwtPayload>(token)
        const now = Date.now() / 1000

        if (decoded.exp < now || decoded.role !== "HUB_ADMIN") {
          localStorage.removeItem("access_token")
          router.push("/login")
          return
        }

        setAuthorized(true)
      } catch (err) {
        console.error("Erro ao decodificar token:", err)
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    if (!authorized) return

    const fetchData = async () => {
      try {
        const adminURL = process.env.NEXT_PUBLIC_API_URL

        const [kpiRes, atividadesRes] = await Promise.all([
          axios.get(`${adminURL}/kpis`),
          axios.get(`${adminURL}/atividades`),
        ])

        setKpis(kpiRes.data)
        setAtividadesRecentes(atividadesRes.data)
      } catch (error) {
        console.warn("⚠️ Usando mocks, API não conectada:", error)
      }
    }

    fetchData()
  }, [authorized])

  if (loading) {
    return <div className="p-6">Carregando...</div>
  }

  if (!authorized) {
    return null
  }

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard de Inovação</h1>
        <p className="text-muted-foreground">
          Acompanhe o desempenho e engajamento geral da sua corporação na plataforma.
        </p>
      </div>

      <KPICards kpis={kpis} />
      <QuickActions />
      <LoginWaveChart />
      <RecentActivities atividades={atividadesRecentes} />
    </div>
  )
}
