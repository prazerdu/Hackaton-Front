"use client"

import { ModeToggle } from "@/components/theme-toggle"
import Usuario from "../dekstop-user/dekstop/components/Usuario"
import NavDropDown from "@/components/navDrop"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
      <div className="flex min-h-screen w-screen">
        <main className="flex-1 overflow-y-auto">
            <div className="flex">
          <NavDropDown />
          </div>
          <div className="p-4">{children}</div>
        </main>
      </div>
  )
}
