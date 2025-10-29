"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import { Spinner } from "@/components/ui/shadcn-io/spinner"

import { AdminKPICards } from "@/components/admin/dashboard/kpi"
import { QuickActions } from "@/components/admin/dashboard/quick-actions"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { DashboardKPIReport } from "@/components/admin/dashboard/kpi-report"

type JwtPayload = {
  exp: number
  role?: string
  name?: string
}

export interface Kpis {
  totalIdeas: number
  totalStartupsConnected: number
  totalPocs: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [kpis, setKpis] = useState<Kpis | null>(null)
  const [userName, setUserName] = useState<string>("")

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

        const fullName = decoded.name || "Usuário"
        const firstName = fullName.split(" ")[0]
        setUserName(firstName)

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
        const adminURL = process.env.NEXT_PUBLIC_API_URL
        const token = localStorage.getItem("access_token")

        if (!token) {
          router.push("auth/login")
          return
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        const [kpiRes] = await Promise.all([
          axios.get(`${adminURL}/dashboard`, config),
        ])

        setKpis(kpiRes.data)
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            console.warn("Sessão expirada. Redirecionando para login.")
            localStorage.removeItem("access_token")
            router.push("auth/login")
          } else {
            console.error("Erro ao buscar dados do dashboard:", error)
          }
        } else {
          console.error("Erro inesperado:", error)
        }
      }
    }

    fetchData()
  }, [authorized, router])

  if (loading || !kpis)
    return (
      <div className="flex justify-center items-center mt-80">
        <Spinner className="text-primary" variant="bars" />
      </div>
    )

  if (!authorized) return null

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Bem-vindo(a), {userName}, 
          à Plataforma de Inovação do Ninna Hub!
        </h1>
        <p className="text-muted-foreground">
          Acompanhe o desempenho e engajamento geral da sua corporação na plataforma
        </p>
      </div>

      <AdminKPICards kpis={kpis} />
      <QuickActions />
      <div className="flex justify-end">
        <PDFDownloadLink
          document={<DashboardKPIReport kpis={kpis} userName={userName} />}
          fileName="relatorio-kpi.pdf"
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
