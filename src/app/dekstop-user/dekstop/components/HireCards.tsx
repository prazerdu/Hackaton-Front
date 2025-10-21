"use client";

import { useState, ReactNode, useEffect } from "react";
import {
  LeafIcon,
  SproutIcon,
  HeartPulseIcon,
  RocketIcon,
  SearchIcon,
  MailIcon,
  TargetIcon,
  InfoIcon,
  UsersIcon,
  CalendarIcon,
  BadgeCheckIcon,
  BriefcaseIcon,
  GiftIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Drop from "@/components/drop";
import Alert from "@/components/alert";
import { cn } from "@/lib/utils";
import NavDropDown from "@/components/navDrop";

type Challenge = {
  id: string;
  corporation: { name: string; logo: string; verified?: boolean };
  category: string;
  problem: string;
  goal: string;
  description: string;
  reward: string;
  deadline: string;
  participants: number;
  likes: number;
  comments: number;
  shares: number;
};

const ChallengeDialog = ({ challenge }: { challenge: Challenge }) => {
  const [accepted, setAccepted] = useState(false);
  const [participants, setParticipants] = useState(challenge.participants);
  const [showAlert, setShowAlert] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    setParticipants((prev) => prev + 1);
    setShowAlert(true);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <>
      {showAlert && (
        <Alert
          title="Solicitação enviada!"
          description="Sua participação neste desafio foi registrada com sucesso."
          onClose={() => setShowAlert(false)}
        />
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Card className="relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-white shadow-gray-200 to-gray-50 dark:from-zinc-900 dark:to-zinc-950 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100/20 via-transparent to-transparent dark:from-indigo-500/10" />
            <CardHeader className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                <Avatar className="ring-2 ring-indigo-500/40 w-10 h-10">
                  <AvatarImage src={challenge.corporation.logo} alt={challenge.corporation.name} />
                  <AvatarFallback>{challenge.corporation.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="flex items-center gap-1 text-sm font-semibold truncate">
                    {challenge.corporation.name}
                    {challenge.corporation.verified && <BadgeCheckIcon className="size-4 text-sky-500" />}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Corporação Parceira
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Badge
                variant="secondary"
                className="text-xs bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
              >
                {challenge.category}
              </Badge>
              <div>
                <p className="font-semibold text-red-600 text-xs">Problema</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{challenge.problem}</p>
              </div>
              <div>
                <p className="font-semibold text-green-600 text-xs flex items-center gap-1">
                  <TargetIcon className="size-4" /> Objetivo
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{challenge.goal}</p>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>

        {/* Modal ajustado */}
        <DialogContent className="w-full max-w-4xl sm:max-w-3xl  h-auto sm:max-h-full p-4 md:p-6 overflow-y-auto backdrop-blur-md bg-white/90 dark:bg-zinc-900/90 border border-white/20 shadow-2xl rounded-2xl transition-all duration-300">
          {/* Header modal */}
          <div className="bg-gradient-to-r border-b px-4 md:px-6 py-4 md:py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 md:w-12 md:h-12 ring-2 ring-white/40">
                <AvatarImage src={challenge.corporation.logo} />
                <AvatarFallback>{challenge.corporation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-md md:text-lg font-semibold flex items-center gap-1">
                  {challenge.corporation.name}
                  {challenge.corporation.verified && <BadgeCheckIcon className="size-5 text-white" />}
                </DialogTitle>
                <DialogDescription className="text-xs md:text-sm">
                  Desafio corporativo — {challenge.category}
                </DialogDescription>
              </div>
            </div>
            <Badge className="text-white text-xs px-2 md:px-3 py-1 rounded-full">
              {participants} participantes
            </Badge>
          </div>

          {/* Conteúdo modal */}
          <div className="p-4 md:p-6 space-y-4 md:space-y-6 text-sm">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-4 md:space-y-6">
                <div className="border-l-4 pl-3 md:pl-4 py-2 md:py-3 shadow rounded-lg border-red-500 bg-red-50 dark:bg-red-900/30 hover:shadow-md">
                  <p className="font-semibold text-red-500 flex items-center gap-1">
                    <InfoIcon className="w-4 h-4 md:w-5 md:h-5" /> Problema
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-1 text-xs md:text-sm">{challenge.problem}</p>
                </div>

                <div className="border-l-4 pl-3 md:pl-4 py-2 md:py-3 shadow rounded-lg border-green-500 bg-green-50 dark:bg-green-900/30 hover:shadow-md">
                  <p className="font-semibold text-green-500 flex items-center gap-1">
                    <TargetIcon className="w-4 h-4 md:w-5 md:h-5" /> Objetivo
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-1 text-xs md:text-sm">{challenge.goal}</p>
                </div>

                <div className="border-l-4 pl-3 md:pl-4 py-2 md:py-3 shadow rounded-lg border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 hover:shadow-md">
                  <p className="font-semibold text-indigo-500 flex items-center gap-1">
                    <BriefcaseIcon className="w-4 h-4 md:w-5 md:h-5" /> Categoria
                  </p>
                  <Badge
                    variant="secondary"
                    className="bg-indigo-100 text-indigo-800 mt-1 dark:bg-indigo-900/30 dark:text-indigo-200 text-xs md:text-sm"
                  >
                    {challenge.category}
                  </Badge>
                </div>
              </div>

              <div className="rounded-xl border bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-800 dark:to-zinc-900 p-3 md:p-4 shadow-inner text-xs md:text-sm overflow-auto">
                <p>{challenge.description}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-100 to-yellow-50 dark:from-yellow-900/30 dark:to-amber-950/10 border border-yellow-200 dark:border-yellow-800 p-3 md:p-4 rounded-xl flex items-center gap-2 md:gap-3 text-xs md:text-sm">
              <GiftIcon className="text-yellow-600 dark:text-yellow-400 w-5 h-5 md:w-6 md:h-6" />
              <div>
                <p className="font-semibold text-yellow-700 dark:text-yellow-300">Recompensa</p>
                <p className="truncate">{challenge.reward}</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-2 md:pt-4 border-t text-xs md:text-sm text-muted-foreground gap-2 md:gap-0">
              <div className="flex items-center gap-2">
                <UsersIcon className="w-4 h-4 md:w-5 md:h-5" /> {participants} startups inscritas
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 md:w-5 md:h-5" /> Até {challenge.deadline}
              </div>
            </div>

            <Button
              onClick={handleAccept}
              disabled={accepted}
              className={cn(
                "w-full text-white font-semibold py-3 md:py-5 rounded-xl shadow-md transition-all duration-300 text-sm md:text-base",
                accepted ? "bg-blue-800 hover:bg-blue-900 cursor-default" : "bg-indigo-600 hover:bg-indigo-700"
              )}
            >
              {accepted ? "Solicitação enviada!" : "Solicitar participação"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const ChallengesList = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories: { name: string; icon: ReactNode }[] = [
    { name: "Logística e Sustentabilidade", icon: <LeafIcon className="size-4 mr-1 text-green-600" /> },
    { name: "Agricultura e Tecnologia", icon: <SproutIcon className="size-4 mr-1 text-lime-600" /> },
    { name: "Saúde Digital", icon: <HeartPulseIcon className="size-4 mr-1 text-pink-600" /> },
    { name: "Inovação e Transformação Digital", icon: <RocketIcon className="size-4 mr-1 text-indigo-600" /> },
  ];

  const challenges: Challenge[] = [
    {
      id: "1",
      corporation: { name: "EcoLogística", logo: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png", verified: true },
      category: "Logística e Sustentabilidade",
      problem: "Alto custo de combustível e impacto ambiental elevado.",
      goal: "Reduzir emissões de carbono no transporte de cargas.",
      description: "Buscamos soluções inovadoras para otimização de rotas e uso de energias limpas.",
      reward: "🏆 R$ 100.000 + contrato de 12 meses",
      deadline: "30/11/2025",
      participants: 42,
      likes: 230,
      comments: 45,
      shares: 18,
    },
    {
      id: "2",
      corporation: { name: "AgroFuturo", logo: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png" },
      category: "Agricultura e Tecnologia",
      problem: "Dificuldade em monitorar plantações e prever pragas.",
      goal: "Criar soluções digitais para monitoramento remoto e previsão de riscos.",
      description: "Startups de IA, sensores IoT ou apps são bem-vindas.",
      reward: "💰 R$ 50.000 + parceria estratégica",
      deadline: "15/12/2025",
      participants: 28,
      likes: 190,
      comments: 30,
      shares: 10,
    },
  ];

  const filteredChallenges = challenges.filter((c) => {
    const matchesSearch =
      c.corporation.name.toLowerCase().includes(search.toLowerCase()) ||
      c.problem.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "" || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4 w-full min-h-[70vh] flex flex-col">
      <div className="flex items-center justify-center mt-3 gap-2 max-w-[700px] mx-auto">
        <div className="relative p-1 flex-1 min-w-[250px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar desafios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full text-foreground rounded-xl pr-12"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Drop categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          </div>
        </div>
        <NavDropDown />
      </div>

      {filteredChallenges.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1300px] mx-auto">
          {filteredChallenges.map((challenge) => (
            <ChallengeDialog key={challenge.id} challenge={challenge} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center text-gray-500 dark:text-gray-400 px-4">
          <div className="text-7xl animate-bounce">🚀</div>
          <h2 className="text-2xl md:text-3xl font-bold">Nenhum desafio encontrado</h2>
          <p className="max-w-md text-sm md:text-base">
            Parece que ainda não há desafios cadastrados. Você pode criar seu próprio desafio ou entrar em contato para começar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button className="flex items-center gap-2 border border-gray-400 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-zinc-800">
              <MailIcon className="w-5 h-5" />
              Entrar em contato
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengesList;
