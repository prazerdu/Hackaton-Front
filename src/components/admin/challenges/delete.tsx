"use client"

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import { Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DeleteChallengeButtonProps {
  id: string
  onDeleted?: (id: string) => void
}

export function DeleteChallengeButton({ id, onDeleted }: DeleteChallengeButtonProps) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    const token = localStorage.getItem("access_token")
    if (!token) return

    try {
      setLoading(true)
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/challenges/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      onDeleted?.(id)
    } catch (error) {
      console.error("Erro ao excluir desafio:", error)
      alert("Não foi possível excluir o desafio.")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="flex items-center gap-1 flex-1"
        >
          <Trash2 className="h-4 w-4" /> Excluir
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir desafio?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. O desafio será removido
            permanentemente do sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {loading ? (
              <Spinner className="h-4 w-4" />
            ) : (
              "Excluir definitivamente"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
