"use client";

import ProfileHeader from "@/app/profile/components/ProfileHeader";
import ProfileInfo from "@/app/profile/components/ProfileInfos";
import ProfileStats from "@/app/profile/components/ProfileStats";
import ProfileOptions from "@/app/profile/components/ProfileOptions";
// import ProfileButton from "@/app/profile/components/ProfileButton";

export default function ProfilePage() {
  const userId = "123"; // aqui você pega o id do usuário logado

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-2.5 items-center">
      <ProfileHeader />
      <ProfileInfo userId={userId} />
      <ProfileStats />
      <ProfileOptions />
    </div>
  );
}
