// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { CheckCircle, Clock, XCircle } from "lucide-react";
// import Component from "./components/Button";

// interface Solicitation {
//   id: number;
//   desafio: string;
//   data: string;
//   status: "pendente" | "aprovado" | "recusado";
// }

// export default function HomePage() {
//   const [solicitacoes] = useState<Solicitation[]>([
//     { id: 1, desafio: "Desafio Front-end", data: "20/09/2025", status: "pendente" },
//     { id: 2, desafio: "Desafio UX Design", data: "18/09/2025", status: "aprovado" },
//     { id: 3, desafio: "Desafio de Dados", data: "15/09/2025", status: "recusado" },
//   ]);

//   const renderStatus = (status: Solicitation["status"]) => {
//     switch (status) {
//       case "pendente":
//         return (
//           <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
//             <Clock className="w-4 h-4 mr-1" /> Pendente
//           </Badge>
//         );
//       case "aprovado":
//         return (
//           <Badge variant="secondary" className="bg-green-100 text-green-700">
//             <CheckCircle className="w-4 h-4 mr-1" /> Aprovado
//           </Badge>
//         );
//       case "recusado":
//         return (
//           <Badge variant="secondary" className="bg-red-100 text-red-700">
//             <XCircle className="w-4 h-4 mr-1" /> Recusado
//           </Badge>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
//       <h1 className="text-2xl font-bold mt-6 mb-4">Solicitações Enviadas</h1>

//       <div className="grid gap-4">
//         {solicitacoes.map((s) => (
//           <Card key={s.id} className="shadow-sm">
//             <CardHeader className="flex flex-row items-center justify-between">
//               <CardTitle className="text-lg">{s.desafio}</CardTitle>
//               {renderStatus(s.status)}
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-gray-500">Enviado em {s.data}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
