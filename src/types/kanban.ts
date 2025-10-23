export interface Card {
  id: string
  title: string
  description: string
  user: string
  area: string[]
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
