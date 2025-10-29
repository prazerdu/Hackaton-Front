"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import { AppSidebar } from "@/components/evaluator/app-sidebar" 
import { LogoutButton } from "@/components/log-out"
import { ModeToggle } from "@/components/theme-toggle"
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Spinner } from "@/components/ui/shadcn-io/spinner"

type JwtPayload = {
  exp: number
  role?: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token")
      if (!token) {
        router.push("/auth/login")
        return
      }

      try {
        const decoded = jwtDecode<JwtPayload>(token)
        const now = Date.now() / 1000

        if (decoded.exp < now || decoded.role !== "EVALUATOR") {
          localStorage.removeItem("access_token")
          router.push("/auth/login")
          return
        }

        setAuthorized(true)
      } catch (err) {
        console.error("Erro ao decodificar token:", err)
        router.push("/auth/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return(
    <div className="flex justify-center items-center h-screen w-screen">
      <Spinner className="text-primary" variant="bars" />
    </div>
    )
    
  }

  if (!authorized) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen">
        <AppSidebar />

        <main className="flex-1 overflow-y-auto">
          <div className="p-2 flex justify-between gap-16">
            <SidebarTrigger />
            <div className="space-x-2">
              <ModeToggle />
              <LogoutButton />
            </div>
          </div>
          <div className="p-4">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
