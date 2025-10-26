"use client";

import { useState, useId, useRef } from "react";
import CardTweetDemo from "../dekstop-user/dekstop/components/HireCards";
import CircularDropButton from "@/components/dropCircle";
import { Share2, UserCheck2, CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import LoginModal from "../dekstop-user/dekstop/components/LoginModal";

export default function HomePage() {
  const [showShare, setShowShare] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const id = useId();
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="min-h-screen text-black flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="flex-shrink-0">
            <CardTweetDemo />
          </div>

          <CircularDropButton
            items={[
              {
                id: "share",
                icon: <Share2 className="w-4 h-4" />,
                onClick: () => setShowShare(true),
              },
              {
                id: "login",
                icon: <UserCheck2 className="w-4 h-4" />,
                onClick: () => setOpenLogin(true),
              },
            ]}
            radius={70}
            size={50}
          />
          {showShare && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
              <div className="bg-white dark:bg-slate-900 rounded-xl p-3 sm:p-6 w-full max-w-[240px] sm:max-w-[300px] shadow-lg flex flex-col gap-2">
                <div className="text-center text-xs sm:text-sm font-medium text-black dark:text-white">
                  Copiar Link
                </div>
                <div className="relative text-white w-full">
                  <Input
                    ref={inputRef}
                    id={id}
                    type="text"
                    defaultValue="https://plataforma-inovacao-squad05-fronten.vercel.app/"
                    aria-label="Share link"
                    readOnly
                    className="pr-8 text-xs sm:text-sm"
                  />
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={handleCopy}
                          className="absolute inset-y-0 end-0 flex h-full w-7 sm:w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-colors outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed"
                          aria-label={copied ? "Copied" : "Copy to clipboard"}
                          disabled={copied}
                        >
                          <div
                            className={cn(
                              "transition-all",
                              copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                            )}
                          >
                            <CheckIcon
                              className="stroke-emerald-500"
                              size={12}
                              aria-hidden="true"
                            />
                          </div>
                          <div
                            className={cn(
                              "absolute transition-all",
                              copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                            )}
                          >
                            <CopyIcon size={12} aria-hidden="true" />
                          </div>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="px-2 py-1 text-xs">
                        Copy to clipboard
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Button onClick={() => setShowShare(false)} className="mt-1 text-xs sm:text-sm py-1">
                  Fechar
                </Button>
              </div>

            </div>
          )}
          <div className="p-10">

          {openLogin && <LoginModal onCloseAction={() => setOpenLogin(false)} open={openLogin} />}
          </div>
        </div>
      </div>
    </div>
  );
}
