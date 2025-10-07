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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"

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
        <Button className="font-medium transition-all duration-200 shadow-md">
          <Plus/> Criar Usuário
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-6 rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Registrar Novo Usuário
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nome
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg focus:ring-2"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-medium">
              Função
            </Label>
            <Select
              value={role}
              onValueChange={(val: "MANAGER" | "EVALUATOR" | "COMMON") => setRole(val)}
            >
              <SelectTrigger className="rounded-lg focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Selecione uma função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="COMMON">Usuário Comum</SelectItem>
                <SelectItem value="EVALUATOR">Avaliador</SelectItem>
                <SelectItem value="MANAGER">Gerente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/40 p-2 rounded-md border border-red-200 dark:border-red-800">
              {error}
            </p>
          )}

          <Button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-2 font-medium rounded-lg shadow-md transition-all duration-200"
          >
            {loading ? "Criando usuário..." : "Registrar Usuário"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
