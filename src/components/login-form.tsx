"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useEffect, useState, useCallback } from "react"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"

type JwtPayload = {
  exp: number
  role?: "COMMON" | "EVALUATOR" | "MANAGER" | "HUB_ADMIN"
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const redirectByRole = useCallback(
    (role?: JwtPayload["role"]) => {
      switch (role) {
        case "COMMON":
          router.push("/user")
          break
        case "EVALUATOR":
          router.push("/evaluator")
          break
        case "MANAGER":
          router.push("/admin")
          break
        case "HUB_ADMIN":
          router.push("/hubadmin")
          break
        default:
          router.push("/")
      }
    },
    [router]
  )

  useEffect(() => {
    setIsClient(true)
    const token = localStorage.getItem("access_token")
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token)
        const now = Date.now() / 1000
        if (decoded.exp > now) {
          redirectByRole(decoded.role)
        } else {
          localStorage.removeItem("access_token")
        }
      } catch {
        localStorage.removeItem("access_token")
      }
    }
  }, [redirectByRole])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      )
      const token = res.data.access_token
      if (token) {
        localStorage.setItem("access_token", token)
        const decoded = jwtDecode<JwtPayload>(token)
        redirectByRole(decoded.role)
      } else {
        setError("Token não retornado pela API")
      }
    } catch (err) {
      console.error("Erro no login:", err)
      setError("Credenciais inválidas")
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
            Faça login para prosseguir
          </h1>
        </motion.div>

        <motion.div
          className="grid gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </motion.div>
      </form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-6 text-center text-sm text-muted-foreground"
      >
        <p>
          Deseja acessar desafios?{" "}
          <Link
            href="/auth/startup"
            className="text-primary hover:underline font-medium"
          >
            Startup
          </Link>
        </p>
      </motion.div>
    </motion.div>
  )
}
