// components/logos/UserSVGs.tsx
'use client'

import type { SVGAttributes } from 'react'

// Avaliador (inspiração na primeira imagem)
export const AvaliadorLogo = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="100" cy="100" r="100" className="fill-yellow-400 dark:fill-yellow-600" />
      <rect x="50" y="60" width="100" height="20" rx="5" className="fill-black dark:fill-white" />
      <rect x="50" y="120" width="100" height="20" rx="5" className="fill-black dark:fill-white" />
      <circle cx="70" cy="80" r="8" className="fill-white dark:fill-black" />
      <circle cx="130" cy="80" r="8" className="fill-white dark:fill-black" />
      <path
        d="M70 140 Q100 170 130 140"
        stroke="black"
        strokeWidth="5"
        className="dark:stroke-white"
        fill="transparent"
      />
    </svg>
  )
}


export const StartupLogo = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="100" cy="100" r="100" className="fill-green-400 dark:fill-green-700" />
      <path
        d="M50 120 Q100 50 150 120"
        stroke="black"
        strokeWidth="5"
        className="dark:stroke-white"
        fill="transparent"
      />
      <circle cx="70" cy="90" r="10" className="fill-black dark:fill-white" />
      <circle cx="130" cy="90" r="10" className="fill-black dark:fill-white" />
      <rect x="80" y="130" width="40" height="20" rx="4" className="fill-black dark:fill-white" />
    </svg>
  )
}
