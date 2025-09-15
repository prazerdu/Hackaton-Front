"use client"

import * as React from "react"
import {
  Users,
  Briefcase,
  FileText,
  BarChart3,
  Settings,
  Building2,
  PieChart,
  ClipboardCheck,
  CreditCard,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Dados corporativos
const data = {
  user: {
    name: "Maria Silva",
    email: "maria.silva@corporacao.com",
    avatar: "/avatars/maria.jpg",
  },
  teams: [
    {
      name: "Corporação X",
      logo: Building2,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: BarChart3,
      isActive: true,
      items: [
        { title: "Visão Geral", url: "#" },
        { title: "Indicadores", url: "#" },
        { title: "Performance", url: "#" },
      ],
    },
    {
      title: "Recursos Humanos",
      url: "#",
      icon: Users,
      items: [
        { title: "Funcionários", url: "#" },
        { title: "Folha de Pagamento", url: "#" },
        { title: "Treinamentos", url: "#" },
      ],
    },
    {
      title: "Finanças",
      url: "#",
      icon: CreditCard,
      items: [
        { title: "Contas a Pagar", url: "#" },
        { title: "Contas a Receber", url: "#" },
        { title: "Relatórios Financeiros", url: "#" },
      ],
    },
    {
      title: "Projetos",
      url: "#",
      icon: Briefcase,
      items: [
        { title: "Ativos", url: "#" },
        { title: "Concluídos", url: "#" },
        { title: "Planejamento", url: "#" },
      ],
    },
    {
      title: "Relatórios",
      url: "#",
      icon: FileText,
      items: [
        { title: "Mensais", url: "#" },
        { title: "Trimestrais", url: "#" },
        { title: "Customizados", url: "#" },
      ],
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings,
      items: [
        { title: "Geral", url: "#" },
        { title: "Usuários & Permissões", url: "#" },
        { title: "Integrações", url: "#" },
      ],
    },
  ],
  projects: [
    {
      name: "Expansão LATAM",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Digitalização Interna",
      url: "#",
      icon: ClipboardCheck,
    },
    {
      name: "Sustentabilidade",
      url: "#",
      icon: Briefcase,
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
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
