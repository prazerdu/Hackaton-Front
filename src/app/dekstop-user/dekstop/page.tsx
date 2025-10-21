"use client";

import { useState } from "react";
import Header from "@/app/dekstop-user/dekstop/components/Header";
import HeroBanner from "@/app/dekstop-user/dekstop/components/HeroBanner";
import Rightbar from "@/app/dekstop-user/dekstop/components/Rightbar";
import CardTweetDemo from "@/app/dekstop-user/dekstop/components/HireCards";

export default function Dekstop() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-[#e9e7ff] flex items-center text-gray-700">
      <div className="w-full bg-white/70 backdrop-blur-lg overflow-hidden flex">
        {/* <Sidebar /> */}

        <main className="flex-1 p-6">
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <HeroBanner />
          <CardTweetDemo/>
          {/* <RecruitmentTable /> */}
        </main>

        <Rightbar />
      </div>
    </div>
  );
}
