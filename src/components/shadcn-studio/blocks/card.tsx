"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface Feature {
  icon?: React.ReactNode;
  label: string;
}

interface TiltCardProps {
  imageSrc?: string;
  title?: string;
  description?: string;
  badges?: string[];
  features?: Feature[];
  primaryButton?: { text: string; link: string };
  secondaryButton?: { text: string; link: string };
}

const TiltShineCard = ({
  title = "Plataforma de Inovação Aberta ",
  description = "Uma plataforma completa para transformar seu negócio digitalmente, com soluções inovadoras e design de alto padrão.",
  badges = ["Destaque"],
  features = [
    { icon: <CheckCircle className="w-4 h-4" />, label: "Seguro" },
    { icon: <CheckCircle className="w-4 h-4" />, label: "Rápido" },
    { icon: <CheckCircle className="w-4 h-4" />, label: "Acessível" },
  ],
  primaryButton = { text: "Saiba Mais", link: "/corporate" },
  secondaryButton = { text: "Contato", link: "/contact" },
}: TiltCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);
  const scale = useTransform(x, [-50, 50], [1, 1.03]);

  return (
    <motion.div
      style={{ rotateX, rotateY, x, y, scale }}
      className="w-full max-w-xs sm:max-w-sm cursor-pointer"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const posX = e.clientX - rect.left - rect.width / 2;
        const posY = e.clientY - rect.top - rect.height / 2;
        x.set(posX / 20);
        y.set(posY / 20);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <Card className="relative overflow-hidden hidden md:block rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-white/10">
        {/* Overlay de cor e brilho */}
        <div className="absolute inset-0 z-10 bg-transparent rounded-3xl pointer-events-none"></div>
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl rotate-45 animate-shine"></div>
        </div>

        {/* Conteúdo */}
        <CardContent className="relative z-30 flex flex-col justify-between h-full p-6 sm:p-8 text-white backdrop-blur-sm">
          <CardHeader className="p-0">
            <div className="flex flex-wrap gap-2 mb-2">
              {badges.map((b) => (
                <Badge key={b} className="bg-purple-500/90 text-white">
                  {b}
                </Badge>
              ))}
            </div>
            <CardTitle className="text-foreground sm:text-3xl font-extrabold drop-shadow-md">{title}</CardTitle>
            <CardDescription className="mt-2 text-foreground text-sm sm:text-base drop-shadow-sm">
              {description}
            </CardDescription>
            {/* Features */}
            <div className="flex flex-wrap gap-2 mt-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-1 text-sm text-foreground">
                  {f.icon} <span>{f.label}</span>
                </div>
              ))}
            </div>
          </CardHeader>

          {/* Botões */}
          <div className="mt-4 flex gap-3 flex-wrap">
            {primaryButton && (
              <Button
                asChild
                variant={"default"}
                size="lg"
                className="text-white font-semibold border-transparent shadow-md hover:shadow-lg flex-1 transition-all duration-300 transform hover:-translate-y-1 hover:scale-1.02"
              >
                <a href={primaryButton.link}>{primaryButton.text}</a>
              </Button>
            )}
            {secondaryButton && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-foreground flex-1 transition-all duration-300"
              >
                <a href={secondaryButton.link}>{secondaryButton.text}</a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-150%) rotate(45deg);
            opacity: 0;
          }
          50% {
            opacity: 0.25;
          }
          100% {
            transform: translateX(150%) rotate(45deg);
            opacity: 0;
          }
        }
        .animate-shine {
          animation: shine 2s infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default TiltShineCard;
