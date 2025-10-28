'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'



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
]

export default function UserCarousel() {
  const [index, setIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.scrollTo({
      left: index * (el.clientWidth + 24),
      behavior: 'smooth',
    })
  }, [index])

  const prev = () => setIndex((i) => (i > 0 ? i - 1 : i))
  const next = () => setIndex((i) => (i < sections.length - 1 ? i + 1 : i))

  return (
    <section className="w-full py-16 sm:py-24 bg-gray-50">
      {/* Título */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-600 mb-2">
          Perfis de Usuário
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">
          Explore os diferentes níveis de acesso e funcionalidades da plataforma.
        </p>
      </div>

      {/* Carrossel */}
      <div className="relative max-w-4xl mx-auto">
        <div className="overflow-hidden rounded-3xl shadow-lg">
          <div
            ref={containerRef}
            className="flex gap-6 transition-all duration-500"
          >
            {sections.map((section, i) => (
              <motion.div
                key={section.id}
                className="min-w-full flex-shrink-0 bg-white rounded-3xl p-6 flex flex-col md:flex-row items-start gap-6"
                initial={{ opacity: 0.5, x: 50 }}
                animate={{ opacity: index === i ? 1 : 0.5, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Imagem */}
                <div className="relative w-full md:w-56 h-56 flex-shrink-0 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Informações */}
                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-bold text-purple-600 mb-2">
                    {section.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{section.description}</p>

                  <div className="flex flex-col sm:flex-row gap-6">
                    {section.detalhes.pode && (
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-600 mb-1">Pode:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          {section.detalhes.pode.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {section.detalhes.naoPode && section.detalhes.naoPode.length > 0 && (
                      <div className="flex-1">
                        <h4 className="font-semibold text-red-600 mb-1">Não pode:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          {section.detalhes.naoPode.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navegação */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
          <button
            onClick={prev}
            className="bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md text-xl text-purple-600 transition"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md text-xl text-purple-600 transition"
          >
            ›
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center mt-4 gap-2">
          {sections.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition ${
                i === index ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
