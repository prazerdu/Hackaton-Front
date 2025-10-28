"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function StepExplore() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 p-8">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 flex flex-col items-start">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Explore com Confiança
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-white/80 max-w-2xl mb-12 text-lg leading-relaxed"
          >
            Interaja com a IA, encontre projetos e mergulhe no ecossistema de inovação. Tudo foi criado para você explorar sem limites.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex-1 flex justify-center"
        >
          <div className="relative w-full max-w-md h-80 flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl bg-white/20 backdrop-blur-lg border border-white/30">
            <Image
              src="/onboarding/explore.svg"
              alt="Explore Ninna Hub"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
