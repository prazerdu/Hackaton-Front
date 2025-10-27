"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function HeroAnimatedText() {
  const words = ["pessoas", "startups", "empresas"]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="text-3xl relative z-20 font-semibold tracking-tighter"
    >
      A inovação acontece quando{" "}
      <br />
      <motion.span
        key={words[index]}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="inline-block font-semibold text-[#C77DFF]"
      >
        {words[index]}
      </motion.span>{" "}
      se conectam
    </motion.h1>
  )
}
