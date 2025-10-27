'use client'

import { useEffect, useState } from 'react'
import { easeInOut, motion, spring } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import HeroEarth from './hero-globe'
import HeroAnimatedText from './hero-animated-text'
import Link from 'next/link'
import { GridPattern } from '../ui/shadcn-io/grid-pattern'
import { cn } from '@/lib/utils'

export default function AppHero() {
  const [stats, setStats] = useState({
    users: 0,
    transactions: 0,
    networks: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => {
        const newUsers = prev.users >= 20000 ? 20000 : prev.users + 500
        const newTransactions =
          prev.transactions >= 1500000 ? 1500000 : prev.transactions + 37500
        const newNetworks = prev.networks >= 40 ? 40 : prev.networks + 1

        if (
          newUsers === 20000 &&
          newTransactions === 1500000 &&
          newNetworks === 40
        ) {
          clearInterval(interval)
        }

        return {
          users: newUsers,
          transactions: newTransactions,
          networks: newNetworks,
        }
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

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
    <section className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden sm:px-6 lg:px-8">
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
      <div className="fadein-blur absolute top-0 right-1/2 z-0 h-[350px] w-[350px] translate-x-1/2 lg:h-[500px] lg:w-[500px]">
        <HeroEarth
          scale={1}
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
        className="relative z-10 flex w-full max-w-[1250px] flex-col items-center justify-center gap-10 px-4 text-center sm:px-8 lg:flex-row lg:justify-between lg:text-left"
      >
        {/* Texto e estatísticas */}
        <div className="w-full lg:w-2/3 flex flex-col items-center lg:items-start">
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

          <motion.div
            variants={itemVariants}
            className="mt-4 mb-6 flex flex-wrap justify-center gap-4 md:gap-6 lg:justify-start"
          >
            <div className="rounded-lg border border-purple-500/20 px-4 py-2 backdrop-blur-sm">
              <p className="text-2xl font-bold">
                {stats.users.toLocaleString()}+
              </p>
              <p className="text-xs">Active Users</p>
            </div>
            <div className="rounded-lg border border-blue-500/20 px-4 py-2 backdrop-blur-sm">
              <p className="text-2xl font-bold">
                {stats.transactions.toLocaleString()}+
              </p>
              <p className="text-xs">Transactions</p>
            </div>
            <div className="rounded-lg border border-indigo-500/20 px-4 py-2 backdrop-blur-sm">
              <p className="text-2xl font-bold">{stats.networks}+</p>
              <p className="text-xs">Networks</p>
            </div>
          </motion.div>
        </div>

        {/* Botões alinhados à direita */}
        <motion.div
          variants={itemVariants}
          className="items-center gap-4 lg:items-end"
        >
          <div className="gap-4 sm:flex-row lg:flex-col">
            <Button
              variant="outline"
              className="bg-primary rounded-full text-white border-purple-500/30 hover:bg-purple-500/10 hover:text-white"
              size="lg"
            >
              Ver desafios
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            <Link href="/admin">
              <Button
                variant="outline"
                className="rounded-full border-purple-500/30 bg-transparent text-white hover:bg-purple-500/10 hover:text-white"
                size="lg"
              >
                Login
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.main>
    </section>
  )
}
