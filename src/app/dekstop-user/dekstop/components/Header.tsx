"use client";

import Image from "next/image";
import { Search } from "lucide-react"; 

export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-4 gap-3 sm:gap-6  shadow-md">
      {/* Search bar */}
      <div className="relative w-full sm:w-[420px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search something..."
          className="w-full rounded-full border border-gray-200 px-10 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden sm:flex flex-col text-right">
          <span className="text-sm font-medium">Usuario X</span>
          <span className="text-xs text-gray-400">ver perfil</span>
        </div>
        <Image
          src="https://i.pinimg.com/1200x/d2/25/07/d2250772dc3221bfe9ed14d1d4cf0ec7.jpg"
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
    </header>
  );
}
