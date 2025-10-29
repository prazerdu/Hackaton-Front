"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, HelpCircle, Info, User } from "lucide-react";

export default function HeroTravel() {
  const cards = [
    {
      id: 1,
      title: "IA personalizada",
      subtitle: "Assistente inteligente",
      mainDescription:
        "O site conta com a sua própria IA personalizada para ajudar usuários com dúvidas sobre o sistema, produtos e serviços oferecidos.",
      cardDescription: "IA personalizada para ajudar usuários com dúvidas.",
      img: "",
      extras: (
        <>
          {/* Perguntas flutuantes para IA */}
          {[
            "Como posso participar de um desafio?",
            "Onde posso fazer login?",
            "Quais são os benefícios de participar?",
            "Onde tenho acesso a listagem de desafios?",
            "Posso mudar meu perfil de usuário?",
          ].map((q, i) => {
            const positions = [
              { top: "5%", left: "20%" },
              { top: "30%", left: "75%" },
              { top: "80%", left: "5%" },
              { top: "65%", left: "30%" },
              { top: "15%", left: "45%" },
            ];
            const pos = positions[i % positions.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * i, type: "spring", stiffness: 100 }}
                className="absolute flex items-center gap-2 bg-white/30 backdrop-blur-md rounded-lg px-3 py-2 shadow-lg text-sm font-medium text-white cursor-default"
                style={{ top: pos.top, left: pos.left }}
              >
                <HelpCircle className="w-5 h-5 text-purple-500" />
                {q}
              </motion.div>
            );
          })}
        </>
      ),
    },
    {
      id: 2,
      title: "Sobre a plataforma",
      subtitle: "Recursos públicos e privados",
      mainDescription:
        "Nossa plataforma oferece recursos variados, com dois estados: Público e Privado. Na parte pública, desafios são acessíveis a todos; na privada, conteúdos exclusivos para usuários autenticados.",
      cardDescription: "Recursos públicos e privados.",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1f1e3f7b2b9b6f3b8a9e3f7c9e2d1a4c",
      extras: (
        <>
          {/* Ícones representando funcionalidades da plataforma */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-10 left-10 flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-lg px-3 py-2 shadow-lg text-white text-sm"
          >
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute top-32 left-60 flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-lg px-3 py-2 shadow-lg text-white text-sm"
          >
            <Info className="w-5 h-5 text-purple-500" /> Privado
          </motion.div>
        </>
      ),
    },
    {
      id: 3,
      title: "Tipos de usuários",
      subtitle: "Perfis e permissões",
      mainDescription:
        "Diferentes perfis de usuários com permissões específicas permitem um controle detalhado sobre o acesso a conteúdos e funcionalidades.",
      cardDescription: "Perfis e permissões diferentes.",
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=7c2e0f9b6f1b8a4d3c5e6f7a9b0c1d2e",
      extras: (
        <>
        </>
      ),
    },
  ];

  const [selectedCard, setSelectedCard] = useState(cards[0]);
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ left: index * (el.clientWidth * 0.28 + 24), behavior: "smooth" });
  }, [index]);

  const selectCard = (i: number) => {
    setIndex(i);
    setSelectedCard(cards[i]);
  };

  function prev() {
    const newIndex = Math.max(0, index - 1);
    setIndex(newIndex);
    setSelectedCard(cards[newIndex]);
  }

  function next() {
    const newIndex = Math.min(cards.length - 1, index + 1);
    setIndex(newIndex);
    setSelectedCard(cards[newIndex]);
  }

  return (
    <section className="relative w-full min-h-[520px] lg:min-h-[720px] overflow-hidden flex items-start justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm scale-105 transition-all duration-700"
        style={{ backgroundImage: `url('${selectedCard.img}')` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-50/20 to-rose-100/40 transition-all duration-700" />
      <div className="absolute inset-0 bg-black/25 transition-all duration-700" />

      {/* Texto principal */}
      <div className="relative z-10 w-full container mx-auto lg:px-12 p-12 rounded-3xl mt-5 -ml-1.5">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 text-sm text-white/80 mb-4">
            <span className="w-8 h-[2px] bg-white/60 inline-block" />
            <span >{selectedCard.subtitle}</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] text-purple-600/70"
            style={{ textShadow: "0 8px 30px rgba(0,0,0,0.45)" }}
          >
            {selectedCard.title.toUpperCase()}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-6 text-white/80 max-w-prose text-lg"
          >
            {selectedCard.mainDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex items-center gap-4"
          >
          </motion.div>
        </div>
      </div>

      {/* Extras específicos do card */}
      {selectedCard.extras}

      {/* Carrossel */}
      <div className="absolute right-0 bottom-0 lg:bottom-12 lg:right-12 w-full lg:w-[45%] z-20">
        <div className="relative">
          <div className="absolute right-0 top-0 flex items-center gap-3 z-20">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto ml-8 no-scrollbar py-3 px-4 scroll-smooth"
            style={{ scrollBehavior: "smooth" }}
          >
            {cards.map((card, i) => (
              <motion.article
                key={card.id}
                layout
                whileHover={{ scale: 1.03, y: -6 }}
                onClick={() => selectCard(i)}
                className={`min-w-[220px] md:min-w-[260px] lg:min-w-[300px] cursor-pointer bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border ${
                  selectedCard.id === card.id ? "border-gray-500" : "border-white/10"
                } transition-all`}
                style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.35)" }}
              >
                <div className="relative w-full h-40 md:h-48 lg:h-40">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
                  <div className="absolute left-3 bottom-3 bg-purple-800 rounded-2xl text-white text-xs px-2 py-1">
                    {card.subtitle}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-lg">{card.title}</h3>
                  <p className="text-white/70 text-xs mt-2 line-clamp-3">{card.cardDescription}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-6 ml-8 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/90">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="text-white/70">of {String(cards.length).padStart(2, "0")}</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((index + 1) / cards.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-white text-4xl font-bold">{String(index + 1).padStart(2, "0")}</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          section {
            min-height: 640px;
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
//