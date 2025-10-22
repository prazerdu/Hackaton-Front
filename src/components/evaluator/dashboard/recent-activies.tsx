"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivities({ atividades }: { atividades: { id: number; titulo: string; detalhe: string; data: string }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {atividades.map((item) => (
            <li key={item.id} className="flex justify-between">
              <div>
                <p className="font-medium">{item.titulo}</p>
                <p className="text-sm text-muted-foreground">{item.detalhe}</p>
              </div>
              <span className="text-sm text-muted-foreground">{item.data}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
