"use client";
import Banner from "@/components/Banner";
import Header from "../dekstop-user/dekstop/components/Header";
import React, { useState } from "react";
import HireCards from "../dekstop-user/dekstop/components/HireCards";
import ProjectCards from "../dekstop-user/dekstop/components/Rightbar";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const [likedCards, setLikedCards] = useState<Record<number, boolean>>({});

  const toggleLike = (cardId: number) => {
    setLikedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-black">
      {/* Layout Mobile (até lg) */}
      <div className="block lg:hidden flex-1 flex-col">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="px-4 flex-1 flex flex-col overflow-hidden">
          <Banner />
          <ProjectCards />
          
          {/* Hire Cards */}
          <div className="mt-4 flex-shrink-0">
            <HireCards
              searchQuery={searchQuery}
              likedCards={likedCards}
              toggleLike={toggleLike}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
