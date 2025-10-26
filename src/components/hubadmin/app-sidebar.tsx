"use client"

import type * as React from "react"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import {
  IconBuilding,
  IconBuildingPlus,
  IconClipboardListFilled,
  IconDashboard,
  IconInnerShadowTop,
  IconNetwork,
  IconRocket,
} from "@tabler/icons-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

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

  if (loading) {
    return <div className="p-4 text-sm text-muted-foreground">Carregando...</div>
  }

  if (!currentUser) {
    return <div className="p-4 text-sm text-red-500">Usuário não autenticado</div>
  }

  const navMain = [
    {
      title: "Dashboard",
      url: "/hub/dashboard",
      icon: IconDashboard,
      roles: ["HUB_ADMIN"],
    },
    {
      title: "Criar corporação",
      url: "/hub/corps/create",
      icon: IconBuildingPlus,
      roles: ["HUB_ADMIN"],
    },
    {
      title: "Corporações",
      url: "/hub/corps",
      icon: IconBuilding,
      roles: ["HUB_ADMIN"],
    },
    {
      title: "Desafios públicos",
      url: "/evaluator/challenges/public-challengers",
      icon: IconClipboardListFilled,
      roles: ["HUB_ADMIN"],
    },
    {
      title: "Startups",
      url: "/evaluator/startups",
      icon: IconRocket,
      roles: ["HUB_ADMIN"],
    },
    {
      title: "POCs",
      url: "/evaluator/pocs",
      icon: IconNetwork,
      roles: ["HUB_ADMIN"],
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
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: currentUser.name!,
            email: currentUser.email!,
            avatar: currentUser.avatar!,
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
