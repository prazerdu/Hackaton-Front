"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface ProgressProps {
  value: number;
}

function Progress({ value }: ProgressProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
      <div
        className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function ProjectCards() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // cards principais
  const projects = [
    {
      id: 1,
      title: "Desafios Solicitados",
      progress: 50,
      icon: "/icons/interview.png",
      highlight: true,
      description: "Solicitações pendentes.",
      count: 12,
      isImage: true,
      type: "solicitacoes",
    },
    {
      id: 2,
      title: "Desafios Completos",
      progress: 80,
      icon: "/icons/checklist.png",
      highlight: false,
      description: "Desafios já finalizados.",
      count: 34,
      isImage: true,
      type: "completos",
    },
  ];

  const solicitacoes = [
    { id: 1, desafio: "Desafio Front-end", data: "20/09/2025", status: "pendente" },
    { id: 2, desafio: "Desafio UX Design", data: "18/09/2025", status: "aprovado" },
    { id: 3, desafio: "Desafio de Dados", data: "15/09/2025", status: "recusado" },
  ];

  const renderStatus = (status: string) => {
    switch (status) {
      case "pendente":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 flex items-center gap-1 h-5 text-[10px] px-2">
            <Clock className="w-3 h-3" /> Pendente
          </Badge>
        );
      case "aprovado":
        return (
          <Badge className="bg-green-100 text-green-700 flex items-center gap-1 h-5 text-[10px] px-2">
            <CheckCircle className="w-3 h-3" /> Aprovado
          </Badge>
        );
      case "recusado":
        return (
          <Badge className="bg-red-100 text-red-700 flex items-center gap-1 h-5 text-[10px] px-2">
            <XCircle className="w-3 h-3" /> Recusado
          </Badge>
        );
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 max-w-md mx-auto lg:w-[250px] lg:h-[350px]">
      {projects.map((project) => (
        <Dialog key={project.id}>
          <DialogTrigger asChild>
            <Card
              onClick={() => setSelectedProject(project)}
              className={`cursor-pointer p-6 transition-transform hover:scale-[1.02] ${
                project.highlight ? "bg-blue-900 text-white" : ""
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
                {project.isImage ? (
                  <Image
                    src={project.icon}
                    alt={project.title}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-lg">{project.icon}</span>
                )}
                <Badge
                  className={`text-[10px] px-2 ${
                    project.highlight
                      ? "bg-blue-700 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {project.count}x
                </Badge>
              </CardHeader>

              <CardContent className="p-0 space-y-2">
                <CardTitle className="text-sm font-semibold">
                  {project.title}
                </CardTitle>
                <CardDescription
                  className={`text-xs ${
                    project.highlight ? "text-blue-200" : "text-gray-500"
                  }`}
                >
                  {project.description}
                </CardDescription>

                <div className="lg:mt-2">
                  <Progress value={project.progress} />
                  <p
                    className={`text-right text-[10px] lg:mt-2 font-semibold ${
                      project.highlight ? "text-blue-100" : "text-gray-700"
                    }`}
                  >
                    {project.progress}%
                  </p>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{project.title}</DialogTitle>
            </DialogHeader>

            {project.type === "solicitacoes" ? (
              <div className="space-y-3">
                {solicitacoes.map((s) => (
                  <div
                    key={s.id}
                    className="p-3 bg-gray-50 rounded-xl flex items-center justify-between"
                  >
                    <div>
                      <h2 className="text-xs font-semibold">{s.desafio}</h2>
                      <p className="text-[10px] text-gray-500">Enviado em {s.data}</p>
                    </div>
                    {renderStatus(s.status)}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-600">
                Aqui você pode mostrar estatísticas ou detalhes dos desafios completos.
              </p>
            )}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
