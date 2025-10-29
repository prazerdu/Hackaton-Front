'use client'

import {
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  MapPin,
  Globe,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'
import Logo from '@/components/shadcn-studio/logo'

const data = {
  facebookLink: 'https://www.facebook.com/ninna.hub',
  instaLink: 'https://www.instagram.com/ninna.hub/',
  linkedinLink: 'https://www.linkedin.com/company/ninnahub/',
  whatsappLink: 'https://wa.me/558532114201',
  siteLink: 'https://ninnahub.com.br/',
  contact: {
    email: 'hello@mvpblocks.com',
    phone: '+55 85 3211-4201',
    address: 'Av. Dom Manuel, 1020 - Centro, Fortaleza - CE',
    mapLink:
      'https://www.google.com/maps/dir//NINNA+Hub+Av.+Dom+Manuel,+1020+-+Centro+Fortaleza+-+CE+60060-090/',
  },
}

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: data.facebookLink },
  { icon: Instagram, label: 'Instagram', href: data.instaLink },
  { icon: Linkedin, label: 'LinkedIn', href: data.linkedinLink },
  { icon: FaWhatsapp, label: 'WhatsApp', href: data.whatsappLink },
  { icon: Globe, label: 'Site Oficial', href: data.siteLink },
]

const contactInfo = [
  { icon: Phone, text: data.contact.phone, href: `tel:${data.contact.phone}` },
  { icon: MapPin, text: data.contact.address, href: data.contact.mapLink },
]

export default function Footer() {
  return (
    <footer className="bg-secondary dark:bg-secondary/20 w-full rounded-t-2xl shadow-inner border-t border-border/20">
      <div className="mx-auto max-w-screen-xl px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-8 items-center sm:items-start text-center sm:text-left">

          {/* Coluna Esquerda */}
          <div className="flex flex-col items-center sm:items-start gap-3 w-full sm:w-auto">
            <Logo className="text-sm" />

            {/* Social Links */}
            <ul className="mt-3 flex flex-wrap justify-center sm:justify-start gap-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target="_blank"
                    className="group inline-flex items-center justify-center transition-transform duration-300"
                  >
                    <span className="sr-only">{label}</span>
                    <Icon
                      className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-violet-400 group-hover:text-primary transition-colors duration-300 group-hover:scale-110"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Descrição */}
            <p className="text-gray-800 dark:text-gray-200 mt-3 text-sm sm:text-base max-w-sm leading-relaxed">
              Conectamos tecnologia e negócios com soluções inovadoras,
              entregando resultados estratégicos para empresas de todos os
              tamanhos.
            </p>
          </div>

          {/* Coluna Direita (Contatos) */}
          <div className="flex flex-col items-center sm:items-start gap-4 w-full sm:w-auto">
            <p className="sm:text-lg font-semibold text-black dark:text-violet-400">
              Contatos
            </p>

            <ul className="flex flex-col items-center sm:items-start gap-3">
              {contactInfo.map(({ icon: Icon, text, href }) => (
                <li
                  key={text}
                  className="flex items-center gap-2 hover:text-black transition-colors text-gray-800 dark:text-gray-300"
                >
                  <Link href={href} target="_blank" className="flex dark:hover:text-violet-400 items-center gap-2">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 dark:text-violet-400 text-black/80" />
                    <span className="text-sm sm:text-base">{text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="mt-8 border-t border-border/30 pt-4 text-center text-xs sm:text-sm text-gray-700 dark:text-gray-400">
          © {new Date().getFullYear()} Ninna Hub.{' '}
          <Link
            href={data.siteLink}
            target="_blank"
            className="hover:underline hover:text-primary transition-colors"
          >
            ninnahub.com.br
          </Link>
        </div>
      </div>
    </footer>
  )
}
