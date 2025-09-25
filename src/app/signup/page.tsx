'use client'

import { SignUpForm } from "@/components/signup-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 px-6 py-9 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="https://ninnahub.com.br/" className="block sm:hidden md:hidden items-center font-medium">
            <Image
              className="dark:invert"
              src="/ninna-lightmode.png"
              alt="Ninna"
              width={180}
              height={38}
              priority
            />  
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm/>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <video
          src="/NinnaBGVideo.mp4"
          autoPlay
          loop
          muted
          className="object-cover w-full min-h-screen mr-5"
        />
      </div>
    </div>
  )
}