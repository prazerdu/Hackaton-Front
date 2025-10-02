"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import LoginModal from "./LoginModal";
import { Button } from "@/components/ui/button";

export default function Usuario() {
  return (
    <Dialog>
      {/* Avatar vira trigger */}
      <DialogTrigger asChild>
        <Button className="flex items-center gap-3 sm:gap-4 focus:outline-none cursor-pointer">
          <div className="hidden sm:flex flex-col text-right">
            Login
            <LoginModal/>
          </div>
        </Button>
      </DialogTrigger>
    </Dialog>
  );
}
