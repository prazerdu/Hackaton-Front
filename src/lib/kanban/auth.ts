import type { User, UserRole } from "@/lib/kanban/types"

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const userStr = localStorage.getItem("user")
  if (!userStr) return null

  try {
    return JSON.parse(userStr) as User
  } catch {
    return null
  }
}

export function canMoveIdeas(userRole?: UserRole): boolean {
  if (!userRole) return false
  return userRole === "MANAGER" || userRole === "EVALUATOR"
}

export function canVoteAndComment(ideaStatus: string): boolean {
  return ideaStatus === "IDEATION"
}
