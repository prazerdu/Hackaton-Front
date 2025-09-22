"use client";
import Image from "next/image";

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
  const projects = [
    {
      id: 1,
      title: "Desafios Solicitados",
      progress: 50,
      icon: "",
      highlight: true,
      description: "Pedidos pendentes para serem concluídas.",
      count: 12,
      isImage: true, 
    },
    {
      id: 2,
      title: "Desafios Completos",
      progress: 80,
      icon: "/icons/checklist.png",
      highlight: false,
      description: "Quantidade de desafios já finalizados.",
      count: 34,
      isImage: true
    },
  ];

  return (
    <div className="flex lg:flex-col gap-8 max-w-lg mx-auto p-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className={`p-5 rounded-2xl shadow-md flex flex-col justify-between lg:w-[200px] transition-transform duration-300 hover:scale-[1.02] ${
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
                  width={32}
                  height={32}
                  className="rounded-md object-contain"
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

          {/* Progresso */}
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
      ))}
    </div>
  );
}
