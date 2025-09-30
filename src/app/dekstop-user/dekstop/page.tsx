"use client";

import { useState } from "react";
import Sidebar from "@/app/dekstop-user/dekstop/components/SideBar";
import Header from "@/app/dekstop-user/dekstop/components/Header";
import HeroBanner from "@/app/dekstop-user/dekstop/components/HeroBanner";
import HireCards from "@/app/dekstop-user/dekstop/components/HireCards";
import RecruitmentTable from "@/app/dekstop-user/dekstop/components/RecruitmentTable";
import Rightbar from "@/app/dekstop-user/dekstop/components/Rightbar";

export default function Dekstop() {
  // Estado para a barra de pesquisa
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-[#e9e7ff] flex items-center text-gray-700">
      <div className="w-full bg-white/70 backdrop-blur-lg overflow-hidden flex">
        {/* <Sidebar /> */}

        <main className="flex-1 p-6">
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <HeroBanner />
          <HireCards searchQuery={searchQuery} />
          {/* <RecruitmentTable /> */}
        </main>

        <Rightbar />
      </div>
    </div>
  );
}
