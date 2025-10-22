"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import TiltShineCard from "./../card";

const HeroSection = () => {
  return (
    <section className="relative  flex flex-col items-center justify-center min-h-[90dvh] pt-6 md:pt-16 lg:pt-10 overflow-hidden">
      {/* Fundo animado */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center">
        <div className="absolute w-96 h-96 bg-purple-950/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute w-[28rem] h-[28rem] bg-purple-500/20 rounded-full blur-2xl animate-blob animation-delay-2000 translate-x-32 translate-y-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-0 flex flex-col lg:flex-row items-center gap-16">
        {/* Texto principal */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 backdrop-blur-md"
          >
            <Badge className="bg-purple-600 text-white rounded-full" id="home">
              Novo
            </Badge>
            <span className="text-foreground font-medium text-sm">
              Versão 2025
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight drop-shadow-lg"
          >
            Transforme sua empresa <br className="hidden sm:block" /> com
            soluções digitais
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-foreground max-w-xl text-lg sm:text-xl leading-relaxed mx-auto lg:mx-0"
          >
            Potencializamos ideias externas e internas para acelerar o crescimento da sua empresa. Conectamos talentos, startups e soluções para criar valor em conjunto.
          </motion.p>

          {/* Botões */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap justify-center lg:justify-start gap-6 mt-6"
          >
            {/* Botão Visualizar Desafios */}
            <a href="/home" className="w-max">
              <Button className="relative inline-flex items-center justify-center px-6 py-3 rounded-xl cursor-pointer text-white font-semibold shadow-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
                <span className="relative z-10 flex items-center gap-2">
                  Visualizar Desafios
                  <ArrowRightIcon className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-white/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-xl"></span>
              </Button>
            </a>

            {/* Botão Login */}
            <a href="/login" className="w-max">
              <Button className="relative inline-flex items-center justify-center px-6 py-3 rounded-xl cursor-pointer text-white font-semibold shadow-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
                <span className="relative z-10 flex items-center gap-2">
                  Login
                  <ArrowRightIcon className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-white/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-xl"></span>
              </Button>
            </a>
          </motion.div>
        </div>
        <TiltShineCard />
      </div>
    </section>
  );
};

export default HeroSection;
