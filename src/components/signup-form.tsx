"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  // Cadastro com email/senha
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )

      if (res.data?.token) {
        localStorage.setItem("accessToken", res.data.token)
        router.push("/")
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error)
      alert("Erro no cadastro. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  // Cadastro/Login com Google
  const SignUpWithGoogle = async (credentialResponse: CredentialResponse) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
        { credential: credentialResponse.credential },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )

      if (res.data?.token) {
        localStorage.setItem("accessToken", res.data.token)
        router.push("/")
      }
    } catch (error) {
      console.error("Erro no cadastro com Google:", error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Crie sua conta</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Preencha os dados abaixo para se cadastrar
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" type="text" required onChange={handleChange} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required onChange={handleChange} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" required onChange={handleChange} />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Ou
          </span>
        </div>
        <button className="w-full flex justify-center">
          <GoogleLogin
            onSuccess={SignUpWithGoogle}
            onError={() => console.error("Cadastro com Google falhou")}
            logo_alignment="center"
          />
        </button>
      </div>
      <div className="text-center text-sm">
        Já tem conta?{" "}
        <a href="/login" className="hover:underline underline-offset-4 text-blue-700">
          Entrar
        </a>
      </div>
    </form>
  )
}
