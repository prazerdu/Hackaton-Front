"use client"

import { useState } from "react"
import { HeartIcon, MessageCircleIcon, CircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import LikeButton from "./LikeButto"

interface NavigationHeaderProps {
  cardId: number; // o id do card que será mostrado na barra
  likedCards: Record<number, boolean>; 
  toggleLike: (cardId: number) => void;
}

export default function NavigationHeader({ cardId, likedCards, toggleLike }: NavigationHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-row items-center gap-2">
            {/* Like */}
            <LikeButton
              cardId={cardId}
              isLiked={likedCards[cardId] || false}
              toggleLike={toggleLike}
            />

            {/* Comentários */}
            <Button
              size="icon"
              variant="ghost"
              title="Comentários"
              onClick={() => setOpen(true)}
            >
              <MessageCircleIcon aria-hidden="true" />
            </Button>

            {/* Espaço vazio */}
            <Button size="icon" variant="ghost" disabled>
              <CircleIcon className="opacity-40" />
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de Comentários */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl shadow-xl border bg-white dark:bg-neutral-900 transition-all duration-500 ease-in-out">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Comentários</DialogTitle>
            <DialogDescription>Veja e escreva comentários abaixo.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="p-3 rounded-md bg-gray-100 dark:bg-neutral-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">🔥 Ótimo post, parabéns!</p>
            </div>
            <div className="p-3 rounded-md bg-gray-100 dark:bg-neutral-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">😍 Muito útil, obrigado por compartilhar!</p>
            </div>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Escreva um comentário..."
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          </div>
        </DialogContent>
      </Dialog>
    </header>
  )
}
