"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import Contador from "@/app/visit/page";
import Modal from "./Modal";
import Image from "next/image";


const cards = [
  { id: 1, title: "Content designers", subtitle: "3 open", image: "https://i.pinimg.com/736x/23/50/47/235047224bc54f0f773b5c292de83de0.jpg" },
  { id: 2, title: "PHP Developers", subtitle: "2 open", image: "https://i.pinimg.com/736x/ed/ea/99/edea99df82606eeb70af589e2e198169.jpg" },
  { id: 3, title: "UI/UX Designer", subtitle: "5 open", image: "https://i.pinimg.com/1200x/17/6f/c2/176fc23f5418115658289ba07cd1d566.jpg" },
  { id: 4, title: "iOS Developer", subtitle: "1 open", image: "https://i.pinimg.com/1200x/e2/c9/18/e2c918fddd4fc517665b3ce9c73bb5f6.jpg" },
  { id: 5, title: "Android Developer", subtitle: "4 open", image: "https://i.pinimg.com/1200x/8a/c5/c7/8ac5c7add186209c1cb2e1c9492d631c.jpg" },
  { id: 6, title: "Backend Developer", subtitle: "2 open", image: "https://i.pinimg.com/1200x/41/ff/0b/41ff0baa0b40ab90801a3844b0210554.jpg" },
];

export default function HireCards() {
  const [page, setPage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [clicks, setClicks] = useState<{ [key: number]: number }>({});

  const cardsPerPage = 5;
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const handlePrev = () => {
    if (page > 0 && !animating) {
      setAnimating(true);
      setTimeout(() => {
        setPage((prev) => prev - 1);
        setAnimating(false);
      }, 300);
    }
  };

  const handleNext = () => {
    if (page < totalPages - 1 && !animating) {
      setAnimating(true);
      setTimeout(() => {
        setPage((prev) => prev + 1);
        setAnimating(false);
      }, 300);
    }
  };

  const handleClick = async (id: number) => {
    const res = await fetch(`/api/card/${id}`, { method: "POST" });
    const data = await res.json();
    setClicks((prev) => ({ ...prev, [id]: data.count }));
  };

  const visibleCards = cards.slice(
    page * cardsPerPage,
    page * cardsPerPage + cardsPerPage
  );

  // Carregar acessos iniciais de todos os cards visíveis
  useEffect(() => {
    visibleCards.forEach(async (c) => {
      const res = await fetch(`/api/card/${c.id}`);
      const data = await res.json();
      setClicks((prev) => ({ ...prev, [c.id]: data.count }));
    });
  }, [page]);

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">You Need to Hire</h3>
        <div className="flex items-center gap-2">
          {page > 0 && (
            <button
              onClick={handlePrev}
              className="bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <button className="text-sm text-indigo-600 cursor-pointer">View All</button>
          {page < totalPages - 1 && (
            <button
              onClick={handleNext}
              className="bg-white shadow-md p-2 rounded-full cursor-pointer hover:bg-gray-100"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-5 cursor-pointer gap-4">
        {visibleCards.map((c) => (
          <div
            key={c.id}
            onClick={() => handleClick(c.id)}
            className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-start gap-2 transform transition-all duration-300 ${
              animating
                ? "-translate-x-4 opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <div className="w-9 h-9 rounded-md overflow-hidden flex items-center justify-center bg-indigo-50">
            <div className="w-9 h-9 rounded-md overflow-hidden relative bg-indigo-50">
  <Image
    src={c.image}
    alt={c.title}
    fill
    className="object-cover"
  />
</div>

            </div>
            <div className="text-sm font-medium">{c.title}</div>
            <div className="text-xs text-gray-400">{c.subtitle}</div>
              {/* <Contador /> */}
          </div>
        ))}
      </div>
    </section>
  );
}
