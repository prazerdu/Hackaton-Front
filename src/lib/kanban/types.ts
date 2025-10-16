export interface Challenge {
  id: string
  title: string
  description?: string
  status?: string
  createdAt?: string
}

export interface NavItem {
  title: string
  url: string
  icon?: string
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

export type IDEA_STATUSES = "GENERATION" | "TRIAGE" | "IDEATION" | "IMPLEMENTATION" | "COMPLETED"
export type UserRole = "MANAGER" | "EVALUATOR" | "USER"

export interface User {
  id: string
  name: string
  email: string
  role?: UserRole
}

export interface Vote {
  id: string
  ideaId: string
  userId: string
  createdAt: string
}

export interface Comment {
  id: string
  ideaId: string
  content: string
  createdAt: string
  user: {
    id: string
    name: string
    email: string
  }
}

export interface Idea {
  id: string
  title: string
  description: string
  status: IDEA_STATUSES
  challengeId: string
  createdById?: string
  createdAt: string
  updatedAt: string
  votes: Vote[]
  comments: Comment[]
}

export interface Column {
  id: IDEA_STATUSES
  title: string
  color: string
  ideas: Idea[]
}
