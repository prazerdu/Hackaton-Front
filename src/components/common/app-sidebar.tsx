"use client"

import * as React from "react"
import {
  ClipboardList,
  LayoutGrid,
} from "lucide-react"

import { NavMain } from "@/components/common/nav-main"
import { NavUser } from "@/components/common/nav-user"
import { TeamSwitcher } from "@/components/common/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Maria Silva",
    email: "maria.silva@corporacao.com",
    avatar: "/avatars/maria.jpg",
  },
  teams: [
    {
      name: "Corporação X",
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Funil de Inovação",
      url: "/user/funil/kanban",
      icon: LayoutGrid,
      items: [
        { title: "Kanban", url: "/user/funil/kanban" },
      ],
    },
    {
      title: "Desafios",
      url: "/user/desafios",
      icon: ClipboardList,
      items: [
        { title: "Meus Desafios", url: "/user/desafios/meus-desafios" },
        { title: "Abertos ao Público", url: "/user/desafios/abertos" },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
