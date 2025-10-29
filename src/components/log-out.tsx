"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    router.push("/auth/startup")
  }

  return (
    <Button variant="outline" onClick={handleLogout}>
      <LogOut className="w-4 h-4"/>
    </Button>
  )
}
