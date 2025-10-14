"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, Lightbulb, Users, ClipboardList } from "lucide-react"

export function KPICards({ kpis }: { kpis: { ideias: number; desafios: number; startups: number; pocs: number } }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[
        { label: "Ideias Capturadas", icon: Lightbulb, value: kpis.ideias },
        { label: "Desafios", icon: ClipboardList, value: kpis.desafios },
        { label: "Startups Conectadas", icon: Users, value: kpis.startups },
        { label: "POCs em andamento", icon: Rocket, value: kpis.pocs },
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
