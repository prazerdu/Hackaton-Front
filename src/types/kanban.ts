export interface Card {
  id: string
  title: string
  description: string
  company: string
  tags: string[]
  priority: "high" | "medium" | "low"
  date: string
  assignee?: string
  attachments?: number
  comments?: number
  checklist?: { completed: number; total: number }
  dueDate?: string
  checklistItems?: ChecklistItem[]
  activities?: Activity[]
  members?: string[]
}

export interface ChecklistItem {
  id: string
  text: string
  completed: boolean
}

export interface Activity {
  id: string
  user: string
  action: string
  timestamp: string
}

export interface Column {
  id: string
  title: string
  color: string
  cards: Card[]
}
