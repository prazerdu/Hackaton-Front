"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/shadcn-studio/blocks/hero-section01/hero-section-01";
import Header from "@/components/shadcn-studio/blocks/hero-section01/header";
import type { NavigationSection } from "@/components/shadcn-studio/blocks/hero-section01/header";
import CardsSection from "../components/cardHorizontal";

const navigationData: NavigationSection[] = [
  { title: "Home", href: "#home" },
  { title: "Sobre", href: "#sobre" },
  { title: "About Us", href: "#about" },
];

const HeroSectionPage = () => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Header navigationData={navigationData} />

      {/* Main Content */}
      <main className="flex flex-col">
        <HeroSection />
      </main>

      <div className="">
        <CardsSection />
      </div>
    </motion.div>
  );
};

export default HeroSectionPage;
