import { IconCirclePlus, IconFolderCode } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { useRouter } from "next/navigation"

export function EmptyChallenges() {
  const router = useRouter()
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>Nenhum desafio criado</EmptyTitle>
        <EmptyDescription>
          Você não criou nenhum desafio ainda.
          <br />
           Comece criando o seu primeiro desafio
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button
            onClick={() => router.push("/admin/challenges/create")}
            className="flex items-center gap-2"
          >
            <IconCirclePlus className="h-4 w-4" /> Criar Desafio
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  )
}
