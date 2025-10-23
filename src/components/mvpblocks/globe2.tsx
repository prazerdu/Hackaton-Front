"use client"

import { motion } from "framer-motion"
import Earth from "@/components/ui/globe"
import AnimatedText from "./animated-text"

export default function Globe1() {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden min-h-screen">
      <article className="relative mx-auto mt-8 mb-8 h-[350px] min-h-60 max-w-[450px] overflow-hidden
       rounded-3xl border bg-gradient-to-b from-[#9D4EDD]/30 to-[#9D4EDD]/10 p-6 text-3xl tracking-tight
        text-white md:h-[450px] md:min-h-80 md:p-8 md:text-4xl md:leading-[1.05] lg:text-5xl shadow-lg">
        <AnimatedText />

        <motion.div
          className="absolute -right-20 -bottom-20 z-10 mx-auto flex h-full w-full max-w-[300px] items-center
           justify-center transition-all duration-700 hover:scale-105 md:-right-28 md:-bottom-28 md:max-w-[550px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        >
          <Earth
            scale={1.1}
            baseColor={[0.62, 0.2, 0.8]}
            markerColor={[0.62, 0.2, 0.8]}
            glowColor={[0.62, 0.2, 0.8]}
          />
        </motion.div>
      </article>
    </div>
  )
}
