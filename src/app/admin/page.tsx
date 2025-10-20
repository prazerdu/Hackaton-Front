"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import { Spinner } from "@/components/ui/shadcn-io/spinner"

import { KPICards } from "@/components/admin/dashboard/kpi"
import { QuickActions } from "@/components/admin/dashboard/quick-actions"

type JwtPayload = {
  exp: number
  role?: string
}

// ✅ Define o tipo do objeto de KPIs que vem da API
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
      const token = localStorage.getItem("access_token")

      if (!token) {
        router.push("/login")
        return
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const [kpiRes] = await Promise.all([
        axios.get(`${adminURL}/dashboard`, config),
        axios.get(`${adminURL}/dashboard`, config),
        axios.get(`${adminURL}/dashboard`, config),
      ])

      setKpis(kpiRes.data)
        } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.warn("Sessão expirada. Redirecionando para login.")
          localStorage.removeItem("access_token")
          router.push("/login")
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
      <KPICards kpis={kpis} />
      <QuickActions />
    </div>
  )
}
