"use client";

import { motion } from "framer-motion";
import { ThreeDMarqueeDemo } from "../components/3dmarque";
import { Lock, Unlock } from "lucide-react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  color = "text-white/90", 
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  color?: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -4 }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
    className="flex flex-col p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/15 transition-all"
  >
    <div className="flex items-center gap-3 mb-3">
      <Icon className={`w-6 h-6 ${color}`} />
      <h3 className="text-white text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-white/75 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

export default function StepPlataforma() {
  const publicFeatures = [
    {
      icon: Unlock,
      title: "Acesso Público",
      description:
        "Visualize desafios e oportunidades abertas de forma transparente, sem necessidade de login.",
      color: "text-purple-500",
    },
    {
      icon: Unlock,
      title: "Login Seguro",
      description:
        "Autenticação protegida por e-mail e senha, garantindo segurança e privacidade dos dados.",
       color: "text-purple-500",
    },
  ];

  const privateFeatures = [
    {
      icon: Lock,
      title: "Controle de Usuários",
      description:
        "Gestão de perfis com níveis de acesso distintos: Comum, Avaliador e Gestor.",
      color: "text-purple-500",
    },
    {
      icon: Lock,
      title: "Gestão de Desafios",
      description:
        "Crie, acompanhe e gerencie ideias e projetos corporativos com total controle.",
      color: "text-purple-500",
    },
    {
      icon: Lock,
      title: "Funil de Inovação",
      description:
        "Organize ideias em etapas, permitindo comentários, avaliações e votações.",
      color: "text-purple-500",
    },
    {
      icon: Lock,
      title: "Conexão com Startups",
      description:
        "Descubra startups e registre interesse em soluções estratégicas para a sua empresa.",
      color: "text-purple-500",
    },
    {
      icon: Lock,
      title: "Dashboard do Gestor",
      description:
        "Acompanhe métricas, gráficos e insights que apoiam a tomada de decisão corporativa.",
      color: "text-purple-500",
    },
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-24 overflow-hidden">
      {/* Fundo 3D */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full opacity-80 blur-sm">
          <ThreeDMarqueeDemo />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 backdrop-blur-sm" />
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Texto e Cards */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
          >
            Plataforma Corporativa <span className="text-purple-500">Ninna Hub</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-white/80 text-lg md:text-xl leading-relaxed"
          >
            Conectamos{" "}
            <span className="text-purple-500 font-semibold">empresas</span>,{" "}
            <span className="text-purple-500 font-semibold">colaboradores</span> e{" "}
            <span className="text-purple-500 font-semibold">startups</span> em um
            ecossistema de inovação completo, dividido em duas áreas principais:{" "}
            <span className="text-purple-500 font-semibold">Pública</span> e{" "}
            <span className="text-purple-500 font-semibold">Privada</span>. Cada recurso
            foi pensado para otimizar processos, engajar equipes e acelerar resultados.
          </motion.p>

          {/* Área Pública */}
          <div className="mt-4">
            <h3 className="text-white/90 font-semibold text-2xl mb-4 flex items-center gap-2">
              <Unlock className="w-5 h-5 text-purple-500" /> Área Pública
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {publicFeatures.map((feature, i) => (
                <FeatureCard key={i} {...feature} />
              ))}
            </div>
          </div>

          {/* Área Privada */}
          <div className="mt-10">
            <h3 className="text-white/90 font-semibold text-2xl mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-500" /> Área Privada
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {privateFeatures.map((feature, i) => (
                <FeatureCard key={i} {...feature} />
              ))}
            </div>
          </div>
        </div>

        {/* Ilustração / Imagem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="lg:col-span-5 flex justify-center items-center"
        >
          <motion.div
            whileHover={{ rotate: 2, scale: 1.02 }}
            className="relative w-80 h-80 rounded-3xl bg-gradient-to-tr from-blue-400/30 to-purple-400/20 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl"
          >
            <p className="text-white/80 text-center text-lg font-medium px-6">
              Interface moderna e responsiva para o ecossistema de inovação.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
