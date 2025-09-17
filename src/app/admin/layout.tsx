"use client"

import { AppSidebar } from "@/components/admin/app-sidebar"
import { ModeToggle } from "@/components/theme-toggle"
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { SessionProvider } from "next-auth/react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
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
    </SessionProvider>
  )
}
