"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IconCalendar } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { ChallengeDetailsModal } from "./challenge-details"

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
  startupId: string
}

const statusColors: Record<string, string> = {
  "Em Andamento": "bg-green-100 text-green-800",
  Encerrado: "bg-red-100 text-red-800",
  Pendente: "bg-yellow-100 text-yellow-800",
}

export const PublicChallengeCard = ({ challenge, startupId }: PublicChallengeCardProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Card className="max-w-md border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        <CardHeader className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-3">
            <Avatar className="ring-2 ring-primary/80">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${challenge.createdBy?.name}`}
                alt={challenge.createdBy?.name}
              />
              <AvatarFallback className="text-xs">
                {challenge.createdBy?.name?.[0] || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle className="text-sm font-medium">Corporação</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                {challenge.createdBy?.name || "Jonas Fortes"}
              </CardDescription>
            </div>
          </div>

          <Badge
            className={`text-xs py-1 rounded-md font-medium ${
              statusColors[challenge.status] || "bg-gray-100 text-gray-800"
            }`}
          >
            {challenge.status}
          </Badge>
        </CardHeader>

        <CardHeader className="pb-0">
          <CardTitle className="text-xl font-bold">{challenge.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground flex items-center gap-2">
            <Badge variant="secondary">{challenge.area}</Badge>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {challenge.description}
          </p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <IconCalendar className="w-4 h-4" />
            <span>
              Encerramento: {new Date(challenge.endDate).toLocaleDateString()}
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button variant="outline" onClick={() => setOpen(true)}>
            Ver detalhes
          </Button>
        </CardFooter>
      </Card>

      <div className="absolute pb-12 pr-4">
        <ChallengeDetailsModal
          challenge={challenge}
          open={open}
          onOpenChange={setOpen}
          startupId={startupId}
        />
      </div>
    </>
  )
}

export default PublicChallengeCard
