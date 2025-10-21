"use client"

import type * as React from "react"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import {
  IconClipboardData,
  IconClipboardListFilled,
  IconClipboardPlus,
  IconDashboard,
  IconInnerShadowTop,
  IconLayoutKanban,
  IconNetwork,
  IconRocket,
  IconUser
} from "@tabler/icons-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "@/components/admin/nav-projects"
import { NavUser } from "@/components/admin/nav-user"
import { TeamSwitcher } from "@/components/admin/team-switcher"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "@/components/ui/sidebar"

import { challengesService } from "@/lib/kanban/services/challenges"
import type { Challenge } from "@/lib/kanban/types"

interface currentUser {
  name?: string
  username?: string
  email?: string
  sub?: string
  avatar?: string
  role?: string
  companyName?: string
  exp?: number
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [currentUser, setCurrentUser] = useState<currentUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [challenges, setChallenges] = useState<Challenge[]>([])

  // 🔹 Decodifica o token e obtém o usuário atual
  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (token) {
      try {
        const decoded = jwtDecode<currentUser>(token)
        console.log("Token decodificado:", decoded)

        setCurrentUser({
          name: decoded.name || decoded.username || "Usuário",
          email: decoded.email || decoded.sub || "sem-email@exemplo.com",
          role: decoded.role || "user",
          avatar: decoded.avatar || "/avatars/default.jpg",
          companyName: decoded.companyName || "Corporação"
        })
      } catch (err) {
        console.error("Erro ao decodificar JWT:", err)
      }
    } else {
      console.warn("Nenhum token encontrado no localStorage")
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await challengesService.getAll()
        setChallenges(data)
      } catch (err) {
        console.error("Erro ao carregar desafios:", err)
      }
    }

    fetchChallenges()
  }, [])

  if (loading) {
    return <div className="p-4 text-sm text-muted-foreground">Carregando...</div>
  }

  if (!currentUser) {
    return <div className="p-4 text-sm text-red-500">Usuário não autenticado</div>
  }

  const challengeItems = challenges.map((challenge) => ({
    name: challenge.title,
    url: `/admin/funil/kanban/${challenge.id}`,
    icon: IconLayoutKanban,
  }))

  const navMain = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: IconDashboard,
      roles: ["MANAGER"],
      items: [{ title: "Visão Geral", url: "/admin/dashboard" }],
    },
    {
      title: "Criar desafio",
      url: "/admin/desafios/criar",
      icon: IconClipboardPlus,
      roles: ["MANAGER"],
    },
    {
      title: "Meus desafios",
      url: "/admin/desafios/meus-desafios",
      icon: IconClipboardData,
      roles: ["MANAGER"],
    },
    {
      title: "Abertos ao público",
      url: "/admin/desafios",
      icon: IconClipboardListFilled,
      roles: ["MANAGER"],
    },
    {
      title: "Startups",
      url: "/admin/startups",
      icon: IconRocket,
      roles: ["MANAGER"],
      items: [
        { title: "Base de Startups", url: "/admin/startups" },
        { title: "Recomendações", url: "/admin/startups/recomendacoes" },
        { title: "Matches", url: "/admin/startups/matches" },
      ],
    },
    {
      title: "POCs",
      url: "/admin/conexoes",
      icon: IconNetwork,
      roles: ["MANAGER"],
      items: [
        { title: "POCs em Andamento", url: "/admin/conexoes/pocs" },
      ],
    },
    {
      title: "Usuários",
      url: "/admin/users",
      icon: IconUser,
      roles: ["MANAGER"],
      items: [{ title: "Usuários & Permissões", url: "/admin/users" }],
    },
  ]

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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-6 fill-primary text-xs" />
                {/* Exibe o nome da empresa do usuário logado */}
                <span className="text-[1.5rem] font-semibold">{currentUser.companyName}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={filteredNav} />
        <NavProjects projects={challengeItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: currentUser.name!,
            email: currentUser.email!,
            avatar: currentUser.avatar!,
            role: "Gestor",
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
