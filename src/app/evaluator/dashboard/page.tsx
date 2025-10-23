"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import { QuickActions } from "@/components/admin/dashboard/quick-actions"
import { FunnelEvolutionChart } from "@/components/admin/dashboard/funil-evoluation"
import { FunnelStageChart } from "@/components/admin/dashboard/funil-stage"
import { RecentActivities } from "@/components/admin/dashboard/recent-activies"

type JwtPayload = {
  exp: number
  role?: string
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

export default function EvaluatorDashboardPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  const [data, setData] = useState(mockChart)
  const [atividadesRecentes, setAtividadesRecentes] = useState(mockAtividades)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token")
      if (!token) return router.push("/login")

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
        const [ chartRes, atividadesRes] = await Promise.all([
          axios.get(`${adminURL}/dashboard`),
          axios.get(`${adminURL}/dashboard`),
          axios.get(`${adminURL}/dashboard`),
        ])

        setData(chartRes.data)
        setAtividadesRecentes(atividadesRes.data)
      } catch (error) {
        console.warn("⚠️ Usando mocks, API não encontrada:", error)
      }
    }

    fetchData()
  }, [authorized])

  if (loading)
    return (
      <div className="flex justify-center items-center mt-80">
        <Spinner className="text-[#8884d8]" variant="bars" />
      </div>
    )

  if (!authorized) return null

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard de Inovação</h1>
        <p className="text-muted-foreground">
          Acompanhe o desempenho e engajamento geral da sua corporação na plataforma.
        </p>
      </div>
      <QuickActions />
      <FunnelEvolutionChart data={data} />
      <FunnelStageChart data={data} />
      <RecentActivities atividades={atividadesRecentes} />
    </div>
  )
}
