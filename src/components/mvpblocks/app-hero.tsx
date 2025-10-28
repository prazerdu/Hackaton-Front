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
    <section className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden sm:px-6">
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
          className="absolute top-1/3 left-1/4 h-40 w-40 rounded-full"
        />
        <motion.div
          animate={glowAnimation}
          className="absolute right-1/4 bottom-1/3 h-40 w-40 rounded-full bg-purple-500/10 blur-[80px]"
        />
      </div>

      {/* Globo */}
      <div className="fadein-blur absolute lg:right-1/3 sm:right-1/2 top-10 z-0 h-[350px] w-[350px] translate-x-1/2 lg:h-[500px] lg:w-[500px]">
        <HeroEarth
          scale={1.1}
          baseColor={[0.62, 0.2, 0.8]}
          markerColor={[0.62, 0.2, 0.8]}
          glowColor={[0.62, 0.2, 0.8]}
        />
      </div>

      {/* Conteúdo principal centralizado verticalmente */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex w-full max-w-[1250px] flex-col items-center justify-center text-center sm:px-8 lg:flex-row lg:justify-between lg:text-left"
      >
        {/* Texto e estatísticas */}
        <div className="w-full flex flex-col items-center lg:items-start">
          <motion.div
            variants={itemVariants}
            className="mb-4 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm"
          >
            <span className="mr-2 rounded-full bg-purple-500 px-2 py-0.5 text-xs font-semibold text-white">
              MVP
            </span>
            Plataforma de Inovação Corporativa
          </motion.div>

          <HeroAnimatedText />

          {/* <motion.div
            variants={itemVariants}
            className="mt-4 mb-6 flex flex-wrap justify-center gap-4 md:gap-6 lg:justify-start"
          >
            <div className="rounded-lg border border-purple-500/20 px-4 py-2 backdrop-blur-sm">
              <p className="text-2xl font-bold">
                Next JS
              </p>
              <p className="text-xs">Active Users</p>
            </div>
            <div className="rounded-lg border border-blue-500/20 px-4 py-2 backdrop-blur-sm">
              <p className="text-2xl font-bold">

              </p>
              <p className="text-xs">Transactions</p>
            </div>
            <div className="rounded-lg border border-indigo-500/20 px-4 py-2 backdrop-blur-sm">
              <p className="text-2xl font-bold"></p>
              <p className="text-xs">Networks</p>
            </div>
          </motion.div> */}

          {/* Logos de parceiros */}
          <motion.div
            variants={itemVariants}
            className="mb-6 flex flex-wrap justify-center gap-8 lg:justify-start"
          >
              <motion.div
                className="invert grayscale-0 dark:grayscale-100 dark:invert-0 relative h-24 w-80 transition"
              >
                <Image
                  src={"/logos/ninna-valley.png"}
                  alt={"Parceiro Ninna Hub"}
                  fill
                />
              </motion.div>
          </motion.div>

          {/* Botões alinhados à direita */}
        <motion.div
          variants={itemVariants}
          className="items-center gap-4 lg:items-end"
        >
          <div className="flex gap-4 flex-row">
            <Link href={"/home"}>
              <Button
                variant="outline"
                className="bg-primary rounded-full text-white border-purple-500/30 hover:bg-purple-500/10 hover:text-white"
                size="lg"
                >
                Ver desafios
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link href="auth/login">
              <Button
                variant="outline"
                className="rounded-full border-purple-500/30 bg-transparent hover:bg-purple-500/10"
                size="lg"
              >
                Login
              </Button>
            </Link>
          </div>
        </motion.div>
        </div>
      </motion.main>
    </section>
  )
}
