"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function StatsCards() {
  const stats = [
    { title: "Desafios Ativos", value: 5 },
    { title: "POCs em Avaliação", value: 2 },
    { title: "Startups Conectadas", value: 8 },
    { title: "Ideias Recebidas", value: 12 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <Card key={i} className="rounded-xl border shadow-sm p-4">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium">{s.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-1">
            <p className="text-3xl sm:text-4xl font-bold">{s.value}</p>
            <div className="h-1 w-12 mt-2 rounded-full bg-blue-500" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
