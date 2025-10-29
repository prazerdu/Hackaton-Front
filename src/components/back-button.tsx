"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function BackButton() {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      className="flex items-center gap-2"
    >
      <ArrowLeft
      size={'icon'}
      />
    </Button>
  )
}
