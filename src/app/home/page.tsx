"use client";

import Header from "@/components/Header";
import Banner from "@/components/Banner";
import DoctorCard from "@/components/DoctorCard";
import { doctors } from "@/lib/doctors";
import Dekstop from "../dekstop-user/dekstop/page";
import HireCards from "../dekstop-user/dekstop/components/HireCards";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Layout Mobile (até lg) */}
      <div className="block lg:hidden flex-1 flex-col">
        <Header />
        <div className="px-4 flex-1 flex flex-col overflow-hidden">
          <Banner />

          {/* Hire Cards */}
          <div className="mt-4 flex-shrink-0">
            <HireCards />
          </div>

          {/* Popular Doctors */}
          <h2 className="text-sm font-semibold mt-6 mb-3">Popular Doctors</h2>
          <div className="flex-1 overflow-auto flex flex-col gap-3 pb-4">
            {doctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
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
