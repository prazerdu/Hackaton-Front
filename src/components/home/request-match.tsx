"use client"

import { useState, useEffect } from "react"
import axios, { AxiosError } from "axios"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"

interface RequestMatchButtonProps {
  challengeId: string
}

interface JwtPayload {
  startupId?: string
  id?: string
  sub?: string
}

export const RequestMatchButton = ({ challengeId }: RequestMatchButtonProps) => {
  const [loading, setLoading] = useState(false)
  const [matched, setMatched] = useState(false)
  const [startupId, setStartupId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    try {
      const token = localStorage.getItem("access_token")
      if (token) {
        const decoded = jwtDecode<JwtPayload>(token)
        if (decoded.startupId) {
          setStartupId(decoded.startupId)
        }
      }
    } catch (err) {
      console.error("Erro ao decodificar token JWT:", err)
    }
  }, [])

  const handleRequest = async () => {
    if (!startupId) {
      router.push("/auth/startup")
      return
    }

    try {
      setLoading(true)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      await axios.post(`${apiUrl}/matches/${challengeId}/${startupId}`)
      setMatched(true)
    } catch (error) {
      const err = error as AxiosError
      console.error("Erro ao solicitar match:", err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  const getButtonText = () => {
    if (loading) return (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Solicitando...</>)
    if (matched) return "Match Solicitado"
    if (!startupId) return "Logar como startup para acessar"
    return "Solicitar Match"
  }

  return (
    <Button
      onClick={handleRequest}
      disabled={loading || matched}
      className={`w-full ${!startupId ? "bg-gray-300 text-gray-700 hover:bg-gray-300 cursor-pointer" : ""}`}
    >
      {getButtonText()}
    </Button>
  )
}
