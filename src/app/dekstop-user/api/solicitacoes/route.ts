// src/app/dekstop-user/api/solicitacoes/route.ts
import { NextRequest, NextResponse } from "next/server";

// Array em memória para armazenar solicitações
let solicitacoes: { id: number; desafio: string; data: string; status: string }[] = [];

export async function GET() {
  return NextResponse.json(solicitacoes);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { desafio } = body;

  if (!desafio) {
    return NextResponse.json({ error: "Desafio é obrigatório" }, { status: 400 });
  }

  const novaSolicitacao = {
    id: solicitacoes.length + 1,
    desafio,
    data: new Date().toLocaleDateString("pt-BR"),
    status: "pendente",
  };

  solicitacoes.push(novaSolicitacao);

  return NextResponse.json(novaSolicitacao);
}
