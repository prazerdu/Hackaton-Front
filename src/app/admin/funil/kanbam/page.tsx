"use client"
import { KanbanBoard } from "@/components/kanban/kanban-board"
import { Lightbulb } from "lucide-react"

export default function KanbanPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Kanban</h1>
              <p className="text-sm">Gestão de Desafios e Ideias Corporativas</p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <KanbanBoard />
      </main>
    </div>
  )
}
