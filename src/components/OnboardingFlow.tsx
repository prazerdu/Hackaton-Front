"use client";

import { useState, ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StepPlataforma from "./StepPlataforma";
import StepUsuarios from "./StepUsuarios";
import StepExplore from "./StepExplore";
import StepButtons from "./OnboardingControls"; 

type StepProps = {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
};

const steps: ComponentType<StepProps>[] = [StepPlataforma, StepUsuarios, StepExplore];

export default function OnboardingFlow() {
  const [index, setIndex] = useState(0);
  const Step = steps[index];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.6 }}
        >
          <Step index={index} setIndex={setIndex} totalSteps={steps.length} />
        </motion.div>
      </AnimatePresence>

      {/* Botões separados */}
      <StepButtons index={index} setIndex={setIndex} totalSteps={steps.length} />
    </div>
  );
}
