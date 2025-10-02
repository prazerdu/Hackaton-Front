import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export type RegisterUserData = {
  name: string
  email: string
  password: string
  role: "MANAGER" | "EVALUATOR" | "COMMON"
  companyId: string
}

export async function registerUser(data: RegisterUserData) {
  try {
    const token = localStorage.getItem("access_token")
    if (!token) {
      throw new Error("Token de autenticação não encontrado")
    }

    const res = await axios.post(`${API_URL}/users`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  } catch (error: unknown) {
    console.error("Erro no registro:", error)
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw { message: "Erro ao registrar usuário" };
  }
}
