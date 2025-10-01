"use client";

import { useState } from "react";
import { HeartIcon, MessageCircleIcon, CircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LikeButton from "@/app/dekstop-user/dekstop/components/LikeButto";
import App from "../../Comment/page"; 

interface NavigationHeaderProps {
  cardId: number;
  likedCards: Record<number, boolean>;
  toggleLike: (cardId: number) => void;
}

export default function NavigationHeader({ cardId, likedCards, toggleLike }: NavigationHeaderProps) {
  const [openComments, setOpenComments] = useState(false);

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        <NavigationMenu className="flex-1">
          <NavigationMenuList className="flex flex-row items-center gap-2">
            {/* Like */}
            <NavigationMenuItem>
              <LikeButton cardId={cardId} isLiked={likedCards[cardId]} toggleLike={toggleLike} />
            </NavigationMenuItem>

            {/* Comentários */}
            <NavigationMenuItem>
              <Button
                size="icon"
                variant="ghost"
                title="Comentários"
                onClick={() => setOpenComments(true)}
              >
                <MessageCircleIcon aria-hidden="true" />
              </Button>
            </NavigationMenuItem>

            {/* Espaço vazio */}
            <NavigationMenuItem>
              <Button size="icon" variant="ghost" disabled>
                <CircleIcon className="opacity-40" />
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Modal de Comentários */}
      <Dialog open={openComments} onOpenChange={setOpenComments}>
        <DialogContent className="sm:max-w-md rounded-2xl shadow-xl border bg-white dark:bg-neutral-900 transition-all duration-500 ease-in-out">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Comentários</DialogTitle>
          </DialogHeader>

          {/* Renderiza o componente de comentários */}
          <App cardId={cardId} />
        </DialogContent>
      </Dialog>
    </header>
  );
}
