"use client"

import * as React from "react"
import { Users, BarChart3, Network } from "lucide-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "@/components/admin/nav-projects"
import { NavUser } from "@/components/admin/nav-user"
import { TeamSwitcher } from "@/components/admin/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

const currentUser = {
  name: "Carlos Pereira",
  email: "carlos.pereira@corporacao.com",
  avatar: "/avatars/carlos.jpg",
  role: "evaluator",
}

const evaluatorNav = [
  {
    title: "Dashboard",
    url: "/avaliador/dashboard",
    icon: BarChart3,
    roles: ["evaluator"],
    items: [{ title: "Visão Geral", url: "/avaliador/dashboard" }],
  },
  {
    title: "Funil de Inovação",
    url: "/avaliador/funil",
    icon: Users,
    roles: ["evaluator"],
    items: [
      { title: "Kanbam", url: "/avaliador/funil/kanbam" },
      { title: "Pré-Triagem", url: "/avaliador/funil/pre-triagem" },
      { title: "Ideação", url: "/avaliador/funil/ideacao" },
      { title: "Triagem Detalhada", url: "/avaliador/funil/triagem" },
      { title: "Experimentação (POCs)", url: "/avaliador/funil/pocs" },
    ],
  },
  {
    title: "Conexões",
    url: "/avaliador/conexoes",
    icon: Network,
    roles: ["evaluator"],
    items: [
      { title: "Histórico de Interações", url: "/avaliador/conexoes/historico" },
      { title: "POCs em Andamento", url: "/avaliador/conexoes/pocs" },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const filteredNav = evaluatorNav
    .map((item) => {
      if (!item.roles.includes(currentUser.role)) return null
      const filteredItems = item.items?.filter(Boolean)
      return { ...item, items: filteredItems }
    })
    .filter(Boolean) as typeof evaluatorNav

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={[]} />
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
