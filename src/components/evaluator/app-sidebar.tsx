"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { Users, BarChart3, Network, Rocket } from "lucide-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "@/components/evaluator/nav-projects"
import { NavUser } from "@/components/evaluator/nav-user"
import { TeamSwitcher } from "@/components/evaluator/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

interface DecodedToken {
  name: string
  email: string
  avatar?: string
  role: "MANAGER" | "EVALUATOR" | "COMMON"
  companyId?: string
  exp?: number
}

const evaluatorNav = [
  {
    title: "Dashboard",
    url: "/avaliador/dashboard",
    icon: BarChart3,
    roles: ["EVALUATOR"],
    items: [{ title: "Visão Geral", url: "/avaliador/dashboard" }],
  },
  {
    title: "Funil de Inovação",
    url: "/avaliador/funil",
    icon: Users,
    roles: ["EVALUATOR"],
    items: [
      { title: "Kanbam", url: "/avaliador/funil/kanbam" },
      { title: "Pré-Triagem", url: "/avaliador/funil/pre-triagem" },
      { title: "Ideação", url: "/avaliador/funil/ideacao" },
      { title: "Triagem Detalhada", url: "/avaliador/funil/triagem" },
      { title: "Experimentação (POCs)", url: "/avaliador/funil/pocs" },
    ],
  },
  {
    title: "Startups",
    url: "/evaluator/startups",
    icon: Rocket,
    roles: ["EVALUATOR"],
    items: [
      { title: "Base de Startups", url: "/evaluator/startups" },
      { title: "Recomendações", url: "/evaluator/startups/recomendacoes" },
      { title: "Matches", url: "/evaluator/startups/matches" },
    ],
  },
  {
    title: "Conexões",
    url: "/evaluator/conexoes",
    icon: Network,
    roles: ["EVALUATOR"],
    items: [
      { title: "Histórico de Interações", url: "/avaliador/conexoes/historico" },
      { title: "POCs em Andamento", url: "/avaliador/conexoes/pocs" },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [currentUser, setCurrentUser] = useState<DecodedToken | null>(null)

  useEffect(() => {
    try {
      const token = localStorage.getItem("access_token")
      if (!token) {
        console.warn("Token de autenticação não encontrado")
        return
      }

      const decoded = jwtDecode<DecodedToken>(token)
      setCurrentUser(decoded)
    } catch (err) {
      console.error("Erro ao decodificar JWT:", err)
    }
  }, [])

  if (!currentUser) {
    return null // spinner ou redirect opcional
  }

  // filtra menus de acordo com o role vindo do token
  const filteredNav = evaluatorNav
    .map((item) => {
      if (!item.roles.includes(currentUser.role)) return null
      return { ...item, items: item.items?.filter(Boolean) }
    })
    .filter(Boolean) as typeof evaluatorNav

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
            name: currentUser.name,
            email: currentUser.email,
            avatar: currentUser.avatar ?? "/avatars/default.jpg",
            role: currentUser.role,
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
