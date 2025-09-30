'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export default function LikeButton() {
  const [likes] = useState();
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <motion.button
      onClick={handleLike}
      whileTap={{ scale: 0.85 }}
      className="flex items-center gap-1 bg-white/80 rounded-full px-3 py-1 shadow-md hover:bg-white transition absolute top-2 right-2 select-none"
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
