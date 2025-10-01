"use client";

import { useState } from "react";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const desafioSchema = z
  .object({
    titulo: z
      .string()
      .min(1, "Título é obrigatório")
      .min(3, "Título deve ter pelo menos 3 caracteres"),
    descricao: z
      .string()
      .min(1, "Descrição é obrigatória")
      .min(10, "Descrição deve ter pelo menos 10 caracteres"),
    objetivos: z.string().optional(),
    areaAtuacao: z.string().optional(),
    beneficios: z.string().optional(),
    visibilidade: z.enum(["publico", "interno"]),
    dataInicio: z.string().optional(),
    dataFim: z.string().optional(),
    prazoAberto: z.boolean(),
  })
  .refine(
    (data) => {
      if (!data.prazoAberto) {
        return data.dataInicio && data.dataFim;
      }
      return true;
    },
    {
      message: "Defina um intervalo de datas ou marque 'Prazo Aberto'",
      path: ["dataFim"],
    }
  )
  .refine(
    (data) => {
      if (!data.prazoAberto && data.dataInicio && data.dataFim) {
        return new Date(data.dataFim) > new Date(data.dataInicio);
      }
      return true;
    },
    {
      message: "Data final deve ser maior que data inicial",
      path: ["dataFim"],
    }
  );

type Desafio = z.infer<typeof desafioSchema> & {
  id: number;
  status: string;
};

export default function GerenciarDesafios() {
  const [desafios, setDesafios] = useState<Desafio[]>([
    {
      id: 1,
      titulo: "Sustentabilidade em Embalagens",
      descricao: "Reduzir uso de plástico em embalagens de bebidas.",
      objetivos: "",
      areaAtuacao: "Sustentabilidade",
      beneficios: "Parceria e contrato com a empresa",
      visibilidade: "publico",
      dataInicio: "2024-09-17",
      dataFim: "2024-10-31",
      prazoAberto: false,
      status: "Ativo",
    },
  ]);

  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    objetivos: "",
    areaAtuacao: "",
    beneficios: "",
    visibilidade: "publico" as "publico" | "interno",
    dataInicio: "",
    dataFim: "",
    prazoAberto: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validarFormulario = (): boolean => {
    try {
      desafioSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const key = String(err.path[0]);
          if (key) {
            newErrors[key] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    if (editandoId) {
      setDesafios((prev) =>
        prev.map((d) => (d.id === editandoId ? { ...d, ...formData } : d))
      );
      setEditandoId(null);
    } else {
      const novoDesafio: Desafio = {
        ...formData,
        id: Date.now(),
        status: "Ativo",
      };
      setDesafios((prev) => [...prev, novoDesafio]);
    }

    resetarFormulario();
  };

  const editarDesafio = (desafio: Desafio) => {
    setFormData({
      titulo: desafio.titulo,
      descricao: desafio.descricao,
      objetivos: desafio.objetivos ?? "",
      areaAtuacao: desafio.areaAtuacao ?? "",
      beneficios: desafio.beneficios ?? "",
      visibilidade: desafio.visibilidade,
      dataInicio: desafio.dataInicio ?? "",
      dataFim: desafio.dataFim ?? "",
      prazoAberto: desafio.prazoAberto,
    });
    setEditandoId(desafio.id);
    setErrors({});
  };

  const encerrarDesafio = (id: number) => {
    setDesafios((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "Encerrado" } : d))
    );
  };

  const resetarFormulario = () => {
    setEditandoId(null);
    setFormData({
      titulo: "",
      descricao: "",
      objetivos: "",
      areaAtuacao: "",
      beneficios: "",
      visibilidade: "publico",
      dataInicio: "",
      dataFim: "",
      prazoAberto: false,
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>
              {editandoId ? "Editar Desafio" : "Criar Novo Desafio"}
            </CardTitle>
            <CardDescription>
              Preencha os dados do desafio que deseja publicar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título *</Label>
                <Input
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  placeholder="Digite o título do desafio"
                  className={errors.titulo ? "border-destructive" : ""}
                />
                {errors.titulo && (
                  <p className="text-sm text-destructive">{errors.titulo}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição *</Label>
                <Textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  placeholder="Explique o problema e o que espera da solução"
                  rows={4}
                  className={errors.descricao ? "border-destructive" : ""}
                />
                {errors.descricao && (
                  <p className="text-sm text-destructive">{errors.descricao}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="objetivos">Objetivos esperados</Label>
                <Textarea
                  id="objetivos"
                  name="objetivos"
                  value={formData.objetivos}
                  onChange={handleChange}
                  placeholder="Exemplo: reduzir custos, melhorar processo..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="areaAtuacao">Área de atuação</Label>
                <Select
                  value={formData.areaAtuacao}
                  onValueChange={(value) =>
                    handleSelectChange("areaAtuacao", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma área" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="saude">Saúde</SelectItem>
                    <SelectItem value="logistica">Logística</SelectItem>
                    <SelectItem value="energia">Energia</SelectItem>
                    <SelectItem value="tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="sustentabilidade">
                      Sustentabilidade
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="beneficios">Benefícios</Label>
                <Textarea
                  id="beneficios"
                  name="beneficios"
                  value={formData.beneficios}
                  onChange={handleChange}
                  placeholder="Premiação, parceria, contrato, reconhecimento..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Visibilidade *</Label>
                <RadioGroup
                  value={formData.visibilidade}
                  onValueChange={(value: "publico" | "interno") =>
                    handleSelectChange("visibilidade", value)
                  }
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="publico" id="publico" />
                    <Label htmlFor="publico">Público</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="interno" id="interno" />
                    <Label htmlFor="interno">Interno</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Prazo *</Label>
                <div className="flex items-center gap-4 mb-3">
                  <Input
                    type="date"
                    name="dataInicio"
                    value={formData.dataInicio}
                    onChange={handleChange}
                    disabled={formData.prazoAberto}
                  />
                  <span>→</span>
                  <Input
                    type="date"
                    name="dataFim"
                    value={formData.dataFim}
                    onChange={handleChange}
                    disabled={formData.prazoAberto}
                    className={errors.dataFim ? "border-destructive" : ""}
                  />
                </div>
                {errors.dataFim && (
                  <p className="text-sm text-destructive mb-2">
                    {errors.dataFim}
                  </p>
                )}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="prazoAberto"
                    checked={formData.prazoAberto}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        prazoAberto: checked as boolean,
                      }))
                    }
                  />
                  <Label htmlFor="prazoAberto">
                    Prazo aberto até encerramento manual
                  </Label>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                {editandoId && (
                  <Button
                    type="button"
                    onClick={resetarFormulario}
                    variant="outline"
                  >
                    Cancelar
                  </Button>
                )}
                <Button type="submit">
                  {editandoId ? "Atualizar Desafio" : "Publicar Desafio"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meus Desafios ({desafios.length})</CardTitle>
            <CardDescription>
              Gerencie os desafios que você criou
            </CardDescription>
          </CardHeader>
          <CardContent>
            {desafios.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum desafio criado ainda.
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Visibilidade</TableHead>
                      <TableHead>Prazo</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {desafios.map((desafio) => (
                      <TableRow key={desafio.id}>
                        <TableCell className="font-medium">
                          {desafio.titulo}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              desafio.status === "Ativo"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {desafio.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {desafio.visibilidade === "publico"
                              ? "Público"
                              : "Interno"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {desafio.prazoAberto ? (
                            <span className="text-muted-foreground">
                              Prazo Aberto
                            </span>
                          ) : (
                            <span className="text-muted-foreground">
                              {desafio.dataInicio} a {desafio.dataFim}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {desafio.status === "Ativo" && (
                              <>
                                <Button
                                  onClick={() => editarDesafio(desafio)}
                                  variant="outline"
                                  size="sm"
                                >
                                  Editar
                                </Button>
                                <Button
                                  onClick={() => encerrarDesafio(desafio.id)}
                                  variant="outline"
                                  size="sm"
                                >
                                  Encerrar
                                </Button>
                              </>
                            )}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:bg-red-50"
                                >
                                  Deletar
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Confirmar exclusão
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja deletar {desafio.titulo}? Esta ação não pode ser
                                    desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      setDesafios((prev) =>
                                        prev.filter((d) => d.id !== desafio.id)
                                      )
                                    }
                                  >
                                    Deletar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
