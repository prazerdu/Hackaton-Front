"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Card, ChecklistItem, Activity } from "@/types/kanban"
import {
  Calendar,
  CheckSquare,
  Paperclip,
  Users,
  Plus,
  X,
  CreditCard,
  AlignLeft,
  Eye,
  EyeOff,
  Trash2,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"
import { DialogTitle } from "@radix-ui/react-dialog"

interface CardDetailModalProps {
  card: Card | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CardDetailModal({ card, open, onOpenChange }: CardDetailModalProps) {
  const [description, setDescription] = useState(card?.description || "")
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [tags, setTags] = useState(card?.tags || [])
  const [newTag, setNewTag] = useState("")
  const [showAddTag, setShowAddTag] = useState(false)
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(
    card?.checklistItems || [
      { id: "1", text: "Campos de email e senha", completed: true },
      { id: "2", text: "Deve ter um botão que chama a função de Login", completed: true },
      { id: "3", text: "Em caso de erro, uma mensagem clara deve ser exibida.", completed: true },
    ],
  )
  const [newChecklistItem, setNewChecklistItem] = useState("")
  const [hideCompleted, setHideCompleted] = useState(false)
  const [activities, setActivities] = useState<Activity[]>(
    card?.activities || [
      {
        id: "1",
        user: "Eduardo Teixeira",
        action: "concluiu Após o login, o usuário é redirecionado para o dashboard da sua empresa. neste cartão",
        timestamp: "1 de out. de 2025, 22:50",
      },
      {
        id: "2",
        user: "Eduardo Teixeira",
        action: "concluiu Em caso de erro, uma mensagem clara deve ser exibida. neste cartão",
        timestamp: "1 de out. de 2025, 22:50",
      },
    ],
  )
  const [newComment, setNewComment] = useState("")
  const [showActivities, setShowActivities] = useState(true)

  if (!card) return null

  const completedCount = checklistItems.filter((item) => item.completed).length
  const totalCount = checklistItems.length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const handleToggleChecklistItem = (id: string) => {
    setChecklistItems((items) => items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
    const item = checklistItems.find((i) => i.id === id)
    if (item) {
      const action = !item.completed ? "concluiu" : "desmarcou"
      addActivity(`${action} ${item.text} neste cartão`)
    }
  }

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      const newItem: ChecklistItem = {
        id: Date.now().toString(),
        text: newChecklistItem,
        completed: false,
      }
      setChecklistItems([...checklistItems, newItem])
      setNewChecklistItem("")
      addActivity(`adicionou "${newChecklistItem}" ao checklist`)
    }
  }

  const handleDeleteChecklistItem = (id: string) => {
    const item = checklistItems.find((i) => i.id === id)
    setChecklistItems((items) => items.filter((item) => item.id !== id))
    if (item) {
      addActivity(`removeu "${item.text}" do checklist`)
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
      setShowAddTag(false)
      addActivity(`adicionou a etiqueta "${newTag.trim()}"`)
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
    addActivity(`removeu a etiqueta "${tag}"`)
  }

  const addActivity = (action: string) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      user: "Eduardo Teixeira",
      action,
      timestamp: new Date().toLocaleString("pt-BR", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
    setActivities([newActivity, ...activities])
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      addActivity(`comentou: "${newComment}"`)
      setNewComment("")
    }
  }

  const handleSaveDescription = () => {
    setIsEditingDescription(false)
    addActivity("editou a descrição")
  }

  const visibleChecklistItems = hideCompleted ? checklistItems.filter((item) => !item.completed) : checklistItems

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-4xl w-[90vw] overflow-hidden p-0 gap-0">
        <DialogTitle />
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <CreditCard className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ChevronDown className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex overflow-hidden h-[calc(95vh-73px)]">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex items-start gap-3">
              <CreditCard className="w-6 h-6 mt-1" />
              <h2 className="text-2xl font-semibold">{card.title}</h2>
            </div>

            <div className="flex flex-wrap gap-2 ml-9">
              <Button variant="secondary" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
              <Button variant="secondary" size="sm">
                <Calendar className="w-4 h-4 mr-1" />
                Datas
              </Button>
              <Button variant="secondary" size="sm">
                <CheckSquare className="w-4 h-4 mr-1" />
                Checklist
              </Button>
              <Button variant="secondary" size="sm">
                <Users className="w-4 h-4 mr-1" />
                Membros
              </Button>
              <Button variant="secondary" size="sm">
                <Paperclip className="w-4 h-4 mr-1" />
                Anexo
              </Button>
            </div>

            <div className="ml-9">
              <h3 className="text-sm font-semibold mb-2">Etiquetas</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} className="px-3 py-1 cursor-pointer group" onClick={() => handleRemoveTag(tag)}>
                    {tag}
                    <X className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Badge>
                ))}
                {showAddTag ? (
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                      placeholder="Nome da etiqueta"
                      className="w-32 h-7 text-sm"
                      autoFocus
                    />
                    <Button size="sm" onClick={handleAddTag}>
                      Adicionar
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setShowAddTag(false)} className="h-7">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Button variant="secondary" size="sm" onClick={() => setShowAddTag(true)} className="h-7">
                    <Plus className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="ml-9">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <AlignLeft className="w-4 h-4" />
                  Descrição
                </h3>
                {!isEditingDescription && (
                  <Button variant="secondary" size="sm" onClick={() => setIsEditingDescription(true)}>
                    Editar
                  </Button>
                )}
              </div>
              {isEditingDescription ? (
                <div className="space-y-2">
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[100px] resize-none"
                    placeholder="Adicione uma descrição mais detalhada..."
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveDescription}>
                      Salvar
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setIsEditingDescription(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm p-3 rounded">{description}</p>
              )}
            </div>

            <div className="ml-9">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" />
                  Checklist
                </h3>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" onClick={() => setHideCompleted(!hideCompleted)}>
                    {hideCompleted ? <Eye className="w-4 h-4 mr-1" /> : <EyeOff className="w-4 h-4 mr-1" />}
                    {hideCompleted ? "Mostrar" : "Ocultar"} itens marcados
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setChecklistItems([])
                      addActivity("excluiu o checklist")
                    }}
                  >
                    Excluir
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs min-w-[32px]">{Math.round(progress)}%</span>
                <Progress value={progress} className="flex-1 h-2" />
              </div>
              <div className="space-y-2">
                {visibleChecklistItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 group p-2 rounded">
                    <Checkbox checked={item.completed} onCheckedChange={() => handleToggleChecklistItem(item.id)} />
                    <span className={`flex-1 text-sm ${item.completed ? "line-through" : ""}`}>{item.text}</span>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteChecklistItem(item.id)} className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2 mt-2">
                  <Input
                    value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddChecklistItem()}
                    placeholder="Adicionar um item"
                    className="flex-1"
                  />
                  <Button onClick={handleAddChecklistItem}>Adicionar</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-80 border-l overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Comentários e atividade</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowActivities(!showActivities)} className="text-xs">
                {showActivities ? "Ocultar" : "Mostrar"} detalhes
              </Button>
            </div>

            <div className="mb-4">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escrever um comentário..."
                className="min-h-[60px] resize-none text-sm mb-2"
              />
              <Button onClick={handleAddComment} disabled={!newComment.trim()} className="w-full">
                Salvar
              </Button>
            </div>

            {showActivities && (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex gap-2">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="text-xs font-semibold">ET</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                      </div>
                      <div className="text-xs mt-1">{activity.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
