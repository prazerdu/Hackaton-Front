'use client'

import { easeInOut, motion, spring } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import HeroEarth from './hero-globe'
import HeroAnimatedText from './hero-animated-text'
import Link from 'next/link'
import { GridPattern } from '../ui/shadcn-io/grid-pattern'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function AppHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: spring, stiffness: 100 },
    },
  }

  const glowAnimation = {
    opacity: [0.5, 0.8, 0.5],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easeInOut,
    },
  }

  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-10">
      {/* Fundo */}
      <div className="absolute inset-0 z-0">
        <GridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
          ]}
          className={cn(
            'absolute inset-0 opacity-40',
            '[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]',
            'skew-y-12 scale-125'
          )}
        />
        <motion.div
          animate={glowAnimation}
          className="absolute top-1/3 left-1/4 h-32 w-32 rounded-full bg-purple-400/10 blur-[60px] md:h-40 md:w-40"
        />
        <motion.div
          animate={glowAnimation}
          className="absolute right-1/4 bottom-1/3 h-32 w-32 rounded-full bg-purple-500/10 blur-[70px] md:h-40 md:w-40"
        />
      </div>

      {/* Globo responsivo */}
      <div className="fadein-blur absolute top-20 z-0 h-[220px] w-[220px] translate-x-1/2 sm:right-1/2 md:right-1/3 md:h-[350px] md:w-[350px] lg:h-[500px] lg:w-[500px]">
        <HeroEarth
          scale={1.1}
          baseColor={[0.62, 0.2, 0.8]}
          markerColor={[0.62, 0.2, 0.8]}
          glowColor={[0.62, 0.2, 0.8]}
        />
      </div>

      {/* Conteúdo */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex w-full max-w-[1200px] flex-col items-center justify-center text-center md:px-6 lg:flex-row lg:justify-between lg:text-left"
      >
        <div className="flex w-full flex-col items-center lg:items-start">
          <motion.div
            variants={itemVariants}
            className="mb-4 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs sm:text-sm"
          >
            <span className="mr-2 rounded-full bg-purple-500 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-white">
              MVP
            </span>
            Plataforma de Inovação Corporativa
          </motion.div>

          <HeroAnimatedText />

          {/* Logo parceiro */}
          <motion.div
            variants={itemVariants}
            className="my-6 flex flex-wrap justify-center gap-6 sm:gap-8 lg:justify-start"
          >
            <motion.div className="relative h-16 w-48 sm:h-20 sm:w-60 md:h-24 md:w-80 invert grayscale-0 dark:grayscale-100 dark:invert-0 transition">
              <Image
                src="/logos/ninna-valley.png"
                alt="Parceiro Ninna Hub"
                fill
                sizes="(max-width: 768px) 180px, (max-width: 1024px) 240px, 320px"
                className="object-contain"
              />
            </motion.div>
          </motion.div>

          {/* Botões */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start"
          >
            <Link href="/home">
              <Button
                variant="outline"
                size="lg"
                className="w-full hover:cursor-pointer sm:w-auto rounded-full bg-primary text-white border-purple-500/30 hover:bg-purple-500/10 hover:text-white transition-all"
              >
                Ver desafios
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/auth/login">
              <Button
                variant="outline"
                size="lg"
                className="w-full hover:cursor-pointer sm:w-auto rounded-full border-purple-500/30 bg-transparent hover:bg-purple-500/10 transition-all"
              >
                Login
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.main>
    </section>
  )
}
