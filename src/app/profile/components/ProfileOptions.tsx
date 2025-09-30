"use client";

import { Bell, Paintbrush, Download, CreditCard } from "lucide-react";

export default function ProfileOptions() {
  return (
    <div className="mt-8 w-full h-[900px] max-w-md bg-white rounded-2xl shadow-md p-8 space-y-10 text-gray-600 font-semibold">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="text-pink-500" />
          <span>Notificações</span>
        </div>
        <span className="text-gray-400">{">"}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Paintbrush className="text-purple-500" />
          <span>Become an artist on Flamingo</span>
        </div>
        <span className="text-gray-400">{">"}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Download className="text-blue-500" />
          <span>My downloads</span>
        </div>
        <span className="text-gray-400">{">"}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CreditCard className="text-orange-500" />
          <span>Payment settings</span>
        </div>
        <span className="text-gray-400">{">"}</span>
      </div>
    </div>
  );
}
