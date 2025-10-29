"use client";

import { useEffect, useId } from "react";
import { LoaderCircleIcon, MicIcon, SearchIcon } from "lucide-react";
import Usuario from "./Usuario";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  const id = useId();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [searchQuery]);

  return (
    <header className="flex items-center justify-center p-4">
      <div className="flex items-center gap-3 w-full max-w-md">
        <div className="relative flex-1">
          <Label htmlFor={id} className="sr-only">
            Search input
          </Label>
          <Input
            id={id}
            className="peer ps-9 pe-9"
            placeholder="Search..."
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0
           start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            {isLoading ? (
              <LoaderCircleIcon
          className="animate-spin"
          size={16}
          role="status"
          aria-label="Loading..."
              />
            ) : (
              <SearchIcon size={16} aria-hidden="true" />
            )}
          </div>
          <button
            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring
            focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center
            justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10
            focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed
            disabled:opacity-50"
            aria-label="Press to speak"
            type="button"
          >
            <MicIcon size={16} aria-hidden="true" />
          </button>
        </div>
        <Usuario />
      </div>
    </header>
  );
}
