"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

interface ModalProps {
  card: {
    id: number;
    title: string;
    subtitle: string;
    image: string;
  };
}

export default function Modal({ card }: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button asChild variant="link" className="p-1 text-blue-800 cursor-pointer">
          <span>Detalhes</span>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          flex flex-col p-0 gap-0
          w-[95vw] h-[90vh]
          sm:max-w-lg sm:max-h-[80vh]
          rounded-2xl sm:rounded-lg
        "
      >
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            {card.title}
          </DialogTitle>

          <div className="overflow-y-auto flex-1">
            <DialogDescription asChild>
              <div className="px-6 py-4 space-y-4">
                {/* Imagem do card */}
                <div className="w-full h-48 relative rounded-md overflow-hidden">
                  <Image src={card.image} alt={card.title} fill className="object-cover" />
                </div>

                {/* Subtítulo */}
                <p className="text-gray-600">{card.subtitle}</p>

                {/* Aqui você pode adicionar mais campos se quiser */}
              </div>
            </DialogDescription>

            <DialogFooter className="px-6 pb-6 flex gap-2">
              <DialogClose asChild>
                <Button className="bg-blue-600 hover:bg-blue-800">Cancelar</Button>
              </DialogClose>

              <DialogClose asChild>
                <Button className="bg-blue-600 hover:bg-blue-800 hover:text-white">
                  Solicitar
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
