"use client";

import { motion } from "framer-motion";
import CardsSection from "../components/cardHorizontal";
import Footer from "@/components/navbottom";
import AppHero from "@/components/mvpblocks/app-hero";

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
        <AppHero/>
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
