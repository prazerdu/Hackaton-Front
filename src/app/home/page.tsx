"use client";
import Banner from "@/components/Banner";
import Header from "../dekstop-user/dekstop/components/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white/70 flex flex-col">
      <div className="block lg:hidden flex-1 flex-col">
        <Header />
        <div className="px-4 flex-1 flex flex-col overflow-hidden">
          <Banner />
        </div>
      </div>
    </div>
  );
}
