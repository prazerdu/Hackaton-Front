"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import DialogScrollableDemo from "./modal"

type CardData = {
  image: string
  title: string
  description: string
  buttonText: string
  howItWorks: string
}

const cards: CardData[] = [
  {
    image: "/homepage.png",
    title: "Transforme ideias em impacto",
    description:
      "Crie, compartilhe e participe de desafios de inovação e construa o futuro junto com quem quer fazer a diferença. Participe de desafios de inovação que conectam pessoas com ideias a quem pode transformá-las em soluções reais. Explore diferentes setores e projetos, compartilhe suas ideias, colabore com outros inovadores e veja seu impacto ganhar forma. Cada desafio é uma oportunidade de aprendizado e crescimento, incentivando a criatividade e a solução de problemas complexos.",
    buttonText: "Saiba mais",
    howItWorks: `
Crie ou participe de desafios públicos ou privados.

Colabore com outros participantes em tempo real.

Receba feedback e veja suas ideias evoluírem em soluções concretas.`,
  },
  {
    image: "/innovation.png",
    title: "Inove do seu jeito",
    description:
      "Lance desafios públicos para engajar a comunidade ou privados para sua equipe — tudo em um único ambiente flexível. Customize seus desafios e inovações da forma que desejar. Se você quer testar novas ideias com sua equipe ou engajar a comunidade, este ambiente flexível permite que você defina regras, metas e formatos que se adaptam às suas necessidades. Experimente diferentes abordagens, incentive a criatividade e acompanhe o progresso das soluções que surgirem.",
    buttonText: "Saiba mais",
    howItWorks: `
Crie desafios adaptados ao seu estilo ou da sua equipe.

Experimente métodos colaborativos e iterativos.

Analise resultados e métricas para ajustar e melhorar cada iniciativa.
`,
  },
  {
    image: "/community.png",
    title: "Conecte mentes criativas",
    description:
      "Junte-se a uma rede de inovadores e colabore em soluções que impulsionam negócios e transformam realidades.",
    buttonText: "Saiba mais",
    howItWorks: `
Explore uma rede diversificada de participantes.

Participe de grupos de colaboração e brainstorms virtuais.

Transforme ideias em protótipos ou projetos reais com suporte da comunidade.
`,
  },
]

export default function CardHorizontalList() {
  const [open, setOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null)

  const handleOpenModal = (card: CardData) => {
    setSelectedCard(card)
    setOpen(true)
  }

  return (
    <section className="w-full flex flex-col items-center justify-center py-10">
      <div className="flex flex-wrap justify-center gap-8">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="group relative w-[400px sm:w-[420px] h-[270px] flex flex-col sm:flex-row rounded-2xl border border-border/40 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-background"
          >
            {/* Imagem */}
            <div className="sm:w-1/2 h-[160px] sm:h-auto overflow-hidden rounded-t-2xl sm:rounded-tl-2xl sm:rounded-bl-2xl">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Conteúdo */}
            <div className="flex-1 flex flex-col justify-between p-5 sm:p-6 bg-background/90 backdrop-blur-sm rounded-b-2xl sm:rounded-bl-none sm:rounded-br-2xl z-10">
              <CardHeader className="p-0">
                <CardTitle className="text-purple-800 dark:text-white font-semibold leading-snug">
                  {card.title}
                </CardTitle>
                <CardDescription className="text-sm text-purple-950 dark:text-gray-200 mt-2 line-clamp-4">
                  {card.description}
                </CardDescription>
              </CardHeader>

              <CardFooter className="p-0 mt-4">
                <Button
                  onClick={() => handleOpenModal(card)}
                  className="w-full cursor-pointer bg-gradient-to-r from-purple-800 to-purple-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03]"
                >
                  {card.buttonText}
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal Dinâmico */}
      {selectedCard && (
        <DialogScrollableDemo
          open={open}
          onOpenChange={setOpen}
          title={selectedCard.title}
          description={selectedCard.description}
          image={selectedCard.image}
          howItWorks={selectedCard.howItWorks}
        />
      )}
    </section>
  )
}
