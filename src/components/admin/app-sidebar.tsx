"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { Users, BarChart3, ClipboardList, Network, Rocket, LayoutGrid } from "lucide-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "@/components/admin/nav-projects"
import { NavUser } from "@/components/admin/nav-user"
import { TeamSwitcher } from "@/components/admin/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

interface DecodedToken {
  name?: string
  username?: string
  email?: string
  sub?: string
  avatar?: string
  role?: string
  exp?: number
}

const navMain = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: BarChart3,
    roles: ["MANAGER"],
    items: [{ title: "Visão Geral", url: "/admin" }],
  },
  {
    title: "Funil de Inovação",
    url: "/admin/funil/kanban",
    icon: LayoutGrid,
    roles: ["MANAGER", "evaluator"],
    items: [{ title: "Kanban", url: "/admin/funil/kanban" }],
  },
  {
    title: "Desafios",
    url: "/admin/desafios",
    icon: ClipboardList,
    roles: ["MANAGER"],
    items: [
      { title: "Meus Desafios", url: "/admin/desafios/meus-desafios" },
      { title: "Criar Desafio", url: "/admin/desafios/criar" },
      { title: "Abertos ao Público", url: "/admin/desafios/publicos" },
    ],
  },
  {
    title: "Startups",
    url: "/admin/startups",
    icon: Rocket,
    roles: ["MANAGER"],
    items: [
      { title: "Base de Startups", url: "/admin/startups" },
      { title: "Recomendações", url: "/admin/startups/recomendacoes" },
      { title: "Matches", url: "/admin/startups/matches" },
    ],
  },
  {
    title: "Conexões",
    url: "/admin/conexoes",
    icon: Network,
    roles: ["MANAGER", "evaluator"],
    items: [
      { title: "Histórico de Interações", url: "/admin/conexoes/historico" },
      { title: "POCs em Andamento", url: "/admin/conexoes/pocs" },
    ],
  },
  {
    title: "Relatórios",
    url: "/admin/relatorios",
    icon: BarChart3,
    roles: ["MANAGER"],
    items: [{ title: "Indicadores por Etapa", url: "/admin/relatorios/etapas" }],
  },
  {
    title: "Configurações",
    url: "/admin/config",
    icon: Users,
    roles: ["MANAGER"],
    items: [{ title: "Usuários & Permissões", url: "/admin/users" }],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [currentUser, setCurrentUser] = useState<DecodedToken | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("access_token") ||
      localStorage.getItem("jwt")

    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token)
        console.log("Token decodificado:", decoded)

        setCurrentUser({
          name: decoded.name || decoded.username || "Usuário",
          email: decoded.email || decoded.sub || "sem-email@exemplo.com",
          role: decoded.role || "user",
          avatar: decoded.avatar || "/avatars/default.jpg",
        })
      } catch (err) {
        console.error("Erro ao decodificar JWT:", err)
      }
    } else {
      console.warn("Nenhum token encontrado no localStorage")
    }

    setLoading(false)
  }, [])

  if (loading) {
    return <div className="p-4 text-sm text-muted-foreground">Carregando...</div>
  }

  if (!currentUser) {
    return <div className="p-4 text-sm text-red-500">Usuário não autenticado</div>
  }

  const filteredNav = navMain
    .map((item) => {
      if (!item.roles.includes(currentUser.role!)) return null
      return { ...item }
    })
    .filter(Boolean) as typeof navMain

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={[]} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={filteredNav} />
        <NavProjects projects={[]} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: currentUser.name!,
            email: currentUser.email!,
            avatar: currentUser.avatar,
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
