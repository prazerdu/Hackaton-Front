"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
interface Feature {
  icon?: React.ReactNode
  label: string
}
interface SimpleTiltCardProps {
  title?: string
  description?: string
  badges?: string[]
  features?: Feature[]
}

export default function SimpleTiltCard({
  title = "Plataforma de Inovação Aberta",
  description = "Uma plataforma completa para transformar seu negócio digitalmente, com soluções inovadoras e design de alto padrão.",
  badges = ["Destaque"],
  features = [
    { icon: <CheckCircle className="w-4 h-4 text-primary" />, label: "Seguro" },
    { icon: <CheckCircle className="w-4 h-4 text-primary" />, label: "Rápido" },
    { icon: <CheckCircle className="w-4 h-4 text-primary" />, label: "Acessível" },
  ],
}: SimpleTiltCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-50, 50], [10, -10])
  const rotateY = useTransform(x, [-50, 50], [-10, 10])
  const scale = useTransform(x, [-50, 50], [1, 1.07])

  return (
    <motion.div
      style={{ rotateX, rotateY, x, y, scale }}
      className="group w-full max-w-sm cursor-pointer transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const posX = e.clientX - rect.left - rect.width / 2
        const posY = e.clientY - rect.top - rect.height / 2
        x.set(posX / 15)
        y.set(posY / 15)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      <Card className="relative ml-10 overflow-hidden hidden md:block rounded-3xl border border-border/20 shadow-2xl bg-gradient-to-br from-background/80 to-background/50 backdrop-blur-xl transition-all duration-700 hover:shadow-[0_8px_40px_rgba(0,0,0,0.25)] hover:border-primary/40">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none" />
        {/* Brilho animado suave */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-xl rotate-45 animate-shine"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/[.05] to-transparent dark:from-white/[.05] dark:to-transparent pointer-events-none rounded-3xl" />
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-3">
            {badges.map((b) => (
              <Badge
                key={b}
                className="bg-primary/80 text-white shadow-sm border border-white/20"
              >
                {b}
              </Badge>
            ))}
          </div>

          <CardTitle className="text-foreground text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
            {title}
          </CardTitle>

          <CardDescription className="text-muted-foreground mt-2 text-sm sm:text-base leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-3">
          <div className="flex flex-wrap gap-3">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-foreground/90 hover:text-primary transition-colors duration-300"
              >
                {f.icon}
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-4 border-t border-border/10">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ninna Hub
          </p>
        </CardFooter>
      </Card>
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-150%) rotate(45deg);
            opacity: 0;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            transform: translateX(150%) rotate(45deg);
            opacity: 0;
          }
        }
        .animate-shine {
          animation: shine 4s infinite linear;
        }
      `}</style>
    </motion.div>
  )
}
