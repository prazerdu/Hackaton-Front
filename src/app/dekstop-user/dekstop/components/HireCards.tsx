"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LikeButton from "./LikeButto";
import NavigationHeader from "./NavBar";



const cards = [
  { id: 1, title: "Projeto X", subtitle: "Projeto que busca crescer na área da tecnologia e gerar impacto positivo para jovens devs.", image: "https://i.pinimg.com/736x/35/31/74/3531741d5601c7ed9c1505d784db9b4b.jpg" },
  { id: 2, title: "Desafio Design", subtitle: "2 acessos", image: "https://i.pinimg.com/1200x/92/40/ef/9240ef093578c01b6f4e087ef9989b5a.jpg" },
  { id: 3, title: "Desafio Desktop", subtitle: "5 acessos", image: "https://i.pinimg.com/736x/42/27/71/42277172780abf5043438989d49856e2.jpg" },
  { id: 4, title: "Desafio Mobile", subtitle: "1 acesso", image: "https://i.pinimg.com/1200x/a9/fb/fe/a9fbfec81940413f28fde608c3321101.jpg" },
  { id: 5, title: "Desafio Frontend", subtitle: "4 acessos", image: "https://i.pinimg.com/736x/0b/b4/17/0bb41713571ad487947c810ad18c73d4.jpg" },
];

interface HireCardsProps {
  searchQuery: string;
  likedCards: Record<number, boolean>;
  toggleLike: (cardId: number) => void;
}


export default function HireCards({ searchQuery }: HireCardsProps) {
  const [page, setPage] = useState(0);
  const [selectedCard, setSelectedCard] = useState<typeof cards[0] | null>(null);

  const [likedCards, setLikedCards] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const savedLikes: Record<number, boolean> = {};
    cards.forEach(c => {
      const saved = localStorage.getItem(`isLiked-${c.id}`);
      if (saved) savedLikes[c.id] = JSON.parse(saved);
    });
    setLikedCards(savedLikes);
  }, []);

  const toggleLike = (cardId: number) => {
    const newLiked = !likedCards[cardId];
    const newState = { ...likedCards, [cardId]: newLiked };
    setLikedCards(newState);
    localStorage.setItem(`isLiked-${cardId}`, JSON.stringify(newLiked));
  };

  const cardsPerPage = 5;
  const filteredCards = searchQuery
    ? cards.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : cards;
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const visibleCards = filteredCards.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage);

  return (
    <section className="mb-6 mt-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold tracking-tight">Novos Desafios</h3>
        <div className="flex items-center gap-2">
          {page > 0 && <button onClick={() => setPage(p => p - 1)} className="bg-white shadow-md p-2 rounded-full hover:bg-gray-100"><ChevronLeft size={16} /></button>}
          {page < totalPages - 1 && <button onClick={() => setPage(p => p + 1)} className="bg-white shadow-md p-2 rounded-full hover:bg-gray-100"><ChevronRight size={16} /></button>}
        </div>
      </div>

      {/* GRID DE CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {visibleCards.map(c => (
          <Card key={c.id} className="shadow-sm border hover:shadow-md transition cursor-pointer group relative" onClick={() => setSelectedCard(c)}>
            <div className="absolute top-2 right-2 z-10" onClick={(e) => e.stopPropagation()}>
              <LikeButton cardId={c.id} isLiked={likedCards[c.id] || false} toggleLike={toggleLike} />
            </div>
            <CardHeader className="flex flex-col items-center space-y-2 p-4">
              <div className="w-16 h-16 rounded-md overflow-hidden bg-indigo-50 flex items-center justify-center group-hover:scale-105 transition">
                <Image src={c.image} alt={c.title} width={64} height={64} className="object-contain" />
              </div>
              <CardTitle className="text-sm text-center">{c.title}</CardTitle>
              <CardDescription className="text-xs text-gray-500 text-center line-clamp-2">{c.subtitle}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* MODAL */}
      <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent className="max-w-md rounded-2xl">
          {selectedCard && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">{selectedCard.title}</DialogTitle>
                <DialogDescription>{selectedCard.subtitle}</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <Image src={selectedCard.image} alt={selectedCard.title} width={400} height={250} className="w-full h-48 rounded-lg object-cover shadow-md" />
              </div>
              <NavigationHeader
                cardId={selectedCard.id}
                likedCards={likedCards}
                toggleLike={toggleLike}
              />
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedCard(null)}>Fechar</Button>
                <Button onClick={() => alert(`Acessando ${selectedCard.title}`)}>Acessar</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
