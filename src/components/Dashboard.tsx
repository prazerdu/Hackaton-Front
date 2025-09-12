"use client";

import Navbar from "./NavBar";
import ProductCard from "./ProductCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] p-8">
      {/* Top Navbar */}
      <Navbar />

      {/* Saudação */}
      <div className="mt-10">
        <h1 className="text-2xl font-bold text-gray-800">Hello Martin!</h1>
        <p className="text-gray-500 text-sm">
          Welcome to your overview of your account.
        </p>
      </div>

      {/* Produtos */}
      <section className="mt-10">
        <h2 className="text-base font-semibold text-gray-700 mb-4">
          My Products
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-4">
          <ProductCard title="To Do" />
          <ProductCard title="In Progress" />
          <ProductCard title="Review" />
          <ProductCard title="Done" />
        </div>
      </section>
    </div>
  );
}
