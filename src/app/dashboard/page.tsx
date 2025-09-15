"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  const challenges = [
    { title: "Reduzir desperdício na logística", type: "Externo", deadline: "30/09/2025" },
    { title: "Melhorar engajamento interno", type: "Interno", deadline: "15/10/2025" },
  ]

  return (
    <div className="p-6 space-y-8 h-screen min-w-[300px]">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Desafios de Inovação</h1>
        <p className="text-muted-foreground">
          Conecte-se com startups e colaboradores para resolver problemas reais da corporação.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="default">Publicar Desafio</Button>
          <Button variant="outline">Enviar Solução</Button>
        </div>
      </div>

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <Card>
          <CardHeader><CardTitle>12</CardTitle></CardHeader>
          <CardContent>Desafios ativos</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>36</CardTitle></CardHeader>
          <CardContent>Soluções enviadas</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>5</CardTitle></CardHeader>
          <CardContent>Desafios resolvidos</CardContent>
        </Card>
      </div>

      {/* Lista de Desafios */}
      <div className="grid md:grid-cols-2 gap-6">
        {challenges.map((c, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{c.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><b>Tipo:</b> {c.type}</p>
              <p><b>Prazo:</b> {c.deadline}</p>
              <Button className="mt-3">Participar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
