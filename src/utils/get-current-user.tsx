// src/utils/getCurrentUser.ts
import { jwtDecode } from "jwt-decode"

interface JwtPayload {
  name?: string
  email?: string
  picture?: string
  sub?: string
}

export interface CurrentUser {
  name: string
  email?: string
  picture?: string
}

export function getCurrentUser(): CurrentUser | null {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null

  if (!token) return null

  try {
    const decoded = jwtDecode<JwtPayload>(token)
    const name = decoded.name || decoded.email?.split("@")[0] || "Usuário"
    return {
      name,
      email: decoded.email,
      picture: decoded.picture,
    }
  } catch (err) {
    console.error("Erro ao decodificar token:", err)
    return null
  }
}
