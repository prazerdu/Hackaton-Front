"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CardHorizontalDemo from "@/components/cardHorizontal";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-between overflow-x-hidden pt-20 pb-32 sm:pt-28 lg:pt-36 bg-gradient-to-b">
      {/* Hero Content */}
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8">
        {/* Badge de destaque */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-muted flex items-center gap-2.5 rounded-full border px-4 py-2 shadow-md"
        >
          <Badge className="rounded-full bg-purple-700 text-white">Inovação</Badge>
          <span className="text-muted-foreground font-medium">
            Solução para negócios voltados ao cliente
          </span>
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-500 leading-tight drop-shadow-md"
        >
          Inove, Colabore e Transforme
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-2xl text-muted-foreground text-lg sm:text-xl leading-relaxed"
        >
          Uma plataforma para criar, lançar e participar de desafios de inovação, conectando mentes criativas para construir o futuro juntos. <br />
          Tudo em um ambiente flexível e colaborativo.
        </motion.p>

        {/* Botões lado a lado */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mt-6"
        >
          <Button
            size="lg"
            className="text-white  bg-gradient-to-br from-purple-900 to-purple-600 border transition-all duration-300 shadow-lg hover:scale-105"
            asChild
          >
            <a href="/home">Entrar</a>
          </Button>

          <Button
            size="lg"
            className="text-white  bg-gradient-to-br from-purple-900 to-purple-600 border shadow-md transition-all duration-300 hover:scale-105"
            asChild
          >
            <a href="/login">Login</a>
          </Button>
        </motion.div>
      </div>

      {/* Cards Horizontais */}
      <div className="mt-20 px-4 sm:px-6 lg:px-8">
        <CardHorizontalDemo />
      </div>
    </section>
  );
};

export default HeroSection;
