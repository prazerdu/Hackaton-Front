'use client'

import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

type JwtPayload = {
  exp: number
}

export default function GoogleButton() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token)
        const now = Date.now() / 1000

        if (decoded.exp > now) {
          router.push('/')
        } else {
          localStorage.removeItem('token')
        }
      } catch (error) {
        console.error('Token inválido:', error)
        localStorage.removeItem('token')
      }
    }
  }, [router])

  // Login com Google
  const LoginSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      console.log('URL usada:', `${process.env.NEXT_PUBLIC_API_URL}/auth/google`)
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
        { credential: credentialResponse.credential },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )

      const token = res.data.token
      if (token) {
        localStorage.setItem('accessToken', token)
        router.push('/')
      } else {
        console.error('Token ausente')
      }
    } catch (error) {
      console.error('Erro ao fazer login com o Google:', error)
    }
  }

  if (!isClient) return null

  return (
    <div className="items-center justify-between">
      <button>
        <GoogleLogin
          onSuccess={LoginSuccess}
          onError={() => console.error('Login com Google falhou')}
          logo_alignment="center"
        />
      </button>
    </div>
  )
}
