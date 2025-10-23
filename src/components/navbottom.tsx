'use client'

import { Facebook, Instagram, Linkedin, Phone, MapPin, Globe } from 'lucide-react'
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
      'https://www.google.com/maps/dir//NINNA+Hub+Av.+Dom+Manuel,+1020+-+Centro+Fortaleza+-+CE+60060-090/@-3.7329715,-38.5227375,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x7c74960777bcbad:0xfe9c6b7989ba92a3',
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
    <footer className="bg-secondary dark:bg-secondary/20 w-full rounded-t-xl">
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-8 items-center sm:items-start">

          {/* Coluna esquerda: Logo e social links */}
          <div className="flex flex-col items-center sm:items-start gap-2 w-full sm:w-auto">
            <Logo className="text-sm" />

            {/* Social Links: sempre visíveis, mas em linha no mobile */}
            <ul className="mt-2 flex flex-row flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 text-violet-400 text-lg sm:text-xl">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <Link href={href} target="_blank" className="hover:text-primary transition">
                    <span className="sr-only">{label}</span>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Descrição só em telas maiores */}
            <p className="text-foreground/60 mt-2 text-center sm:text-left text-sm sm:text-base max-w-xs sm:max-w-md leading-relaxed hidden sm:block">
              Conectamos tecnologia e negócios com soluções inovadoras, entregando resultados estratégicos para empresas de todos os tamanhos.
            </p>
          </div>

          <div className="flex flex-col  items-center sm:items-start gap-2 w-full sm:w-auto">
            <p className="text-base sm:text-lg font-medium mb-4 text-violet-400 hidden sm:block">Contatos</p>

            {/* Lista de contatos */}
            <ul className="flex justify-center text-violet-400 sm:flex-col sm:items-start gap-3  w-full sm:w-auto">
              {contactInfo.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-center justify-center sm:justify-start gap-2 w-auto">
                  <Link href={href} target="_blank" className="flex items-center gap-1 hover:underline">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    {/* Texto do contato só em desktop */}
                    <span className="hidden sm:inline text-sm">{text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="mt-4 border-t border-border-subtle pt-2 text-center text-xs sm:text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ninna Hub.{' '}
          <Link href={data.siteLink} target="_blank" className="hover:underline">
            ninnahub.com.br
          </Link>
        </div>
      </div>
    </footer>
  )
}
