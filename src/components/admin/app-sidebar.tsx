"use client"

import * as React from "react"
import {
  Users,
  BarChart3,
  Settings,
  ClipboardList,
  Network,
  Rocket,
} from "lucide-react"

import { NavMain } from "@/components/admin/nav-main"
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

import { useSession } from "next-auth/react"

// Dados corporativos
const data = {
  user: {
    name: "Maria Silva",
    email: "maria.silva@corporacao.com",
    avatar: "/avatars/maria.jpg",
  },
  teams: [],
  navMain: [],
  projects: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()

  const userWithRole = session?.user as { role?: string } | undefined
  const isAdmin = userWithRole?.role === "admin"

  const navMain = isAdmin ? data.navMain: [
        {
          title: "Dashboard",
          url: "#",
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
          icon: Users,
          items: [
            { title: "Captura de Ideias", url: "#" },
            { title: "Pré-Triagem", url: "#" },
            { title: "Ideação", url: "#" },
            { title: "Triagem Detalhada", url: "#" },
            { title: "POCs", url: "#" },
          ],
        },
        {
          title: "Desafios",
          url: "#",
          icon: ClipboardList,
          items: [
            { title: "Meus Desafios", url: "#" },
            { title: "Criar Desafio", url: "#" },
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
        {
          title: "Configurações",
          url: "#",
          icon: Settings,
          items: [
            { title: "Usuários & Permissões", url: "#" },
          ],
        },
      ]

  const projects = isAdmin ? data.projects : []

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        {isAdmin && <NavProjects projects={projects} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
