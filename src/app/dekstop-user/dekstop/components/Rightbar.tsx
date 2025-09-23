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
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface ProgressProps {
  value: number;
}

function Progress({ value }: ProgressProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      ></div>
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
      description: "Solicitações pendentes para serem aceitas.",
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
      description: "Quantidade de desafios já finalizados.",
      count: 34,
      isImage: true,
      type: "completos",
    },
  ];

  // solicitações (exemplo)
  const solicitacoes = [
    {
      id: 1,
      desafio: "Desafio Front-end",
      data: "20/09/2025",
      status: "pendente",
    },
    {
      id: 2,
      desafio: "Desafio UX Design",
      data: "18/09/2025",
      status: "aprovado",
    },
    {
      id: 3,
      desafio: "Desafio de Dados",
      data: "15/09/2025",
      status: "recusado",
    },
  ];

  const renderStatus = (status: string) => {
    switch (status) {
      case "pendente":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
            <Clock className="w-4 h-4 mr-1" /> Pendente
          </Badge>
        );
      case "aprovado":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <CheckCircle className="w-4 h-4 mr-1" /> Aprovado
          </Badge>
        );
      case "recusado":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-700">
            <XCircle className="w-4 h-4 mr-1" /> Recusado
          </Badge>
        );
    }
  };

  return (
    <div className="flex lg:flex-col gap-8 max-w-lg mx-auto p-4">
      {projects.map((project) => (
        <Dialog key={project.id}>
          <DialogTrigger asChild>
            <div
              onClick={() => setSelectedProject(project)}
              className={`p-5 rounded-2xl shadow-md flex flex-col justify-between lg:w-[250px] transition-transform duration-300 hover:scale-[1.02] cursor-pointer ${
                project.highlight
                  ? "bg-blue-900 text-white"
                  : "bg-white text-gray-900 border border-gray-200"
              }`}
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between">
                  {project.isImage ? (
                    <Image
                      src={project.icon}
                      alt={project.title}
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-2xl">{project.icon}</span>
                  )}

                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      project.highlight
                        ? "bg-blue-700 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {project.count}x
                  </span>
                </div>
                <h3 className="font-semibold text-base mt-3 leading-snug">
                  {project.title}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    project.highlight ? "text-blue-200" : "text-gray-500"
                  }`}
                >
                  {project.description}
                </p>
              </div>

              <div className="mt-4">
                <p
                  className={`text-xs mb-1 ${
                    project.highlight ? "text-blue-200" : "text-gray-500"
                  }`}
                >
                  Progresso
                </p>
                <Progress value={project.progress} />
                <p
                  className={`mt-2 text-right text-xs font-semibold ${
                    project.highlight ? "text-blue-100" : "text-gray-700"
                  }`}
                >
                  {project.progress}%
                </p>
              </div>
            </div>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{project.title}</DialogTitle>
            </DialogHeader>

            {/* Conteúdo do modal depende do tipo do card */}
            {project.type === "solicitacoes" ? (
              <div className="space-y-4">
                {solicitacoes.map((s) => (
                  <div
                    key={s.id}
                    className="p-4 bg-gray-50 rounded-xl flex items-center justify-between"
                  >
                    <div>
                      <h2 className="text-sm font-semibold">{s.desafio}</h2>
                      <p className="text-xs text-gray-500">Enviado em {s.data}</p>
                    </div>
                    {renderStatus(s.status)}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                Aqui você pode mostrar estatísticas ou detalhes dos desafios
                completos.
              </p>
            )}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
