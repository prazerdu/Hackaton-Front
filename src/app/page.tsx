"use client";

import { motion } from "framer-motion";
import Footer from "@/components/navbottom";
import AppHero from "@/components/mvpblocks/app-hero";
import {SimpleHeader} from "@/components/shadcn-studio/blocks/hero-section01/header";
import AboutUs1 from "@/components/ui/sections";

const HeroSectionPage = () => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header minimalista */}
      <SimpleHeader />

      {/* Main Content */}
      <main className="flex flex-co l">
        <AppHero/>
      </main>

      {/* Cards Section */}
      <div className="">
        <AboutUs1 />
        <Footer />
      </div>
    </motion.div>
  );
};

export default HeroSectionPage;
