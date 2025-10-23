"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import { QuickActions } from "@/components/admin/dashboard/quick-actions"
import { FunnelEvolutionChart } from "@/components/admin/dashboard/funil-evoluation"
import { FunnelStageChart } from "@/components/admin/dashboard/funil-stage"

type JwtPayload = {
  exp: number
  role?: string
}

type FunilItem = {
  status: string
  total: number
}

type DashboardResponse = {
  funil: FunilItem[]
}

const ETAPAS_FIXAS = [
  { key: "GENERATION", label: "Geração" },
  { key: "TRIAGE", label: "Triagem" },
  { key: "IDEATION", label: "Ideação" },
  { key: "IMPLEMENTATION", label: "Implementação" },
  { key: "COMPLETED", label: "Concluído" },
]

export default function DashboardPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [funilData, setFunilData] = useState<{ etapa: string; total: number }[]>([])

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token")
      if (!token) return router.push("/login")

      try {
        const decoded = jwtDecode<JwtPayload>(token)
        const now = Date.now() / 1000
        if (decoded.exp < now || decoded.role !== "EVALUATOR") {
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
        const token = localStorage.getItem("access_token")
        const adminURL = process.env.NEXT_PUBLIC_API_URL

        const res = await axios.get<DashboardResponse>(`${adminURL}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        const dashboardData = res.data.funil || []

        const combinado = ETAPAS_FIXAS.map(etapa => {
          const apiItens = dashboardData.find(i => i.status === etapa.key)
          return {
            etapa: etapa.label,
            total: apiItens ? apiItens.total : 0,
          }
        })

        setFunilData(combinado)
      } catch (error) {
        console.warn("⚠️ Erro ao buscar dados do dashboard, usando mock:", error)
        setFunilData(
          ETAPAS_FIXAS.map(e => ({
            etapa: e.label,
            total: Math.floor(Math.random() * 5),
          }))
        )
      }
    }

    fetchData()
  }, [authorized])

  if (loading)
    return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Spinner className="text-primary" variant="bars" />
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
      
      <FunnelEvolutionChart data={funilData} />
      <FunnelStageChart data={funilData} />
    </div>
  )
}
