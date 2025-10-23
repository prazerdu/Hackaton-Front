"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { InfoIcon } from "lucide-react";

export default function Toolip() {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <InfoIcon className="h-5 w-5" />
          </Button>
        </TooltipTrigger>

        <TooltipContent className="px-3 py-1 text-sm">
          Abrir informações
        </TooltipContent>
      </Tooltip>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Informações Importantes</DialogTitle>
            <DialogDescription>
              Aqui você pode colocar detalhes, explicações, instruções ou qualquer texto extra.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setOpen(false)}>Fechar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
