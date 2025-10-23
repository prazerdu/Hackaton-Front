import api from "@/lib/kanban/api"
import type { Challenge } from "@/lib/kanban/types"

export const challengesService = {
  async getAll(): Promise<Challenge[]> {
    try {
      const response = await api.get("/challenges")
      return response.data
    } catch (error) {
      console.error("Erro ao buscar desafios:", error)
      return []
    }
  },

  async getById(id: string): Promise<Challenge | null> {
    try {
      const response = await api.get(`/challenges/${id}`)
      return response.data
    } catch (error) {
      console.error(`Erro ao buscar desafio ${id}:`, error)
      return null
    }
  },
}
