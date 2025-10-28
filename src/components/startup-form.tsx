"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

type JwtPayload = {
  exp: number
}

export function StartupLoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [name, setName] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setIsClient(true)
    const token = localStorage.getItem("access_token")
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token)
        const now = Date.now() / 1000
        if (decoded.exp > now) {
          router.push("/auth/startup")
        } else {
          localStorage.removeItem("access_token")
        }
      } catch {
        localStorage.removeItem("access_token")
      }
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/loginStartup`,
        { name, cnpj },
        { headers: { "Content-Type": "application/json" } }
      )

      const token = res.data.access_token
      const startupData = res.data.startup

      if (token) {
        localStorage.setItem("access_token", token)
        if (startupData) {
          localStorage.setItem("startup_data", JSON.stringify(startupData))
        }
        router.push("/home")
      } else {
        setError("Token não retornado pela API")
      }
    } catch (err) {
      console.error("Erro no login da startup:", err)
      setError("Nome ou CNPJ inválidos")
    } finally {
      setLoading(false)
    }
  }

  if (!isClient) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <form
        onSubmit={handleSubmit}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col items-center gap-2 text-center"
        >
          <h1 className="text-2xl font-semibold tracking-tighter">
            Login da Startup
          </h1>
          <p className="text-sm text-muted-foreground">
            Acesse com o nome e CNPJ cadastrados
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="grid gap-3">
            <Label htmlFor="name">Nome da Startup</Label>
            <Input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="TechNova"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input
              id="cnpj"
              type="text"
              required
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder="12345678000101"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}
