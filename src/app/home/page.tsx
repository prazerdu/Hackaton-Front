"use client";
import Banner from "@/components/Banner";
import Dekstop from "../dekstop-user/dekstop/page";
import HireCards from "../dekstop-user/dekstop/components/HireCards";
import Rightbar from "../dekstop-user/dekstop/components/Rightbar";
import Header from "../dekstop-user/dekstop/components/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white/70 flex flex-col">
      {/* Layout Mobile (até lg) */}
      <div className="block lg:hidden flex-1 flex-col">
        <Header />

        <div className="px-4 flex-1 flex flex-col overflow-hidden">
          <Banner />
          <Rightbar />
          {/* </div> */}
          
          {/* Hire Cards */}
          <div className="mt-4 flex-shrink-0">
            <HireCards />
          </div>

        </div>
      </div>

      {/* Layout Desktop */}
      <div className="hidden lg:block">
        <Dekstop />
      </div>
    </div>
  );
}
