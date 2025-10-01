"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  cardId: number;
  isLiked: boolean;
  toggleLike: (cardId: number) => void;
}


export default function LikeButton({ cardId }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    // Carrega estado do card específico
    const savedLiked = localStorage.getItem(`isLiked-${cardId}`);
    const savedLikes = localStorage.getItem(`likes-${cardId}`);

    if (savedLiked) setIsLiked(JSON.parse(savedLiked));
    if (savedLikes) setLikes(Number(savedLikes));
  }, [cardId]);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // evita abrir modais ao clicar no like
    const newLiked = !isLiked;
    const newLikes = newLiked ? likes + 1 : likes - 1;

    setIsLiked(newLiked);
    setLikes(newLikes);

    // Salva no localStorage por card
    localStorage.setItem(`isLiked-${cardId}`, JSON.stringify(newLiked));
    localStorage.setItem(`likes-${cardId}`, newLikes.toString());
  };

  return (
    <motion.button
      onClick={handleLike}
      whileTap={{ scale: 0.85 }}
      className="flex items-center gap-1 bg-white/80 rounded-full px-3 py-1 shadow-md hover:bg-white transition select-none"
    >
      <motion.div
        animate={isLiked ? { scale: [1, 1.4, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Heart
          size={20}
          className={isLiked ? "fill-red-500 text-red-500" : "text-red-500"}
        />
      </motion.div>

      <AnimatePresence mode="popLayout">
        <motion.span
          key={likes}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-sm font-medium"
        >
          {likes}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
