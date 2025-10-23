'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Footer from './navbottom'
const sections = [
  {
    id: 'usuario-comum',
    title: 'Usuário Comum (Colaborador ou Parceiro)',
    description:
      'Submeter ideias e participar de processos colaborativos. Área restrita da empresa à qual pertence.',
    image: '/6d24ad5616ddd4dc783fa9972be7c746-removebg-preview.png',
    detalhes: {
      pode: [
        'Acessar a área da sua empresa (não visualiza dados de outras empresas).',
        'Submeter ideias e sugestões de desafios na etapa Geração/Captura de Ideias.',
        'Visualizar e comentar ideias públicas ou internas, conforme permissão da empresa.',
        'Acompanhar o status de suas ideias ao longo do funil.',
        'Acessar desafios públicos (caso a empresa publique algum).',
      ],
      naoPode: [
        'Editar desafios já cadastrados.',
        'Avaliar ou aprovar ideias.',
        'Visualizar relatórios, dashboards ou métricas empresariais.',
      ],
    },
  },
  {
    id: 'avaliador',
    title: 'Avaliador (Especialista ou Comitê Técnico)',
    description:
      'Realizar a triagem e avaliação das ideias e desafios submetidos.',
    image:
      '/fb528f44ff535b55f3f04a09aaaffd25-removebg-preview.png',
    detalhes: {
      pode: [
        'Acessar o funil completo de inovação (todas as etapas).',
        'Realizar a pré-triagem automática ou manual de ideias com base nos critérios definidos.',
        'Pontuar e comentar ideias nas etapas de Pré-Triagem e Triagem Detalhada.',
        'Participar da ideação junto aos usuários comuns.',
        'Selecionar ideias para avanço às próximas etapas.',
        'Visualizar relatórios resumidos das ideias avaliadas (mas não métricas corporativas amplas).',
      ],
      naoPode: [
        'Criar ou editar desafios.',
        'Cadastrar startups ou gerenciar conexões com elas.',
        'Gerar relatórios administrativos de alto nível.',
      ],
    },
  },
  {
    id: 'gestor',
    title: 'Gestor de Inovação (Administrador da Empresa)',
    description:
      'Gerenciar o funil de inovação, acompanhar métricas e conectar desafios a startups.',
    image:
      '/6a28f676992e60611e29a75f35cfbd76-removebg-preview.png',
    detalhes: {
      pode: [
        'Cadastrar, editar e publicar desafios, definindo se serão internos ou abertos ao público.',
        'Gerenciar todas as etapas do funil, do recebimento de ideias até a experimentação (POC).',
        'Designar avaliadores e atribuir responsabilidades por etapa.',
        'Acompanhar e aprovar POCs, definindo metas, prazos e indicadores.',
        'Cadastrar startups ou validar startups sugeridas pelo sistema.',
        'Gerenciar conexões com startups (matchs, convites, histórico de interação).',
        'Gerar relatórios e dashboards personalizados.',
        'Filtrar dados por áreas ou temas dentro da sua empresa.',
        'Gerenciar usuários da empresa (criar, desativar, alterar permissões).',
      ],
      naoPode: [
        'Acessar dados de outras empresas (cada empresa possui ambiente isolado).',
      ],
    },
  },
  {
    id: 'startup',
    title: 'Startup (Usuário Externo)',
    description: 'Conectar-se a desafios corporativos e propor soluções.',
    image:
      '/6c5410b9a4f6d7a869cd726b33d8a362-removebg-preview.png',
    detalhes: {
      pode: [
        'Cadastrar perfil da startup, com informações de tecnologia, estágio, pitch, etc.',
        'Visualizar desafios públicos disponíveis.',
        'Candidatar-se a desafios compatíveis.',
        'Participar de processos de match e convites para POC.',
        'Acompanhar histórico de interações com empresas.',
      ],
      naoPode: [
        'Acessar dados internos de empresas.',
        'Visualizar ideias restritas ou desafios internos.',
      ],
    },
  },
  {
    id: 'visitante',
    title: 'Visitante (Público Geral)',
    description: 'Explorar a vitrine de inovação pública.',
    image: '/6d24ad5616ddd4dc783fa9972be7c746-removebg-preview.png',
    detalhes: {
      pode: [
        'Visualizar desafios públicos publicados por empresas.',
        'Visualizar startups públicas cadastradas.',
        'Criar conta (como colaborador ou startup).',
      ],
      naoPode: [],
    },
  },
]

export default function CardsSection() {

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      const rect = section.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const offset = 80
      const offsetTop = rect.top + scrollTop - offset
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="relative w-full py-16 sm:py-24 overflow-x-hidden">
      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="sticky top-0 z-20 py-4 max-w-3xl mx-auto mb-10 text-center"
      >
        <h2 className="text-3xl  text-purple-600 sm:text-4xl font-bold mb-2">
          Perfis de Usuário
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          Explore os diferentes níveis de acesso e funcionalidades da plataforma.
        </p>
        
      </motion.div>

      {/* CARROSSEL SIMPLES */}
      <motion.div
        className="flex gap-6 md:gap-8 pl-4 p-12 pr-8 sm:px-6 md:px-12 overflow-x-auto lg:justify-center perspective-[1100px] snap-x snap-mandatory scrollbar-hide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            whileHover={{
              scale: 1.08,
              boxShadow: '0px 10px 25px rgba(0,0,0,0.35)',
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            className="relative w-[140px] sm:w-[160px] md:w-[180px] lg:w-[180px] h-[220px] sm:h-[260px] md:h-[300px] lg:h-[270px] cursor-pointer overflow-hidden rounded-3xl shadow-xl bg-card/80 transition-all duration-700 flex-shrink-0 snap-center"
          >
            <div className="relative w-full h-full">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-contain dark:invert rounded-3xl transition-transform duration-700 hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 bg-gradient-to-t from-background/90 via-background/30 to-transparent">
              <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-1">
                {section.title}
              </h3>
            </div>
            
          </motion.div>
          
        ))}

        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </motion.div>

      {/* SESSÕES INDIVIDUAIS */}
      {sections.map((section, index) => (
        <motion.section
          key={section.id}
          id={section.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          viewport={{ once: true }}
          className={`relative flex flex-col lg:flex-row items-start gap-8 sm:gap-12 my-16 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 ${
            index % 2 === 1 ? 'lg:flex-row-reverse' : ''
          }`}
        >
         <motion.div
  className="relative w-full sm:w-[280px] h-[250px] sm:h-[300px] flex-shrink-0 rounded-3xl overflow-hidden shadow-2xl"
  initial={{ x: index % 2 === 1 ? 30 : -30, opacity: 0 }}
  whileInView={{ x: 0, opacity: 1 }}
  whileHover={{ scale: 1.03 }}
  transition={{ duration: 0.8 }}
>
  <Image
    src={section.image}
    alt={section.title}
    fill
    className="object-cover dark:invert rounded-3xl"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl" />
</motion.div>


          <motion.div
            className="flex-1 min-w-0 text-left space-y-4"
            initial={{ x: index % 2 === 1 ? -30 : 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-4xl text-purple-600 font-extrabold mb-4">
              {section.title}
            </h2>
            <p className="text-base sm:text-lg mb-2">{section.description}</p>

            {section.detalhes && (
              <div className="flex flex-col sm:flex-row gap-8 mt-4">
                {section.detalhes.pode && (
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-green-600 mb-2">Pode:</h3>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm sm:text-base">
                      {section.detalhes.pode.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {section.detalhes.naoPode &&
                  section.detalhes.naoPode.length > 0 && (
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-red-600 mb-2">
                        Não pode:
                      </h3>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-sm sm:text-base">
                        {section.detalhes.naoPode.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            )}
          </motion.div>
        </motion.section>
      ))}
    </section>
  )
}
