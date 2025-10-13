import { ChallengeForm } from "@/components/challenges/challenge-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-3 text-balance">Criar Novo Desafio</h1>
          <p className="text-muted-foreground text-lg text-pretty">
            Preencha os campos abaixo para criar um desafio de inovação para sua empresa
          </p>
        </div>
        <ChallengeForm />
      </div>
    </main>
  )
}
