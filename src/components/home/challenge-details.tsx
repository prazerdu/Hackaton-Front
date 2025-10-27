"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { IconCalendar } from "@tabler/icons-react"
import { RequestMatchButton } from "./request-match"

type Challenge = {
  id: string
  title: string
  description: string
  objectives: string
  area: string
  status: string
  endDate: string
  isPublic: boolean
  createdBy: { name: string }
}

interface ChallengeDetailsModalProps {
  challenge: Challenge
  open: boolean
  onOpenChange: (open: boolean) => void
  startupId: string
}

export const ChallengeDetailsModal = ({
  challenge,
  open,
  onOpenChange,
}: ChallengeDetailsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl space-y-4">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {challenge.title}
          </DialogTitle>
          <DialogDescription>
            Criado por <strong>{challenge.createdBy?.name}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">
              <strong>Área:</strong> {challenge.area}
            </p>
            <Badge className="mt-1">{challenge.status}</Badge>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">Descrição</h3>
            <p className="text-sm text-muted-foreground">
              {challenge.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">Objetivos</h3>
            <p className="text-sm text-muted-foreground">
              {challenge.objectives}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
            <IconCalendar className="w-4 h-4" />
            <span>
              Encerramento: {new Date(challenge.endDate).toLocaleDateString()}
            </span>
          </div>

          <div className="pt-4 border-t">
            <RequestMatchButton challengeId={challenge.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
