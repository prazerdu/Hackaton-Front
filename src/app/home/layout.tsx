"use client"

import { AppSidebar } from "@/components/home/app-sidebar" 
import { ModeToggle } from "@/components/theme-toggle"
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-screen">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-2 flex justify-between gap-16">
            <SidebarTrigger />
            <ModeToggle />
          </div>
          <div className="p-4">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
