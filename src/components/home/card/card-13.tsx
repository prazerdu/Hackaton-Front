"use client"

import { StarIcon, CalendarIcon, BriefcaseIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardFooter, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"

type Challenge = {
  id: string
  title: string
  description: string
  objectives: string
  area: string
  status: string
  endDate: string
  isPublic: boolean
  createdBy: {
    name: string
  }
}

interface PublicChallengeCardProps {
  challenge: Challenge
}

const PublicChallengeCard = ({ challenge }: PublicChallengeCardProps) => {
  return (
    <Card className="max-w-md border rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{challenge.title}</CardTitle>
        <CardDescription>{challenge.area}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">{challenge.description}</p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BriefcaseIcon className="w-4 h-4" />
          <span>{challenge.objectives}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarIcon className="w-4 h-4" />
          <span>Encerramento: {new Date(challenge.endDate).toLocaleDateString()}</span>
        </div>
      </CardContent>

      <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch border-t pt-3">
        <div className="flex items-center gap-3">
          <Avatar className="ring-2 ring-primary/30">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${challenge.createdBy?.name}`}
              alt={challenge.createdBy?.name}
            />
            <AvatarFallback className="text-xs">
              {challenge.createdBy?.name?.[0] || "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <CardTitle className="flex items-center gap-1 text-sm">
              {challenge.createdBy?.name || "Usuário Desconhecido"}
            </CardTitle>
            <CardDescription>{challenge.status}</CardDescription>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <StarIcon
              key={i}
              className={`size-5 ${
                i < 5
                  ? "fill-amber-500 stroke-amber-500 dark:fill-amber-400 dark:stroke-amber-400"
                  : "stroke-amber-500 dark:stroke-amber-400"
              }`}
            />
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}

export default PublicChallengeCard
