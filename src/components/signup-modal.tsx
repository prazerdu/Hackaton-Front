"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import { registerUser } from "@/services/register"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type JwtPayload = {
  companyId: string
}

export function SignupModal() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"MANAGER" | "EVALUATOR" | "COMMON">("COMMON")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleRegister = async () => {
    setError("")
    setLoading(true)

    try {
      const token = localStorage.getItem("access_token")
      if (!token) throw new Error("Token não encontrado")

      const decoded = jwtDecode<JwtPayload>(token)
      if (!decoded.companyId) throw new Error("companyId ausente no token")

      await registerUser({
        name,
        email,
        password,
        role,
        companyId: decoded.companyId,
      })

      router.refresh()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erro ao criar usuário")
      } else {
        setError("Erro ao criar usuário")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Criar Usuário</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Usuário</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label>Role</Label>
            <Select value={role} onValueChange={(val: "MANAGER" | "EVALUATOR" | "COMMON") => setRole(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="COMMON">COMMON</SelectItem>
                <SelectItem value="EVALUATOR">EVALUATOR</SelectItem>
                <SelectItem value="MANAGER">MANAGER</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button onClick={handleRegister} disabled={loading} className="w-full">
            {loading ? "Criando..." : "Registrar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
