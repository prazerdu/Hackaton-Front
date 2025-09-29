"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    router.push("/login")
  }

  return (
    <Button variant="outline" onClick={handleLogout}>
      <LogOut className="text-2xl"/>
    </Button>
  )
}
