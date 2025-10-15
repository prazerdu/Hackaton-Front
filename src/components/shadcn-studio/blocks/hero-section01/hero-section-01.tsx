"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import TiltShineCard from "./../card";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90dvh] pt-8 md:pt-16 lg:pt-10 overflow-hidden">
      {/* Fundo decorativo centralizado */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center">
        <div className="absolute w-96 h-96 bg-purple-950/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute w-[28rem] h-[28rem] bg-purple-500/20 rounded-full blur-2xl animate-blob animation-delay-2000 translate-x-32 translate-y-20"></div>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-0 flex flex-col lg:flex-row items-center gap-16">
        {/* Texto */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 backdrop-blur-md"
          >
            <Badge className="bg-purple-600 text-white rounded-full">
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
            Desenvolvemos produtos digitais e experiências que conectam sua
            empresa com clientes de forma inovadora e eficiente.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap justify-center lg:justify-start rounded-2xl gap-6 mt-6"
          >
            <Button
              className="text-white p-2 shadow-2xl font-semibold sm:text-sm border border-transparent hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              asChild
            >
              <a href="/contact">
                Contate-nos <ArrowRightIcon className="w-5 h-5" />
              </a>
            </Button>

            <Button
              className="p-2 shadow-2xl text-white font-semibold sm:text-sm border border-transparenthover:bg-white/95 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              asChild
            >
              <a href="/services">
                Nossos Serviços <ArrowRightIcon className="w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Card */}
        <TiltShineCard />
      </div>
    </section>
  );
};

export default HeroSection;
