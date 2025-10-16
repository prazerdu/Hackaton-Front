"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, Lightbulb, ClipboardList } from "lucide-react"

export function KPICards({ kpis }: { kpis: { totalIdeas: number; totalStartupsConnected: number; totalPocs: number; } }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[
        { label: "Ideias Capturadas", icon: Lightbulb, value: kpis.totalIdeas },
        { label: "Desafios", icon: ClipboardList, value: kpis.totalStartupsConnected },
        { label: "POCs em andamento", icon: Rocket, value: kpis.totalStartupsConnected },
      ].map((item, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
