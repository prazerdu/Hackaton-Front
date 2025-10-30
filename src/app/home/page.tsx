"use client"

import { useState, useEffect } from "react"
import axios, { AxiosResponse } from "axios"

import SearchBar from "@/components/home/search-bar"
import PublicChallengeCard from "@/components/home/public-challenges"
import { ModeToggle } from "@/components/theme-toggle"
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import { LogoutButton } from "@/components/log-out"
import { BackButton } from "@/components/back-button"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { GridPattern } from "@/components/ui/shadcn-io/grid-pattern"
import { cn } from "@/lib/utils"

type Challenge = {
  id: string
  title: string
  description: string
  objectives: string
  area: string
  status: string
  endDate: string
  isPublic: boolean
  company: { name: string }
  createdBy: { name: string }
}

export default function ChallengesPage() {
  const [search, setSearch] = useState("")
  const [selectedArea, setSelectedArea] = useState("")
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [areas, setAreas] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [, setError] = useState<string | null>(null)
  const [hasToken, setHasToken] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    setHasToken(!!token)
  }, [])

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        if (!apiUrl) throw new Error("API URL não definida em NEXT_PUBLIC_API_URL")

        const response: AxiosResponse<Challenge[]> = await axios.get(
          `${apiUrl}/challenges/publics`
        )

        setChallenges(response.data)

        const uniqueAreas: string[] = Array.from(
          new Set(response.data.map((c) => c.area))
        )
        setAreas(uniqueAreas)

        setError(null)
      } catch (err) {
        console.error("Erro ao carregar desafios:", err)
        setError("Erro ao carregar desafios.")
      } finally {
        setLoading(false)
      }
    }

    fetchChallenges()
  }, [])

  const filteredChallenges = challenges.filter((c) => {
    const searchLower = search.toLowerCase()
    const matchesSearch =
      c.title.toLowerCase().includes(searchLower) ||
      c.description.toLowerCase().includes(searchLower) ||
      c.objectives.toLowerCase().includes(searchLower)
    const matchesArea = selectedArea === "" || c.area === selectedArea
    return matchesSearch && matchesArea
  })

  const handleLogin = () => router.push("/auth/login")

  return (
    <div className="relative top-0 p-0 m-0 w-full min-h-screen flex flex-col overflow-hidden">
      {/* === GRID PATTERN BACKGROUND === */}
      <div className="absolute inset-0 -z-10">
        <GridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
          ]}
          className={cn(
            "opacity-30 text-primary/10",
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
            "scale-125"
          )}
        />
      </div>

      <div className="absolute left-4 top-4 z-10">
        <BackButton />
      </div>

      <div className="flex items-center justify-center mt-10 gap-2 max-w-[700px] mx-auto z-10">
        <SearchBar
          search={search}
          setSearch={setSearch}
          areas={areas}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
        />
        <ModeToggle />
        {hasToken ? (
          <LogoutButton />
        ) : (
          <Button onClick={handleLogin} variant="outline">
            Login
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center items-center">
              <Spinner className="text-primary" variant="bars" />
            </div>
            <p className="mt-4 text-muted-foreground">Carregando desafios...</p>
          </div>
        </div>
      ) : filteredChallenges.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1300px] mx-auto mt-8 z-10">
          {filteredChallenges.map((challenge) => (
            <PublicChallengeCard
              key={challenge.id}
              challenge={challenge}
              startupId={""}
            />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center text-gray-500 dark:text-gray-400 px-4 z-10">
          <div className="text-7xl animate-bounce">🚀</div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Nenhum desafio encontrado
          </h2>
          <p className="max-w-md text-sm md:text-base">
            Parece que ainda não há desafios cadastrados.
          </p>
        </div>
      )}
    </div>
  )
}
