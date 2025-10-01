"use client";

import Image from "next/image";
import { Bell, CreditCard, Heart } from "lucide-react";

const iconChecked = {
  icon: "/icons/checklist.png",
};

export default function ProfileOptions() {
  return (
    <div className="mt-8 w-full max-w-md rounded-2xl shadow-md p-8 space-y-10 text-gray-200">
      {/* Notificações */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="text-pink-500" />
          <span>Notificações</span>
        </div>
        <span className="text-gray-400">{">"}</span>
      </div>

      {/* Favoritos */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Heart size={25} className="text-red-500 fill-red-500" />
          <span>Favoritos</span>
        </div>
        <span className="text-gray-400">{">"}</span>
      </div>

      {/* Desafios Completados */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={iconChecked.icon}
            alt="Desafios Completados"
            width={25}
            height={25}
            className="text-blue-500"
          />
          <span>Desafios Completos</span>
        </div>
        <span className="text-gray-400">{">"}</span>
      </div>

      {/* Desafios Pendentes */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CreditCard className="text-orange-500" />
          <span>Desafios Pendentes</span>
        </div>
        <span className="text-gray-400">{">"}</span>
      </div>
    </div>
  );
}
