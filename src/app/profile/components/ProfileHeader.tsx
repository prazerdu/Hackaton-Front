"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function ProfileHeader() {
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-start p-4">
      <button
        onClick={() => router.back()}
        className="text-blue-950"
      >
        <ChevronLeft size={28} strokeWidth={2.5} />
      </button>
    </div>
  );
}
