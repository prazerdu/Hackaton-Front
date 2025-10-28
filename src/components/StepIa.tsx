"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Sparkles, Bot, Stars } from "lucide-react";

const faqQuestions = [
  "Como posso participar de um desafio?",
  "Onde posso fazer login?",
  "Quais são os benefícios de participar?",
];

export default function StepIa() {
  const [particlePositions, setParticlePositions] = useState<{ x: number; y: number }[]>([]);

  // Gera posições aleatórias apenas no client
  useEffect(() => {
    const positions = [...Array(30)].map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setParticlePositions(positions);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fundo animado futurista */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Partículas sutis flutuantes */}
      <div className="absolute inset-0 pointer-events-none">
        {particlePositions.map((pos, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            initial={{ x: pos.x, y: pos.y, opacity: 0, scale: 0 }}
            animate={{ y: [pos.y, -20], opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Camada de blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Conteúdo principal */}
      <div className="relative w-full max-w-7xl flex flex-col lg:flex-row items-center gap-16 px-6 z-10">
        {/* Lado esquerdo (IA) */}
        <div className="flex-1 flex flex-col items-start text-white">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
          >
            Conheça nossa{" "}
            <span className="bg-clip-text text-purple-500">IA personalizada</span>{" "}
            — sua assistente inteligente dentro da Plataforma de Inovação
          </motion.h1>

          {/* Container da IA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative w-full max-w-md h-72 md:h-80 flex items-center justify-center rounded-3xl overflow-hidden border border-white/30 bg-white/10 backdrop-blur-xl shadow-[0_0_50px_-10px_rgba(255,255,255,0.5)]"
          >
            <Image
              src="/Captura de tela 2025-10-27 161619.png"
              alt="IA Ninna Hub"
              fill
              className="object-contain p-4"
            />

            {/* Bolha de conversa da IA */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1, duration: 0.7, ease: "easeOut" }}
              className="absolute bottom-5 left-5 bg-gradient-to-r from-indigo-500/90 to-purple-500/90 text-white text-sm px-4 py-2 rounded-2xl shadow-lg backdrop-blur-md flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-white/90" />
              <span>Olá! Como posso te ajudar hoje?</span>
            </motion.div>

            <Sparkles className="absolute text-yellow-400 top-3 right-3 animate-pulse w-6 h-6" />
          </motion.div>
        </div>

        {/* Lado direito (FAQ) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex-1 flex justify-center"
        >
          <Card className="w-full max-w-sm bg-white/90 dark:bg-slate-900/90 border border-white/20 shadow-[0_0_30px_-5px_rgba(147,51,234,0.4)] backdrop-blur-md transition-all duration-500 hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-center font-semibold text-indigo-700 dark:text-indigo-400 flex items-center justify-center gap-2">
                <Stars className="w-4 h-4 text-indigo-500" />
                Perguntas Frequentes
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 mt-2">
              {faqQuestions.map((q, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    scale: 1.03,
                    backgroundColor: "rgba(99,102,241,0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-white/20 dark:border-slate-700 shadow-sm text-sm font-medium text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  <MessageCircle className="text-indigo-600 dark:text-indigo-400 w-5 h-5 shrink-0" />
                  {q}
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
} 
