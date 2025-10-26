"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CircularItem {
  id: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

interface CircularDropProps {
  items: CircularItem[];
  radius?: number;
  size?: number;
  ariaLabel?: string;
}

export default function CircularDropButton({
  items = [],
  radius = 70,
  size = 50,
  ariaLabel = "Abrir menu circular",
}: CircularDropProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const angles = items.length > 1
    ? Array.from({ length: items.length }).map((_, i) => (90 / (items.length - 1)) * i)
    : [45];

  function polarToCartesian(angleDeg: number, r: number) {
    const a = (angleDeg * Math.PI) / 180;
    return { x: Math.cos(a) * r, y: -Math.sin(a) * r }; 
  }

  return (
    <div ref={rootRef} className="fixed bottom-6 left-6 z-50">
      <Button
        size="icon"
        onClick={() => setOpen((s) => !s)}
        aria-label={ariaLabel}
        className="rounded-full bg-white dark:bg-slate-900  text-black dark:text-white shadow-lg border"
        style={{ width: size, height: size }}
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
          className="text-2xl select-none font-bold"
        >
          +
        </motion.span>
      </Button>

      <AnimatePresence>
        {open && (
          <div className="absolute inset-0 pointer-events-none">
            {items.map((it, idx) => {
              const { x, y } = polarToCartesian(angles[idx], radius);
              return (
                <motion.button
                  key={it.id}
                  initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                  animate={{ opacity: 1, scale: 1, x, y }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25, delay: idx * 0.05 }}
                  onClick={() => {
                    it.onClick?.();
                    setOpen(false);
                  }}
                  disabled={it.disabled}
                  className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-10 h-10 flex items-center justify-center shadow-lg border bg-white dark:bg-slate-900 text-black dark:text-white"
                >
                  {it.icon}
                </motion.button>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
 