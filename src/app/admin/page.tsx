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
import { Spinner } from "@/components/ui/shadcn-io/spinner"

type JwtPayload = {
  exp: number
  role?: string
}

const mockKpis = {
  ideias: 128,
  desafios: 12,
  startups: 34,
  pocs: 5,
};

const mockChart = [
  { etapa: "Captura", qtd: 128 },
  { etapa: "Pré-Triagem", qtd: 64 },
  { etapa: "Ideação", qtd: 40 },
  { etapa: "Triagem Detalhada", qtd: 18 },
  { etapa: "POCs", qtd: 5 },
];

const mockAtividades = [
  {
    id: 1,
    titulo: "Novo desafio publicado",
    detalhe: "Sustentabilidade na cadeia de suprimentos",
    data: "15/09",
  },
  {
    id: 2,
    titulo: "Startup conectada",
    detalhe: "GreenTech Solutions",
    data: "14/09",
  },
  {
    id: 3,
    titulo: "POC iniciada",
    detalhe: "Automação de processos internos",
    data: "13/09",
  },
];

// --- Componentes auxiliares --- //

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
  );
}

function QuickActions() {
  // Vai receber a url da pag "admin/desafio"
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-4">
      <Button><PlusCircle className="mr-2 h-4 w-4" /> Nova Ideia</Button>
      <Button variant="secondary"><ClipboardList className="mr-2 h-4 w-4" /> Novo Desafio</Button>
      <Button variant="secondary"><Search className="mr-2 h-4 w-4" /> Buscar Startups</Button>
    </div>
  )
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={() => router.push("/admin/SectionDesafios/desafio")}
            className="flex items-center gap-2"
          >
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
  );
}

function FunnelEvolutionChart({ data }: { data: typeof mockChart }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução do Funil</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorQtd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="etapa" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="qtd" stroke="#8884d8" fillOpacity={1} fill="url(#colorQtd)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function FunnelStageChart({ data }: { data: typeof mockChart }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição por Etapas</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="etapa" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="qtd" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function RecentActivities({
  atividades,
}: {
  atividades: typeof mockAtividades;
}) {
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
  );
}


export default function DashboardPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  const [kpis, setKpis] = useState(mockKpis)
  const [data, setData] = useState(mockChart)
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

        if (decoded.exp < now || decoded.role !== "MANAGER") {
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

        const [kpiRes, chartRes, atividadesRes] = await Promise.all([
          axios.get(`${adminURL}`),
          axios.get(`${adminURL}`),
          axios.get(`${adminURL}`),
        ])

        setKpis(kpiRes.data)
        setData(chartRes.data)
        setAtividadesRecentes(atividadesRes.data)
      } catch (error) {
        console.warn("⚠️ Usando mocks, API não encontrada:", error)
      }
    }

    fetchData()
  }, [authorized])

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-80">
        <Spinner className="text-[#8884d8]" variant="bars"/>
      </div>
    )
  }

  if (!authorized) {
    return null
  }

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard de Inovação
        </h1>
        <p className="text-muted-foreground">
          Acompanhe o desempenho e engajamento geral da sua corporação na
          plataforma.
        </p>
      </div>

      <KPICards kpis={kpis} />
      <QuickActions />
      <FunnelEvolutionChart data={data} />
      <FunnelStageChart data={data} />
      <RecentActivities atividades={atividadesRecentes} />
    </div>
  );
}
