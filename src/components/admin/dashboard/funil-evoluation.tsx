"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

export function FunnelEvolutionChart({ data }: { data: { etapa: string; total: number }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução do Funil</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.56 0.25 302)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="oklch(0.56 0.25 302)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="etapa" />
            <YAxis allowDecimals={false} />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="total"
              stroke="oklch(0.56 0.25 302)"
              fillOpacity={1}
              fill="url(#colorTotal)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
