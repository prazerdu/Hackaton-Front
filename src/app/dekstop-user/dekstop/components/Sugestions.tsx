"use client";

import { useState } from "react";
import Header from "./Header";
import HireCards from "./HireCards";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [likedCards, setLikedCards] = useState<Record<number, boolean>>({});

  const toggleLike = (cardId: number) => {
    setLikedCards((prevLikedCards) => ({
      ...prevLikedCards,
      [cardId]: !prevLikedCards[cardId]
    }));
  };

  return (
    <div className="p-4">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <HireCards
        searchQuery={searchQuery}
        likedCards={likedCards}
        toggleLike={toggleLike}
      />
    </div>
  );
}
