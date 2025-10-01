"use client"

import * as React from "react"
import { Home, Info, Users } from "lucide-react"

import { NavMain } from "./nav-main"
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

const publicNav = [
  {
    title: "Início",
    url: "/",
    icon: Home,
    items: [],
  },
  {
    title: "Sobre",
    url: "/sobre",
    icon: Info,
    items: [],
  },
  {
    title: "Comunidade",
    url: "/comunidade",
    icon: Users,
    items: [],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <h1 className="text-lg font-semibold px-2">Portal Público</h1>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={publicNav} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
