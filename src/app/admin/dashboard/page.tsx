"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import { QuickActions } from "@/components/admin/dashboard/quick-actions"
import { FunnelEvolutionChart } from "@/components/admin/dashboard/funil-evoluation"
import { FunnelStageChart } from "@/components/admin/dashboard/funil-stage"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { DashboardReport } from "@/components/admin/dashboard/dashboard-report"

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

const Etapas = [
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
      if (!token) return router.push("auth/login")

      try {
        const decoded = jwtDecode<JwtPayload>(token)
        const now = Date.now() / 1000
        if (decoded.exp < now || decoded.role !== "MANAGER") {
          localStorage.removeItem("access_token")
          router.push("auth/login")
          return
        }

        setAuthorized(true)
      } catch (err) {
        console.error("Erro ao decodificar token:", err)
        router.push("auth/login")
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
        const chartData = Etapas.map(etapa => {
          const apiItens = dashboardData.find(i => i.status === etapa.key)
          return {
            etapa: etapa.label,
            total: apiItens ? apiItens.total : 0,
          }
        })

        setFunilData(chartData)
      } catch (error) {
        console.warn("⚠️ Erro ao buscar dados do dashboard, usando mock:", error)
        setFunilData(
          Etapas.map(e => ({
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
      <div className="flex justify-center items-center mt-80">
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

      <div className="flex justify-end">
        <PDFDownloadLink
          document={<DashboardReport data={funilData} />}
          fileName="relatorio-funil.pdf"
        >
          {({ loading }) => (
            <button
              className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/80"
              disabled={loading}
            >
              {loading ? "Gerando PDF..." : "Baixar Relatório (PDF)"}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  )
}
