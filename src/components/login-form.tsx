"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"

type JwtPayload = {
  exp: number
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

  // Verificação do token no localStorage ao montar
  useEffect(() => {
    setIsClient(true)

    const token = localStorage.getItem("accessToken")
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token)
        const now = Date.now() / 1000

        if (decoded.exp > now) {
          router.push("/")
        } else {
          localStorage.removeItem("accessToken")
        }
      } catch {
        localStorage.removeItem("accessToken")
      }
    }
  }, [router])

  // Login manual
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

      const token = res.data.token
      if (token) {
        localStorage.setItem("accessToken", token)
        router.push("/")
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

  // Login com Google
  const LoginSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
        { credential: credentialResponse.credential },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )

      const token = res.data.token
      if (token) {
        localStorage.setItem("accessToken", token)
        router.push("/")
      } else {
        console.error("Token ausente")
      }
    } catch (error) {
      console.error("Erro ao fazer login com o Google:", error)
    }
  }

  if (!isClient) return null

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Faça login para prosseguir</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Coloque seu email e senha abaixo
        </p>
      </div>
      <div className="grid gap-6">
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
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Ou
          </span>
        </div>
        <div className="w-full flex justify-center">
          <GoogleLogin
            onSuccess={LoginSuccess}
            onError={() => console.error("Login com Google falhou")}
            logo_alignment="center"
          />
        </div>
      </div>
      <div className="text-center text-sm">
        Não tem uma conta?{" "}
        <a href="/signup" className="hover:underline underline-offset-4 text-blue-700">
          Criar
        </a>
      </div>
    </form>
  )
}
