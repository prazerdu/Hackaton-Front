"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { IconHome } from "@tabler/icons-react"

export default function RedirectHome() {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.push("/home")}
      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
    >
      <IconHome/>
    </Button>
  )
}
