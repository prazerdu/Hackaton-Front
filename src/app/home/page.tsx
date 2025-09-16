"use client";

import Header from "@/components/Header";
import Banner from "@/components/Banner";
import DoctorCard from "@/components/DoctorCard";
import { doctors } from "@/lib/doctors";
import Categories from "@/components/Categories";
import Dekstop from "../dekstop-user/dekstop/page";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* Layout Mobile (até lg) */}
      <div className="block lg:hidden">
        <Header />
        <div className="px-4">
          <Banner />
          <Categories />
          <h2 className="text-sm font-semibold mt-6 mb-3">Popular Doctors</h2>
          <div className="flex flex-col overflow-scroll gap-3">
            {doctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <Dekstop />
      </div>
    </div>
  );
}
