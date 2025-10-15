"use client"

import { ChevronLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"

interface DialogScrollableDemoProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string   
  image: string
}

export default function DialogScrollableDemo({
  open,
  onOpenChange,
  title,
  description,
  image,
  howItWorks,
}: DialogScrollableDemoProps & { howItWorks: string }) {
  // Quebra o texto em linhas
  const howItWorksLines = howItWorks.split('\n').filter(line => line.trim() !== '')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[min(600px,80vh)] flex-col gap-0 p-0 sm:max-w-md">
        <ScrollArea className="flex max-h-full flex-col overflow-hidden">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="px-6 pt-6">{title}</DialogTitle>
            <DialogDescription asChild>
              <div className="p-6 space-y-4">
                <Image
                  src={image}
                  alt={title}
                  width={500}
                  height={250}
                  className="rounded-lg w-full h-[200px] object-cover mb-4"
                />
                <p className="text-muted-foreground">{description}</p>

                <div className="space-y-2 mt-4">
                  <p className="font-semibold">Como funciona:</p>
                  {howItWorksLines.map((line, index) => (
                    <p key={index} className="text-muted-foreground ml-2">
                      • {line}
                    </p>
                  ))}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="px-6 pb-6 sm:justify-end">
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="outline">
                <ChevronLeftIcon className="mr-1" />
                Voltar
              </Button>
            </DialogClose>
            <Button className="cursor-pointer" type="button">Saiba mais</Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
