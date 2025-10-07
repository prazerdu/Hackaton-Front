"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts"

export default function EvaluatorHomePage() {
  const [pocsData] = useState([
    { name: "Em andamento", value: 42 },
    { name: "Concluídas", value: 18 },
    { name: "Canceladas", value: 7 },
  ])

  const [sectorsData] = useState([
    { name: "Energia", startups: 25 },
    { name: "Saúde", startups: 18 },
    { name: "Educação", startups: 12 },
    { name: "Financeiro", startups: 20 },
  ])

  const COLORS = ["#2563eb", "#22c55e", "#ef4444"]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Painel do Avaliador</h1>
      </header>

      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Startups Cadastradas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">75</p>
            <p className="text-sm text-muted-foreground">+12 este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>POCs em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">42</p>
            <p className="text-sm text-muted-foreground">Taxa de conclusão: 65%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avaliações Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">15</p>
            <p className="text-sm text-muted-foreground">3 críticas urgentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distribuição das POCs */}
        <Card>
          <CardHeader>
            <CardTitle>Status das POCs</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pocsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pocsData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Startups por setor */}
        <Card>
          <CardHeader>
            <CardTitle>Startups por Setor</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={sectorsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="startups" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
