"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreatePOCModal } from "@/components/admin/poc/create-poc"
import { POCCard } from "@/components/admin/poc/poc-card"
import api from "@/lib/kanban/api"
import type { POC, Challenge, Startup } from "@/types/poc"
import { Spinner } from "@/components/ui/shadcn-io/spinner"

export default function POCsPage() {
  const [pocs, setPocs] = useState<POC[]>([])
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [startups, setStartups] = useState<Startup[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [pocsRes, challengesRes, startupsRes] = await Promise.all([
        api.get<POC[]>("/pocs/company"),
        api.get<Challenge[]>("/challenges"),
        api.get<Startup[]>("/startups/all"),
      ])

      setPocs(pocsRes.data)
      setChallenges(challengesRes.data)
      setStartups(startupsRes.data)
    } catch (error) {
      console.error("[v0] Error loading data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePOCCreated = (newPOC: POC) => {
    setPocs([newPOC, ...pocs])
    setIsModalOpen(false)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner variant="bars" className="size-8 text-primary" />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[radial-gradient(circle_at_center,_#f3f3f3_1px,_transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(circle_at_center,_#1e1e1e_1px,_transparent_1px)]">
      <div className="container mx-auto py-8 px-4 relative z-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">POCs</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie as Provas de Conceito da sua empresa
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} size="lg">
            <Plus className="mr-2 size-4" />
            Nova POC
          </Button>
        </div>

        {pocs.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Nenhuma POC encontrada</CardTitle>
              <CardDescription>
                Comece criando sua primeira Prova de Conceito
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pocs.map((poc) => (
              <POCCard
                key={poc.id}
                poc={poc}
                onUpdate={loadData}
                challenges={challenges}
                startups={startups}
              />
            ))}
          </div>
        )}

        <CreatePOCModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          challenges={challenges}
          startups={startups}
          onSuccess={handlePOCCreated}
        />
      </div>
    </div>
  )
}
