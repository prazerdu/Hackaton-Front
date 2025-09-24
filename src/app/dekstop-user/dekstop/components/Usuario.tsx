import Image from "next/image"

export default function Usuario() { 
    return (
        <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden sm:flex flex-col text-right">
          <span className="text-sm font-medium">Usuario X</span>
          <span className="text-xs text-gray-400">ver perfil</span>
        </div>
        <Image
          src="https://i.pinimg.com/1200x/d2/25/07/d2250772dc3221bfe9ed14d1d4cf0ec7.jpg"
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
    )
}