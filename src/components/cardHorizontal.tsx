'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Maximize2, X } from 'lucide-react'

const sections = [
  {
    id: 'usuario-comum',
    title: 'Usuário Comum',
    description:
      'Trabalhe com sua equipe em harmonia, com feedback instantâneo e comunicação integrada.',
    image: '/homepage.png',
  },
  {
    id: 'gestor-avaliador',
    title: 'Gestor e Avaliador',
    description:
      'Acompanhe métricas, progresso e resultados de forma inteligente e visual.',
    image:
      'https://i.pinimg.com/1200x/e2/c9/18/e2c918fddd4fc517665b3ce9c73bb5f6.jpg',
  },
  {
    id: 'super-admin',
    title: 'Super Admin Ninna',
    description:
      'Descubra oportunidades e tendências que impulsionam o crescimento do seu projeto.',
    image:
      'https://i.pinimg.com/736x/16/ef/40/16ef40bf188f4227650a664637ee30ab.jpg',
  },
]

export default function CardsSection() {
  const [fullscreen, setFullscreen] = useState<string | null>(null)

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative text-center w-full py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-purple-800/30 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-20 w-[28rem] h-[28rem] bg-purple-500/20 rounded-full blur-3xl"
          animate={{ x: [0, 60, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-[20rem] h-[20rem] bg-purple-500/20 rounded-full blur-2xl"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-[40%] right-[25%] w-[26rem] h-[26rem] bg-purple-900/20 rounded-full blur-3xl"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-[15%] left-[30%] w-[18rem] h-[18rem] bg-fuchsia-600/20 rounded-full blur-2xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto mb-16 relative z-10"
      >
        <h2 className="text-4xl font-bold mb-4">Perfis de Usuário</h2>
        <p className="text-lg">
          Explore os diferentes níveis de acesso e funcionalidades da plataforma.
        </p>
      </motion.div>

      {/* --- cards 3D interativos --- */}
      <motion.div
        className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto perspective-[1000px] relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            whileHover={{ scale: 1.05, rotateY: 0 }}
            initial={{ rotateY: index === 0 ? 15 : index === 2 ? -15 : 0 }}
            className="group relative w-[300px] cursor-pointer overflow-hidden rounded-2xl shadow-lg bg-card/80 hover:shadow-xl transition-all duration-500 [transform-style:preserve-3d] backdrop-blur-md"
            onClick={() => scrollToSection(section.id)}
          >
            <div className="relative w-full h-[360px] [transform:translateZ(50px)]">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover transition-all duration-500 rounded-2xl"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-background/90 via-background/20 to-transparent [transform:translateZ(60px)]">
              <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
              <p className="text-sm">{section.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* --- seções individuais --- */}
      {sections.map((section, index) => (
        <motion.section
          key={section.id}
          id={section.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          viewport={{ once: true }}
          className={`relative flex flex-col lg:flex-row items-center justify-center gap-12 my-24 z-10 ${
            index % 2 === 1 ? 'lg:flex-row-reverse' : ''
          }`}
        >
          <motion.div
            className="relative w-full lg:w-[300px] h-[400px] rounded-3xl overflow-hidden shadow-2xl"
            initial={{ x: index % 2 === 1 ? 50 : -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={section.image}
              alt={section.title}
              fill
              className="object-cover rounded-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl" />

            <button
              onClick={() => setFullscreen(section.id)}
              className="absolute top-3 right-3 text-white bg-black/60 hover:bg-black/80 p-2 rounded-full transition z-10"
            >
              <Maximize2 size={20} />
            </button>
          </motion.div>

          <motion.div
            className="max-w-xl text-center lg:text-left"
            initial={{ x: index % 2 === 1 ? -50 : 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl text-purple-600 font-extrabold mb-4">{section.title}</h2>
            <p className="text-lg mb-6 leading-relaxed">
              {section.description}
            </p>
          </motion.div>
        </motion.section>
      ))}

      {/* --- modal expandido --- */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="fixed inset-0 z-50 flex w-full items-center justify-center bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {sections
              .filter((s) => s.id === fullscreen)
              .map((s) => (
                <motion.div
                  key={s.id}
                  className="relative w-[90%] max-w-5xl h-[80vh] bg-background rounded-3xl overflow-hidden shadow-2xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <button
                    onClick={() => setFullscreen(null)}
                    className="absolute top-4 right-4 z-50 bg-black/60 text-white hover:bg-black/20 p-2 rounded-full transition"
                  >
                    <X size={22} />
                  </button>
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover rounded-3xl brightness-75"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                    <h2 className="text-4xl font-bold mb-4">{s.title}</h2>
                    <p className="text-lg max-w-2xl mx-auto">{s.description}</p>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
