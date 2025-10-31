"use client"

import type * as React from "react"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import {
  IconClipboardData,
  IconClipboardListFilled,
  IconInnerShadowTop,
  IconLayoutKanban,
} from "@tabler/icons-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
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
          companyName: decoded.companyName || "Corporação",
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
    url: `/user/funil/kanban/${challenge.id}`,
    icon: IconLayoutKanban,
  }))

  const navMain = [
    {
      title: "Meus desafios",
      url: "/user/challenges/my-challenges",
      icon: IconClipboardData,
      roles: ["COMMON"],
    },
    {
      title: "Desafios públicos",
      url: "/user/challenges/public-challengers",
      icon: IconClipboardListFilled,
      roles: ["COMMON"],
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
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <IconInnerShadowTop className="!size-6 fill-primary text-xs" />
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
            role: "Colaborador",
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
