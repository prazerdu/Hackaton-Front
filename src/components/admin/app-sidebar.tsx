"use client"

import * as React from "react"
import { Users, BarChart3, Settings, ClipboardList, Network, Rocket } from "lucide-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "@/components/admin/nav-projects"
import { NavUser } from "@/components/admin/nav-user"
import { TeamSwitcher } from "@/components/admin/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

const currentUser = {
  name: "Maria Silva",
  email: "maria.silva@corporacao.com",
  avatar: "/avatars/maria.jpg",
  role: "manager", // apenas manager
}

const navMain = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: BarChart3,
    roles: "manager",
    items: [{ title: "Visão Geral", url: "/admin" }],
  },
  {
    title: "Funil de Inovação",
    url: "/admin/kanbam",
    icon: Users,
    roles: ["manager", "evaluator"],
    items: [
      { title: "Kanbam", url: "/admin/kanbam" },
      { title: "Pré-Triagem", url: "/admin/funil/pre-triagem" },
      { title: "Ideação", url: "/admin/funil/ideacao" },
      { title: "Triagem Detalhada", url: "/admin/funil/triagem" },
      { title: "Experimentação (POCs)", url: "/admin/funil/pocs" },
    ],
  },
  {
    title: "Desafios",
    url: "/admin/desafios",
    icon: ClipboardList,
    roles: ["manager", "user"],
    items: [
      { title: "Meus Desafios", url: "/admin/SectionDesafios/meusdesafios" },
      { title: "Criar Desafio", url: "/admin/SectionDesafios/desafio" },
      { title: "Abertos ao Público", url: "/desafios/abertos" },
    ],
  },
  {
    title: "Startups",
    url: "/admin/startups",
    icon: Rocket,
    roles: ["manager"],
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
    roles: ["manager", "evaluator"],
    items: [
      { title: "Histórico de Interações", url: "/admin/conexoes/historico" },
      { title: "POCs em Andamento", url: "/admin/conexoes/pocs" },
    ],
  },
  {
    title: "Relatórios",
    url: "/admin/relatorios",
    icon: BarChart3,
    roles: ["manager"],
    items: [
      { title: "Indicadores por Etapa", url: "/admin/relatorios/etapas" },
      { title: "Relatórios Personalizados", url: "/admin/relatorios/personalizados" },
    ],
  },
  {
    title: "Configurações",
    url: "/admin/config",
    icon: Settings,
    roles: ["manager"],
    items: [{ title: "Usuários & Permissões", url: "/admin/config/usuarios" }],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const filteredNav = navMain
    .map((item) => {
      if (!item.roles.includes(currentUser.role)) return null
      const filteredItems = item.items?.filter(Boolean)
      return { ...item, items: filteredItems }
    })
    .filter(Boolean) as typeof navMain

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
