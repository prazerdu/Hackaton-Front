"use client";

import Header from "@/components/Header";
import Banner from "@/components/Banner";
import DoctorCard from "@/components/DoctorCard";
import { doctors } from "@/lib/doctors";
import Categories from "@/components/Categories";
import Dashboard from "@/components/Dashboard"; // 👈 importei

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* Se quiser manter o layout antigo no mobile */}
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

      {/* E aqui o Dashboard no desktop */}
      <Dashboard />
    </div>
  );
}
