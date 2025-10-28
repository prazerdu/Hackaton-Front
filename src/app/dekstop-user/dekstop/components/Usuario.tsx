"use client";

import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import LoginModal from "./LoginModal";
import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";

export default function Usuario() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex bg-foreground items-center gap-3 sm:gap-4 cursor-pointer px-4 py-2 rounded-lg shadow-2xl transition-all"
        >
          <div className="flex-col text-right">Login</div>
          <span className="sm:hidde n">
            <UserIcon size={20} />
          </span>
        </Button>
      </DialogTrigger>
      <LoginModal open onCloseAction={() => setOpen(false)} />
    </Dialog>
  );
}
