"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/shadcn-studio/blocks/hero-section01/hero-section-01";
import Header from "@/components/shadcn-studio/blocks/hero-section01/header";
import type { NavigationSection } from "@/components/shadcn-studio/blocks/hero-section01/header";
import ElasticCard from "@/components/elasticCard";

const navigationData: NavigationSection[] = [
  { title: "Home", href: "#" },
  { title: "Products", href: "#" },
  { title: "About Us", href: "#" },
  { title: "Contacts", href: "#" },
];

const HeroSectionPage = () => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header Section */}
      <Header navigationData={navigationData} />

      {/* Main Content */}
      <main className="flex flex-col">
        <HeroSection />
      </main>

      {/* Elastic Cards */}
      <motion.div
        className="mt-20 p-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <ElasticCard />
      </motion.div>
    </motion.div>
  );
};

export default HeroSectionPage;
