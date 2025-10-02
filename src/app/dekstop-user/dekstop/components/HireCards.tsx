'use client'

import { useState } from 'react'
import {
  BadgeCheckIcon,
  EllipsisIcon,
  UsersIcon,
  CalendarIcon,
  TargetIcon,
  SearchIcon,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type Challenge = {
  id: string
  corporation: {
    name: string
    logo: string
    verified?: boolean
  }
  area: string
  problem: string
  goal: string
  description: string
  reward: string
  deadline: string
  participants: number
  likes: number
  comments: number
  shares: number
}

const challenges: Challenge[] = [
  {
    id: '1',
    corporation: {
      name: 'EcoLogística',
      logo: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
      verified: true,
    },
    area: 'Logística e Sustentabilidade',
    problem:
      'Nossa operação logística tem alto custo de combustível e impacto ambiental elevado.',
    goal:
      'Encontrar soluções tecnológicas que reduzam a emissão de carbono no transporte de cargas.',
    description:
      'Buscamos startups capazes de propor alternativas para otimização de rotas, uso de energias limpas ou tecnologias inovadoras.',
    reward: '🏆 R$ 100.000 + contrato de 12 meses',
    deadline: '30/11/2025',
    participants: 42,
    likes: 230,
    comments: 45,
    shares: 18,
  },
  {
    id: '2',
    corporation: {
      name: 'AgroFuturo',
      logo: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    },
    area: 'Agricultura e Tecnologia',
    problem:
      'Pequenos agricultores têm dificuldade em monitorar suas plantações e prever pragas.',
    goal:
      'Criar soluções digitais acessíveis para monitoramento remoto e previsão de riscos agrícolas.',
    description:
      'Startups de IA, sensores IoT ou apps são bem-vindas para ajudar pequenos agricultores a aumentar produtividade.',
    reward: '💰 R$ 50.000 + parceria estratégica',
    deadline: '15/12/2025',
    participants: 28,
    likes: 190,
    comments: 30,
    shares: 10,
  },
  {
    id: '3',
    corporation: {
      name: 'HealthTech Brasil',
      logo: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png',
      verified: true,
    },
    area: 'Saúde Digital',
    problem:
      'Alta taxa de absenteísmo em consultas médicas devido à falta de lembretes eficientes.',
    goal:
      'Desenvolver soluções de engajamento digital para reduzir faltas em clínicas e hospitais.',
    description:
      'Estamos interessados em startups com expertise em notificações inteligentes, chatbots ou integrações com calendários.',
    reward: '🎁 R$ 30.000 + piloto em rede nacional',
    deadline: '05/01/2026',
    participants: 15,
    likes: 120,
    comments: 18,
    shares: 7,
  },
  {
    id: '4',
    corporation: {
      name: 'Ninna Hub',
      logo: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png',
      verified: true,
    },
    area: 'Inovação e Transformação Digital',
    problem:
      'Empresas e startups têm dificuldade em encontrar um ambiente digital unificado para inovação aberta.',
    goal:
      'Desenvolver uma plataforma de inovação que conecte corporações, startups e pesquisadores em um só ecossistema.',
    description:
      'O Ninna Hub busca uma solução digital que permita lançar desafios, acompanhar métricas de inovação, integrar startups e promover conexões estratégicas em um só espaço.',
    reward: '🌐 Parceria com grandes empresas + suporte em escala',
    deadline: '28/02/2026',
    participants: 35,
    likes: 210,
    comments: 25,
    shares: 12,
  },
]

// --- componente de dialog ---
const ChallengeDialog = ({ challenge }: { challenge: Challenge }) => {
  const [accepted, setAccepted] = useState(false)
  const [participants, setParticipants] = useState(challenge.participants)

  const handleAccept = () => {
    setAccepted(true)
    setParticipants((prev) => prev + 1)
    alert(`Solicitação enviada para: ${challenge.corporation.name}`)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition">
          <CardHeader className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="ring-ring ring-2">
                <AvatarImage
                  src={challenge.corporation.logo}
                  alt={challenge.corporation.name}
                />
                <AvatarFallback className="text-xs">
                  {challenge.corporation.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5">
                <CardTitle className="flex items-center gap-1 text-sm">
                  {challenge.corporation.name}
                  {challenge.corporation.verified && (
                    <BadgeCheckIcon className="size-4 fill-sky-600 stroke-white dark:fill-sky-400" />
                  )}
                </CardTitle>
                <CardDescription>Corporação</CardDescription>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {challenge.area}
                </Badge>
              </div>
            </div>
            <EllipsisIcon className="size-4 text-muted-foreground" />
          </CardHeader>

          <CardContent className="space-y-2 text-sm">
            <p className="font-semibold text-red-600">Problema</p>
            <p className="line-clamp-2">{challenge.problem}</p>
            <p className="font-semibold text-green-600 flex items-center gap-1 mt-2">
              <TargetIcon className="size-4" /> Objetivo
            </p>
            <p className="line-clamp-2">{challenge.goal}</p>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{challenge.corporation.name} - Desafio</DialogTitle>
          <DialogDescription>
            Informações completas do desafio corporativo
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold text-red-600">Problema</p>
            <p>{challenge.problem}</p>
          </div>
          <div>
            <p className="font-semibold text-green-600 flex items-center gap-1">
              <TargetIcon className="size-4" /> Objetivo
            </p>
            <p>{challenge.goal}</p>
          </div>
          <div>
            <p className="font-semibold text-blue-600">Área</p>
            <Badge variant="secondary">{challenge.area}</Badge>
          </div>
          <p>{challenge.description}</p>

          <div className="bg-muted p-3 rounded-md text-sm">
            <span className="font-medium">Recompensa:</span> {challenge.reward}
          </div>

          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <UsersIcon className="size-4" />
              {participants} startups inscritas
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="size-4" />
              Até {challenge.deadline}
            </div>
          </div>

          <div className="mt-4">
            <Button
              onClick={handleAccept}
              disabled={accepted}
              className={cn(
                'w-full',
                accepted && 'bg-green-500 cursor-default'
              )}
            >
              {accepted ? 'Solicitação enviada !' : 'Solicitar participação'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// --- componente da lista com search ---
const ChallengesList = () => {
  const [search, setSearch] = useState('')

  const filteredChallenges = challenges.filter(
    (c) =>
      c.corporation.name.toLowerCase().includes(search.toLowerCase()) ||
      c.problem.toLowerCase().includes(search.toLowerCase()) ||
      c.area.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4">
      <div className="relative mb-4">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
        <Input
          placeholder="Buscar desafios por corporação, problema ou área..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <ChallengeDialog key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  )
}

export default ChallengesList
