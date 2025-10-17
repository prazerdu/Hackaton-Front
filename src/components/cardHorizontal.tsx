'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const sections = [
  {
    id: 'usuario-comum',
    title: 'Usuário Comum',
    description:
      'Trabalhe com sua equipe em harmonia, com feedback instantâneo e comunicação integrada.',
    image: 'https://i.pinimg.com/736x/16/ef/40/16ef40bf188f4227650a664637ee30ab.jpg',
  },
  {
    id: 'gestor-avaliador',
    title: 'Gestor e Avaliador',
    description:
      'Acompanhe métricas, progresso e resultados de forma inteligente e visual.',
    image: 'https://i.pinimg.com/1200x/e2/c9/18/e2c918fddd4fc517665b3ce9c73bb5f6.jpg',
  },
  {
    id: 'super-admin',
    title: 'Super Admin Ninna',
    description:
      'Descubra oportunidades e tendências que impulsionam o crescimento do seu projeto.',
    image: 'https://i.pinimg.com/736x/16/ef/40/16ef40bf188f4227650a664637ee30ab.jpg',
  },
]

export default function CardsSection() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="text-center w-full py-24">
      {/* Título principal */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">Perfis de Usuário</h2>
        <p className="text-lg text-muted-foreground">
          Explore os diferentes níveis de acesso e funcionalidades da plataforma.
        </p>
      </motion.div>

      {/* Cards 3D interativos */}
      <motion.div
        className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto perspective-[1000px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            whileHover={{ scale: 1.05, rotateY: 0 }}
            initial={{ rotateY: index === 0 ? 15 : index === 2 ? -15 : 0 }}
            className="group relative w-[300px] cursor-pointer overflow-hidden rounded-2xl shadow-lg bg-card hover:shadow-xl transition-all duration-500 [transform-style:preserve-3d]"
            onClick={() => scrollToSection(section.id)}
          >
            <div className="relative w-full h-[360px] [transform:translateZ(50px)]">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover group-hover:brightness-70 transition-all duration-500 rounded-2xl"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-background/90 via-background/20 to-transparent [transform:translateZ(60px)]">
              <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
              <p className="text-sm text-muted-foreground">{section.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Sessões individuais melhoradas */}
      {sections.map((section, index) => (
        <motion.section
          key={section.id}
          id={section.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          viewport={{ once: true }}
          className={`flex flex-col lg:flex-row items-center mt-30 justify-center gap-12 my-24 ${
            index % 2 === 1 ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Imagem com hover elegante */}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl pointer-events-none" />
          </motion.div>

          <motion.div
            className="max-w-xl text-center lg:text-left"
            initial={{ x: index % 2 === 1 ? -50 : 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-extrabold mb-4 text-primary">{section.title}</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {section.description}
            </p>

          </motion.div>
        </motion.section>
      ))}
    </section>
  )
}
