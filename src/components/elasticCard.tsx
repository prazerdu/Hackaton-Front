"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, ClipboardList, MessageCircle } from "lucide-react";

interface CardProps {
    image: string;
    title: string;
    description: string;
    buttonText: string;
    icon: React.ReactNode;
}

const ElasticCardItem: React.FC<CardProps> = ({
    image,
    title,
    description,
    buttonText,
    icon,
}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            className="relative max-w-sm w-full h-80 rounded-2xl overflow-hidden shadow-lg border cursor-pointer"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 180, damping: 30 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
            {/* Imagem de fundo */}
            <motion.img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{ scale: hovered ? 1.1 : 1 }}
                transition={{ duration: 1 }}
            />

            {/* Overlay escurecido */}
            <motion.div
                className="absolute inset-0 bg-black/30"
                animate={{ opacity: hovered ? 1 : 0.4 }}
                transition={{ duration: 0.8 }}
            />

            {/* Título animado com ícone */}
            <motion.div
                className="absolute bottom-5 left-5 right-5 flex items-center gap-2"
                animate={{ opacity: hovered ? 0 : 1 }}
                transition={{ duration: 0.3 }}
            >
                {icon}
                <h2 className="text-lg font-semibold text-white">{title}</h2>
            </motion.div>

            {/* Conteúdo animado: descrição e botão */}
            <motion.div
                className="absolute bottom-0 w-full rounded-t-2xl shadow-md p-5 bg-black/40"
                animate={{
                    y: hovered ? 0 : 120,
                    opacity: hovered ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 160, damping: 20 }}
            >
                <p className="text-sm mb-4 text-white">{description}</p>
                <div className="flex justify-between items-center">
                    <Button className="rounded-lg">{buttonText}</Button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function ElasticCard() {
    const cardsData: CardProps[] = [
        {
            image: "../../assets/images/project-management.jpg",
            title: "Cadastre-se e Configure",
            description:
                "Enjoy this refreshing and vibrant dish — perfect for sunny days and happy vibes.",
            buttonText: "View Recipe",
            icon: <UserPlus className="w-5 h-5 text-white" />,
        },
        {
            image: "https://i.pinimg.com/736x/5c/6b/2f/5c6b2f50a8f3b9f7c178e0d56d97a345.jpg",
            title: "Crie Projetos e Tarefas",
            description:
                "A mix of exotic fruits and greens for a refreshing, healthy treat.",
            buttonText: "See Details",
            icon: <ClipboardList className="w-5 h-5 text-white" />,
        },
        {
            image: "https://i.pinimg.com/736x/23/45/56/2345567890abcdef1234567890abcdef.jpg",
            title: "Colaborare e se Comunique",
            description: "A bold combination of flavors to ignite your taste buds.",
            buttonText: "Order Now",
            icon: <MessageCircle className="w-5 h-5 text-white" />,
        },
    ];

    return (
        <div className="flex gap-6 flex-wrap justify-center">
            {cardsData.map((card, index) => (
                <ElasticCardItem key={index} {...card} />
            ))}
        </div>
    );
}
