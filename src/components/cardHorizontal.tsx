'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Maximize2, X } from 'lucide-react'

const sections = [ { id: 'usuario-comum', title: 'Usuário Comum (Colaborador ou Parceiro)', description: 'Submeter ideias e participar de processos colaborativos. Área restrita da empresa à qual pertence.', image: '/homepage.png', detalhes: { pode: [ 'Acessar a área da sua empresa (não visualiza dados de outras empresas).', 'Submeter ideias e sugestões de desafios na etapa Geração/Captura de Ideias.', 'Visualizar e comentar ideias públicas ou internas, conforme permissão da empresa.', 'Acompanhar o status de suas ideias ao longo do funil.', 'Acessar desafios públicos (caso a empresa publique algum).', ], naoPode: [ 'Editar desafios já cadastrados.', 'Avaliar ou aprovar ideias.', 'Visualizar relatórios, dashboards ou métricas empresariais.', ], }, }, { id: 'avaliador', title: 'Avaliador (Especialista ou Comitê Técnico)', description: 'Realizar a triagem e avaliação das ideias e desafios submetidos.', image: 'https://i.pinimg.com/1200x/e2/c9/18/e2c918fddd4fc517665b3ce9c73bb5f6.jpg', detalhes: { pode: [ 'Acessar o funil completo de inovação (todas as etapas).', 'Realizar a pré-triagem automática ou manual de ideias com base nos critérios definidos.', 'Pontuar e comentar ideias nas etapas de Pré-Triagem e Triagem Detalhada.', 'Participar da ideação junto aos usuários comuns.', 'Selecionar ideias para avanço às próximas etapas.', 'Visualizar relatórios resumidos das ideias avaliadas (mas não métricas corporativas amplas).', ], naoPode: [ 'Criar ou editar desafios.', 'Cadastrar startups ou gerenciar conexões com elas.', 'Gerar relatórios administrativos de alto nível.', ], }, }, { id: 'gestor', title: 'Gestor de Inovação (Administrador da Empresa)', description: 'Gerenciar o funil de inovação, acompanhar métricas e conectar desafios a startups.', image: 'https://i.pinimg.com/736x/16/ef/40/16ef40bf188f4227650a664637ee30ab.jpg', detalhes: { pode: [ 'Cadastrar, editar e publicar desafios, definindo se serão internos ou abertos ao público.', 'Gerenciar todas as etapas do funil, do recebimento de ideias até a experimentação (POC).', 'Designar avaliadores e atribuir responsabilidades por etapa.', 'Acompanhar e aprovar POCs, definindo metas, prazos e indicadores.', 'Cadastrar startups ou validar startups sugeridas pelo sistema.', 'Gerenciar conexões com startups (matchs, convites, histórico de interação).', 'Gerar relatórios e dashboards personalizados.', 'Filtrar dados por áreas ou temas dentro da sua empresa.', 'Gerenciar usuários da empresa (criar, desativar, alterar permissões).', ], naoPode: ['Acessar dados de outras empresas (cada empresa possui ambiente isolado).'], }, }, { id: 'super-admin', title: 'Administrador da Plataforma (Super Admin / Global)', description: 'Gerenciar o ambiente multiempresa e supervisionar a operação geral da plataforma.', image: 'https://i.pinimg.com/736x/16/ef/40/16ef40bf188f4227650a664637ee30ab.jpg', detalhes: { pode: [ 'Gerenciar o cadastro de empresas (criação, edição, ativação/inativação).', 'Definir limites e planos de uso por empresa.', 'Visualizar dashboards globais.', 'Gerenciar banco de startups.', 'Gerenciar acessos e permissões globais.', 'Configurar integrações externas.', 'Administrar parâmetros do funil de inovação.', 'Acessar logs e histórico do sistema.', ], naoPode: [], }, }, { id: 'startup', title: 'Startup (Usuário Externo)', description: 'Conectar-se a desafios corporativos e propor soluções.', image: 'https://i.pinimg.com/736x/16/ef/40/16ef40bf188f4227650a664637ee30ab.jpg', detalhes: { pode: [ 'Cadastrar perfil da startup, com informações de tecnologia, estágio, pitch, etc.', 'Visualizar desafios públicos disponíveis.', 'Candidatar-se a desafios compatíveis.', 'Participar de processos de match e convites para POC.', 'Acompanhar histórico de interações com empresas.', ], naoPode: [ 'Acessar dados internos de empresas.', 'Visualizar ideias restritas ou desafios internos.', ], }, }, { id: 'visitante', title: 'Visitante (Público Geral)', description: 'Explorar a vitrine de inovação pública.', image: 'https://i.pinimg.com/736x/16/ef/40/16ef40bf188f4227650a664637ee30ab.jpg', detalhes: { pode: [ 'Visualizar desafios públicos publicados por empresas.', 'Visualizar startups públicas cadastradas.', 'Criar conta (como colaborador ou startup).', ], naoPode: [], }, }, ] 

export default function CardsSection() {
  const [fullscreen, setFullscreen] = useState<string | null>(null)

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
        className="sticky top-0 z-30 bg-background/90 backdrop-blur-md py-4 max-w-3xl mx-auto mb-16 text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Perfis de Usuário</h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          Explore os diferentes níveis de acesso e funcionalidades da plataforma.
        </p>
      </motion.div>

      {/* CARDS 3D RESPONSIVO */}
      <motion.div
        className="flex gap-6 md:gap-8 max-w-full mx-auto px-4 overflow-x-auto lg:justify-center perspective-[1200px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        {sections.map((section, index) => {
          const rotateY =
            index < sections.length / 2
              ? 15 + index * 2
              : -(15 + (sections.length - index - 1) * 2)
          const translateZ = index === Math.floor(sections.length / 2) ? 60 : 0

          return (
            <motion.div
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              whileHover={{
                scale: 1.08,
                rotateY: 0,
                boxShadow: '0px 25px 60px rgba(0,0,0,0.35)',
              }}
              initial={{ rotateY, z: translateZ }}
              transition={{ type: 'spring', stiffness: 120, damping: 15 }}
              className="group relative w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px] cursor-pointer overflow-hidden rounded-3xl shadow-xl bg-card/80 hover:shadow-2xl transition-all duration-700 [transform-style:preserve-3d] flex-shrink-0"
            >
              <div className="relative w-full h-full [transform:translateZ(50px)]">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover rounded-3xl transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 bg-gradient-to-t from-background/90 via-background/30 to-transparent [transform:translateZ(60px)]">
                <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-1">
                  {section.title}
                </h3>
              </div>
            </motion.div>
          )
        })}
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
          className={`relative flex flex-col lg:flex-row items-start gap-8 sm:gap-12 my-16 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24
              ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
        >
          {/* Imagem */}
          <motion.div
            className="relative w-full sm:w-[350px] h-[300px] sm:h-[400px] flex-shrink-0 rounded-3xl overflow-hidden shadow-2xl"
            initial={{ x: index % 2 === 1 ? 30 : -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.03 }}
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
              className="hidden sm:block absolute top-3 right-3 text-white bg-black/60 hover:bg-black/80 p-2 rounded-full transition z-10"
            >
              <Maximize2 size={20} />
            </button>
          </motion.div>

          {/* Texto e detalhes */}
          <motion.div
            className="flex-1 min-w-0 text-left space-y-4"
            initial={{ x: index % 2 === 1 ? -30 : 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-4xl text-purple-600 font-extrabold mb-4">{section.title}</h2>
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

                {section.detalhes.naoPode && section.detalhes.naoPode.length > 0 && (
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-red-600 mb-2">Não pode:</h3>
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

      {/* MODAL FULLSCREEN */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {sections
              .filter((s) => s.id === fullscreen)
              .map((s) => (
                <motion.div
                  key={s.id}
                  className="relative w-full max-w-5xl h-[70vh] sm:h-[80vh] rounded-3xl overflow-hidden shadow-2xl"
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

                  <Image src={s.image} alt={s.title} fill className="object-cover rounded-3xl" />
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
