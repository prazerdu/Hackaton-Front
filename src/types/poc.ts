export interface POC {
  id: string
  name: string
  description: string
  challengeId: string
  startupId: string
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  createdAt?: string
  updatedAt?: string
  challenge?: Challenge
  startup?: Startup
}

export interface Challenge {
  id: string
  title: string
  name: string
  description: string
  area?: string
}

export interface Startup {
  id: string
  name: string
  description: string
  area?: string
  logo?: string
}

export interface CreatePOCData {
  name: string
  description: string
  challengeId: string
  startupId: string
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
}
