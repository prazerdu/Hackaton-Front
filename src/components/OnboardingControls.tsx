"use client";

import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

type StepButtonsProps = {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  totalSteps: number;
};

export default function StepButtons({ index, setIndex, totalSteps }: StepButtonsProps) {
  return (
    <div className="absolute bottom-10 w-full flex justify-center gap-6">
      {index > 0 && (
        <Button
          variant="outline"
          onClick={() => setIndex(index - 1)}
          className="px-6 py-2 text-white border-white hover:bg-white/10"
        >
          Voltar
        </Button>
      )}
      <Button
        onClick={() => setIndex(index < totalSteps - 1 ? index + 1 : 0)}
        className="px-8 py-2 bg-white text-black hover:bg-gray-200"
      >
        {index === totalSteps - 1 ? "Reiniciar" : "Próximo"}
      </Button>
    </div>
  );
}
