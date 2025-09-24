"use client";
import { Search } from "lucide-react";
import Usuario from "./Usuario";

export default function Header() {
  return (
    <header className="flex items-center justify-center p-4">
      <div className="flex items-center gap-3 w-full max-w-md">
        {/* Barra de pesquisa */}
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search something..."
            className="w-full rounded-full border border-gray-200 px-10 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <Usuario />
      </div>
    </header>
  );
}
