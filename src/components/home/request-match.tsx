"use client"

import { useState, useEffect } from "react"
import axios, { AxiosError } from "axios"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { jwtDecode } from "jwt-decode"

interface RequestMatchButtonProps {
  challengeId: string
}

interface JwtPayload {
  startupId: string
  id?: string
  sub?: string
}


export const RequestMatchButton = ({ challengeId }: RequestMatchButtonProps) => {
  const [loading, setLoading] = useState(false)
  const [matched, setMatched] = useState(false)
  const [startupId, setStartupId] = useState<string | null>(null)

  useEffect(() => {
    try {
      const token = localStorage.getItem("access_token")
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token)
      setStartupId(decoded.startupId)
    }
    } catch (err) {
      console.error("Erro ao decodificar token JWT:", err)
    }
  }, [])

  const handleRequest = async () => {
    if (!startupId) {
      console.error("Apenas startups podem solicitar matches")
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

  return (
    <Button
      onClick={handleRequest}
      disabled={loading || matched || !startupId}
      className="w-full"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Solicitando...
        </>
      ) : matched ? (
        "Match Solicitado"
      ) : (
        "Solicitar Match"
      )}
    </Button>
  )
}
