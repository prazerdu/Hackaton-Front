"use client";

import Navbar from "@/components/NavBar";
import InvoiceTable from "@/components/InvoiceTable";
import WebsiteTable from "@/components/WebsiteTable";
import VideoTips from "@/components/VideoTips";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] p-8">
      {/* Reaproveita Navbar */}
      <Navbar />

      {/* Invoicing + Websites */}
      <section className="grid grid-cols-2 gap-6 mt-10">
        <InvoiceTable />
        <WebsiteTable />
      </section>

      {/* Vídeos */}
      <section className="mt-10">
        <VideoTips />
      </section>
    </div>
  );
}
