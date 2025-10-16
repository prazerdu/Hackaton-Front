import api from "@/lib/kanban/api"
import type { Idea, IDEA_STATUSES, Comment, Vote } from "@/lib/kanban/types"

export const ideasService = {
  async getIdeasByChallenge(challengeId: string): Promise<Record<IDEA_STATUSES, Idea[]>> {
    try {
      const response = await api.get(`/ideas/kanban/${challengeId}`)
      return response.data
    } catch (error) {
      console.error(`Erro ao buscar ideias do desafio ${challengeId}:`, error)
      return {
        GENERATION: [],
        TRIAGE: [],
        IDEATION: [],
        IMPLEMENTATION: [],
        COMPLETED: [],
      }
    }
  },

  async createIdea(data: {
    title: string
    description: string
    challengeId: string
  }): Promise<Idea | null> {
    try {
      const response = await api.post("/ideas", data)
      return response.data
    } catch (error) {
      console.error("Erro ao criar ideia:", error)
      return null
    }
  },

  // PATCH /ideas/{id}/status - atualizar status da ideia
  async updateIdeaStatus(Id: string, status: IDEA_STATUSES): Promise<Idea | null> {
    try {
      const response = await api.patch(`/ideas/${Id}/status`, { status })
      return response.data
    } catch (error) {
      console.error(`Erro ao atualizar status da ideia ${Id}:`, error)
      return null
    }
  },

  async addComment(ideaId: string, content: string): Promise<Comment | null> {
    try {
      const response = await api.post(`/ideas/${ideaId}/comment`, { content })
      return response.data
    } catch (error) {
      console.error(`Erro ao adicionar comentário na ideia ${ideaId}:`, error)
      return null
    }
  },

  async voteIdea(id: string): Promise<Vote | null> {
    try {
      const response = await api.post(`/ideas/${id}/vote`)
      return response.data
    } catch (error) {
      console.error(`Erro ao votar na ideia ${id}:`, error)
      return null
    }
  },

  // GET /ideas/{id} - Buscar ideia específica
  async getIdeaById(ideaId: string): Promise<Idea | null> {
    try {
      const response = await api.get(`/ideas/${ideaId}`)
      return response.data
    } catch (error) {
      console.error(`Erro ao buscar ideia ${ideaId}:`, error)
      return null
    }
  },
}
