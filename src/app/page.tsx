"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/shadcn-studio/blocks/hero-section01/hero-section-01";
import CardsSection from "../components/cardHorizontal";
import Footer from "@/components/navbottom";
import OnboardingFlow from "@/components/OnboardingFlow";

const HeroSectionPage = () => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header minimalista */}
      {/* <SimpleHeader /> */}

      {/* Main Content */}
      <main className="flex flex-col">
        <HeroSection />
      </main>

      {/* Cards Section */}
      <div className="">
        <CardsSection />
        <OnboardingFlow />        
        <Footer />
      </div>
    </motion.div>
  );
};

export default HeroSectionPage;
