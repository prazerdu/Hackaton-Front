"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Modal() {
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
          w-[95vw] h-[90vh]   /* quase tela cheia no celular */
          sm:max-w-lg sm:max-h-[80vh]  /* limites para telas maiores */
          rounded-2xl sm:rounded-lg    /* borda arredondada menor em mobile */
        "
      >
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Frequently Asked Questions (FAQ)
          </DialogTitle>
          <div className="overflow-y-auto flex-1">
            <DialogDescription asChild>
              <div className="px-6 py-4">
                <div className="[&_strong]:text-foreground space-y-4 [&_strong]:font-semibold">
                  <div className="space-y-1">
                    <p><strong>Account Management</strong></p>
                    <p>
                      Navigate to the registration page, provide required
                      information, and verify your email address. You can sign
                      up using your email or through social media platforms.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p><strong>Password Reset Process</strong></p>
                    <p>
                      Users can reset their password through the account
                      settings page. Click &quot;Forgot Password&quot; and
                      follow the email verification steps.
                    </p>
                  </div>
                  {/* ... resto do conteúdo ... */}
                </div>
              </div>
            </DialogDescription>

            <DialogFooter className="px-6 pb-6">
              <DialogClose asChild>
                <Button className="bg-blue-600 hover:bg-blue-800" type="button">Cancelar</Button>
              </DialogClose>

              <DialogClose asChild>
                <Button className="bg-blue-600 hover:bg-blue-800 hover:text-white" type="button">Solicitar</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
