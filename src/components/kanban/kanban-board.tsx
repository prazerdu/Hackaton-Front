"use client"

import type React from "react"
import { useState } from "react"
import { KanbanColumn } from "./kanban-column"
import { CardDetailModal } from "./card-details"
import { AddCardModal } from "./add-card"
import type { Card, Column } from "@/types/kanban"

const initialColumns: Column[] = [
  {
    id: "capture",
    title: "Geração/Captura de Ideias",
    color: "bg-blue-500",
    cards: [
      {
        id: "1",
        title: "Automação de Processos Logísticos",
        description: "Implementar IA para otimizar rotas de entrega",
        company: "Empresa A",
        tags: ["Logística", "IA"],
        priority: "high",
        date: "2025-01-15",
        comments: 3,
        attachments: 2,
        checklist: { completed: 2, total: 5 },
      },
      {
        id: "2",
        title: "Plataforma de Gestão Sustentável",
        description: "Sistema para monitorar pegada de carbono",
        company: "Empresa B",
        tags: ["Sustentabilidade", "ESG"],
        priority: "medium",
        date: "2025-01-18",
        comments: 1,
        attachments: 0,
      },
    ],
  },
  {
    id: "pre-screening",
    title: "Pré-Triagem",
    color: "bg-purple-500",
    cards: [
      {
        id: "3",
        title: "Chatbot para Atendimento ao Cliente",
        description: "Bot inteligente com processamento de linguagem natural",
        company: "Empresa C",
        tags: ["IA", "Atendimento"],
        priority: "high",
        date: "2025-01-10",
        comments: 5,
        attachments: 1,
        checklist: { completed: 3, total: 4 },
      },
    ],
  },
  {
    id: "ideation",
    title: "Ideação",
    color: "bg-green-500",
    cards: [
      {
        id: "4",
        title: "Marketplace B2B de Fornecedores",
        description: "Conectar empresas com fornecedores verificados",
        company: "Empresa A",
        tags: ["Marketplace", "B2B"],
        priority: "medium",
        date: "2025-01-05",
        comments: 2,
        attachments: 3,
      },
      {
        id: "5",
        title: "Sistema de Gestão de Energia",
        description: "IoT para monitoramento e economia de energia",
        company: "Empresa D",
        tags: ["IoT", "Energia"],
        priority: "high",
        date: "2025-01-08",
        comments: 4,
        attachments: 1,
        checklist: { completed: 1, total: 3 },
      },
    ],
  },
  {
    id: "detailed-screening",
    title: "Triagem Detalhada",
    color: "bg-orange-500",
    cards: [
      {
        id: "6",
        title: "Blockchain para Rastreabilidade",
        description: "Sistema de rastreamento de produtos com blockchain",
        company: "Empresa B",
        tags: ["Blockchain", "Supply Chain"],
        priority: "high",
        date: "2024-12-20",
        comments: 7,
        attachments: 4,
        checklist: { completed: 5, total: 8 },
      },
    ],
  },
  {
    id: "experimentation",
    title: "Experimentação (POC)",
    color: "bg-red-500",
    cards: [
      {
        id: "7",
        title: "Análise Preditiva de Vendas",
        description: "Machine Learning para previsão de demanda",
        company: "Empresa C",
        tags: ["ML", "Vendas"],
        priority: "high",
        date: "2024-12-01",
        comments: 12,
        attachments: 6,
        checklist: { completed: 8, total: 10 },
      },
    ],
  },
]

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [draggedCard, setDraggedCard] = useState<Card | null>(null)
  const [draggedFromColumn, setDraggedFromColumn] = useState<string | null>(null)
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [targetColumnId, setTargetColumnId] = useState<string>("")

  const handleDragStart = (card: Card, columnId: string) => {
    setDraggedCard(card)
    setDraggedFromColumn(columnId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (targetColumnId: string) => {
    if (!draggedCard || !draggedFromColumn) return

    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((col) => {
        if (col.id === draggedFromColumn) {
          return {
            ...col,
            cards: col.cards.filter((card) => card.id !== draggedCard.id),
          }
        }
        if (col.id === targetColumnId) {
          return {
            ...col,
            cards: [...col.cards, draggedCard],
          }
        }
        return col
      })
      return newColumns
    })

    setDraggedCard(null)
    setDraggedFromColumn(null)
  }

  const handleCardClick = (card: Card) => {
    setSelectedCard(card)
    setIsDetailModalOpen(true)
  }

  const handleAddCardClick = (columnId: string) => {
    setTargetColumnId(columnId)
    setIsAddModalOpen(true)
  }

  const handleAddCard = (newCardData: Omit<Card, "id">) => {
    const newCard: Card = {
      ...newCardData,
      id: Date.now().toString(),
    }

    setColumns((prevColumns) =>
      prevColumns.map((col) => (col.id === targetColumnId ? { ...col, cards: [...col.cards, newCard] } : col)),
    )
  }

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onCardClick={handleCardClick}
            onAddCard={handleAddCardClick}
          />
        ))}
      </div>

      <CardDetailModal card={selectedCard} open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen} />

      <AddCardModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAddCard={handleAddCard}
        columnId={targetColumnId}
      />
    </>
  )
}
