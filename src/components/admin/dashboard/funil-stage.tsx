"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts"

export function FunnelStageChart({ data }: { data: { etapa: string; total: number }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ideias por etapa</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="etapa" />
            <YAxis allowDecimals={false}/>
            <Tooltip />
            <Bar dataKey="total" fill="oklch(0.56 0.25 302)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
