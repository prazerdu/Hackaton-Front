"use client";

import { StatsCards } from "@/components/evaluator/StatsCards";
import { IdeasFlowChart } from "@/components/evaluator/IdeasFlowChart";
import { IdeaPhasesCards } from "@/components/evaluator/IdeaPhasesCards";
import { PendingEvaluations } from "@/components/evaluator/PendingEvaluations";

export default function DashboardPage() {
  return (
    <div className="space-y-10 p-6 min-h-screen">
      <h1 className="text-3xl font-bold tracking-tight">Painel do Avaliador</h1>
      <StatsCards />
      <IdeasFlowChart />
      <IdeaPhasesCards />
      <PendingEvaluations />
    </div>
  );
}
