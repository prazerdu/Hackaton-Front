"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

interface ProfileInfoProps {
  userId?: string; // agora opcional
}

export default function ProfileInfo({ userId }: ProfileInfoProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [role, setRole] = useState("Carregando...");

useEffect(() => {
  if (!userId) {
    setRole("Usuário comum");
    return;
  }
  fetch(`/api/users/${userId}/role`)
    .then((res) => res.json())
    .then((data) => setRole(data.role || "Usuário comum"))
    .catch(() => setRole("Usuário comum"));
}, [userId]);
    

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center relative">
      <div className="relative">
        <Avatar className="w-24 h-24">
          {profileImage ? (
            <AvatarImage src={profileImage} alt="Perfil" />
          ) : (
            <AvatarFallback>LB</AvatarFallback>
          )}
        </Avatar>

        <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-100">
          <Camera className="w-4 h-4 text-gray-700" />
          <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
        </label>
      </div>

      <h2 className="mt-3 font-semibold text-lg text-gray-800">Do momento</h2>

      <div className="mt-1 flex items-center gap-1 bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-sm">
        🏆 {role}
      </div>
    </div>
  );
}
