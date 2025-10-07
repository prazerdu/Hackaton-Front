"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function ElasticCard() {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <motion.div
      className="relative max-w-sm w-full h-80 rounded-2xl overflow-hidden shadow-lg bg-gray-100 border border-gray-200 cursor-pointer"
      whileHover={{ scale: 1.03 }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 15,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Imagem de fundo */}
      <motion.img
        src="https://i.pinimg.com/736x/46/6d/ed/466dedb46952644c44a51912d5c69dd2.jpg"
        alt="Delicious Dish"
        className="absolute inset-0 w-full h-full object-cover"
        animate={{
          scale: hovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.6 }}
      />

      {/* Overlay escurecido */}
      <motion.div
        className="absolute inset-0 bg-black/30"
        animate={{
          opacity: hovered ? 1 : 0.4,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Conteúdo do card */}
      <motion.div
        className="absolute bottom-0 w-full p-5 bg-white/90 backdrop-blur-sm rounded-t-2xl shadow-md"
        animate={{
          y: hovered ? 0 : 120,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 18,
        }}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Sizzling Summer Delight
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Enjoy this refreshing and vibrant dish — perfect for sunny days and happy vibes.
        </p>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handleLike}
            className={`flex items-center gap-2 rounded-lg transition-all ${
              liked ? "bg-pink-100 text-pink-600 border-pink-300" : ""
            }`}
          >
            <Heart
              className={`w-5 h-5 transition-transform ${
                liked ? "fill-pink-500 scale-110" : "scale-100"
              }`}
            />
            {liked ? "Liked!" : "Like"}
          </Button>

          <Button className="rounded-lg">View Recipe</Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
