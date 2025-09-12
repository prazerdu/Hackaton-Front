"use client";

import Header from "@/components/Header";
import Banner from "@/components/Banner";
import DoctorCard from "@/components/DoctorCard";
// import BottomNav from "@/components/BottomNav";

import { doctors } from "@/lib/doctors";
import Categories from "@/components/Categories"; // 

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <Header />

      <div className="px-4">
        <Banner />

        {/* usa o novo componente */}
        <Categories />

        <h2 className="text-sm font-semibold mt-6 mb-3">Popular Doctors</h2>
        <div className="flex flex-col overflow-scroll gap-3">
          {doctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      </div>

      {/* <BottomNav /> */}
    </div>
  );
}
