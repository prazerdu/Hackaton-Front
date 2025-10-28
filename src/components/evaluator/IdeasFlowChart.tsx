"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export function IdeasFlowChart() {
  const chartData = [
    { fase: "Geração/Captura de Ideias", count: 10 },
    { fase: "Pré-Triagem", count: 7 },
    { fase: "Ideação", count: 5 },
    { fase: "Triagem Detalhada", count: 3 },
    { fase: "Experimentação (POC)", count: 2 },
  ];

  return (
    <Card className="rounded-xl border shadow-sm w-full">
      <CardHeader>
        <CardTitle>Fluxo de Ideias</CardTitle>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 40 }}>
            <XAxis
              dataKey="fase"
              tick={{ fontSize: 12 }}
              interval={0}
              tickMargin={10}
              tickFormatter={(value) =>
                value.length > 15 ? value.split(" ").slice(0, 2).join(" ") + "..." : value
              }
            />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#3b82f6" fill="#93c5fd" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
