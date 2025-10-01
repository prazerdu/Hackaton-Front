"use client"

import * as React from "react"
import {
  Lightbulb,
  Rocket,
  Layers,
  ClipboardList,
  BarChart3,
  Network,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
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
      logo: Lightbulb,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
      isActive: true,
      items: [
        { title: "Visão Geral", url: "#" },
        { title: "Métricas Rápidas", url: "#" },
      ],
    },
    {
      title: "Funil de Inovação",
      url: "#",
      icon: Layers,
      items: [
        { title: "Submissão de ideias", url: "/dashboard/submissao" },
        { title: "Captura de Ideias", url: "/dashboard/ideias" },
        { title: "Pré-Triagem", url: "/dashboard/triagem" },
        { title: "Ideação", url: "/dashboard/ideacao" },
        { title: "Triagem Detalhada", url: "/dashboard/triagem/detalhes" },
        { title: "POCs", url: "/dashboard/pocs" },
      ],
    },
    {
      title: "Desafios",
      url: "#",
      icon: ClipboardList,
      items: [
        { title: "Meus Desafios", url: "#" },
        { title: "Abertos ao Público", url: "#" },
      ],
    },
    {
      title: "Startups",
      url: "#",
      icon: Rocket,
      items: [
        { title: "Base de Startups", url: "#" },
        { title: "Recomendações", url: "#" },
        { title: "Matches", url: "#" },
      ],
    },
    {
      title: "Conexões",
      url: "#",
      icon: Network,
      items: [
        { title: "Histórico de Interações", url: "#" },
        { title: "POCs em Andamento", url: "#" },
      ],
    },
    {
      title: "Relatórios",
      url: "#",
      icon: BarChart3,
      items: [
        { title: "Indicadores por Etapa", url: "#" },
        { title: "Relatórios Personalizados", url: "#" },
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
