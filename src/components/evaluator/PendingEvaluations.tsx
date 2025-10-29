"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InlineProgress } from "./InlineProgress";

export function PendingEvaluations() {
  const [filter, setFilter] = useState<"Todos" | "Pendente" | "Em Avaliação">("Todos");

  const pendingEvaluations = [
    { name: "Startup A", status: "Pendente", deadline: "15/10/2025" },
    { name: "Startup B", status: "Pendente", deadline: "18/10/2025" },
    { name: "Startup C", status: "Em Avaliação", deadline: "20/10/2025" },
  ];

  const filtered =
    filter === "Todos"
      ? pendingEvaluations
      : pendingEvaluations.filter((e) => e.status === filter);

  return (
    <Card className="rounded-xl border shadow-sm w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <CardTitle>Avaliações Pendentes</CardTitle>
          <div className="mt-3 sm:mt-0 flex gap-2">
            {(["Todos", "Pendente", "Em Avaliação"] as const).map((f) => (
              <Button
                key={f}
                size="sm"
                variant={filter === f ? "default" : "ghost"}
                onClick={() => setFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {filtered.length === 0 ? (
          <p className="text-sm">Nenhuma avaliação encontrada.</p>
        ) : (
          filtered.map((item, i) => (
            <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm">{item.deadline}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24">
                  <InlineProgress value={item.status === "Pendente" ? 30 : 70} />
                </div>
                <Button size="sm" variant="outline">
                  Avaliar Agora
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
