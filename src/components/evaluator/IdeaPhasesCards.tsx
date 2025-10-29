"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function IdeaPhasesCards() {
  const ideaPhases = [
    { title: "Geração/Captura de Ideias", value: 10 },
    { title: "Pré-Triagem", value: 7 },
    { title: "Ideação", value: 5 },
    { title: "Triagem Detalhada", value: 3 },
    { title: "Experimentação (POC)", value: 2 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
      {ideaPhases.map((phase, i) => (
        <Card key={i} className="rounded-xl border shadow-sm p-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-center">{phase.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-3xl font-bold">{phase.value}</p>
            <div className="h-1 w-12 mt-2 mx-auto rounded-full bg-blue-500" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
