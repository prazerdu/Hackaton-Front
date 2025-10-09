"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserPlus, ClipboardList, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const FlipCard: React.FC<CardProps> = ({ title, description, image, icon }) => {
  const [flipped, setFlipped] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = () => {
    if (flipped) {
      setModalOpen(true);
    } else {
      setFlipped(true);
    }
  };

  return (
    <>
      <motion.div
        className="w-64 h-80 perspective cursor-pointer"
        onClick={handleCardClick}
      >
        <motion.div
          className="relative w-full h-full rounded-2xl shadow-lg"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <div
            className="absolute w-full h-full rounded-2xl overflow-hidden bg-blue-600 flex items-center justify-center text-white p-4"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex flex-col items-center gap-2 text-center">
              {icon}
              <h2 className="text-lg font-semibold">{title}</h2>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute w-full h-full rounded-2xl overflow-hidden bg-black/80 text-white p-5 flex flex-col justify-center items-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <p className="mb-4 text-center">{description}</p>
            <Button onClick={() => setModalOpen(true)}>Ver Mais</Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <img src={image} alt={title} className="w-full rounded-lg mb-4" />
          <p>{description}</p>
          <Button className="mt-4" onClick={() => setModalOpen(false)}>
            Fechar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

const HeroSection = () => {
  const cardsData: CardProps[] = [
    {
      title: "Cadastre-se e Configure",
      description: "Descrição detalhada do cadastro.",
      image: "https://i.pinimg.com/736x/6d/44/03/6d440395bb475a90bd32aaeea9f61e3a.jpg",
      icon: <UserPlus className="w-6 h-6" />,
    },
    {
      title: "Crie Projetos e Tarefas",
      description: "Descrição detalhada dos projetos.",
      image: "https://i.pinimg.com/736x/5c/6b/2f/5c6b2f50a8f3b9f7c178e0d56d97a345.jpg",
      icon: <ClipboardList className="w-6 h-6" />,
    },
    {
      title: "Colaborare e se Comunique",
      description: "Descrição detalhada da colaboração.",
      image: "https://i.pinimg.com/736x/23/45/56/2345567890abcdef1234567890abcdef.jpg",
      icon: <MessageCircle className="w-6 h-6" />,
    },
  ];

  return (
    <section className="flex min-h-[calc(100dvh-4rem)] flex-1 flex-col justify-between gap-12 overflow-x-hidden pt-8 sm:gap-16 sm:pt-16 lg:gap-24 lg:pt-24">
      {/* Hero Content */}
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8">
        <div className="bg-muted flex items-center gap-2.5 rounded-full border px-3 py-2">
          <Badge className="rounded-full">AI-Powered</Badge>
          <span className="text-muted-foreground">
            Solution for client-facing businesses
          </span>
        </div>

        <h1 className="text-3xl leading-[1.29167] font-bold text-balance sm:text-4xl lg:text-5xl">
          Sizzling Summer Delights
          <br />
          <span className="relative">
            Effortless
            <svg
              width="223"
              height="12"
              viewBox="0 0 223 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-x-0 bottom-0 w-full translate-y-1/2 max-sm:hidden"
            >
              <path
                d="M1.11716 10.428C39.7835 4.97282 75.9074 2.70494 114.894 1.98894C143.706 1.45983 175.684 0.313587 204.212 3.31596C209.925 3.60546 215.144 4.59884 221.535 5.74551"
                stroke="url(#paint0_linear_10365_68643)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_10365_68643"
                  x1="18.8541"
                  y1="3.72033"
                  x2="42.6487"
                  y2="66.6308"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="var(--primary)" />
                  <stop offset="1" stopColor="var(--primary-foreground)" />
                </linearGradient>
              </defs>
            </svg>
          </span>{' '}
          Recipes for Parties!
        </h1>

        <p className="text-muted-foreground">
          Dive into a world of flavor this summer with our collection of Sizzling Summer Delights!
          <br />
          From refreshing appetizers to delightful desserts
        </p>

        {/* Botões lado a lado */}
        <div className="flex gap-4">
          <Button size="lg" asChild>
            <a href="/home">Entrar</a>
          </Button>

          <Button size="lg" className="rounded-lg" asChild>
            <a href="/login">Login</a>
          </Button>
        </div>
      </div>

      {/* Cards Backflip substituindo a imagem */}
      <div className="flex gap-6 flex-wrap justify-center mt-8">
        {cardsData.map((card, index) => (
          <FlipCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
