"use client"

import * as React from "react"
import { BarChart3, Network, Building, Globe } from "lucide-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "@/components/admin/nav-projects"
import { NavUser } from "@/components/admin/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

const currentUser = {
  name: "Carlos Pereira",
  email: "carlos.pereira@corporacao.com",
  avatar: "/avatars/carlos.jpg",
  role: "HUB_ADMIN",
}

const HubAdminSupremeNav = [
  {
    title: "Dashboard",
    url: "/hub/dashboard",
    icon: BarChart3,
    roles: ["HUB_ADMIN"],
    items: [{ title: "Visão Geral", url: "/hub/dashboard" }],
  },
  {
    title: "Gestão de Corporações",
    url: "/hub/corporations",
    icon: Building,
    roles: ["HUB_ADMIN"],
    items: [
      { title: "Todas Corporações", url: "/hub/corporations" },
      { title: "Adicionar Nova", url: "/hub/corporations/new" },
    ],
  },
  {
    title: "Conexões Globais",
    url: "/hub/conexoes",
    icon: Network,
    roles: ["HUB_ADMIN"],
    items: [
      { title: "Histórico de Interações", url: "/hub/conexoes/historico" },
      { title: "POCs em Andamento", url: "/hub/conexoes/pocs" },
    ],
  },
  {
    title: "Relatórios Globais",
    url: "/hub/analytics",
    icon: Globe,
    roles: ["HUB_ADMIN"],
    items: [
      { title: "Relatórios de Usuários", url: "/hub/analytics/users" },
      { title: "Relatórios de Corporações", url: "/hub/analytics/corporations" },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const filteredNav = HubAdminSupremeNav
    .map((item) => {
      if (!item.roles.includes(currentUser.role)) return null
      const filteredItems = item.items?.filter(Boolean)
      return { ...item, items: filteredItems }
    })
    .filter(Boolean) as typeof HubAdminSupremeNav

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNav}/>
        <NavProjects projects={[]} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
