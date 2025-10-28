'use client'

import { motion } from "framer-motion"
import { LoginForm } from "@/components/login-form"
import Globe2 from "@/components/mvpblocks/globe2"
import { ModeToggle } from "@/components/theme-toggle"
import { GridPattern } from "@/components/ui/shadcn-io/grid-pattern"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  return (
    <div className="relative grid min-h-screen lg:grid-cols-2 overflow-hidden bg-background">
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          backgroundPosition: ["0px 0px", "50px 100px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "linear",
        }}
      >
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
            "absolute inset-0 opacity-40  ",
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
            "skew-y-12 scale-125"
          )}
        />
      </motion.div>

      {/* Botão modo escuro/claro */}
      <div className="fixed top-4 left-4 z-50">
        <ModeToggle />
      </div>

      {/* Coluna do formulário */}
      <div className="flex flex-col gap-4 px-6 py-9 md:p-10 relative z-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Coluna do globo */}
      <div className="relative hidden lg:block z-10">
        <Globe2 />
      </div>
    </div>
  )
}
